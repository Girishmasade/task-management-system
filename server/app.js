// app.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./src/routers/auth.route.js";
import taskRouter from "./src/routers/task.route.js";
import meetingRouter from "./src/routers/meet.route.js"; // Import meeting routes
import connectDB from "./src/Database/Database.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000", 
    credentials: true,
  })
);

connectDB()

// Use the routers
app.use("/api/auth", authRouter);
app.use("/api/task", taskRouter);
app.use("/api/meet", meetingRouter); 

export {app}; 
