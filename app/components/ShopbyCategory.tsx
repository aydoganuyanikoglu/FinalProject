import React from "react";
import { styles } from "../const";

const ShopbyCategory = () => {
  const list = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  return (
    <section
      className={`w-full h-fit py-[100px] bg-gray-400 max-md:py-[20px] ${styles.pagePaddingX}`}
    >
      <div className="w-full h-fit bg-white py-[75px] px-[75px] max-md:px-[20px] max-md:py-[50px]">
        <h2 className="w-full text-center text-[24px] font-bold max-md:text-[20px]">
          Shop by Category
        </h2>
        <div>
          <ul className="gridContainer mt-[50px] w-full h-fit grid grid-cols-5 gap-2 max-md:gap-4 max-sm:grid-cols-2">
            {list.map((item, index) => (
              <li className="flex flex-col items-center" key={index}>
                <div className="w-[300px] h-[300px] max-lg:w-[200px] max-lg:h-[200px] max-md:w-[140px] max-md:h-[140px] rounded-[50%] bg-gray-200"></div>
                <p className="text-[18px] max-md:text-[15px] font-bold">
                  Category
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
