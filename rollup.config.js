import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'index.js',
  external: ['jquery'],
  output: {
    name: "PE",
    file: 'dist/pageeditor.js',
    format: 'umd',
    globals: {
      jquery: '$'
    }
  },
  plugins: [ resolve() ]
}