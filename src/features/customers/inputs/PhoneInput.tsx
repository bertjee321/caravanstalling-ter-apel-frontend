import useInput from "../../../hooks/use-input";
import { InputProps } from "../../../models/input-props.model";

const PhoneInput: React.FC<InputProps> = ({
  onGetError,
  reset,
  isRequired,
  onStateChange,
}) => {
  const { value, valueChangeHandler, inputBlurHandler, getErrorStyling } =
    useInput(
      (value) => {
        if (value.trim().length === 0) return true;
        return /^[0-9]{10}$/.test(value.trim());
      },
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
      <label>Telefoonnummer</label>
      <input
        type="text"
        name="phoneNumber"
        minLength={10}
        maxLength={10}
        onChange={changeHandler}
        onBlur={inputBlurHandler}
        value={value}
        style={{ border: getErrorStyling() }}
        required={isRequired ?? false}
      />
    </div>
  );
};

export default PhoneInput;
