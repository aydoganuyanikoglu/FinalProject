import React from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const EmptyCart = () => {
  return (
    <div className="w-full h-full py-[100px] flex flex-col items-center text-center text-black">
      <ShoppingCartOutlinedIcon className="text-[50px] text-orange-500" />
      <h2 className="mt-5 text-[24px] font-bold">
        Your cart is empty right now.
      </h2>
      <p className="text-[13px]">You can search for our products down below!</p>
      <div className="w-[250px]">
        <button className="loginRegisterButton mt-3 !text-[14px]">
          Search for Products!
        </button>
      </div>
    </div>
  );
};

export default EmptyCart;
