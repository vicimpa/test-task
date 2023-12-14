import { useCallback, useLayoutEffect } from "react";

import { Signal, useSignal } from "@preact/signals-react";

export const useAsync = <T extends any>(
  callback: () => T | Promise<T>,
  ...deps: any[]
): [
    Signal<boolean>,
    Signal<T | null>,
    Signal<any | null>,
    () => any
  ] => {
  const load = useSignal(true);
  const data = useSignal<T | null>(null);
  const error = useSignal<any | null>(null);
  const attempts = useSignal(0);

  useLayoutEffect(() => {
    let mount = true;

    load.value = true;
    data.value = null;
    error.value = null;

    Promise.resolve()
      .then(callback)
      .then(e => { if (mount) data.value = e; })
      .catch(e => { if (mount) error.value = e; })
      .finally(() => { if (mount) load.value = false; });

    return () => { mount = false; };
  }, [attempts.value, ...deps]);

  return [
    load,
    data,
    error,
    useCallback(() => {
      attempts.value++;
    }, [])
  ];
};