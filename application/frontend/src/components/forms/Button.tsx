import clsx from 'clsx';
import { buttonVariants } from './variants';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: keyof typeof buttonVariants | 'default'; // 追加
    size?: 'sm' | 'md' | 'lg'; // 追加
    className?: string; // 追加
  }

const Button = ({
  variant = 'default',
  size = 'md',
  className,
  ...props
}: ButtonProps) => {
  const sizes = {
    sm: 'text-sm px-1 py-0.5',
    md: 'text-base px-2 py-1 leading-6',
    lg: 'text-lg px-4 py-1 leading-8',
  };

  return (
    <button
      className={clsx(
        'border rounded-sm focus:outline-none focus:ring-2',
        buttonVariants[variant], // 追加
        className, // 渡されたクラスを追加
        sizes[size || 'md'], // 追加
      )}
      {...props}
    >
        {props.children}
    </button>
  );
};

export default Button;