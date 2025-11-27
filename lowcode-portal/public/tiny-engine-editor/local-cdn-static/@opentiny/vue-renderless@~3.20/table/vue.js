import "../chunk-G2ADBYYC.js";
import { computedCheckableData, computedSelectedKeys, computedSelectCls, watchDefaultChecked, watchSelected, selectRow, togeSelected, togeSelectAll } from './index.js';
const api = ["state", "selectRow", "togeSelected", "togeSelectAll"];
const renderless = (props, {
  computed,
  reactive,
  watch
}, {
  t,
  emit
}) => {
  const api2 = {};
  const state = reactive({
    selectedRow: null,
    checkChangeByUser: false,
    selected: [],
    checkableData: computed(() => api2.computedCheckableData()),
    selectedKeys: computed(() => api2.computedSelectedKeys()),
    selectCls: computed(() => api2.computedSelectCls())
  });
  Object.assign(api2, {
    t,
    state,
    computedSelectCls: computedSelectCls({
      state
    }),
    computedSelectedKeys: computedSelectedKeys({
      props,
      state
    }),
    computedCheckableData: computedCheckableData({
      props
    }),
    selectRow: selectRow({
      emit,
      state
    }),
    togeSelected: togeSelected({
      state
    }),
    togeSelectAll: togeSelectAll({
      emit,
      props,
      state
    }),
    watchSelected: watchSelected({
      emit,
      props,
      state
    }),
    watchDefaultChecked: watchDefaultChecked({
      props,
      state
    })
  });
  watch(() => props.defaultChecked, api2.watchDefaultChecked);
  watch(() => state.selected, api2.watchSelected);
  return api2;
};
export { api, renderless };