import { v4 as uuidv4 } from 'uuid';
import { jwtVerify, SignJWT } from 'jose';
import FormToken from '@/types/FormToken';
import { api } from './apiClient';

const secret = process.env.CSRF_SECRET;
const algorithm = 'HS256';

export async function generateSignedCsrfToken(formId: string): Promise<FormToken> {
    const secretKey = new TextEncoder().encode(secret); // 秘密鍵をエンコード

    const token = await new SignJWT({ formId }) // ペイロードに formId を追加
      .setProtectedHeader({ alg: algorithm }) // アルゴリズムを設定
      .setIssuedAt() // 発行時刻
      .setExpirationTime('2h') // 有効期限（例: 2時間）
      .sign(secretKey);

    return { formId, token };
}
export async function verifyCsrfToken(request: Request): Promise<boolean> {
    try {
        const formId = request.headers.get('x-form-id') as string;
        const token = request.headers.get('x-csrf-token') as string;

        if (!token || !formId) {
            return false;
        }
        const secretKey = new TextEncoder().encode(secret); // 秘密鍵をエンコード
        const { payload } = await jwtVerify(token, secretKey, { algorithms: [algorithm] });
    
        const decoded = payload as { formId: string };
        const result =  decoded.formId === formId;

        return result;
    } catch {
        return false;
    }
}

export async function createCsrfToken(): Promise<{ formId: string, token: string, }> {
    const formId = uuidv4();
    const response = await api.post("/api/csrf", {
        body: { formId },
        local: true,
    });
    const token = await response.json();
    return token;
}

export function getCsrfHeader(csrfToken: { formId: string, token: string }): Record<string, string> {
    return {
        'x-csrf-token': csrfToken.token,
        'x-form-id': csrfToken.formId,
    };
}