import "../../chunk-G2ADBYYC.js";
const isServer = typeof window === "undefined";
var scroll_into_view_default = (container, selected) => {
  if (isServer) {
    return;
  }
  if (!selected) {
    container.scrollTop = 0;
    return;
  }
  const offsetParents = [];
  let { offsetParent, offsetTop, offsetHeight } = selected;
  while (offsetParent && container !== offsetParent && container.contains(offsetParent)) {
    offsetParents.push(offsetParent);
    offsetParent = offsetParent.offsetParent;
  }
  const top = offsetTop + offsetParents.reduce((prev, curr) => prev + curr.offsetTop, 0);
  const bottom = top + offsetHeight;
  const viewRectTop = container.scrollTop;
  const viewRectBottom = viewRectTop + container.clientHeight;
  if (top < viewRectTop) {
    container.scrollTop = top;
  } else if (bottom > viewRectBottom) {
    container.scrollTop = bottom - container.clientHeight;
  }
};
export {
  scroll_into_view_default as default
};
