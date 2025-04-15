// src/components/Meeting.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useStartMeetingMutation, useSendMessageMutation } from "../redux/slice/app/meetingApiSlice";
import { setRoomId, addMessage, toggleMeetingStatus, setParticipants } from "../redux/slice/meetSlice";
import { connectSocket, socketEmit, socketOn } from "../utils/socket";
import MessageInput from "./MessageInput";
import VideoPanel from "./VideoPanel";

const Meeting = () => {
  const dispatch = useDispatch();
  const { roomId, messages, isMeetingStarted, participants } = useSelector((state) => state.meeting);
  const [startMeeting] = useStartMeetingMutation();
  const [sendMessage] = useSendMessageMutation();

  useEffect(() => {
    if (roomId) {
      const socket = connectSocket(roomId);

      socketOn("receive-message", (data) => {
        dispatch(addMessage(data));
      });

      socketOn("user-joined", (user) => {
        dispatch(setParticipants([...participants, user]));
      });

      socketOn("mic-toggled", (data) => {
        console.log(`${data.userId}'s mic is ${data.isMicOn ? "on" : "off"}`);
      });

      socketOn("video-toggled", (data) => {
        console.log(`${data.userId}'s video is ${data.isVideoOn ? "on" : "off"}`);
      });
    }

    return () => {
      socketEmit("leave-room", { roomId });
    };
  }, [roomId, dispatch, participants]);

  const handleStartMeeting = async () => {
    try {
      await startMeeting(roomId).unwrap();
      dispatch(toggleMeetingStatus(true));
    } catch (error) {
      console.error("Error starting the meeting:", error);
    }
  };

  const handleSendMessage = async (message) => {
    try {
      await sendMessage({ roomId, message }).unwrap();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="meeting-container">
      <div className="meeting-header">
        <h2>Meeting Room: {roomId}</h2>
        <button onClick={handleStartMeeting} className="start-btn">
          Start Meeting
        </button>
      </div>
      {isMeetingStarted && (
        <>
          <VideoPanel participants={participants} />
          <MessageInput onSendMessage={handleSendMessage} />
          <div className="message-list">
            {messages.map((msg, index) => (
              <div key={index} className="message">
                <p>{msg.sender}: {msg.message}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Meeting;
