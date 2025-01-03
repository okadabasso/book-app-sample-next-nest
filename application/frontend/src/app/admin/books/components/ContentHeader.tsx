"use client"
import React from 'react';

interface ContentHeaderProps {
    title: string;
}

const ContentHeader = ({ title }: ContentHeaderProps) => {
    return (
        <h2 className='text-lg font-bold mb-4'>{title}</h2>
    );
};

export default ContentHeader;