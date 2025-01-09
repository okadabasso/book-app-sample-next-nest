"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Book } from '@/types/Book';
import MultiSelectCombobox from '@/components/MultiSelectCombobox ';

interface EditFormProps {
    book?: Book | null;
    onSave: (book: Book) => void;
    onCancel: () => void;
}
interface Option {
    id: number;
    name: string;
}

interface FormData {
    title: string;
    author: string;
    publishedYear: string;
    description: string;
    genres: Option[];
}

const EditForm = ({ book, onSave, onCancel }: EditFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<FormData>();
    
    const [formData, setFormData] = useState<Book>({ ...book ?? {} as Book });

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

    const onSubmit = (data: FormData) => {
        const selectedItems = multiSelectRef.current?.getSelectedItems();
        console.log('選択されたアイテム:', selectedItems);
        formData.genres = selectedItems;
        onSave(formData);
    };

    const handleCancel = (e: React.FormEvent) => {
        e.preventDefault();
        onCancel();
    }
    // multi select
    const multiSelectRef = useRef<any>(null); // MultiSelectCombobox の ref
    const fetchOptions = async (query: string): Promise<Option[]> => {
        const loadGenres = async (query: string) => {
            const genres = await fetch(`/admin/api/genres?query=${query}`);
            return genres.json();
        };
        return loadGenres(query);

    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-4'>
                <div className='mb-1'><label htmlFor="title">Title<span className="relative -top-px  bg-red-600 text-white ml-2 -mt-6  p-0.5 text-xs">必須</span></label></div>
                <div>
                    <input
                        type="text"
                        id="title"
                        value={formData.title}
                        maxLength={100}
                        className='border border-gray-300 rounded-sm p-1 w-full'
                        {...register("title", { 
                            required: "Title is required",
                            maxLength: { value: 100, message: "Title is too long" },
                            onChange: (e) => {
                                handleChange(e);
                            }
                        })}
                    />
                    {errors.title && <p className='text-red-600'>{errors.title.message}</p>}
                </div>

            </div>
            <div className='mb-4'>
                <div>
                    <label htmlFor="author">Author<span className="relative -top-px  bg-red-600 text-white ml-2 -mt-6  p-0.5 text-xs">必須</span></label>
                </div>
                <div>
                    <input
                        type="text"
                        id="author"
                        value={formData.author}
                        maxLength={64}
                        className='border border-gray-300 rounded-sm p-1 w-full'
                        {...register("author", { 
                            required: "Author is required",
                            maxLength: { value: 64, message: "Author is too long" },
                            onChange: (e) => {
                                handleChange(e);
                            }
                        })}
                    />
                    {errors.author && <p className='text-red-600'>{errors.author.message}</p>}
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
                        value={formData.publishedYear}
                        maxLength={4}
                        className='border border-gray-300 rounded-sm p-1 w-full'
                        {...register("publishedYear", { 
                            maxLength: { value: 4, message: "publishedYear is too long" },
                            pattern: { value: /^[0-9]*$/, message: "publishedYear is invalid" },
                            onChange: (e) => {
                                handleChange(e);
                            }
                        })}
                    />
                    {errors.publishedYear && <p className='text-red-600'>{errors.publishedYear.message}</p>}

                </div>
            </div>
            <div className='mb-4'>
                <div>
                    <label htmlFor="description">Description</label>
                </div>
                <div>
                    <textarea
                        id="description"
                        value={formData.description}
                        maxLength={1024}
                        className='border border-gray-300 rounded-sm p-1 w-full h-32'
                        {...register("description", { 
                            maxLength: { value: 1024, message: "description is too long" },
                            onChange: (e) => {
                                handleChange(e);
                            }
                        })}
                    />
                    {errors.description && <p className='text-red-600'>{errors.description.message}</p>}
                    </div>
            </div>
            <div className='mb-4'>
                <div >
                    <div>
                        <label htmlFor='genre'>Genre</label>
                    </div>
                    <div id="genre">
                        <MultiSelectCombobox
                            fetchOptions={fetchOptions}
                            initialSelectedItems={formData.genres}
                            ref={multiSelectRef}
                        />

                    </div>
                </div>
            </div>
            <div className='sticky bottom-0 bg-white pt-4 pb-12'>
                <button type="submit" className='rounded-sm bg-blue-600 text-white hover:bg-blue-700 w-24 p-1 mr-4'>Save</button>
                <button type="button" className='rounded-sm bg-gray-200 text-gray-800 hover:bg-gray-300 w-24 p-1 mr-4' onClick={handleCancel}>Cancel</button>
            </div>
        </form>
    );
};

export default EditForm;