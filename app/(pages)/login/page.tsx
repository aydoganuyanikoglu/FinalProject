import React from "react";
import SignIn from "./SignIn";
import { styles } from "@/app/const";
import Image from "next/image";
import Link from "next/link";

const LoginScreen = () => {
  return (
    <div
      className={`relative w-full h-[100vh] py-[100px] flex flex-col gap-10 items-center justify-center max-sm:justify-center max-sm:h-[100vh] ${styles.pagePaddingX}`}
    >
      <Link href="/" className="fixed left-[20px] top-[20px]">
        <button className="regularButton">
          <Image src="/arrowleft.svg" alt="arrow" width={12} height={12} />
          <span className="text-[11px] font-medium">Homepage</span>
        </button>
      </Link>
      <h2 className="text-[24px] text-orange-600 max-md:text-[20px] font-extrabold">
        e-commerce.
      </h2>
      <SignIn />
      <div className="bottomAbsolute absolute bottom-[20px] flex flex-col items-center gap-1">
        <div className="safeShopping flex items-center gap-2">
          <Image
            src="/secureshopping.svg"
            alt="secureshopping"
            width={20}
            height={20}
          />
          <p className="text-[12px] text-green-600">Safe Shopping</p>
        </div>
        <div
          className="flex items-center gap-1
      text-[12px] font-bold text-black 
      "
        >
          <span>Copyright</span>
          <Image src="/copyright.svg" alt="copyright" width={10} height={10} />
          <span>2024. All rights are reserved.</span>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
