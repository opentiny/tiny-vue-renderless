import { pathJoin } from './path-util';
// 处理Component
const dealComponentMatched = ({ readPath, fileContent, writePath, fileName }, options) => {
  const { addOrUpdateFile } = options;
  return matched => {
    matched
      // 添加 templateUrl
      .replace(/templateUrl:[\s]*['"`]([^'"`]+)['"`]/, (str, url) => {
        const templateUrl = url.trim();
        addOrUpdateFile({
          readPath: pathJoin(readPath, templateUrl),
          writePath: pathJoin(writePath, templateUrl),
        });
        return str;
      })

      // 添加样式文件
      .replace(/styleUrls:[\s]*\[([^\]]+)\]\s*/, (matched, styles) => {
        const stylesUrls = styles.split(',').map(item => item.trim().replace(/(^['"`])|(['"`])$/g, ''));

        stylesUrls.forEach(styleUrl => {
          addOrUpdateFile({
            readPath: pathJoin(readPath, styleUrl),
            writePath: pathJoin(writePath, styleUrl),
          });
        });
      });
  };
};

// 匹配导出的angular Component "@Component({XXXX}) export class XXX"
export const matchComponentExport = fileContent => {
  let i = 0;
  const result = [];
  // 识别 所有的@Component({XXXX}) export class XXX 语句并添加到数组中
  while (i < fileContent.length) {
    let startMathed = /@Component\s*\(\s*\{/.exec(fileContent.substring(i));
    let endMatched;
    if (startMathed && typeof startMathed.index === 'number') {
      endMatched = /\}\s*\)\s*export\s+class\s+([^\s]+)/.exec(fileContent.substring(startMathed.index + i));
    }
    if (endMatched && endMatched[0]) {
      const startIndex = startMathed.index + i;
      const endIndex = endMatched.index + startIndex + endMatched[0].length;
      i = endIndex;
      result.push({
        startIndex,
        endIndex,
        matched: fileContent.substring(startIndex, endIndex),
        componentKey: endMatched[1],
      });
    }
    // 未识别到 @Component, 结束循环
    else {
      break;
    }
  }
  return result;
};

// 处理@Component，将 tempalteUrls, styleUrsl识别出来后导入
export const dealComponent = (fileInfo, options) => {
  const { fileName } = fileInfo;
  // 非ts、tsx、js、jsx 文件，不处理导出
  if (!/\.[jt]sx?$/.test(fileName)) {
    return fileInfo;
  }
  let i = 0;
  let { fileContent } = fileInfo;
  const { addOrUpdateFile } = options;

  // 识别 所有的@Component 语句并处理
  while (i < fileContent.length) {
    let startMathed = /@Component\s*\(\s*\{/.exec(fileContent.substring(i));
    let endMatched;
    if (startMathed && typeof startMathed.index === 'number') {
      endMatched = /\}\s*\)\s*(export){0,1}\s+class\s+([^\s]+)/.exec(fileContent.substring(startMathed.index + i));
    }
    if (endMatched) {
      const startIndex = startMathed.index + i;
      const endIndex = endMatched.index + startIndex + endMatched[0].length;
      i = endIndex;
      // 打上是Compoent 文件的标记，方便 app.module.ts导入
      addOrUpdateFile({
        ...fileInfo,
        isComponentFile: true,
      });
      dealComponentMatched(fileInfo, options)(fileContent.substring(startIndex, endIndex));
    }
    // 未识别到 @Component, 结束循环
    else {
      break;
    }

    const componentExports = matchComponentExport(fileContent);
    // 打上是Compoent 文件的标记，方便 app.module.ts导入
    addOrUpdateFile({
      ...fileInfo,
      componentKeys: componentExports.map(item => item.componentKey),
    });
  }
  return fileInfo;
};
