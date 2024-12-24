"use client";
import React, { useState } from "react";
import { logoutServer } from "@/auth/auth";
import { useToast } from "@/context/ToastContext";
import { useAuth } from "@/context/AuthContext";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";

type SidebarProps = {
  isActive: string;
  setIsActive: (item: string) => void;
};

const AdminSidebar: React.FC<SidebarProps> = ({ isActive, setIsActive }) => {
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const { showToast } = useToast();
  const { logoutClient } = useAuth();
  const router = useRouter();

  const siderBarComponents = [
    {
      name: "Overview",
    },
    {
      name: "Product Management",
    },
    { name: "Review Management" },
    {
      name: "User Management",
    },
    { name: "Order Management" },
  ];

  const handleLogout = async () => {
    setIsButtonLoading(true);
    logoutClient();
    await logoutServer();
    setIsButtonLoading(false);
    showToast("Successfully logged out!");
    router.push("/");
  };

  return (
    <div className="sideBarContainer relative w-[20%] bg-[#130a3e]">
      <ul className="h-[fit] flex flex-col">
        {siderBarComponents.map((item, index) => (
          <li
            key={index}
            onClick={() => setIsActive(item.name)}
            className={`${
              isActive === item.name ? "bg-[#4048b9]" : ""
            } px-10 py-[20px] font-medium cursor-pointer text-white hover:bg-[#4048b9]`}
          >
            {item.name}
          </li>
        ))}
      </ul>
      <div className="mt-10 w-full px-10">
        <button
          className="h-[45px] w-full py-2 font-bold bg-[#4048b9] rounded-md text-white text-[14px]
          hover:bg-black"
          onClick={() => handleLogout()}
        >
          {isButtonLoading ? (
            <CircularProgress size={20} className="!text-black" />
          ) : (
            <span>Log out</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
