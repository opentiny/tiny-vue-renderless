import { pathJoin } from './path-util';
const getExportVarNames = varStr => {
  return (
    varStr
      .split(/[,]+/)
      // 兼容 { a as b } 语法
      .map(item => item.trim().replace(/^([^\s]+)\s+as\s+[^\s]+/, '$1'))
  );
};
// 给导入的文件加上 ts后缀
const getRealPath = importPath => (/\.[jt]s$/.test(importPath) ? importPath : `${importPath}.ts`);

// 处理 @opentiny/* 的导入
const dealCloudImport = ({ readPath, fileContent, writePath, fileName }, options) => {
  const { addTsPath, addCloudVars } = options;
  return (matched, vars, importPath) => {
    if (/^@opentiny\//.test(importPath)) {
      const varNames = getExportVarNames(vars);
      addCloudVars(varNames);
      addTsPath({
        [importPath]: '@opentiny/index.ts',
      });
    }
    return matched;
  };
};

// 处理 ./* ../* 相对导入
const dealRelativeImport = ({ readPath, fileContent, writePath, fileName }, options) => {
  const { addOrUpdateFile, addTsPath } = options;
  return (matched, vars, importPath) => {
    const realPath = getRealPath(importPath);
    if (/^\.{1,2}\//.test(importPath)) {
      addOrUpdateFile({
        readPath: pathJoin(readPath, realPath),
        writePath: pathJoin(writePath, realPath),
      });
    }
    return matched;
  };
};

// 处理 @libs/* 别名导入
const dealLibsImport = ({ readPath, fileContent, writePath, fileName }, options) => {
  const { addOrUpdateFile, addTsPath } = options;
  return (matched, vars, importPath) => {
    if (/^@libs\//.test(importPath)) {
      importPath.replace(/^@libs\/[^\/]+\/demo\/src\/app\//, matchedPath => {
        // 添加 @lib 别名
        addTsPath({
          [`${matchedPath}*`]: ['src/*'],
        });
        const suffixPath = getRealPath(importPath.replace(matchedPath, ''));
        // 添加 @lib 别名对应的文件
        addOrUpdateFile({
          readPath: pathJoin('@demos/app', suffixPath),
          writePath: pathJoin('src', suffixPath),
        });
      });
    }
    return matched;
  };
};

// 处理ts文件中的导入
export const dealImport = (fileInfo, options) => {
  let { readPath, fileContent, writePath, fileName } = fileInfo;
  // 非ts、tsx、js、jsx 文件，不处理导入
  if (!/\.[jt]sx?$/.test(fileName)) {
    return fileInfo;
  }
  // 获取导入的语句
  fileContent = fileContent.replace(/import[\s]*{([^}]+)}\s*from\s*['"`]([^'"`]+)['"`];?/g, (matched, vars, importPath) => {
    const realPath = importPath.trim();
    // 处理各种导入
    return [dealCloudImport, dealLibsImport, dealRelativeImport].reduce(
      (preMatched, dealFun) => dealFun(fileInfo, options)(preMatched, vars, realPath),
      matched
    );
  });
  return {
    ...fileInfo,
    readPath,
    fileContent,
    writePath,
    fileName,
  };
};
