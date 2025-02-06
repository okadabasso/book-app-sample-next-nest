import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { middlewareChain } from "@/middlewares/index";

export function middleware(request: NextRequest, event: NextFetchEvent) {

  const next = async () => {
    return NextResponse.next();
  };
  return middlewareChain(request, event, next);
}



export const config = {
  matcher: [
    '/(.*)',
    '/admin/:path*'
  ],
};