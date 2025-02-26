'use client';
import { BookData } from '@/types/Book';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import fetchBook from '@/app/admin/books/functions/fetchBook';
import ContentHeader from '@/components/ContentHeader';
import ContentFooter from '@/components/ContentFooter';
import { PencilIcon } from '@heroicons/react/16/solid';
import ButtonLink from '@/components/forms/ButtonLink';
import ErrorContent from '../components/Error';
import TextLink from '@/components/forms/TextLink';

const DetailPage = () => {
    const { id } = useParams();
    const [book, setBook] = useState<BookData>();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
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
    if(error){
        return  <ErrorContent title="Error" message={error}/>
    }

    if (!book) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <ContentHeader title='Book Detail' >
            <div className='justify-self-end'>
                    <TextLink href='/admin/books' className='' variant='default'>Return to list</TextLink>
                </div>
            </ContentHeader>
            {error && <p className='text-red-500'>{error}</p>}
            <form>
                <div>
                    <div className='mb-4 flex gap-2 text-lg font-bold align-top' >
                        {book.thumbnail && <img src={book.thumbnail} alt={book.title} className='w-[40px] h-[51px]' />}
                        <div className='-mt-1'>#{book.id}: </div>
                        <div className='-mt-1'>{book.title}</div>
                    </div>
                    <div className='mb-4 flex gap-2'>
                        <div className='font-bold w-32 min-w-32'>Author</div>
                        <div>{book.author}</div>
                    </div>
                    <div className='mb-4 flex gap-2'>
                        <div className='font-bold w-32'>Publisher</div>
                        <div>{book.publisher}</div>
                    </div>
                    <div className='mb-4 flex gap-2'>
                        <div className='font-bold w-32 min-w-32'>Published Date</div>
                        <div>{book.publishedDate}</div>
                    </div>
                    <div className='mb-4 flex gap-2'>
                        <div className='font-bold w-32 min-w-32'>ISBN</div>
                        <div>{book.isbn}</div>
                    </div>
                    <div className='mb-4 flex gap-2'>
                        <div className='font-bold w-32 min-w-32'>Thumbnail</div>
                        <div>{book.thumbnail}</div>
                    </div>
                    <div className='mb-4 flex gap-2'>
                        <div className='font-bold w-32 min-w-32'>Description</div>
                        <div>{book.description}</div>
                    </div>
                    <div className='mb-4 flex gap-2'>
                        <div className='font-bold w-32 min-w-32'>Genres</div>
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