import Link from "next/link";
import { AppFooter } from "@/components/layout/AppFooter";
import { AppHeader } from "@/components/layout/AppHeader";
import { NoteListExplorer } from "@/components/notes/NoteListExplorer";
import { getAllNoteSummaries, getAllTags } from "@/mock/sample-notes";
import styles from "@/styles/list.module.css";

export default function NoteList() {
  const notes = getAllNoteSummaries();
  const tags = getAllTags();

  return (
    <div className={styles.page}>
      <AppHeader />
      <main className={styles.main}>
        <section className={styles.sectionHeader}>
          <div>
            <h1 className={styles.sectionTitle}>전체 노트</h1>
            <p className={styles.sectionDescription}>
              태그와 키워드로 학습한 내용을 빠르게 다시 찾을 수 있습니다.
            </p>
          </div>
          <div className={styles.actions}>
            <Link href="/editnote" className={styles.primaryAction}>
              새 노트 작성하기
            </Link>
          </div>
        </section>
        <NoteListExplorer notes={notes} tags={tags} />
      </main>
      <AppFooter />
    </div>
  );
}
