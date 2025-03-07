import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        
        const user = await User.findOne({email})
        if (user) {
            return res.status(400).json({
                success: false,
                message: "user already exists"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            username,
            email,
            password: hashPassword
        })

        await newUser.save()
        console.log(newUser);
        

        return res.status(200).json({
            success: true,
            message: "user created"
        })

    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}