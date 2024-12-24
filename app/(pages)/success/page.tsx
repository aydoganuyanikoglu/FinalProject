"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { validateOrderSession } from "@/lib/checkout";
import SuccessfullPayment from "./SuccessfullPayment";
import Link from "next/link";
import Image from "next/image";
import { SuccessPageSkeleton } from "@/app/components/skeletons/Skeletons";

const PageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const validateSession = async () => {
      const session = searchParams.get("session");
      if (!session) {
        router.push("/");
        return;
      }

      const isValidSession = await validateOrderSession(session);
      if (isValidSession) {
        setIsValid(true);
      } else {
        router.push("/");
      }
    };

    validateSession();
  }, [searchParams]);

  if (!isValid) {
    return (
      <div className="text-black text-[14px] font-bold">Redirecting...</div>
    );
  }

  return <SuccessfullPayment />;
};

const Page = () => {
  return (
    <div className="w-full h-fit py-[100px] relative flex flex-col items-center justify-center text-gray-700">
      <Link href="/" className="fixed z-10 left-[20px] top-[20px]">
        <button className="regularButton !bg-white">
          <Image src="/arrowleft.svg" alt="arrow" width={12} height={12} />
          <span className="text-[11px] font-medium">Homepage</span>
        </button>
      </Link>
      <Suspense fallback={<SuccessPageSkeleton />}>
        <PageContent />
      </Suspense>
    </div>
  );
};

export default Page;
