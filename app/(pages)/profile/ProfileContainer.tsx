"use client";
import React, { use, useState } from "react";
import ChangePassword from "./ChangePassword";
import ProfileInfo from "./ProfileInfo";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { logoutServer } from "@/auth/auth";
import { useAuth } from "@/context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfileContainer = () => {
  const router = useRouter();
  const { logoutClient } = useAuth();
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [loginRegister, setloginRegister] = useState(false);

  const handleLogout = async () => {
    setIsButtonLoading(true);
    logoutClient();
    await logoutServer();
    setIsButtonLoading(false);
    toast.success("Successfully logged out!");
    router.push("/login");
  };

  return (
    <div className="w-full h-fit flex flex-col items-center py-[100px]">
      <div className="w-[500px] h-fit py-[50px] border-[1px] border-gray-200 rounded-md flex flex-col gap-7 items-center px-[40px] max-sm:w-full max-sm:px-[10px]">
        <div className="login&registercontainer w-full grid grid-cols-2 border-b-[1px] border-b-gray-300">
          <div
            onClick={() => setloginRegister(false)}
            className={`w-full text-center pb-1 text-[14px] font-medium cursor-pointer ${
              loginRegister
                ? "border-b-[3px] border-b-[#0000]"
                : "border-b-[3px] border-b-orange-600"
            }`}
          >
            Profile Information
          </div>
          <div
            onClick={() => setloginRegister(true)}
            className={`w-full text-center pb-1 text-[14px] font-medium cursor-pointer ${
              loginRegister
                ? "border-b-[3px] border-b-orange-600"
                : "border-b-[3px] border-b-[#0000]"
            }`}
          >
            Change Password
          </div>
        </div>
        {loginRegister ? <ChangePassword /> : <ProfileInfo />}
        <button
          className="h-[45px] w-[100px] py-2 font-bold bg-red-600 rounded-md text-white text-[14px]
          hover:brightness-75"
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

export default ProfileContainer;
