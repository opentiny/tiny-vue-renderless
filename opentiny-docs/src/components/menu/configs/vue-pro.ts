import {
  IconVersiontree,
  IconGrade,
  IconText,
  IconEditorCode,
  IconLanguage,
  IconCustom,
  IconEditorTable,
  IconAssociation,
  IconLock,
  IconApplication,
  IconApp,
  IconPublish,
  IconDataSource,
  IconJs,
} from '@opentiny/vue-icon';

// icon图标
const iconApp = IconApp();
const iconVersiontree = IconVersiontree();
const iconGrade = IconGrade();
const iconText = IconText();
const iconEditorCode = IconEditorCode();
const iconLanguage = IconLanguage();
const iconCustom = IconCustom();
const iconEditorTable = IconEditorTable();
const iconAssociation = IconAssociation();
const iconLock = IconLock();
const iconApplication = IconApplication();
const iconPublish = IconPublish();
const iconDataSource = IconDataSource();
const iconJs = IconJs();

const vueProMenuIcon = [
  {
    value: '总览',
    icon: iconApp,
  },
  {
    value: '快速上手',
    icon: iconPublish,
  },
  {
    value: '后端指南',
    icon: iconDataSource,
  },
  {
    value: '前端指南',
    icon: iconJs,
  },
  {
    value: '目录结构',
    icon: iconGrade,
  },
  {
    value: '路由与菜单',
    icon: iconVersiontree,
  },
  {
    value: '新增页面',
    icon: iconText,
  },
  {
    value: '布局',
    icon: iconEditorTable,
  },
  {
    value: 'Mock数据',
    icon: iconEditorCode,
  },
  {
    value: '国际化',
    icon: iconLanguage,
  },
  {
    value: '个性化主题',
    icon: iconCustom,
  },
  {
    value: '状态管理',
    icon: iconAssociation,
  },
  {
    value: '权限控制',
    icon: iconLock,
  },
  {
    value: '高级',
    icon: iconApplication,
  },
  {
    value: '快速开始',
    icon: null,
    id: 'Quick',
  },
  {
    value: '云服务插件',
    icon: null,
    id: 'Plugin',
  },
  {
    value: '云服务客户端库',
    icon: null,
    id: 'Library',
  },
  {
    value: '云服务最佳实践',
    icon: null,
    id: 'Practiced',
  },
  {
    value: '后台管理',
    icon: null,
    id: 'BackEnd',
  },
];
const vueProMenuIconUs = [
  {
    value: 'Overview',
    icon: iconApp,
  },
  {
    value: 'Directory Structure',
    icon: iconGrade,
  },
  {
    value: 'Routes and Menus',
    icon: iconVersiontree,
  },
  {
    value: 'Add Page',
    icon: iconText,
  },
  {
    value: 'Layout',
    icon: iconEditorTable,
  },
  {
    value: 'Mock Data',
    icon: iconEditorCode,
  },
  {
    value: 'Internationalization',
    icon: iconLanguage,
  },
  {
    value: 'Personalized Themes',
    icon: iconCustom,
  },
  {
    value: 'Status Management',
    icon: iconAssociation,
  },
  {
    value: 'Permission Control',
    icon: iconLock,
  },
  {
    value: 'Advanced',
    icon: iconApplication,
  },
  {
    value: 'Quick Start',
    icon: null,
    id: 'Quick',
  },
  {
    value: 'Cloud Service Plug-ins',
    icon: null,
    id: 'Plugin',
  },
  {
    value: 'Cloud Service client Library',
    icon: null,
    id: 'Library',
  },
  {
    value: 'Cloud Service Best Practices',
    icon: null,
    id: 'Practiced',
  },
  {
    value: 'Background Management',
    icon: null,
    id: 'BackEnd',
  },
];

const exportTinyProIcon =
  localStorage.getItem('_lang') === 'enUS' ? vueProMenuIconUs : vueProMenuIcon;

export default exportTinyProIcon;
