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
            <h2 className='text-lg font-bold mb-4'>Book List</h2>
            {error && <p className='text-red-500'>{error}</p>}
            <table className='table-auto w-full'>
                <thead>
                    <tr>
                        <th className='w-64 text-left border border-gray-400 px-2 py-1'>Title</th>
                        <th className='w-48 text-left border border-gray-400 px-2 py-1'>Author</th>
                        <th className='text-left border border-gray-400 px-2 py-1'>Description</th>
                        <th className='w-40 text-left border border-gray-400 px-2 py-1'>Published Year</th>
                        <th className='w-64 text-left border border-gray-400 px-2 py-1'>Genre</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((book) => (
                        <tr key={book.id}> 
                        <td className=' text-left border border-gray-400 px-2 py-1'> 
                            <Link href={`/admin/books/detail?id=${book.id}`} className='underline text-blue-700 hover:text-blue-500'>{book.title}</Link>
                          
                        </td>

                            
                            <td className=' text-left border border-gray-400 px-2 py-1'>{book.author}</td>
                            <td className=' text-left border border-gray-400 px-2 py-1'>{book.description}</td>
                            <td className=' text-left border border-gray-400 px-2 py-1'>{book.publishedYear}</td>
                            <td className=' text-left border border-gray-400 px-2 py-1'>{book.genre}</td>
                        </tr>
                    ))}
                </tbody>
            </table>  
            <div className='mt-4'>
                <Link href='/admin/books/create' className='underline text-blue-700 hover:text-blue-500 mr-4'>Add New Book</Link>
                <Link href='/admin/books/edit' className='underline text-blue-700 hover:text-blue-500'>Edit Book</Link>
    
            </div>
        </div>
    );
};

export default BooksPage;