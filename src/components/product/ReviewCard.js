import { Avatar, Rating } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
function ReviewCard({ review }) {
  const { user } = useSelector((state) => state.user);
  return (
    <>
      {review && (
        <div
          className="border border-slate-200 shadow-md 
  p-12 flex flex-col items-center justify-center gap-3 min-w-[270px] h-[300px]"
        >
          <div className="border border-slate-200 shadow-md p-1 rounded-full">
            {" "}
            <Avatar
              src={user && user.avatar && user.avatar.url}
              style={{ width: "70px", height: "70px" }}
              alt={review.name}
            />
          </div>
          <span>{review.name}</span>
          <Rating
            value={review.rating}
            readOnly
            precision={0.5}
            style={{ color: "#fe5f1e" }}
            contentEditable={false}
          />
          <p>{review.comment}</p>
        </div>
      )}
    </>
  );
}

export default ReviewCard;
