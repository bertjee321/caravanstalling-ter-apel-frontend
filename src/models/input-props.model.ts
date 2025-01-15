
export interface InputProps {
  onGetError?: (state: {[key: string]: boolean}) => void;
  isRequired?: boolean;
  reset: number;
  onStateChange?: (state: {[key: string]: string}) => void;
}
