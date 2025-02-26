'use client'
import clsx from 'clsx';
import { inputVariants } from './variants';
import { useEffect, useState } from 'react';

interface TextBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: keyof typeof inputVariants;
  className?: string;
  width?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const TextBox = ({
  variant = 'default',
  className,
  width,
  iconLeft,
  iconRight,
  ...props
}: TextBoxProps) => {
  const [paddingLeft, setPaddingLeft] = useState('pl-2');
  const [paddingRight, setPaddingRight] = useState('pr-2');

  useEffect(() => {
    if(iconRight) {
      setPaddingRight('pr-6');
    }
    if(iconLeft) {
      setPaddingLeft('pl-6');
    }
  }, [iconLeft, iconRight]);
  return (
    <div className={clsx('relative inline-block', width)}>
      {iconLeft && (<span className='absolute left-1 top-[7px] text-gray-500 '>{iconLeft}</span>) }
      <input
        className={clsx(
          'border rounded-sm px-2 py-0.5 focus:outline-none focus:ring-2',
          paddingRight,
          paddingLeft,
          inputVariants[variant],
          className,
          width
        )}
        {...props}
      />
      {iconRight && (<span className='absolute right-1 top-[7px] text-gray-500'>{iconRight}</span>) }
      </div>
  );
};

export default TextBox;