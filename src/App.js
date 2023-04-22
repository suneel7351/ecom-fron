import React, { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Product from "./components/product/Product";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { useDispatch, useSelector } from "react-redux";
import { profile } from "./redux/auth/userSlice";
import Products from "./components/product/Products";
import Profile from "./components/account/Profile";
import EditProfile from "./components/account/EditProfile";
import UpdatePassword from "./components/account/UpdatePassword";
import Cart from "./components/cart/Cart";
import ForogtPassword from "./components/account/ForogtPassword";
import PasswordReset from "./components/account/PasswordReset";
import Shipping from "./components/cart/Shipping";
import ConfrimOrder from "./components/cart/ConfrimOrder";

import Payment from "./components/cart/Payment";

import Success from "./components/cart/Success";
import Fail from "./components/cart/Fail";
import Order from "./components/order/Order";
import OrderDetails from "./components/order/OrderDetails";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import Admin from "./components/admin/Admin";
import AllProducts from "./components/admin/AllProducts";
import AddProduct from "./components/admin/AddProduct";
import UpdateProduct from "./components/admin/UpdateProduct";
import AllOrders from "./components/admin/AllOrders";
import AdminOrderDetails from "./components/admin/AdminOrderDetails";
import User from "./components/admin/User";
import UserDetails from "./components/admin/UserDetails";
import Reviews from "./components/admin/Reviews";
import UpdateStock from "./components/admin/UpdateStock";
import Notfound from "./components/Notfound";
function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);
  // window.addEventListener("contextmenu", (e) => {
  //   e.preventDefault();
  // });
  return (
    <Router>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route
          path="/profile"
          element={<ProtectedRoute Component={Profile} />}
        />{" "}
        <Route
          path="/update/profile"
          element={<ProtectedRoute Component={EditProfile} />}
        />
        <Route
          path="/update/password"
          element={<ProtectedRoute Component={UpdatePassword} />}
        />
        <Route path="/forgot/password" element={<ForogtPassword />} />
        <Route path="/password/reset/:token" element={<PasswordReset />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/shipping"
          element={<ProtectedRoute Component={Shipping} />}
        />
        <Route
          exact
          path="/order/confirm"
          element={<ProtectedRoute Component={ConfrimOrder} />}
        />
        {/* {isAuthenticated && stripeApiKey && ( */}
        <Route
          path="/process/payment"
          element={
            // <Elements stripe={loadStripe(stripeApiKey)}>
            <ProtectedRoute Component={Payment} />
            // </Elements>
          }
        />
        {/* // )} */}
        <Route
          path="/payment/success"
          element={<ProtectedRoute Component={Success} />}
        />{" "}
        <Route
          path="/payment/fail"
          element={<ProtectedRoute Component={Fail} />}
        />
        <Route path="/orders" element={<ProtectedRoute Component={Order} />} />
        <Route
          exact
          path="/order/:id"
          element={<ProtectedRoute Component={OrderDetails} />}
        />
        <Route
          exact
          path="/admin/dashboard"
          element={<ProtectedRoute isAdmin={true} Component={Admin} />}
        />{" "}
        <Route
          exact
          path="/admin/products"
          element={<ProtectedRoute isAdmin={true} Component={AllProducts} />}
        />
        <Route
          exact
          path="/admin/product/new"
          element={<ProtectedRoute isAdmin={true} Component={AddProduct} />}
        />{" "}
        <Route
          exact
          path="/admin/product/:id"
          element={<ProtectedRoute isAdmin={true} Component={UpdateProduct} />}
        />{" "}
        <Route
          exact
          path="/admin/orders"
          element={<ProtectedRoute isAdmin={true} Component={AllOrders} />}
        />
        <Route
          exact
          path="/admin/order/:id"
          element={
            <ProtectedRoute isAdmin={true} Component={AdminOrderDetails} />
          }
        />{" "}
        <Route
          exact
          path="/admin/users"
          element={<ProtectedRoute isAdmin={true} Component={User} />}
        />
        <Route
          exact
          path="/admin/user/:id"
          element={<ProtectedRoute isAdmin={true} Component={UserDetails} />}
        />{" "}
        <Route
          exact
          path="/admin/reviews"
          element={<ProtectedRoute isAdmin={true} Component={Reviews} />}
        />{" "}
        <Route
          exact
          path="/admin/product/stock/:id"
          element={<ProtectedRoute isAdmin={true} Component={UpdateStock} />}
        />
        <Route
          path="*"
          element={
            window.location.pathname === "/process/payment" ? null : (
              <Notfound />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
