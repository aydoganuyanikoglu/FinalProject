"use client";
import React from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import HomeIcon from "@mui/icons-material/Home";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import InventoryIcon from "@mui/icons-material/Inventory";

interface OrderProps {
  onClose: () => void;
}

const OrderDetailsModal: React.FC<OrderProps> = ({ onClose }) => {
  const items = ["item1", "item2", "item3"];
  return (
    <div
      onClick={onClose}
      className="fixed z-[100] left-0 top-0 w-[100vw] h-[100vh] flex justify-center items-center backdrop-blur-md"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="innerContainer relative w-[800px] h-[650px] p-5 gap-5 bg-white shadow-md rounded-xl overflow-y-auto max-md:w-full "
      >
        <div onClick={onClose} className="absolute right-2 top-2">
          <CancelIcon className="text-[18px] text-orange-600 cursor-pointer" />
        </div>
        <div className="orderNumberContainer text-gray-500 font-light text-[14px] max-md:hidden">
          <span>Order No: </span>
          <span className="text-gray-700">123312312</span>
          <p className="text-[12px] text-gray-500 font-light max-md:text-[10px]">
            15 September 2024
          </p>
        </div>
        <div className="mt-3 productsContainer w-full h-fit p-2 border-[1px] border-gray-200 rounded-[10px]">
          <h2 className="text-[15px] text-gray-600 max-md:text-[13px]">
            Ordered Products
          </h2>
          <ul className="mt-2 w-full h-fit flex flex-col gap-1.5">
            {items.map((item, index) => {
              return (
                <li
                  key={index}
                  className="addressClass relative w-full h-[75px] min-h-fit flex gap-1 p-2 shadow-md rounded-md border-gray-200 border-[2px] cursor-pointer"
                >
                  <div className="imageContainer h-full !w-[55px] bg-black rounded-sm max-md:!w-[75px]"></div>
                  <div className="productTitlePrice flex flex-col justify-between">
                    <p className="text-[12px] text-gray-700 font-light max-md:text-[10px]">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Dignissimos, pariatur.
                    </p>
                    <p className="text-[12px] text-green-600 max-md:text-[10px] font-medium">
                      8899$
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="bottomContainer mt-3 grid grid-cols-2 gap-3 max-md:grid-cols-1">
          <div className="bottomAddress w-full min-h-fit p-2 border-[1px] border-gray-200 rounded-[10px]">
            <h2 className="text-[15px] text-gray-600 max-md:text-[13px]">
              Ordered to
            </h2>
            <div className="mt-2 relative w-full min-h-fit h-[190px] p-2 shadow-md rounded-md border-gray-200 border-[2px]">
              <div className="addressTitle flex items-center gap-1 ">
                <HomeIcon className="!text-gray-400 !text-[25px] max-md:!text-[20px]" />
                <h2 className="text-[13px] max-md:text-[11px] font-bold">
                  Address Name
                </h2>
              </div>
              <p className="mt-1 text-[12px] max-md:text-[11px]">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Eligendi iste nisi eum aspernatur labore architecto tempora
                deleniti necessitatibus. Accusantium, ipsa?
              </p>
            </div>
          </div>
          <div className="bottomPayment w-full h-fit p-2 border-[1px] border-gray-200 rounded-[10px]">
            <h2 className="text-[15px] text-gray-600 max-md:text-[13px]">
              Payment Method
            </h2>
            <div className="mt-2 relative w-full min-h-fit h-[190px] p-2 shadow-md rounded-md border-gray-200 border-[2px]">
              <div className="flex gap-2 pb-2">
                <CreditCardIcon className="text-[40px]" />
                <div>
                  <p className="text-[12px] text-green-600 max-md:text-[10px] font-medium">
                    8899$
                  </p>
                  <p className="cartNumber text-[12px] text-gray-400">
                    5400 61** **** 5444
                  </p>
                  <p className="text-[12px] text-gray-400">
                    Payment done with a credit card.
                  </p>
                </div>
              </div>
              <hr />
              <div className="pt-2 pb-2 flex flex-col gap-1">
                <div className="flex justify-between">
                  <p className="text-[12px] text-gray-400">Products</p>
                  <p className="text-[12px] text-black font-medium">8899$</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-[12px] text-gray-400">Shipping</p>
                  <p className="text-[12px] text-black font-medium">Free</p>
                </div>
              </div>
              <hr />
              <div className="pt-2 pb-2 flex justify-between">
                <p className="text-[14px] text-gray-400">Total</p>
                <p className="text-[14px] text-black font-medium">8899$</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
