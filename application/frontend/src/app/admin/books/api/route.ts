import { apiClient } from "@/shared/apiClient"
import { Book } from "@/types/Book"
import { revalidatePath } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    console.info("GET /admin/books/api " + new Date().toString())
    const response = await apiClient("/admin/books/findAll")
    return response;

}