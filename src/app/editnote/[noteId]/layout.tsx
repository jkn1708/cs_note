import { sampleNoteDetails } from "@/mock/sample-notes";

export async function generateStaticParams() {
    return Object.keys(sampleNoteDetails).map((noteId) => ({
        noteId: noteId,
    }));
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
