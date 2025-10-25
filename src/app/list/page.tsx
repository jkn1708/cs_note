import Link from "next/link";
import { AppFooter } from "@/components/layout/AppFooter";
import { AppHeader } from "@/components/layout/AppHeader";
import { NoteCard } from "@/components/notes/NoteCard";
import { sampleNotes } from "@/mock/sample-notes";
import styles from "@/styles/list.module.css";

export default function NoteList() {
  const featuredNotes = sampleNotes.slice(0, 3);

  return (
    <div className={styles.page}>
      <AppHeader />
      <main className={styles.main}>
        <section className={styles.sectionHeader}>
          <div className={styles.actions}>
            <Link href="/editnote" className={styles.primaryAction}>
              새 노트 작성하기
            </Link>
          </div>
        </section>
        <section className={styles.noteGrid}>
          {featuredNotes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </section>
      </main>
      <AppFooter />
    </div>
  );
}
