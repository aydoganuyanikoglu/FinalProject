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
import { typeUsers } from "@/lib/types";

const HomePage = () => {
  const key = process.env.NEXT_PUBLIC_DB_SECRET_KEY;

  const postData = async (user: typeUsers) => {
    try {
      const res = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!res.ok) {
        throw new Error("Error status");
      }

      const data = await res.json();
      console.log("successfuly done", data);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const user = {
    firstname: "aydo",
    lastname: "uyanik",
    email: "aslan321@gmail.com",
    password: "sasln321",
  };
  postData(user);

  return (
    <div className="w-full min-h-[100vh] h-fit overflow-hidden">
      <Navbar isFixed={true} />
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
