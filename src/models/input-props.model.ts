export interface InputProps {
  onGetError?: (state: { [key: string]: boolean }) => void;
  isRequired?: boolean;
  reset: number;
  onStateChange?: (state: { [key: string]: string }) => void;
  onHandleChange?: (value: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  defaultValue?: string | number;
}
