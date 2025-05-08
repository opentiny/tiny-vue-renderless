export const version = '4.0.0'

// 从 @vue/shared 借用基本函数
export {
  EMPTY_OBJ,
  EMPTY_ARR,
  NOOP,
  NO,
  isArray,
  isMap,
  isSet,
  isDate,
  isRegExp,
  isFunction,
  isString,
  isSymbol,
  isObject,
  isPromise,
  camelize, // 转驼峰
  hyphenate, // 转连字符
  capitalize, // 大写首字母
} from '@vue/shared'
/** 永远返回true */
export const OK = () => true

/** 是否为boolean */
export const isBoolean = (val: any) => typeof val === 'boolean'

export { applyClass, getTransitionInfo } from './src/cssHelper'
export { proxyData, transferData } from './src/dataHelper'
export { resolvePromise, callWithGuard } from './src/promiseHelper'
