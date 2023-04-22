import { Button, CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearError,
  clearMessage,
  resetPassword,
} from "../../redux/auth/profileSlice";
import { useParams } from "react-router-dom";
function PasswordReset() {
  const { message, error, loading } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(resetPassword({ password, confirmPassword, token }));
    setPassword("");
    setConfirmPassword("");
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
  }, [dispatch, error, message]);
  return (
    <div>
      {" "}
      <form
        className="lg:w-[30%] md:w-[50%] w-[80%] border border-slate-200 shadow-md mx-auto p-8 mt-[8%] flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <h1 className="text-slate-600 text-2xl my-2">Reset Password</h1>
        <input
          type="password"
          placeholder="Enter Password"
          className="outline-none focus:ring-0 border border-slate-200 shadow-sm px-2 py-1 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />{" "}
        <input
          type="password"
          placeholder="Enter Confirm Password"
          className="outline-none focus:ring-0 border border-slate-200 shadow-sm px-2 py-1 w-full"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          variant="contained"
          type="submit"
          disabled={!password || !confirmPassword}
        >
          {loading ? (
            <CircularProgress style={{ color: "#fff" }} size={24} />
          ) : (
            "Send Email"
          )}
        </Button>
      </form>
    </div>
  );
}

export default PasswordReset;
