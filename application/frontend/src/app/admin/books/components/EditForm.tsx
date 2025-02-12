"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Book } from '@/types/Book';
import MultiSelectCombobox, { MultiSelectComboboxRef } from '@/components/forms/MultiSelectCombobox ';
import ContentFooter from '@/components/ContentFooter';
import { useSubmitHandler } from '@/hooks/useSubmitHandler';
import { CheckIcon } from '@heroicons/react/16/solid';
import TextBox from '@/components/forms/TextBox';
import Button from '@/components/forms/Button';
import MultiLineText from '@/components/forms/MultiLineText';
import clsx from 'clsx';
import { inputVariants } from '@/components/forms/variants';
import { api } from '@/shared/apiClient';
import RequiredMark from '@/components/RequiredMark';

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
    id: number;
    title: string;
    author: string;
    publishedDate?: string;
    isbn?: string;
    publisher?: string;
    thumbnail?: string;
    description: string;
    genres: Option[];
}

const EditForm = ({ book, onSave, onCancel }: EditFormProps) => {
    const {
        register,
        handleSubmit: hookHandleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>({
        defaultValues: {
            id: book?.id || 0,
            title: book?.title || '',
            author: book?.author || '',
            publishedDate: book?.publishedDate || '',
            isbn: book?.isbn || '',
            publisher: book?.publisher || '',
            thumbnail: book?.thumbnail || '',
            description: book?.description || '',
            genres: book?.genres || [],
        }
    });
    const [formData, setFormData] = useState<Book>({ ...book ?? {} as Book });
    const [message, setMessage] = useState<string[]>([]);

    useEffect(() => {
        if (book) {
            reset({
                title: book.title || '',
                author: book.author || '',
                publishedDate: book.publishedDate || '',
                isbn: book.isbn || '',
                publisher: book.publisher || '',
                thumbnail: book.thumbnail || '',
                description: book.description || '',
                genres: book.genres || [],
            });
        }
    }, [book, reset]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData: Book) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const { handleSubmit, isSubmitting } = useSubmitHandler<FormData>(async (data) => {
        console.log("送信データ:", data);

        try {
            const selectedItems = multiSelectRef.current?.getSelectedItems();
            const updatedBook: Book = {
                ...book,
                ...data,
                genres: selectedItems?.map((item) => ({ id: item.id, name: item.name, isNew: item.isNew })) ?? [],
            };
            onSave(updatedBook);
            console.log("送信が成功しました");
        } catch (error) {
            console.error("送信中にエラーが発生しました:", error);
            setMessage(["送信中にエラーが発生しました: " + (error as Error).message]);
            return;
        }
    });
    const handleCancel = (e: React.FormEvent) => {
        e.preventDefault();
        onCancel();
    }
    // multi select
    const multiSelectRef = useRef<MultiSelectComboboxRef>(null); // MultiSelectCombobox の ref
    const fetchOptions = async (query: string): Promise<Option[]> => {
        const loadGenres = async (query: string) => {
            const genres = await api.get('/api/admin/genres', {params : {query: query}, local: true});
            return genres.json();
        };
        return loadGenres(query);

    };
    const labelWidth = "w-32";
    return (
        <form onSubmit={hookHandleSubmit(handleSubmit)}>
            {message.length > 0 && (
                <div className='text-red-700 py-2 mb-4'>
                    {message.map((message, index) => (
                        <div key={index}>{message}</div>
                    ))}
                </div>
            )}
            <div className='mb-4 flex gap-2 items-baseline'>
                <div className={clsx(labelWidth)}><label htmlFor="title">Title<RequiredMark /></label></div>
                <div className='flex-1'>
                    <TextBox
                        type="text"
                        id="title"
                        value={formData.title}
                        maxLength={100}
                        className={clsx(errors.title && inputVariants.danger)} 
                        width='w-full'
                        title={errors.title?.message as string}
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
            <div className='mb-4 flex gap-2 items-baseline'>
                <div className={clsx(labelWidth)}>
                    <label htmlFor="author">Author<RequiredMark /></label>
                </div>
                <div className='flex-1'>
                    <TextBox
                        type="text"
                        id="author"
                        value={formData.author}
                        maxLength={64}
                        className={clsx(errors.author && inputVariants.danger)}
                        width='w-full'
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
            <div className='mb-4 flex gap-2 items-baseline'>
                <div className={clsx(labelWidth)}>
                    <label htmlFor="publisher">Publisher</label>
                </div>
                <div className='flex-1'>
                    <TextBox
                        type="text"
                        id="publisher"
                        value={formData.publisher}
                        maxLength={255}
                        className={clsx(errors.publisher && inputVariants.danger)}
                        width='w-full'
                        {...register("publisher", {
                            maxLength: { value: 255, message: "publisher is too long" },
                            onChange: (e) => {
                                handleChange(e);
                            }
                        })}
                    />
                    {errors.publishedDate && <p className='text-red-600'>{errors.publishedDate.message}</p>}

                </div>
            </div>
            <div className='mb-4 flex gap-2 items-baseline'>
                <div className={clsx(labelWidth)}>
                    <label htmlFor="publishedDate">Published Date</label>
                </div>
                <div className='flex-1'>
                    <TextBox
                        type="text"
                        id="publishedDate"
                        value={formData.publishedDate}
                        maxLength={10}
                        className={clsx(errors.publishedDate && inputVariants.danger)}
                        width='w-32'
                        {...register("publishedDate", {
                            maxLength: { value: 10, message: "publishedDate is too long" },
                            pattern: { value: /^[0-9\-]*$/, message: "publishedDate is invalid" },
                            onChange: (e) => {
                                handleChange(e);
                            }
                        })}
                    />
                    {errors.publishedDate && <p className='text-red-600'>{errors.publishedDate.message}</p>}

                </div>
            </div>
            <div className='mb-4 flex gap-2 items-baseline'>
                <div className={clsx(labelWidth)}>
                    <label htmlFor="isbn">ISBN</label>
                </div>
                <div className='flex-1'>
                    <TextBox
                        type="text"
                        id="isbn"
                        value={formData.isbn}
                        maxLength={17}
                        className={clsx(errors.isbn && inputVariants.danger)}
                        width='w-full'
                        {...register("isbn", {
                            maxLength: { value: 17, message: "isbn is too long" },
                            pattern: { value: /^[0-9\-]*$/, message: "isbn is invalid" },
                            onChange: (e) => {
                                handleChange(e);
                            }
                        })}
                    />
                    {errors.publishedDate && <p className='text-red-600'>{errors.publishedDate.message}</p>}

                </div>
            </div>
            <div className='mb-4 flex gap-2 items-baseline'>
                <div className={clsx(labelWidth)}>
                    <label htmlFor="thumbnail">Thumbnail</label>
                </div>
                <div className='flex-1'>
                    <TextBox
                        type="text"
                        id="thumbnail"
                        value={formData.thumbnail}
                        maxLength={255}
                        className={clsx(errors.thumbnail && inputVariants.danger)}
                        width='w-full'
                        {...register("thumbnail", {
                            maxLength: { value: 255, message: "thumbnail is too long" },
                            onChange: (e) => {
                                handleChange(e);
                            }
                        })}
                    />
                    {errors.thumbnail && <p className='text-red-600'>{errors.thumbnail.message}</p>}

                </div>
            </div>
            <div className='mb-4 flex gap-2 items-top'>
                <div className={clsx(labelWidth)}>
                    <label htmlFor="description">Description</label>
                </div>
                <div className='flex-1'>
                    <MultiLineText
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
                        variant='default'
                    />
                    {errors.description && <p className='text-red-600'>{errors.description.message}</p>}
                </div>
            </div>
            <div className='mb-4 flex gap-2 items-baseline'>
                    <div className={clsx(labelWidth)}>
                        <label htmlFor='genre'>Genre</label>
                    </div>
                    <div id="genre"  className='flex-1'>
                        <MultiSelectCombobox
                            fetchOptions={fetchOptions}
                            initialSelectedItems={formData.genres}
                            ref={multiSelectRef}
                        />

                    </div>
            </div>
            <ContentFooter>
                <div className='flex gap-2'>
                <Button type="submit" className='w-32' variant='primary'>
                    <CheckIcon className='h-4 w-4 inline-block relative -top-0.5 mr-1' />
                        {isSubmitting ? 'Saving...' : 'Save'}
                    </Button>
                    <Button type="button" className='w-32' onClick={handleCancel} variant='default'>Cancel</Button>
                </div>

            </ContentFooter>
            {/* ポップオーバーの表示 */}
            {isSubmitting && (
                <div className="absolute top-0 right-0 fixed bg-black/1 z-50 flex items-center justify-center w-full h-full">
                    <div className="bg-white px-8 py-4 rounded shadow">
                        <p className='pb-0'>処理中です...</p>
                        <div className="spinner-border animate-spin"></div>
                    </div>
                </div>
            )}
        </form>
    );
};

export default EditForm;