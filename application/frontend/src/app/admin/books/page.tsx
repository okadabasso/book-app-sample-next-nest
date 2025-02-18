"use client"
import { BookQueryStore } from '@/app/api/admin/books/store/BookQueryStore';
import ContentFooter from '@/components/ContentFooter';
import ContentHeader from '@/components/ContentHeader';
import Button from '@/components/forms/Button';
import ButtonLink from '@/components/forms/ButtonLink';
import TextBox from '@/components/forms/TextBox';
import { api } from '@/shared/apiClient';
import { createCsrfToken, getCsrfHeader } from '@/shared/csrfToken';
import { resetScroll } from '@/shared/resetScroll';
import { BookData, BookFindResult } from '@/types/Book';
import { BookQuery } from '@/types/BookQuery';
import { ChevronLeftIcon, ChevronRightIcon, MagnifyingGlassIcon, PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/16/solid';
import { plainToInstance } from 'class-transformer';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useStore } from 'zustand';

const BooksPage = () => {
    const [data, setBooks] = useState<BookData[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [total, setTotal] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const query = useStore(BookQueryStore, state => state.query);
    const setQuery = useStore(BookQueryStore, state => state.setQuery);
    const router = useRouter();

    const fetchBooks = async (query: BookQuery) => {
        setIsLoading(true);
        try {
            const response = await api.get('/api/admin/books', { params: {...query, title: query.title || ''}, local: true });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data: BookFindResult = await response.json();
            setBooks(data.books);
            setTotal(data.total);
            resetScroll();
        } catch (e: unknown) {
            if (e instanceof Error) {
                setError(e.message);
            } else {
                setError(String(e));
            }
        }
        finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks(query);
    }, []);

    const handleSearch = () => {
        fetchBooks(query);
    }
    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery({ ...query, title: event.target.value, offset: 0 });
    }
    const handleNextPage = async () => {
        const next = query.offset + query.limit < total ? query.offset + query.limit : query.offset;
        const newQuery = { ...query, offset: next };
        setQuery(newQuery);
        await fetchBooks(newQuery);
    }
    const handlePreviousPage = async () => {
        const previous = query.offset - query.limit < 0 ? 0 : query.offset - query.limit;
        const newQuery = { ...query, offset: previous };
        setQuery(newQuery);
        await fetchBooks(newQuery);
    }
    const handleEditBook  = (id: number) =>{
        console.log('edit book');
        router.push(`/admin/books/${id}/edit`);
    }
    const handleDeleteBook  = async (id: number) =>{
        console.log('edit book');
        const csrfToken = await createCsrfToken(); // CSRF トークンを取得する関数を実装してください

        await api.delete(`/api/admin/books/${id}`, {
            headers: getCsrfHeader(csrfToken),
            local: true
        });
        await fetchBooks(query);
    }

    return (
        <div>
            <ContentHeader title='Book List' />
            {error && <p className='text-red-500'>{error}</p>}
            <div className='flex mb-4'>
                <div>
                    <label className='mr-2 inline' htmlFor="query">Title:</label>
                    <TextBox type='text' id="query" value={query.title || ''} placeholder='Search Title' onChange={(event) => handleTitleChange(event)} />
                </div>
                <div>
                    <Button onClick={() => { handleSearch() }} size='sm' className='w-24'>
                        <MagnifyingGlassIcon className='h-4 w-4 inline-block relative -top-0.5' />
                        Search
                    </Button>
                </div>
            </div>
            {total === 0
                ? isLoading ?  <div>Loading...</div> : <div>No books found</div>
                : (
                    <div>
                        <table className='table-auto w-full'>
                            <thead>
                                <tr>
                                    <th className='w-12 max-w-12 text-center border border-gray-300 px-1 py-0.5'>#</th>
                                    <th className='min-w-48 text-left border border-gray-300 px-1 py-0.5'>Title</th>
                                    <th className='w-40 max-w-40 text-left border border-gray-300 px-1 py-0.5'>Author</th>
                                    <th className='w-40 max-w-40 text-left border border-gray-300 px-1 py-0.5'>Publisher</th>
                                    <th className='w-40 max-w-40 text-left border border-gray-300 px-1 py-0.5'>Genre</th>
                                    <th className='w-12 max-w-12  text-center border border-gray-300 px-1 py-0.5'>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((book) => (
                                    <tr key={book.id}>
                                        <td className=' text-right border border-gray-300 px-1 py-0.5'>{book.id}</td>
                                        <td className=' text-left border border-gray-300 px-1 py-0.5'>
                                            <Link href={`/admin/books/${book.id}`} className='underline text-blue-700 hover:text-blue-500'>{book.title}</Link>

                                        </td>


                                        <td className=' text-left border border-gray-300 px-1 py-0.5'>{book.author}</td>
                                        <td className=' text-left border border-gray-300 px-1 py-0.5'>{book.publisher}</td>
                                        <td className=' text-left border border-gray-300 px-1 py-0.5'>
                                            {book.genres.map(genre => <span key={genre.id} className='inline-block mr-2'>{genre.name}</span>)}
                                        </td>
                                        <td className=' text-left border border-gray-300 px-1 py-0.5'>
                                            <div className='flex gap-1'>
                                                <Button size="sm" onClick={() => { handleEditBook(book.id) }} title='Edit'>
                                                    <PencilIcon className='w-3 h-3'></PencilIcon>
                                                </Button>
                                                <Button size="sm" onClick={() => { handleDeleteBook(book.id) }} title='Delete'>
                                                    <TrashIcon className='w-3 h-3'></TrashIcon>
                                                </Button>
                                            </div>


                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className='flex gap-2 mt-4'>
                            <Button onClick={() => { handlePreviousPage() }} className='w-24' variant='outline-default' size='sm'>
                                <ChevronLeftIcon className='w-4 h-4 mr-0.5 inline-block relative -top-[1px]'></ChevronLeftIcon>
                                Previous
                            </Button>
                            <Button onClick={() => { handleNextPage() }} className='w-24' variant='outline-default' size='sm'>
                                Next
                                <ChevronRightIcon className='w-4 h-4 ml-0.5 inline-block relative -top-[1px]'></ChevronRightIcon>
                            </Button>
                            <div className='align-middle'>
                                <span className='text-sm'>{query.offset + 1} - {query.offset + query.limit > total ? total : query.offset + query.limit} </span>
                                <span className='text-sm'>of {total}</span>
                            </div>
                        </div>
                    </div>)

            }
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
