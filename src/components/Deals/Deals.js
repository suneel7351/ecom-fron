import React from "react";
import { Button } from "@mui/material";
import TimerIcon from "@mui/icons-material/Timer";
import "react-multi-carousel/lib/styles.css";
import Slide from "./Slide";
function Deals() {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const arr = [
    {
      image:
        "https://rukminim1.flixcart.com/image/150/150/kflftzk0/dress/b/m/n/l-2713-darzi-original-imafwyy5zhhzg9xs.jpeg?q=70",
      name: "Maxi Dresses, Bra, Nightwear...",
      discount: "Upto 70%+Extra 10%Off",
      discountName: "Tokyo Talkies, Amante, Dreambe.",
    },
    {
      image:
        "https://rukminim1.flixcart.com/image/150/150/ko0d6kw0/towel-holder/o/g/r/premium-towel-rack-abs-stainless-steel-bathroom-accessories-and-original-imag2kdqzmhd2rk7.jpeg?q=70",
      name: "Home Improvement Range",
      discount: "Up to 70% Off",
      discountName: "Popular Brand",
    },
    {
      image:
        "https://rukminim1.flixcart.com/image/150/150/kflftzk0/dress/b/m/n/l-2713-darzi-original-imafwyy5zhhzg9xs.jpeg?q=70",
      name: "Maxi Dresses, Bra, Nightwear...",
      discount: "Upto 70%+Extra 10%Off",
      discountName: "Tokyo Talkies, Amante, Dreambe.",
    },
    {
      image:
        "https://rukminim1.flixcart.com/image/150/150/kflftzk0/dress/b/m/n/l-2713-darzi-original-imafwyy5zhhzg9xs.jpeg?q=70",
      name: "Maxi Dresses, Bra, Nightwear...",
      discount: "Upto 70%+Extra 10%Off",
      discountName: "Tokyo Talkies, Amante, Dreambe.",
    },
    {
      image:
        "https://rukminim1.flixcart.com/image/150/150/kflftzk0/dress/b/m/n/l-2713-darzi-original-imafwyy5zhhzg9xs.jpeg?q=70",
      name: "Maxi Dresses, Bra, Nightwear...",
      discount: "Upto 70%+Extra 10%Off",
      discountName: "Tokyo Talkies, Amante, Dreambe.",
    },
    {
      image:
        "https://rukminim1.flixcart.com/image/150/150/kflftzk0/dress/b/m/n/l-2713-darzi-original-imafwyy5zhhzg9xs.jpeg?q=70",
      name: "Maxi Dresses, Bra, Nightwear...",
      discount: "Upto 70%+Extra 10%Off",
      discountName: "Tokyo Talkies, Amante, Dreambe.",
    },
    {
      image:
        "https://rukminim1.flixcart.com/image/150/150/kflftzk0/dress/b/m/n/l-2713-darzi-original-imafwyy5zhhzg9xs.jpeg?q=70",
      name: "Maxi Dresses, Bra, Nightwear...",
      discount: "Upto 70%+Extra 10%Off",
      discountName: "Tokyo Talkies, Amante, Dreambe.",
    },
    {
      image:
        "https://rukminim1.flixcart.com/image/150/150/ko0d6kw0/towel-holder/o/g/r/premium-towel-rack-abs-stainless-steel-bathroom-accessories-and-original-imag2kdqzmhd2rk7.jpeg?q=70",
      name: "Home Improvement Range",
      discount: "Up to 70% Off",
      discountName: "Popular Brand",
    },
    {
      image:
        "https://rukminim1.flixcart.com/image/150/150/kflftzk0/dress/b/m/n/l-2713-darzi-original-imafwyy5zhhzg9xs.jpeg?q=70",
      name: "Maxi Dresses, Bra, Nightwear...",
      discount: "Upto 70%+Extra 10%Off",
      discountName: "Tokyo Talkies, Amante, Dreambe.",
    },
    {
      image:
        "https://rukminim1.flixcart.com/image/150/150/kflftzk0/dress/b/m/n/l-2713-darzi-original-imafwyy5zhhzg9xs.jpeg?q=70",
      name: "Maxi Dresses, Bra, Nightwear...",
      discount: "Upto 70%+Extra 10%Off",
      discountName: "Tokyo Talkies, Amante, Dreambe.",
    },
    {
      image:
        "https://rukminim1.flixcart.com/image/150/150/kflftzk0/dress/b/m/n/l-2713-darzi-original-imafwyy5zhhzg9xs.jpeg?q=70",
      name: "Maxi Dresses, Bra, Nightwear...",
      discount: "Upto 70%+Extra 10%Off",
      discountName: "Tokyo Talkies, Amante, Dreambe.",
    },
    {
      image:
        "https://rukminim1.flixcart.com/image/150/150/kflftzk0/dress/b/m/n/l-2713-darzi-original-imafwyy5zhhzg9xs.jpeg?q=70",
      name: "Maxi Dresses, Bra, Nightwear...",
      discount: "Upto 70%+Extra 10%Off",
      discountName: "Tokyo Talkies, Amante, Dreambe.",
    },
    {
      image:
        "https://rukminim1.flixcart.com/image/150/150/kflftzk0/dress/b/m/n/l-2713-darzi-original-imafwyy5zhhzg9xs.jpeg?q=70",
      name: "Maxi Dresses, Bra, Nightwear...",
      discount: "Upto 70%+Extra 10%Off",
      discountName: "Tokyo Talkies, Amante, Dreambe.",
    },
    {
      image:
        "https://rukminim1.flixcart.com/image/150/150/kflftzk0/dress/b/m/n/l-2713-darzi-original-imafwyy5zhhzg9xs.jpeg?q=70",
      name: "Maxi Dresses, Bra, Nightwear...",
      discount: "Upto 70%+Extra 10%Off",
      discountName: "Tokyo Talkies, Amante, Dreambe.",
    },
  ];
  return (
    <div className="flex px-2 gap-2">
      <div className="w-[82%] bg-white">
        <div className="border-b border-slate-200 flex justify-between p-3 items-center">
          <div className="flex gap-2 items-center">
            <h1 className="text-2xl">Deals of the Day</h1>
            <TimerIcon />
          </div>
          <Button variant="contained">VIEW ALL</Button>
        </div>
        <div className="w-full mt-6">
          <Slide arr={arr} responsive={responsive} />
        </div>
      </div>
      <div className="flex-[1_1_2] bg-white p-1">
        <img
          src="https://rukminim1.flixcart.com/flap/464/708/image/a60eb148185597ad.jpg?q=70"
          className="w-[230px] h-[354px]"
          alt=""
        />
      </div>
    </div>
  );
}

export default Deals;
