"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MainSlider = () => {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="w-full h-[90vh]">
      <Slider {...settings}>
        <div className="w-full h-[90vh] bg-black text-white font-bold">
          <div
            className={`innerSlideContainer w-full h-full flex flex-col gap-2.5 justify-center px-[200px] max-md:px-[20px] max-md:text-center max-md:items-center`}
          >
            <h2 className="bestPrices w-fit h-fit text-[14px] rounded-sm bg-red-600 px-[8px] py-1">
              Best Prices!
            </h2>
            <h2 className="sliderTitle w-[350px] font-bold text-[40px] max-md:text-[30px] max-sm:w-full">
              Incredible Prices on All Your Favorite Items
            </h2>
            <p className="getMore font-normal text-[14px] text-gray-400">
              Get more for less on selected brands
            </p>
            <button className="myButton1 mt-3 text-[25px] max-md:text-[20px]">
              Shop Now
            </button>
          </div>
        </div>
        <div className="bg-orange-400 w-full h-[90vh]"></div>
      </Slider>
    </div>
  );
};

export default MainSlider;
