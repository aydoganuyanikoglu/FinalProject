import React from "react";
import BestPriceTag from "./BestPriceTag";

const SaveUpTo = () => {
  return (
    <section className={`w-full h-fit flex max-md:flex-col bg-white`}>
      <div className="left relative bg-white w-[55%] h-[500px] max-md:w-full">
        <div className="absolute z-10 right-[-120px] top-[50px] rotate-12 max-md:top-auto max-md:right-[20px] max-md:bottom-[-75px]">
          <BestPriceTag />
        </div>
      </div>
      <div className="right clipPath1 bg-black w-[45%] h-[500px] flex flex-col justify-center items-center text-center text-white px-[50px] py-[50px] max-md:p-[20px] max-md:w-full">
        <h2 className="text-[24px] font-bold max-md:text-[20px]">Save up to</h2>
        <h2 className="text-[90px] font-bold max-md:text-[75px]">150$</h2>
        <p className="text-[24px] max-md:text-[20px]">
          on selected laptop
          <br />& tablets brands
        </p>
        <p className="text-[14px] font-normal text-gray-400 max-md:text-[12px]">
          Terms and conditions apply
        </p>
        <button className="myButton1 mt-5">Shop</button>
      </div>
    </section>
  );
};

export default SaveUpTo;
