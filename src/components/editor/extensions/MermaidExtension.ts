import { Node, mergeAttributes, nodeInputRule } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import MermaidComponent from "./MermaidComponent";

// 입력 규칙: ```mermaid 로 시작하면 mermaid 노드로 변환
export const inputRegex = /^```mermaid\s$/;

export const MermaidExtension = Node.create({
    name: "mermaid",

    group: "block",

    atom: true, // 자식을 가질 수 없는 단일 블록처럼 취급

    addAttributes() {
        return {
            src: {
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: "div[data-type='mermaid']",
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return [
            "div",
            mergeAttributes(HTMLAttributes, { "data-type": "mermaid" }),
        ];
    },

    addNodeView() {
        return ReactNodeViewRenderer(MermaidComponent);
    },

    addInputRules() {
        return [
            nodeInputRule({
                find: inputRegex,
                type: this.type,
            }),
        ];
    },
});
