"use client"
import React, { ReactNode } from 'react';

interface ContentHeaderProps {
    title: string;
    children?: ReactNode;
}
const ContentHeader = ({ title, children }: ContentHeaderProps) => {
    return (
        <div className='flex gap-2  items-baseline'>
            <h2 className='text-lg font-bold mb-4 flex-1'>{title}</h2>
            {children}
        </div>
    );
};

export default ContentHeader;