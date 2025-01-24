import { useEffect, useState } from "react";

const useInput = (
  validateValue: (value: string) => boolean,
  reset: number,
  onGetError?: (state: { [key: string]: boolean }) => void
) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  useEffect(() => {
    valueResetHandler();
  }, [reset]);

  const valueChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setEnteredValue(e.target.value);
  };

  const valueResetHandler = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  const inputBlurHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setIsTouched(true);

    if (onGetError) {
      onGetError({ [e.target.name]: hasError });
    }
  };

  const getErrorStyling = () => {
    return hasError ? "1px solid red" : "";
  };

  return {
    value: enteredValue,
    hasError,
    valueChangeHandler,
    valueResetHandler,
    inputBlurHandler,
    getErrorStyling,
  };
};

export default useInput;
