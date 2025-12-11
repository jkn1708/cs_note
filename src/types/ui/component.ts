export type ToolbarButtonConfig = {
    label: string;
    ariaLabel: string;
    type: "toggle" | "action";
    run: () => boolean;
    isActive?: () => boolean;
    isDisabled?: () => boolean;
};
