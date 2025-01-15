import { Garage } from "../../../enums";
import useInput from "../../../hooks/use-input";
import { InputProps } from "../../../models/input-props.model";

const GarageInput: React.FC<InputProps> = ({
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
      <label>Locatie (schuur)</label>
      <select
        name="garage"
        onChange={changeHandler}
        onBlur={inputBlurHandler}
        value={value}
        required={isRequired ?? false}
        style={{ border: getErrorStyling() }}
      >
        <option value=""></option>
        {Object.values(Garage).map((item, index) => {
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

export default GarageInput;
