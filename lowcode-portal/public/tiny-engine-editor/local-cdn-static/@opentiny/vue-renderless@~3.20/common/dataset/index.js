import { __objRest, __spreadValues } from "../../chunk-G2ADBYYC.js";
import { format } from './../string.js';
import { isObject } from './../type.js';
import { transformTreeData } from './../array.js';
const getFilterStr = filters => {
  const filterArr = {};
  Object.keys(filters).forEach(property => {
    const {
      type,
      value
    } = filters[property];
    if (type === "enum") {
      filterArr[property] = {
        type: value.map(() => 0),
        value
      };
      if (value.length > 1) {
        filters[property].relation = "or";
      }
    }
    if (type === "input") {
      const {
        relation,
        text
      } = value;
      filterArr[property] = {
        type: [relation === "startwith" ? 8 : relation === "equals" ? 0 : 6],
        value: text
      };
    }
  });
  return JSON.stringify(filterArr);
};
const getNsObj = (obj, names) => {
  const arr = Array.isArray(names) ? names : names.split(".");
  const curkey = arr.shift();
  const curObj = obj[curkey];
  if (isObject(curObj) && arr.length) {
    return getNsObj(curObj, arr);
  }
  return curObj;
};
const handlerArgs = (options, args) => {
  if (args) {
    const {
      page,
      sort,
      filters
    } = args;
    const {
      currentPage,
      pageSize
    } = page || {};
    const filterStr = getFilterStr(filters || {});
    const orderBy = sort && sort.property ? sort.property + " " + sort.order : "";
    options.url = format(options.url, {
      curPage: currentPage,
      pageSize,
      filterStr,
      orderBy
    });
  }
};
const transForm = (response, tree) => {
  const {
    result,
    pageVO
  } = response;
  const {
    key = "id",
    parentKey
  } = tree || {};
  let data = result || response;
  if (parentKey) {
    data = transformTreeData(data, key, parentKey);
  }
  return pageVO ? {
    result: data,
    page: {
      total: pageVO.totalRows
    }
  } : data;
};
const getDataset = ({
  dataset,
  service,
  tree
}, args) => new Promise((resolve, reject) => {
  const {
    source,
    value,
    api
  } = dataset || {};
  const $service = service || dataset && dataset.service;
  if (Array.isArray(dataset)) {
    return resolve(transForm(dataset, tree));
  }
  if (Array.isArray(value)) {
    return resolve(transForm(value, tree));
  }
  if (!$service) {
    return resolve([]);
  }
  if (isObject(source) && source.url) {
    const _a = source,
      {
        type = "GET",
        data,
        beforeRequest,
        afterRequest,
        success,
        hideErr,
        url,
        method
      } = _a,
      options = __objRest(_a, ["type", "data", "beforeRequest", "afterRequest", "success", "hideErr", "url", "method"]);
    options.url = url;
    options.method = method || type.toLocaleLowerCase();
    const mergeTarget = options.method === "get" ? "params" : "data";
    options[mergeTarget] = data || {};
    const afterRequestFn = afterRequest || success;
    const config = __spreadValues({}, options);
    handlerArgs(config, args);
    beforeRequest && beforeRequest(config, args);
    $service.network.request(config).then(response => {
      afterRequestFn && afterRequestFn(response.data);
      resolve(transForm(response.data, tree));
    }).catch(error => {
      hideErr || reject(error);
    });
  } else if (api) {
    const fetchFn = getNsObj($service, api.name);
    fetchFn && fetchFn(__spreadValues(__spreadValues({}, api.data), args)).then(response => {
      resolve(transForm(response, tree));
    }).catch(error => {
      reject(error);
    });
  }
});
export { getDataset };