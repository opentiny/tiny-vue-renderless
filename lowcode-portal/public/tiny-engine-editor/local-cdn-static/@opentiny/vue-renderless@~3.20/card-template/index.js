import "../chunk-G2ADBYYC.js";
import PopupManager from './../common/deps/popup-manager.js';
const toolClick = showMoreTools => cb => {
  typeof cb === "function" && cb();
  showMoreTools.value = false;
};
const computedMoreTools = ({
  props
}) => () => Array.isArray(props.tools) && props.tools.length > 3 ? props.tools.slice(2) : [];
const computedTools = ({
  props,
  state,
  constants,
  refs,
  t
}) => () => {
  let result = [];
  const tools = props.tools;
  if (Array.isArray(tools) && tools.length) {
    if (tools.length <= 3) {
      result = tools;
    } else {
      result = [].concat(tools[0], tools[1], {
        icon: constants.MOREICON,
        title: t("ui.base.more"),
        click() {
          state.showMoreTools = !state.showMoreTools;
          refs.selector.style.zIndex = PopupManager.nextZIndex();
        }
      });
    }
  }
  return result;
};
export { computedMoreTools, computedTools, toolClick };