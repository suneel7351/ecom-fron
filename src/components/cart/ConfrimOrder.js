import React from "react";
import MetaData from "../Metadata";
import CheckoutStep from "./CheckoutStep";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
function ConfrimOrder() {
  const navigate = useNavigate();
  const { cartItems, shipping } = useSelector((state) => state.cart);
  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const shippingCharge = subTotal > 1000 ? 0 : 100;
  const tax = subTotal * 0.18;
  const totalPrice = shippingCharge + tax + subTotal;
  const address = `${shipping.city},${shipping.state},${shipping.country}`;
  const phone = `${shipping.phoneNo}`;
  const proceddToPayment = () => {
    const data = {
      tax,
      subTotal,
      totalPrice,
      shippingCharge,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/process/payment");
  };
  return (
    <>
      <CheckoutStep activeStep={1} />
      <MetaData title="confrim order" />

      <div className="flex container mx-auto md:flex-row flex-col pb-8">
        <div className="flex-1 md:flex-[2.2_2.2_0] border-r border-slate-200">
          <div className="px-4 md:px-0">
            <h1 className="text-2xl mb-4">Shopping Info:</h1>
            <div className="pl-8">
              <h1>
                {" "}
                <b>Name:</b> suneel rajput
              </h1>{" "}
              <h1 className="my-2">
                {" "}
                <b>Phone:</b> {phone}
              </h1>{" "}
              <h1>
                {" "}
                <b>Address:</b> {address}
              </h1>
            </div>
          </div>
          <div className="px-1 md:px-0">
            <h1 className="text-2xl mt-4 mb-8 pl-3 md:pl-0">
              Your Cart Items:
            </h1>
            <div className="w-[98%] md:w-[90%] flex flex-col gap-4 pl-2 md:pl-8 mx-auto md:mx-0">
              {cartItems.map((item) => {
                return (
                  <div
                    key={item.product}
                    className="flex justtify-start gap-3 md:gap-0 items-center md:justify-between"
                  >
                    <div className="flex gap-2 md:gap-8 items-center md:flex-row flex-col">
                      <img
                        src="https://rukminim1.flixcart.com/image/497/596/ky0g58w0/fabric/f/x/s/no-2-35-m-unstitched-na-tshirt-33-retail-store-original-imagacybfnb5cz9h.jpeg?q=50"
                        alt={item.name}
                        className="w-[50px]"
                      />
                      <span className="text-slate-700 text-xl w-full">
                        {item.name.substring(0,40)}
                      </span>
                    </div>
                    <div>
                      <p>
                        {item.quantity}X&#8377;{item.price}=
                        <b> &#8377;{item.quantity * item.price}</b>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex-1 ">
          <div className="flex  flex-col w-[80%] md:w-[90%] lg:w-[70%] mx-auto gap-6">
            {" "}
            <h1 className="text-2xl text-center">Order Summary</h1>
            <div className="flex flex-col gap-4 border-y border-slate-200 py-6">
              <p className="flex justify-between">
                <span>Subtotal</span>
                <span>{subTotal}</span>
              </p>
              <p className="flex justify-between">
                <span>Tax</span>
                <span>{tax}</span>
              </p>
              <p className="flex justify-between">
                <span>Shipping Charge</span>
                <span>{shippingCharge}</span>
              </p>
            </div>
            <div>
              <p className="flex justify-between">
                <span>
                  <b>Total</b>
                </span>
                <span>
                  <b>{totalPrice}</b>
                </span>
              </p>
            </div>
            <Button
              onClick={proceddToPayment}
              variant="contained"
              style={{ backgroundColor: "#fe5f1e" }}
            >
              Proceed To Payment
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConfrimOrder;
