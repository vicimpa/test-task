import { forwardRef, useMemo } from "react";
import { FRef } from "utils/FRef";

import { useSignal } from "@preact/signals-react";

import s from "./Button.module.sass";

export type TButtonProps = {

} & FRef<'button'>;

export const Button = forwardRef<HTMLButtonElement, TButtonProps>(
  (
    {
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const attempts = useSignal(0);
    const pos = useMemo(() => ({ x: 0, y: 0 }), []);

    return (
      <div
        className={s.button + ' ' + className}
        onMouseDown={(e) => {
          const { x, y } = e.currentTarget.getBoundingClientRect();
          attempts.value++;
          pos.x = e.clientX - x;
          pos.y = e.clientY - y;
        }}
      >
        <button
          ref={ref}
          {...props}
        >
          {children}
        </button>

        {attempts.value > 0 ? (
          <div key={attempts.value} style={{ top: pos.y + 'px', left: pos.x + 'px' }} className={s.click} />
        ) : null}
      </div>
    );
  }
);