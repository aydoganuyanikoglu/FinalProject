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
        <div className="mb-10 font-light">Home | Products</div>
        <div className={`h-fit flex gap-5 max-sm:flex-col`}>
          <FilterProducts />
          <ProductList />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default page;
