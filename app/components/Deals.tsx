import React from "react";
import { styles } from "../const";

const Deals = () => {
  return (
    <div className="w-full h-fit py-[100px] bg-gray-400 max-md:py-[20px]">
      <div
        className={`innercontainer grid grid-cols-2 gap-10 max-md:grid-cols-1 max-md:gap-5 ${styles.pagePaddingX} `}
      >
        <div
          className="bg-white w-full h-[500px] p-[50px] flex flex-col gap-1 
        max-md:px-[20px] max-md:h-fit max-md:py-[50px] max-md:min-h-[400px]
         max-md:text-center max-md:items-center max-md:justify-center"
        >
          <h2 className="smallTitle text-[18px] font-normal text-gray-400 max-md:text-[16px]">
            Holiday Deals
          </h2>
          <h2 className="bigTitle w-[200px] text-[45px] font-bold text-black max-md:text-[30px] max-md:w-full">
            Up to 30% off
          </h2>
          <p className="smallTitle text-[18px] font-normal text-gray-400 max-md:text-[16px] mt-3">
            Selected Smartphone Brands
          </p>
          <button className="myButton1 mt-3">Shop Now!</button>
        </div>
        <div
          className="bg-white w-full h-[500px] p-[50px] flex flex-col gap-1 
        max-md:px-[20px] max-md:h-fit max-md:py-[50px] max-md:min-h-[400px]
         max-md:text-center max-md:items-center max-md:justify-center"
        >
          <h2 className="smallTitle text-[18px] font-normal text-gray-400 max-md:text-[16px]">
            Just In
          </h2>
          <h2 className="bigTitle w-[250px] text-[45px] font-bold text-black max-md:text-[30px] max-md:w-full">
            Take Your Sound Anywhere
          </h2>
          <p className="smallTitle text-[18px] font-normal text-gray-400 max-md:text-[16px] mt-3">
            Top Headphone Brands
          </p>
          <button className="myButton1 mt-3">Shop Now!</button>
        </div>
      </div>
    </div>
  );
};

export default Deals;
