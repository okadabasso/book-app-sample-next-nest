import Link from 'next/link';
import React from 'react';

export default function Header() {
    return (
        <header className="bg-gray-900 text-white shadow mb-4">
        <div className="container mx-auto py-2 px-4 flex justify-between items-center">
          <h1 className="font-bold"><Link href="/">Books Application Sample</Link> </h1>
          <nav className="space-x-4">
            <Link href="/">Home</Link>
            <Link href="/admin">Admin</Link>
          </nav>
        </div>
      </header>
    );
};
