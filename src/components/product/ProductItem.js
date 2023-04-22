import { Rating } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./product.css";

function ProductItem({ product }) {
  return (
    <>
      {product && (
        <Link
          to={`/product/${product._id}`}
          className="bg-white hover:shadow-lg border border-slate-100 shadow-sm px-4 pt-2  flex flex-col product-card w-[250px]"
        >
          <img
            className="object-contain h-[250px]"
            src={
              product.images &&
              product.images.length > 0 &&
              product.images[0].url
            }
            alt={product.name}
          />
          <div className="product-card-content">
            {" "}
            <h1 className="font-bold pt-2">
              {product.name.substring(0, 48)}...
            </h1>
            <p>{product.description.substring(0, 25)}</p>
            <div className="flex gap-1 items-center">
              {product.numOfReviews > 0 ? (
                <Rating
                  readOnly
                  defaultValue={3.5}
                  style={{ color: "#fe5f1e" }}
                  value={product.ratings}
                  precision={0.5}
                />
              ) : (
                <span className="text-slate-600">No Review yet...</span>
              )}
              <span>({product.numOfReviews} reviews)</span>
            </div>
            <span className="text-[#fe5f1e]">&#x20B9;{product.price}</span>
          </div>
        </Link>
      )}
    </>
  );
}

export default ProductItem;
