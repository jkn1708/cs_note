import { Editor } from "@tiptap/react";
import styles from "@/styles/tiptap.module.css";
import { ToolbarButtonConfig } from "@/types/ui/component";
import { useEffect, useState } from "react";

export default function useToolbar(editor: Editor) {
    const [, forceUpdate] = useState({});

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
                isActive: () => editor.isFocused && editor.isActive("bold"),
            },
            {
                label: "I",
                ariaLabel: "기울임",
                type: "toggle" as const,
                run: () => editor.chain().focus().toggleItalic().run(),
                isActive: () => editor.isFocused && editor.isActive("italic"),
            },
            {
                label: "S",
                ariaLabel: "취소선",
                type: "toggle" as const,
                run: () => editor.chain().focus().toggleStrike().run(),
                isActive: () => editor.isFocused && editor.isActive("strike"),
            },
        ],
        [
            {
                label: "H1",
                ariaLabel: "제목 1",
                type: "toggle" as const,
                run: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
                isActive: () => editor.isFocused && editor.isActive("heading", { level: 1 }),
            },
            {
                label: "H2",
                ariaLabel: "제목 2",
                type: "toggle" as const,
                run: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
                isActive: () => editor.isFocused && editor.isActive("heading", { level: 2 }),
            },
            {
                label: "H3",
                ariaLabel: "제목 3",
                type: "toggle" as const,
                run: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
                isActive: () => editor.isFocused && editor.isActive("heading", { level: 3 }),
            },
        ],
        [
            {
                label: "\u2022",
                ariaLabel: "글머리 기호",
                type: "toggle" as const,
                run: () => editor.chain().focus().toggleBulletList().run(),
                isActive: () => editor.isFocused && editor.isActive("bulletList"),
            },
            {
                label: "1.",
                ariaLabel: "번호 매기기",
                type: "toggle" as const,
                run: () => editor.chain().focus().toggleOrderedList().run(),
                isActive: () => editor.isFocused && editor.isActive("orderedList"),
            },
            {
                label: ">",
                ariaLabel: "인용구",
                type: "toggle" as const,
                run: () => editor.chain().focus().toggleBlockquote().run(),
                isActive: () => editor.isFocused && editor.isActive("blockquote"),
            },
            {
                label: "</>",
                ariaLabel: "코드 블록",
                type: "toggle" as const,
                run: () => editor.chain().focus().toggleCodeBlock().run(),
                isActive: () => editor.isFocused && editor.isActive("codeBlock"),
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

    useEffect(() => {
        const handler = () => forceUpdate({});
        editor.on("transaction", handler);
        editor.on("focus", handler);
        editor.on("blur", handler);
        return () => {
            editor.off("transaction", handler);
            editor.off("focus", handler);
            editor.off("blur", handler);
        };
    }, [editor]);

    return {
        getButtonClass,
        toolbarGroups,
    }

}