"use server";

import { decrypt } from "./session";
import { cookies } from "next/headers";
import { typeUsers } from "@/lib/types";

export const verifySession = async (): Promise<typeUsers | null> => {
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);

  if (session) {
    return session as typeUsers;
  }

  return null;
};
