"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { styles } from "../const";

const BestSellers = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <section
      className={`w-full h-fit py-[100px] bg-gray-400 max-md:py-[20px] ${styles.pagePaddingX}`}
    >
      <div className="innerContainer w-full h-fit flex flex-col items-center gap-10 p-[50px] bg-white max-md:gap-2 max-md:px-[10px]">
        <div className="topTitle">
          <h2 className="w-full text-center text-[24px] font-bold max-md:text-[20px]">
            Best Seller
          </h2>
        </div>
        <div className="innerMiddle w-full h-fit py-[40px]">
          <Slider className="sliderContainer" {...settings}>
            <div className="relative bg-gray-300 w-full h-fit p-[5px] flex flex-col">
              <div className="image bg-white w-full h-[300px]"></div>
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
              <div className="image bg-white w-full h-[300px]"></div>
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
              <div className="image bg-white w-full h-[300px]"></div>
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
              <div className="image bg-white w-full h-[300px]"></div>
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
        <div className="buttonContainer">
          <button className="myButton1">View All</button>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
