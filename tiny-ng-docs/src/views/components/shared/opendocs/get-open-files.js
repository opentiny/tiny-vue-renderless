import { createAddOrUpdateFile } from '../add-file-util/create-add-file';
import { getDefaultFiles } from './get-default-files';
import { dealDemoFiles } from '../deal-file-util/deal-demo-file';
import { getModuleNames } from './get-module-names';

// 获取需要从接口获取的文件
const getQueryFileObj = async allFileList => {
  const result = {};
  for (let index = 0; index < allFileList.length; index++) {
    const fileItem = allFileList[index];
    const fileContent = await fileItem.fileContent;
    result[fileItem.writePath] = fileContent;
  }
  return result;
};
/**
 * 从demo代码中获取到codeSandbox需要的所有文件
 * @param { Array<{ fileName: string; fileContent: string; readPath: string; writePath: string }> } demoFiles 组件的核心代码，至少包含 component.ts、compnent.html
 * @param { { JS_FILES: string[]; CSS_FILES: string[]; packageName: string; packageTitle: string; ICON_PATH: string; } } options 配置信息 { JS_FILES: js的cdn文件; CSS_FILES: css的cdn文件; packageName: 项目名; packageTitle: 项目标题; ICON_PATH: 图标路径 }
 * @returns
 */
export const getOpenFiles = async (demoFiles, options = {}) => {
  // 需要从接口获取的额外添加的文件：有 demo文佳， mock文件，组件的less文件、html文件，ts代码中导入的文件
  const queryFileList = [];
  const addTsPath = () => {};
  const addCloudVars = () => {};
  // 添加或者更新文件函数
  const addOrUpdateFile = createAddOrUpdateFile(queryFileList, {
    ...options,
    addTsPath,
    addCloudVars,
  });

  // 处理组件展示的那几个demo文件，一般是 XXXcomponent.ts，xxx.html
  const { appComponentName } = dealDemoFiles(demoFiles, { ...options, addOrUpdateFile, addTsPath, addCloudVars });

  const [moduleNames, queryedFileObj] = await Promise.all([getModuleNames(demoFiles), getQueryFileObj(queryFileList)]);
  // 组件文件列表，所有的组件需要 app.module.ts导入并声明
  const componentFiles = queryFileList.filter(item => item.isComponentFile);

  // 路由组件列表，路由需要在 app.module.ts中注册
  const routerFiles = componentFiles.filter(item => item.routerInfo);

  // 获取默认的文件，包含 angular 项目配置、ts配置
  const defaultFiles = getDefaultFiles({
    ...options,
    appComponentName,
    componentFiles,
    routerFiles,
    moduleNames,
  });

  return {
    ...defaultFiles,
    ...queryedFileObj,
  };
};
