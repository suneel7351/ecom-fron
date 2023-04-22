import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState, useRef } from "react";
import { clearError, clearMessage, register } from "../../redux/auth/userSlice";
import { TextField, Button, Avatar, CircularProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Metadata from "../Metadata";

function Register() {
  const navigate = useNavigate();
  const fileInput = useRef(null);
  const dispatch = useDispatch();
  const { message, error, loading } = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
  }, [error, message, dispatch]);

  const fileUpload = () => {
    if (fileInput) {
      fileInput.current.click();
    }
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    await dispatch(register({ name, email, password, avatar }));
    navigate("/profile");
  };

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatar(Reader.result);
      }
    };
    Reader.readAsDataURL(file);
  };

  return (
    <>
      <Metadata title="eccomerce-register" />
      <div className="mt-4 md:w-[30%] w-[90%] mx-auto">
        {" "}
        <div className="border border-slate-100 shadow-sm py-4">
          <form
            action=""
            className="w-[80%] mx-auto flex flex-col gap-6 "
            onSubmit={handlerSubmit}
          >
            <TextField
              id="standard-basic"
              autoFocus={false}
              autoComplete="false"
              label="Enter Name"
              variant="outlined"
              type="text"
              style={{ width: "100%" }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required={true}
            />{" "}
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
            <div className="flex gap-2 items-center">
              <Avatar
                src={avatar && avatar}
                alt={name}
                sx={{
                  padding: "5px",
                  border: "5px solid  rgb(226 232 240)",
                  width: "50px",
                  height: "50px",
                }}
              />
              <input
                type="file"
                className="file-input"
                ref={fileInput}
                accept="image/*"
                onChange={handleAvatar}
              />
              <div
                className="shadow-sm border border-slate-200 w-full py-1 text-center  hover:shadow-md cursor-pointer"
                onClick={fileUpload}
              >
                Choose Avatar
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {" "}
              <Button
                variant="contained"
                style={{ backgroundColor: "#fb641b" }}
                disabled={!email || !password || !name}
                type="submit"
              >
                {loading ? (
                  <CircularProgress style={{ color: "#fff" }} size={24} />
                ) : (
                  "Register"
                )}
              </Button>
              <span className="text-center text-slate-500">OR</span>
              <Link
                to="/login"
                className="border border-slate-100 shadow-md py-1 text-center text-[#2874f0] hover:shadow-lg"
              >
                Already have an account?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
