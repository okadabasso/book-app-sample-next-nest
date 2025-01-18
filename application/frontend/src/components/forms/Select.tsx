import React from 'react';
import { checkboxVariants, inputVariants, radioVariants, selectVariants } from './variants';
import clsx from 'clsx';

interface SelectProps {
    variant?: keyof typeof selectVariants;
    className?: string;
    options: { value: string, text: string }[];
}

const Select = ({ variant = 'default', className, ...props }: SelectProps) => {
    return (
        <>
            <select
                className={clsx(
                    'border rounded-sm px-1 py-0.5 focus:outline-none focus:ring-2',
                    selectVariants[variant], className)}
                {...props}
            >
                {props.options.map((option) => (
                    <option key={option.value} value={option.value}>{option.text}</option>
                ))}  
            </select>
        </>
    );
};

export default Select;