"use client";
import { useEffect, useState } from 'react';
import EditForm from '@/app/admin/books/components/EditForm';
import { BookData } from '@/types/Book';
import ContentHeader from '@/components/ContentHeader';
import { getCsrfHeader, createCsrfToken } from '@/shared/csrfToken';
import FormToken from '@/types/FormToken';
import { api } from '@/shared/apiClient';
import Button from '@/components/forms/Button';
import GoogleBooksSearch from '../components/GoogleBooksSearch';
import { plainToInstance } from 'class-transformer';
import TextLink from '@/components/forms/TextLink';

const CreateBookPage = () => {
    const year = (new Date()).getFullYear().toString();
    const [error, setError] = useState<string | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [book, setBook] = useState<BookData>({
        id: 0,
        title: '',
        author: '',
        publishedDate: year,
        isbn: '',
        publisher: '',
        thumbnail: '',
        description: '',
        authors: [],
        genres: [],
    });
    const [formToken, setFormToken] = useState<FormToken>({formId:'', token:''});

    useEffect(() => {
        const csrf = async () => {
            const token = await createCsrfToken();
            setFormToken(token);
        }
        csrf();
    }, []);
    const handleSave = (book: BookData) => {
        const saveBook = async (book: BookData) => {
            try {
                const response = await  api.post(
                    '/api/admin/books',{
                        body: book,
                        headers: getCsrfHeader(formToken),
                        local: true
                    }
                );
                if (!response.ok) {
                    const data = await response.json();
                    throw new Error('Failed to save book [' + response.status + ':' + data.message + ']');
                }

                const updatedBook = await response.json();
                window.location.href = `/admin/books/${updatedBook.id}`;
            } catch (e: unknown) {
                if (e instanceof Error) {
                    setError(e.message);
                } else {
                    setError(String(e));
                }
            }
        };

        saveBook(book);
    }
    const handleCancel = () => {
        window.location.href = `/admin/books`;
    }
    const handleBookChange = (updatedBook: BookData) => {
        setBook(updatedBook);
    }

    return (
        <div>
            <ContentHeader title='Create Book' >
                <div className='justify-self-end'>
                    <TextLink href='/admin/books' className='' variant='default'>Return to list</TextLink>
                </div>
            </ContentHeader>
            {error && <p className='text-red-500'>{error}</p>}
            <EditForm book={book} 
                onSave={(book) => handleSave(book)} 
                onCancel={() => handleCancel()} 
                onChange={handleBookChange}/>
        </div>
    );
};

export default CreateBookPage;