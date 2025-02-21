'use client'
import TextBox from "@/components/forms/TextBox";
import { useForm } from "react-hook-form";
import EditForm from "./EditForm";
import { useEffect, useState } from "react";

interface FormData {
    title: string;
}

/**
 * form の変更状態を確認する
 * @returns FormChangePage
 */
const FormChangePage = () => {
    
    const [book, setBook] = useState<FormData>({title: ''});
    const onSave = (book: FormData) => {
        console.log(book);
    }
    const onCancel = () => {
        console.log('Cancel');
    }
    useEffect(() => {
        setBook({title: 'Initial Title'});
    }, []);
    return (
        <div>
            <EditForm book={book} onSave={onSave} onCancel={onCancel}  />
        </div>
    );
};

export default FormChangePage;