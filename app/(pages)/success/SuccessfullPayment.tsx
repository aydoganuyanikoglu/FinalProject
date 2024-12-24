"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import CelebrationIcon from "@mui/icons-material/Celebration";
import confetti from "canvas-confetti";
import { useSearchParams } from "next/navigation";
import { fetchOrdersByUserAndOrderId, checkDefaultAddress } from "@/lib/data";
import { useAuth } from "@/context/AuthContext";
import { addressesType, OrdersType } from "@/lib/types";
import Image from "next/image";
import HomeIcon from "@mui/icons-material/Home";

const SuccessfullPayment = () => {
  const [loading, setLoading] = useState(true);
  const [orderedProducts, setOrderedProducts] = useState<OrdersType[]>([]);
  const [billingAddress, setBillingAddress] = useState<addressesType | null>(
    null
  );
  const searchParams = useSearchParams();
  const session = searchParams.get("session");
  const { currentUser } = useAuth();

  const handleFetchOrders = async () => {
    setLoading(true);
    try {
      const fetchedProducts = await fetchOrdersByUserAndOrderId(
        currentUser?.id,
        session,
        "pending"
      );
      const fetchedBillingAddress = await checkDefaultAddress(currentUser?.id);
      console.log("fetched products:", fetchedProducts);
      setOrderedProducts(fetchedProducts);
      setBillingAddress(fetchedBillingAddress);
    } catch (error) {
      console.error("Error while fetching addresses..", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    confetti({
      particleCount: 100,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
    });

    confetti({
      particleCount: 100,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
    });
  }, []);

  useEffect(() => {
    handleFetchOrders();
  }, [currentUser]);

  return (
    <div className="relative flex flex-col items-center justify-center px-[20px] py-5">
      <CelebrationIcon className="text-[50px] text-orange-500" />
      <h2 className="mt-5 text-[24px] font-bold text-orange-500 max-md:text-[18px] max-md:text-center">
        Congrats! Payment is successfull!
      </h2>
      <p className="text-[13px] max-md:text-center">
        You can check your order details down below!
      </p>
      <div className="orderDetails mt-10 w-[800px] max-md:w-full text-left">
        <h2 className="max-md:text-[14px] font-bold">Order Details</h2>
        <p className="text-[13px]">Order ID: {session}</p>
        <ul className="orderedProducts w-full mt-3">
          {orderedProducts.map((item, index) => {
            return (
              <li
                key={index}
                className="addressClass relative w-full h-fit min-h-[80px] flex gap-1 p-2 shadow-md rounded-md border-gray-200 border-[2px] cursor-pointer"
              >
                <div className="imageContainer h-full !w-[65px] flex items-center rounded-sm max-md:!w-[75px]">
                  <Image
                    className="w-full !h-[50px] mt-2.5"
                    src={item.product_image || "/camera.webp"}
                    alt={item.product_name}
                    width={60}
                    height={50}
                  />
                </div>
                <div className="productTitlePrice w-[80%] flex flex-col justify-between ml-2 text-left">
                  <div>
                    <p className="text-[13px] text-black max-md:text-[10px]">
                      {item.product_name}
                    </p>
                    <p className="text-[12px] text-gray-700 font-light max-md:text-[10px]">
                      {item.product_description}
                    </p>
                  </div>
                  <p className="mt-2 text-[12px] text-green-600 max-md:text-[10px] font-medium">
                    {item.product_price}${" "}
                    <span className="text-gray-700 ml-2">
                      x{item.product_quantity}
                    </span>
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="addressesContainer mt-3 w-full h-fit flex gap-3 max-sm:flex-col">
          <div className="orderedToAddress w-1/2 h-fit p-2 border-[1px] border-gray-200 rounded-[10px] max-md:w-full">
            <h2 className="text-[15px] text-gray-600 max-md:text-[13px] text-left">
              Ordered to
            </h2>
            <div className="mt-2 relative w-full min-h-fit h-[170px] p-2 shadow-md rounded-md border-gray-200 border-[2px]">
              <div className="addressTitle flex items-center gap-1">
                <HomeIcon className="!text-gray-400 !text-[25px] max-md:!text-[20px]" />
                <h2 className="text-[13px] max-md:text-[11px] font-bold">
                  {orderedProducts[0]?.country} - {orderedProducts[0]?.state}
                </h2>
              </div>
              <p className="mt-1 text-[12px] max-md:text-[11px] text-left">
                {orderedProducts[0]?.city} {orderedProducts[0]?.line1} <br />{" "}
                {orderedProducts[0]?.line2}
              </p>
            </div>
          </div>
          <div className="billingAddress w-1/2 h-fit p-2 border-[1px] border-gray-200 rounded-[10px] max-md:w-full">
            <h2 className="text-[15px] text-gray-600 max-md:text-[13px] text-left">
              Billing Address
            </h2>
            <div className="mt-2 relative w-full min-h-fit h-[170px] p-2 shadow-md rounded-md border-gray-200 border-[2px]">
              <div className="addressTitle flex items-center gap-1">
                <HomeIcon className="!text-gray-400 !text-[25px] max-md:!text-[20px]" />
                <h2 className="text-[13px] max-md:text-[11px] font-bold">
                  {billingAddress?.addresstitle}
                </h2>
              </div>
              <p className="mt-1 text-[12px] max-md:text-[11px] text-left">
                {billingAddress?.address}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[250px]">
        <Link
          href="/profile/orders"
          className="loginRegisterButton mt-3 !text-[14px]"
        >
          My Orders
        </Link>
      </div>
    </div>
  );
};

export default SuccessfullPayment;
