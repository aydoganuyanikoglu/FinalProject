import React from "react";
import {
  footerLeftLeft,
  footerLeftRight,
  footerRightLeft,
  footerRightRight,
} from "../const";
import { styles } from "../const";
import Image from "next/image";
import { paymentMethods } from "../const";

const Footer = () => {
  return (
    <section
      className={`relative w-full h-fit py-[100px] pb-[300px] grid grid-cols-4 gap-[150px] max-md:grid-cols-1 max-md:gap-[50px] bg-white text-black ${styles.pagePaddingX}`}
    >
      <div className="leftleft max-md:text-center">
        <h2 className="text-[22px] max-md:text-[18px] font-bold">
          {footerLeftLeft.title}
        </h2>
        <p className="mt-3 text-[14px] max-md:text-[13px] font-normal">
          {footerLeftLeft.name}
        </p>
      </div>
      <div className="leftright max-md:text-center">
        <h2 className="text-[22px] max-md:text-[18px] font-bold">
          {footerLeftRight.title}
        </h2>
        <ul className="max-md:text-center max-md:w-full max-md:flex max-md:flex-col max-md:items-center">
          {footerLeftRight.links.map((item) => (
            <li
              key={item.id}
              className="footerLinks mt-3 text-[14px] max-md:text-[13px] font-normal"
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="rightleft max-md:text-center">
        <h2 className="text-[22px] max-md:text-[18px] font-bold">
          {footerRightLeft.title}
        </h2>
        <ul className="max-md:text-center max-md:w-full max-md:flex max-md:flex-col max-md:items-center">
          {footerRightLeft.links.map((item) => (
            <li
              key={item.id}
              className="footerLinks mt-3 text-[14px] max-md:text-[13px] font-normal"
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="rightright max-md:text-center">
        <h2 className="text-[22px] max-md:text-[18px] font-bold">
          {footerRightRight.title}
        </h2>
        <ul className="max-md:text-center max-md:w-full max-md:flex max-md:flex-col max-md:items-center">
          {footerRightRight.links.map((item) => (
            <li
              key={item.id}
              className="footerLinks mt-3 text-[14px] max-md:text-[13px] font-normal"
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="bottom absolute bottom-0 w-full flex flex-col gap-[50px] items-center">
        <div className="acceptingPayments w-full flex flex-col items-center gap-[10px]">
          <p className="text-[14px] font-light">
            We accept the following paying methods
          </p>
          <ul className="grid grid-cols-4 gap-4">
            {paymentMethods.map((item, index) => (
              <li key={index}>
                <Image
                  className="!w-[70px] !h-[35px] rounded-sm"
                  src={item.path}
                  alt="card"
                  width={70}
                  height={35}
                />
              </li>
            ))}
          </ul>
        </div>
        <div
          className="copyRight flex items-center gap-1 max-md:left-[20px]
      text-[14px] font-bold text-black 
      "
        >
          <span>Copyright</span>
          <Image src="/copyright.svg" alt="copyright" width={10} height={10} />
          <span>2024. All rights are reserved.</span>
        </div>
      </div>
    </section>
  );
};

export default Footer;
