import Link from "next/link";
import { AppFooter } from "@/components/layout/AppFooter";
import { AppHeader } from "@/components/layout/AppHeader";
import styles from "@/styles/editnote.module.css";
import Editor from "@/components/editor/Editor";

export default function EditNotePage() {
  return (
    <div className={styles.page}>
      <AppHeader />
      <main className={styles.main}>
        <article className={styles.article}>
          <div className={styles.content}>
            <Editor init_focus />
          </div>
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
