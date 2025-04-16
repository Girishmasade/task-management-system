import { createContext, useState, useContext, useRef, useEffect } from "react";
import { io } from "socket.io-client";

const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({ roomId: "", name: "", email: "" });
  const [socket, setSocket] = useState(null);
  const [micOn, setMicOn] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [localStream, setLocalStream] = useState(null);
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chat-messages");
    return saved ? JSON.parse(saved) : [];
  });

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  // Initialize socket & media stream
  useEffect(() => {
    const socketInstance = io("http://localhost:5000", {
      transports: ["websocket"], // optional but more stable
    });
    setSocket(socketInstance);

    const initStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setLocalStream(stream);

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        setMicOn(true);
        setCameraOn(true);
      } catch (error) {
        console.error("Error accessing media devices:", error);
      }
    };

    initStream();

    return () => {
      if (socketInstance) socketInstance.disconnect();
    };
  }, []);

  // Update localStorage when messages change
  useEffect(() => {
    localStorage.setItem("chat-messages", JSON.stringify(messages));
  }, [messages]);

  // Receive incoming messages
  useEffect(() => {
    if (!socket) return;

    socket.on("receive-message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receive-message");
    };
  }, [socket]);

  // Join room
  const joinRoom = () => {
    if (userDetails.roomId && userDetails.name) {
      socket.emit("join-room", userDetails);
    }
  };

  // Send chat message
  const sendMessage = (text) => {
    const message = {
      sender: userDetails.name,
      roomId: userDetails.roomId,
      text,
      time: new Date().toLocaleTimeString()
    };
    socket.emit("send-message", message);
    setMessages((prev) => [...prev, message]); // also add own message
  };

  // Mic toggle
  const toggleMic = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setMicOn(audioTrack.enabled);
    }
  };

  // Camera toggle
  const toggleCamera = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      setCameraOn(videoTrack.enabled);
    }
  };

  // Screen sharing toggle
  const toggleScreenSharing = () => {
    setIsScreenSharing(prev => !prev);
  };

  return (
    <RoomContext.Provider
      value={{
        userDetails,
        setUserDetails,
        socket,
        micOn,
        setMicOn,
        toggleMic,
        cameraOn,
        setCameraOn,
        toggleCamera,
        isScreenSharing,
        setIsScreenSharing,
        toggleScreenSharing,
        localStream,
        setLocalStream,
        localVideoRef,
        remoteVideoRef,
        joinRoom,
        sendMessage,
        messages
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};

export const useRoomContext = () => useContext(RoomContext);
