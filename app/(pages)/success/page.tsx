"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import CelebrationIcon from "@mui/icons-material/Celebration";
import confetti from "canvas-confetti";

const page = () => {
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

  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-center text-center text-gray-700">
      <CelebrationIcon className="text-[50px] text-orange-500" />
      <h2 className="mt-5 text-[24px] font-bold max-md:text-[18px]">
        Congrats! Payment is successfull!
      </h2>
      <p className="text-[13px]">You can check your orders down below!</p>
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

export default page;
