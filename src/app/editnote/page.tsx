"use client";

import { useRef } from "react";
import Link from "next/link";
import { AppFooter } from "@/components/layout/AppFooter";
import { AppHeader } from "@/components/layout/AppHeader";
import styles from "@/styles/editnote.module.css";
import Editor from "@/components/editor/Editor";

export default function EditNotePage({ content }: { content: string }) {
  const html_string = useRef('')

  const handleSaveButton = () => {
    console.log(html_string.current);
  };

  const handleEditorChange = (html: string) => {
    html_string.current = html;
  };

  return (
    <div className={styles.page}>
      <AppHeader />
      <main className={styles.main}>
        <article className={styles.article}>
          <div className={styles.content}>
            <Editor
              init_focus
              content={content}
              onChange={handleEditorChange}
            />
          </div>
        </article>
        <footer className={styles.backLinks}>
          <button
            type="button"
            onClick={handleSaveButton}
            className={styles.saveButton}
          >
            저장하기
          </button>
          <Link href="/list" className={styles.secondaryAction}>
            노트 목록으로 돌아가기
          </Link>
        </footer>
      </main>
      <AppFooter />
    </div>
  );
}
