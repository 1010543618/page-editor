import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'index.js',
  external: ['jquery', 'urijs'],
  output: {
    name: "PE",
    file: 'dist/pageeditor.js',
    format: 'umd',
    globals: {
      jquery: '$',
      urijs: 'URI'
    }
  },
  plugins: [ resolve() ]
}