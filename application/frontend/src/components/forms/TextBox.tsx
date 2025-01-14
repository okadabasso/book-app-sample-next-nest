import clsx from 'clsx';
import { inputVariants } from './variants';

interface TextBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: keyof typeof inputVariants;
  className?: string; // 追加
}

const TextBox = ({
  variant = 'default',
  className,
  ...props
}: TextBoxProps) => {
  return (
    <input
      className={clsx(
        'border rounded-sm px-1 py-0.5 focus:outline-none focus:ring-2',
        inputVariants[variant],
        className // 渡されたクラスを追加
      )}
      {...props}
    />
  );
};

export default TextBox;