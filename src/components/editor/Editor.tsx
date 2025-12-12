"use client";

import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import styles from "@/styles/tiptap.module.css";
import Toolbar from "./Toolbar";
import StarterKit from "@tiptap/starter-kit";

type EditorProps = {
  init_focus?: boolean;
  content?: string;
  onChange?: (html: string) => void;
};


import { MermaidExtension } from "./extensions/MermaidExtension";

const Editor = ({ init_focus = true, content, onChange }: EditorProps) => {

  const editor = useEditor({
    extensions: [StarterKit, MermaidExtension],
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange?.(html);
    },
    content,
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

  return (
    <div className={styles.wrapper}>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} className={styles.editor} />
    </div>
  );
};

export default Editor;
