import React from "react";
import styles from "./Checkbox.module.css";

interface CheckboxProps {
  label: string;
  onHandleChange: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, onHandleChange }) => {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (checked: boolean) => {
    setChecked(checked);
    onHandleChange(checked);
  };

  return (
    <div className={styles["toggle-section"]}>
      <label className={styles["checkbox-container"]}>
        {label}
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => handleChange(e.target.checked)}
        />
        <span className={styles["checkmark"]}></span>
      </label>
    </div>
  );
};

export default Checkbox;
