import React from "react";
import HttpsIcon from "@mui/icons-material/Https";

const FavoriteList = () => {
  const items = [
    "i1",
    "i2",
    "i3",
    "i4",
    "i5",
    "6",
    "8",
    "8",
    "9",
    "10",
    "12",
    "13",
    "15",
  ];
  return (
    <section
      className="w-full h-fit flex justify-center py-[50px] max-mdp:px-[20px]"
      id="favorites"
    >
      <div className="innerContainer w-[1000px] h-fit rounded-md max-md:w-full">
        <div className="titleContainer w-[60%] flex justify-between border-[2px] border-gray-600 rounded-md px-3 py-1 max-md:w-full max-sm:flex-col">
          <h2 className="favoriteListTitle text-[18px] font-bold max-md:text-[16px]">
            My Favorite List
          </h2>
          <div className="flex items-center gap-5">
            <p className="productCount text-[14px] font-normal">35 products</p>
            <div className="flex items-center text-gray-400">
              <HttpsIcon className="text-[13px]" />
              <p className="text-[14px] font-normal">Secret List</p>
            </div>
          </div>
        </div>
        <div className="productsContainer w-full h-fit mt-4">
          <ul className="w-full h-fit mt-4 grid grid-cols-4 gap-2 max-smp:grid-cols-3 max-sm:grid-cols-2">
            {items.map((item, index) => (
              <li
                key={index}
                className="relative w-full h-fit p-[5px] flex flex-col"
              >
                <div className="image bg-gray-300 w-full h-[225px] max-sm:!h-[150px]"></div>
                <div className="titleContainer">
                  <h2 className="productTitle text-[14px] font-medium mt-2 max-md:text-[13px]">
                    JP - Space Tablet 10.4" Wi-Fi 32GB
                  </h2>
                </div>
                <div className="priceContainer font-bold">
                  <p>85.00$</p>
                </div>
                <div className="buttonContainer">
                  <button className="addtoCartButton absolute bottom-0 text-[12px] mt-7">
                    Add to Cart
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default FavoriteList;
