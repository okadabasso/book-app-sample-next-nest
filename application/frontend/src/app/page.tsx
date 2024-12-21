import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <h2 className="text-lg font-bold">Books Application Home</h2>
      <ul>
        <li><Link href="/admin/books" className="underline text-blue-700 hover:text-blue-500">admin/books</Link></li>
      
      </ul>
    </div>
  );
}
