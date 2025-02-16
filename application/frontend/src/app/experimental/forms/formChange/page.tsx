'use client'
import TextBox from "@/components/forms/TextBox";
import { useForm } from "react-hook-form";

interface FormData {
    title: string;
}


const FormChangePage = () => {
    const {
        register,
        handleSubmit: hookHandleSubmit,
        formState: { errors, isSubmitting, isDirty },
        reset,
        setValue,
    } = useForm<FormData>({
        defaultValues: {
            title: '',
        }
    });

    const handleSubmit = async (data: FormData) => {
        console.log(data);
    };
    const handleChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue('title', e.target.value);
    };

    return (
        <div>
            {isDirty && <p>Form is dirty</p>}
            <form onSubmit={hookHandleSubmit(handleSubmit)}>
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
            <h1>Form Change</h1>
        </div>
    );
};

export default FormChangePage;