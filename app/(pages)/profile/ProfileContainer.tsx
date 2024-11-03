"use client";
import React, { useState } from "react";
import ChangePassword from "./ChangePassword";
import ProfileInfo from "./ProfileInfo";

const ProfileContainer = () => {
  const [loginRegister, setloginRegister] = useState(false);
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
      </div>
    </div>
  );
};

export default ProfileContainer;
