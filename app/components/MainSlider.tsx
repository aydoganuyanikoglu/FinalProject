"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

const MainSlider = () => {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="relative w-full h-[100vh] text-white">
      <Slider {...settings}>
        <div className="bg-orange-400 w-full h-[100vh]"></div>

        <div className="w-full h-[100vh] text-white font-bold">
          <div
            className={`innerSlideContainer relative w-full h-full flex flex-col gap-2.5 justify-center px-[200px] max-md:px-[20px] max-md:text-center max-md:items-center`}
          >
            <Image
              src="/backgrounds/slide1.jpg"
              alt="slide"
              width={2000}
              height={1300}
              className="absolute left-0 top-0 z-[-1] w-full h-full brightness-50"
            />
          </div>
        </div>
      </Slider>
      <div className="absolute z-1 left-[200px] top-[50px] max-xl:left-[50px] h-full flex flex-col justify-center max-md:left-[20px]">
        <h2 className="bestPrices w-fit h-fit text-[14px] rounded-sm bg-red-600 px-[8px] py-1">
          Best Prices!
        </h2>
        <h2 className="sliderTitle w-[450px] font-bold text-[50px] max-md:text-[35px] max-sm:w-full">
          Incredible Prices on All Your Favorite Items
        </h2>
        <p className="getMore font-normal text-[14px]">
          Get more for less on selected brands
        </p>
        <button className="myButton1 mt-3 text-[25px] max-md:text-[20px]">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default MainSlider;
