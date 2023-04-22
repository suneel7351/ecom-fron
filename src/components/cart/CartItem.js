import React from "react";
import "./Cart.css";
import Button from "@mui/material/Button";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import { addTocart } from "../../redux/product/addToCart";
import { removeItem } from "../../redux/product/addToCart";
import { Link } from "react-router-dom";

function CartItem({ item }) {

  const dispatch = useDispatch();
  const increase = (id, Stock, quantity) => {
    const newQty = quantity + 1;
    if (Stock <= quantity) {
      return;
    }
    dispatch(addTocart({ id, quantity: newQty }));
  };
  const hanldeRemoveItem = (id) => {
    dispatch(removeItem(id));
  };
  const decrease = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addTocart({ id, quantity: newQty }));
  };

  return (
    <>
      <div className="border-b border-slate-200 py-4 cart-items px-4">
        <div className="flex gap-3">
          <img
            src="https://rukminim1.flixcart.com/image/497/596/ky0g58w0/fabric/f/x/s/no-2-35-m-unstitched-na-tshirt-33-retail-store-original-imagacybfnb5cz9h.jpeg?q=50"
            alt={item.name}
            className="w-[100px]"
          />
          <div className="">
            <Link to={`/product/${item.product}`}>
              <h1 className="mb-4 font-bold text-slate-600">
                {item.name} | Lenovo IdeaPad 3 <br />
                Lenovo IdeaPad 3
              </h1>
            </Link>
            <Button
              onClick={() => hanldeRemoveItem(item.product)}
              variant="contained"
              size="small"
            >
              Remove
            </Button>
          </div>
        </div>
        <h1 className="pl-1">&#8377;{item.price}</h1>
        <div className="mr-4 w-20 flex items-center justify-center numeric-input-div text-white rounded-full py-1 my-1">
          <span
            onClick={() => decrease(item.product, item.quantity)}
            className="flex items-center justify-center text-xl w-4 cursor-pointer font-bold"
          >
            <RemoveIcon />
          </span>
          <input
            type="number"
            name=""
            id=""
            readOnly
            className="focus:ring-0 outline-none w-6 text-center"
            value={item.quantity}
          />
          <span
            onClick={() => increase(item.product, item.Stock, item.quantity)}
            className="flex items-center justify-center text-xl w-4 cursor-pointer font-bold"
          >
            <AddIcon />
          </span>
        </div>
        <h1 className="pl-2">&#8377;{item.quantity * item.price}</h1>
      </div>
      <div className="border border-slate-200 py-4 px-4 mobile-cart-item">
        <div className="">
          <img
            src="https://rukminim1.flixcart.com/image/497/596/ky0g58w0/fabric/f/x/s/no-2-35-m-unstitched-na-tshirt-33-retail-store-original-imagacybfnb5cz9h.jpeg?q=50"
            alt={item.name}
            className="w-[200px]"
          />
          <div className="">
            <Link to={`/product/${item.product}`}>
              {" "}
              <h1 className="mb-2 font-bold text-slate-600">
                {item.name} | Lenovo IdeaPad 3 <br />
                Lenovo IdeaPad 3
              </h1>
            </Link>
            <div className="flex flex-col gap-1 mb-2">
              {" "}
              <h1 className="">
                {" "}
                <span>Price:</span> &#8377;{item.price}
              </h1>
              <div className="flex items-center justify-center numeric-input-div text-white rounded-full px-2 py-1 my-1">
                <span
                  onClick={() => decrease(item.product, item.quantity)}
                  className="flex items-center justify-center text-xl w-16 cursor-pointer font-bold"
                >
                  <RemoveIcon />
                </span>
                <input
                  type="number"
                  name=""
                  id=""
                  readOnly
                  className="focus:ring-0 outline-none w-6 text-center"
                  value={item.quantity}
                />
                <span
                  onClick={() =>
                    increase(item.product, item.Stock, item.quantity)
                  }
                  className="flex items-center justify-center text-xl w-16 cursor-pointer font-bold"
                >
                  <AddIcon />
                </span>
              </div>
              <h1 className="">
                <span>Total Price:</span>&#8377;{item.quantity * item.price}
              </h1>
            </div>
            <Button
              variant="contained"
              size="small"
              onClick={() => hanldeRemoveItem(item.product)}
            >
              Remove
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartItem;
