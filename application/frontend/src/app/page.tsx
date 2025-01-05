'use client';
import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <h2 className="text-lg font-bold">Books Application Home</h2>
      <div className="mt-4">
        <h3>admin</h3>
        <ul>
          <li><Link href="/admin/books" className="underline text-blue-700 hover:text-blue-500">admin/books</Link></li>

        </ul>

      </div>
      <div className="mt-4">
        <h3>experimental</h3>
        <ul>
          <li><Link href="/experimental/multiselect" className="underline text-blue-700 hover:text-blue-500">experimental/multiselect</Link></li>

        </ul>

      </div>
    </div>
  );
}
