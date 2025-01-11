import React, { ReactNode } from 'react';

const ContentFooter = ({ children }: { children: ReactNode }) => {
    return (
        <div className='sticky bottom-0 bg-white pt-4 pb-12 flex gap-4'>
            {children}
        </div>
    );
};

export default ContentFooter;