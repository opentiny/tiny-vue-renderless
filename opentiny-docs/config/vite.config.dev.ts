import { mergeConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import baseConfig from './vite.config.base';

export default mergeConfig(
  {
    mode: 'development',
    server: {
      open: true,
      fs: {
        strict: true,
      },
    },
    plugins: [
      eslint({
        include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue', 'src/**/*.md'],
        exclude: ['node_modules'],
      }),
    ],
  },
  baseConfig
);
