import React from "react";
import styles from "./Button.module.css";

export enum ButtonStyle {
  Blue = "blue",
  Green = "green",
  Orange = "orange",
  Outline = "outline",
  Minimal = "minimal",
}

interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  buttonStyle?: ButtonStyle;
  isSmall?: boolean;
}

const Button: React.FC<PrimaryButtonProps> = ({ children, ...props }) => {
  const getButtonColorClass = () => {
    switch (props.buttonStyle) {
      case ButtonStyle.Blue:
        return "button--blue";
      case ButtonStyle.Green:
        return "button--green";
      case ButtonStyle.Orange:
        return "button--orange";
      case ButtonStyle.Outline:
        return "button--outline";
      case ButtonStyle.Minimal:
        return "button--minimal";
      default:
        return "button--blue";
    }
  };

  return (
    <button
      className={`${styles["button"]} ${styles[getButtonColorClass()]} ${
        props.isSmall ? styles["button--small"] : ""
      }`}
      onClick={props.onClick}
    >
      {children}
    </button>
  );
};

export default Button;
