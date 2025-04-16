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

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  useEffect(() => {
    const socketInstance = io("http://localhost:5000"); // Replace with your server URL
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

  const toggleMic = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setMicOn(audioTrack.enabled);
    }
  };

  const toggleCamera = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      setCameraOn(videoTrack.enabled);
    }
  };

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
        remoteVideoRef
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};

export const useRoomContext = () => useContext(RoomContext);
