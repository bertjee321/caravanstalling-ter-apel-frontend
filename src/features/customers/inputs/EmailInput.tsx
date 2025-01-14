import useInput from "../../../hooks/use-input";
import { InputProps } from "../../../models/input-props.model";

const EmailInput: React.FC<InputProps> = ({
  onGetError,
  reset,
  isRequired,
  onStateChange,
}) => {
  const { value, valueChangeHandler, inputBlurHandler, getErrorStyling } =
    useInput(
      (value) => value.trim() !== "" && value.includes("@"),
      reset,
      onGetError
    );

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    valueChangeHandler(e);

    if (onStateChange) {
      onStateChange({ [e.target.name]: e.target.value });
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label>Email</label>
      <input
        type="email"
        name="email"
        onChange={changeHandler}
        onBlur={inputBlurHandler}
        value={value}
        style={{ border: getErrorStyling() }}
        required={isRequired ?? false}
      />
    </div>
  );
};

export default EmailInput;
