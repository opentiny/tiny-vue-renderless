import "../chunk-G2ADBYYC.js";
import { POSITION } from './../common/index.js';
import { capitalize } from './../common/string.js';
const computedBarStyle = parent => (props, state) => {
  const style = {};
  let offset = 0;
  let tabSize = 0;
  const sizeName = ~[POSITION.Top, POSITION.Bottom].indexOf(state.rootTabs.position) ? "width" : "height";
  const sizeDir = sizeName === "width" ? "x" : "y";
  if (props.tabs && props.tabs.length) {
    props.tabs.every(({
      state: state2
    }) => {
      const $el = parent.$refs[`tabs-${state2.paneName}`];
      if (!$el) {
        return false;
      }
      const barLength = $el.getBoundingClientRect()[sizeName];
      const barMarginRight = parseFloat(window.getComputedStyle($el).marginRight);
      if (!state2.active) {
        if ($el.getBoundingClientRect().width === 0) {
          const unactive = $el.cloneNode(true);
          document.body.appendChild(unactive);
          const unactiveSty = window.getComputedStyle(unactive);
          offset += parseFloat(unactiveSty[sizeName]) - parseFloat(unactiveSty.marginRight);
          document.body.removeChild(unactive);
        } else {
          offset += sizeName === "height" ? barLength : barLength + barMarginRight;
        }
        return true;
      } else {
        const copyEl = $el.cloneNode(true);
        const eleStyle = window.getComputedStyle(copyEl);
        tabSize = barLength;
        if (tabSize === 0) {
          document.body.appendChild(copyEl);
          tabSize = parseFloat(eleStyle.width) - parseFloat(eleStyle.paddingLeft) - parseFloat(eleStyle.paddingRight);
          document.body.removeChild(copyEl);
        } else {
          if (sizeName === "width") {
            document.body.appendChild(copyEl);
            tabSize -= parseFloat(eleStyle.paddingRight);
            document.body.removeChild(copyEl);
            return false;
          }
        }
      }
    });
  }
  const transform = `translate${capitalize(sizeDir)}(${offset}px)`;
  style[sizeName] = state.separator ? "" : tabSize + "px";
  style.transform = transform;
  style.msTransform = transform;
  style.webkitTransform = transform;
  return style;
};
export { computedBarStyle };