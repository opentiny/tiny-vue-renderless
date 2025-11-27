import { __spreadProps, __spreadValues } from "../chunk-G2ADBYYC.js";
import { getFormated } from './../chart-core/deps/utils.js';
import { itemPoint, itemLabel, itemContent } from './../chart-core/deps/constants.js';
import { isNull } from './../common/type.js';
const getTooltip = args => {
  const {
    digit,
    itemDataType,
    linksDataType
  } = args;
  const formatter = function (item) {
    const {
      name,
      data,
      value,
      color
    } = item;
    const tplt = [];
    color && tplt.push(itemPoint(color));
    tplt.push(itemLabel(`${name}`));
    if (!data || !data.source) {
      tplt.push(`${itemContent(getFormated(value, itemDataType, digit))}<br />`);
    } else {
      tplt.push(`${itemContent(getFormated(value, linksDataType, digit))}<br />`);
    }
    return tplt.join("");
  };
  return {
    trigger: "item",
    formatter
  };
};
const getSeries = args => {
  const {
    dimension,
    itemStyle,
    label,
    lineStyle,
    links,
    metrics,
    rows,
    useDataValue,
    valueFull
  } = args;
  const dataMap = {};
  const seriesData = rows.map(row => {
    dataMap[row[dimension]] = row[metrics];
    return {
      name: row[dimension],
      value: row[metrics]
    };
  });
  let {
    innerLinks = links,
    mapHandler = null
  } = {};
  if (useDataValue) {
    mapHandler = link => __spreadProps(__spreadValues({}, link), {
      value: dataMap[link.target]
    });
  } else if (!valueFull) {
    mapHandler = link => isNull(link.value) ? __spreadProps(__spreadValues({}, link), {
      value: dataMap[link.target]
    }) : link;
  }
  if (mapHandler) {
    innerLinks = links.map(mapHandler);
  }
  let result = {
    type: "sankey",
    data: seriesData,
    links: innerLinks,
    focusNodeAdjacency: "allEdges",
    nodeWidth: 12
  };
  result = Object.assign(result, {
    itemStyle: {
      opacity: 0.2
    },
    lineStyle: {
      opacity: 0.05
    }
  });
  let total = 0;
  seriesData.forEach(item => {
    const isExist = innerLinks.some(data => data.target === item.name);
    if (!isExist) {
      total += item.value;
    }
  });
  const defaultLabel = {
    backgroundColor: "transparent",
    lineHeight: 16,
    formatter(item) {
      return `{name|${item.name}}
{value|${Number(item.value / total).toFixed(2) * 100}%}`;
    },
    rich: {
      name: {
        color: "#4e4e4e"
      },
      value: {
        color: "#818181",
        padding: [4, 0, 0, 0]
      }
    }
  };
  result.label = Object.assign(defaultLabel, label || {});
  result.lineStyle = __spreadValues({
    color: "source",
    opacity: 0.5
  }, lineStyle || {});
  result.itemStyle = __spreadValues({
    borderWidth: 0
  }, itemStyle);
  return [result];
};
const sankey = (columns, rows, settings) => {
  const {
    dataType = ["normal", "normal"],
    dimension = columns[0],
    digit = 2,
    label
  } = settings;
  const {
    links,
    lineStyle,
    itemStyle,
    metrics = columns[1],
    useDataValue = false,
    valueFull = false
  } = settings;
  if (!links) {
    return;
  }
  const {
    itemDataType = dataType[0],
    linksDataType = dataType[1]
  } = {};
  const tooltip = getTooltip({
    itemDataType,
    linksDataType,
    digit
  });
  const seriesParams = {
    rows,
    dimension,
    metrics,
    links,
    valueFull,
    useDataValue,
    label,
    itemStyle,
    lineStyle
  };
  const series = getSeries(seriesParams);
  return {
    tooltip,
    series
  };
};
export { sankey };