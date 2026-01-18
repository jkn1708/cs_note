import DOMPurify from "isomorphic-dompurify";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AppFooter } from "@/components/layout/AppFooter";
import { AppHeader } from "@/components/layout/AppHeader";
import { getSampleNote } from "@/mock/sample-notes";
import styles from "@/styles/note-detail.module.css";

type NoteDetailPageProps = {
  params: {
    noteId: string;
  };
};

export default function NoteDetailPage({ params }: NoteDetailPageProps) {
  const note = getSampleNote(params.noteId);

  if (!note) {
    notFound();
  }

  return (
    <div className={styles.page}>
      <AppHeader />
      <main className={styles.main}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/" className={styles.crumb}>
            홈
          </Link>
          <span aria-hidden="true">/</span>
          <Link href="/list" className={styles.crumb}>
            노트
          </Link>
          <span aria-hidden="true">/</span>
          <span className={styles.current}>{note.title}</span>
        </nav>

        <article className={styles.article}>
          <header className={styles.header}>
            <div className={styles.metaTop}>
              <time dateTime={note.updatedAt}>업데이트 {note.updatedAt}</time>
              <span>·</span>
              <span>{note.readingTime}</span>
            </div>
            <h1 className={styles.title}>{note.title}</h1>
            <p className={styles.description}>{note.description}</p>
            <div className={styles.tagGroup}>
              {note.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  #{tag}
                </span>
              ))}
            </div>
          </header>

          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(note.content) }}
          />
        </article>

        <footer className={styles.backLinks}>
          <Link href="/list" className={styles.secondaryAction}>
            노트 목록으로 돌아가기
          </Link>
        </footer>
      </main>
      <AppFooter />
    </div>
  );
}
