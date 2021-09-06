import React from 'react';
import { InputProps } from './interface';
import './style.css';

const Input: React.FC<InputProps> = (
  { label, onChange, error, positive, inputStyle, inputContainerStyle },
) => {
  const overrideClassName = (error && 'error-ui')
    || (positive && 'positive-ui')
    || '';

  return (
    <div className="input-container" style={inputContainerStyle}>
      <label>
        <div className="label">{label}</div>
        <input
          style={inputStyle}
          onChange={onChange}
          className={overrideClassName} />
      </label>
      {error && <div className="error-message">{error}</div>}
    </div>
  )
};

export default Input;