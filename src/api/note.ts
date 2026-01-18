import { NoteDetail, sampleNoteDetails } from "@/mock/sample-notes";

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getNoteById(id: string): Promise<NoteDetail | null> {
  await delay(800); // 800ms simulation delay
  const note = sampleNoteDetails[id];
  return note || null;
}
