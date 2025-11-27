import { computed } from 'vue';
import { docMenus as innerDocMenus, cmpMenus as innerCmpMenus } from '@opentiny/tinydoc-ng-tiny/webdoc/menus.js';
import { docMenus as openDocMenus, cmpMenus as openCmpMenus } from '@opentiny/ng-tinydoc/webdoc/menus.js';
import { docMenus as tinyCloudDocMenus, cmpMenus as tinyCloudCmpMenus } from '@opentiny/tinydoc-ng-tinycloud/webdoc/menus.js';

import { appData, $t2, getI18n, $t } from './tools';
import { BUILD_TYPES, CUR_BUILD_TYPE, VITE_CONTEXT_ENUM } from './shared/const';

const getTitle = page => `${page.name} ${$t2(page.nameCn, '')}`;
// 组件路由的前缀
const componentPrefix = 'components/';

const VITE_CONTEXT = import.meta.env.VITE_CONTEXT;

const getBasePath = () => location.href.split(VITE_CONTEXT)[0] || location.origin;

/**
 * 左边菜单 tab组件，如果是路由相同，则是路由跳转，否则浏览器跳转
 * @param {*} props
 * @param {*} param1
 * @returns
 */

const LinkTab = (props, { slots }) => {
  return props.to.indexOf(VITE_CONTEXT) === 0 ? (
    <router-link {...props}> {slots?.default()} </router-link>
  ) : (
    <a {...props} target="_self" href={`${getBasePath()}${props.to}`}>
      {slots?.default()}
    </a>
  );
};
// 生成所有的菜单
function getComponentMenus(docMenus, cmpMenus, baseContext) {
  const standaloneOptions = [
    {
      key: `${baseContext}overview`,
      label: () => (
        <LinkTab to={`${baseContext}overview`} title={$t('componentOverview')}>
          <span> {$t('componentOverview')} </span>
        </LinkTab>
      ),
    },
  ];

  const docOptions = docMenus.map(menu => ({
    ...menu,
    key: `${baseContext}${menu.key}`,
    children: menu.children.map(page => ({
      key: `${baseContext}docs/${page.key}`,
      searchKey: `${page.title}${page.titleEn || ''}`,
      label: () => (
        <LinkTab to={`${baseContext}docs/${page.key}`} title={page.title}>
          <span> {page.title} </span>
        </LinkTab>
      ),
    })),
  }));
  const cmpOptions = cmpMenus.map(menu => ({
    ...menu,
    key: `${baseContext}${menu.key}`,
    children: menu.children.map(page => ({
      key: `${baseContext}${componentPrefix}${page.key}`,
      searchKey: getTitle(page),
      label: () => (
        <LinkTab to={`${baseContext}${componentPrefix}${page.key}`} title={getTitle(page)}>
          <span>
            {page.name}
            {appData.lang === 'zhCN' && <span class="c-second f12 pl4"> {page.nameCn} </span>}
          </span>
        </LinkTab>
      ),
    })),
  }));
  return [...standaloneOptions, ...docOptions, ...cmpOptions];
}

const menusTitleObj = {
  [BUILD_TYPES.INNER_DOCS]: innerCmpMenus,
  [BUILD_TYPES.OPEN_DOCS]: openCmpMenus,
  [BUILD_TYPES.TINY_CLOUD]: tinyCloudCmpMenus,
}[CUR_BUILD_TYPE].reduce((obj, menu) => {
  menu?.children?.forEach?.(page => {
    if (page?.key) {
      obj[page.key] = getTitle(page);
    }
  });
  return obj;
}, Object.create(null));

// 获取组件菜单的标题
const getMenuTitleByCmpId = cmpId => (menusTitleObj[cmpId] || '').trim();

const genMenus = () =>
  computed(() => {
    return CUR_BUILD_TYPE === BUILD_TYPES.OPEN_DOCS
      ? getComponentMenus(openDocMenus, openCmpMenus, VITE_CONTEXT_ENUM.opendocs)
      : [
          {
            label: $t('consoleBaseComponent'),
            key: VITE_CONTEXT_ENUM.innerdocs,
            children: getComponentMenus(innerDocMenus, innerCmpMenus, VITE_CONTEXT_ENUM.innerdocs),
          },
          {
            label: $t('consoleBusinessComponent'),
            key: VITE_CONTEXT_ENUM.tinycloud,
            children: getComponentMenus(tinyCloudDocMenus, tinyCloudCmpMenus, VITE_CONTEXT_ENUM.tinycloud),
          },
        ];
  });

export { genMenus, getMenuTitleByCmpId };
