'use client';
import { Book } from '@/types/Book';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import fetchBook from '@/app/admin/books/functions/fetchBook';
import EditForm from '@/app/admin/books/components/EditForm';
import ContentHeader from '@/components/ContentHeader';
import { getCsrfHeader as createCsrfHeader, createCsrfToken } from '@/shared/csrfToken';
import FormToken from '@/types/FormToken';
import { api } from '@/shared/apiClient';
import ErrorContent from '../../components/Error';
import TextLink from '@/components/forms/TextLink';
import Edit from '../../components/Edit';
interface FormData {
    id: number;
    title: string;
}


const CheckPage = () => {
    const { id } = useParams();

    const [book, setBook] = useState<FormData>({
        id: 0,
        title: ''
    });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

    }, [id]);


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
            <Edit book={book} 
                />
        </div>
    );
};

export default CheckPage;