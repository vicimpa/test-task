import { afterRun } from "./afterRun";

export class ReactiveSet<T> extends Set<T> {
  #subs = new Set<(v: this) => any>();

  #update() {
    for (const sub of this.#subs)
      sub(this);
  }

  subscribe(listener: (v: this) => any) {
    return (
      this.#subs.add(listener),
      () => { this.#subs.delete(listener); }
    );
  }

  add(value: T): this {
    return afterRun(
      () => super.add(value),
      () => this.#update()
    );
  }

  delete(value: T): boolean {
    return afterRun(
      () => super.delete(value),
      () => this.#update()
    );
  }

  clear(): void {
    return afterRun(
      () => super.clear(),
      () => this.#update()
    );
  }
}