import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slice/UserSlice";
import taskReducer from "../slice/TaskSlice"; // Import the new task reducer

export const store = configureStore({
  reducer: {
    user: userReducer,
    task: taskReducer, // Add the task reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ✅ Fixes possible serialization errors
    }),
});
