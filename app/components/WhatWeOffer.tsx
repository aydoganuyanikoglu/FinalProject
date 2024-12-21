import React from "react";
import { styles } from "../const";
import Image from "next/image";

const WhatWeOffer = () => {
  return (
    <div className={`w-full h-fit bg-gray-400 ${styles.pagePaddingX}`}>
      <div className="innerContainer grid grid-cols-4 gap-5 py-[70px] bg-white max-md:px-[20px] max-md:grid-cols-2 max-md:gap-10 max-md:py-[50px]">
        <div className=" w-full flex gap-5 items-center justify-center max-md:justify-start max-md:flex-col max-md:text-center">
          <Image src="/pickup.svg" alt="pickup" width={50} height={50} />
          <h2 className="text-[18px] font-bold max-md:text-[14px]">
            Curb-side <br />
            pickup
          </h2>
        </div>
        <div className=" w-full flex gap-5 items-center justify-center max-md:justify-start max-md:flex-col max-md:text-center">
          <Image src="/order.svg" alt="order" width={50} height={50} />
          <h2 className="text-[18px] font-bold max-md:text-[14px]">
            Worldwide shipping
            <br className="max-md:hidden" />
            only for 30$!
          </h2>
        </div>
        <div className=" w-full flex gap-5 items-center justify-center max-md:justify-start max-md:flex-col max-md:text-center">
          <Image src="/lowprice.svg" alt="order" width={50} height={50} />
          <h2 className="text-[18px] font-bold max-md:text-[14px]">
            Low prices <br className="max-md:hidden" /> guaranteed
          </h2>
        </div>
        <div className=" w-full flex gap-5 items-center justify-center max-md:justify-start max-md:flex-col max-md:text-center">
          <Image src="/24h.svg" alt="order" width={50} height={50} />
          <h2 className="text-[18px] font-bold max-md:text-[14px]">
            Available to <br className="max-md:hidden" />
            you 24/7
          </h2>
        </div>
      </div>
    </div>
  );
};

export default WhatWeOffer;
