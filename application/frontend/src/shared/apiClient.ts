const BASE_URL = process.env.BACKEND_URL;


/**
 * 共通の API クライアントラッパー関数
 * @param endpoint APIのエンドポイント (例: `/books`)
 * @param options オプション (メソッド, パラメータ, ヘッダーなど)
 */
async function apiRequest(
    endpoint: string,
    options: {
        method: 'GET' | 'POST' | 'PUT' | 'DELETE';
        params?: Record<string, string>;
        body?: unknown;
        headers?: Record<string, string>;
    }
): Promise<Response> {
    const url = new URL(`${BASE_URL}${endpoint}`);
    if (options.params) {
        Object.entries(options.params).forEach(([key, value]) => url.searchParams.append(key, value));
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
    get: (endpoint: string, params?: Record<string, string>, headers?: Record<string, string>) =>
        apiRequest(endpoint, { method: 'GET', params, headers }),
    post: (endpoint: string, body?: unknown, headers?: Record<string, string>) =>
        apiRequest(endpoint, { method: 'POST', body, headers }),
    put: (endpoint: string, body?: unknown, headers?: Record<string, string>) =>
        apiRequest(endpoint, { method: 'PUT', body, headers }),
    delete: (endpoint: string, body?: unknown, headers?: Record<string, string>) =>
        apiRequest(endpoint, { method: 'DELETE', body, headers }),
};

export function  searchParamsToRecord(searchParams: URLSearchParams): Record<string, string> {
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => { params[key] = value; });
    return params;
}   