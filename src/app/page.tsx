import Link from "next/link";
import { AppFooter } from "@/components/layout/AppFooter";
import { AppHeader } from "@/components/layout/AppHeader";
import { NoteCard } from "@/components/notes/NoteCard";
import { sampleNotes } from "@/mock/sample-notes";
import styles from "@/styles/home.module.css";

export default function HomePage() {
  const featuredNotes = sampleNotes.slice(0, 3);

  return (
    <div className={styles.page}>
      <AppHeader />
      <main className={styles.main}>
        <section className={styles.hero}>
          <p className={styles.heroSubheading}>
            프론트엔드 개발자로서 필요한 각종 cs 지식을 정리하는 노트입니다.
          </p>
          <div className={styles.actions}>
            <Link href="/notes/new" className={styles.primaryAction}>
              Create a note
            </Link>
            <Link href="/notes" className={styles.secondaryAction}>
              Browse notes
            </Link>
          </div>
        </section>

        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>List</h2>
          <Link href="/notes" className={styles.secondaryAction}>
            View all
          </Link>
        </div>

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
