import { useEffect } from "react";
import useInputNumber from "../../../hooks/use-input-number";
import { InputProps } from "../../../models/input-props.model";

const AmountInput: React.FC<InputProps> = ({
  onGetError,
  reset,
  isRequired,
  onHandleChange,
  defaultValue,
}) => {
  const {
    value,
    valueChangeHandler,
    inputBlurHandler,
    getErrorStyling,
    setFirstValue,
  } = useInputNumber((value) => value > 0, reset, onGetError);

  useEffect(() => {
    if (defaultValue) {
      setFirstValue(Number(defaultValue));
    }
  }, [defaultValue]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    valueChangeHandler(e);

    if (onHandleChange) {
      onHandleChange(e);
    }
  };

  return (
    <>
      <label>Bedrag (excl. BTW)</label>
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
