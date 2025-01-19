'use client';
import ContentFooter from '@/components/ContentFooter';
import Button from '@/components/forms/Button';
import React, { useState } from 'react';

const ScrpllablePage = () => {


    return (
        <div className='overflow-hidden'>
            <div className='bg-blue-100 h-6'>head</div>
            <div  id="#foo"  className='' style={{ height: 'calc(100vh - 12.5rem)' }}>
                <div className='h-full scrollable-container border border-gray-300' style={{ height: 'calc(100% - 2.5rem )'}}>
                    <div className="flex flex-col" style={{ height: '800px' }}>
                        <div>
                            a
                        </div>
                        <div className='flex-1'>
                            b
                        </div>
                        <div>
                            c
                        </div>
                        
                    </div>
                </div>
                <div className='mt-4'><Button className='pt-0.5 px-1 w-24 text-sm'>find</Button></div>

            </div>
 
            <ContentFooter>
                <div><Button className='w-32'>保存</Button></div>
            </ContentFooter>
        </div>
    );
};

export default ScrpllablePage;