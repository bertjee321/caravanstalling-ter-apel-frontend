import React from "react";
import "./SecondaryButton.css";

interface SecondaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <button className="secondary-button" onClick={props.onClick}>
      {children}
    </button>
  );
};

export default SecondaryButton;
