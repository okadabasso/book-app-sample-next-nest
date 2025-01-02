'use client';
import { Book } from '@/types/Book';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const DetailPage = () => {
    const [book, setBook] = useState<Book>({ 
        id: 0, 
        title: '', 
        author: '',
        publishedYear: 0, 
        genre: '', 
        description: '' });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        console.log("use effect 0");
        const fetchBook = async (id: number) => {
            try {
                const response = await fetch(`/admin/books/api/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: Book = await response.json();
                console.log(data);
                setBook(data);
            } catch (exception) {
                setError((exception as Error).message);
            }
        };

        const urlParams = new URLSearchParams(window.location.search);
        const bookId = Number(urlParams.get('id'));
        console.log(bookId);
        if (bookId) {
            fetchBook(bookId);
        } else {
            setError('Invalid book ID');
        }
        console.log("use effect");        // Fetch book data when the component mounts
    }, []);

    if (!book) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2 className='text-lg font-bold'>Book Detail [{book.title}]</h2>
            {error && <p className='text-red-500'>{error}</p>}
            <form>
                <div className='mt-4'>
                <p>
                    <strong>Title:</strong> {book.title}
                </p>
                <p>
                    <strong>Author:</strong> {book.author}
                </p>
                <p>
                    <strong>Published Year:</strong> {book.publishedYear}
                </p>
                <p>
                    <strong>Genre:</strong> {book.genre}
                </p>
                <p>
                    <strong>Description:</strong> {book.description}
                </p>
                </div>
                <div className='pt-4 pb-8 sticky bottom-4 bg-white'>
                    <Link href='/admin/books' className='underline text-blue-700 hover:text-blue-500'>戻る</Link>
                </div>
            </form>
        </div>
    );
};

export default DetailPage;