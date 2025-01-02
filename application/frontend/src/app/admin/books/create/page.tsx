"use client";
import { useState } from 'react';
import EditForm from '../components/EditForm';
import { Book } from '@/types/Book';

const CreateBookPage = () => {
    const year = (new Date()).getFullYear();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [book, setBook] = useState<Book>({
        id: 0,
        title: '',
        author: '',
        publishedYear: year,
        genre: '',
        description: ''
    });

    const handleSave = (book: Book) => {    
        const saveBook = async (book: Book) => {
            try {
                const response = await fetch(`/admin/books/api`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(book),
                });

                if (!response.ok) {
                    throw new Error('Failed to save book');
                }

                const updatedBook = await response.json();
                window.location.href = `/admin/books/${updatedBook.id}`;
            } catch (e: any) {
                setError(e.message);
            }
        };

        saveBook(book);
    }
    const handleCancel = () => {   
        window.location.href = `/admin/books`;
     }


    return (
        <div>
            <h2 className='text-lg font-bold'>Create Book</h2>
            <EditForm book={book} onSave={(book) => handleSave(book)} onCancel={() => handleCancel()} />

        </div>
    );
};

export default CreateBookPage;