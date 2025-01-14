import clsx from 'clsx';
import { inputVariants, textAreaVariants } from './variants';
import { ReactNode } from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: keyof typeof textAreaVariants;
  value?: string;
  className?: string; // 追加
}

const MultiLineText = ({
  variant = 'default',
  value,
  className,
  ...props
}: TextAreaProps) => {
  return (
    <textarea
        value={value}
      className={clsx(
        'border rounded-sm p-1 focus:outline-none focus:ring-2',
        inputVariants[variant],
        className // 渡されたクラスを追加
      )}
      {...props}
    />
  );
};

export default MultiLineText;