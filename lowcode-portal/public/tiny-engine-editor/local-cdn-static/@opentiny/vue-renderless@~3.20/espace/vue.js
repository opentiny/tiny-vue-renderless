import "../chunk-G2ADBYYC.js";
import { init } from './../common/deps/eSpaceCtrl.js';
import { getUserHref, getUserTitle, doUserAction, initEspaceLink, openEspace, testUID, soundEspace } from './index.js';
const api = ["getUserHref", "getUserTitle", "doUserAction", "initEspaceLink", "openEspace", "testUID", "soundEspace"];
const renderless = (props, {
  reactive
}, {
  service
}) => {
  const api2 = {};
  const {
    setting = {}
  } = service || {};
  const {
    widgets = {}
  } = setting;
  const eSpaceCtrlDisabled = widgets.ESpaceCtrl && !widgets.ESpaceCtrl.autoLink;
  const eSpaceCtrl = eSpaceCtrlDisabled ? {} : init();
  const state = reactive({
    initialized: false,
    dataItem: null
  });
  Object.assign(api2, {
    state,
    testUID,
    getUserTitle,
    getUserHref: getUserHref({
      api: api2,
      props
    }),
    initEspaceLink: initEspaceLink({
      api: api2,
      props,
      state,
      eSpaceCtrl,
      eSpaceCtrlDisabled
    }),
    doUserAction: doUserAction({
      api: api2,
      props,
      state,
      eSpaceCtrl
    }),
    openEspace: openEspace({
      api: api2,
      state,
      eSpaceCtrl
    }),
    soundEspace: soundEspace({
      api: api2,
      state,
      eSpaceCtrl
    })
  });
  return api2;
};
export { api, renderless };