import { useLayoutEffect, useMemo } from "react";
import { ReactiveSet } from "utils/ReactiveSet";

import { useRerender } from "./useRerender";

export const useReactiveSet = <T extends any>(init?: T[] | null) => {
  const rerender = useRerender();
  const memo = useMemo(() => new ReactiveSet<T>(init), []);
  useLayoutEffect(() => memo.subscribe(rerender), []);
  return memo;
};