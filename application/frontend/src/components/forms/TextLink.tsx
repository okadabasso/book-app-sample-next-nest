import clsx from 'clsx';
import { linkButtonVariants, linkVariants } from './variants';
import Link from 'next/link';

interface CustomLinkProps {
  href: string;
  variant?: keyof typeof linkVariants;
  className?: string; // 追加のクラス
  children: React.ReactNode;
}

const TextLink = ({
  href,
  variant = 'default', // デフォルトの variant
  className,
  children,
  ...props
}: CustomLinkProps) => {
  return (
    <Link href={href} {...props} className={clsx("underline focus:outline-none text-center", linkVariants[variant], className)}>
      {children}
    </Link>
  );
};

export default TextLink;
