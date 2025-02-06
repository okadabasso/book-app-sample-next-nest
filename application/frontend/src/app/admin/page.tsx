import TextLink from '@/components/forms/TextLink';
import React from 'react';

const AdminPage = () => {
    return (
        <div>
            <h2 className='text-lg font-bold'>Admin Dashboard</h2>
            <div className='mt-4'>
                <ul>
                    <li><TextLink href={"/admin/books"} variant='primary'>Books</TextLink></li>
                </ul>
            </div>
        </div>
    );
};

export default AdminPage;