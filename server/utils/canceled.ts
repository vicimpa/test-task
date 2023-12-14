const CANCEL_MAP = new Map<string, () => any>();

export class CancelError extends Error {
  constructor() {
    super('Cancel Error');
  }
}

export const canceled = <T>(id: string, task: () => T | Promise<T>) => {
  CANCEL_MAP.get(id)?.();

  return new Promise<T>((resolve, reject) => {
    CANCEL_MAP.set(id, () => {
      reject(new CancelError());
    });

    Promise.resolve()
      .then(task)
      .then(resolve)
      .catch(reject);
  });
};