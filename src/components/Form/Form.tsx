import { FormEventHandler, forwardRef } from "react";
import { FRef } from "utils/FRef";

import s from "./Form.module.sass";

export type TFormProps = {
  onSubmitPrevent?: FormEventHandler<HTMLFormElement>;

} & FRef<'form'>;

export const Form = forwardRef<HTMLFormElement, TFormProps>(
  (
    {
      className = '',
      onSubmitPrevent,
      onSubmit = (e) => {
        if (!onSubmitPrevent)
          return;
        e.preventDefault();
        onSubmitPrevent(e);
      },
      children,
      ...props
    },
    ref
  ) => {

    return (
      <form
        ref={ref}
        onSubmit={onSubmit}
        className={s.form + ' ' + className}
        {...props}
      >
        {children}
      </form>
    );
  }
);