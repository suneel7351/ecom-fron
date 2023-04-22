import React from "react";
import PostHeaderItem from "../PostHeaderItem/PostHeaderItem";

function PostHeader() {
  const arr = [
    {
      name: "Grocery",
      image:
        "https://rukminim1.flixcart.com/flap/128/128/image/29327f40e9c4d26b.png?q=100",
    },
    {
      name: "Mobiles",
      image:
        "https://rukminim1.flixcart.com/flap/128/128/image/22fddf3c7da4c4f4.png?q=100",
    },
    {
      name: "Fashion",
      image:
        "https://rukminim1.flixcart.com/flap/128/128/image/c12afc017e6f24cb.png?q=100",
    },
    {
      name: "Electronic",
      image:
        "https://rukminim1.flixcart.com/flap/128/128/image/69c6589653afdb9a.png?q=100",
    },
    {
      name: "Home",
      image:
        "https://rukminim1.flixcart.com/flap/128/128/image/ab7e2b022a4587dd.jpg?q=100",
    },
    {
      name: "Babu",
      image:
        "https://rukminim1.flixcart.com/flap/128/128/image/dff3f7adcf3a90c6.png?q=100",
    },
    {
      name: "Travel",
      image:
        "https://rukminim1.flixcart.com/flap/128/128/image/71050627a56b4693.png?q=100",
    },
    {
      name: "Appliances",
      image:
        "https://rukminim1.flixcart.com/flap/128/128/image/0ff199d1bd27eb98.png?q=100",
    },
  ];
  return (
    <div className="flex bg-white items-center justify-evenly py-4 shadow-sm border-b border-slate-200">
      {arr.map((element, index) => {
        return (
          <PostHeaderItem
            key={index}
            name={element.name}
            image={element.image}
          />
        );
      })}
    </div>
  );
}

export default PostHeader;
