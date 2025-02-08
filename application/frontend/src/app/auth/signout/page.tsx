'use client'
import { signOut } from "next-auth/react";
import Button from '@/components/forms/Button';

export default function SignOut({ }) {
    const handleSignOut = async () => {
        await signOut({ callbackUrl: '/' })
    };
    return (
        <div className=' mb-12'>
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
