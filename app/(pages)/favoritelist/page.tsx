import React from "react";
import { Navbar, Footer } from "@/app/const";
import FavoriteList from "./FavoriteList";

const page = () => {
  return (
    <div>
      <Navbar isFixed={false} />
      <FavoriteList />
      <Footer />
    </div>
  );
};

export default page;
