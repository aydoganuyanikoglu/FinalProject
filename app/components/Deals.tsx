import React from "react";
import { styles } from "../const";
import Image from "next/image";
import Link from "next/link";

const Deals = () => {
  return (
    <div className="w-full h-fit py-[100px] bg-gray-400 max-md:py-[20px]">
      <div
        className={`innercontainer grid grid-cols-2 gap-10 max-md:grid-cols-1 max-md:gap-5 ${styles.pagePaddingX} `}
      >
        <div
          className="relative bg-white w-full h-[500px] p-[50px] flex flex-col gap-1
        max-md:px-[20px] max-md:h-[300px]
         max-md:text-center max-md:items-center max-md:justify-center"
        >
          <Image
            src="/backgrounds/upto30.jpg"
            alt="upto30%"
            width={1000}
            height={1000}
            className="absolute z-[0] left-0 top-0 w-full h-full brightness-[60%]"
          />
          <div className="relative z-1 text-white">
            <h2 className="smallTitle text-[18px] font-normal max-md:text-[16px]">
              Holiday Deals
            </h2>
            <h2 className="bigTitle w-[200px] text-[45px] font-bold max-md:text-[30px] max-md:w-full">
              Up to 30% off
            </h2>
            <p className="smallTitle text-[18px] font-normal max-md:text-[16px] mt-3">
              Selected Smartphone Brands
            </p>
            <Link
              href={`/products?category=${encodeURIComponent(
                "Mobile & Wearable Tech"
              )}`}
            >
              <button className="myButton1 mt-3 !bg-[#3e1d5d] !border-[#3e1d5d] hover:!text-[#3e1d5d]">
                Shop Now!
              </button>
            </Link>
          </div>
        </div>
        <div
          className="relative bg-white w-full h-[500px] p-[50px] flex flex-col gap-1 
        max-md:px-[20px] max-md:h-[300px]
         max-md:text-center max-md:items-center max-md:justify-center"
        >
          <Image
            src="/backgrounds/headphonesbg.jpg"
            alt="upto30%"
            width={1000}
            height={700}
            className="absolute z-[0] left-0 top-0 w-full h-full brightness-[60%]"
          />
          <div className="relative z-1 text-white">
            <h2 className="smallTitle text-[18px] font-normal max-md:text-[16px]">
              Just In
            </h2>
            <h2 className="bigTitle w-[250px] text-[45px] font-bold max-md:text-[30px] max-md:w-full">
              Take Your Sound Anywhere
            </h2>
            <p className="smallTitle text-[18px] font-normal max-md:text-[16px] mt-3">
              Top Headphone Brands
            </p>
            <Link
              href={`/products?category=${encodeURIComponent(
                "Headphones & Speakers"
              )}`}
            >
              <button className="myButton1 mt-3 !bg-[#3e1d5d] !border-[#3e1d5d] hover:!text-[#3e1d5d]">
                Shop Now!
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deals;
