import { useEffect, useState } from "react";

const useInputNumber = (
  validateValue: (value: number) => boolean,
  reset: number,
  onGetError?: (state: { [key: string]: boolean }) => void
) => {
  const [enteredValue, setEnteredValue] = useState(0);
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  useEffect(() => {
    valueResetHandler();
  }, [reset]);

  const valueChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredValue(Number(e.target.value));
  };

  const valueResetHandler = () => {
    setEnteredValue(0);
    setIsTouched(false);
  };

  const inputBlurHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
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

export default useInputNumber;
