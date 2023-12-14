import { Plugin, PreviewServer } from "vite";

import { start, stop } from "./app";

const serverHook = (server: PreviewServer['httpServer']) => {
  server.on('listening', () => start());
  server.on('close', () => stop());
};

export const server = (): Plugin => {
  return {
    name: 'BackEnd Server',
    configureServer({ httpServer }) {
      if (!httpServer)
        return;

      serverHook(httpServer);
    },
    configurePreviewServer({ httpServer }) {
      if (!httpServer)
        return;

      serverHook(httpServer);
    }
  } as Plugin;
};