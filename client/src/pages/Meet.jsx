// src/Meet.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setRoomId } from "../redux/slice/meetSlice";
import Meeting from "../components/Meeting";

const Meet = () => {
  const [roomId, setRoomIdState] = useState("");
  const dispatch = useDispatch();

  const handleJoinRoom = () => {
    dispatch(setRoomId(roomId));
  };

  return (
    <div className="app-container">
      {!roomId ? (
        <div className="join-room">
          <input
            type="text"
            value={roomId}
            onChange={(e) => setRoomIdState(e.target.value)}
            placeholder="Enter Room ID"
          />
          <button onClick={handleJoinRoom}>Join Room</button>
        </div>
      ) : (
        <Meeting />
      )}
    </div>
  );
};

export default Meet;
