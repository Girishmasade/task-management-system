import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// ✅ Fetch User Data
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (backendURL, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${backendURL}/api/user/data`, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch user data");
    }
  }
);

// ✅ Logout User
export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (backendURL, { rejectWithValue }) => {
    try {
      await axios.post(`${backendURL}/api/auth/logout`, {}, { withCredentials: true });
      return true;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to logout");
    }
  }
);

// ✅ Resend OTP
export const resendOTPAction = createAsyncThunk(
  "user/resendOTP",
  async (userId, { rejectWithValue }) => {
    try {
      if (!userId) throw new Error("User ID is missing. Please log in again.");

      const { data } = await axios.post(`/api/auth/send-verify-otp`, { userId });

      if (data.success) {
        toast.success("OTP resent successfully. Check your email!");
      }
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to resend OTP.");
      return rejectWithValue(error.response?.data || "Something went wrong.");
    }
  }
);

// ✅ Verify OTP
export const verifyOTPAction = createAsyncThunk(
  "user/verifyOTP",
  async ({ otp, navigate }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/api/auth/verify-email`, { otp });

      if (data.success) {
        toast.success("Email verified successfully!");
        navigate("/");
      }
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "OTP verification failed.");
      return rejectWithValue(error.response?.data || "Something went wrong.");
    }
  }
);

// ✅ User Slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isAuthenticated: false,
    isAccountVerified: false,
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
        state.isAccountVerified = action.payload.user?.isAccountVerified || false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.isAccountVerified = false;
      })

      .addCase(resendOTPAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(resendOTPAction.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resendOTPAction.rejected, (state) => {
        state.loading = false;
      })

      .addCase(verifyOTPAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyOTPAction.fulfilled, (state) => {
        state.loading = false;
        state.isAccountVerified = true;
      })
      .addCase(verifyOTPAction.rejected, (state) => {
        state.loading = false;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isAccountVerified = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
