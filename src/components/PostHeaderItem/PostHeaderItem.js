import React from "react";
import { Link } from "react-router-dom";
function PostHeaderItem({ name, image }) {
  return (
    <Link to={`/${name}`} className="flex flex-col items-center justify-center">
      <img src={image} alt={name} className="w-[80px]" />
      <h3 className="link ">{name}</h3>
    </Link>
  );
}

export default PostHeaderItem;
