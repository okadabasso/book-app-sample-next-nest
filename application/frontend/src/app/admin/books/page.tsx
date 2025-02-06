"use client"
import { Book } from '@/types/Book';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ContentHeader from '@/app/admin/books/components/ContentHeader';
import { plainToInstance } from 'class-transformer';
import ContentFooter from '@/components/ContentFooter';
import { PlusIcon } from '@heroicons/react/16/solid';
import ButtonLink from '@/components/forms/ButtonLink';

const BooksPage = () => {
    const [data, setBooks] = useState<Book[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('/api/admin/books');
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const data: Book[] = await response.json();
                const books =  plainToInstance(Book, data);
                setBooks(books);
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
                        <th className='w-64 text-left border border-gray-300 px-1 py-0.5'>Title</th>
                        <th className='w-48 text-left border border-gray-300 px-1 py-0.5'>Author</th>
                        <th className='text-left border border-gray-300 px-1 py-0.5'>Description</th>
                        <th className='w-40 text-left border border-gray-300 px-1 py-0.5'>Published Year</th>
                        <th className='w-64 text-left border border-gray-300 px-1 py-0.5'>Genre</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((book) => (
                        <tr key={book.id}>
                            <td className=' text-left border border-gray-300 px-1 py-0.5'>
                                <Link href={`/admin/books/${book.id}`} className='underline text-blue-700 hover:text-blue-500'>{book.title}</Link>

                            </td>


                            <td className=' text-left border border-gray-300 px-1 py-0.5'>{book.author}</td>
                            <td className=' text-left border border-gray-300 px-1 py-0.5'>{book.description}</td>
                            <td className=' text-left border border-gray-300 px-1 py-0.5'>{book.publishedYear}</td>
                            <td className=' text-left border border-gray-300 px-1 py-0.5'>
                                { book.genres.map(genre => <span key={genre.id} className='inline-block mr-2'>{genre.name}</span>) } 
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ContentFooter>
                <ButtonLink href='/admin/books/create' className='w-40' variant='outline-primary'>
                <PlusIcon className='h-4 w-4 inline-block relative -top-0.5 mr-1' />
                Add New Book
                </ButtonLink>
            </ContentFooter>

        </div>
    );
};

export default BooksPage;