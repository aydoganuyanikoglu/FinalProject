import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/auth/session";

const protectedRoutes = [
  "/adminpanel",
  "/profile",
  "/favoritelist",
  "/cart",
  "/profile/addresses",
  "/profile/orders",
  "/cart/selectaddress",
];
const nativeRoutes = [
  "/api/createCheckoutSession/mobile",
  "/api/addresses",
  "/api/addresses/add",
  "/api/addresses/remove",
  "/api/addresses/select-default",
  "/api/reviews",
  "/api/reviews/add",
  "/api/reviews/remove",
  "/api/reviews/stats",
  "/api/reviews/check-purchase",
  "/api/orders",
  "/api/orders/user-orderid",
  "/api/orders/userid",
  "/api/users",
  "/api/users/[email]",
  "/api/products",
  "/api/products/id",
  "/api/products/brands",
  "/api/products/filter",
  "/api/products/favoriteproducts",
  "/api/products/favoriteproducts/add",
  "/api/products/favoriteproducts/remove",
  "/api/products/favoriteproducts/ids",
  "/api/auth/login",
  "/api/auth/register",
  "/api/auth/changepassword",
  "/api/cart",
  "/api/cart/decrease",
  "/api/cart/increase",
  "/api/cart/remove",
];
const adminRoute = ["/adminpanel"];
const loginRoutes = ["/login"];

const corsOptions = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export default async function middleware(req: NextRequest) {
  const secretNativeKey = process.env.NEXT_PUBLIC_DB_SECRET_KEY;
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isLoginRoute = loginRoutes.includes(path);
  const isAdminRoute = adminRoute.includes(path);
  const isNativeRoute = nativeRoutes.includes(path);
  const cookie = req.cookies.get("session");
  const session = await decrypt(cookie?.value);

  if (req.method === "OPTIONS") {
    return NextResponse.json({}, { headers: corsOptions });
  }

  const response = NextResponse.next();

  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  if (isProtectedRoute && !session?.id) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  if (isAdminRoute && !session?.isAdmin) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  if (isLoginRoute && session?.id) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  if (isNativeRoute) {
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized - No Token Provided" },
        { status: 401 }
      );
    }
    const token = authHeader.split(" ")[1];
    if (token !== secretNativeKey) {
      return NextResponse.json({ error: "Unauthorized!" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/adminpanel",
    "/login",
    "/register",
    "/profile",
    "/favoritelist",
    "/cart",
    "/cart/selectaddress",
    "/profile/addresses",
    "/profile/orders",
    "/api/:path*",
  ],
};
