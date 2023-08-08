import { MouseEventHandler, ReactNode } from "react";

export interface ButtonProps {
    isLoading?:boolean;
    showPercentage?:boolean;
    confirmTooltip?:string;
    confirmText?: string;
    progress?:number;
    text?: string;
    primary?:boolean;
    disabled?:boolean;
    children?: ReactNode;
    backgroundColor?: string;
    size?: "small" | "medium" | "large";
    onClick?: () => void;
}

export interface ConfirmTooltipProps {
  text: string;
  onConfirm: () => void;
  onCancel: () => void;
  children?: React.ReactNode;
  }

export interface ProgressBarProps {
    progress: number;
    isLoading?:boolean;
  }