'use client'
import Image from 'next/image'
import { ClientSafeProvider, getProviders, signIn, signOut, useSession } from "next-auth/react";
import { useParams, useRouter, useSearchParams, redirect } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";
import { LiteralUnion } from "react-hook-form";
import { BuiltInProviderType } from "next-auth/providers/index";
import CredentialSignIn from "@/components/CredentialSignIn";
import SignInError from '@/components/SignInError';
import { tree } from 'next/dist/build/templates/app-page';
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
    const callbackUrl = searchParams.get('callbackUrl') || '/';
    const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>(null);
    const [message, setMessage] = useState("");
    
    const error = searchParams.get("error");
    useEffect(() => {
        (async () => {
            const res = await getProviders();
            setProviders(res);
        })();
    }, []);
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
