<h1 id='internation'>Internationalization</h1> 

---
The `TinyPro of Vue` adds .ts files of different languages to the `src/locale` folder and introduces the internationalization scheme `vue-i18n` of `Vue` to implement internationalization functions.


<h2 id='installation'>Installed</h2>

```bash
npm install vue-i18n --save
```

<h2 id='contents'>Directory structure</h2>

```bash
.
├── src/
│   └── locale/
│       │    │── en-US/    (Stores the English translation files of all modules)
│       │    │── zh-CN/    (Stores the Chinese translation files of all modules)
│       │    │── en-US.ts
│       │    └── zh-CN.ts
```

<h2 id='code'>Add internationalization code</h2>

Modify the entry file `main.ts` of the `Vue` application.

```typescript
import { createApp } from 'vue';
import globalComponents from '@/components';
import router from './router';
import store from './store';
import i18n from './locale';
import directive from './directive';
import { setupProdMockServer } from './mockProdServer';
import './mock';
import App from './App.vue';
import '@/api/interceptor';
import '@/assets/style/global.less';

setupProdMockServer();

const app = createApp(App);

app.use(router);
app.use(store);
app.use(i18n({ locale: 'zhCN' }));
app.use(globalComponents);
app.use(directive);

app.mount('#app');
```

Add the switch internationalization logic file && import of the internationalization file, and apply the entry file `locale/index.ts`.

```typescript
import { createI18n } from 'vue-i18n';
import locale from '@opentiny/vue-locale'; // Internationalization of tiny-vue
import en from './en-US';
import cn from './zh-CN';

export const LOCALE_OPTIONS = [
  { label: 'Chinese', value: 'zhCN' },
  { label: 'English', value: 'enUS' },
];

const i18nmode = (option: any) => {
  option.legacy = false;
  return createI18n(option);
};

export default (i18n: any) =>
  locale.initI18n({
    globalInjection: true,
    i18n,
    createI18n: i18nmode,
    messages: {
      enUS: en,
      zhCN: cn,
    },
  });
```

<h2 id='file'>Compiling an internationalization file</h2>

Create a file corresponding to the module in the "zh-CN" folder.

```typescript
export default {
  'settings.title': '页面配置',
  'settings.themeColor': '主题色',
  'settings.content': '内容区域',
  'settings.search': '搜索',
  'settings.language': '语言',
  'settings.navbar': '导航栏',
  'settings.menuWidth': '菜单宽度 (px)',
  'settings.navbar.alerts': '消息通知',
  'settings.navbar.help': '帮助中心',
  'settings.menu': '菜单栏',
  'settings.tabBar': '多页签',
  'settings.footer': '底部',
  'settings.otherSettings': '其他设置',
  'settings.colorWeek': '主题配置',
  'settings.alertContent':
    '配置之后仅是临时生效，要想真正作用于项目，点击下方的 "复制配置" 按钮，将配置替换到 settings.json 中即可。',
  'settings.copySettings': '复制配置',
  'settings.copySettings.message':
    '复制成功，请粘贴到 src/settings.json 文件中',
  'settings.close': '关闭',
  'settings.color.tooltip':
    '根据主题颜色生成的 10 个梯度色（将配置复制到项目中，主题色才能对亮色 / 暗黑模式同时生效）',
  'setting.user.set': '用户设置',
  'setting.loginout': '登出成功',
};

....
```

Import the corresponding file to the `zh-CN.ts` file:

```typescript
import localeLogin from '@/views/login/locale/zh-CN';
import localeTheme from '@/components/theme/locale/zh-CN';


export default {
  ...localeTheme,
  ...localeLogin,
};

```

Similarly, create a module in the `en-US` folder and add the corresponding English translation to the `en-US.ts` file.
