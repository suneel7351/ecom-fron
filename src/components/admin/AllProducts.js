import { Button } from "@mui/material";
import React, { useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import {
  clearMessage,
  deleteProduct,
  getAllProducts,
} from "../../redux/admin/ProductSlice";
import { toast } from "react-toastify";
function AllProducts() {
  const dispatch = useDispatch();
  const { products, success } = useSelector((state) => state.admin);
  const deleteHandler = (id) => {
    dispatch(deleteProduct(id));
  };
  const columns = [
    {
      field: "ID",
      headerName: "Product ID",
      minWidth: 200,
      flex: 0.7,
    },
    {
      field: "NAME",
      headerName: "Product Name",
      flex: 1,
      minWidth: 300,
    },
    {
      field: "STOCK",
      headerName: "Stock",
      minWidth: 70,
      flex: 0.2,
      type: "number",
    },
    {
      field: "PRICE",
      headerName: "Price",
      minWidth: 150,
      flex: 0.3,
      type: "number",
    },
    {
      field: "ACTIONS",
      headerName: "Action",
      minWidth: 210,
      flex: 0.65,
      sortable: false,
      renderCell: (params) => {
        return (
          <div className="flex items-center gap-4">
            <Link to={`/admin/product/${params.getValue(params.id, "ID")}`}>
              <EditIcon />
            </Link>{" "}
            <Link
              to={`/admin/product/stock/${params.getValue(params.id, "ID")}`}
              className="update-stock-btn"
            >
              <Button variant="contained" size="small">
                {" "}
                Update Stock
              </Button>
            </Link>
            <button
              className="text-blue-600"
              onClick={() => deleteHandler(params.getValue(params.id, "ID"))}
            >
              {" "}
              <DeleteIcon />
            </button>
          </div>
        );
      },
    },
  ];
  const rows = [];

  products &&
    products.forEach((element) => {
      rows.push({
        id: element._id,
        ID: element._id,
        NAME: element.name,
        STOCK: element.Stock,
        PRICE: element.price,
      });
    });

  useEffect(() => {
    dispatch(getAllProducts());
    if (success) {
      toast.success("Product deleted successfully.");
      dispatch(clearMessage());
    }
  }, [dispatch, success]);
  return (
    <div className="admin-container ">
      <div className="sidebar border-r border-slate-200">
        <Sidebar />
      </div>
      <div className=" main-container w-full px-4 bg-[#eee] pt-4 flex-[7_7_0]">
        <DataGrid
          className="myOrdersTable w-full"
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
          editMode="false"
          autoHeight
        />
      </div>
    </div>
  );
}

export default AllProducts;
