'use client';
import ContentFooter from '@/components/ContentFooter';
import Button from '@/components/forms/Button';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/16/solid';
import clsx from 'clsx';
import React, { useState } from 'react';
import ItemTable from '../../dialog/ItemTable';
import TextLink from '@/components/forms/TextLink';

const ScrpllableSample2Page = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleExtent = () => {
        console.log('extent');
        setIsExpanded(!isExpanded);
    }

    return (
        <div className='overflow-hidden flex flex-col' style={{ height: 'calc(100vh - 5rem)' }}>
            <div>content header</div>
            <div className='scrollable border border-gray-400'>
            <ItemTable />
            </div>
            <div className='my-2'><Button className='pt-0.5 px-1 w-24 text-sm'>find</Button></div>
            <div className='my-4 flex gap-4 items-center'>
                <Button className='w-32' variant='primary'>保存</Button>
                <TextLink href='/experimental/scrollable' className='text-blue-500' variant='primary'>戻る</TextLink>

            </div>
        </div>
    );
};

export default ScrpllableSample2Page;