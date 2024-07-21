import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// const apiUrl =
//   import.meta.env.MODE === "production"
//     ? "https://docket-server.vercel.app"
//     : "http://localhost:3000";
const apiUrl = import.meta.env.VITE_API_URL;

console.log(import.meta.env.VITE_API_URL);

const userData = sessionStorage.getItem("userData");
const parsedUserData = userData ? JSON.parse(userData) : null;

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiUrl}/api/login`, credentials);
      return response.data;
    } catch (error) {
      console.error("Login Failed: ", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiUrl}/api/register`, credentials);
      return response.data;
    } catch (error) {
      console.error("Registration Failed: ", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (credentials, { rejectWithValue, getState }) => {
    const { userData } = getState().auth;
    try {
      const response = await axios.post(
        `${apiUrl}/api/acc_password`,
        credentials,
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Change Password Failed: ", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const changeEmail = createAsyncThunk(
  "auth/changeEmail",
  async (credentials, { rejectWithValue, getState }) => {
    const { userData } = getState().auth;

    try {
      const response = await axios.post(
        `${apiUrl}/api/acc_email`,
        credentials,
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Change Email Failed: ", error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const deleteUser = createAsyncThunk(
  "auth/deleteUser",
  async (credentials, { rejectWithValue, getState }) => {
    const { userData } = getState().auth;
    try {
      const response = await axios.delete(`${apiUrl}/api/acc_delete`, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
        data: credentials, // Send credentials in the body
      });
      return response.data;
    } catch (error) {
      console.error("Account could'nt be deleted: ", error);
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
    Success: null,
  },
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.userData = null;
      sessionStorage.removeItem("userData");
    },
    resetSuccess(state) {
      state.Success = null;
      state.registrationSuccess = null;
      state.error = null;
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
        state.loading = false;
        state.registrationSuccess = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.registrationSuccess = false;
        state.registrationError = action.payload;
      })
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.Success = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.Success = action.payload;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(changeEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.Success = null;
      })
      .addCase(changeEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.Success = action.payload;
        state.userData.user.email = action.payload.data;
        sessionStorage.setItem("userData", JSON.stringify(state.userData));
      })
      .addCase(changeEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.Success = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.Success = action.payload;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, resetSuccess } = authSlice.actions;
export default authSlice.reducer;
