"use client";
import React, { useState, useEffect } from "react";
import { useProduct } from "@/context/ProductContext";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const FilterProducts = () => {
  const filterLinks = [
    { id: "0", name: "All Products", params: "allproducts" },
    { id: "1", name: "Mobile & Wearable Tech", params: "mobilewearable" },
    { id: "2", name: "Drones & Cameras", params: "dronescameras" },
    { id: "3", name: "Tablets", params: "tablets" },
    { id: "4", name: "Headphones & Speakers", params: "headphonesspeakers" },
    { id: "5", name: "Computers", params: "computers" },
  ];
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category");
  const [activeCategory, setActiveCategory] = useState<string | null>();
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [word, setWord] = useState("");
  const currentParams = new URLSearchParams(searchParams.toString());

  const handleCategoryClick = (category: string) => {
    currentParams.set("category", category);
    router.push(`/products?${currentParams.toString()}`);
  };

  const handleApplySearch = () => {
    if (word == "") {
      return;
    }
    currentParams.set("word", word);
    router.push(`/products?${currentParams.toString()}`);
  };

  const handleApplyPriceFilter = () => {
    if (minPrice) currentParams.set("minPrice", minPrice);
    if (maxPrice) currentParams.set("maxPrice", maxPrice);

    router.push(`/products?${currentParams.toString()}`);
  };

  useEffect(() => {
    if (!categoryFromUrl) {
      setActiveCategory("All Products");
    } else {
      setActiveCategory(categoryFromUrl);
    }
  }, [categoryFromUrl]);

  return (
    <div className="w-[20%] max-md:w-[45%] max-sm:w-full">
      <h2 className="font-normal text-[20px] max-md:text-[16px]">Browse By</h2>
      <hr />
      <div className="browseByContainer h-fit mt-2 py-[20px]">
        <ul className="flex flex-col gap-2">
          {filterLinks.map((item, index) => (
            <li
              key={index}
              onClick={() => handleCategoryClick(item.name)}
              className={`w-fit text-[14px] max-md:text-[13px] font-normal cursor-pointer border-b-[1px] border-b-[#0000] hover:text-orange-600 ${
                activeCategory === item.name
                  ? "font-bold text-orange-600 border-b-orange-600"
                  : ""
              }`}
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
              <input
                className="w-1/2"
                type="number"
                placeholder="min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
              <input
                className="w-1/2"
                type="number"
                placeholder="max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
            <button
              className="mt-3 w-full h-[35px] flex justify-center items-center font-semibold text-[13px] bg-gray-500 text-white hover:brightness-75"
              onClick={handleApplyPriceFilter}
            >
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
                value={word}
                onChange={(e) => setWord(e.target.value)}
              />
            </div>
            <button
              className="mt-3 w-full h-[35px] flex justify-center items-center font-semibold text-[13px] bg-gray-500 text-white hover:brightness-75"
              onClick={handleApplySearch}
            >
              Search
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FilterProducts;
