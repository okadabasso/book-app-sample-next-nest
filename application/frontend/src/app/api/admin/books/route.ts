import { apiClient } from "@/shared/apiClient";
import { Book } from "@/types/Book";
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    const response = await apiClient("/admin/books/")
    return response;

}
export async function POST(request: NextRequest, response: NextApiResponse) {
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
        response.status(401).json({ message: (error as Error).message });
    }
    
}
 
