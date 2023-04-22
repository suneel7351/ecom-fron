import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  clearError,
  clearMessage,
  getUserDetails,
  updateUserRole,
} from "../../redux/admin/AdminUserSlice";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
function UserDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user, message, error, loading } = useSelector(
    (state) => state.adminUser
  );
  const [role, setRole] = useState(user && user.role);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserRole({ role, id }));
  };
  useEffect(() => {
    dispatch(getUserDetails(id));
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
  }, [dispatch, error, message, id]);
  return (
    <>
      <div className="admin-container ">
        <div className="sidebar border-r border-slate-200">
          <Sidebar />
        </div>

        <div className="main-container flex items-center justify-center">
          {loading ? (
            <p>Loading</p>
          ) : (
            <form
              onSubmit={submitHandler}
              className="md:w-[50%] lg:w-[32%] w-[95%] mx-auto md:p-8 p-3 py-8 border border-slate-200 shadow-sm"
            >
              <div className="input-div">
                <AdminPanelSettingsIcon />
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option>Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
              <Button
                variant="contained"
                type="submit"
                disabled={role ? false : true}
                style={{ backgroundColor: "#fe5f1e" }}
              >
                Update Role
              </Button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default UserDetails;
