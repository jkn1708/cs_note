"use client";

import { useEffect, useMemo, useState } from "react";
import { NoteCard } from "@/components/notes/NoteCard";
import type { NoteSummary, TagSummary } from "@/mock/sample-notes";
import { filterNoteSummaries } from "@/utils/note-filters";
import styles from "@/styles/list.module.css";

type NoteListExplorerProps = {
  notes: NoteSummary[];
  tags: TagSummary[];
};

export function NoteListExplorer({ notes, tags }: NoteListExplorerProps) {
  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setQuery(searchParams.get("q") || "");
    setSelectedTag(searchParams.get("tag") || "");
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams();

    if (query.trim()) {
      searchParams.set("q", query.trim());
    }

    if (selectedTag) {
      searchParams.set("tag", selectedTag);
    }

    const nextQuery = searchParams.toString();
    const nextUrl = nextQuery ? `/list?${nextQuery}` : "/list";

    window.history.replaceState(null, "", nextUrl);
  }, [query, selectedTag]);

  const filteredNotes = useMemo(
    () => filterNoteSummaries(notes, query, selectedTag || undefined),
    [notes, query, selectedTag]
  );

  const hasActiveFilter = Boolean(query.trim() || selectedTag);

  return (
    <>
      <section className={styles.filterPanel} aria-label="노트 검색 및 태그 필터">
        <div className={styles.searchRow}>
          <label className={styles.searchLabel} htmlFor="note-search">
            Search
          </label>
          <input
            id="note-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="제목, 설명, 태그 검색"
            className={styles.searchInput}
          />
          {hasActiveFilter && (
            <button
              type="button"
              className={styles.clearButton}
              onClick={() => {
                setQuery("");
                setSelectedTag("");
              }}
            >
              초기화
            </button>
          )}
        </div>

        <div className={styles.tagFilterList} aria-label="태그 목록">
          {tags.map((tag) => {
            const isSelected = selectedTag === tag.name;

            return (
              <button
                key={tag.name}
                type="button"
                className={`${styles.tagFilter} ${
                  isSelected ? styles.tagFilterActive : ""
                }`}
                aria-pressed={isSelected}
                onClick={() => setSelectedTag(isSelected ? "" : tag.name)}
              >
                <span>#{tag.name}</span>
                <span className={styles.tagCount}>{tag.count}</span>
              </button>
            );
          })}
        </div>
      </section>

      <div className={styles.resultHeader}>
        <h2 className={styles.sectionTitle}>노트 목록</h2>
        <span className={styles.resultCount}>
          {filteredNotes.length} / {notes.length}
        </span>
      </div>

      {filteredNotes.length > 0 ? (
        <section className={styles.noteGrid}>
          {filteredNotes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </section>
      ) : (
        <section className={styles.emptyState}>
          <h2 className={styles.emptyTitle}>검색 결과가 없습니다.</h2>
          <p className={styles.emptyDescription}>
            검색어를 줄이거나 선택한 태그를 해제해보세요.
          </p>
        </section>
      )}
    </>
  );
}
