import React, { useEffect, useState } from "react";
import { useRoomContext } from "../../context/RoomContext";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const { userDetails, setUserDetails, joinRoom } = useRoomContext();
  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    if (userDetails.name && userDetails.roomId) {
      navigate(`/chat/${userDetails.roomId}`);
    }
  }, [userDetails, navigate]);

  const handleJoin = (e) => {
    e.preventDefault();
    setUserDetails((prev) => ({ ...prev, name, roomId }));
    joinRoom();
     
    navigate(`/chat/${roomId}`)
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-800 to-green-600">
      <form onSubmit={handleJoin} className="bg-white dark:bg-gray-300 p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6">
      <h1 className='text-xl text-center text-black'>The Room Id is: <span className='underline font-semibold'>KL300GH</span></h1>
        <h2 className="text-2xl font-semibold mb-4 text-center">Join Chat Room</h2>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-100 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />
        <input
          type="text"
          placeholder="Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-100 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-500 to-cyan-400 text-black py-2 rounded-lg hover:bg-purple-700 transition duration-200 font-semibold"
        >
          Join
        </button>
      </form>
    </div>
  );
};

export default Chat;
