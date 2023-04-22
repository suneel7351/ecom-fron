import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import {
  clearError,
  clearMessage,
  changePassword,
} from "../../redux/auth/profileSlice";
import { TextField, Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Metadata from "../Metadata";
import { toast } from "react-toastify";
function UpdatePassword() {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.profile);
  const hanldeSignIn = () => {
    dispatch(changePassword({ oldPassword, newPassword }));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
  }, [dispatch, error, message, navigate]);
  return (
    <>
      <Metadata title="eccomerce-UpdatePassword" />
      <div className=" mt-12 md:w-[30%] w-[90%] mx-auto">
        {" "}
        <div className="border border-slate-100 shadow-sm py-8">
          <h1 className="text-slate-600 text-2xl text-center mb-4">
            Change Password
          </h1>
          <form action="" className="w-[80%] mx-auto flex flex-col gap-6">
            <TextField
              id="standard-basic"
              autoFocus={false}
              autoComplete="false"
              label="Enter Old Password"
              variant="outlined"
              type="password"
              style={{ width: "100%" }}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required={true}
            />
            <TextField
              autoFocus={false}
              autoComplete="false"
              id="standard-basic"
              label="Enter New Password"
              variant="outlined"
              type="password"
              style={{ width: "100%" }}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required={true}
            />

            <div className="flex flex-col gap-4">
              {" "}
              <Button
                variant="contained"
                style={{ backgroundColor: "#fb641b" }}
                onClick={hanldeSignIn}
                disabled={!oldPassword || !newPassword}
              >
                {loading ? (
                  <CircularProgress style={{ color: "#fff" }} size={24} />
                ) : (
                  "Update Password"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default UpdatePassword;
