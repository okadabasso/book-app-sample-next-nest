import Link from 'next/link';
import React from 'react';

const AdminPage = () => {
    return (
        <div>
            <h2 className='text-lg font-bold'>Admin Dashboard</h2>
            <div className='mt-4'>
                <ul>
                    <li><Link href={"/admin/books"} className='underline text-blue-700 hover:text-blue-500'>Books</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default AdminPage;