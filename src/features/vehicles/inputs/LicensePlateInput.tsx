import useInput from "../../../hooks/use-input";
import { InputProps } from "../../../models/input-props.model";

const LicensePlateInput: React.FC<InputProps> = ({
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
    <>
      <label>Kenteken</label>
      <input
         type="text"
         name="licensePlate"
         onChange={changeHandler}
         onBlur={inputBlurHandler}
         value={value}
         style={{ border: getErrorStyling() }}
         required={isRequired ?? false}
      />
    </>
  );
};

export default LicensePlateInput;
