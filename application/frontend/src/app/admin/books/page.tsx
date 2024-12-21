import Link from 'next/link';
import React from 'react';

const BooksPage = () => {
    return (
        <div>
            <h2 className='text-lg font-bold'>Book List</h2>
            <Link href='/admin/books/create' className='underline text-blue-700 hover:text-blue-500 mr-4'>Add New Book</Link>
            <Link href='/admin/books/edit' className='underline text-blue-700 hover:text-blue-500'>Edit Book</Link>
        </div>
    );
};

export default BooksPage;