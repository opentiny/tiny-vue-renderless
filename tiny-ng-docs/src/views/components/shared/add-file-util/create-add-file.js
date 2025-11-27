import { fetchDemosFile } from '@/tools';
import { dealFile } from '../deal-file-util/deal-file';
// 添加新文件
const getNewFileItem = (fileInfo, afterGet) => {
  let { fileContent, fileName, readPath, writePath } = fileInfo;
  fileName = writePath.match(/[^\\\/]+$/)[0];
  if (fileContent) {
    return {
      ...fileInfo,
      fileContent,
      fileName,
      readPath,
      writePath,
    };
  }
  const fileContentPromise = fetchDemosFile(readPath)
    .then(code => {
      typeof afterGet === 'function' &&
        afterGet({
          ...fileInfo,
          fileContent: code,
          fileName,
          readPath,
          writePath,
        });
      return code;
    })
    .catch(err => {
      // 样式文件可缺省
      if (fileName.endsWith('.less')) {
        return '';
      }
      throw err;
    });
  return { ...fileInfo, fileContent: fileContentPromise, fileName, readPath, writePath };
};

/**
 * 创建添加到文件列表的方法
 * @param {Array<{readPath: string; writePath: string; isComponentFile?: boolean; fileContent?: string | Promise<string>;fileName: string;}>} allFileList
 * @param options
 * @param {(fileInfo: {readPath: string; writePath: string; isComponentFile?: boolean; fileContent: string;fileName: string;}) => void} afterGet
 */
export const createAddOrUpdateFile = (allFileList, options, afterGet) => {
  /**
   * 添加文件到文件列表中
   * @param {{readPath: string; writePath: string; isComponentFile?: boolean; fileContent?: string | Promise<string>;fileName: string;}} fileInfo 文件信息
   * $  {
   * $    readPath: 读取路径 以 @demos开头，从tiny-design官网读取文件;
   * $    writePath: 写入 codeSandbox后的路径;
   * $    isComponentFile?: 是否是angular组件文件;
   * $    fileContent?: 文件内容，不传则会从 readPath中读取;
   * $    fileName: 文件名;
   * $  }
   *
   */
  const addOrUpdateFile = fileInfo => {
    const oldFileIndex = allFileList.findIndex(item => item.writePath === fileInfo.writePath);
    if (oldFileIndex > -1) {
      allFileList[oldFileIndex] = {
        ...allFileList[oldFileIndex],
        ...fileInfo,
      };
    } else {
      const fileItem = getNewFileItem(fileInfo, fileInfo => {
        dealFile(fileInfo, options);
        if (typeof afterGet === 'function') {
          return afterGet(fileInfo);
        }
        return null;
      });
      allFileList.push(fileItem);
    }
  };
  options.addOrUpdateFile = addOrUpdateFile;
  return addOrUpdateFile;
};
