"use client";
import React, { useState, useEffect } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import HomeIcon from "@mui/icons-material/Home";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { fetchOrdersByUserAndOrderId } from "@/lib/data";
import { OrdersType } from "@/lib/types";
import Image from "next/image";
import { OrderDetailsSkeleton } from "../skeletons/Skeletons";

interface OrderProps {
  onClose: () => void;
  order: any;
  user_id: string | null | undefined;
}

const OrderDetailsModal: React.FC<OrderProps> = ({
  onClose,
  order,
  user_id,
}) => {
  const [loadingDetails, setLoadingDetails] = useState(true);
  const [orderDetails, setOrderDetails] = useState<OrdersType[]>([]);

  const handleFetchOrderDetails = async () => {
    setLoadingDetails(true);
    try {
      if (user_id) {
        const results = await fetchOrdersByUserAndOrderId(
          user_id,
          order.order_id
        );
        setOrderDetails(results);
        setLoadingDetails(false);
      }
    } catch (error: any) {
      console.error("Error while fetchin order details:", error);
      setLoadingDetails(false);
    }
  };

  useEffect(() => {
    handleFetchOrderDetails();
  }, [user_id]);

  return (
    <div
      onClick={onClose}
      className="fixed z-[100] left-0 top-0 w-[100vw] h-[100vh] flex justify-center items-center backdrop-blur-md"
    >
      {loadingDetails ? (
        <OrderDetailsSkeleton />
      ) : (
        <div
          onClick={(event) => event.stopPropagation()}
          className="innerContainer relative w-[800px] h-[650px] p-5 gap-5 bg-white shadow-md rounded-xl overflow-y-auto max-md:w-full "
        >
          <div onClick={onClose} className="absolute right-2 top-2">
            <CancelIcon className="text-[18px] text-orange-600 cursor-pointer" />
          </div>
          <div className="orderNumberContainer text-gray-500 font-light text-[14px] max-md:hidden">
            <span>Order No: </span>
            <span className="text-gray-700">{order.order_id}</span>
            <p className="text-[12px] text-gray-500 font-light max-md:text-[10px]">
              {order.order_date && !isNaN(new Date(order.order_date).getTime())
                ? new Intl.DateTimeFormat("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }).format(new Date(order.order_date))
                : "Invalid date"}
            </p>
          </div>
          <div className="mt-3 productsContainer w-full h-fit p-2 border-[1px] border-gray-200 rounded-[10px]">
            <h2 className="text-[15px] text-gray-600 max-md:text-[13px]">
              Ordered Products
            </h2>
            <ul className="mt-2 w-full h-fit flex flex-col gap-1.5">
              {orderDetails.map((item, index) => {
                return (
                  <li
                    key={index}
                    className="addressClass relative w-full h-[75px] min-h-fit flex gap-1 p-2 shadow-md rounded-md border-gray-200 border-[2px] cursor-pointer"
                  >
                    <div className="imageContainer h-full !w-[65px] flex items-center rounded-sm max-md:!w-[75px]">
                      <Image
                        className="w-full !h-[50px]"
                        src={item.product_image || "/camera.webp"}
                        alt={item.product_name}
                        width={60}
                        height={50}
                      />
                    </div>
                    <div className="productTitlePrice w-[80%] flex flex-col justify-between">
                      <div>
                        <p className="text-[13px] text-black max-md:text-[10px]">
                          {item.product_name}
                        </p>
                        <p className="text-[12px] text-gray-700 font-light max-md:text-[10px]">
                          {item.product_description}
                        </p>
                      </div>
                      <p className="text-[12px] text-green-600 max-md:text-[10px] font-medium">
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
                    {orderDetails[0]?.country} - {orderDetails[0]?.state}
                  </h2>
                </div>
                <p className="mt-1 text-[12px] max-md:text-[11px]">
                  {orderDetails[0]?.city} {orderDetails[0]?.line1} <br />{" "}
                  {orderDetails[0]?.line2}
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
                      {order.total_price}$
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
                    <p className="text-[12px] text-black font-medium">
                      {order.product_total_price}$
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-[12px] text-gray-400">Shipping</p>
                    <p className="text-[12px] text-black font-medium">30$</p>
                  </div>
                </div>
                <hr />
                <div className="pt-2 pb-2 flex justify-between">
                  <p className="text-[14px] text-gray-400">Total</p>
                  <p className="text-[14px] text-black font-medium">
                    {order.total_price}$
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetailsModal;
