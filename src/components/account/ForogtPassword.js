import { Button, CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearError,
  clearMessage,
  sendResetPasswordToken,
} from "../../redux/auth/profileSlice";
function ForogtPassword() {
  const { message, error, loading } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendResetPasswordToken(email));
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
      <form
        className="lg:w-[30%] md:w-[50%] w-[80%] border border-slate-200 shadow-md mx-auto p-8 mt-[8%] flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <h1 className="text-slate-600 text-2xl my-2">
          Send Email for Reset Password
        </h1>
        <input
          type="email"
          placeholder="Enter Email"
          className="outline-none focus:ring-0 border border-slate-200 shadow-sm px-2 py-1 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button variant="contained" type="submit">
          {loading ? (
            <CircularProgress style={{ color: "#fff" }} size={24} />
          ) : (
            "Send Email"
          )}
        </Button>
        <small className="text-slate-600 text-xs">
          Enter your such email which is already registerd.Go to the email and
          click on the reset Password Link and reset the Password.{" "}
        </small>
      </form>
    </div>
  );
}

export default ForogtPassword;
