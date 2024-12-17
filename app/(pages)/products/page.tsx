import React, { Suspense } from "react";
import { Footer, Navbar } from "@/app/const";
import ProductList from "./ProductList";
import FilterProducts from "./FilterProducts";
import { styles } from "@/app/const";
import Link from "next/link";

const page = () => {
  return (
    <div>
      <Navbar />
      <div className={`w-full py-[50px] ${styles.pagePaddingX}`}>
        <div className={`h-fit w-full flex flex-col items-center`}>
          <div className="w-[1100px] max-md:w-full">
            <div className="navigatorContainer flex gap-2">
              <Link
                className="w-fit text-[15px] text-gray-800 border-b-[1px] border-b-[#0000] hover:border-b-[#000]"
                href="/"
              >
                Home
              </Link>
              <span className="gray-400">|</span>
              <p className="font-normal text-[15px] text-gray-400">Products</p>
            </div>
            <Suspense>
              <div className="mt-5 flex gap-5 max-sm:flex-col max-md:w-full">
                <FilterProducts />
                <ProductList />
              </div>
            </Suspense>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default page;
