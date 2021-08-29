import React from 'react';
import { ButtonProps } from './interface';
import './style.css';

const Button: React.FC<ButtonProps> = ({
  children, onClick, className, selected, type = 'default', style
}) => {
  const selectedClass = selected ? 'selected' : '';

  return (
    <button
      style={style}
      onClick={onClick}
      className={`btn btn-${type} ${selectedClass} ${className || ''}`}
    >{children}</button>
  )
};

export default Button;