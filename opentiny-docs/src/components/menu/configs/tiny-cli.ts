import {
  IconApp,
  IconSetting,
  IconHelpQuery,
  IconLink,
  IconFiletext,
  IconPushpin,
  IconEditorBackground,
  IconEyeopen,
  IconCustom,
  IconCourse,
} from '@opentiny/vue-icon';

const iconAppCli = IconApp();
const IconSettingCli = IconSetting();
const IconHelpQueryCli = IconHelpQuery();
const IconLinkCli = IconLink();
const IconFiletextCli = IconFiletext();
const IconPushpinCli = IconPushpin();
const IconEditorBackgroundCli = IconEditorBackground();
const IconEyeopenCli = IconEyeopen();
const IconCustomCli = IconCustom();
const IconCourseCli = IconCourse();

const tinyCliMenuIcon = [
  {
    value: '关于',
    icon: iconAppCli,
  },
  {
    value: '快速上手',
    icon: IconCourseCli,
  },
  {
    value: '配置',
    icon: IconSettingCli,
  },
  {
    value: '指南',
    icon: IconEyeopenCli,
  },
  {
    value: '基础命令',
    icon: null,
    id: 'command',
  },
  {
    value: '依赖安装',
    icon: null,
    id: 'install',
  },
  {
    value: '自动安装与升级',
    icon: null,
    id: 'update',
  },
  {
    value: '任务流',
    icon: null,
    id: 'task',
  },
  {
    value: '使用套件',
    icon: null,
    id: 'use-toolkit',
  },
  {
    value: '使用插件',
    icon: null,
    id: 'use-plugin',
  },
  {
    value: '套件',
    icon: IconCustomCli,
  },
  {
    value: '套件列表',
    icon: null,
    id: 'lists',
  },
  {
    value: 'Dev套件',
    icon: null,
    id: 'dev',
  },
  {
    value: 'Pro套件',
    icon: null,
    id: 'dev',
  },
  {
    value: 'Docs套件',
    icon: null,
    id: 'docs',
  },
  {
    value: '插件',
    icon: IconPushpinCli,
  },
  {
    value: '插件列表',
    icon: null,
    id: 'list',
  },
  {
    value: 'Link插件',
    icon: null,
    id: 'link',
  },
  {
    value: 'HWC插件',
    icon: null,
    id: 'hwc',
  },
  {
    value: 'Lint插件',
    icon: null,
    id: 'lint',
  },
  {
    value: '开发者文档',
    icon: IconFiletextCli,
  },
  {
    value: '插件开发指导',
    icon: null,
    id: 'plugin',
  },
  {
    value: '套件开发指导',
    icon: null,
    id: 'toolkit',
  },
  {
    value: 'API列表',
    icon: null,
    id: 'api',
  },
  {
    value: '参与贡献',
    icon: IconEditorBackgroundCli,
  },
  {
    value: '相关产品',
    icon: IconLinkCli,
  },
  {
    value: 'FAQ',
    icon: IconHelpQueryCli,
  },
];
const tinyCliMenuIconUs = [
  {
    value: 'About',
    icon: iconAppCli,
  },
  {
    value: 'Get Started Quickly',
    icon: IconCourseCli,
  },
  {
    value: 'Configure',
    icon: IconSettingCli,
  },
  {
    value: 'Guides',
    icon: IconEyeopenCli,
  },
  {
    value: 'Basic Commands',
    icon: null,
    id: 'command',
  },
  {
    value: 'Dependent Installation',
    icon: null,
    id: 'install',
  },
  {
    value: 'Installation And Upgrade',
    icon: null,
    id: 'update',
  },
  {
    value: 'Task Flows',
    icon: null,
    id: 'task',
  },
  {
    value: 'Use Kits',
    icon: null,
    id: 'use-toolkit',
  },
  {
    value: 'Using Plug-ins',
    icon: null,
    id: 'use-plugin',
  },
  {
    value: 'Kit',
    icon: IconCustomCli,
  },
  {
    value: 'Kit List',
    icon: null,
    id: 'lists',
  },
  {
    value: 'Dev Suite',
    icon: null,
    id: 'dev',
  },
  {
    value: 'Pro Kit',
    icon: null,
    id: 'dev',
  },
  {
    value: 'Docs Kit',
    icon: null,
    id: 'docs',
  },
  {
    value: 'Plugin',
    icon: IconPushpinCli,
  },
  {
    value: 'Plugin-List',
    icon: null,
    id: 'list',
  },
  {
    value: 'Link Plug-in',
    icon: null,
    id: 'link',
  },
  {
    value: 'HWC Plug-in',
    icon: null,
    id: 'hwc',
  },
  {
    value: 'Lint Plug-in',
    icon: null,
    id: 'lint',
  },
  {
    value: 'Developer Docs',
    icon: IconFiletextCli,
  },
  {
    value: 'Plug-in Development Guide',
    icon: null,
    id: 'plugin',
  },
  {
    value: 'Suite Development Guide',
    icon: null,
    id: 'toolkit',
  },
  {
    value: 'API List',
    icon: null,
    id: 'api',
  },
  {
    value: 'Involve Literature',
    icon: IconEditorBackgroundCli,
  },
  {
    value: 'Related Products',
    icon: IconLinkCli,
  },
  {
    value: 'FAQ',
    icon: IconHelpQueryCli,
  },
];
const exportTinyCliIcon =
  localStorage.getItem('_lang') === 'enUS' ? tinyCliMenuIconUs : tinyCliMenuIcon;

export default exportTinyCliIcon;
