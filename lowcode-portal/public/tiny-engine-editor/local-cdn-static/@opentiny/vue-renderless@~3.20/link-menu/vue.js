import "../chunk-G2ADBYYC.js";
import { initData, dialogTitle, disabledParentNode, filterNode, getValue, hideDialog, showDialog, sureNodevalue, disabledTreeNode, initService } from './index.js';
import { copyArray } from './../common/object.js';
import { setMenuKey } from './../tree-menu/index.js';
const api = ["state", "initData", "filterNode", "getValue", "hideDialog", "setMenuKey", "showDialog", "sureNodevalue"];
const initState = ({
  reactive,
  computed,
  api: api2
}) => {
  const state = reactive({
    filterText: "",
    datas: [],
    disabled: false,
    alertShow: false,
    boxVisibility: false,
    listItem: [],
    getNodeValue: [],
    currentCheckNode: [],
    titles: computed(() => api2.dialogTitle())
  });
  return state;
};
const initWatch = ({
  watch,
  state,
  props,
  nextTick,
  vm
}) => {
  watch(() => state.filterText, value => nextTick(() => vm.$refs.tree.filter(value)));
  watch(() => props.data, value => {
    if (value) {
      const changeData = copyArray(value);
      changeData.forEach(item => {
        if (!item.children) {
          item.disabled = false;
        } else {
          item.children.forEach(item2 => {
            item2.disabled = false;
          });
        }
      });
      state.datas = changeData;
    }
  }, {
    immediate: true
  });
};
const initApi = ({
  api: api2,
  state,
  constants,
  props,
  t,
  service,
  vm
}) => {
  Object.assign(api2, {
    state,
    filterNode: filterNode(),
    showDialog: showDialog(state),
    sureNodevalue: sureNodevalue(state),
    disabledTreeNode: disabledTreeNode(state),
    disabledParentNode: disabledParentNode(state),
    dialogTitle: dialogTitle({
      constants,
      props,
      t
    }),
    setMenuKey: setMenuKey(api2),
    getValue: getValue({
      api: api2,
      state,
      props
    }),
    initData: initData({
      state,
      props,
      service,
      api: api2
    }),
    hideDialog: hideDialog({
      api: api2,
      state,
      vm,
      props
    })
  });
};
const renderless = (props, {
  computed,
  onMounted,
  reactive,
  watch
}, {
  t,
  vm,
  service,
  constants,
  nextTick
}) => {
  service = initService({
    props,
    service
  });
  const api2 = {};
  const state = initState({
    reactive,
    computed,
    api: api2
  });
  initWatch({
    watch,
    state,
    props,
    nextTick,
    vm
  });
  onMounted(() => {
    api2.initData();
    api2.disabledParentNode(state);
  });
  initApi({
    api: api2,
    state,
    constants,
    props,
    t,
    service,
    vm
  });
  return api2;
};
export { api, renderless };