"use client";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

const ShoppingCart = () => {
  const list = ["item1", "item2", "item3"];
  return (
    <section
      id="shoppingcart"
      className={`'w-full h-fit px-[300px] max-lg:px-[150px] max-mdp:px-[20px] py-[100px]`}
    >
      <div className="cartContainer w-full h-fit flex gap-[10px]  text-white max-md:flex-col max-md:p-0">
        <div className="containerLeft w-[80%] h-fit min-h-[400px] max-md:min-h-[300px] max-md:bg-[#0000] max-md:w-full max-md:p-0">
          <ul className="w-full h-fit flex flex-col gap-2 max-md:gap-1">
            {list.map((item, index) => (
              <li
                key={index}
                className="relative cartItems w-full h-[170px] p-2 flex gap-1 border-[1px] border-white rounded-md bg-gray-400 max-md:h-[130px]"
              >
                <div className="imageContainer w-[170px] h-full bg-white max-md:w-[130px]"></div>
                <div className="infosContainer h-full flex flex-col justify-between">
                  <div className="top">
                    <h2 className="text-[16px] font-bold">{item}</h2>
                    <p className="text-[14px] font-normal">product info</p>
                  </div>
                  <div className="bottom">
                    <p className="text-[14px] font-normal">10.00$</p>
                  </div>
                </div>
                <div className="decreaseIncreaseContainer absolute right-2 bottom-2 h-fit w-fit flex items-center gap-2 border-[1.5px] border-white rounded-md px-2 py-1">
                  <DeleteIcon className="decreaseIncreaseIcons" />
                  <span className="text-[12px]">1</span>
                  <AddIcon className="decreaseIncreaseIcons" />
                </div>
                <div className="deleteItemContainer hidden absolute top-2 right-2">
                  <CloseIcon className="decreaseIncreaseIcons" />
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="containerRight w-[20%] h-fit flex flex-col gap-2 rounded-md bg-gray-400 p-5 max-md:w-full max-md:p-3">
          <h2 className="containerRightTitle text-[16px] font-bold">
            Selected Products 3
          </h2>
          <h3 className="containerRightPrice text-[35px] text-black font-bold max-lg:text-[30px]">
            2700$
          </h3>
          <div className="max-md:w-[300px] max-xs:w-full">
            <button className="loginRegisterButton">Complete Shopping</button>
          </div>
          <hr />
          <div className="containerRightBottom flex flex-col gap-3 text-[11.5px]">
            <div className="productsPricing w-full flex justify-between">
              <p>Products</p>
              <p>2000$</p>
            </div>
            <div className="shippingPricing w-full flex justify-between">
              <p>Shipping</p>
              <p>30$</p>
            </div>
            <hr />
            <div className="earningsPricing w-full flex justify-between p-2 rounded-md bg-green-300 text-green-800">
              <div className="flex items-center gap-1">
                <p>Earnings</p>
                <EmojiEmotionsIcon className="text-green-800 text-[15px]" />
              </div>
              <p>-44$</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShoppingCart;
