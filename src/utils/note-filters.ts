import type { NoteSummary, TagSummary } from "@/mock/sample-notes";

export function buildTagSummaries(notes: NoteSummary[]): TagSummary[] {
  const tagCounts = notes.reduce((acc, note) => {
    note.tags.forEach((tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
    });

    return acc;
  }, {} as Record<string, number>);

  return Object.entries(tagCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export function filterNoteSummaries(
  notes: NoteSummary[],
  query: string,
  tag?: string
): NoteSummary[] {
  const normalizedQuery = query.trim().toLowerCase();

  return notes.filter((note) => {
    const matchesTag = !tag || note.tags.includes(tag);
    const matchesQuery =
      !normalizedQuery ||
      [note.title, note.description, ...note.tags]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery);

    return matchesTag && matchesQuery;
  });
}
