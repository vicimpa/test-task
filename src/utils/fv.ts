export type TFV<T, A extends any[] = []> = T | ((...args: A) => T);
export const fv = <T, A extends any[] = []>(t: TFV<T, A>, ...args: A) => (
  t instanceof Function ? t(...args) : t
);