import React from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

const AreYouSure = ({ message }: { message: String }) => {
  return (
    <div className="youSureContainer fixed z-[100] left-0 top-0 w-[100vw] h-[100vh] flex justify-center items-center backdrop-blur-md">
      <div className="innerContainer w-[350px] h-[200px] flex flex-col items-center justify-center p-5 gap-5 bg-white shadow-md rounded-xl">
        <p className="message text-[18px] font-semibold text-center text-black">
          {message}
        </p>
        <button className="flex gap-2">
          <div className="acceptContainer flex gap-2 p-3 bg-green-400 text-white hover:bg-green-700 rounded-sm cursor-pointer">
            <p className="text-[15px] font-semibold">Yes</p>
            <ThumbUpIcon className="text-[20px]" />
          </div>
          <button className="declineContainer flex gap-2 p-3 bg-red-500 text-white hover:bg-red-700 rounded-sm cursor-pointer">
            <p className="text-[15px] font-semibold">No</p>
            <ThumbDownIcon className="text-[20px]" />
          </button>
        </button>
      </div>
    </div>
  );
};

export default AreYouSure;
