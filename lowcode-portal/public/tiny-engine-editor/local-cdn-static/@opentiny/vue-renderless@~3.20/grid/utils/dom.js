import "../../chunk-G2ADBYYC.js";
import { getRowid } from './common.js';
import { hasClass, getDomNode } from './../../common/deps/dom.js';
import { getActualTarget } from './../../common/event.js';
import { arrayIndexOf } from './../static/index.js';
const ATTR_NAME = "data-rowid";
const CELL_CLS = ".tiny-grid-cell";
const ROW_CLS = ".tiny-grid-body__row";
const isPx = val => val && /^\d+(px)?$/.test(val);
const isScale = val => val && /^\d+%$/.test(val);
const updateCellTitle = event => {
  const cellEl = event.currentTarget.querySelector(CELL_CLS);
  const content = cellEl.innerText;
  if (cellEl.getAttribute("title") !== content) {
    cellEl.setAttribute("title", content);
  }
};
const rowToVisible = ($table, row) => {
  $table.$nextTick(() => {
    const tableBodyVnode = $table.$refs.tableBody;
    if (tableBodyVnode) {
      const gridbodyEl = tableBodyVnode.$el;
      const trEl = gridbodyEl.querySelector(`[${ATTR_NAME}="${getRowid($table, row)}"]`);
      if (trEl) {
        const bodyHeight = gridbodyEl.clientHeight;
        const bodySrcollTop = gridbodyEl.scrollTop;
        const trOffsetTop = trEl.offsetTop + (trEl.offsetParent ? trEl.offsetParent.offsetTop : 0);
        const trHeight = trEl.clientHeight;
        if (trOffsetTop < bodySrcollTop || trOffsetTop > bodySrcollTop + bodyHeight) {
          gridbodyEl.scrollTop = trOffsetTop;
        } else if (trOffsetTop + trHeight >= bodyHeight + bodySrcollTop) {
          gridbodyEl.scrollTop = bodySrcollTop + trHeight;
        }
      } else {
        if ($table.scrollYLoad) {
          gridbodyEl.scrollTop = ($table.afterFullData.indexOf(row) - 1) * $table.scrollYStore.rowHeight;
        }
      }
    }
  });
};
function getFixedLeft($table, from, column, body, offset) {
  let scrollLeft = $table.elemStore["main-body-wrapper"].scrollLeft + offset;
  if (!column.fixed) {
    from.fixed === "left" && (scrollLeft = 0);
    from.fixed === "right" && (scrollLeft = body.scrollWidth);
  }
  return scrollLeft;
}
function computeScrollLeft($table, td) {
  const {
    tableBody
  } = $table.$refs;
  const {
    visibleColumn
  } = $table;
  const {
    scrollLeft: bodyLeft,
    clientWidth: bodyWidth
  } = tableBody.$el;
  let leftWidth = 0;
  let rightWidth = 0;
  visibleColumn.forEach(column => {
    if (column.fixed === "left") {
      leftWidth += column.renderWidth;
    } else if (column.fixed === "right") {
      rightWidth += column.renderWidth;
    }
  });
  const tdLeft = td._accumulateRenderWidth || td.offsetLeft + (td.offsetParent ? td.offsetParent.offsetLeft : 0);
  const tdWidth = td._renderWidth || td.clientWidth;
  let scrollLeft;
  if (tdLeft < bodyLeft + leftWidth) {
    scrollLeft = tdLeft - leftWidth;
  } else if (tdLeft + tdWidth > bodyLeft + bodyWidth - rightWidth) {
    scrollLeft = tdLeft + tdWidth - bodyWidth + rightWidth;
  } else {
    scrollLeft = bodyLeft;
  }
  return scrollLeft;
}
function setBodyLeft(body, td, $table, column, move) {
  const {
    isLeftArrow,
    isRightArrow,
    from
  } = move || {};
  const bodyScollLeft = computeScrollLeft($table, td);
  $table.scrollTo(bodyScollLeft);
  $table.lastScrollLeft = bodyScollLeft;
  if (from) {
    const direction = isLeftArrow ? "left" : isRightArrow ? "right" : null;
    const fixedDom = $table.elemStore[`${direction}-body-list`];
    const mainBody = $table.elemStore["main-body-wrapper"];
    const {
      left,
      right
    } = td.getBoundingClientRect();
    let offset = 0;
    if (isLeftArrow && fixedDom) {
      const div = fixedDom.querySelector("td.fixed__column");
      const division = div ? div.getBoundingClientRect().left : fixedDom.getBoundingClientRect().right;
      division > left && (offset = left - division);
    }
    if (isRightArrow && fixedDom) {
      const div = fixedDom.querySelector("td:not(.fixed__column)") || fixedDom;
      const division = div.getBoundingClientRect().left;
      division < right && (offset = right - division);
    }
    mainBody.scrollLeft = getFixedLeft($table, from, column, body, offset);
  }
}
const colToVisible = ($table, column, move) => {
  $table.$nextTick(() => {
    const gridbodyEl = $table.$refs.tableBody.$el;
    const tdElem = gridbodyEl.querySelector(`.${column.id}`);
    if (tdElem) {
      setBodyLeft(gridbodyEl, tdElem, $table, column, move);
    } else if ($table.scrollXLoad) {
      const visibleColumn = $table.visibleColumn;
      let scrollLeft = 0;
      for (let index = 0; index < visibleColumn.length; index++) {
        if (visibleColumn[index] === column) {
          break;
        }
        scrollLeft += visibleColumn[index].renderWidth;
      }
      gridbodyEl.scrollLeft = computeScrollLeft($table, {
        _accumulateRenderWidth: scrollLeft,
        _renderWidth: column.renderWidth
      });
    }
  });
};
const hasDataTag = (el, value) => {
  if (!el || !value || !el.getAttribute) {
    return false;
  }
  return (" " + el.getAttribute("data-tag") + " ").includes(" " + value + " ");
};
const getEventTargetNode = (event, container, queryCls) => {
  let targetEl;
  let target = getActualTarget(event);
  while (target && target.nodeType && target !== document) {
    if (queryCls && (hasClass(target, queryCls) || hasDataTag(target, queryCls))) {
      targetEl = target;
    } else if (target === container) {
      return {
        flag: queryCls ? !!targetEl : true,
        container,
        targetElem: targetEl
      };
    }
    target = target.parentNode;
  }
  return {
    flag: false
  };
};
function getNodeOffset(el, container, rest) {
  if (el) {
    const htmlEl = document.querySelector("html");
    const bodyEl = document.body;
    const parentEl = el.parentNode;
    rest.top += el.offsetTop;
    rest.left += el.offsetLeft;
    if (parentEl && parentEl !== htmlEl && parentEl !== bodyEl) {
      rest.top -= parentEl.scrollTop;
      rest.left -= parentEl.scrollLeft;
    }
    if (container && (el === container || el.offsetParent === container) ? 0 : el.offsetParent) {
      return getNodeOffset(el.offsetParent, container, rest);
    }
  }
  return rest;
}
const getOffsetPos = (el, container) => getNodeOffset(el, container, {
  left: 0,
  top: 0
});
const getAbsolutePos = el => {
  const bounding = el.getBoundingClientRect();
  const {
    scrollTop,
    scrollLeft
  } = getDomNode();
  return {
    top: scrollTop + bounding.top,
    left: scrollLeft + bounding.left
  };
};
const getCellNodeIndex = cell => {
  const trEl = cell.parentNode;
  const columnIndex = arrayIndexOf(trEl.children, cell);
  const rowIndex = arrayIndexOf(trEl.parentNode.children, trEl);
  return {
    columnIndex,
    rowIndex
  };
};
const getRowNodes = (trList, cellNode, targetCellNode) => {
  const startColIndex = cellNode.columnIndex;
  const startRowIndex = cellNode.rowIndex;
  const targetColIndex = targetCellNode.columnIndex;
  const targetRowIndex = targetCellNode.rowIndex;
  const rows = [];
  for (let rowIndex = Math.min(startRowIndex, targetRowIndex), rowLen = Math.max(startRowIndex, targetRowIndex); rowIndex <= rowLen; rowIndex++) {
    const cells = [];
    const trEl = trList[rowIndex];
    for (let colIndex = Math.min(startColIndex, targetColIndex), colLen = Math.max(startColIndex, targetColIndex); colIndex <= colLen; colIndex++) {
      cells.push(trEl.children[colIndex]);
    }
    rows.push(cells);
  }
  return rows;
};
const getCellIndexs = cell => {
  const trEl = cell.parentNode;
  const rowid = trEl.getAttribute(ATTR_NAME);
  const columnIndex = [].indexOf.call(trEl.children, cell);
  const rowIndex = [].indexOf.call(trEl.parentNode.children, trEl);
  return {
    rowid,
    rowIndex,
    columnIndex
  };
};
const getCell = ($table, {
  row,
  column
}) => new Promise(resolve => {
  $table.$nextTick(() => {
    const bodyElem = $table.$refs[`${column.fixed || "table"}Body`];
    resolve((bodyElem || $table.$refs.tableBody).$el.querySelector(`${ROW_CLS}[${ATTR_NAME}="${getRowid($table, row)}"] .${column.id}`));
  });
});
export { colToVisible, getAbsolutePos, getCell, getCellIndexs, getCellNodeIndex, getDomNode, getEventTargetNode, getOffsetPos, getRowNodes, hasDataTag, isPx, isScale, rowToVisible, updateCellTitle };