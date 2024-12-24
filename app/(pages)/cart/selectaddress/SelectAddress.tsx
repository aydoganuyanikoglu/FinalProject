"use client";
import React, { useState, useEffect } from "react";
import { addressesType } from "@/lib/types";
import { useAuth } from "@/context/AuthContext";
import {
  fetchAddresses,
  checkDefaultAddress,
  selectDefaultAddress,
} from "@/lib/data";
import { EmptySelectAddresses } from "@/app/components/EmptyComponents";
import { useProduct } from "@/context/ProductContext";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { AddressesSkeleton } from "@/app/components/skeletons/Skeletons";
import HomeIcon from "@mui/icons-material/Home";
import { toast } from "react-toastify";

const SelectAddress = () => {
  const [addresses, setAddresses] = useState<addressesType[] | undefined>([]);
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const { currentUser } = useAuth();
  const {
    handleFetchTotalPrice,
    totalPrice,
    handleFetchTotalQuantity,
    totalQuantity,
    totalDiscount,
    handleFetchTotalDiscount,
  } = useProduct();

  const handleFetchAddresses = async () => {
    try {
      if (currentUser?.id) {
        const addresses = await fetchAddresses(currentUser.id);
        setAddresses(addresses);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error while fetchin addresses", error);
      setLoading(false);
    }
  };

  const handleAddressSelect = async (address: addressesType) => {
    try {
      if (currentUser?.id && address.id) {
        await selectDefaultAddress(address.id, currentUser.id);
        handleFetchAddresses();
        console.log("Default address selected:", address);
      }
    } catch (error) {
      console.error("Error selecting default address:", error);
    }
  };

  useEffect(() => {
    if (currentUser?.id) {
      handleFetchAddresses();
      handleFetchTotalPrice(currentUser.id);
      handleFetchTotalQuantity(currentUser.id);
      handleFetchTotalDiscount(currentUser.id);
    }
  }, [currentUser]);

  const handleCompleteShopping = async () => {
    setButtonLoading(true);
    try {
      const isSelected = await checkDefaultAddress(currentUser?.id);
      if (!isSelected) {
        toast.error("You need to select your billing address first!");
        return;
      } else if (totalPrice == 0) {
        toast.error("You cart is empty!");
        return;
      }
      const response = await fetch("/api/createCheckoutSession", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error("Failed to create checkout session");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while processing your payment.");
    } finally {
      setButtonLoading(false);
    }
  };

  return (
    <section
      id="shoppingcart"
      className={`'w-full h-fit px-[300px] max-lg:px-[150px] max-mdp:px-[20px] py-[100px] bg-gray-300`}
    >
      <div className="cartContainer w-full h-fit flex gap-[10px] text-black max-md:flex-col max-md:p-0 max-md:gap-[40px]">
        <div
          className={`containerLeft relative w-[80%] h-fit min-h-[600px] pb-[100px] shadow-md p-2 bg-white rounded-md max-md:min-h-[400px] max-md:bg-[#0000] max-md:w-full max-md:p-1`}
        >
          <h2 className="text-[18px] text-gray-600 font-bold max-md:text-[15px]">
            Select Your Billing Address
          </h2>
          {loading ? (
            <AddressesSkeleton />
          ) : addresses?.length === 0 ? (
            <EmptySelectAddresses />
          ) : (
            <ul className="mt-3 w-full h-fit flex flex-col gap-2">
              {addresses?.map((item, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => handleAddressSelect(item)}
                    className={`addressClass relative w-full min-h-fit h-[170px] p-2 shadow-md rounded-md border-[3px] bg-gray-200 cursor-pointer ${
                      item.default ? "border-orange-500" : "border-gray-200"
                    }`}
                  >
                    <div className="topContainer flex items-center gap-1 ">
                      <HomeIcon className="!text-orange-600 !text-[40px] max-md:!text-[25px]" />
                      <h2 className="text-gray-600 max-md:text-[14px] font-bold">
                        {item.name}
                      </h2>
                    </div>
                    <p className="mt-3 text-[14px] max-md:text-[11px]">
                      {item.city}
                    </p>
                    <p className="text-[14px] max-md:text-[11px]">
                      {item.phone}
                    </p>
                    <p className="w-[90%] mt-1 text-[14px] font-light max-md:text-[11px] max-sm:w-full">
                      {item.address}
                    </p>
                  </li>
                );
              })}
            </ul>
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

export default SelectAddress;
