import { CLOUD_EXPORT, CUR_BUILD_TYPE } from '../code-config';
import { getRelativePath, getRouterModuleTs, getNgProjectDefaultFiles } from '../../shared';

const BASE_URL = import.meta.env.BASE_URL;
// load-cloud.ts 文件的前面部分，太长了，放到函数里面变成超大函数了
const loadCloudContentPre = `import * as AngularCore from "@angular/core";
import * as ReflectMetadata from "reflect-metadata";
import * as AngularAnimations from "@angular/animations";
import * as AngularPaltform from "@angular/platform-browser-dynamic";
import * as AngularCommon from "@angular/common";
import * as AgGridAngular from "ag-grid-angular";
import * as AgGridCommunity from "ag-grid-community";
import * as AngularForms from '@angular/forms';
import * as AngularCdkPotal from '@angular/cdk/portal';
import * as AngularCdk from '@angular/cdk';
import * as AngularCdkScrolling from '@angular/cdk/scrolling';
import * as AngularElements from '@angular/elements';
import * as AngularPaltformBrowser from '@angular/platform-browser';
import * as AngularRouter from '@angular/router';
import * as XLSX from "xlsx";
import * as AngularCommonHttp from '@angular/common/http';
import * as Rxjs from 'rxjs';
import * as RxjsOp from 'rxjs/operators';

/**
 *  配置下面动态js链接的依赖，主要有两个原因
 *   1、为了保证 https://XXX.js中的AngularCore等angualr的一些依赖跟CodeSandbox中的angular依赖一致，否则会报错
 *   2、减少https://XXX.js的打包体积，避免重复引入比较大的依赖，如XLSX（0.8 MB）。
 */
// @ts-ignore
window.AngularCore = AngularCore;
// @ts-ignore
window.ReflectMetadata = ReflectMetadata;
// @ts-ignore
window.AngularAnimations = AngularAnimations;
// @ts-ignore
window.AngularPaltform = AngularPaltform;
// @ts-ignore
window.AngularCommon = AngularCommon;
// @ts-ignore
window.AgGridAngular = AgGridAngular;
// @ts-ignore
window.AgGridCommunity = AgGridCommunity;
// @ts-ignore
window.XLSX = XLSX;
// @ts-ignore
window.AngularCdk = {
  ...AngularCdkPotal,
  ...AngularCdkScrolling,
  ...AngularCdk,
};
// @ts-ignore
window.AngularElements = AngularElements;
// @ts-ignore
window.AngularPaltformBrowser = AngularPaltformBrowser;
// @ts-ignore
window.AngularForms = AngularForms;
// @ts-ignore
window.AngularRouter = AngularRouter;
// @ts-ignore
window.AngularCommonHttp = AngularCommonHttp;
// @ts-ignore
window.Rxjs = {
  ...RxjsOp,
  ...Rxjs,
};

// 静态资源地址配置，如图片
// @ts-ignore
window.DEPLOY_URL = "${BASE_URL}";
// @ts-ignore
window.PUBLIC_URL = "";

/**
 * 创建自动重试的promise
 * @param count 重试次数
 * @param delay 重试间隔
 * @returns 创建promise的函数 (fn) => Promise(fn)
 */
const createRetryPromise = (count: number, delay: number) => {
  if (count <= 1) {
    return (
      fn: (
        resolve: (value: unknown) => void,
        reject: (reason?: any) => void
      ) => void
    ) => new Promise(fn);
  }
  return (
    fn: (
      resolve: (value: unknown) => void,
      reject: (reason?: any) => void
    ) => void
  ) =>
    new Promise(fn).catch(() => {
      return new Promise((resolve) => {
        setTimeout(
          () => resolve(createRetryPromise(count - 1, delay)(fn)),
          delay
        );
      });
    });
};`;

// 将数组变量变成数组字符串文本   ['a'] => ["a"]
const getArrStr = arr =>
  `[${arr
    .filter(Boolean)
    .map(item => `"${item}"`)
    .join(', ')}]`;

export const getLoadCloud = config => {
  const { JS_FILES = [] } = config || {};

  return `${loadCloudContentPre}

// 加载js文件，主要是内部组件库tinycloud、tinyng打包生成的js。文件较大，由于proxy限制，无法直接上传到CodeSandbox，只能通过链接动态获取。
const loadJs = async () => {
  const links: string [] = ${getArrStr(JS_FILES)};
  let result = [];
  for (let index = 0; index < links.length; index++) {
    const item = links[index];
    result[index] = await createRetryPromise(
      3,
      500
    )((resolve, reject) => {
      const srcEle = document.createElement("script");
      srcEle.src = item;
      srcEle.id = item;
      srcEle.type = "module";
      srcEle.onload = resolve;
      srcEle.onerror = reject;
      document.body.append(srcEle);
    });
  }
  return result;
};

export const loadCloud = async () => {
  // 加载 third-library-runtime 文件
  await import("./third-library-runtime");
  return loadJs();
}`;
};
// 获取 main.ts文件
export const getMainTs = config => {
  return `import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { ɵresetCompiledComponents } from "@angular/core";

import { loadCloud } from "./load-cloud";

const throwErrorSync = (e: any) => {
  throw e
}

// 强制重置所有声明过的组件，解决angular出现组件被相同module导入的报错
ɵresetCompiledComponents();

loadCloud()
  .then(() => import("./app/app.module"))
  .then(({ AppModule }) => platformBrowserDynamic().bootstrapModule(AppModule))
  .then((ref) => {
    // 销毁上一次跑起来的appModule
    if(window.ngRef){
      window.ngRef.destroy()
    }
    // @ts-ignore
    window.ngRef = ref
  })
  .catch(throwErrorSync);`;
};
// 获取 getAllComponents 函数的字符串
const getAllComponentsFnString = bundleNames => {
  return `// 获取所有的组件
const getAllComponents = () => {
  const bundles = [
${bundleNames.map(item => `    ${item}`).join(',\n')}
  ];
  const result: any[] = [];
  // 是否是angular组件
  const isNgComponent = (x: any) =>
    x && (typeof x === "object" || typeof x === "function") && "ɵcmp" in x;

  bundles.forEach((bundle) =>
    Object.keys(bundle).forEach(
      // @ts-ignore
      (key) => isNgComponent(bundle[key]) && result.push(bundle[key])
    )
  );
  return result;
}`;
};

// app.module.ts文件中前面导入语句的内容，函数超大了，拆分出来
const appModuleImportStr = `import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientJsonpModule, HttpClientModule } from "@angular/common/http";
import { AgGridModule } from "ag-grid-angular";
import { ScrollingModule } from "@angular/cdk/scrolling";

import { RootRouterModule } from './router.module';`;

// 由相对路径获取不重复的bundle名字
const getBundleNames = relativePaths => {
  const getBundleNameSingle = relativePath =>
    relativePath
      .replace(/[\.\/\-\_]+[a-z]/g, matched => matched.toUpperCase())
      .replace(/([^0-9a-zA-Z_])/g, '')
      .replace(/^[^a-zA-Z_]+/, '')
      .replace(/^[A-Z]/, matched => matched.toLowerCase());
  const results = new Set();
  // 添加名字，如果名字重复了，则 在原来的名字再 +1 -> +N
  const addName = (name, addCount = 0) => {
    const target = `${name}${addCount || ''}`;
    return results.has(target) ? addName(name, addCount + 1) : results.add(target);
  };

  relativePaths.forEach(item => addName(getBundleNameSingle(`${item}Bundle`)));

  return [...results];
};

// 获取 app.module.ts文件
export const getAppModuleTs = config => {
  const { appComponentName, componentFiles } = config;
  const bundleKey = appComponentName ? `"${appComponentName}"` : "Object.keys(bundle).find((key) => bundle[key] && 'ɵcmp' in bundle[key])";
  const importPaths = componentFiles.map(comFile => getRelativePath('src/app/app.module.ts', comFile.writePath).replace(/\.[jt]s$/, ''));

  const bundleNames = getBundleNames(importPaths);

  return `${appModuleImportStr}

// 导入所有组件文件
${importPaths.map((item, index) => `import * as ${bundleNames[index]} from "${item}";`).join('\n')}

${getAllComponentsFnString(bundleNames)}

const AppComponent = appComponentBundle[${bundleKey}];

// 获取所有的angular组件
const allComponents = getAllComponents();

/**
 * AppModule，用于渲染的根module
 * 注意此某块只能使用异步导入，且必须在 load-cloud.js中 loadCloud 方法执行完毕之后导入
 */
@NgModule({
  imports: [
    RootRouterModule,
    AgGridModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ScrollingModule,
    window.TINY_ALL_MODULE
  ],
  declarations: [...allComponents],
  bootstrap: [AppComponent],
  providers: []
})
export class AppModule {
  constructor() {
    const { TpConfig, TiLocale, TpIconComponent } = window.TINY_ALL_BUNDLE;
    TpConfig?.init?.();
    TpIconComponent?.setPath?.("${config.ICON_PATH}");
    TiLocale.setLocale(TiLocale.ZH_CN);
  }
}`;
};
// 获取cloud文件
export const getCloudIndex = config => {
  const cloudVars = [...new Set(config.cloudVars)];
  const exsitVars = CLOUD_EXPORT[CUR_BUILD_TYPE];
  // 从 cloud 上导出的变量
  const exportVars = [...new Set([...cloudVars, ...exsitVars])].join(', ');
  // 从 cloud 上导出的类型
  const exportTypes = cloudVars
    .filter(item => !/service/i.test(item))
    .map(item => `export type ${item} = any;`)
    .join('\n');

  return `
// @ts-ignore
const { TINY_ALL_BUNDLE } = window;
const { ${exportVars} } = TINY_ALL_BUNDLE;

// 导出变量
export { ${exportVars} };

${exportTypes ? '// 导出类型，由于类型文件太大，目前类型均设为any' : ''}
${exportTypes}

export default TINY_ALL_BUNDLE;`;
};
// 获取全局类型文件
export const getGlobalDTs = config => {
  return `
// 定义window上面的变量类型，此文件仅用于CodeSandbox项目中
declare global {
  interface Window {
    readonly TINY_ALL_BUNDLE: any;
    readonly TINY_ALL_MODULE: any;
    readonly AngularCore: any;
    readonly ReflectMetadata: any;
    readonly AngularAnimations: any;
    readonly AngularPaltform: any;
    readonly AngularCommon: any;
    readonly AgGridAngular: any;
    readonly AgGridCommunity: any;
    readonly XLSX: any;
    readonly AngularForms: any;
    readonly AngularCdk: any;
    readonly AngularElements: any;
    readonly AngularPaltformBrowser: any;
    readonly AngularRouter: any;
    readonly AngularCommonHttp: any;
    readonly Rxjs: any;
    readonly DEPLOY_URL: string;
    readonly PUBLIC_URL: string;
    readonly ngRef: any;
  }
}
export {};`;
};

// 获取tinycloud、tinyng的公共的配置文件
export const getDefaultFiles = (config = {}) => {
  const configFiles = getNgProjectDefaultFiles(config);

  return {
    ...configFiles,
    'src/load-cloud.ts': getLoadCloud(config),
    'src/main.ts': getMainTs(config),
    'src/app/app.module.ts': getAppModuleTs(config),
    '@opentiny/index.ts': getCloudIndex(config),
    'src/global.d.ts': getGlobalDTs(config),
    'src/app/router.module.ts': getRouterModuleTs(config),
  };
};
