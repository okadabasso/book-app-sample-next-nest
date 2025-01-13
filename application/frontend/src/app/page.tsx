'use client';
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();
  console.log("session", session);
  return (
    <div className="">
      <h2 className="text-lg font-bold">Books Application Home</h2>
      <div className="mt-4">
        <h3>admin</h3>
        <ul>
          <li><Link href="/admin/books" className="underline text-blue-600 hover:text-blue-700">admin/books</Link></li>

        </ul>

      </div>
      <div className="mt-4">
        <h3>experimental</h3>
        <ul>
          <li><Link href="/experimental/multiselect" className="underline text-blue-600 hover:text-blue-700">experimental/multiselect</Link></li>
          <li><Link href="/experimental/statesample" className="underline text-blue-600 hover:text-blue-700">experimental/statesample</Link></li>

        </ul>

      </div>
    </div>
  );
}
