import React from "react";
import { Navbar, Footer } from "@/app/const";
import Orders from "./Orders";

const page = () => {
  return (
    <div>
      <Navbar isFixed={false} />
      <Orders />
      <Footer />
    </div>
  );
};

export default page;
