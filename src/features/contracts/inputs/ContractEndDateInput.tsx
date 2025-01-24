import useInput from "../../../hooks/use-input";
import { InputProps } from "../../../models/input-props.model";

const ContractEndDateInput: React.FC<InputProps> = ({
  onGetError,
  reset,
  isRequired,
  onStateChange,
}) => {
  const { value, valueChangeHandler, inputBlurHandler, getErrorStyling } =
    useInput(() => true, reset, onGetError);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    valueChangeHandler(e);

    if (onStateChange) {
      onStateChange({ [e.target.name]: e.target.value });
    }
  };

  return (
    <>
      <label>Einddatum contract (optioneel)</label>
      <input
        type="date"
        name="contractEnd"
        value={value}
        onChange={changeHandler}
        onBlur={inputBlurHandler}
        style={{ border: getErrorStyling() }}
        required={isRequired ?? false}
      />
    </>
  );
};

export default ContractEndDateInput;
