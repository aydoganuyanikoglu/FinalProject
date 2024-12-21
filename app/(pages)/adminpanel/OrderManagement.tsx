"use client";
import { OrdersType } from "@/lib/types";
import React, { useState, useEffect } from "react";
import { fetchAllOrders, updateOrderStatus } from "@/lib/data";
import Image from "next/image";
import { useToast } from "@/context/ToastContext";

const OrderManagement = () => {
  const [orders, setOrders] = useState<OrdersType[]>([]);
  const { showToast } = useToast();

  const handleFetchAllOrders = async () => {
    try {
      const results = await fetchAllOrders();
      setOrders(results);
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    handleFetchAllOrders();
  }, []);

  return (
    <div className="w-full h-fit min-h-[90vh] bg-[#4048b9] rounded-md">
      <div className="innerContainer w-full h-fit p-5">
        <h2 className="w-fit text-[16px] font-bold border-b-white border-b-[1.5px]">
          Ordered Products
        </h2>
        <ul className="w-full h-fit mt-5 flex flex-col gap-2">
          {orders.map((item, index) => {
            const handleStatusChange = async (newStatus: string) => {
              try {
                await updateOrderStatus(
                  item.user_id,
                  item.order_id,
                  item.product_name,
                  newStatus
                );
                await handleFetchAllOrders();
                showToast("Order status updated successfully");
              } catch (error) {
                console.error("Failed to update order status:", error);
                alert("Failed to update order status");
              }
            };
            return (
              <li
                key={index}
                className="addressClass relative w-full h-[55px] min-h-fit grid grid-cols-6 py-1.5 px-2 shadow-md rounded-md border-gray-200 border-[2px] hover:bg-black cursor-pointer"
              >
                <div className="imageContainer w-[45px] h-full rounded-sm">
                  <Image
                    className="w-full h-full"
                    src={item.product_image || ""}
                    alt={item.product_name}
                    width={40}
                    height={40}
                  />
                </div>
                <p className="userid w-full flex items-center text-white font-light text-[14px]">
                  user:{item.user_id}
                </p>
                <p className="orderid w-full flex items-center text-white font-light text-[14px]">
                  {item.order_id}
                </p>
                <p className="productname w-full flex items-center text-white font-light text-[14px]">
                  {item.product_name}
                </p>
                <p className="status w-full flex justify-center items-center text-white font-light text-[14px]">
                  <select
                    className="bg-blue-500 text-white rounded px-2 py-1 cursor-pointer"
                    value={item.order_status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                  >
                    <option
                      value={
                        item.order_status === "pending" ? "pending" : "shipped"
                      }
                    >
                      {item.order_status === "pending" ? "Pending" : "Shipped"}
                    </option>
                    <option
                      value={
                        item.order_status === "pending" ? "shipped" : "pending"
                      }
                    >
                      {item.order_status === "pending" ? "Shipped" : "Pending"}
                    </option>
                  </select>
                </p>
                <div className="createdAt-PriceContainer w-full flex flex-col justify-center items-end">
                  <p className="text-[12px] text-white font-light max-md:text-[10px]">
                    {item.created_at &&
                    !isNaN(new Date(item.created_at).getTime())
                      ? new Intl.DateTimeFormat("en-US", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }).format(new Date(item.created_at))
                      : "Invalid date"}
                  </p>
                  <p className="text-[12px] text-green-600 max-md:text-[10px] font-medium">
                    {item.product_price}$
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default OrderManagement;

//userid orderid productname
