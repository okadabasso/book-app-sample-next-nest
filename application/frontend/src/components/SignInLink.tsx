'use client';
import { Menu, MenuButton, MenuItem, MenuItems, MenuSeparator } from "@headlessui/react";
import { ArrowRightEndOnRectangleIcon, ArrowRightStartOnRectangleIcon, ChevronDownIcon, UserIcon } from "@heroicons/react/16/solid";
import { User } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export default function SignInLink() {
    const { data: session } = useSession();
    const [user, setUser] = useState<User | null>(null);
  

    useEffect(() => {
        if (session) {
            setUser(session.user as User);
        }
    }, [session]);

    const handleSignOut = async () => {
        await signOut({ callbackUrl: '/' })
    }
    return (
        <span >
            {session ? (
                <div className="inline-block relative">
                    <Menu as="div" className="inline-block relative min-w-40">
                        <MenuButton className=" inline-block  hover:underline">
                            <UserIcon className="inline h-4 w-4 mr-1" /> {user?.name}
                            <ChevronDownIcon className="inline ml-1 h-5 w-5 text-white"/></MenuButton>
                        <MenuItems anchor="bottom end" 
                            modal={false}
                            className="absolute right-0 px-2 py-1 origin-top-right bg-gray-900 text-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-[100] cursor-pointer w-40">
                            <MenuItem >
                                <a role="button" className="inline-block" href="/auth/profile">Profile</a>
                            </MenuItem>
                            <MenuSeparator className="my-1 h-px bg-gray-500" />
                            <MenuItem >
                                <a role="button" onClick={() => handleSignOut()} className="inline-block"><ArrowRightStartOnRectangleIcon className="inline h-5 w-5 text-white mr-1" />Sign Out</a>
                            </MenuItem>
                        </MenuItems>
                    </Menu>

                </div>
            ) : (
                <Link href="/auth/signin"><ArrowRightEndOnRectangleIcon className="inline h-4 w-4 text-white mr-1" />Sign In</Link>
            )}
        </span>
    );
};
