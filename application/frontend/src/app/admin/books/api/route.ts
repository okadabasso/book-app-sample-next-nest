import { apiClient } from "@/shared/apiClient"
import { Book } from "@/types/Book"
import { revalidatePath } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    console.info("GET /admin/books/api " + new Date().toString())
    const response = await apiClient("/admin/books/")
    return response;

}
export async function POST(request: NextRequest) {
    const book: Book = await request.json();
    if (!book) {
        return NextResponse.json({ error: "Book data is required" }, { status: 400 });
    }

    try {
        const response = await apiClient('/admin/books',{ method: "POST" , body:book});
        return response;
    }   
    catch (e: any) {
        console.error("error at post");
        console.error(e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
 
