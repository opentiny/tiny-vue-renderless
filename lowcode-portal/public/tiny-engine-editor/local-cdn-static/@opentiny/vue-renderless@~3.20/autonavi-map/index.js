import "../chunk-G2ADBYYC.js";
import { getAmap } from './../chart-core/deps/utils.js';
const amap = (columns, rows, settings, extra) => {
  const {
    key,
    v,
    amap: amap2,
    useOuterMap,
    url
  } = settings;
  const {
    _once
  } = extra;
  const registerSign = "amap_register";
  if (_once[registerSign]) {
    return {};
  }
  _once[registerSign] = true;
  if (useOuterMap) {
    return {
      amap: amap2
    };
  }
  return getAmap({
    key,
    version: v,
    url
  }).then(() => ({
    amap: amap2
  }));
};
export { amap };