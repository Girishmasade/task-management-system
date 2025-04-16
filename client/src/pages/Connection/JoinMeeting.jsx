import React from 'react'
import { useRoomContext } from '../../context/RoomContext'

const JoinMeeting = () => {
  const {
    localVideoRef,
    remoteVideoRef,
    peer,
    localStream,
    setLocalStream,
  } = useRoom();
  return (
    <div>
      
    </div>
  )
}

export default JoinMeeting
