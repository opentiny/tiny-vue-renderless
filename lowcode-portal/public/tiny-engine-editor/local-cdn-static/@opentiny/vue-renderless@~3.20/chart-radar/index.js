import "../chunk-G2ADBYYC.js";
import { getFormated } from './../chart-core/deps/utils.js';
import { itemPoint, itemLabel, itemContent } from './../chart-core/deps/constants.js';
import { isNull } from './../common/type.js';
const getRadarLegend = (rows, dimension, legendName) => {
  let legendData = rows.map(row => row[dimension]).filter(i => i);
  function formatter(name) {
    return isNull(legendName[name]) ? name : legendName[name];
  }
  return {
    data: legendData,
    formatter
  };
};
const getRadarTooltip = (dataType, radar2, digit) => {
  const {
    typeTemp = [],
    nameTemp = []
  } = {};
  radar2.indicator.forEach((item, i) => {
    typeTemp[i] = dataType[item.name];
    nameTemp[i] = item.name;
  });
  function formatter(item) {
    const tplt = [];
    tplt.push(itemPoint(item.color));
    tplt.push(`${item.name}<br />`);
    item.data.value.forEach((val, i) => {
      tplt.push(`${itemLabel(nameTemp[i])}`);
      tplt.push(`${itemContent(getFormated(val, typeTemp[i], digit))}<br />`);
    });
    return tplt.join("");
  }
  return {
    formatter
  };
};
const getRadarSetting = (rows, metrics, labelMap) => {
  const settingBase = {
    indicator: [],
    shape: "circle",
    splitNumber: 5,
    name: {
      textStyle: {
        color: "#191919"
      }
    },
    splitLine: {
      lineStyle: {
        color: "rgba(25,25,25,0.10)"
      }
    },
    splitArea: {
      show: false
    },
    axisLine: {
      lineStyle: {
        color: "rgba(25,25,25,0.10)"
      }
    }
  };
  let indicatorTemp = {};
  rows.forEach(items => {
    metrics.forEach(item => {
      const key = isNull(labelMap[item]) ? item : labelMap[item];
      if (indicatorTemp[key]) {
        indicatorTemp[key].push(items[item]);
      } else {
        indicatorTemp[key] = [items[item]];
      }
    });
  });
  settingBase.indicator = Object.keys(indicatorTemp).map(key => ({
    name: key,
    max: Math.max.apply(null, indicatorTemp[key])
  }));
  return settingBase;
};
const getRadarSeries = args => {
  const {
    areaStyle,
    dimension,
    itemStyle,
    label,
    labelMap,
    lineStyle,
    metrics,
    radar: radar2,
    rows
  } = args;
  let radarIndexObj = {};
  radar2.indicator.forEach((item, i) => radarIndexObj[item.name] = i);
  const seriesData = rows.map(row => {
    const serieData = {
      value: [],
      name: row[dimension] || "",
      symbol: "circle",
      symbolSize: 8,
      showSymbol: false,
      emphasis: {
        itemStyle: {
          borderColor: "#fff",
          borderWidth: 2
        }
      }
    };
    Object.keys(row).forEach(key => {
      if (~metrics.indexOf(key)) {
        let k = isNull(labelMap[key]) ? radarIndexObj[key] : radarIndexObj[labelMap[key]];
        serieData.value[k] = row[key];
      }
    });
    return serieData;
  });
  const result = {
    data: seriesData,
    name: dimension,
    type: "radar",
    areaStyle: {
      normal: {
        opacity: 0.3
      }
    }
  };
  label && (result.label = label);
  itemStyle && (result.itemStyle = itemStyle);
  lineStyle && (result.lineStyle = lineStyle);
  areaStyle && (result.areaStyle = areaStyle);
  return [result];
};
const radar = (columns, rows, settings, extra) => {
  const {
    dataType = {},
    legendName = {},
    labelMap = {},
    dimension = columns[0]
  } = settings;
  const {
    digit = 2,
    label,
    itemStyle,
    lineStyle,
    areaStyle
  } = settings;
  const {
    tooltipVisible,
    legendVisible
  } = extra;
  let metrics = columns.slice();
  if (!settings.metrics) {
    metrics.splice(columns.indexOf(dimension), 1);
  } else {
    metrics = settings.metrics;
  }
  const legend = legendVisible && getRadarLegend(rows, dimension, legendName);
  const radar2 = getRadarSetting(rows, metrics, labelMap);
  const tooltip = tooltipVisible && getRadarTooltip(dataType, radar2, digit);
  const serieParams = {
    rows,
    dimension,
    metrics,
    radar: radar2
  };
  Object.assign(serieParams, {
    label,
    itemStyle,
    lineStyle,
    labelMap,
    areaStyle
  });
  const series = getRadarSeries(serieParams);
  return {
    legend,
    radar: radar2,
    series,
    tooltip
  };
};
export { radar };