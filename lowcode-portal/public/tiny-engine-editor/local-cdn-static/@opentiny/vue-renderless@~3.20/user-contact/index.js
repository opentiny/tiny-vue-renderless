import "../chunk-G2ADBYYC.js";
import { xss } from './../common/xss.js';
const getUserHref = ({
  api,
  props
}) => () => {
  let href = "javascript:;";
  if (!props.isNewImMode) {
    const data = props.data;
    const roleNumber = data.roleNumber ? data.roleNumber.toLocaleLowerCase() : "";
    if (roleNumber && api.testUID(roleNumber)) {
      href = `im:${roleNumber}`;
      return xss.filterUrl(href);
    }
  }
  return href;
};
const doUserAction = ({
  api,
  props,
  state,
  eSpaceCtrl
}) => () => {
  if (props.isNewImMode) {
    if (eSpaceCtrl) {
      if (state.initialized) {
        api.openEspace();
      } else {
        api.initEspaceLink();
      }
    }
  }
};
const initEspaceLink = ({
  api,
  props,
  state,
  eSpaceCtrl,
  eSpaceCtrlDisabled
}) => () => {
  const flag = localStorage.getItem("eSpaceCtrl_initialized");
  if (Number(flag)) {
    state.initialized = true;
    api.openEspace();
  } else if (!eSpaceCtrlDisabled) {
    const timeout = props.timeout || 3e3;
    const pollingInterval = props.pollingInterval || 1e3;
    const options = {
      timeout,
      pollingInterval
    };
    eSpaceCtrl.init && eSpaceCtrl.init(options);
    eSpaceCtrl.ready && eSpaceCtrl.ready(() => {
      state.initialized = true;
      api.openEspace();
    });
    eSpaceCtrl.error && eSpaceCtrl.error(() => {
      state.initialized = false;
    });
  }
};
const openEspace = ({
  api,
  props,
  eSpaceCtrl
}) => () => {
  const data = props.data;
  const roleNumber = data.roleNumber ? data.roleNumber.toLocaleLowerCase() : "";
  if (roleNumber && api.testUID(roleNumber)) {
    eSpaceCtrl.showImDialog(roleNumber);
  }
};
export { doUserAction, getUserHref, initEspaceLink, openEspace };