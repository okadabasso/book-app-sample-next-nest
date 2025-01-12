'use client';
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ArrowLeftEndOnRectangleIcon, ArrowLeftStartOnRectangleIcon, ArrowRightEndOnRectangleIcon, ArrowRightStartOnRectangleIcon, ChevronDownIcon, UserIcon } from "@heroicons/react/16/solid";
import { Session } from "inspector/promises";
import { User } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function SignInLink() {
    const { data: session } = useSession();
    const [user, setUser] = useState<User | null>(null);
    const buttonRef = useRef<HTMLButtonElement>(null); // ボタンの参照
    const [buttonWidth, setButtonWidth] = useState(0); // ボタンの幅
  
    console.log("session ", session);

    useEffect(() => {
        if (session) {
            setUser(session.user as User);
        }
        if (buttonRef.current) {
            setButtonWidth(buttonRef.current.offsetWidth); // ボタンの幅を取得して状態に設定
          }
    }, [session, buttonRef.current]);

    const handleSignOut = async () => {
        await signOut({ callbackUrl: '/' })
    }
    return (
        <span >
            {session ? (
                <div className="inline-block relative">
                    <Menu>
                        <MenuButton ref={buttonRef} className=" inline-block  hover:underline">
                            <UserIcon className="inline h-4 w-4 mr-1" /> {user?.name}
                            <ChevronDownIcon className="inline ml-1 h-5 w-5 text-white"/></MenuButton>
                        <MenuItems anchor="bottom" 
                            style={{ width: `${buttonWidth}px` }}  
                            className="absolute right-0 px-2 py-1 origin-top-right bg-gray-900 text-white divide-y divide-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-[100] cursor-pointer">
                            <MenuItem >
                                <a role="button" onClick={() => handleSignOut()} className="inline-block w-full"><ArrowRightStartOnRectangleIcon className="inline h-5 w-5 text-white mr-1" />Sign Out</a>
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
