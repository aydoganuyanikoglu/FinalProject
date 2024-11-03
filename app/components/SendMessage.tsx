"use client";
import React from "react";
import { styles } from "../const";

const SendMessage = () => {
  return (
    <section
      className={`w-full h-fit py-[100px] bg-white text-white ${styles.pagePaddingX}`}
    >
      <div className="w-full h-fit flex flex-col gap-3 items-center p-[50px] bg-blue-700 max-md:px-[20px]">
        <h2 className="text-[24px] font-bold max-md:text-[20px]">
          Send Your Message!
        </h2>
        <p className="text-[14px] font-normal text-gray-300 max-md:text-[12px]">
          You can send your message easily down below.
        </p>
        <form
          className="mt-5 flex flex-col items-center gap-3 w-[60%] max-md:w-full"
          action=""
        >
          <input
            className="sendMessageInputs"
            type="text"
            name="name"
            placeholder="Name"
          />
          <input
            className="sendMessageInputs"
            type="email"
            name="email"
            placeholder="E-mail"
          />
          <textarea
            className="sendMessageInputs min-h-[200px] !pt-3"
            name="message"
            placeholder="Your Message.."
          ></textarea>
          <button className="myButton2">Send Message</button>
        </form>
      </div>
    </section>
  );
};

export default SendMessage;
