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

    const response = await apiClient(`/admin/books/find?id=${id}`);
    return response;
}
export async function POST(request: NextRequest) {
    const book: Book = await request.json();
    if (!book) {
        return NextResponse.json({ error: "Book data is required" }, { status: 400 });
    }

    const response = await apiClient('/admin/books/create',{ method: "POST" , body:book});
    return response;
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const book: Book = await request.json();
    if (!id || !book) {
        return NextResponse.json({ error: "Book ID and data are required" }, { status: 400 });
    }

    const response = await apiClient(`/admin/books/${id}`,{ method: "PUT" , body:book});
    return response;
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    if (!id) {
        return NextResponse.json({ error: "Book ID is required" }, { status: 400 });
    }

    const response = await apiClient(`/admin/books/delete?id=${id}`, { method: "DELETE" });
    return response;
}