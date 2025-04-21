import {v2 as cloudinary} from 'cloudinary';
import Product from '../models/Product.js';

//Add product: /api/product/add
export const addProduct = async (req, res) => {
    try {
        let productData = JSON.parse(req.body.productData);
        const images = req.files;
        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, {
                    resource_type: "image",
                });
                return result.secure_url;
            })
        )
        await Product.create({...productData, image: imagesUrl});
        return res.json({
            success: true,
            message: "Product added successfully",
        })
    } catch (error) {
        console.log(error.message);
        return res.json({
            success: false,
            message: "Error : Product not added",
            error: error.message,
        })
    }
}

//Get product: /api/product/list
export const productList = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json({
            success: true,
            message: "Product list fetched successfully",
            products: products,
        })
    } catch (error) {
        console.log(error.message);
        return res.json({
            success: false,
            message: "Error : Product list not fetched",
            error: error.message,
        })
    }
}

//Get Single product: /api/product/id
export const productById = async (req, res) => {
    try {
        const {id}= req.body;
        const product = await Product.findById(id);
        res.json({
            success: true,
            message: "Product fetched by ID successfully",
            product: product,
        })
    } catch (error) {
        console.log(error.message);
        return res.json({
            success: false,
            message: "Error : Product not fetched by ID",
            error: error.message,
        })
    }
}

//CHange product inStock: /api/product/stock
export const changeStock = async (req, res) => {
    try {
        const {id, inStock}= req.body;
        await Product.findByIdAndUpdate(id, {inStock: inStock});
        res.json({
            success: true,
            message: "Product stock status updated successfully",
        })
    } catch (error) {
        console.log(error.message);
        return res.json({
            success: false,
            message: "Error : Product stock status not updated",
            error: error.message,
        })
    }
}