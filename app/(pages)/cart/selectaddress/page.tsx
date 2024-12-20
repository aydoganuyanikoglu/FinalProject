import React from "react";
import { Navbar } from "@/app/const";
import SelectAddress from "./SelectAddress";

const page = () => {
  return (
    <div>
      <Navbar isFixed={false} />
      <SelectAddress />
    </div>
  );
};

export default page;
