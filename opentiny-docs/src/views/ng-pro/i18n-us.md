<h1 id='internation'>Internationalization</h1> 

----

The `TinyPro of Ng` adds .ts files in different languages to the `src/assets/i18n` folder and introduces the `Angular` internationalization scheme `@ngx-translate/core` to implement internationalization functions.

<h2 id='installation'>Install</h2>

```bash
npm install @ngx-translate/core --save
npm install @ngx-translate/http-loader --save
```

<h2 id='contents'>Directory Structure</h2>

```bash
.
├── src/
│   └── assets/
│       │── i18n/
│       │    │── en-US/    (stores the English translation files of all modules)
│       │    │── zh-CN/    (stores the Chinese translation files of all modules)
│       │    │── en-US.ts
│       │    └── zh-CN.ts
```

<h2 id='code'>Add Internationalization Code</h2>

Modify the `Angular` application entry file `app.component.ts`.

```typescript
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TiLocale } from '@opentiny/ng';
import { DEFAULT_LANG, I18N_LANGUAGES } from '@config/tiny-pro';
@Component({
  selector: 't-pro-app',
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
  currentLang = localStorage.getItem('lang') || window.navigator.language.toLowerCase() || DEFAULT_LANG;

  constructor(private translate: TranslateService) {
    this.translate.addLangs(I18N_LANGUAGES);
    this.translate.setDefaultLang(DEFAULT_LANG);
    this.translate.use(this.currentLang);
    TiLocale.setLocale(this.currentLang === 'zh-cn' ? TiLocale.ZH_CN : TiLocale.EN_US);
  }
}
```

<h2 id='file'>Compiling an Internationalization File</h2>

Create a file corresponding to the module in the "zh-CN" folder.

```typescript
// console-home.ts
export default {
  consoleHome: {
    title: 'Console Home Page',
    ......
  }
} 
// service-overview.ts
export default {
  serviceOverview: {
    title: 'Service Overview Page',
    .....
  }
}
....
```

Import the corresponding file to the `zh-CN.ts` file:

```typescript
import serviceList from './zh-CN/service-list';
import serviceOverview from './zh-CN/service-overview';

export default {
  ...consoleHome,
  ...serviceOverview,
  .....
}
```

Similarly, create a module in the `en-US` folder and add the corresponding English translation to the `en-US.ts` file.
