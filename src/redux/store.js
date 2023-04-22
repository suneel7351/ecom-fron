import { configureStore } from "@reduxjs/toolkit";
import profileSlice from "./auth/profileSlice";
import userSlice from "./auth/userSlice";
import productSlice from "./product/productSlice";
import addTocartSlice from "./product/addToCart";
import orderSlice from "./order/orderSlice";
import ProductSlice from "./admin/ProductSlice";
import adminOrderSlice from "./admin/orderSlice";
import AdminUserSlice from "./admin/AdminUserSlice";
import reviewsSlice from "./admin/reviewsSlice";
const store = configureStore({
  reducer: {
    products: productSlice,
    user: userSlice,
    profile: profileSlice,
    cart: addTocartSlice,
    order: orderSlice,
    admin: ProductSlice,
    adminOrder: adminOrderSlice,
    adminUser: AdminUserSlice,
    reviews: reviewsSlice,
  },
});

export default store;
