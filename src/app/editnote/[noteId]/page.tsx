"use client";

import NoteForm from "@/components/notes/NoteForm";
import { use } from "react";

type EditNotePageProps = {
  params: Promise<{
    noteId: string;
  }>;
};

export default function EditNotePage({ params }: EditNotePageProps) {
  // Unwrapping params using React.use() as recommended in Next.js 15
  const { noteId } = use(params);

  return <NoteForm noteId={noteId} />;
}
