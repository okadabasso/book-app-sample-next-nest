import { Book } from "@/types/Book";
import { plainToInstance } from "class-transformer";

const fetchBook = async (id: number): Promise<Book> => {
    const response = await fetch(`/admin/books/api/${id}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data: Book = await response.json();
    const book = plainToInstance(Book, data);
    return book;
};
export default fetchBook;