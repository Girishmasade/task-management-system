import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: { type: String,
       required: true,
      enum: ["admin", "user"]
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    verifyOTP: {
      type: String,
      default: "",
    },
    verifyExpiryOTP: {
      type: Number,
      default: 0,
    },
    isAccountVerified: {
      type: Boolean,
      default: false,
    },
    resetOTP: {
      type: String,
      default: "",
    },
    resetOtpExpiry: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
