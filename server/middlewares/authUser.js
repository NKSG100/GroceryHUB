import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.json({ success: false, message: "Unauthorized (No Token)" });
  }
  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    if (tokenDecode.id) {
      req.body = req.body || {};
      req.body.userId = tokenDecode.id;
    } else {
      return res.json({
        success: false,
        message: "Unauthorized (Invalid Token)",
      });
    }

    next();
  } catch (error) {
    console.error("Error in authentication: ", error.message);
    return res
      .status(401)
      .json({
        success: false,
        message: "Unauthorized (Authentication Failed)",
        error: error.message,
      });
  }
};

export default authUser;
