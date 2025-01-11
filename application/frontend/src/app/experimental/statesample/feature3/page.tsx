'use client';
import ContentFooter from "@/components/ContentFooter";
import ContentHeader from "@/components/ContentHeader";
import { useGlobalStore } from "@/store/useStore";
import Link from "next/link";
import React, { useState } from "react";
import InputComponent from './components/InputComponent';
import DisplayComponent from './components/DisplayComponent';

export default function FeaturePage3() {
    return (    
        <div>
            <ContentHeader title="Feature3" />
            <div>
                <InputComponent />
                <DisplayComponent />
            </div>
            <ContentFooter>
                <Link href="/experimental/statesample" className="underline text-blue-600 hover:text-blue-700">Back</Link>
            </ContentFooter>
        </div>
    );
}