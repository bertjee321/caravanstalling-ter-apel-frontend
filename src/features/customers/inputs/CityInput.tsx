import useInput from "../../../hooks/use-input";
import { InputProps } from "../../../models/input-props.model";

const CityInput: React.FC<InputProps> = ({
  onGetError,
  reset,
  isRequired,
  onStateChange,
}) => {
  const { value, valueChangeHandler, inputBlurHandler, getErrorStyling } =
    useInput((value) => value.trim() !== "", reset, onGetError);

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
      }}
    >
      <label style={{ marginBottom: "5px" }}>Woonplaats</label>
      <input
        type="text"
        name="city"
        onChange={changeHandler}
        onBlur={inputBlurHandler}
        value={value}
        style={{ border: getErrorStyling() }}
        required={isRequired ?? false}
      />
    </div>
  );
};

export default CityInput;
