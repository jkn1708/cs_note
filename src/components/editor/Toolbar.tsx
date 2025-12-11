import { Editor } from "@tiptap/react";
import styles from "@/styles/tiptap.module.css";
import useToolbar from "./hooks/useToolbar";

type ToolbarProps = {
    editor: Editor;
};

const Toolbar = ({ editor }: ToolbarProps) => {
    const { getButtonClass, toolbarGroups } = useToolbar(editor);

    return (
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
    );
};

export default Toolbar;
