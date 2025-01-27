import useInput from "../../../hooks/use-input";
import { InputProps } from "../../../models/input-props.model";

const SizeInput: React.FC<InputProps> = ({
  onGetError,
  reset,
  isRequired,
  onHandleChange,
}) => {
  const { value, valueChangeHandler, inputBlurHandler, getErrorStyling } =
    useInput((value) => +value > 0, reset, onGetError);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    valueChangeHandler(e);

    if (onHandleChange) {
      onHandleChange(e);
    }
  };

  return (
    <>
      <label>Grootte (m2)</label>
      <input
        type="number"
        name="size"
        onChange={changeHandler}
        onBlur={inputBlurHandler}
        value={value}
        style={{ border: getErrorStyling() }}
        required={isRequired ?? false}
      />
    </>
  );
};

export default SizeInput;
