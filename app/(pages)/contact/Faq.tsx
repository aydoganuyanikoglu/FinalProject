"use client";
import React, { useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const items = [
    {
      question: "When will my orders be delivered?",
      paragraph:
        "Orders are usually delivered within 3-5 business days. However, this timeline may vary during peak seasons. You can track your order status in the 'My Account' section.",
    },
    {
      question: "What is your return and exchange policy?",
      paragraph:
        "You can return or exchange products within 14 days of delivery. Please ensure the items are unused and in their original packaging.",
    },
    {
      question: "Do you offer international shipping?",
      paragraph:
        "Yes, we offer international shipping to selected countries. Shipping fees and delivery times may vary based on your location.",
    },
    {
      question: "How can I track my order?",
      paragraph:
        "Once your order is shipped, you will receive a tracking number via email. Use this number to track your package on the courier's website.",
    },
    {
      question: "What payment methods do you accept?",
      paragraph: "We accept major credit and debit cards and PayPal.",
    },
    {
      question: "Can I cancel or modify my order?",
      paragraph:
        "Orders can be canceled or modified within the first hour after placement. Please contact our support team as soon as possible.",
    },
  ];

  return (
    <section className="w-full h-fit flex justify-center py-[100px] px-[20px]">
      <div className="innerContainer w-[1000px] h-fit bg-white">
        <h2 className="w-full text-center text-[24px] font-bold max-md:text-[21px]">
          Frequently Asked Questions
        </h2>
        <ul className="h-fit mt-4 border-black border-b-[2px]">
          {items.map((item, index) => {
            return (
              <li
                className={`w-full p-3 border-[2px] border-b-0  ${
                  openIndex === index ? "border-orange-600" : "border-black"
                }`}
                key={index}
              >
                <div
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex justify-between cursor-pointer"
                >
                  <p className="text-[16px] font-semibold max-md:text-[14px]">
                    {item.question}
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
                  } pl-6 text-[13px] font-normal pr-1.5 w-fit shadow-md max-md:text-[12px]`}
                >
                  {item.paragraph}
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
