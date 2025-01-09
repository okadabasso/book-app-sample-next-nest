import Link from 'next/link';
import React from 'react';

export default function Header() {
  return (
    <div className='fixed top-0 w-full z-50 bg-white pb-4'>
      <header className="bg-gray-800 text-white shadow w-full">
        <div className="container mx-auto py-2 px-4 flex justify-between items-center">
          <h1 className="font-bold"><Link href="/">Books Application Sample</Link> </h1>
          <nav className="space-x-4">
            <Link href="/">Home</Link>
            <Link href="/admin">Admin</Link>
          </nav>
        </div>
      </header>

    </div>
  );
};
