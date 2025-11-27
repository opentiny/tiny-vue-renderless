import "../chunk-G2ADBYYC.js";
import { isNumber, isNull } from './../common/type.js';
const toPxStyle = value => {
  if (isNull(value)) {
    return void 0;
  }
  if (isNumber(value)) {
    return `${value}px`;
  }
  return String(value);
};
export { toPxStyle };