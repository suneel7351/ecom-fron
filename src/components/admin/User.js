import { Button } from "@mui/material";
import React, { useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import MetaData from "../../components/Metadata";
import {
  deleteUser,
  getAllUsers,
  clearError,
  clearMessage,
} from "../../redux/admin/AdminUserSlice";
function User() {
  const dispatch = useDispatch();
  const { users, loading, message, error } = useSelector(
    (state) => state.adminUser
  );
  const deleteHandler = (id) => {
    dispatch(deleteUser(id));
  };
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 270,
      flex: 0.4,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "ACTIONS",
      headerName: "Action",
      minWidth: 150,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>
            <Button
              onClick={() => deleteHandler(params.getValue(params.id, "id"))}
            >
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];
  const rows = [];

  users &&
    users.forEach((element) => {
      rows.push({
        id: element._id,
        name: element.name,
        role: element.role,
        email: element.email,
      });
    });

  useEffect(() => {
    dispatch(getAllUsers());
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [dispatch, message, error]);
  return (
    <>
      <MetaData title="All Users - admin" />
      {loading ? (
        <p>Loading</p>
      ) : (
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
      )}
    </>
  );
}

export default User;
