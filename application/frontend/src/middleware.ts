import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const url = req.nextUrl.pathname;

  if (!token) {
    const callbackUrl = req.nextUrl.pathname;
    return NextResponse.redirect(new URL(`/auth/signin?callbackUrl=${callbackUrl}`, req.url));
  }
  // アクセス制御の例: 管理者専用ルート
  if (url.startsWith("/admin") && token?.role !== "administrator") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}


export const config = {
  matcher: [
    '/admin/:path*'
  ],
};