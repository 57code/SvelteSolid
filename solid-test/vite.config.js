import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import solidLabels from 'babel-plugin-solid-labels';

export default defineConfig({
  plugins: [
    solidPlugin({
      babel: {
        plugins: [
          [solidLabels, { dev: process.env.NODE_ENV !== "production" }],
        ],
      },
    }),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
});
