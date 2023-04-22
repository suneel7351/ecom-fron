import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const productSlice = createSlice({
  name: "/admin/productslice",
  initialState: {
    products: [],
    error: null,
    loading: false,
    success: false,
    product: {},
  },
  reducers: {
    clearError(state) {
      state.error = null;
    },
    clearMessage(state) {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.error = action.payload;
        state.products = null;
        state.loading = false;
      })
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.suceess;
        state.product = action.payload.product;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProductStock.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProductStock.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
      })
      .addCase(updateProductStock.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
export const { clearMessage, clearError } = productSlice.actions;
export const getAllProducts = createAsyncThunk(
  "/admin/products",
  async (x, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/admin/products");
      return data.products;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const createProduct = createAsyncThunk(
  "/admin/product/new",
  async (productData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "/api/v1/admin/product/new",
        productData,
        { headers: { "Content-Type": "application/json" } }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const updateProduct = createAsyncThunk(
  "/admin/product/update",
  async (productData, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `/api/v1/admin/product/${productData.id}`,
        productData.myForm,
        { headers: { "Content-Type": "application/json" } }
      );
      return data.success;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const updateProductStock = createAsyncThunk(
  "/admin/product/stock",
  async (productData, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `/api/v1/admin/product/stock/${productData.id}`,
        { stock: productData.stock },
        { headers: { "Content-Type": "application/json" } }
      );
      return data.success;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const deleteProduct = createAsyncThunk(
  "/admin/product/delete",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/v1/admin/product/${id}`);
      return data.success;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
