import "../chunk-G2ADBYYC.js";
import { getRouteActive, onClick, bindChildren, routeTab, getTabbarItemsWidth } from './index.js';
import { xss } from './../common/xss.js';
const api = ["state", "onClick", "getTabbarItemsWidth"];
const renderless = (props, {
  computed,
  onMounted,
  reactive,
  inject
}, {
  parent,
  emit,
  nextTick,
  route,
  router,
  dispatch,
  vm
}) => {
  const api2 = {};
  const state = reactive({
    index: -1,
    active: false,
    info: computed(() => props.dot ? "" : !props.dot && props.badge),
    url: computed(() => xss.filterUrl(props.url)),
    routeActive: computed(() => api2.getRouteActive()),
    renderActive: computed(() => parent.$parent.route ? state.routeActive : state.active),
    renderColor: computed(() => parent.$parent[state.active ? "activeColor" : "inactiveColor"]),
    showVm: true,
    itemWidth: null,
    childrenNumber: 0,
    customIcon: inject("customIcon", null) || props.customIcon
  });
  Object.assign(api2, {
    state,
    bindChildren: bindChildren({
      parent,
      dispatch,
      vm
    }),
    routeTab: routeTab(props, state),
    getRouteActive: getRouteActive({
      props,
      route
    }),
    onClick: onClick({
      api: api2,
      emit,
      parent,
      props,
      router,
      state,
      dispatch
    }),
    getTabbarItemsWidth: getTabbarItemsWidth(state)
  });
  onMounted(() => nextTick(api2.bindChildren));
  return api2;
};
export { api, renderless };