import clsx from 'clsx';
import { linkButtonVariants } from './variants';
import Link from 'next/link';

interface CustomLinkProps {
  href: string;
  variant?: keyof typeof linkButtonVariants;
  className?: string; // 追加のクラス
  children: React.ReactNode;
}

const ButtonLink = ({
  href,
  variant = 'primary', // デフォルトの variant
  className,
  children,
  ...props
}: CustomLinkProps) => {
  return (
    <Link href={href} {...props} className={clsx("border rounded-sm p-1 focus:outline-none focus:ring-2 text-center", linkButtonVariants[variant], className)}>
      {children}
    </Link>
  );
};

export default ButtonLink;
