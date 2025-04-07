import { createSlice } from "@reduxjs/toolkit";
import { user } from "../../assets/data";

const initialState = {
  user: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : user,
  isSidebarOpen: false,
  isAccountVerified: localStorage.getItem("isAccountVerified")
    ? JSON.parse(localStorage.getItem("isAccountVerified"))
    : false, 
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      console.log("User set in Redux:", action.payload);

      state.user = action.payload.user;
      state.isAccountVerified = action.payload.isAccountVerified || false;

      localStorage.setItem("userInfo", JSON.stringify(action.payload.user));
      localStorage.setItem("isAccountVerified", JSON.stringify(state.isAccountVerified));
    },

    setAccountVerified: (state, action) => {
      state.isAccountVerified = action.payload;
      localStorage.setItem("isAccountVerified", JSON.stringify(action.payload));
    },

    logout: (state) => {
      console.log("User logged out!");

      state.user = null;

      state.isAccountVerified = false;

      localStorage.removeItem("userInfo");
      localStorage.removeItem("isAccountVerified");
    },

    setOpenSidebar: (state, action) => {
      state.isSidebarOpen = action.payload;
    },
  },
});

export const { setCredentials, logout, setOpenSidebar, setAccountVerified } = authSlice.actions;

export default authSlice.reducer;
