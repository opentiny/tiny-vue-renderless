import "../chunk-G2ADBYYC.js";
import { getLocales, setText, switchLanguage, initService, changeLocale } from './index.js';
const api = ["state", "switchLanguage", "t", "changeLocale"];
const renderless = (props, {
  reactive,
  watch
}, {
  t,
  service
}, vnode) => {
  const api2 = {};
  const $service = initService({
    props,
    service
  });
  const state = reactive({
    current: "",
    locales: [],
    visible: false,
    text: ""
  });
  Object.assign(api2, {
    t,
    state,
    setText: setText(state),
    changeLocale: changeLocale({
      props,
      service: $service,
      vnode
    }),
    switchLanguage: switchLanguage({
      api: api2,
      service: $service,
      state
    }),
    getLocales: getLocales({
      api: api2,
      service: $service,
      state
    })
  });
  api2.getLocales();
  watch(() => state.current, api2.changeLocale, {
    immediate: true
  });
  return api2;
};
export { api, renderless };