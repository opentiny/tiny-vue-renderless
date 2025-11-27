import "../chunk-G2ADBYYC.js";
import { xss } from './../common/xss.js';
const computeData = ({
  props
}) => {
  if (Array.isArray(props.data) && props.data.length) {
    props.data.forEach(item => {
      item.url = xss.filterUrl(item.url);
    });
  }
  return props.data;
};
export { computeData };