import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const url = "https://ecom-w0cc.onrender.com/api/v1";
const AdminUserSlice = createSlice({
  name: "userSlice",
  initialState: {
    users: [],
    message: null,
    error: null,
    loading: false,
    user: null,
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
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.users = null;
        state.error = action.payload;
      })
      .addCase(updateUserRole.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(updateUserRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
      });
  },
});

export default AdminUserSlice.reducer;
export const { clearError, clearMessage } = AdminUserSlice.actions;

export const getAllUsers = createAsyncThunk(
  "/admin/users",
  async (x, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${url}/admin/users`, {
        withCredentials: true,
      });
      return data.users;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateUserRole = createAsyncThunk(
  "/admin/user/update",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${url}/admin/user/${userData.id}`,
        { role: userData.role },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      return data.message;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const getUserDetails = createAsyncThunk(
  "/admin/user/:id",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${url}/admin/user/${id}`, {
        withCredentials: true,
      });
      return data.user;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "/admin/user/delete",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`${url}/admin/user/${id}`, {
        withCredentials: true,
      });
      return data.message;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
