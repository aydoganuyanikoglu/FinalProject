import { NextResponse } from "next/server";
import { verifySession } from "@/auth/session";

export async function GET() {
  const sessionData = await verifySession();
  console.log("server sessionData", sessionData);

  if (!sessionData) {
    return NextResponse.json(
      { error: "Session cookie not found" },
      { status: 404 }
    );
  }

  const filteredData = {
    id: sessionData.id,
    firstName: sessionData.firstName,
    lastName: sessionData.lastName,
    email: sessionData.email,
    isAdmin: sessionData.isAdmin,
  };

  return NextResponse.json(filteredData);
}
