import mongoose, { Schema } from "mongoose";

const meetingSchema = new Schema({
  roomId: {
    type: String,
    required: true,
  },

  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Creating the model and exporting it as default
const Meeting = mongoose.model("Meeting", meetingSchema);
export default Meeting;
