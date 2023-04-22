import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const url = "/api/v1";
const productSlice = createSlice({
  name: "products",
  initialState: {
    data: [],
    loading: false,
    error: null,
    product: null,
    productCount: 0,
    resultPerPage: 0,
    filteredProducts: 0,
    success: false,
  },
  reducers: {
    clearMessage(state) {
      state.success = false;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.products;
        state.productCount = action.payload.productCount;
        state.resultPerPage = action.payload.resultPerPage;
        state.filteredProducts = action.payload.filteredProducts;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getSingleProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.product = null;
        state.error = action.payload;
      })
      .addCase(productReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(productReview.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
      })
      .addCase(productReview.rejected, (state, action) => {
        state.success = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
export const { clearError, clearMessage } = productSlice.actions;
// Thunk Middleware

export const getAllProducts = createAsyncThunk("/products", async (filter) => {
  try {
    let link;

    if (filter.category) {
      link = `products?keyword=${filter.keyword}&page=${filter.page}&price[gte]=${filter.price[0]}&price[lte]=${filter.price[1]}&category=${filter.category}&ratings[gte]=${filter.ratingValue}`;
    } else {
      link = `products?keyword=${filter.keyword}&page=${filter.page}&price[gte]=${filter.price[0]}&price[lte]=${filter.price[1]}&ratings[gte]=${filter.ratingValue}`;
    }

    const { data } = await axios.get(`${url}/${link}`);

    return data;
  } catch (error) {
    console.log(error);
  }
});

export const getSingleProduct = createAsyncThunk("/product", async (id) => {
  try {
    const { data } = await axios.get(`${url}/product/${id}`);
    return data.product;
  } catch (error) {
    console.log(error);
  }
});

export const productReview = createAsyncThunk(
  "/product/review",
  async (reviewData, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${url}/product/review`, reviewData, {
        headers: { "Content-Type": "application/json" },
      });
      return data.success;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
