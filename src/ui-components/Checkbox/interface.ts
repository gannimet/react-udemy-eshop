export interface CheckboxProps {
  initialValue?: boolean;
  onChange(value: boolean): void;
}

export interface CheckboxState {
  value: boolean;
}