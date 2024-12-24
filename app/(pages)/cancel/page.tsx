"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { validateOrderSession } from "@/lib/checkout";
import Cancellation from "./Cancellation";

const page = () => {
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

  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-center text-center text-gray-700">
      {!isValid ? <div>Loading...</div> : <Cancellation />}
    </div>
  );
};

export default page;
