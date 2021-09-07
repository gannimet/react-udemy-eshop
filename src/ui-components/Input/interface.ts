import React from 'react';

export interface InputProps {
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
  label: string;
  error?: string;
  positive?: boolean;
  inputStyle?: React.CSSProperties;
  inputContainerStyle?: React.CSSProperties;
  inputRef?: React.RefObject<HTMLInputElement>;
}