import "../chunk-G2ADBYYC.js";
import { handleFocus, handleEnterClick, handleHeaderClick, handleHeaderContainerClick } from './index.js';
import { guid } from './../common/string.js';
const api = ["state", "isActive", "handleFocus", "handleEnterClick", "handleHeaderClick", "handleHeaderContainerClick"];
const renderless = (props, {
  computed,
  reactive
}, {
  parent,
  constants,
  dispatch,
  designConfig
}) => {
  var _a;
  const _constants = parent.collapse._constants;
  const componentName = _constants.COMPONENT_NAME.Collapse;
  const eventName = _constants.EVENT_NAME.CollapseItemClick;
  const state = reactive({
    id: guid(),
    isClick: false,
    focusing: false,
    contentHeight: 0,
    contentWrapStyle: {
      height: "auto",
      display: "block"
    },
    isActive: computed(() => parent.collapse.state.activeNames.includes(props.name)),
    arrowIcon: props.expandIcon || ((_a = designConfig == null ? void 0 : designConfig.icons) == null ? void 0 : _a.arrowIcon) || "IconChevronRight"
  });
  const api2 = {
    state,
    handleFocus: handleFocus({
      state,
      interval: constants.INTERVAL
    }),
    handleEnterClick: handleEnterClick({
      componentName,
      dispatch,
      eventName,
      parent
    }),
    handleHeaderClick: handleHeaderClick({
      componentName,
      dispatch,
      eventName,
      props,
      parent,
      state
    })
  };
  Object.assign(api2, {
    handleHeaderContainerClick: handleHeaderContainerClick({
      api: api2
    })
  });
  return api2;
};
export { api, renderless };