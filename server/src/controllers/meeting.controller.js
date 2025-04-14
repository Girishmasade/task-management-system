import Meeting from "../models/meeting.model.js";
import Notice from "../models/notification.model.js";// Assuming you have a server.js file where you initialize socket.io

export const meetingStart = async (req, res) => {
  try {
    const { roomId } = req.body;
    const adminId = req.user.userId;

    const meeting = await Meeting.findOne({ roomId }).populate("participants");

    if (!meeting) {
      return res.status(404).json({
        status: false,
        message: "Meeting not found.",
      });
    }

    if (meeting.admin.toString() !== adminId) {
      return res.status(403).json({
        status: false,
        message: "You are not authorized to start this meeting.",
      });
    }

    meeting.createdAt = Date.now();
    await meeting.save();
    await Notice.create({
      team: meeting.participants,
      text: "The meeting has started!",
      task: meeting._id,
      notiType: "alert",
    });

    io.to(meeting.roomId).emit("meeting-started", { roomId: meeting.roomId });

    res.status(200).json({
      status: true,
      message: "Meeting started successfully.",
      data: meeting,
    });
  } catch (error) {
    console.error("Error starting meeting:", error.message);
    res.status(500).json({
      status: false,
      message: "Server error while starting the meeting.",
    });
  }
};

export const sendMessage = (req, res) => {
  try {
    const { roomId, message, sender } = req.body;

    if (!roomId || !message || !sender) {
      return res.status(400).json({
        status: false,
        message: "Missing required fields (roomId, message, sender).",
      });
    }

    io.to(roomId).emit("receive-message", { message, sender });

    res.status(200).json({
      status: true,
      message: "Message sent successfully.",
    });
  } catch (error) {
    console.error("Error sending message:", error.message);
    res.status(500).json({
      status: false,
      message: "Server error while sending the message.",
    });
  }
};

