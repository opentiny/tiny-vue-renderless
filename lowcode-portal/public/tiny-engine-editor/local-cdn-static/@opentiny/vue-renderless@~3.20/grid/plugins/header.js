import "../../chunk-G2ADBYYC.js";
const columnIsVisible = (children) => Array.isArray(children) && children.length && children.some((column) => column.visible);
const getAllColumns = (columns) => {
  const result = [];
  columns.forEach((column) => {
    if (column.visible) {
      const children = column.children;
      if (columnIsVisible(children)) {
        result.push(column);
        result.push.apply(result, getAllColumns(children));
      } else {
        result.push(column);
      }
    }
  });
  return result;
};
const convertToRows = (originColumns) => {
  let maxLevel = 1;
  const walkTree = (column, parent) => {
    if (parent) {
      column.level = parent.level + 1;
      if (maxLevel < column.level) {
        maxLevel = column.level;
      }
    }
    const children = column.children;
    if (columnIsVisible(children)) {
      let colSpan = 0;
      children.forEach((childColumn) => {
        if (childColumn.visible) {
          walkTree(childColumn, column);
          colSpan += childColumn.colSpan;
        }
      });
      column.colSpan = colSpan;
    } else {
      column.colSpan = 1;
    }
  };
  originColumns.forEach((column) => {
    column.level = 1;
    walkTree(column);
  });
  const allRows = [];
  for (let i = 0; i < maxLevel; i++) {
    allRows.push([]);
  }
  const allColumns = getAllColumns(originColumns);
  allColumns.forEach((column) => {
    column.rowSpan = columnIsVisible(column.children) ? 1 : maxLevel - column.level + 1;
    allRows[column.level - 1].push(column);
  });
  return allRows;
};
export {
  convertToRows,
  getAllColumns
};
