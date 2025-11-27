import { $split } from '@/tools/utils';

export const baseStyleComponents = Object.keys({}).reduce((memo, key) => {
  memo[$split(key, '/cloud-design/base-styles/', -1)] = baseStyleMds[key].default;
  return memo;
}, {});

export const baseStyleInfo = Object.keys({}).reduce((memo, key) => {
  memo[$split(key, '/cloud-design/base-styles/', -1)] = baseStyleJs[key].default;
  return memo;
}, {});
