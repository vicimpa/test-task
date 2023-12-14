import { createLogger } from "vite";

import { makeEffect } from "./makeEffect";

export const makeLogger = () => {
  const logger = createLogger();

  return makeEffect((req, res) => {
    const { method, url } = req;
    logger.info(`${url} > [${method}]`);

    return (dtime) => {
      const { statusMessage, statusCode } = res;
      logger.info(`${url} < [${method}] ${statusMessage} ${statusCode} ${dtime}ms`);
    };
  });
};