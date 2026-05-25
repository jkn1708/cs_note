import notesMetadata from "./notes-metadata.json";
import notesContent from "./notes-content.json";
import { buildTagSummaries } from "@/utils/note-filters";

export type NoteSummary = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  updatedAt: string;
  readingTime: string;
};

export type NoteDetail = NoteSummary & {
  content: string;
};

export type TagSummary = {
  name: string;
  count: number;
};

// sampleNoteDetails는 컨텐츠를 제외한 메타데이터(Summary)만 관리합니다.
export const sampleNoteDetails: Record<string, NoteSummary> = notesMetadata.reduce(
  (acc, metadata) => {
    acc[metadata.id] = metadata;
    return acc;
  },
  {} as Record<string, NoteSummary>
);

export function getAllNoteSummaries(): NoteSummary[] {
  return Object.values(sampleNoteDetails).sort((a, b) =>
    b.updatedAt.localeCompare(a.updatedAt)
  );
}

export function getAllTags(): TagSummary[] {
  return buildTagSummaries(getAllNoteSummaries());
}

// 상세 정보 요청 시에만 컨텐츠를 결합하여 반환합니다.
export function getSampleNote(noteId: string): NoteDetail | undefined {
  const metadata = sampleNoteDetails[noteId];
  if (!metadata) return undefined;

  return {
    ...metadata,
    content: (notesContent as Record<string, string>)[noteId] || "",
  };
}
