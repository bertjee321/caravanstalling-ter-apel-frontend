import useInputNumber from "../../../hooks/use-input-number";
import { InputProps } from "../../../models/input-props.model";

const AmountInput: React.FC<InputProps> = ({
  onGetError,
  reset,
  isRequired,
  onStateChange,
}) => {
  const { value, valueChangeHandler, inputBlurHandler, getErrorStyling } =
    useInputNumber((value) => value > 0, reset, onGetError);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    valueChangeHandler(e);

    if (onStateChange) {
      onStateChange({ [e.target.name]: e.target.value });
    }
  };

  return (
    <>
      <label>Bedrag</label>
      <input
        type="number"
        name="amountExclVAT"
        onChange={changeHandler}
        onBlur={inputBlurHandler}
        value={value}
        style={{ border: getErrorStyling() }}
        required={isRequired ?? false}
      />
    </>
  );
};

export default AmountInput;
