import React from "react";
import {
  Navbar,
  MainSlider,
  Deals,
  WhatWeOffer,
  BestSellers,
  ShopbyCategory,
  NeedHelp,
  Footer,
  SaveUpTo,
  Brands,
  SendMessage,
} from "../const";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = () => {
  return (
    <div className="w-full min-h-[100vh] h-fit overflow-hidden">
      <ToastContainer />
      <Navbar />
      <MainSlider />
      <Deals />
      <WhatWeOffer />
      <BestSellers />
      <SaveUpTo />
      <ShopbyCategory />
      <Brands />
      <SendMessage />
      <NeedHelp />
      <Footer />
    </div>
  );
};

export default HomePage;
