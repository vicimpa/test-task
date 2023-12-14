import { Button } from "components/Button";
import { For, If } from "components/Condition";
import { Form } from "components/Form";
import { Input } from "components/Input";
import { useAsync } from "hooks/useAsync";
import { useCounter } from "hooks/useCounter";
import { useEvent } from "hooks/useEvent";
import { useReactiveSet } from "hooks/useReactiveSet";
import { useValueRef } from "hooks/useValueRef";

import { useComputed } from "@preact/signals-react";

export const App = () => {
  const counter = useCounter();
  const [emailRef, email] = useValueRef();
  const [numberRef, number] = useValueRef();
  const requests = useReactiveSet<{
    id: string,
    email: string,
    number?: string;
  }>();

  return (
    <>
      <Form
        onSubmitPrevent={() => {
          requests.add({
            id: counter(),
            email: email.value,
            number: number.value || undefined
          });

          email.value = '';
          number.value = '';
        }}
      >
        <h4>Form</h4>
        <hr />
        <Input label="Email" ref={emailRef} type="email" name="email" required />
        <Input label="Number" ref={numberRef} type="tel" name="number" />
        <Button type="submit">Check form</Button>
      </Form>
      <div>
        <h4>History</h4>
        <hr />

        <If
          condition={requests.size}
          else={<p>No requests</p>}
        >
          <For collection={requests} index={v => v.id}>
            {(value) => {
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

              const remove = useEvent(() => {
                requests.delete(value);
              });

              const status = useComputed(() => {
                if (load.value)
                  return 'PENDING';

                if (error.value)
                  return 'REJECT';

                return 'RESOLVE';
              });

              return (
                <div style={{ margin: 10 + 'px' }}>
                  <p>Email: <b>{body.email}</b></p>
                  <p>Number: <b>{body.number}</b></p>
                  <p>Status: <b>{status.value}</b></p>
                  <p>
                    <button onClick={reload}>Reload</button>
                    <button onClick={remove}>Remove</button>
                  </p>
                  <If condition={status.value === 'RESOLVE'}>
                    <p>Data: </p>
                    <pre>{JSON.stringify(data.value, null, 2)}</pre>
                  </If>
                  <If condition={status.value === 'REJECT'}>
                    <p>Error: </p>
                    <pre>{JSON.stringify(error.value, null, 2)}</pre>
                  </If>
                </div>
              );
            }}
          </For>
        </If>
      </div>
    </>
  );
};;