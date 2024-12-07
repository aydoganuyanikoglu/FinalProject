import React from "react";
import { Footer, Navbar } from "@/app/const";
import ProductList from "./ProductList";
import FilterProducts from "./FilterProducts";
import { styles } from "@/app/const";

const page = () => {
  return (
    <div>
      <Navbar />
      <div className={`w-full py-[50px] ${styles.pagePaddingX}`}>
        <div className={`h-fit w-full flex justify-center`}>
          <div className="w-[1100px] flex gap-5 max-sm:flex-col max-md:w-full">
            <FilterProducts />
            <ProductList />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default page;
