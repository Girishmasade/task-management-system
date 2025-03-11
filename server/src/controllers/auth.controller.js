import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import transporter from "../config/EmailVerfication.js";

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


    const mailOption = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Welcome to Task Management System - 2025',
      text: 'You have successfully logged in to Task Management System - 2025',
    }

   await transporter.sendMail(mailOption);    

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

export const sendVerifyOTP = async (req, res) => {
  try {
    const {userId} = req.body;
    const user = await User.findById({_id: userId});
    // console.log(user);
    

    // here we check whether user verified or not if verified we are not send OTP otherwise we have to send OTP
    if (user.isAccountVerified) {
      return res.status(400).json({
        success: false,
        message: 'User already verified'
      })
    }

    const OTP = Math.floor(100000 + Math.random() * 900000);

    user.verifyOTP = OTP;;
    user.verifyExpiryOTP = new Date(Date.now() + 24 * 60 * 60 * 1000)
    // console.log(verifyExpiryOTP.toLocalString());
    

    await user.save()

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: user.email,
      subject: 'Account Verification OTP is Here',
      text: `To verify your account otp is ${OTP}`,
      html: ``
    }
    // console.log(mailOptions);
    
    await transporter.sendMail(mailOptions)

    res.status(200).json({
      success: true,
      message: 'Verification otp send an email'
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
  })
  }
}

export const verifyEmail = async (req, res) => {
  try {
    const {userId, OTP} = req.body

    if (!userId || !OTP) {
      return res.json({
        success: false,
        message: 'User ID and OTP are required.'
      });
    }

    const user = await User.findById(userId)
    if (!user) {
      return res.json({
        success: false,
        message: "User is not valid"
      })
    }

    if (!user.verifyOTP === '' || user.verifyOTP !== OTP) {
      return res.json({
        success: false,
        message: 'Invalid OTP.'
      })
    }

    if (user.verifyExpiryOTP < Date.now()) {
      return  res.json({
        success: false,
        message: 'OTP is expired'
      })
    }

    user.isAccountVerified = true
    user.verifyOTP = ''
    user.verifyExpiryOTP = 0

    await user.save()
    return res.json({
      success: true,
      message: 'User verified successfully'
    })

  } catch (error) {
    res.json({
      success: false,
      message: error.message
  })
  }
}

export const isAuthanticated = async (req, res) => {
  try {
    return res.json({
      success:true,
      message: 'Account is verified'
    })
  } catch (error) {
    res.json({
      success: false,
      message: error.message
  })
  }
}