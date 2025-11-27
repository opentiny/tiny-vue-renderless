import "../chunk-G2ADBYYC.js";
import { omitText } from './../common/string.js';
import { isEmptyObject, isObject } from './../common/type.js';
import PopupManager from './../common/deps/popup-manager.js';
import { mapTree } from './../grid/static/index.js';
import { transformTreeData } from './../common/array.js';
import { on, off } from './../common/deps/dom.js';
import { xss } from './../common/xss.js';
const {
  nextZIndex
} = PopupManager;
const computedIsShowMore = ({
  props,
  state
}) => () => !/^(retract|fixed|hidden)$/.test(props.overflow) && state.more && state.more.length;
const computedPopClass = state => () => {
  const popClass = !state.showMore && state.subMenus && state.subMenus.length === 1 ? "single" : "";
  return popClass + " " + state.menuClass;
};
const computedSubMenus = state => () => {
  let arr = state.subMenu;
  if (state.subMenu && !isEmptyObject(state.subMenu)) {
    if (!state.subMenu.map(item => item.children && !isEmptyObject(item.children)).reduce((pre, cur) => pre || cur)) {
      arr = [{
        children: state.subMenu
      }];
    }
  }
  return arr;
};
const computedMenuStyle = ({
  props,
  state
}) => () => {
  let result = {
    maxWidth: `${state.width}px`
  };
  if (props.overflow === "retract") {
    result.width = "0px";
  }
  return result;
};
const computedPopStyle = state => () => ({
  top: `${state.popMenuTop}px`
});
const watchWidth = ({
  api,
  nextTick
}) => () => nextTick(() => api.classify());
class CloneObject {
  constructor(json, props) {
    this.props = props;
    if (json) {
      this.data = this.getType(json);
      this.traverse(json, this.data);
    }
  }
  traverse(node, newObject) {
    if (/^(string|undefined)$/.test(typeof node) || node === null) {
      newObject = node;
    } else if (Array.isArray(node)) {
      this.traverseArray(node, newObject);
    } else if (typeof node === "object") {
      this.traverseObject(node, newObject);
    }
    return this;
  }
  traverseArray(node, newObject) {
    for (let i = 0; i < node.length; i++) {
      newObject.push(this.getType(node[i]));
      if (node[i] && typeof node[i] === "object") {
        this.traverse(node[i], newObject[i]);
      }
    }
  }
  traverseObject(node, newObject) {
    Object.keys(node).forEach(key => {
      if (/^(name|url|route|title|name|children)$/.test(key)) {
        let alias = key;
        if (key === "url") {
          if (!(this.props.prevent || this.props.allowFullUrl)) {
            alias = "route";
          }
        }
        if (key === "name") {
          alias = "title";
        }
        newObject[alias] = this.getType(node[key]);
        if (newObject[alias] && typeof newObject[alias] === "object") {
          this.traverse(node[key], newObject[alias]);
        }
      }
    });
  }
  getType(object) {
    let result;
    if (/^(string|undefined)$/.test(typeof object) || object === null) {
      result = object;
    } else if (Array.isArray(object)) {
      result = [];
    } else if (typeof object === "object") {
      result = {};
    }
    return result;
  }
}
const initData = ({
  fetchMenuData,
  fields,
  props,
  state
}) => () => {
  const {
    textField = "title",
    urlField = "url",
    key = "id"
  } = fields || {};
  const {
    parentKey,
    data
  } = props;
  const isFullUrl = url => /^(https?:\/\/|\/\/)[\s\S]+$/.test(url);
  const buildData = item => {
    const router = item[urlField] || item.route;
    return {
      title: item[textField],
      route: router ? router.replace(/^#\/?/, "") : null,
      url: item.url,
      id: item.id,
      pid: item.pid,
      isFullUrl: props.allowFullUrl && isFullUrl(router),
      target: item.target
    };
  };
  if (data) {
    state.data = mapTree(parentKey ? transformTreeData(data, key, parentKey) : data, buildData);
    return;
  }
  const menuData = props.fetchMenuData && fetchMenuData();
  if (isObject(menuData) && (menuData == null ? void 0 : menuData.then)) {
    menuData.then(data2 => {
      state.data = mapTree(props.parentKey ? transformTreeData(data2, key, props.parentKey) : data2, buildData);
    });
    return;
  }
  if (!menuData) {
    state.data = [];
    return;
  }
  let arr = [];
  if (menuData && menuData.length) {
    let getMenuData = new CloneObject(menuData, props).data;
    arr = typeof getMenuData === "object" && Array.isArray(getMenuData) ? getMenuData : [getMenuData];
  }
  state.data = mapTree(parentKey ? transformTreeData(arr, key, parentKey) : arr, buildData);
};
const mounted = ({
  api,
  props,
  router,
  route,
  state
}) => () => {
  api.calcWidth();
  on(window, "resize", api.calcWidth);
  if (router) {
    state.afterEach = to => {
      api.setActiveMenu(api.getSelectedIndex(to.path));
    };
    router.afterEach(state.afterEach);
  }
  props.data && props.data.length && route && api.setActiveMenu(api.getSelectedIndex(route.path));
};
const unMounted = ({
  api,
  state,
  router
}) => () => {
  if (router && router.afterHooks) {
    const index = router.afterHooks.indexOf(state.afterEach);
    router.afterHooks.splice(index, 1);
  }
  state.afterEach = null;
  off(window, "resize", api.calcWidth);
};
const getSelectedIndex = state => path => {
  if (!path) return;
  let length = state.data.length;
  let index = -1;
  if (path !== "/") {
    const queryIndex = path.indexOf("?");
    if (queryIndex !== -1) {
      path = path.slice(0, queryIndex);
    }
    path = path.replace(/^#?\//, "");
    let exp = new RegExp('("url":"#/?' + path + '"|"url":"/?' + path + '"|"route":"/?' + path + '")', "i");
    for (let i = 0; i < length; i++) {
      if (exp.test(JSON.stringify(state.data[i]))) {
        index = i;
        break;
      }
    }
  }
  return index;
};
const showSetting = ({
  parent,
  state
}) => () => {
  state.isShowSetting = true;
  const setting = parent.$el.querySelector(".more-setting");
  setting.style.zIndex = nextZIndex();
};
const willHideSetting = state => () => state.isShowSetting = false;
const showSubMenu = ({
  api,
  nextTick,
  parent,
  state,
  vm
}) => (list, {
  more,
  index
}, event) => {
  if (event) {
    api.handleTitleMouseenter(event);
  }
  state.enterMenu = true;
  if (list || more) {
    state.subMenu !== list ? api.hideSubMenu() : api.stopHideSubMenu();
    state.showMore = !!more;
    state.subMenu = list;
    state.showPopmenu = true;
    state.subItemSelectedIndex = -1;
    state.subIndex = -1;
    state.moreItemSelectedIndex = -1;
    nextTick(() => {
      const popmenu = parent.$el.querySelector(".popmenu");
      if (state.isSaaSTheme) {
        setPopmenuStyleForSaas(popmenu, vm, event, state);
      } else {
        setPopmenuStyleForAurora(popmenu, event);
      }
    });
    if (index !== void 0) {
      state.activeIndex = index;
    }
    if (more && list && list.length && state.subActiveIndex === -1) {
      state.subActiveIndex = 0;
    }
  } else {
    api.hideSubMenu();
  }
};
const setPopmenuStyleForSaas = (popmenu, vm, event, state) => {
  if (!popmenu) return;
  const navMenu = vm.$refs.navMenu;
  const itemWidth = 216;
  const margin = window.outerWidth >= 1440 ? 96 : 56;
  const safeMargin = 32;
  popmenu.style.zIndex = String(nextZIndex());
  popmenu.style.display = "block";
  popmenu.style.left = "32px";
  const popmenuWidth = state.subMenus && state.subMenus.length ? state.subMenus.length * itemWidth + (state.subMenus.length - 1) * margin : 0;
  if (event) {
    if (popmenuWidth > navMenu.offsetWidth - safeMargin * 4) {
      state.menuClass = "display-gird";
    } else {
      state.menuClass = "display-flex";
      if (popmenuWidth + safeMargin * 2 > navMenu.offsetWidth - event.target.offsetLeft) {
        popmenu.style.right = "32px";
        popmenu.style.left = "unset";
      } else {
        popmenu.style.left = `${event.target.offsetLeft - 28}px`;
        popmenu.style.right = "unset";
      }
    }
  } else {
    state.menuClass = "display-gird";
  }
};
const setPopmenuStyleForAurora = (popmenu, event) => {
  if (popmenu) {
    popmenu.style.zIndex = String(nextZIndex());
    if (popmenu.classList.contains("single") && event) {
      popmenu.style.left = `${event.target.offsetLeft}px`;
    } else {
      popmenu.style.left = "0";
    }
    popmenu.style.height = "auto";
    popmenu.style.display = "block";
  }
};
const hideSubMenu = ({
  api,
  parent,
  state
}) => () => {
  api.stopHideSubMenu();
  state.showMore = false;
  state.showPopmenu = false;
  state.activeIndex = -1;
  state.subActiveIndex = -1;
  const popmenu = parent.$el.querySelector(".popmenu");
  popmenu.style.height = "auto";
  popmenu.style.display = "none";
};
const willHideSubMenu = ({
  api,
  state
}) => () => {
  api.stopHideSubMenu();
  api.handleTitleMouseleave();
  state.enterMenu = false;
  state.timer = window.setTimeout(() => {
    api.hideSubMenu();
  }, 20);
};
const stopHideSubMenu = state => () => {
  clearTimeout(state.timer);
};
const setSubMenu = state => (value, index) => {
  state.subActiveIndex = index;
  state.subMenu = value;
  state.enterMoreMenu = true;
};
const leaveMoreMune = state => () => {
  state.enterMoreMenu = false;
};
const isHide = ({
  parent,
  state
}) => event => !state.width || event.offsetTop >= parent.$el.offsetHeight;
const hidePopmenu = api => item => {
  if (item.url || item.route) {
    api.setActiveMenu(api.getSelectedIndex(item.url || item.route));
    api.hideSubMenu();
  }
};
const clickMenu = ({
  api,
  props,
  state
}) => (item, index, parentIndex) => {
  if (index === void 0) {
    return;
  }
  if (state.enterMenu) {
    state.subIndex = -1;
    state.subItemSelectedIndex = -1;
    api.setActiveMenu(index);
  }
  if (state.enterMoreMenu) {
    state.moreItemSelectedIndex = index;
  } else {
    state.subItemSelectedIndex = index;
    state.subIndex = parentIndex;
  }
  if (item.url || item.route) {
    if (props.beforeSkip) {
      props.beforeSkip(item) && api.skip(item, true);
    } else {
      api.skip(item, false);
    }
    api.hidePopmenu(item);
  }
};
const skip = ({
  api,
  router,
  fields
}) => (item, flag = false) => {
  if (!router) return;
  if (item.isFullUrl) {
    const {
      urlField = "url"
    } = fields || {};
    const router2 = item[urlField] || item.route;
    return window.open(xss.filterUrl(router2)).opener = null;
  }
  const address = !item.route || !flag ? api.getUrl(item).replace(/^#/, "") : `/${item.route || ""}`.replace(/^\/+/, "/").replace("#/", "");
  if (address) {
    return router == null ? void 0 : router.push(address);
  } else {
    return "";
  }
};
const getPoint = ({
  api,
  parent
}) => () => {
  const items = parent.$el.querySelectorAll(".menu>li");
  let index = 0;
  if (items) {
    index = items.length;
    for (let i = 0; i < items.length; i++) {
      if (api.isHide(items[i])) {
        index = index - (items.length - i);
        break;
      }
    }
  }
  return index;
};
const classify = ({
  api,
  props,
  state
}) => () => {
  var _a;
  const isRetractOrFixed = /^(retract|fixed)$/.test(props.overflow);
  const menuCount = isRetractOrFixed ? 0 : props.overflow === "hidden" ? (_a = props.data) == null ? void 0 : _a.length : api.getPoint();
  state.more = state.data.slice(menuCount);
};
const calcWidth = ({
  parent,
  props,
  state
}) => () => {
  let el = parent.$el;
  let logoWidth = parent.$slots.logo ? el.querySelector(".slot-logo").offsetWidth : 0;
  let toolbarWidth = parent.$slots.toolbar ? el.querySelector(".slot-toolbar").offsetWidth : 0;
  let menuWidth = el.offsetWidth;
  let width = props.overflow === "retract" ? 0 : menuWidth - toolbarWidth - logoWidth;
  width = width - 120 - (toolbarWidth ? 50 : 10) - (logoWidth ? 100 : 0);
  state.width = width < 200 ? 0 : width;
  state.popMenuTop = el.offsetHeight;
};
const getTag = props => item => item.url && "a" || item.route && (!props.beforeSkip ? "router-link" : "a") || "span";
const getUrl = () => item => item.url || "";
const getRoute = props => item => !props.beforeSkip ? `/${item.route || ""}`.replace(/^\/+/, "/").replace("#/", "") : "";
const setActiveMenu = state => index => state.selectedIndex = typeof index !== "undefined" ? index : -1;
const initService = ({
  props,
  service
}) => {
  const fetchMenuData = () => Promise.reject(new Error("[TINY Error][NavMenu] Prop fetchMenuData is mandatory when the framework service is not used"));
  const {
    base = {},
    setting = {}
  } = service || {};
  const {
    options = {}
  } = setting;
  return {
    fetchMenuData: props.fetchMenuData || base.getMenuDataSync || fetchMenuData,
    fields: props.fields || options.NavMenu
  };
};
const handleTitleMouseenter = ({
  state,
  vm
}) => $event => {
  state.tooltipContent = "";
  const target = $event.target;
  const text = target.textContent;
  const font = window.getComputedStyle(target).font;
  const rect = target.getBoundingClientRect();
  const res = omitText(text, font, rect.width + 2);
  if (target && res.o) {
    const tooltip = vm.$refs.tooltip;
    tooltip.state.referenceElm = target;
    tooltip.state.popperElm && (tooltip.state.popperElm.style.display = "none");
    tooltip.doDestroy();
    state.tooltipVisible = true;
    state.tooltipContent = text;
    setTimeout(tooltip.updatePopper, 20);
  }
};
const handleTitleMouseleave = ({
  state
}) => () => {
  state.tooltipVisible = false;
};
export { calcWidth, classify, clickMenu, computedIsShowMore, computedMenuStyle, computedPopClass, computedPopStyle, computedSubMenus, getPoint, getRoute, getSelectedIndex, getTag, getUrl, handleTitleMouseenter, handleTitleMouseleave, hidePopmenu, hideSubMenu, initData, initService, isHide, leaveMoreMune, mounted, setActiveMenu, setSubMenu, showSetting, showSubMenu, skip, stopHideSubMenu, unMounted, watchWidth, willHideSetting, willHideSubMenu };