import { NextFunction, Request, Response } from "express";

export const makeEffect = (effect: (req: Request, res: Response) => ((dtime: number, time: number) => any) | undefined) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const out = effect(req, res) ?? (() => { });
    const time = performance.now();
    res.socket.once('close', () => {
      out?.(performance.now() - time, time);
    });
    next();
  };
};