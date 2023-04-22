import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState, useRef } from "react";
import {
  clearError,
  clearMessage,
  updateProfile,
} from "../../redux/auth/profileSlice";
import { TextField, Button, Avatar, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Metadata from "../Metadata";
import { profile } from "../../redux/auth/userSlice";

function EditProfile() {
  const navigate = useNavigate();
  const fileInput = useRef(null);
  const dispatch = useDispatch();
  const { message, error, loading } = useSelector((state) => state.profile);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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
  }, [dispatch, message, error]);

  const fileUpload = () => {
    if (fileInput) {
      fileInput.current.click();
    }
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateProfile({ name, email, avatar }));
    await dispatch(profile());
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
      <Metadata title="eccomerce-EditProfile" />
      <div className="mt-12 md:w-[30%] w-[90%] mx-auto">
        <div className="border border-slate-100 shadow-sm p-8">
          <h1 className="text-center text-3xl text-slate-600 mb-6">
            Edit Profile
          </h1>{" "}
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
            <Button
              variant="contained"
              style={{ backgroundColor: "#fb641b" }}
              type="submit"
            >
              {" "}
              {loading ? (
                <CircularProgress style={{ color: "#fff" }} size={20} />
              ) : (
                "Update Profile"
              )}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditProfile;
