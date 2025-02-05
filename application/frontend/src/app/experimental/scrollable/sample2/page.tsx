'use client';
import ContentFooter from '@/components/ContentFooter';
import Button from '@/components/forms/Button';
import TextLink from '@/components/forms/TextLink';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/16/solid';
import clsx from 'clsx';
import React, { useState } from 'react';

const ScrpllableSample2Page = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleExtent = () => {
        console.log('extent');
        setIsExpanded(!isExpanded);
    }

    return (
        <div className='overflow-hidden flex flex-col' style={{ height: 'calc(100vh - 6.5rem)' }}>
            <div  onClick={handleExtent}>
                <div className='flex justify-between items-center py-2'>
                    <div>検索条件</div>
                    <div className='cursor-pointer' onClick={()=>handleExtent}>{isExpanded ?( <ChevronUpIcon className='w-4 h-4' />) : (<ChevronDownIcon className='w-4 h-4' />)}</div>
                </div>
                <div className={clsx('transition-height duration-300 ease-in-out', isExpanded ? 'h-12' : 'h-0')}>

                </div>
            </div>
            <div className='scrollable border border-gray-400'>
                <div className="bg-gray-100" style={{ height: '800px' }}>
                       b
                </div>
                <div>

                </div>
            </div>
            <div className='my-2'><Button className='pt-0.5 px-1 w-24 text-sm'>find</Button></div>
            <div className='mt-4 flex gap-4 items-center'>
                <Button className='w-32'>保存</Button>
                <TextLink href='/experimental/scrollable' className='text-blue-500' variant='primary'>戻る</TextLink>

            </div>
        </div>
    );
};

export default ScrpllableSample2Page;