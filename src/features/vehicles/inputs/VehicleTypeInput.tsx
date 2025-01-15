import { VehicleType } from "../../../enums";
import useInput from "../../../hooks/use-input";
import { InputProps } from "../../../models/input-props.model";

const VehicleTypeInput: React.FC<InputProps> = ({
  onGetError,
  reset,
  isRequired,
  onStateChange,
}) => {
  const { value, valueChangeHandler, inputBlurHandler, getErrorStyling } =
    useInput((value) => value.trim() !== "", reset, onGetError);

  const changeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    valueChangeHandler(e);

    if (onStateChange) {
      onStateChange({ [e.target.name]: e.target.value });
    }
  };

  return (
    <>
      <label>Type voertuig</label>
      <select
        name="vehicleType"
        onChange={changeHandler}
        onBlur={inputBlurHandler}
        value={value}
        required={isRequired ?? false}
        style={{ border: getErrorStyling() }}
      >
        <option value=""></option>
        {Object.values(VehicleType).map((item, index) => {
          return (
            <option key={index} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default VehicleTypeInput;
