import { __spreadProps, __spreadValues } from "../chunk-G2ADBYYC.js";
import { mapTree } from './../grid/static/index.js';
import { copyArray } from './../common/object.js';
const dialogTitle = ({
  constants,
  props,
  t
}) => () => props.title || t(constants.DIALOG_TITLE);
const showDialog = state => () => state.boxVisibility = true;
const hideDialog = ({
  api,
  state,
  vm,
  props
}) => () => {
  if (!props.keepSelectedNodes) {
    state.currentCheckNode.forEach(item => {
      const isNode = state.listItem.filter(data => data.id === item.id);
      if (isNode.length) {
        vm.$refs.tree.setChecked(item, true, true);
        if (item.disabled !== void 0) {
          item.disabled = false;
        }
      } else {
        vm.$refs.tree.setChecked(item, false, true);
      }
    });
    state.getNodeValue = copyArray(state.listItem);
    if (state.getNodeValue.length === props.maxItem) {
      api.disabledTreeNode(state.getNodeValue, true);
    } else if (state.getNodeValue.length < props.maxItem) {
      api.disabledTreeNode(state.getNodeValue, false);
    }
    state.currentCheckNode = [];
  }
  state.boxVisibility = false;
};
const sureNodevalue = state => () => {
  state.listItem = state.getNodeValue.slice();
  state.currentCheckNode = [];
  state.boxVisibility = false;
};
const filterNode = () => (value, data) => data.label.includes(value);
const getValue = ({
  api,
  props,
  state
}) => value => {
  if (!props.keepSelectedNodes) {
    state.currentCheckNode.push(value);
  }
  let index = -1;
  state.getNodeValue.forEach((data, indexx) => {
    if (data.id === value.id) {
      index = indexx;
    }
  });
  index !== -1 ? state.getNodeValue.splice(index, 1) : state.getNodeValue.push(value);
  if (state.getNodeValue.length === props.maxItem) {
    api.disabledTreeNode(state.getNodeValue, true);
  } else if (state.getNodeValue.length < props.maxItem) {
    api.disabledTreeNode(state.getNodeValue, false);
  }
};
const disabledTreeNode = state => (arr, isDisabled) => {
  state.datas.forEach(item => {
    if (!item.children) {
      const index = arr.filter(data => data.id === item.id);
      if (!index.length) {
        item.disabled = isDisabled;
      }
    } else {
      item.children.forEach(item2 => {
        const index = arr.filter(data => data.id === item2.id);
        if (!index.length) {
          item2.disabled = isDisabled;
        }
      });
    }
  });
};
const initData = ({
  state,
  props,
  service,
  api
}) => () => {
  let data = props.data;
  if (!data && typeof service.getMenuDataSync === "function") {
    const menuData = service.getMenuDataSync();
    data = api.setMenuKey({
      newData: [],
      menuData
    });
  }
  state.datas = mapTree(data || [], item => __spreadProps(__spreadValues({}, item), {
    disabled: false
  }));
};
const disabledParentNode = state => () => {
  state.datas.forEach(item => {
    if (item.children) {
      item.disabled = true;
    }
  });
};
const initService = ({
  props,
  service
}) => {
  const $service = service || {
    base: {}
  };
  return {
    getMenuDataSync: props.getMenuDataSync || $service.base.getMenuDataSync
  };
};
export { dialogTitle, disabledParentNode, disabledTreeNode, filterNode, getValue, hideDialog, initData, initService, showDialog, sureNodevalue };