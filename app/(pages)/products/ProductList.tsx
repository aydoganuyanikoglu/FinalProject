"use client";
import React, { useState, useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useProduct } from "@/context/ProductContext";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { Productstype } from "@/lib/types";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";

const ProductList = () => {
  const router = useRouter();
  const [isVisible, setisVisible] = useState(false);
  const { currentUser } = useAuth();
  const {
    selectedOrderBy,
    setSelectedOrderBy,
    filteredProducts,
    fetchAllProducts,
    handleAddtoCart,
    productStates,
  } = useProduct();
  const orderItems = [
    { name: "Recommended" },
    { name: "Price (low to high)" },
    { name: "Price (high to low)" },
    { name: "Name A-Z" },
    { name: "Name Z-A" },
  ];

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div className="w-[80%] h-fit max-md:w-[55%] max-sm:w-full">
      <h2 className="font-normal text-[20px] max-md:text-[16px] ">
        Our Products
      </h2>
      <hr />
      <div className="relative mt-3">
        <div
          onClick={() => setisVisible((prev) => !prev)}
          className="w-fit cursor-pointer flex items-center text-[12px]"
        >
          <p>{selectedOrderBy}</p>
          <KeyboardArrowDownIcon className="text-[13.5px]" />
        </div>
        <ul
          className={`absolute ${
            isVisible ? "flex" : "hidden"
          } z-[10] left-0 top-[20px] flex flex-col text-[11px] bg-gray-600`}
        >
          {orderItems.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                setisVisible((prev) => !prev);
                setSelectedOrderBy(item.name);
              }}
              className="cursor-pointer p-2 text-white hover:bg-white hover:text-black"
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="productsContainer w-full h-fit mt-2">
        <ul className="w-full h-fit grid grid-cols-4 gap-2 max-md:grid-cols-2">
          {filteredProducts.map((item, index) => {
            const productState = productStates[item.id] || {};
            const { loading, added } = productState;

            return (
              <li key={index} className="relative w-full h-fit flex flex-col">
                <div className="image bg-gray-300 w-full h-[190px] max-sm:!h-[150px]"></div>
                <div className="titleContainer">
                  <h2 className="productTitle text-[14px] font-medium mt-2 max-md:text-[13px]">
                    {item.name}
                  </h2>
                </div>
                <div className="priceContainer font-bold text-[14px]">
                  <p>{item.price}$</p>
                </div>
                <div className="buttonContainer">
                  <button
                    className={`${
                      loading
                        ? "loadingButton mt-7"
                        : added
                        ? "addedtoCartButton mt-7"
                        : "addtoCartButton mt-7"
                    }`}
                    disabled={loading}
                    onClick={() => {
                      if (currentUser?.id) {
                        handleAddtoCart(currentUser.id, item);
                      } else {
                        router.push("/login");
                      }
                    }}
                  >
                    {loading ? (
                      <CircularProgress size={20} className="text-white" />
                    ) : added ? (
                      "Added to Cart"
                    ) : (
                      "Add to Cart"
                    )}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ProductList;
