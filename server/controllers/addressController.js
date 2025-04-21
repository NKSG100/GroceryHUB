import Address from "../models/Address.js";

//Add Address: /api/address/add
export const addAddress = async (req, res) => {
    try {
        const {userId, address} = req.body;
        await Address.create({...address, userId: userId});
        res.json({
            success: true,
            message: "Address added successfully",
        })
    } catch (error) {
        console.log(error.message);
        return res.json({
            success: false,
            message: "Error : Address not added",
            error: error.message,
        })
    }
}

//Get Address: /api/address/get
export const getAddress = async (req, res) => {
    try {
        const {userId} = req.body;
        const addresses = await Address.find({userId: userId});
        res.json({
            success: true,
            message: "Address fetched successfully",
            addresses,
        });
    } catch (error) {
        console.log(error.message);
        return res.json({
            success: false,
            message: "Error : Address not fetched",
            error: error.message,
        })
    }
}