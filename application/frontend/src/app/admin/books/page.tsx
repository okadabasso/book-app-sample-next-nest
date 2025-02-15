"use client"
import { Book, BookFind } from '@/types/Book';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ContentHeader from '@/components/ContentHeader';
import { plainToInstance } from 'class-transformer';
import ContentFooter from '@/components/ContentFooter';
import { ChevronLeftIcon, ChevronRightIcon, MagnifyingGlassIcon, PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/16/solid';
import ButtonLink from '@/components/forms/ButtonLink';
import { useSearchParams } from 'next/navigation';
import TextBox from '@/components/forms/TextBox';
import Button from '@/components/forms/Button';
import { set } from 'react-hook-form';
import { api } from '@/shared/apiClient';
import { createCsrfToken, getCsrfHeader } from '@/shared/csrfToken';
import { resetScroll } from '@/shared/resetScroll';

const BooksPage = () => {
    const searchParams = useSearchParams();

    const queryParam = searchParams.get('query') || '';
    const limitParam = searchParams.get('limit') || process.env.NEXT_PUBLIC_DEFAULT_LIMIT || '20';
    const offsetParam = searchParams.get('offset') || '0';

    const [data, setBooks] = useState<Book[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [query, setQuery] = useState<string>(queryParam);
    const [limit, setLimit] = useState<number>(Number(limitParam));
    const [offset, setOffset] = useState<number>(Number(offsetParam));
    const [total, setTotal] = useState<number>(0);
    const fetchBooks = async (query: string, limit: number, offset: number) => {
        try {
            const response = await api.get('/api/admin/books', { params: { query: query, offset: offset, limit: limit }, local: true });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data: BookFind = await response.json();
            const books = plainToInstance(Book, data.books);
            setBooks(books);
            setTotal(data.total);
            resetScroll();
        } catch (e: unknown) {
            if (e instanceof Error) {
                setError(e.message);
            } else {
                setError(String(e));
            }
        }
    };

    useEffect(() => {
        fetchBooks(query, limit, offset);
    }
        , []);

    const handleSearch = () => {
        fetchBooks(query, limit, offset);
    }
    const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
        setOffset(0);
        setLimit(20);
    }
    const handleNextPage = async () => {
        const next = offset + limit < total ? offset + limit : offset;
        setOffset(next);
        await fetchBooks(query, limit, next);
    }
    const handlePreviousPage = async () => {
        const previous = offset - limit < 0 ? 0 : offset - limit;
        setOffset(previous);
        await fetchBooks(query, limit, previous);
    }
    const handleEditBook  = (id: number) =>{
        console.log('edit book');
        
        location.href = `/admin/books/${id}/edit`;
    }
    const handleDeleteBook  = async (id: number) =>{
        console.log('edit book');
        const csrfToken = await createCsrfToken(); // CSRF トークンを取得する関数を実装してください

        await api.delete(`/api/admin/books/${id}`, {
            headers: getCsrfHeader(csrfToken),
            local: true
        });
        await fetchBooks(query, limit, offset);
    }

    return (
        <div>
            <ContentHeader title='Book List' />
            {error && <p className='text-red-500'>{error}</p>}
            <div className='flex mb-4'>
                <div>
                    <label className='mr-2 inline' htmlFor="query">Title:</label>
                    <TextBox type='text' id="query" placeholder='Search Title' onChange={(event) => handleQueryChange(event)} />
                </div>
                <div>
                    <Button onClick={() => { handleSearch() }} size='sm' className='w-24 h-7'>
                        <MagnifyingGlassIcon className='h-4 w-4 inline-block relative -top-0.5' />
                        Search
                    </Button>
                </div>
            </div>
            {total === 0
                ? <div>Data not found</div>
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
                                                <Button size="sm" onClick={() => { handleEditBook(book.id) }}>
                                                    <PencilIcon className='w-4 h-4'></PencilIcon>
                                                </Button>
                                                <Button size="sm" onClick={() => { handleDeleteBook(book.id) }}>
                                                    <TrashIcon className='w-4 h-4'></TrashIcon>
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
                                <span className='text-sm'>{offset + 1} - {offset + limit > total ? total : offset + limit} </span>
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
