import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async action to fetch user details
export const fetchUser = createAsyncThunk("user/fetchUser", async (_, { rejectWithValue, getState }) => {
  try {
    const { backendURL } = getState().app; // Access context/config from state
    const { data } = await axios.get(`${backendURL}/api/user/data`, { withCredentials: true });
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to fetch user data");
  }
});

// Async action for login
export const login = createAsyncThunk("user/login", async (credentials, { rejectWithValue, getState }) => {
  try {
    const { backendURL } = getState().app;
    const { data } = await axios.post(`${backendURL}/api/user/login`, credentials, { withCredentials: true });
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Login failed");
  }
});

// Async action for logout
export const logout = createAsyncThunk("user/logout", async (_, { rejectWithValue, getState }) => {
  try {
    const { backendURL } = getState().app;
    await axios.post(`${backendURL}/api/user/logout`, {}, { withCredentials: true });
    return null;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Logout failed");
  }
});

// This is the User slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
