import { RefObject } from "react";

import { Signal, useSignal, useSignalEffect } from "@preact/signals-react";

import { useRefObserve } from "./useRefObserve";

export const useValueRef = (initial?: string): [
  RefObject<HTMLInputElement>, Signal<string>
] => {
  const value = useSignal(initial ?? '');
  const ref = useRefObserve<HTMLInputElement>(
    (current) => {
      if (!current) return;
      current.value = value.peek();
      current.oninput = current.onchange = (
        () => {
          value.value = current.value;
        }
      );
    }
  );

  useSignalEffect(() => {
    const { current } = ref;
    if (!current) return;
    if (value.value !== current.value)
      current.value = value.value;
  });

  return [ref, value];
};