const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Join a meeting room
    socket.on("join-room", ({ roomId, user }) => {
      socket.join(roomId);
      console.log(`${user.name} joined room: ${roomId}`);
      socket.to(roomId).emit("user-joined", { user, socketId: socket.id });
    });

    // Handle message sending
    socket.on("send-message", ({ roomId, message, sender }) => {
      io.to(roomId).emit("receive-message", { message, sender });
    });

    // Mic toggle
    socket.on("toggle-mic", ({ roomId, userId, isMicOn }) => {
      socket.to(roomId).emit("mic-toggled", { userId, isMicOn });
    });

    // Video toggle
    socket.on("toggle-video", ({ roomId, userId, isVideoOn }) => {
      socket.to(roomId).emit("video-toggled", { userId, isVideoOn });
    });

    // Screen sharing
    socket.on("start-screen-share", ({ roomId, userId }) => {
      socket.to(roomId).emit("screen-share-started", { userId });
    });

    socket.on("stop-screen-share", ({ roomId, userId }) => {
      socket.to(roomId).emit("screen-share-stopped", { userId });
    });

    // Disconnecting
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

export default socketHandler;
