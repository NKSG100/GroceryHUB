import Order from "../models/Order.js";
import Product from "../models/Product.js";
import stripe from "stripe";
import User from "../models/User.js"

//Place Order COD: /api/order/cod
export const placeOrderCOD = async (req, res) => {
    try {
        const { userId, items, address } = req.body;
        if (!userId || !items || !address) {
            return res.json({
                success: false,
                message: "Please fill all the fields",
            })
        }
        let amount = await items.reduce(async (acc, item) => {
            const product = await Product.findById(item.product);
            return (await acc) + (product.offerPrice * item.quantity);
        }, 0)

        amount = amount + Math.floor(amount * 0.02);

        await Order.create({
            userId: userId,
            items: items,
            amount: amount,
            address: address,
            paymentType: "COD",
        })

        return res.json({
            success: true,
            message: "Order placed successfully",
        })
    } catch (error) {
        console.log(error.message);
        return res.json({
            success: false,
            message: error.message
        })
    }
}

//Place Order Stripe: /api/order/stripe
export const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, address } = req.body;
        const {origin} = req.headers;
        if (!userId || !items || !address) {
            return res.json({
                success: false,
                message: "Please fill all the fields",
            })
        }

        let productData = [];

        let amount = await items.reduce(async (acc, item) => {
            const product = await Product.findById(item.product);
            productData.push({
                name: product.name,
                price: product.offerPrice,
                quantity: item.quantity,
            });
            return (await acc) + (product.offerPrice * item.quantity);
        }, 0)

        amount = amount + Math.floor(amount * 0.02);

       const order =  await Order.create({
            userId: userId,
            items: items,
            amount: amount,
            address: address,
            paymentType: "Online",
        });

        //Stripe gateway initialize
        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

        //create line items for stripe
        const line_items = productData.map((item) => {
            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: Math.floor(item.price +  item.price*0.02) * 100,
                },
                quantity: item.quantity,
            }
        })

        //create session
        const session = await stripeInstance.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: line_items,
            mode: "payment",
            success_url: `${origin}/loader?next=my-orders`,
            cancel_url: `${origin}/cart`,
            metadata: {
                orderId: order._id.toString(),
                userId,
            }
        })

        return res.json({
            success: true,
            url: session.url,
            message: "Order placed successfully",
        })
    } catch (error) {
        console.log(error.message);
        return res.json({
            success: false,
            message: error.message
        })
    }
}

//Stripe Webhooks to verify Payments Action: /stripe
export const stripeWebhooks = async (req, res)=>{
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
    const sig = req.headers["stripe-signature"];
    let event;

    try {
        event = stripeInstance.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (error) {
        res.status(400).send(`Webhook Error: ${error.message}`);
    }

    //Handle event
    switch (event.type) {
        case "payment_intent.succeeded":{
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;
            const session = await stripeInstance.checkout.session.list({
                payment_intent: paymentIntentId,
            });

            const {orderId, userId} = session.data[0].metadata;

            //mark paymnet as paid
            await Order.findByIdAndUpdate(orderId, {isPaid:true});

            //clear Cart
            await User.findByIdAndUpdate(userId, {cartItems: {}});
            break;
        }

        case "payment_intent.payment_failed":{
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;
            const session = await stripeInstance.checkout.session.list({
                payment_intent: paymentIntentId,
            });

            const {orderId} = session.data[0].metadata;
            await Order.findByIdAndDelete(orderId);
            break;           
        }

        default:
            console.error(`Unhandled event type ${event.type}`);
            break;
    }
    res.json({received: true});

}

//Get Orders by User ID: /api/order/user
export const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await Order.find({
            userId: userId,
            $or: [{paymentType: "COD"}, {isPaid: true}],
         }).populate("items.product address").sort({createdAt: -1});

        res.json({
            success: true,
            message: "Orders fetched successfully",
            orders: orders,
        })
    } catch (error) {
        console.log(error.message);
        return res.json({
            success: false,
            message:  error.message
        })
    }
}

//Get all orders( for seller / admin): /api/order/seller
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            $or: [{paymentType: "COD"}, {isPaid: true}],
        }).populate("items.product address").sort({createdAt: -1});

        res.json({
            success: true,
            message: "All Orders fetched successfully",
            orders: orders,
        })
    } catch (error) {
        console.log(error.message);
        return res.json({
            success: false,
            message: error.message
        })
    }
}