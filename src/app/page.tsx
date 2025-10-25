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
          <h1 className={styles.heroHeading}>나만의 CS 노트를 채워나가세요.</h1>
          <p className={styles.heroSubheading}>
            프론트엔드 개발자로서 필요한 각종 CS 지식을 카테고리별로 정리하고,
            언제든 다시 복습할 수 있도록 구성한 공간입니다.
          </p>
          <div className={styles.actions}>
            <Link href="/editnote" className={styles.primaryAction}>
              새 노트 작성하기
            </Link>
            <Link href="/list" className={styles.secondaryAction}>
              전체 노트 살펴보기
            </Link>
          </div>
        </section>

        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>최근에 다룬 주제</h2>
          <Link href="/list" className={styles.secondaryAction}>
            모두 보기
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
