"use client";

import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import styles from "@/styles/tiptap.module.css";

type EditorProps = {
  init_focus?: boolean;
};

type ToolbarButtonConfig = {
  label: string;
  ariaLabel: string;
  type: "toggle" | "action";
  run: () => boolean;
  isActive?: () => boolean;
  isDisabled?: () => boolean;
};

const Editor = ({ init_focus = true }: EditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
  });

  useEffect(() => {
    if (!editor || !init_focus) {
      return;
    }

    editor.commands.focus("end");
  }, [editor, init_focus]);

  if (!editor) {
    return null;
  }

  const getButtonClass = (isActive: boolean, type: "toggle" | "action") => {
    const baseClasses = [styles.toolButton];

    if (type === "action") {
      baseClasses.push(styles.toolButtonAction);
    }

    if (isActive) {
      baseClasses.push(styles.toolButtonActive);
    }

    return baseClasses.join(" ");
  };

  const toolbarGroups: ToolbarButtonConfig[][] = [
    [
      {
        label: "B",
        ariaLabel: "굵게",
        type: "toggle" as const,
        run: () => editor.chain().focus().toggleBold().run(),
        isActive: () => editor.isActive("bold"),
      },
      {
        label: "I",
        ariaLabel: "기울임",
        type: "toggle" as const,
        run: () => editor.chain().focus().toggleItalic().run(),
        isActive: () => editor.isActive("italic"),
      },
      {
        label: "S",
        ariaLabel: "취소선",
        type: "toggle" as const,
        run: () => editor.chain().focus().toggleStrike().run(),
        isActive: () => editor.isActive("strike"),
      },
    ],
    [
      {
        label: "H1",
        ariaLabel: "제목 1",
        type: "toggle" as const,
        run: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
        isActive: () => editor.isActive("heading", { level: 1 }),
      },
      {
        label: "H2",
        ariaLabel: "제목 2",
        type: "toggle" as const,
        run: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
        isActive: () => editor.isActive("heading", { level: 2 }),
      },
      {
        label: "H3",
        ariaLabel: "제목 3",
        type: "toggle" as const,
        run: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
        isActive: () => editor.isActive("heading", { level: 3 }),
      },
    ],
    [
      {
        label: "\u2022",
        ariaLabel: "글머리 기호",
        type: "toggle" as const,
        run: () => editor.chain().focus().toggleBulletList().run(),
        isActive: () => editor.isActive("bulletList"),
      },
      {
        label: "1.",
        ariaLabel: "번호 매기기",
        type: "toggle" as const,
        run: () => editor.chain().focus().toggleOrderedList().run(),
        isActive: () => editor.isActive("orderedList"),
      },
      {
        label: ">",
        ariaLabel: "인용구",
        type: "toggle" as const,
        run: () => editor.chain().focus().toggleBlockquote().run(),
        isActive: () => editor.isActive("blockquote"),
      },
      {
        label: "</>",
        ariaLabel: "코드 블록",
        type: "toggle" as const,
        run: () => editor.chain().focus().toggleCodeBlock().run(),
        isActive: () => editor.isActive("codeBlock"),
      },
    ],
    [
      {
        label: "Undo",
        ariaLabel: "실행 취소",
        type: "action" as const,
        run: () => editor.chain().focus().undo().run(),
        isDisabled: () => !editor.can().undo(),
      },
      {
        label: "Redo",
        ariaLabel: "다시 실행",
        type: "action" as const,
        run: () => editor.chain().focus().redo().run(),
        isDisabled: () => !editor.can().redo(),
      },
    ],
  ];

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.toolbar}
        role="toolbar"
        aria-label="노트 편집 도구 모음"
      >
        {toolbarGroups.map((group, groupIndex) => (
          <div key={`group-${groupIndex}`} className={styles.toolbarGroup}>
            {group.map((button) => {
              const isActive = button.isActive?.() ?? false;
              const isDisabled = button.isDisabled?.() ?? false;

              return (
                <button
                  key={button.ariaLabel}
                  type="button"
                  onClick={button.run}
                  className={getButtonClass(isActive, button.type)}
                  aria-label={button.ariaLabel}
                  aria-pressed={button.type === "toggle" ? isActive : undefined}
                  disabled={isDisabled}
                  title={button.ariaLabel}
                >
                  {button.label}
                </button>
              );
            })}
          </div>
        ))}
      </div>
      <EditorContent editor={editor} className={styles.editor} />
    </div>
  );
};

export default Editor;
