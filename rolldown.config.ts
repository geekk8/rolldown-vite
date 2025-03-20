import { defineConfig, rolldown } from 'rolldown'
import { minify } from 'rollup-plugin-esbuild'

const bundle = await rolldown({
  input: 'src/main.js',
})

export default defineConfig(
  {
    input: 'src/main.js',
    output: {
      format: 'esm',
    },
    plugins: [
      minify({
        module: true,
        mangle:{},
        compress: {}
      })
    ]
  },
)

await bundle.write({
  file: 'bundle.js',
})