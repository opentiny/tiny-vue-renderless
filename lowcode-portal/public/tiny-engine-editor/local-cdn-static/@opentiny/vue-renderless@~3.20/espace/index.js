import "../chunk-G2ADBYYC.js";
import { xss } from './../common/xss.js';
const getUserHref = ({
  api,
  props
}) => item => {
  const type = item.type ? String(item.type).toLocaleLowerCase() : "";
  const value = item.value ? String(item.value).toLocaleLowerCase() : "";
  let href = "";
  if (props.isNewImMode) {
    if (type === "im" || type === "sip") {
      href = "javascript:;";
    } else {
      href = `${type}:${value}`;
    }
    if (type === "im" || type === "sip") {
      api.testUID(value);
    }
  } else {
    href = `${type}:${value}`;
  }
  return xss.filterUrl(href);
};
const getUserTitle = item => {
  const type = item.type ? String(item.type).toLocaleLowerCase() : "";
  const value = item.value ? String(item.value).toLocaleLowerCase() : "";
  const title = `${type}:${value}`;
  return title;
};
const doUserAction = ({
  api,
  props,
  state,
  eSpaceCtrl
}) => (item, ev) => {
  ev == null ? void 0 : ev.preventDefault();
  state.dataItem = item;
  const type = item.type ? String(item.type).toLocaleLowerCase() : "";
  if (props.isNewImMode) {
    if (eSpaceCtrl) {
      if (state.initialized) {
        if (type === "im") {
          api.openEspace();
        } else if (type === "sip") {
          api.soundEspace();
        }
      } else {
        if (type === "im" || type === "sip") {
          api.initEspaceLink();
        }
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
  const dataItem = state.dataItem;
  const type = dataItem.type ? String(dataItem.type).toLocaleLowerCase() : "";
  if (Number(flag)) {
    state.initialized = true;
    if (type === "im") {
      api.openEspace();
    } else if (type === "sip") {
      api.soundEspace();
    }
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
      if (type === "im") {
        api.openEspace();
      } else if (type === "sip") {
        api.soundEspace();
      }
    });
    eSpaceCtrl.error && eSpaceCtrl.error(() => {
      state.initialized = false;
    });
  }
};
const openEspace = ({
  api,
  state,
  eSpaceCtrl
}) => () => {
  const dataItem = state.dataItem;
  const uid = dataItem.value ? String(dataItem.value).toLocaleLowerCase() : "";
  if (uid && api.testUID(uid)) {
    eSpaceCtrl.showImDialog(uid);
  }
};
const testUID = uid => {
  uid = uid ? String(uid).toLocaleLowerCase() : "";
  if (uid) {
    const employer = /^[a-z]\d+$/i;
    const employee = /^[a-z]{3}\d+$/i;
    if (!employer.test(uid) && !employee.test(uid)) {
      return false;
    }
    return true;
  }
  return false;
};
const soundEspace = ({
  api,
  state,
  eSpaceCtrl
}) => () => {
  const dataItem = state.dataItem;
  const uid = dataItem.value ? String(dataItem.value).toLocaleLowerCase() : "";
  if (uid && api.testUID(uid)) {
    eSpaceCtrl.eSpaceCallByAccount(uid);
  }
};
export { doUserAction, getUserHref, getUserTitle, initEspaceLink, openEspace, soundEspace, testUID };