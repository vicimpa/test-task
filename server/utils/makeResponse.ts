import { NextFunction, Request, Response } from "express";

export const makeResponse = (handler: (req: Request, res: Response, next: NextFunction) => object | Promise<object>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve()
      .then(() => handler(req, res, next))
      .then(r => {
        r && res.send(r);

        if ('code' in r && typeof r['code'] === 'number')
          res.statusCode = r['code'];
      })
      .catch(next);
  };
};