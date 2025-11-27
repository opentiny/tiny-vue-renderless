import {
  IconVersiontree,
  IconGrade,
  IconApp,
  IconText,
  IconEditorTable,
  IconSandwichCollapse,
  IconEditorCode,
  IconLanguage,
  IconApplication,
} from '@opentiny/vue-icon';

// icon图标
const iconAppNg = IconApp();
const iconVersiontreeNg = IconVersiontree();
const iconGradeNg = IconGrade();
const iconTextNg = IconText();
const iconEditorTableNg = IconEditorTable();
const iconSandwichCollapseNg = IconSandwichCollapse();
const iconEditorCodeNg = IconEditorCode();
const iconLanguageNg = IconLanguage();
const iconApplicationNg = IconApplication();

const ngProMenuIcon = [
  {
    value: '总览',
    icon: iconAppNg,
  },
  {
    value: '目录结构',
    icon: iconGradeNg,
  },
  {
    value: '路由与菜单',
    icon: iconVersiontreeNg,
  },
  {
    value: '新增页面',
    icon: iconTextNg,
  },
  {
    value: '布局',
    icon: iconEditorTableNg,
  },
  {
    value: '响应式 & 栅格',
    icon: iconSandwichCollapseNg,
  },
  {
    value: 'Mock数据',
    icon: iconEditorCodeNg,
  },
  {
    value: '国际化',
    icon: iconLanguageNg,
  },
  {
    value: '高级',
    icon: iconApplicationNg,
  },
  {
    value: '快速开始',
    icon: null,
    id: 'hwcStart',
  },
  {
    value: '云服务插件',
    icon: null,
    id: 'hwcPlugin',
  },
  {
    value: '云服务客户端库',
    icon: null,
    id: 'hwcClient',
  },
  {
    value: '云服务最佳实践',
    icon: null,
    id: 'hwcPractice',
  },
];
const ngProMenuIconUs = [
  {
    value: 'Overview',
    icon: iconAppNg,
  },
  {
    value: 'Directory Structure',
    icon: iconGradeNg,
  },
  {
    value: 'Routes and Menus',
    icon: iconVersiontreeNg,
  },
  {
    value: 'Add Page',
    icon: iconTextNg,
  },
  {
    value: 'Layout',
    icon: iconEditorTableNg,
  },
  {
    value: 'Responsive & Grid',
    icon: iconSandwichCollapseNg,
  },
  {
    value: 'Mock Data',
    icon: iconEditorCodeNg,
  },
  {
    value: 'Internationalization',
    icon: iconLanguageNg,
  },
  {
    value: 'Advanced',
    icon: iconApplicationNg,
  },
  {
    value: 'Quick Start',
    icon: null,
    id: 'hwcStart',
  },
  {
    value: 'Cloud Service Plug-ins',
    icon: null,
    id: 'hwcPlugin',
  },
  {
    value: 'Cloud Service Client Library',
    icon: null,
    id: 'hwcClient',
  },
  {
    value: 'Cloud Service Best Practices',
    icon: null,
    id: 'hwcPractice',
  },
];
const exportTinyNgIcon =
  localStorage.getItem('_lang') === 'enUS' ? ngProMenuIconUs : ngProMenuIcon;
export default exportTinyNgIcon;
