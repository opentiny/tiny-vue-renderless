import { __spreadValues } from "../chunk-G2ADBYYC.js";
import { getFormated, hexToRgb } from './../chart-core/deps/utils.js';
import { itemPoint, itemLabel, itemContent } from './../chart-core/deps/constants.js';
import { line } from './../chart-line/index.js';
import { isNull } from './../common/type.js';
const getScatterLegend = (dataLabels, legendName) => {
  function formatter(name) {
    return isNull(legendName[name]) ? name : legendName[name];
  }
  return {
    data: dataLabels,
    formatter,
    itemStyle: {
      borderWidth: 1
    }
  };
};
const getTooltipContent = (item, args) => {
  const {
    labelMap,
    columns
  } = args;
  const {
    dataType,
    digit
  } = args;
  const template = [];
  const {
    color,
    seriesName,
    data
  } = item;
  const {
    value
  } = data;
  template.push(`${itemPoint(color)} ${seriesName}<br>`);
  value.forEach((d, i) => {
    const name = labelMap[columns[i]] || columns[i];
    const num = isNaN(d) ? d : getFormated(d, dataType[columns[i]], digit);
    template.push(`${itemLabel(name)}${itemContent(num)}<br>`);
  });
  return template.join("");
};
const getScatterTooltip = args => {
  const {
    tooltipTrigger
  } = args;
  function formatter(item) {
    return Array.isArray(item) ? item.map(i => getTooltipContent(i, args)).join("") : getTooltipContent(item, args);
  }
  return {
    trigger: tooltipTrigger,
    formatter
  };
};
const getScatterXAxis = args => {
  const {
    rows,
    dataLabels,
    dimension
  } = args;
  const {
    xAxisName,
    axisVisible,
    xAxisType
  } = args;
  const data = [];
  dataLabels.forEach(dataLabel => {
    const items = rows[dataLabel];
    items.forEach(item => {
      const name = item[dimension];
      name && !~data.indexOf(name) && data.push(name);
    });
  });
  return [{
    type: xAxisType,
    show: axisVisible,
    name: xAxisName,
    data,
    offset: 5,
    axisLabel: {
      show: true,
      color: "#4E4E4E"
    }
  }];
};
const getScatterYAxis = args => {
  const {
    axisVisible,
    dataType,
    digit,
    min
  } = args;
  const {
    metrics,
    max,
    scale,
    yAxisName
  } = args;
  function formatter(val) {
    return getFormated(val, dataType[metrics[0]], digit);
  }
  let result = {
    type: "value",
    show: axisVisible,
    scale,
    min,
    max
  };
  Object.assign(result, {
    axisTick: {
      show: false
    },
    name: yAxisName,
    offset: 10,
    axisLabel: {
      show: true,
      formatter,
      color: "#4E4E4E"
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: "rgba(25,25,25,0.10)"
      }
    }
  });
  return result;
};
const getScatterSeries = args => {
  const {
    columns,
    cursor,
    dataLabels,
    dimension,
    itemStyle,
    label,
    metrics,
    color
  } = args;
  const {
    rows,
    symbol,
    symbolRotate,
    symbolSize,
    symbolSizeMax,
    symbolOffset
  } = args;
  const extraMetrics = columns.filter(column => !~metrics.indexOf(column) && column !== dimension);
  const numbers = [];
  dataLabels.forEach(dataLabel => rows[dataLabel].forEach(row => numbers.push(row[metrics[1]])));
  const {
    maxNum = Math.max(...numbers),
    series = []
  } = {};
  dataLabels.forEach((dataLabel, index) => {
    const {
      result = [],
      itemData = rows[dataLabel]
    } = {};
    itemData.forEach(item => {
      const itemResult = {
        value: []
      };
      itemResult.value.push(item[dimension], item[metrics[0]], item[metrics[1]]);
      extraMetrics.forEach(ext => itemResult.value.push(item[ext]));
      itemResult.symbolSize = symbolSize || item[metrics[1]] / maxNum * symbolSizeMax;
      result.push(itemResult);
    });
    const serie = {
      type: "scatter",
      data: result,
      name: dataLabel,
      label,
      itemStyle: __spreadValues({
        borderWidth: 1,
        borderColor: color[index],
        color: `rgba(${hexToRgb(color[index])}, 0.3)`
      }, itemStyle || {})
    };
    Object.assign(serie, {
      symbol,
      symbolRotate,
      symbolOffset,
      cursor
    });
    series.push(serie);
  });
  return series;
};
const getSeries = args => {
  const {
    cursor,
    label,
    tooltip,
    itemStyle,
    symbolSizeMax
  } = args;
  const {
    series,
    color,
    symbol,
    symbolSize,
    symbolRotate,
    symbolOffset
  } = args;
  series.forEach((item, index) => {
    const itemBase = {
      type: "scatter",
      symbol
    };
    const numbers = [];
    const data = item.data;
    data.forEach(row => numbers.push(row[1]));
    const maxNum = Math.max(...numbers);
    item.data = data.map(item2 => ({
      value: item2,
      symbolSize: symbolSize || item2[1] / maxNum * symbolSizeMax
    }));
    Object.assign(itemBase, {
      symbolRotate,
      symbolOffset,
      cursor,
      label,
      tooltip,
      itemStyle: __spreadValues({
        borderWidth: 1,
        borderColor: color[index],
        color: `rgba(${hexToRgb(color[index])}, 0.3)`
      }, itemStyle || {}),
      emphasis: {
        itemStyle: {
          borderWidth: 1,
          borderColor: color[index]
        }
      }
    });
    Object.assign(item, itemBase);
  });
  return series;
};
const scatter = (columns, rows, settings, extra) => {
  const {
    dimension = columns[0],
    metrics = [columns[1], columns[2]],
    dataType = {}
  } = settings;
  const {
    xAxisType = "category",
    xAxisName,
    yAxisName,
    digit = 2,
    legendName = {}
  } = settings;
  const {
    labelMap = {},
    tooltipTrigger = "item",
    axisVisible = true,
    symbolSizeMax = 50,
    symbol
  } = settings;
  const {
    symbolSize,
    symbolRotate,
    symbolOffset,
    cursor,
    min,
    max,
    scale,
    label,
    itemStyle
  } = settings;
  const {
    tooltipVisible,
    legendVisible,
    color
  } = extra;
  const tooltip = tooltipVisible && getScatterTooltip({
    tooltipTrigger,
    labelMap,
    columns,
    dataType,
    digit
  });
  if (Array.isArray(rows)) {
    const lineSettings = __spreadValues(__spreadValues({}, settings), {
      yAxisName: yAxisName ? [yAxisName] : void 0,
      xAxisName: xAxisName ? [xAxisName] : void 0,
      dimension: dimension ? [dimension] : void 0,
      max: max ? [max] : void 0,
      min: min ? [min] : void 0,
      scale: scale ? [scale] : void 0
    });
    const options = line(columns, rows, lineSettings, extra);
    if (!options || !options.series) {
      return {};
    }
    const baseObj = {
      color,
      symbol,
      symbolSize,
      symbolRotate,
      symbolOffset,
      cursor,
      label,
      itemStyle,
      symbolSizeMax
    };
    options.series = getSeries(__spreadValues({
      tooltip,
      series: options.series
    }, baseObj));
    options.legend = __spreadValues({
      itemStyle: {
        borderWidth: 1
      }
    }, options.legend || {});
    return options;
  }
  const dataLabels = Object.keys(rows);
  const legend = legendVisible && getScatterLegend(dataLabels, legendName);
  const xAxisParam = {
    xAxisName,
    axisVisible,
    xAxisType,
    dataLabels,
    dimension,
    rows
  };
  const xAxis = getScatterXAxis(xAxisParam);
  const yAxisParam = {
    min,
    max,
    scale,
    yAxisName,
    dataType,
    metrics,
    digit,
    axisVisible
  };
  const yAxis = getScatterYAxis(yAxisParam);
  const seriesParam = {
    rows,
    dataLabels,
    columns,
    metrics,
    dimension,
    label,
    itemStyle,
    symbol
  };
  Object.assign(seriesParam, {
    symbolSizeMax,
    symbolSize,
    symbolRotate,
    symbolOffset,
    cursor,
    color
  });
  const series = getScatterSeries(seriesParam);
  return {
    legend,
    tooltip,
    xAxis,
    yAxis,
    series
  };
};
export { scatter };