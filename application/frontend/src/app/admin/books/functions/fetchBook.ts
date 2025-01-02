import { Book } from "@/types/Book";

const fetchBook = async (id: number): Promise<Book> => {
    const response = await fetch(`/admin/books/api/${id}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data: Book = await response.json();
    return data;
};
export default fetchBook;