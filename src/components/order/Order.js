import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { clearError, getAllMyOrders } from "../../redux/order/orderSlice";
import { Link } from "react-router-dom";
import LaunchIcon from "@mui/icons-material/Launch";
import { toast } from "react-toastify";
import "./order.css";
function Order() {
  const dispatch = useDispatch();
  const { error, orders, loading } = useSelector((state) => state.order);
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];

  const rows = [];
  orders &&
    orders.forEach((element) => {
      rows.push({
        itemsQty: element.orderItems.length,
        id: element._id,
        status: element.orderStatus,
        amount: element.totalPrice,
      });
    });
  useEffect(() => {
    dispatch(getAllMyOrders());
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [dispatch, error]);
  return (
    <>
      {loading ? (
        <p>Loading</p>
      ) : (
        <div className="h-[88vh] flex flex-col bg-[#eee] py-4">
          <DataGrid
            className="myOrdersTable"
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            editMode="false"
            autoHeight
          />
        </div>
      )}
    </>
  );
}

export default Order;
