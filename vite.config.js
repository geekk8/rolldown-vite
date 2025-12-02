import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: resolve(import.meta.dirname, "src/main.js"),
      output: {
        manualChunks: {
          vendor: ["lodash-es"],
          utils: ["/src/utils"],
        },
      },
    },
  },
});
