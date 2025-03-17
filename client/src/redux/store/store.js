import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slice/UserSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ✅ Fixes possible serialization errors
    }),
});
