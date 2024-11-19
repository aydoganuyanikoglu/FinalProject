import React from "react";
import { styles, productCategories } from "../const";
import Image from "next/image";

const ShopbyCategory = () => {
  return (
    <section
      className={`w-full h-fit py-[100px] bg-gray-400 max-md:py-[20px] ${styles.pagePaddingX}`}
    >
      <div className="w-full h-fit bg-white py-[75px] px-[75px] max-md:px-[20px] max-md:py-[50px]">
        <h2 className="w-full text-center text-[24px] font-bold max-md:text-[20px]">
          Shop by Category
        </h2>
        <div>
          <ul className="gridContainer mt-[50px] w-full h-fit grid grid-cols-5 gap-8 max-md:grid-cols-4 max-sm:grid-cols-2">
            {productCategories.map((item, index) => (
              <li className="flex flex-col items-center" key={index}>
                <Image
                  src={item.logo}
                  alt={item.title}
                  width={150}
                  height={150}
                  className="hoverZoomEffect cursor-pointer flex items-center justify-center w-[300px] h-[300px] max-lg:w-[200px] max-lg:h-[200px] max-md:w-[140px] max-md:h-[140px]"
                />
                <p className="mt-2 text-[15px] max-md:text-[13px] font-bold">
                  {item.title}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ShopbyCategory;
