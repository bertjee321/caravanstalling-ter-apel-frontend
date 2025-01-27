import useInput from "../../../hooks/use-input";
import { InputProps } from "../../../models/input-props.model";

const ModelInput: React.FC<InputProps> = ({
  onGetError,
  reset,
  isRequired,
  onHandleChange,
}) => {
  const { value, valueChangeHandler, inputBlurHandler, getErrorStyling } =
    useInput(() => true, reset, onGetError);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    valueChangeHandler(e);

    if (onHandleChange) {
      onHandleChange(e);
    }
  };

  return (
    <>
      <label>Model</label>
      <input
        type="text"
        name="model"
        onChange={changeHandler}
        onBlur={inputBlurHandler}
        value={value}
        style={{ border: getErrorStyling() }}
        required={isRequired ?? false}
      />
    </>
  );
};

export default ModelInput;
