import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const NotesSlice = createSlice({
  name: "Notes",
  initialState: {
    data: {
      id: "",
      title: "",
      content: "",
      date: "",
      color: "",
    },
    AllCards: [],
    search: "",
    status: "idle",
    error: null,
  },
  reducers: {
    NotesData: (state, action) => {
      state.data = { ...state.data, ...action.payload };
    },
    searchQuery: (state, action) => {
      state.search = action.payload;
    },
    getAllNotes: (state, action) => {
      state.AllCards = action.payload;
    },
  },
});

export const { NotesData, searchQuery, getAllNotes } = NotesSlice.actions;

export default NotesSlice.reducer;
