"use client"
import { Book } from '@/types/Book';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import ContentHeader from '@/app/admin/books/components/ContentHeader';
import { plainToInstance } from 'class-transformer';

const BooksPage = () => {
    const [data, setBooks] = useState<Book[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('/admin/books/api');
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const data: Book[] = await response.json();
                const books =  plainToInstance(Book, data);
                setBooks(books);
                console.log(books);
            } catch (e: unknown) {
                if (e instanceof Error) {
                    setError(e.message);
                } else {
                    setError(String(e));
                }
            }
        };

        fetchBooks();
    }
        , []);

    return (
        <div>
            <ContentHeader title='Book List' />
            {error && <p className='text-red-500'>{error}</p>}
            <table className='table-auto w-full'>
                <thead>
                    <tr>
                        <th className='w-64 text-left border border-gray-300 px-2 py-1'>Title</th>
                        <th className='w-48 text-left border border-gray-300 px-2 py-1'>Author</th>
                        <th className='text-left border border-gray-300 px-2 py-1'>Description</th>
                        <th className='w-40 text-left border border-gray-300 px-2 py-1'>Published Year</th>
                        <th className='w-64 text-left border border-gray-300 px-2 py-1'>Genre</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((book) => (
                        <tr key={book.id}>
                            <td className=' text-left border border-gray-300 px-2 py-1'>
                                <Link href={`/admin/books/${book.id}`} className='underline text-blue-700 hover:text-blue-500'>{book.title}</Link>

                            </td>


                            <td className=' text-left border border-gray-300 px-2 py-1'>{book.author}</td>
                            <td className=' text-left border border-gray-300 px-2 py-1'>{book.description}</td>
                            <td className=' text-left border border-gray-300 px-2 py-1'>{book.publishedYear}</td>
                            <td className=' text-left border border-gray-300 px-2 py-1'>{book.genre}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='mt-4'>
                <Link href='/admin/books/create' className='underline text-blue-700 hover:text-blue-500 mr-4'>Add New Book</Link>

            </div>
        </div>
    );
};

export default BooksPage;