import { signOut } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import SignInLink from './SignInLink';

export default function Header() {
  return (
    <div className='top-0 w-full z-10 bg-white'>
      <header className="bg-gray-800 text-white shadow w-full pr-4">
        <div className="container mx-auto py-2 px-4 flex justify-between items-center relative left-[1px]">
          <h1 className="font-bold"><Link href="/">Books Application Sample</Link> </h1>
          <nav className="space-x-4">
            <Link href="/" className='hover:underline'>Home</Link>
            <Link href="/admin" className='hover:underline'>Admin</Link>
            <SignInLink />
          </nav>
        </div>
      </header>

    </div>
  );
};
