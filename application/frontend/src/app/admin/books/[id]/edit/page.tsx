'use client';
import { Book } from '@/types/Book';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import fetchBook from '../../functions/fetchBook';
import EditForm from '../../components/EditForm';

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
                catch (e: any) {
                    setError(e.message);    
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
                    {method: 'PUT', body: JSON.stringify(book)}
                );
                if (!response.ok) {
                    throw new Error('Failed to save book');
                }

                window.location.href = `/admin/books/${book.id}`;
            } catch (e: any) {
                setError(e.message);
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
        <div>
            <h2 className='text-lg font-bold'>Edit Book</h2>
            <EditForm book={book} onSave={(book) => handleSave(book)} onCancel={() => handleCancel()} />

        </div>
    );
};

export default EditBookPage;