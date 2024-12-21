'use client';
import { Book } from '@/types/Book';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const EditBookPage = () => {
    const [book, setBook] = useState<Book>({ 
        id: '', 
        title: '', 
        publishedDate: new Date(), 
        genre: '', 
        summary: '' });

    useEffect(() => {
        console.log("use effect");        // Fetch book data when the component mounts
    }, []);

    if (!book) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2 className='text-lg font-bold'>Edit Book</h2>
            <form>
                <div>
                    <label>Title:</label>
                    <input type="text" value={book.title} onChange={(e) => setBook({ ...book, title: e.target.value })} />
                </div>
                <div className='pt-4 pb-8 sticky bottom-4 bg-white'>
                    <button type="submit" className='bg-blue-500 text-gray-100 hover:bg-blue-600 hover:text-white p-2 rounded w-24 mr-4'>Save</button>
                    <Link href='/admin/books' className='underline text-blue-700 hover:text-blue-500'>戻る</Link>
                </div>
            </form>
        </div>
    );
};

export default EditBookPage;