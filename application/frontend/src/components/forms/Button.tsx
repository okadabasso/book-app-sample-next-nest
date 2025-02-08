import clsx from 'clsx';
import { buttonVariants } from './variants';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: keyof typeof buttonVariants;
    className?: string; // 追加
  }

const Button = ({
  variant = 'default',
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        'border rounded-sm px-2 py-1 focus:outline-none focus:ring-2',
        buttonVariants[variant],
        className // 渡されたクラスを追加
      )}
      {...props}
    >
        {props.children}
    </button>
  );
};

export default Button;