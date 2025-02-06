'use client'
import Button from '@/components/forms/Button';
import React, { useState } from 'react';

import CustomDialog from '@/components/CustomDialog';
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
        <div  className='overflow-hidden flex flex-col' style={{ height: 'calc(100vh - 6.5rem)' }}>
            <div>content header</div>
            <div className='scrollable border border-gray-400'>
                <div className="bg-gray-100" style={{ height: '800px' }}>
                       b
                </div>
                <div>

                </div>
            </div>
            <div className='my-2'><Button className='pt-0.5 px-1 w-24 text-sm' onClick={handleClickOpen}>find</Button></div>
            <div className='mt-4 flex gap-4 items-center'>
                <Button className='w-32'>保存</Button>

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
                <div className="scrollable border border-gray-400">
                        <div>
                            <ItemTable />
                        </div>
                    </div>
                <div>dialog footer</div>
            </CustomDialog>
        </div>
    );
};

export default ExperimentalDialogPage;