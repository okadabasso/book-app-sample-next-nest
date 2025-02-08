import { apiClient } from "@/shared/apiClient";
import logger from "@/shared/logger";
import { Book } from "@/types/Book";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const query = url.searchParams; // クエリパラメータ 'search' を取得
    logger.info(`GET /admin/books/?${query}`);
    const response = await apiClient(`/admin/books/?${query}`);
    return response;

}
export async function POST(request: NextRequest) {
    try {
        const book: Book = await request.json();
        if (!book) {
            return NextResponse.json({ error: "Book data is required" }, { status: 400 });
        }
    
        try {
            const response = await apiClient('/admin/books',{ method: "POST" , body:book});
            return response;
        }   
        catch (e: unknown) {
            if (e instanceof Error) {
                return NextResponse.json({ error: e.message }, { status: 500 });
            } else {
                return NextResponse.json({ error: String(e) }, { status: 500 });
            }
        }
    } catch (error) {
        return NextResponse.json({ message: (error as Error).message }, { status: 401 });
    }
    
}
 
