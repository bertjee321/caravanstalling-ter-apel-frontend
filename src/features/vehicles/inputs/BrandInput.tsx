import useInput from "../../../hooks/use-input";
import { InputProps } from "../../../models/input-props.model";

const BrandInput: React.FC<InputProps> = ({
  onGetError,
  reset,
  isRequired,
  onHandleChange
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
      <label>Merk</label>
      <input
        type="text"
        name="brand"
        onChange={changeHandler}
        onBlur={inputBlurHandler}
        value={value}
        style={{ border: getErrorStyling() }}
        required={isRequired ?? false}
      />
    </>
  );
};

export default BrandInput;
