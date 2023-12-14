import { useMemo } from "react";

import { useSignal, useSignalEffect } from "@preact/signals-react";

import { useEvent } from "./useEvent";

export type TRefObserve<T extends Element> = (current: T | null) => any;

export const useRefObserve = <T extends Element>(observer: TRefObserve<T>) => {
  const refObserver = useEvent(observer);
  const current = useSignal<T | null>(null);

  useSignalEffect(() => {
    refObserver(current.value);
  });

  return useMemo(() => ({
    get current() {
      return current.peek();
    },
    set current(v) {
      current.value = v;
    }
  }), []);
};