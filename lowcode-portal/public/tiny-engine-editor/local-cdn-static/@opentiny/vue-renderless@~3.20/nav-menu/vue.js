import "../chunk-G2ADBYYC.js";
import { computedIsShowMore, computedPopClass, computedSubMenus, computedMenuStyle, computedPopStyle, watchWidth, initData, mounted, unMounted, getSelectedIndex, showSetting, willHideSetting, showSubMenu, hideSubMenu, willHideSubMenu, stopHideSubMenu, setSubMenu, leaveMoreMune, isHide, hidePopmenu, clickMenu, skip, getPoint, classify, calcWidth, getTag, getUrl, getRoute, setActiveMenu, initService, handleTitleMouseenter, handleTitleMouseleave } from './index.js';
const api = ["state", "getSelectedIndex", "showSetting", "willHideSetting", "showSubMenu", "hideSubMenu", "willHideSubMenu", "stopHideSubMenu", "setSubMenu", "leaveMoreMune", "isHide", "hidePopmenu", "clickMenu", "skip", "getPoint", "classify", "calcWidth", "getTag", "getUrl", "getRoute", "setActiveMenu", "handleTitleMouseenter", "handleTitleMouseleave"];
const initState = ({
  reactive,
  api: api2,
  computed,
  vm
}) => reactive({
  data: [],
  more: [],
  width: -1,
  enterMenu: false,
  popMenuTop: 0,
  subMenu: [],
  showMore: false,
  showPopmenu: false,
  enterMoreMenu: false,
  timer: null,
  activeIndex: -1,
  subActiveIndex: -1,
  selectedIndex: -1,
  subItemSelectedIndex: -1,
  moreItemSelectedIndex: -1,
  subIndex: -1,
  isShowSetting: false,
  tooltipVisible: false,
  tooltipContent: "",
  marginLeft: 0,
  isSaaSTheme: vm.theme === "saas",
  menuClass: "",
  isShowMore: computed(() => api2.computedIsShowMore()),
  popClass: computed(() => api2.computedPopClass()),
  subMenus: computed(() => api2.computedSubMenus()),
  menuStyle: computed(() => api2.computedMenuStyle()),
  popStyle: computed(() => api2.computedPopStyle())
});
const initApi = ({
  api: api2,
  state,
  props,
  parent,
  fetchMenuData,
  fields,
  router,
  route,
  nextTick,
  vm
}) => {
  Object.assign(api2, {
    state,
    getUrl: getUrl(),
    getTag: getTag(props),
    getRoute: getRoute(props),
    setSubMenu: setSubMenu(state),
    leaveMoreMune: leaveMoreMune(state),
    isHide: isHide({
      parent,
      state
    }),
    setActiveMenu: setActiveMenu(state),
    willHideSetting: willHideSetting(state),
    stopHideSubMenu: stopHideSubMenu(state),
    calcWidth: calcWidth({
      parent,
      props,
      state
    }),
    getSelectedIndex: getSelectedIndex(state),
    showSetting: showSetting({
      parent,
      state
    }),
    initData: initData({
      fetchMenuData,
      fields,
      props,
      state
    }),
    computedIsShowMore: computedIsShowMore({
      props,
      state
    }),
    computedPopClass: computedPopClass(state),
    computedSubMenus: computedSubMenus(state),
    computedMenuStyle: computedMenuStyle({
      props,
      state
    }),
    computedPopStyle: computedPopStyle(state),
    skip: skip({
      api: api2,
      router,
      fields
    }),
    hidePopmenu: hidePopmenu(api2),
    getPoint: getPoint({
      api: api2,
      parent
    }),
    clickMenu: clickMenu({
      api: api2,
      props,
      state
    }),
    unMounted: unMounted({
      api: api2,
      state,
      router
    }),
    mounted: mounted({
      api: api2,
      props,
      router,
      route,
      state
    }),
    classify: classify({
      api: api2,
      props,
      state
    }),
    watchWidth: watchWidth({
      api: api2,
      nextTick
    }),
    willHideSubMenu: willHideSubMenu({
      api: api2,
      state
    }),
    hideSubMenu: hideSubMenu({
      api: api2,
      parent,
      state
    }),
    showSubMenu: showSubMenu({
      api: api2,
      nextTick,
      parent,
      state,
      vm
    }),
    handleTitleMouseenter: handleTitleMouseenter({
      state,
      vm
    }),
    handleTitleMouseleave: handleTitleMouseleave({
      state
    })
  });
};
const renderless = (props, {
  computed,
  onMounted,
  onUnmounted,
  reactive,
  watch
}, {
  parent,
  nextTick,
  service,
  router,
  route,
  vm
}) => {
  const api2 = {};
  const {
    fetchMenuData,
    fields
  } = initService({
    props,
    service
  });
  const state = initState({
    reactive,
    api: api2,
    computed,
    vm
  });
  initApi({
    api: api2,
    state,
    props,
    parent,
    fetchMenuData,
    fields,
    router,
    route,
    nextTick,
    vm
  });
  api2.initData();
  watch(() => state.width, api2.watchWidth, {
    deep: true,
    immediate: true
  });
  watch(() => state.data, api2.watchWidth);
  onMounted(api2.mounted);
  onUnmounted(api2.unMounted);
  return api2;
};
export { api, renderless };