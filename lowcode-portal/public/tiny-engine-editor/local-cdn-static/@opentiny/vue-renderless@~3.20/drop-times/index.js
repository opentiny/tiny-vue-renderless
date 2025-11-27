import "../chunk-G2ADBYYC.js";
import { format } from './../common/date.js';
const init = ({
  state,
  props
}) => () => {
  let list = [];
  let value;
  for (let minutes = props.start; minutes <= props.end; minutes += props.step) {
    value = format(new Date(0, 0, 0, 0, minutes, 0), "hh:mm");
    list.push({
      label: value,
      value
    });
  }
  state.options = list;
};
const change = emit => value => {
  emit("update:modelValue", value);
  emit("change", value);
};
export { change, init };