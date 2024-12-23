export interface Book {
    id: number;
    title: string;
    publisherId: number | null;
    publishedDate: Date;
    isbn13: string;
    genre: string;
    summary: string;
}