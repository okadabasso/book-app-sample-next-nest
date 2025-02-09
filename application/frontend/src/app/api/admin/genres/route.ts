import { api, searchParamsToRecord } from "@/shared/apiClient";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const query = searchParamsToRecord(url.searchParams); // クエリパラメータ 'search' を取得
    const response = await api.get(`/admin/genres`, query);
    
    return response;

}