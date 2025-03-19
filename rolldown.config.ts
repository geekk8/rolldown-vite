import { defineConfig, rolldown } from 'rolldown'

const bundle = await rolldown({
  input: 'src/main.js',
})

export default defineConfig([
  {
    input: 'src/main.js',
    output: {
      format: 'esm',
    },
  },
  // {
  //   input: 'src/worker.js',
  //   output: {
  //     format: 'iife',
  //     dir: 'dist/worker'
  //   },
  // },
])

await bundle.write({
  file: 'bundle.js',
})