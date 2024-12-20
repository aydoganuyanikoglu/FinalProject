import React from "react";
import Link from "next/link";
import CelebrationIcon from "@mui/icons-material/Celebration";

const page = () => {
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
