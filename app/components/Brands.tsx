import React from "react";
import { styles, BrandsNames } from "../const";

const Brands = () => {
  return (
    <section
      className={`h-fit w-full bg-gray-400 pb-[100px] ${styles.pagePaddingX}`}
    >
      <div className="w-full h-fit flex flex-col gap-[50px] items-center p-[50px] max-md:p-[20px] bg-white text-black">
        <h2 className="text-[24px] font-bold max-md:text-[20px]">Brands</h2>
        <ul className="grid grid-cols-5 w-full max-md:grid-cols-3 max-sm:grid-cols-2 max-xs:grid-cols-1">
          {BrandsNames.map((item, index) => (
            <li
              key={index}
              className="w-full h-[150px] flex items-center justify-center bg-gray-200 border-[1px] border-black font-semibold rounded-sm"
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Brands;
