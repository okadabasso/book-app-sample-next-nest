'use client';
import ContentFooter from "@/components/ContentFooter";
import ContentHeader from "@/components/ContentHeader";
import { useGlobalStore } from "@/store/useStore";
import Link from "next/link";
import React, { useState } from "react";

export default function FeaturePage1() {
    // Zustandのストアから関数を取得
    const setFeature = useGlobalStore((state) => state.setFeature);
    const feature = useGlobalStore((state) => state.feature);

    const [message, setMessage] = useState('');
    const [inputValue, setInputValue] = useState(feature);

    const handleClickUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        setFeature(inputValue); // ストアに保存
        setMessage(`Set feature  '${inputValue}'`);
    }
    const handleClickClear = (e: React.FormEvent) => {
        e.preventDefault();
        setInputValue(''); // ストアに保存'');
        setFeature(''); // ストアに保存'');
        setMessage(`Clear feature`);
    }
    return (    
        <div>
            <ContentHeader title="Feature1" />
            <div>
                <form>
                    <div className="mb-4">
                        <label className="mr-4">Feature</label>
                        <input type="text" name="feature" value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="border border-gray-400 focus:outline focus:outline-2 focus:outline-blue-500 rounded-sm px-1 py-0.5" />
                    </div>
                </form>
                <div className="mb-4">
                    <p className="text-green-700">{message}</p>
                </div>
            </div>
            <ContentFooter>
                <button type="button" onClick={handleClickUpdate} className="rounded-sm bg-blue-600 text-white  w-32 py-0.5">Update</button>
                <button type="button" onClick={handleClickClear} className="rounded-sm bg-blue-600 text-white  w-32 py-0.5">Clear</button>
                <Link href="/experimental/statesample/feature2" className="underline text-blue-600 hover:text-blue-700">featrue2</Link>
                <Link href="/experimental/statesample" className="underline text-blue-600 hover:text-blue-700 ml-4">Back</Link>
            </ContentFooter>
        </div>
    );

}