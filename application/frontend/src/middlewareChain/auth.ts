import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { Middleware } from "./createMiddlewareChain";

export const authMiddleware: Middleware = async (request, _event, next) => {
    const url = new URL(request.url);
    const { pathname } = url;

    if (!pathname.startsWith("/admin")) {
        return next();
    }

    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
        const callbackUrl = request.nextUrl.pathname;
        return NextResponse.redirect(new URL(`/auth/signin?callbackUrl=${callbackUrl}`, request.url));
    }
    // 管理者専用ルート
    if (token?.role !== "administrator") {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  
    return next();
  };
