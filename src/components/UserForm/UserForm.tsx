import { Button } from "components/Button";
import { Form } from "components/Form";
import { Input } from "components/Input";
import { useCounter } from "hooks/useCounter";
import { useValueRef } from "hooks/useValueRef";
import { FC, ReactNode } from "react";

import s from "./UserForm.module.sass";

export type TFormRequest = {
  id: string;
  email: string;
  number?: string;
};

export type TUserFormProps = {
  onSubmit?: (v: TFormRequest) => any;
  children?: ReactNode;
};

export const UserForm: FC<TUserFormProps> = ({ onSubmit, children }) => {
  const counter = useCounter();
  const [emailRef, email] = useValueRef();
  const [numberRef, number] = useValueRef();

  return (
    <div className={s.form}>
      <Form
        className={s.left}
        onSubmitPrevent={() => {
          onSubmit?.({
            id: counter(),
            email: email.value,
            number: number.value || undefined
          });

          email.value = '';
          number.value = '';
        }}
      >
        <h4>Form:</h4>
        <hr />
        <Input label="Email" ref={emailRef} type="email" name="email" required />
        <Input label="Number" ref={numberRef} type="tel" name="number" />
        <Button type="submit">Check form</Button>
      </Form>

      <div className={s.result}>
        {children}
      </div>
    </div>
  );
};