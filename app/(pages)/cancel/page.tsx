import React from "react";
import Link from "next/link";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

const page = () => {
  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-center text-center text-gray-700">
      <SentimentVeryDissatisfiedIcon className="text-[50px] text-orange-500" />
      <h2 className="mt-5 text-[24px] font-bold max-md:text-[18px]">
        Failed while paying..
      </h2>
      <p className="text-[13px]">
        You can check for our other products down below!
      </p>
      <div className="w-[250px]">
        <Link
          href="/products"
          className="loginRegisterButton mt-3 !text-[14px]"
        >
          Check for Products!
        </Link>
      </div>
    </div>
  );
};

export default page;
