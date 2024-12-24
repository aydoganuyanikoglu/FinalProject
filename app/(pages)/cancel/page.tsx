"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { validateOrderSession } from "@/lib/checkout";
import Cancellation from "./Cancellation";

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
    return <div>Redirecting..</div>;
  }

  return <Cancellation />;
};

const Page = () => {
  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-center text-center text-gray-700">
      <Suspense
        fallback={
          <div className="text-[14px] font-bold text-black">Loading...</div>
        }
      >
        <PageContent />
      </Suspense>
    </div>
  );
};

export default Page;
