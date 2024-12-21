import Link from 'next/link';
import React from 'react';

export default function Header() {
    return (
        <header className="bg-gray-900 text-white shadow">
        <div className="container mx-auto py-2 flex justify-between items-center">
          <h1 className="font-bold"><Link href="/">Books Application Sample</Link> </h1>
          <nav className="space-x-4">
            <a href="#" className="hover:underline">Home</a>
            <a href="#" className="hover:underline">About</a>
            <a href="#" className="hover:underline">Contact</a>
          </nav>
        </div>
      </header>
    );
};
