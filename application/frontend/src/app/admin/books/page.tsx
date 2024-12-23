"use client"
import { Book } from '@/types/Book';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

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
                setBooks(data);
                console.log(data);
            } catch (err: any) {
                setError(err.message);
            }
        };

        fetchBooks();
    }
    , []);
    
    return (
        <div>
            <h2 className='text-lg font-bold'>Book List</h2>
            {error && <p className='text-red-500'>{error}</p>}  
            <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                    <tr>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Title</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Publisher ID</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Published Date</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>ISBN-13</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Genre</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Summary</th>
                    </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                    {data.map((book) => (
                        <tr key={book.id}>
                            <td className='px-6 py-4 whitespace-nowrap'>{book.title}</td>
                            <td className='px-6 py-4 whitespace-nowrap'>{book.publisherId}</td>
                            <td className='px-6 py-4 whitespace-nowrap'>{new Date(book.publishedDate).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' })}</td>
                            <td className='px-6 py-4 whitespace-nowrap'>{book.isbn13}</td>
                            <td className='px-6 py-4 whitespace-nowrap'>{book.genre}</td>
                            <td className='px-6 py-4 whitespace-nowrap'>{book.summary}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link href='/admin/books/create' className='underline text-blue-700 hover:text-blue-500 mr-4'>Add New Book</Link>
            <Link href='/admin/books/edit' className='underline text-blue-700 hover:text-blue-500'>Edit Book</Link>
        </div>
    );
};

export default BooksPage;