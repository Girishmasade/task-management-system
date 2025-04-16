import React, { useState, useEffect, useRef } from "react";
import { useRoomContext } from "../../context/RoomContext";

const JoinChat = () => {
  const { userDetails, sendMessage, messages } = useRoomContext();
  const [messageText, setMessageText] = useState("");
  const bottomRef = useRef(null);

  const handleSend = (e) => {
    e.preventDefault();
    if (messageText.trim()) {
      sendMessage(messageText);
      setMessageText("");
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!userDetails?.roomId || !userDetails?.name) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        <p>Please join a room first.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-blue-600 text-white p-4 text-center text-lg font-semibold">
        Chat Room: {userDetails.roomId}
      </div>

      <div className="flex-1 overflow-y-auto bg-gray-100 p-4 space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded max-w-md ${
              msg.sender === userDetails.name
                ? "bg-blue-500 text-white self-end ml-auto"
                : "bg-white shadow"
            }`}
          >
            <p className="text-sm font-semibold">{msg.sender}</p>
            <p>{msg.text}</p>
            <p className="text-xs text-gray-500 text-right">{msg.time}</p>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={handleSend}
        className="p-4 bg-white border-t flex items-center gap-2"
      >
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border rounded px-4 py-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default JoinChat;
