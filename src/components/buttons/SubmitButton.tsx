import "./SubmitButton.css";

interface SubmitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ children, ...props }) => {
  return (
    <button type="submit" {...props} className="submit-button">
      {children}
    </button>
  );
};

export default SubmitButton;
