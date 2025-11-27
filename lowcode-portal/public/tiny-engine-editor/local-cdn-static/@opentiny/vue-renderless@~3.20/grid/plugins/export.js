import { __spreadValues } from "../../chunk-G2ADBYYC.js";
import { xss } from './../../common/xss.js';
import browser from './../../common/browser.js';
import { toTreeArray } from './../static/index.js';
import { getCellValue, getFuncText } from './../utils/index.js';
import { exportExcel } from './exportExcel.js';
const getCsvLabelData = (columns, oData, tableElem) => {
  const trElemList = tableElem.querySelectorAll(".tiny-grid__body-wrapper.body__wrapper .tiny-grid-body__row");
  const trData = [];
  for (let i = 0, len = trElemList.length; i < len; i++) {
    const item = {};
    const trElem = trElemList[i];
    columns.forEach(column => {
      const cell = trElem.querySelector(`.${column.id}`);
      item[column.id] = cell ? cell.innerText.trim() : "";
    });
    trData.push(item);
  }
  return trData;
};
const getCsvData = (opts, oData, oColumns, tableElem) => {
  const isOriginal = opts.original;
  let columns = opts.columns ? opts.columns : oColumns;
  if (opts.columnFilterMethod) {
    columns = columns.filter(opts.columnFilterMethod);
  }
  let datas = opts.data ? opts.data : isOriginal ? oData : getCsvLabelData(columns, oData, tableElem);
  if (opts.dataFilterMethod) {
    datas = datas.filter(opts.dataFilterMethod);
  }
  return {
    columns,
    datas
  };
};
const getCsvContent = ($table, opts, oColumns, oData) => {
  const isOriginal = opts.original;
  const tableEl = $table.$el;
  const tab = opts.useTabs === false ? "" : "	";
  const {
    columns,
    datas
  } = getCsvData(opts, oData, oColumns, tableEl);
  let content = "\uFEFF";
  const transfrom = str => {
    if (typeof str === "string" && str.replace(/ /g, "").match(/[\s,"]/)) {
      str = '"' + str.replace(/"/g, '""') + '"';
    }
    if (typeof str === "string" && str.match(/^([@=]|([-\\+].*[^0-9\\.])).*$/)) {
      str = " " + str;
    }
    return str + tab;
  };
  if (opts.isHeader) {
    content += columns.map(({
      own
    }) => transfrom(getFuncText(own.title || own.label))).join(",") + "\n";
  }
  datas.forEach((row, rowIndex) => {
    if (isOriginal) {
      content += columns.map(column => {
        if (column.type === "index") {
          return column.indexMethod ? column.indexMethod(rowIndex) : rowIndex + 1;
        }
        return transfrom(getCellValue(row, column));
      }).join(",") + "\n";
    } else {
      content += columns.map(column => transfrom(row[column.id])).join(",") + "\n";
    }
  });
  if (opts.isFooter) {
    const footerData = $table.footerData;
    const footers = opts.footerFilterMethod ? footerData.filter(opts.footerFilterMethod) : footerData;
    const filterMaps = $table.tableColumn.map(column => ~columns.indexOf(column));
    footers.forEach(rows => {
      content += rows.filter((val, colIndex) => filterMaps[colIndex]).join(",") + "\n";
    });
  }
  return content;
};
const getCsvUrl = (opts, content) => {
  if (window.Blob && window.URL && window.URL.createObjectURL && browser.name !== "safari") {
    return URL.createObjectURL(new Blob([content], {
      type: "text/csv;charset=utf-8"
    }));
  }
  return `data:attachment/csv;charset=utf-8,${encodeURIComponent(content)}`;
};
const downloadCsc = (options, content) => {
  if (!options.download) {
    return Promise.resolve(content);
  }
  if (navigator.msSaveBlob && window.Blob) {
    navigator.msSaveBlob(new Blob([content], {
      type: "text/csv;charset=utf-8"
    }), options.filename);
  } else {
    const linkElem = document.createElement("a");
    linkElem.target = "_blank";
    linkElem.rel = "noopener noreferrer";
    linkElem.download = options.filename;
    linkElem.href = xss.filterUrl(getCsvUrl(options, content));
    document.body.appendChild(linkElem);
    linkElem.click();
    document.body.removeChild(linkElem);
  }
};
var export_default = {
  _exportCsv(options) {
    let {
      visibleColumn,
      scrollXLoad,
      scrollYLoad,
      treeConfig
    } = this;
    let mergedOpts = __spreadValues({
      columns: null,
      columnFilterMethod: column => column.property && !["index", "selection", "radio"].includes(column.type),
      download: true,
      data: null,
      dataFilterMethod: null,
      filename: "table.csv",
      footerFilterMethod: null,
      isHeader: true,
      isFooter: true,
      original: !!treeConfig
    }, options);
    if (!mergedOpts.filename.includes(".csv")) {
      mergedOpts.filename += ".csv";
    }
    if (!mergedOpts.original) {
      if (scrollXLoad || scrollYLoad) {
        mergedOpts.original = true;
      }
    }
    let columns = visibleColumn;
    let oData = this.tableFullData;
    if (treeConfig) {
      oData = toTreeArray(oData, treeConfig);
    }
    oData.forEach(value => {
      Object.keys(value).forEach(key => {
        if (value[key] === 0) {
          value[key] = "0";
        }
      });
    });
    return downloadCsc(mergedOpts, getCsvContent(this, mergedOpts, columns, oData));
  },
  _exportExcel(options) {
    exportExcel(this, options);
  }
};
export { export_default as default };