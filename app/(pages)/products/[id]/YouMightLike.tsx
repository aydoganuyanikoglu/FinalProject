"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const YouMightLike = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="mt-10">
      <h2 className="w-full text-center font-bold text-[20px] max-md:text-[18px]">
        You might also like!
      </h2>
      <Slider className="sliderContainer mt-5" {...settings}>
        <div className="relative bg-gray-300 w-full h-fit p-[5px] flex flex-col">
          <div className="image bg-white w-full h-[180px] max-sm:h-[130px]"></div>
          <div className="titleContainer">
            <h2 className="productTitle text-[14px] font-medium mt-2 max-md:text-[13px]">
              JP - Space Tablet 10.4" Wi-Fi 32GB
            </h2>
          </div>
          <div className="priceContainer font-bold">
            <p>85.00$</p>
          </div>
          <div className="buttonContainer">
            <button className="addtoCartButton absolute bottom-0 text-[12px] mt-7">
              Add to Cart
            </button>
          </div>
        </div>
        <div className="relative bg-gray-300 w-full h-fit p-[5px] flex flex-col">
          <div className="image bg-white w-full h-[180px] max-sm:h-[130px]"></div>
          <div className="titleContainer">
            <h2 className="productTitle text-[14px] font-medium mt-2 max-md:text-[13px]">
              JP - Space Tablet 10.4" Wi-Fi 32GB
            </h2>
          </div>
          <div className="priceContainer font-bold">
            <p>85.00$</p>
          </div>
          <div className="buttonContainer">
            <button className="addtoCartButton absolute bottom-0 text-[12px] mt-7">
              Add to Cart
            </button>
          </div>
        </div>
        <div className="relative bg-gray-300 w-full h-fit p-[5px] flex flex-col">
          <div className="image bg-white w-full h-[180px] max-sm:h-[130px]"></div>
          <div className="titleContainer">
            <h2 className="productTitle text-[14px] font-medium mt-2 max-md:text-[13px]">
              JP - Space Tablet 10.4" Wi-Fi 32GB
            </h2>
          </div>
          <div className="priceContainer font-bold">
            <p>85.00$</p>
          </div>
          <div className="buttonContainer">
            <button className="addtoCartButton absolute bottom-0 text-[12px] mt-7">
              Add to Cart
            </button>
          </div>
        </div>
        <div className="relative bg-gray-300 w-full h-fit p-[5px] flex flex-col">
          <div className="image bg-white w-full h-[180px] max-sm:h-[130px]"></div>
          <div className="titleContainer">
            <h2 className="productTitle text-[14px] font-medium mt-2 max-md:text-[13px]">
              JP - Space Tablet 10.4" Wi-Fi 32GB
            </h2>
          </div>
          <div className="priceContainer font-bold">
            <p>85.00$</p>
          </div>
          <div className="buttonContainer">
            <button className="addtoCartButton absolute bottom-0 text-[12px] mt-7">
              Add to Cart
            </button>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default YouMightLike;
