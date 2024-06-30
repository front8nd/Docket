import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch notes for the logged-in user
export const fetchNotes = createAsyncThunk(
  "notes/fetchNotes",
  async (_, { getState }) => {
    const { auth } = getState();
    const response = await axios.get("http://localhost:3000/api/notes", {
      headers: { Authorization: `Bearer ${auth.token}` },
    });
    return response.data;
  }
);

// Add a new note
export const addNote = createAsyncThunk(
  "notes/addNote",
  async (note, { getState }) => {
    const { auth } = getState();
    const response = await axios.post("http://localhost:3000/api/notes", note, {
      headers: { Authorization: `Bearer ${auth.token}` },
    });
    return response.data;
  }
);

// Update an existing note
export const updateNote = createAsyncThunk(
  "notes/updateNote",
  async (note, { getState }) => {
    const { auth } = getState();
    const response = await axios.put(
      `http://localhost:3000/api/notes/${note.id}`,
      note,
      {
        headers: { Authorization: `Bearer ${auth.token}` },
      }
    );
    return response.data;
  }
);

// Delete a note
export const deleteNote = createAsyncThunk(
  "notes/deleteNote",
  async (id, { getState }) => {
    const { auth } = getState();
    const response = await axios.delete(
      `http://localhost:3000/api/notes/${id}`,
      {
        headers: { Authorization: `Bearer ${auth.token}` },
      }
    );
    return response.data;
  }
);

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.AllCards = action.payload;
        state.status = "succeeded";
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.AllCards.push(action.payload);
        state.status = "succeeded";
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        const index = state.AllCards.findIndex(
          (note) => note.id === action.payload.id
        );
        if (index !== -1) {
          state.AllCards[index] = action.payload;
        }
        state.status = "succeeded";
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.AllCards = state.AllCards.filter(
          (note) => note.id !== action.payload.id
        );
        state.status = "succeeded";
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      );
  },
});

export const { NotesData, searchQuery, getAllNotes } = NotesSlice.actions;

export default NotesSlice.reducer;
