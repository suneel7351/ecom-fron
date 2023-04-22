import React, { useEffect } from "react";
import { getAllProducts } from "../../redux/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import "./Home.css";
import ProductItem from "../product/ProductItem";
import Metadata from "../Metadata";
import Loader from "../Loader";
import { Link } from "react-router-dom";

function Home() {
  const { data, loading } = useSelector((state) => state.products);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getAllProducts({
        keyword: "",
        page: 1,
        category: "",
        price: [0, 1000000000000000000],
        ratingValue: 0,
      })
    );
  }, [dispatch]);
  return (
    <>
      {" "}
      <Metadata title="eccomerce-Home" />
      <div className="banner">
        <h1 className="text-center text-5xl text-slate-700 ">
          Buy Your favourite Products
        </h1>
        <div className="flex gap-4">
          <Link to="/cart" className="rounded-md text-slate-100 px-4 py-2">Buy Now</Link>
          <Link to="/products" className="rounded-md text-slate-100 px-4 py-2">Explore</Link>
        </div>
      </div>
      <h1 className="text-center text-3xl font-bold mt-12 text-slate-700">
        Explore Products
      </h1>
      <div className="min-h-[88vh] flex items-center justify-center py-4 mt-8">
        {loading ? (
          <Loader />
        ) : (
          <>
            {" "}
            <div className="flex items-center justify-center gap-4 flex-wrap">
              {data.map((product) => {
                return <ProductItem product={product} key={product._id} />;
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Home;
