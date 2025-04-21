import jwt from "jsonwebtoken";

const authSeller = async (req, res, next) => {
    const {sellerToken} = req.cookies;
    if (!sellerToken) {
        return res.json({ success: false, message: "Unauthorized No Token Found" });
    }

    try {
        const tokenDecode = jwt.verify(sellerToken, process.env.JWT_SECRET);
        if (tokenDecode.email === process.env.SELLER_EMAIL) {
            next();
        } else {
          return res.json({
            success: false,
            message: "Unauthorized Seller",
          });
        }
    
        
      } catch (error) {
        console.error("Error in Seller authentication: ", error.message);
        return res
          .status(401)
          .json({
            success: false,
            message: error.message,
          });
      }
}

export default authSeller;