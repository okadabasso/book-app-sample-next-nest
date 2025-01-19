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
        <div className='flex flex-col gap-4 h-full'>
            <Button variant="primary" color="primary" onClick={handleClickOpen}>
                Open Dialog
            </Button>
            <div>a</div>
            <div className='scrollable-table-container'>
                <div className='bg-gray-500' style={{ height: '800px' }}>
                    v
                </div>
            </div>
            <div>cccccccccccccccccccccccccccccccccccccccccc</div>


        </div>
    );
};

export default ExperimentalDialogPage;