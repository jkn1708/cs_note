import Link from "next/link";
import type { NoteSummary } from "@/mock/sample-notes";
import styles from "@/styles/note-card.module.css";

type NoteCardProps = {
  note: NoteSummary;
};

export function NoteCard({ note }: NoteCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.cardBody}>
        <h3 className={styles.title}>{note.title}</h3>
        <p className={styles.description}>{note.description}</p>
      </div>
      <div className={styles.meta}>
        <div className={styles.tags}>
          {note.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              #{tag}
            </span>
          ))}
        </div>
        <span className={styles.updatedAt}>Updated {note.updatedAt}</span>
      </div>
      <Link href={`/notes/${note.id}`} className={styles.cta}>
        Open note →
      </Link>
    </article>
  );
}
