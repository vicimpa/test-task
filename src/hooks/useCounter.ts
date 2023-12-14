import { useId, useRef } from "react";

export const useCounter = () => {
  const id = useId();
  const ref = useRef(0);
  return () => id + '_' + (ref.current++);
};