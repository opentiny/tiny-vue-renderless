import "../chunk-G2ADBYYC.js";
import { xss } from './../common/xss.js';
const logout = ({
  service,
  state,
  props
}) => () => {
  let {
    isMock,
    isLocal,
    redirectUrl = "",
    getLogoutUrl,
    showLogin
  } = service;
  if (typeof props.beforeLogout === "function" && !state.logout) {
    if (props.beforeLogout(redirectUrl) === false) {
      return;
    }
  }
  if (state.logout) {
    showLogin();
    return;
  }
  const location = window.location;
  if (redirectUrl) {
    const isFullPath = redirectUrl.includes("//");
    if (!isFullPath) {
      redirectUrl.indexOf("#/") === 0 || (redirectUrl = "#/" + redirectUrl);
      redirectUrl = location.protocol + "//" + location.host + location.pathname + redirectUrl;
    }
  } else {
    redirectUrl = location.href;
  }
  redirectUrl = xss.filterUrl(redirectUrl);
  if (!isMock || !isLocal) {
    getLogoutUrl(redirectUrl).then(url => {
      let temp = decodeURIComponent(url);
      if (/%[a-fA-F0-9]{2}/.test(temp)) {
        temp = decodeURIComponent(temp);
      }
      location.href = xss.filterUrl(temp);
    });
  } else {
    location.href = xss.filterUrl(redirectUrl);
  }
  state.logout = true;
};
const initService = ({
  props,
  service
}) => {
  const noopFnCreator = propName => () => {
    if (propName) {
      return Promise.reject(new Error(`[TINY Error][Logout] Prop ${propName} is mandatory when the framework service is not used`));
    } else {
      return Promise.reject(new Error("[TINY Error][Logout] Prop service is mandatory when the framework service is not used"));
    }
  };
  const {
    base = {},
    common = {},
    setting = {},
    network = {},
    ajax = {},
    message = {}
  } = service || {};
  const {
    options = {},
    services = {},
    redirectUrl = "",
    local = false
  } = setting;
  const {
    isMock = () => false
  } = network;
  const {
    getUserInfoSync = noopFnCreator()
  } = base;
  const {
    config = noopFnCreator()
  } = ajax;
  const {
    subscribe = noopFnCreator(),
    publish = noopFnCreator()
  } = message;
  return {
    getLogoutUrl: props.getLogoutUrl || common.getLogoutUrl || noopFnCreator("getLogoutUrl"),
    redirectUrl: props.redirectUrl || redirectUrl,
    isLocal: props.isLocal || local,
    network: props.network || network,
    isMock: props.isMock || isMock(),
    isGuestUser: props.isGuestUser || (() => getUserInfoSync().userAccount === props.guestRole),
    showLogin: props.showLogin || (() => {
      window.document.domain = options.Domain;
      const gateway = config();
      subscribe({
        topic: "tiny.ui.closeLoginDialog",
        callback() {
          window.location.reload();
        }
      });
      publish({
        topic: "tiny.ui.displayLoginDialog",
        data: {
          url: gateway.getRequestUrl(services.Framework.RebuildSession)
        }
      });
    })
  };
};
export { initService, logout };