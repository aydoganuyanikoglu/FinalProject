"use client";
import React, { useState, useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useProduct } from "@/context/ProductContext";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { Productstype } from "@/lib/types";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { ProductsSkeleton } from "@/app/components/skeletons/Skeletons";

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
    favoriteProducts,
    handleFetchFavoriteProducts,
    handleAddToFavorites,
    handleRemoveFromFavorites,
    loading,
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

  useEffect(() => {
    if (currentUser?.id) {
      handleFetchFavoriteProducts(currentUser.id);
    }
  }, [currentUser]);

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
      <div className="productsContainer w-full h-fit mt-5">
        {loading ? (
          <ProductsSkeleton />
        ) : (
          <ul className="w-full h-fit grid grid-cols-4 gap-2 max-md:grid-cols-2">
            {filteredProducts.map((item, index) => {
              const productState = productStates[item.id] || {};
              const { loading, added } = productState;
              const isLiked = favoriteProducts.some(
                (product) => product.name === item.name
              );
              const isDiscounted = item.price !== item.discount_price;

              return (
                <li key={index} className="relative w-full h-fit flex flex-col">
                  {currentUser && (
                    <div className="addLikeContainer absolute right-2 top-2 cursor-pointer">
                      <button
                        onClick={() => {
                          if (currentUser?.id) {
                            if (isLiked) {
                              handleRemoveFromFavorites(
                                currentUser.id,
                                item.id
                              );
                            } else {
                              handleAddToFavorites(currentUser.id, item);
                            }
                          } else {
                            router.push("/login");
                          }
                        }}
                      >
                        {isLiked ? (
                          <FavoriteIcon className="text-red-600" />
                        ) : (
                          <FavoriteBorderIcon />
                        )}
                      </button>
                    </div>
                  )}
                  {isDiscounted && (
                    <div className="absolute left-1 top-2.5 z-1 flex justify-center items-center -rotate-45">
                      <div className="absolute !w-[50px] !h-[50px] rounded-[50%] bg-red-600"></div>
                      <p className="relative z-1 text-white font-bold text-[12px]">
                        {item.discount_percentage}%
                      </p>
                    </div>
                  )}
                  <div className="image bg-gray-300 w-full h-[190px] max-sm:!h-[150px]"></div>
                  <div className="titleContainer">
                    <h2 className="productTitle text-[14px] font-medium mt-2 max-md:text-[13px]">
                      {item.name}
                    </h2>
                  </div>
                  <div className="priceContainer mt-4 font-bold">
                    {isDiscounted ? (
                      <div className="h-[45px]">
                        <p className="text-[12px] line-through font-normal">
                          {item.price}$
                        </p>
                        <p className="text-[16px]">{item.discount_price}$</p>
                      </div>
                    ) : (
                      <div className="h-[45px] flex items-end">
                        <p className="text-[16px]">{item.discount_price}$</p>
                      </div>
                    )}
                  </div>
                  <div className="buttonContainer">
                    <button
                      className={`${
                        loading
                          ? "loadingButton"
                          : added
                          ? "addedtoCartButton"
                          : "addtoCartButton"
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
        )}
      </div>
    </div>
  );
};

export default ProductList;
