export const afterRun = <T extends any>(func: () => T, after: () => any) => {
  const result = func();
  after();
  return result;
};