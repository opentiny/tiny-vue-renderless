<h1 id='page'>新增页面</h1>

----

如果你想通过导航栏访问一个新页面，可通过此方法进行操作。新建页面的主要流程为在 `src/app/pages/`目录中创建对应模块，
然后在模块中创建对应的组件，如果组件中需创建公共组件，则在@shared/components 中创建。  
下面以新建**支付结果页**为例，介绍新建页面的流程。

<h2 id='modal'>创建模块</h2>

首先在`src/app/pages/`下新建一个模块：

```bash
ng generate module result --route result --module pages.module
```

此时会在`src/app/pages/result`目录下生成`result.component.ts`, `result.module.ts`, `result-routing.module.ts`文件，
其余文件可暂不保留。

在 `result.module.ts`中，添加 SharedModule 和 TProLayoutModule，SharedModule 中有使用到的公共组件和模块，
TProLayoutModule 为布局模块，可供考虑是否需要添加。

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule, TProLayoutModule } from '@shared/tiny-pro';
import { ResultRoutingModule } from './result-routing.module';
import { ResultComponent } from './result.component';

@NgModule({
  declarations: [ResultComponent],
  imports: [SharedModule, TProLayoutModule, CommonModule, ResultRoutingModule],
})
export class ResultModule {}
```

在 `result.component.ts`，添加如下内容：

```ts
import { Component } from '@angular/core';

@Component({
  selector: 't-pro-result',
  template: '<router-outlet></router-outlet>',
})
export class ResultComponent {}
```

`result-routing.module.ts`文件可等组件创建后再进行修改配置。

<h2 id='creatComponent'>创建组件</h2>

使用如下命令在`result`文件夹下创建组件：

```bash
ng generate component payment-success
```

此时会在`src/app/pages/result/payment-success`目录下生成`payment-success.component.html`, `payment-success.component.scss`,
`payment-success.component.ts`文件，在生成的文件中修改内容为自己的页面。

此外需要在`result-routing.module.ts`中加入对应的路由：

```ts
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ResultComponent } from './result.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';

const routes: Routes = [
  {
    path: '',
    component: ResultComponent,
    children: [{ path: 'success', component: PaymentSuccessComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResultRoutingModule {}
```

<h2 id='request'>增加路由访问</h2>

以上步骤完成后，需要为新增的页面在导航栏中添加对应的路由访问。

在文件 `menu.ts` 中，添加新增页面**支付结果页**相关的导航。

```ts
return [
  ...,
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
];
```

<h2 id='visible'>新增页面展示</h2>

<h3 id='paymentResult'>支付结果页</h3>

支付结果显示提示及推荐信息
👉<a href="/ng-pro/pages/result/success" target="_blank" rel="noopener noreferrer">[立即访问]</a>
![ng-result.png](/src/assets/images/ng-pro/ng-result.png)
