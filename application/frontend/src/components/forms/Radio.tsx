'use client'
import React from 'react';
import { radioVariants, textVariants } from './variants';
import clsx from 'clsx';

interface RadioProps {
    name: string;
    value?: string;
    text?: string;
    variant?: keyof typeof radioVariants;
    className?: string;
    disabled?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const Radio = ({name, value, text, variant = 'default', className, disabled, ...props }: RadioProps) => {
    return (
            <label className="flex items-center">
            <input
                type="radio"
                name={name}
                value={value}
                disabled={disabled}
                onChange={props?.onChange}
                className={clsx(
                    "w-3 h-3 focus:outline-none focus:ring-2 appearance-none rounded-full border-2  ring-1 mr-1",
                    radioVariants[variant], 
                    className)}
                {...props}
            />
            <span className={ clsx('inline-block text-nowrap', disabled && textVariants['disabled'])}>{text}</span>
        </label>
    );
};

export default Radio;