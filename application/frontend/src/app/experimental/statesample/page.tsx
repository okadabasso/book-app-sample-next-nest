'use client';
import ContentHeader from "@/components/ContentHeader";
import Link from "next/link";

export default function StateSamplePage() {
    return (
        <div>
            <ContentHeader title="State Sample" />
            <div className="mb-4">
                <h3 className="font-bold">zustand sample</h3>
                <ul>
                    <li><Link href="/experimental/statesample/feature1" className="underline text-blue-600 hover:text-blue-700 ">feature1</Link></li>
                    <li><Link href="/experimental/statesample/feature2" className="underline text-blue-600 hover:text-blue-700 mt-4">feature2</Link></li>
                </ul>
            </div>
            <div className="mb-4">
                <h3 className="font-bold">jotai sample</h3>
                <ul>
                    <li><Link href="/experimental/statesample/feature3" className="underline text-blue-600 hover:text-blue-700 ">feature3</Link></li>
                </ul>
            </div>
        </div>
    );
}