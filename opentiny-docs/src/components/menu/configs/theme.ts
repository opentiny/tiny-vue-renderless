import { IconApp, IconVuejs, IconAngularjs } from '@opentiny/vue-icon';

const iconVuejs = IconVuejs();
const iconAngularjs = IconAngularjs();
const iconAppTheme = IconApp();

const themeMenuIcon = [
  {
    value: '总览',
    icon: iconAppTheme,
  },
  {
    value: 'TinyNG 主题配置指导',
    icon: iconAngularjs,
  },
  {
    value: 'TinyVue 主题配置指导',
    icon: iconVuejs,
  },
];

export default themeMenuIcon;
