import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const url = "/api/v1";

const addTocartSlice = createSlice({
  name: "Cart",
  initialState: {
    loading: false,
    cartItems: localStorage.getItem("cartItem")
      ? JSON.parse(localStorage.getItem("cartItem"))
      : [],
    shipping: localStorage.getItem("shipping")
      ? JSON.parse(localStorage.getItem("shipping"))
      : {},
  },
  reducers: {
    clearCart(state) {
      state.cartItems = [];
      localStorage.setItem("cartItem", JSON.stringify(state.cartItems));
    },
    removeItem(state, action) {
      state.cartItems = state.cartItems.filter((item) => {
        return item.product !== action.payload;
      });
      localStorage.setItem("cartItem", JSON.stringify(state.cartItems));
    },
    addShippingInfo(state, action) {
      state.shipping = action.payload;
      localStorage.setItem("shipping", JSON.stringify(state.shipping));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTocart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTocart.fulfilled, (state, action) => {
        state.loading = false;
        const item = action.payload;
        const isExist = state.cartItems.find((i) => i.product === item.product);
        if (isExist) {
          state.cartItems = state.cartItems.map((i) =>
            i.product === isExist.product ? item : i
          );
        } else {
          state.cartItems = [...state.cartItems, item];
        }
        localStorage.setItem("cartItem", JSON.stringify(state.cartItems));
      });
  },
});

export default addTocartSlice.reducer;
export const { removeItem, clearCart, addShippingInfo } =
  addTocartSlice.actions;
export const addTocart = createAsyncThunk("/addToCart", async (productData) => {
  try {
    const { data } = await axios.get(`${url}/product/${productData.id}`);
    const payload = {
      product: data.product._id,
      name: data.product.name,
      image: data.product.images[0] ? data.product.images[0].url : "suneel",
      price: data.product.price,
      quantity: productData.quantity,
      Stock: data.product.Stock,
    };

    return payload;
  } catch (error) {
    console.log(error);
  }
});
