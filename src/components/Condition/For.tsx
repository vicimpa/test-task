import { ReactNode, useCallback } from "react";
import { fv, TFV } from "utils/fv";

export type TForProps<T, K extends any = number> = {
  collection: T[] | Set<T> | Map<K, T>;
  index?: TFV<string | number, [value: T, index: K]>;
  children?: TFV<ReactNode, [value: T, index: K]>;
};

export const For = <T extends any, K extends any = number>(
  {
    collection,
    children,
    index: calcIndex,
  }: TForProps<T, K>
) => {
  const Component = useCallback(
    ({ value, index }: { value: T, index: K; }) => (
      fv(children, value, index)
    ), []
  );

  if (collection instanceof Map) {
    return [...collection].map(([index, value], i) => (
      <Component
        value={value}
        index={index}
        key={fv(calcIndex, value, index) ?? i} />
    ));
  }

  if (collection instanceof Set) {
    return [...collection].map((value, index) => (
      <Component
        value={value}
        index={index as any}
        key={fv(calcIndex, value, index as any) ?? index} />
    ));
  }

  return collection.map((value, index) => (
    <Component
      value={value}
      index={index as any}
      key={fv(calcIndex, value, index as any) ?? index} />
  ));
};