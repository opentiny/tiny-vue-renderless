<h1 id='status'>Status Management</h1>

---

`TinyPro of Vue` introduces `Pinia` to the file in `src/store` to implement status management.

<h2 id='work'>Preparations</h2>

<h3 id='install'>Installation Dependency</h3>

```ts
npm install pinia -S
```

<h3 id='main'>Registration in main</h3>

```ts
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

<h3 id='store'>Creating Store</h3>

```ts
import { createPinia } from 'pinia';
import useAppStore from './modules/app';
import useUserStore from './modules/user';
import useTabBarStore from './modules/tab-bar';

const pinia = createPinia();

export { useAppStore, useUserStore, useTabBarStore };
export default pinia;
```

<h2 id='project'>Used in the project</h2>

<h3 id='inject'>Introduce your store to the usage page</h3>

```ts
 import { useAppStore } from '@/store';
 const appStore = useAppStore();
```

<h3 id='action'>Invoke the action method in store</h3>

```ts
appStore.updateSettings({ navbar: true, footer: true });
```
