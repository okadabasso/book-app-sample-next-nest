import ContentHeader from "@/components/ContentHeader";

export default function Unauthorized() {
    return (
        <div>
            <ContentHeader title="Unauthorized" />
            <p>Sorry, you are not authorized to access this page.</p>
        </div>
    );
}