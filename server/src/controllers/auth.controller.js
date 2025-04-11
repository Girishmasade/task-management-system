import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import transporter from "../config/EmailVerfication.js";

export const register = async (req, res) => {
  try {
    const { username, email, password, isAdmin, role } = req.body;

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
      isAdmin,
      role,
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
   
   if (user) {
    isAdmin ? createJWT(res, user._id) : null;

    user.password = undefined;

    res.status(201).json(user);
  } else {
    return res
      .status(400)
      .json({ status: false, message: "Invalid user data" });
  }

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

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // Check password
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    // Generate token with userId
    const token = jwt.sign(
      {
        userId: existingUser._id,
        email: existingUser.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Set token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    // Response payload
    res.status(200).json({
      success: true,
      _id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
      isAccountVerified: existingUser.isAccountVerified,
    });

  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
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
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (user.isAccountVerified) {
      return res.status(400).json({
        success: false,
        message: "User already verified"
      });
    }

    // Generate a 6-digit OTP
    const OTP = Math.floor(100000 + Math.random() * 900000);

    user.verifyOTP = OTP;
    user.verifyExpiryOTP = new Date(Date.now() + 15 * 60 * 1000); // expires in 15 minutes

    await user.save();

    // Setup mail options
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: user.email,
      subject: 'Your Account Verification OTP',
      text: `Your OTP for verifying your account is: ${OTP}`,
      html: `<p style="font-size:16px;">Hello ${user.name || ''},</p>
             <p>Your OTP for verifying your account is:</p>
             <h2>${OTP}</h2>
             <p>This OTP is valid for 15 minutes.</p>`
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Verification OTP sent to your email"
    });

  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({
      success: false,
      message: "Server Error: " + error.message
    });
  }
};

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

export const sendResetPassword  = async (req, res) => {
  try {
    const {email} = req.body
    const user = await User.findOne({email})

    if (!user) {
      return res.json({
        success: false,
        message: 'Email is not registered'
      })
    }

    const OTP = Math.floor(100000 + Math.random() * 900000)

    user.resetOTP = OTP
    user.resetOtpExpiry = new Date(Date.now() + + 15 * 60 * 1000)

    await user.save()

    const mailOption = {
      from: process.env.SMTP_USER,
      to: user.email,
      text: 'Password Reset OTP',
      // html: Password_Reset_OTP.replace("{{OTP}}", OTP).replace("{{email}}", user.email)
    }

    await transporter.sendMail(mailOption)

    return res.json({
      success: true,
      message: 'Password reset otp send'
    })

  } catch (error) {
    res.json({
      success: false,
      message: error.message
  })
  }
}

export const resetPassword = async (req, res) => {
  try {
    const {email, OTP, newPassword} = req.body
    const user = await User.findOne({email})

    if (!user) {
      return res.json({
        succes: false,
        message: 'Email is not registered'
      })
    }

    if (!user.resetOTP === '' || user.resetOTP !== OTP) {
      return res.json({
        success: false,
        message: 'Invalid OTP'
      })
    }

    if (user.resetOtpExpiry < Date.now()) {
      return res.json({
        success: false,
        message: 'OTP expired'
      })
    }

    const hashedPassword = bcrypt.hashSync(newPassword, 10)

    user.password = hashedPassword
    user.verifyOTP = ''
    user.verifyExpiryOTP = 0

    await user.save()

    return res.json({
      success: true,
      message: 'Password reset successfull'
    })

  } catch (error) {
    return res.json({
      success:false,
      message: error.message
    })
  }
}