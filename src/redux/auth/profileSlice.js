import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const url = "/api/v1";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    loading: false,
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
      .addCase(updateProfile.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(changePassword.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(sendResetPasswordToken.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(sendResetPasswordToken.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(sendResetPasswordToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(resetPassword.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default profileSlice.reducer;
export const { clearMessage, clearError } = profileSlice.actions;
export const updateProfile = createAsyncThunk(
  "/update/profile",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${url}/user/profile/update`,
        {
          name: userData.name,
          email: userData.email,
          avatar: userData.avatar,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      return data.message;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const changePassword = createAsyncThunk(
  "/update/password",
  async (password, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${url}/user/password/update`,
        {
          oldPassword: password.oldPassword,
          newPassword: password.newPassword,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      return data.message;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const sendResetPasswordToken = createAsyncThunk(
  "/reset/password/token",
  async (email, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${url}/user/password/reset/token`,
        {
          email,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      return data.message;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const resetPassword = createAsyncThunk(
  "/reset/password/",
  async (password, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${url}/user/password/forgot`,
        {
          password: password.password,
          confirmPassword: password.confirmPassword,
          token: password.token,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      return data.message;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
