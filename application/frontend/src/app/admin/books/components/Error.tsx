'use client'
import TextLink from '@/components/forms/TextLink';
import React from 'react';



const ErrorContent = ({title, message
}: { title: string, message: string }
) => {
    return (
        <div>
            <h2 className='font-bold'>{title}</h2>
            <p className='text-red-500'>{message}</p>
            <TextLink href='/admin/books'>Return to Books List
            </TextLink>
        </div>
    );
};

export default ErrorContent;