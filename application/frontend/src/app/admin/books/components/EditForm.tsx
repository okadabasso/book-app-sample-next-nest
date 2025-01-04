"use client";

import React, { useState, useEffect } from 'react';
import { Book } from '@/types/Book';

interface EditFormProps {
    book?: Book | null;
    onSave: (book: Book) => void;
    onCancel: () => void;
}

const EditForm = ({ book, onSave, onCancel }: EditFormProps) => {
    const [formData, setFormData] = useState<Book>({ ...book  ?? {} as Book});

    useEffect(() => {
        if (!book) {
            return;
        }
        setFormData({ ...book });
    }, [book]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData: Book) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    const handleCancel = (e: React.FormEvent) => {
        e.preventDefault();
        onCancel();
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className='mb-4'>
                <div className=''><label htmlFor="title">Title</label></div>
                <div>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className='border border-gray-300 rounded-sm p-1 w-full'
                    />
                </div>

            </div>
            <div className='mb-4'>
                <div>
                    <label htmlFor="author">Author</label>
                </div>
                <div>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        className='border border-gray-300 rounded-sm p-1 w-full'
                    />

                </div>
            </div>
            <div className='mb-4'>
                <div>
                    <label htmlFor="publishedYear">Published Year</label>
                </div>
                <div>
                    <input
                        type="text"
                        id="publishedYear"
                        name="publishedYear"
                        value={formData.publishedYear}
                        onChange={handleChange}
                        className='border border-gray-300 rounded-sm p-1 w-full'
                    />

                </div>
            </div>
            <div className='mb-4'>
                <div>
                    <label htmlFor="genre">Genre</label>
                </div>
                <div>
                    <input
                        type="text"
                        id="genre"
                        name="genre"
                        value={formData.genre}
                        onChange={handleChange}
                        className='border border-gray-300 rounded-sm p-1 w-full'
                    />

                </div>
            </div>
            <div>
                <div>
                    <label htmlFor="description">Description</label>
                </div>
                <div>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className='border border-gray-300 rounded-sm p-1 w-full'
                    />
                </div>

            </div>
            <div className='sticky bottom-0 bg-white pt-4 pb-12'>
                <button type="submit" className='rounded-sm bg-blue-600 text-white hover:bg-blue-700 w-24 p-1 mr-4'>Save</button>
                <button type="button" className='rounded-sm bg-gray-600 text-white hover:bg-gray-700 w-24 p-1 mr-4' onClick={handleCancel}>Cancel</button>
            </div>
        </form>
    );
};

export default EditForm;