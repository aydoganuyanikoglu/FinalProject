"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { typeUsers } from "@/lib/types";

const ProfileInfo = () => {
  const [isPending, setIsPending] = useState(false);
  const { currentUser } = useAuth();
  const [user, setUser] = useState<typeUsers>();

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
    }
  }, [currentUser]);

  return (
    <div className="w-full h-fit p-6 bg-white rounded shadow-md">
      <h2 className="text-[24px] max-md:text-[21px] font-bold mb-4">
        Profile Information
      </h2>
      <p className="text-[16px] max-md:text-[14px] text-gray-600">
        Below is your current profile information, providing an overview of your
        details so you can ensure everything remains accurate and up to date.
      </p>
      <div className="mt-4 mb-4">
        <div className="block text-[13px] font-medium text-gray-700">
          First Name
        </div>
        <p className="loginRegisterInputs flex flex-col justify-center !border-orange-600">
          {currentUser?.firstname}
        </p>
      </div>
      <div className="mb-4">
        <div className="block text-[13px] font-medium text-gray-700">
          Last Name
        </div>
        <p className="loginRegisterInputs flex flex-col justify-center !border-orange-600">
          {currentUser?.lastname}
        </p>
      </div>
      <div className="mb-4">
        <div className="block text-[13px] font-medium text-gray-700">
          Email Address
        </div>
        <p className="loginRegisterInputs flex flex-col justify-center !border-orange-600">
          {currentUser?.email}
        </p>
      </div>
    </div>
  );
};

export default ProfileInfo;
