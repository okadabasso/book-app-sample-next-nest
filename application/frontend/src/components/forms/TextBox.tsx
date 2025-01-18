'use client'
import clsx from 'clsx';
import { inputVariants } from './variants';
import { use, useEffect, useState } from 'react';

interface TextBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: keyof typeof inputVariants;
  className?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const TextBox = ({
  variant = 'default',
  className,
  iconLeft,
  iconRight,
  ...props
}: TextBoxProps) => {
  const [paddingLeft, setPaddingLeft] = useState('pl-1');
  const [paddingRight, setPaddingRight] = useState('pr-1');

  useEffect(() => {
    if(iconRight) {
      setPaddingRight('pr-6');
    }
    if(iconLeft) {
      setPaddingLeft('pl-6');
    }
  });
  return (
    <div className='relative inline-block flex flex-row items-center'>
      <span className='absolute left-1 text-gray-500'>{iconLeft}</span>
      <input
        className={clsx(
          'border rounded-sm px-1 py-0.5 focus:outline-none focus:ring-2',
          paddingRight,
          paddingLeft,
          inputVariants[variant],
          className
        )}
        {...props}
      />
      <span className='absolute right-1 text-gray-500'>{iconRight}</span>
      </div>
  );
};

export default TextBox;