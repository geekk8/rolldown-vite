import { defineConfig } from "rolldown";
export default defineConfig({
  input: "src/main.js",
  output: {
    dir: "dist",
    format: "esm",
    minify: true,
    entryFileNames: "[name].[hash].js",
    chunkFileNames: "chunks/[name].[hash].js",
    advancedChunks: {
      minSize: 10, // 10kb(10000) 권장 크기
      groups: [
        {
          name: "vendor",
          test: /node_modules/,
          priority: 10,
        },
        {
          name: "utils",
          test: /src\/utils/,
          priority: 5,
        },
        {
          name: "lodash-es",
          test: /src\/lodash-es/,
        },
      ],
    },
  },
  treeshake: {
    moduleSideEffects: true,
  },
});
