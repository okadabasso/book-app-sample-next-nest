'use client';
import ContentFooter from "@/components/ContentFooter";
import ContentHeader from "@/components/ContentHeader";
import { useGlobalStore } from "@/store/useStore";
import Link from "next/link";

export default function FeaturePage2() {

    const feature1 = useGlobalStore((state) => state.feature);

    return (
        <div>
            <ContentHeader title="Feature2" />
            <div className="mb-4">
                <form>
                    <label className="mr-4">Feature1</label>
                    <span className="mr-4">{feature1}</span>
                </form>
            </div>
            <ContentFooter>
                <Link href="/experimental/statesample/feature1" className="underline text-blue-600 hover:text-blue-700">featrue1</Link>
                <Link href="/experimental/statesample" className="underline text-blue-600 hover:text-blue-700">Up</Link>
            </ContentFooter>
        </div>
    );

}