"use client";
import { useEffect, useState } from 'react';
import EditForm from '@/app/admin/books/components/EditForm';
import { Book } from '@/types/Book';
import ContentHeader from '@/components/ContentHeader';
import { getCsrfHeader, createCsrfToken } from '@/shared/csrfToken';
import FormToken from '@/types/FormToken';
import { api } from '@/shared/apiClient';
import Button from '@/components/forms/Button';
import GoogleBooksSearch from '../components/GoogleBooksSearch';
import { plainToInstance } from 'class-transformer';

const CreateBookPage = () => {
    const year = (new Date()).getFullYear();
    const [error, setError] = useState<string | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [book, setBook] = useState<Book>({
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
    const [formToken, setFormToken] = useState<FormToken>({formId:'', token:''});

    useEffect(() => {
        const csrf = async () => {
            const token = await createCsrfToken();
            setFormToken(token);
        }
        csrf();
    }, []);
    const handleSave = (book: Book) => {
        const saveBook = async (book: Book) => {
            try {
                const response = await  api.post(
                    '/api/admin/books',{
                        body: book,
                        headers: getCsrfHeader(formToken),
                        local: true
                    }
                );
                if (!response.ok) {
                    const data = await response.json();
                    throw new Error('Failed to save book [' + response.status + ':' + data.message + ']');
                }

                const updatedBook = await response.json();
                window.location.href = `/admin/books/${updatedBook.id}`;
            } catch (e: unknown) {
                if (e instanceof Error) {
                    setError(e.message);
                } else {
                    setError(String(e));
                }
            }
        };

        saveBook(book);
    }
    const handleCancel = () => {
        window.location.href = `/admin/books`;
    }
    const selectBook = (book: Book) => {
        console.log('selected book: ', book);
        const updatedBook: Book =  plainToInstance(Book, book);
        setBook(updatedBook);
        setIsDialogOpen(false);
    }
    const handleBookChange = (updatedBook: Book) => {
        setBook(updatedBook);
    }

    return (
        <div>
            <ContentHeader title='Create Book' >
                <div className='justify-self-end'>
                    <Button onClick={()=>{setIsDialogOpen(true)}} className='' variant='outline-default' size='sm'>Search Google Books</Button>
                </div>
            </ContentHeader>
            {error && <p className='text-red-500'>{error}</p>}
            <EditForm book={book} 
                onSave={(book) => handleSave(book)} 
                onCancel={() => handleCancel()} 
                onChange={handleBookChange}/>
            <GoogleBooksSearch 
                searchTitle={book.title}
                searchAuthor={book.author}
                searchIsbn={book.isbn}
                isOpen={isDialogOpen} 
                onClose={() => {setIsDialogOpen(false)}} 
                onSelected={(book) => { selectBook(book); } } />
        </div>
    );
};

export default CreateBookPage;