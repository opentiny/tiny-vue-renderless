import "../chunk-G2ADBYYC.js";
import { change, draw } from './index.js';
const api = ["state"];
const renderless = (props, {
  reactive,
  watch,
  onMounted
}, {
  vm,
  emit
}, {
  QRCode
}) => {
  const api2 = {};
  const state = reactive({
    sizeStr: "",
    iconSizeStr: "",
    iconBackgroudColor: ""
  });
  Object.assign(api2, {
    state,
    draw: draw({
      props,
      state,
      vm,
      QRCode
    }),
    change: change(emit)
  });
  onMounted(() => {
    api2.draw();
  });
  watch(() => [props.level, props.value], () => {
    api2.draw();
    api2.change();
  });
  return api2;
};
export { api, renderless };