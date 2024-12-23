import { NextResponse } from "next/server";

const BASE_URL = process.env.BACKEND_URL;

/**
 * 共通の API クライアントラッパー関数
 * @param endpoint APIのエンドポイント (例: `/books`)
 * @param options オプション (メソResponseッド, パラメータ, ヘッダーなど)
 */
export async function apiClient(
    endpoint: string,
    options?: {
        method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
        params?: Record<string, string>;
        body?: any;
        headers?: Record<string, string>;
    }
): Promise<Response> {
    const url = new URL(`${BASE_URL}${endpoint}`);
    if (options?.params) {
        Object.entries(options.params).forEach(([key, value]) => url.searchParams.append(key, value));
    }

    const response = await fetch(url.toString(), {
        method: options?.method || 'GET',
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
        },
        body: options?.body ? JSON.stringify(options.body) : undefined,
        cache: 'no-store',
    });

    if (!response.ok) {
        throw new Error(`API Error: ${response.statusText} (${response.status})`);
    }

    return response;
}
