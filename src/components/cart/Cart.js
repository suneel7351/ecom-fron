import React from "react";
import CartItem from "./CartItem";
import { useSelector, useDispatch } from "react-redux";
import "./Cart.css";
import { Button } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Link, useNavigate } from "react-router-dom";
import { clearCart } from "../../redux/product/addToCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import MetaData from "../Metadata";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems, loading } = useSelector((state) => state.cart);
  const handlerclearCart = () => {
    dispatch(clearCart());
  };
  const checkOutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  return (
    <>
      {loading ? (
        <p>Loading</p>
      ) : (
        <>
          <MetaData title="cart-eccomerce" />
          {cartItems && cartItems.length > 0 ? (
            <div className="md:w-[90%] w-[99%] mx-auto py-8 flex flex-col gap-4 px-4">
              <h1 className="text-center text-3xl mb-8">Shopping Cart</h1>
              <div className="titles border-b border-slate-200 pb-4 px-4">
                <h1 className="">Product</h1>
                <h1 className="">Price</h1>
                <h1 className="">Quantity</h1>
                <h1 className="">Total</h1>
              </div>
              <div className="cart-item-container">
                {cartItems.length > 0 &&
                  cartItems.map((item) => {
                    return <CartItem item={item} key={item.product} />;
                  })}
              </div>
              <div className="flex justify-between px-4 flex-wrap-reverse mt-4 gap-4">
                <div>
                  <button
                    className="border border-slate-200 text-slate-700 px-4 py-1 shadow-sm"
                    onClick={handlerclearCart}
                  >
                    Clear Cart
                  </button>
                </div>
                <div className="w-[200px] flex flex-col gap-4">
                  <div className="flex justify-between border-b border-slate-200 pb-2 px-2">
                    {" "}
                    <h1 className="font-bold">Subtotal:</h1>
                    <h1 className="font-bold">
                      &#8377;
                      {`${cartItems.reduce(
                        (acc, item) => acc + item.quantity * item.price,
                        0
                      )}`}
                    </h1>
                  </div>
                  <Button variant="contained" onClick={checkOutHandler}>
                    Check out
                  </Button>
                  <Link to="/products" className="text-slate-600 mt-2">
                    <KeyboardBackspaceIcon /> <span>Continue Shopping</span>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center flex-col gap-4 h-[88vh]">
              <RemoveShoppingCartIcon
                style={{ fontSize: "150px", color: "#fe5f1e" }}
              />
              <h1 className="text-center text-4xl text-slate-600">
                Your Cart is Empty...
              </h1>
              <Link to="/products" className="text-slate-600 text-xl">
                <KeyboardBackspaceIcon /> <span>Continue Shopping</span>
              </Link>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Cart;
