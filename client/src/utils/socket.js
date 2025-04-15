// src/utils/socket.js
import { io } from "socket.io-client";

let socket;

export const connectSocket = (roomId) => {
  socket = io("http://localhost:5000");  // Update with your backend URL

  socket.emit("join-room", { roomId, user: { name: "User" } });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
  }
};

export const socketEmit = (event, data) => {
  if (socket) {
    socket.emit(event, data);
  }
};

export const socketOn = (event, callback) => {
  if (socket) {
    socket.on(event, callback);
  }
};
