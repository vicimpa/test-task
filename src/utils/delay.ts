export const delay = (n = 0) => (
  new Promise<void>(r => setTimeout(r, n))
);