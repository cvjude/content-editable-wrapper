import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import image from '@rollup/plugin-image';
import typescript from '@rollup/plugin-typescript';
import jsx from 'acorn-jsx';
import dts from 'rollup-plugin-dts';
import terser from '@rollup/plugin-terser';

export default [
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.js',
      // dir: 'dist',
      format: 'cjs',
      sourcemap: true,
    },
    acornInjectPlugins: [jsx()],
    external: [/\.stories$/],
    plugins: [
      nodeResolve(),
      typescript(),
      babel({
        exclude: 'node_modules/**',
        presets: ['@babel/preset-react', '@babel/preset-typescript'],
        babelHelpers: 'bundled',
      }),
      image(),
      external(),
      terser(),
      postcss({
        minimize: true,
        plugins: [],
      }),
    ],
  },
  {
    input: 'dist/index.d.ts',
    output: [
      {
        file: 'dist/index.d.ts',
        format: 'es',
        exports: 'named',
      },
    ],
    external: [/\.scss$/],
    plugins: [dts()],
  },
];
