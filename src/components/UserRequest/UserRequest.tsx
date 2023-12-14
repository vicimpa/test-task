import { Button } from "components/Button";
import { If } from "components/Condition";
import { TFormRequest } from "components/UserForm";
import { useAsync } from "hooks/useAsync";
import { useEvent } from "hooks/useEvent";
import { FC } from "react";

import { useComputed } from "@preact/signals-react";

import s from "./UserRequest.module.sass";

export type TUserRequestProps = {
  value: TFormRequest;
  onRemove?: (e: TFormRequest) => any;
};

export const UserRequest: FC<TUserRequestProps> = ({ value, onRemove }) => {
  const { id, ...body } = value;
  const [load, data, error, reload] = useAsync(() => (
    fetch('/api/users/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(e => {
      if (e.status === 200)
        return e.json();

      throw e.statusText;
    })
  ));

  const remove = useEvent(() => onRemove?.(value));

  const status = useComputed(() => {
    if (load.value)
      return 'PENDING';

    if (error.value)
      return 'REJECT';

    return 'RESOLVE';
  });

  return (
    <div className={s.request}>
      <div className={s.info}>
        <p>Email: <b>{body.email}</b></p>
        <p>Number: <b>{body.number}</b></p>
        <p>Status: <b className={s[status.value]}>{status.value}</b></p>
        <p style={{ display: 'flex', gap: '2px' }}>
          <Button onClick={reload}>Reload</Button>
          <Button onClick={remove}>Remove</Button>
        </p>
      </div>
      <div className={s.data}>
        <If condition={status.value === 'RESOLVE'}>
          <p>Data: </p>
          <pre>{JSON.stringify(data.value, null, 2)}</pre>
        </If>
        <If condition={status.value === 'REJECT'}>
          <p>Error: </p>
          <pre>{JSON.stringify(error.value, null, 2)}</pre>
        </If>
      </div>
    </div >
  );
};