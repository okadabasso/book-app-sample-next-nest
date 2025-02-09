import { NextRequest, NextResponse } from "next/server"
import { api } from "@/shared/apiClient"
import { Book } from "@/types/Book"
import logger from '@/shared/logger';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    logger.info('GET /admin/books/[id]');
    const { id } = await params;
    if (!id) {
        return NextResponse.json({ error: "Book ID is required" }, { status: 400 });
    }

    const response = await api.get(`/admin/books/find`, { params: { id }, local:false });
    return response;
}
export async function POST(request: NextRequest) {
    const book: Book = await request.json();
    if (!book) {
        return NextResponse.json({ error: "Book data is required" }, { status: 400 });
    }

    const response = await api.post('/admin/books/create',{body: book});
    return response;
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const book: Book = await request.json();
    if (!id || !book) {
        return NextResponse.json({ error: "Book ID and data are required" }, { status: 400 });
    }

    const response = await api.put(`/admin/books/${id}`,{body: book});
    return response;
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    if (!id) {
        return NextResponse.json({ error: "Book ID is required" }, { status: 400 });
    }

    const response = await api.delete(`/admin/books/delete}`, {params: { id }});
    return response;
}