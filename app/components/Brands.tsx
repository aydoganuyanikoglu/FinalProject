"use client";
import React, { useEffect, useState } from "react";
import { styles, BrandsNames } from "../const";
import { useProduct } from "@/context/ProductContext";
import { BrandsSkeleton } from "./skeletons/Skeletons";

const Brands = () => {
  const { brands, handleFetchBrands } = useProduct();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchFunction = async () => {
      try {
        await handleFetchBrands();
        setLoading(false);
      } catch (error) {
        console.error("error while fetcing..", error);
        setLoading(false);
      }
    };
    fetchFunction();
  }, [brands.length]);

  return (
    <section
      className={`h-fit w-full bg-gray-400 pb-[100px] ${styles.pagePaddingX}`}
    >
      <div className="w-full h-fit flex flex-col gap-[50px] items-center p-[50px] max-md:p-[20px] bg-white text-black">
        <h2 className="text-[24px] font-bold max-md:text-[20px]">Brands</h2>
        {loading ? (
          <BrandsSkeleton />
        ) : (
          <ul className="grid grid-cols-10 w-full gap-3 max-md:grid-cols-6 max-sm:grid-cols-2">
            {brands.map((item, index) => (
              <li
                key={index}
                className="w-full h-[100px] flex items-center justify-center bg-[#0c494f] font-semibold rounded-sm text-[14px] text-white cursor-pointer border-[1.5px] border-[#0c494f] hover:-mt-2 hover:bg-white hover:text-[#0c494f]"
              >
                {item.brand}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Brands;
