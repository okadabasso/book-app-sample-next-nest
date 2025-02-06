'use client'
import Image from 'next/image';
import { ClientSafeProvider, getProviders, signOut } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";
import { LiteralUnion } from "react-hook-form";
import { BuiltInProviderType } from "next-auth/providers/index";
import SignInError from '@/components/SignInError';
import Button from '@/components/forms/Button';

const authStyle: Record<string, { className: string; color: string, icon: ReactElement | null }> = {
    Google: {
        className: "bg-white text-gray-800 border border-gray-800",
        color: "gray",
        icon: <Image src="/icons/google.svg" width={20} height={20} alt="github" />
    },
};


export default function SignOut({ }) {
    const searchParams = useSearchParams();
    
    const error = searchParams.get("error");
    const handleSignOut = async () => {
        await signOut({ callbackUrl: '/' })
    };
    return (
        <div className=' mb-12'>
                {error && (
                    <div className="w-96 pb-6 mx-auto">
                        <SignInError error={error}></SignInError>
                    </div>
                )}
                <div>
                    <Button 
                        onClick={() => handleSignOut()} 
                        className="w-48" 
                        variant='outline-default'>Sign out
                    </Button>
                </div>
        </div>
    );
}
