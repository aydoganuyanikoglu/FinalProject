"use client";
import React, { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import InventoryIcon from "@mui/icons-material/Inventory";
import OrderDetailsModal from "@/app/components/modals/OrderDetailsModal";
import { fetchOrdersByUserId } from "@/lib/data";
import { useAuth } from "@/context/AuthContext";
import { OrdersType } from "@/lib/types";
import { OrdersSkeleton } from "@/app/components/skeletons/Skeletons";
import { EmptyOrders } from "@/app/components/EmptyComponents";

const Orders = () => {
  const [showModal, setShowModal] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const handleFetchOrdersbyUserId = async () => {
    setLoading(true);
    try {
      if (currentUser?.id) {
        const orders = await fetchOrdersByUserId(currentUser.id);
        console.log("my orders:", orders);
        setOrders(orders);
        setLoading(false);
      }
    } catch (error: any) {
      console.error("Error while fetcing orders..", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchOrdersbyUserId();
  }, [currentUser]);

  const handleCloseModal = () => {
    setSelectedOrder(null);
    setShowModal(false);
  };

  const handleShowModal = (order: any) => {
    setSelectedOrder(order);
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
          {loading ? (
            <OrdersSkeleton />
          ) : orders.length === 0 ? (
            <EmptyOrders />
          ) : (
            <ul className="mt-3 w-full h-fit flex flex-col gap-2">
              {orders.map((item, index) => {
                return (
                  <li
                    onClick={() => handleShowModal(item)}
                    key={index}
                    className="addressClass relative w-full h-[55px] min-h-fit flex justify-between items-center p-2 shadow-md rounded-md border-gray-200 border-[2px] cursor-pointer"
                  >
                    <div className="imageContainer h-full w-[40px] bg-black rounded-sm"></div>
                    <div className="orderNumberContainer text-gray-500 font-light text-[14px] max-md:hidden">
                      <span>Order No: </span>
                      <span className="text-black">{item.order_id}</span>
                    </div>
                    <div className="orderStatusContainer flex items-center gap-1">
                      <HourglassEmptyIcon className="text-[16px] text-gray-500" />
                      <p className="text-[12px] text-black max-md:text-[10px]">
                        {item.order_status}
                      </p>
                    </div>
                    <div className="createdAt-PriceContainer flex flex-col items-end">
                      <p className="text-[12px] text-gray-400 font-light max-md:text-[10px]">
                        {item.order_date &&
                        !isNaN(new Date(item.order_date).getTime())
                          ? new Intl.DateTimeFormat("en-US", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }).format(new Date(item.order_date))
                          : "Invalid date"}
                      </p>
                      <p className="text-[12px] text-green-600 max-md:text-[10px] font-medium">
                        {item.total_price}$
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
      {showModal && (
        <OrderDetailsModal
          onClose={handleCloseModal}
          order={selectedOrder}
          user_id={currentUser?.id}
        />
      )}
    </div>
  );
};

export default Orders;
