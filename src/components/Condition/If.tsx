import { ReactNode } from "react";

export type TIfProps = {
  condition?: any;
  else?: ReactNode | null;
  children?: ReactNode;
};

export const If = ({
  condition,
  children,
  else: elseChildren = null
}: TIfProps
) => {
  if (!condition)
    return elseChildren;

  return children;
};