"use client";

import { NodeViewWrapper, NodeViewProps } from "@tiptap/react";
import mermaid from "mermaid";
import { useEffect, useRef, useState, useCallback } from "react";
import { v4 as uuidv4 } from 'uuid';

// Mermaid 설정 초기화
mermaid.initialize({
    startOnLoad: false,
    theme: "default",
});

const MermaidComponent = (props: NodeViewProps) => {
    const [rendered, setRendered] = useState("");
    const [error, setError] = useState("");
    const [isEditing, setIsEditing] = useState(true); // 기본적으로 편집 모드로 시작
    const containerRef = useRef<HTMLDivElement>(null);

    // 고유 ID 생성 (mermaid 렌더링에 필요)
    const idRef = useRef(`mermaid-${uuidv4()}`);

    const code = props.node.attrs.src;

    const renderMermaid = useCallback(async (codeToRender: string) => {
        try {
            // 아이디가 이미 존재하면 삭제 (재렌더링 위해)
            const existingElement = document.getElementById(idRef.current);
            if (existingElement) {
                existingElement.remove();
            }

            setError("");
            // SVG 생성을 위해 mermaid.render 사용
            const { svg } = await mermaid.render(idRef.current, codeToRender);
            setRendered(svg);
        } catch (e) {
            console.error("Mermaid rendering error:", e);
            // 에러 메시지 표시
            setError("Syntax Error");
        }
    }, []);

    useEffect(() => {
        if (code) {
            renderMermaid(code);
        }
    }, [code, renderMermaid]);

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        props.updateAttributes({
            src: e.target.value,
        });
    };

    const toggleEdit = () => {
        setIsEditing(true);
    };

    const handleBlur = () => {
        setIsEditing(false);
    };

    return (
        <NodeViewWrapper className="mermaid-component">
            <div style={{ border: "1px solid #ccc", borderRadius: "8px", overflow: "hidden", marginBottom: "1rem" }}>
                {/* View Mode (Preview) */}
                {!isEditing && (
                    <div
                        onClick={toggleEdit}
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            padding: "1rem",
                            backgroundColor: "#fff",
                            minHeight: "50px",
                            cursor: "pointer"
                        }}
                        title="Click to edit"
                    >
                        {error ? (
                            <div style={{ color: "red", fontFamily: "monospace", padding: "10px" }}>{error} - Click to fix</div>
                        ) : (
                            <div dangerouslySetInnerHTML={{ __html: rendered }} />
                        )}
                    </div>
                )}

                {/* Edit Mode (Editor) */}
                {isEditing && (
                    <div style={{ backgroundColor: "#f8f9fa", padding: "0.5rem" }}>
                        <textarea
                            value={code}
                            onChange={handleInput}
                            onBlur={handleBlur}
                            placeholder="Enter Mermaid code here..."
                            autoFocus
                            spellCheck={false}
                            style={{
                                width: "100%",
                                minHeight: "150px",
                                fontFamily: "monospace",
                                fontSize: "14px",
                                padding: "0.5rem",
                                border: "1px solid #ddd",
                                borderRadius: "4px",
                                resize: "vertical",
                                outline: "none"
                            }}
                        />
                        <div style={{ fontSize: "12px", color: "#666", marginTop: "4px", textAlign: "right", display: "flex", justifyContent: "space-between" }}>
                            <span>Click outside or press Tab to preview</span>
                            <span>Mermaid Diagram Editor</span>
                        </div>
                    </div>
                )}
            </div>
        </NodeViewWrapper>
    );
};

export default MermaidComponent;
