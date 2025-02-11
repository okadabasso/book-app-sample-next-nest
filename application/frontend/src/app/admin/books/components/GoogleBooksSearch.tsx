'use client'
import CustomDialog from "@/components/CustomDialog";
import Button from "@/components/forms/Button";
import TextBox from "@/components/forms/TextBox";
import { api } from "@/shared/apiClient";
import { Book } from "@/types/Book";
import { useState } from "react";

interface GoogleBooksSearchProps{
    isOpen: boolean;
    onClose: () => void;
    onSelected: (book: Book) => void;
}

const GoogleBooksSearch = ({isOpen, onClose, onSelected}: GoogleBooksSearchProps) => {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState<Book[]>([]);
    const [title, setTitle] = useState('');
    const [isbn, setIsbn] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSelected = () => {
        onSelected({
            id: 0,
            title: '',
            author: '',
            publishedDate: '',
            isbn: '',
            publisher: '',
            thumbnail: '',
            description: '',
            authors: [],
            genres: [],
        });
    }

    const handleSearch = () => {
        console.log('searching...');
        const searchBooks = async () => {
            try {
                const response = await api.get('/api/admin/books/google_books', {
                    params: {
                        title: title,
                        isbn: isbn
                    },
                    local: true
                });
                if (!response.ok) {
                    const data = await response.json();
                    throw new Error('Failed to search books [' + response.status + ':' + data.message + ']');
                }
                const data = await response.json();
                setItems(data.items);
            }
            catch (e: unknown) {
                if (e instanceof Error) {
                    setError(e.message);
                } else {
                    setError(String(e));
                }
            }
        };
        searchBooks();

    }

    return (
        <CustomDialog
            id="google-books-search"
            isOpen={isOpen}
            onClose={onClose}
            headerContent="Google Books Search"
            footerContent={
                <>
                <Button onClick={handleSelected} className='w-48'>Select</Button>
                <Button onClick={onClose} className='w-48'>Close</Button>
                </>
            }
            className="h-[90%]"
        >
                <div className="flex flex-wrap gap-4">
                    <div>
                        <label className="mr-2">Title</label>
                        <TextBox name="title" value={title} onChange={(event)=>setTitle(event.target.value) } />

                    </div>
                    <div>
                        <label className="mr-2">ISBN</label>
                        <TextBox name="isbn" value={isbn}  onChange={(event)=>setTitle(event.target.value) }/>
                    </div>
                    <div>
                        <Button type="button" className="h-[30px]" size="sm" onClick={handleSearch}>Search</Button>
                    </div>
                </div>
                {error && <div className="text-red-600">{error}</div>}
                <div className="scrollable border border-gray-400 mt-4">
                    <ul className="p-2">
                        {items.map((item, index) => (
                            <li key={index} className="mb-2">{item.title}
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <Button size="sm">
                        Prev
                    </Button>
                    <Button size="sm">
                        Next
                    </Button>
                </div>
        </CustomDialog>
    );
};

export default GoogleBooksSearch;