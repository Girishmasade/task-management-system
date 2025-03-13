import jwt from "jsonwebtoken";
import Admin from "../models/admin.model.js";
import bcrypt from "bcryptjs";

const generateToken = (id) => {
  return jwt.sign({ id, role: "admin" }, process.env.JWT_SECRET);
};

export const registerAdmin = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const adminExists = await Admin.findOne({ email });

    if (adminExists) {
      return res.status(400).json({
        success: false,
        message: "admin already exists",
      });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      token: generateToken(admin._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const loginAdmin = async (req, res) => {
    try {
        const {email, password} = req.body
        const admin = await Admin.findOne({email})
      
        if (!admin) {
            return res.status(400).json({
                success: false,
                message: 'email not found'
            })
        }

        const hashedPassword = admin.password
        const isPasswordCorrect = await bcrypt.compare(password, hashedPassword)

        if (!isPasswordCorrect) {
            return res.status(400).json({
              success: false,
              message: "invalid password",
            });
          }

        res.json({
            _id: admin._id,
            name: admin.name,
            email: admin.email,
            role: "admin",
            token: generateToken(admin._id),
        })

        res.status(401).json({ message: "Invalid email or password" });

    } catch (error) {
      return  res.status(500).json({ message: "Server Error", error: error.message });
    }
}