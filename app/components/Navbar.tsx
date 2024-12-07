"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { Button } from "@mui/material";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { navbarLinks } from "../const";
import { useState } from "react";
import { styles } from "../const";
import { useProduct } from "@/context/ProductContext";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { handleFetchTotalQuantity, totalQuantity } = useProduct();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      handleFetchTotalQuantity(currentUser.id);
    }
  }, [currentUser]);

  const handleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <header className="sticky z-[100]">
      <div className="topContainer w-full bg-black text-white text-center py-2 text-[14px] max-md:text-[12px]">
        Free Shipping Over $50 Worldwide
      </div>
      <div
        className={`middleContainer w-full h-[80px] flex justify-between items-center bg-gray-200 ${styles.pagePaddingX}`}
      >
        <div className="leftMiddleContainer">
          <Link href="/">
            <h2 className="w-fit font-bold text-[25px] max-md:text-[22px]">
              e-commerce.
            </h2>
          </Link>
        </div>
        <div className="rightMiddleContainer flex items-center gap-3">
          <Link href="/login">
            <Button
              className="text-[13px] px-[8px] py-1 font-normal"
              variant="contained"
            >
              Login
            </Button>
          </Link>
          <Link href="/profile">
            <PersonOutlineRoundedIcon className="icons" />
          </Link>
          <Link className="relative" href="/cart">
            <ShoppingCartOutlinedIcon className="icons" />
            <div className="totalQuantityContainer w-[16px] h-[16px] flex justify-center items-center absolute -bottom-[5px] -right-1 text-[9px] bg-white border-[2px] border-black rounded-[50%] font-bold">
              {totalQuantity}
            </div>
          </Link>
          <Link href="/favoritelist">
            <FavoriteBorderOutlinedIcon className="icons" />
          </Link>
        </div>
      </div>
      <nav className="relative">
        <ul
          className={`w-full h-[60px] flex gap-5 items-center bg-white ${
            styles.pagePaddingX
          } max-md:fixed max-md:left-0 max-md:top-0 
          max-md:h-[100vh] max-md:flex-col max-md:justify-center max-md:bg-black max-md:text-white ${
            isOpen ? "max-md:translate-x-0" : "max-md:translate-x-[-100%]"
          }`}
        >
          {navbarLinks.map((item) => (
            <li
              key={item.id}
              onClick={() => handleMenu()}
              className="cursor-pointer text-[14px] border-[#0000] border-b-[1px] hover:border-[#000] max-md:text-[16px]"
            >
              {item.name}
            </li>
          ))}
        </ul>
        <div onClick={() => handleMenu()}>
          {isOpen ? (
            <CloseIcon className="appearClass fixed right-[20px] top-[20px] cursor-pointer text-white" />
          ) : (
            <MenuIcon className="appearClass absolute right-[20px] top-[20px] cursor-pointer hidden max-md:block text-white" />
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
