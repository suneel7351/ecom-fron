import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
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
      const { data } = await axios.get("/api/v1/admin/orders");
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
      const { data } = await axios.delete(`/api/v1/admin/order/${id}`);
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
        `/api/v1/admin/order/${order.id}`,
        {
          status: order.status,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
