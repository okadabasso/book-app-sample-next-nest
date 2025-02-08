'use client'
import { signOut } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import SignInError from '@/components/SignInError';
import Button from '@/components/forms/Button';

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
