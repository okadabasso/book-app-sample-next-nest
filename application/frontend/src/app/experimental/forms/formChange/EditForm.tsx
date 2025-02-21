'use client'
import TextBox from "@/components/forms/TextBox";
import { useForm } from "react-hook-form";

interface FormData {
    title: string;
}
interface EditFormProps {
    book: FormData;
    onSave: (book: FormData) => void;
    onCancel: () => void;
    onChange?: (book: FormData) => void;
}


const EditForm = ({book}: EditFormProps) => {
    const {
        register,
        handleSubmit: hookHandleSubmit,
        formState: { errors, isSubmitting, isDirty },
        reset,
        setValue,
    } = useForm<FormData>({
        defaultValues: book
    });

    const handleSubmit = async (data: FormData) => {
    };
    const handleChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValue(name as keyof FormData, value, { shouldDirty: true });
    };

    return (
            <form onSubmit={hookHandleSubmit(handleSubmit)}>
            {isDirty && <p>Form is dirty</p>}
                <div>
                    <label>Title</label>
                    <TextBox type="text" className="border" 
                        {...register(
                            'title', 
                            { 
                                required: 'Title is required',
                                maxLength: { value: 100, message: 'Title is too long' },
                                onChange: handleChanged
                            })} />
                    {errors.title && <p>{errors.title.message}</p>}
                </div>
                <button type="submit" disabled={isSubmitting}>Submit</button>
            </form>
    );
};

export default EditForm;