import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../redux/product/addToCart";
import "./payment.css";

import Metadata from "../Metadata";
import CheckoutStep from "./CheckoutStep";
import { Button, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { clearError, createOrder } from "../../redux/order/orderSlice";

function Payment() {
  const [status, setStatus] = useState("");
  const [key, setKey] = useState("");
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.order);
  const { cartItems, shipping } = useSelector((state) => state.cart);
  const payBtn = useRef(null);
  const dispatch = useDispatch();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const order = {
    shippingInfo: shipping,
    orderItems: cartItems,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharge,
    itemsPrice: orderInfo.subTotal,
    totalPrice: orderInfo.totalPrice,
  };
  const submitHandler = async (e) => {
    setStatus("processing");
    e.preventDefault();
    if (key) {
      try {
        const response = await axios.post(
          `https://ecom-w0cc.onrender.com/api/v1/create-order`,
          { amount: orderInfo.totalPrice },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        const { data } = response;

        const options = {
          key,
          amount: data.order.amount,
          currency: "INR",
          name: "Eng->Ecommerce",
          description: "Test Payment",
          image:
            "https://cdn.pixabay.com/photo/2017/04/03/15/51/dollar-sign-2198767_960_720.png",
          order_id: data.order.id,
          handler: async function (response) {
            const {
              razorpay_payment_id,
              razorpay_order_id,
              razorpay_signature,
            } = response;
            // Verify the payment signature
            await axios
              .post(
                `https://ecom-w0cc.onrender.com/api/v1/verify`,
                {
                  razorpay_payment_id,
                  razorpay_order_id,
                  razorpay_signature,
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                  withCredentials: true,
                }
              )
              .then((response) => {
                if (response.data.success === true) {
                  order.paymentInfo = {
                    id: response.data.id,
                    status: "active",
                  };

                  dispatch(createOrder(order));
                  setStatus("active");
                  dispatch(clearCart());
                  navigate(`/payment/success?reference=${response.data.id}`);
                } else {
                  setStatus("fail");
                  navigate("/payment/fail");
                }
              })
              .catch((error) => {
                console.log(error);
              });
          },

          prefill: {
            email: user && user.email,
          },

          theme: {
            color: "#FFA500",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    async function getKey() {
      const { data } = await axios.get(`/api/v1/getKey`);
      setKey(data.key);
    }
    getKey();
  }, [dispatch, error]);
  return (
    <>
      <Metadata title="Payment" />
      <CheckoutStep activeStep={2} />
      <div className="lg:w-[30%] md:w-[40%] w-[96%] mx-auto p-3 md:p-8">
        <form className="" onSubmit={submitHandler}>
          <h1 className="text-center text-3xl border-b border-slate-200 pb-2 w-[150px] mx-auto">
            Payment
          </h1>

          <Button
            ref={payBtn}
            type="submit"
            variant="contained"
            style={{ backgroundColor: "#fe5f1e" }}
          >
            {status === "processing" ? (
              <CircularProgress style={{ color: "#fff" }} size={24} />
            ) : (
              <>Pay - &#8377;{orderInfo && orderInfo.totalPrice}</>
            )}
          </Button>
        </form>
      </div>
    </>
  );
}

export default Payment;
