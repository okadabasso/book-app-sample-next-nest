'use client';
import React, { useState } from 'react';

const ScrpllablePage = () => {


    return (
        <div className='mb-12 flex flex-col gap-4 h-full max-h-full'>
            <div>head</div>
            <div  id="#foo"  className="flex-1 flex flex-col"
                style={
                    {"height": "calc(100vh - 12rem);"}
                } >
                <div className="overflow-y-auto flex-1" 
                style={
                    {"height": "calc(100vh - 12rem);"}
                } >
                    <div className="bg-gray-500" style={{ height: '800px' }}>
                        v
                    </div>
                </div>

            </div>
            <div>footer</div>

        </div>
    );
};

export default ScrpllablePage;