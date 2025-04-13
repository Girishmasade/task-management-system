import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    date: {
      type: Date,
      default: Date.now,
    },

    priority: {
      type: String,
      enum: ["high", "medium", "normal", "low"],
      default: "normal",
    },

    stage: {
      type: String,
      enum: ["todo", "in progress", "completed"],
      default: "todo",
    },

    activities: [
      {
        type: {
          type: String,
          enum: ["assigned", "started", "in progress", "bug", "completed", "commented"],
          default: "assigned",
        },
        activity: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
        by: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],

    subTasks: [
      {
        title: { type: String, required: true },
        date: { type: Date },
        tag: { type: String },
      },
    ],

    assets: {
      type: [String],
      default: [],
    },

    team: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    isTrashed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);
export default Task;
