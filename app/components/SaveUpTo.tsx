import React from "react";
import BestPriceTag from "./BestPriceTag";
import Link from "next/link";
import Image from "next/image";

const SaveUpTo = () => {
  return (
    <section className={`relative w-full h-fit flex max-md:flex-col`}>
      <Image
        className="absolute left-0 top-0 w-[70%] h-full max-md:w-full max-md:h-1/2"
        src="/backgrounds/saveupto150.jpeg"
        alt="saveupto150"
        width={1000}
        height={600}
      />
      <div className="left relative w-[55%] h-[600px] max-md:w-full max-md:h-[400px]">
        <div className="absolute z-10 right-[-120px] top-[50px] rotate-12 max-md:top-auto max-md:right-[20px] max-md:bottom-[-75px]">
          <BestPriceTag />
        </div>
      </div>
      <div className="right clipPath1 bg-black w-[45%] h-[600px] flex flex-col justify-center items-center text-center text-white px-[50px] py-[50px] max-md:p-[20px] max-md:w-full max-md:h-[400px]">
        <h2 className="text-[24px] font-bold max-md:text-[20px]">Save up to</h2>
        <h2 className="text-[90px] font-bold max-md:text-[75px]">150$</h2>
        <p className="text-[24px] max-md:text-[20px]">
          on selected laptop
          <br />& tablets brands
        </p>
        <p className="text-[14px] font-normal text-gray-400 max-md:text-[12px]">
          Terms and conditions apply
        </p>
        <Link href={`/products?category=${encodeURIComponent("Computers")}`}>
          <button className="myButton1 mt-5 !bg-[#3e1d5d] !border-[#3e1d5d] hover:!text-[#3e1d5d]">
            Shop
          </button>
        </Link>
      </div>
    </section>
  );
};

export default SaveUpTo;
