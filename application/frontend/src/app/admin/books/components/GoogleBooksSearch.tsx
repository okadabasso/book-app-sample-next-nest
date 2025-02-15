'use client'
import CustomDialog from "@/components/CustomDialog";
import Button from "@/components/forms/Button";
import TextBox from "@/components/forms/TextBox";
import { api } from "@/shared/apiClient";
import { Book } from "@/types/Book";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { useEffect, useRef, useState } from "react";

interface GoogleBooksSearchProps{
    searchTitle?: string;
    searchAuthor?: string;
    searchIsbn?: string;
    isOpen: boolean;
    onClose: () => void;
    onSelected: (book: Book) => void;
}

const GoogleBooksSearch = ({searchTitle, searchAuthor, searchIsbn,  isOpen, onClose, onSelected}: GoogleBooksSearchProps) => {
    const [items, setItems] = useState<Book[]>([]);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [isbn, setIsbn] = useState('');
    const [error, setError] = useState<string | null>(null);
    const limit = 10;
    const [offset, setOffset] = useState(0);
    const [total, setTotal] = useState(0);
    const listRef = useRef<HTMLDivElement>(null); // リストの参照を作成

    useEffect(() => {
        if(searchTitle || searchAuthor || searchIsbn){
            searchBooks(searchTitle || '', searchAuthor || '', searchIsbn || '', limit, 0);
        }
        setTitle(searchTitle || '');
        setAuthor(searchAuthor || '');
        setIsbn(searchIsbn || '');

    }, [searchTitle, searchAuthor, searchIsbn]);
    const searchBooks = async (title: string, author: string, isbn: string, limit: number, offset: number) => {
        try {
            const response = await api.get('/api/admin/books/google_books', {
                params: {
                    title: title,
                    author: author,
                    isbn: isbn,
                    limit: limit,
                    offset: offset
                },
                local: true
            });
            if (!response.ok) {
                const data = await response.json();
                throw new Error('Failed to search books [' + response.status + ':' + data.message + ']');
            }
            const data = await response.json();
            setItems(data.items);
            setTotal(data.total);
            setOffset(offset);
            console.log('data: ', data);
            if (listRef.current) {
                listRef.current.scrollTop = 0; // スクロール位置をリセット
            }
        }
        catch (e: unknown) {
            if (e instanceof Error) {
                setError(e.message);
            } else {
                setError(String(e));
            }
        }
    };
    const handleSearch = async () => {
        console.log('searching...');
        await searchBooks(title, author, isbn, limit, 0);

    }
    const handleNext = async () => {
        if(offset + limit < total){
            await searchBooks(title, author, isbn, limit, offset + limit);
        }
        console.log('next offset: ', offset);
    }
    const handlePrev = async () => {
        if(offset - limit >= 0){
            await searchBooks(title, author, isbn, limit, offset - limit);
        }
        console.log('prev offset: ', offset);
    }
    return (
        <CustomDialog
            id="google-books-search"
            isOpen={isOpen}
            onClose={onClose}
            headerContent="Google Books Search"
            footerContent={
                <>
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
                        <label className="mr-2">Author</label>
                        <TextBox name="author" value={author} onChange={(event)=>setAuthor(event.target.value) } />

                    </div>
                    <div>
                        <label className="mr-2">ISBN</label>
                        <TextBox name="isbn" value={isbn}  onChange={(event)=>setIsbn(event.target.value) }/>
                    </div>
                    <div>
                        <Button type="button" className="h-[30px]" size="sm" onClick={handleSearch}>Search</Button>
                    </div>
                </div>
                {error && <div className="text-red-600">{error}</div>}
                <div ref={listRef}  className="scrollable border border-gray-400 mt-4">
                    <ul className="px-2">
                        {items.map((item, index) => (
                            <li key={index} className="my-2 ">
                                <a href="#" onClick={() => onSelected(item)} className="flex gap-2">
                                    <img src={item.thumbnail} className="h-16" />
                                    <div>
                                    <div className="">{item.title}</div>
                                    <div className="flex gap-x-4 flex-wrap text-sm">
                                        <div>{item.author}</div>
                                        <div>{item.publisher}</div>
                                        <div>{item.publishedDate}</div>
                                        <div>{item.isbn}</div>

                                    </div>

                                        
                                    </div>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="mt-2 flex gap-2">
                    <Button size="sm" onClick={handlePrev} className="w-20">
                        <ChevronLeftIcon className="h-4 w-4 inline-block" />
                        Prev
                    </Button>
                    <Button size="sm" onClick={handleNext} className="w-20">
                        Next
                        <ChevronRightIcon className="h-4 w-4 inline-block" />
                    </Button>
                    <div>
                        {offset + 1} - {offset + items.length} / {total}
                    </div>
                </div>
        </CustomDialog>
    );
};

export default GoogleBooksSearch;