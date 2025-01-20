'use client';
import ContentFooter from '@/components/ContentFooter';
import Button from '@/components/forms/Button';
import Link from 'next/link';
import React, { useState } from 'react';

const ScrollablePage = () => {


    return (
        <div className='overflow-hidden mt-2'>
            <div className='h-6'>コンテンツのスクロール</div>
            <div  id="#foo"  className=''>
                <ul>
                    <li><Link href="/experimental/scrollable/sample1" className='text-blue-500'>サンプル1</Link></li>
                    <li><Link href="/experimental/scrollable/sample2" className='text-blue-500'>サンプル2</Link></li>
                    <li><Link href="/experimental/scrollable/sample3" className='text-blue-500'>サンプル3</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default ScrollablePage;