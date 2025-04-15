import { apiSlice } from "../apiSlice"; 
const MEET_URL = "/meet"; 

export const meetApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    startMeeting: builder.mutation({
      query: (roomId) => ({
        url: `${MEET_URL}/start`,
        method: "POST",
        body: { roomId }, 
        credentials: 'include',
        
      }),
    }),

    sendMessage: builder.mutation({
      query: ({ roomId, message }) => ({
        url: `${MEET_URL}/send-message`,
        method: "POST",
        body: { roomId, message }, 
      }),
    }),
  }),
});

export const {
  useStartMeetingMutation,
  useSendMessageMutation,
} = meetApiSlice;
