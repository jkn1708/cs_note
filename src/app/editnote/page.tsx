"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { AppFooter } from "@/components/layout/AppFooter";
import { AppHeader } from "@/components/layout/AppHeader";
import styles from "@/styles/editnote.module.css";
import Editor from "@/components/editor/Editor";

export default function EditNotePage({ content }: { content: string }) {
  const html_string = useRef('')
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [timeValue, setTimeValue] = useState("");
  const [timeUnit, setTimeUnit] = useState("분");

  const handleSaveButton = () => {
    const noteData = {
      id: crypto.randomUUID(),
      title,
      description,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ""),
      updatedAt: new Date().toISOString().split('T')[0],
      readingTime: `약 ${timeValue}${timeUnit}`,
      content: html_string.current
    };
    console.log(noteData);
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
            <div className={styles.formGroup}>
              <div className={styles.inputWrapper}>
                <label className={styles.label}>제목</label>
                <input
                  type="text"
                  placeholder="제목을 입력하세요"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={styles.input}
                />
              </div>
              <div className={styles.inputWrapper}>
                <label className={styles.label}>설명</label>
                <input
                  type="text"
                  placeholder="설명을 입력하세요"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={styles.input}
                />
              </div>
              <div className={styles.inputWrapper}>
                <label className={styles.label}>태그</label>
                <input
                  type="text"
                  placeholder="태그 (쉼표로 구분)"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className={styles.input}
                />
              </div>
              <div className={styles.inputWrapper}>
                <label className={styles.label}>읽는 시간</label>
                <div className={styles.timeInputContainer}>
                  <input
                    type="number"
                    placeholder="0"
                    value={timeValue}
                    onChange={(e) => {
                      if (e.target.value.length <= 3) {
                        setTimeValue(e.target.value);
                      }
                    }}
                    className={`${styles.input} ${styles.numberInput}`}
                    max="999"
                  />
                  <select
                    value={timeUnit}
                    onChange={(e) => setTimeUnit(e.target.value)}
                    className={styles.select}
                  >
                    <option value="분">분</option>
                    <option value="시간">시간</option>
                  </select>
                </div>
              </div>
            </div>
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
