import { getRelativePath } from '../deal-file-util/path-util';

// 获取 router.module.ts 文件的内容
export const getRouterModuleTs = config => {
  const getImportPath = writePath => getRelativePath('src/app/router.module.ts', writePath).replace(/\.[jt]s$/, '');
  const { routerFiles, appComponentName } = config;
  return `import { RouterModule } from "@angular/router";
import { ${appComponentName} as AppComponent } from "./app.component";

${routerFiles.map(({ routerInfo: { componentKey }, writePath }) => `import { ${componentKey} } from "${getImportPath(writePath)}";`).join('\n')}

// 根路由
export const RootRouterModule = RouterModule.forRoot([
  {
    path: '',
    component: AppComponent,
  },
${routerFiles
  .map(
    ({ routerInfo: { componentKey, path } }) => `  {
    component: ${componentKey},
    path: '${path}',
  },`
  )
  .join('\n')}
  { path: '**', component: AppComponent }
])`;
};
