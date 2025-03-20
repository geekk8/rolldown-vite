import { defineConfig, rolldown } from 'rolldown'
import esbuild from 'rollup-plugin-esbuild'

const bundle = await rolldown({
  input: 'src/main.js',
})

export default defineConfig(
  {
    input: 'src/main.js',
    output: {
      format: 'esm',
      file: 'bundle.js',
    },
    treeshake: {
      moduleSideEffects: false
    },
    plugins: [
      esbuild({
        minify: true
      })
    ]
  },
)

await bundle.write({
  file: 'bundle.js',
})