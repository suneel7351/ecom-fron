import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const url = "https://ecom-w0cc.onrender.com/api/v1";
const adminOrderSlice = createSlice({
  name: "orderslice",
  initialState: {
    orders: [],
    message: null,
    error: null,
    loading: false,
  },
  reducers: {
    clearError(state) {
      state.error = null;
    },
    clearMessage(state) {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.orders = payload.orders;
      })
      .addCase(getAllOrders.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.orders = null;
      })
      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrder.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.message = payload.message;
      })
      .addCase(updateOrder.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteOrder.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.message = payload.message;
      })
      .addCase(deleteOrder.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { clearError, clearMessage } = adminOrderSlice.actions;
export default adminOrderSlice.reducer;

export const getAllOrders = createAsyncThunk(
  "/admin/orders",
  async (x, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${url}/admin/orders`, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const deleteOrder = createAsyncThunk(
  "/admin/order/delete",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`${url}/admin/order/${id}`, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const updateOrder = createAsyncThunk(
  "/admin/order/update",
  async (order, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${url}/admin/order/${order.id}`,
        {
          status: order.status,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
