"use client";
import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const ProductList = () => {
  const items = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const [isVisible, setisVisible] = useState(false);
  return (
    <div className="w-[80%] h-fit max-md:w-[55%] max-sm:w-full">
      <h2 className="font-normal text-[20px] max-md:text-[16px] ">
        Our Products
      </h2>
      <hr />
      <div className="relative mt-3">
        <div
          onClick={() => setisVisible((prev) => !prev)}
          className="w-fit cursor-pointer flex items-center text-[12px]"
        >
          <p>Recommended</p>
          <KeyboardArrowDownIcon className="text-[13.5px]" />
        </div>
        <ul
          className={`absolute ${
            isVisible ? "flex" : "hidden"
          } z-[10] left-0 top-[20px] flex flex-col text-[11px] bg-gray-600`}
        >
          <li
            onClick={() => setisVisible((prev) => !prev)}
            className="cursor-pointer p-2 text-white hover:bg-white hover:text-black"
          >
            Price (low to high)
          </li>
          <li
            onClick={() => setisVisible((prev) => !prev)}
            className="cursor-pointer p-2 text-white hover:bg-white hover:text-black"
          >
            Price (high to low)
          </li>
          <li
            onClick={() => setisVisible((prev) => !prev)}
            className="cursor-pointer p-2 text-white hover:bg-white hover:text-black"
          >
            Name A-Z
          </li>
          <li
            onClick={() => setisVisible((prev) => !prev)}
            className="cursor-pointer p-2 text-white hover:bg-white hover:text-black"
          >
            Name Z-A
          </li>
        </ul>
      </div>
      <div className="productsContainer w-full h-fit mt-2">
        <ul className="w-full h-fit grid grid-cols-4 gap-2 max-md:grid-cols-2">
          {items.map((item, index) => (
            <li key={index} className="relative w-full h-fit flex flex-col">
              <div className="image bg-gray-300 w-full h-[225px] max-sm:!h-[150px]"></div>
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
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductList;
