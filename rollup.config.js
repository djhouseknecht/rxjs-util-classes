import typescript from 'rollup-plugin-typescript';
import pkg from './package.json';

const external = Object.keys(pkg.dependencies).concat('rxjs');

export default {
  input: 'src/index.ts',
  external,
  plugins: [
    typescript()
  ],
  output: [{ file: pkg.browser, format: 'es' }]
};
