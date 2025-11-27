import { __spreadProps, __spreadValues } from "../chunk-G2ADBYYC.js";
import { importData, initEvent } from './index.js';
const api = [];
const renderless = (props, {
  getCurrentInstance,
  onMounted,
  onUnmounted,
  watch
}, {
  emit
}, {
  MindElixir
}) => {
  const api2 = {};
  let destoryListener = null;
  onMounted(() => {
    var _a;
    const instance = getCurrentInstance();
    if (!instance) {
      throw new Error("Can not find instance. Please open Issue: https://github.com/opentiny/tiny-vue/issues/new/choose");
    }
    const mindmap = instance.refs.mindmap;
    const render = new MindElixir(__spreadProps(__spreadValues({
      contextMenu: false,
      toolBar: false,
      nodeMenu: false
    }, (_a = props.options) != null ? _a : {}), {
      el: mindmap
    }));
    destoryListener = initEvent(render, emit);
    emit("create", render);
    watch(() => props.modelValue, () => {
      if (props.modelValue) {
        emit("beforeImport", {
          render,
          data: props.modelValue
        });
        importData(render, props.modelValue);
        emit("afterImport", {
          render,
          data: props.modelValue
        });
      } else {
        const root = MindElixir.new("root");
        render.init(root);
      }
    }, {
      deep: true,
      immediate: true
    });
  });
  onUnmounted(() => {
    destoryListener == null ? void 0 : destoryListener();
  });
  return api2;
};
export { api, renderless };