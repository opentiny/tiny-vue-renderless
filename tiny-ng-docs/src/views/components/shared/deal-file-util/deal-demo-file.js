import { addExtraComponents } from '../add-file-util/add-extra-component';
import { dealFile } from './deal-file';
import { matchComponentExport } from './deal-component';

// 处理 @Component 相关依赖
const dealMatchedSelector = matched => {
  return (
    matched
      // 去掉原有的selector
      .replace(/selector:[\s]*['"`][^'"`]+['"`]\s*,?/, '')
      // 替换 templateUrl，添加selector
      .replace(
        /templateUrl:[\s]*['"`][^'"`]+['"`]/,
        `selector: 'app-root',
  templateUrl: './app.component.html'`
      )
  );
};

// 检查文本是否有 @Component 导出，且Component 含有 templateUrl
const hasComponentAndTemplateUrl = fileContent => {
  const componentExports = matchComponentExport(fileContent);
  return componentExports.some(({ matched }) => /templateUrl\s*\:/.test(matched));
};

// 处理AppComponent 的导入、导出
const dealComponentExport = (content, appComponentName) => {
  let fileContent = content;
  const componentExports = matchComponentExport(fileContent);
  componentExports.some(({ matched, startIndex, endIndex }) => {
    if (/templateUrl\s*\:/.test(matched)) {
      const matchedExport = /\}\s*\)\s*export\s+class\s+([^\s]+)/.exec(matched) || [];
      const matchedComponentName = matchedExport[1];
      if (matchedComponentName === appComponentName) {
        fileContent = fileContent.substring(0, startIndex) + dealMatchedSelector(fileContent.substring(startIndex, endIndex)) + fileContent.substring(endIndex);
        // 终止循环
        return true;
      }
    }
    return false;
  });
  return {
    fileContent,
  };
};

// 获取demo最开始的文件名
const getFileName = (fileName, isComponent) => {
  if (/\.html$/.test(fileName) || isComponent) {
    const replaceTarget = fileName.substring(0, fileName.lastIndexOf('.'));
    fileName = fileName.replace(replaceTarget, 'app.component');
  }
  return fileName;
};
// 从demo文件中找出 Component文件
const getComponentFileName = demoFiles => {
  // 组件语法的正则表达式
  const componentFile =
    // 先从 xxxcomponent.ts文件中找，并需要有导出
    demoFiles.find(({ fileName, fileContent }) => /component\.ts$/i.test(fileName) && hasComponentAndTemplateUrl(fileContent)) ||
    // 再从 ts文件中找，需要有导出
    demoFiles.find(({ fileName, fileContent }) => fileName.endsWith('.ts') && hasComponentAndTemplateUrl(fileContent)) ||
    demoFiles.find(({ fileName }) => /component\.ts$/i.test(fileName)) ||
    demoFiles.find(({ fileName }) => fileName.endsWith('.ts')) ||
    {};
  return componentFile.fileName || '';
};
// 从demo文件中找出 那个主要的Component 命名，用来导出给AppModule渲染html
const getAppComponentName = (demoFiles, comFileName) => {
  const { fileContent } = demoFiles.find(({ fileName }) => fileName === comFileName);
  let appComponentName = '';
  const componentExports = matchComponentExport(fileContent);
  const isAppComponentName = componentName => comFileName.substring(0, -3).toLowerCase() === componentName.toLowerCase();
  componentExports.some(({ matched }) => {
    if (/templateUrl\s*\:/.test(matched)) {
      const matchedExport = /\}\s*\)\s*export\s+class\s+([^\s]+)/.exec(matched);
      if (matchedExport) {
        appComponentName = matchedExport[1];
        return isAppComponentName(appComponentName);
      }
    }
    return false;
  });

  return appComponentName;
};

// 处理组件示例文件
export const dealDemoFiles = (demoFiles, options) => {
  // 要引入的文件
  // 组件文件名
  const comFileName = getComponentFileName(demoFiles);
  // 组件名
  const appComponentName = getAppComponentName(demoFiles, comFileName);

  const { addOrUpdateFile } = options;

  // 处理过后的demo文件
  const dealedDemoFiles = demoFiles.map(fileInfo => {
    // 处理 demo 文件， 目前必有 *.html *component.ts这俩个文件，可能有 其他ts文件
    let { fileName, fileContent, readPath, writePath } = fileInfo;
    const isComponent = fileName === comFileName;

    if (isComponent) {
      // 处理@Component 的导出
      ({ fileContent } = dealComponentExport(fileContent, appComponentName));
    }

    // 重新命名 组件的html 文件、ts文件
    fileName = getFileName(fileName, isComponent);

    // demo写入路径修改，都放到 src/app/ 目录下
    writePath = isComponent || fileName.endsWith('.html') ? `src/app/${fileName}` : writePath;

    // 处理文件
    addOrUpdateFile({ fileName, fileContent, readPath, writePath });

    return { fileName, fileContent, readPath, writePath };
  });
  // 添加需要额外导入的组件
  addExtraComponents(dealedDemoFiles, addOrUpdateFile);

  // 更新导入的文件
  dealedDemoFiles.forEach(fileInfo => {
    addOrUpdateFile(dealFile(fileInfo, options));
  });

  return {
    dealedDemoFiles,
    appComponentName,
  };
};
