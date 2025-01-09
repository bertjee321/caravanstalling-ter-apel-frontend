import "./ButtonContainerVertical.css";

interface ButtonContainerVerticalProps {
  children: React.ReactNode;
}

const ButtonContainerVertical: React.FC<ButtonContainerVerticalProps> = ({
  children,
}) => {
  return <div className="button-container-vertical">{children}</div>;
};

export default ButtonContainerVertical;
