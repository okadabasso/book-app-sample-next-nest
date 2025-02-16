'use client';
import { Book } from '@/types/Book';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import fetchBook from '@/app/admin/books/functions/fetchBook';
import EditForm from '@/app/admin/books/components/EditForm';
import ContentHeader from '@/components/ContentHeader';
import { getCsrfHeader as createCsrfHeader, createCsrfToken } from '@/shared/csrfToken';
import FormToken from '@/types/FormToken';
import { api } from '@/shared/apiClient';
import { plainToInstance } from 'class-transformer';
import Button from '@/components/forms/Button';
import GoogleBooksSearch from '../../components/GoogleBooksSearch';
import ErrorContent from '../../components/Error';
import TextLink from '@/components/forms/TextLink';

const EditBookPage = () => {
    const { id } = useParams();

    const [book, setBook] = useState<Book>();
    const [error, setError] = useState<string | null>(null);
    const [formToken, setFormToken] = useState<FormToken>({formId:'', token:''});

    useEffect(() => {
        const csrf = async () => {
            const token = await createCsrfToken();
            setFormToken(token);
        }
        csrf();


        const loadBook = async () => {
            if (id) {
                try {
                    const result = await fetchBook(Number(id));
                    if (result.error) {
                        console.warn(result);
                        if (result.status === 404) {
                            setError(result.error);
                        } else {
                            setError(result.error);
                        }
                    } else if (result.book) {
                        setBook(result.book);
                    }
                }
                catch (e: unknown) {
                    if (e instanceof Error) {
                        setError(e.message);
                    } else {
                        setError(String(e));
                    }
                }
            } else {
                setError('Invalid book ID');
            }
        };
        loadBook();

    }, [id]);

    const handleSave = (book: Book) => {
        const saveBook = async (book: Book) => {
            try {
                const response = await api.put(
                    `/api/admin/books/${id}`,
                    { 
                        body: book,
                        headers: createCsrfHeader(formToken),
                        local: true
                    }
                );
                if (!response.ok) {
                    const data = await response.json();
                    throw new Error('Failed to save book [' + response.status + ':' + data.message + ']');
                }

                window.location.href = `/admin/books/${id}`;
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
        window.location.href = `/admin/books/${id}`;
    }
    const handleBookChange = (updatedBook: Book) => {
        setBook(updatedBook);
    }

    if(error){
        return  <ErrorContent title="Error" message={error}/>
    }
    if (!book) {
        return <div>Loading...</div>;
    }

    return (
        <div title='Edit Book'>
            <ContentHeader title='Edit Book' >
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

export default EditBookPage;