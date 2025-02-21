import { api } from "@/shared/apiClient";
import { BookData } from "@/types/Book";
import { plainToInstance } from "class-transformer";

interface FetchBookResult {
    book?: BookData;
    error?: string;
    details?: {
        message: string;
        statusCode: string;
        error: string;
    };
    status?: number;
}

const fetchBook = async (id: number): Promise<FetchBookResult> => {
    try {
        const response = await api.get(`/api/admin/books/${id}`, { local: true });
        if (!response.ok) {
            
            const errorDetails = await response.json(); // エラーメッセージの詳細を取得
            return { error: errorDetails.message, details: errorDetails , status: response.status };
        }
        const data: BookData = await response.json();
        return  { book: data };
    } catch (e: unknown) {
        if (e instanceof Error) {
            throw new Error(e.message);
        } else {
            throw new Error(String(e));
        }
    }
};
export default fetchBook;