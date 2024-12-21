export interface Book {
    id: string;
    title: string;
    publisherId: number | null;
    publishedDate: Date;
    isbn13: string;
    genre: string;
    summary: string;
}