import type { CommonServerOptions } from "vite";

export const SERVER_PORT = 3001;
export const SERVER_HOST = '127.0.0.1';
export const BASE_ROUTE = '/api';
export const PROXY_CONFIG = {
  [BASE_ROUTE]: `http://${SERVER_HOST}:${SERVER_PORT}/`,
} as CommonServerOptions['proxy'];