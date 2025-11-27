import "../chunk-G2ADBYYC.js";
import { on, off } from './../common/deps/dom.js';
import { show, hide, confirm, handleEmit, handleDocumentClick } from './index.js';
const api = ["state", "show", "hide", "confirm", "handleEmit"];
const renderless = (props, {
  computed,
  reactive,
  onMounted,
  onBeforeUnmount
}, {
  emit,
  constants,
  designConfig,
  vm
}) => {
  var _a;
  const api2 = {};
  const designIcon = (_a = designConfig == null ? void 0 : designConfig.icons) == null ? void 0 : _a[props.type];
  const state = reactive({
    isLock: false,
    showPopover: false,
    getIcon: computed(() => typeof props.type === "object" ? props.type : designIcon || constants.ICON_MAP[props.type])
  });
  Object.assign(api2, {
    state,
    show: show({
      state,
      emit,
      props
    }),
    hide: hide({
      state,
      emit
    }),
    confirm: confirm({
      state,
      api: api2
    }),
    handleEmit: handleEmit({
      state,
      emit,
      vm
    }),
    handleDocumentClick: handleDocumentClick({
      api: api2,
      vm
    })
  });
  onMounted(() => {
    props.closeOnClickOutside && on(document, "click", api2.handleDocumentClick);
  });
  onBeforeUnmount(() => {
    props.closeOnClickOutside && off(document, "click", api2.handleDocumentClick);
  });
  return api2;
};
export { api, renderless };