import React, { useEffect, useState } from "react";
import Metadata from "../Metadata";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  clearMessage,
  getSingleProduct,
  productReview,
} from "../../redux/product/productSlice";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import "./product.css";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ReviewCard from "./ReviewCard";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
} from "@mui/material";
import { addTocart } from "../../redux/product/addToCart";
function Product() {
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, success, error } = useSelector(
    (state) => state.products
  );

  const decrease = () => {
    if (quantity === 1) {
      return;
    }
    const qty = quantity - 1;
    setQuantity(qty);
  };
  const increase = () => {
    if (product.Stock <= quantity) return;
    const qty = quantity + 1;
    setQuantity(qty);
  };

  const handleAddToCart = () => {
    dispatch(addTocart({ id, quantity }));
  };
  const dialogToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };
  const reviewHandler = (e) => {
    e.preventDefault();
    dispatch(
      productReview({
        productId: id,
        comment,
        rating,
      })
    );

    setOpen(false);
  };
  useEffect(() => {
    dispatch(getSingleProduct(id));
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (success) {
      toast.success("Review Submit Successfully.");
      dispatch(clearMessage());
    }
  }, [id, dispatch, error, success]);
  return (
    <>
      {" "}
      {loading ? (
        <span>"Loading"</span>
      ) : (
        <>
          <Metadata title={product && product.name} />
          {product && (
            <>
              {" "}
              <div className=" container mx-auto flex gap-8 mt-8 flex-wrap justify-center border border-slate-200 shadow-md">
                <div className="flex-1 p-8">
                  <div className="w-[300px] mx-auto">
                    <Carousel
                      autoplay={true}
                      animation="fade"
                      indicators={true}
                      indicatorContainerProps={{
                        style: {
                          position: "absolute",
                          bottom: "6px",
                          zIndex: "100000",
                        },
                      }}
                      indicatorIconButtonProps={{
                        style: {
                          color: "#b23301",
                        },
                      }}
                      activeIndicatorIconButtonProps={{
                        style: {
                          color: "tomato",
                        },
                      }}
                      navButtonsAlwaysVisible={false}
                      cycleNavigation={true}
                    >
                      {product.images &&
                        product.images.length > 0 &&
                        product.images.map((item, index) => (
                          <img
                            src={item.url}
                            alt={product.name}
                            key={index}
                            className="h-[400px] mx-auto"
                          />
                        ))}
                    </Carousel>
                  </div>
                </div>
                <div className="flex-1 p-8 flex flex-col md:items-start items-center border-l border-slate-200">
                  <h1 className="text-[#aeaeae] text-bold text-2xl">
                    {product.name}
                  </h1>
                  <span>product # {product._id}</span>
                  <div className="shadow-sm border-y py-2 border-slate-200 w-[70%] my-3 flex gap-1 items-center">
                    <Rating
                      readOnly
                      value={Number(product.ratings)}
                      style={{ color: "#fe5f1e" }}
                      precision={0.5}
                    />
                    <span>({product.numOfReviews} reviews)</span>
                  </div>{" "}
                  <span className="text-green-500">Special price</span>
                  <span className="text-2xl text-bold">
                    &#x20B9;{product.price}
                  </span>
                  <div className="flex gap-2 items-center">
                    <div className="flex items-center justify-center numeric-input-div text-white rounded-full px-2 py-1 my-3">
                      <span
                        onClick={decrease}
                        className="flex items-center justify-center text-xl w-16 cursor-pointer font-bold"
                      >
                        <RemoveIcon />
                      </span>
                      <input
                        type="number"
                        name=""
                        id=""
                        readOnly
                        className="focus:ring-0 outline-none w-6 text-center"
                        value={quantity}
                      />
                      <span
                        onClick={increase}
                        className="flex items-center justify-center text-xl w-16 cursor-pointer font-bold"
                      >
                        <AddIcon />
                      </span>
                    </div>
                    <button
                      className="btn rounded-full px-6"
                      onClick={handleAddToCart}
                      disabled={product.Stock < 1 ? true : false}
                    >
                      Add to Cart
                    </button>
                  </div>
                  <span className="shadow-sm border-y py-2 border-slate-200 w-[70%] my-3">
                    <b className="text-slate-500">status</b>:
                    <span
                      className={
                        product.Stock > 0 ? "text-green-500" : "text-red-500"
                      }
                    >
                      {" "}
                      {product.Stock > 0
                        ? `In Stock(${product.Stock})`
                        : "Out of Stock"}
                    </span>
                  </span>
                  <p className="text-bold mb-4">
                    <b className="text-slate-500">Description:</b>
                    {product.description}
                  </p>
                  <button className="btn rounded-full" onClick={dialogToggle}>
                    Submit Review
                  </button>
                </div>
              </div>
              <h1 className="w-[150px] text-center mt-8 mx-auto text-3xl border-b border-slate-200 p-2">
                Reviews
              </h1>
              <div className="flex gap-8 mt-8 items-center overflow-x-scroll md:container mx-auto overflow-y-hidden px-4 md:px-0">
                {product.reviews &&
                product.reviews[0] &&
                product.reviews.length > 0 ? (
                  product.reviews.map((rev) => {
                    return <ReviewCard review={rev} key={rev._id} />;
                  })
                ) : (
                  <h1 className="text-4xl text-center text-slate-600 my-8">
                    Not Review Yet...
                  </h1>
                )}
              </div>
              <Dialog open={open} onClose={dialogToggle}>
                <DialogTitle>Submit Review</DialogTitle>
                <form onSubmit={reviewHandler}>
                  <DialogContent>
                    <div className="flex flex-col gap-4 px-4">
                      {" "}
                      <Rating
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        size="large"
                        precision={0.5}
                      />
                      <textarea
                        className="outline-none focus:ring-0 border border-slate-100 shadow-md p-2"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Leave comment..."
                        required
                        rows={4}
                        cols={40}
                      ></textarea>
                    </div>
                  </DialogContent>
                  <DialogActions style={{ marginBottom: "10px" }}>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "red" }}
                      onClick={dialogToggle}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" variant="contained">
                      Submit
                    </Button>
                  </DialogActions>
                </form>
              </Dialog>
            </>
          )}
        </>
      )}
    </>
  );
}

export default Product;
