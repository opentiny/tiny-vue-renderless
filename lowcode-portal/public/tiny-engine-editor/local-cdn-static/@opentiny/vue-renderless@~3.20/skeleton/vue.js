import "../chunk-G2ADBYYC.js";
import { toPxStyle } from './index.js';
const api = ["toPxStyle"];
const renderless = (props, {
  toRefs,
  provide
}) => {
  const {
    animated
  } = toRefs(props);
  provide("animated", animated);
  const api2 = {
    toPxStyle
  };
  return api2;
};
export { api, renderless };