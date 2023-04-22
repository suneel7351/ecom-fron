import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError, orderDetails } from "../../redux/order/orderSlice";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import {
  clearMessage,
  updateOrder,
  clearError as clearAdminOrderError,
} from "../../redux/admin/orderSlice";
function AdminOrderDetails() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const { order, loading, error } = useSelector((state) => state.order);
  const { message, error: adminOrderError } = useSelector(
    (state) => state.adminOrder
  );
  const dialogToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };
  const updateOrderhandler = async (e) => {
    e.preventDefault();
    await dispatch(updateOrder({ id, status }));
    setOpen(false);
  };
  useEffect(() => {
    dispatch(orderDetails(id));
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (adminOrderError) {
      toast.error(adminOrderError);
      dispatch(clearAdminOrderError());
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
  }, [id, dispatch, error, message, adminOrderError]);
  return (
    <>
      {loading ? (
        <p>Loading</p>
      ) : (
        <>
          <div className="admin-container">
            <div className="sidebar border-r border-slate-200 flex-1">
              <Sidebar />
            </div>
            <div className="main-container pt-4 pl-1">
              {order && (
                <div className="py-2">
                  <div className="pl-4 md:pl-12 flex flex-col gap-4">
                    <div className="flex justify-between flex-wrap gap-4">
                      {" "}
                      <h1 className="text-[#fe5f1e] text-xl md:text-3xl">
                        Order #{order._id}
                      </h1>
                      {order.orderStatus !== "Delivered" && (
                        <Button
                          style={{ backgroundColor: "#fe5f1e" }}
                          variant="contained"
                          onClick={dialogToggle}
                        >
                          Update Order
                        </Button>
                      )}
                    </div>
                    {order.shippingInfo && (
                      <div className="flex flex-col gap-3">
                        <h1 className="text-2xl">Shipping Info:</h1>
                        <div className="flex flex-col gap-2 pl-8">
                          <h1 className=" flex gap-3">
                            <span className="font-medium">Name:</span>{" "}
                            <span className="text-slate-700">
                              {order.user && order.user.name && order.user.name}
                            </span>
                          </h1>{" "}
                          <h1 className=" flex gap-3">
                            <span className="font-medium">Address:</span>{" "}
                            <span className="text-slate-700">
                              {`${order.shippingInfo.address},${order.shippingInfo.city},${order.shippingInfo.state}`}
                            </span>
                          </h1>{" "}
                          <h1 className=" flex gap-3">
                            <span className="font-medium">Pincode:</span>{" "}
                            <span className="text-slate-700">
                              {order.shippingInfo.pinCode}
                            </span>
                          </h1>{" "}
                          <h1 className=" flex gap-3">
                            <span className="font-medium">Phone:</span>{" "}
                            <span className="text-slate-700">
                              {order.shippingInfo.phoneNo}
                            </span>
                          </h1>
                        </div>
                      </div>
                    )}
                    <div className="flex flex-col gap-3">
                      <h1 className="text-2xl">Payment Info:</h1>
                      <div className="flex flex-col gap-2 pl-8">
                        <h1 className="flex gap-3">
                          <span>Status:</span>{" "}
                          <span className="text-green-500 text-bold">PAID</span>
                        </h1>{" "}
                        <h1 className="flex gap-3">
                          <span>Amount:</span>{" "}
                          <span className="text-slate-700 ">
                            {order.totalPrice}
                          </span>
                        </h1>
                      </div>
                    </div>
                    <h1 className="text-2xl">Order Status:</h1>
                    <div className="pl-8">
                      <h1
                        className={
                          (order.orderStatus === "Shipped" &&
                            "text-[#fe5f1e] font-bold") ||
                          (order.orderStatus === "Delivered" &&
                            "text-green-500 font-bold") ||
                          "text-black font-bold"
                        }
                      >
                        {order.orderStatus}
                      </h1>
                    </div>
                  </div>
                  <div className=" pl-4 md:pl-16 py-4 mt-6">
                    <h1 className="text-3xl mt-4 mb-8">Order Items:</h1>
                    <div className="w-[98%] flex flex-col gap-4 px-4">
                      {order.orderItems &&
                        order.orderItems.map((item) => {
                          return (
                            <div
                              key={item.product}
                              className="flex justtify-start gap-3 md:gap-0 items-center md:justify-between"
                            >
                              <div className="flex gap-2 md:gap-8 items-center">
                                <img
                                  src="https://rukminim1.flixcart.com/image/497/596/ky0g58w0/fabric/f/x/s/no-2-35-m-unstitched-na-tshirt-33-retail-store-original-imagacybfnb5cz9h.jpeg?q=50"
                                  alt={item.name}
                                  className="w-[50px]"
                                />
                                <span className="text-slate-700 text-xl">
                                  {item.name}
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
              )}
            </div>
          </div>
          <Dialog open={open} onClose={dialogToggle}>
            <DialogTitle>Update Order Status</DialogTitle>
            <DialogContent>
              {" "}
              <form
                onSubmit={updateOrderhandler}
                className="md:w-[350px] w-[250px] mx-auto "
              >
                <div className="input-div">
                  <AccountTreeIcon />
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                    className="cursor-pointer"
                  >
                    <option value="">Choose Status</option>
                    {order.orderStatus === "Processing" && (
                      <option value="Shipped">Shipped</option>
                    )}{" "}
                    {order.orderStatus === "Shipped" && (
                      <option value="Delivered">Delivered</option>
                    )}
                  </select>
                </div>

                <DialogActions>
                  <Button
                    onClick={dialogToggle}
                    variant="contained"
                    style={{ backgroundColor: "red" }}
                  >
                    Cancel
                  </Button>
                  <Button variant="contained" type="submit">
                    Process
                  </Button>
                </DialogActions>
              </form>
            </DialogContent>
          </Dialog>
        </>
      )}
    </>
  );
}

export default AdminOrderDetails;
