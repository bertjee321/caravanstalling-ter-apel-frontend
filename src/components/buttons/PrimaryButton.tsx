import React from "react";
import "./PrimaryButton.css";

interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <button className="primary-button" onClick={props.onClick}>
      {children}
    </button>
  );
};

export default PrimaryButton;
