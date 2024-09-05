import { ChangeEvent } from 'react';
import './input.css';

type InputProps = {
    className?: string;
    type: string;
    name: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement> ) => void;
};

const Input = ({ className, type, name, value, onChange}: InputProps) => {
  return (
    <input
        className={`input-wrapper ${className}`}
        type={type}
        name={name}
        maxLength={40}
        minLength={2}
        onChange={(e) => onChange(e)}
        value={value}
        aria-labelledby="name"
        >
    </input>
  )
};

export default Input;
