import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "user already exists",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });

    await newUser.save();
    console.log(newUser);

    return res.status(200).json({
      success: true,
      message: "user created",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }

    const hashedPassword = existingUser.password;
    const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "invalid password",
      });
    }

    const token = jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
        password: existingUser.password,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("access_token", token, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      secure: process.env.NODE_ENV === " production" ? true : false,
      path: "/",
      expiresIn: new Date(Date.now() + 24 * 60 * 60 + 1000),
    });

    res.status(200).json({
      success: true,
      message: "login success",
    });
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("access_token", {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        secure: process.env.NODE_ENV === " production" ? true : false,
        path: "/",
    });
    return res.status(200).json({
      success: true,
      message: "logout success",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
