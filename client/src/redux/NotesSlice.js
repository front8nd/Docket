import { createSlice } from "@reduxjs/toolkit";

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
  },
  reducers: {
    NotesData: (state, action) => {
      state.data = { ...state.data, ...action.payload };
      console.log(state.data);
    },
    getAllNotes: (state, action) => {
      state.AllCards = action.payload;
    },
    searchQuery: (state, action) => {
      state.search = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { NotesData, getAllNotes, searchQuery } = NotesSlice.actions;

export default NotesSlice.reducer;
