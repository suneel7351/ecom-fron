import React, { useEffect } from "react";
import "./admin.css";
import { Doughnut, Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { getAllProducts } from "../../redux/admin/ProductSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getAllOrders } from "../../redux/admin/orderSlice";
import { getAllUsers } from "../../redux/admin/AdminUserSlice";
Chart.register(...registerables);
function Dashboard() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.admin);
  const { orders } = useSelector((state) => state.adminOrder);
  const { users } = useSelector((state) => state.adminUser);
  let outOfStock = 0;
  products &&
    products.forEach((element) => {
      if (element.Stock === 0) {
        outOfStock += 1;
      }
    });
  let totalAmount = 0;
  orders &&
    orders.forEach((element) => {
      totalAmount = totalAmount + element.totalPrice;
    });
  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["#fe5f1e"],
        hoverBackgroundColor: ["rgb(197,72,49)"],
        data: [0, totalAmount],
      },
    ],
  };
  const doughnutState = {
    labels: ["Out Of Stock", "In Stock"],
    datasets: [
      {
        backgroundColor: ["#0984e3", "#a29bfe"],
        hoverBackgroundColor: ["#5352ed", "#2980b9"],
        data: [outOfStock, (products && products.length - outOfStock) || 0],
      },
    ],
  };

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);
  return (
    <div className="dashboard">
      <div className="total-amount rounded-md shadow-md">
        <span className="mb-[-8px]">Total Amount</span>
        <span>&#8377;{totalAmount}</span>
      </div>
      <div className="circles">
        {" "}
        <Link
          to="/admin/products"
          className="circle text-orange-500 text-xl font-bold  shadow-lg"
        >
          <h1 className="">Products</h1>
          <span>{products && products.length}</span>
        </Link>{" "}
        <Link to="/admin/orders" className="circle text-orange-500 text-xl font-bold  shadow-lg">
          <h1 className="">Orders</h1>
          <span>{orders && orders.length}</span>
        </Link>{" "}
        <Link to="/admin/users" className="circle text-orange-500 text-xl font-bold  shadow-lg">
          <h1 className="">Users</h1>
          <span>{users && users.length}</span>
        </Link>
      </div>
      <div className="amount-chart">
        <Line data={lineState} />
      </div>{" "}
      <div className="doughnut-chart my-8">
        <Doughnut data={doughnutState} />
      </div>
    </div>
  );
}

export default Dashboard;
