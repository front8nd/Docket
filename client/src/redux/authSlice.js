import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const userData = sessionStorage.getItem("userData");
const parsedUserData = userData ? JSON.parse(userData) : false;

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/login",
        credentials
      );
      return response.data;
    } catch (error) {
      console.log("Login Failed: ", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://docket-server.vercel.app/api/register",
        credentials
      );
      return response.data;
    } catch (error) {
      console.log("Registration Failed: ", error);
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: !!parsedUserData,
    userData: parsedUserData,
    loading: false,
    error: null,
    registrationSuccess: null,
    registrationError: null,
  },
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.userData = null;
      sessionStorage.removeItem("userData");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.userData = action.payload;
        sessionStorage.setItem("userData", JSON.stringify(action.payload));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.registrationError = null;
        state.registrationSuccess = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.registrationSuccess = true;
        state.loading = false;
        // console.log(action.payload); it contains response.data
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.registrationSuccess = false;
        state.registrationError = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
