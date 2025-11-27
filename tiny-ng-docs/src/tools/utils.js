import { $t2 } from '@/i18n/index';
import { demoModules } from './demo-modules';
import { isCustomScroll } from '../shared/store';
const baseUrl = import.meta.env.BASE_URL;

/**
 * json clone， 会丢失函数等。
 * @param obj 普通对象或reactive对象
 */
const $clone = target => JSON.parse(JSON.stringify(target));

/**
 * 将目标字段分隔后，取相应位置的值
 * @example $split("/project/home","/",-1)   //取出home
 * @param target 目标字符串
 * @param splitor 分隔符
 * @param pos 取数位置，可为-1,-2
 */
const $split = (target, splitor = '/', pos = 0) => target.split(splitor).slice(pos)[0];

/**
 * 延时函数
 * @example $delay(300).then(()=>{   })
 */
const $delay = time => new Promise(resolve => setTimeout(resolve, time));

/**
 * 空闲函数
 * @example $idle().then(()=>{   })
 */
const $idle = () => new Promise(resolve => (window.requestIdleCallback || window.requestAnimationFrame)(resolve));

const $pub = url => {
  return baseUrl + url;
};

// 从 https:// 获取 utf-8 文件
const fetchFile = path =>
  fetch(path, {
    method: 'GET',
    headers: {
      'Content-Type': 'text/plain;charset=UTF-8',
    },
  }).then(res => {
    if (res.ok) {
      return res.text();
    } else {
      throw new Error(res.statusText);
    }
  });

/**
 * 获取i18n字段，用来兼容此项目的各种规范
 * 符合以下3种规范
 *  1. { title: { 'zh-CN': '标题', 'en-US': 'title' } } 'title'
 *  2. { 'zh-CN': '标题', 'en-US': 'title' }
 *  3. { title: '标题', titleEn: 'title' }  'title'
 * @param {object} obj
 * @param {string} field
 * @returns {string} 文本内容
 */
const getI18n = (obj, field) => {
  const isObj = x => x && typeof x === 'object';
  if (!isObj(obj)) {
    return obj;
  }
  const zhCnLangKey = $t2('zh-CN', 'en-US');
  if (!field) {
    return obj[zhCnLangKey] || obj['zh-CN'];
  }
  const zhLangKey = $t2('', 'En');
  const value = obj[field];
  if (typeof value === 'string') {
    return obj[`${field}${zhLangKey}`] || value;
  }
  if (!isObj(value)) {
    return value;
  }
  return value[zhCnLangKey] || value['zh-CN'];
};

/**
 * fetch组件库示例静态文件，包括markdown、示例源码和示例配置
 * @param {string} path
 * @returns
 */
const fetchDemosFile = path => fetchFile(baseUrl + path);

const getDemoModule = async path => {
  const demoModule = demoModules[path];
  if (demoModule) {
    const result = await demoModule();
    return result.default;
  }
  return null;
};

const hasDemoModule = path => Object.prototype.hasOwnProperty.call(demoModules, path);

const debounce = (fn, delay) => {
  let timer = null;
  return function debounced(...args) {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay);
  };
};

const throttle = (fn, delay) => {
  let timer = null;
  return function throttled(...args) {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
      }, delay);
      return fn.apply(this, args);
    }
    return null;
  };
};

const scrollSmooth = async (scrollContainer, scrollTop, scrollTime = 200) => {
  isCustomScroll.value = true;
  try {
    if (scrollContainer) {
      const getTargetScrollTop = () => (typeof scrollTop === 'function' ? scrollTop() : scrollTop);
      scrollContainer.style.scrollBehavior = 'auto';
      const changedScrollTop = getTargetScrollTop();
      const containerScrollTop = scrollContainer?.scrollTop;
      const scrollStart = Date.now();
      let consumedTime = 0;
      // 200ms内滚动至目标位置
      while (consumedTime < scrollTime) {
        scrollContainer.scrollTop =
          containerScrollTop + (consumedTime / scrollTime) * (changedScrollTop - containerScrollTop);
        await new Promise(r => requestAnimationFrame(() => r()));
        consumedTime = Date.now() - scrollStart;
      }
      scrollContainer.scrollTop = getTargetScrollTop();
      scrollContainer.style.scrollBehavior = '';
    }
  } finally {
    isCustomScroll.value = false;
  }
};

export {
  $clone,
  $split,
  $delay,
  $idle,
  $pub,
  fetchDemosFile,
  fetchFile,
  getI18n,
  getDemoModule,
  hasDemoModule,
  debounce,
  throttle,
  scrollSmooth,
};
