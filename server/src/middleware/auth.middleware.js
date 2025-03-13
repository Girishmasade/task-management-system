import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config()

export const authMiddleware = async (req, res, next) => {

    let token = req.headers.authorization
    if (!token) {
        return res.json({
            success: false,
            message: 'Not authorized, not token'
        })
    }

    try {
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decodeToken.id).select('-password')

        if (!req.user) {
            return  res.status(401).json({
                success: false,
                message: 'User not found'
            })
        }

        next()
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized, token failed'
        })
    }
}

// middleware to restrict access to admin only
export const adminOnly = async (req, res, next) => {
    try {
        if (req.user && req.user.role === 'admin') {
            next()
        }
    } catch (error) {
        return res.status(403).json({
            success: false,
            message:"Admin access required"
        })
    }
}