import React, { useRef, useEffect } from 'react';

interface ScrollViewProps {
    children: React.ReactNode;
    className?: string;
}

const ScrollView = ({ children, className }: ScrollViewProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = 0;
        }
    }, [children]);

    return (
        <>
        <div className='scrollable-table-container' ref={scrollRef}>
                    {children}1
        </div>
        </>
    );
};

export default ScrollView;