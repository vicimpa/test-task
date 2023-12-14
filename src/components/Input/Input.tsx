import { forwardRef } from "react";
import { FRef } from "utils/FRef";

import s from "./Input.module.sass";

export type TInputProps = {
  label?: string;
} & FRef<'input'>;

export const Input = forwardRef<HTMLInputElement, TInputProps>(
  (
    {
      label,
      className = '',
      placeholder,
      children,
      ...props
    },
    ref
  ) => {

    return (
      <div className={s.input + ' ' + className}>
        {label ? <span className={s.label}>{label}</span> : null}
        <input
          ref={ref}
          placeholder={placeholder || ' '}
          {...props} />

        {children}
      </div>
    );
  }
);