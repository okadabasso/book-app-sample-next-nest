import { verifyCsrfToken } from "@/shared/csrfToken";
import { NextResponse } from "next/server";
import { Middleware } from "./createMiddlewareChain";

export const csrMiddleware: Middleware = async (request, _event, next) => {
    const url = new URL(request.url);
    const { pathname } = url;

    if (pathname.startsWith("/api/auth")) {
        return next();
    }
    if (pathname.startsWith("/api/csrf")) {
        return next();
    }
    if (pathname.startsWith("/auth")) {
        return next();
    }
    if (request.method === "POST" || request.method === "PUT" || request.method === "DELETE") {
        const valid = await verifyCsrfToken(request);
        if (!valid) {
            return NextResponse.json({ message: 'Invalid CSRF token' }, { status: 403 });
        }
    }

    return next();
};
