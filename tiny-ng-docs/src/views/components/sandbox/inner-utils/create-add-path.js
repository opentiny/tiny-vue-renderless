export const toArray = x => (Array.isArray(x) ? x : [x]);
// 添加ts别名
export const createAddTsPath = aliasPaths => newPaths => {
  Object.keys(newPaths).forEach(pathKey => {
    aliasPaths[pathKey] = Array.from(new Set([...(aliasPaths[pathKey] || []), ...toArray(newPaths[pathKey])]));
  });
};
