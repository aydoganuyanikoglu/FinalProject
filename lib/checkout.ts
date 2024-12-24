"use server";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.JWT_SECRET;
const key = new TextEncoder().encode(secretKey);

export const createOrderToken = async (sessionId: string) => {
  return new SignJWT({ session: sessionId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10m")
    .sign(key);
};

export const verifyOrderToken = async (token: string | undefined = "") => {
  if (!token) {
    return null;
  }
  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error: any) {
    console.error("Failed verifying token:", error.message);
    return null;
  }
};

export const setOrderTokenCookie = async (sessionId: string) => {
  const token = await createOrderToken(sessionId);
  cookies().set("order_session_token", token, {
    httpOnly: true,
    secure: true,
    maxAge: 10 * 60,
    sameSite: "lax",
    path: "/",
  });
};

export const validateOrderSession = async (
  sessionId: string
): Promise<boolean> => {
  try {
    const token = cookies().get("order_session_token")?.value;
    if (!token) return false;

    const tokenPayload = await verifyOrderToken(token);
    return tokenPayload?.session === sessionId;
  } catch (error: any) {
    console.error("Failed to validate order session:", error.message);
    return false;
  }
};
