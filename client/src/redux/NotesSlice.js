import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl =
  import.meta.env.MODE === "production" ? apiUrl : "http://localhost:3000";
/*
  //     Send data via url
  //     const userId = userData.userData.user._id;
  //     const res = await axios.get(`https://docket-server.vercel.app/api/read?id=${userId}
  //     `);

  //     Use req.query to access parameters

  //     const { id } = req.query;

  //     
*/

export const fetch = createAsyncThunk(
  "auth/fetch",
  async (id, { rejectWithValue, getState }) => {
    const { userData } = getState().auth;
    try {
      const response = await axios.post(
        `${apiUrl}/api/read`,
        {
          id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Fetching Failed: ", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const create = createAsyncThunk(
  "auth/create",
  async (data, { rejectWithValue, getState }) => {
    const { userData } = getState().auth;
    try {
      const response = await axios.post(`${apiUrl}/api/create`, data, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Couldn't Create Note: ", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const update = createAsyncThunk(
  "auth/update",
  async (data, { rejectWithValue, getState }) => {
    const { userData } = getState().auth;
    try {
      const response = await axios.put(`${apiUrl}/api/update`, data, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Couldn't Create Note: ", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteNote = createAsyncThunk(
  "auth/delete",
  async (details, { rejectWithValue, getState }) => {
    const { userData } = getState().auth;
    try {
      const response = await axios.delete(`${apiUrl}/api/delete`, {
        data: { id: details.id, userId: details.userId },
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Couldn't Create Note: ", error);
      return rejectWithValue(error.response.data);
    }
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetch.fulfilled, (state, action) => {
        state.loading = false;
        state.AllCards = action.payload.data;
      })
      .addCase(fetch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(create.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(create.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.message;
      })
      .addCase(create.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(deleteNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.message;
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(update.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(update.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.message;
      })
      .addCase(update.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { NotesData, searchQuery } = NotesSlice.actions;

export default NotesSlice.reducer;
