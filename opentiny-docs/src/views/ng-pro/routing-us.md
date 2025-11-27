<h1 id='menu'>Routes and Menus</h1>

---

Angular's router allows users to navigate from one view to another as they work with the application.

<h2 id='function'>Core Modules and Functions</h2>

- #### navigation  

  Configure it in `src/app/pages/menu.ts` according to your route.

- #### Route management

  - **1.primary route**   
    Set this parameter in `app-routing.module.ts`.

  - **2.page route**  
    Configure in `pages-routing.module.ts`.

  - **3.module route**  
    Configure them in their respective modules, for example, `result-routing.module.ts`.
    
<h2 id='导航'>navigation</h2>

Contents related to navigation can be modified in `src/app/pages/menu.ts`.
The `menu` data format is as follows：

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

`Note: add the corresponding modification to the internationalization file`

<h2 id='icon'>Use in Navigation<code>TinyNG</code>icons</h2>

> In `menu.ts`, enter the icon name of the `TinyNG`Icon component for the configuration item `menuIcon`. You can also use setPath to import external icons.<a href="/tiny-ng/components/icon" target="_blank" rel="noopener noreferrer">`Icon图标`</a>

<h2 id='router'>Route</h2>

Routes in the project are classified into main routes, page routes, and module routes. The detailed configuration is as follows：  
The configuration file of the main route is stored in `app-routing.module.ts`

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
  // You can add other paths here
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

The format of the configuration file `pages-routing.module.ts` for page routing is as follows：

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
      // You can add other paths here
      {
        path: '',
        redirectTo: 'console-home',
        pathMatch: 'prefix',
      },
    ],
  },
];
```

For details about the module route, see the `result-routing.module.ts` file

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
