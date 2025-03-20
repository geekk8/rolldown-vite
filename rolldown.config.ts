import { defineConfig } from 'rolldown'
import { minify } from 'rollup-plugin-esbuild'

export default defineConfig(
  {
    input: 'src/main.js',
    output: {
      dir: 'dist',
      format: 'esm',
      entryFileNames: '[name].[hash].js',
      chunkFileNames: 'chunks/[name].[hash].js',
      advancedChunks: {
        minSize:10, // 10kb(10000) 권장 크기
        groups: [
          {
            name:'vendor',
            test: /node_modules/,
            priority: 10,
          },
          {
            name: 'utils',
            test: /src\/utils/,
            priority: 5,
          }
        ]
      }
    },
    treeshake: {
      moduleSideEffects: false
    },
    plugins: [
      minify()
    ]
  }
)
