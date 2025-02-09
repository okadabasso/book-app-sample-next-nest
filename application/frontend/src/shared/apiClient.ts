const BACKEND_URL = process.env.BACKEND_URL;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface RequestOptions {
    params?: Record<string, string | number | boolean>;
    body?: unknown;
    headers?: Record<string, string>;
    local?: boolean;
}

/**
 * 共通の API クライアントラッパー関数
 * @param endpoint APIのエンドポイント (例: `/books`)
 * @param options オプション (メソッド, パラメータ, ヘッダーなど)
 */
async function apiRequest(
    endpoint: string,
    options: RequestOptions  & { method: 'GET' | 'POST' | 'PUT' | 'DELETE' },
): Promise<Response> {
    const url = options.local ? new URL(endpoint, BASE_URL) : new URL(endpoint, BACKEND_URL);
    console.log("url", url);
    console.log("options", options);
    if (options.params) {
        Object.entries(options.params).forEach(([key, value]) => url.searchParams.append(key, value.toString()));
    }

    const response = await fetch(url.toString(), {
        method: options.method,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        body: options.body ? JSON.stringify(options.body) : undefined,
        cache: 'no-store',
    });

    if (!response.ok) {
        throw new Error(`API Error: ${response.statusText} (${response.status})`);
    }

    return response;
}

export const api = {
    get: (endpoint: string, options: RequestOptions) =>
        apiRequest(endpoint, {method: 'GET', ...options}),
    post: (endpoint: string, options: RequestOptions) =>
        apiRequest(endpoint, {method: 'POST', ...options}),
    put: (endpoint: string, options: RequestOptions) =>
        apiRequest(endpoint, {method: 'PUT', ...options}),
    delete: (endpoint: string, options: RequestOptions) =>
        apiRequest(endpoint, {method: 'DELETE', ...options}),
};

export function  searchParamsToRecord(searchParams: URLSearchParams): Record<string, string> {
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => { params[key] = value; });
    return params;
}   
