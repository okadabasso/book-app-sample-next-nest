import { api } from "@/shared/apiClient";
import { Book } from "@/types/Book";
import { plainToInstance } from "class-transformer";

const fetchBook = async (id: number): Promise<Book> => {
    const response = await api.get(`/api/admin/books/${id}`, { local: true });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data: Book = await response.json();
    const book = plainToInstance(Book, data);
    return book;
};
export default fetchBook;