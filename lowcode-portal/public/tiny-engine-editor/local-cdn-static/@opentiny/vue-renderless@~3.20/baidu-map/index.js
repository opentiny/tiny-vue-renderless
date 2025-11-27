import "../chunk-G2ADBYYC.js";
import { getBmap } from './../chart-core/deps/utils.js';
const bmap = (columns, rows, settings, extra) => {
  const {
    key,
    v,
    bmap: bmap2,
    useOuterMap,
    url
  } = settings;
  const {
    _once
  } = extra;
  const registerSign = "bmap_register";
  if (_once[registerSign]) {
    return {};
  }
  _once[registerSign] = true;
  if (useOuterMap) {
    return {
      bmap: bmap2
    };
  }
  return getBmap({
    key,
    version: v,
    url
  }).then(() => ({
    bmap: bmap2
  }));
};
export { bmap };