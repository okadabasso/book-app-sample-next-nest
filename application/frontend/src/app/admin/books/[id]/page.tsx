'use client';
import { Book } from '@/types/Book';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import fetchBook from '@/app/admin/books/functions/fetchBook';
import ContentHeader from '@/app/admin/books/components/ContentHeader';
import ContentFooter from '@/components/ContentFooter';
import { PencilIcon } from '@heroicons/react/16/solid';
import ButtonLink from '@/components/forms/ButtonLink';

const DetailPage = () => {
    const { id } = useParams();
    const [book, setBook] = useState<Book>();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadBook = async () => {
            if (id) {
                try {
                    const book = await fetchBook(Number(id));
                    setBook(book);
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

    if (!book) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <ContentHeader title='Book Detail' />
            {error && <p className='text-red-500'>{error}</p>}
            <form>
                <div className='mt-4'>
                    <div className='mb-4 flex gap-2'>
                        <div>{book.id}: </div>
                        <div>{book.title}</div>
                    </div>
                    <div className='mb-4'>
                        <div className='font-bold'>Author</div>
                        <div>{book.author}</div>
                    </div>
                    <div className='mb-4'>
                        <div className='font-bold'>Published Year</div>
                        <div>{book.publishedYear}</div>
                    </div>
                    <div className='mb-4'>
                        <div className='font-bold'>Description</div>
                        <div>{book.description}</div>
                    </div>
                    <div className='mb-4'>
                        <div className='font-bold'>Genres</div>
                        <ul className='flex flex-wrap gap-2'>
                            {book.genres.map((genre) => (
                                <li key={genre.id} className=''>{genre.name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <ContentFooter>
                    <ButtonLink href={`/admin/books/${book.id}/edit`} className='w-32' variant='outline-primary'>
                        <PencilIcon className='h-4 w-4 inline-block relative -top-0.5 mr-1' />
                        編集する
                    </ButtonLink>
                    <ButtonLink href='/admin/books' className='w-32' variant='outline-default'>一覧に戻る</ButtonLink>
                </ContentFooter>
            </form>
        </div>
    );
};

export default DetailPage;