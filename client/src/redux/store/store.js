import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/authSlice";
import { apiSlice } from "../slice/apiSlice";
import meetingReducer from "../slice/meetSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    meeting: meetingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
