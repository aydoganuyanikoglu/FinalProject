import React from "react";
import { Navbar, Footer } from "@/app/const";
import Addresses from "./Addresses";

const page = () => {
  return (
    <div>
      <Navbar isFixed={false} />
      <Addresses />
      <Footer />
    </div>
  );
};

export default page;
