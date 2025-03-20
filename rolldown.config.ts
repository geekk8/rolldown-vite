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
        miniSize:10000,
        groups: [
          {
            name:'vendor',
            test: /node_modules/,
            priority: 10,
          },
          {
            name: 'utils',
            test: /src\/utils\.js/,
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
