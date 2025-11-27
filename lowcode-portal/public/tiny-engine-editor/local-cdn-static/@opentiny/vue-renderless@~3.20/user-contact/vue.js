import "../chunk-G2ADBYYC.js";
import { init } from './../common/deps/eSpaceCtrl.js';
import { getUserHref, doUserAction, initEspaceLink, openEspace } from './index.js';
import { testUID } from './../espace/index.js';
const api = ["show", "getUserHref", "doUserAction", "initEspaceLink", "openEspace", "testUID"];
const renderless = (props, {
  reactive,
  ref
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
    initialized: false
  });
  Object.assign(api2, {
    state,
    testUID,
    show: ref(false),
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
      props,
      eSpaceCtrl
    })
  });
  return api2;
};
export { api, renderless };