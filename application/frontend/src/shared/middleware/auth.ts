import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { Middleware } from "./createMiddlewareChain";

/**
 * ルートとロールのマッピング
 * @type {Object.<string, string[]>}
 */
const routeRoleMap: { [key: string]: string[] } = {
    // "/admin": ["administrator"],
    "/editor": ["administrator", "editor"],
    "/user/profile": ["user", "administrator", "editor"],
    // 必要に応じてルートを追加
};

/**
 * 認証チェック
 * 
 * 許可されたルートにアクセスするための認証を行います。
 * @param request: NextRequest
 * @returns {Promise<{ authorized: boolean, redirectUrl?: string }>}
 */
async function checkAuthorization(request: NextRequest) {
    const url = new URL(request.url);
    const { pathname } = url;

    // マッチするルートを検索
    const matchedRoute = Object.keys(routeRoleMap).find((route) =>
        pathname.startsWith(route)
    );

    if (!matchedRoute) {
        return { authorized: true }; // 認証不要ルート
    }

    // トークンの取得
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
        const callbackUrl = request.url;
        return {
            authorized: false,
            redirectUrl: `/auth/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`,
        };
    }

    // ロールの検証
    const requiredRoles = routeRoleMap[matchedRoute];
    const roles = token.roles as string [];
    if (!requiredRoles.some(role => roles.includes(role))) {
        return {
            authorized: false,
            redirectUrl: "/unauthorized",
        };
    }

    return { authorized: true };
}

export const authMiddleware: Middleware = async (request, _event, next) => {
    const { authorized, redirectUrl } = await checkAuthorization(request);

    if (!authorized) {
        return NextResponse.redirect(new URL(redirectUrl || '', request.url));
    }

    return next();
};
