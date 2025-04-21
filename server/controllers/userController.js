import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Register User: /api/user/register
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if(!name || !email || !password) {
      return res.json({success:false, message: "Please fill all the fields" });
    }

    const existingUser = await User.findOne({email});
    if(existingUser) {
      return res.json({success:false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    })

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
      expiresIn: "7d",
    })

    res.cookie("token", token, {
      httpOnly: true,  //prevent js to access cookie
      secure: process.env.NODE_ENV === "production", //use secure cookies in prod
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", //csrf protection
      maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
    })

    return res.json({
      success: true,
      message: "User registered successfully",
      user: {
        name: user.name,
        email: user.email,
        id: user._id,
      },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.json({
      success: false,
      message: "Error registering user",
      error: error.message,
    });
  }
}

//Login User: /api/user/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if(!email || !password) {
      return res.json({success:false, message: "Please fill all the fields" });
    }

    const user = await User.findOne({email});
    if(!user) {
      return res.json({success:false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
      return res.json({success:false, message: "Invalid Password" });
    }

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
      expiresIn: "7d",
    })

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    return res.json({
      success: true,
      message: "User logged in successfully",
      user: {
        name: user.name,
        email: user.email,
        id: user._id,
      },
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    return res.json({
      success: false,
      message: "Login Failed",
      error: error.message,
    });
  }
}

//Check Auth: /api/user/is-auth
export const isAuth = async (req, res) => {
  try {
    const {userId} = req.body;
    const user = await User.findById(userId).select("-password");
    return res.json({
      success: true,
      message: "User is authenticated",
      user,
    });
  } catch (error) {
    console.error("Error in authentication: ", error);
    return res.status(401).json({ success: false, message: "Unauthorized (isAuth Failed)", error: error.message });
  }
}

//Logout User: /api/user/logout
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict"
    })
    return res.json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.error("Error logging out user: ", error);
    return res.json({
      success: false,
      message: "Logout Failed",
      error: error.message,
    });
  }
}