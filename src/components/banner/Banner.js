import React from "react";
import Carousel from "react-material-ui-carousel";
function Banner() {
  const arr = [
    "https://rukminim1.flixcart.com/flap/3376/560/image/d117a62eb5fbb8e1.jpg?q=50",
    "https://rukminim1.flixcart.com/flap/3376/560/image/57267a180af306fe.jpg?q=50",
    "https://rukminim1.flixcart.com/flap/3376/560/image/ae9966569097a8b7.jpg?q=50",
    "https://rukminim1.flixcart.com/flap/3376/560/image/f6202f13b6f89b03.jpg?q=50",
  ];
  return (
    <div className="px-2">
      <Carousel
        autoplay={true}
        animation="fade"
        indicators={false}
        navButtonsAlwaysVisible={true}
        cycleNavigation={true}
        navButtonsProps={{
          style: {
            background: "#fff",
            color: "#494949",
            borderRadius: 0,
            margin: 0,
          },
        }}

        // className={classes.carousel}
      >
        {arr.map((item, index) => (
          <img src={item} alt="" key={index} className="h-[280px]" />
        ))}
      </Carousel>
    </div>
  );
}

export default Banner;
