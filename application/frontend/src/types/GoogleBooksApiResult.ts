export interface GoogleBooksApiResult {
    total: number;
    items: {
        id: string;
        title: string;
        authors: string[];
        publisher: string;
        publishedDate: string;
        description: string;
        isbn?: string;
        thumbnail: string;
        
    }[];
}