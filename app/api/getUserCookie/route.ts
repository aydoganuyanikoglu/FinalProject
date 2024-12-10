import { NextResponse } from "next/server";
import { verifySession } from "@/auth/session";

export async function GET() {
  const sessionData = await verifySession();

  if (!sessionData) {
    return NextResponse.json(
      { error: "Session cookie not found" },
      { status: 404 }
    );
  }

  const filteredData = {
    id: sessionData.id,
    firstname: sessionData.firstname,
    lastname: sessionData.lastname,
    email: sessionData.email,
    isAdmin: sessionData.isAdmin,
  };

  return NextResponse.json(filteredData);
}
