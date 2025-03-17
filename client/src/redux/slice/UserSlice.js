import { createSlice,  createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const {backendURL} = useContext(AppContext)

export const fetchUser = createAsyncThunk("user/fetchUser", async(_, {rejectWithValue}) => {
    try {
        const {data} = await axios(`${backendURL}/api/user/data`, {withCredentials: true});
        return data
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to fetch user data")
    }
})

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        isAuthenticated: false,
        isAccountVerified: false,
        loading: false,
        error: false
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.isAccountVerified = false;
        }
    },

    extraReducers: (builder)=> {
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
          });
    }
})

export const { logout } = userSlice.actions;
export default userSlice.reducer;