"use client";
import React from "react";
import Image from "next/image";
import { styles } from "@/app/const";
import { contactInfo } from "@/app/const";

const ContactInformation = () => {
  return (
    <section
      className={`h-fit py-[100px] w-full flex flex-col gap-10 justify-center bg-white px-[50px] max-lg:px-[100px] max-md:px-[20px] max-md:h-fit max-md:py-[100px]`}
    >
      <div className="title">
        <h2 className="text-[16px] font-bold max-lg:text-[15px]">Contact</h2>
        <p className="textGradient1 font-medium w-fit text-[14px] max-lg:text-[13px]">
          You can use down below information to reach us!
        </p>
      </div>
      <div className="infos w-full">
        <ul className="w-full flex flex-wrap gap-5 justify-between max-md:flex-col">
          {contactInfo.map((info, index) => (
            <li key={index} className="flex gap-3 items-center text-black">
              <div className="left">
                <Image
                  src={info.logo}
                  alt={info.title}
                  width={20}
                  height={20}
                />
              </div>
              <div className="right">
                <h2 className="title font-semibold text-[13px] max-lg:text-[12px]">
                  {info.title}
                </h2>
                <p className="font-normal text-[13px] max-lg:text-[12px]">
                  {info.value}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ContactInformation;
