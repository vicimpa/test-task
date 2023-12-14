import { For, If } from "components/Condition";
import { TFormRequest, UserForm } from "components/UserForm";
import { UserRequest } from "components/UserRequest";
import { useReactiveSet } from "hooks/useReactiveSet";

export const App = () => {
  const requests = useReactiveSet<TFormRequest>();

  return (
    <UserForm onSubmit={e => requests.add(e)}>
      <h4>Result:</h4>
      <hr />
      <If
        condition={requests.size}
        else={<p>No requests</p>}
      >
        <For collection={[...requests].reverse()} index={v => v.id}>
          {(value) => (
            <UserRequest
              value={value}
              onRemove={e => requests.delete(e)} />
          )}
        </For>
      </If>
    </UserForm>

  );
};;