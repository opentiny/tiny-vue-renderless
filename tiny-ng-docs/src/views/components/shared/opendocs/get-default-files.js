import { getRelativePath, getRouterModuleTs, getNgProjectDefaultFiles } from '..';

const BASE_URL = import.meta.env.BASE_URL;

// 获取 main.ts文件
export const getMainTs = config => {
  return `import "./polyfills";
import "./global.types";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app/app.module";

const throwErrorSync = (e: any) => {
  throw e;
};

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then((ref) => {
    // Ensure Angular destroys itself on hot reloads.
    window.ngRef?.destroy();
    // @ts-ignore
    window.ngRef = ref;
  })
  .catch(throwErrorSync);`;
};

const getImportPaths = componentFiles => {
  const importPaths = [];

  const allKeys = new Set();
  // 获取名字，如果名字重复了，则 在原来的名字再 +1 -> +N
  const getName = (name, addCount = 0) => {
    const target = `${name}${addCount || ''}`;
    return allKeys.has(target) ? getName(name, addCount + 1) : allKeys.add(target) && target;
  };

  componentFiles.forEach(comFile => {
    importPaths.push({
      path: getRelativePath('src/app/app.module.ts', comFile.writePath).replace(/\.[jt]s$/, ''),
      componentKeys: comFile.componentKeys.map(componentKey => ({ name: componentKey, rename: getName(componentKey) })),
    });
  });

  return {
    importPaths,
    allKeys: [...allKeys],
  };
};

// app.module.ts文件中前面导入语句的内容，函数超大了，拆分出来
const getAppModuleImportStr = config => `import { NgModule${config.isStackblitz ? '' : ', ɵresetCompiledComponents'} } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientJsonpModule, HttpClientModule } from "@angular/common/http";
import { ScrollingModule } from "@angular/cdk/scrolling";`;

// 获取 app.module.ts文件
export const getAppModuleTs = config => {
  const { appComponentName, componentFiles, moduleNames } = config;
  const { importPaths, allKeys } = getImportPaths(componentFiles);

  return `${getAppModuleImportStr(config)}
import { TiSvgComponent${moduleNames.map(item => `, ${item}`).join('')} } from "@opentiny/ng";

import { RootRouterModule } from './router.module';
${importPaths
  .map(
    ({ path, componentKeys }) =>
      `import { ${componentKeys.map(({ name, rename }) => (name === rename ? name : `${name} as ${rename}`)).join(', ')} } from "${path}";`
  )
  .join('\n')}
${
  config.isStackblitz
    ? ''
    : `
// reset compiled components to fix the error in codeSandbox: Type XXXComponent is part of the declarations of 2 modules: AppModule and AppModule!
ɵresetCompiledComponents();`
}

@NgModule({
  imports: [
    RootRouterModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ScrollingModule,
${moduleNames.map(item => `    ${item}`).join(',\n')}
  ],
  declarations: [
${allKeys.map(item => `    ${item}`).join(',\n')}
  ],
  bootstrap: [${appComponentName}],
  providers: []
})
export class AppModule {
  constructor() {
    TiSvgComponent?.setPath?.("${config.ICON_PATH}");
    // set the url of image
    window.DEPLOY_URL = "${BASE_URL}";
    window.PUBLIC_URL = "";
  }
}`;
};

// 切割标题，目前发现 codeSandbox标题过长时会打不开
const substringTitle = title => {
  // 最大长度
  const maxLength = 40;
  return title.substring(0, maxLength);
};

const packageJson = {
  private: true,
  version: '1.0.0',
  scripts: {
    build: 'ng build',
    start: 'ng serve',
  },
  dependencies: {
    '@angular/core': '^15.1.2',
    '@angular/common': '^15.1.2',
    '@angular/forms': '^15.1.2',
    '@angular/animations': '^15.1.2',
    '@angular/compiler': '^15.1.2',
    '@angular/platform-browser': '^15.1.2',
    '@angular/platform-browser-dynamic': '^15.1.2',
    '@angular/router': '^15.1.2',
    'reflect-metadata': '^0.1.13',
    '@angular/cdk': '^15.1.2',
    '@angular/elements': '^15.1.2',
    rxjs: '^7.8.0',
    tslib: '^2.5.0',
    xlsx: '^0.18.5',
    'zone.js': '^0.12.0',
    color: '^4.2.3',
    'libphonenumber-js': '^1.10.36',
    '@opentiny/ng': '^1.0.0',
    '@opentiny/ng-outline': '^1.0.0',
    '@opentiny/ng-accordion': '^1.0.0',
    '@opentiny/ng-actionmenu': '^1.0.0',
    '@opentiny/ng-alert': '^1.0.0',
    '@opentiny/ng-anchor': '^1.0.0',
    '@opentiny/ng-autocomplete': '^1.0.0',
    '@opentiny/ng-avatar': '^1.0.0',
    '@opentiny/ng-base': '^1.0.0',
    '@opentiny/ng-button': '^1.0.0',
    '@opentiny/ng-buttongroup': '^1.0.0',
    '@opentiny/ng-card': '^1.0.0',
    '@opentiny/ng-cascader': '^1.0.0',
    '@opentiny/ng-checkbox': '^1.0.0',
    '@opentiny/ng-collapse': '^1.0.0',
    '@opentiny/ng-collapsebox': '^1.0.0',
    '@opentiny/ng-collapsebutton': '^1.0.0',
    '@opentiny/ng-copy': '^1.0.0',
    '@opentiny/ng-crumb': '^1.0.0',
    '@opentiny/ng-date': '^1.0.0',
    '@opentiny/ng-datebase': '^1.0.0',
    '@opentiny/ng-datedominator': '^1.0.0',
    '@opentiny/ng-dateedit': '^1.0.0',
    '@opentiny/ng-datepanel': '^1.0.0',
    '@opentiny/ng-daterange': '^1.0.0',
    '@opentiny/ng-datetime': '^1.0.0',
    '@opentiny/ng-datetimerange': '^1.0.0',
    '@opentiny/ng-dominator': '^1.0.0',
    '@opentiny/ng-drag': '^1.0.0',
    '@opentiny/ng-drop': '^1.0.0',
    '@opentiny/ng-droplist': '^1.0.0',
    '@opentiny/ng-dropsearch': '^1.0.0',
    '@opentiny/ng-formfield': '^1.0.0',
    '@opentiny/ng-foldtext': '^1.0.0',
    '@opentiny/ng-grid': '^1.0.0',
    '@opentiny/ng-halfmodal': '^1.0.0',
    '@opentiny/ng-icon': '^1.0.0',
    '@opentiny/ng-iconaction': '^1.0.0',
    '@opentiny/ng-imagepreview': '^1.0.0',
    '@opentiny/ng-include': '^1.0.0',
    '@opentiny/ng-inputnumber': '^1.0.0',
    '@opentiny/ng-intro': '^1.0.0',
    '@opentiny/ng-ip': '^1.0.0',
    '@opentiny/ng-ipsection': '^1.0.0',
    '@opentiny/ng-layout': '^1.0.0',
    '@opentiny/ng-leftmenu': '^1.0.0',
    '@opentiny/ng-leftmenuthin': '^1.0.0',
    '@opentiny/ng-list': '^1.0.0',
    '@opentiny/ng-loading': '^1.0.0',
    '@opentiny/ng-locale': '^1.0.0',
    '@opentiny/ng-linkbutton': '^1.0.0',
    '@opentiny/ng-menu': '^1.0.0',
    '@opentiny/ng-message': '^1.0.0',
    '@opentiny/ng-modal': '^1.0.0',
    '@opentiny/ng-nav': '^1.0.0',
    '@opentiny/ng-notification': '^1.0.0',
    '@opentiny/ng-overflow': '^1.0.0',
    '@opentiny/ng-pagination': '^1.0.0',
    '@opentiny/ng-popconfirm': '^1.0.0',
    '@opentiny/ng-popup': '^1.0.0',
    '@opentiny/ng-progressbar': '^1.0.0',
    '@opentiny/ng-progresspie': '^1.0.0',
    '@opentiny/ng-radio': '^1.0.0',
    '@opentiny/ng-rate': '^1.0.0',
    '@opentiny/ng-renderer': '^1.0.0',
    '@opentiny/ng-rights': '^1.0.0',
    '@opentiny/ng-score': '^1.0.0',
    '@opentiny/ng-scroll': '^1.0.0',
    '@opentiny/ng-searchbox': '^1.0.0',
    '@opentiny/ng-select': '^1.0.0',
    '@opentiny/ng-skeleton': '^1.0.0',
    '@opentiny/ng-slider': '^1.0.0',
    '@opentiny/ng-spinner': '^1.0.0',
    '@opentiny/ng-steps': '^1.0.0',
    '@opentiny/ng-subtitle': '^1.0.0',
    '@opentiny/ng-swiper': '^1.0.0',
    '@opentiny/ng-switch': '^1.0.0',
    '@opentiny/ng-tab': '^1.0.0',
    '@opentiny/ng-table': '^1.0.0',
    '@opentiny/ng-tag': '^1.0.0',
    '@opentiny/ng-tagsinput': '^1.0.0',
    '@opentiny/ng-text': '^1.0.0',
    '@opentiny/ng-textarea': '^1.0.0',
    '@opentiny/ng-time': '^1.0.0',
    '@opentiny/ng-timeline': '^1.0.0',
    '@opentiny/ng-tip': '^1.0.0',
    '@opentiny/ng-transfer': '^1.0.0',
    '@opentiny/ng-tree': '^1.0.0',
    '@opentiny/ng-treeselect': '^1.0.0',
    '@opentiny/ng-upload': '^1.0.0',
    '@opentiny/ng-utils': '^1.0.0',
    '@opentiny/ng-validation': '^1.0.0',
    '@opentiny/ng-zoom': '^1.0.0',
    '@opentiny/ng-themes': '^1.0.0',
    '@opentiny/ng-guides': '^1.0.0',
    '@opentiny/ng-labeleditor': '^1.0.0',
    '@opentiny/ng-phonenumber': '^1.0.0',
    '@opentiny/ng-selectgroup': '^1.0.0',
    '@opentiny/ng-productpreview': '^1.0.0',
    '@opentiny/ng-buttonselect': '^1.0.0',
    '@opentiny/ng-collapsetext': '^1.0.0',
    '@opentiny/ng-guidesteps': '^1.0.0',
    '@opentiny/ng-path': '^1.0.0',
  },
  devDependencies: {
    '@angular-devkit/build-angular': '15.1.0-next.2',
    '@angular/cli': '15.1.0-next.2',
    '@angular/compiler-cli': '15.1.0-next.2',
    typescript: '^4.8.2',
  },
};

/**
 * 获取pacakage.json文件，注意返回的是一个 object对象，而非字符串，codeSandbox api如此
 * @param {} config
 * @returns
 */
export const getPackageJson = (config = {}) => {
  const name = substringTitle(config.packageName || 'opentiny demo');
  const title = substringTitle(config.packageTitle || 'opentiny demo');
  return {
    ...packageJson,
    name,
    title,
  };
};
const angularJsonFile = `{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "newProjectRoot": "projects",
  "version": 1,
  "projects": {
    "demo": {
      "root": "",
      "sourceRoot": "src",
      "projectType": "application",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            "outputPath": "dist/demo",
            "index": "src/index.html",
            "main": "src/main.ts",
            "assets": [],
            "tsConfig": "tsconfig.json",
            "styles": [
              "node_modules/@opentiny/ng-themes/styles.css",
              "node_modules/@opentiny/ng-themes/theme-default.css",
              "src/styles.css"
            ]
          }
        }
      },
      "schematics": {}
    }
  },
  "defaultProject": "demo"
}`;
// 获取angular.json文件
export const getAngularJson = () => {
  return angularJsonFile;
};

// 获取全局类型文件
export const getGlobalDTs = config => {
  return `
declare global {
  interface Window {
    DEPLOY_URL: string;
    PUBLIC_URL: string;
    readonly ngRef: any;
  }
}
export {};`;
};

// 获取每个组件默认的配置文件
export const getDefaultFiles = (config = {}) => {
  const configFiles = getNgProjectDefaultFiles(config);
  if (config.isStackblitz) {
    delete configFiles['sandbox.config.json'];
  }
  return {
    ...configFiles,
    'package.json': getPackageJson(config),
    'angular.json': getAngularJson(config),
    'src/main.ts': getMainTs(config),
    'src/app/app.module.ts': getAppModuleTs(config),
    'src/app/router.module.ts': getRouterModuleTs(config),
    'src/global.types.ts': getGlobalDTs(config),
    'src/polyfills.ts': `/***************************************************************************************************
 * Zone JS is required by default for Angular itself.
 */
import "zone.js"; // Included with Angular CLI.
import "reflect-metadata";`,
    'src/styles.css': `/* optimize the position of tip */
body {
  padding: var(--ti-common-size-10x);
}
/* optimize the position of right panel */
body > app-root > ti-date[ng-reflect-panel-align="right"],
body > app-root > ti-time[ng-reflect-panel-align="right"],
body > app-root > ti-date-range[ng-reflect-panel-align="right"],
body > app-root > ti-datetime-range[ng-reflect-panel-align="right"],
body > app-root > ti-datetime[ng-reflect-panel-align="right"],
body > app-root > ti-menu {
  margin-left: 50%;
  transform: translateX(-50%);
}
${
  config.isStackblitz
    ? ''
    : `/* to fix the error of heigt in codesandbox */
body > app-root > ti-tags-input .ti3-overflow-padding,
body > app-root > ti-tags-input .ti3-select-dominator-text,
body > app-root > ti-select .ti3-overflow-padding,
body > app-root > ti-select .ti3-select-dominator-text,
body > app-root > ti-treeselect .ti3-overflow-padding,
body > app-root > ti-treeselect .ti3-select-dominator-text {
  height: auto !important;
}`
}`,
  };
};
