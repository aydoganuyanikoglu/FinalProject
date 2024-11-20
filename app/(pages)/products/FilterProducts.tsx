import React from "react";
import { navbarLinks } from "@/app/const";

const FilterProducts = () => {
  return (
    <div className="w-[20%] max-md:w-[45%] max-sm:w-full">
      <h2 className="font-normal text-[20px] max-md:text-[16px]">Browse By</h2>
      <hr />
      <div className="browseByContainer h-fit mt-2 py-[20px]">
        <ul className="flex flex-col gap-2">
          {navbarLinks.map((item, index) => (
            <li
              key={index}
              className="w-fit text-[14px] max-md:text-[13px] font-normal cursor-pointer border-b-[1px] border-b-[#00000000] hover:border-b-[#000]"
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="filterByContainer mt-2">
        <h2 className="font-normal text-[20px] max-md:text-[16px]">
          Filter By
        </h2>
        <hr />
        <ul>
          <li className="filterPriceContainer h-fit p-3 mt-3 bg-gray-200">
            <h2 className="text-[13px]">Price</h2>
            <div className="filterInputs w-full flex gap-2">
              <input className="w-1/2" type="number" placeholder="min" />
              <input className="w-1/2" type="number" placeholder="max" />
            </div>
            <button className="mt-3 w-full h-[35px] flex justify-center items-center font-semibold text-[13px] bg-gray-500 text-white hover:brightness-75">
              Apply
            </button>
          </li>
          <li className="filterbyWordContainer h-fit p-3 mt-3 bg-gray-200">
            <h2 className="text-[13px]">Filter by a Word</h2>
            <div className="filterInputs w-full">
              <input
                className="w-full"
                type="text"
                placeholder="Type a word.."
              />
            </div>
            <button className="mt-3 w-full h-[35px] flex justify-center items-center font-semibold text-[13px] bg-gray-500 text-white hover:brightness-75">
              Search
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FilterProducts;
