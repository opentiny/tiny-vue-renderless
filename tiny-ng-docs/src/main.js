import { createHead } from '@unhead/vue';

import { createApp } from 'vue';
import '@unocss/reset/eric-meyer.css';

// markdown文件内代码高亮
import 'prismjs/themes/prism.css';
import 'uno.css';

// 只显示markdown亮色主题
import 'github-markdown-css/github-markdown-light.css';
import '@style.css';
import './assets/index.less';

// 覆盖默认的github markdown样式
import './assets/custom-markdown.css';
import './assets/custom-block.less';
import { i18n } from './i18n/index';
import { router } from './router';
import App from './App.vue';
import { $t, $t2 } from './i18n';
import { $pub } from './tools';
import Tabs from '@opentiny/vue-tabs';
import TabsItem from '@opentiny/vue-tab-item';
let app = createApp(App);
app.config.performance = true;

app.component('tiny-tabs', Tabs).component('tiny-tab-item', TabsItem);

app
  .use(router)
  .use(i18n)
  .use(createHead()) // 支持md修改title
  .mixin({ methods: { $t, $t2, $pub } })
  .mount('#app');
