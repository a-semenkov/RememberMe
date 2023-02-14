import React from 'react';
import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';

import styles from './input.module.css';

interface IInput<T extends FieldValues>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: Path<T>;
  register: UseFormRegister<T>;
  rules?: RegisterOptions<T>;
}

function Input<T extends FieldValues>({
  className,
  type,
  placeholder,
  register,
  rules,
  name,
  ...otherProps
}: IInput<T>) {
  return (
    <input
      className={`${styles.input} ${className || ''}`}
      type={type}
      placeholder={placeholder}
      {...otherProps}
      {...register(name, rules)}
    />
  );
}

export default Input;
