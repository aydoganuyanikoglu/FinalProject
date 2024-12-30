import "server-only";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { typeUsers } from "@/lib/types";

const secretKey = process.env.JWT_SECRET;
const key = new TextEncoder().encode(secretKey);

export const encrypt = async (payload: typeUsers) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1hr")
    .sign(key);
};

export const decrypt = async (session: string | undefined = "") => {
  if (!session) {
    return;
  }
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error: any) {
    console.error("Failed decrypting..", error.message);
    return null;
  }
};

export const createSession = async (user: typeUsers) => {
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
  if (!user || !user.id) {
    return;
  }
  const isAdmin = user.email === "aslan321@gmail.com";
  const session = await encrypt({
    id: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    isAdmin,
    expiresAt,
  });

  cookies().set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
};

export const deleteSession = () => {
  cookies().delete("session");
};

export const verifySession = async (): Promise<typeUsers | null> => {
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);

  if (session) {
    return session as typeUsers;
  }

  return null;
};

export const updateSession = async () => {
  const session = cookies().get("session")?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  cookies().set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: "lax",
    path: "/",
  });
};
