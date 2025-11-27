import { __spreadProps, __spreadValues } from "../chunk-G2ADBYYC.js";
import { addMemory, searchMemory, selectedMemory } from './index.js';
var vue_storage_box_default = ({
  api,
  props,
  reactive,
  toRefs
}) => {
  const state = reactive({
    storageData: [],
    isMemoryStorage: false
  });
  return __spreadProps(__spreadValues({}, toRefs(state)), {
    addMemory: addMemory(props),
    searchMemory: searchMemory({
      props,
      state
    }),
    selectedMemory: selectedMemory({
      api,
      state
    })
  });
};
export { vue_storage_box_default as default };