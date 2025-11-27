import { createApp } from 'vue';
import { createHead } from '@vueuse/head';
// markdown文件内代码高亮
import 'prismjs/themes/prism.css';
// 只显示markdown亮色主题
import 'github-markdown-css/github-markdown-light.css';
// 覆盖默认的github markdown样式
import './assets/style/custom-markdown.css';
import './assets/style/custom-block.less';
import i18n from './locale';
import router from './router';
import App from './App.vue';

const app = createApp(App);
const head = createHead();

app.use(head);
app.use(router);
app.use(i18n({ locale: 'zh_CN' }));

app.mount('#app');
