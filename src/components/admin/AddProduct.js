import React, { useState, useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import SpellCheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DescriptionIcon from "@mui/icons-material/Description";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import StorageIcon from "@mui/icons-material/Storage";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Button, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  clearMessage,
  createProduct,
} from "../../redux/admin/ProductSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function AddProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { success, error, loading } = useSelector((state) => state.admin);
  const fileInput = useRef(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(1);
  const [images, setImages] = useState([]);
  const [imgPreview, setImgPreview] = useState([]);
  const submitHandler = async (e) => {
    e.preventDefault();
    if (loading) {
      return;
    }
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("description", description);
    myForm.set("price", price);
    myForm.set("Stock", Stock);
    myForm.set("category", category);
    images.forEach((image) => {
      myForm.append("images", image);
    });

    await dispatch(createProduct(myForm));
    navigate("/admin/dashboard");
  };
  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImgPreview([]);
    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);
          setImgPreview((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };
  const fileUpload = () => {
    if (fileInput) {
      fileInput.current.click();
    }
  };
  const categories = [
    "Laptop",
    "Mobiles",
    "Electronics",
    "Cosmetic",
    "Shoes",
    "Books",
    "Clothes",
  ];

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (success) {
      toast.success("Product create successfully.");
      dispatch(clearMessage());
    }
  }, [dispatch, error, success]);

  return (
    <div className="admin-container ">
      <div className="sidebar border-r border-slate-200">
        <Sidebar />
      </div>
      <div className="main-container py-0 pt-6 bg-[#eee] px-0">
        <form
          onSubmit={submitHandler}
          encType="multipart/form-data"
          className="w-[94%] md:w-[70%] lg:w-[60%] mx-auto bg-[#fff] py-4 px-4 md:py-8 md:px-12 border border-slate-200 shaow-sm"
        >
          <div className="input-div hover:shadow-md">
            <SpellCheckIcon />{" "}
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Product Name"
              required
            />
          </div>{" "}
          <div className="input-div hover:shadow-md">
            <AttachMoneyIcon />{" "}
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Product Price"
              required
            />
          </div>{" "}
          <div className="input-div hover:shadow-md">
            <DescriptionIcon />{" "}
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Product Description"
              required
            ></textarea>
          </div>
          <div className="input-div hover:shadow-md">
            <AccountTreeIcon />{" "}
            <select onChange={(e) => setCategory(e.target.value)} required>
              <option value="">Choose Category</option>
              {categories.map((element, index) => {
                return (
                  <option value={element} key={index}>
                    {element}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="input-div hover:shadow-md">
            <StorageIcon />{" "}
            <input
              type="number"
              value={Stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="Product Stock"
              required
            />
          </div>{" "}
          <div>
            <input
              type="file"
              multiple
              required
              accept="image/*"
              onChange={handleImages}
              ref={fileInput}
              className="file-input"
            />
            <div
              className=" w-full py-1 text-center  hover:shadow-md cursor-pointer bg-[#fff] border border-slate-200 rounded-md text-slate-600"
              onClick={fileUpload}
            >
              <UploadFileIcon /> Upload Images
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto items-center justify-center flex-wrap">
            {imgPreview.map((img, index) => {
              return (
                <div
                  key={index}
                  className="p-2 border border-slate-200 shadow-md overflow-hidden "
                >
                  <img src={img} alt="img" className="w-full" />
                </div>
              );
            })}
          </div>
          <Button type="submit" variant="contained">
            {loading ? (
              <CircularProgress size={24} style={{ color: "#fff" }} />
            ) : (
              "Create Product"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
