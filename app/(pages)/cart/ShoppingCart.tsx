"use client";
import React, { useEffect, useState, useCallback } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { useProduct } from "@/context/ProductContext";
import { useAuth } from "@/context/AuthContext";
import { EmptyCart } from "@/app/const";
import { CartSkeleton } from "@/app/components/skeletons/Skeletons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";

const ShoppingCart = () => {
  const router = useRouter();
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
    totalDiscount,
    handleFetchTotalDiscount,
  } = useProduct();
  const { currentUser } = useAuth();
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    if (currentUser?.id) {
      handleFetchCartProducts(currentUser.id);
      handleFetchTotalPrice(currentUser.id);
      handleFetchTotalQuantity(currentUser.id);
      handleFetchTotalDiscount(currentUser.id);
    }
  }, [currentUser, cartProducts?.length]);

  const handleCompleteShopping = () => {
    if (cartProducts?.length === 0) {
      toast.error("Your cart is empty!");
      return;
    } else {
      router.push("/cart/selectaddress");
    }
  };

  return (
    <section
      id="shoppingcart"
      className={`'w-full h-fit px-[300px] max-lg:px-[150px] max-mdp:px-[20px] py-[100px] bg-gray-300`}
    >
      <div className="cartContainer w-full h-fit flex gap-[10px] text-black max-md:flex-col max-md:p-0 max-md:gap-[40px]">
        <div
          className={`containerLeft relative w-[80%] h-fit min-h-[600px] pb-[100px] shadow-md p-2 max-md:min-h-[400px] max-md:bg-[#0000] max-md:w-full max-md:p-1 ${
            loading
              ? ""
              : cartProducts?.length === 0
              ? "bg-white rounded-md"
              : ""
          }`}
        >
          {loading ? (
            <CartSkeleton />
          ) : cartProducts?.length === 0 ? (
            <EmptyCart />
          ) : (
            <ul className="w-full h-fit flex flex-col gap-2">
              {cartProducts?.map((item, index) => {
                const isDiscounted = item.price !== item.discount_price;
                return (
                  <li
                    key={index}
                    className="cartItems relative w-full h-[170px] p-2 flex gap-2.5 rounded-md text-gray-700 bg-white"
                  >
                    <Link
                      className="imageContainer w-[170px] h-full flex items-center justify-center"
                      href={`/products/${item.id}`}
                    >
                      <Image
                        className="w-[75%] h-[60%]"
                        alt={item.name}
                        src={item.image_url}
                        width={160}
                        height={140}
                      />
                    </Link>
                    <div className="infosContainer w-[80%] h-full flex flex-col justify-between">
                      <div className="top">
                        <Link href={`/products/${item.id}`}>
                          <h2 className="text-[16px] font-bold max-md:text-[13px]">
                            {item.name}
                          </h2>
                        </Link>
                        <p className="text-[13px] font-normal max-md:text-[11px]">
                          {item.short_description}
                        </p>
                      </div>
                      <div className="bottom">
                        {isDiscounted ? (
                          <div className="h-[45px]">
                            <p className="text-[12px] line-through font-normal">
                              {item.price}$
                            </p>
                            <p className="text-[16px]">
                              {item.discount_price}$
                            </p>
                          </div>
                        ) : (
                          <div className="h-[45px] flex items-end">
                            <p className="text-[16px]">
                              {item.discount_price}$
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="decreaseIncreaseContainer absolute right-2 bottom-2 h-fit w-fit flex items-center gap-2 border-[1.5px] border-gray-400 rounded-md px-2 py-1">
                      <div
                        onClick={() => {
                          if (currentUser?.id) {
                            handleDecreaseQuantity(currentUser.id, item);
                          }
                        }}
                      >
                        <DeleteIcon className="decreaseIncreaseIcons" />
                      </div>
                      <span className="text-[12px]">{item.quantity}</span>
                      <div
                        onClick={() => {
                          if (currentUser?.id) {
                            handleIncreaseQuantity(currentUser.id, item);
                          }
                        }}
                      >
                        <AddIcon className="decreaseIncreaseIcons" />
                      </div>
                    </div>
                    <div
                      onClick={() => {
                        if (currentUser?.id) {
                          handleDeleteSelectedProducts(currentUser.id, item);
                        }
                      }}
                      className="deleteItemContainer absolute top-2 right-2 opacity-0"
                    >
                      <CloseIcon className="decreaseIncreaseIcons !text-black" />
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
          {cartProducts?.length !== 0 && (
            <div
              onClick={() => {
                if (currentUser?.id) {
                  handleDeleteAllProducts(currentUser.id);
                }
              }}
              className="deleteAllItemsContainer flex items-center gap-2 absolute bottom-2 right-2 cursor-pointer border-b-[1px] border-b-gray-700 hover:scale-90 max-md:gap-1"
            >
              <span className="text-gray-700 text-[13px] max-md:text-[11px]">
                Empty Cart
              </span>
              <DeleteIcon className="decreaseIncreaseIcons !text-gray-700 max-md:text-[13px]" />
            </div>
          )}
        </div>
        <div className="containerRight w-[20%] h-fit shadow-md p-2 max-md:w-full">
          <div className="w-full h-fit flex flex-col gap-2 p-5 text-gray-700 rounded-md bg-white max-md:w-full max-md:p-3">
            <h2 className="containerRightTitle text-[16px] font-bold">
              Selected Products {totalQuantity}
            </h2>
            <h3 className="containerRightPrice text-[35px] font-bold max-lg:text-[30px]">
              {totalPrice}$
            </h3>
            <div className="max-md:w-[300px] max-xs:w-full">
              <button
                className="loginRegisterButton"
                disabled={buttonLoading}
                onClick={handleCompleteShopping}
              >
                {buttonLoading ? "Redirecting.." : "Complete Shopping"}
              </button>
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
                <p>{totalDiscount}$</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShoppingCart;
