import "../chunk-G2ADBYYC.js";
const getIEVersion = () => {
  let version = 8;
  if (!!document.addEventListener && !!window.performance) {
    version = 9;
    if (!!window.atob && !!window.matchMedia) {
      version = 10;
      if (!window.attachEvent && !document.all) {
        version = 11;
      }
    }
  }
  return version;
};
const isEdge = (browser) => {
  if (browser.chrome && ~navigator.userAgent.indexOf("Edg")) {
    browser.name = "edge";
    browser.edge = true;
    delete browser.chrome;
  } else if (!document.documentMode && !!window.StyleMedia) {
    browser.name = "edge";
    browser.edge = true;
  }
};
const isBrowser = typeof window !== "undefined" && typeof document !== "undefined" && window.document === document;
var browser_default = (() => {
  const browser = {
    name: void 0,
    version: void 0,
    isDoc: typeof document !== "undefined",
    isMobile: false,
    isPC: true,
    isNode: typeof window === "undefined"
  };
  if (isBrowser) {
    const isMobile = /(Android|webOS|iPhone|iPad|iPod|SymbianOS|BlackBerry|Windows Phone)/.test(navigator.userAgent);
    browser.isMobile = isMobile;
    browser.isPC = !isMobile;
    let matches;
    if (!!window.chrome && (!!window.chrome.webstore || /^Google\b/.test(window.navigator.vendor))) {
      browser.name = "chrome";
      browser.chrome = true;
      matches = navigator.userAgent.match(/chrome\/(\d+)/i);
      browser.version = !!matches && !!matches[1] && parseInt(matches[1], 10);
      matches = void 0;
    } else if (!!document.all || !!document.documentMode) {
      browser.name = "ie";
      browser.version = getIEVersion();
      browser.ie = true;
    } else if (typeof window.InstallTrigger !== "undefined") {
      browser.name = "firefox";
      browser.firefox = true;
    } else if (Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor") > 0) {
      browser.name = "safari";
      browser.safari = true;
    } else if (!!window.opr && !!window.opr.addons || !!window.opera) {
      browser.name = "opera";
      browser.opera = true;
    }
    isEdge(browser);
    if (!~["ie", "chrome"].indexOf(browser.name)) {
      const reg = browser.name + "/(\\d+)";
      matches = navigator.userAgent.match(new RegExp(reg, "i"));
      browser.version = !!matches && !!matches[1] && parseInt(matches[1], 10);
      matches = void 0;
    }
    if (browser.isDoc) {
      const bodyEl = document.body || document.documentElement;
      ["webkit", "khtml", "moz", "ms", "o"].forEach((core) => {
        browser["-" + core] = !!bodyEl[core + "MatchesSelector"];
      });
    }
  }
  return browser;
})();
export {
  browser_default as default,
  isBrowser
};
