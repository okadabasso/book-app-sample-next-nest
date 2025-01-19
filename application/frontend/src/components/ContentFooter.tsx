import clsx from 'clsx';
import React, { ReactNode } from 'react';

type ContentFooterProps = {
    children: ReactNode;
    className?: string;
};
const ContentFooter = ({ children, className }: ContentFooterProps) => {
    return (
        <div  className={ clsx('sticky bottom-0 relative mt-4', className) }>
            <div className='h-3 bg-gradient-to-b from-white/0 to-white/100  w-full'></div>
            <div className='h-3 bg-white'></div>
            <div className=' flex gap-2 bg-white pb-12'>
                {children}
            </div>
        </div>
    );
};

export default ContentFooter;