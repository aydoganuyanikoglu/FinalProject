"use client";
import React, { useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const items = ["1", "2", "3", "4", "5", "6", "7"];
  return (
    <section className="w-full h-fit flex justify-center py-[100px]">
      <div className="innerContainer w-[1000px] h-fit bg-white">
        <h2 className="w-full text-center text-[24px] font-bold max-md:text-[21px]">
          Frequently Asked Questions
        </h2>
        <ul className="h-fit mt-4 border-black border-b-[2px]">
          {items.map((item, index) => {
            return (
              <li
                className={`w-full p-3 border-[2px] border-b-0  ${
                  openIndex === index ? "border-blue-600" : "border-black"
                }`}
                key={index}
              >
                <div
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex justify-between cursor-pointer"
                >
                  <p className="text-[16px] font-semibold">
                    How can I track my shipping?
                  </p>
                  <ArrowForwardIosIcon
                    className={`text-black text-[13px] ${
                      openIndex === index ? "-rotate-90" : "rotate-90"
                    }`}
                  />
                </div>
                <p
                  className={`relative ${
                    openIndex === index
                      ? "opacity-1 openInfos"
                      : "opacity-0 hiddenInfos"
                  } pl-6 text-[13px] font-normal pr-1.5 w-fit shadow-md`}
                >
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut
                  ipsum ipsa praesentium ut ad exercitationem.
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Faq;
