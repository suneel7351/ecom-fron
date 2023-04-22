import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./index.css";
function Slide({ arr, responsive }) {
  return (
    <Carousel
      responsive={responsive}
      swipeable={false}
      draggable={false}
      centerMode={true}
      autoPlay={true}
      autoPlaySpeed={10000}
      keyBoardControl={true}
      infinite={false}
      showDots={false}
      containerClass="carousel-container"
      itemClass="carousel-item-padding-40-px"
      customRightArrow={
        <span className="custom-arrow custom-arrow-right shadow-lg">
          <svg
            className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="NavigateNextIcon"
          >
            <path d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
          </svg>
        </span>
      }
      customLeftArrow={
        <span className="custom-arrow custom-arrow-left shadow-lg">
          <svg
            className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="NavigateBeforeIcon"
          >
            <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
          </svg>
        </span>
      }
    >
      {arr.map((item, index) => (
        <div
          key={index}
          className="w-[240px] mx-[30px] flex flex-col gap-2 items-center overflow-x-hidden"
        >
          <img
            src={item.image}
            alt=""
            key={index}
            className="w-[129px] h-[150px] img-hover"
          />
          <h1 className="font-bold text-sm">{item.name.substring(0, 22)}</h1>
          <span className="text-green-500 text-sm">{item.discount}</span>
          <span className="text-sm text-slate-600">
            {item.discountName.substring(0, 20)}
          </span>
        </div>
      ))}
    </Carousel>
  );
}

export default Slide;
