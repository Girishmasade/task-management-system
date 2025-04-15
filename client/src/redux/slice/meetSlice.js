// src/redux/slice/meetSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roomId: null,
  messages: [],
  participants: [],
  isMeetingStarted: false,
};

const meetSlice = createSlice({
  name: "meeting",
  initialState,
  reducers: {
    setRoomId: (state, action) => {
      state.roomId = action.payload;
    },
    toggleMeetingStatus: (state, action) => {
      state.isMeetingStarted = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setParticipants: (state, action) => {
      state.participants = action.payload;
    },
  },
});

export const { setRoomId, addMessage, toggleMeetingStatus, setParticipants } = meetSlice.actions;

export default meetSlice.reducer;
