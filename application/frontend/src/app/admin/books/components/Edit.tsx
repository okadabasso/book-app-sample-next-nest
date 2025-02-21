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
import { plainToInstance } from 'class-transformer';
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import GoogleBooksSearch from './GoogleBooksSearch';

interface EditFormProps {
    book: FormData;
    onSave?: (book: FormData) => void;
    onCancel?: () => void;
    onChange?: (book: FormData) => void;
}

interface FormData {
    id: number;
    title: string;
}

const Edit = ({ book, onSave, onCancel, onChange }: EditFormProps) => {
    const {
        register,
        handleSubmit: hookHandleSubmit,
        formState: { errors, isSubmitting, isDirty},
        setValue,
    } = useForm<FormData>({
        defaultValues: book
    });
    const [message, setMessage] = useState<string[]>([]);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setValue(name as keyof FormData, value, { shouldDirty: true });
        if(onChange) onChange({ ...book, [name]: value });
    };


    const labelWidth = "w-32";
    return (
        <form>
            {message.length > 0 && (
                <div className='text-red-700 py-2 mb-4'>
                    {message.map((message, index) => (
                        <div key={index}>{message}</div>
                    ))}
                </div>
            )}
            {isDirty && <p>Form is dirty</p>}
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

export default Edit;