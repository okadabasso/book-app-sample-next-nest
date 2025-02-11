import clsx from 'clsx';
import React, { ReactNode } from 'react';

type ContentFooterProps = {
    children: ReactNode;
    className?: string;
};
const ContentFooter = ({ children, className }: ContentFooterProps) => {
    return (
        <div className={clsx('sticky bottom-0 relative', className)}>
            <div className='h-4 bg-gradient-to-b from-white/0 to-white/100  w-full -mx-4 px-4'></div>
            <div className='h-4 bg-white -mx-4 px-4'></div>
            <div className=' flex gap-2 bg-white -mb-4 pb-4 -mx-4 px-4'>
                {children}
            </div>
        </div>
    );
};

export default ContentFooter;