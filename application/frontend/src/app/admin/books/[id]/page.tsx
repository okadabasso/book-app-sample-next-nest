'use client';
import { Book } from '@/types/Book';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import fetchBook from '@/app/admin/books/functions/fetchBook';
import ContentHeader from '@/app/admin/books/components/ContentHeader';

const  DetailPage = () => {
    const { id } = useParams();
    console.log("id=" + id);
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

    if (!book) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <ContentHeader title='Book Detail' />
            {error && <p className='text-red-500'>{error}</p>}
            <form>
                <div className='mt-4'>
                    <div className='mb-4'>
                        <div className='font-bold'>Id</div>
                        <div>{book.id}</div>
                    </div>
                    <div className='mb-4'>
                        <div className='font-bold'>Title</div>
                        <div>{book.title}</div>
                    </div>
                    <div className='mb-4'>
                        <div className='font-bold'>Author</div>
                        <div>{book.author}</div>
                    </div>
                    <div className='mb-4'>
                        <div className='font-bold'>Published Year</div>
                        <div>{book.publishedYear}</div>
                    </div>
                    <div className='mb-4'>
                        <div className='font-bold'>Genre</div>
                        <div>{book.genre}</div>
                    </div>
                    <div className='mb-4'>
                        <div className='font-bold'>Description</div>
                        <div>{book.description}</div>
                    </div>
                </div>
                <div className='pt-4 pb-8 sticky bottom-4 bg-white'>
                    <Link href={`/admin/books/${book.id}/edit`} className='underline text-blue-700 hover:text-blue-500 mr-4'>編集する</Link>
                    <Link href='/admin/books' className='underline text-blue-700 hover:text-blue-500'>戻る</Link>
                </div>
            </form>
        </div>
    );
};

export default DetailPage;