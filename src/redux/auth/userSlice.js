import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const url = "/api/v1";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    isAuthenticated: false,
    message: null,
    error: null,
  },
  reducers: {
    clearMessage(state) {
      state.message = null;
    },
    clearError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.isAuthenticated = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.message = action.payload.message;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.isAuthenticated = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.message = action.payload.message;
        state.user = action.payload.user;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      .addCase(profile.pending, (state) => {
        state.loading = true;
        state.isAuthenticated = false;
      })
      .addCase(profile.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(profile.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
        state.user = null;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.message = action.payload;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;

export const { clearError, clearMessage } = userSlice.actions;
export const login = createAsyncThunk(
  "user/login",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${url}/user/login`,
        { email: userData.email, password: userData.password },
        { headers: { "Content-Type": "application/json" } }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const register = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${url}/user/register`,
        {
          name: userData.name,
          email: userData.email,
          password: userData.password,
          avatar: userData.avatar,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const profile = createAsyncThunk(
  "user/me",
  async (demo, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${url}/user/profile`);
      return data.user;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const logout = createAsyncThunk(
  "user/logout",
  async (demo, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${url}/user/logout`);
      return data.message;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
