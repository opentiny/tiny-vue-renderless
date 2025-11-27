<h1 id='menu'>路由和菜单</h1>

---

在用户使用应用程序时，Angular 的路由器能让用户从一个视图导航到另一个视图。

<h2 id='function'>核心模块和功能</h2>

- #### 导航  

  在`src/app/pages/menu.ts`中根据你的路由进行配置。

- #### 路由管理

  - **1.主路由**   
    在`app-routing.module.ts`中进行配置。

  - **2.页面路由**  
    在`pages-routing.module.ts`中进行配置。

  - **3.模块路由**  
    在各自的模块中进行配置如`result-routing.module.ts`。
    
<h2 id='导航'>导航</h2>

导航的相关内容可以在`src/app/pages/menu.ts`中进行修改。
`menu`数据格式如下所示：

```ts
[
  {
    title: values['consoleHome'],
    router: ['./console-home'],
    menuIcon: 'home-outline'
  },
  {
    title: values['serviceOverview'],
    router: ['./service-overview'],
    menuIcon: 'laptop-outline'
  },
  {
    title: values['servicePurchase'],
    router: ['./service-purchase'],
    menuIcon: 'gift-outline'
  },
  {
    title: values['result']['title'],
    children: [
      {
        title: values['result']['success'],
        router: ['./result/success']
      },
      {
        title: values['result']['failure'],
        router: ['./result/failure']
      }
    ],
    menuIcon: 'bag-check-outline'
  },
  {
    title: values['nonSupportRegion'],
    router: ['./non-support-region'],
    menuIcon: 'information-circle-outline'
  },
  {
    title: values['serviceList']['title'],
    children: [
      {
        title: values['serviceList']['buckets'],
        router: ['./service-list/buckets']
      },
      {
        title: values['serviceList']['contracts'],
        router: ['./service-list/contracts']
      }
    ],
    menuIcon: 'cloud-outline'
  }
];
```

`注意：在国际化文件中补充对应的修改内容`

<h2 id='icon'>在导航中使用<code>TinyNG</code>的图标</h2>

> 在`menu.ts`中为配置项`menuIcon`传入`TinyNG`Icon 组件的对应图标名称即可, 也可通过 setPath 引入外部图标。<a href="/tiny-ng/components/icon" target="_blank" rel="noopener noreferrer">`Icon图标`</a>

<h2 id='router'>路由</h2>

项目中的路由分为主路由、页面路由和模块路由，详细配置如下：  
主路由的配置文件在`app-routing.module.ts`

```ts
const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'pages/login',
    component: LoginComponent,
  },
  {
    path: 'pages/register',
    component: RegisterComponent,
  },
  // 此处可继续补充其他路径
  {
    path: '',
    redirectTo: 'pages',
    pathMatch: 'prefix',
  },
  {
    path: '**',
    redirectTo: 'pages',
  },
];
```

页面路由的配置文件`pages-routing.module.ts`格式为：

```ts
const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'console-home',
        component: ConsoleHomeComponent,
      },
      {
        path: 'service-overview',
        component: ServiceOverviewComponent,
      },
      {
        path: 'service-purchase',
        component: ServicePurchaseComponent,
      },
      {
        path: 'service-list',
        loadChildren: () => import('./service-list/service-list.module').then((m) => m.ServiceListModule),
      },
      {
        path: 'result',
        loadChildren: () => import('./result/result.module').then((m) => m.ResultModule),
      },
      {
        path: 'non-support-region',
        component: NonSupportRegionComponent,
      },
      // 此处可继续补充其他路径
      {
        path: '',
        redirectTo: 'console-home',
        pathMatch: 'prefix',
      },
    ],
  },
];
```

模块路由可以参考`result-routing.module.ts`文件

```ts
const routes: Routes = [
  {
    path: '',
    component: ResultComponent,
    children: [
      { path: 'success', component: PaymentSuccessComponent },
      { path: 'failure', component: PaymentFailureComponent },
    ],
  },
];
```
