'use client';
import TextLink from "@/components/forms/TextLink";
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
          <li><TextLink href="/admin/books" className="" variant="default">admin/books</TextLink></li>

        </ul>

      </div>
      <div className="mt-4">
        <h3>experimental</h3>
        <ul>
          <li><TextLink href="/experimental/forms" className="" variant="primary">experimental/forms</TextLink></li>
          <li><TextLink href="/experimental/multiselect" className="" variant="primary">experimental/multiselect</TextLink></li>
          <li><TextLink href="/experimental/statesample" className="" variant="primary">experimental/statesample</TextLink></li>
          <li><TextLink href="/experimental/dialog" className="" variant="primary">experimental/dialog</TextLink></li>
          <li><TextLink href="/experimental/scrollable" className="" variant="primary">experimental/scrollable</TextLink></li>

        </ul>

      </div>
    </div>
  );
}
