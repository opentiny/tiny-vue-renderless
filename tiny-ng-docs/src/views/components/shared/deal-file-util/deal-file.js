import { dealImport } from './deal-import';
import { dealComponent } from './deal-component';
/**
 * 处理文件内容，目前只处理 ts文件的导入、@Component（angular 定义组件的装饰器）中templateUrl、styleUrls的导入
 * 导入处理：
 *   ts文件从接口获取导入的文件，并写入到打开codeSandbox的参数中
 */
export const dealFile = (fileInfo, options) => {
  // 各种处理
  return [dealImport, dealComponent].reduce((preFileInfo, dealFun) => dealFun(preFileInfo, options), fileInfo);
};
