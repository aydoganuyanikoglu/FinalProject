import React from "react";
import { Navbar, Footer } from "@/app/const";
import Orders from "./Orders";

const page = () => {
  return (
    <div>
      <Navbar />
      <Orders />
      <Footer />
    </div>
  );
};

export default page;
