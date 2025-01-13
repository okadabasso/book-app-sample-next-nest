"use client";
import { useEffect, useState } from 'react';
import EditForm from '@/app/admin/books/components/EditForm';
import { Book } from '@/types/Book';
import ContentHeader from '@/app/admin/books/components/ContentHeader';
import { get } from 'http';
import { getCsrfHeader, createCsrfToken } from '@/shared/csrfToken';

const CreateBookPage = () => {
    const year = (new Date()).getFullYear();
    const [error, setError] = useState<string | null>(null);
    const [book, setBook] = useState<Book>({
        id: 0,
        title: '',
        author: '',
        publishedYear: year,
        genre: '',
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
                const response = await fetch(
                    '/admin/books/api',
                    { 
                        method: 'POST', 
                        body: JSON.stringify(book),
                        headers: getCsrfHeader(formToken)   ,
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


    return (
        <div>
            <ContentHeader title='Create Book' />
            {error && <p className='text-red-500'>{error}</p>}
            <EditForm book={book} onSave={(book) => handleSave(book)} onCancel={() => handleCancel()} />

        </div>
    );
};

export default CreateBookPage;