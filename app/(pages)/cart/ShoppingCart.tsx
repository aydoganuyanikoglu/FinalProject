"use client";
import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { useProduct } from "@/context/ProductContext";
import { useAuth } from "@/context/AuthContext";
import { EmptyCart } from "@/app/const";
import { CartSkeleton } from "@/app/components/skeletons/Skeletons";

const ShoppingCart = () => {
  const {
    handleFetchCartProducts,
    cartProducts,
    handleDeleteAllProducts,
    handleDeleteSelectedProducts,
    handleDecreaseQuantity,
    handleIncreaseQuantity,
    handleFetchTotalPrice,
    totalPrice,
    handleFetchTotalQuantity,
    totalQuantity,
    loading,
  } = useProduct();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      handleFetchCartProducts(currentUser.id);
      handleFetchTotalPrice(currentUser.id);
      handleFetchTotalQuantity(currentUser.id);
    }
  }, [currentUser]);

  return (
    <section
      id="shoppingcart"
      className={`'w-full h-fit px-[300px] max-lg:px-[150px] max-mdp:px-[20px] py-[100px]`}
    >
      <div className="cartContainer w-full h-fit flex gap-[10px] text-white max-md:flex-col max-md:p-0">
        <div className="containerLeft relative w-[80%] h-fit min-h-[400px] pb-[100px] border-[2px] border-gray-200 rounded-[md] px-2 pt-2 max-md:min-h-[300px] max-md:bg-[#0000] max-md:w-full max-md:p-0">
          {loading ? (
            <CartSkeleton />
          ) : cartProducts.length === 0 ? (
            <EmptyCart />
          ) : (
            <ul className="w-full h-fit flex flex-col gap-2 max-md:gap-1">
              {cartProducts.map((item, index) => (
                <li
                  key={index}
                  className="relative cartItems w-full h-[170px] p-2 flex gap-1 border-[1px] border-white rounded-md bg-gray-400 max-md:h-[130px]"
                >
                  <div className="imageContainer w-[170px] h-full bg-white max-md:w-[130px]"></div>
                  <div className="infosContainer h-full flex flex-col justify-between">
                    <div className="top">
                      <h2 className="text-[16px] font-bold">{item.name}</h2>
                      <p className="text-[14px] font-normal">
                        {item.short_description}
                      </p>
                    </div>
                    <div className="bottom">
                      <p className="text-[14px] font-normal">{item.price}$</p>
                    </div>
                  </div>
                  <div className="decreaseIncreaseContainer absolute right-2 bottom-2 h-fit w-fit flex items-center gap-2 border-[1.5px] border-white rounded-md px-2 py-1">
                    <div
                      onClick={() => {
                        if (currentUser) {
                          handleDecreaseQuantity(currentUser.id, item);
                        }
                      }}
                    >
                      <DeleteIcon className="decreaseIncreaseIcons" />
                    </div>
                    <span className="text-[12px]">{item.quantity}</span>
                    <div
                      onClick={() => {
                        if (currentUser) {
                          handleIncreaseQuantity(currentUser.id, item);
                        }
                      }}
                    >
                      <AddIcon className="decreaseIncreaseIcons" />
                    </div>
                  </div>
                  <div
                    onClick={() => {
                      if (currentUser) {
                        handleDeleteSelectedProducts(currentUser.id, item);
                      }
                    }}
                    className="deleteItemContainer hidden absolute top-2 right-2"
                  >
                    <CloseIcon className="decreaseIncreaseIcons" />
                  </div>
                </li>
              ))}
            </ul>
          )}
          {cartProducts.length !== 0 && (
            <div
              onClick={() => {
                if (currentUser) {
                  handleDeleteAllProducts(currentUser.id);
                }
              }}
              className="deleteAllItemsContainer flex gap-2 absolute bottom-2 right-2 cursor-pointer border-b-[1px] border-b-black hover:scale-90"
            >
              <span className="text-black text-[13px]">Empty Cart</span>
              <DeleteIcon className="decreaseIncreaseIcons !text-black" />
            </div>
          )}
        </div>
        <div className="containerRight w-[20%] h-fit flex flex-col gap-2 rounded-md bg-gray-400 p-5 max-md:w-full max-md:p-3">
          <h2 className="containerRightTitle text-[16px] font-bold">
            Selected Products {totalQuantity}
          </h2>
          <h3 className="containerRightPrice text-[35px] font-bold max-lg:text-[30px]">
            {totalPrice}$
          </h3>
          <div className="max-md:w-[300px] max-xs:w-full">
            <button className="loginRegisterButton">Complete Shopping</button>
          </div>
          <hr />
          <div className="containerRightBottom flex flex-col gap-3 text-[11.5px]">
            <div className="productsPricing w-full flex justify-between">
              <p>Products</p>
              <p>{totalPrice}$</p>
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
