// 当前的构建类型，用于区分 有 tinycloud: tinycloud组件库；opendocs: 外网tinyng组件库；innerdocs: 内网tinyng组件库
export const CUR_BUILD_TYPE = import.meta.env.VITE_BUILD_TYPE;

// 构建类型 枚举
export const BUILD_TYPES = {
  TINY_CLOUD: 'tinycloud', // 内网tinycloud组件库
  OPEN_DOCS: 'opendocs', // 外网tinyng组件库
  INNER_DOCS: 'innerdocs', // 内网tinyng组件库
};

export const VITE_CONTEXT_ENUM = {
  [BUILD_TYPES.TINY_CLOUD]: '/tiny-cloud/',
  [BUILD_TYPES.OPEN_DOCS]: '/tiny-ng/',
  [BUILD_TYPES.INNER_DOCS]: '/tiny-ng/',
};

export const VITE_CONTEXT = import.meta.env.VITE_CONTEXT;
