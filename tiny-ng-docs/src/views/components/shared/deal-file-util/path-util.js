/**
 * 路径拼接函数 pathJoin("a/b/c.ts", "./aa.ts")  => a/b/aa.ts
 * @param  {string} path1
 * @param {string} path2
 * @returns {string} result
 */
export const pathJoin = (path1, path2) => {
  let allPaths = path1
    .split(/[/\//]+/g)
    .map(item => item.trim())
    .slice(0, -1)
    .filter(Boolean);
  const paths2 = path2
    .split(/[/\//]+/g)
    .map(item => item.trim())
    .filter(Boolean);

  for (let index = 0; index < paths2.length; index++) {
    const element = paths2[index];
    // .. 移除上一个目录
    if (element === '..') {
      allPaths.pop();
    } else if (element !== '.') {
      allPaths.push(element);
    }
  }
  return allPaths.join('/');
};

/**
 * // 获取相对路径，即基于 basePath 获取到 targetPath的路径
 * 如 getRelativePath('c/a.js', 'b.js') => '../b.js'
 * @param {string} basePath
 * @param {string} targetPath
 * @return {string} result
 */
export const getRelativePath = (basePath, targetPath) => {
  const basePaths = basePath.split(/[\\\/]/g).filter(Boolean);
  const targetPaths = targetPath.split(/[\\\/]/g).filter(Boolean);

  // 移除前面相等的路径
  const sameCount = targetPaths.findIndex((item, index) => index >= basePaths.length || item !== basePaths[index]);
  targetPaths.splice(0, sameCount);
  basePaths.splice(0, sameCount);
  return `${basePaths.length > 1 ? '../'.repeat(basePaths.length - 1) : './'}${targetPaths.join('/')}`;
};

export const getFileName = pathName => pathName.match(/[^\\/]+$/)[0];
