import React from 'react';
import { checkboxVariants, inputVariants, radioVariants, textVariants } from './variants';
import clsx from 'clsx';

interface CheckboxProps {
    name?: string;
    value?: string;
    text?: string;
    variant?: keyof typeof checkboxVariants;
    className?: string;
    disabled?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = ({name, value, text, variant = 'default', className, disabled, onChange, ...props }: CheckboxProps) => {
    return (
        <label className="flex items-center">

            <input
                type="checkbox"
                name='name'
                className={clsx("mr-1", checkboxVariants[variant], className)}
                disabled={disabled}
                onChange={onChange}
                {...props}
            />
            <span className={ clsx('inline-block text-nowrap', disabled && textVariants['disabled'])}>{text}</span>
        </label>
    );
};

export default Checkbox;