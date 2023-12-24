import { defineConfig } from "vite";
import paths from "vite-tsconfig-paths";

import react from "@vitejs/plugin-react-swc";

import { PROXY_CONFIG } from "./config";
import { server } from "./server/server";

export default defineConfig({
  root: './src',
  base: './',
  publicDir: '../public',
  build: {
    outDir: '../dist'
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    proxy: PROXY_CONFIG
  },
  preview: {
    host: '127.0.0.1',
    port: 3000,
    proxy: PROXY_CONFIG
  },
  plugins: [
    react({ plugins: [] }),
    paths({ projects: ['../tsconfig.json'] }),
    server()
  ],
});
