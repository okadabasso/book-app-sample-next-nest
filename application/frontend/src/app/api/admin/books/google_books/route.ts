import { NextRequest, NextResponse } from "next/server"
import { api } from "@/shared/apiClient"
import logger from '@/shared/logger';
import { GoogleBooksApiResult } from "@/types/GoogleBooksApiResult";

const googleBooksUrl = 'https://www.googleapis.com/books/v1/volumes';
interface GoogleBooksQueryParams {
    title?: string | null;
    inauthor?: string | null;
    isbn?: string | null;
    publisher?: string | null;
}
export async function GET(
    request: NextRequest
) {
    logger.info('GET /api/admin/books/google_books');
    const url = new URL(request.url);
    const queryParams: GoogleBooksQueryParams = {
        title: url.searchParams.get('title') ?? "",
        inauthor: url.searchParams.get('author') ?? "",
        isbn: url.searchParams.get('isbn') ?? "",
        publisher: url.searchParams.get('publisher') ?? "",
    }
    const limit = url.searchParams.get('limit') ? Number(url.searchParams.get('limit')) : 40;
    const offset = url.searchParams.get('offset') ? Number(url.searchParams.get('offset')) : 0;

    if (!queryParams.title && !queryParams.isbn) {
        return NextResponse.json({ error: "Book title or ISBN is required" }, { status: 400 });
    }

    const queryOptions = Object.entries({
        inauthor: queryParams.inauthor,
        isbn: queryParams.isbn,
        publisher: queryParams.publisher,
    })
        .filter(([key, value]) => value !== "")
        .map(([key, value]) => `${key}:${value}`)
        .join('+');
    const queryString = queryParams.title ?  `${queryParams.title} ${queryOptions}`  : queryOptions;


    const response = await api.get(googleBooksUrl, 
        { params: { q: queryString, startIndex:offset, maxResults: limit }, local:false });

    if (!response.ok) {
        throw new Error(`API Error: ${response.statusText} (${response.status})`);
    }
    const data = await response.json();
    if(data.totalItems === 0) {
        return NextResponse.json({total: 0, items: []});
    }
    const result = responseToBookApiResult(data);
    return NextResponse.json(result);
}
function responseToBookApiResult(data: any): GoogleBooksApiResult {
    return {
        total: data.totalItems,
        items: data.items ? data.items.map((item: any) => {
            return {
                title: item.volumeInfo.title,
                author: item.volumeInfo.authors ? item.volumeInfo.authors.join(' ') : '',
                publisher: item.volumeInfo.publisher,
                publishedDate: item.volumeInfo.publishedDate,
                description: item.volumeInfo.description,
                isbn: item.volumeInfo.industryIdentifiers?.find((id: any) => id.type === 'ISBN_13')?.identifier,
                thumbnail: item.volumeInfo.imageLinks?.thumbnail,
                genres:[],
                authors: []
            };
        })
        : []
    };
}