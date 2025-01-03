'use client';
import { Book } from '@/types/Book';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import fetchBook from '@/app/admin/books/functions/fetchBook';
import EditForm from '@/app/admin/books/components/EditForm';
import ContentHeader from '@/app/admin/books/components/ContentHeader';

const EditBookPage = () => {
    const { id } = useParams();

    const [book, setBook] = useState<Book>();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadBook = async () => {
            if (id) {
                try {
                    const book = await fetchBook(Number(id));
                    setBook(book);
                }
                catch (e: unknown) {
                    if (e instanceof Error) {
                        setError(e.message);
                    } else {
                        setError(String(e));
                    }
                }
            } else {
                setError('Invalid book ID');
            }
        };
        loadBook();

    }, []);

    const handleSave = (book: Book) => {
        console.log('Save', book);
        const saveBook = async (book: Book) => {
            try {
                const response = await fetch(
                    `/admin/books/api/${book.id}`,
                    { method: 'PUT', body: JSON.stringify(book) }
                );
                if (!response.ok) {
                    throw new Error('Failed to save book');
                }

                window.location.href = `/admin/books/${book.id}`;
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
        console.log('Cancel');
        window.location.href = `/admin/books/${id}`;
    }

    if (!book) {
        return <div>Loading...</div>;
    }

    return (
        <div title='Edit Book'>
            <ContentHeader title='Edit Book' />
            {error && <p className='text-red-500'>{error}</p>}
            <EditForm book={book} onSave={(book) => handleSave(book)} onCancel={() => handleCancel()} />

        </div>
    );
};

export default EditBookPage;