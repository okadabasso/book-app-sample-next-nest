'use client'
import Button from '@/components/forms/Button';
import React, { useState } from 'react';

import CustomDialog from '@/components/CustomDialog';
import ScrollView from '@/components/ScrollView';
import ItemTable from './ItemTable';
const ExperimentalDialogPage: React.FC = () => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className='mb-12 flex flex-col gap-4 h-full max-h-full'>
            <div>head</div>
            <div id="#foo" className="flex-1 flex flex-col"
                style={
                    { "height": "calc(100vh - 12rem)" }
                } >
                <div className="overflow-y-auto flex-1"
                    style={
                        { "height": "calc(100vh - 12rem)" }
                    } >
                    <div className="bg-gray-500" style={{ height: '800px' }}>
                        v
                    </div>
                </div>

            </div>
            <div>
                <Button onClick={handleClickOpen}>Open Dialog</Button>
            </div>
            <CustomDialog
                isOpen={open}
                onClose={handleClose}
                headerContent="Dialog Title"
                footerContent={
                    <Button onClick={handleClose} className='w-48'>Close</Button>
                }
                className=' h-[95%]'
            >
                <div>dialog head</div>
                <div id="#foo2" className="flex-1 flex flex-col"
                    style={
                        { "height": "calc(100vh - 50rem)" }
                    } >
                    <div className="scrollable-container border border-gray-400">
                        <div className="bg-gray-200" style={{ height: '1000px' }}>
                            v
                        </div>
                        <div>b</div>
                    </div>

                </div>
                <div>dialog footer</div>
            </CustomDialog>
        </div>
    );
};

export default ExperimentalDialogPage;