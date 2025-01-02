import { apiClient } from "@/shared/apiClient"
import { Book } from "@/types/Book"
import { revalidatePath } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;
    if (!id) {
        return NextResponse.json({ error: "Book ID is required" }, { status: 400 });
    }

    console.info(`GET /admin/books/api/${id} ` + new Date().toString());
    const response = await apiClient(`/admin/books/find?id=${id}`);
    console.log(response);
    return response;
}