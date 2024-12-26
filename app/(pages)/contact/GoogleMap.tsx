import React from "react";

const GoogleMap = () => {
  return (
    <div className="w-full h-fit flex flex-col gap-2 items-center py-[100px] px-[50px] max-md:px-[20px]">
      <h2 className="w-full text-center text-[24px] font-bold max-md:text-[21px]">
        You can find us on the map!
      </h2>
      <iframe
        className="w-full h-[650px] max-md:h-[350px]"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d96105.3671250728!2d28.941897254247564!3d41.171782188017175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x409fe02232a852d7%3A0x3a86cad07b1a4ec4!2zU2FyxLF5ZXIvxLBzdGFuYnVs!5e0!3m2!1str!2str!4v1730065367845!5m2!1str!2str"
        width="600"
        height="450"
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default GoogleMap;
