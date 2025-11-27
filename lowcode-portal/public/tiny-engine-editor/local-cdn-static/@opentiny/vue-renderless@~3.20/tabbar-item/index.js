import "../chunk-G2ADBYYC.js";
import { isObject, isNull } from './../common/type.js';
const getRouteActive = ({
  props,
  route
}) => () => {
  if (props.to && route) {
    const config = isObject(props.to) ? props.to : {
      path: props.to
    };
    const pathMatched = config.path === route.path;
    const nameMatched = !isNull(config.name) && config.name === route.name;
    return pathMatched || nameMatched;
  }
};
const onClick = ({
  api,
  emit,
  parent,
  props,
  router,
  state,
  dispatch
}) => event => {
  dispatch("Tabbar", "activeItem", props.name || parent.index || state.index);
  emit("click", event);
  api.routeTab(router);
};
const bindChildren = ({
  parent,
  vm,
  dispatch
}) => () => {
  if (!parent.$parent) {
    return;
  }
  dispatch("Tabbar", "updateItems", vm);
  dispatch("Tabbar", "showIndex");
};
const routeTab = (props, state) => router => {
  const {
    to,
    replace
  } = props;
  const {
    url
  } = state;
  if (to && router) {
    const promise = router[replace ? "replace" : "push"](to);
    if (promise && promise.catch) {
      promise.catch(err => {
        if (err && err.name !== "NavigationDuplicated") {
          throw err;
        }
      });
    }
  } else if (url) {
    replace ? location.replace(url) : location.href = url;
  }
};
const getTabbarItemsWidth = state => (tabbarWidth, tabbarNumber) => {
  state.itemWidth = tabbarWidth / tabbarNumber + "px";
};
export { bindChildren, getRouteActive, getTabbarItemsWidth, onClick, routeTab };