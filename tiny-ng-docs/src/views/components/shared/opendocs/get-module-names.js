import { fetchDemosFile } from '@/tools';

// 获取导入的变量名
const getImportVars = content => {
  const varNames = [];
  const getVarNames = varStr => {
    return (
      varStr
        .split(/[,]+/)
        // 兼容 { a as b } 语法
        .map(item => item.trim().replace(/^([^\s]+)\s+as\s+[^\s]+/, '$1'))
        .filter(Boolean)
    );
  };
  content.replace(/import[\s]*{([^}]+)}\s*from\s*['"`]@opentiny\/ng[^'"`]*['"`];?/g, (matched, vars) => varNames.push(...getVarNames(vars)));
  return varNames;
};

const getImportModules = () => {
  const domEle = document.querySelectorAll('.used-tiny code.language-typescript') || [];
  const importText = Array.from(domEle)
    .map(ele => ele?.innerHTML)
    .filter(Boolean)
    .join('\n');
  return importText
    ? {
        moduleNames: getImportVars(importText).filter(item => /module$/i.test(item)),
        importText,
      }
    : {
        moduleNames: [],
        importText: '',
      };
};

export const getModuleNames = async demoFiles => {
  const dempPathReg = /^@demos\/app\/([^\/]+)/;
  const { readPath } = demoFiles.find(file => file?.fileName?.endsWith('.ts') && dempPathReg.test(file.readPath));
  const [demoPath, componnetName] = Array.from(readPath.match(dempPathReg));

  const content = await fetchDemosFile(`${demoPath}/${componnetName.toLowerCase().replace(/^[a-z]/, s => s.toUpperCase())}TestModule.ts`);
  return [...new Set([...getImportModules().moduleNames, ...getImportVars(content).filter(item => /module$/i.test(item))])];
};
