import { NextFunction, Request, Response } from "express";
import { ValiError } from "valibot";

export const makeError = () => {

  return (error: any, _req: Request, res: Response, _next: NextFunction) => {
    if (error instanceof ValiError) {
      res.statusCode = 400;

      res.send({
        code: res.statusCode,
        message: error.message,
        reson: error.issues
      });

      return;
    }

    if ('message' in error)
      res.statusMessage = error.message;

    if (res.statusCode === 200)
      res.statusCode = 500;

    res.send({
      code: res.statusCode,
      message: error?.message ?? `${error}`
    });
  };
};