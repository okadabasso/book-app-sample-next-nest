import clsx from 'clsx';
import { textVariants } from './variants';

interface TextContentProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: keyof typeof textVariants;
  className?: string; // 追加
}

const TextContent = ({
  variant = 'default',
  className,
  ...props
}: TextContentProps) => {
  return (
    <span
      className={clsx(
        textVariants[variant],
        className // 渡されたクラスを追加
      )}
      {...props}
    >{props.children}
    </span>
  );
};

export default TextContent;