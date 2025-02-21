"use client";

import ContentFooter from '@/components/ContentFooter';
import Button from '@/components/forms/Button';
import MultiLineText from '@/components/forms/MultiLineText';
import MultiSelectCombobox, { MultiSelectComboboxRef } from '@/components/forms/MultiSelectCombobox ';
import TextBox from '@/components/forms/TextBox';
import { inputVariants } from '@/components/forms/variants';
import RequiredMark from '@/components/RequiredMark';
import { api } from '@/shared/apiClient';
import { BookData } from '@/types/Book';
import { BookOpenIcon, CheckIcon, DocumentIcon } from '@heroicons/react/16/solid';
import clsx from 'clsx';
import React, { useRef, useState } from 'react';
import { set, useForm } from 'react-hook-form';
import GoogleBooksSearch from './GoogleBooksSearch';
import { useFormGuard } from '@/hooks/useFormGuard ';

interface EditFormProps {
    book: BookData;
    onSave: (book: BookData) => void;
    onCancel: () => void;
    onChange?: (book: BookData) => void;
}
interface Option {
    id: number;
    name: string;
}


const EditForm = ({ book, onSave, onCancel, onChange }: EditFormProps) => {
    const initialData: BookData = { ...book };
    const {
        register,
        handleSubmit: hookHandleSubmit,
        formState: { errors, isSubmitting, isDirty},
        reset,
        setValue,
    } = useForm<BookData>({
        defaultValues: initialData
    });
    useFormGuard(isDirty);
    const [message, setMessage] = useState<string[]>([]);
    const multiSelectRef = useRef<MultiSelectComboboxRef>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setValue(name as keyof BookData, value, { shouldDirty: true });
        if(onChange) onChange({ ...book, [name]: value });
    };

    const handleFormSubmit = async (data: BookData) => {
        try {
            const selectedItems = multiSelectRef.current?.getSelectedItems();
            const updatedBook: BookData = {
                ...book,
                ...data,
                genres: selectedItems?.map((item) => ({ id: item.id, name: item.name, isNew: item.isNew })) ?? [],
            };
            reset(updatedBook);
            onSave(updatedBook);
        } catch (error) {
            setMessage(["送信中にエラーが発生しました: " + (error as Error).message]);
            return;
        }
    };

    const handleCancel = (e: React.FormEvent) => {
        e.preventDefault();
        if(isDirty){
            if(window.confirm('変更が保存されていません。変更を破棄してもよろしいですか？')){
                onCancel();
            }
        }
        else{
            onCancel();
        }
    };


    const fetchOptions = async (query: string): Promise<Option[]> => {
        const genres = await api.get('/api/admin/genres', { params: { query: query }, local: true });
        return genres.json();
    };
    const onSelectedItemsChange = (selectedItems: Option[]) => {
        setValue('genres', selectedItems, { shouldDirty: true });
    };
    const selectBook = (book: BookData) => {
        const updatedBook: BookData =  { ...book};
        Object.entries(updatedBook).forEach(([key, value]) => {
            setValue(key as keyof BookData, value);
        })
        setIsDialogOpen(false);
    }


    const labelWidth = "w-32";
    return (
        <form onSubmit={hookHandleSubmit(handleFormSubmit)}>
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
                        maxLength={100}
                        className={clsx(errors.title && inputVariants.danger)} 
                        width='w-full'
                        title={errors.title?.message as string}
                        {...register("title", {
                            required: "Title is required",
                            maxLength: { value: 100, message: "Title is too long" },
                            onChange: handleChange
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
                        maxLength={1024}
                        className='border border-gray-300 rounded-sm p-1 w-full h-32'
                        {...register("description", {
                            maxLength: { value: 16384, message: "description is too long" },
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
                            initialSelectedItems={book.genres && book.genres.map((genre) => ({ id: genre.id, name: genre.name, isNew: false }))}
                            onSelectedItemsChange={onSelectedItemsChange}
                            ref={multiSelectRef}
                        />

                    </div>
            </div>
            <ContentFooter>
                <div>
                    <div className='mb-6'>
                        <Button type="button" className='' size='sm' variant='outline-default'  onClick={()=>{setIsDialogOpen(true)}}>
                            <BookOpenIcon className='w-4 h-4 inline-block align-text-bottom mr-1'></BookOpenIcon>
                            Google Booksで検索
                        </Button>

                    </div>
                    <div className='flex gap-2'>
                        <Button type="submit" className='w-32' variant='primary'>
                            <CheckIcon className='h-4 w-4 inline-block relative -top-0.5 mr-1' />
                            {isSubmitting ? 'Saving...' : 'Save'}
                        </Button>
                        <Button type="button" className='w-32' onClick={handleCancel} variant='default'>Cancel</Button>
                    </div>
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
            <GoogleBooksSearch 
                searchTitle={book.title}
                searchAuthor={book.author}
                searchIsbn={book.isbn}
                isOpen={isDialogOpen} 
                onClose={() => {setIsDialogOpen(false)}} 
                onSelected={(book) => { selectBook(book); } } />

        </form>
    );
};

export default EditForm;