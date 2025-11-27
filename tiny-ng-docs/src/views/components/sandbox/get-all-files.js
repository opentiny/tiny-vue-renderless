import { getOpenFiles } from '../shared/opendocs/get-open-files';
import { getInnerFile } from './inner-utils/get-inner-files';
import { getCss } from './inner-utils/get-css';
import { CUR_BUILD_TYPE, BUILD_TYPES, JS_FILES, CSS_FILES, ICON_PATH } from './code-config';
/**
 * 从demo代码中获取到codeSandbox需要的所有文件
 * @param { Array<{ fileName: string; fileContent: string; readPath: string; writePath: string }> } demoFiles 组件的核心代码，至少包含 component.ts、compnent.html
 * @param { { packageName: string; packageTitle: string;} } options 配置信息 { JS_FILES: js的cdn文件; CSS_FILES: css的cdn文件; packageName: 项目名; packageTitle: 项目标题; ICON_PATH: 图标路径 }
 * @returns
 */
export const getAllFiles = (demoFiles, options) =>
  CUR_BUILD_TYPE === BUILD_TYPES.OPEN_DOCS
    ? getOpenFiles(demoFiles, { ...options, ICON_PATH, JS_FILES, CSS_FILES, getCss })
    : getInnerFile(demoFiles, { ...options, ICON_PATH, JS_FILES, CSS_FILES, getCss });
