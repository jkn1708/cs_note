import Link from "next/link";
import { AppFooter } from "@/components/layout/AppFooter";
import { AppHeader } from "@/components/layout/AppHeader";
import styles from "@/styles/note-detail.module.css";
import Tiptap from "@/components/editor/Tiptap";

export default function EditNotePage() {
  return (
    <div className={styles.page}>
      <AppHeader />
      <main className={styles.main}>
        <Tiptap />
        <footer className={styles.backLinks}>
          <Link href="/notes" className={styles.secondaryAction}>
            노트 목록으로 돌아가기
          </Link>
        </footer>
      </main>
      <AppFooter />
    </div>
  );
}
