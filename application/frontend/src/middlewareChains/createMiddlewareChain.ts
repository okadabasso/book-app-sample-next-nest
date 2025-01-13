import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

// 作成するミドルウェア関数の型
export type Middleware = (
  req: NextRequest,
  event: NextFetchEvent,
  next: () => Promise<NextResponse>
) => Promise<NextResponse>;

// Chain作成関数の型
type MiddlewareChain = (
  request: NextRequest,
  event: NextFetchEvent,
  next: () => Promise<NextResponse>
) => Promise<NextResponse>;

// Chain作成関数
export const createMiddlewareChain = (
  ...middlewares: Middleware[]
): MiddlewareChain => {
  // 実行する関数を返す
  return async (req, event, next) => {
    // ミドルウェアを順番に実行する関数を定義
    const executeMiddleware = (index: number): Promise<NextResponse> => {
      // ミドルウェアがある場合は実行する
      const middleware = middlewares[index];
      if (middleware) {
        return middleware(req, event, async () => executeMiddleware(index + 1));
      }

      // ミドルウェアがない場合は次の処理を実行する（= 全てのミドルウェアが実行済み）
      return next();
    };

    return executeMiddleware(0);
  };
};
