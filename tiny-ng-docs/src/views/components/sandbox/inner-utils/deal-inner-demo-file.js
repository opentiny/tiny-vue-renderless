import { fetchFile } from '@/tools';
import { dealDemoFiles } from '../../shared';
import { SOURCEE_PREFIX } from '../code-config';

// 处理内部组件示例文件
export const dealInnerDemoFiles = (demoFiles, options) => {
  // 处理过后的demo文件
  const { appComponentName } = dealDemoFiles(demoFiles, options);
  const { addOrUpdateFile } = options;

  // 添加 runtime.ts文件
  addOrUpdateFile({
    readPath: '',
    writePath: 'src/third-library-runtime.ts',
    fileName: 'third-library-runtime.ts',
    fileContent: fetchFile(`${SOURCEE_PREFIX}runtime.js`).then(
      text => `// @ts-nocheck
// 加载runtime文件
${text}
export {};`
    ),
  });
  return {
    appComponentName, // 主Component 的变量名，用于导入给NgModule渲染
    comFileName: 'app.component.ts', // 主 Component 的文件
  };
};
