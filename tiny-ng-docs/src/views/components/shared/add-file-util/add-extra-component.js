import { getDemoLog } from './get-demo-log';
import { LEFT_MENU_ROUTER_FILES, LEFT_MENU_THIN_ROUTER_FILES } from './extra-router-files';

// 在demo之外添加额外的组件，目前只有 demo-log组件 与 left-menu组件需要添加
export const addExtraComponents = (dealedDemoFiles, addOrUpdateFile) => {
  // 是否是左侧菜单组件
  const isLeftMenu = dealedDemoFiles.some(({ readPath }) => readPath.startsWith('@demos/app/leftmenu/'));
  const isLeftMenuThin = dealedDemoFiles.some(({ readPath }) => readPath.startsWith('@demos/app/leftmenuthin/'));

  const routerFiles = [...(isLeftMenu ? LEFT_MENU_ROUTER_FILES : []), ...(isLeftMenuThin ? LEFT_MENU_THIN_ROUTER_FILES : [])];

  // 需要额外添加的路由组件
  routerFiles.forEach(({ fileName, path, componentKey, readPath }) =>
    addOrUpdateFile({
      readPath,
      writePath: `src/components/${fileName}`,
      routerInfo: {
        componentKey,
        path,
      },
    })
  );

  // 是否使用到了 <demo-log>
  const isDemolog = dealedDemoFiles.some(({ fileContent }) => /\<\s*demo-log[^\>]*\>/.test(fileContent));
  // 如果使用到了 <demo-log> ，添加demoLog
  if (isDemolog) {
    addOrUpdateFile({
      fileName: 'demo-log.component.ts',
      fileContent: getDemoLog(),
      readPath: '',
      writePath: 'src/components/demo-log.component.ts',
      isComponentFile: true,
      componentKeys: ['DemoLogComponent'],
    });
  }
};
