import useInput from "../../../hooks/use-input";
import { InputProps } from "../../../models/input-props.model";

const PostalCodeInput: React.FC<InputProps> = ({
  onGetError,
  reset,
  isRequired,
  onStateChange,
}) => {
  const { value, valueChangeHandler, inputBlurHandler, getErrorStyling } =
    useInput(
      (value) => /^[0-9]{4}[A-Za-z]{2}$/.test(value.trim()),
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginBottom: "15px",
        maxWidth: "25%",
      }}
    >
      <label style={{ marginBottom: "5px" }}>Postcode</label>
      <input
        type="text"
        name="postalCode"
        minLength={6}
        maxLength={6}
        onChange={changeHandler}
        onBlur={inputBlurHandler}
        value={value}
        style={{ border: getErrorStyling() }}
        required={isRequired ?? false}
      />
    </div>
  );
};

export default PostalCodeInput;
