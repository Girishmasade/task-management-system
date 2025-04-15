import { useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const Chat = ({ roomId }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // Handle sending a message
  const sendMessage = async () => {
    if (!message.trim()) return; // Don't send empty messages

    socket.emit("send-message", { roomId, message, sender: "User" });

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "User", message },
    ]);

    setMessage(""); // Reset message input
  };

  // Receive messages via socket
  socket.on("receive-message", (data) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: data.sender, message: data.message },
    ]);
  });

  return (
    <div className="flex flex-col h-[20] bg-gray-100">
      <div className="bg-blue-500 text-white text-center py-4">
        <h3 className="text-xl font-semibold">Chat Room</h3>
      </div>

      <div className="flex-grow overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`my-2 p-3 rounded-lg max-w-xs ${
              msg.sender === "User"
                ? "ml-auto bg-blue-200 text-right"
                : "mr-auto bg-gray-300 text-left"
            }`}
          >
            <strong className="block">{msg.sender}:</strong>
            <span>{msg.message}</span>
          </div>
        ))}
      </div>

      <div className="flex p-4 bg-white border-t">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-grow border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={sendMessage}
          className="ml-2 bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
