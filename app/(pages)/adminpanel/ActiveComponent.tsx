"use client";
import React, { useState } from "react";
import Overview from "./Overview";
import ProductManagement from "./ProductManagement";
import UserManagement from "./UserManagement";
import OrderManagement from "./OrderManagement";
import ReviewManagement from "./ReviewManagement";

type ActiveComponentProps = {
  activeItem: string;
};

const ActiveComponent: React.FC<ActiveComponentProps> = ({ activeItem }) => {
  const renderComponent = () => {
    switch (activeItem) {
      case "Overview":
        return <Overview />;
      case "Product Management":
        return <ProductManagement />;
      case "User Management":
        return <UserManagement />;
      case "Order Management":
        return <OrderManagement />;
      case "Review Management":
        return <ReviewManagement />;
      default:
        return <div>Not Found</div>;
    }
  };
  return (
    <div className="w-[80%] h-fit p-[20px] text-white">
      <p className="w-full h-fit bg-[#130a3e] p-5 rounded-[10px]">
        <span className="text-[20px] max-md:text-[17px] font-bold">
          Hello, Aydogan!
        </span>
        <br />
        <span className="text-[16px] font-light">{activeItem}</span>
      </p>
      <div className="mt-5 min-h-[calc(100vh-220px)] h-fit p-[20px] w-full bg-[#130a3e] rounded-[10px]">
        {renderComponent()}
      </div>
    </div>
  );
};

export default ActiveComponent;
