import { BUILD_TYPES, CUR_BUILD_TYPE } from '../shared/const';

const demosAlias = {
  [BUILD_TYPES.INNER_DOCS]: '@opentiny/tinydoc-ng-tiny',
  [BUILD_TYPES.TINY_CLOUD]: '@opentiny/tinydoc-ng-tinycloud',
  [BUILD_TYPES.OPEN_DOCS]: '@opentiny/ng-tinydoc',
};

const alias = {
  '@demos': demosAlias[CUR_BUILD_TYPE],
  '@design': '@opentiny/tinydoc-design',
};

const dealModules = (target, alia) =>
  Object.keys(target).reduce((memo, item) => {
    memo[`${alia}${item.split(alias[alia])[1] || item}`] = target[item];
    return memo;
  }, {});

export const componentJsModules = import.meta.glob('@demos/app/*/webdoc/!(*-demos).js');

export const componentMdModules = import.meta.glob('@demos/app/*/webdoc/*.md');

export const demoModules = {
  ...dealModules(componentJsModules, '@demos'),
  ...dealModules(componentMdModules, '@demos'),
};
