"use client";
import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import ActiveComponent from "./ActiveComponent";

const SelectedComponent = () => {
  const [isActive, setIsActive] = useState("Overview");
  return (
    <div className="w-full flex">
      <AdminSidebar isActive={isActive} setIsActive={setIsActive} />
      <ActiveComponent activeItem={isActive} />
    </div>
  );
};

export default SelectedComponent;
