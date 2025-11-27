import "../chunk-G2ADBYYC.js";
import { setSheetStyle, initScrollMenu, visibleHandle, watchVisible, menuHandle, close, selectOption, confirm, actionSelectOption, hide, handleClose } from './index.js';
const api = ["state", "setSheetStyle", "initScrollMenu", "visibleHandle", "watchVisible", "menuHandle", "close", "selectOption", "confirm", "actionSelectOption", "hide"];
const renderless = (props, {
  reactive,
  watch
}, {
  emit,
  nextTick,
  refs,
  vm
}, {
  BScroll
}) => {
  const state = reactive({
    toggle: false,
    sheetMaskStyle: {},
    sheetContentStyle: {},
    scroll: null
  });
  const api2 = {};
  Object.assign(api2, {
    state,
    setSheetStyle: setSheetStyle({
      state,
      props
    }),
    initScrollMenu: initScrollMenu({
      state,
      nextTick,
      refs,
      BScroll
    }),
    visibleHandle: visibleHandle({
      emit,
      state
    }),
    watchVisible: watchVisible({
      emit,
      state
    }),
    menuHandle: menuHandle({
      state,
      emit
    }),
    confirm: confirm({
      state,
      api: api2
    }),
    selectOption: selectOption({
      emit,
      props
    }),
    actionSelectOption: actionSelectOption({
      emit
    }),
    hide: hide({
      api: api2
    }),
    close: close({
      api: api2
    }),
    handleClose: handleClose({
      vm,
      emit,
      props
    })
  });
  watch(() => props.visible, value => {
    if (value) {
      api2.setSheetStyle({
        state,
        props
      });
      api2.initScrollMenu({
        state,
        nextTick,
        refs,
        BScroll
      });
    }
    api2.watchVisible(value);
  });
  watch(() => props.visible, api2.watchVisible, {
    immediate: true
  });
  return api2;
};
export { api, renderless };