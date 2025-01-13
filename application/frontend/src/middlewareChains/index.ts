import { authMiddleware } from "./auth";
import { createMiddlewareChain } from "./createMiddlewareChain";
import { csrMiddleware } from "./csrf";

export const middlewareChain = createMiddlewareChain(
  authMiddleware,
  csrMiddleware
);
