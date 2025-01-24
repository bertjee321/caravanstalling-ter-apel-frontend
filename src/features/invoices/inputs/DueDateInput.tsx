import useInput from "../../../hooks/use-input";
import { InputProps } from "../../../models/input-props.model";

const DueDateInput: React.FC<InputProps> = ({
  onGetError,
  reset,
  isRequired,
  onHandleChange,
}) => {
  const { value, valueChangeHandler, inputBlurHandler, getErrorStyling } =
    useInput((value) => value.trim() !== "", reset, onGetError);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    valueChangeHandler(e);

    if (onHandleChange) {
      onHandleChange(e);
    }
  };

  return (
    <>
      <label>Einddatum Factuur</label>
      <input
        type="date"
        name="dueDate"
        value={value}
        onChange={changeHandler}
        onBlur={inputBlurHandler}
        style={{ border: getErrorStyling() }}
        required={isRequired ?? false}
      />
    </>
  );
};

export default DueDateInput;
