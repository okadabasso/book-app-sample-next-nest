export interface GoogleBooksApiResult {
    total: number;
    items: {
        title: string;
        authors: string[];
        publisher: string;
        publishedDate: string;
        description: string;
        isbn?: string;
        thumbnail: string | undefined;
        
    }[];
}
export interface GoogleBookItem {
    title: string;
    author: string;
    publisher: string;
    publishedDate: string;
    description: string;
    isbn: string | undefined;
    thumbnail: string | undefined;
    genres: string[];
    authors: string[];
}

export interface GoogleBooksApiResponse {
    totalItems: number;
    items: GoogleBookVolume[];
}
export interface GoogleBooksIndustryIdentifier {
    type: string;
    identifier: string;
}
export interface GoogleBookVolume {
    volumeInfo: {
        title: string;
        authors?: string[];
        publisher: string;
        publishedDate: string;
        description: string;
        industryIdentifiers?: GoogleBooksIndustryIdentifier[];
        imageLinks?: { thumbnail: string };
    };
}