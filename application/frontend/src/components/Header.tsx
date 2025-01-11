import { signOut } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import SignInLink from './SignInLink';

export default function Header() {
  return (
    <div className='fixed top-0 w-full z-50 bg-white pb-4'>
      <header className="bg-gray-800 text-white shadow w-full">
        <div className="container mx-auto py-2 px-4 flex justify-between items-center">
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
