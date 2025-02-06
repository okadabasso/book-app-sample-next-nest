import { apiClient } from "@/shared/apiClient"
import { Book } from "@/types/Book"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const query = url.searchParams.get('query'); // クエリパラメータ 'search' を取得
    const response = await apiClient(`/admin/genres?query=${query}`);
    
    return response;

}