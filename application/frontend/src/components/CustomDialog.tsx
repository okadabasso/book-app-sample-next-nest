'use client'
import { Button, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/16/solid';
import clsx from 'clsx';
import { useState } from 'react'
interface CustomDialogProps {
    isOpen: boolean;
    modal?: boolean;
    onClose: () => void;
    headerContent?: React.ReactNode;
    footerContent?: React.ReactNode;
    children?: React.ReactNode;
    className?: string;
}

const panelClasses = {
    base: 'flex flex-col w-full mx-auto rounded-sm bg-white p-0 border border-gray-400 shadow-sm opacity-1 backdrop-blur-2xl duration-200 ease-out',
    closed: 'transform-[scale(95%)] opacity-0',
}

export default function CustomDialog({ headerContent, footerContent, children, isOpen, className, modal = false, onClose }: CustomDialogProps) {

    return (
        <>

            <Dialog open={isOpen} as="div" className={clsx("relative w-screen h-screen top-0 left-0 p-0 z-20 focus:outline-none")} onClose={onClose}>
                <DialogBackdrop className="fixed inset-0 bg-black/30" />
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className={clsx("flex flex-col  w-full items-center justify-center p-4", className)} >
                        <DialogPanel
                            transition
                            className={clsx(panelClasses.base, !isOpen && panelClasses.closed, "h-full flex-1")}
                        >
                            <DialogTitle as="h3" className="text-base/4 font-medium text-gray-800 border-b border-gray-400 p-2 flex items-center justify-between">
                                <div>{headerContent}</div>
                                <XMarkIcon className="w-4 h-4 text-gray-800 cursor-pointer" onClick={onClose} />
                            </DialogTitle>
                            <div className="dialog-content">
                                
                                {children}
                                <div className="p-2 flex justify-end">
                                {footerContent}

                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}