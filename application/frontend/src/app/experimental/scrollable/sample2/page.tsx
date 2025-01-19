'use client';
import ContentFooter from '@/components/ContentFooter';
import Button from '@/components/forms/Button';
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
        <div className='overflow-hidden flex flex-col' style={{ height: 'calc(100vh - 5.5rem)' }}>
            <div className='h-6'>head</div>
            <div id="#foo" className='flex-1 h-full flex flex-col'  style={{ height: 'calc(100vh - 7.5rem)'     }}>
                <div  onClick={handleExtent}>
                    <div className='flex justify-between items-center py-2'>
                        <div>検索条件</div>
                        <Button className='' variant='text-button'  onClick={()=> handleExtent()}>{isExpanded ?( <ChevronUpIcon className='w-4 h-4' />) : (<ChevronDownIcon className='w-4 h-4' />)}</Button>
                    </div>
                    <div className={clsx('transition-height duration-300 ease-in-out', isExpanded ? 'h-12' : 'h-0')}>

                    </div>
                </div>
                <div className='scrollable-container border border-gray-400'>
                    <div className='' style={{ height: '800px'}}>
                        b
                    </div>

                </div>
                <div className='mt-4'><Button className='pt-0.5 px-1 w-24 text-sm'>find</Button></div>
                <div className='my-4'>
                    <div className=''><Button className='w-32'>保存</Button></div>

                </div>
            </div>
        </div>
    );
};

export default ScrpllableSample2Page;