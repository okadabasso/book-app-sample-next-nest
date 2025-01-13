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
    const { error } = useParams()
    useEffect(() => {
        (async () => {
            const res = await getProviders();
            setProviders(res);
        })();
    }, []);
    const handleSignIn = async () => {
        console.log('handleSignIn ', callbackUrl);
        await signIn('google', { callbackUrl, redirect:true }); // Googleでログイン
    };
    return (
        <div>
            <div>
                {error && (
                    <div className="pb-6">
                        <SignInError></SignInError>
                    </div>
                )}
                <div className="flex flex-col items-center pb-10">
                    {Object.values(providers ?? {}).filter(x => x.name != "Credentials").map((provider) => {
                        const item = authStyle[String(provider?.name)];

                        return (
                            <div key={provider.name}>
                                <button
                                    className={`my-3 w-72 rounded px-4 py-2 font-semibold flex items-center justify-center  ${String(
                                        item?.className
                                    )}`}
                                    onClick={handleSignIn}
                                >
                                    {item.icon}
                                    <span className='ml-4'>{provider.name} でログイン</span>
                                </button>
                            </div>
                        );
                    })}
                    <CredentialSignIn></CredentialSignIn>

                </div>
            </div>
        </div>
    );
}
