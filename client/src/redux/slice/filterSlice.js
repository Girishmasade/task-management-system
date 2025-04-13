// slice/filterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    stageFilter: "",
    isTrashed: false,
    searchQuery: "",
  },
  reducers: {
    setStageFilter: (state, action) => {
      state.stageFilter = action.payload;
    },
    setIsTrashed: (state, action) => {
      state.isTrashed = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setStageFilter, setIsTrashed, setSearchQuery } = filterSlice.actions;
export default filterSlice.reducer;
