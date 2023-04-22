import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import StorageIcon from "@mui/icons-material/Storage";
import { Button, CircularProgress } from "@mui/material";
import {
  updateProductStock,
  clearMessage,
  clearError,
} from "../../redux/admin/ProductSlice";
function UpdateStock() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [stock, setStock] = useState(null);
  const { success, loading, error } = useSelector((state) => state.admin);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProductStock({ stock, id }));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (success) {
      toast.success("Product Stock update successfuly.");
      dispatch(clearMessage());
    }
  }, [dispatch, error, success]);

  return (
    <div className="admin-container ">
      <div className="sidebar border-r border-slate-200">
        <Sidebar />
      </div>
      <div className="main-container py-0 pt-6 bg-[#eee] px-0 flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="lg:w-[45%] bg-white  md:w-[55%] w-95% mx-auto md:p-8 py-8 p-3 border border-slate-200 shadow-sm"
        >
          <div className="input-div">
            <StorageIcon />
            <input
              type="number"
              placeholder="Enter Product Stock"
              onChange={(e) => setStock(e.target.value)}
              value={stock}
              required
            />
          </div>
          <Button
            type="submit"
            variant="contained"
            style={{ backgroundColor: "#fe5f1e" }}
            size="small"
          >
            {loading ? (
              <CircularProgress size={24} style={{ color: "#fff" }} />
            ) : (
              " Update Stock"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default UpdateStock;
