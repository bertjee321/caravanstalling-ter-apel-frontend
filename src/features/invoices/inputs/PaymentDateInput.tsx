import useInput from "../../../hooks/use-input";
import { InputProps } from "../../../models/input-props.model";

const PaymentDateInput: React.FC<InputProps> = ({
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
      <label>Betaaldatum (optioneel)</label>
      <input
        type="date"
        name="paymentDate"
        value={value}
        onChange={changeHandler}
        onBlur={inputBlurHandler}
        style={{ border: getErrorStyling() }}
        required={isRequired ?? false}
      />
    </>
  );
};

export default PaymentDateInput;
