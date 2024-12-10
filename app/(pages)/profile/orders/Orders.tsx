"use client";
import React, { useState } from "react";
import Link from "next/link";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import InventoryIcon from "@mui/icons-material/Inventory";
import OrderDetailsModal from "@/app/components/modals/OrderDetailsModal";

const Orders = () => {
  const [showModal, setShowModal] = useState(false);
  const items = ["item1", "item2", "item3"];

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  return (
    <div
      className={`w-full h-fit flex flex-col items-center py-[100px] max-md:px-[10px]`}
    >
      <div className="navigatorContainer flex gap-2">
        <Link
          className="w-fit text-[15px] text-gray-800 border-b-[1px] border-b-[#0000] hover:border-b-[#000]"
          href="/"
        >
          Home
        </Link>
        <span className="gray-400">|</span>
        <Link
          className="w-fit text-[15px] text-gray-800 border-b-[1px] border-b-[#0000] hover:border-b-[#000]"
          href="/profile"
        >
          Profile
        </Link>
        <span className="gray-400">|</span>
        <p className="font-normal text-[15px] text-gray-400">Orders</p>
      </div>
      <div className="mt-5 w-[1100px] py-10 max-md:py-2 h-fit border-[1px] border-gray-200 rounded-md flex flex-col gap-7 items-center px-[40px] max-sm:w-full max-sm:px-[10px]">
        <div className="w-full h-fit p-3 bg-white rounded shadow-md">
          <div className="w-full flex justify-between items-center">
            <h2 className="text-[19px] max-md:text-[15px] font-bold">
              My Orders
            </h2>
            <Link
              href="/products"
              className="flex gap-1 items-center cursor-pointer border-[1px] border-orange-600 px-3 py-2 rounded-md text-orange-600 hover:!text-[white] hover:!bg-orange-600"
            >
              <InventoryIcon className="text-[20px] !transition-none" />
              <button className="text-[13px] font-medium">Order More!</button>
            </Link>
          </div>
          <ul className="mt-3 w-full h-fit flex flex-col gap-2">
            {items.map((item, index) => {
              return (
                <li
                  onClick={handleShowModal}
                  key={index}
                  className="addressClass relative w-full h-[55px] min-h-fit flex justify-between items-center p-2 shadow-md rounded-md border-gray-200 border-[2px] cursor-pointer"
                >
                  <div className="imageContainer h-full w-[40px] bg-black rounded-sm"></div>
                  <div className="orderNumberContainer text-gray-500 font-light text-[14px] max-md:hidden">
                    <span>Order No: </span>
                    <span className="text-black">123312312</span>
                  </div>
                  <div className="orderStatusContainer flex items-center gap-1">
                    <HourglassEmptyIcon className="text-[16px] text-gray-500" />
                    <p className="text-[12px] text-black max-md:text-[10px]">
                      Order is waiting..
                    </p>
                  </div>
                  <div className="createdAt-PriceContainer flex flex-col items-end">
                    <p className="text-[12px] text-gray-400 font-light max-md:text-[10px]">
                      15 September 2024
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
      </div>
      {showModal && <OrderDetailsModal onClose={handleCloseModal} />}
    </div>
  );
};

export default Orders;
