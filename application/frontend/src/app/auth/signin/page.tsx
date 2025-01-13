'use client'
import Image from 'next/image'
import { ClientSafeProvider, getProviders, signIn, useSession } from "next-auth/react";
import { useParams, useRouter, useSearchParams, redirect } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";
import { LiteralUnion } from "react-hook-form";
import { BuiltInProviderType } from "next-auth/providers/index";
import CredentialSignIn from "@/components/CredentialSignIn";
import SignInError from '@/components/SignInError';
import { tree } from 'next/dist/build/templates/app-page';

const authStyle: Record<string, { className: string; color: string, icon: ReactElement | null }> = {
    Google: {
        className: "bg-white text-gray-800 border border-gray-800",
        color: "gray",
        icon: <Image src="/icons/google.svg" width={20} height={20} alt="github" />
    },
};


export default function SignIn({ }) {
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
    const handleSignIn = async (providerId: string) => {
        const result = await signIn(providerId, {redirect: true});
    };
    return (
        <div>
            <div>
                {error && (
                    <div className="w-96 pb-6 mx-auto">
                        <SignInError error={error}></SignInError>
                    </div>
                )}
                <div className="flex flex-col items-center pb-10">
                    {Object.values(providers ?? {}).filter(x => x.name != "Credentials").map((provider) => {
                        const item = authStyle[String(provider?.name)];

                        return (
                            <div key={provider.name} className="w-96">
                                <button
                                    className={`my-3 block w-full rounded px-4 py-2 font-semibold flex items-center justify-center  ${String(
                                        item?.className
                                    )}`}
                                    onClick={ (event)=>handleSignIn(provider.id) }
                                >
                                    {item.icon}
                                    <span className='ml-4'>{provider.name} でログイン</span>
                                </button>
                            </div>
                        );
                    })}
                    <div className='w-96 mx-auto mt-8'>
                        <CredentialSignIn></CredentialSignIn>

                    </div>

                </div>
            </div>
        </div>
    );
}
