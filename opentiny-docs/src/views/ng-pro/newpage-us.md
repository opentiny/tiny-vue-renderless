<h1 id='page'>Add a page</h1>

----

If you want to access a new page through the navigation bar, you can use this method. The main process of creating a page is to create the corresponding module in the `src/app/pages/` directory，
Then create the corresponding component in the module. If you need to create a common component in the component, create it in @shared/components.  
The following uses the **payment result page** as an example to describe the process of creating a page.

<h2 id='modal'>Creating a module</h2>

Create a module in `src/app/pages/`：

```bash
ng generate module result --route result --module pages.module
```

The `result.component.ts`, `result.module.ts`, `result-routing.module.ts` file is generated in `src/app/pages/result`，
Other files do not need to be retained.

In `result.module.ts`, add SharedModule and TProLayoutModule. The SharedModule contains the common components and modules that are used, the TProLayoutModule is a layout module. You can consider whether to add the TProLayoutModule

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

Add the following information to `result.component.ts`：

```ts
import { Component } from '@angular/core';

@Component({
  selector: 't-pro-result',
  template: '<router-outlet></router-outlet>',
})
export class ResultComponent {}
```

The `result-routing.module.ts` file can be modified after the component is created.

<h2 id='creatComponent'>Create a Component</h2>

Run the following command to create a component in the `result` folder：

```bash
ng generate component payment-success
```

The `payment-success.component.html` is generated in the directory which is `src/app/pages/result/payment-success`,
`payment-success.component.ts` file，change the content in the generated file to your own page.

In addition, you need to add the corresponding route to the `result-routing.module.ts`：

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

<h2 id='request'>Add route access</h2>

After the preceding steps are complete, you need to add the corresponding route access for the new page in the navigation bar.

In the `menu.ts` file, add the navigation related to the new page **payment result page**.

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

<h2 id='visible'>New page display</h2>

<h3 id='paymentResult'>Payment result page</h3>

Payment display prompt and recommendation information
👉<a href="/ng-pro/pages/result/success" target="_blank" rel="noopener noreferrer">[access now]</a>
![ng-result.png](/src/assets/images/ng-pro/ng-result.png)
