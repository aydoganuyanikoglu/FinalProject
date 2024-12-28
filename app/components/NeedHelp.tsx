import React from "react";
import { styles } from "../const";
import Link from "next/link";
import Image from "next/image";

const NeedHelp = () => {
  return (
    <section className={`relative w-full h-fit flex max-md:flex-col bg-white`}>
      <Image
        className="absolute right-0 top-0 w-[55%] h-full max-md:w-full max-md:h-1/2 max-md:top-[400px]"
        src="/backgrounds/needhelp.webp"
        alt="saveupto150"
        width={1000}
        height={600}
      />
      <div className="left needHelpClipPath bg-black w-[55%] h-[400px] flex flex-col justify-center gap-5 text-white px-[50px] py-[50px] max-md:p-[20px] max-md:w-full">
        <h2 className="text-[24px] font-bold max-md:text-[20px]">
          Need Help? <br className="max-md:hidden" /> Check Out Our Help Center
        </h2>
        <p className="text-[18px] font-normal text-gray-400 max-md:text-[16px] ">
          Need assistance? We're here to help! Whether you have questions or
          need support, our team is ready to provide you with the guidance you
          need.
        </p>
        <Link href="/contact">
          <button className="myButton1 !bg-white !text-black !border-white hover:!text-white hover:!bg-black hover:before:!opacity-0">
            Go to Help Center
          </button>
        </Link>
      </div>
      <div className="right bg-white w-[45%] h-[400px] max-md:w-full"></div>
    </section>
  );
};

export default NeedHelp;
