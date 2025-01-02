'use client';
import { Book } from '@/types/Book';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

interface BookDetailProps {
    id: number;
  }
const  DetailPage = () => {
    const { id } = useParams();
    console.log("id=" + id);
    const [book, setBook] = useState<Book>({
        id: 0,
        title: '',
        author: '',
        publishedYear: 0,
        genre: '',
        description: ''
    });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
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

        if (id) {
            fetchBook(id);
        } else {
            setError('Invalid book ID');
        }
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
                    <dl className="flex flex-wrap gap-y-2">
                        <dt className='font-bold w-1/6'>ID</dt>
                        <dd className='w-5/6'>{book.id}</dd>
                        <dt className='font-bold w-1/6'>Title</dt>
                        <dd className='w-5/6'>{book.title}</dd>
                        <dt className='font-bold w-1/6'>Author</dt>
                        <dd className='w-5/6'>{book.author}</dd>
                        <dt className='font-bold w-1/6'>Published Year</dt>
                        <dd className='w-5/6'>{book.publishedYear}</dd>
                        <dt className='font-bold w-1/6'>Genre</dt>
                        <dd className='w-5/6'>{book.genre}</dd>
                        <dt className='font-bold w-1/6'>Description</dt>
                        <dd className='w-5/6'>{book.description}</dd>

                    </dl>
                </div>
                <div className='pt-4 pb-8 sticky bottom-4 bg-white'>
                    <Link href='/admin/books' className='underline text-blue-700 hover:text-blue-500'>戻る</Link>
                </div>
            </form>
        </div>
    );
};

export default DetailPage;