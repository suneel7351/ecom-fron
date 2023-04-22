import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { clearError, clearMessage, login } from "../../redux/auth/userSlice";
import { TextField, Button, CircularProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Metadata from "../Metadata";
import { toast } from "react-toastify";
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isAuthenticated, loading, error, message } = useSelector(
    (state) => state.user
  );
  const hanldeSignIn = () => {
    dispatch(login({ email, password }));
  };
  const redirect = window.location.search
    ? `/${window.location.search.split("=")[1]}`
    : "/profile";
  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirect);
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [isAuthenticated, navigate, redirect, dispatch, error,message]);

  return (
    <>
      <Metadata title="eccomerce-login" />
      <div className=" mt-12 md:w-[30%] w-[90%] mx-auto">
        {" "}
        <div className="border border-slate-100 shadow-sm py-4">
          <form action="" className="w-[80%] mx-auto flex flex-col gap-6">
            {error ? <small className="text-red-500">{error}</small> : ""}
            <TextField
              id="standard-basic"
              autoFocus={false}
              autoComplete="false"
              label="Enter Email"
              variant="outlined"
              type="email"
              style={{ width: "100%" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required={true}
            />
            <TextField
              autoFocus={false}
              autoComplete="false"
              id="standard-basic"
              label="Enter Password"
              variant="outlined"
              type="password"
              style={{ width: "100%" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={true}
            />

            <div className="flex flex-col gap-4">
              {" "}
              <Button
                variant="contained"
                style={{ backgroundColor: "#fb641b" }}
                onClick={hanldeSignIn}
                disabled={!email || !password}
              >
                {loading ? (
                  <CircularProgress style={{ color: "#fff" }} size={24} />
                ) : (
                  "Login"
                )}
              </Button>
              <span className="text-center text-slate-500">OR</span>
              <Link
                to="/register"
                className="border border-slate-100 shadow-md py-1 text-center text-[#2874f0] hover:shadow-lg"
              >
                SignUp
              </Link>
              <Link
                to="/forgot/password"
                className="text-[#4284f1] text-center"
              >
                Forgot Password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
