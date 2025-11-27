import "../chunk-G2ADBYYC.js";
import { getFormated, isObject } from './../chart-core/deps/utils.js';
import { itemLabel, itemContent } from './../chart-core/deps/constants.js';
const isArr = Array.isArray;
const getTooltip = args => {
  const {
    tooltipFormatter,
    dataType,
    digit
  } = args;
  function formatter(options) {
    const {
      seriesName,
      value
    } = options;
    if (!tooltipFormatter) {
      return [`${itemLabel(seriesName)}`, itemContent(getFormated(value, dataType, digit))].join("");
    }
    return tooltipFormatter.apply(null, arguments);
  }
  return {
    show: true,
    formatter
  };
};
const getSeries = args => {
  const {
    dimension,
    metrics,
    rows,
    seriesMap,
    wave
  } = args;
  let itemWave = wave;
  let len = isArr(seriesMap) ? seriesMap.length : 0;
  return rows.slice().map((item, index) => {
    let {
      data = [],
      result = {
        type: "liquidFill"
      },
      name = item[dimension]
    } = {};
    let {
      val = Number(item[metrics]),
      itemMap = {}
    } = {};
    if (isArr(seriesMap)) {
      itemMap = seriesMap[index] ? seriesMap[index] : seriesMap[len - 1];
    } else if (isObject(seriesMap[name])) {
      itemMap = seriesMap[name];
    }
    if (isArr(wave) && isArr(wave[0])) {
      itemWave = !isArr(wave[index]) ? wave[wave.length - 1] : wave[index];
    }
    data.push({
      value: val
    });
    if (itemWave.length && itemWave) {
      data = data.concat(itemWave.map(val2 => ({
        value: val2
      })));
    }
    result.itemStyle = {
      shadowBlur: 0
    };
    result.label = {
      color: "#6D8FF0"
    };
    result.backgroundStyle = {
      color: "#F4F3F9"
    };
    result.outline = {
      itemStyle: {
        borderColor: "#6D8FF0",
        shadowBlur: 0
      }
    };
    !itemMap.color && (result.itemStyle = Object.assign(result.itemStyle, {
      color: "#6D8FF0"
    }));
    result = Object.assign(result, {
      data,
      name
    }, itemMap);
    return result;
  });
};
const liquidfill = (columns, rows, settings, extra) => {
  const {
    dimension = columns[0],
    metrics = columns[1]
  } = settings;
  const {
    seriesMap = {},
    dataType = "percent",
    digit = 2,
    wave = []
  } = settings;
  const {
    tooltipVisible,
    tooltipFormatter
  } = extra;
  const tooltip = tooltipVisible && getTooltip({
    tooltipFormatter,
    dataType,
    digit
  });
  const series = getSeries({
    rows,
    columns,
    dimension,
    metrics,
    seriesMap,
    wave
  });
  return {
    tooltip,
    series
  };
};
export { liquidfill };