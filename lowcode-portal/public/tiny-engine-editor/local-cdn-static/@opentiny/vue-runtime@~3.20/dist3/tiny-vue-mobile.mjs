import { defineComponent as B, $prefix as O, props as Q, setup as z, $setup as K, $props as j, h as J, directive as mn, setupComponent as ma, createComponent as vn, deduplicateCssClass as yl, stringifyCssClass as bl, hooks as kn, parseVnode as va, isEmptyVnode as ha, mergeClass as si, appProperties as ga } from "@opentiny/vue-common";
import { withDirectives as oe, openBlock as A, createElementBlock as w, normalizeStyle as H, createCommentVNode as x, createElementVNode as T, normalizeClass as P, Fragment as q, renderList as ae, renderSlot as F, createTextVNode as ue, toDisplayString as M, vShow as he, resolveComponent as $, createBlock as G, Transition as $e, withCtx as ee, resolveDynamicComponent as pe, createVNode as D, mergeProps as Tn, withModifiers as te, vModelCheckbox as li, resolveDirective as sn, TransitionGroup as Sl, withKeys as Ge, isVNode as Aa, vModelRadio as wl, vModelText as ya } from "vue";
import { iconClose as yt, iconSuccess as Vr, iconError as Mo, iconHelp as ba, iconWarningTriangle as Sa, iconChevronRight as wa, iconEyeopen as Tl, iconEyeclose as Cl, iconCloseCircle as Il, iconYes as Ur, iconUp as kl, iconDown as El, iconUnfilter as Dl, iconSort as Bl, iconDeltaDown as xl, iconDeltaUp as Pl, iconSuccessful as Ml, iconWarning as Ta, iconChevronLeft as Ca, iconZoomOut as Ol, iconZoomIn as Ll, iconRepeat as Nl, iconRefres as Fl, iconDel as Rl, iconMinscreenLeft as Vl, iconFullscreenLeft as Ul, iconInfoSolid as Hl, IconAttachment as $l, IconCloseCircle as zl, IconError as jl, iconHelpCircle as Wl, iconUpload as Gl, iconChevronDown as Oo, IconYes as Yl, iconSearch as Ia, iconPlus as Hr, iconChevronUp as Kl, iconMinus as Ql, iconRadioselected as Xl, iconRadio as Zl, iconCheck as Jl, iconCheckedSur as ql, iconHalfselect as _l, IconMobileErrorWhite as eu, IconMobileSuccessWhite as tu, iconUser as nu } from "@opentiny/vue-icon";
import { t as Wt } from "@opentiny/vue-locale";
function hr(o, e) {
  (e == null || e > o.length) && (e = o.length);
  for (var t = 0, n = Array(e); t < e; t++)
    n[t] = o[t];
  return n;
}
function ou(o) {
  if (Array.isArray(o))
    return o;
}
function ru(o) {
  if (Array.isArray(o))
    return hr(o);
}
function xn(o, e) {
  if (!(o instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
function ui(o, e) {
  for (var t = 0; t < e.length; t++) {
    var n = e[t];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(o, ka(n.key), n);
  }
}
function Pn(o, e, t) {
  return e && ui(o.prototype, e), t && ui(o, t), Object.defineProperty(o, "prototype", {
    writable: !1
  }), o;
}
function $r(o, e) {
  var t = typeof Symbol < "u" && o[Symbol.iterator] || o["@@iterator"];
  if (!t) {
    if (Array.isArray(o) || (t = zr(o)) || e && o && typeof o.length == "number") {
      t && (o = t);
      var n = 0, r = function() {
      };
      return {
        s: r,
        n: function() {
          return n >= o.length ? {
            done: !0
          } : {
            done: !1,
            value: o[n++]
          };
        },
        e: function(l) {
          throw l;
        },
        f: r
      };
    }
    throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  var i, a = !0, s = !1;
  return {
    s: function() {
      t = t.call(o);
    },
    n: function() {
      var l = t.next();
      return a = l.done, l;
    },
    e: function(l) {
      s = !0, i = l;
    },
    f: function() {
      try {
        a || t.return == null || t.return();
      } finally {
        if (s)
          throw i;
      }
    }
  };
}
function ne(o, e, t) {
  return (e = ka(e)) in o ? Object.defineProperty(o, e, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : o[e] = t, o;
}
function iu(o) {
  if (typeof Symbol < "u" && o[Symbol.iterator] != null || o["@@iterator"] != null)
    return Array.from(o);
}
function au(o, e) {
  var t = o == null ? null : typeof Symbol < "u" && o[Symbol.iterator] || o["@@iterator"];
  if (t != null) {
    var n, r, i, a, s = [], l = !0, u = !1;
    try {
      if (i = (t = t.call(o)).next, e === 0) {
        if (Object(t) !== t)
          return;
        l = !1;
      } else
        for (; !(l = (n = i.call(t)).done) && (s.push(n.value), s.length !== e); l = !0)
          ;
    } catch (c) {
      u = !0, r = c;
    } finally {
      try {
        if (!l && t.return != null && (a = t.return(), Object(a) !== a))
          return;
      } finally {
        if (u)
          throw r;
      }
    }
    return s;
  }
}
function su() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function lu() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function ci(o, e) {
  var t = Object.keys(o);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(o);
    e && (n = n.filter(function(r) {
      return Object.getOwnPropertyDescriptor(o, r).enumerable;
    })), t.push.apply(t, n);
  }
  return t;
}
function C(o) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2 ? ci(Object(t), !0).forEach(function(n) {
      ne(o, n, t[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(t)) : ci(Object(t)).forEach(function(n) {
      Object.defineProperty(o, n, Object.getOwnPropertyDescriptor(t, n));
    });
  }
  return o;
}
function Gt(o, e) {
  return ou(o) || au(o, e) || zr(o, e) || su();
}
function Se(o) {
  return ru(o) || iu(o) || zr(o) || lu();
}
function uu(o, e) {
  if (typeof o != "object" || !o)
    return o;
  var t = o[Symbol.toPrimitive];
  if (t !== void 0) {
    var n = t.call(o, e || "default");
    if (typeof n != "object")
      return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(o);
}
function ka(o) {
  var e = uu(o, "string");
  return typeof e == "symbol" ? e : e + "";
}
function R(o) {
  "@babel/helpers - typeof";
  return R = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, R(o);
}
function zr(o, e) {
  if (o) {
    if (typeof o == "string")
      return hr(o, e);
    var t = {}.toString.call(o).slice(8, -1);
    return t === "Object" && o.constructor && (t = o.constructor.name), t === "Map" || t === "Set" ? Array.from(o) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? hr(o, e) : void 0;
  }
}
var cu = function(e) {
  var t = e.state, n = e.props;
  return function() {
    n.contentPosition ? (t.sheetMaskStyle = {
      position: "absolute"
    }, t.sheetContentStyle = {
      "max-height": n.height
    }) : (t.sheetMaskStyle = {
      position: "fixed"
    }, t.sheetContentStyle = {
      position: "fixed",
      "max-height": n.height
    }), t.contentStyle = n.contentStyle ? n.contentStyle : "";
  };
}, du = function(e) {
  var t = e.state, n = e.nextTick, r = e.refs, i = e.BScroll;
  return function() {
    n(function() {
      var a = r.scrollMenu;
      a && (t.scroll ? t.scroll.refresh() : t.scroll = new i(a, {
        probeType: 3,
        tap: "tap"
      }));
    });
  };
}, pu = function(e) {
  var t = e.emit, n = e.state;
  return function() {
    n.scroll = null, t("update:visible", !1), t("close", !1);
  };
}, fu = function(e) {
  var t = e.emit, n = e.state;
  return function(r) {
    setTimeout(function() {
      n.toggle = r;
    }, 0), t("update:visible", r);
  };
}, mu = function(e) {
  var t = e.emit, n = e.state;
  return function(r) {
    n.active = r.id, n.scroll = null, t("update:visible", !1), t("update:modelValue", r.id), t("click", r);
  };
}, vu = function(e) {
  var t = e.api;
  return function() {
    t.handleClose("close", !1);
  };
}, hu = function(e) {
  var t = e.api;
  return function() {
    t.handleClose("hide", !1);
  };
}, gu = function(e) {
  var t = e.emit, n = e.props;
  return function(r) {
    var i = n.valueField;
    t("update:visible", !1), t("update:modelValue", r[i]), t("click", r);
  };
}, Au = function(e) {
  var t = e.state, n = e.api;
  return function() {
    n.handleClose("confirm", t);
  };
}, yu = function(e) {
  var t = e.emit;
  return function(n, r) {
    t("update:visible", !1), t("click", n, r);
  };
}, bu = function(e) {
  var t = e.vm, n = e.emit, r = e.props;
  return function(i, a) {
    typeof r.beforeClose == "function" && r.beforeClose(i) === !1 || (i === "close" ? t.$refs.drawer.close(!0) : n("update:visible", !1), n(i, a));
  };
}, Su = ["state", "setSheetStyle", "initScrollMenu", "visibleHandle", "watchVisible", "menuHandle", "close", "selectOption", "confirm", "actionSelectOption", "hide"], wu = function(e, t, n, r) {
  var i = t.reactive, a = t.watch, s = n.emit, l = n.nextTick, u = n.refs, c = n.vm, d = r.BScroll, p = i({
    toggle: !1,
    sheetMaskStyle: {},
    sheetContentStyle: {},
    scroll: null
  }), f = {};
  return Object.assign(f, {
    state: p,
    setSheetStyle: cu({
      state: p,
      props: e
    }),
    initScrollMenu: du({
      state: p,
      nextTick: l,
      refs: u,
      BScroll: d
    }),
    visibleHandle: pu({
      emit: s,
      state: p
    }),
    watchVisible: fu({
      emit: s,
      state: p
    }),
    menuHandle: mu({
      state: p,
      emit: s
    }),
    confirm: Au({
      state: p,
      api: f
    }),
    selectOption: gu({
      emit: s,
      props: e
    }),
    actionSelectOption: yu({
      emit: s
    }),
    hide: hu({
      api: f
    }),
    close: vu({
      api: f
    }),
    handleClose: bu({
      vm: c,
      emit: s,
      props: e
    })
  }), a(function() {
    return e.visible;
  }, function(m) {
    m && (f.setSheetStyle({
      state: p,
      props: e
    }), f.initScrollMenu({
      state: p,
      nextTick: l,
      refs: u,
      BScroll: d
    })), f.watchVisible(m);
  }), a(function() {
    return e.visible;
  }, f.watchVisible, {
    immediate: !0
  }), f;
};
/*!
 * better-scroll / core
 * (c) 2016-2022 ustbhuangyi
 * Released under the MIT License.
 */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var gr = function(e, t) {
  return gr = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function(n, r) {
    n.__proto__ = r;
  } || function(n, r) {
    for (var i in r)
      Object.prototype.hasOwnProperty.call(r, i) && (n[i] = r[i]);
  }, gr(e, t);
};
function Lo(o, e) {
  gr(o, e);
  function t() {
    this.constructor = o;
  }
  o.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
}
var En = function() {
  return En = Object.assign || function(t) {
    for (var n, r = 1, i = arguments.length; r < i; r++) {
      n = arguments[r];
      for (var a in n)
        Object.prototype.hasOwnProperty.call(n, a) && (t[a] = n[a]);
    }
    return t;
  }, En.apply(this, arguments);
};
function Ea() {
  for (var o = 0, e = 0, t = arguments.length; e < t; e++)
    o += arguments[e].length;
  for (var n = Array(o), r = 0, e = 0; e < t; e++)
    for (var i = arguments[e], a = 0, s = i.length; a < s; a++, r++)
      n[r] = i[a];
  return n;
}
var Tu = [{
  sourceKey: "scroller.scrollBehaviorX.currentPos",
  key: "x"
}, {
  sourceKey: "scroller.scrollBehaviorY.currentPos",
  key: "y"
}, {
  sourceKey: "scroller.scrollBehaviorX.hasScroll",
  key: "hasHorizontalScroll"
}, {
  sourceKey: "scroller.scrollBehaviorY.hasScroll",
  key: "hasVerticalScroll"
}, {
  sourceKey: "scroller.scrollBehaviorX.contentSize",
  key: "scrollerWidth"
}, {
  sourceKey: "scroller.scrollBehaviorY.contentSize",
  key: "scrollerHeight"
}, {
  sourceKey: "scroller.scrollBehaviorX.maxScrollPos",
  key: "maxScrollX"
}, {
  sourceKey: "scroller.scrollBehaviorY.maxScrollPos",
  key: "maxScrollY"
}, {
  sourceKey: "scroller.scrollBehaviorX.minScrollPos",
  key: "minScrollX"
}, {
  sourceKey: "scroller.scrollBehaviorY.minScrollPos",
  key: "minScrollY"
}, {
  sourceKey: "scroller.scrollBehaviorX.movingDirection",
  key: "movingDirectionX"
}, {
  sourceKey: "scroller.scrollBehaviorY.movingDirection",
  key: "movingDirectionY"
}, {
  sourceKey: "scroller.scrollBehaviorX.direction",
  key: "directionX"
}, {
  sourceKey: "scroller.scrollBehaviorY.direction",
  key: "directionY"
}, {
  sourceKey: "scroller.actions.enabled",
  key: "enabled"
}, {
  sourceKey: "scroller.animater.pending",
  key: "pending"
}, {
  sourceKey: "scroller.animater.stop",
  key: "stop"
}, {
  sourceKey: "scroller.scrollTo",
  key: "scrollTo"
}, {
  sourceKey: "scroller.scrollBy",
  key: "scrollBy"
}, {
  sourceKey: "scroller.scrollToElement",
  key: "scrollToElement"
}, {
  sourceKey: "scroller.resetPosition",
  key: "resetPosition"
}];
function Ao(o) {
  console.error("[BScroll warn]: " + o);
}
var Me = typeof window < "u", ln = Me && navigator.userAgent.toLowerCase(), Cu = !!(ln && /wechatdevtools/.test(ln)), Iu = ln && ln.indexOf("android") > 0, ku = function() {
  if (typeof ln == "string") {
    var o = /os (\d\d?_\d(_\d)?)/, e = o.exec(ln);
    if (!e)
      return !1;
    var t = e[1].split("_").map(function(n) {
      return parseInt(n, 10);
    });
    return t[0] === 13 && t[1] >= 4;
  }
  return !1;
}(), Da = !1;
if (Me) {
  var Eu = "test-passive";
  try {
    var di = {};
    Object.defineProperty(di, "passive", {
      get: function() {
        Da = !0;
      }
    }), window.addEventListener(Eu, function() {
    }, di);
  } catch {
  }
}
function It() {
  return window.performance && window.performance.now && window.performance.timing ? window.performance.now() + window.performance.timing.navigationStart : +/* @__PURE__ */ new Date();
}
var Ar = function(e, t) {
  for (var n in t)
    e[n] = t[n];
  return e;
};
function yr(o) {
  return o == null;
}
function pi(o, e, t) {
  return o < e ? e : o > t ? t : o;
}
var jr = Me && document.createElement("div").style, _t = function() {
  if (!Me)
    return !1;
  for (var o = [{
    key: "standard",
    value: "transform"
  }, {
    key: "webkit",
    value: "webkitTransform"
  }, {
    key: "Moz",
    value: "MozTransform"
  }, {
    key: "O",
    value: "OTransform"
  }, {
    key: "ms",
    value: "msTransform"
  }], e = 0, t = o; e < t.length; e++) {
    var n = t[e];
    if (jr[n.value] !== void 0)
      return n.key;
  }
  return !1;
}();
function Oe(o) {
  return _t === !1 ? o : _t === "standard" ? o === "transitionEnd" ? "transitionend" : o : _t + o.charAt(0).toUpperCase() + o.substr(1);
}
function Ba(o) {
  return typeof o == "string" ? document.querySelector(o) : o;
}
function Du(o, e, t, n) {
  var r = Da ? {
    passive: !1,
    capture: !!n
  } : !!n;
  o.addEventListener(e, t, r);
}
function Bu(o, e, t, n) {
  o.removeEventListener(e, t, {
    capture: !!n
  });
}
function xa(o) {
  o.cancelable && o.preventDefault();
}
function fi(o) {
  for (var e = 0, t = 0; o; )
    e -= o.offsetLeft, t -= o.offsetTop, o = o.offsetParent;
  return {
    left: e,
    top: t
  };
}
_t && _t !== "standard" && "" + _t.toLowerCase();
var xu = Oe("transform"), Pa = Oe("transition"), Pu = Me && Oe("perspective") in jr, mi = Me && ("ontouchstart" in window || Cu), Mu = Me && Pa in jr, Ct = {
  transform: xu,
  transition: Pa,
  transitionTimingFunction: Oe("transitionTimingFunction"),
  transitionDuration: Oe("transitionDuration"),
  transitionDelay: Oe("transitionDelay"),
  transformOrigin: Oe("transformOrigin"),
  transitionEnd: Oe("transitionEnd"),
  transitionProperty: Oe("transitionProperty")
}, zo = {
  touchstart: 1,
  touchmove: 1,
  touchend: 1,
  touchcancel: 1,
  mousedown: 2,
  mousemove: 2,
  mouseup: 2
};
function vi(o) {
  if (o instanceof window.SVGElement) {
    var e = o.getBoundingClientRect();
    return {
      top: e.top,
      left: e.left,
      width: e.width,
      height: e.height
    };
  } else
    return {
      top: o.offsetTop,
      left: o.offsetLeft,
      width: o.offsetWidth,
      height: o.offsetHeight
    };
}
function Dn(o, e) {
  for (var t in e)
    if (e[t].test(o[t]))
      return !0;
  return !1;
}
var Ou = Dn;
function Lu(o, e) {
  var t = document.createEvent("Event");
  t.initEvent(e, !0, !0), t.pageX = o.pageX, t.pageY = o.pageY, o.target.dispatchEvent(t);
}
function Ma(o, e) {
  e === void 0 && (e = "click");
  var t;
  o.type === "mouseup" ? t = o : (o.type === "touchend" || o.type === "touchcancel") && (t = o.changedTouches[0]);
  var n = {};
  t && (n.screenX = t.screenX || 0, n.screenY = t.screenY || 0, n.clientX = t.clientX || 0, n.clientY = t.clientY || 0);
  var r, i = !0, a = !0, s = o.ctrlKey, l = o.shiftKey, u = o.altKey, c = o.metaKey, d = {
    ctrlKey: s,
    shiftKey: l,
    altKey: u,
    metaKey: c
  };
  if (typeof MouseEvent < "u")
    try {
      r = new MouseEvent(e, Ar(En({
        bubbles: i,
        cancelable: a
      }, d), n));
    } catch {
      p();
    }
  else
    p();
  function p() {
    r = document.createEvent("Event"), r.initEvent(e, i, a), Ar(r, n);
  }
  r.forwardedTouchEvent = !0, r._constructed = !0, o.target.dispatchEvent(r);
}
function Nu(o) {
  Ma(o, "dblclick");
}
var bt = {
  // easeOutQuint
  swipe: {
    style: "cubic-bezier(0.23, 1, 0.32, 1)",
    fn: function(e) {
      return 1 + --e * e * e * e * e;
    }
  },
  // easeOutQuard
  swipeBounce: {
    style: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    fn: function(e) {
      return e * (2 - e);
    }
  },
  // easeOutQuart
  bounce: {
    style: "cubic-bezier(0.165, 0.84, 0.44, 1)",
    fn: function(e) {
      return 1 - --e * e * e * e;
    }
  }
}, Fu = 1e3 / 60, Ye = Me && window;
function Oa() {
}
var La = function() {
  return Me ? Ye.requestAnimationFrame || Ye.webkitRequestAnimationFrame || Ye.mozRequestAnimationFrame || Ye.oRequestAnimationFrame || // if all else fails, use setTimeout
  function(o) {
    return window.setTimeout(o, o.interval || Fu);
  } : Oa;
}(), Yt = function() {
  return Me ? Ye.cancelAnimationFrame || Ye.webkitCancelAnimationFrame || Ye.mozCancelAnimationFrame || Ye.oCancelAnimationFrame || function(o) {
    window.clearTimeout(o);
  } : Oa;
}(), hi = function(e) {
}, jo = {
  enumerable: !0,
  configurable: !0,
  get: hi,
  set: hi
}, Ru = function(e, t) {
  for (var n = t.split("."), r = 0; r < n.length - 1; r++)
    if (e = e[n[r]], R(e) !== "object" || !e)
      return;
  var i = n.pop();
  return typeof e[i] == "function" ? function() {
    return e[i].apply(e, arguments);
  } : e[i];
}, Vu = function(e, t, n) {
  for (var r = t.split("."), i, a = 0; a < r.length - 1; a++)
    i = r[a], e[i] || (e[i] = {}), e = e[i];
  e[r.pop()] = n;
};
function Uu(o, e, t) {
  jo.get = function() {
    return Ru(this, e);
  }, jo.set = function(r) {
    Vu(this, e, r);
  }, Object.defineProperty(o, t, jo);
}
var vt = (
  /** @class */
  function() {
    function o(e) {
      this.events = {}, this.eventTypes = {}, this.registerType(e);
    }
    return o.prototype.on = function(e, t, n) {
      return n === void 0 && (n = this), this.hasType(e), this.events[e] || (this.events[e] = []), this.events[e].push([t, n]), this;
    }, o.prototype.once = function(e, t, n) {
      var r = this;
      n === void 0 && (n = this), this.hasType(e);
      var i = function() {
        for (var s = [], l = 0; l < arguments.length; l++)
          s[l] = arguments[l];
        r.off(e, i);
        var u = t.apply(n, s);
        if (u === !0)
          return u;
      };
      return i.fn = t, this.on(e, i), this;
    }, o.prototype.off = function(e, t) {
      if (!e && !t)
        return this.events = {}, this;
      if (e) {
        if (this.hasType(e), !t)
          return this.events[e] = [], this;
        var n = this.events[e];
        if (!n)
          return this;
        for (var r = n.length; r--; )
          (n[r][0] === t || n[r][0] && n[r][0].fn === t) && n.splice(r, 1);
        return this;
      }
    }, o.prototype.trigger = function(e) {
      for (var t = [], n = 1; n < arguments.length; n++)
        t[n - 1] = arguments[n];
      this.hasType(e);
      var r = this.events[e];
      if (r)
        for (var i = r.length, a = Ea(r), s, l = 0; l < i; l++) {
          var u = a[l], c = u[0], d = u[1];
          if (c && (s = c.apply(d, t), s === !0))
            return s;
        }
    }, o.prototype.registerType = function(e) {
      var t = this;
      e.forEach(function(n) {
        t.eventTypes[n] = n;
      });
    }, o.prototype.destroy = function() {
      this.events = {}, this.eventTypes = {};
    }, o.prototype.hasType = function(e) {
      var t = this.eventTypes, n = t[e] === e;
      n || Ao('EventEmitter has used unknown event type: "' + e + '", should be oneof [' + ("" + Object.keys(t).map(function(r) {
        return JSON.stringify(r);
      })) + "]");
    }, o;
  }()
), To = (
  /** @class */
  function() {
    function o(e, t) {
      this.wrapper = e, this.events = t, this.addDOMEvents();
    }
    return o.prototype.destroy = function() {
      this.removeDOMEvents(), this.events = [];
    }, o.prototype.addDOMEvents = function() {
      this.handleDOMEvents(Du);
    }, o.prototype.removeDOMEvents = function() {
      this.handleDOMEvents(Bu);
    }, o.prototype.handleDOMEvents = function(e) {
      var t = this, n = this.wrapper;
      this.events.forEach(function(r) {
        e(n, r.name, t, !!r.capture);
      });
    }, o.prototype.handleEvent = function(e) {
      var t = e.type;
      this.events.some(function(n) {
        return n.name === t ? (n.handler(e), !0) : !1;
      });
    }, o;
  }()
), Hu = (
  /** @class */
  function() {
    function o() {
    }
    return o;
  }()
), $u = (
  /** @class */
  function(o) {
    Lo(e, o);
    function e() {
      var t = o.call(this) || this;
      return t.startX = 0, t.startY = 0, t.scrollX = !1, t.scrollY = !0, t.freeScroll = !1, t.directionLockThreshold = 0, t.eventPassthrough = "", t.click = !1, t.dblclick = !1, t.tap = "", t.bounce = {
        top: !0,
        bottom: !0,
        left: !0,
        right: !0
      }, t.bounceTime = 800, t.momentum = !0, t.momentumLimitTime = 300, t.momentumLimitDistance = 15, t.swipeTime = 2500, t.swipeBounceTime = 500, t.deceleration = 15e-4, t.flickLimitTime = 200, t.flickLimitDistance = 100, t.resizePolling = 60, t.probeType = 0, t.stopPropagation = !1, t.preventDefault = !0, t.preventDefaultException = {
        tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|AUDIO)$/
      }, t.tagException = {
        tagName: /^TEXTAREA$/
      }, t.HWCompositing = !0, t.useTransition = !0, t.bindToWrapper = !1, t.bindToTarget = !1, t.disableMouse = mi, t.disableTouch = !mi, t.autoBlur = !0, t.autoEndDistance = 5, t.outOfBoundaryDampingFactor = 1 / 3, t.specifiedIndexAsContent = 0, t.quadrant = 1, t;
    }
    return e.prototype.merge = function(t) {
      if (!t)
        return this;
      for (var n in t) {
        if (n === "bounce") {
          this.bounce = this.resolveBounce(t[n]);
          continue;
        }
        this[n] = t[n];
      }
      return this;
    }, e.prototype.process = function() {
      return this.translateZ = this.HWCompositing && Pu ? " translateZ(1px)" : "", this.useTransition = this.useTransition && Mu, this.preventDefault = !this.eventPassthrough && this.preventDefault, this.scrollX = this.eventPassthrough === "horizontal" ? !1 : this.scrollX, this.scrollY = this.eventPassthrough === "vertical" ? !1 : this.scrollY, this.freeScroll = this.freeScroll && !this.eventPassthrough, this.scrollX = this.freeScroll ? !0 : this.scrollX, this.scrollY = this.freeScroll ? !0 : this.scrollY, this.directionLockThreshold = this.eventPassthrough ? 0 : this.directionLockThreshold, this;
    }, e.prototype.resolveBounce = function(t) {
      var n = {
        top: !0,
        right: !0,
        bottom: !0,
        left: !0
      }, r = {
        top: !1,
        right: !1,
        bottom: !1,
        left: !1
      }, i;
      return R(t) === "object" ? i = Ar(n, t) : i = t ? n : r, i;
    }, e;
  }(Hu)
), zu = (
  /** @class */
  function() {
    function o(e, t) {
      this.wrapper = e, this.options = t, this.hooks = new vt(["beforeStart", "start", "move", "end", "click"]), this.handleDOMEvents();
    }
    return o.prototype.handleDOMEvents = function() {
      var e = this.options, t = e.bindToWrapper, n = e.disableMouse, r = e.disableTouch, i = e.click, a = this.wrapper, s = t ? a : window, l = [], u = [], c = !r, d = !n;
      i && l.push({
        name: "click",
        handler: this.click.bind(this),
        capture: !0
      }), c && (l.push({
        name: "touchstart",
        handler: this.start.bind(this)
      }), u.push({
        name: "touchmove",
        handler: this.move.bind(this)
      }, {
        name: "touchend",
        handler: this.end.bind(this)
      }, {
        name: "touchcancel",
        handler: this.end.bind(this)
      })), d && (l.push({
        name: "mousedown",
        handler: this.start.bind(this)
      }), u.push({
        name: "mousemove",
        handler: this.move.bind(this)
      }, {
        name: "mouseup",
        handler: this.end.bind(this)
      })), this.wrapperEventRegister = new To(a, l), this.targetEventRegister = new To(s, u);
    }, o.prototype.beforeHandler = function(e, t) {
      var n = this.options, r = n.preventDefault, i = n.stopPropagation, a = n.preventDefaultException, s = {
        start: function() {
          return r && !Dn(e.target, a);
        },
        end: function() {
          return r && !Dn(e.target, a);
        },
        move: function() {
          return r;
        }
      };
      s[t]() && e.preventDefault(), i && e.stopPropagation();
    }, o.prototype.setInitiated = function(e) {
      e === void 0 && (e = 0), this.initiated = e;
    }, o.prototype.start = function(e) {
      var t = zo[e.type];
      if (!(this.initiated && this.initiated !== t)) {
        if (this.setInitiated(t), Ou(e.target, this.options.tagException)) {
          this.setInitiated();
          return;
        }
        if (!(t === 2 && e.button !== 0) && !this.hooks.trigger(this.hooks.eventTypes.beforeStart, e)) {
          this.beforeHandler(e, "start");
          var n = e.touches ? e.touches[0] : e;
          this.pointX = n.pageX, this.pointY = n.pageY, this.hooks.trigger(this.hooks.eventTypes.start, e);
        }
      }
    }, o.prototype.move = function(e) {
      if (zo[e.type] === this.initiated) {
        this.beforeHandler(e, "move");
        var t = e.touches ? e.touches[0] : e, n = t.pageX - this.pointX, r = t.pageY - this.pointY;
        if (this.pointX = t.pageX, this.pointY = t.pageY, !this.hooks.trigger(this.hooks.eventTypes.move, {
          deltaX: n,
          deltaY: r,
          e
        })) {
          var i = document.documentElement.scrollLeft || window.pageXOffset || document.body.scrollLeft, a = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop, s = this.pointX - i, l = this.pointY - a, u = this.options.autoEndDistance;
          (s > document.documentElement.clientWidth - u || l > document.documentElement.clientHeight - u || s < u || l < u) && this.end(e);
        }
      }
    }, o.prototype.end = function(e) {
      zo[e.type] === this.initiated && (this.setInitiated(), this.beforeHandler(e, "end"), this.hooks.trigger(this.hooks.eventTypes.end, e));
    }, o.prototype.click = function(e) {
      this.hooks.trigger(this.hooks.eventTypes.click, e);
    }, o.prototype.setContent = function(e) {
      e !== this.wrapper && (this.wrapper = e, this.rebindDOMEvents());
    }, o.prototype.rebindDOMEvents = function() {
      this.wrapperEventRegister.destroy(), this.targetEventRegister.destroy(), this.handleDOMEvents();
    }, o.prototype.destroy = function() {
      this.wrapperEventRegister.destroy(), this.targetEventRegister.destroy(), this.hooks.destroy();
    }, o;
  }()
), Wo = {
  x: ["translateX", "px"],
  y: ["translateY", "px"]
}, ju = (
  /** @class */
  function() {
    function o(e) {
      this.setContent(e), this.hooks = new vt(["beforeTranslate", "translate"]);
    }
    return o.prototype.getComputedPosition = function() {
      var e = window.getComputedStyle(this.content, null), t = e[Ct.transform].split(")")[0].split(", "), n = +(t[12] || t[4]) || 0, r = +(t[13] || t[5]) || 0;
      return {
        x: n,
        y: r
      };
    }, o.prototype.translate = function(e) {
      var t = [];
      Object.keys(e).forEach(function(n) {
        if (Wo[n]) {
          var r = Wo[n][0];
          if (r) {
            var i = Wo[n][1], a = e[n];
            t.push(r + "(" + a + i + ")");
          }
        }
      }), this.hooks.trigger(this.hooks.eventTypes.beforeTranslate, t, e), this.style[Ct.transform] = t.join(" "), this.hooks.trigger(this.hooks.eventTypes.translate, e);
    }, o.prototype.setContent = function(e) {
      this.content !== e && (this.content = e, this.style = e.style);
    }, o.prototype.destroy = function() {
      this.hooks.destroy();
    }, o;
  }()
), Na = (
  /** @class */
  function() {
    function o(e, t, n) {
      this.translater = t, this.options = n, this.timer = 0, this.hooks = new vt(["move", "end", "beforeForceStop", "forceStop", "callStop", "time", "timeFunction"]), this.setContent(e);
    }
    return o.prototype.translate = function(e) {
      this.translater.translate(e);
    }, o.prototype.setPending = function(e) {
      this.pending = e;
    }, o.prototype.setForceStopped = function(e) {
      this.forceStopped = e;
    }, o.prototype.setCallStop = function(e) {
      this.callStopWhenPending = e;
    }, o.prototype.setContent = function(e) {
      this.content !== e && (this.content = e, this.style = e.style, this.stop());
    }, o.prototype.clearTimer = function() {
      this.timer && (Yt(this.timer), this.timer = 0);
    }, o.prototype.destroy = function() {
      this.hooks.destroy(), Yt(this.timer);
    }, o;
  }()
), Wu = function(e, t, n, r) {
  var i = function(d, p) {
    var f = d - p, m = f > 0 ? -1 : f < 0 ? 1 : 0;
    return m;
  }, a = i(t.x, e.x), s = i(t.y, e.y), l = n.x - r.x, u = n.y - r.y;
  return a * l <= 0 && s * u <= 0;
}, Gu = (
  /** @class */
  function(o) {
    Lo(e, o);
    function e() {
      return o !== null && o.apply(this, arguments) || this;
    }
    return e.prototype.startProbe = function(t, n) {
      var r = this, i = t, a = function() {
        var l = r.translater.getComputedPosition();
        Wu(t, n, l, i) && r.hooks.trigger(r.hooks.eventTypes.move, l), r.pending || (r.callStopWhenPending ? r.callStopWhenPending = !1 : r.hooks.trigger(r.hooks.eventTypes.end, l)), i = l, r.pending && (r.timer = La(a));
      };
      this.callStopWhenPending && this.setCallStop(!1), Yt(this.timer), a();
    }, e.prototype.transitionTime = function(t) {
      t === void 0 && (t = 0), this.style[Ct.transitionDuration] = t + "ms", this.hooks.trigger(this.hooks.eventTypes.time, t);
    }, e.prototype.transitionTimingFunction = function(t) {
      this.style[Ct.transitionTimingFunction] = t, this.hooks.trigger(this.hooks.eventTypes.timeFunction, t);
    }, e.prototype.transitionProperty = function() {
      this.style[Ct.transitionProperty] = Ct.transform;
    }, e.prototype.move = function(t, n, r, i) {
      this.setPending(r > 0), this.transitionTimingFunction(i), this.transitionProperty(), this.transitionTime(r), this.translate(n);
      var a = this.options.probeType === 3;
      r && a && this.startProbe(t, n), r || (this._reflow = this.content.offsetHeight, a && this.hooks.trigger(this.hooks.eventTypes.move, n), this.hooks.trigger(this.hooks.eventTypes.end, n));
    }, e.prototype.doStop = function() {
      var t = this.pending;
      if (this.setForceStopped(!1), this.setCallStop(!1), t) {
        this.setPending(!1), Yt(this.timer);
        var n = this.translater.getComputedPosition(), r = n.x, i = n.y;
        this.transitionTime(), this.translate({
          x: r,
          y: i
        }), this.setForceStopped(!0), this.setCallStop(!0), this.hooks.trigger(this.hooks.eventTypes.forceStop, {
          x: r,
          y: i
        });
      }
      return t;
    }, e.prototype.stop = function() {
      var t = this.doStop();
      t && this.hooks.trigger(this.hooks.eventTypes.callStop);
    }, e;
  }(Na)
), Yu = (
  /** @class */
  function(o) {
    Lo(e, o);
    function e() {
      return o !== null && o.apply(this, arguments) || this;
    }
    return e.prototype.move = function(t, n, r, i) {
      if (!r) {
        this.translate(n), this.options.probeType === 3 && this.hooks.trigger(this.hooks.eventTypes.move, n), this.hooks.trigger(this.hooks.eventTypes.end, n);
        return;
      }
      this.animate(t, n, r, i);
    }, e.prototype.animate = function(t, n, r, i) {
      var a = this, s = It(), l = s + r, u = this.options.probeType === 3, c = function() {
        var p = It();
        if (p >= l) {
          a.translate(n), u && a.hooks.trigger(a.hooks.eventTypes.move, n), a.hooks.trigger(a.hooks.eventTypes.end, n);
          return;
        }
        p = (p - s) / r;
        var f = i(p), m = {};
        Object.keys(n).forEach(function(h) {
          var v = t[h], g = n[h];
          m[h] = (g - v) * f + v;
        }), a.translate(m), u && a.hooks.trigger(a.hooks.eventTypes.move, m), a.pending && (a.timer = La(c)), a.pending || (a.callStopWhenPending ? a.callStopWhenPending = !1 : a.hooks.trigger(a.hooks.eventTypes.end, n));
      };
      this.setPending(!0), this.callStopWhenPending && this.setCallStop(!1), Yt(this.timer), c();
    }, e.prototype.doStop = function() {
      var t = this.pending;
      if (this.setForceStopped(!1), this.setCallStop(!1), t) {
        this.setPending(!1), Yt(this.timer);
        var n = this.translater.getComputedPosition();
        this.setForceStopped(!0), this.setCallStop(!0), this.hooks.trigger(this.hooks.eventTypes.forceStop, n);
      }
      return t;
    }, e.prototype.stop = function() {
      var t = this.doStop();
      t && this.hooks.trigger(this.hooks.eventTypes.callStop);
    }, e;
  }(Na)
);
function Ku(o, e, t) {
  var n = t.useTransition, r = {};
  return Object.defineProperty(r, "probeType", {
    enumerable: !0,
    configurable: !1,
    get: function() {
      return t.probeType;
    }
  }), n ? new Gu(o, e, r) : new Yu(o, e, r);
}
var gi = (
  /** @class */
  function() {
    function o(e, t, n) {
      this.wrapper = e, this.options = n, this.hooks = new vt(["beforeComputeBoundary", "computeBoundary", "momentum", "end", "ignoreHasScroll"]), this.refresh(t);
    }
    return o.prototype.start = function() {
      this.dist = 0, this.setMovingDirection(
        0
        /* Default */
      ), this.setDirection(
        0
        /* Default */
      );
    }, o.prototype.move = function(e) {
      return e = this.hasScroll ? e : 0, this.setMovingDirection(e), this.performDampingAlgorithm(e, this.options.outOfBoundaryDampingFactor);
    }, o.prototype.setMovingDirection = function(e) {
      this.movingDirection = e > 0 ? -1 : e < 0 ? 1 : 0;
    }, o.prototype.setDirection = function(e) {
      this.direction = e > 0 ? -1 : e < 0 ? 1 : 0;
    }, o.prototype.performDampingAlgorithm = function(e, t) {
      var n = this.currentPos + e;
      return (n > this.minScrollPos || n < this.maxScrollPos) && (n > this.minScrollPos && this.options.bounces[0] || n < this.maxScrollPos && this.options.bounces[1] ? n = this.currentPos + e * t : n = n > this.minScrollPos ? this.minScrollPos : this.maxScrollPos), n;
    }, o.prototype.end = function(e) {
      var t = {
        duration: 0
      }, n = Math.abs(this.currentPos - this.startPos);
      if (this.options.momentum && e < this.options.momentumLimitTime && n > this.options.momentumLimitDistance) {
        var r = this.direction === -1 && this.options.bounces[0] || this.direction === 1 && this.options.bounces[1] ? this.wrapperSize : 0;
        t = this.hasScroll ? this.momentum(this.currentPos, this.startPos, e, this.maxScrollPos, this.minScrollPos, r, this.options) : {
          destination: this.currentPos,
          duration: 0
        };
      } else
        this.hooks.trigger(this.hooks.eventTypes.end, t);
      return t;
    }, o.prototype.momentum = function(e, t, n, r, i, a, s) {
      s === void 0 && (s = this.options);
      var l = e - t, u = Math.abs(l) / n, c = s.deceleration, d = s.swipeBounceTime, p = s.swipeTime, f = Math.min(p, u * 2 / c), m = {
        destination: e + u * u / c * (l < 0 ? -1 : 1),
        duration: f,
        rate: 15
      };
      return this.hooks.trigger(this.hooks.eventTypes.momentum, m, l), m.destination < r ? (m.destination = a ? Math.max(r - a / 4, r - a / m.rate * u) : r, m.duration = d) : m.destination > i && (m.destination = a ? Math.min(i + a / 4, i + a / m.rate * u) : i, m.duration = d), m.destination = Math.round(m.destination), m;
    }, o.prototype.updateDirection = function() {
      var e = this.currentPos - this.absStartPos;
      this.setDirection(e);
    }, o.prototype.refresh = function(e) {
      var t = this.options.rect, n = t.size, r = t.position, i = window.getComputedStyle(this.wrapper, null).position === "static", a = vi(this.wrapper);
      this.wrapperSize = this.wrapper[n === "width" ? "clientWidth" : "clientHeight"], this.setContent(e);
      var s = vi(this.content);
      this.contentSize = s[n], this.relativeOffset = s[r], i && (this.relativeOffset -= a[r]), this.computeBoundary(), this.setDirection(
        0
        /* Default */
      );
    }, o.prototype.setContent = function(e) {
      e !== this.content && (this.content = e, this.resetState());
    }, o.prototype.resetState = function() {
      this.currentPos = 0, this.startPos = 0, this.dist = 0, this.setDirection(
        0
        /* Default */
      ), this.setMovingDirection(
        0
        /* Default */
      ), this.resetStartPos();
    }, o.prototype.computeBoundary = function() {
      this.hooks.trigger(this.hooks.eventTypes.beforeComputeBoundary);
      var e = {
        minScrollPos: 0,
        maxScrollPos: this.wrapperSize - this.contentSize
      };
      e.maxScrollPos < 0 && (e.maxScrollPos -= this.relativeOffset, this.options.specifiedIndexAsContent === 0 && (e.minScrollPos = -this.relativeOffset)), this.hooks.trigger(this.hooks.eventTypes.computeBoundary, e), this.minScrollPos = e.minScrollPos, this.maxScrollPos = e.maxScrollPos, this.hasScroll = this.options.scrollable && this.maxScrollPos < this.minScrollPos, !this.hasScroll && this.minScrollPos < this.maxScrollPos && (this.maxScrollPos = this.minScrollPos, this.contentSize = this.wrapperSize);
    }, o.prototype.updatePosition = function(e) {
      this.currentPos = e;
    }, o.prototype.getCurrentPos = function() {
      return this.currentPos;
    }, o.prototype.checkInBoundary = function() {
      var e = this.adjustPosition(this.currentPos), t = e === this.getCurrentPos();
      return {
        position: e,
        inBoundary: t
      };
    }, o.prototype.adjustPosition = function(e) {
      return !this.hasScroll && !this.hooks.trigger(this.hooks.eventTypes.ignoreHasScroll) ? e = this.minScrollPos : e > this.minScrollPos ? e = this.minScrollPos : e < this.maxScrollPos && (e = this.maxScrollPos), e;
    }, o.prototype.updateStartPos = function() {
      this.startPos = this.currentPos;
    }, o.prototype.updateAbsStartPos = function() {
      this.absStartPos = this.currentPos;
    }, o.prototype.resetStartPos = function() {
      this.updateStartPos(), this.updateAbsStartPos();
    }, o.prototype.getAbsDist = function(e) {
      return this.dist += e, Math.abs(this.dist);
    }, o.prototype.destroy = function() {
      this.hooks.destroy();
    }, o;
  }()
), On, Ln, Nn, Fn, Ai = (On = {}, On.yes = function(o) {
  return !0;
}, On.no = function(o) {
  return xa(o), !1;
}, On), Qu = (Ln = {}, Ln.horizontal = (Nn = {}, Nn.yes = "horizontal", Nn.no = "vertical", Nn), Ln.vertical = (Fn = {}, Fn.yes = "vertical", Fn.no = "horizontal", Fn), Ln), Xu = (
  /** @class */
  function() {
    function o(e, t, n) {
      this.directionLockThreshold = e, this.freeScroll = t, this.eventPassthrough = n, this.reset();
    }
    return o.prototype.reset = function() {
      this.directionLocked = "";
    }, o.prototype.checkMovingDirection = function(e, t, n) {
      return this.computeDirectionLock(e, t), this.handleEventPassthrough(n);
    }, o.prototype.adjustDelta = function(e, t) {
      return this.directionLocked === "horizontal" ? t = 0 : this.directionLocked === "vertical" && (e = 0), {
        deltaX: e,
        deltaY: t
      };
    }, o.prototype.computeDirectionLock = function(e, t) {
      this.directionLocked === "" && !this.freeScroll && (e > t + this.directionLockThreshold ? this.directionLocked = "horizontal" : t >= e + this.directionLockThreshold ? this.directionLocked = "vertical" : this.directionLocked = "none");
    }, o.prototype.handleEventPassthrough = function(e) {
      var t = Qu[this.directionLocked];
      if (t) {
        if (this.eventPassthrough === t.yes)
          return Ai.yes(e);
        if (this.eventPassthrough === t.no)
          return Ai.no(e);
      }
      return !1;
    }, o;
  }()
), Zu = function(e, t, n) {
  return n === 2 ? [t, -e] : n === 3 ? [-e, -t] : n === 4 ? [-t, e] : [e, t];
}, Ju = (
  /** @class */
  function() {
    function o(e, t, n, r, i) {
      this.hooks = new vt(["start", "beforeMove", "scrollStart", "scroll", "beforeEnd", "end", "scrollEnd", "contentNotMoved", "detectMovingDirection", "coordinateTransformation"]), this.scrollBehaviorX = e, this.scrollBehaviorY = t, this.actionsHandler = n, this.animater = r, this.options = i, this.directionLockAction = new Xu(i.directionLockThreshold, i.freeScroll, i.eventPassthrough), this.enabled = !0, this.bindActionsHandler();
    }
    return o.prototype.bindActionsHandler = function() {
      var e = this;
      this.actionsHandler.hooks.on(this.actionsHandler.hooks.eventTypes.start, function(t) {
        return e.enabled ? e.handleStart(t) : !0;
      }), this.actionsHandler.hooks.on(this.actionsHandler.hooks.eventTypes.move, function(t) {
        var n = t.deltaX, r = t.deltaY, i = t.e;
        if (!e.enabled)
          return !0;
        var a = Zu(n, r, e.options.quadrant), s = a[0], l = a[1], u = {
          deltaX: s,
          deltaY: l
        };
        return e.hooks.trigger(e.hooks.eventTypes.coordinateTransformation, u), e.handleMove(u.deltaX, u.deltaY, i);
      }), this.actionsHandler.hooks.on(this.actionsHandler.hooks.eventTypes.end, function(t) {
        return e.enabled ? e.handleEnd(t) : !0;
      }), this.actionsHandler.hooks.on(this.actionsHandler.hooks.eventTypes.click, function(t) {
        e.enabled && !t._constructed && e.handleClick(t);
      });
    }, o.prototype.handleStart = function(e) {
      var t = It();
      this.fingerMoved = !1, this.contentMoved = !1, this.startTime = t, this.directionLockAction.reset(), this.scrollBehaviorX.start(), this.scrollBehaviorY.start(), this.animater.doStop(), this.scrollBehaviorX.resetStartPos(), this.scrollBehaviorY.resetStartPos(), this.hooks.trigger(this.hooks.eventTypes.start, e);
    }, o.prototype.handleMove = function(e, t, n) {
      if (!this.hooks.trigger(this.hooks.eventTypes.beforeMove, n)) {
        var r = this.scrollBehaviorX.getAbsDist(e), i = this.scrollBehaviorY.getAbsDist(t), a = It();
        if (this.checkMomentum(r, i, a))
          return !0;
        if (this.directionLockAction.checkMovingDirection(r, i, n))
          return this.actionsHandler.setInitiated(), !0;
        var s = this.directionLockAction.adjustDelta(e, t), l = this.scrollBehaviorX.getCurrentPos(), u = this.scrollBehaviorX.move(s.deltaX), c = this.scrollBehaviorY.getCurrentPos(), d = this.scrollBehaviorY.move(s.deltaY);
        if (!this.hooks.trigger(this.hooks.eventTypes.detectMovingDirection)) {
          this.fingerMoved || (this.fingerMoved = !0);
          var p = u !== l || d !== c;
          !this.contentMoved && !p && this.hooks.trigger(this.hooks.eventTypes.contentNotMoved), !this.contentMoved && p && (this.contentMoved = !0, this.hooks.trigger(this.hooks.eventTypes.scrollStart)), this.contentMoved && p && (this.animater.translate({
            x: u,
            y: d
          }), this.dispatchScroll(a));
        }
      }
    }, o.prototype.dispatchScroll = function(e) {
      e - this.startTime > this.options.momentumLimitTime && (this.startTime = e, this.scrollBehaviorX.updateStartPos(), this.scrollBehaviorY.updateStartPos(), this.options.probeType === 1 && this.hooks.trigger(this.hooks.eventTypes.scroll, this.getCurrentPos())), this.options.probeType > 1 && this.hooks.trigger(this.hooks.eventTypes.scroll, this.getCurrentPos());
    }, o.prototype.checkMomentum = function(e, t, n) {
      return n - this.endTime > this.options.momentumLimitTime && t < this.options.momentumLimitDistance && e < this.options.momentumLimitDistance;
    }, o.prototype.handleEnd = function(e) {
      if (!this.hooks.trigger(this.hooks.eventTypes.beforeEnd, e)) {
        var t = this.getCurrentPos();
        if (this.scrollBehaviorX.updateDirection(), this.scrollBehaviorY.updateDirection(), this.hooks.trigger(this.hooks.eventTypes.end, e, t))
          return !0;
        t = this.ensureIntegerPos(t), this.animater.translate(t), this.endTime = It();
        var n = this.endTime - this.startTime;
        this.hooks.trigger(this.hooks.eventTypes.scrollEnd, t, n);
      }
    }, o.prototype.ensureIntegerPos = function(e) {
      this.ensuringInteger = !0;
      var t = e.x, n = e.y, r = this.scrollBehaviorX, i = r.minScrollPos, a = r.maxScrollPos, s = this.scrollBehaviorY, l = s.minScrollPos, u = s.maxScrollPos;
      return t = t > 0 ? Math.ceil(t) : Math.floor(t), n = n > 0 ? Math.ceil(n) : Math.floor(n), t = pi(t, a, i), n = pi(n, u, l), {
        x: t,
        y: n
      };
    }, o.prototype.handleClick = function(e) {
      Dn(e.target, this.options.preventDefaultException) || (xa(e), e.stopPropagation());
    }, o.prototype.getCurrentPos = function() {
      return {
        x: this.scrollBehaviorX.getCurrentPos(),
        y: this.scrollBehaviorY.getCurrentPos()
      };
    }, o.prototype.refresh = function() {
      this.endTime = 0;
    }, o.prototype.destroy = function() {
      this.hooks.destroy();
    }, o;
  }()
);
function qu(o) {
  var e = ["click", "bindToWrapper", "disableMouse", "disableTouch", "preventDefault", "stopPropagation", "tagException", "preventDefaultException", "autoEndDistance"].reduce(function(t, n) {
    return t[n] = o[n], t;
  }, {});
  return e;
}
function yi(o, e, t, n) {
  var r = ["momentum", "momentumLimitTime", "momentumLimitDistance", "deceleration", "swipeBounceTime", "swipeTime", "outOfBoundaryDampingFactor", "specifiedIndexAsContent"].reduce(function(i, a) {
    return i[a] = o[a], i;
  }, {});
  return r.scrollable = !!o[e], r.bounces = t, r.rect = n, r;
}
function br(o, e, t) {
  t.forEach(function(n) {
    var r, i;
    typeof n == "string" ? r = i = n : (r = n.source, i = n.target), o.on(r, function() {
      for (var a = [], s = 0; s < arguments.length; s++)
        a[s] = arguments[s];
      return e.trigger.apply(e, Ea([i], a));
    });
  });
}
function _u(o, e) {
  for (var t = Object.keys(o), n = 0, r = t; n < r.length; n++) {
    var i = r[n];
    if (o[i] !== e[i])
      return !1;
  }
  return !0;
}
var bi = 1, ec = (
  /** @class */
  function() {
    function o(e, t, n) {
      this.wrapper = e, this.content = t, this.resizeTimeout = 0, this.hooks = new vt(["beforeStart", "beforeMove", "beforeScrollStart", "scrollStart", "scroll", "beforeEnd", "scrollEnd", "resize", "touchEnd", "end", "flick", "scrollCancel", "momentum", "scrollTo", "minDistanceScroll", "scrollToElement", "beforeRefresh"]), this.options = n;
      var r = this.options.bounce, i = r.left, a = r.right, s = r.top, l = r.bottom;
      this.scrollBehaviorX = new gi(e, t, yi(n, "scrollX", [i, a], {
        size: "width",
        position: "left"
      })), this.scrollBehaviorY = new gi(e, t, yi(n, "scrollY", [s, l], {
        size: "height",
        position: "top"
      })), this.translater = new ju(this.content), this.animater = Ku(this.content, this.translater, this.options), this.actionsHandler = new zu(this.options.bindToTarget ? this.content : e, qu(this.options)), this.actions = new Ju(this.scrollBehaviorX, this.scrollBehaviorY, this.actionsHandler, this.animater, this.options);
      var u = this.resize.bind(this);
      this.resizeRegister = new To(window, [{
        name: "orientationchange",
        handler: u
      }, {
        name: "resize",
        handler: u
      }]), this.registerTransitionEnd(), this.init();
    }
    return o.prototype.init = function() {
      var e = this;
      this.bindTranslater(), this.bindAnimater(), this.bindActions(), this.hooks.on(this.hooks.eventTypes.scrollEnd, function() {
        e.togglePointerEvents(!0);
      });
    }, o.prototype.registerTransitionEnd = function() {
      this.transitionEndRegister = new To(this.content, [{
        name: Ct.transitionEnd,
        handler: this.transitionEnd.bind(this)
      }]);
    }, o.prototype.bindTranslater = function() {
      var e = this, t = this.translater.hooks;
      t.on(t.eventTypes.beforeTranslate, function(n) {
        e.options.translateZ && n.push(e.options.translateZ);
      }), t.on(t.eventTypes.translate, function(n) {
        var r = e.getCurrentPos();
        if (e.updatePositions(n), e.actions.ensuringInteger === !0) {
          e.actions.ensuringInteger = !1;
          return;
        }
        (n.x !== r.x || n.y !== r.y) && e.togglePointerEvents(!1);
      });
    }, o.prototype.bindAnimater = function() {
      var e = this;
      this.animater.hooks.on(this.animater.hooks.eventTypes.end, function(t) {
        e.resetPosition(e.options.bounceTime) || (e.animater.setPending(!1), e.hooks.trigger(e.hooks.eventTypes.scrollEnd, t));
      }), br(this.animater.hooks, this.hooks, [{
        source: this.animater.hooks.eventTypes.move,
        target: this.hooks.eventTypes.scroll
      }, {
        source: this.animater.hooks.eventTypes.forceStop,
        target: this.hooks.eventTypes.scrollEnd
      }]);
    }, o.prototype.bindActions = function() {
      var e = this, t = this.actions;
      br(t.hooks, this.hooks, [{
        source: t.hooks.eventTypes.start,
        target: this.hooks.eventTypes.beforeStart
      }, {
        source: t.hooks.eventTypes.start,
        target: this.hooks.eventTypes.beforeScrollStart
      }, {
        source: t.hooks.eventTypes.beforeMove,
        target: this.hooks.eventTypes.beforeMove
      }, {
        source: t.hooks.eventTypes.scrollStart,
        target: this.hooks.eventTypes.scrollStart
      }, {
        source: t.hooks.eventTypes.scroll,
        target: this.hooks.eventTypes.scroll
      }, {
        source: t.hooks.eventTypes.beforeEnd,
        target: this.hooks.eventTypes.beforeEnd
      }]), t.hooks.on(t.hooks.eventTypes.end, function(n, r) {
        if (e.hooks.trigger(e.hooks.eventTypes.touchEnd, r), e.hooks.trigger(e.hooks.eventTypes.end, r) || !t.fingerMoved && (e.hooks.trigger(e.hooks.eventTypes.scrollCancel), e.checkClick(n)))
          return !0;
        if (e.resetPosition(e.options.bounceTime, bt.bounce))
          return e.animater.setForceStopped(!1), !0;
      }), t.hooks.on(t.hooks.eventTypes.scrollEnd, function(n, r) {
        var i = Math.abs(n.x - e.scrollBehaviorX.startPos), a = Math.abs(n.y - e.scrollBehaviorY.startPos);
        if (e.checkFlick(r, i, a)) {
          e.animater.setForceStopped(!1), e.hooks.trigger(e.hooks.eventTypes.flick);
          return;
        }
        if (e.momentum(n, r)) {
          e.animater.setForceStopped(!1);
          return;
        }
        t.contentMoved && e.hooks.trigger(e.hooks.eventTypes.scrollEnd, n), e.animater.forceStopped && e.animater.setForceStopped(!1);
      });
    }, o.prototype.checkFlick = function(e, t, n) {
      var r = 1;
      if (this.hooks.events.flick.length > 1 && e < this.options.flickLimitTime && t < this.options.flickLimitDistance && n < this.options.flickLimitDistance && (n > r || t > r))
        return !0;
    }, o.prototype.momentum = function(e, t) {
      var n = {
        time: 0,
        easing: bt.swiper,
        newX: e.x,
        newY: e.y
      }, r = this.scrollBehaviorX.end(t), i = this.scrollBehaviorY.end(t);
      if (n.newX = yr(r.destination) ? n.newX : r.destination, n.newY = yr(i.destination) ? n.newY : i.destination, n.time = Math.max(r.duration, i.duration), this.hooks.trigger(this.hooks.eventTypes.momentum, n, this), n.newX !== e.x || n.newY !== e.y)
        return (n.newX > this.scrollBehaviorX.minScrollPos || n.newX < this.scrollBehaviorX.maxScrollPos || n.newY > this.scrollBehaviorY.minScrollPos || n.newY < this.scrollBehaviorY.maxScrollPos) && (n.easing = bt.swipeBounce), this.scrollTo(n.newX, n.newY, n.time, n.easing), !0;
    }, o.prototype.checkClick = function(e) {
      var t = {
        preventClick: this.animater.forceStopped
      };
      if (this.hooks.trigger(this.hooks.eventTypes.checkClick))
        return this.animater.setForceStopped(!1), !0;
      if (!t.preventClick) {
        var n = this.options.dblclick, r = !1;
        if (n && this.lastClickTime) {
          var i = n.delay, a = i === void 0 ? 300 : i;
          It() - this.lastClickTime < a && (r = !0, Nu(e));
        }
        return this.options.tap && Lu(e, this.options.tap), this.options.click && !Dn(e.target, this.options.preventDefaultException) && Ma(e), this.lastClickTime = r ? null : It(), !0;
      }
      return !1;
    }, o.prototype.resize = function() {
      var e = this;
      this.actions.enabled && (Iu && (this.wrapper.scrollTop = 0), clearTimeout(this.resizeTimeout), this.resizeTimeout = window.setTimeout(function() {
        e.hooks.trigger(e.hooks.eventTypes.resize);
      }, this.options.resizePolling));
    }, o.prototype.transitionEnd = function(e) {
      if (!(e.target !== this.content || !this.animater.pending)) {
        var t = this.animater;
        t.transitionTime(), this.resetPosition(this.options.bounceTime, bt.bounce) || (this.animater.setPending(!1), this.options.probeType !== 3 && this.hooks.trigger(this.hooks.eventTypes.scrollEnd, this.getCurrentPos()));
      }
    }, o.prototype.togglePointerEvents = function(e) {
      e === void 0 && (e = !0);
      for (var t = this.content.children.length ? this.content.children : [this.content], n = e ? "auto" : "none", r = 0; r < t.length; r++) {
        var i = t[r];
        i.isBScrollContainer || (i.style.pointerEvents = n);
      }
    }, o.prototype.refresh = function(e) {
      var t = this.setContent(e);
      this.hooks.trigger(this.hooks.eventTypes.beforeRefresh), this.scrollBehaviorX.refresh(e), this.scrollBehaviorY.refresh(e), t && (this.translater.setContent(e), this.animater.setContent(e), this.transitionEndRegister.destroy(), this.registerTransitionEnd(), this.options.bindToTarget && this.actionsHandler.setContent(e)), this.actions.refresh(), this.wrapperOffset = fi(this.wrapper);
    }, o.prototype.setContent = function(e) {
      var t = e !== this.content;
      return t && (this.content = e), t;
    }, o.prototype.scrollBy = function(e, t, n, r) {
      n === void 0 && (n = 0);
      var i = this.getCurrentPos(), a = i.x, s = i.y;
      r = r || bt.bounce, e += a, t += s, this.scrollTo(e, t, n, r);
    }, o.prototype.scrollTo = function(e, t, n, r, i) {
      n === void 0 && (n = 0), r === void 0 && (r = bt.bounce), i === void 0 && (i = {
        start: {},
        end: {}
      });
      var a = this.options.useTransition ? r.style : r.fn, s = this.getCurrentPos(), l = En({
        x: s.x,
        y: s.y
      }, i.start), u = En({
        x: e,
        y: t
      }, i.end);
      if (this.hooks.trigger(this.hooks.eventTypes.scrollTo, u), !_u(l, u)) {
        var c = Math.abs(u.x - l.x), d = Math.abs(u.y - l.y);
        c < bi && d < bi && (n = 0, this.hooks.trigger(this.hooks.eventTypes.minDistanceScroll)), this.animater.move(l, u, n, a);
      }
    }, o.prototype.scrollToElement = function(e, t, n, r, i) {
      var a = Ba(e), s = fi(a), l = function(d, p, f) {
        return typeof d == "number" ? d : d ? Math.round(p / 2 - f / 2) : 0;
      };
      n = l(n, a.offsetWidth, this.wrapper.offsetWidth), r = l(r, a.offsetHeight, this.wrapper.offsetHeight);
      var u = function(d, p, f, m) {
        return d -= p, d = m.adjustPosition(d - f), d;
      };
      s.left = u(s.left, this.wrapperOffset.left, n, this.scrollBehaviorX), s.top = u(s.top, this.wrapperOffset.top, r, this.scrollBehaviorY), !this.hooks.trigger(this.hooks.eventTypes.scrollToElement, a, s) && this.scrollTo(s.left, s.top, t, i);
    }, o.prototype.resetPosition = function(e, t) {
      e === void 0 && (e = 0), t === void 0 && (t = bt.bounce);
      var n = this.scrollBehaviorX.checkInBoundary(), r = n.position, i = n.inBoundary, a = this.scrollBehaviorY.checkInBoundary(), s = a.position, l = a.inBoundary;
      return i && l ? !1 : (ku && this.reflow(), this.scrollTo(r, s, e, t), !0);
    }, o.prototype.reflow = function() {
      this._reflow = this.content.offsetHeight;
    }, o.prototype.updatePositions = function(e) {
      this.scrollBehaviorX.updatePosition(e.x), this.scrollBehaviorY.updatePosition(e.y);
    }, o.prototype.getCurrentPos = function() {
      return this.actions.getCurrentPos();
    }, o.prototype.enable = function() {
      this.actions.enabled = !0;
    }, o.prototype.disable = function() {
      Yt(this.animater.timer), this.actions.enabled = !1;
    }, o.prototype.destroy = function() {
      var e = this, t = ["resizeRegister", "transitionEndRegister", "actionsHandler", "actions", "hooks", "animater", "translater", "scrollBehaviorX", "scrollBehaviorY"];
      t.forEach(function(n) {
        return e[n].destroy();
      });
    }, o;
  }()
), No = (
  /** @class */
  function(o) {
    Lo(e, o);
    function e(t, n) {
      var r = o.call(this, ["refresh", "contentChanged", "enable", "disable", "beforeScrollStart", "scrollStart", "scroll", "scrollEnd", "scrollCancel", "touchEnd", "flick", "destroy"]) || this, i = Ba(t);
      return i ? (r.plugins = {}, r.options = new $u().merge(n).process(), r.setContent(i).valid && (r.hooks = new vt(["refresh", "enable", "disable", "destroy", "beforeInitialScrollTo", "contentChanged"]), r.init(i)), r) : (Ao("Can not resolve the wrapper DOM."), r);
    }
    return e.use = function(t) {
      var n = t.pluginName, r = e.plugins.some(function(i) {
        return t === i.ctor;
      });
      return r ? e : yr(n) ? (Ao("Plugin Class must specify plugin's name in static property by 'pluginName' field."), e) : (e.pluginsMap[n] = !0, e.plugins.push({
        name: n,
        applyOrder: t.applyOrder,
        ctor: t
      }), e);
    }, e.prototype.setContent = function(t) {
      var n = !1, r = !0, i = t.children[this.options.specifiedIndexAsContent];
      return i ? (n = this.content !== i, n && (this.content = i)) : (Ao("The wrapper need at least one child element to be content element to scroll."), r = !1), {
        valid: r,
        contentChanged: n
      };
    }, e.prototype.init = function(t) {
      var n = this;
      this.wrapper = t, t.isBScrollContainer = !0, this.scroller = new ec(t, this.content, this.options), this.scroller.hooks.on(this.scroller.hooks.eventTypes.resize, function() {
        n.refresh();
      }), this.eventBubbling(), this.handleAutoBlur(), this.enable(), this.proxy(Tu), this.applyPlugins(), this.refreshWithoutReset(this.content);
      var r = this.options, i = r.startX, a = r.startY, s = {
        x: i,
        y: a
      };
      this.hooks.trigger(this.hooks.eventTypes.beforeInitialScrollTo, s) || this.scroller.scrollTo(s.x, s.y);
    }, e.prototype.applyPlugins = function() {
      var t = this, n = this.options;
      e.plugins.sort(function(r, i) {
        var a, s = (a = {}, a.pre = -1, a.post = 1, a), l = r.applyOrder ? s[r.applyOrder] : 0, u = i.applyOrder ? s[i.applyOrder] : 0;
        return l - u;
      }).forEach(function(r) {
        var i = r.ctor;
        n[r.name] && typeof i == "function" && (t.plugins[r.name] = new i(t));
      });
    }, e.prototype.handleAutoBlur = function() {
      this.options.autoBlur && this.on(this.eventTypes.beforeScrollStart, function() {
        var t = document.activeElement;
        t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA") && t.blur();
      });
    }, e.prototype.eventBubbling = function() {
      br(this.scroller.hooks, this, [this.eventTypes.beforeScrollStart, this.eventTypes.scrollStart, this.eventTypes.scroll, this.eventTypes.scrollEnd, this.eventTypes.scrollCancel, this.eventTypes.touchEnd, this.eventTypes.flick]);
    }, e.prototype.refreshWithoutReset = function(t) {
      this.scroller.refresh(t), this.hooks.trigger(this.hooks.eventTypes.refresh, t), this.trigger(this.eventTypes.refresh, t);
    }, e.prototype.proxy = function(t) {
      var n = this;
      t.forEach(function(r) {
        var i = r.key, a = r.sourceKey;
        Uu(n, a, i);
      });
    }, e.prototype.refresh = function() {
      var t = this.setContent(this.wrapper), n = t.contentChanged, r = t.valid;
      if (r) {
        var i = this.content;
        this.refreshWithoutReset(i), n && (this.hooks.trigger(this.hooks.eventTypes.contentChanged, i), this.trigger(this.eventTypes.contentChanged, i)), this.scroller.resetPosition();
      }
    }, e.prototype.enable = function() {
      this.scroller.enable(), this.hooks.trigger(this.hooks.eventTypes.enable), this.trigger(this.eventTypes.enable);
    }, e.prototype.disable = function() {
      this.scroller.disable(), this.hooks.trigger(this.hooks.eventTypes.disable), this.trigger(this.eventTypes.disable);
    }, e.prototype.destroy = function() {
      this.hooks.trigger(this.hooks.eventTypes.destroy), this.trigger(this.eventTypes.destroy), this.scroller.destroy();
    }, e.prototype.eventRegister = function(t) {
      this.registerType(t);
    }, e.plugins = [], e.pluginsMap = {}, e;
  }(vt)
);
function Fo(o, e) {
  var t = new No(o, e);
  return t;
}
Fo.use = No.use;
Fo.plugins = No.plugins;
Fo.pluginsMap = No.pluginsMap;
var Wr = Fo;
const tc = B({
  name: O + "ActionSheet",
  props: [
    ...Q,
    "menus",
    "modelValue",
    "visible",
    "ellipsis",
    "contentPosition",
    "contentStyle",
    "height",
    "valueField",
    "textField",
    "contentClass"
  ],
  setup(o, e) {
    return z({ props: o, context: e, renderless: wu, api: Su, extendOptions: { BScroll: Wr } });
  }
}), W = (o, e) => {
  const t = o.__vccOpts || o;
  for (const [n, r] of e)
    t[n] = r;
  return t;
}, nc = ["onClick"], oc = {
  key: 1,
  class: "tiny-mobile-action-sheet__action"
};
function rc(o, e, t, n, r, i) {
  return oe((A(), w(
    "div",
    {
      class: "tiny-mobile-action-sheet",
      onClick: e[1] || (e[1] = (...a) => o.hide && o.hide(...a))
    },
    [
      o.contentPosition ? x("v-if", !0) : (A(), w(
        "div",
        {
          key: 0,
          class: "tiny-mobile-action-sheet__mask",
          style: H(o.state.sheetMaskStyle)
        },
        null,
        4
        /* STYLE */
      )),
      T(
        "div",
        {
          class: P([
            "tiny-mobile-action-sheet__content",
            o.state.toggle ? "is-toggle" : "",
            o.contentPosition ? "" : "is-not-content"
          ]),
          style: H([o.state.sheetContentStyle]),
          ref: "scrollMenu"
        },
        [
          T(
            "div",
            {
              class: P(["tiny-mobile-action-sheet__menu", o.ellipsis ? "is-ellipsis" : ""])
            },
            [
              (A(!0), w(
                q,
                null,
                ae(o.menus, (a, s) => (A(), w("div", {
                  class: P([
                    "tiny-mobile-action-sheet__item",
                    a.warn ? "is-warn" : "",
                    a[o.valueField] === o.modelValue ? "is-active" : ""
                  ]),
                  style: H(o.state.contentStyle),
                  key: s,
                  onClick: (l) => o.selectOption(a, s)
                }, [
                  F(o.$slots, "item", { item: a }, () => [
                    ue(
                      M(a[o.textField]),
                      1
                      /* TEXT */
                    )
                  ])
                ], 14, nc))),
                128
                /* KEYED_FRAGMENT */
              ))
            ],
            2
            /* CLASS */
          )
        ],
        6
        /* CLASS, STYLE */
      ),
      o.contentPosition ? (A(), w("div", oc, [
        F(o.$slots, "action", {}, () => [
          T(
            "div",
            {
              class: "tiny-mobile-action-sheet__cancel",
              onClick: e[0] || (e[0] = (...a) => o.hide && o.hide(...a))
            },
            M(o.t("ui.actionSheet.cancel")),
            1
            /* TEXT */
          )
        ])
      ])) : x("v-if", !0)
    ],
    512
    /* NEED_PATCH */
  )), [
    [he, o.visible]
  ]);
}
const Go = /* @__PURE__ */ W(tc, [["render", rc]]);
var ic = function(e) {
  var t, n = (typeof process > "u" ? "undefined" : R(process)) === "object" ? (t = process.env) === null || t === void 0 ? void 0 : t.TINY_MODE : null;
  return Go;
}, ac = C(C({}, j), {}, {
  menus: {
    type: Array,
    default: function() {
      return [];
    }
  },
  modelValue: [Number, String, Array],
  beforeClose: Function,
  visible: {
    type: Boolean,
    default: !1
  },
  ellipsis: {
    type: Boolean,
    default: !1
  },
  height: {
    type: String,
    default: "100%"
  },
  valueField: {
    type: String,
    default: "id"
  },
  textField: {
    type: String,
    default: "label"
  },
  title: String,
  showHeader: {
    type: Boolean,
    default: !0
  },
  showFooter: {
    type: Boolean,
    default: !1
  },
  showClose: {
    type: Boolean,
    default: function() {
      return !0;
    }
  },
  fullscreen: {
    type: Boolean,
    default: function() {
      return !1;
    }
  },
  customClass: [String, Object, Array],
  contentClass: String,
  type: {
    type: String,
    default: "normal"
  },
  mask: {
    type: Boolean,
    default: !0
  },
  maskClosable: {
    type: Boolean,
    default: !0
  },
  lockScroll: {
    type: Boolean,
    default: !0
  },
  flex: {
    type: Boolean,
    default: !0
  },
  contentPosition: {
    type: Boolean,
    default: !1
  },
  contentStyle: {
    type: Object,
    default: function() {
      return {};
    }
  }
});
const Fe = B({
  name: O + "ActionSheet",
  props: ac,
  setup: function(e, t) {
    return K({
      props: e,
      context: t,
      template: ic
    });
  }
}), sc = "3.20.0";
Fe.model = {
  prop: "modelValue",
  event: "update:modelValue"
};
Fe.install = function(o) {
  o.component(Fe.name, Fe);
};
Fe.version = sc;
var lc = 2e3, uc = function(e) {
  var t = e.api, n = e.props;
  return function(r) {
    if (n.autoHide && r)
      var i = setTimeout(function() {
        t.handleClose(), clearTimeout(i);
      }, lc);
  };
}, cc = function(e) {
  var t = e.props, n = e.mode;
  return function() {
    var r = t.type, i = t.size, a = t.center;
    if (n === "mobile") {
      var s = ["tiny-mobile-alert", "tiny-mobile-alert--" + r, "tiny-mobile-alert--" + i];
      return a && s.push("is-center"), s;
    }
    return [];
  };
}, dc = function(e) {
  var t = e.props, n = e.mode;
  return function() {
    if (n === "mobile") {
      var r = {
        top: isNaN(t.offset) ? t.offset : "".concat(t.offset, "px")
      };
      return r;
    }
    return null;
  };
}, pc = function(e) {
  var t = e.emit, n = e.state;
  return function() {
    n.show = !1, t("close");
  };
}, fc = function(e) {
  var t = e.constants, n = e.props, r = e.designConfig;
  return function() {
    var i, a = r == null || (i = r.icons) === null || i === void 0 ? void 0 : i[n.type];
    return n.icon || a || t.ICON_MAP[n.type];
  };
}, mc = function(e) {
  var t = e.constants, n = e.t, r = e.props;
  return function() {
    return r.title || n(t.TITLE_MAP[r.type]);
  };
}, vc = function(e) {
  var t = e.state, n = e.props, r = e.vm;
  return function() {
    n.showFoldable && (t.contentVisible = !t.contentVisible), r.$refs.ContentDescribe && (t.contentDescribeHeight = r.$refs.ContentDescribe.scrollHeight, t.contentDescribeHeight > t.contentMaxHeight && (t.scrollStatus = !0)), r.$refs.ContentDefault && (t.contentDefaultHeight = r.$refs.ContentDefault.scrollHeight, t.contentDefaultHeight > t.contentMaxHeight && (t.scrollStatus = !0));
  };
}, Si = function(e) {
  return e.$el || e;
}, hc = function(e) {
  var t = e.props, n = e.parent, r = e.vm, i = e.nextTick;
  return function() {
    var a = t.target, s = n.$parent;
    i(function() {
      var l = s == null ? void 0 : s.$refs[a];
      if (!(!a || !l)) {
        var u = Array.isArray(l) ? l[0] : l;
        Si(u).insertBefore(r.$el, Si(u).firstChild);
      }
    });
  };
}, gc = ["handleClose", "state", "handleHeaderClick"], Ac = function(e) {
  var t = e.api, n = e.computed, r = e.constants, i = e.reactive;
  return i({
    show: !0,
    contentVisible: !1,
    contentDescribeHeight: 0,
    contentDefaultHeight: 0,
    contentMaxHeight: r.CONTENT_MAXHEUGHT,
    scrollStatus: !1,
    getIcon: n(function() {
      return t.computedGetIcon();
    }),
    getTitle: n(function() {
      return t.computedGetTitle();
    }),
    alertClass: n(function() {
      return t.computedClass();
    }),
    alertStyle: n(function() {
      return t.computedStyle();
    })
  });
}, yc = function(e) {
  var t = e.api, n = e.state, r = e.constants, i = e.props, a = e.designConfig, s = e.t, l = e.emit, u = e.vm, c = e.parent, d = e.nextTick, p = e.mode;
  Object.assign(t, {
    state: n,
    computedGetIcon: fc({
      constants: r,
      props: i,
      designConfig: a
    }),
    computedGetTitle: mc({
      constants: r,
      props: i,
      t: s
    }),
    computedClass: cc({
      props: i,
      mode: p
    }),
    computedStyle: dc({
      props: i,
      mode: p
    }),
    handleClose: pc({
      emit: l,
      state: n
    }),
    handleHeaderClick: vc({
      state: n,
      props: i,
      vm: u
    }),
    watchAutoHide: uc({
      api: t,
      props: i
    }),
    handlerTargetNode: hc({
      props: i,
      parent: c,
      vm: u,
      nextTick: d
    })
  });
}, bc = function(e) {
  var t = e.watch, n = e.props, r = e.api;
  t(function() {
    return n.autoHide;
  }, r.watchAutoHide, {
    immediate: !0
  }), t(function() {
    return n.target;
  }, r.handlerTargetNode, {
    immediate: !0
  });
}, Sc = function(e, t, n) {
  var r = t.computed, i = t.reactive, a = t.watch, s = n.t, l = n.emit, u = n.constants, c = n.vm, d = n.designConfig, p = n.parent, f = n.nextTick, m = n.mode, h = {}, v = Ac({
    api: h,
    computed: r,
    constants: u,
    reactive: i
  });
  return yc({
    api: h,
    state: v,
    constants: u,
    props: e,
    designConfig: d,
    t: s,
    emit: l,
    vm: c,
    parent: p,
    nextTick: f,
    mode: m
  }), bc({
    watch: a,
    props: e,
    api: h
  }), h;
};
const wc = B({
  props: [
    ...Q,
    "icon",
    "type",
    "size",
    "description",
    "closable",
    "showIcon",
    "closeText",
    "duration",
    "offset",
    "autoHide",
    "target",
    "center"
  ],
  components: {
    IconClose: yt(),
    IconSuccess: Vr(),
    IconError: Mo(),
    IconHelp: ba(),
    IconWarning: Sa()
    // key值在 $constants 中已定义
  },
  setup(o, e) {
    return z({ props: o, context: e, renderless: Sc, api: gc });
  }
});
function Tc(o, e, t, n, r, i) {
  const a = $("icon-close");
  return A(), G($e, { name: "tiny-mobile-alert-fade" }, {
    default: ee(() => [
      o.state.show ? (A(), w(
        "div",
        {
          key: 0,
          class: P(o.state.alertClass),
          style: H(o.state.alertStyle)
        },
        [
          o.showIcon ? (A(), G(pe(o.state.getIcon), {
            key: 0,
            class: "tiny-mobile-alert__icon"
          })) : x("v-if", !0),
          T(
            "div",
            {
              class: P(["tiny-mobile-alert__content", { "is-hideicon": !o.showIcon }])
            },
            [
              F(o.$slots, "default", {}, () => [
                ue(
                  M(o.description),
                  1
                  /* TEXT */
                )
              ])
            ],
            2
            /* CLASS */
          ),
          !o.closeText && o.closable ? (A(), G(a, {
            key: 1,
            onClick: o.handleClose,
            class: "tiny-mobile-alert__icon tiny-mobile-alert__close"
          }, null, 8, ["onClick"])) : o.closeText && o.closable ? (A(), w(
            "span",
            {
              key: 2,
              onClick: e[0] || (e[0] = (...s) => o.handleClose && o.handleClose(...s)),
              class: "is-custom"
            },
            M(o.closeText),
            1
            /* TEXT */
          )) : x("v-if", !0)
        ],
        6
        /* CLASS, STYLE */
      )) : x("v-if", !0)
    ]),
    _: 3
    /* FORWARDED */
  });
}
const Rn = /* @__PURE__ */ W(wc, [["render", Tc]]);
var Cc = function(e) {
  var t, n = (typeof process > "u" ? "undefined" : R(process)) === "object" ? (t = process.env) === null || t === void 0 ? void 0 : t.TINY_MODE : null;
  return Rn;
}, Ic = {
  ICON_MAP: {
    success: "icon-success",
    error: "icon-error",
    info: "icon-help",
    warning: "icon-warning-triangle",
    simple: "icon-help"
  },
  TITLE_MAP: {
    success: "ui.alert.success",
    error: "ui.alert.error",
    info: "ui.alert.info",
    warning: "ui.alert.warning"
  },
  CONTENT_MAXHEUGHT: 252
}, kc = C(C({}, j), {}, {
  _constants: {
    type: Object,
    default: function() {
      return Ic;
    }
  },
  icon: [String, Object],
  type: {
    type: String,
    default: "info"
  },
  size: {
    type: String,
    default: "normal"
  },
  description: {
    type: String,
    default: ""
  },
  title: {
    type: String
  },
  center: Boolean,
  showIcon: {
    type: Boolean,
    default: !0
  },
  closable: {
    type: Boolean,
    default: !0
  },
  closeText: {
    type: String,
    default: ""
  },
  singleLine: {
    type: Boolean,
    default: !1
  },
  scrolling: {
    type: Boolean,
    default: !1
  },
  showFoldable: {
    type: Boolean,
    default: !1
  },
  customClass: [String, Object, Array],
  offset: {
    type: [Number, String],
    default: 0
  },
  autoHide: {
    type: Boolean,
    default: !1
  },
  target: {
    type: String,
    default: ""
  }
});
const kt = B({
  name: O + "Alert",
  props: kc,
  setup: function(e, t) {
    return K({
      props: e,
      context: t,
      template: Cc
    });
  }
}), Ec = "3.20.0";
kt.install = function(o) {
  o.component(kt.name, kt);
};
kt.version = Ec;
var Dc = function(e) {
  var t = e.props, n = e.state;
  return function() {
    var r = t.error, i = r ? r() : void 0;
    i !== !1 && (n.isSrcImageExist ? n.isSrcImageExist = !1 : n.isDefaultImageExist = !1);
  };
}, Bc = function(e) {
  return function(t) {
    var n = t.size, r = t.icon, i = t.shape, a = [e.COMPONENT_PREFIX];
    return n && typeof n == "string" && a.push("".concat(e.COMPONENT_PREFIX, "--").concat(n)), r && a.push("".concat(e.COMPONENT_PREFIX, "--").concat(e.icon)), i && a.push("".concat(e.COMPONENT_PREFIX, "--").concat(i)), a.join(" ");
  };
}, xc = ["state", "handleError"], Pc = function(e, t, n) {
  var r = t.computed, i = t.reactive, a = n.constants, s = {
    computedAvatarClass: Bc(a)
  }, l = i({
    isSrcImageExist: !0,
    isDefaultImageExist: !0,
    avatarClass: r(function() {
      return s.computedAvatarClass(e);
    })
  });
  return Object.assign(s, {
    state: l,
    handleError: Dc({
      props: e,
      state: l
    })
  }), s;
};
const Mc = {
  COMPONENT_PREFIX: "tiny-mobile-avatar",
  ICON: "icon"
}, Et = /* @__PURE__ */ B({
  name: O + "Avatar",
  props: {
    _constants: {
      type: Object,
      default: () => Mc
    },
    alt: String,
    error: Function,
    fit: {
      type: String,
      default: "cover"
    },
    icon: Object,
    shape: {
      type: String,
      default: "circle",
      validator(o) {
        return ~["circle", "square"].indexOf(o);
      }
    },
    size: {
      type: [Number, String],
      validator(o) {
        return typeof o == "string" ? ~["large", "medium", "small"].indexOf(o) : typeof o == "number";
      }
    },
    src: String,
    srcSet: String
  },
  setup(o, e) {
    return z({
      props: o,
      context: e,
      renderless: Pc,
      api: xc,
      mono: !0,
      h: J
    });
  },
  render() {
    const {
      alt: o,
      fit: e,
      icon: t,
      size: n,
      src: r,
      srcSet: i,
      state: {
        isImageExist: a,
        avatarClass: s
      }
    } = this, l = a && r;
    let u = {};
    return typeof n == "number" && (u = {
      height: `${n}px`,
      width: `${n}px`,
      lineHeight: `${n}px`
    }), D("span", {
      class: s,
      style: u
    }, [(() => l ? D("img", {
      src: r,
      alt: o,
      srcSet: i,
      style: {
        "object-fit": e
      },
      onError: this.handleError
    }, null) : t ? D(t, null, null) : this.$slots.default && this.$slots.default())()]);
  }
});
const Oc = "3.20.0";
Et.install = function(o) {
  o.component(Et.name, Et);
};
Et.version = Oc;
var Lc = function(e) {
  var t = e.props, n = e.state;
  return function() {
    return (typeof t.value == "number" || typeof t.value == "string") && typeof t.max == "number" && t.max < Number(n.valueRef) ? "".concat(t.max, "+") : n.valueRef;
  };
}, Nc = function(e) {
  var t = e.props;
  return function() {
    if (typeof t.value == "number" || typeof t.value == "string")
      return t.value;
  };
}, Fc = function(e) {
  var t = e.designConfig, n = e.props;
  return function() {
    return (t == null ? void 0 : t.transform) === "unset" ? null : {
      transform: `translate(
        `.concat(n.offset[0]).concat(typeof n.offset[0] == "number" ? "px" : "", `,
        `).concat(n.offset[1]).concat(typeof n.offset[1] == "number" ? "px" : "", `
      )`)
    };
  };
}, Sr = { exports: {} }, se = {}, wr = { exports: {} }, Kt = {};
function Fa() {
  var o = {};
  return o["align-content"] = !1, o["align-items"] = !1, o["align-self"] = !1, o["alignment-adjust"] = !1, o["alignment-baseline"] = !1, o.all = !1, o["anchor-point"] = !1, o.animation = !1, o["animation-delay"] = !1, o["animation-direction"] = !1, o["animation-duration"] = !1, o["animation-fill-mode"] = !1, o["animation-iteration-count"] = !1, o["animation-name"] = !1, o["animation-play-state"] = !1, o["animation-timing-function"] = !1, o.azimuth = !1, o["backface-visibility"] = !1, o.background = !0, o["background-attachment"] = !0, o["background-clip"] = !0, o["background-color"] = !0, o["background-image"] = !0, o["background-origin"] = !0, o["background-position"] = !0, o["background-repeat"] = !0, o["background-size"] = !0, o["baseline-shift"] = !1, o.binding = !1, o.bleed = !1, o["bookmark-label"] = !1, o["bookmark-level"] = !1, o["bookmark-state"] = !1, o.border = !0, o["border-bottom"] = !0, o["border-bottom-color"] = !0, o["border-bottom-left-radius"] = !0, o["border-bottom-right-radius"] = !0, o["border-bottom-style"] = !0, o["border-bottom-width"] = !0, o["border-collapse"] = !0, o["border-color"] = !0, o["border-image"] = !0, o["border-image-outset"] = !0, o["border-image-repeat"] = !0, o["border-image-slice"] = !0, o["border-image-source"] = !0, o["border-image-width"] = !0, o["border-left"] = !0, o["border-left-color"] = !0, o["border-left-style"] = !0, o["border-left-width"] = !0, o["border-radius"] = !0, o["border-right"] = !0, o["border-right-color"] = !0, o["border-right-style"] = !0, o["border-right-width"] = !0, o["border-spacing"] = !0, o["border-style"] = !0, o["border-top"] = !0, o["border-top-color"] = !0, o["border-top-left-radius"] = !0, o["border-top-right-radius"] = !0, o["border-top-style"] = !0, o["border-top-width"] = !0, o["border-width"] = !0, o.bottom = !1, o["box-decoration-break"] = !0, o["box-shadow"] = !0, o["box-sizing"] = !0, o["box-snap"] = !0, o["box-suppress"] = !0, o["break-after"] = !0, o["break-before"] = !0, o["break-inside"] = !0, o["caption-side"] = !1, o.chains = !1, o.clear = !0, o.clip = !1, o["clip-path"] = !1, o["clip-rule"] = !1, o.color = !0, o["color-interpolation-filters"] = !0, o["column-count"] = !1, o["column-fill"] = !1, o["column-gap"] = !1, o["column-rule"] = !1, o["column-rule-color"] = !1, o["column-rule-style"] = !1, o["column-rule-width"] = !1, o["column-span"] = !1, o["column-width"] = !1, o.columns = !1, o.contain = !1, o.content = !1, o["counter-increment"] = !1, o["counter-reset"] = !1, o["counter-set"] = !1, o.crop = !1, o.cue = !1, o["cue-after"] = !1, o["cue-before"] = !1, o.cursor = !1, o.direction = !1, o.display = !0, o["display-inside"] = !0, o["display-list"] = !0, o["display-outside"] = !0, o["dominant-baseline"] = !1, o.elevation = !1, o["empty-cells"] = !1, o.filter = !1, o.flex = !1, o["flex-basis"] = !1, o["flex-direction"] = !1, o["flex-flow"] = !1, o["flex-grow"] = !1, o["flex-shrink"] = !1, o["flex-wrap"] = !1, o.float = !1, o["float-offset"] = !1, o["flood-color"] = !1, o["flood-opacity"] = !1, o["flow-from"] = !1, o["flow-into"] = !1, o.font = !0, o["font-family"] = !0, o["font-feature-settings"] = !0, o["font-kerning"] = !0, o["font-language-override"] = !0, o["font-size"] = !0, o["font-size-adjust"] = !0, o["font-stretch"] = !0, o["font-style"] = !0, o["font-synthesis"] = !0, o["font-variant"] = !0, o["font-variant-alternates"] = !0, o["font-variant-caps"] = !0, o["font-variant-east-asian"] = !0, o["font-variant-ligatures"] = !0, o["font-variant-numeric"] = !0, o["font-variant-position"] = !0, o["font-weight"] = !0, o.grid = !1, o["grid-area"] = !1, o["grid-auto-columns"] = !1, o["grid-auto-flow"] = !1, o["grid-auto-rows"] = !1, o["grid-column"] = !1, o["grid-column-end"] = !1, o["grid-column-start"] = !1, o["grid-row"] = !1, o["grid-row-end"] = !1, o["grid-row-start"] = !1, o["grid-template"] = !1, o["grid-template-areas"] = !1, o["grid-template-columns"] = !1, o["grid-template-rows"] = !1, o["hanging-punctuation"] = !1, o.height = !0, o.hyphens = !1, o.icon = !1, o["image-orientation"] = !1, o["image-resolution"] = !1, o["ime-mode"] = !1, o["initial-letters"] = !1, o["inline-box-align"] = !1, o["justify-content"] = !1, o["justify-items"] = !1, o["justify-self"] = !1, o.left = !1, o["letter-spacing"] = !0, o["lighting-color"] = !0, o["line-box-contain"] = !1, o["line-break"] = !1, o["line-grid"] = !1, o["line-height"] = !1, o["line-snap"] = !1, o["line-stacking"] = !1, o["line-stacking-ruby"] = !1, o["line-stacking-shift"] = !1, o["line-stacking-strategy"] = !1, o["list-style"] = !0, o["list-style-image"] = !0, o["list-style-position"] = !0, o["list-style-type"] = !0, o.margin = !0, o["margin-bottom"] = !0, o["margin-left"] = !0, o["margin-right"] = !0, o["margin-top"] = !0, o["marker-offset"] = !1, o["marker-side"] = !1, o.marks = !1, o.mask = !1, o["mask-box"] = !1, o["mask-box-outset"] = !1, o["mask-box-repeat"] = !1, o["mask-box-slice"] = !1, o["mask-box-source"] = !1, o["mask-box-width"] = !1, o["mask-clip"] = !1, o["mask-image"] = !1, o["mask-origin"] = !1, o["mask-position"] = !1, o["mask-repeat"] = !1, o["mask-size"] = !1, o["mask-source-type"] = !1, o["mask-type"] = !1, o["max-height"] = !0, o["max-lines"] = !1, o["max-width"] = !0, o["min-height"] = !0, o["min-width"] = !0, o["move-to"] = !1, o["nav-down"] = !1, o["nav-index"] = !1, o["nav-left"] = !1, o["nav-right"] = !1, o["nav-up"] = !1, o["object-fit"] = !1, o["object-position"] = !1, o.opacity = !1, o.order = !1, o.orphans = !1, o.outline = !1, o["outline-color"] = !1, o["outline-offset"] = !1, o["outline-style"] = !1, o["outline-width"] = !1, o.overflow = !1, o["overflow-wrap"] = !1, o["overflow-x"] = !1, o["overflow-y"] = !1, o.padding = !0, o["padding-bottom"] = !0, o["padding-left"] = !0, o["padding-right"] = !0, o["padding-top"] = !0, o.page = !1, o["page-break-after"] = !1, o["page-break-before"] = !1, o["page-break-inside"] = !1, o["page-policy"] = !1, o.pause = !1, o["pause-after"] = !1, o["pause-before"] = !1, o.perspective = !1, o["perspective-origin"] = !1, o.pitch = !1, o["pitch-range"] = !1, o["play-during"] = !1, o.position = !1, o["presentation-level"] = !1, o.quotes = !1, o["region-fragment"] = !1, o.resize = !1, o.rest = !1, o["rest-after"] = !1, o["rest-before"] = !1, o.richness = !1, o.right = !1, o.rotation = !1, o["rotation-point"] = !1, o["ruby-align"] = !1, o["ruby-merge"] = !1, o["ruby-position"] = !1, o["shape-image-threshold"] = !1, o["shape-outside"] = !1, o["shape-margin"] = !1, o.size = !1, o.speak = !1, o["speak-as"] = !1, o["speak-header"] = !1, o["speak-numeral"] = !1, o["speak-punctuation"] = !1, o["speech-rate"] = !1, o.stress = !1, o["string-set"] = !1, o["tab-size"] = !1, o["table-layout"] = !1, o["text-align"] = !0, o["text-align-last"] = !0, o["text-combine-upright"] = !0, o["text-decoration"] = !0, o["text-decoration-color"] = !0, o["text-decoration-line"] = !0, o["text-decoration-skip"] = !0, o["text-decoration-style"] = !0, o["text-emphasis"] = !0, o["text-emphasis-color"] = !0, o["text-emphasis-position"] = !0, o["text-emphasis-style"] = !0, o["text-height"] = !0, o["text-indent"] = !0, o["text-justify"] = !0, o["text-orientation"] = !0, o["text-overflow"] = !0, o["text-shadow"] = !0, o["text-space-collapse"] = !0, o["text-transform"] = !0, o["text-underline-position"] = !0, o["text-wrap"] = !0, o.top = !1, o.transform = !1, o["transform-origin"] = !1, o["transform-style"] = !1, o.transition = !1, o["transition-delay"] = !1, o["transition-duration"] = !1, o["transition-property"] = !1, o["transition-timing-function"] = !1, o["unicode-bidi"] = !1, o["vertical-align"] = !1, o.visibility = !1, o["voice-balance"] = !1, o["voice-duration"] = !1, o["voice-family"] = !1, o["voice-pitch"] = !1, o["voice-range"] = !1, o["voice-rate"] = !1, o["voice-stress"] = !1, o["voice-volume"] = !1, o.volume = !1, o["white-space"] = !1, o.widows = !1, o.width = !0, o["will-change"] = !1, o["word-break"] = !0, o["word-spacing"] = !0, o["word-wrap"] = !0, o["wrap-flow"] = !1, o["wrap-through"] = !1, o["writing-mode"] = !1, o["z-index"] = !1, o;
}
function Rc(o, e, t) {
}
function Vc(o, e, t) {
}
var Uc = /javascript\s*\:/img;
function Hc(o, e) {
  return Uc.test(e) ? "" : e;
}
Kt.whiteList = Fa();
Kt.getDefaultWhiteList = Fa;
Kt.onAttr = Rc;
Kt.onIgnoreAttr = Vc;
Kt.safeAttrValue = Hc;
var $c = {
  indexOf: function(e, t) {
    var n, r;
    if (Array.prototype.indexOf)
      return e.indexOf(t);
    for (n = 0, r = e.length; n < r; n++)
      if (e[n] === t)
        return n;
    return -1;
  },
  forEach: function(e, t, n) {
    var r, i;
    if (Array.prototype.forEach)
      return e.forEach(t, n);
    for (r = 0, i = e.length; r < i; r++)
      t.call(n, e[r], r, e);
  },
  trim: function(e) {
    return String.prototype.trim ? e.trim() : e.replace(/(^\s*)|(\s*$)/g, "");
  },
  trimRight: function(e) {
    return String.prototype.trimRight ? e.trimRight() : e.replace(/(\s*$)/g, "");
  }
}, yn = $c;
function zc(o, e) {
  o = yn.trimRight(o), o[o.length - 1] !== ";" && (o += ";");
  var t = o.length, n = !1, r = 0, i = 0, a = "";
  function s() {
    if (!n) {
      var c = yn.trim(o.slice(r, i)), d = c.indexOf(":");
      if (d !== -1) {
        var p = yn.trim(c.slice(0, d)), f = yn.trim(c.slice(d + 1));
        if (p) {
          var m = e(r, a.length, p, f, c);
          m && (a += m + "; ");
        }
      }
    }
    r = i + 1;
  }
  for (; i < t; i++) {
    var l = o[i];
    if (l === "/" && o[i + 1] === "*") {
      var u = o.indexOf("*/", i + 2);
      if (u === -1)
        break;
      i = u + 1, r = i + 1, n = !1;
    } else
      l === "(" ? n = !0 : l === ")" ? n = !1 : l === ";" ? n || s() : l === `
` && s();
  }
  return yn.trim(a);
}
var jc = zc, Vn = Kt, Wc = jc;
function wi(o) {
  return o == null;
}
function Gc(o) {
  var e = {};
  for (var t in o)
    e[t] = o[t];
  return e;
}
function Ra(o) {
  o = Gc(o || {}), o.whiteList = o.whiteList || Vn.whiteList, o.onAttr = o.onAttr || Vn.onAttr, o.onIgnoreAttr = o.onIgnoreAttr || Vn.onIgnoreAttr, o.safeAttrValue = o.safeAttrValue || Vn.safeAttrValue, this.options = o;
}
Ra.prototype.process = function(o) {
  if (o = o || "", o = o.toString(), !o)
    return "";
  var e = this, t = e.options, n = t.whiteList, r = t.onAttr, i = t.onIgnoreAttr, a = t.safeAttrValue, s = Wc(o, function(l, u, c, d, p) {
    var f = n[c], m = !1;
    if (f === !0 ? m = f : typeof f == "function" ? m = f(d) : f instanceof RegExp && (m = f.test(d)), m !== !0 && (m = !1), d = a(c, d), !!d) {
      var h = {
        position: u,
        sourcePosition: l,
        source: p,
        isWhite: m
      };
      if (m) {
        var v = r(c, d, h);
        return wi(v) ? c + ":" + d : v;
      } else {
        var v = i(c, d, h);
        if (!wi(v))
          return v;
      }
    }
  });
  return s;
};
var Yc = Ra;
(function(o, e) {
  var t = Kt, n = Yc;
  function r(a, s) {
    var l = new n(s);
    return l.process(a);
  }
  e = o.exports = r, e.FilterCSS = n;
  for (var i in t)
    e[i] = t[i];
  typeof window < "u" && (window.filterCSS = o.exports);
})(wr, wr.exports);
var Gr = wr.exports, Yr = {
  indexOf: function(e, t) {
    var n, r;
    if (Array.prototype.indexOf)
      return e.indexOf(t);
    for (n = 0, r = e.length; n < r; n++)
      if (e[n] === t)
        return n;
    return -1;
  },
  forEach: function(e, t, n) {
    var r, i;
    if (Array.prototype.forEach)
      return e.forEach(t, n);
    for (r = 0, i = e.length; r < i; r++)
      t.call(n, e[r], r, e);
  },
  trim: function(e) {
    return String.prototype.trim ? e.trim() : e.replace(/(^\s*)|(\s*$)/g, "");
  },
  spaceIndex: function(e) {
    var t = /\s|\n|\t/, n = t.exec(e);
    return n ? n.index : -1;
  }
}, Kc = Gr.FilterCSS, Qc = Gr.getDefaultWhiteList, Co = Yr;
function Va() {
  return {
    a: ["target", "href", "title"],
    abbr: ["title"],
    address: [],
    area: ["shape", "coords", "href", "alt"],
    article: [],
    aside: [],
    audio: ["autoplay", "controls", "crossorigin", "loop", "muted", "preload", "src"],
    b: [],
    bdi: ["dir"],
    bdo: ["dir"],
    big: [],
    blockquote: ["cite"],
    br: [],
    caption: [],
    center: [],
    cite: [],
    code: [],
    col: ["align", "valign", "span", "width"],
    colgroup: ["align", "valign", "span", "width"],
    dd: [],
    del: ["datetime"],
    details: ["open"],
    div: [],
    dl: [],
    dt: [],
    em: [],
    figcaption: [],
    figure: [],
    font: ["color", "size", "face"],
    footer: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    header: [],
    hr: [],
    i: [],
    img: ["src", "alt", "title", "width", "height"],
    ins: ["datetime"],
    li: [],
    mark: [],
    nav: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    section: [],
    small: [],
    span: [],
    sub: [],
    summary: [],
    sup: [],
    strong: [],
    strike: [],
    table: ["width", "border", "align", "valign"],
    tbody: ["align", "valign"],
    td: ["width", "rowspan", "colspan", "align", "valign"],
    tfoot: ["align", "valign"],
    th: ["width", "rowspan", "colspan", "align", "valign"],
    thead: ["align", "valign"],
    tr: ["rowspan", "align", "valign"],
    tt: [],
    u: [],
    ul: [],
    video: ["autoplay", "controls", "crossorigin", "loop", "muted", "playsinline", "poster", "preload", "src", "height", "width"]
  };
}
var Ua = new Kc();
function Xc(o, e, t) {
}
function Zc(o, e, t) {
}
function Jc(o, e, t) {
}
function qc(o, e, t) {
}
function Ha(o) {
  return o.replace(ed, "&lt;").replace(td, "&gt;");
}
function _c(o, e, t, n) {
  if (t = Ya(t), e === "href" || e === "src") {
    if (t = Co.trim(t), t === "#")
      return "#";
    if (!(t.substr(0, 7) === "http://" || t.substr(0, 8) === "https://" || t.substr(0, 7) === "mailto:" || t.substr(0, 4) === "tel:" || t.substr(0, 11) === "data:image/" || t.substr(0, 6) === "ftp://" || t.substr(0, 2) === "./" || t.substr(0, 3) === "../" || t[0] === "#" || t[0] === "/"))
      return "";
  } else if (e === "background") {
    if (Un.lastIndex = 0, Un.test(t))
      return "";
  } else if (e === "style") {
    if (Ti.lastIndex = 0, Ti.test(t) || (Ci.lastIndex = 0, Ci.test(t) && (Un.lastIndex = 0, Un.test(t))))
      return "";
    n !== !1 && (n = n || Ua, t = n.process(t));
  }
  return t = Ka(t), t;
}
var ed = /</g, td = />/g, nd = /"/g, od = /&quot;/g, rd = /&#([a-zA-Z0-9]*);?/gim, id = /&colon;?/gim, ad = /&newline;?/gim, Un = /((j\s*a\s*v\s*a|v\s*b|l\s*i\s*v\s*e)\s*s\s*c\s*r\s*i\s*p\s*t\s*|m\s*o\s*c\s*h\s*a)\:/gi, Ti = /e\s*x\s*p\s*r\s*e\s*s\s*s\s*i\s*o\s*n\s*\(.*/gi, Ci = /u\s*r\s*l\s*\(.*/gi;
function $a(o) {
  return o.replace(nd, "&quot;");
}
function za(o) {
  return o.replace(od, '"');
}
function ja(o) {
  return o.replace(rd, function(t, n) {
    return n[0] === "x" || n[0] === "X" ? String.fromCharCode(parseInt(n.substr(1), 16)) : String.fromCharCode(parseInt(n, 10));
  });
}
function Wa(o) {
  return o.replace(id, ":").replace(ad, " ");
}
function Ga(o) {
  for (var e = "", t = 0, n = o.length; t < n; t++)
    e += o.charCodeAt(t) < 32 ? " " : o.charAt(t);
  return Co.trim(e);
}
function Ya(o) {
  return o = za(o), o = ja(o), o = Wa(o), o = Ga(o), o;
}
function Ka(o) {
  return o = $a(o), o = Ha(o), o;
}
function sd() {
  return "";
}
function ld(o, e) {
  typeof e != "function" && (e = function() {
  });
  var t = !Array.isArray(o);
  function n(a) {
    return t ? !0 : Co.indexOf(o, a) !== -1;
  }
  var r = [], i = !1;
  return {
    onIgnoreTag: function(s, l, u) {
      if (n(s))
        if (u.isClosing) {
          var c = "[/removed]", d = u.position + c.length;
          return r.push([i !== !1 ? i : u.position, d]), i = !1, c;
        } else
          return i || (i = u.position), "[removed]";
      else
        return e(s, l, u);
    },
    remove: function(s) {
      var l = "", u = 0;
      return Co.forEach(r, function(c) {
        l += s.slice(u, c[0]), u = c[1];
      }), l += s.slice(u), l;
    }
  };
}
function ud(o) {
  for (var e = "", t = 0; t < o.length; ) {
    var n = o.indexOf("<!--", t);
    if (n === -1) {
      e += o.slice(t);
      break;
    }
    e += o.slice(t, n);
    var r = o.indexOf("-->", n);
    if (r === -1)
      break;
    t = r + 3;
  }
  return e;
}
function cd(o) {
  var e = o.split("");
  return e = e.filter(function(t) {
    var n = t.charCodeAt(0);
    return n === 127 ? !1 : n <= 31 ? n === 10 || n === 13 : !0;
  }), e.join("");
}
se.whiteList = Va();
se.getDefaultWhiteList = Va;
se.onTag = Xc;
se.onIgnoreTag = Zc;
se.onTagAttr = Jc;
se.onIgnoreTagAttr = qc;
se.safeAttrValue = _c;
se.escapeHtml = Ha;
se.escapeQuote = $a;
se.unescapeQuote = za;
se.escapeHtmlEntities = ja;
se.escapeDangerHtml5Entities = Wa;
se.clearNonPrintableCharacter = Ga;
se.friendlyAttrValue = Ya;
se.escapeAttrValue = Ka;
se.onIgnoreTagStripAll = sd;
se.StripTagBody = ld;
se.stripCommentTag = ud;
se.stripBlankChar = cd;
se.cssFilter = Ua;
se.getDefaultCSSWhiteList = Qc;
var Ro = {}, je = Yr;
function dd(o) {
  var e = je.spaceIndex(o);
  if (e === -1)
    var t = o.slice(1, -1);
  else
    var t = o.slice(1, e + 1);
  return t = je.trim(t).toLowerCase(), t.slice(0, 1) === "/" && (t = t.slice(1)), t.slice(-1) === "/" && (t = t.slice(0, -1)), t;
}
function pd(o) {
  return o.slice(0, 2) === "</";
}
function fd(o, e, t) {
  var n = "", r = 0, i = !1, a = !1, s = 0, l = o.length, u = "", c = "";
  e:
    for (s = 0; s < l; s++) {
      var d = o.charAt(s);
      if (i === !1) {
        if (d === "<") {
          i = s;
          continue;
        }
      } else if (a === !1) {
        if (d === "<") {
          n += t(o.slice(r, s)), i = s, r = s;
          continue;
        }
        if (d === ">") {
          n += t(o.slice(r, i)), c = o.slice(i, s + 1), u = dd(c), n += e(i, n.length, u, c, pd(c)), r = s + 1, i = !1;
          continue;
        }
        if (d === '"' || d === "'")
          for (var p = 1, f = o.charAt(s - p); f.trim() === "" || f === "="; ) {
            if (f === "=") {
              a = d;
              continue e;
            }
            f = o.charAt(s - ++p);
          }
      } else if (d === a) {
        a = !1;
        continue;
      }
    }
  return r < o.length && (n += t(o.substr(r))), n;
}
var md = /[^a-zA-Z0-9_:\.\-]/gim;
function vd(o, e) {
  var t = 0, n = [], r = !1, i = o.length;
  function a(d, p) {
    if (d = je.trim(d), d = d.replace(md, "").toLowerCase(), !(d.length < 1)) {
      var f = e(d, p || "");
      f && n.push(f);
    }
  }
  for (var s = 0; s < i; s++) {
    var l = o.charAt(s), u, c;
    if (r === !1 && l === "=") {
      r = o.slice(t, s), t = s + 1;
      continue;
    }
    if (r !== !1 && s === t && (l === '"' || l === "'") && o.charAt(s - 1) === "=") {
      if (c = o.indexOf(l, s + 1), c === -1)
        break;
      u = je.trim(o.slice(t + 1, c)), a(r, u), r = !1, s = c, t = s + 1;
      continue;
    }
    if (/\s|\n|\t/.test(l))
      if (o = o.replace(/\s|\n|\t/g, " "), r === !1)
        if (c = hd(o, s), c === -1) {
          u = je.trim(o.slice(t, s)), a(u), r = !1, t = s + 1;
          continue;
        } else {
          s = c - 1;
          continue;
        }
      else if (c = gd(o, s - 1), c === -1) {
        u = je.trim(o.slice(t, s)), u = Ii(u), a(r, u), r = !1, t = s + 1;
        continue;
      } else
        continue;
  }
  return t < o.length && (r === !1 ? a(o.slice(t)) : a(r, Ii(je.trim(o.slice(t))))), je.trim(n.join(" "));
}
function hd(o, e) {
  for (; e < o.length; e++) {
    var t = o[e];
    if (t !== " ")
      return t === "=" ? e : -1;
  }
}
function gd(o, e) {
  for (; e > 0; e--) {
    var t = o[e];
    if (t !== " ")
      return t === "=" ? e : -1;
  }
}
function Ad(o) {
  return o[0] === '"' && o[o.length - 1] === '"' || o[0] === "'" && o[o.length - 1] === "'";
}
function Ii(o) {
  return Ad(o) ? o.substr(1, o.length - 2) : o;
}
Ro.parseTag = fd;
Ro.parseAttr = vd;
var yd = Gr.FilterCSS, Ce = se, Qa = Ro, bd = Qa.parseTag, Sd = Qa.parseAttr, yo = Yr;
function Hn(o) {
  return o == null;
}
function wd(o) {
  var e = yo.spaceIndex(o);
  if (e === -1)
    return {
      html: "",
      closing: o[o.length - 2] === "/"
    };
  o = yo.trim(o.slice(e + 1, -1));
  var t = o[o.length - 1] === "/";
  return t && (o = yo.trim(o.slice(0, -1))), {
    html: o,
    closing: t
  };
}
function Td(o) {
  var e = {};
  for (var t in o)
    e[t] = o[t];
  return e;
}
function Xa(o) {
  o = Td(o || {}), o.stripIgnoreTag && (o.onIgnoreTag && console.error('Notes: cannot use these two options "stripIgnoreTag" and "onIgnoreTag" at the same time'), o.onIgnoreTag = Ce.onIgnoreTagStripAll), o.whiteList = o.whiteList || o.allowList || Ce.whiteList, o.onTag = o.onTag || Ce.onTag, o.onTagAttr = o.onTagAttr || Ce.onTagAttr, o.onIgnoreTag = o.onIgnoreTag || Ce.onIgnoreTag, o.onIgnoreTagAttr = o.onIgnoreTagAttr || Ce.onIgnoreTagAttr, o.safeAttrValue = o.safeAttrValue || Ce.safeAttrValue, o.escapeHtml = o.escapeHtml || Ce.escapeHtml, this.options = o, o.css === !1 ? this.cssFilter = !1 : (o.css = o.css || {}, this.cssFilter = new yd(o.css));
}
Xa.prototype.process = function(o) {
  if (o = o || "", o = o.toString(), !o)
    return "";
  var e = this, t = e.options, n = t.whiteList, r = t.onTag, i = t.onIgnoreTag, a = t.onTagAttr, s = t.onIgnoreTagAttr, l = t.safeAttrValue, u = t.escapeHtml, c = e.cssFilter;
  t.stripBlankChar && (o = Ce.stripBlankChar(o)), t.allowCommentTag || (o = Ce.stripCommentTag(o));
  var d = !1;
  if (t.stripIgnoreTagBody) {
    var d = Ce.StripTagBody(t.stripIgnoreTagBody, i);
    i = d.onIgnoreTag;
  }
  var p = bd(o, function(f, m, h, v, g) {
    var b = {
      sourcePosition: f,
      position: m,
      isClosing: g,
      isWhite: n.hasOwnProperty(h)
    }, y = r(h, v, b);
    if (!Hn(y))
      return y;
    if (b.isWhite) {
      if (b.isClosing)
        return "</" + h + ">";
      var S = wd(v), I = n[h], k = Sd(S.html, function(L, V) {
        var Y = yo.indexOf(I, L) !== -1, X = a(h, L, V, Y);
        if (!Hn(X))
          return X;
        if (Y)
          return V = l(h, L, V, c), V ? L + '="' + V + '"' : L;
        var X = s(h, L, V, Y);
        return Hn(X) ? void 0 : X;
      }), v = "<" + h;
      return k && (v += " " + k), S.closing && (v += " /"), v += ">", v;
    } else {
      var y = i(h, v, b);
      return Hn(y) ? u(v) : y;
    }
  }, u);
  return d && (p = d.remove(p)), p;
};
var Cd = Xa;
(function(o, e) {
  var t = se, n = Ro, r = Cd;
  function i(l, u) {
    var c = new r(u);
    return c.process(l);
  }
  e = o.exports = i, e.filterXSS = i, e.FilterXSS = r;
  for (var a in t)
    e[a] = t[a];
  for (var a in n)
    e[a] = n[a];
  typeof window < "u" && (window.filterXSS = o.exports);
  function s() {
    return typeof self < "u" && typeof DedicatedWorkerGlobalScope < "u" && self instanceof DedicatedWorkerGlobalScope;
  }
  s() && (self.filterXSS = o.exports);
})(Sr, Sr.exports);
var Io = Sr.exports, Id = function() {
  return typeof window > "u" ? global : window;
}, we = {
  enableAttrs: !0,
  enableHtml: !0,
  enableUrl: !0,
  html: {
    whiteList: {
      a: ["class", "style", "contenteditable", "data-id", "data-title", "data-size", "data-last-modified", "href"],
      address: ["class", "style"],
      area: ["class", "style"],
      article: ["class", "style"],
      aside: ["class", "style"],
      audio: ["class", "style"],
      b: ["class", "style"],
      bdi: ["class", "style"],
      bdo: ["class", "style"],
      big: ["class", "style"],
      blockquote: ["class", "style"],
      br: ["class", "style"],
      caption: ["class", "style"],
      center: ["class", "style"],
      cite: ["class", "style"],
      code: ["class", "style"],
      col: ["class", "style"],
      colgroup: ["class", "style"],
      dd: ["class", "style"],
      del: ["class", "style"],
      details: ["class", "style"],
      div: ["class", "style", "spellcheck", "data-gramm", "spellcheck", "data-mode", "data-position", "data-row", "data-cell", "data-rowspan", "data-colspan", "data-cell-bg", "data-parent-bg"],
      dl: ["class", "style"],
      dt: ["class", "style"],
      em: ["class", "style"],
      figcaption: ["class", "style"],
      figure: ["class", "style"],
      font: ["class", "style"],
      footer: ["class", "style"],
      h1: ["class", "style"],
      h2: ["class", "style"],
      h3: ["class", "style"],
      h4: ["class", "style"],
      h5: ["class", "style"],
      h6: ["class", "style"],
      header: ["class", "style"],
      hr: ["class", "style"],
      i: ["class", "style", "data-image-id", "data-image"],
      img: ["class", "style", "devui-editorx-image", "style", "data-image-id", "src"],
      input: ["class", "style", "data-formula", "data-link", "data-video"],
      ins: ["class", "style"],
      li: ["class", "style"],
      mark: ["class", "style"],
      nav: ["class", "style"],
      ol: ["class", "style"],
      p: ["class", "style"],
      pre: ["class", "style"],
      s: ["class", "style"],
      section: ["class", "style"],
      small: ["class", "style"],
      span: ["class", "style", "contenteditable", "color", "style"],
      sub: ["class", "style"],
      summary: ["class", "style"],
      sup: ["class", "style"],
      strong: ["class", "style"],
      strike: ["class", "style"],
      svg: ["class", "style", "t", "viewBox", "version", "xmlns", "p-id", "xmlns:xlink"],
      path: ["d", "p-id"],
      table: ["class", "style"],
      tbody: ["class", "style"],
      td: ["class", "style", "data-row", "data-cell", "data-cell-bg", "data-parent-bg"],
      tfoot: ["class", "style"],
      th: ["class", "style"],
      thead: ["class", "style"],
      tr: ["class", "style", "data-row"],
      tt: ["class", "style"],
      u: ["class", "style"],
      ul: ["class", "style"],
      video: ["class", "style"]
    }
  }
}, kd = Io.getDefaultWhiteList && Io.getDefaultWhiteList() || {};
we.html.whiteList = Object.assign(kd, we.html.whiteList);
var Za = new Io.FilterXSS(we.html), Ja = function() {
  return we;
}, qa = function(e) {
  var t, n;
  !((t = e == null ? void 0 : e.html) === null || t === void 0) && t.whiteList && (n = Object.assign(we.html.whiteList, e.html.whiteList)), we = Object.assign(we, e), n && (we.html.whiteList = n), Za = new Io.FilterXSS(we.html);
}, Kr = function(e) {
  return !we.enableHtml || typeof e != "string" ? e : Za.process(e);
}, _a = function(e) {
  Kr = e;
}, Qr = function(e) {
  return !we.enableAttrs || typeof e != "string" ? e : e.replace(/<.*?>/gi, "").replace(/on[a-z]+=/gi, "");
}, es = function(e) {
  Qr = e;
}, Xr = function(e) {
  if (!we.enableUrl || typeof e != "string")
    return e;
  var t = e.replace(/&#(\w+)(^\w|;)?/g, function(r, i) {
    return String.fromCharCode(i);
  }).trim();
  if (!t)
    return "";
  if ([".", "/"].includes(t[0]))
    return t;
  var n = t.match(/^([^:]+):/gm);
  return n && /^([^\w]*)(javascript|data|vbscript)/im.test(n[0]) ? "" : t;
}, ts = function(e) {
  Xr = e;
}, Ed = {
  getXssOption: Ja,
  setXssOption: qa,
  filterHtml: Kr,
  setFilterHtml: _a,
  filterAttrs: Qr,
  setFilterAttrs: es,
  filterUrl: Xr,
  setFilterUrl: ts
}, Ae = Object.freeze({
  __proto__: null,
  getXssOption: Ja,
  setXssOption: qa,
  get filterHtml() {
    return Kr;
  },
  setFilterHtml: _a,
  get filterAttrs() {
    return Qr;
  },
  setFilterAttrs: es,
  get filterUrl() {
    return Xr;
  },
  setFilterUrl: ts,
  default: Ed
}), ko = {
  logger: Id().console
}, Dd = ["state"], Bd = function(e, t, n) {
  var r = t.computed, i = t.reactive, a = n.designConfig, s = i({
    isOverstep: !1,
    valueRef: r(function() {
      return l.computedValueRef();
    }),
    content: r(function() {
      return l.computedContent();
    }),
    href: r(function() {
      return Ae.filterUrl(e.href);
    }),
    transform: r(function() {
      return l.computedTransform();
    })
  }), l = {
    state: s,
    computedValueRef: Nc({
      props: e
    }),
    computedContent: Lc({
      props: e,
      state: s
    }),
    computedTransform: Fc({
      props: e,
      designConfig: a
    })
  };
  return l;
};
const xd = B({
  props: [...Q, "isDot", "isFixed", "isMini", "hidden", "max", "type", "value", "modelValue", "href", "target"],
  setup(o, e) {
    return z({ props: o, context: e, renderless: Bd, api: Dd });
  }
}), Pd = { class: "tiny-mobile-badge" }, Md = { key: 0 }, Od = ["href", "target"];
function Ld(o, e, t, n, r, i) {
  return A(), w("div", Pd, [
    F(o.$slots, "default"),
    !o.hidden && (o.value > 0 || o.isDot) ? (A(), w(
      "div",
      {
        key: 0,
        class: P(["tiny-mobile-badge__content", [
          {
            "is-dot": o.isDot,
            "is-fixed": o.isFixed,
            "is-mini": o.isMini
          },
          o.value < 10 ? "is-circle" : "",
          o.type ? "tiny-mobile-badge--" + o.type : ""
        ]])
      },
      [
        o.isDot ? x("v-if", !0) : (A(), w("span", Md, [
          F(o.$slots, "content", {}, () => [
            T("a", {
              href: o.state.href,
              target: o.target,
              rel: "noopener noreferrer",
              class: "tiny-mobile-badge__link"
            }, M(o.state.content), 9, Od)
          ])
        ]))
      ],
      2
      /* CLASS */
    )) : x("v-if", !0)
  ]);
}
const $n = /* @__PURE__ */ W(xd, [["render", Ld]]);
var Nd = function(e) {
  var t, n = (typeof process > "u" ? "undefined" : R(process)) === "object" ? (t = process.env) === null || t === void 0 ? void 0 : t.TINY_MODE : null;
  return $n;
}, Fd = C(C({}, j), {}, {
  showLeft: {
    type: Boolean,
    default: !1
  },
  isDot: {
    type: Boolean,
    default: !1
  },
  isFixed: {
    type: Boolean,
    default: !0
  },
  isMini: {
    type: Boolean,
    default: !1
  },
  max: Number,
  value: [String, Number],
  modelValue: [String, Number],
  href: String,
  target: String,
  hidden: {
    type: Boolean,
    default: !1
  },
  type: {
    type: String,
    validator: function(e) {
      return !!~["primary", "success", "warning", "info", "danger", "icon", "label"].indexOf(e);
    }
  },
  badgeClass: String,
  offset: {
    type: Array,
    default: function() {
      return [0, 0];
    }
  },
  data: [String, Number]
});
const Xe = B({
  name: O + "Badge",
  props: Fd,
  setup: function(e, t) {
    return K({
      props: e,
      context: t,
      template: Nd
    });
  }
}), Rd = "3.20.0";
Xe.model = {
  prop: "modelValue",
  event: "update:modelValue"
};
Xe.install = function(o) {
  o.component(Xe.name, Xe);
};
Xe.version = Rd;
var Vd = function(e) {
  var t = e.emit, n = e.props, r = e.state, i = e.designConfig;
  return function(a) {
    var s = Ae.filterUrl(n.href), l = 1e3, u = l;
    if (n.resetTime !== l)
      u = n.resetTime;
    else {
      var c, d;
      u = (c = i == null || (d = i.props) === null || d === void 0 ? void 0 : d.resetTime) !== null && c !== void 0 ? c : n.resetTime;
    }
    s ? location.href = s : n.nativeType === "button" && u > 0 && (r.disabled = !0, r.timer = window.setTimeout(function() {
      r.disabled = !1;
    }, u)), t("click", a);
  };
}, Ud = function(e) {
  return function() {
    return clearTimeout(e.timer);
  };
}, Hd = ["state", "handleClick"], $d = function(e, t, n) {
  var r = t.computed, i = t.onBeforeUnmount, a = t.reactive, s = t.watch, l = t.inject, u = n.emit, c = n.parent, d = n.designConfig;
  c.tinyForm = c.tinyForm || l("form", null);
  var p = a({
    timer: 0,
    disabled: e.disabled,
    plain: r(function() {
      return e.plain || (c.buttonGroup || {}).plain;
    }),
    round: r(function() {
      var m, h, v;
      return (m = (h = e.round) !== null && h !== void 0 ? h : d == null || (v = d.props) === null || v === void 0 ? void 0 : v.round) !== null && m !== void 0 ? m : !1;
    }),
    formDisabled: r(function() {
      return (c.tinyForm || {}).disabled;
    }),
    buttonDisabled: r(function() {
      return e.disabled || p.disabled || (c.buttonGroup || {}).disabled || p.formDisabled;
    })
  });
  s(function() {
    return e.disabled;
  }, function(m) {
    p.disabled = m;
  }, {
    immediate: !0
  });
  var f = {
    state: p,
    clearTimer: Ud(p),
    handleClick: Vd({
      emit: u,
      props: e,
      state: p,
      designConfig: d
    })
  };
  return i(f.clearTimer), f;
};
const zd = B({
  emits: ["click"],
  props: [...Q, "type", "text", "size", "icon", "resetTime", "nativeType", "loading", "disabled", "customClass"],
  components: {},
  setup(o, e) {
    return z({ props: o, context: e, renderless: $d, api: Hd });
  }
}), jd = ["disabled", "type"], Wd = /* @__PURE__ */ T(
  "div",
  { class: "tiny-mobile-button-loading-inner" },
  null,
  -1
  /* HOISTED */
), Gd = [
  Wd
];
function Yd(o, e, t, n, r, i) {
  return A(), w("button", Tn({
    class: ["tiny-mobile-button", [
      o.type ? "tiny-mobile-button--" + o.type : "",
      o.size ? "tiny-mobile-button--" + o.size : "",
      {
        "is-disabled": o.state.buttonDisabled,
        "is-loading": o.loading
      }
    ]],
    onClick: e[0] || (e[0] = (...a) => o.handleClick && o.handleClick(...a)),
    disabled: o.state.buttonDisabled || o.loading,
    type: o.nativeType
  }, o.a(o.$attrs, ["class", "style"], !0)), [
    o.loading ? (A(), w(
      "div",
      {
        key: 0,
        class: P([
          "tiny-mobile-button-loading",
          "tiny-mobile-button-loading-" + (o.type === "primary" ? "white" : "black")
        ])
      },
      Gd,
      2
      /* CLASS */
    )) : x("v-if", !0),
    o.icon && !o.loading ? (A(), G(pe(o.icon), {
      key: 1,
      class: P(["tiny-icon", "is-icon", o.text ? "small" : null])
    }, null, 8, ["class"])) : x("v-if", !0),
    F(o.$slots, "default", {}, () => [
      T(
        "span",
        {
          style: H({ marginLeft: o.text && (o.icon || o.loading) ? "4px" : 0 })
        },
        M(o.text),
        5
        /* TEXT, STYLE */
      )
    ])
  ], 16, jd);
}
const zn = /* @__PURE__ */ W(zd, [["render", Yd]]);
var Kd = function(e) {
  var t, n = (typeof process > "u" ? "undefined" : R(process)) === "object" ? (t = process.env) === null || t === void 0 ? void 0 : t.TINY_MODE : null;
  return zn;
}, Qd = C(C({}, j), {}, {
  /** 展示按钮不同的状态，设置为text则展示为文本按钮。可取值为：'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text'  */
  type: {
    type: String,
    default: "default"
  },
  /** 设置原生的tabindex属性 */
  tabindex: {
    type: String,
    default: "0"
  },
  /** 按钮左侧展示的图标，接收为Icon组件  */
  icon: {
    type: [Object, String],
    default: ""
  },
  /** 按钮显示的文本 */
  text: {
    type: String,
    default: ""
  },
  /** 设置按钮禁用时间，防止重复提交，单位毫秒 */
  resetTime: {
    type: Number,
    default: 1e3
  },
  /** 对应按钮原生 type 属性  */
  nativeType: {
    type: String,
    default: "button"
  },
  /** 当配置href后，点击按钮则更新 location.href 进行页面跳转  */
  href: {
    type: String,
    default: ""
  },
  /** 定义按钮尺寸 */
  size: {
    type: String,
    default: "",
    validator: function(e) {
      return ["large", "medium", "small", "mini", ""].includes(e);
    }
  },
  /** 是否圆角按钮 */
  round: {
    type: Boolean,
    default: void 0
  },
  /** 是否朴素按钮  */
  plain: Boolean,
  /** 是否圆形按钮  */
  circle: Boolean,
  /** 是否加载中状态 */
  loading: Boolean,
  /** 是否被禁用按钮 */
  disabled: Boolean,
  /** 是否默认聚焦 */
  autofocus: Boolean,
  /** 自定义类名， 仅 mobile-first 模板时有效 */
  customClass: {
    type: String,
    default: ""
  },
  /** 设置通栏按钮,宽度充满水平方向， 仅 mobile-first 模板时有效  */
  banner: {
    type: Boolean,
    default: !1
  },
  /** 是否幽灵按钮 */
  ghost: Boolean,
  /** 点击事件 */
  onClick: {
    type: Function
  }
});
const ye = B({
  name: O + "Button",
  inject: {
    buttonGroup: {
      default: ""
    }
  },
  props: Qd,
  slots: Object,
  setup: function(e, t) {
    return K({
      props: e,
      context: t,
      template: Kd
    });
  }
}), Xd = "3.20.0";
ye.install = function(o) {
  o.component(ye.name, ye);
};
ye.version = Xd;
var ns = Object.prototype.toString, hn = Object.prototype.hasOwnProperty, Zd = Object.getPrototypeOf, os = hn.toString, Jd = os.call(Object), qd = {
  "[object Error]": "error",
  "[object Object]": "object",
  "[object RegExp]": "regExp",
  "[object Date]": "date",
  "[object Array]": "array",
  "[object Function]": "function",
  "[object AsyncFunction]": "asyncFunction",
  "[object String]": "string",
  "[object Number]": "number",
  "[object Boolean]": "boolean"
}, ke = function(e) {
  return e == null;
}, Pe = function(e) {
  return ke(e) ? String(e) : qd[ns.call(e)] || "object";
}, Ee = function(e) {
  return Pe(e) === "object";
}, Ke = function(e) {
  if (!e || ns.call(e) !== "[object Object]")
    return !1;
  var t = Zd(e);
  if (!t)
    return !0;
  var n = hn.call(t, "constructor") && t.constructor;
  return typeof n == "function" && os.call(n) === Jd;
}, Tr = function(e) {
  var t = Pe(e);
  if (t === "object" || t === "array") {
    for (var n in e)
      if (hn.call(e, n))
        return !1;
  }
  return !0;
}, Te = function(e) {
  return typeof e == "number" && isFinite(e);
}, _d = function(e) {
  return Pe(e) === "date";
}, ep = function(e) {
  var t = e.state, n = e.props;
  return function() {
    Array.isArray(t.model) && !t.model.includes(n.label) ? t.model.push(n.label) : t.model = n.trueLabel || !0;
  };
}, tp = function(e) {
  var t = e.state, n = e.props;
  return function() {
    if (Array.isArray(t.model)) {
      var r = t.model.indexOf(n.label);
      r !== -1 && t.model.splice(r, 1);
    } else
      t.model = n.falseLabel !== void 0 && n.falseLabel;
  };
}, np = function(e) {
  var t = e.state, n = e.props, r = e.emit, i = e.nextTick, a = e.dispatch, s = e.constants;
  return function(l) {
    if (!t.isLimitExceeded) {
      var u, c = n.trueLabel, d = n.falseLabel;
      l.target.checked ? u = c === void 0 ? !0 : c : u = d === void 0 ? !1 : d, r("change", u, l), i(function() {
        t.isGroup && a(s.CHECKBOX_GROUP, "change", [t.checkboxGroup.modelValue]);
      });
    }
  };
}, op = function(e) {
  var t = e.state, n = e.props;
  return function() {
    var r = t.isGroup ? t.store : n.modelValue !== void 0 ? n.modelValue : t.selfModel;
    return ke(r) ? t.isGroup ? [] : "" : r;
  };
}, rp = function(e) {
  var t = e.state, n = e.dispatch, r = e.emit, i = e.constants;
  return function(a) {
    t.isGroup ? (t.isLimitExceeded = !1, t.checkboxGroup.min !== void 0 && a.length < t.checkboxGroup.min && (t.isLimitExceeded = !0), t.checkboxGroup.max !== void 0 && a.length > t.checkboxGroup.max && (t.isLimitExceeded = !0), t.isLimitExceeded === !1 && n(i.CHECKBOX_GROUP, "update:modelValue", [a])) : (r("update:modelValue", a), t.selfModel = a);
  };
}, ip = function(e) {
  var t = e.state, n = e.props;
  return function() {
    return typeof t.model == "boolean" ? t.model : Array.isArray(t.model) ? t.model.includes(n.label) : ke(t.model) ? !1 : t.model === n.trueLabel;
  };
}, ap = function(e) {
  var t = e.state, n = e.parent, r = e.constants;
  return function() {
    for (var i = n.$parent; i; )
      if (i.$options.componentName !== r.CHECKBOX_GROUP)
        i = i.$parent;
      else
        return t.checkboxGroup = i, !0;
    return !1;
  };
}, sp = function(e) {
  var t = e.state, n = e.props;
  return function() {
    return t.checkboxGroup ? t.checkboxGroup.modelValue : n.modelValue;
  };
}, lp = function(e) {
  return function() {
    var t = e.checkboxGroup, n = t.max, r = t.min;
    return !!(n || r) && e.model.length >= n && !e.isChecked || e.model.length <= r && e.isChecked;
  };
}, up = function(e) {
  var t = e.state, n = e.props;
  return function() {
    return (t.isGroup ? t.checkboxGroup.disabled || t.checkboxGroup.displayOnly || n.disabled || n.displayOnly || t.isLimitDisabled : n.disabled) || t.formDisabled;
  };
}, cp = function(e) {
  return function() {
    return (e.formItem || {}).formItemSize;
  };
}, dp = function(e) {
  var t = e.state, n = e.props, r = e.formItemSize;
  return function() {
    var i = n.size || r.value;
    return t.isGroup && t.checkboxGroup.state.checkboxGroupSize || i;
  };
}, pp = function(e) {
  var t = e.props, n = e.emit, r = e.api, i = e.parent;
  return function() {
    t.checked && r.addToStore(), t.indeterminate && i.$el.setAttribute("aria-controls", t.controls), n("complete", !0);
  };
}, ki = function(e) {
  var t = e.parent, n = e.props, r = e.type, i = t.$el;
  for (var a in n.events)
    i[r + "EventListener"](a, n.events[a]);
}, fp = function(e) {
  var t = e.state, n = e.props;
  return function() {
    return n.displayOnly || t.formDisplayOnly;
  };
}, mp = function(e) {
  var t = e.state;
  return function() {
    return t.isGroup && (t.checkboxGroup.displayOnly || t.formDisplayOnly);
  };
}, vp = function(e) {
  var t = e.state, n = e.props, r = e.t;
  return function() {
    return t.showLabel = !0, n.trueLabel !== void 0 && n.falseLabel !== void 0 ? n.modelValue : n.modelValue ? r("yes") : r("no");
  };
}, hp = function(e) {
  var t = e.props;
  return function() {
    return !ke(t.text) || !ke(t.label);
  };
}, gp = function(e) {
  var t = e.props;
  return function() {
    return t.text || !ke(t.text) ? t.text : t.label;
  };
}, Ap = ["state", "handleChange", "computedStore"], yp = function(e) {
  var t = e.reactive, n = e.computed, r = e.parent, i = e.api, a = e.inject, s = e.props, l = t({
    size: n(function() {
      return s.size || a("size", null) || (r.tinyForm || {}).size;
    }),
    vertical: a("vertical", null),
    iconPosition: s.iconPosition || a("iconPosition", "center"),
    focus: !1,
    selfModel: !1,
    showLabel: !1,
    isLimitExceeded: !1,
    checkboxGroup: null,
    store: n(function() {
      return i.computedStore();
    }),
    isGroup: n(function() {
      return i.computedIsGroup();
    }),
    isChecked: n(function() {
      return i.computedIsChecked();
    }),
    isDisabled: n(function() {
      return i.computedIsDisabled();
    }),
    checkboxSize: n(function() {
      return i.computedCheckboxSize();
    }),
    isLimitDisabled: n(function() {
      return i.computedIsLimitDisabled();
    }),
    formDisabled: n(function() {
      return (r.tinyForm || {}).disabled;
    }),
    formDisplayOnly: n(function() {
      return (r.tinyForm || {}).displayOnly;
    }),
    isDisplayOnly: n(function() {
      return i.computedIsDisplayOnly();
    }),
    isGroupDisplayOnly: n(function() {
      return i.computedIsGroupDisplayOnly();
    }),
    displayLabel: n(function() {
      return i.computedDisplayLabel();
    }),
    inputDisabled: n(function() {
      return l.isDisabled || l.isDisplayOnly || l.isGroupDisplayOnly;
    }),
    model: n({
      get: function() {
        return i.computedGetModelGet();
      },
      set: function(c) {
        return i.computedGetModelSet(c);
      }
    }),
    showText: n(function() {
      return i.computedShowText();
    }),
    isShowText: n(function() {
      return i.computedIsShowText();
    }),
    shape: a("shape", null) || s.shape
  });
  return l;
}, bp = function(e) {
  var t = e.api, n = e.state, r = e.dispatch, i = e.props, a = e.parent, s = e.constants, l = e.formItemSize, u = e.emit, c = e.nextTick, d = e.t;
  e.vm, Object.assign(t, {
    state: n,
    addToStore: ep({
      state: n,
      props: i
    }),
    removeFromStore: tp({
      state: n,
      props: i
    }),
    computedStore: sp({
      state: n,
      props: i
    }),
    computedFormItemSize: cp(i),
    computedIsChecked: ip({
      state: n,
      props: i
    }),
    computedIsLimitDisabled: lp(n),
    computedIsDisabled: up({
      state: n,
      props: i
    }),
    computedIsDisplayOnly: fp({
      state: n,
      props: i
    }),
    computedIsGroupDisplayOnly: mp({
      state: n
    }),
    computedGetModelGet: op({
      state: n,
      props: i
    }),
    computedIsGroup: ap({
      state: n,
      parent: a,
      constants: s
    }),
    computedCheckboxSize: dp({
      state: n,
      props: i,
      formItemSize: l
    }),
    computedGetModelSet: rp({
      state: n,
      dispatch: r,
      emit: u,
      constants: s
    }),
    mounted: pp({
      emit: u,
      props: i,
      api: t,
      parent: a
    }),
    handleChange: np({
      state: n,
      props: i,
      emit: u,
      nextTick: c,
      dispatch: r,
      constants: s
    }),
    computedDisplayLabel: vp({
      state: n,
      props: i,
      t: d
    }),
    computedIsShowText: hp({
      props: i
    }),
    computedShowText: gp({
      props: i
    })
  });
}, Sp = function(e, t, n) {
  var r = t.computed, i = t.onMounted, a = t.onBeforeUnmount, s = t.reactive, l = t.watch, u = t.inject, c = n.vm, d = n.parent, p = n.emit, f = n.constants, m = n.nextTick, h = n.dispatch, v = n.t, g = {
    dispatch: h
  }, b = r(function() {
    return g.computedFormItemSize();
  }), y = yp({
    reactive: s,
    computed: r,
    parent: d,
    api: g,
    inject: u,
    props: e
  });
  return d.tinyForm = d.tinyForm || u("form", null), bp({
    api: g,
    state: y,
    dispatch: h,
    props: e,
    parent: d,
    constants: f,
    formItemSize: b,
    emit: p,
    nextTick: m,
    t: v,
    vm: c
  }), l(function() {
    return e.modelValue;
  }, function(S) {
    return e.validateEvent && g.dispatch(f.FORM_ITEM, f.FORM_CHANGE, S);
  }), l(function() {
    return e.checked;
  }, function(S) {
    S ? g.addToStore() : g.removeFromStore();
  }), a(function() {
    ki({
      parent: d,
      props: e,
      type: "remove"
    });
  }), i(function() {
    h("Tooltip", "tooltip-update"), ki({
      parent: d,
      props: e,
      type: "add"
    }), g.mounted();
  }), g;
};
const wp = B({
  props: [
    ...Q,
    "modelValue",
    "text",
    "events",
    "label",
    "indeterminate",
    "disabled",
    "checked",
    "name",
    "trueLabel",
    "falseLabel",
    "id",
    "iconPosition"
  ],
  emits: ["update:modelValue", "change", "complete", "click"],
  setup(o, e) {
    return z({ props: o, context: e, renderless: Sp, api: Ap });
  }
}), Tp = ["id"], Cp = ["tabindex", "role", "aria-checked"], Ip = /* @__PURE__ */ T(
  "span",
  { class: "tiny-mobile-checkbox__inner" },
  null,
  -1
  /* HOISTED */
), kp = ["aria-hidden", "name", "disabled", "true-value", "false-value"], Ep = ["aria-hidden", "disabled", "value", "name"], Dp = {
  key: 0,
  class: "tiny-mobile-checkbox__label"
};
function Bp(o, e, t, n, r, i) {
  return A(), w("label", {
    class: P(["tiny-mobile-checkbox", {
      "is-disabled": o.state.isDisabled,
      "is-checked": o.state.isChecked,
      "is-indeterminate": o.indeterminate,
      "is-focus": o.state.focus,
      "icon-position-top": o.state.iconPosition === "top"
    }]),
    id: o.id
  }, [
    T("span", {
      class: "tiny-mobile-checkbox__input",
      tabindex: o.indeterminate ? 0 : !1,
      role: o.indeterminate ? "checkbox" : !1,
      "aria-checked": o.indeterminate ? "mixed" : !1
    }, [
      Ip,
      o.trueLabel || o.falseLabel ? oe((A(), w("input", {
        key: 0,
        class: "tiny-mobile-checkbox__original",
        type: "checkbox",
        "aria-hidden": o.indeterminate ? "true" : "false",
        name: o.name,
        disabled: o.state.isDisabled,
        "true-value": o.trueLabel,
        "false-value": o.falseLabel,
        "onUpdate:modelValue": e[0] || (e[0] = (a) => o.state.model = a),
        onChange: e[1] || (e[1] = te((...a) => o.handleChange && o.handleChange(...a), ["stop"])),
        onFocus: e[2] || (e[2] = (a) => o.state.focus = !0),
        onBlur: e[3] || (e[3] = (a) => o.state.focus = !1)
      }, null, 40, kp)), [
        [li, o.state.model]
      ]) : oe((A(), w("input", {
        key: 1,
        class: "tiny-mobile-checkbox__original",
        type: "checkbox",
        "aria-hidden": o.indeterminate ? "true" : "false",
        disabled: o.state.isDisabled,
        value: o.label,
        name: o.name,
        "onUpdate:modelValue": e[4] || (e[4] = (a) => o.state.model = a),
        onChange: e[5] || (e[5] = te((...a) => o.handleChange && o.handleChange(...a), ["stop"])),
        onFocus: e[6] || (e[6] = (a) => o.state.focus = !0),
        onBlur: e[7] || (e[7] = (a) => o.state.focus = !1)
      }, null, 40, Ep)), [
        [li, o.state.model]
      ])
    ], 8, Cp),
    o.slots.default && o.slots.default() || o.state.isShowText ? (A(), w("span", Dp, [
      F(o.$slots, "default", {}, () => [
        ue(
          M(o.state.showText),
          1
          /* TEXT */
        )
      ])
    ])) : x("v-if", !0)
  ], 10, Tp);
}
const jn = /* @__PURE__ */ W(wp, [["render", Bp]]);
var xp = function(e) {
  var t, n = (typeof process > "u" ? "undefined" : R(process)) === "object" ? (t = process.env) === null || t === void 0 ? void 0 : t.TINY_MODE : null;
  return jn;
}, Pp = {
  FORM_ITEM: "FormItem",
  FORM_CHANGE: "form.change",
  CHECKBOX: O + "Checkbox",
  CHECKBOX_GROUP: "CheckboxGroup"
}, Mp = C(C({}, j), {}, {
  _constants: {
    type: Object,
    default: function() {
      return Pp;
    }
  },
  modelValue: {
    type: [String, Number, Boolean],
    // Tiny新增，因为类型有Boolean类型，所以默认值需要显示设置成 undefined 才可以保持逻辑正确
    default: void 0
  },
  label: {
    type: [String, Number, Boolean],
    default: ""
  },
  indeterminate: Boolean,
  disabled: Boolean,
  checked: Boolean,
  name: String,
  trueLabel: [String, Number],
  falseLabel: [String, Number],
  /*
   * 当indeterminate为真时，为controls提供相关连的checkbox的id，表明元素间的控制关系
   */
  id: String,
  /*
   * 当indeterminate为真时，为controls提供相关连的checkbox的id，表明元素间的控制关系
   */
  controls: {
    type: String,
    default: ""
  },
  border: Boolean,
  size: String,
  text: String,
  customClass: [String, Object, Array],
  validateEvent: {
    type: Boolean,
    default: !0
  },
  events: {
    type: Object,
    default: function() {
      return {};
    }
  },
  displayOnly: {
    type: Boolean,
    default: !1
  },
  iconPosition: String,
  shape: {
    type: String,
    default: ""
  },
  tabindex: {
    type: String,
    default: "0"
  }
});
const Re = B({
  name: O + "Checkbox",
  props: Mp,
  setup: function(e, t) {
    return K({
      props: e,
      context: t,
      template: xp
    });
  }
}), Op = "3.20.0";
Re.model = {
  prop: "modelValue",
  event: "update:modelValue"
};
Re.install = function(o) {
  o.component(Re.name, Re);
};
Re.version = Op;
var Lp = function(e) {
  return function() {
    return (e.formItem || {}).formItemSize;
  };
}, Np = function(e) {
  var t = e.props, n = e.formItemSize;
  return function() {
    return t.size || n.value;
  };
}, Fp = ["state"], Rp = function(e, t, n) {
  var r = t.computed, i = t.reactive, a = t.watch, s = t.provide, l = n.dispatch, u = n.constants, c = {
    computedFormItemSize: Lp(e)
  }, d = r(function() {
    return c.computedFormItemSize();
  }), p = i({
    checkboxGroupSize: r(function() {
      return c.computedCheckboxGroupSize();
    })
  });
  return Object.assign(c, {
    state: p,
    computedCheckboxGroupSize: Np({
      props: e,
      formItemSize: d
    })
  }), a(function() {
    return e.modelValue;
  }, function(f) {
    return l(u.FORM_ITEM, u.FORM_CHANGE, [f]);
  }), s("size", e.size), s("vertical", e.vertical), s("iconPosition", e.iconPosition), s("shape", e.shape), c;
};
const Vp = /* @__PURE__ */ B({
  components: {
    Checkbox: Re
  },
  props: [...Q, "modelValue", "type", "options", "disabled", "vertical", "max", "min", "iconPosition"],
  setup(o, e) {
    return z({
      props: o,
      context: e,
      renderless: Rp,
      api: Fp
    });
  }
});
function Up(o, e, t, n, r, i) {
  const a = $("checkbox");
  return A(), w(
    "div",
    {
      class: P(["tiny-mobile-checkbox-group", o.vertical ? "is-vertical" : ""]),
      role: "group",
      "aria-label": "checkbox-group"
    },
    [
      F(o.$slots, "default", {}, () => [
        o.type === "checkbox" ? (A(!0), w(
          q,
          { key: 0 },
          ae(o.options, (s, l) => (A(), G(
            a,
            Tn({ key: l }, s),
            null,
            16
            /* FULL_PROPS */
          ))),
          128
          /* KEYED_FRAGMENT */
        )) : x("v-if", !0)
      ])
    ],
    2
    /* CLASS */
  );
}
const Wn = /* @__PURE__ */ W(Vp, [["render", Up]]);
var Hp = function(e) {
  var t, n = (typeof process > "u" ? "undefined" : R(process)) === "object" ? (t = process.env) === null || t === void 0 ? void 0 : t.TINY_MODE : null;
  return Wn;
}, $p = {
  FORM_ITEM: "FormItem",
  FORM_CHANGE: "form.change"
};
const Ze = B({
  name: O + "CheckboxGroup",
  componentName: "CheckboxGroup",
  emits: ["change", "update:modelValue"],
  props: C(C({}, j), {}, {
    _constants: {
      type: Object,
      default: function() {
        return $p;
      }
    },
    modelValue: {},
    disabled: Boolean,
    min: Number,
    max: Number,
    size: String,
    fill: String,
    textColor: String,
    vertical: Boolean,
    options: {
      type: Array,
      default: function() {
        return [];
      }
    },
    type: {
      type: String,
      default: "checkbox"
    },
    displayOnly: {
      type: Boolean,
      default: !1
    },
    iconPosition: String,
    shape: {
      type: String,
      default: ""
    }
  }),
  setup: function(e, t) {
    return K({
      props: e,
      context: t,
      template: Hp
    });
  }
}), zp = "3.20.0";
Ze.model = {
  prop: "modelValue",
  event: "update:modelValue"
};
Ze.install = function(o) {
  o.component(Ze.name, Ze);
};
Ze.version = zp;
var rs = function(e, t) {
  t("update:modelValue", e);
}, jp = function(e) {
  return function(t) {
    e.value = t;
  };
}, Wp = function(e, t, n, r) {
  var i = function(l) {
    r.fromString(l), rs(l, t), t("confirm", l), n(!1);
  }, a = function() {
    n(!1), t("cancel");
  };
  return {
    onConfirm: i,
    onCancel: a
  };
}, Ei = {
  10: "A",
  11: "B",
  12: "C",
  13: "D",
  14: "E",
  15: "F"
}, Yo = {
  A: 10,
  B: 11,
  C: 12,
  D: 13,
  E: 14,
  F: 15
}, St = function(e) {
  return e.length === 2 ? (Yo[e[0].toUpperCase()] || +e[0]) * 16 + (Yo[e[1].toUpperCase()] || +e[1]) : Yo[e[1].toUpperCase()] || +e[1];
}, Di = function(e) {
  var t = e.hue, n = e.sat, r = e.val, i = (2 - n) * r;
  return [t, n * r / (i < 1 ? i : 2 - i) || 0, i / 2];
}, is = function(e) {
  return typeof e == "string";
}, Gp = function(e) {
  return is(e) && e.includes(".") && Number.parseFloat(e) === 1;
}, Yp = function(e) {
  return is(e) && e.includes("%");
}, en = function(e, t) {
  Gp(e) && (e = "100%");
  var n = Yp(e);
  return e = Math.min(t, Math.max(0, Number.parseFloat("".concat(e)))), n && (e = Number.parseInt("".concat(e * t), 10) / 100), Math.abs(e - t) < 1e-6 ? 1 : e % t / Number.parseFloat(t);
}, bo = function(e) {
  e = Math.min(Math.round(e), 255);
  var t = Math.floor(e / 16), n = e % 16;
  return "".concat(Ei[t] || t).concat(Ei[n] || n);
}, Bi = function(e) {
  var t = e.r, n = e.g, r = e.b;
  return Number.isNaN(+t) || Number.isNaN(+n) || Number.isNaN(+r) ? "" : "#".concat(bo(t)).concat(bo(n)).concat(bo(r));
}, Kp = function(e) {
  var t = e.hue, n = e.sat, r = e.light;
  n = n / 100, r = r / 100;
  var i = n, a = Math.max(r, 0.01);
  r *= 2, n *= r <= 1 ? r : 2 - r, i *= a <= 1 ? a : 2 - a;
  var s = (r + n) / 2, l = r === 0 ? 2 * i / (a + i) : 2 * n / (r + n);
  return {
    h: t,
    s: l * 100,
    v: s * 100
  };
}, xi = function(e) {
  var t = e.r, n = e.g, r = e.b;
  t = en(t, 255), n = en(n, 255), r = en(r, 255);
  var i = Math.max(t, n, r), a = Math.min(t, n, r), s, l = i, u = i - a, c = i === 0 ? 0 : u / i;
  if (i === a)
    s = 0;
  else {
    switch (i) {
      case t: {
        s = (n - r) / u + (n < r ? 6 : 0);
        break;
      }
      case n: {
        s = (r - t) / u + 2;
        break;
      }
      case r: {
        s = (t - n) / u + 4;
        break;
      }
    }
    s /= 6;
  }
  return {
    h: s * 360,
    s: c * 100,
    v: l * 100
  };
}, Qt = function(e) {
  var t = e.h, n = e.s, r = e.v;
  t = en(t, 360) * 6, n = en(n, 100), r = en(r, 100);
  var i = Math.floor(t), a = t - i, s = r * (1 - n), l = r * (1 - a * n), u = r * (1 - (1 - a) * n), c = i % 6, d = [r, l, s, s, u, r][c], p = [u, r, r, l, s, s][c], f = [s, s, u, r, r, l][c];
  return {
    r: Math.round(d * 255),
    g: Math.round(p * 255),
    b: Math.round(f * 255)
  };
}, Qp = /* @__PURE__ */ function() {
  function o(e) {
    xn(this, o), this._hue = 0, this._sat = 100, this._value = 100, this._alpha = 100, this.enableAlpha = !1, this.format = "hex", this.value = "";
    for (var t in e)
      t in e && (this[t] = e[t]);
    e.value ? this.fromString(e.value) : this.onChange();
  }
  return Pn(o, [{
    key: "get",
    value: function(t) {
      return t === "alpha" ? Math.floor(this._alpha) : this["_".concat(t)];
    }
  }, {
    key: "set",
    value: function(t, n) {
      if (arguments.length === 1 && R(t) === "object") {
        for (var r in t)
          Object.hasOwn(t, r) && this.set(r, t[r]);
        return;
      }
      this["_".concat(t)] = n, this.onChange();
    }
  }, {
    key: "compare",
    value: function(t) {
      return Math.abs(t._hue - this._hue) < 2 && Math.abs(t._sat - this._sat) < 1 && Math.abs(t._value - this._value) < 1 && Math.abs(t._alpha - this._alpha) < 1;
    }
  }, {
    key: "isHSL",
    value: function(t) {
      return t.includes("hsl");
    }
  }, {
    key: "isHsv",
    value: function(t) {
      return t.includes("hsv");
    }
  }, {
    key: "isRgb",
    value: function(t) {
      return t.includes("rgb");
    }
  }, {
    key: "isHex",
    value: function(t) {
      return t.includes("#");
    }
  }, {
    key: "splitPart",
    value: function(t, n) {
      return t.replace(n, "").split(/\s|,/g).filter(function(r) {
        return r;
      }).map(function(r, i) {
        return i > 2 ? Number.parseFloat(r) : Number.parseInt(r, 10);
      });
    }
  }, {
    key: "onHsv",
    value: function(t) {
      var n = this.splitPart(t, /hsva|hsv|\(|\)/gm);
      n.length === 4 ? this._alpha = Number.parseFloat(String(n[3])) * 100 : this._alpha = 100, n.length >= 3 && this.fromHSV({
        h: n[0],
        s: n[1],
        v: n[2]
      });
    }
  }, {
    key: "onRgb",
    value: function(t) {
      var n = /rgba|rgb|\(|\)/gm, r = this.splitPart(t, n);
      if (r.length === 4 ? this._alpha = Number.parseFloat(String(r[3])) * 100 : this._alpha = 100, r.length >= 3) {
        var i = xi({
          r: r[0],
          g: r[1],
          b: r[2]
        }), a = i.h, s = i.s, l = i.v;
        this.fromHSV({
          h: a,
          s,
          v: l
        });
      }
    }
  }, {
    key: "onHex",
    value: function(t) {
      var n = t.replace("#", "").trim(), r = function(f) {
        return /^[0-9a-fA-F]{3}$|^[0-9a-fA-F]{6}$|^[0-9a-fA-F]{8}$/.test(f);
      };
      if (r(n)) {
        var i = 0, a = 0, s = 0;
        n.length === 3 ? (i = St(n[0] + n[0]), a = St(n[1] + n[1]), s = St(n[2] + n[2])) : (n.length === 6 || n.length === 8) && (i = St(n.slice(0, 2)), a = St(n.slice(2, 4)), s = St(n.slice(4, 6))), n.length === 8 ? this._alpha = St(n.slice(6)) / 255 * 100 : (n.length === 3 || n.length === 6) && (this._alpha = 100);
        var l = xi({
          r: i,
          g: a,
          b: s
        }), u = l.h, c = l.s, d = l.v;
        this.fromHSV({
          h: u,
          s: c,
          v: d
        });
      }
    }
  }, {
    key: "onHsl",
    value: function(t) {
      var n = t.replace(/hsla|hsl\(|\)gm/, "").split(/\s|,/g).filter(function(l) {
        return l;
      }).map(function(l, u) {
        return u > 2 ? Number.parseFloat(l) : Number.parseInt(l, 10);
      });
      if (n.length === 4 ? this._alpha = Number.parseFloat(String(n[3])) * 100 : this._alpha = 100, parent.length >= 3) {
        var r = Kp({
          hue: n[0],
          sat: n[1],
          light: n[2]
        }), i = r.h, a = r.s, s = r.v;
        this.fromHSV({
          h: i,
          s: a,
          v: s
        });
      }
    }
    /**
     * @effect 会修改 this._hue, this._sat, this._value
     */
  }, {
    key: "fromHSV",
    value: function(t) {
      var n = t.h, r = t.s, i = t.v;
      this._hue = Math.max(0, Math.min(360, n)), this._sat = Math.max(0, Math.min(100, r)), this._value = Math.max(0, Math.min(100, i)), this.onChange();
    }
  }, {
    key: "fromString",
    value: function(t) {
      if (!t) {
        this._hue = 0, this._sat = 0, this._value = 0, this.onChange();
        return;
      }
      this.isHSL(t) && this.onHsl(t), this.isHsv(t) && this.onHsv(t), this.isRgb(t) && this.onRgb(t), this.isHex(t) && this.onHex(t);
    }
  }, {
    key: "toRgb",
    value: function() {
      return Qt({
        h: this._hue,
        s: this._sat,
        v: this._value
      });
    }
  }, {
    key: "toRgba",
    value: function() {
      return C(C({}, Qt({
        h: this._hue,
        s: this._sat,
        v: this._value
      })), {}, {
        a: this._alpha / 100
      });
    }
  }, {
    key: "onChange",
    value: function() {
      var t = this._hue, n = this._sat, r = this._value, i = this._alpha, a = this.format, s = this.enableAlpha;
      if (!s) {
        switch (a) {
          case "hsl": {
            var l = Di({
              hue: t,
              sat: n / 100,
              val: r / 100
            }), u = Gt(l, 3);
            u[0];
            var c = u[1], d = u[2];
            c = Math.round(c * 100), d = Math.round(d * 100), this.value = "hsl(".concat(t, ", ").concat(c, "%, ").concat(d, "%)");
            break;
          }
          case "hsv": {
            this.value = "hsv(".concat(t, ", ").concat(Math.round(n), "%, ").concat(Math.round(r), "%)");
            break;
          }
          case "rgb": {
            var p = Qt({
              h: t,
              s: n,
              v: r
            }), f = p.r, m = p.g, h = p.b;
            this.value = "rgb(".concat(f, ",").concat(m, ",").concat(h, ")");
            break;
          }
          default:
            this.value = Bi(Qt({
              h: t,
              s: n,
              v: r
            }));
        }
        return;
      }
      switch (a) {
        case "hsl": {
          var v = Di({
            hue: t,
            sat: n / 100,
            val: r / 100
          }), g = Gt(v, 3);
          g[0];
          var b = g[1], y = g[2];
          b = Math.round(b * 100), y = Math.round(y * 100), this.value = "hsla(".concat(t, ", ").concat(b, "%, ").concat(y, "%, ").concat(this.get("alpha") / 100, ")");
          break;
        }
        case "hsv": {
          this.value = "hsva(".concat(t, ", ").concat(Math.round(n), "%, ").concat(Math.round(r), "%, ").concat(this.get("alpha") / 100, ")");
          break;
        }
        case "hex": {
          this.value = "".concat(Bi(Qt({
            h: t,
            s: n,
            v: r
          }))).concat(bo(i * 255 / 100));
          break;
        }
        default: {
          var S = Qt({
            h: t,
            s: n,
            v: r
          }), I = S.r, k = S.g, E = S.b;
          this.value = "rgba(".concat(I, ", ").concat(k, ", ").concat(E, ", ").concat(this.get("alpha") / 100, ")");
        }
      }
    }
  }]);
}(), Xp = ["state", "changeVisible", "onConfirm", "onCancel", "onHueUpdate", "onSVUpdate", "onColorUpdate"], Zp = function(e, t, n) {
  var r, i, a, s = n.emit, l = t.toRefs(e), u = l.modelValue, c = l.visible, d = l.predefine, p = l.size, f = l.history, m = t.ref(c.value), h = t.ref((r = u.value) !== null && r !== void 0 ? r : "transparent"), v = t.ref(Se((i = f == null ? void 0 : f.value) !== null && i !== void 0 ? i : [])), g = t.ref(Se((a = d == null ? void 0 : d.value) !== null && a !== void 0 ? a : []));
  t.watch(d, function(V) {
    g.value = Se(V);
  }, {
    deep: !0
  }), t.watch(f, function(V) {
    v.value = Se(V);
  }, {
    deep: !0
  });
  var b = t.reactive({
    isShow: m,
    hex: h,
    triggerBg: t.ref(u.value),
    size: p,
    stack: v,
    predefineStack: g,
    enablePredefineColor: t.computed(function() {
      return e.enablePredefineColor;
    }),
    enableHistory: t.computed(function() {
      return e.enableHistory;
    })
  }), y = new Qp({
    value: e.modelValue,
    format: e.format,
    enableAlpha: e.alpha
  });
  t.watch(function() {
    return [e.alpha, e.format];
  }, function() {
    y.enableAlpha = e.alpha, y.format = e.format || y.format, y.onChange(), rs(y.value, s);
  }), t.watch(function() {
    return e.modelValue;
  }, function() {
    y.fromString(e.modelValue);
    var V = y.toRgba(), Y = V.r, X = V.g, _ = V.b, be = V.a;
    b.hex = "rgba(".concat(Y, ", ").concat(X, ", ").concat(_, ", ").concat(be, ")");
  });
  var S = jp(m), I = Wp(b, s, S, y), k = I.onConfirm, E = I.onCancel, L = {
    state: b,
    changeVisible: S,
    onConfirm: k,
    onCancel: E
  };
  return L;
};
const Jp = B({
  emits: ["update:modelValue"],
  props: [...Q, "modelValue"],
  setup(o, e) {
    return z({ props: o, context: e, renderless: Zp, api: Xp });
  }
});
function qp(o, e, t, n, r, i) {
  return A(), w("div");
}
const Ko = /* @__PURE__ */ W(Jp, [["render", qp]]);
var _p = function(e) {
  var t, n = (typeof process > "u" ? "undefined" : R(process)) === "object" ? (t = process.env) === null || t === void 0 ? void 0 : t.TINY_MODE : null;
  return Ko;
}, ef = {};
const Je = B({
  name: O + "ColorPicker",
  props: C(C({}, j), {}, {
    _constants: {
      type: Object,
      default: function() {
        return ef;
      }
    },
    modelValue: String,
    visible: Boolean,
    alpha: Boolean,
    predefine: Array,
    history: Array,
    size: {
      type: String,
      default: "",
      validator: function(e) {
        return [" large", "medium", "small", "mini", ""].includes(e);
      }
    },
    format: {
      type: Array,
      default: function() {
        return [];
      },
      validator: function(e) {
        return e.length ? (e[e.length - 1] === "a" && console.warn("If you want enable alpha, You should set `alpha` prop to true"), ["hsv", "hsl", "rgb", "hex"].includes(e)) : !0;
      }
    },
    enableHistory: {
      type: Boolean,
      default: !1
    },
    enablePredefineColor: {
      type: Boolean,
      default: !1
    }
  }),
  setup: function(e, t) {
    return K({
      props: e,
      context: t,
      template: _p
    });
  }
});
const tf = "3.20.0";
Je.model = {
  prop: "modelValue",
  event: "update:modelValue"
};
Je.install = function(o) {
  o.component(Je.name, Je);
};
Je.version = tf;
var nf = function(e) {
  var t = e.constants, n = e.props;
  return function() {
    return n.pattern !== t.SIMPLE;
  };
}, of = function(e) {
  var t = e.constants, n = e.props;
  return function() {
    return n.pattern === t.LEGEND || n.pattern === t.CLASSIC;
  };
}, rf = function(e) {
  var t = e.constants, n = e.props;
  return function() {
    return n.pattern !== t.CLASSIC;
  };
}, re = function(e) {
  return Te(e) ? e + "px" : e;
}, af = function(e) {
  var t = e.constants, n = e.props;
  return function() {
    return n.pattern === t.FASHION ? {
      height: re(n.headerHeight),
      left: re(n.asideWidth)
    } : {
      height: re(n.headerHeight)
    };
  };
}, sf = function(e) {
  var t = e.constants, n = e.props;
  return function() {
    return n.pattern === t.SIMPLE || n.pattern === t.FASHION ? {
      top: re(0),
      width: re(n.asideWidth)
    } : {
      width: re(n.asideWidth),
      top: re(n.headerHeight)
    };
  };
}, lf = function(e) {
  var t = e.constants, n = e.props;
  return function() {
    if (n.pattern === t.DEFAULT || n.pattern === t.FASHION)
      return {
        top: re(n.headerHeight),
        left: re(n.asideWidth),
        bottom: re(0)
      };
    if (n.pattern === t.LEGEND)
      return {
        top: re(n.headerHeight),
        left: re(n.asideWidth),
        bottom: re(n.footerHeight)
      };
    if (n.pattern === t.SIMPLE)
      return {
        top: re(0),
        left: re(n.asideWidth),
        bottom: re(0)
      };
    if (n.pattern === t.CLASSIC)
      return {
        top: re(n.headerHeight),
        left: re(0),
        bottom: re(n.footerHeight)
      };
  };
}, uf = function(e) {
  var t = e.constants, n = e.props;
  return function() {
    return n.pattern === t.CLASSIC ? {
      height: re(n.footerHeight),
      left: re(0)
    } : n.pattern === t.LEGEND ? {
      height: re(n.footerHeight),
      left: re(n.asideWidth)
    } : {
      height: re(n.footerHeight)
    };
  };
}, cf = function(e) {
  e.constants;
  var t = e.props;
  return function() {
    return {
      width: re(t.leftWidth)
    };
  };
}, df = function(e) {
  var t = e.constants, n = e.props;
  return function() {
    return n.pattern !== t.DEFAULT;
  };
}, pf = function(e) {
  e.constants;
  var t = e.props;
  return function() {
    return {
      width: re(t.rightWidth)
    };
  };
}, ff = ["state"], mf = function(e, t, n) {
  var r = t.computed, i = t.reactive, a = n.constants, s = {}, l = i({
    showAside: r(function() {
      return s.computedShowAside();
    }),
    showHeader: r(function() {
      return s.computedShowHeader();
    }),
    showFooter: r(function() {
      return s.computedShowFooter();
    }),
    mainStyle: r(function() {
      return s.computedMainStyle();
    }),
    asideStyle: r(function() {
      return s.computedAsideStyle();
    }),
    headerStyle: r(function() {
      return s.computedHeaderStyle();
    }),
    footerStyle: r(function() {
      return s.computedFooterStyle();
    }),
    showRight: r(function() {
      return s.computedShowRight();
    }),
    leftStyle: r(function() {
      return s.computedLeftStyle();
    }),
    rightStyle: r(function() {
      return s.computedRightStyle();
    })
  });
  return Object.assign(s, {
    state: l,
    computedShowAside: rf({
      constants: a,
      props: e
    }),
    computedShowHeader: nf({
      constants: a,
      props: e
    }),
    computedShowFooter: of({
      constants: a,
      props: e
    }),
    computedMainStyle: lf({
      constants: a,
      props: e
    }),
    computedAsideStyle: sf({
      constants: a,
      props: e
    }),
    computedHeaderStyle: af({
      constants: a,
      props: e
    }),
    computedFooterStyle: uf({
      constants: a,
      props: e
    }),
    computedLeftStyle: cf({
      constants: a,
      props: e
    }),
    computedShowRight: df({
      constants: a,
      props: e
    }),
    computedRightStyle: pf({
      constants: a,
      props: e
    })
  }), s;
};
const vf = B({
  props: [...Q, "pattern", "leftWidth", "rightWidth"],
  setup(o, e) {
    return z({ props: o, context: e, renderless: mf, api: ff });
  }
}), hf = { class: "tiny-mobile-container__center" };
function gf(o, e, t, n, r, i) {
  return A(), w(
    "div",
    {
      class: P([[o.pattern], "tiny-mobile-container"])
    },
    [
      T(
        "div",
        {
          style: H(o.state.leftStyle),
          class: "tiny-mobile-container__left"
        },
        [
          F(o.$slots, "left")
        ],
        4
        /* STYLE */
      ),
      T("div", hf, [
        F(o.$slots, "center")
      ]),
      o.state.showRight ? (A(), w(
        "div",
        {
          key: 0,
          style: H(o.state.rightStyle),
          class: "tiny-mobile-container__right"
        },
        [
          F(o.$slots, "right")
        ],
        4
        /* STYLE */
      )) : x("v-if", !0)
    ],
    2
    /* CLASS */
  );
}
const Qo = /* @__PURE__ */ W(vf, [["render", gf]]);
var Af = function(e) {
  var t, n = (typeof process > "u" ? "undefined" : R(process)) === "object" ? (t = process.env) === null || t === void 0 ? void 0 : t.TINY_MODE : null;
  return Qo;
}, Pi = {
  DEFAULT: "default",
  SIMPLE: "simple",
  LEGEND: "legend",
  CLASSIC: "classic",
  FASHION: "fashion"
};
const Dt = B({
  name: O + "Container",
  props: C(C({}, j), {}, {
    _constants: {
      type: Object,
      default: function() {
        return Pi;
      }
    },
    pattern: {
      type: String,
      default: "default",
      validator: function(e) {
        return !!Pi[e.toUpperCase()];
      }
    },
    headerHeight: {
      type: [Number, String],
      default: 60
    },
    asideWidth: {
      type: [Number, String],
      default: 200
    },
    footerHeight: {
      type: [Number, String],
      default: 60
    },
    // mobile
    leftWidth: {
      type: [Number, String],
      default: 60
    },
    rightWidth: {
      type: [Number, String],
      default: 44
    }
  }),
  setup: function(e, t) {
    return K({
      props: e,
      context: t,
      template: Af
    });
  }
});
const yf = "3.20.0";
Dt.install = function(o) {
  o.component(Dt.name, Dt);
};
Dt.version = yf;
var Mi = function(e, t) {
  if (typeof t == "function") {
    for (var n in e)
      if (hn.call(e, n) && t(n, e[n]) === !1)
        break;
  }
}, ht, Xo = function(e, t, n) {
  if (!(!e || !Ke(e) || !t || typeof t != "string")) {
    var r = t.split("."), i = e, a = r.length;
    if (a > 1) {
      for (var s = n ? 1 : 0, l = s; l < a; l++)
        if (i = i[r[l]], ke(i))
          return i;
      return i;
    } else
      return i[r[0]];
  }
}, Oi = function(e, t, n, r) {
  if (!e || !Ke(e) || !t || typeof t != "string")
    return e;
  var i = t.split("."), a = e, s = i.length, l = i[0];
  if (s > 1) {
    s--;
    for (var u = a, c, d, p = 0; p < s; p++)
      c = i[p], d = u[c], (d === null || !Ke(d)) && (u[c] = {}, d = u[c]), u = d;
    l = i[s], r && Ke(u[l]) ? ht(!0, u[l], n) : u[l] = n;
  } else
    r && Ke(a[l]) ? ht(!0, a[l], n) : a[l] = n;
  return a;
}, bf = function(e, t, n, r) {
  var i = function(l, u, c, d, p) {
    var f = d.indexOf(c) === 0, m = d.split(c), h = m[1] && m[1].indexOf(".") === 0;
    c === d || f && h ? c !== d && Mi(Xo(l, c), function(v) {
      return i(l, u, "".concat(c, ".").concat(v), d), !0;
    }) : t && !t.includes(c) && Oi(u, c, Xo(l, c), p);
  }, a = function(l, u, c, d) {
    var p = {};
    return d ? Mi(l, function(f) {
      return u.forEach(function(m) {
        return i(l, p, f, m, c);
      });
    }) : u.forEach(function(f) {
      return Oi(p, f, Xo(l, f), c);
    }), p;
  };
  return Ke(e) ? Array.isArray(t) ? a(e, t, n, r) : ht(n !== !1, {}, e) : e;
}, as = function(e) {
  return Array.isArray(e) ? e.map(function(t) {
    return bf(t);
  }) : e;
}, Sf = function(e, t, n, r, i) {
  var a;
  if (n && r && (Ke(r) || (a = Array.isArray(r))))
    if (a)
      a = !1, e[t] = as(r);
    else {
      var s = i && Ke(i) ? i : {};
      e[t] = ht(n, s, r);
    }
  else if (r !== void 0)
    try {
      e[t] = r;
    } catch {
    }
};
ht = function() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  var r = t.length, i = t[0] || {}, a = 1, s = !1;
  for (Pe(i) === "boolean" && (s = i, i = t[a] || {}, a++), !Ee(i) && Pe(i) !== "function" && (i = {}); a < r; a++) {
    var l = t[a];
    if (l !== null && Ee(l))
      for (var u = Object.keys(l), c = 0, d = u; c < d.length; c++) {
        var p = d[c], f = i[p], m = l[p];
        i !== m && Sf(i, p, s, m, f);
      }
  }
  return i;
};
var ss = function(e) {
  for (var t = 0, n = arguments.length <= 1 ? 0 : arguments.length - 1; t < n; t++) {
    var r = (t + 1 < 1 || arguments.length <= t + 1 ? void 0 : arguments[t + 1]) || {};
    for (var i in r)
      if (hn.call(r, i)) {
        var a = r[i];
        a !== void 0 && (e[i] = a);
      }
  }
  return e;
}, wf = function() {
  var e = 8;
  return document.addEventListener && window.performance && (e = 9, window.atob && window.matchMedia && (e = 10, !window.attachEvent && !document.all && (e = 11))), e;
}, Tf = function(e) {
  e.chrome && ~navigator.userAgent.indexOf("Edg") ? (e.name = "edge", e.edge = !0, delete e.chrome) : !document.documentMode && window.StyleMedia && (e.name = "edge", e.edge = !0);
}, un = typeof window < "u" && typeof document < "u" && window.document === document;
(function() {
  var o = {
    name: void 0,
    version: void 0,
    isDoc: typeof document < "u",
    isMobile: !1,
    isPC: !0,
    isNode: typeof window > "u"
  };
  if (un) {
    var e = /(Android|webOS|iPhone|iPad|iPod|SymbianOS|BlackBerry|Windows Phone)/.test(navigator.userAgent);
    o.isMobile = e, o.isPC = !e;
    var t;
    if (window.chrome && (window.chrome.webstore || /^Google\b/.test(window.navigator.vendor)) ? (o.name = "chrome", o.chrome = !0, t = navigator.userAgent.match(/chrome\/(\d+)/i), o.version = !!t && !!t[1] && parseInt(t[1], 10), t = void 0) : document.all || document.documentMode ? (o.name = "ie", o.version = wf(), o.ie = !0) : typeof window.InstallTrigger < "u" ? (o.name = "firefox", o.firefox = !0) : Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor") > 0 ? (o.name = "safari", o.safari = !0) : (window.opr && window.opr.addons || window.opera) && (o.name = "opera", o.opera = !0), Tf(o), !~["ie", "chrome"].indexOf(o.name)) {
      var n = o.name + "/(\\d+)";
      t = navigator.userAgent.match(new RegExp(n, "i")), o.version = !!t && !!t[1] && parseInt(t[1], 10), t = void 0;
    }
    if (o.isDoc) {
      var r = document.body || document.documentElement;
      ["webkit", "khtml", "moz", "ms", "o"].forEach(function(i) {
        o["-" + i] = !!r[i + "MatchesSelector"];
      });
    }
  }
  return o;
})();
var tn = un ? window.BigInt : global.BigInt;
function Cr() {
  return typeof tn == "function";
}
function Cn(o) {
  var e = o.toString().trim(), t = e.startsWith("-");
  t && (e = e.slice(1)), e = e.replace(/(\.\d*[^0])0*$/, "$1").replace(/\.0*$/, "").replace(/^0+/, ""), e.startsWith(".") && (e = "0".concat(e));
  var n = e || "0", r = n.split("."), i = r[0] || "0", a = r[1] || "0";
  i === "0" && a === "0" && (t = !1);
  var s = t ? "-" : "";
  return {
    negative: t,
    negativeStr: s,
    trimStr: n,
    integerStr: i,
    decimalStr: a,
    fullStr: "".concat(s).concat(n)
  };
}
function Zr(o) {
  var e = String(o);
  return !isNaN(Number(e)) && ~e.indexOf("e");
}
function ls(o) {
  return typeof o == "number" ? !isNaN(o) : o ? (
    // Normal type: 11.28
    /^\s*-?\d+(\.\d+)?\s*$/.test(o) || // Pre-number: 1.
    /^\s*-?\d+\.\s*$/.test(o) || // Post-number: .1
    /^\s*-?\.\d+\s*$/.test(o)
  ) : !1;
}
function Ir(o) {
  var e = String(o);
  if (Zr(o)) {
    var t = Number(e.slice(e.indexOf("e-") + 2)), n = e.match(/\.(\d+)/);
    return n != null && n[1] && (t += n[1].length), t;
  }
  return ~e.indexOf(".") && ls(e) ? e.length - e.indexOf(".") - 1 : 0;
}
function us(o) {
  var e = String(o);
  if (Zr(o)) {
    if (o > Number.MAX_SAFE_INTEGER)
      return String(Cr() ? tn(o).toString() : Number.MAX_SAFE_INTEGER);
    if (o < Number.MIN_SAFE_INTEGER)
      return String(Cr() ? tn(o).toString() : Number.MIN_SAFE_INTEGER);
    e = o.toFixed(Ir(e));
  }
  return Cn(e).fullStr;
}
function Cf(o) {
  return o.add || Object.assign(o, {
    add: o.plus,
    lessEquals: o.isLessThan,
    equals: o.isEqualTo
  }), o;
}
var kr = {
  CLS: null
}, cs;
function gt(o, e) {
  return kr.CLS || cs(e), Cf(new kr.CLS(o));
}
var If = /* @__PURE__ */ function() {
  function o(e) {
    if (xn(this, o), !e && e !== 0 || !String(e).trim()) {
      this.empty = !0;
      return;
    }
    if (this.origin = String(e), this.negative = void 0, this.integer = void 0, this.decimal = void 0, this.decimalLen = void 0, this.empty = void 0, this.nan = void 0, e === "-") {
      this.nan = !0;
      return;
    }
    var t = Zr(e) ? Number(e) : e;
    typeof t != "string" && us(t);
    var n = Function, r = function(u) {
      var c = u.replace(/^0+/, "") || "0";
      return n("return BigInt('".concat(c, "')"))();
    };
    if (ls(t)) {
      var i = Cn(t);
      this.negative = i.negative;
      var a = i.trimStr.split(".");
      this.integer = a[0].includes("e") ? a[0] : tn(a[0]);
      var s = a[1] || "0";
      this.decimal = s.includes("e") ? r(s) : tn(s), this.decimalLen = s.length;
    } else
      this.nan = !0;
  }
  return Pn(o, [{
    key: "getDecimalStr",
    value: function() {
      return this.decimal.toString().padStart(this.decimalLen, "0");
    }
  }, {
    key: "getIntegerStr",
    value: function() {
      return this.integer.toString();
    }
  }, {
    key: "getMark",
    value: function() {
      return this.negative ? "-" : "";
    }
    /**
     * Align BigIntDecimal with same decimal length. e.g. 12.3 + 5 = 1230000
     * This is used for add function only.
     */
  }, {
    key: "alignDecimal",
    value: function(t) {
      var n = "".concat(this.getMark()).concat(this.getIntegerStr()).concat(this.getDecimalStr().padEnd(t, "0"));
      return tn(n);
    }
  }, {
    key: "add",
    value: function(t) {
      if (this.isInvalidate())
        return new o(t);
      var n = new o(t);
      if (n.isInvalidate())
        return this;
      var r = Math.max(this.getDecimalStr().length, n.getDecimalStr().length), i = n.alignDecimal(r), a = this.alignDecimal(r), s = "".concat(a + i), l = Cn(s), u = l.negativeStr, c = l.trimStr, d = "".concat(u).concat(c.padStart(r + 1, "0"));
      return gt("".concat(d.slice(0, -r), ".").concat(d.slice(-r)));
    }
  }, {
    key: "negate",
    value: function() {
      var t = new o(this.toString());
      return t.negative = !t.negative, t;
    }
  }, {
    key: "isNaN",
    value: function() {
      return this.nan;
    }
  }, {
    key: "isEmpty",
    value: function() {
      return this.empty;
    }
  }, {
    key: "isInvalidate",
    value: function() {
      return this.isEmpty() || this.isNaN();
    }
  }, {
    key: "lessEquals",
    value: function(t) {
      return this.add(t.negate().toString()).toNumber() <= 0;
    }
  }, {
    key: "equals",
    value: function(t) {
      return this.toString() === (t && t.toString());
    }
  }, {
    key: "toNumber",
    value: function() {
      return this.isNaN() ? NaN : Number(this.toString());
    }
  }, {
    key: "toString",
    value: function() {
      var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
      return t ? this.isInvalidate() ? "" : Cn("".concat(this.getMark()).concat(this.getIntegerStr(), ".").concat(this.getDecimalStr())).fullStr : this.origin;
    }
  }]);
}(), kf = /* @__PURE__ */ function() {
  function o() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    if (xn(this, o), !e && e !== 0 || !String(e).trim()) {
      this.empty = !0;
      return;
    }
    this.origin = "", this.number = void 0, this.empty = void 0, this.origin = String(e), this.number = Number(e);
  }
  return Pn(o, [{
    key: "negate",
    value: function() {
      return new o(-this.toNumber());
    }
  }, {
    key: "add",
    value: function(t) {
      if (this.isInvalidate())
        return new o(t);
      var n = Number(t);
      if (isNaN(n))
        return this;
      var r = this.number + n;
      if (r < Number.MIN_SAFE_INTEGER)
        return new o(Number.MIN_SAFE_INTEGER);
      if (r > Number.MAX_SAFE_INTEGER)
        return new o(Number.MAX_SAFE_INTEGER);
      var i = Math.max(Ir(n), Ir(this.number));
      return new o(r.toFixed(i));
    }
  }, {
    key: "isNaN",
    value: function(e) {
      function t() {
        return e.apply(this, arguments);
      }
      return t.toString = function() {
        return e.toString();
      }, t;
    }(function() {
      return isNaN(this.number);
    })
  }, {
    key: "isEmpty",
    value: function() {
      return this.empty;
    }
  }, {
    key: "isInvalidate",
    value: function() {
      return this.isEmpty() || this.isNaN();
    }
  }, {
    key: "equals",
    value: function(t) {
      return this.toNumber() === (t && t.toNumber());
    }
  }, {
    key: "lessEquals",
    value: function(t) {
      return this.add(t.negate().toString()).toNumber() <= 0;
    }
  }, {
    key: "toNumber",
    value: function() {
      return this.number;
    }
  }, {
    key: "toString",
    value: function() {
      var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
      return t ? this.isInvalidate() ? "" : us(this.number) : this.origin;
    }
  }]);
}();
cs = function(e) {
  kr.CLS = Cr() ? If : typeof e == "function" ? e : kf;
};
function cn(o, e) {
  return gt(o).lessEquals(gt(e));
}
function Ef(o, e) {
  return gt(o).equals(gt(e));
}
function Jr(o, e) {
  var t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 5;
  if (o === "")
    return "";
  var n = ".", r = Cn(o), i = r.negativeStr, a = r.integerStr, s = r.decimalStr, l = "".concat(n).concat(s), u = "".concat(i).concat(a);
  if (e >= 0) {
    var c = Number(s[e]);
    if (c >= t && t !== 0) {
      var d = gt("".concat(a).concat(n).concat(s)).add("0.".concat(Dr("", e, !0)).concat(10 - c));
      return Jr(i + d.toString(), e, 0);
    }
    return e === 0 ? u : "".concat(u).concat(n).concat(Dr(s, e, !0).slice(0, e));
  }
  return l === ".0" ? u : "".concat(u).concat(l);
}
var Er = ".", Df = function(e) {
  var t = e.split(Er), n = t[0], r = t[1], i, a;
  if (r)
    i = parseInt(e.split(Er).join(""), 10), a = r.length * -1;
  else {
    var s = n.match(/0+$/);
    if (s) {
      var l = s[0].length;
      i = n.substr(0, n.length - l), a = l;
    } else
      i = n, a = 0;
  }
  return {
    value: i,
    exp: a
  };
}, ds = function(e) {
  var t;
  return e <= 0 ? t = "" : String.prototype.repeat ? t = "0".repeat(e) : t = function(n) {
    for (var r = [], i = 0; i < n; i++)
      r.push(0);
    return r.join("");
  }(e), t;
}, Bf = function(e, t) {
  t = Math.abs(t);
  var n = t - e.length, r = Er;
  n >= 0 && (e = ds(n) + e, r = "0.");
  var i = e.length, a = i - t, s = e.substr(0, a), l = e.substring(a, i);
  return s + r + l;
}, xf = function(e, t) {
  return String(e + ds(t));
}, Zo = function(e, t) {
  return (t >= 0 ? xf : Bf)(String(e), t);
};
function le(o) {
  var e = this;
  if (!this || this.constructor !== le)
    return new le(o);
  if (o instanceof le)
    return o;
  this.internal = String(o), this.asInt = Df(this.internal), this.add = function(t) {
    var n = [e, new le(t)];
    n.sort(function(l, u) {
      return l.asInt.exp - u.asInt.exp;
    });
    var r = n[0].asInt.exp, i = n[1].asInt.exp, a = Number(Zo(n[1].asInt.value, i - r)), s = Number(n[0].asInt.value);
    return new le(Zo(String(a + s), r));
  }, this.sub = function(t) {
    return new le(e.add(t * -1));
  }, this.mul = function(t) {
    t = new le(t);
    var n = String(e.asInt.value * t.asInt.value), r = e.asInt.exp + t.asInt.exp;
    return new le(Zo(n, r));
  }, this.div = function(t) {
    t = new le(t);
    var n = Math.min(e.asInt.exp, t.asInt.exp), r = Math.pow(10, Math.abs(n)), i = le.mul(r, e), a = le.mul(r, t);
    return new le(i / a);
  }, this.toString = function() {
    return e.internal;
  }, this.toNumber = function() {
    return Number(e.internal);
  };
}
le.add = function(o, e) {
  return new le(o).add(e);
};
le.mul = function(o, e) {
  return new le(o).mul(e);
};
le.sub = function(o, e) {
  return new le(o).sub(e);
};
le.div = function(o, e) {
  return new le(o).div(e);
};
var Li = function(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = e < 0 ? "-" : "";
  e = Math.abs(e);
  var r = e.toString().length < Math.pow(2, 53).toString().length - 1 ? Math.pow(10, t) : Math.pow(10, t - 1), i = new le(Math.round(new le(e).mul(r))).div(r).toString(), a = Number(i);
  return a ? n + a.toFixed(t) : a.toFixed(t);
}, Pf = function(e, t) {
  var n = t.secondaryGroupSize, r = n === void 0 ? 3 : n, i = t.groupSize, a = i === void 0 ? 0 : i, s = t.groupSeparator, l = s === void 0 ? "," : s, u = /^-\d+/.test(e), c = u ? e.slice(1) : e, d = r || a;
  if (a && c.length > a) {
    var p = c.slice(0, 0 - a), f = c.slice(0 - a);
    p = p.replace(new RegExp("\\B(?=(\\d{".concat(d, "})+(?!\\d))"), "g"), l), c = "".concat(p).concat(l).concat(f);
  }
  return "".concat(u ? "-" : "").concat(c);
}, Ni = function(e) {
  for (var t = [], n = 0; n < e.length; n++)
    t.push(e[n]);
  return t.reverse().join("");
}, Mf = function(e, t) {
  var n = t.fractionGroupSize, r = n === void 0 ? 0 : n, i = t.fractionGroupSeparator, a = i === void 0 ? " " : i, s = new RegExp("\\B(?=(\\d{".concat(r, "})+(?!\\d))"), "g");
  return Ni(Ni(e).replace(s, a));
}, ps = function(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = t.fraction, r = t.rounding, i = t.prefix, a = i === void 0 ? "" : i, s = t.decimalSeparator, l = s === void 0 ? "." : s, u = t.suffix, c = u === void 0 ? "" : u, d = gt(e);
  if (d.isNaN() || !d.toString())
    return e;
  d = Jr(d.toString(), n, r), t.zeroize === !1 && d.match(/\./) && (d = d.replace(/\.?0+$/g, ""));
  var p = d.toString().split(".").slice(0, 2).map(function(f, m) {
    return m ? Mf(f, t) : Pf(f, t);
  }).join(l);
  return "".concat(a).concat(p).concat(c);
};
function Of(o) {
  var e = /* @__PURE__ */ Object.create(null);
  return function(n) {
    var r = e[n];
    return r || (e[n] = o(n));
  };
}
var dn = Of(function(o) {
  return o.charAt(0).toUpperCase() + o.slice(1);
}), Dr = function(e, t, n) {
  var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "0";
  if (typeof e == "string" && typeof r == "string" && Te(t)) {
    var i = e.length - t;
    if (i > 0)
      return n ? e.substr(0, t) : e.substr(i, t);
    var a = [];
    for (i = Math.abs(i) / r.length; i > 0; i--)
      a.push(r);
    var s = a.join("");
    return n ? e + s : s + e;
  }
}, Lf = function() {
  var e = 4294967296;
  return window.crypto.getRandomValues(new window.Uint32Array(1))[0] / e;
}, fs = function() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 8;
  return e + Lf().toString().substr(2, t);
}, Br = function(e) {
  return Te(e) ? e : typeof e == "string" ? parseFloat(e) : NaN;
}, Nf = function(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 2, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1, r = NaN;
  if (Te(e) && (r = e), typeof e == "string") {
    var i = parseFloat(e);
    isNaN(i) || (r = i);
  }
  return Te(r) && (n ? r = Li(e.toString().split(".").slice(0, 2).map(function(a, s) {
    return s ? a.slice(0, t) : a;
  }).join("."), t) : r = Li(r, t)), r;
}, ms = function(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
  if ([void 0, null].includes(e))
    return "";
  if (!Te(e) || e <= 0)
    return e + t;
  for (var n = ["B", "K", "M", "G", "T", "P", "E", "Z", "Y"], r = Math.max(n.indexOf((t + "").toLocaleUpperCase()), 0); e >= 1024 && r < n.length - 1; )
    e = e / 1024, r++;
  for (; e < 1 && r > 0; )
    e = e * 1024, r--;
  return parseFloat(Nf(e, 2, !0)) + n[r];
}, Ff = function(e, t, n) {
  var r = document.createElement("canvas"), i = r.getContext("2d");
  i.font = t;
  var a = i.measureText(e), s;
  if (a.width < n)
    return {
      t: e,
      o: !1
    };
  for (var l = -1; ; l--)
    if (s = e.slice(0, l) + "...", a = i.measureText(s), a.width < n)
      return {
        t: s,
        o: !0
      };
}, vs = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], Rf = new RegExp("^(\\d{4})(/|-)(((0)?[1-9])|(1[0-2]))((/|-)(((0)?[1-9])|([1-2][0-9])|(3[0-1])))?( ((0)?[0-9]|1[0-9]|20|21|22|23):([0-5]?[0-9])((:([0-5]?[0-9]))?(.([0-9]{1,6}))?)?)?$"), Vf = new RegExp("^(((0)?[1-9])|(1[0-2]))(/|-)(((0)?[1-9])|([1-2][0-9])|(3[0-1]))?(/|-)?(\\d{4})( ((0)?[0-9]|1[0-9]|20|21|22|23):([0-5]?[0-9])((:([0-5]?[0-9]))?(.([0-9]{1,6}))?)?)?$"), Uf = new RegExp("^(\\d{4})-(((0)?[1-9])|(1[0-2]))-(((0)?[1-9])|([1-2][0-9])|(3[0-1]))T(((0)?[0-9]|1[0-9]|20|21|22|23):([0-5]?[0-9])((:([0-5]?[0-9]))?(.([0-9]{1,6}))?)?)?(Z|([+-])((0)?[0-9]|1[0-9]|20|21|22|23):?([0-5]?[0-9]))$"), Hf = {
  "y{1,4}": /y{1,4}/,
  "M{1,2}": /M{1,2}/,
  "d{1,2}": /d{1,2}/,
  "h{1,2}": /h{1,2}/,
  "H{1,2}": /H{1,2}/,
  "m{1,2}": /m{1,2}/,
  "s{1,2}": /s{1,2}/,
  "S{1,3}": /S{1,3}/,
  "Z{1,1}": /Z{1,1}/
}, ze = {
  YEAR: 9999,
  MONTH: 11,
  DATE: 31,
  HOUR: 23,
  MINUTE: 59,
  SECOND: 59,
  MILLISECOND: 999
}, $f = "-12:00,-11:00,-10:00,-09:30,-08:00,-07:00,-06:00,-05:00,-04:30,-04:00,-03:30,-02:00,-01:00", zf = "-00:00,+00:00,+01:00,+02:00,+03:00,+03:30,+04:00,+04:30,+05:00,+05:30,+05:45,+06:00", jf = "+06:30,+07:00,+08:00,+09:00,+10:00,+10:30,+11:00,+11:30,+12:00,+12:45,+13:00,+14:00", Wf = [].concat($f.split(","), zf.split(","), jf.split(",")), Gf = function(e) {
  var t = 0 - e.getTimezoneOffset() / 60, n;
  return t === 0 ? n = "Z" : t > 0 ? n = "+" + (t > 10 ? t : "0" + t) + "00" : n = (t < -10 ? t : "-0" + -t) + "00", n;
}, hs = function(e) {
  return e % 400 === 0 || e % 4 === 0 && e % 100 !== 0;
}, gs = function(e) {
  return e > ze.MILLISECOND ? Number(String(e).substring(0, 3)) : e;
}, qr = function(e) {
  var t = e.year, n = e.month, r = e.date, i = e.hours, a = e.minutes, s = e.seconds, l = e.milliseconds, u = vs[n];
  if (hs(t) && n === 1 && (u += 1), r <= u)
    return new Date(t, n, r, i, a, s, gs(l));
}, Yf = function(e) {
  if (e.length === 23) {
    var t = Number(e[1]), n = e[3] - 1, r = Number(e[9] || 1), i = e[15] || 0, a = e[17] || 0, s = e[20] || 0, l = e[22] || 0;
    return qr({
      date: r,
      year: t,
      hours: i,
      month: n,
      seconds: s,
      minutes: a,
      milliseconds: l
    });
  }
}, Kf = function(e) {
  if (e.length === 22) {
    var t = Number(e[12]), n = e[1] - 1, r = Number(e[6] || 1), i = e[14] || 0, a = e[16] || 0, s = e[19] || 0, l = e[21] || 0;
    return qr({
      year: t,
      month: n,
      date: r,
      hours: i,
      minutes: a,
      seconds: s,
      milliseconds: l
    });
  }
}, Qf = function(e) {
  if (e.length === 25) {
    var t = Number(e[1]), n = e[2] - 1, r = Number(e[6]), i = new Date(t, n, r).getTimezoneOffset(), a = e[12] || 0, s = e[14] || 0, l = e[17] || 0, u = e[19] || 0, c = e[20], d = e[21], p = e[22] || 0, f = e[24] || 0, m = vs[n], h, v;
    if (hs(t) && n === 1 && (m += 1), r <= m) {
      if (c === "Z")
        h = a - i / 60, v = s;
      else {
        if (c.includes(":") || (c = c.substr(0, 3) + ":" + c.substr(3)), !Wf.includes(c))
          return;
        h = d === "+" ? a - p - i / 60 : Number(a) + Number(p) - i / 60, v = d === "+" ? s - f : Number(s) + Number(f);
      }
      return new Date(t, n, r, h, v, l, gs(u));
    }
  }
}, Jo = [[Rf, Yf], [Vf, Kf], [Uf, Qf]], Xf = function(e) {
  for (var t = 0, n = Jo.length; t < n; t++) {
    var r = Jo[t][0].exec(e);
    if (r && r.length > 0)
      return Jo[t][1](r);
  }
}, Zf = function(e, t, n) {
  if (n)
    switch (n) {
      case "yyyy":
      case "yy":
        e[0] = t;
        break;
      case "M":
      case "MM":
        e[1] = t - 1;
        break;
      case "d":
      case "dd":
        e[2] = t;
        break;
      case "h":
      case "hh":
        e[3] = t;
        break;
      case "m":
      case "mm":
        e[4] = t;
        break;
      case "s":
      case "ss":
        e[5] = t;
        break;
      case "S":
      case "SS":
      case "SSS":
        e[6] = t;
        break;
    }
}, Jf = function(e, t) {
  var n = [0, -1, 0, 0, 0, 0];
  if (e.length !== t.length)
    return n;
  for (var r = 0, i = 0, a = 0, s = e.length; a < s; a++) {
    var l = e.substr(a, 1), u = isNaN(Number(l)) || l.trim() === "";
    if (u && l === t.substr(a, 1) || a === s - 1) {
      var c = void 0, d = void 0;
      if (u) {
        c = e.substring(r, a), r = a + 1;
        var p = t.indexOf(l, i);
        d = t.substring(i, p === -1 ? t.length : p), i = p + 1;
      } else
        c = e.substring(r, s), d = t.substring(i, s);
      (c.length === d.length || c) && Zf(n, c, d);
    }
  }
  return n;
}, wt = function(e, t, n) {
  return isNaN(e) || e < t || e > n;
}, qf = function(e) {
  var t = e.year, n = e.month, r = e.date, i = e.hours, a = e.minutes, s = e.seconds, l = e.milliseconds;
  return wt(t, 0, ze.YEAR) || wt(n, 0, ze.MONTH) || wt(r, 0, ze.DATE) || wt(i, 0, ze.HOUR) || wt(a, 0, ze.MINUTE) || wt(s, 0, ze.SECOND) || wt(l, 0, ze.MILLISECOND);
}, _f = function(e, t) {
  if (typeof t == "string") {
    var n = Jf(e, t), r = Number(n[0]), i = Number(n[1]), a = Number(n[2] || 1), s = Number(n[3] || 0), l = Number(n[4] || 0), u = Number(n[5] || 0), c = Number(n[6] || 0);
    return qf({
      year: r,
      month: i,
      date: a,
      hours: s,
      minutes: l,
      seconds: u,
      milliseconds: c
    }) ? void 0 : qr({
      year: r,
      date: a,
      month: i,
      minutes: l,
      hours: s,
      milliseconds: c,
      seconds: u
    });
  } else
    return Xf(e);
}, As = function(e, t, n) {
  var r;
  if (Te(e) ? r = new Date(e) : typeof e == "string" && (r = _f(e, t)), n) {
    var i = n && As(n) || new Date(1, 1, 1, 0, 0, 0);
    return r && r < i ? i : r;
  }
  return r;
}, xr = function(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "yyyy/MM/dd hh:mm:ss";
  if (_d(e)) {
    if (typeof t == "string") {
      var n = {
        "y{1,4}": e.getFullYear(),
        "M{1,2}": e.getMonth() + 1,
        "d{1,2}": e.getDate(),
        "h{1,2}": e.getHours(),
        "H{1,2}": e.getHours(),
        "m{1,2}": e.getMinutes(),
        "s{1,2}": e.getSeconds(),
        "S{1,3}": e.getMilliseconds(),
        "Z{1,1}": Gf(e)
      };
      return Object.keys(n).forEach(function(a) {
        var s = t.match(Hf[a]);
        a && s && s.length && (t = t.replace(s[0], a === "Z{1,1}" ? n[a] : Dr(n[a].toString(), s[0].length)));
      }), t;
    }
  } else if (typeof e == "string" && arguments.length >= 2) {
    var r = t;
    arguments.length === 2 ? t = void 0 : r = arguments[2];
    var i = As(e, t);
    return i ? xr(i, r) : "";
  }
}, ie = {
  Backspace: 8,
  Tab: 9,
  Clear: 12,
  Enter: 13,
  Shift: 16,
  Control: 17,
  Alt: 18,
  CapsLock: 20,
  Escape: 27,
  Space: 32,
  PageUp: 33,
  PageDown: 34,
  End: 35,
  Home: 36,
  ArrowLeft: 37,
  ArrowUp: 38,
  ArrowRight: 39,
  ArrowDown: 40,
  Insert: 45,
  Delete: 46,
  Colon: 58,
  Semicolon: 59,
  LessThan: 60,
  Equals: 61,
  GreaterThan: 62,
  QuestionMark: 63,
  AtMark: 64,
  KeyA: 65,
  KeyB: 66,
  KeyC: 67,
  KeyD: 68,
  KeyE: 69,
  KeyF: 70,
  KeyG: 71,
  KeyH: 72,
  KeyI: 73,
  KeyJ: 74,
  KeyK: 75,
  KeyL: 76,
  KeyM: 77,
  KeyN: 78,
  KeyO: 79,
  KeyP: 80,
  KeyQ: 81,
  KeyR: 82,
  KeyS: 83,
  KeyT: 84,
  KeyU: 85,
  KeyV: 86,
  KeyW: 87,
  KeyX: 88,
  KeyY: 89,
  KeyZ: 90,
  Digit0: 48,
  Digit1: 49,
  Digit2: 50,
  Digit3: 51,
  Digit4: 52,
  Digit5: 53,
  Digit6: 54,
  Digit7: 55,
  Digit8: 56,
  Digit9: 57,
  F1: 112,
  F2: 113,
  F3: 114,
  F4: 115,
  F5: 116,
  F6: 117,
  F7: 118,
  F8: 119,
  F9: 120,
  F10: 121,
  F11: 122,
  F12: 123,
  NumLock: 144,
  Numpad0: 96,
  Numpad1: 97,
  Numpad2: 98,
  Numpad3: 99,
  Numpad4: 100,
  Numpad5: 101,
  Numpad6: 102,
  Numpad7: 103,
  Numpad8: 104,
  Numpad9: 105,
  NumpadMultiply: 106,
  NumpadAdd: 107,
  NumpadEnter: 13,
  NumpadSubtract: 109,
  NumpadDecimal: 110,
  NumpadDivide: 111,
  NumpadComma: 190
}, At = {
  Left: "left",
  Right: "right",
  Top: "top",
  Bottom: "bottom"
}, em = {
  FullDatetime: "yyyy-MM-dd hh:mm:ss.SSS",
  LongDatetime: "yyyy-MM-dd hh:mm:ss",
  Datetime: "yyyy-MM-dd hh:mm",
  Date: "yyyy-MM-dd",
  FullTime: "hh:mm:ss.SSS",
  LongTime: "hh:mm:ss",
  Time: "hh:mm",
  YearMonth: "yyyy-MM"
}, tm = 120, ys = {
  viewportWindow: null
  // 获取真实视口的window，解决在微前端中某些bug
}, bs = function() {
  return ys.viewportWindow || window;
};
const Ss = ys;
var _r = typeof window > "u", nm = /([:\-_]+(.))/g, om = /^moz([A-Z])/, rm = function(e) {
  return e.replace(nm, function(t, n, r, i) {
    return i ? r.toUpperCase() : r;
  }).replace(om, "Moz$1");
}, N = function(e, t, n) {
  var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  e && t && n && e.addEventListener(t, n, r);
}, U = function(e, t, n) {
  var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  e && t && e.removeEventListener(t, n, r);
}, im = function(e, t, n) {
  var r = function() {
    n && n.apply(this, arguments), U(e, t, r);
  };
  N(e, t, r);
}, We = function(e, t) {
  if (!e || !t)
    return !1;
  if (t.includes(" "))
    throw new Error("className should not contain space.");
  if (e.classList)
    return e.classList.contains(t);
}, ve = function(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
  if (e) {
    var n = t.split(" ").filter(function(r) {
      return r;
    });
    n.forEach(function(r) {
      return e.classList.add(r);
    });
  }
}, ge = function(e, t) {
  if (!(!e || !t)) {
    var n = t.split(" ").filter(function(r) {
      return r;
    });
    n.forEach(function(r) {
      return e.classList.remove(r);
    });
  }
}, Ie = function(e, t) {
  if (!_r) {
    if (!e || !t)
      return null;
    t = rm(t), t === "float" && (t = "cssFloat");
    try {
      if (e.style[t])
        return e.style[t];
      var n = window.getComputedStyle(e);
      return n ? n[t] : null;
    } catch {
      return e.style[t];
    }
  }
}, Vo = function() {
  var e = Ss.viewportWindow || window, t = e.document.documentElement, n = e.document.body;
  return {
    scrollTop: t.scrollTop || n.scrollTop,
    scrollLeft: t.scrollLeft || n.scrollLeft,
    visibleHeight: t.clientHeight || n.clientHeight,
    visibleWidth: t.clientWidth || n.clientWidth
  };
}, ei = function(e) {
  if (_r)
    return !1;
  if (e) {
    var t = getComputedStyle(e);
    if (t.getPropertyValue("position") === "fixed") {
      if (t.getPropertyValue("display") === "none")
        return !0;
      if (e.parentNode !== document.body)
        return ei(e.parentNode);
    } else
      return e.offsetParent === null;
  }
  return !1;
}, ti = typeof window > "u", Gn = {}, bn = {
  leave: "v-modal-leave",
  enter: "v-modal-enter",
  modal: "v-modal"
}, am = function(e, t) {
  for (var n = e.length - 1; n >= 0; n--)
    if (e[n].id === t) {
      e.splice(n, 1);
      break;
    }
}, Pr, Z = {
  step: 2,
  zIndex: 2e3,
  globalScroll: !1,
  // 是否打开全局滚动监听
  modalFade: !0,
  modalStack: [],
  modalDom: null,
  // 当前model挂载的div.
  hasModal: !1,
  // 当前是否有Modal
  popLockClass: "popup-parent--hidden",
  oldBodyBorder: "",
  viewportWindow: null,
  fixBodyBorder: function() {
    var e = window.innerWidth - document.documentElement.clientWidth;
    e && (this.oldBodyBorder = document.documentElement.style.borderRight, document.body.style.borderRight = "".concat(e, "px solid transparent"));
  },
  resetBodyBorder: function() {
    document.body.style.borderRight = this.oldBodyBorder, this.oldBodyBorder = "";
  },
  /** 全局反注册 */
  deregister: function(e) {
    e && (Gn[e] = null, delete Gn[e]);
  },
  /** 返回全局实例 */
  getInstance: function(e) {
    return Gn[e];
  },
  /** 全局注册   仅vue-popup.ts中使用，instance就是vm, 把vm注册到 vm._popupId 这个键值上 */
  register: function(e, t) {
    e && t && (Gn[e] = t);
  },
  nextZIndex: function() {
    var e = Z.zIndex;
    return Z.zIndex += Z.step, e;
  },
  /** 打开遮罩层， 仅vue-popup.ts中使用。 dom = vm.$el 或者 undefined (appendtoBody时)  */
  openModal: function(e, t, n, r, i) {
    if (!ti && !(!e || t === void 0)) {
      this.modalFade = i;
      for (var a = 0, s = this.modalStack.length; a < s; a++) {
        var l = this.modalStack[a];
        if (l.id === e)
          return;
      }
      var u = Pr();
      if (ve(u, bn.modal), this.modalFade && !Z.hasModal && ve(u, bn.enter), r) {
        var c = r.trim().split(/\s+/);
        c.forEach(function(p) {
          return ve(u, p);
        });
      }
      setTimeout(function() {
        ge(u, bn.enter);
      }, 200), t && (u.style.zIndex = t.toString()), u.style.display = "", u.tabIndex = 0;
      var d;
      n && n.parentNode && n.parentNode.nodeType !== 11 ? d = n.parentNode : d = document.body, d.appendChild(u), this.modalStack.push({
        id: e,
        zIndex: t,
        modalClass: r
      });
    }
  },
  /** 点击背景遮罩层时，调用栈顶的popup，调用它的close() */
  doOnModalClick: function() {
    var e = Z.modalStack, t = e[e.length - 1];
    if (t) {
      var n = Z.getInstance(t.id);
      n && n.closeOnClickModal && typeof n.close == "function" && n.close();
    }
  },
  closeModal: function(e) {
    var t = this.modalStack, n = Pr();
    if (t.length > 0) {
      var r = t[t.length - 1];
      if (r.id === e) {
        if (r.modalClass) {
          var i = r.modalClass.trim().split(/\s+/);
          i.forEach(function(s) {
            return ge(n, s);
          });
        }
        t.pop();
        var a = t.length;
        a > 0 && (n.style.zIndex = t[a - 1].zIndex.toString());
      } else
        am(t, e);
    }
    t.length === 0 && (this.modalFade && ve(n, bn.leave), ge(document.body, this.popLockClass), this.resetBodyBorder(), setTimeout(function() {
      t.length === 0 && (n.parentNode && n.parentNode.removeChild(n), n.style.display = "none", Z.modalDom = null), ge(n, bn.leave);
    }, 200));
  }
};
Pr = function() {
  if (ti)
    return null;
  var e = Z.modalDom;
  return e ? Z.hasModal = !0 : (Z.hasModal = !1, e = document.createElement("div"), Z.modalDom = e, e.addEventListener("touchmove", function(t) {
    t.preventDefault(), t.stopPropagation();
  }, {
    passive: !0
  }), N(e, "click", function() {
    Z.doOnModalClick();
  })), e;
};
ti || N(window, "keydown", function(o) {
  if (o.keyCode === ie.Escape) {
    var e = Z.modalStack;
    if (e.length > 0) {
      var t = e[e.length - 1];
      if (!t)
        return;
      var n = Z.getInstance(t.id);
      n && n.closeOnPressEscape && (n.handleClose ? n.handleClose("esc") : n.handleAction ? n.handleAction("cancel") : n.close());
    }
  }
});
var sm = ["left", "right", "top", "bottom"], ws = ["shift", "offset", "preventOverflow", "keepTogether", "arrow", "flip", "applyStyle"], lm = {
  arrowOffset: 0,
  arrowElement: "[x-arrow]",
  boundariesElement: "viewport",
  boundariesPadding: 5,
  flipBehavior: "flip",
  // 全局没有修改过它，所以它一直是flip
  forceAbsolute: !1,
  gpuAcceleration: !0,
  offset: 0,
  placement: "bottom",
  preventOverflowOrder: sm,
  modifiers: ws,
  // 此处是string数组， 构造函数调用之后转为函数数组
  updateHiddenPopperOnScroll: !1
  // 滚动过程中是否更新隐藏的弹出层位置
}, So = function(e, t) {
  var n = function(i) {
    return i !== "" && !isNaN(parseFloat(i)) && isFinite(i);
  };
  Object.keys(t).forEach(function(r) {
    var i = "";
    ~["width", "height", "top", "right", "bottom", "left"].indexOf(r) && n(t[r]) && (i = "px"), e.style[r] = t[r] + i;
  });
}, qo = function(e) {
  var t = e.offsetParent;
  return t === window.document.body || !t ? window.document.documentElement : t;
}, In = function(e, t) {
  if (!(!e || e.nodeType !== 1)) {
    var n = window.getComputedStyle(e, null);
    return n[t];
  }
}, Ts = function(e) {
  return e === window.document.body ? !1 : In(e, "position") === "fixed" ? !0 : e.parentNode ? Ts(e.parentNode) : !1;
}, Mr = function(e) {
  var t = e.getBoundingClientRect();
  return {
    left: t.left,
    top: t.top,
    right: t.right,
    bottom: t.bottom,
    width: t.right - t.left,
    height: t.bottom - t.top
  };
}, Cs = function(e) {
  var t = ["scroll", "auto"];
  return t.includes(In(e, "overflow")) || t.includes(In(e, "overflow-x")) || t.includes(In(e, "overflow-y"));
}, um = function(e) {
  var t = document.createElement("div");
  So(t, {
    opacity: 0,
    position: "fixed",
    width: 1,
    height: 1,
    top: 0,
    left: 0,
    "z-index": "-99"
  }), e.appendChild(t);
  var n = Mr(t);
  return e.removeChild(t), n;
}, wo = function(e) {
  var t = e.parentNode;
  return t ? t === window.document ? window.document.body.scrollTop || window.document.body.scrollLeft ? window.document.body : window.document.documentElement : Cs(t) ? t : wo(t) : e;
}, cm = function(e, t, n, r) {
  var i = Mr(e), a = i.top, s = i.left, l = i.width, u = i.height;
  if (n) {
    if (r.parentElement) {
      var c = um(r.parentElement), d = c.top, p = c.left;
      a -= d, s -= p;
    }
    return {
      top: a,
      left: s,
      bottom: a + u,
      right: s + l,
      width: l,
      height: u
    };
  }
  var f = Mr(t), m = {
    top: a - f.top,
    left: s - f.left,
    bottom: a - f.top + u,
    right: s - f.left + l,
    width: l,
    height: u
  };
  return m;
}, dm = function(e) {
  return e === document.body ? Math.max(document.documentElement.scrollTop, document.body.scrollTop) : e.scrollTop;
}, pm = function(e) {
  return e === document.body ? Math.max(document.documentElement.scrollLeft, document.body.scrollLeft) : e.scrollLeft;
}, fm = function(e, t) {
  var n = Math.max(e.scrollHeight, e.offsetHeight, t.clientHeight, t.scrollHeight, t.offsetHeight), r = Math.max(e.scrollWidth, e.offsetWidth, t.clientWidth, t.scrollWidth, t.offsetWidth);
  return {
    width: r,
    height: n
  };
}, _o = function(e) {
  var t = e.style.display, n = e.style.visibility;
  e.style.display = "block", e.style.visibility = "hidden";
  var r = window.getComputedStyle(e), i = parseFloat(r.marginTop) + parseFloat(r.marginBottom), a = parseFloat(r.marginLeft) + parseFloat(r.marginRight), s = {
    width: e.offsetWidth + a,
    height: e.offsetHeight + i
  };
  return e.style.display = t, e.style.visibility = n, s;
}, Fi = function(e) {
  var t = {
    left: "right",
    right: "left",
    bottom: "top",
    top: "bottom"
  };
  return e.replace(/left|right|bottom|top/g, function(n) {
    return t[n];
  });
}, Sn = function(e) {
  var t = C({}, e);
  return t.right = t.left + t.width, t.bottom = t.top + t.height, t;
}, Is = function(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], n = e.parentNode;
  return n ? (Cs(n) && t.push(n), In(n, "position") === "fixed" ? t : Is(n, t)) : t;
}, Ri = function(e) {
  var t = {
    width: e.offsetWidth,
    height: e.offsetHeight,
    left: e.offsetLeft,
    top: e.offsetTop,
    right: 0,
    bottom: 0
  };
  return t.right = t.left + t.width, t.bottom = t.top + t.height, t;
}, Vi = function(e) {
  e.stopPropagation();
}, Or;
_r || (Or = new ResizeObserver(function(o) {
  o.forEach(function(e) {
    e.target.popperVm && e.contentRect.height > 50 && e.target.popperVm.update();
  });
}));
var mm = /* @__PURE__ */ function() {
  function o(e, t, n) {
    var r = this;
    xn(this, o), this.modifiers = {}, this.popperOuterSize = null, this._reference = e, this._popper = t, this.state = {}, this._options = C(C({}, lm), n), this._options.modifierFns = ws.map(function(i) {
      return r[i];
    }), this._popper.setAttribute("x-placement", this._options.placement), this.state.position = this._getPopperPositionByRefernce(this._reference), So(this._popper, {
      position: this.state.position,
      top: 0
    }), this._popper && (this._popper.popperVm = this, Or && Or.observe(this._popper)), this.update(), this._setupEventListeners();
  }
  return Pn(o, [{
    key: "destroy",
    value: function() {
      return this._popper.removeAttribute("x-placement"), this._popper.style.display = "none", this._removeEventListeners(), this._options.removeOnDestroy && this._popper.remove(), this;
    }
  }, {
    key: "onUpdate",
    value: function(t) {
      return this.state.updateCallback = t, this;
    }
  }, {
    key: "update",
    value: function() {
      var t = {
        instance: this,
        styles: {}
      };
      this.stopEventBubble(), this.popperOuterSize = null, t.placement = t._originalPlacement = this._options.placement, t.offsets = this._getRefPopOffsets(this._popper, this._reference, t.placement), t.boundaries = this._getBoundaries(t, this._options.boundariesPadding, this._options.boundariesElement), t = this.runModifiers(t, this._options.modifierFns), typeof this.state.updateCallback == "function" && this.state.updateCallback(t);
    }
    // 阻止popper的mousewheel等事件冒泡。 通过 onxxx 绑定，是为了避免重复绑定事件
  }, {
    key: "stopEventBubble",
    value: function() {
      this._popper && (this._popper.onmousewheel || (this._popper.onmousewheel = Vi), this._popper.onwheel || (this._popper.onwheel = Vi));
    }
    /** 按顺序执行Modifiers， 如果传入终点modifier,则执行到指定位置 */
  }, {
    key: "runModifiers",
    value: function(t, n, r) {
      var i = this, a = n.slice(), s = this._options;
      return r !== void 0 && (a = this._options.modifierFns.slice(0, s.modifierFns.findIndex(function(l) {
        return l === r;
      }))), a.forEach(function(l) {
        Pe(l) === "function" && (t = l.call(i, t));
      }), t;
    }
    // 此时才把offsets.popper 赋值给popper dom,  offsets.array赋值给array dom
  }, {
    key: "applyStyle",
    value: function(t) {
      var n = {
        position: t.offsets.popper.position
      }, r = Math.round(t.offsets.popper.left), i = Math.round(t.offsets.popper.top);
      return this._options.gpuAcceleration ? (n.transform = "translate3d(".concat(r, "px, ").concat(i, "px, 0)"), Object.assign(n, {
        top: 0,
        left: 0
      })) : Object.assign(n, {
        top: i,
        left: r
      }), Object.assign(n, t.styles), So(this._popper, n), this._popper.setAttribute("x-placement", t.placement), t.offsets.arrow && So(t.arrowElement, t.offsets.arrow), t;
    }
    // 判断 placement是不是2段式的，是则处理一下偏移。 修改data.offsets.popper的值
  }, {
    key: "shift",
    value: function(t) {
      var n = t.placement, r = n.split("-")[0], i = n.split("-")[1];
      if (i) {
        var a = t.offsets.reference, s = a.top, l = a.left, u = a.height, c = a.width, d = Sn(t.offsets.popper), p = {
          y: {
            start: {
              top: s
            },
            end: {
              top: s + u - d.height
            }
          },
          x: {
            start: {
              left: l
            },
            end: {
              left: l + c - d.width
            }
          }
        }, f = ~["bottom", "top"].indexOf(r) ? "x" : "y";
        t.offsets.popper = Object.assign(d, p[f][i]);
      }
      return t;
    }
    // 校正popper的位置在boundaries 的内部
  }, {
    key: "preventOverflow",
    value: function(t) {
      if (this._options.ignoreBoundaries)
        return t;
      var n = this._options.preventOverflowOrder, r = Sn(t.offsets.popper), i = {
        top: function() {
          var s = r.top;
          return s < t.boundaries.top && (s = Math.max(s, t.boundaries.top)), {
            top: s
          };
        },
        right: function() {
          var s = r.left;
          return r.right > t.boundaries.right && (s = Math.min(s, t.boundaries.right - r.width)), {
            left: s
          };
        },
        bottom: function() {
          var s = r.top;
          return r.bottom > t.boundaries.bottom && (s = Math.min(s, t.boundaries.bottom - r.height)), {
            top: s
          };
        },
        left: function() {
          var s = r.left;
          return r.left < t.boundaries.left && (s = Math.max(s, t.boundaries.left)), {
            left: s
          };
        }
      };
      return n.forEach(function(a) {
        t.offsets.popper = Object.assign(r, i[a]());
      }), t;
    }
    // 校正popper的位置在reference的边上。 如果2个分离了，重新调整popper的位置。 可能是担心 modifiers.offset 带来的副作用吧
  }, {
    key: "keepTogether",
    value: function(t) {
      var n = Sn(t.offsets.popper), r = t.offsets.reference;
      return n.right < Math.floor(r.left) && (t.offsets.popper.left = Math.floor(r.left) - n.width), n.left > Math.floor(r.right) && (t.offsets.popper.left = Math.floor(r.right)), n.bottom < Math.floor(r.top) && (t.offsets.popper.top = Math.floor(r.top) - n.height), n.top > Math.floor(r.bottom) && (t.offsets.popper.top = Math.floor(r.bottom)), t;
    }
    // 根据flip的策略，计算当前应该显示的位置。 空间不够要计算出flip的位置。 可能是担心preventOverflow 时，造成pop, reference会重叠。 重叠了就要flip一下
  }, {
    key: "flip",
    value: function(t) {
      var n = this;
      if (t.flipped && t.placement === t._originalPlacement)
        return t;
      var r = t.placement.split("-"), i = r[0], a = Fi(i), s = r[1] || "", l = [i, a];
      return l.forEach(function(u, c) {
        if (!(i !== u || l.length === c + 1)) {
          i = t.placement.split("-")[0], a = Fi(i);
          var d = Sn(t.offsets.popper), p = ~["right", "bottom"].indexOf(i), f = Math.floor(t.offsets.reference[i]), m = Math.floor(d[a]);
          (p && f > m || !p && f < m) && (t.flipped = !0, t.placement = l[c + 1], s && (t.placement += "-".concat(s)), t.offsets.popper = n._getRefPopOffsets(n._popper, n._reference, t.placement).popper, t = n.runModifiers(t, n._options.modifierFns, n.flip));
        }
      }), t;
    }
    // 根据入参option上的offset, 给data.offset.popper进行校正
  }, {
    key: "offset",
    value: function(t) {
      var n = this._options.offset, r = t.offsets.popper;
      return ~t.placement.indexOf("left") ? r.top -= n : ~t.placement.indexOf("right") ? r.top += n : ~t.placement.indexOf("top") ? r.left -= n : ~t.placement.indexOf("bottom") && (r.left += n), t;
    }
    // 计算arrow的位置,保存在data.offsets.arrow ={top,left}
  }, {
    key: "arrow",
    value: function(t) {
      var n = this._options.arrowElement, r = this._options.arrowOffset;
      if (typeof n == "string" && (n = this._popper.querySelector(n)), !n || !this._popper.contains(n))
        return t;
      var i = {}, a = t.placement.split("-")[0], s = Sn(t.offsets.popper), l = t.offsets.reference, u = ~["left", "right"].indexOf(a), c = u ? "height" : "width", d = u ? "bottom" : "right", p = u ? "left" : "top", f = u ? "top" : "left", m = this.popperOuterSize ? this.popperOuterSize : this.popperOuterSize = _o(this._popper), h = _o(n), v = h[c];
      l[d] - v < s[f] && (t.offsets.popper[f] -= s[f] - (l[d] - v)), l[f] + v > s[d] && (t.offsets.popper[f] += l[f] + v - s[d]);
      var g = l[f] + (r || l[c] / 2 - v / 2), b = g - s[f];
      b = Math.max(Math.min(s[c] - v - 8, b), 8), i[f] = b, i[p] = "";
      var y = this._options.placement.split("-");
      return this._options.adjustArrow && ~["top", "bottom"].indexOf(y[0]) && f === "left" && (y[1] === "start" ? i.left = 8 : y[1] || (i.left = (m.width - h.width) / 2)), t.offsets.arrow = i, t.arrowElement = n, t;
    }
    /** 判断 reference 的 offsetParent 元素是fix还是abs, 这个值会赋值给popper 的dom */
  }, {
    key: "_getPopperPositionByRefernce",
    value: function(t) {
      if (this._options.forceAbsolute)
        return "absolute";
      var n = Ts(t);
      return n ? "fixed" : "absolute";
    }
    /** 实时计算一下popper, reference的 位置信息， 用于 */
  }, {
    key: "_getRefPopOffsets",
    value: function(t, n, r) {
      r = r.split("-")[0];
      var i = {
        position: this.state.position
      }, a = i.position === "fixed", s = cm(n, qo(t), a, t), l = this.popperOuterSize ? this.popperOuterSize : this.popperOuterSize = _o(t), u = l.width, c = l.height;
      return ~["right", "left"].indexOf(r) ? (i.top = s.top + s.height / 2 - c / 2, r === "left" ? i.left = s.left - u : i.left = s.right) : (i.left = s.left + s.width / 2 - u / 2, r === "top" ? i.top = s.top - c : i.top = s.bottom), i.width = u, i.height = c, {
        popper: i,
        reference: s
      };
    }
  }, {
    key: "_setupEventListeners",
    value: function() {
      var t = this;
      if (this.state.updateBoundFn = this.update.bind(this), this.state.scrollUpdate = function() {
        if (t._options.updateHiddenPopperOnScroll)
          t.state.updateBoundFn();
        else {
          if (ei(t._reference))
            return;
          t.state.updateBoundFn();
        }
      }, N(window, "resize", this.state.updateBoundFn), this._options.boundariesElement !== "window") {
        var n, r, i, a = this._options.scrollParent || wo(this._reference), s = [];
        if ((n = a) !== null && n !== void 0 && (r = n.dataset) !== null && r !== void 0 && (i = r.tag) !== null && i !== void 0 && i.includes("-form")) {
          s.push(a);
          var l = wo(a);
          (l === window.document.body || l === window.document.documentElement) && (l = window), s.push(l);
        }
        if ((a === window.document.body || a === window.document.documentElement) && (a = window), this.state.scrollTarget = a, this._options.bubbling || Z.globalScroll) {
          var u = Is(this._reference);
          this.state.scrollTargets = u || [], u.forEach(function(c) {
            N(c, "scroll", t.state.scrollUpdate);
          });
        } else
          s.length ? (this.state.scrollTargets = s, s.forEach(function(c) {
            N(c, "scroll", t.state.scrollUpdate);
          })) : N(a, "scroll", this.state.scrollUpdate);
      }
    }
  }, {
    key: "_removeEventListeners",
    value: function() {
      var t = this;
      if (U(window, "resize", this.state.updateBoundFn), this._options.boundariesElement !== "window" && this.state.scrollTarget && (U(this.state.scrollTarget, "scroll", this.state.scrollUpdate), this.state.scrollTarget = null, this._options.bubbling || Z.globalScroll)) {
        var n = this.state.scrollTargets || [];
        n.forEach(function(r) {
          U(r, "scroll", t.state.scrollUpdate);
        }), this.state.scrollTargets = null;
      }
      this.state.updateBoundFn = null, this.state.scrollUpdate = null;
    }
    /** 实时计算一下Boundary的位置 */
  }, {
    key: "_getBoundaries",
    value: function(t, n, r) {
      var i = {
        right: 0,
        left: 0,
        top: 0,
        bottom: 0
      };
      if (r === "window" || r === "body") {
        var a = window.document.body, s = window.document.documentElement, l = fm(a, s), u = l.width, c = l.height;
        i = {
          top: 0,
          right: u,
          bottom: c,
          left: 0
        };
      } else if (r === "viewport") {
        var d = qo(this._popper), p = wo(this._popper), f = Ri(d), m = t.offsets.popper.position === "fixed", h = m || !this._options.appendToBody && ["right", "left"].includes(this._options.placement), v = h ? 0 : dm(p), g = h ? 0 : pm(p), b = Ss.viewportWindow || Z.viewportWindow || window;
        i = {
          top: 0 - (f.top - v),
          right: b.document.documentElement.clientWidth - (f.left - g),
          bottom: b.document.documentElement.clientHeight - (f.top - v),
          left: 0 - (f.left - g)
        };
      } else if (qo(this._popper) === r) {
        var y = r.clientWidth, S = r.clientHeight;
        i = {
          right: y,
          bottom: S,
          top: 0,
          left: 0
        };
      } else
        i = Ri(r);
      return i.right -= n, i.left += n, i.bottom = i.bottom - n, i.top = i.top + n, i;
    }
  }]);
}();
const vm = mm;
var Ui = function(e) {
  return e.stopPropagation();
}, hm = typeof window > "u", Hi = function(e) {
  var t = e.state, n = e.props, r = e.vm, i = e.slots, a = t.referenceElm || n.reference || r.$refs.reference && r.$refs.reference.$el || r.$refs.reference;
  return !a && i.reference && i.reference()[0] && (t.referenceElm = i.reference()[0].elm || i.reference()[0].el, a = t.referenceElm), a;
}, gm = function(e) {
  if (!(!e || !e.nodeType)) {
    var t = function(a) {
      return parseInt(window.getComputedStyle(a).zIndex, 10) || 0;
    }, n = t(e), r;
    do {
      if (e = e.parentNode, e)
        r = t(e);
      else
        break;
      n = r > n ? r : n;
    } while (e !== document.body);
    return n + 1 + "";
  }
};
const ni = function(o) {
  var e = o.parent, t = o.emit, n = o.nextTick, r = o.onBeforeUnmount, i = o.onDeactivated, a = o.props, s = o.watch, l = o.reactive, u = o.vm, c = o.slots, d = o.toRefs, p = o.popperVmRef, f = l({
    popperJS: null,
    appended: !1,
    // arrow 是否添加
    popperElm: null,
    showPopper: a.manual ? !!a.modelValue : !1,
    referenceElm: null,
    currentPlacement: ""
  }), m = function(k) {
    if (!f.appended) {
      f.appended = !0;
      var E = document.createElement("div");
      E.setAttribute("x-arrow", ""), E.className = "popper__arrow", k.appendChild(E);
    }
  }, h = function(k) {
    var E = (a == null ? void 0 : a.popperOptions) || {}, L = E.followReferenceHide, V = L === void 0 ? !0 : L, Y = k._popper, X = k._reference;
    V && ei(X) && (Y.style.display = "none");
  }, v = function(k) {
    return a.zIndex === "relative" ? gm(k) : Z.nextZIndex();
  }, g = function(k) {
    if (!hm && (f.currentPlacement = f.currentPlacement || a.placement, !!/^(top|bottom|left|right)(-start|-end)?$/g.test(f.currentPlacement))) {
      var E = a.popperOptions || {
        gpuAcceleration: !1
      };
      f.popperElm = f.popperElm || a.popper || u.$refs.popper || p.popper || k;
      var L = f.popperElm, V = Hi({
        state: f,
        props: a,
        vm: u,
        slots: c
      });
      !L || !V || V.nodeType !== Node.ELEMENT_NODE || (a.visibleArrow && m(L), a.appendToBody || a.popperAppendToBody ? document.body.appendChild(f.popperElm) : (e && e.$el && e.$el.appendChild(f.popperElm), E.forceAbsolute = !0), E.placement = f.currentPlacement, E.offset = a.offset || 0, E.arrowOffset = a.arrowOffset || 0, E.adjustArrow = a.adjustArrow || !1, E.appendToBody = a.appendToBody || a.popperAppendToBody, f.popperJS = new vm(V, L, E), t("created", f), typeof E.onUpdate == "function" && f.popperJS.onUpdate(E.onUpdate), f.popperJS._popper.style.zIndex = v(f.popperJS._reference), h(f.popperJS), N(f.popperElm, "click", Ui));
    }
  }, b = function(k) {
    k && k !== !0 && (f.popperElm = k);
    var E = f.popperJS;
    E ? (E._reference = Hi({
      state: f,
      props: a,
      vm: u,
      slots: c
    }), E.update(), E._popper && k !== !0 && (E._popper.style.zIndex = v(E._reference), h(f.popperJS))) : g(k && k !== !0 ? k : void 0);
  }, y = function(k) {
    !f.popperJS || f.showPopper && !k || (f.popperJS.destroy(), f.popperJS = null);
  }, S = function(k) {
    k && f.popperElm && f.popperElm.parentNode === document.body && (U(f.popperElm, "click", Ui), f.popperElm.remove());
  };
  return s(function() {
    return f.showPopper;
  }, function(I) {
    a.disabled || (I && n(b), a.trigger === "manual" && t("update:modelValue", I));
  }), r(function() {
    n(function() {
      y(!0), (a.appendToBody || a.popperAppendToBody) && S("remove");
    });
  }), i(function() {
    y(!0), (a.appendToBody || a.popperAppendToBody) && S("remove");
  }), C({
    updatePopper: b,
    destroyPopper: S,
    doDestroy: y
  }, d(f));
};
var Am = ["state", "btnClick", "handleEndChange", "handleEndInput", "focus", "handleFocus", "handleStartChange", "handleStartInput", "handleKeydown", "handleClickIcon", "handleMouseEnter", "handleInput", "handleChange", "handleClose", "handlePick", "handleSelectRange", "handleSelectChange", "popperElm", "handleEnterDisplayOnlyContent", "handleEnterPickerlabel", "timeMobileToggle", "timeMobileConfirm", "emitInput", "dateMobileToggle"], ym = function(e) {
  return function(t, n) {
    return e.MonthDay - new Date(t, n - 1, e.MonthDay).getDate();
  };
}, bm = function(e) {
  if (!e)
    return 0;
  for (; isNaN(parseInt(e, 10)); )
    if (e.length > 1)
      e = e.slice(1);
    else
      return 0;
  return parseInt(e, 10);
}, Sm = function(e) {
  var t = e.api, n = e.constants, r = e.props;
  return function(i) {
    var a = i.type, s = i.value, l = r["".concat(a).concat(n.CapDate)], u = l.getFullYear(), c = 1, d = 1, p = 0, f = 0;
    return a === n.Max && (c = n.TotalMonth, d = t.getMonthEndDay(s.getFullYear(), s.getMonth() + 1), p = n.Hours, f = n.Minutes), s.getFullYear() === u && (c = l.getMonth() + 1, s.getMonth() + 1 === c && (d = l.getDate(), s.getDate() === d && (p = l.getHours(), s.getHours() === p && (f = l.getMinutes())))), ne(ne(ne(ne(ne({}, "".concat(a).concat(n.CapYear), u), "".concat(a).concat(n.CapMonth), c), "".concat(a).concat(n.CapDate), d), "".concat(a).concat(n.CapHour), p), "".concat(a).concat(n.CapMinute), f);
  };
}, wm = function(e) {
  var t = e.api, n = e.constants, r = e.props, i = e.refs, a = e.state;
  return function() {
    var s = i.picker && i.picker.getIndexes(), l = function(g) {
      var b = a.originColumns[g].values;
      return bm(b[s[g]]);
    }, u = l(0), c = l(1), d = t.getMonthEndDay(u, c), p;
    r.type === n.YearMonth ? p = 1 : p = l(2), p = p > d ? d : p;
    var f = 0, m = 0;
    r.type === n.DateTime && (f = l(3), m = l(4));
    var h = new Date(u, c - 1, p, f, m);
    a.innerValue = t.formatValue(h);
  };
}, $i = function(e) {
  return function(t) {
    return !Object.prototype.toString.call(t) === "[object Date]" && !isNaN(t.getTime()) && (t = e.minDate), t = Math.max(t, e.minDate.getTime()), t = Math.min(t, e.maxDate.getTime()), new Date(t);
  };
}, Tm = function(e) {
  var t = e.api, n = e.emit, r = e.refs, i = e.nextTick;
  return function() {
    t.updateInnerValue(), i(function() {
      i(function() {
        n("change", r.picker), document.body.style.overflow = "";
      });
    });
  };
}, wn = function(e) {
  for (var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 2, n = String(e); n.length < t; )
    n = "0" + n;
  return n;
}, Cm = function(e) {
  var t = e.constants, n = e.nextTick, r = e.props, i = e.refs, a = e.state;
  return function() {
    var s = a.innerValue, l = r.formatter, u = [l("year", "".concat(s.getFullYear())), l("month", wn(s.getMonth() + 1)), l("day", wn(s.getDate()))];
    r.type === t.DateTime && u.push(l("hour", wn(s.getHours())), l("minute", wn(s.getMinutes()))), r.type === t.YearMonth && (u = u.slice(0, 2)), n(function() {
      i.picker.setValues(u);
    });
  };
}, Im = function(e) {
  var t = e.api, n = e.constants, r = e.props, i = e.state;
  return function() {
    var a = t.getBoundary({
      type: n.Max,
      value: i.innerValue
    }), s = a.maxYear, l = a.maxDate, u = a.maxMonth, c = a.maxHour, d = a.maxMinute, p = t.getBoundary({
      type: n.Min,
      value: i.innerValue
    }), f = p.minYear, m = p.minDate, h = p.minMonth, v = p.minHour, g = p.minMinute, b = [{
      type: n.Year,
      range: [f, s]
    }, {
      type: "month",
      range: [h, u]
    }, {
      type: n.Day,
      range: [m, l]
    }, {
      type: n.Hour,
      range: [v, c]
    }, {
      type: n.Minute,
      range: [g, d]
    }];
    return r.type === n.Date && b.splice(3, 2), r.type === n.YearMonth && b.splice(2, 3), b;
  };
};
function km(o, e) {
  for (var t = -1, n = Array(o); ++t < o; )
    n[t] = e(t);
  return n;
}
var Em = function(e) {
  return function() {
    return e.ranges.map(function(t) {
      var n = t.type, r = t.range, i = km(r[1] - r[0] + 1, function(a) {
        var s = wn(r[0] + a);
        return s;
      });
      return {
        type: n,
        values: i
      };
    });
  };
}, Dm = function(e) {
  var t = e.props, n = e.state;
  return function() {
    return n.originColumns.map(function(r) {
      return {
        values: r.values.map(function(i) {
          return t.formatter(r.type, i);
        })
      };
    });
  };
}, Bm = function(e) {
  var t = e.api, n = e.emit, r = e.state;
  return function() {
    r.visible = !1, n("confirm", r.innerValue), n("update:modelValue", r.innerValue), n("update:visible", r.visible), document.body.style.overflow = "", r.displayValue = t.getDisplayValue(), r.clearable = !1;
  };
}, xm = function(e) {
  var t = e.emit, n = e.state;
  return function() {
    n.visible = !1, t("cancel"), t("update:visible", n.visible), document.body.style.overflow = "";
  };
}, Pm = function(e) {
  var t = e.constants, n = e.DATE, r = e.props, i = e.state;
  return function() {
    var a = function(l, u) {
      var c = {
        "M+": l.getMonth() + 1,
        "d+": l.getDate(),
        "h+": l.getHours(),
        "m+": l.getMinutes(),
        "s+": l.getSeconds(),
        "q+": Math.floor((l.getMonth() + 3) / 3),
        S: l.getMilliseconds()
      };
      /(y+)/.test(u) && (u = u.replace(RegExp.$1, String(l.getFullYear()).substr(4 - RegExp.$1.length)));
      for (var d in c)
        new RegExp("(" + d + ")").test(u) && (u = u.replace(RegExp.$1, RegExp.$1.length == 1 ? c[d] : ("00" + c[d]).substr(String(c[d]).length)));
      return u;
    };
    return a(i.innerValue, r.type === t.DateTime ? n.Datetime : n.Date);
  };
}, Mm = function(e) {
  var t = e.constants, n = e.parent, r = e.refs, i = e.nextTick;
  return function() {
    i(function() {
      n.$emit(t.HookMounted, r.refrence.$el);
    });
  };
}, Om = function(e) {
  var t = e.constants, n = e.state;
  return function() {
    n.visible = !0, document.body.style.overflow = t.Hidden, n.isReadonly = !0;
  };
}, Lm = function(e) {
  return function() {
    e.displayValue = "", e.clearable = !0;
  };
}, Nm = ["state", "clearDisplayValue", "showPickerAndLockScroll", "hookMounted", "onConfirm", "onCancel", "onChange"], Fm = function(e) {
  var t = e.api, n = e.watch, r = e.props, i = e.state, a = e.emit;
  n(function() {
    return r.minDate;
  }, function() {
    return t.updateInnerValue();
  }, {
    lazy: !0
  }), n(function() {
    return r.visible;
  }, function(s) {
    return i.visible = s;
  }, {
    lazy: !0
  }), n(function() {
    return r.maxDate;
  }, function() {
    return t.updateInnerValue();
  }, {
    lazy: !0
  }), n(function() {
    return r.modelValue;
  }, function(s) {
    if (s) {
      var l = t.formatValue(new Date(s));
      l.valueOf() !== i.innerValue.valueOf() && (i.innerValue = l), i.displayValue = t.getDisplayValue();
    }
  }, {
    immediate: !0
  }), n(function() {
    return i.columns;
  }, function() {
    return t.updateColumnValue();
  }, {
    lazy: !0
  }), n(function() {
    return i.innerValue;
  }, function(s) {
    return a("input", s);
  }, {
    lazy: !0
  });
}, Rm = function(e, t, n) {
  var r = t.computed, i = t.onMounted, a = t.reactive, s = t.watch, l = n.constants, u = n.emit, c = n.nextTick, d = n.refs, p = n.parent, f = {
    formatValue: $i(e),
    getMonthEndDay: ym(l),
    hookMounted: Mm({
      constants: l,
      parent: p,
      refs: d,
      nextTick: c
    })
  }, m = a({
    visible: !1,
    innerValue: $i(e)(e.modelValue),
    ranges: r(function() {
      return f.getRanges();
    }),
    originColumns: r(function() {
      return f.getOriginColumns();
    }),
    columns: r(function() {
      return f.getColumns();
    }),
    displayValue: "",
    isReadonly: !1,
    clearable: e.clearable
  });
  return Object.assign(f, {
    state: m,
    getOriginColumns: Em(m),
    onCancel: xm({
      emit: u,
      state: m
    }),
    getColumns: Dm({
      props: e,
      state: m
    }),
    clearDisplayValue: Lm(m),
    getDisplayValue: Pm({
      constants: l,
      DATE: em,
      props: e,
      state: m
    }),
    showPickerAndLockScroll: Om({
      constants: l,
      state: m
    }),
    updateColumnValue: Cm({
      constants: l,
      nextTick: c,
      props: e,
      refs: d,
      state: m
    })
  }), f.getBoundary = Sm({
    api: f,
    constants: l,
    props: e
  }), f.updateInnerValue = wm({
    api: f,
    constants: l,
    props: e,
    refs: d,
    state: m
  }), f.getRanges = Im({
    api: f,
    constants: l,
    props: e,
    state: m
  }), Fm({
    api: f,
    watch: s,
    props: e,
    state: m,
    emit: u
  }), i(function() {
    f.updateColumnValue(), c(function() {
      f.updateInnerValue();
    });
  }), Object.assign(f, {
    onConfirm: Bm({
      api: f,
      emit: u,
      state: m
    }),
    onChange: Tm({
      api: f,
      emit: u,
      refs: d,
      nextTick: c
    })
  });
}, Vm = function(e) {
  return function() {
    return e("update:visible", !1);
  };
}, Um = function(e) {
  return function(t) {
    var n = t.state, r = t.value;
    setTimeout(function() {
      r ? n.toggle = !0 : n.toggle = !1;
    }, 0), e("update:visible", r);
  };
}, Hm = function(e) {
  return function() {
    var t = e.columns, n = t[0] || {};
    return n.children ? "cascade" : n.values ? "object" : "text";
  };
}, $m = function(e) {
  var t = e.state, n = e.api;
  return function() {
    var r = t.columns, i = t.dataType;
    i === "text" ? t.formattedColumns = [{
      values: r
    }] : i === "cascade" ? n.formatCascade() : t.formattedColumns = r;
  };
}, zm = function(e) {
  var t = e.state, n = e.props;
  return function() {
    for (var r = [], i = {
      children: t.columns
    }; i && i.children; ) {
      var a = i.defaultIndex || Number(t.defaultIndex);
      r.push({
        values: i.children.map(function(s) {
          return s[n.valueKey];
        }),
        defaultIndex: a
      }), i = i.children[a];
    }
    t.formattedColumns = r;
  };
}, jm = function(e) {
  return function(t) {
    e.onChange(t);
  };
}, Wm = function(e) {
  return function(t, n) {
    var r = e.getColumn(t);
    r && r.setValue(n);
  };
}, Gm = function(e) {
  return function(t) {
    t.forEach(function(n, r) {
      e.setColumnValue(r, n);
    });
  };
}, Ym = function(e) {
  return function(t) {
    var n = e.getColumn(t);
    return n && n.getValue();
  };
}, Km = function(e) {
  var t = e.api, n = e.childrenPickerRefs;
  return function() {
    var r = n.childrenPicker;
    r && r.forEach(function(i) {
      return i.onTransitionEnd();
    }), t.emitEvent("confirm"), t.visibleHandle();
  };
}, Qm = function(e) {
  var t = e.api, n = e.emit;
  return function() {
    n("cancel"), t.visibleHandle();
  };
}, Xm = function(e) {
  var t = e.api, n = e.state, r = e.emit;
  return function(i) {
    n.dataType === "text" ? r(i, t.getColumnValue(0), t.getColumnIndex(0)) : r(i, t.getValues(), t.getIndexes());
  };
}, Zm = function(e) {
  return function(t) {
    var n = e.childrenPicker;
    return n[t];
  };
}, Jm = function(e) {
  return function(t) {
    return (e.getColumn(t) || {}).state.currentIndex;
  };
}, qm = function(e) {
  return function() {
    return e.childrenPicker && e.childrenPicker.map(function(t) {
      return t.getValue();
    });
  };
}, _m = function(e) {
  return function() {
    return e.childrenPicker && e.childrenPicker.map(function(t) {
      return t.state.currentIndex;
    });
  };
}, ev = function(e) {
  return function(t) {
    t.forEach(function(n, r) {
      e.setColumnIndex(r, n);
    });
  };
}, tv = function(e) {
  return function(t, n) {
    var r = e.getColumn(t);
    r && r.setIndex(n);
  };
}, nv = function(e) {
  return function(t) {
    return (e.childrenPicker[t] || {}).state.columnsItem.values;
  };
}, ov = function(e) {
  return function(t, n) {
    var r = e.childrenPicker, i = r[t];
    i && i.setOptions(n);
  };
}, rv = function(e) {
  var t = e.api, n = e.state, r = e.props;
  return function(i) {
    for (var a = n.columns, s = {
      children: a
    }, l = t.getIndexes(), u = 0; u <= i; u++)
      s = s.children[l[u]];
    for (; i < n.formattedColumns.length; )
      s.children && s.children.length !== 0 ? (i++, t.setColumnValues(i, s.children.map(function(c) {
        return c[r.valueKey];
      })), s = s.children[s.defaultIndex || 0]) : (i++, t.setColumnValues(i, []));
  };
}, iv = function(e) {
  var t = e.api, n = e.state, r = e.emit;
  return function(i) {
    n.dataType === "cascade" && t.onCascadeChange(i), t.dataType === "text" ? r("change", t.getColumnValue(0), t.getColumnIndex(0)) : r("change", t.getValues(), i);
  };
}, av = function(e) {
  for (var t = e.state, n = e.vm, r = e.constants, i = r.CHILDREN_PICKER, a = [], s = 0; s < t.formattedColumns.length; s++)
    a.push(Array.isArray(n.$refs[i + s]) ? n.$refs[i + s][0] : n.$refs[i + s]);
  return a;
}, sv = ["state", "visibleHandle", "watchVisible", "change", "setValues", "getColumnValue", "confirm", "cancel", "getColumnIndex", "getValues", "getIndexes", "setIndexes", "setColumnIndex", "getColumnValues", "setColumnValues", "onChange", "onCascadeChange", "emitEvent", "getColumn", "setColumnValue"], lv = function(e) {
  var t = e.reactive, n = e.computed, r = e.props, i = e.api, a = t({
    columns: r.columns,
    toggle: !1,
    itemHeight: Number(r.itemHeight),
    defaultIndex: r.defaultIndex,
    visibleItemCount: r.visibleItemCount,
    clumnsWrapHeight: null,
    formattedColumns: [],
    dataType: n(function() {
      return i.getDataType();
    })
  });
  return a;
}, uv = function(e) {
  var t = e.api, n = e.props, r = e.state, i = e.emit, a = e.childrenPickerRefs;
  Object.assign(t, {
    state: r,
    getColumn: Zm(a),
    getValues: qm(a),
    getIndexes: _m(a),
    getDataType: Hm(r),
    visibleHandle: Vm(i),
    formatCascade: zm({
      state: r,
      props: n
    }),
    getColumnValues: nv(a),
    setColumnValues: ov(a),
    emitEvent: Xm({
      api: t,
      state: r,
      emit: i
    }),
    change: jm(t),
    onChange: iv({
      api: t,
      state: r,
      emit: i
    }),
    cancel: Qm({
      api: t,
      emit: i
    }),
    confirm: Km({
      api: t,
      childrenPickerRefs: a
    }),
    format: $m({
      state: r,
      api: t
    }),
    setValues: Gm(t),
    setIndexes: ev(t),
    watchVisible: Um(i),
    setColumnIndex: tv(t),
    getColumnValue: Ym(t),
    getColumnIndex: Jm(t),
    setColumnValue: Wm(t),
    onCascadeChange: rv({
      api: t,
      state: r,
      props: n
    })
  });
}, cv = function(e) {
  var t = e.watch, n = e.props, r = e.state, i = e.api;
  t(function() {
    return n.visible;
  }, function(a) {
    i.watchVisible({
      state: r,
      value: a
    });
  }), t(function() {
    return n.columns;
  }, function(a) {
    r.columns = a, i.format();
  });
}, dv = function(e, t, n) {
  var r = t.computed, i = t.onMounted, a = t.reactive, s = t.watch, l = n.emit, u = n.nextTick, c = n.vm, d = n.constants, p = {}, f = {
    childrenPicker: null
  }, m = lv({
    reactive: a,
    computed: r,
    props: e,
    api: p
  });
  return uv({
    api: p,
    props: e,
    state: m,
    emit: l,
    childrenPickerRefs: f
  }), cv({
    watch: s,
    props: e,
    state: m,
    api: p
  }), i(function() {
    u(function() {
      f.childrenPicker = av({
        state: m,
        vm: c,
        constants: d
      });
    }), p.format(), m.clumnsWrapHeight = m.itemHeight * m.visibleItemCount;
  }), p;
}, pv = function(e) {
  return function() {
    var t = {
      transform: "translate3d(0, ".concat(e.offset + e.baseOffset, "px, 0)"),
      transitionDuration: "".concat(e.duration, "ms"),
      transitionProperty: e.duration ? "all" : "none",
      lineHeight: "".concat(e.itemHeight, "px")
    };
    return t;
  };
}, fv = function(e) {
  var t = e.state, n = e.props;
  return function() {
    return t.itemHeight * (n.visibleItemCount - 1) / 2;
  };
}, mv = function(e) {
  var t = e.api, n = e.state;
  return function(r) {
    n.moving || (n.duration = n.defaultDuration, t.setIndex(r, !0));
  };
}, vv = function(e) {
  var t = e.api, n = e.state, r = e.emit;
  return function(i, a) {
    i = t.adjustIndex(i) || 0;
    var s = -i * n.itemHeight, l = function() {
      i !== n.currentIndex && (n.currentIndex = i, a && r("change", i));
    };
    n.moving && s !== n.offset && (n.transitionEndTrigger = l), l(), n.offset = s;
  };
}, Uo = function(e, t, n) {
  return Math.min(Math.max(e, t), n);
}, zi = function(e) {
  return e !== null && R(e) === "object" && e.disabled;
}, hv = function(e) {
  return function(t) {
    t = Uo(t, 0, e.count);
    for (var n = t; n < e.count; n++)
      if (!zi(e.columnsItem.values[n]))
        return n;
    for (var r = t - 1; r >= 0; r--)
      if (!zi(e.columnsItem.values[r]))
        return r;
  };
}, gv = function(e) {
  var t = e.vm, n = e.state;
  return function(r) {
    if (n.direction = "", n.deltaX = 0, n.deltaY = 0, n.offsetX = 0, n.offsetY = 0, n.startX = r.touches[0].clientX, n.startY = r.touches[0].clientY, n.moving) {
      var i = window.getComputedStyle(t.$refs.track), a = i.transform || i.webkitTransform, s = Number(a.slice(7, a.length - 1).split(", ")[5]);
      n.offset = Math.min(0, s - n.baseOffset), n.startOffset = n.offset;
    } else
      n.startOffset = n.offset;
    n.duration = 0, n.transitionEndTrigger = null, n.touchStartTime = Date.now(), n.momentumOffset = n.startOffset;
  };
}, Av = function(e, t) {
  var n = 10;
  return e > t && e > n ? "horizontal" : t > e && t > n ? "vertical" : "";
}, yv = function(e) {
  var t = e.state;
  return function(n) {
    var r = n.touches[0];
    t.deltaX = r.clientX - t.startX, t.deltaY = r.clientY - t.startY, t.offsetX = Math.abs(t.deltaX), t.offsetY = Math.abs(t.deltaY), t.direction = t.direction || Av(t.offsetX, t.offsetY), t.direction === "vertical" && (t.moving = !0), t.offset = Uo(t.startOffset + t.deltaY, -(t.count * t.itemHeight), t.itemHeight);
    var i = Date.now();
    i - t.touchStartTime > t.momentumLimitTime && (t.touchStartTime = i, t.momentumOffset = t.offset);
  };
}, bv = function(e) {
  var t = e.api, n = e.state;
  return function() {
    var r = n.offset - n.momentumOffset, i = Date.now() - n.touchStartTime, a = i < n.momentumLimitTime && Math.abs(r) > n.momentumLimitDistance;
    if (a) {
      t.momentum(r, i);
      return;
    }
    var s = Uo(Math.round(-n.offset / n.itemHeight), 0, n.count - 1);
    n.duration = n.defaultDuration, t.setIndex(s, !0), setTimeout(function() {
      n.moving = !1;
    }, 0);
  };
}, Sv = function(e) {
  var t = e.api, n = e.vm, r = e.state;
  return function() {
    var i = n.$refs.track;
    N(i, "touchstart", t.onTouchstart), N(i, "touchmove", t.onTouchmove), N(i, "touchend", t.onTouchend), r.clumnsWrapHeight = r.itemHeight * r.visibleItemCount, r.maskStyle = {
      backgroundSize: "100% ".concat((r.clumnsWrapHeight - r.itemHeight) / 2, "px")
    };
  };
}, wv = function(e) {
  var t = e.api, n = e.vm;
  return function() {
    var r = n.$refs.track;
    U(r, "touchstart", t.onTouchstart), U(r, "touchmove", t.onTouchmove), U(r, "touchend", t.onTouchend);
  };
}, Tv = function(e) {
  var t = e.api, n = e.state, r = e.props;
  return function(i, a) {
    var s = Math.abs(i / a);
    i = n.offset + s / 2e-3 * (i < 0 ? -1 : 1);
    var l = Uo(Math.round(-i / n.itemHeight), 0, n.count - 1);
    n.duration = Number(r.swipeDuration), t.setIndex(l, !0);
  };
}, Cv = function(e) {
  return function() {
    e.moving = !1, e.duration = 0, e.transitionEndTrigger && (e.transitionEndTrigger(), e.transitionEndTrigger = null);
  };
}, Iv = function(e) {
  var t = e.api, n = e.state;
  return function(r) {
    for (var i = n.columnsItem, a = i.values, s = 0; s < a.length; s++)
      if (t.getOptionText(a[s]) === r)
        return t.setIndex(s);
  };
}, kv = function(e) {
  var t = e.state, n = e.props;
  return function(r) {
    return r !== null && R(r) === "object" && n.valueKey in r ? r[t.valueKey] : r;
  };
}, Ev = function(e) {
  return function() {
    return e.columnsItem.values[e.currentIndex];
  };
}, oi, Dv = function(e, t, n) {
  var r = Object.prototype.hasOwnProperty, i = t[n];
  i != null && (!r.call(e, n) || R(i) !== "object" ? e[n] = i : e[n] = oi(Object(e[n]), t[n]));
};
oi = function(e, t) {
  return Object.keys(t).forEach(function(n) {
    Dv(e, t, n);
  }), e;
};
var ri = function(e) {
  return Array.isArray(e) ? e.map(function(t) {
    return ri(t);
  }) : R(e) === "object" && e !== null ? oi({}, e) : e;
}, Bv = function(e) {
  var t = e.api, n = e.state, r = e.props;
  return function(i) {
    JSON.stringify(i) !== JSON.stringify(n.columnsItem.values) && (n.columnsItem.values = ri(i), t.setIndex(r.defaultIndex));
  };
}, xv = ["state", "onClickItem", "onTransitionEnd", "setValue", "getValue", "setOptions", "setIndex"], Pv = function(e) {
  var t = e.reactive, n = e.computed, r = e.props, i = e.api, a = t({
    columnsItem: r.columnsItem,
    columnsItemArr: r.columnsItem.values,
    currentIndex: r.defaultIndex,
    itemHeight: r.itemHeight,
    visibleItemCount: r.visibleItemCount,
    offset: 0,
    duration: 0,
    startOffset: 0,
    moving: !1,
    defaultDuration: 200,
    momentumLimitTime: 300,
    momentumLimitDistance: 15,
    touchStartTime: null,
    momentumOffset: 0,
    direction: "",
    deltaX: 0,
    deltaY: 0,
    offsetX: 0,
    offsetY: 0,
    count: r.columnsItem.values.length,
    transitionEndTrigger: null,
    clumnsWrapHeight: null,
    maskStyle: null,
    wrapperStyle: n(function() {
      return i.computedWrapperStyle();
    }),
    baseOffset: n(function() {
      return i.computedBaseOffset();
    })
  });
  return a;
}, Mv = function(e) {
  var t = e.api, n = e.props, r = e.state, i = e.vm, a = e.emit;
  Object.assign(t, {
    state: r,
    getValue: Ev(r),
    adjustIndex: hv(r),
    onTouchmove: yv({
      state: r
    }),
    onTouchstart: gv({
      state: r
    }),
    getOptionText: kv({
      state: r,
      props: n
    }),
    onTransitionEnd: Cv(r),
    computedBaseOffset: fv({
      state: r,
      props: n
    }),
    computedWrapperStyle: pv(r),
    setValue: Iv({
      api: t,
      state: r
    }),
    onTouchend: bv({
      api: t,
      state: r
    }),
    setOptions: Bv({
      api: t,
      state: r,
      props: n
    }),
    momentum: Tv({
      api: t,
      state: r,
      props: n
    }),
    setIndex: vv({
      api: t,
      state: r,
      emit: a
    }),
    onClickItem: mv({
      api: t,
      state: r
    }),
    mountedHandler: Sv({
      api: t,
      state: r,
      vm: i
    }),
    beforeUnmountHandler: wv({
      api: t,
      vm: i
    })
  });
}, Ov = function(e) {
  var t = e.watch, n = e.props, r = e.state, i = e.api;
  t(function() {
    return n.defaultIndex;
  }, i.setIndex, {
    immediate: !0
  }), t(function() {
    return n.columnsItem;
  }, function(a) {
    r.columnsItem = a;
  }, {
    immediate: !0
  }), t(function() {
    return n.columnsItem.values;
  }, function(a) {
    r.count = a.length;
  }, {
    immediate: !0
  });
}, Lv = function(e, t, n) {
  var r = t.computed, i = t.onMounted, a = t.reactive, s = t.watch, l = t.onBeforeUnmount, u = n.emit, c = n.vm, d = {}, p = Pv({
    reactive: a,
    computed: r,
    props: e,
    api: d
  });
  return Mv({
    api: d,
    props: e,
    state: p,
    vm: c,
    emit: u
  }), d.setIndex(p.currentIndex), p.columnsItem = ri(e.columnsItem), Ov({
    watch: s,
    props: e,
    state: p,
    api: d
  }), i(d.mountedHandler), l(d.beforeUnmountHandler), d;
};
const Nv = B({
  name: O + "PickerColumn",
  emits: ["change"],
  props: {
    columnsItem: {
      type: Object,
      default: () => ({})
    },
    defaultIndex: Number,
    itemHeight: Number,
    visibleItemCount: Number,
    swipeDuration: Number,
    valueKey: String
  },
  setup(o, e) {
    return z({ props: o, context: e, renderless: Lv, api: xv, mono: !0 });
  }
}), Fv = { class: "tiny-mobile-picker-column" }, Rv = ["onClick"];
function Vv(o, e, t, n, r, i) {
  return A(), w("div", Fv, [
    T(
      "div",
      {
        class: "tiny-mobile-picker-column__mask",
        style: H(o.state.maskStyle)
      },
      null,
      4
      /* STYLE */
    ),
    T(
      "div",
      {
        class: "tiny-mobile-picker-column__indicator",
        style: H({ height: o.itemHeight + "px" })
      },
      null,
      4
      /* STYLE */
    ),
    T(
      "ul",
      {
        class: "tiny-mobile-picker-column__wrapper",
        ref: "track",
        style: H(o.state.wrapperStyle),
        onClick: e[1] || (e[1] = (a) => o.onClickItem(1))
      },
      [
        (A(!0), w(
          q,
          null,
          ae(o.state.columnsItem.values, (a, s) => (A(), w("li", {
            class: P({
              "tiny-mobile-picker-column__item": !0,
              "is-select": s === o.state.currentIndex
            }),
            key: s,
            onClick: te((l) => o.onClickItem(s), ["stop"]),
            style: H({ height: o.itemHeight + "px", lineHeight: o.itemHeight + "px" }),
            onTransitionend: e[0] || (e[0] = (...l) => o.onTransitionEnd && o.onTransitionEnd(...l))
          }, M(a), 47, Rv))),
          128
          /* KEYED_FRAGMENT */
        ))
      ],
      4
      /* STYLE */
    )
  ]);
}
const qe = /* @__PURE__ */ W(Nv, [["render", Vv]]);
const Uv = "3.20.0";
qe.install = function(o) {
  o.component(qe.name, qe);
};
qe.version = Uv;
const Hv = {
  CHILDREN_PICKER: "childrenPicker"
}, $v = /* @__PURE__ */ B({
  name: O + "MiniPicker",
  components: {
    PickerColumn: qe
  },
  props: {
    _constants: {
      type: Object,
      default: () => Hv
    },
    columns: {
      type: Array,
      default: () => []
    },
    visible: {
      type: Boolean,
      default: !1
    },
    title: {
      type: String,
      default: ""
    },
    confirmButtonText: {
      type: String,
      default: () => Wt("ui.miniPicker.confirm")
    },
    cancelButtonText: {
      type: String,
      default: () => Wt("ui.miniPicker.cancel")
    },
    defaultIndex: {
      type: Number,
      default: 0
    },
    valueKey: {
      type: String,
      default: "text"
    },
    itemHeight: {
      type: Number,
      default: 34
    },
    visibleItemCount: {
      type: Number,
      default: 5
    },
    swipeDuration: {
      type: Number,
      default: 1e3
    }
  },
  setup(o, e) {
    return z({
      props: o,
      context: e,
      renderless: dv,
      api: sv,
      mono: !0
    });
  }
}), zv = /* @__PURE__ */ T(
  "div",
  { class: "tiny-mobile-mini-picker__mask" },
  null,
  -1
  /* HOISTED */
), jv = { class: "tiny-mobile-mini-picker__toolbar" }, Wv = { class: "picker_action picker_title" };
function Gv(o, e, t, n, r, i) {
  const a = $("picker-column");
  return oe((A(), w(
    "div",
    {
      class: "tiny-mobile-mini-picker",
      onClick: e[2] || (e[2] = (...s) => o.visibleHandle && o.visibleHandle(...s))
    },
    [
      zv,
      T(
        "div",
        {
          class: P(["tiny-mobile-mini-picker__content", o.state.toggle ? "is-toggle" : ""])
        },
        [
          T("div", jv, [
            F(o.$slots, "toolbar", {}, () => [
              T(
                "div",
                {
                  class: "picker_action picker_cancel",
                  onClick: e[0] || (e[0] = (...s) => o.cancel && o.cancel(...s))
                },
                M(o.cancelButtonText),
                1
                /* TEXT */
              ),
              T(
                "div",
                Wv,
                M(o.title),
                1
                /* TEXT */
              ),
              T(
                "div",
                {
                  class: "picker_action picker_confirm",
                  onClick: e[1] || (e[1] = (...s) => o.confirm && o.confirm(...s))
                },
                M(o.confirmButtonText),
                1
                /* TEXT */
              )
            ])
          ]),
          T(
            "div",
            {
              class: "tiny-mobile-mini-picker__columns",
              style: H({ height: o.state.clumnsWrapHeight + "px" })
            },
            [
              (A(!0), w(
                q,
                null,
                ae(o.state.formattedColumns, (s, l) => (A(), G(a, {
                  "columns-item": s,
                  ref_for: !0,
                  ref: "childrenPicker" + l,
                  key: l,
                  "default-index": s.defaultIndex || +o.state.defaultIndex,
                  "item-height": o.itemHeight,
                  "swipe-duration": o.swipeDuration,
                  "value-key": o.valueKey,
                  onChange: (u) => o.change(l),
                  "visible-item-count": o.visibleItemCount
                }, null, 8, ["columns-item", "default-index", "item-height", "swipe-duration", "value-key", "onChange", "visible-item-count"]))),
                128
                /* KEYED_FRAGMENT */
              ))
            ],
            4
            /* STYLE */
          )
        ],
        2
        /* CLASS */
      )
    ],
    512
    /* NEED_PATCH */
  )), [
    [he, o.visible]
  ]);
}
const _e = /* @__PURE__ */ W($v, [["render", Gv]]);
const Yv = "3.20.0";
_e.install = function(o) {
  o.component(_e.name, _e);
};
_e.version = Yv;
var Kv = `
height:0 !important;visibility:hidden !important;overflow:hidden !important;
position:absolute !important;z-index:-1000 !important;top:0 !important;right:0 !important
`, Qv = ["width", "line-height", "padding-top", "padding-bottom", "padding-left", "padding-right", "border-width", "box-sizing", "letter-spacing", "font-family", "font-weight", "font-size", "text-rendering", "text-transform", "text-indent"], Ne = {
  BoxSizing: "box-sizing",
  BorderBox: "border-box",
  ContentBox: "content-box",
  PaddingTop: "padding-top",
  PaddingBottom: "padding-bottom",
  BorderTopWidth: "border-top-width",
  BorderBottomWidth: "border-bottom-width"
}, Xv = typeof window > "u", Zv = function(e) {
  return /([(\uAC00-\uD7AF)|(\u3130-\u318F)])+/gi.test(e);
}, Jv = function(e) {
  return function() {
    if (e.inputDisabled)
      return !1;
    e.boxVisibility = !0;
  };
}, qv = function(e) {
  var t = e.props;
  return function() {
    return {
      textAlign: t.textAlign
    };
  };
}, _v = function() {
  return function(e) {
    var t = window.getComputedStyle(e), n = t.getPropertyValue(Ne.BoxSizing), r = parseFloat(t.getPropertyValue(Ne.PaddingBottom)) + parseFloat(t.getPropertyValue(Ne.PaddingTop)), i = parseFloat(t.getPropertyValue(Ne.BorderBottomWidth)) + parseFloat(t.getPropertyValue(Ne.BorderTopWidth)), a = Qv.map(function(s) {
      return "".concat(s, ":").concat(t.getPropertyValue(s));
    }).join(";");
    return {
      contextStyle: a,
      paddingSize: r,
      borderSize: i,
      boxSizing: n
    };
  };
}, eh = function(e) {
  var t = e.api, n = e.hiddenTextarea, r = e.props, i = e.state, a = e.mode, s = e.constants;
  return function(l) {
    var u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1, c = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
    if (!l)
      return {
        minHeight: "",
        height: ""
      };
    n || (n = document.createElement("textarea"), document.body.appendChild(n));
    var d = t.calculateNodeStyling(l), p = d.paddingSize, f = d.borderSize, m = d.boxSizing, h = d.contextStyle;
    n.setAttribute("style", "".concat(h, ";").concat(Kv)), n.value = l.value || l.placeholder || "";
    var v = n.scrollHeight, g = {};
    a === "mobile" && (v = Math.max(n.scrollHeight, s.TEXTAREA_HEIGHT_MOBILE)), m === Ne.BorderBox ? v = v + f * 2 + p : m === Ne.ContentBox && (v = v - p), n.value = "";
    var b = n.scrollHeight - p;
    if (u !== null) {
      var y = b * u;
      m === Ne.BorderBox && (y = y + p + f), r.size && (y = r.size === "mini" ? y * 0.67 : r.size === "small" ? y : y * 1.17), r.height && (y = r.height), i.isDisplayOnly ? g.minHeight = "0px" : (v = Math.max(y, v), g.minHeight = "".concat(y, "px"));
    }
    if (c !== null) {
      var S = b * c;
      m === Ne.BorderBox && (S += f + p), v = Math.min(S, v);
    }
    return g.height = "".concat(v, "px"), n.parentNode && n.parentNode.removeChild(n), n = null, g;
  };
}, th = function(e) {
  return function() {
    return e.$refs.input || e.$refs.textarea;
  };
}, nh = function(e) {
  return function() {
    return e.getInput().blur();
  };
}, oh = function(e) {
  return function() {
    return e.getInput().focus();
  };
}, rh = function(e) {
  return function() {
    return e.getInput().select();
  };
}, ih = function(e) {
  var t = e.api, n = e.componentName, r = e.eventName, i = e.emit, a = e.props, s = e.state, l = e.vm;
  return function(u) {
    s.focused = !1, i("blur", u), t.isMemoryStorage.value = !1, a.validateEvent && t.dispatch(n, r, [a.modelValue]), a.hoverExpand && (l.$refs.textarea.scrollTop = 0);
  };
}, ah = function(e) {
  var t = e.api, n = e.emit, r = e.state;
  return function(i) {
    r.focused = !0, n("focus", i), t.searchMemory(i.target.value);
  };
}, sh = function(e) {
  var t = e.api, n = e.emit, r = e.nextTick, i = e.state;
  return function(a) {
    i.isComposing || a.target.value !== i.nativeInputValue && (n("update:modelValue", a.target.value), n("input", a), t.searchMemory(a.target.value), r(t.setNativeInputValue));
  };
}, lh = function(e) {
  return function(t) {
    return e("change", t.target.value);
  };
}, uh = function(e) {
  var t = e.api, n = e.parent, r = e.vm, i = e.state, a = e.props;
  return function() {
    if (!Xv) {
      var s = n.autosize, l = n.type;
      if (!(l !== "textarea" || !r.$refs.textarea)) {
        if (a.hoverExpand && !i.enteredTextarea) {
          i.textareaCalcStyle = {
            minHeight: i.textareaHeight,
            height: i.textareaHeight
          };
          return;
        }
        if (!s || i.isDisplayOnly) {
          i.textareaCalcStyle = {
            minHeight: t.calcTextareaHeight(r.$refs.textarea).minHeight
          };
          return;
        }
        var u = s.minRows, c = s.maxRows;
        i.textareaCalcStyle = t.calcTextareaHeight(r.$refs.textarea, u, c);
      }
    }
  };
}, ch = function(e) {
  var t = e.api, n = e.state;
  return function() {
    var r = t.getInput();
    r && r.value !== n.nativeInputValue && (r.value = n.nativeInputValue);
  };
}, dh = function(e) {
  return function() {
    return e.isComposing = !0;
  };
}, ph = function(e) {
  return function(t) {
    var n = t.target.value, r = n[n.length - 1] || "";
    e.isComposing = !Zv(r);
  };
}, fh = function(e) {
  var t = e.api, n = e.state;
  return function(r) {
    n.isComposing && (n.isComposing = !1, t.handleInput(r));
  };
}, mh = function(e) {
  var t = e.vm, n = e.parent;
  return function(r) {
    var i = t.$refs[r] ? [t.$refs[r]] : [];
    if (i.length) {
      for (var a = null, s = 0, l = i.length; s < l; s++)
        if (i[s].parentNode === n.$el) {
          a = i[s];
          break;
        }
      if (a) {
        var u = {
          suffix: "append",
          prefix: "prepend"
        }, c = u[r];
        if (n.$slots[c]) {
          var d = t.$refs[c], p;
          r === "suffix" ? p = "translateX(-".concat(d.offsetWidth, "px) translateY(-50%)") : r === "prefix" && (p = "translate(".concat(d.offsetWidth, "px, -50%)")), a.style.transform = p;
        } else
          a.removeAttribute("style");
      }
    }
  };
}, vh = function(e) {
  return function() {
    e.calcIconOffset("prefix"), e.calcIconOffset("suffix");
  };
}, hh = function(e) {
  return function() {
    e("update:modelValue", ""), e("change", ""), e("clear");
  };
}, gh = function(e) {
  var t = e.api, n = e.nextTick, r = e.state;
  return function() {
    r.passwordVisible = !r.passwordVisible, n(t.focus);
  };
}, Ah = function(e) {
  var t = e.parent, n = e.props, r = e.state;
  return function() {
    return t.$slots.suffix || n.suffixIcon || r.showClear || n.showPassword || r.isWordLimitVisible || r.validateState && r.needStatusIcon || n.mask && r.inputDisabled;
  };
}, yh = function(e) {
  return typeof e == "number" ? String(e).length : (e || "").length;
}, bh = function(e) {
  var t = e.emit, n = e.props, r = e.state;
  return function(i) {
    if (n.isSelect) {
      t("update:modelValue", i), t("change", i);
      var a = n.selectMenu.length && n.selectMenu.filter(function(s) {
        return s.id === i;
      }).shift();
      r.checkedLabel = a ? a.label : "";
    }
  };
}, Sh = function(e) {
  return function() {
    var t = e.getInput();
    return t && t.selectionStart !== t.selectionEnd;
  };
}, wh = function(e) {
  var t = e.state, n = e.props;
  return function(r, i) {
    if (!(i === "textarea" && n.popupMore)) {
      var a = i === "textarea" ? r.target.querySelector(".text-box") : r.target;
      if (t.displayOnlyTooltip = "", !!a) {
        var s = a.scrollWidth > a.offsetWidth || i === "textarea" && a.scrollHeight > a.offsetHeight;
        if (s)
          t.displayOnlyTooltip = n.displayOnlyContent || t.nativeInputValue;
        else {
          var l = !1;
          if (n.mask && t.maskValueVisible) {
            var u = a.textContent, c = window.getComputedStyle(a).font, d = a.getBoundingClientRect(), p = 16 + 15, f = (u == null ? void 0 : u.trim()) || "";
            l = Ff(f, c, d.width - p).o;
          }
          l && (t.displayOnlyTooltip = n.displayOnlyContent || t.nativeInputValue);
        }
      }
    }
  };
}, Th = function(e) {
  var t = e.state, n = e.props;
  return function() {
    for (var r = "", i = n.displayOnlyContent || t.nativeInputValue, a = 0; a < i.length; a++)
      r += "*";
    return r;
  };
}, Ch = function(e) {
  var t = e.state;
  return function() {
    return t.maskValueVisible ? t.nativeInputValue : t.nativeInputValue && t.maskSymbol;
  };
}, Ih = function(e) {
  var t = e.state, n = e.props, r = e.nextTick, i = e.vm;
  return function(a) {
    r(function() {
      var s = i.$refs.input;
      n.mask && t.nativeInputValue && s && (s.value = t.maskValueVisible || !t.inputDisabled ? t.nativeInputValue : t.maskSymbol), a === "mask" && !n.mask && s && (s.value = t.nativeInputValue);
    });
  };
}, kh = function(e) {
  var t = e.api, n = e.state, r = e.props, i = e.nextTick;
  return function() {
    n.isDragging || r.hoverExpand && !n.isDisplayOnly && (n.enteredTextarea = !0, i(t.resizeTextarea));
  };
}, Eh = function(e) {
  var t = e.api, n = e.state, r = e.props, i = e.nextTick, a = e.vm;
  return function() {
    n.isDragging || r.hoverExpand && !n.isDisplayOnly && (n.enteredTextarea = !1, i(function() {
      t.resizeTextarea(), a.$refs.textarea.scrollTop = 0;
    }));
  };
}, Dh = function(e) {
  var t = e.parent, n = e.state, r = e.props;
  return function() {
    var i = r.displayOnlyContent || n.nativeInputValue, a = typeof r.showEmptyValue == "boolean" ? r.showEmptyValue : (t.tinyForm || {}).showEmptyValue;
    return a ? i : i || "-";
  };
}, Bh = function(e) {
  var t = e.state, n = e.vm;
  return function(r) {
    t.timer && clearTimeout(t.timer), t.timer = setTimeout(function() {
      var i = n.$refs && n.$refs.textBox;
      if (i)
        if (r && i.offsetHeight === 0) {
          var a = i.cloneNode(!0);
          a.style.visibility = "hidden", a.style.position = "absolute", a.style.left = "-9999px", document.body.appendChild(a), a.scrollHeight > a.offsetHeight && (t.showMoreBtn = !0), document.body.removeChild(a), a = null;
        } else
          i.scrollHeight > i.offsetHeight ? t.showMoreBtn = !0 : t.showMoreBtn = !1;
    }, 100);
  };
}, xh = function(e) {
  var t = e.state;
  return function() {
    return t.isDragging = !0;
  };
}, Ph = function(e) {
  var t = e.state, n = e.api;
  return function(r) {
    t.isDragging = !1, r && n.handleLeaveTextarea();
  };
}, Mh = function(e) {
  for (var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 5, n = e.length, r = [], i = {}, a = 0, s = 1; s <= t && !(a < 0 || a >= n || (i[e[a]] ? s = s - 1 : (i[e[a]] = !0, r.push(e[a])), s === n)); s++)
    a++;
  return r;
}, ks = function(e, t) {
  if (typeof e == "string")
    try {
      var n = JSON.parse(e);
      return !!(R(n) === "object" && n && (!t || n.constructor === t));
    } catch {
      return !1;
    }
}, Oh = function(e, t) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 5;
  if (typeof t == "string") {
    var r = localStorage.getItem(e), i = ks(r, Array), a = "";
    if (r && i) {
      var s = JSON.parse(localStorage.getItem(e));
      s.unshift(t), s = Mh(s, n), a = JSON.stringify(s);
    } else
      r === null || r === t ? a = JSON.stringify([t]) : a = JSON.stringify([t, r]);
    localStorage.setItem(e, a);
  }
}, Lh = function(e) {
  return function(t) {
    e.name && t !== null && t !== void 0 && t.trim() && Oh(e.name, t, e.memorySpace);
  };
}, Nh = function(e) {
  var t = e.props, n = e.state;
  return function(r) {
    if (t.name) {
      var i = localStorage.getItem(t.name), a = [], s = !0;
      if (ks(i)) {
        var l = JSON.parse(i);
        if (!r)
          a = JSON.parse(i);
        else
          for (var u = 0, c = l.length; u < c; u++)
            l[u].includes(r) && a.push(l[u]);
        a.length === 0 && (s = !1);
      } else
        i === null ? s = !1 : a.push(i);
      n.storageData = a, n.isMemoryStorage = s;
    }
  };
}, Fh = function(e) {
  var t = e.api, n = e.state;
  return function(r) {
    t.getInput().value = r, t.handleInput({
      target: {
        value: r
      }
    }), t.handleChange({
      target: {
        value: r
      }
    }), n.isMemoryStorage = !1;
  };
};
const Rh = function(o) {
  var e = o.api, t = o.props, n = o.reactive, r = o.toRefs, i = n({
    storageData: [],
    isMemoryStorage: !1
  });
  return C(C({}, r(i)), {}, {
    addMemory: Lh(t),
    searchMemory: Nh({
      props: t,
      state: i
    }),
    selectedMemory: Fh({
      api: e,
      state: i
    })
  });
};
var Vh = ["blur", "showBox", "clear", "focus", "state", "select", "getInput", "handleBlur", "handleInput", "handleFocus", "handleChange", "calcIconOffset", "resizeTextarea", "getSuffixVisible", "updateIconOffset", "calcTextareaHeight", "setNativeInputValue", "calculateNodeStyling", "handleCompositionEnd", "handlePasswordVisible", "handleCompositionStart", "handleCompositionUpdate", "addMemory", "searchMemory", "selectedMemory", "storageData", "isMemoryStorage", "hasSelection", "handleEnterDisplayOnlyContent", "hiddenPassword", "inputStyle", "handleEnterTextarea", "handleLeaveTextarea", "handleTextareaMouseDown", "handleTextareaMouseUp"], Uh = function(e) {
  var t = e.reactive, n = e.computed, r = e.mode, i = e.props, a = e.parent, s = e.constants, l = e.api, u = e.vm, c = e.designConfig, d = t({
    mode: r,
    maskSymbol: s.MASKSYMBOL,
    focused: !1,
    hovering: !1,
    isComposing: !1,
    passwordVisible: !1,
    maskValueVisible: !1,
    boxVisibility: !1,
    textareaCalcStyle: {},
    checkedLabel: "",
    enteredTextarea: !1,
    sheetvalue: i.modelValue,
    inputSize: n(function() {
      return i.size || d.formItemSize || (a.tinyForm || {}).size;
    }),
    inputSizeMf: n(function() {
      return i.size || d.formItemSize || (a.tinyForm || {}).size;
    }),
    showClear: n(function() {
      var p;
      return i.clearable && !d.inputDisabled && !i.readonly && d.nativeInputValue && (!(c != null && (p = c.options) !== null && p !== void 0 && p.isCloseIconHide) || d.focused || d.hovering);
    }),
    textareaHeight: u.theme === "saas" ? "28px" : "30px",
    upperLimit: n(function() {
      return a.$attrs.maxlength;
    }),
    textLength: n(function() {
      return yh(i.modelValue);
    }),
    inputExceed: n(function() {
      return d.isWordLimitVisible && d.textLength > d.upperLimit;
    }),
    formItemSize: n(function() {
      return (a.formItem || {}).formItemSize;
    }),
    validateIcon: n(function() {
      return s.VALIDATE_ICON[d.validateState];
    }),
    showWordLimit: n(function() {
      return i.showWordLimit && a.$attrs.maxlength;
    }),
    inputDisabled: n(function() {
      return i.disabled || (a.tinyForm || {}).disabled || d.isDisplayOnly || (a.tinyForm || {}).displayOnly;
    }),
    validateState: n(function() {
      return a.formItem ? a.formItem.validateState : "";
    }),
    inputStyle: n(function() {
      return l.inputStyle();
    }),
    textareaStyle: n(function() {
      return C(C({}, d.textareaCalcStyle), {}, {
        resize: i.resize,
        textAlign: i.textAlign
      });
    }),
    needStatusIcon: n(function() {
      return a.tinyForm ? a.tinyForm.statusIcon : !1;
    }),
    showPwdVisible: n(function() {
      return i.showPassword && !d.inputDisabled && !i.readonly && (!!d.nativeInputValue || d.focused);
    }),
    nativeInputValue: n(function() {
      return i.modelValue === null || i.modelValue === void 0 ? "" : String(i.modelValue);
    }),
    tooltipConfig: n(function() {
      return a.tinyForm ? a.tinyForm.tooltipConfig : {};
    }),
    isWordLimitVisible: n(function() {
      return (i.showWordLimit && a.$attrs.maxlength || i.counter) && (a.type === "text" || a.type === "textarea") && !d.inputDisabled && !i.readonly && !i.showPassword;
    }),
    isDisplayOnly: n(function() {
      return (i.displayOnly || (a.tinyForm || {}).displayOnly) && ["text", "textarea", "password", "number"].includes(i.type);
    }),
    displayOnlyTooltip: "",
    showMoreBtn: !1,
    showDisplayOnlyBox: !1,
    timer: null,
    hiddenPassword: n(function() {
      return l.hiddenPassword();
    }),
    displayedMaskValue: n(function() {
      return l.getDisplayedMaskValue();
    }),
    displayOnlyText: n(function() {
      return l.getDisplayOnlyText();
    }),
    isDragging: !1
  });
  return d;
}, Hh = function(e) {
  var t = e.api, n = e.state, r = e.dispatch, i = e.broadcast, a = e.emit, s = e.vm, l = e.props, u = e.parent, c = e.nextTick;
  Object.assign(t, {
    state: n,
    dispatch: r,
    broadcast: i,
    showBox: Jv(n),
    clear: hh(a),
    getInput: th(s),
    setShowMoreBtn: Bh({
      state: n,
      vm: s
    }),
    handleChange: lh(a),
    watchFormSelect: bh({
      emit: a,
      props: l,
      state: n
    }),
    calcIconOffset: mh({
      vm: s,
      parent: u
    }),
    getSuffixVisible: Ah({
      parent: u,
      props: l,
      state: n
    }),
    calculateNodeStyling: _v(),
    handleCompositionStart: dh(n),
    handleCompositionUpdate: ph(n),
    setInputDomValue: Ih({
      state: n,
      props: l,
      nextTick: c,
      vm: s
    }),
    getDisplayOnlyText: Dh({
      parent: u,
      props: l,
      state: n
    }),
    handleEnterTextarea: kh({
      api: t,
      state: n,
      props: l,
      nextTick: c
    }),
    handleLeaveTextarea: Eh({
      api: t,
      state: n,
      props: l,
      nextTick: c,
      vm: s
    }),
    inputStyle: qv({
      props: l
    }),
    handleTextareaMouseDown: xh({
      state: n
    }),
    handleTextareaMouseUp: Ph({
      state: n,
      api: t
    })
  });
}, $h = function(e) {
  var t = e.storages, n = e.api, r = e.componentName, i = e.props, a = e.emit, s = e.eventName, l = e.nextTick, u = e.parent, c = e.state, d = e.vm, p = e.mode, f = e.constants, m = t.storageData, h = t.isMemoryStorage, v = t.addMemory, g = t.searchMemory, b = t.selectedMemory;
  return Object.assign(n, {
    addMemory: v,
    storageData: m,
    searchMemory: g,
    selectedMemory: b,
    isMemoryStorage: h,
    blur: nh(n),
    focus: oh(n),
    select: rh(n),
    handleBlur: ih({
      api: n,
      componentName: r,
      emit: a,
      eventName: s.blur,
      props: i,
      state: c,
      vm: d
    }),
    handleFocus: ah({
      api: n,
      emit: a,
      state: c
    }),
    handleInput: sh({
      api: n,
      emit: a,
      nextTick: l,
      state: c
    }),
    resizeTextarea: uh({
      api: n,
      parent: u,
      vm: d,
      state: c,
      props: i
    }),
    updateIconOffset: vh(n),
    calcTextareaHeight: eh({
      api: n,
      hiddenTextarea: null,
      props: i,
      state: c,
      mode: p,
      constants: f
    }),
    setNativeInputValue: ch({
      api: n,
      state: c
    }),
    handleCompositionEnd: fh({
      api: n,
      state: c
    }),
    handlePasswordVisible: gh({
      api: n,
      nextTick: l,
      state: c
    }),
    hasSelection: Sh(n),
    handleEnterDisplayOnlyContent: wh({
      state: c,
      props: i
    }),
    hiddenPassword: Th({
      state: c,
      props: i
    }),
    getDisplayedMaskValue: Ch({
      state: c
    })
  });
}, zh = function(e) {
  var t = e.watch, n = e.state, r = e.api, i = e.props, a = e.nextTick, s = e.emit, l = e.componentName, u = e.eventName;
  t(function() {
    return i.modelValue;
  }, function(c) {
    n.mode === "mobile" && (n.sheetvalue = c, s("update:modelValue", c)), a(r.resizeTextarea), i.validateEvent && r.dispatch(l, u.change, [c]), i.type === "textarea" && i.popupMore && n.isDisplayOnly && r.setShowMoreBtn(), r.setInputDomValue();
  }), t(function() {
    return n.maskValueVisible;
  }, r.setInputDomValue), t(function() {
    return n.inputDisabled;
  }, r.setInputDomValue), t(function() {
    return i.mask;
  }, function() {
    r.setInputDomValue("mask");
  }), t(function() {
    return i.size;
  }, function() {
    return a(r.resizeTextarea);
  }, {
    immediate: !0
  }), t(function() {
    return n.nativeInputValue;
  }, function() {
    r.setNativeInputValue();
  }), t(function() {
    return i.type;
  }, function() {
    a(function() {
      r.setNativeInputValue(), r.resizeTextarea(), r.updateIconOffset();
    });
  }), t(function() {
    return n.isDisplayOnly;
  }, function() {
    a(function() {
      r.setNativeInputValue(), r.resizeTextarea(), r.updateIconOffset();
    });
  }), t(function() {
    return n.sheetvalue;
  }, function(c) {
    return r.watchFormSelect(c);
  }, {
    immediate: !0
  });
}, jh = function(e, t, n) {
  var r = t.computed, i = t.onMounted, a = t.onBeforeUnmount, s = t.onUpdated, l = t.reactive, u = t.toRefs, c = t.watch, d = t.inject, p = n.vm, f = n.refs, m = n.parent, h = n.emit, v = n.constants, g = n.nextTick, b = n.broadcast, y = n.dispatch, S = n.mode, I = n.designConfig, k = {}, E = v.COMPONENT_NAME.FormItem, L = {
    change: "form.change",
    blur: "form.blur"
  }, V = Uh({
    reactive: l,
    computed: r,
    mode: S,
    props: e,
    parent: m,
    constants: v,
    api: k,
    vm: p,
    designConfig: I
  });
  Hh({
    api: k,
    state: V,
    dispatch: y,
    broadcast: b,
    emit: h,
    refs: f,
    props: e,
    parent: m,
    vm: p,
    nextTick: g
  });
  var Y = Rh({
    api: k,
    props: e,
    reactive: l,
    toRefs: u
  });
  return m.tinyForm = m.tinyForm || d("form", null), $h({
    api: k,
    storages: Y,
    componentName: E,
    emit: h,
    eventName: L,
    props: e,
    state: V,
    nextTick: g,
    parent: m,
    vm: p,
    mode: S,
    constants: v
  }), zh({
    watch: c,
    state: V,
    api: k,
    props: e,
    nextTick: g,
    emit: h,
    componentName: E,
    eventName: L
  }), i(function() {
    k.setNativeInputValue(), k.resizeTextarea(), k.updateIconOffset(), k.setInputDomValue(), y("Select", "input-mounted", p.$el), y("Tooltip", "tooltip-update", p.$el), e.type === "textarea" && e.popupMore && V.isDisplayOnly && (k.setShowMoreBtn(!0), N(window, "resize", k.setShowMoreBtn));
  }), a(function() {
    e.type === "textarea" && e.popupMore && V.isDisplayOnly && U(window, "resize", k.setShowMoreBtn);
  }), s(function() {
    g(k.updateIconOffset);
  }), k;
};
const Wh = B({
  emits: [
    "update:modelValue",
    "change",
    "clear",
    "focus",
    "blur",
    "keyup",
    "keydown",
    "paste",
    "mouseenter",
    "mouseleave",
    "input"
  ],
  components: {
    IconClose: yt(),
    IconChevronRight: wa(),
    IconEyeopen: Tl(),
    IconEyeclose: Cl(),
    TinyActionSheet: Fe
  },
  props: [
    ...Q,
    "name",
    "selectMenu",
    "ellipsis",
    "contentStyle",
    "labelWidth",
    "tips",
    "isSelect",
    "type",
    "label",
    "modelValue",
    "disabled",
    "readonly",
    "clearable",
    "suffixIcon",
    "prefixIcon",
    "autocomplete",
    "showPassword",
    "validateEvent",
    "showWordLimit",
    "title",
    "counter",
    "autosize",
    "tabindex",
    "width",
    "textAlign",
    "resize"
  ],
  setup(o, e) {
    return z({ props: o, context: e, renderless: jh, api: Vh });
  }
}), Gh = {
  key: 0,
  class: "tiny-mobile-input__title"
}, Yh = {
  key: 1,
  class: "tiny-mobile-input__wrapper"
}, Kh = ["value", "disabled", "name", "aria-label", "tabindex"], Qh = ["name", "tabindex", "type", "disabled", "readonly", "autocomplete", "aria-label"], Xh = {
  key: 1,
  class: "tiny-mobile-input-group__prepend"
}, Zh = {
  key: 2,
  class: "tiny-mobile-input__prefix"
}, Jh = {
  key: 3,
  class: "tiny-mobile-input__suffix"
}, qh = {
  key: 3,
  class: "tiny-mobile-input__count"
}, _h = { class: "tiny-mobile-input__count-inner" }, eg = {
  key: 4,
  class: "tiny-mobile-input-group__append"
}, tg = {
  key: 2,
  class: "tiny-mobile-textarea__wrapper"
}, ng = ["name", "tabindex", "disabled", "readonly", "autocomplete", "aria-label"], og = {
  key: 3,
  class: "tiny-mobile-textarea__count"
}, rg = {
  key: 4,
  class: "tiny-mobile-input__tips"
};
function ig(o, e, t, n, r, i) {
  const a = $("IconChevronRight"), s = $("icon-close"), l = $("tiny-action-sheet");
  return A(), w(
    "div",
    {
      class: P([
        o.type === "textarea" ? "tiny-mobile-textarea" : "tiny-mobile-input",
        o.state.inputSize ? "tiny-mobile-input-" + o.state.inputSize : "",
        {
          "is-focus": o.state.focused,
          "is-disabled": o.state.inputDisabled,
          "is-exceed": o.state.inputExceed,
          "is-showlimit": o.state.isWordLimitVisible && o.type === "textarea",
          "tiny-mobile-input-group": o.slots.prepend || o.slots.append,
          "tiny-mobile-input-group-append": o.slots.append,
          "tiny-mobile-input-group-prepend": o.slots.prepend
        }
      ]),
      style: H(o.$attrs.style),
      onMouseenter: e[23] || (e[23] = (u) => o.state.hovering = !0),
      onMouseleave: e[24] || (e[24] = (u) => o.state.hovering = !1)
    },
    [
      o.slots.title || o.title ? (A(), w("div", Gh, [
        F(o.$slots, "title", {}, () => [
          ue(
            M(o.title),
            1
            /* TEXT */
          )
        ])
      ])) : x("v-if", !0),
      o.type !== "textarea" ? (A(), w("div", Yh, [
        o.isSelect ? (A(), w("div", {
          key: 0,
          class: "tiny-mobile-input__select",
          onClick: e[2] || (e[2] = (...u) => o.showBox && o.showBox(...u))
        }, [
          T("input", Tn({
            type: "text",
            readonly: "",
            class: "tiny-mobile-input__inner"
          }, o.a(o.$attrs, ["size", "class", "style", "^on[A-Z]"]), {
            value: o.state.checkedLabel,
            disabled: o.state.inputDisabled,
            name: o.name,
            "aria-label": o.label,
            style: o.state.inputStyle,
            tabindex: o.tabindex,
            onInput: e[0] || (e[0] = (...u) => o.handleInput && o.handleInput(...u)),
            onChange: e[1] || (e[1] = (...u) => o.handleChange && o.handleChange(...u))
          }), null, 16, Kh),
          T(
            "div",
            {
              class: "tiny-mobile-input__select-icon",
              style: H({
                transform: o.state.boxVisibility ? "rotate(90deg)" : "none"
              })
            },
            [
              D(a)
            ],
            4
            /* STYLE */
          )
        ])) : (A(), w(
          q,
          { key: 1 },
          [
            o.type !== "textarea" ? (A(), w("input", Tn({
              key: 0,
              ref: "input",
              name: o.name
            }, o.a(o.$attrs, ["size", "class", "style", "^on[A-Z]"]), {
              class: "tiny-mobile-input__inner",
              style: o.state.inputStyle,
              tabindex: o.tabindex,
              type: o.showPassword ? o.state.passwordVisible ? "text" : "password" : o.type,
              disabled: o.state.inputDisabled,
              readonly: o.readonly,
              autocomplete: o.autocomplete,
              onCompositionstart: e[3] || (e[3] = (...u) => o.handleCompositionStart && o.handleCompositionStart(...u)),
              onCompositionupdate: e[4] || (e[4] = (...u) => o.handleCompositionUpdate && o.handleCompositionUpdate(...u)),
              onCompositionend: e[5] || (e[5] = (...u) => o.handleCompositionEnd && o.handleCompositionEnd(...u)),
              onInput: e[6] || (e[6] = (...u) => o.handleInput && o.handleInput(...u)),
              onFocus: e[7] || (e[7] = (...u) => o.handleFocus && o.handleFocus(...u)),
              onBlur: e[8] || (e[8] = (...u) => o.handleBlur && o.handleBlur(...u)),
              onChange: e[9] || (e[9] = (...u) => o.handleChange && o.handleChange(...u)),
              "aria-label": o.label
            }), null, 16, Qh)) : x("v-if", !0),
            o.slots.prepend ? (A(), w("div", Xh, [
              T("span", null, [
                F(o.$slots, "prepend")
              ])
            ])) : x("v-if", !0),
            o.slots.prefix || o.prefixIcon ? (A(), w("div", Zh, [
              F(o.$slots, "prefix"),
              o.prefixIcon ? (A(), G(pe(o.prefixIcon), {
                key: 0,
                class: "tiny-mobile-input__icon"
              })) : x("v-if", !0)
            ])) : x("v-if", !0),
            o.getSuffixVisible() ? (A(), w("span", Jh, [
              !o.state.showClear || !o.state.showPwdVisible || !o.state.isWordLimitVisible ? (A(), w(
                q,
                { key: 0 },
                [
                  F(o.$slots, "suffix"),
                  o.suffixIcon ? (A(), G(pe(o.suffixIcon), {
                    key: 0,
                    class: "tiny-mobile-input__icon"
                  })) : x("v-if", !0)
                ],
                64
                /* STABLE_FRAGMENT */
              )) : x("v-if", !0),
              o.state.showClear ? (A(), G(s, {
                key: 1,
                class: "tiny-mobile-input__icon tiny-mobile-input__clear",
                onMousedown: e[10] || (e[10] = te(() => {
                }, ["prevent"])),
                onClick: o.clear
              }, null, 8, ["onClick"])) : x("v-if", !0),
              o.state.showPwdVisible ? (A(), G(pe(o.state.passwordVisible ? "icon-eyeopen" : "icon-eyeclose"), {
                key: 2,
                class: "tiny-mobile-input__icon",
                onClick: o.handlePasswordVisible
              }, null, 8, ["onClick"])) : x("v-if", !0),
              o.state.isWordLimitVisible ? (A(), w("span", qh, [
                T(
                  "span",
                  _h,
                  M(o.state.showWordLimit ? `${o.state.textLength}/${o.state.upperLimit}` : o.state.textLength),
                  1
                  /* TEXT */
                )
              ])) : x("v-if", !0),
              o.state.validateState ? (A(), w(
                "i",
                {
                  key: 4,
                  class: P(["tiny-mobile-input__icon", ["tiny-mobile-input__validateIcon", o.validateIcon]])
                },
                null,
                2
                /* CLASS */
              )) : x("v-if", !0)
            ])) : x("v-if", !0),
            o.slots.append ? (A(), w("div", eg, [
              F(o.$slots, "append")
            ])) : x("v-if", !0)
          ],
          64
          /* STABLE_FRAGMENT */
        ))
      ])) : (A(), w("div", tg, [
        T("textarea", Tn({
          ref: "textarea",
          name: o.name
        }, o.a(o.$attrs, ["type", "class", "style", "^on[A-Z]"]), {
          class: ["tiny-mobile-textarea__inner", { "is-focus": o.state.focused, "is-autosize": o.autosize }],
          tabindex: o.tabindex,
          disabled: o.state.inputDisabled,
          readonly: o.readonly,
          autocomplete: o.autocomplete,
          style: {
            ...o.state.textareaStyle,
            width: o.$attrs.cols ? "auto" : "100%",
            height: o.$attrs.cols || o.autosize ? "auto" : ""
          },
          "aria-label": o.label,
          onFocus: e[11] || (e[11] = (...u) => o.handleFocus && o.handleFocus(...u)),
          onBlur: e[12] || (e[12] = (...u) => o.handleBlur && o.handleBlur(...u)),
          onChange: e[13] || (e[13] = (...u) => o.handleChange && o.handleChange(...u)),
          onCompositionstart: e[14] || (e[14] = (...u) => o.handleCompositionStart && o.handleCompositionStart(...u)),
          onCompositionupdate: e[15] || (e[15] = (...u) => o.handleCompositionUpdate && o.handleCompositionUpdate(...u)),
          onCompositionend: e[16] || (e[16] = (...u) => o.handleCompositionEnd && o.handleCompositionEnd(...u)),
          onInput: e[17] || (e[17] = (...u) => o.handleInput && o.handleInput(...u)),
          onKeyup: e[18] || (e[18] = (u) => o.$emit("keyup", u)),
          onKeydown: e[19] || (e[19] = (u) => o.$emit("keydown", u)),
          onPaste: e[20] || (e[20] = (u) => o.$emit("paste", u))
        }), `
      `, 16, ng)
      ])),
      o.state.isWordLimitVisible && o.type === "textarea" ? (A(), w(
        "span",
        og,
        M(o.state.showWordLimit ? `${o.state.textLength}/${o.state.upperLimit}` : o.state.textLength),
        1
        /* TEXT */
      )) : x("v-if", !0),
      o.slots.tips || o.tips ? (A(), w("div", rg, [
        F(o.$slots, "tips", {}, () => [
          ue(
            M(o.tips),
            1
            /* TEXT */
          )
        ])
      ])) : x("v-if", !0),
      D(l, {
        modelValue: o.state.sheetvalue,
        "onUpdate:modelValue": e[21] || (e[21] = (u) => o.state.sheetvalue = u),
        menus: o.selectMenu,
        ellipsis: o.ellipsis,
        "content-style": o.contentStyle,
        visible: o.state.boxVisibility,
        "onUpdate:visible": e[22] || (e[22] = (u) => o.state.boxVisibility = u)
      }, null, 8, ["modelValue", "menus", "ellipsis", "content-style", "visible"])
    ],
    38
    /* CLASS, STYLE, NEED_HYDRATION */
  );
}
const Yn = /* @__PURE__ */ W(Wh, [["render", ig]]);
var ag = function(e) {
  var t, n = (typeof process > "u" ? "undefined" : R(process)) === "object" ? (t = process.env) === null || t === void 0 ? void 0 : t.TINY_MODE : null;
  return Yn;
}, sg = {
  INPUT_PC: "tiny-input__",
  INPUTGROUP_PC: "tiny-input-group__",
  INPUT_MOBILE: "tiny-mobile-input__",
  INPUTGROUP_MOBILE: "tiny-mobile-input-group__",
  Mode: "pc",
  inputMode: function(e) {
    return e === this.Mode ? this.INPUT_PC : this.INPUT_MOBILE;
  },
  inputGroupMode: function(e) {
    return e === this.Mode ? this.INPUTGROUP_PC : this.INPUTGROUP_MOBILE;
  },
  VALIDATE_ICON: {
    Validating: "tiny-icon-loading",
    Success: "tiny-icon-circle-check",
    Error: "tiny-icon-circle-close"
  },
  COMPONENT_NAME: {
    FormItem: "FormItem"
  },
  MASKSYMBOL: "******",
  TEXTAREA_HEIGHT_MOBILE: 108
}, lg = C(C({}, j), {}, {
  _constants: {
    type: Object,
    default: function() {
      return sg;
    }
  },
  name: String,
  size: String,
  form: String,
  label: String,
  height: Number,
  resize: String,
  tabindex: {
    type: String,
    default: "1"
  },
  disabled: Boolean,
  readonly: Boolean,
  hoverExpand: Boolean,
  mask: Boolean,
  suffixIcon: [Object, String],
  prefixIcon: [Object, String],
  modelValue: [String, Number],
  type: {
    type: String,
    default: "text"
  },
  memorySpace: {
    type: Number,
    default: 5
  },
  vertical: {
    type: Boolean,
    default: !1
  },
  selectMenu: {
    type: Array,
    default: function() {
      return [];
    }
  },
  ellipsis: {
    type: Boolean,
    default: !1
  },
  contentStyle: {
    type: Object,
    default: function() {
      return {};
    }
  },
  isSelect: {
    type: Boolean,
    default: !1
  },
  tips: String,
  counter: {
    type: Boolean,
    default: !1
  },
  autosize: {
    type: [Boolean, Object],
    default: !1
  },
  clearable: {
    type: Boolean,
    default: !1
  },
  autocomplete: {
    type: String,
    default: "off"
  },
  showPassword: {
    type: Boolean,
    default: !1
  },
  showWordLimit: {
    type: Boolean,
    default: !1
  },
  showTitle: {
    type: Boolean,
    default: !1
  },
  validateEvent: {
    type: Boolean,
    default: !0
  },
  popupMore: {
    type: Boolean,
    default: !1
  },
  // mobile特有属性
  textareaTitle: {
    type: String,
    default: ""
  },
  displayOnly: {
    type: Boolean,
    default: !1
  },
  displayOnlyContent: {
    type: String,
    default: ""
  },
  customClass: {
    type: String,
    default: ""
  },
  frontClearIcon: {
    type: Boolean,
    default: !1
  },
  showEmptyValue: {
    type: Boolean,
    default: void 0
  },
  textAlign: {
    type: String,
    default: "left"
  },
  width: {
    type: [String, Number]
  },
  showTooltip: {
    type: Boolean,
    default: !0
  },
  /** 输入框的边框模式，当值为underline时，只显示一条底部直线 */
  inputBoxType: {
    type: String,
    default: "normal",
    validator: function(e) {
      return ["normal", "underline"].includes(e);
    }
  }
});
const Be = B({
  name: O + "Input",
  inheritAttrs: !1,
  props: lg,
  setup: function(e, t) {
    return K({
      props: e,
      context: t,
      template: ag
    });
  }
}), ug = "3.20.0";
Be.model = {
  prop: "modelValue",
  event: "update:modelValue"
};
Be.install = function(o) {
  o.component(Be.name, Be);
};
Be.version = ug;
const cg = B({
  components: {
    TinyMiniPicker: _e,
    TinyInput: Be,
    IconClose: Il()
  },
  props: [...Q, "modelValue", "type", "clearable", "visible", "minDate", "maxDate", "formatter"],
  setup(o, e) {
    return z({ props: o, context: e, renderless: Rm, api: Nm });
  }
});
function dg(o, e, t, n, r, i) {
  const a = $("icon-close"), s = $("tiny-input"), l = $("tiny-mini-picker");
  return A(), w("div", null, [
    D(s, {
      onHookMounted: o.hookMounted,
      modelValue: o.state.displayValue,
      "onUpdate:modelValue": e[0] || (e[0] = (u) => o.state.displayValue = u),
      ref: "refrence",
      onFocus: o.showPickerAndLockScroll,
      readOnly: "true",
      _mode: o._mode
    }, {
      default: ee(() => [
        o.state.clearable ? x("v-if", !0) : (A(), G(a, {
          key: 0,
          slot: "suffix",
          onClick: o.clearDisplayValue
        }, null, 8, ["onClick"]))
      ]),
      _: 1
      /* STABLE */
    }, 8, ["onHookMounted", "modelValue", "onFocus", "_mode"]),
    D(l, {
      visible: o.state.visible,
      "onUpdate:visible": e[1] || (e[1] = (u) => o.state.visible = u),
      ref: "picker",
      columns: o.state.columns,
      onChange: o.onChange,
      onConfirm: o.onConfirm,
      onCancel: o.onCancel
    }, null, 8, ["visible", "columns", "onChange", "onConfirm", "onCancel"])
  ]);
}
const er = /* @__PURE__ */ W(cg, [["render", dg]]);
var pg = function(e) {
  var t, n = (typeof process > "u" ? "undefined" : R(process)) === "object" ? (t = process.env) === null || t === void 0 ? void 0 : t.TINY_MODE : null;
  return er;
}, ji = (/* @__PURE__ */ new Date()).getFullYear(), fg = {
  MonthDay: 32,
  Minutes: 59,
  Hours: 23,
  TotalMonth: 12,
  Max: "max",
  Min: "min",
  Hour: "hour",
  Minute: "minute",
  CapYear: "Year",
  CapMonth: "Month",
  CapDate: "Date",
  CapHour: "Hour",
  CapMinute: "Minute",
  YearMonth: "year-month",
  DateTime: "datetime",
  Date: "date",
  HookMounted: "hook-mounted",
  Hidden: "hidden",
  Year: "year",
  Day: "day"
}, Wi = function(e) {
  var t = e == null || typeof e == "string" || e instanceof String || Array.isArray(e) && e.length === 2 && e.every(function(n) {
    return typeof n == "string" || n instanceof String;
  });
  return t;
}, mg = {
  tiny_mode: String,
  tiny_mode_root: Boolean,
  tiny_template: [Function, Object],
  tiny_renderless: Function,
  tiny_theme: String,
  tiny_chart_theme: Object
}, vg = C(C({}, mg), {}, {
  tabindex: {
    type: String,
    default: "0"
  },
  timeFormat: String,
  suffixIcon: Object,
  label: String,
  shape: String,
  tip: String,
  changeOnConfirm: {
    type: Boolean,
    default: !1
  },
  popperAppendToBody: {
    type: Boolean,
    default: !0
  },
  isutc8: {
    type: Boolean,
    default: !1
  },
  dbTimezone: Number,
  timezoneOffset: Number,
  iso8601: Boolean,
  autoFormat: {
    type: Boolean,
    default: !1
  },
  title: String,
  blank: {
    type: Boolean,
    default: !1
  },
  type: {
    type: String,
    default: "date"
  },
  _constants: {
    type: Object,
    default: function() {
      return fg;
    }
  },
  timeArrowControl: Boolean,
  timeEditable: {
    type: Boolean,
    default: !0
  },
  size: String,
  format: String,
  valueFormat: String,
  readonly: Boolean,
  placeholder: String,
  startPlaceholder: String,
  endPlaceholder: String,
  prefixIcon: Object,
  clearIcon: {
    type: Object,
    default: function() {
      return yt();
    }
  },
  name: {
    default: "",
    validator: Wi
  },
  disabled: Boolean,
  clearable: {
    type: Boolean,
    default: !0
  },
  id: {
    default: "",
    validator: Wi
  },
  popperClass: String,
  editable: {
    type: Boolean,
    default: !0
  },
  align: {
    type: String,
    default: "left"
  },
  modelValue: {},
  defaultValue: {},
  defaultTime: {},
  rangeSeparator: {
    type: [Object, String],
    default: "-"
  },
  pickerOptions: {},
  unlinkPanels: Boolean,
  validateEvent: {
    type: Boolean,
    default: !0
  },
  isRange: Boolean,
  arrowControl: Boolean,
  timezoneData: {},
  showTimezone: {
    type: Boolean,
    default: !1
  },
  defaultTimezone: {},
  visible: Boolean,
  minDate: {
    type: Date,
    default: function() {
      return new Date(ji - 10, 0, 1);
    },
    validator: function(e) {
      return Object.prototype.toString.call(e) === "[object Date]" && !isNaN(e.getTime());
    }
  },
  maxDate: {
    type: Date,
    default: function() {
      return new Date(ji + 10, 11, 31);
    },
    validator: function(e) {
      return Object.prototype.toString.call(e) === "[object Date]" && !isNaN(e.getTime());
    }
  },
  formatter: {
    type: Function,
    default: function(e, t) {
      return t;
    }
  },
  componentName: {
    type: String,
    default: "DatePicker"
  },
  displayOnly: {
    type: Boolean,
    default: !1
  },
  step: {
    type: Object,
    default: function() {
      return {
        hour: 1,
        minute: 1,
        second: 1
      };
    }
  },
  showWeekNumber: {
    type: Boolean,
    default: !1
  },
  formatWeeks: Function,
  changeCompat: {
    type: Boolean,
    default: !1
  },
  nowClick: {
    type: Function
  }
}), hg = function(e) {
  return function() {
    var t = this.$refs.modeTemplate;
    if (t && t[e])
      return t[e].apply(t, arguments);
  };
};
const et = B({
  name: O + "DatePicker",
  props: vg,
  created: function() {
    var e = this;
    Am.filter(function(t) {
      return t !== "state";
    }).forEach(function(t) {
      e[t] || (e[t] = hg(t));
    });
  },
  setup: function(e, t) {
    return K({
      props: e,
      context: t,
      template: pg
    });
  }
});
const gg = "3.20.0";
et.model = {
  prop: "modelValue",
  event: "update:modelValue"
};
et.install = function(o) {
  o.component(et.name, et);
};
et.version = gg;
var Es = function(e, t) {
  var n = !1;
  if (typeof e == "function" && typeof t == "string") {
    var r = document.createEvent("HTMLEvents");
    r.initEvent(t, !1, !0), r.preventDefault = function() {
      n = !0;
    };
    for (var i = arguments.length, a = new Array(i > 2 ? i - 2 : 0), s = 2; s < i; s++)
      a[s - 2] = arguments[s];
    a.unshift(r), a.unshift(t), e.apply(null, a);
  }
  return !n;
}, Ag = function(e) {
  var t = e.constants, n = e.props;
  return function() {
    return n.rightSlide ? t.DIALOG_SLIDER_RIGHT : t.DIALOG_FADE;
  };
}, tr = function(e) {
  return isNaN(Number(e)) ? e : e + "px";
}, yg = function(e) {
  var t = e.props, n = e.state, r = e.designConfig;
  return function() {
    var i = {}, a = t.width, s = t.top, l = t.rightSlide, u = t.maxHeight;
    if (s === void 0) {
      var c;
      s = l ? "0" : r != null && (c = r.state) !== null && c !== void 0 && c.top ? "" : "15vh";
    }
    return a = tr(a), s = tr(s), u = tr(u), n.isFull || (i.width = a, i.top = n.top || s, i.maxHeight = u, l ? (i.right = 0, i.height = "calc(100vh - " + i.top + ")") : i.left = n.left || "calc((100vw - " + a + ") / 2)"), n.dragStyle && (i = C(C({}, i), n.dragStyle), n.isFull && (i = {
      left: "0px",
      top: "0px"
    })), i;
  };
}, bg = function(e) {
  var t = e.api, n = e.constants, r = e.emit, i = e.nextTick, a = e.parent, s = e.props, l = e.vm, u = e.state;
  return function(c) {
    var d = a.$el;
    if (s.lockScroll && (c ? t.showScrollbar() : t.hideScrollbar()), u.move = !1, u.isFull = s.fullscreen, r("update:visible", c), c)
      u.closed = !1, r("open"), N(d, "scroll", t.updatePopper), i(function() {
        l.$refs.dialog.scrollTop = 0;
      }), s.appendToBody && document.body.appendChild(d);
    else if (U(d, "scroll", t.updatePopper), u.closed || (u.emitter.emit("boxclose", s.isFormReset), r("close")), s.destroyOnClose && i(function() {
      return u.key++;
    }), s.rightSlide) {
      var p = d.querySelector(n.DIALOG_BOX_CLASS) || d;
      p.style.left = "";
    }
  };
}, Sg = function(e) {
  var t = e.api, n = e.parent, r = e.props;
  return function() {
    if (r.lockScroll && r.visible && t.showScrollbar(), r.visible) {
      var i = n.$el;
      t.open(), r.appendToBody && document.body.appendChild(i);
    }
  };
}, wg = function(e) {
  var t = e.api, n = e.parent, r = e.props;
  return function() {
    var i = n.$el;
    t.hideScrollbar(), r.appendToBody && i && i.parentNode && i.parentNode.removeChild(i);
  };
}, Tg = function(e) {
  var t = e.state;
  return function(n) {
    t.mouseDownWrapperFlag = !1, /tiny-dialog-box__wrapper/.test(n.target.className) && n.type === "mousedown" && (t.mouseDownWrapperFlag = !0);
  };
}, Cg = function(e) {
  var t = e.state;
  return function(n) {
    t.mouseUpWrapperFlag = !1, /tiny-dialog-box__wrapper/.test(n.target.className) && n.type === "mouseup" && (t.mouseUpWrapperFlag = !0);
  };
}, Ig = function(e) {
  var t = e.api, n = e.props, r = e.state;
  return function() {
    n.closeOnClickModal && r.mouseDownWrapperFlag && r.mouseUpWrapperFlag && t.handleClose("mask");
  };
}, kg = function(e) {
  var t = e.api, n = e.constants, r = e.emit, i = e.parent, a = e.props;
  return function() {
    var s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "close";
    if (!(typeof a.beforeClose == "function" && a.beforeClose(s) === !1)) {
      var l = i.$el;
      if (a.rightSlide) {
        var u = l.querySelector(n.DIALOG_BOX_CLASS) || l;
        u.style.left = "";
      }
      Es(r, "before-close", t.hide) && t.hide(s);
    }
  };
}, Eg = function(e) {
  var t = e.api, n = e.emit, r = e.state, i = e.props;
  return function(a) {
    a !== !1 && (r.emitter.emit("boxclose", i.isFormReset), n("update:visible", !1), n("change", !1), n("close", a), r.closed = !0, t.hideScrollbar());
  };
}, Dg = function(e) {
  var t = e.api, n = e.emit;
  return function() {
    n("confirm"), t.handleClose("confirm");
  };
}, Bg = function(e) {
  var t = e.api, n = e.emit;
  return function() {
    n("cancel"), t.handleClose("cancel");
  };
}, xg = function(e) {
  var t = e.api, n = e.constants;
  return function() {
    t.broadcast(n.SELECT_DROPDOWN, "updatePopper"), t.broadcast(n.DROPDOWN_MENU, "updatePopper");
  };
}, Pg = function(e) {
  return function() {
    e("opened");
  };
}, Mg = function(e) {
  return function() {
    e("closed");
  };
}, Ds = function(e) {
  var t = e.vm, n = e.componentList, r = t.$children;
  return !r || r.length === 0 ? [] : (r.forEach(function(i) {
    var a = i.$options.componentName;
    a === "Select" && n.push(i), Ds({
      vm: i,
      componentList: n
    });
  }), n);
}, Og = function(e) {
  Ds({
    vm: e,
    componentList: []
  }).forEach(function(t) {
    t.state.visible = !1;
  });
}, Lg = function(e) {
  var t = e.parent, n = e.props, r = e.state, i = e.emit, a = e.vm;
  return function(s) {
    if (!(!n.draggable || r.isFull)) {
      var l = a.$refs.dialog;
      s.preventDefault();
      var u = document.onmousemove, c = document.onmouseup, d = s.clientX - l.offsetLeft, p = s.clientY - l.offsetTop, f = Vo(), m = f.visibleHeight, h = f.visibleWidth;
      document.onmousemove = function(v) {
        v.preventDefault(), r.move || (i("drag-start", v), Og(t), r.move = !0);
        var g = l.offsetWidth, b = l.offsetHeight, y, S;
        if (n.dragOutsideWindow) {
          var E = h - 10, L = m - 10;
          y = v.clientX - d, S = v.clientY - p, y = v.clientX < 0 ? -d : y > E ? E : y, S = v.clientY < 0 ? -p : S > L ? L : S;
        } else {
          var I = Math.max(h - g, 0), k = Math.max(m - b, 0);
          y = v.clientX - d, S = v.clientY - p, y = y < 0 ? 0 : y > I ? I : y, S = S < 0 ? 0 : S > k ? k : S;
        }
        r.isFull || (r.dragStyle = {
          left: "".concat(y, "px"),
          top: "".concat(S, "px")
        }), r.left = "".concat(y, "px"), r.top = "".concat(S, "px"), r.emitter.emit("boxdrag"), i("drag-move", v);
      }, document.onmouseup = function() {
        document.onmousemove = u, document.onmouseup = c, n.draggable && r.move && i("drag-end", s), r.move = !1;
      };
    }
  };
}, Ng = function(e) {
  return function() {
    ve(document.body, e);
  };
}, Fg = function(e) {
  return function() {
    ge(document.body, e);
  };
}, Rg = function(e) {
  var t = e.state, n = e.emit, r = e.nextTick, i = e.vm;
  return function(a) {
    t.isFull = a, r(function() {
      n("resize", {
        fullscreen: a,
        dialog: i.$refs.dialog
      });
    });
  };
}, Vg = 1, Ug = typeof window > "u", Hg = function(e) {
  var t = e.onMounted, n = e.onBeforeUnmount, r = e.watch, i = e.vm, a = e.api, s = e.props, l = e.state, u = e.nextTick;
  t(function() {
    i._popupId = "popup-".concat(Vg++), Z.register(i._popupId, i);
  }), n(function() {
    Z.deregister(i._popupId), Z.closeModal(i._popupId);
  }), r(function() {
    return s.visible;
  }, function(c) {
    if (c) {
      if (i._opening)
        return;
      l.rendered ? a.open() : (l.rendered = !0, u(function() {
        a.open();
      }));
    } else
      a.close();
  });
}, $g = function(e) {
  var t = e.state, n = e.vm;
  return function(r) {
    t.rendered || (t.rendered = !0);
    var i = ss({}, n.$props || n, r);
    n._closeTimer && (clearTimeout(n._closeTimer), n._closeTimer = null), clearTimeout(n._openTimer);
    var a = function() {
      if (!(Ug || t.opened)) {
        n._opening = !0;
        var u = n.$el, c = i.modal, d = i.zIndex;
        d && (Z.zIndex = d), c && (n._closing && (Z.closeModal(n._popupId), n._closing = !1), Z.openModal(n._popupId, Z.nextZIndex(), i.modalAppendToBody ? void 0 : u, i.modalClass, i.modalFade), i.lockScroll && (Z.fixBodyBorder(), ve(document.body, Z.popLockClass))), getComputedStyle(u).position === "static" && (u.style.position = "absolute"), u.style.zIndex = Z.nextZIndex().toString(), t.opened = !0, n._opening = !1;
      }
    }, s = Number(i.openDelay);
    s > 0 ? n._openTimer = setTimeout(function() {
      n._openTimer = null, a();
    }, s) : a();
  };
}, zg = function(e) {
  var t = e.state, n = e.vm;
  return function() {
    n._openTimer !== null && (clearTimeout(n._openTimer), n._openTimer = null), clearTimeout(n._closeTimer);
    var r = function() {
      n._closing = !0, t.opened = !1, Z.closeModal(n._popupId), n._closing = !1;
    }, i = Number(n.closeDelay);
    i > 0 ? n._closeTimer = setTimeout(function() {
      n._closeTimer = null, r();
    }, i) : r();
  };
};
const jg = function(o) {
  var e = o.api, t = o.nextTick, n = o.onBeforeUnmount, r = o.onMounted, i = o.props, a = o.reactive, s = o.toRefs, l = o.vm, u = o.watch, c = a({
    opened: !1,
    rendered: !1
  });
  Hg({
    onMounted: r,
    onBeforeUnmount: n,
    watch: u,
    vm: l,
    api: e,
    props: i,
    state: c,
    nextTick: t
  });
  var d = $g({
    state: c,
    vm: l
  }), p = zg({
    state: c,
    vm: l
  });
  return C({
    open: d,
    close: p,
    PopupManager: Z
  }, s(c));
};
var Wg = ["afterEnter", "afterLeave", "handleClose", "handleWrapperClick", "useMouseEventDown", "useMouseEventUp", "handleCancel", "handleConfirm", "handleDrag", "toggleFullScreen", "state"], Gg = function(e) {
  var t = e.reactive, n = e.computed, r = e.api, i = e.emitter, a = e.props, s = e.useBreakpoint, l = s(), u = l.current, c = t({
    emitter: i(),
    key: 0,
    x: null,
    y: null,
    top: null,
    left: null,
    max: null,
    move: !1,
    closed: !1,
    dragable: !1,
    isFull: a.fullscreen,
    style: n(function() {
      return r.computedStyle();
    }),
    animationName: n(function() {
      return r.computedAnimationName();
    }),
    current: u,
    dragStyle: null
  });
  return c;
}, Yg = function(e) {
  var t = e.reactive, n = e.state, r = e.toRefs, i = e.usePopups, a = i.opened, s = i.rendered, l = t(C({
    opened: a,
    rendered: s
  }, r(n)));
  return l;
}, Kg = function(e) {
  var t = e.emit, n = e.api, r = e.state, i = e.parent, a = e.props, s = e.lockScrollClass, l = e.constants, u = e.usePopups, c = e.nextTick, d = e.broadcast, p = e.designConfig, f = e.vm, m = u.open, h = u.close;
  Object.assign(n, {
    state: r,
    open: m,
    close: h,
    broadcast: d,
    handleCancel: Bg({
      api: n,
      emit: t
    }),
    handleConfirm: Dg({
      api: n,
      emit: t
    }),
    updatePopper: xg({
      api: n,
      constants: l
    }),
    handleWrapperClick: Ig({
      api: n,
      props: a,
      state: r
    }),
    useMouseEventDown: Tg({
      state: r
    }),
    useMouseEventUp: Cg({
      state: r
    }),
    hide: Eg({
      api: n,
      emit: t,
      state: r,
      props: a
    }),
    handleClose: kg({
      api: n,
      constants: l,
      emit: t,
      parent: i,
      props: a
    }),
    watchVisible: bg({
      api: n,
      constants: l,
      emit: t,
      nextTick: c,
      parent: i,
      props: a,
      vm: f,
      state: r
    }),
    computedStyle: yg({
      state: r,
      props: a,
      designConfig: p
    }),
    mounted: Sg({
      api: n,
      parent: i,
      props: a
    }),
    unMounted: wg({
      api: n,
      parent: i,
      props: a
    }),
    computedAnimationName: Ag({
      constants: l,
      props: a
    }),
    afterEnter: Pg(t),
    afterLeave: Mg(t),
    hideScrollbar: Fg(s),
    showScrollbar: Ng(s),
    handleDrag: Lg({
      parent: i,
      props: a,
      state: r,
      emit: t,
      vm: f
    }),
    // tiny 新增
    toggleFullScreen: Rg({
      state: r,
      emit: t,
      nextTick: c,
      vm: f
    })
  });
}, Qg = function(e) {
  var t = e.watch, n = e.state, r = e.api, i = e.props;
  t(function() {
    return i.visible;
  }, r.watchVisible), t(function() {
    return i.fullscreen;
  }, function(a) {
    n.isFull = a;
  });
}, Xg = function(e, t, n) {
  var r = t.computed, i = t.onBeforeUnmount, a = t.onMounted, s = t.toRefs, l = t.reactive, u = t.watch, c = n.vm, d = n.emitter, p = n.parent, f = n.emit, m = n.constants, h = n.nextTick, v = n.mode, g = n.broadcast, b = n.designConfig, y = n.useBreakpoint, S = {}, I = m.SCROLL_LOCK_CLASS(v), k = Gg({
    reactive: l,
    computed: r,
    api: S,
    emitter: d,
    props: e,
    useBreakpoint: y
  }), E = jg({
    api: S,
    nextTick: h,
    onBeforeUnmount: i,
    onMounted: a,
    props: e,
    reactive: l,
    toRefs: s,
    vm: c,
    watch: u
  });
  return Kg({
    api: S,
    state: k,
    parent: p,
    props: e,
    emit: f,
    constants: m,
    usePopups: E,
    lockScrollClass: I,
    nextTick: h,
    vm: c,
    broadcast: g,
    designConfig: b
  }), k = Yg({
    reactive: l,
    state: k,
    toRefs: s,
    usePopups: E
  }), Qg({
    watch: u,
    state: k,
    api: S,
    props: e
  }), a(S.mounted), i(S.unMounted), S;
};
const Zg = B({
  emits: ["update:visible", "change", "before-close", "open", "close", "opened", "confirm", "cancel", "closed"],
  props: [
    ...Q,
    "visible",
    "title",
    "modal",
    "closeOnClickModal",
    "modalAppendToBody",
    "appendToBody",
    "width",
    "top",
    "showHeader",
    "destroyOnClose"
  ],
  model: {
    prop: "visible",
    event: "update:visible"
  },
  setup(o, e) {
    return z({ props: o, context: e, renderless: Xg, api: Wg });
  }
}), Jg = {
  key: 0,
  class: "tiny-mobile-dialog-box__header"
}, qg = { class: "tiny-mobile-dialog-box__title" }, _g = { class: "tiny-mobile-dialog-box__body" }, eA = { class: "tiny-mobile-dialog-box__footer" };
function tA(o, e, t, n, r, i) {
  return A(), G($e, {
    name: "dialog-fade",
    persisted: ""
  }, {
    default: ee(() => [
      oe(T(
        "div",
        {
          class: "tiny-mobile-dialog-box__wrapper",
          onClick: e[2] || (e[2] = te((...a) => o.handleWrapperClick && o.handleWrapperClick(...a), ["self"]))
        },
        [
          (A(), w(
            "div",
            {
              ref: "dialog",
              class: P([{ "is-hide-header": !o.showHeader }, "tiny-mobile-dialog-box"]),
              key: o.state.key
            },
            [
              o.showHeader ? (A(), w("div", Jg, [
                F(o.$slots, "title", {}, () => [
                  T(
                    "span",
                    qg,
                    M(o.title),
                    1
                    /* TEXT */
                  )
                ])
              ])) : x("v-if", !0),
              T("div", _g, [
                F(o.$slots, "default")
              ]),
              T("div", eA, [
                F(o.$slots, "footer", {}, () => [
                  T(
                    "button",
                    {
                      type: "button",
                      onClick: e[0] || (e[0] = (...a) => o.handleCancel && o.handleCancel(...a)),
                      class: "tiny-mobile-dialog-box__button cancel-button"
                    },
                    M(o.t("ui.dialogBox.cancel")),
                    1
                    /* TEXT */
                  ),
                  T(
                    "button",
                    {
                      type: "button",
                      onClick: e[1] || (e[1] = (...a) => o.handleConfirm && o.handleConfirm(...a)),
                      class: "tiny-mobile-dialog-box__button confirm-button"
                    },
                    M(o.t("ui.dialogBox.confirm")),
                    1
                    /* TEXT */
                  )
                ])
              ])
            ],
            2
            /* CLASS */
          ))
        ],
        512
        /* NEED_PATCH */
      ), [
        [he, o.visible]
      ])
    ]),
    _: 3
    /* FORWARDED */
  });
}
const Kn = /* @__PURE__ */ W(Zg, [["render", tA]]);
var nA = function(e) {
  var t, n = (typeof process > "u" ? "undefined" : R(process)) === "object" ? (t = process.env) === null || t === void 0 ? void 0 : t.TINY_MODE : null;
  return Kn;
}, oA = {
  DIALOG_SLIDER_RIGHT: "dialog-slideRight",
  DIALOG_FADE: "dialog-fade",
  SELECT_DROPDOWN: O + "SelectDropdown",
  DROPDOWN_MENU: O + "DropdownMenu",
  DIALOG_BOX_CLASS: "div.tiny-dialog-box",
  PC_SCROLL_LOCK_CLASS: "dialog-box__scroll-lock",
  MOBILE_SCROLL_LOCK_CLASS: "mobile-dialog-box__scroll-lock",
  Mode: "pc",
  SCROLL_LOCK_CLASS: function(e) {
    return e === this.Mode ? this.PC_SCROLL_LOCK_CLASS : this.MOBILE_SCROLL_LOCK_CLASS;
  }
}, rA = C(C({}, j), {}, {
  _constants: {
    type: Object,
    default: function() {
      return oA;
    }
  },
  appendToBody: {
    type: Boolean,
    default: function() {
      return !1;
    }
  },
  beforeClose: Function,
  center: {
    type: Boolean,
    default: function() {
      return !1;
    }
  },
  closeOnClickModal: {
    type: Boolean,
    default: function() {
      return !0;
    }
  },
  closeOnPressEscape: {
    type: Boolean,
    default: function() {
      return !0;
    }
  },
  destroyOnClose: {
    type: Boolean,
    default: function() {
      return !1;
    }
  },
  dialogClass: {
    type: String,
    default: function() {
      return "";
    }
  },
  draggable: {
    type: Boolean,
    default: function() {
      return !1;
    }
  },
  dragOutsideWindow: {
    type: Boolean,
    default: function() {
      return !1;
    }
  },
  fullscreen: {
    type: Boolean,
    default: function() {
      return !1;
    }
  },
  isFormReset: {
    type: Boolean,
    default: function() {
      return !0;
    }
  },
  lockScroll: {
    type: Boolean,
    default: function() {
      return !0;
    }
  },
  modal: {
    type: Boolean,
    default: function() {
      return !0;
    }
  },
  modalAppendToBody: {
    type: Boolean,
    default: function() {
      return !0;
    }
  },
  resize: {
    type: Boolean,
    default: function() {
      return !1;
    }
  },
  rightSlide: {
    type: Boolean,
    default: function() {
      return !1;
    }
  },
  showClose: {
    type: Boolean,
    default: function() {
      return !0;
    }
  },
  showHeader: {
    type: Boolean,
    default: function() {
      return !0;
    }
  },
  title: {
    type: String,
    default: function() {
      return "";
    }
  },
  top: String,
  visible: {
    type: Boolean,
    default: function() {
      return !1;
    }
  },
  width: {
    type: String,
    default: function() {
      return "500px";
    }
  },
  maxHeight: {
    type: String,
    default: function() {
      return "";
    }
  },
  dialogTransition: {
    type: String,
    default: ""
  }
});
const Bt = B({
  name: O + "DialogBox",
  model: {
    prop: "visible",
    event: "update:visible"
  },
  props: rA,
  setup: function(e, t) {
    return K({
      props: e,
      context: t,
      template: nA
    });
  }
}), iA = "3.20.0";
Bt.install = function(o) {
  o.component(Bt.name, Bt);
};
Bt.version = iA;
var aA = function(e) {
  return function() {
    if (e.title)
      return e.title;
    var t = e.options.filter(function(n) {
      return n.value === e.modelValue;
    });
    return t.length ? t[0].text : "";
  };
}, sA = function(e) {
  var t = e.api, n = e.parent;
  return function(r) {
    var i = r ? N : U;
    i(n.state.scroller, "scroll", t.onScroll, !0);
  };
}, lA = function(e) {
  var t = e.parent, n = e.props, r = e.state;
  return function(i) {
    i !== r.showPopup && (r.transition = !n.options.immediate, r.showPopup = i, i && (t.updateOffset(), r.showWrapper = !0));
  };
}, uA = function(e) {
  return function() {
    return e.updateOffset();
  };
}, cA = function(e) {
  return function(t) {
    return e.$el && t.stopPropagation();
  };
}, dA = function(e) {
  var t = e.emit, n = e.props, r = e.state;
  return function(i) {
    r.showPopup = !1, i !== n.modelValue && (t("update:modelValue", i), t("change", i));
  };
}, pA = function(e) {
  var t = e.parent, n = e.state;
  return function() {
    return {
      zIndex: t.zIndex,
      top: t.direction === "down" ? n.offset + "px" : "",
      bottom: t.direction !== "down" ? n.offset + "px" : ""
    };
  };
}, fA = function(e) {
  return function(t, n) {
    return n.includes(t.value) ? {
      color: e.activeColor ? e.activeColor : "#f36f64",
      border: "1px solid ".concat(e.activeColor ? e.activeColor : "#f36f64")
    } : {
      color: "#333"
    };
  };
}, mA = function(e) {
  var t = e.emit, n = e.state;
  return function() {
    n.showWrapper = !1, t("closed");
  };
}, vA = function(e) {
  return function() {
    return e("open");
  };
}, hA = function(e) {
  return function() {
    return e("opened");
  };
}, gA = function(e) {
  return function() {
    return e("close");
  };
}, AA = function(e) {
  var t = e.emit, n = e.props;
  return function(r, i, a) {
    a.preventDefault(), a.stopPropagation();
    var s = n.modelValue.slice(), l = s[r], u = l.indexOf(i.value);
    u === -1 ? l.push(i.value) : l.splice(u, 1), s[r] = l, t("update:modelValue", s);
  };
}, yA = function(e) {
  var t = e.emit, n = e.props, r = e.state;
  return function() {
    r.showPopup = !1, t("confirm", n.modelValue);
  };
}, bA = function(e) {
  var t = e.emit, n = e.props;
  return function() {
    for (var r = n.modelValue.length, i = [], a = 0; a < r; a++)
      i.push([]);
    t("update:modelValue", i), t("reset", i);
  };
}, SA = function(e) {
  return function() {
    e.closeOnClickOutside && e.closeOnClickOverlay && e.state.children.forEach(function(t) {
      t.toggle(!1);
    });
  };
}, wA = function(e) {
  var t = e.state, n = e.props, r = e.dispatch, i = e.vm, a = e.emit;
  return function(s) {
    s.stopPropagation(), t.currentIndex = "".concat(n.currentIndex);
    var l = {
      itemData: n.itemData,
      vm: i,
      disabled: n.disabled
    };
    n.disabled || a("item-click", l), r("TinyDropdown", "menu-item-click", l), r("TinyDropdown", "is-disabled", [n.disabled]), r("TinyDropdown", "selected-index", [t.currentIndex]);
  };
}, TA = function(e) {
  var t = e.constants, n = e.designConfig;
  return function() {
    var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "leftWardArrow";
    return (n == null ? void 0 : n.icons[r]) || (t == null ? void 0 : t.ICON_MAP[r]);
  };
}, CA = function(e) {
  var t = e.props, n = e.vm;
  return function() {
    return t.tip && typeof t.tip == "function" ? t.tip({
      itemData: t.itemData,
      vm: n
    }) : t.tip || "";
  };
}, IA = ["state", "confirm", "clickOutside", "getOptionStyle", "reset", "tagClick", "clickItem", "clickWrapper", "toggle", "open", "opened", "close", "closed", "handleClick", "computedTip"], kA = function(e) {
  var t = e.reactive, n = e.computed, r = e.api, i = e.props, a = e.parent, s = e.dropdownMenuVm, l = e.dropdownVm, u = t({
    checkedStatus: s == null ? void 0 : s.checkedStatus,
    sort: i.modelValue,
    transition: !0,
    getTitle: !1,
    showWrapper: !1,
    showPopup: !1,
    duration: a.duration,
    overlay: n(function() {
      return a.overlay;
    }),
    offset: n(function() {
      return a.state.offset;
    }),
    direction: n(function() {
      return a.direction;
    }),
    displayTitle: n(function() {
      return r.getTitle();
    }),
    itemStyle: n(function() {
      return r.getItemStyle();
    }),
    activeColor: n(function() {
      return a.activeColor;
    }),
    closeOnClickOverlay: n(function() {
      return a.closeOnClickOverlay;
    }),
    dropdownMenuVm: s,
    currentIndex: i.currentIndex,
    textField: (s == null ? void 0 : s.textField) || i.textField,
    popperClass: (s == null ? void 0 : s.popperClass) || "",
    sizeClass: l != null && l.size ? "tiny-dropdown-item--".concat(l == null ? void 0 : l.size) : "",
    getIcon: n(function() {
      return r.computedGetIcon();
    }),
    children: [],
    computedTip: n(function() {
      return r.computedTip();
    })
  });
  return u;
}, EA = function(e) {
  var t = e.api, n = e.state, r = e.emit, i = e.props, a = e.parent, s = e.dispatch, l = e.vm, u = e.constants, c = e.designConfig;
  Object.assign(t, {
    state: n,
    open: vA(r),
    opened: hA(r),
    close: gA(r),
    getTitle: aA(i),
    onScroll: uA(a),
    reset: bA({
      emit: r,
      props: i
    }),
    closed: mA({
      emit: r,
      state: n
    }),
    clickWrapper: cA(a),
    clickOutside: SA(a),
    tagClick: AA({
      emit: r,
      props: i
    }),
    getOptionStyle: fA(n),
    toggle: lA({
      parent: a,
      props: i,
      state: n
    }),
    clickItem: dA({
      emit: r,
      props: i,
      state: n
    }),
    getItemStyle: pA({
      parent: a,
      state: n
    }),
    bindScroll: sA({
      api: t,
      parent: a
    }),
    confirm: yA({
      emit: r,
      props: i,
      state: n
    }),
    handleClick: wA({
      state: n,
      props: i,
      dispatch: s,
      vm: l,
      emit: r
    }),
    computedGetIcon: TA({
      constants: u,
      designConfig: c
    }),
    computedTip: CA({
      props: i,
      vm: l
    })
  });
}, DA = function(e, t, n) {
  var r = t.computed, i = t.onMounted, a = t.reactive, s = t.watch, l = t.inject, u = n.parent, c = n.emit, d = n.vm, p = n.dispatch, f = n.constants, m = n.designConfig, h = {}, v = l("dropdownMenuVm", null), g = l("dropdownVm", null), b = kA({
    reactive: a,
    computed: r,
    api: h,
    props: e,
    parent: u,
    dropdownMenuVm: v,
    dropdownVm: g
  });
  return EA({
    api: h,
    state: b,
    emit: c,
    props: e,
    parent: u,
    dispatch: p,
    vm: d,
    constants: f,
    designConfig: m
  }), s(function() {
    return b.showPopup;
  }, h.bindScroll), i(function() {
    var y = u.$parent.$parent || {};
    y.state && y.state.children ? y.state.children.push(d) : v && (v.state.children = [].concat(Se(v.state.children), [d])), e.disabled && (b.checkedStatus = !1);
  }), h;
}, Gi = 10, BA = function(e, t) {
  return e > t && e > Gi ? "horizontal" : t > e && t > Gi ? "vertical" : "";
}, ii = function(e) {
  return function(t) {
    PA(e), e.startX = t.touches[0].clientX, e.startY = t.touches[0].clientY;
  };
}, xA = function(e) {
  return function(t) {
    var n = t.touches[0];
    e.deltaX = n.clientX - e.startX, e.deltaY = n.clientY - e.startY, e.offsetX = Math.abs(e.deltaX), e.offsetY = Math.abs(e.deltaY), e.direction = e.direction || BA(e.offsetX, e.offsetY);
  };
}, PA = function(e) {
  e.direction = "", e.deltaX = 0, e.deltaY = 0, e.offsetX = 0, e.offsetY = 0;
}, MA = function(e) {
  return function(t, n) {
    if (!n.disabled)
      if (n.type === "sort")
        !n.modelValue || n.modelValue === "desc" ? (n.state.sort = "asc", n.$emit("update:modelValue", "asc"), n.$emit("click", "asc")) : (n.state.sort = "desc", n.$emit("update:modelValue", "desc"), n.$emit("click", "desc"));
      else {
        var r = e.children.length === 1 && n.state.showPopup;
        e.children.forEach(function(i, a) {
          a === t && !r ? i.toggle(!0) : i.state.showPopup && i.toggle(!1, {
            immediate: !0
          });
        });
      }
  };
}, OA = function(e) {
  var t = e.props, n = e.state, r = e.vm;
  return function() {
    if (r.$refs.menu) {
      var i = r.$refs.menu.getBoundingClientRect();
      t.direction === "down" ? n.offset = i.bottom : n.offset = window.innerHeight - i.top;
    }
  };
}, LA = function(e) {
  var t = e.props, n = e.state;
  return function() {
    t.closeOnClickOutside && t.closeOnClickOverlay && n.children.forEach(function(r) {
      r.type !== "filter" && r.toggle(!1);
    });
  };
}, Bs = function(e, t) {
  for (var n = /scroll|auto/i, r = e, i = window.getComputedStyle; r && r.tagName !== "HTML" && r.nodeType === 1 && r !== t; ) {
    var a = i(r), s = a.overflowY;
    if (n.test(s)) {
      if (r.tagName !== "BODY")
        return r;
      var l = i(r.parentNode), u = l.overflowY;
      if (n.test(u))
        return r;
    }
    r = r.parentNode;
  }
  return t || null;
}, NA = function(e) {
  var t, n, r = e.api, i = e.props, a = e.hooks, s = e.instance, l = e.state, u = e.dropdownVm, c = e.designConfig, d = a.nextTick, p = a.onBeforeUnmount, f = a.onDeactivated, m = a.onMounted, h = a.reactive, v = a.toRefs, g = a.watch, b = s.emit, y = s.slots, S = s.vm, I = s.parent, k = {
    placement: i.placement || (c == null || (t = c.props) === null || t === void 0 ? void 0 : t.placement) || "bottom-end",
    visibleArrow: i.visibleArrow || (c == null || (n = c.props) === null || n === void 0 ? void 0 : n.visibleArrow) || !1
  }, E = ni({
    emit: b,
    nextTick: d,
    onBeforeUnmount: p,
    onDeactivated: f,
    props: C(C({
      popperOptions: {
        boundariesPadding: 0,
        gpuAcceleration: !1
      },
      offset: 0,
      boundariesPadding: 5
    }, i), k),
    reactive: h,
    vm: S,
    slots: y,
    toRefs: v,
    watch: g
  });
  m(function() {
    u && (E.popperElm && (u.popperElm = E.popperElm.value = S.$el, d(function() {
      E.referenceElm && (E.referenceElm.value = u.$el);
    }), !i.multiStage && u.initDomOperation()), u.inheritWidth && E.popperElm && (u.popperElm.style.minWidth = u.$el.clientWidth + "px"));
  }), p(function() {
    E.destroyPopper("remove"), E.popperElm = null, E.referenceElm = null;
  }), r.doDestroy = E.doDestroy, l.size = (u == null ? void 0 : u.size) || "", l.showPopper = E.showPopper.value, I.$on("updatePopper", function() {
    l.showPopper && E.updatePopper();
  }), I.$on("visible", function(L) {
    l.showPopper = L, E.showPopper.value = L, l.showPopper && (l.initShowPopper = !0);
  }), g(function() {
    return i.placement;
  }, function(L) {
    E.currentPlacement.value = L;
  });
}, FA = function(e) {
  var t = e.api, n = e.parent, r = e.state;
  return function() {
    n.$on("menu-selected-index", function(i) {
      r.selectedIndex = i;
    }), n.$on("menu-item-click", t.handleMenuItemClick), n.$on("mouseenter-tips", function(i, a) {
      r.label = a, r.showContent = i;
    }), n.$on("mouseleave-tips", function(i, a) {
      r.label = a, r.showContent = i;
    });
  };
}, RA = function(e) {
  var t = e.state, n = e.dispatch;
  return function(r) {
    var i = r.itemData, a = r.vm, s = r.label, l = r.showContent, u = r.disabled;
    t.label = s, t.showContent = l;
    var c = {
      itemData: i,
      vm: a,
      disabled: u
    };
    n("TinyDropdown", "current-item-click", c);
  };
}, VA = function(e) {
  return function(t) {
    e("mouseenter", t);
  };
}, UA = function(e) {
  return function(t) {
    e("mouseleave", t);
  };
}, HA = function(e) {
  return function() {
    var t = C({}, e.popupStyle);
    if (!ke(e.duration)) {
      var n = e.position === "center" ? "animationDuration" : "transitionDuration";
      t[n] = "".concat(e.duration, "s");
    }
    return t;
  };
}, $A = function(e) {
  return function(t) {
    var n = t ? "open" : "close";
    e[n]();
  };
}, zA = function(e) {
  var t = e.api, n = e.constants, r = e.emit, i = e.props, a = e.state;
  return function() {
    a.opened || (i.zIndex !== void 0 && (a.context.zIndex = i.zIndex), t.renderOverlay(), a.opened = !0, r("open"), i.lockScroll && (N(document, "touchstart", ii), N(document, "touchmove", t.onTouchMove), a.context.lockCount || document.body.classList.add(n.OVERFLOWHIDDEN), a.context.lockCount++));
  };
}, jA = function(e) {
  var t = e.api, n = e.constants, r = e.emit, i = e.props, a = e.state;
  return function() {
    a.opened && (i.lockScroll && (a.context.lockCount--, U(document, "touchstart", ii), U(document, "touchmove", t.onTouchMove), a.context.lockCount || document.body.classList.remove(n.OVERFLOWHIDDEN)), a.opened = !1, r("update:modelValue", !1), r("close"));
  };
}, WA = function(e) {
  var t = e.vm, n = e.state;
  return function(r) {
    var i = n.deltaY > 0 ? "10" : "01", a = Bs()(r.target, t.$refs.$el), s = a.scrollHeight, l = a.offsetHeight, u = a.scrollTop, c = "11";
    u === 0 ? c = l >= s ? "00" : "01" : u + l >= s && (c = "10"), c !== "11" && n.direction === "vertical" && !(parseInt(c, 2) & parseInt(i, 2)) && r.preventDefault();
  };
}, GA = function(e) {
  var t = e.api, n = e.nextTick, r = e.props, i = e.state;
  return function() {
    r.modelValue && n(function() {
      t.updateZIndex(r.overlay ? 1 : 0), r.overlay && (i.zIndex = i.context.zIndex++);
    });
  };
}, YA = function(e) {
  var t = e.vm, n = e.state;
  return function() {
    var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
    return t.$refs.popup.style.zIndex = ++n.context.zIndex + r;
  };
}, KA = function(e) {
  var t = e.api, n = e.props, r = e.emit;
  return function() {
    n.closeOnClickOverlay && (t.close(), r("click-overlay"));
  };
}, QA = function(e) {
  return function() {
    return e("closed");
  };
}, XA = function(e) {
  return function() {
    return e("opened");
  };
}, ZA = ["state", "open", "close", "clickOverlay", "onTouchMove", "opened", "closed"], JA = function(e) {
  var t = e.reactive, n = e.computed, r = e.props, i = e.api, a = t({
    transitionName: n(function() {
      return r.transition || r.position === "center" ? "tiny-fade" : "tiny-popup-slide-".concat(r.position);
    }),
    style: n(function() {
      return i.getStyle();
    }),
    inited: n(function() {
      return a.inited || r.modelValue;
    }),
    opened: !1,
    startX: 0,
    startY: 0,
    deltaX: 0,
    deltaY: 0,
    offsetX: 0,
    offsetY: 0,
    direction: "",
    shouldRender: n(function() {
      return a.inited || r.lazyRender;
    }),
    context: {
      zIndex: 2e3,
      lockCount: 0,
      stack: []
    },
    zIndex: r.zIndex,
    overlayStyle: n(function() {
      return C({
        zIndex: a.zIndex
      }, r.overlayStyle);
    })
  });
  return a;
}, qA = function(e) {
  var t = e.api, n = e.props, r = e.state, i = e.vm, a = e.emit, s = e.nextTick, l = e.constants;
  Object.assign(t, {
    state: r,
    opened: XA(a),
    closed: QA(a),
    getStyle: HA(n),
    watchValue: $A(t),
    updateZIndex: YA({
      vm: i,
      state: r
    }),
    clickOverlay: KA({
      api: t,
      emit: a,
      props: n
    }),
    renderOverlay: GA({
      api: t,
      nextTick: s,
      props: n,
      state: r
    }),
    onTouchMove: WA({
      vm: i,
      state: r
    }),
    open: zA({
      api: t,
      constants: l,
      emit: a,
      props: n,
      state: r
    }),
    close: jA({
      api: t,
      constants: l,
      emit: a,
      props: n,
      state: r
    })
  });
}, _A = function(e, t, n) {
  var r = t.computed, i = t.onMounted, a = t.reactive, s = t.watch, l = t.nextTick, u = n.constants, c = n.vm, d = n.emit, p = {}, f = JA({
    reactive: a,
    computed: r,
    props: e,
    api: p
  });
  return qA({
    api: p,
    props: e,
    state: f,
    vm: c,
    emit: d,
    nextTick: l,
    constants: u
  }), s(function() {
    return e.modelValue;
  }, p.watchValue, {
    immediate: !0
  }), i(function() {
    e.modelValue && p.open();
  }), p;
};
const ey = {
  OVERFLOWHIDDEN: "tiny-overflow-hidde"
}, ty = B({
  name: O + "Popup",
  emits: ["open", "close", "update:modelValue", "click-overlay", "closed", "opened", "click"],
  components: {
    IconClose: yt()
  },
  props: {
    ...j,
    _constants: {
      type: Object,
      default: () => ey
    },
    closeIcon: {
      type: String,
      default: "cross"
    },
    closeIconPosition: {
      type: String,
      default: "top-right"
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: !0
    },
    closeable: {
      type: Boolean,
      default: !0
    },
    duration: [Number, String],
    lazyRender: {
      type: Boolean,
      default: !0
    },
    lockScroll: {
      type: Boolean,
      default: !0
    },
    modelValue: Boolean,
    overlay: {
      type: Boolean,
      default: !0
    },
    overlayClass: String,
    overlayStyle: Object,
    popupClass: String,
    popupStyle: Object,
    position: {
      type: String,
      default: "center"
    },
    round: Boolean,
    safeAreaInsetBottom: Boolean,
    transition: String,
    zIndex: [Number, String]
  },
  setup(o, e) {
    return z({ props: o, context: e, renderless: _A, api: ZA, mono: !0 });
  }
});
function ny(o, e, t, n, r, i) {
  const a = $("icon-close");
  return A(), w("div", null, [
    D($e, {
      name: o.state.transitionName,
      onAfterEnter: o.opened,
      onAfterLeave: o.closed,
      persisted: ""
    }, {
      default: ee(() => [
        oe(T(
          "div",
          {
            ref: "popup",
            class: P(["tiny-popup", [o.round ? "tiny-popup--round" : "", o.position ? "tiny-popup--" + o.position : "", o.popupClass]]),
            style: H(o.state.style),
            onClick: e[0] || (e[0] = (s) => o.$emit("click"))
          },
          [
            F(o.$slots, "default"),
            o.closeable ? (A(), G(a, {
              key: 0,
              class: "tiny-popup__close-icon tiny-popup__close-icon--top-right",
              fill: "#c8c9cc",
              tabindex: "0",
              onClick: o.close
            }, null, 8, ["onClick"])) : x("v-if", !0)
          ],
          6
          /* CLASS, STYLE */
        ), [
          [he, o.modelValue]
        ])
      ]),
      _: 3
      /* FORWARDED */
    }, 8, ["name", "onAfterEnter", "onAfterLeave"]),
    D($e, {
      name: "tiny-fade",
      persisted: ""
    }, {
      default: ee(() => [
        oe(T(
          "div",
          {
            style: H(o.state.overlayStyle),
            class: P([o.overlayClass, "tiny-overlay"]),
            onClick: e[1] || (e[1] = (...s) => o.clickOverlay && o.clickOverlay(...s))
          },
          [
            F(o.$slots, "overlay")
          ],
          6
          /* CLASS, STYLE */
        ), [
          [he, o.state.opened && o.overlay]
        ])
      ]),
      _: 3
      /* FORWARDED */
    })
  ]);
}
const nn = /* @__PURE__ */ W(ty, [["render", ny]]);
const oy = "3.20.0";
nn.model = {
  prop: "modelValue",
  event: "update:modelValue"
};
nn.install = function(o) {
  o.component(nn.name, nn);
};
nn.version = oy;
var ry = typeof window > "u", Tt = [], de = "@@clickoutsideContext", Jt, iy = 0;
ry || (N(document, "mousedown", function(o) {
  Jt = o, Tt.filter(function(e) {
    return e[de].mousedownTrigger;
  }).forEach(function(e) {
    return e[de].documentHandler(o, Jt);
  });
}), N(document, "mouseup", function(o) {
  Tt.filter(function(e) {
    return !e[de].mousedownTrigger;
  }).forEach(function(e) {
    var t;
    return e[de].documentHandler(o, (t = e[de]) !== null && t !== void 0 && t.mouseupTrigger ? o : Jt);
  }), Jt = null;
}));
var Yi = function(e, t, n) {
  return function() {
    var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, a = n.context.popperElm || n.context.state && n.context.state.popperElm;
    !(r != null && r.target) || !(i != null && i.target) || e.contains(r.target) || e.contains(i.target) || e === r.target || a && (a.contains(r.target) || a.contains(i.target)) || (t.expression && e[de].methodName && n.context[e[de].methodName] ? n.context[e[de].methodName]() : e[de].bindingFn && e[de].bindingFn());
  };
};
const ai = {
  bind: function(e, t, n) {
    Tt.push(e);
    var r = iy++, i = t.modifiers, a = t.expression, s = t.value, l = i || {}, u = l.mousedown, c = u === void 0 ? !1 : u, d = l.mouseup, p = d === void 0 ? !1 : d;
    e[de] = {
      id: r,
      documentHandler: Yi(e, t, n),
      methodName: a,
      bindingFn: s,
      mousedownTrigger: c,
      mouseupTrigger: p
    };
  },
  update: function(e, t, n) {
    var r = t.modifiers, i = t.expression, a = t.value, s = r || {}, l = s.mousedown, u = l === void 0 ? !1 : l, c = s.mouseup, d = c === void 0 ? !1 : c;
    e[de].documentHandler = Yi(e, t, n), e[de].methodName = i, e[de].bindingFn = a, e[de].mousedownTrigger = u, e[de].mouseupTrigger = d;
  },
  unbind: function(e) {
    if (e.nodeType === Node.ELEMENT_NODE) {
      for (var t = Tt.length, n = 0; n < t; n++)
        if (Tt[n][de].id === e[de].id) {
          Tt.splice(n, 1);
          break;
        }
      Tt.length === 0 && Jt && (Jt = null), delete e[de];
    }
  }
};
const ay = B({
  directives: mn({ Clickoutside: ai }),
  props: [...Q, "modelValue", "title", "disabled", "titleClass", "options", "icon", "type"],
  components: {
    IconYes: Ur(),
    TinyPopup: nn,
    TinyButton: ye
  },
  emits: [
    "update:modelValue",
    "open",
    "opened",
    "click",
    "change",
    "closed",
    "close",
    "reset",
    "confirm",
    "item-click"
  ],
  setup(o, e) {
    return z({ props: o, context: e, renderless: DA, api: IA });
  }
}), sy = {
  key: 0,
  class: "tiny-mobile-dropdown-item__options"
}, ly = ["onClick"], uy = { class: "tiny-mobile-dropdown-item__option-icon" }, cy = { class: "tiny-mobile-dropdown-item__option-title" }, dy = { class: "tiny-mobile-dropdown-item__option-value" }, py = {
  key: 1,
  class: "tiny-mobile-dropdown-item__filter"
}, fy = { class: "tiny-mobile-dropdown-item__filter-wrap" }, my = { class: "tiny-mobile-dropdown-item__filter-title" }, vy = ["onClick"], hy = { class: "tiny-mobile-dropdown-item__filter-operate" };
function gy(o, e, t, n, r, i) {
  const a = $("icon-yes"), s = $("tiny-button"), l = $("tiny-popup"), u = sn("clickoutside");
  return oe((A(), w(
    "div",
    {
      ref: "wrapper",
      class: P(["tiny-mobile-dropdown-item--" + o.state.direction, "tiny-mobile-dropdown-item"]),
      onClick: e[1] || (e[1] = (...c) => o.clickWrapper && o.clickWrapper(...c)),
      style: H(o.state.itemStyle)
    },
    [
      D(l, {
        modelValue: o.state.showPopup,
        "onUpdate:modelValue": e[0] || (e[0] = (c) => o.state.showPopup = c),
        "popup-class": "tiny-mobile-dropdown-item__content",
        overlay: o.state.overlay,
        "close-on-click-overlay": o.state.closeOnClickOverlay,
        closeable: !1,
        position: o.state.direction === "down" ? "top" : "bottom",
        duration: o.state.transition ? o.state.duration : 0,
        onOpen: o.open,
        onClose: o.close,
        onOpened: o.opened,
        onClosed: o.closed
      }, {
        default: ee(() => [
          F(o.$slots, "default", {}, () => [
            o.type === "selection" ? (A(), w("div", sy, [
              (A(!0), w(
                q,
                null,
                ae(o.options, (c, d) => (A(), w("div", {
                  class: P(["tiny-mobile-dropdown-item__cell tiny-mobile-dropdown-item__option", c.value === o.modelValue ? "is-active" : ""]),
                  key: d,
                  tabindex: "0",
                  onClick: (p) => o.clickItem(c.value)
                }, [
                  T("div", uy, [
                    F(o.$slots, "icon", {}, () => [
                      (A(), G(pe(o.icon)))
                    ])
                  ]),
                  T("div", cy, [
                    F(o.$slots, "title", { titleData: c }, () => [
                      T(
                        "span",
                        {
                          style: H({
                            color: c.value === o.modelValue && o.state.activeColor ? o.state.activeColor : ""
                          })
                        },
                        M(c.text),
                        5
                        /* TEXT, STYLE */
                      )
                    ])
                  ]),
                  T("div", dy, [
                    c.value === o.modelValue ? (A(), G(a, {
                      key: 0,
                      fill: o.state.activeColor ? o.state.activeColor : "#f36f64"
                    }, null, 8, ["fill"])) : x("v-if", !0)
                  ])
                ], 10, ly))),
                128
                /* KEYED_FRAGMENT */
              ))
            ])) : x("v-if", !0),
            o.type === "filter" ? oe((A(), w("div", py, [
              T("div", fy, [
                (A(!0), w(
                  q,
                  null,
                  ae(o.options, (c, d) => (A(), w("div", {
                    key: d,
                    class: "tiny-mobile-dropdown-item__cell tiny-mobile-dropdown-item__filter-item"
                  }, [
                    T(
                      "span",
                      my,
                      M(c.title),
                      1
                      /* TEXT */
                    ),
                    T("ul", null, [
                      (A(!0), w(
                        q,
                        null,
                        ae(o.options.length === 0 ? c.data = [] : c.data, (p, f) => (A(), w("li", {
                          class: P(["tiny-mobile-dropdown-item__filter-li", [o.modelValue[d].indexOf(p.value) > -1 ? "checked" : ""]]),
                          style: H(o.getOptionStyle(p, o.modelValue[d])),
                          onClick: (m) => o.tagClick(d, p, m),
                          key: f
                        }, M(p.text), 15, vy))),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ])
                  ]))),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]),
              T("div", hy, [
                D(s, { onClick: o.reset }, {
                  default: ee(() => [
                    ue(" Reset ")
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["onClick"]),
                D(s, {
                  type: "primary",
                  onClick: o.confirm
                }, {
                  default: ee(() => [
                    ue(" OK ")
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["onClick"])
              ])
            ])), [
              [u, o.clickOutside]
            ]) : x("v-if", !0)
          ])
        ]),
        _: 3
        /* FORWARDED */
      }, 8, ["modelValue", "overlay", "close-on-click-overlay", "position", "duration", "onOpen", "onClose", "onOpened", "onClosed"])
    ],
    6
    /* CLASS, STYLE */
  )), [
    [he, o.state.showWrapper]
  ]);
}
const Qn = /* @__PURE__ */ W(ay, [["render", gy]]);
var Ay = function(e) {
  var t, n = (typeof process > "u" ? "undefined" : R(process)) === "object" ? (t = process.env) === null || t === void 0 ? void 0 : t.TINY_MODE : null;
  return Qn;
}, yy = {
  ICON_MAP: {
    leftWardArrow: "icon-left-ward-arrow"
  }
}, by = C(C({}, j), {}, {
  _constants: {
    type: Object,
    default: function() {
      return yy;
    }
  },
  icon: [String, Object],
  disabled: Boolean,
  divided: Boolean,
  itemData: {
    type: [String, Object],
    default: ""
  },
  title: String,
  label: String,
  level: String,
  titleClass: String,
  options: {
    type: Array,
    default: function() {
      return [];
    }
  },
  // mobile 属性，可选值 selection | filter | sort
  type: {
    type: String,
    default: "selection"
  },
  // 是否选中，勾选状态功能
  selected: {
    type: Boolean,
    default: !1
  },
  // 暂没找到使用的地方
  selectedField: {
    type: String,
    default: "selected"
  },
  // 暂没找到使用的地方
  multiStage: {
    type: Boolean,
    default: !1
  },
  currentIndex: {
    type: Number,
    default: function() {
      return -1;
    }
  },
  tooltipContent: {
    type: String,
    default: ""
  },
  // 以下为 tiny 新增
  appendToBody: {
    type: Boolean,
    default: !0
  },
  textField: {
    type: String,
    default: "label"
  },
  tip: {
    type: [String, Function],
    default: ""
  },
  tipPosition: {
    type: String,
    default: "right"
  },
  effect: {
    type: String,
    default: "light"
  }
});
const tt = B({
  name: O + "DropdownItem",
  componentName: "TinyDropdownItem",
  props: by,
  setup: function(e, t) {
    return K({
      props: e,
      context: t,
      template: Ay
    });
  }
}), Sy = "3.20.0";
tt.model = {
  prop: "modelValue",
  event: "update:modelValue"
};
tt.install = function(o) {
  o.component(tt.name, tt);
};
tt.version = Sy;
var wy = ["state", "toggleItem", "updateOffset", "clickOutside", "doDestroy", "handleMouseenter", "handleMouseleave"], Ty = function(e, t, n) {
  var r = {}, i = t.reactive, a = t.provide, s = t.onMounted, l = t.inject, u = n.nextTick, c = n.mode, d = n.vm, p = n.parent, f = n.dispatch, m = n.emit, h = n.designConfig;
  a("dropdownMenuVm", d), a("multiStage", e.multiStage);
  var v = l("dropdownVm"), g = i({
    offset: 0,
    scroller: null,
    children: [],
    size: "",
    showPopper: !1,
    initShowPopper: !v.lazyShowPopper,
    // 辅助变量,
    label: "",
    showContent: !1,
    selected: !1,
    selectedIndex: -1,
    canvasHeight: l("change-size", null)
  });
  return c === "mobile" ? u(function() {
    g.scroller = Bs(d.$refs.menu);
  }) : NA({
    api: r,
    hooks: t,
    props: e,
    instance: n,
    state: g,
    dropdownVm: v,
    designConfig: h
  }), Object.assign(r, {
    state: g,
    toggleItem: MA(g),
    clickOutside: LA({
      props: e,
      state: g
    }),
    updateOffset: OA({
      props: e,
      state: g,
      vm: d
    }),
    mounted: FA({
      api: r,
      parent: p,
      state: g
    }),
    handleMouseenter: VA(m),
    handleMouseleave: UA(m),
    handleMenuItemClick: RA({
      dispatch: f,
      state: g
    })
  }), s(r.mounted), r;
};
const Cy = B({
  props: [
    ...Q,
    "activeColor",
    "closeOnClickOutside",
    "closeOnClickOverlay",
    "direction",
    "duration",
    "overlay",
    "zIndex"
  ],
  components: {
    IconUp: kl(),
    IconDown: El(),
    IconUnfilter: Dl(),
    IconSort: Bl(),
    IconDeltaDown: xl(),
    IconDeltaUp: Pl()
  },
  directives: mn({ Clickoutside: ai }),
  emits: ["open", "created"],
  setup(o, e) {
    return z({ props: o, context: e, renderless: Ty, api: wy });
  }
}), Iy = {
  ref: "menu",
  class: "tiny-mobile-dropdown-menu"
}, ky = { class: "tiny-mobile-dropdown-menu__bar tiny-mobile-dropdown-menu__bar--opened" }, Ey = ["tabindex", "onClick"], Dy = { class: "tiny-mobile-dropdown-menu__title-wrap" }, By = { key: 0 }, xy = { class: "tiny-mobile-dropdown-menu__title-text" }, Py = {
  key: 0,
  class: "tiny-mobile-dropdown-menu__title-icon"
};
function My(o, e, t, n, r, i) {
  const a = $("icon-delta-up"), s = $("icon-delta-down"), l = sn("clickoutside");
  return A(), w(
    "div",
    Iy,
    [
      T("div", ky, [
        (A(!0), w(
          q,
          null,
          ae(o.state.children, (u, c) => oe((A(), w("div", {
            key: c,
            role: "button",
            tabindex: u.disabled ? -1 : 0,
            class: P(["tiny-mobile-dropdown-menu__item", [u.disabled ? "is-disabled" : "", u.titleClass]]),
            onClick: (d) => o.toggleItem(c, u)
          }, [
            T(
              "div",
              {
                class: P(["tiny-mobile-dropdown-menu__title", {
                  "is-active": u.state.showPopup,
                  "is-down": u.state.showPopup === (o.direction === "down")
                }]),
                style: H({ color: u.state.showPopup ? o.activeColor : "" })
              },
              [
                T("div", Dy, [
                  o.slots.title ? F(o.$slots, "title", { key: 1 }) : (A(), w("span", By, [
                    T(
                      "span",
                      xy,
                      M(u.state.displayTitle),
                      1
                      /* TEXT */
                    ),
                    u.type === "sort" ? (A(), w("span", Py, [
                      D(a, {
                        class: "up",
                        fill: u.state.sort === "asc" ? o.activeColor ? o.activeColor : "#f36f64" : "#ccc"
                      }, null, 8, ["fill"]),
                      D(s, {
                        class: "down",
                        fill: u.state.sort === "desc" ? o.activeColor ? o.activeColor : "#f36f64" : "#ccc"
                      }, null, 8, ["fill"])
                    ])) : (A(), G(pe(
                      u.type === "filter" ? "IconUnfilter" : u.type === "selection" && u.state.showPopup ? "IconUp" : "IconDown"
                    ), {
                      key: 1,
                      fill: u.state.showPopup ? o.activeColor ? o.activeColor : "#f36f64" : "#ccc",
                      class: P([u.type === "filter" ? "filter-icon" : ""])
                    }, null, 8, ["fill", "class"]))
                  ]))
                ])
              ],
              6
              /* CLASS, STYLE */
            )
          ], 10, Ey)), [
            [l, o.clickOutside]
          ])),
          128
          /* KEYED_FRAGMENT */
        ))
      ]),
      F(o.$slots, "default")
    ],
    512
    /* NEED_PATCH */
  );
}
const Xn = /* @__PURE__ */ W(Cy, [["render", My]]);
var Oy = function(e) {
  var t, n = (typeof process > "u" ? "undefined" : R(process)) === "object" ? (t = process.env) === null || t === void 0 ? void 0 : t.TINY_MODE : null;
  return Xn;
}, Ly = C(C({}, j), {}, {
  multiStage: {
    type: Boolean,
    default: !1
  },
  checkedStatus: {
    type: Boolean,
    default: !1
  },
  visibleArrow: Boolean,
  arrowOffset: {
    type: Number,
    default: 0
  },
  placement: String,
  // 默认主题 'bottom-end'
  popperClass: String,
  popperAppendToBody: {
    type: Boolean,
    default: !0
  },
  activeColor: String,
  closeOnClickOutside: {
    type: Boolean,
    default: !0
  },
  closeOnClickOverlay: {
    type: Boolean,
    default: !0
  },
  direction: {
    type: String,
    default: "down"
  },
  duration: {
    type: [Number, String],
    default: 0.2
  },
  overlay: {
    type: Boolean,
    default: !0
  },
  zIndex: [Number, String],
  maxHeight: {
    type: [Number, String],
    default: "400"
  },
  // tiny新增
  options: {
    type: Array,
    default: function() {
      return [];
    }
  },
  textField: {
    type: String,
    default: "label"
  }
});
const xt = B({
  name: O + "DropdownMenu",
  componentName: O + "DropdownMenu",
  props: Ly,
  setup: function(e, t) {
    return K({
      props: e,
      context: t,
      template: Oy
    });
  }
}), Ny = "3.20.0";
xt.install = function(o) {
  o.component(xt.name, xt);
};
xt.version = Ny;
var Fy = function(e) {
  return function() {
    return e("click");
  };
}, Ry = ["state", "create"], Vy = function(e, t, n) {
  var r = t.reactive, i = n.emit, a = r({
    urlType: e.type
  }), s = {
    state: a,
    create: Fy(i)
  };
  return s;
};
const Uy = /* @__PURE__ */ B({
  name: O + "Exception",
  components: {
    TinyButton: ye
  },
  props: {
    type: {
      type: String,
      default: "nodata"
    },
    message: String,
    subMessage: String,
    exceptionClass: String,
    buttonText: String,
    imageUrl: String
  },
  setup(o, e) {
    return z({
      props: o,
      context: e,
      renderless: Vy,
      api: Ry
    });
  }
}), Hy = { class: "tiny-mobile-exception__content" }, $y = ["src"], zy = { class: "tiny-mobile-exception__content-message" }, jy = { class: "main-message" }, Wy = {
  key: 0,
  class: "sub-message"
}, Gy = { class: "tiny-mobile-exception__footer" };
function Yy(o, e, t, n, r, i) {
  const a = $("tiny-button");
  return A(), w(
    "div",
    {
      class: P(["tiny-mobile-exception", o.exceptionClass])
    },
    [
      T("div", Hy, [
        o.imageUrl ? (A(), w("img", {
          key: 0,
          src: o.imageUrl,
          class: "tiny-mobile-exception__image"
        }, null, 8, $y)) : (A(), w(
          "div",
          {
            key: 1,
            class: P(["tiny-mobile-exception__content-view", ["tiny-mobile-exception__content-" + o.type]])
          },
          null,
          2
          /* CLASS */
        )),
        F(o.$slots, "content", {}, () => [
          T("div", zy, [
            T(
              "div",
              jy,
              M(o.state.message),
              1
              /* TEXT */
            ),
            o.subMessage ? (A(), w(
              "div",
              Wy,
              M(o.subMessage),
              1
              /* TEXT */
            )) : x("v-if", !0),
            o.type === "nodata" ? F(o.$slots, "default", { key: 1 }, () => [
              D(a, {
                onClick: o.create,
                type: "primary",
                size: "medium",
                round: ""
              }, {
                default: ee(() => [
                  ue(
                    M(o.buttonText ? o.buttonText : o.t("ui.exception.create")),
                    1
                    /* TEXT */
                  )
                ]),
                _: 1
                /* STABLE */
              }, 8, ["onClick"])
            ]) : x("v-if", !0)
          ])
        ])
      ]),
      T("div", Gy, [
        F(o.$slots, "footer")
      ])
    ],
    2
    /* CLASS */
  );
}
const nr = /* @__PURE__ */ W(Uy, [["render", Yy]]);
var Ky = function(e) {
  var t, n = (typeof process > "u" ? "undefined" : R(process)) === "object" ? (t = process.env) === null || t === void 0 ? void 0 : t.TINY_MODE : null;
  return nr;
};
const Pt = B({
  name: O + "Exception",
  props: C(C({}, j), {}, {
    type: {
      type: String,
      default: "nodata"
    },
    message: String,
    subMessage: String,
    exceptionClass: String,
    imageUrl: String,
    pageEmpty: {
      type: Boolean,
      default: !1
    },
    componentPage: {
      type: Boolean,
      default: !1
    }
  }),
  setup: function(e, t) {
    return K({
      props: e,
      context: t,
      template: Ky
    });
  }
});
const Qy = "3.20.0";
Pt.install = function(o) {
  o.component(Pt.name, Pt);
};
Pt.version = Qy;
var xs = function() {
  if (typeof Map < "u")
    return Map;
  var o = function(t, n) {
    var r = -1;
    return t.some(function(i, a) {
      return i[0] === n ? (r = a, !0) : !1;
    }), r;
  };
  return function() {
    function e() {
      this.__entries__ = [];
    }
    return Object.defineProperty(e.prototype, "size", {
      get: function() {
        return this.__entries__.length;
      },
      enumerable: !0,
      configurable: !0
    }), e.prototype.get = function(t) {
      var n = o(this.__entries__, t), r = this.__entries__[n];
      return r && r[1];
    }, e.prototype.set = function(t, n) {
      var r = o(this.__entries__, t);
      ~r ? this.__entries__[r][1] = n : this.__entries__.push([t, n]);
    }, e.prototype.delete = function(t) {
      var n = this.__entries__, r = o(n, t);
      ~r && n.splice(r, 1);
    }, e.prototype.clear = function() {
      this.__entries__.splice(0);
    }, e.prototype.has = function(t) {
      return !!~o(this.__entries__, t);
    }, e.prototype.forEach = function(t, n) {
      n === void 0 && (n = null);
      for (var r = 0, i = this.__entries__; r < i.length; r++) {
        var a = i[r];
        t.call(n, a[1], a[0]);
      }
    }, e;
  }();
}(), Xy = un ? window.Function : global.Function, Eo = function() {
  var o = function(t) {
    return t.Math === Math;
  };
  return typeof global < "u" && o(global) ? global : typeof self < "u" && o(self) ? self : typeof window < "u" && o(window) ? window : Xy("return this")();
}(), Zy = function() {
  return typeof requestAnimationFrame == "function" ? requestAnimationFrame.bind(Eo) : function(o) {
    return setTimeout(function() {
      return o(Date.now());
    }, 1e3 / 60);
  };
}(), Jy = 2;
function qy(o, e) {
  var t = !1, n = !1, r = 0, i, a = function() {
    t && (t = !1, o()), n && i();
  }, s = function() {
    Zy(a);
  };
  return i = function() {
    var u = Date.now();
    if (t) {
      if (u - r < Jy)
        return;
      n = !0;
    } else
      t = !0, n = !1, setTimeout(s, e);
    r = u;
  }, i;
}
var _y = 20, eb = ["top", "right", "bottom", "left", "width", "height", "size", "weight"], tb = typeof MutationObserver < "u", nb = function() {
  function o() {
    this.observers_ = [], this.connected_ = !1, this.mutationEventsAdded_ = !1, this.mutationsObserver_ = null, this.onTransitionEnd_ = this.onTransitionEnd_.bind(this), this.refresh = qy(this.refresh.bind(this), _y);
  }
  return o.prototype.addObserver = function(e) {
    !~this.observers_.indexOf(e) && this.observers_.push(e), !this.connected_ && this.connect_();
  }, o.prototype.removeObserver = function(e) {
    var t = this.observers_, n = t.indexOf(e);
    ~n && t.splice(n, 1), !t.length && this.connected_ && this.disconnect_();
  }, o.prototype.refresh = function() {
    var e = this.updateObservers_();
    e && this.refresh();
  }, o.prototype.updateObservers_ = function() {
    var e = this.observers_.filter(function(t) {
      return t.gatherActive(), t.hasActive();
    });
    return e.forEach(function(t) {
      return t.broadcastActive();
    }), e.length > 0;
  }, o.prototype.connect_ = function() {
    if (!(!un || this.connected_)) {
      if (N(document, "transitionend", this.onTransitionEnd_), N(window, "resize", this.refresh), tb) {
        this.mutationsObserver_ = new MutationObserver(this.refresh);
        var e = {
          attributes: !0,
          childList: !0,
          characterData: !0,
          subtree: !0
        };
        this.mutationsObserver_.observe(document, e);
      } else
        N(document, "DOMSubtreeModified", this.refresh), this.mutationEventsAdded_ = !0;
      this.connected_ = !0;
    }
  }, o.prototype.disconnect_ = function() {
    !un || !this.connected_ || (U(document, "transitionend", this.onTransitionEnd_), U(window, "resize", this.refresh), this.mutationsObserver_ && this.mutationsObserver_.disconnect(), this.mutationEventsAdded_ && U(document, "DOMSubtreeModified", this.refresh), this.mutationsObserver_ = null, this.mutationEventsAdded_ = !1, this.connected_ = !1);
  }, o.prototype.onTransitionEnd_ = function(e) {
    var t = e.propertyName, n = t === void 0 ? "" : t, r = eb.some(function(i) {
      return !!~n.indexOf(i);
    });
    r && this.refresh();
  }, o.getInstance = function() {
    return this._instance || (this._instance = new o()), this._instance;
  }, o._instance = null, o;
}(), Ps = function(e, t) {
  for (var n = 0, r = Object.keys(t); n < r.length; n++) {
    var i = r[n];
    Object.defineProperty(e, i, {
      value: t[i],
      configurable: !0,
      writable: !1,
      enumerable: !1
    });
  }
  return e;
}, Ho = function(e, t, n, r) {
  return {
    x: e,
    y: t,
    width: n,
    height: r
  };
}, pn = function(e) {
  var t = e && e.ownerDocument && e.ownerDocument.defaultView;
  return t || Eo;
}, Ms = Ho(0, 0, 0, 0), Do = function(e) {
  return parseFloat(e) || 0;
}, Ki = function(e) {
  for (var t = [], n = 1; n < arguments.length; n++)
    t[n - 1] = arguments[n];
  return t.reduce(function(r, i) {
    var a = e["border-".concat(i, "-width")];
    return r + Do(a);
  }, 0);
}, ob = function(e) {
  for (var t = ["top", "right", "bottom", "left"], n = {}, r = 0, i = t; r < i.length; r++) {
    var a = i[r], s = e["padding-".concat(a)];
    n[a] = Do(s);
  }
  return n;
}, rb = function(e) {
  var t = e.getBBox();
  return Ho(0, 0, t.width, t.height);
}, ib = function(e) {
  return e === pn(e).document.documentElement;
}, ab = function(e) {
  var t = e.clientWidth, n = e.clientHeight;
  if (!n && !t)
    return Ms;
  var r = pn(e).getComputedStyle(e), i = ob(r), a = i.top + i.bottom, s = i.left + i.right, l = Do(r.width), u = Do(r.height);
  if (r.boxSizing === "border-box" && (Math.round(u + a) !== n && (u -= Ki(r, "top", "bottom") + a), Math.round(l + s) !== t && (l -= Ki(r, "left", "right") + s)), !ib(e)) {
    var c = Math.round(u + a) - n, d = Math.round(l + s) - t;
    Math.abs(c) !== 1 && (u -= c), Math.abs(d) !== 1 && (l -= d);
  }
  return Ho(i.left, i.top, l, u);
}, sb = function() {
  return typeof SVGGraphicsElement < "u" ? function(o) {
    return o instanceof pn(o).SVGGraphicsElement;
  } : function(o) {
    return o instanceof pn(o).SVGElement && typeof o.getBBox == "function";
  };
}(), lb = function(e) {
  return un ? sb(e) ? rb(e) : ab(e) : Ms;
}, ub = function(e) {
  var t = e.x, n = e.y, r = e.width, i = e.height, a = typeof DOMRectReadOnly < "u" ? DOMRectReadOnly : Object, s = Object.create(a.prototype);
  return Ps(s, {
    x: t,
    y: n,
    width: r,
    height: i,
    top: n,
    right: t + r,
    bottom: i + n,
    left: t
  }), s;
}, cb = function() {
  function o(e) {
    this.broadcastWidth = 0, this.broadcastHeight = 0, this.contentRect_ = Ho(0, 0, 0, 0), this.target = e;
  }
  return o.prototype.broadcastRect = function() {
    var e = this.contentRect_;
    return this.broadcastWidth = e.width, this.broadcastHeight = e.height, e;
  }, o.prototype.isActive = function() {
    var e = lb(this.target);
    return this.contentRect_ = e, e.width !== this.broadcastWidth || e.height !== this.broadcastHeight;
  }, o;
}(), db = function() {
  function o(e, t) {
    var n = ub(t);
    Ps(this, {
      target: e,
      contentRect: n
    });
  }
  return o;
}(), pb = function() {
  function o(e, t, n) {
    if (this.observations_ = new xs(), this.activeObservations_ = [], typeof e != "function")
      throw new TypeError("[TINY-Resize] The callback provided as parameter 1 is not a function.");
    this.callback_ = e, this.controller_ = t, this.callbackCtx_ = n;
  }
  return o.prototype.observe = function(e) {
    if (!arguments.length)
      throw new TypeError("[TINY-Resize] 1 argument required, but only 0 present.");
    if (!(typeof Element > "u" || !(Element instanceof Object))) {
      if (!(e instanceof pn(e).Element))
        throw new TypeError('[TINY-Resize] parameter 1 is not of type "Element".');
      var t = this.observations_;
      t.has(e) || (t.set(e, new cb(e)), this.controller_.addObserver(this), this.controller_.refresh());
    }
  }, o.prototype.unobserve = function(e) {
    if (!arguments.length)
      throw new TypeError("[TINY-Resize]1 argument required, but only 0 present.");
    if (!(typeof Element > "u" || !(Element instanceof Object))) {
      if (!(e instanceof pn(e).Element))
        throw new TypeError('[TINY-Resize] parameter 1 is not of type "Element".');
      var t = this.observations_;
      t.has(e) && (t.delete(e), !t.size && this.controller_.removeObserver(this));
    }
  }, o.prototype.gatherActive = function() {
    var e = this;
    this.clearActive(), this.observations_.forEach(function(t) {
      t.isActive() && e.activeObservations_.push(t);
    });
  }, o.prototype.disconnect = function() {
    this.clearActive(), this.observations_.clear(), this.controller_.removeObserver(this);
  }, o.prototype.broadcastActive = function() {
    if (this.hasActive()) {
      var e = this.callbackCtx_, t = this.activeObservations_.map(function(n) {
        return new db(n.target, n.broadcastRect());
      });
      this.callback_.call(e, t, e), this.clearActive();
    }
  }, o.prototype.hasActive = function() {
    return this.activeObservations_.length > 0;
  }, o.prototype.clearActive = function() {
    this.activeObservations_.splice(0);
  }, o;
}(), Os = typeof WeakMap < "u" ? /* @__PURE__ */ new WeakMap() : new xs(), Ls = function() {
  function o(e) {
    if (!(this instanceof o))
      throw new TypeError("[TINY-Resize] Cannot call a class as a function.");
    if (!arguments.length)
      throw new TypeError("[TINY-Resize] 1 argument required, but only 0 present.");
    var t = nb.getInstance(), n = new pb(e, t, this);
    Os.set(this, n);
  }
  return o;
}();
["observe", "unobserve", "disconnect"].forEach(function(o) {
  Ls.prototype[o] = function() {
    var e;
    return (e = Os.get(this))[o].apply(e, arguments);
  };
});
var fb = function() {
  return typeof Eo.ResizeObserver < "u" ? Eo.ResizeObserver : Ls;
}();
const mb = fb;
var vb = typeof window > "u", Qe = "__resizeListeners__", hb = function(e) {
  e.forEach(function(t) {
    var n = t.target[Qe] || [];
    n.length && n.forEach(function(r) {
      r();
    });
  });
}, Ns = function(e, t) {
  vb || (e[Qe] || (e[Qe] = [], e.__ro__ = new mb(hb), e.__ro__.observe(e)), e[Qe].push(t));
}, Fs = function(e, t) {
  !e || !e[Qe] || (e[Qe].splice(e[Qe].indexOf(t), 1), e[Qe].length || (e.__ro__.disconnect(), delete e.__ro__));
}, gb = function() {
  return function(e) {
    return parseInt(e, 10);
  };
}, Ab = function(e) {
  var t = e.props, n = e.api, r = e.parent;
  return function(i, a) {
    if (i.preventDefault(), r.state.isEdm) {
      var s = n.getApi(), l = s.downloadFile;
      t.openDownloadFile && l && l(a);
    } else
      t.openDownloadFile && n.downloadFile(a);
    return t.handlePreview && t.handlePreview(a);
  };
}, Rs = function(e) {
  return function(t) {
    var n = t && t.response && t.response.data, r;
    if (Array.isArray(n))
      r = n[0];
    else if (n && R(n) === "object")
      for (var i in n) {
        r = n[i];
        break;
      }
    if (r)
      e.getFileDownloadUrl().then(function(a) {
        window.open(Ae.filterUrl(a + "&id=" + r.attachmentId + "&type=AttachmentDemo")).opener = null;
      });
    else if (t.url)
      window.open(Ae.filterUrl(t.url)).opener = null;
    else
      throw new Error("[TINY Error][FileUpload]file.url must not be empty");
  };
}, yb = function(e) {
  return function(t) {
    e.startPostion = t, e.shows = !0;
  };
}, bb = function(e) {
  return function(t) {
    e("remove", t);
  };
}, Sb = function(e) {
  var t = e.state;
  return function(n) {
    var r = n.file;
    t.currentFile = r, t.showPanel = !0;
  };
}, wb = function(e) {
  var t = e.emit, n = e.props, r = e.parent;
  return function(i) {
    r.state.isEdm ? t("start", [i && i.raw], "", !0) : n.handleReUpload && n.handleReUpload(i);
  };
}, Tb = function(e, t) {
  var n = e.type, r = e.el;
  return r && r.addEventListener(n, t);
}, Bo = function(e, t) {
  var n = e.type, r = e.el;
  return r && r.removeEventListener(n, t);
}, Cb = function(e) {
  var t = e.vm, n = e.api, r = e.props;
  return function(i) {
    var a = i.file, s = i.index, l = i.type;
    if (r.isHwh5)
      return r.triggerPlay(a, l, "play");
    var u = t.$refs[l + (a.uid || s)] && t.$refs[l + (a.uid || s)][0];
    if (a.isPlay)
      return n.pause({
        file: a,
        index: s,
        type: l
      });
    u && u.play && (a.playEvent = function() {
      a && (a.isPlay = !1, Bo({
        type: "ended",
        el: u
      }, a.playEvent));
    }, a.el = u, Bo({
      type: "ended",
      el: u
    }, a.playEvent), Tb({
      type: "ended",
      el: u
    }, a.playEvent), t.$set(a, "isPlay", !0), u.play());
  };
}, Ib = function(e) {
  var t = e.vm, n = e.props;
  return function(r) {
    var i = r.file, a = r.index, s = r.type;
    if (n.isHwh5)
      return n.triggerPlay(i, s, "pause");
    var l = t.$refs[s + (i.uid || a)] && t.$refs[s + (i.uid || a)][0];
    l && l.pause && (Bo({
      type: "ended",
      el: l
    }, i.playEvent), i.isPlay = !1, l.pause());
  };
}, kb = function(e) {
  var t = e.vm;
  return function(n) {
    var r, i, a = n.e, s = n.file;
    t.$set(s, "totalSecond", parseInt((r = a.target) === null || r === void 0 ? void 0 : r.duration)), t.$set(s, "currentSecond", parseInt((i = a.target) === null || i === void 0 ? void 0 : i.currentTime));
  };
}, Eb = function() {
  return function(e) {
    var t, n = e.e, r = e.file;
    r.currentSecond = parseInt((t = n.target) === null || t === void 0 ? void 0 : t.currentTime);
  };
}, Db = function() {
  return function(e) {
    var t = e.file;
    return t.name && t.name.split(".")[t.name.split(".").length - 1].toLowerCase();
  };
}, Bb = function(e) {
  var t = e.constants;
  return function(n) {
    var r, i = n.type, a = t.FILE_TYPE, s = a.EXCEL, l = a.FILE, u = a.PDF, c = a.PICTURE, d = a.PPT, p = a.TEXT, f = a.WORD, m = a.ZIP, h = a.VIDEO, v = a.AUDIO, g = (r = {}, ne(ne(ne(ne(ne(ne(ne(ne(ne(ne(r, s, {
      name: "icon-excel-type",
      color: "#09AA71"
    }), l, {
      name: "icon-file-type",
      color: "#09AA71"
    }), u, {
      name: "icon-pdf-type",
      color: "#E02128"
    }), c, {
      name: "icon-picture-type",
      color: "#5531EB"
    }), d, {
      name: "icon-ppt-type",
      color: "#E02128"
    }), p, {
      name: "icon-text-type",
      color: "#2CB8C9"
    }), f, {
      name: "icon-word-type",
      color: "#0067D1"
    }), m, {
      name: "icon-zip-type",
      color: "#2CB8C9"
    }), h, {
      name: "icon-video-type",
      color: "#0067D1"
    }), v, {
      name: "icon-audio",
      color: "#5531EB"
    }), ne(r, "default", {
      name: "icon-other-type",
      color: "#9185F0"
    })), b = function() {
      if (Object.hasOwnProperty.call(g, y)) {
        var I = g[y];
        delete g[y], y.split("/").forEach(function(k) {
          return g[k] = I;
        });
      }
    };
    for (var y in g)
      b();
    return g[i] || g.default;
  };
}, xb = function(e) {
  var t = e.emit;
  return function(n) {
    var r = n.file;
    return t("remove", r);
  };
}, Pb = function(e) {
  var t = e.vm, n = e.nextTick, r = e.props, i = e.constants;
  return function() {
    var a = r.listType, s = i.LIST_TYPE;
    n(function() {
      var l = t.$refs.uploadList, u = l && l.querySelectorAll('[data-tag="tiny-upload-list-item"]');
      if (!(!l || !(u && u[0])) && (a === s.TEXT || a === s.SAAS)) {
        var c = window.getComputedStyle(u && u[0]), d = c.minWidth, p = 8, f = Math.floor(l.offsetWidth / (parseFloat(d) + p));
        Array.from(u).forEach(function(m, h) {
          !((h + 1) % f) || f === 1 ? (m.style.marginRight = 0, m.style.width = "".concat(100 / f, "%")) : (m.style.marginRight = "".concat(p, "px"), m.style.width = "calc(".concat(100 / f, "% - ").concat(p, "px)"));
        });
      }
    });
  };
}, Mb = function(e) {
  var t = e.props, n = e.constants, r = e.emit;
  return function() {
    var i = n.FILE_STATUS.SUCESS, a = t.files.every(function(s) {
      var l = s.status;
      return l === i || !l;
    });
    r("update:visible", !a);
  };
}, Ob = function(e) {
  var t = e.props, n = e.constants;
  return function() {
    var r = n.FILE_STATUS.SUCESS, i = t.files;
    return t.mode === n.MODE.BUBBLE && t.listType === n.LIST_TYPE.TEXT && (i = t.files.filter(function(a) {
      var s = a.status;
      return s !== r;
    })), i;
  };
}, Lb = function(e) {
  var t = e.state, n = e.constants;
  return function(r) {
    var i = n.SOURCE_TYPE.SOURCE_AUDIO;
    r === i ? t.showAudioPanel = !0 : t.showTriggerPanel = !0, t.triggerClickType = r;
  };
}, Nb = function(e) {
  var t = e.state, n = e.props;
  return function(r, i) {
    return new Promise(function(a) {
      var s = n.triggerClick(r, t.triggerClickType, i);
      s && s.then ? s.then(function() {
        t.showTriggerPanel = !1, a();
      }).catch(function() {
        t.showTriggerPanel = !1, t.showAudioPanel = !1;
      }) : (t.showTriggerPanel = !1, a());
    });
  };
}, Fb = function(e) {
  var t = e.api, n = e.vm;
  return function() {
    var r = n.$refs.uploadList;
    r && (Ns(r, t.calcUploadListLiWidth), n._removeResizeListener = function() {
      return Fs(r, t.calcUploadListLiWidth);
    });
  };
}, Rb = function(e) {
  var t = e.props, n = e.vm;
  return function() {
    n._removeResizeListener && (n._removeResizeListener(), n._removeResizeListener = null), t.files.forEach(function(r) {
      Bo({
        type: "ended",
        el: r.el
      }, r.playEvent), delete r.playEvent, delete r.isPlay, delete r.el;
    });
  };
}, Vb = function(e) {
  var t = e.responseText || e.response;
  if (!t)
    return t;
  try {
    return JSON.parse(t);
  } catch {
    return t;
  }
}, Ub = function(e, t, n) {
  var r;
  n.response ? r = n.response.error || n.response : n.responseText ? r = n.responseText : r = "fail to post ".concat(e, " ").concat(n.status);
  var i = new Error(r);
  return i.status = n.status, i.method = "post", i.url = e, i;
};
const Vs = function(o) {
  if (!(typeof XMLHttpRequest > "u")) {
    var e = new XMLHttpRequest(), t = Ae.filterUrl(o.action);
    e.upload && (e.upload.onprogress = function(a) {
      a.total > 0 && (a.percent = a.loaded / a.total * 100), o.onProgress(a);
    });
    var n = new FormData();
    o.data && Object.keys(o.data).forEach(function(a) {
      n.append(a, o.data[a]);
    }), Array.isArray(o.file) ? o.file.forEach(function(a) {
      n.append(o.filename, a, a.name);
    }) : n.append(o.filename, o.file, o.file.name), e.onerror = function(a) {
      o.onError(a);
    }, e.onload = function() {
      if (e.status < 200 || e.status >= 300)
        return o.onError(Ub(t, o, e));
      o.onSuccess(Vb(e));
    }, e.open("post", t, !0), o.withCredentials && "withCredentials" in e && (e.withCredentials = !0);
    var r = o.headers || {};
    for (var i in r)
      hn.call(r, i) && r[i] !== null && e.setRequestHeader(i, r[i]);
    return e.send(n), e;
  }
};
var or = null, fe = function(e, t) {
  var n = function() {
    return t ? Promise.reject(new Error("[TINY Error][FileUpload] Prop ".concat(t, " is mandatory when the framework service is not used"))) : Promise.reject(new Error("[TINY Error][FileUpload] Prop action is mandatory when the framework service is not used"));
  };
  return e || n;
}, Us = function(e) {
  var t = e.props, n = e.service, r = n || {}, i = r.network, a = i === void 0 ? {} : i, s = r.common, l = s === void 0 ? {} : s, u = a.request, c = a.get, d = a.post, p = a.all, f = a.spread, m = a.CancelToken, h = m === void 0 ? {} : m, v;
  if (Tr(t.hwh5))
    u ? v = t.httpRequest || u : v = t.httpRequest || Vs;
  else {
    var g = t.hwh5.HWH5, b = g(), y = b.uploadToEDM;
    v = t.httpRequest || y;
  }
  return {
    get: fe(c),
    post: fe(d),
    request: fe(u),
    all: fe(p),
    spread: fe(f),
    cancelToken: fe(h.source),
    getSingleUploadUrl: fe(l.getSingleUploadUrl),
    getFileUploadUrl: fe(l.getFileUploadUrl),
    getFileDownloadUrl: fe(l.getFileDownloadUrl),
    getSingleDownloadUrl: fe(l.getSingleDownloadUrl),
    getPackageDownloadUrl: fe(l.getPackageDownloadUrl),
    getAsyncPackageDownload: fe(l.getAsyncPackageDownload),
    getLargeFileInitUrl: fe(l.getLargeFileInitUrl),
    getChunkUploadUrl: fe(l.getChunkUploadUrl),
    getPreviewUrl: fe(l.getPreviewUrl),
    getDocumentInfoUrl: fe(l.getDocumentInfoUrl),
    getPreviewUrlBatch: fe(l.getPreviewUrlBatch),
    httpRequest: fe(v, "httpRequest")
  };
}, Hb = function(e) {
  var t = e.props, n = e.state;
  return function() {
    return t.disabled || (n.form || {}).disabled;
  };
}, $b = function(e) {
  var t = e.state, n = e.constants;
  return function() {
    return t.uploadingFiles.reduce(function(r, i) {
      return r + i.status !== n.FILE_STATUS.FAIL ? i.size : 0;
    }, 0);
  };
}, zb = function(e) {
  var t = e.constants, n = e.state, r = e.api;
  return function(i) {
    [t.LIST_TYPE.PICTURE_CARD, t.LIST_TYPE.PICTURE, t.LIST_TYPE.PICTURE_SINGLE, t.LIST_TYPE.DRAG_SINGLE].includes(i) && (n.uploadFiles = n.uploadFiles.map(function(a) {
      if (a.type = r.getFileSourceType({
        file: a
      }), !a.url && a.raw)
        try {
          a.url = URL.createObjectURL(a.raw);
        } catch {
          return null;
        }
      return a;
    }));
  };
}, jb = function(e) {
  var t = e.constants, n = e.state, r = e.props;
  return e.api, function(i) {
    var a = i && i.map(function(s) {
      return s.uid = s.uid || Date.now() + n.tempIndex++, s.status = s.status || t.FILE_STATUS.SUCESS, s;
    });
    [t.LIST_TYPE.PICTURE_SINGLE, t.LIST_TYPE.DRAG_SINGLE].includes(r.listType) && (a = a.slice(0, 1)), n.uploadFiles = a;
  };
}, Wb = function(e) {
  var t = e.flag, n = e.doUpload, r = e.file;
  return !t && n(r);
}, Gb = function(e) {
  var t = e.before, n = e.rawFile, r = e.file, i = e.doUpload, a = e.autoRemove, s = e.api;
  t.then(function(l) {
    var u = Object.prototype.toString.call(l);
    if (u === "[object File]" || u === "[object Blob]") {
      u === "[object Blob]" && (l = new File([l], n.name, {
        type: n.type
      }));
      for (var c in n)
        Object.prototype.hasOwnProperty.call(n, c) && (l[c] = n[c]);
      r.raw = l;
    }
    i(r);
  }, function() {
    a && (Array.isArray(n) ? n.forEach(function(l) {
      return s.handleRemove(null, l);
    }) : s.handleRemove(null, n));
  });
}, Hs = function(e) {
  var t = e.file, n = t.name, r = t.url, i = "";
  return n && /\.[^.]+$/.test(n) ? i = n.split(".")[n.split(".").length - 1].toLowerCase() : r && /\.[.]+$/.test(r) && (i = r.split(".")[r.split(".").length - 1].toLowerCase()), i;
}, Qi = function(e) {
  var t = e.api, n = e.file, r = e.autoRemove;
  if (r) {
    var i = n.raw;
    Array.isArray(i) ? i.forEach(function(a) {
      return t.handleRemove(null, a);
    }) : t.handleRemove(null, i);
  }
}, Yb = function(e) {
  var t = e.props, n = e.api, r = e.Modal, i = e.constants, a = e.t, s = e.state;
  return function(l, u, c) {
    if (s.isEdm && l.name.length > 255)
      return Qi({
        api: n,
        file: l,
        autoRemove: u
      }), r.message({
        message: "".concat(a(i.EDM.THEFILENAME), '"').concat(l.name, '"').concat(a(i.EDM.FILENAMEEXCEEDS)),
        status: "warning"
      });
    if (l) {
      var d = !0, p = s.isEdm ? s.accept : t.accept, f = i.FILE_TYPE[s.triggerClickType.toUpperCase()], m = Hs({
        file: l
      });
      if (p) {
        var h = p.split(",").some(function(E) {
          return E.toLowerCase() === i.IMAGE_TYPE ? i.FILE_TYPE.PICTURE.split("/").includes(m) : new RegExp("(".concat(E.trim(), ")$"), "i").test(l.name);
        });
        !h && (d = !1);
      }
      if (s.triggerClickType && f) {
        var v = f.split("/").includes(m);
        !v && (d = !1);
      }
      if (!d)
        return Qi({
          api: n,
          file: l,
          autoRemove: u
        }), r.message({
          message: m ? a(i.EDM.notSupport, {
            format: m
          }) : a(i.EDM.NOT_SUPPORT_NO_SUFFIX),
          status: "warning"
        });
    }
    var g = typeof t.beforeUpload == "function";
    if (Wb({
      flag: g,
      doUpload: c,
      file: l
    }), g) {
      var b = {}, y = b.rawFile, S = y === void 0 ? l.raw : y, I = b.before, k = I === void 0 ? t.beforeUpload(S) : I;
      k && k.then ? Gb({
        before: k,
        rawFile: S,
        file: l,
        doUpload: c,
        autoRemove: u,
        api: n
      }) : k !== !1 ? c(l) : u && (Array.isArray(S) ? S.forEach(function(E) {
        return n.handleRemove(null, E);
      }) : n.handleRemove(null, S));
    }
  };
}, Kb = function(e) {
  var t = e.state, n = e.constants, r = e.vm, i = e.Modal, a = e.api, s = e.t;
  return function(l, u) {
    if (t.isHwh5) {
      r.$refs[n.UPLOAD_INNER].$refs[n.UPLOAD_INNER_TEMPLATE].upload(l.raw);
      return;
    }
    l.size > t.docSize && l.size > t.chunkSize ? (l.isLargeFile = !0, u && t.uploadFiles.forEach(function(c) {
      c.cacheSign === l.cacheSign && (c.percentage = 0);
    }), a.largeDocumentUpload(l), i.message({
      message: "".concat(l.name).concat(s(n.EDM.LARGEFILEKEY)),
      status: "warning"
    })) : r.$refs[n.UPLOAD_INNER].$refs[n.UPLOAD_INNER_TEMPLATE].upload(l.raw);
  };
}, Qb = function(e, t) {
  var n = e.name.lastIndexOf("."), r = e.name.length;
  t.fileType = e.name.substring(n + 1, r);
  var i = e.size / 1024;
  if (i < 1024)
    t.size = Math.round(i * Math.pow(10, 1)) / Math.pow(10, 1) + "KB";
  else {
    var a = i / 1024;
    t.size = Math.round(a * Math.pow(10, 1)) / Math.pow(10, 1) + "MB";
  }
}, Xb = function(e) {
  var t = e.props, n = e.state, r = e.api, i = e.constants, a = e.Modal, s = e.t;
  return function(l) {
    if ([void 0, null].includes(l.size))
      return !0;
    var u = 0;
    if (Array.isArray(t.fileSize) && t.fileSize[1] ? u = n.isEdm ? Math.min(n.singleMaxSize, t.fileSize[1] / 1024) : Math.max(t.fileSize[0] / 1024, t.fileSize[1] / 1024) : u = n.isEdm ? Math.min(n.singleMaxSize) : t.fileSize / 1024, !isNaN(Number(u)) && l.size > u * 1024 * 1024)
      return a.message({
        message: s(i.EDM.EXCEED, {
          maxSize: r.formatFileSize(Number(u * 1024 * 1024))
        }),
        status: "warning"
      }), !1;
    if (l.size <= 0)
      return a.message({
        message: s(i.EDM.FILEEMPTY),
        status: "warning"
      }), !1;
    var c = t.fileSize && (t.fileSize[0] || t.fileSize) || 0;
    return l.size <= c * 1024 ? (a.message({
      message: "".concat(s(i.EDM.SIZE, {
        minSize: r.formatFileSize(Number(c), "K"),
        sizeUnit: ""
      })),
      status: "warning"
    }), !1) : !0;
  };
}, Zb = function(e) {
  var t = e.api, n = e.constants, r = e.emit, i = e.props, a = e.state, s = e.mode;
  return function(l, u, c) {
    !c && (l.uid = Date.now() + a.tempIndex++);
    var d = {
      status: n.FILE_STATUS.READY,
      name: l.name,
      size: l.size
    };
    if (Object.assign(d, {
      percentage: 0,
      uid: l.uid,
      raw: l,
      response: {}
    }), d.type = t.getFileSourceType({
      file: d
    }), a.isEdm) {
      var p = {
        serverName: "",
        docRelativePath: "",
        docId: "",
        docVersion: "",
        cacheSign: l.uid
      };
      d = Object.assign(d, p), i.edm.upload.isFolder && (d.path = l.webkitRelativePath.match(/.*\//g)[0]);
    }
    if (a.cacheDocuments[d.uid] = d, s === "mobile" && Qb(l, d), [n.LIST_TYPE.PICTURE_CARD, n.LIST_TYPE.PICTURE, n.LIST_TYPE.PICTURE_SINGLE, n.LIST_TYPE.DRAG_SINGLE].includes(i.listType))
      try {
        a.isHwh5 ? d.url = l.filePath : d.url = URL.createObjectURL(l);
      } catch {
        return;
      }
    if (a.isEdm && a.isSuccess) {
      var f = t.properFileSize(d);
      if (!f)
        return;
      if (a.updateId = u || i.edm.updateId || "", c) {
        var m = a.uploadFiles.findIndex(function(g) {
          return g.uid === d.uid;
        });
        a.uploadFiles.splice(m, 1);
      } else if (a.updateId) {
        var h = a.uploadFiles.findIndex(function(g) {
          return g.docId === u;
        });
        a.uploadFiles.splice(h, 1, d), r("change", d, a.uploadFiles);
        return;
      }
    }
    if (!a.isEdm) {
      var v = t.properFileSize(d);
      if (!v)
        return;
    }
    a.uploadFiles.push(d), a.currentUploadingFileUids.push(d.uid), r("change", d, a.uploadFiles);
  };
}, Jb = function(e) {
  var t = e.emit, n = e.Modal, r = e.constants, i = e.t, a = e.CryptoJS, s = e.state;
  return function(l) {
    var u = l.file, c = l.chunkSize, d = l.showTips;
    d && n.message({
      message: "".concat(i(r.EDM.CALCHASH)),
      status: "warning"
    });
    var p = Math.ceil(u.size / c), f = 0, m = f * c, h = Math.min(u.size, m + c), v = u.raw.slice(m, h), g = a.algo.SHA256.create(), b = 0;
    return new Promise(function(y) {
      var S = new FileReader();
      S.readAsArrayBuffer(v), S.onload = function(I) {
        if (u.status !== r.FILE_STATUS.FAIL) {
          f++;
          var k = a.lib.WordArray.create(I.target.result);
          if (g.update(k), k = null, f < p)
            m = f * c, h = Math.min(u.size, m + c), b += h - m, t("hash-progress", Math.min(Math.floor(b / u.size * 100), 100)), v = u.raw.slice(m, h), S.readAsArrayBuffer(v);
          else {
            var E = g.finalize().toString();
            u.hash = u.raw.hash = E, y(E), t("hash-progress", 100);
          }
        }
      }, S.onerror = function(I) {
        u.status = r.FILE_STATUS.FAIL, t("error", I, u, s.uploadFiles);
      };
    });
  };
}, qb = function(e, t) {
  var n = t && t.fileMap;
  return e.map(function(r) {
    if (r instanceof File)
      return r;
    var i, a = {};
    Ee(r) ? (i = r.url, a = r) : i = r;
    var s = i.match(/[^/]*$/), l = Gt(s, 2), u = l[0], c = l[1], d = i.match(/\.[^.]*$/), p = Gt(d, 1), f = p[0], m = i.substring(0, c), h = C(C({}, a), {}, {
      type: f,
      name: u,
      filePath: m,
      webkitRelativePath: m
    });
    return typeof n == "function" ? n(h) : h;
  });
}, _b = function(e) {
  var t = e.api, n = e.constants, r = e.props, i = e.state, a = e.vm;
  return function(s, l) {
    var u = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
    i.isHwh5 && (s = qb(s, r.hwh5)), i.currentUploadingFileUids = [], s.forEach(function(m) {
      return t.addFileToList(m, l, u);
    });
    var c = n.FILE_STATUS, d = c.UPLOADING, p = c.READY;
    if (i.uploadingFiles = i.uploadFiles.filter(function(m) {
      return [d, p].includes(m.status);
    }), i.isEdm && i.isSuccess && s.forEach(function(m) {
      var h = t.getFile(m);
      h && t.beforeUpload(h, !0, function(v) {
        typeof r.edm.upload.loading == "function" && r.edm.upload.loading(v), new Promise(function(g) {
          if (i.isHwh5)
            return g();
          var b = !1;
          if (r.edm.isCheckCode !== !0)
            return g();
          if (v.size > i.docSize && v.size > i.chunkSize)
            if (i.isEntireCheckCode)
              b = !0;
            else
              return g();
          t.getFileHash({
            file: v,
            chunkSize: i.chunkSize,
            showTips: b
          }).then(function(y) {
            return g(y);
          });
        }).then(function() {
          if (r.autoUpload) {
            var g = {
              token: r.edm.upload.token,
              file: v,
              type: "upload"
            };
            t.getToken(g).then(function(b) {
              b && (v.status = n.FILE_STATUS.UPLOADING, t.startUpload(v, !0));
            });
          }
        });
      });
    }), !i.isEdm && r.autoUpload)
      if (r.multiple && r.mergeService) {
        var f = function(h) {
          return a.$refs[n.UPLOAD_INNER].$refs[n.UPLOAD_INNER_TEMPLATE].upload(h.raw);
        };
        s.length && t.beforeUpload({
          raw: s
        }, !0, f);
      } else
        s.forEach(function(m) {
          var h = t.getFile(m);
          if (h) {
            var v = function(b) {
              return a.$refs[n.UPLOAD_INNER].$refs[n.UPLOAD_INNER_TEMPLATE].upload(b.raw);
            };
            t.beforeUpload(h, !0, v);
          }
        });
  };
}, eS = function(e) {
  var t = e.state, n = e.constants;
  return function() {
    var r;
    if (t.isHwh5) {
      var i = t.uploadingFiles.reduce(function(l, u) {
        var c = u.status !== n.FILE_STATUS.FAIL ? u.percentage / 100 : 0;
        return l + c;
      }, 0);
      r = Math.floor(i / t.uploadingFiles.length * 100);
    } else {
      var a = t.uploadingFiles.reduce(function(l, u) {
        var c = u.status !== n.FILE_STATUS.FAIL ? u.size * u.percentage / 100 : 0;
        return l + c;
      }, 0);
      r = Math.floor(a / t.uploadingSize * 100);
    }
    r = Math.min(r, 100);
    var s = t.uploadingFiles.filter(function(l) {
      return l.percentage === 100;
    });
    return {
      percentage: r,
      uploadList: t.uploadingFiles,
      uploadedCount: s.length
    };
  };
}, tS = function(e) {
  var t = e.api, n = e.constants, r = e.emit, i = e.state;
  return function(a, s) {
    if (Array.isArray(s))
      i.uploadFiles.forEach(function(d) {
        s.some(function(p) {
          return d.uid === p.uid;
        }) && (d.status = n.FILE_STATUS.UPLOADING, a.lengthComputable && (d.percentage = Math.floor(a.loaded * 100 / a.total) || 0), r("progress", d, i.uploadFiles, t.calcUploadingFilesInfo()));
      });
    else {
      var l = t.getFile(s);
      if (l)
        if (l.status = n.FILE_STATUS.UPLOADING, i.isHwh5) {
          var u = JSON.parse(a), c = u.progress;
          l.percentage = c, l.percentage >= 100 && (l.isFinished = !0), r("progress", l, i.uploadFiles, t.calcUploadingFilesInfo());
        } else
          a.lengthComputable && !l.isLargeFile && (l.percentage = Math.floor(a.loaded * 100 / a.total) || 0, l.percentage >= 100 && (l.isFinished = !0), r("progress", l, i.uploadFiles, t.calcUploadingFilesInfo()));
    }
  };
}, nS = function(e) {
  var t = e.api, n = e.constants, r = e.emit, i = e.state, a = e.props, s = e.Modal, l = e.t;
  return function(u, c) {
    var d = i.uploadFiles.filter(function(y) {
      return i.currentUploadingFileUids.includes(y.uid);
    });
    if (Array.isArray(c))
      i.uploadFiles.forEach(function(y) {
        c.some(function(S) {
          return y.uid === S.uid;
        }) && (y.status = n.FILE_STATUS.SUCESS, y.percentage = 100, y.response = u, r("success", u, y, d), r("change", y, i.uploadFiles), delete y.cancelToken);
      });
    else {
      var p, f = t.getFile(c), m = u == null || (p = u.data) === null || p === void 0 ? void 0 : p.status, h = n.EDM, v = h.STATUS_SPECIAL_CHARACTERS, g = h.NOT_SUPPORT_SPECIAL_CHARACTERS;
      if (f && delete f.cancelToken, a.edm.upload && f && u.data && m !== 200) {
        m === v && s.message({
          message: "".concat(l(g)),
          status: "warning"
        }), f.status = n.FILE_STATUS.FAIL, r("error", u, f, i.uploadFiles);
        return;
      }
      if (f) {
        if (f.status = n.FILE_STATUS.SUCESS, f.percentage = 100, f.isFinished || r("progress", f, i.uploadFiles, t.calcUploadingFilesInfo()), f.isLargeFile && delete u.config, f.response = u, i.isEdm) {
          var b = i.isHwh5 ? u : u.data.result;
          if (!b)
            return;
          f.serverName = b.serverName, f.docRelativePath = b.docRelativePath, f.docId = b.docId, f.docVersion = b.version, f.docSize = b.docSize, f.isLargeFile && delete f.raw, Object.assign(f, b);
        }
        r("success", u, f, d), r("change", f, i.uploadFiles);
      }
    }
    t.clearUploadingFiles();
  };
}, oS = function(e) {
  var t = e.api, n = e.constants, r = e.emit, i = e.state, a = e.props;
  return function(s, l) {
    var u = t.getFile(l);
    u && (u.status = n.FILE_STATUS.FAIL, u.percentage = 100, !i.isEdm && !a.reUploadable && i.uploadFiles.splice(i.uploadFiles.indexOf(u), 1), t.clearUploadingFiles(), r("error", s, u, i.uploadFiles), r("change", u, i.uploadFiles));
  };
}, rS = function(e) {
  var t = e.api, n = e.emit, r = e.props, i = e.state, a = e.constants;
  return function(s, l) {
    l && (s = t.getFile(l));
    var u = function() {
      t.abort(s);
      var p = i.uploadFiles;
      p.splice(p.indexOf(s), 1), n("remove", C(C({}, s), {}, {
        status: a.FILE_STATUS.FAIL
      }), p);
    };
    if (!r.beforeRemove)
      u();
    else if (typeof r.beforeRemove == "function") {
      var c = r.beforeRemove(s, i.uploadFiles);
      c && c.then ? c.then(function() {
        u();
      }, function() {
      }) : c !== !1 && u();
    }
  };
}, iS = function(e) {
  var t = e.vm, n = e.constants;
  return function(r) {
    var i = n.FILE_STATUS.READY;
    r.status = i, r.percentage = 0, t.$refs[n.UPLOAD_INNER].$refs[n.UPLOAD_INNER_TEMPLATE].upload(r.raw);
  };
}, aS = function(e) {
  return function(t) {
    t.forEach(function(n) {
      n.status === "fail" && e.handleReUpload(n);
    });
  };
}, sS = function(e) {
  var t = e.constants, n = e.state;
  return function() {
    var r = t.FILE_STATUS, i = r.SUCESS, a = r.FAIL, s = n.uploadingFiles.every(function(l) {
      return [i, a].includes(l.status);
    });
    s && (n.uploadingFiles = []);
  };
}, lS = function(e) {
  return function(t) {
    var n = e.uploadFiles, r;
    return n.every(function(i) {
      return r = t.uid === i.uid ? i : null, !r;
    }), r;
  };
}, uS = function(e) {
  var t = e.constants, n = e.vm, r = e.state;
  return function(i) {
    var a = t.FILE_STATUS, s = a.READY, l = a.UPLOADING, u = a.FAIL;
    i ? r.uploadingFiles.forEach(function(c) {
      var d = i.uid || i;
      c.uid === d && [s, l].includes(c.status) && (c.status = u);
    }) : r.uploadingFiles.forEach(function(c) {
      [s, l].includes(c.status) && (c.status = u);
    }), n.$refs[t.UPLOAD_INNER].$refs[t.UPLOAD_INNER_TEMPLATE].abort(i);
  };
}, cS = function(e) {
  var t = e.state;
  return function(n) {
    var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, i = function(s) {
      if (s) {
        var l = t.downloadCancelToken[s];
        l && l.forEach(function(c) {
          return c();
        }), delete t.downloadCancelToken[s];
        var u = t.downloadCancelData[s];
        u && u(s);
      }
    };
    Array.isArray(n) ? r ? i(n.map(function(a) {
      return a.docId || a;
    }).sort().join(",")) : n.forEach(function(a) {
      return a && i(n.docId || n);
    }) : n ? i(n.docId || n) : Object.keys(t.downloadCancelToken).forEach(function(a) {
      i(a);
    });
  };
}, dS = function(e) {
  return function() {
    e.uploadFiles = [];
  };
}, pS = function(e) {
  var t = e.api, n = e.constants, r = e.vm, i = e.state, a = e.props;
  return function() {
    var s = i.uploadFiles.filter(function(u) {
      return u.status === n.FILE_STATUS.READY;
    });
    if (i.isEdm && i.isSuccess)
      s.forEach(function(u) {
        t.getToken({
          token: a.edm.upload.token,
          file: u,
          type: "upload"
        }).then(function(c) {
          c && t.beforeUpload(u, !1, function(d) {
            t.startUpload(d);
          });
        });
      });
    else if (a.multiple && a.mergeService) {
      var l = s.map(function(u) {
        return u.raw;
      });
      l.length && t.beforeUpload({
        raw: l
      }, !1, function(u) {
        r.$refs[n.UPLOAD_INNER].$refs[n.UPLOAD_INNER_TEMPLATE].upload(u.raw);
      });
    } else
      s.forEach(function(u) {
        t.beforeUpload(u, !1, function(c) {
          r.$refs[n.UPLOAD_INNER].$refs[n.UPLOAD_INNER_TEMPLATE].upload(c.raw);
        });
      });
  };
}, fS = function(e) {
  var t = e.constants, n = e.vm;
  return function() {
    return n.$refs[t.UPLOAD_INNER].$refs[t.UPLOAD_INNER_TEMPLATE].handleClick();
  };
}, mS = function(e) {
  return function() {
    return e.getFileUploadUrl();
  };
}, vS = function(e) {
  var t = e.api, n = e.props, r = e.state;
  return function() {
    n.action ? r.url = n.action : t.getFileUploadUrl().then(function(i) {
      return r.url = i;
    });
  };
}, hS = function(e) {
  var t = e.props, n = e.emit;
  return function(r) {
    n("preview", r), t.preview && t.preview(r);
  };
}, $s = function(e) {
  var t = e.api, n = e.isChunk, r = e.isLessThan17G, i = e.file, a = e.state;
  return function(s, l, u) {
    if (n)
      u === 0 && (a.downloadCancelData[i.docId] = t.setWriterFile({
        data: s,
        index: u,
        isLessThan17G: r,
        file: i
      }));
    else {
      var c = s.headers["content-disposition"], d = c ? c.match(/fileName.?=(.*)/)[1] || c.match(/fileName=(.*)/)[1] : "", p = "application/zip";
      d.includes(".") ? p !== "zip" && (p = "application / x - xls") : p = s.headers["content-type"];
      var f = new Blob([s.data], {
        type: p
      });
      zs({
        blob: f,
        name: d
      });
    }
  };
}, zs = function(e) {
  var t = e.blob, n = e.name;
  if (window && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(t, decodeURIComponent(n));
    return;
  }
  var r = window.URL || window.webkitURL || window.moxURL, i = Ae.filterUrl(r.createObjectURL(t)), a = document.createElement("a");
  a.href = i, a.download = decodeURIComponent(n), a.click(), r.revokeObjectURL && r.revokeObjectURL(i);
}, js = function(e) {
  var t = e.state, n = e.downloadOps, r = e.file, i = e.translateFile, a = e.isChunk, s = e.isLessThan17G;
  return function(l, u, c) {
    if (a) {
      var d = s ? l.data : new Uint8Array(l.data), p = t.downloadChunkFile[r.docId];
      p || (p = {}), p[c] = d, i(l, u, c);
    } else
      typeof n.loading == "function" && n.loading(r), i(l, u);
    return !0;
  };
}, Ws = function() {
  return function(e) {
    var t;
    e.target && e.target.getResponseHeader ? t = Number(e.target.getResponseHeader("Content-Size")) : t = Number(e.total), t = Math.max(t, e.loaded);
    var n = Math.ceil(e.loaded / t * 100) || 0;
    return n = Math.max(n, 0), n = Math.min(n, 100), n;
  };
}, gS = function(e) {
  var t = e.state, n = e.props, r = e.constants;
  return function(i) {
    var a = i.file, s = i.serviceUrl, l = i.range;
    if (R(a) === "object") {
      var u = n.edm.download || {}, c = Array.isArray(u.paramsWhitelist) ? u.paramsWhitelist : [], d = t.downloadParamsWhitelist.concat(c), p = {};
      d.forEach(function(v) {
        return p[v] = a[v];
      }), p = Object.assign(p, l), delete p.docId, delete p.docVersion, delete p["x-download-sign"];
      for (var f in p) {
        var m = p[f], h = R(m);
        ~["undefined", "object", "function"].indexOf(h) || (s += "&".concat(f, "=").concat(m));
      }
      a.status = r.FILE_STATUS.DOWNLOADING, a.percentage = 0;
    }
    return s;
  };
}, AS = function(e) {
  var t = e.Modal, n = e.constants, r = e.t;
  return function(i) {
    var a = i.data;
    if (a.status === n.EDM.KIASTATUS)
      return t.message({
        message: "".concat(r(n.EDM.KIASCANTIP)),
        status: "warning"
      });
  };
}, yS = function(e) {
  var t = e.state, n = e.Modal;
  return function(r) {
    var i = r.downloadOps, a = r.file, s = r.isLessThan17G, l = r.data, u = function(f) {
      var m = f.state, h = f.file, v = f.errRes, g = f.Modal, b = f.downloadOps;
      m.currentDownloadFiles && m.currentDownloadFiles.docId === h.docId || (v && v.message && g.message({
        message: v.message,
        status: "warning"
      }), m.currentDownloadFiles = h, typeof b.fail == "function" && b.fail(v, h));
    };
    if (l.data && l.data.type && l.data.type.includes("application/json")) {
      var c = new FileReader();
      return c.onload = function(p) {
        var f = JSON.parse(p.target.result);
        u({
          state: t,
          file: a,
          errRes: f,
          Modal: n,
          downloadOps: i
        });
      }, c.readAsText(l.data), !0;
    }
    if (!s && l.headers["content-type"].includes("application/json")) {
      var d = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(l.data)));
      return u({
        state: t,
        file: a,
        errRes: d,
        Modal: n,
        downloadOps: i
      }), !0;
    }
  };
}, bS = function(e) {
  var t = e.state, n = e.service;
  return function(r) {
    var i;
    Array.isArray(r) ? i = r.map(function(u) {
      return u.docId || u;
    }).sort().join(",") : i = r.docId || r, t.downloadCancelToken[i] || (t.downloadCancelToken[i] = []);
    var a = n.cancelToken(), s = a.cancel, l = a.token;
    return t.downloadCancelToken[i].push(s), l;
  };
}, SS = function(e) {
  var t = e.service, n = e.constants, r = e.props, i = e.state, a = e.api, s = e.emit;
  return function(l) {
    var u = l.file, c = l.batchIndex, d = l.isChunk, p = l.calcProgress, f = l.handleSuccess, m = l.range, h = m === void 0 ? {} : m, v = l.isBatch, g = l.isLessThan17G, b = l.url, y;
    b ? y = Promise.resolve(b) : y = t.getSingleDownloadUrl().then(function(S) {
      var I = S.replace(/{docId}/, u.docId || u) + "".concat(~S.indexOf("?") ? "&" : "?", "x-download-sign=true&docVersion=").concat(u.docVersion || "").concat(u.decryptKey ? "&decryptKey=" + u.decryptKey : "");
      return I = a.modifyServiceUrlSingle({
        file: u,
        serviceUrl: I,
        range: h
      }), I;
    }), y.then(function(S) {
      S = Ae.filterUrl(S);
      var I = {
        withCredentials: r.withCredentials,
        headers: Object.assign(r.headers, i.headers),
        responseType: d && !g ? "arraybuffer" : "blob",
        hideErr: !0,
        cancelToken: a.createDownloadCancelToken(u),
        onDownloadProgress: function(E) {
          var L = p(E, d);
          L !== 100 && !d && s("download", L, E), R(u) === "object" && (u.percentage = L);
        }
      };
      t.get(S, I).then(function(k) {
        if (!a.getKiaScanTip({
          data: k
        }) && !a.validateDownloadStatus({
          downloadOps: r.edm.download || {},
          file: u,
          isLessThan17G: g,
          data: k
        })) {
          f(k, "", h.index);
          var E = k.headers, L = E.checkcode, V = E["content-size"];
          !d && s("download", 100, "", {
            checkcode: L,
            fileSize: V
          }), R(u) === "object" && (u.percentage = 100, setTimeout(function() {
            return u.status = n.FILE_STATUS.SUCESS;
          }, 1e3)), a.afterDownload({
            batchIndex: c,
            data: k,
            file: u
          });
        }
      }).catch(function(k) {
        if (k.response && i.errorStatusCodes.includes(k.response.status)) {
          var E = r.edm.download || {}, L = {
            token: E.token,
            file: u,
            type: "download"
          };
          a.getToken(L).then(function(V) {
            a.afterDownload({
              batchIndex: c,
              data: V,
              file: u,
              range: h,
              isChunk: d,
              isBatch: v,
              isLessThan17G: g
            });
          });
        }
      });
    });
  };
}, wS = function(e) {
  var t = e.api, n = e.service, r = e.props, i = e.state, a = e.emit;
  return function(s) {
    var l = s.downloadOps, u = s.file, c = s.calcProgress, d = s.handleSuccess, p = s.range, f = p === void 0 ? {} : p, m = s.isLessThan17G, h = {
      token: l.packageToken,
      file: u,
      type: "download"
    }, v = l || {}, g = v.asyncPackages;
    t.getToken(h).then(function(b) {
      if (b) {
        var y = {
          downloadTOs: [],
          attachdownloadTOs: [],
          isZip: "true",
          transformType: "sync",
          type: "package"
        };
        if (u.forEach(function(S) {
          S.wmType ? y.attachdownloadTOs.push(S) : y.downloadTOs.push(S);
        }), g) {
          t.downloadAsyncPackage(y);
          return;
        }
        n.getPackageDownloadUrl().then(function(S) {
          S = Ae.filterUrl(S + "".concat(~S.indexOf("?") ? "&" : "?", "x-download-sign=true")), n.post(S, C(C({}, y), f), {
            withCredentials: r.withCredentials,
            headers: Object.assign(r.headers, i.headers),
            responseType: "blob",
            cancelToken: t.createDownloadCancelToken(u),
            onDownloadProgress: function(k) {
              var E = c(k);
              E !== 100 && a("download", E, k);
            }
          }).then(function(I) {
            if (!t.getKiaScanTip({
              data: I
            }) && !t.validateDownloadStatus({
              downloadOps: r.edm.download || {},
              file: u,
              isLessThan17G: m,
              data: I
            })) {
              var k = I.headers, E = k["content-size"], L = k.checkcode;
              a("download", 100, "", {
                fileSize: E,
                checkcode: L
              }), d(I, "zip");
            }
          });
        });
      }
    });
  };
}, TS = function(e) {
  var t = e.state, n = e.props, r = e.service, i = e.api, a = e.constants;
  return function(s) {
    return r.getAsyncPackageDownload().then(function(l) {
      r.request({
        method: "post",
        url: Ae.filterUrl(l),
        withCredentials: n.withCredentials,
        headers: Object.assign(n.headers, t.headers),
        data: s
      }).then(function(u) {
        if (u && u.data && u.data.status === 200) {
          var c = (u.data.result || []).map(function(h) {
            var v = h.downloadLink, g = h.fileSize;
            return {
              url: v,
              fileSize: g
            };
          }), d = a.EDM.SIZE_17G, p = !1, f = !1, m = n.edm.download || {};
          c.forEach(function(h) {
            var v = !h.fileSize || h.fileSize < d * 1024, g = $s({
              api: i,
              isChunk: f,
              isLessThan17G: v,
              file: h,
              state: t
            }), b = js({
              downloadOps: m,
              file: h,
              translateFile: g,
              isChunk: f,
              state: t,
              isLessThan17G: v
            }), y = Ws(), S = {
              url: h.url,
              calcProgress: y,
              handleSuccess: b,
              downloadOps: m,
              file: h,
              isLessThan17G: v,
              isFinished: !1,
              range: {},
              batchIndex: 0,
              isBatch: p,
              isChunk: f
            };
            i.downloadFileSingle(S);
          });
        }
      });
    });
  };
}, CS = function(e) {
  var t = e.state, n = e.props, r = e.emit, i = e.constants;
  return function(a) {
    var s = a.file, l = n.hwh5, u = l.HWH5, c = l.appId, d = u(), p = d.downloadToEDM, f = {
      edmAuth: {
        edmToken: t.headers[i.EDM.EDMTOKEN],
        appId: c
      },
      docId: s.docId || s,
      docVersion: s.docVersion,
      filePath: s.filePath,
      progress: 1,
      onProgress: function(h) {
        var v = JSON.parse(h), g = v.progress;
        g * 1 !== 100 && r("download", g);
      }
    };
    p(f).then(function(m) {
      r("download", 100, "", {
        data: m
      });
    });
  };
}, IS = function(e) {
  var t = e.api, n = e.state;
  return function(r) {
    if (n.currentDownloadFiles = "", !n.isEdm)
      t.ordinaryDownload(r);
    else {
      var i = Array.isArray(r);
      if (n.isHwh5) {
        var a = r;
        i || (a = [r]), a.forEach(function(s) {
          return t.downloadFileSingleInner({
            file: s,
            isBatch: !1
          });
        });
        return;
      }
      i ? t.downloadFileInner({
        file: r,
        isBatch: i
      }) : t.downloadFileSingleInner({
        file: r,
        isBatch: i
      });
    }
  };
}, kS = function(e) {
  var t = e.props, n = e.state, r = e.api, i = e.constants;
  return function(a) {
    var s = a.file, l = a.isBatch, u = i.EDM.SIZE_17G, c = t.edm.download || {}, d = {
      token: c.token,
      file: s,
      type: "download"
    };
    r.getToken(d).then(function(p) {
      if (p) {
        if (n.isHwh5) {
          r.downloadFileSingleHwh5({
            file: s
          });
          return;
        }
        var f = n.hasFileInfoInterface ? r.getDownloadFileInfo({
          docId: s.docId
        }) : Promise.resolve();
        f.then(function(m) {
          var h = m || {}, v = h.fileSize, g = v > n.docSize && v > n.chunkSize;
          v && g ? r.largeDocumentDownload({
            file: m,
            isBatch: l,
            isLessThan17G: v < u * 1024
          }) : r.downloadFileInner({
            file: s,
            isBatch: l
          });
        });
      }
    });
  };
}, ES = function(e) {
  var t = e.api, n = e.state, r = e.props, i = e.service;
  return function(a) {
    var s = a.docId;
    return i.getDocumentInfoUrl().then(function(l) {
      return new Promise(function(u, c) {
        i.request({
          method: "post",
          url: Ae.filterUrl(l),
          withCredentials: r.withCredentials,
          headers: Object.assign(r.headers, n.headers),
          cancelToken: t.createDownloadCancelToken({
            docId: s
          }),
          data: {
            docInfoVO: {
              ids: [s],
              docType: "",
              docVersion: ""
            }
          }
        }).then(function(d) {
          var p = d || {}, f = p.data;
          if (f && f.status === 200) {
            var m = f.result.outDocQueryList && f.result.outDocQueryList[0].verInfo[0].docInfo[0];
            u(m);
          } else
            c(d);
        });
      });
    });
  };
}, DS = function(e) {
  var t = e.api, n = e.state;
  return function(r) {
    var i = r.file, a = r.isBatch, s = r.isLessThan17G, l = i.fileSize, u = i.docId, c = i.docName, d = Math.ceil(l / n.chunkSize);
    n.downloadChunkFile[u] = {
      chunkNum: d,
      fileSize: l,
      docName: c
    }, i.chunkSize = d;
    var p = t.sliceDownloadChunk(i);
    t.batchSegmentDownload({
      batchIndex: 0,
      batches: p,
      docId: i.docId,
      isBatch: a,
      isLessThan17G: s
    });
  };
}, BS = function(e) {
  var t = e.state;
  return function(n) {
    var r = n.chunkSize, i = [[]];
    t.downloadBatchQueue[n.docId + "-0"] = 0, t.downloadBatchQueueListen[n.docId + "-0"] = 0;
    for (var a = 0, s = -1, l = 0; l < r; l++) {
      if (a = s + 1, s = Math.min(n.fileSize, a + t.chunkSize), s < a)
        return i;
      var u = i.length - 1;
      i[u].length < t.downloadChunkLimit ? i[u].push({
        startRange: a,
        endRange: s,
        index: l
      }) : (t.downloadBatchQueue[n.docId + "-" + i.length] = 0, t.downloadBatchQueueListen[n.docId + "-" + i.length] = 0, i.push([]), i[u + 1].push({
        startRange: a,
        endRange: s,
        index: l
      }));
    }
    return i;
  };
}, xS = function(e) {
  var t = e.state, n = e.api;
  return function(r) {
    var i = r.batchIndex, a = r.batches, s = r.docId, l = r.isBatch, u = r.isLessThan17G;
    if (i < a.length) {
      var c = a[i], d = s + "-" + i;
      Object.defineProperty(t.downloadBatchQueue, d, {
        get: function() {
          return t.downloadBatchQueueListen[d];
        },
        set: function(m) {
          t.downloadBatchQueueListen[d] = m, m >= c.length && n.batchSegmentDownload({
            docId: s,
            batchIndex: ++i,
            batches: a,
            isBatch: l,
            isLessThan17G: u
          });
        }
      });
      for (var p = 0; c.length - p > 0; )
        n.downloadFileInner({
          batchIndex: i,
          range: c[p++],
          file: {
            docId: s
          },
          isBatch: l,
          isChunk: !0,
          isLessThan17G: u
        });
    }
  };
}, PS = function(e) {
  var t = e.api, n = e.props, r = e.state;
  return function(i) {
    var a = i.batchIndex, s = i.file, l = i.range, u = i.isBatch, c = i.isChunk, d = i.isLessThan17G, p = n.edm.download || {}, f = $s({
      api: t,
      isChunk: c,
      isLessThan17G: d,
      file: s,
      state: r
    }), m = js({
      downloadOps: p,
      file: s,
      translateFile: f,
      isChunk: c,
      state: r,
      isLessThan17G: d
    }), h = Ws(), v = {}, g = v.isFinished, b = g === void 0 ? !1 : g;
    if (!u) {
      var y = {
        calcProgress: h,
        isFinished: b,
        handleSuccess: m,
        range: l,
        batchIndex: a,
        isBatch: u,
        downloadOps: p,
        file: s,
        isChunk: c,
        isLessThan17G: d
      };
      t.downloadFileSingle(y);
      return;
    }
    var S = {
      downloadOps: p,
      file: s,
      calcProgress: h,
      handleSuccess: m,
      range: l,
      isLessThan17G: d
    };
    u && t.downloadFileBatch(S);
  };
}, MS = function(e) {
  var t = e.api, n = e.state;
  return function(r) {
    var i = r.batchIndex, a = r.range, s = r.data, l = r.file, u = r.isBatch, c = r.isChunk, d = r.isLessThan17G;
    if (s.status === 200) {
      var p = l.docId + "-" + i, f = n.downloadBatchQueue[p];
      n.downloadBatchQueue[p] = f + 1;
    } else {
      var m = n.downloadReplayAtoms[l.docId + "-" + a.index];
      if (m && m >= 2) {
        var h = ["The number of retry times exceeds the threshold! [docId:", l.docId, ", chunk:", a.index, "]"];
        ko.logger.warn(h.join("")), delete n.downloadReplayAtoms[l.docId + "-" + a.index];
      } else {
        var v = ["replay ", m, "! [docId:", l.docId, ", chunk:", a.index, "]"];
        ko.logger.warn(v.join("")), n.downloadReplayAtoms[l.docId + "-" + a.index] = m + 1, t.downloadFileInner({
          batchIndex: i,
          range: a,
          file: l,
          isBatch: u,
          isChunk: c,
          isLessThan17G: d
        });
      }
    }
  };
}, OS = function(e) {
  var t = e.state, n = e.emit, r = e.Streamsaver;
  return function(i) {
    var a = i.data, s = i.index, l = i.isLessThan17G, u = i.file, c = {}, d = c.fileStream, p = c.writer, f = c.fileData, m = f === void 0 ? [] : f, h = c.downloaded, v = h === void 0 ? 0 : h, g = a.headers.checkcode, b = a.headers["content-disposition"], y = t.downloadChunkFile[u.docId], S = y.chunkNum, I = y.fileSize, k = y.docName;
    b && (k = b.match(/fileName.?=(.*)/)[1] || b.match(/fileName=(.*)/)[1] || k), l || (d = r.createWriteStream(k, {
      size: a.byteLength
    }), p = d.getWriter());
    var E = function() {
      var V = t.downloadChunkFile[u.docId] || {}, Y = V[s];
      if (Y)
        if (!l)
          p.write(Y).then(function() {
            if (v += Y.byteLength, V[s] = null, delete V[s], s + 1 >= S)
              delete t.downloadChunkFile[u.docId], n("download", 100, "", {
                fileSize: I,
                checkcode: g
              }), p.close();
            else {
              var _ = Math.ceil(v / I * 100) || 0;
              _ !== 100 && n("download", _), s++, E();
            }
          });
        else if (m.push(Y), v += Y.size, t.downloadChunkFile[u.docId][s] = null, delete t.downloadChunkFile[u.docId][s], s + 1 >= S)
          delete t.downloadChunkFile[u.docId], zs({
            blob: new Blob(m),
            name: k
          }), n("download", 100, "", {
            fileSize: I,
            checkcode: g
          });
        else {
          var X = Math.ceil(v / I * 100) || 0;
          X !== 100 && n("download", X), s++, E();
        }
      else
        setTimeout(function() {
          return E();
        }, 1e3);
    };
    return E(), function(L) {
      var V = t.downloadChunkFile[L];
      Object.keys(V).forEach(function(Y) {
        return V[Y] = null;
      }), delete t.downloadChunkFile[L], l ? m = [] : p && p.close();
    };
  };
}, LS = function(e) {
  var t = e.constants, n = e.props, r = e.state;
  return function(i) {
    var a = i.formData, s = i.file, l = i.type;
    if (r.isEdm && n.edm.upload) {
      var u = Object.assign({}, n.data || {}, n.edm.upload.params || {});
      for (var c in u)
        a.set(c, u[c] || "");
    }
    n.edm.isCheckCode === !0 ? (a.append(t.EDM.ISCHECKCODE, "Y"), s.hash && a.append(t.EDM.CHECKCODE, s.hash)) : a.append(t.EDM.ISCHECKCODE, "N");
    var d = r.updateId || n.edm.updateId;
    if (l === t.EDM.CHUNKINIT)
      a.append(t.EDM.FILESIZE, s.size), a.append(t.EDM.CHUNKS, s.chunkSize), a.append(t.EDM.FILENAME, s.name), d && a.append(t.EDM.DOCID, d);
    else {
      a.append(t.EDM.MULTIPART, s, s.filename), a.append(t.EDM.CHUNK, s.chunk), a.append(t.EDM.LOWERNAME, s.filename);
      var p = d || s.docId;
      a.append(t.EDM.DOCID, p);
    }
    return d && a.append("updateFile", !0), a;
  };
}, NS = function(e) {
  var t = e.api, n = e.Modal, r = e.state, i = e.t, a = e.emit, s = e.constants;
  return function(l) {
    var u = Math.ceil(l.size / r.chunkSize);
    l.chunkSize = u, l.cancelToken = [], t.segmentUploadInit(l).then(function(c) {
      if (c && c.docId) {
        l.records = c.chunks, l.docId = c.docId, r.largeFileInfo[c.docId] = l;
        var d = t.sliceChunk(l);
        t.batchSegmentUpload({
          docId: c.docId,
          batchIndex: 0,
          batches: d,
          progress: {
            size: l.size,
            trunks: [],
            file: l
          }
        });
      } else {
        n.message({
          message: i("ui.fileUpload.init"),
          status: "warning",
          duration: "1000"
        });
        var p = t.getFile(p);
        r.uploadFiles.splice(r.uploadFiles.indexOf(p), 1);
      }
    }).catch(function(c) {
      l.status = s.FILE_STATUS.FAIL, a("error", c, l, r.uploadFiles);
    });
  };
}, FS = function(e) {
  var t = e.api, n = e.props, r = e.service, i = e.state, a = e.constants;
  return function(s) {
    var l = new FormData();
    return new Promise(function(u, c) {
      r.getLargeFileInitUrl().then(function(d) {
        r.request({
          method: "post",
          url: Ae.filterUrl(d),
          data: t.getFormData({
            formData: l,
            file: s,
            type: a.EDM.CHUNKINIT
          }),
          withCredentials: n.withCredentials,
          headers: Object.assign(n.headers, i.headers)
        }).then(function(p) {
          p.data.status === 200 ? u(p.data.result) : c(p);
        });
      });
    });
  };
}, Xi = function(e) {
  var t = e.data, n = e.file, r = e.batchIndex, i = e.state, a = e.api, s = e.progress;
  if (t.status === 200) {
    var l = n.docId + "-" + r, u = i.batchQueue[l];
    i.batchQueue[l] = u + 1;
  } else {
    var c = i.replayAtoms[n.docId + "-" + n.chunk];
    if (c && c >= 2) {
      var d = ["The number of retry times exceeds the threshold! [docId:", n.docId, ", chunk:", n.chunk, "]"];
      ko.logger.warn(d.join("")), delete i.replayAtoms[n.docId + "-" + n.chunk];
    } else {
      var p = ["replay ", c, "! [docId:", n.docId, ", chunk:", n.chunk, "]"];
      ko.logger.warn(p.join("")), i.replayAtoms[n.docId + "-" + n.chunk] = c + 1, a.segmentUpload(r, n, s);
    }
  }
}, Zi = function(e) {
  var t = e.api, n = e.props, r = e.service, i = e.state, a = e.emit, s = e.constants, l = e.batchIndex, u = e.file, c = e.progress, d = new FormData(), p = function(m) {
    var h = r.cancelToken();
    if (c.file.cancelToken) {
      c.file.cancelToken.push(h.cancel);
      var v = s.FILE_STATUS, g = v.SUCESS, b = v.FAIL;
      r.request({
        method: "post",
        url: Ae.filterUrl(m),
        data: t.getFormData({
          formData: d,
          file: u,
          type: ""
        }),
        withCredentials: n.withCredentials,
        headers: Object.assign(n.headers, i.headers),
        cancelToken: h.token,
        hideErr: !0,
        onUploadProgress: function(S) {
          c.trunks[u.chunk] = S.loaded;
          var I = c.trunks.reduce(function(E, L) {
            return E + L;
          }), k = Math.floor(I / c.size * 100) || 0;
          u.percentage = Math.floor(S.loaded / S.total * 100), S.percentage = c.file.percentage = k > 100 ? 100 : k, k >= 100 && (c.file.isFinished = !0), a("progress", c.file, i.uploadFiles, t.calcUploadingFilesInfo());
        }
      }).then(function(y) {
        Xi({
          data: y,
          file: u,
          batchIndex: l,
          state: i,
          api: t,
          progress: c
        }), c.file.percentage === 100 && (c.file.status = g);
      }).catch(function(y) {
        if (y.response && i.errorStatusCodes.includes(y.response.status)) {
          var S = {
            token: n.edm.upload.token,
            file: u,
            type: "upload"
          };
          t.getToken(S).then(function(I) {
            return Xi({
              data: I,
              file: u,
              batchIndex: l,
              state: i,
              api: t,
              progress: c
            });
          });
        } else
          c.file.status !== b && a("error", y, c.file, i.uploadFiles), c.file.status = b, c.file.docId = "";
      });
    }
  };
  i.chunkUploadUrl ? p(i.chunkUploadUrl) : r.getChunkUploadUrl().then(function(f) {
    i.chunkUploadUrl = f, p(f);
  });
}, RS = function(e) {
  var t = e.api, n = e.props, r = e.service, i = e.state, a = e.emit, s = e.constants, l = e.CryptoJS;
  return function(u, c, d) {
    typeof c.then == "function" ? c.then(function(p) {
      return new Promise(function(f) {
        if (n.edm.isCheckCode !== !0)
          return f(p);
        var m = new FileReader();
        m.readAsArrayBuffer(p), m.onload = function(h) {
          if (n.edm.isCheckCode === !0) {
            var v = l.lib.WordArray.create(h.target.result), g = l.SHA256(v).toString();
            p.hash = g;
          }
          f(p);
        };
      });
    }).then(function(p) {
      Zi({
        batchIndex: u,
        api: t,
        service: r,
        state: i,
        emit: a,
        props: n,
        file: p,
        constants: s,
        progress: d
      });
    }) : Zi({
      api: t,
      props: n,
      service: r,
      state: i,
      emit: a,
      constants: s,
      batchIndex: u,
      file: c,
      progress: d
    });
  };
}, VS = function(e) {
  var t = e.api, n = e.constants, r = e.props, i = e.vm, a = e.state;
  return function(s) {
    var l = s.docId, u = s.batchIndex, c = s.batches, d = s.progress;
    if (u < c.length && d.file.cancelToken) {
      var p = l + "-" + u, f = c[u];
      Object.defineProperty(a.batchQueue, p, {
        get: function() {
          return a.batchQueueListen[p];
        },
        set: function(v) {
          a.batchQueueListen[p] = v, v >= f.length && t.batchSegmentUpload({
            docId: l,
            batchIndex: ++u,
            batches: c,
            progress: d
          });
        }
      });
      for (var m = 0; f.length - m > 0; )
        t.segmentUpload(u, f[m++], d);
    } else
      typeof r.edm.upload.closeloading == "function" && r.edm.upload.closeloading(), i.$refs[n.UPLOAD_INNER].$refs[n.UPLOAD_INNER_TEMPLATE].upload(a.largeFileInfo[l]);
  };
}, US = function(e) {
  var t = e.state;
  return function(n) {
    var r = n.chunkSize, i = [[]];
    t.batchQueue[n.docId + "-0"] = 0, t.batchQueueListen[n.docId + "-0"] = 0;
    for (var a = 0; a < r; a++)
      if (!n.records.includes(a.toString())) {
        var s = a * t.chunkSize, l = Math.min(n.size, s + t.chunkSize), u = n.raw.slice(s, l);
        u.chunk = a + 1, u.filename = n.name, u.docId = n.docId, u.chunkSize = r, u.cacheSign = n.cacheSign, u.records = n.records, u.percentage = n.percentage;
        var c = Promise.resolve(u), d = i.length - 1;
        i[d].length < t.chunkBatchLimit ? i[d].push(c) : (t.batchQueue[n.docId + "-" + i.length] = 0, t.batchQueueListen[n.docId + "-" + i.length] = 0, i.push([]), i[d + 1].push(c));
      }
    return i;
  };
}, Gs = function(e) {
  var t = e.constants, n = e.props, r = e.state, i = e.t, a = e.Modal;
  return function(s) {
    var l = s.token, u = s.file, c = s.isOnlinePreview, d = c === void 0 ? !1 : c, p = s.type, f = p === void 0 ? "" : p, m = s.isinit, h = m === void 0 ? !1 : m;
    return n.edm.isExtranet && !d ? (r.isSuccess = !0, r.accept = n.accept, r.singleMaxSize = n.edm.singleFileMaxSize || 200, Promise.resolve(!0)) : r.isEdm && !l || typeof l != "function" ? (a.message({
      message: i(t.EDM.I18NKEY),
      status: "warning",
      duration: "2000"
    }), new Promise(function(v) {
      v(!1);
    })) : new Promise(function(v, g) {
      try {
        var b;
        h && n.cacheToken ? (!or && (or = l(u)), b = or) : b = l(u), b.then(function(y) {
          var S = y || {}, I = S.config && S.config.fileWhiteList || "";
          r.isSuccess = !0, ["preview", "download"].includes(f) && n.accept ? r.accept = n.accept : I && (r.accept = "".concat(I).concat(n.accept ? ",".concat(n.accept) : "")), r.headers[t.EDM.EDMTOKEN] = S.edmToken || "", r.headers[t.EDM.TRACEID] = S.traceId || "", S.config && (r.singleMaxSize = S.config.singleFileMaxSize), r.edmToken = S, v(!0);
        });
      } catch (y) {
        g(new Error(y));
      }
    });
  };
}, HS = function(e) {
  var t = e.api, n = e.props;
  return function(r) {
    var i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    return new Promise(function(a, s) {
      try {
        var l = {
          isOnlinePreview: !0,
          file: r,
          type: "preview",
          token: n.edm.preview.token
        };
        t.getToken(l).then(function(u) {
          if (!u) {
            var c = "[TINY Error][FileUpload] No edm token";
            s(new Error(c));
            return;
          }
          Ee(r) || Array.isArray(r) && r.length === 1 ? t.previewFileSingle({
            file: Array.isArray(r) ? C({}, r[0]) : r,
            resolve: a,
            open: i
          }) : Array.isArray(r) && r.length > 1 && t.previewFileBatch({
            file: r,
            resolve: a,
            open: i
          });
        }).catch(function(u) {
          return s(new Error(u));
        });
      } catch (u) {
        s(new Error(u));
      }
    });
  };
}, $S = function(e) {
  var t = e.api;
  return function(n) {
    return t.previewFile(n, !0);
  };
}, zS = function(e) {
  var t = e.api, n = e.state, r = e.props, i = e.constants, a = e.service;
  return function(s) {
    var l = s.file, u = s.resolve, c = s.open, d = t.getPreviewUrlSync(l);
    if (c)
      return u(d);
    if (d) {
      n.showPreview = !0, n.iframeUrl = d, u(n.iframeUrl);
      return;
    }
    var p = r.edm.preview.watermark || {}, f = n.fileWater ? i.EDM.FORMAT : "", m = n.fileWater ? i.EDM.WATER : i.EDM.SOURCE, h = r.edm.preview.plugin;
    a.all([a.getPreviewUrl(), a.getSingleDownloadUrl()]).then(a.spread(function(v, g) {
      var b = r.edm.preview.serviceUrl, y = b || v.replace(/{docId}/, l.docId) + "?".concat(f, "docVersion=").concat(l.docVersion), S = b || v.replace(/{docId}/, l.docId) + "?type=doc&pageNum=1&".concat(f, "docVersion=").concat(l.docVersion), I = b + g.replace(/{docId}/, l.docId) + "?docId=".concat(l.docId, "&docVersion=").concat(l.docVersion, "&").concat(m, "from=Experience&");
      h.setIsEDM3(!0), h.setDocumentInfoUrl(y), h.setDownloadUrl(I, !0), h.setPageUrl(S), h.setWatermarkParameters({
        showWatermark: p.showWatermark || 1,
        rotation: p.rotation || 30,
        text: p.text || ""
      }), h.setPdfjsPaht(r.edm.preview.packageName || i.EDM.JSLIB), h.setAuthToken(n.headers[i.EDM.EDMTOKEN]), n.showPreview = !0, n.iframeUrl = r.edm.preview.previewUrl + "".concat(i.EDM.URLCONTS).concat(l.docVersion, "&docId=").concat(l.docId), u(n.iframeUrl);
    }));
  };
}, jS = function(e) {
  var t = e.service, n = e.props, r = e.state, i = e.api;
  return function(a) {
    var s = a.file, l = a.resolve, u = a.open;
    t.getPreviewUrlBatch().then(function(c) {
      var d = n.edm || {}, p = d.preview || {}, f = p.online || {}, m = f.jslibhtml, h = f.baseurl, v = p.watermark || {}, g = v.text;
      t.request({
        method: "post",
        url: Ae.filterUrl(c),
        withCredentials: n.withCredentials,
        headers: r.headers,
        data: {
          documents: s,
          asposeClient: m,
          asposeService: h,
          watermark: g
        }
      }).then(function(b) {
        var y = b.data, S = i.getPreviewUrlSync({
          generate: y.result.generate,
          size: s.length
        }, !0);
        if (u)
          return l(S);
        S && (r.showPreview = !0, r.iframeUrl = S, l(r.iframeUrl));
      });
    });
  };
}, WS = function(e) {
  var t = e.constants, n = e.props, r = e.state;
  return function(i, a) {
    var s = n.edm || {}, l = s.preview || {}, u = l.watermark, c = l.online, d = l.bar, p = d === void 0 ? {} : d, f = l.lang, m = c.webPreview, h = m === void 0 ? !1 : m, v = c.http, g = v === void 0 ? !1 : v, b = c.jslibhtml, y = c.appid, S = c.baseurl, I;
    h ? I = "".concat(g ? "http:" : "https:").concat(S.replace(/\/$/, ""), "/edm/projects/").concat(y, "/web/preview") : I = b.split("?").shift();
    var k = [], E, L = r.headers[t.EDM.EDMTOKEN];
    if (a) {
      I = I = "".concat(S.replace(/\/$/, ""), "/edm/projects/").concat(y, "/web/batchPreview");
      var V = i.generate, Y = i.size;
      E = {
        generate: V,
        "EDM-Authorization": L,
        docIndex: 1,
        size: Y
      };
    } else if (h) {
      var X = p.styles;
      E = Object.assign({}, u, {
        "EDM-Authorization": L,
        lang: f,
        bar: window.btoa(JSON.stringify(C(C({}, p), {}, {
          styles: JSON.stringify(X)
        }))),
        docId: i.docId
      });
    } else
      E = Object.assign({}, c, u, {
        authToken: L,
        jslibhtml: I,
        docId: i.docId,
        docVersion: i.docVersion || i.version || "",
        type: "doc",
        pageNum: "1"
      });
    for (var _ in E) {
      var be = E[_];
      Ee(be) || (_ === "text" && k.push("watermark=".concat(encodeURIComponent(be))), k.push("".concat(_, "=").concat(be)));
    }
    return I + "?" + k.join("&");
  };
}, GS = function(e) {
  var t = e.api, n = e.props, r = e.service;
  return function(i) {
    return new Promise(function(a, s) {
      try {
        t.getToken({
          token: n.edm.preview.token,
          file: i,
          type: "preview"
        }).then(function(l) {
          if (!l) {
            s(new Error("[TINY Error][FileUpload] No edm token"));
            return;
          }
          r.getPreviewUrl().then(function(u) {
            Ee(i) || Array.isArray(i) && i.length === 1 ? t.previewImageSingle({
              url: u,
              file: Array.isArray(i) ? C({}, i[0]) : i
            }).then(function(c) {
              return a(c);
            }) : Array.isArray(i) && i.length > 1 && t.previewImageBatch({
              url: u,
              file: i
            }).then(function(c) {
              return a(c);
            });
          });
        });
      } catch (l) {
        s(new Error(l));
      }
    });
  };
}, YS = function(e) {
  var t = e.service, n = e.state, r = e.props;
  return function(i) {
    var a = i.file, s = i.url, l = r.edm || {}, u = l.preview || {}, c = u.watermark || {}, d = c.text, p = c.textStyle;
    p = C({
      tile: !0
    }, p);
    var f = Object.assign(a, {
      type: "image",
      imageType: "image",
      watermark: d,
      textStyle: p
    });
    return t.post(Ae.filterUrl(s.replace(/{docId}/, a.docId)), f, {
      withCredentials: r.withCredentials,
      headers: Object.assign(r.headers, n.headers),
      responseType: "blob"
    }).then(function(m) {
      var h = new Blob([m.data]), v = window.URL || window.webkitURL;
      return v.createObjectURL(h);
    });
  };
}, KS = function(e) {
  var t = e.service, n = e.api;
  return function(r) {
    var i = r.url, a = r.file, s = [];
    return a.forEach(function(l) {
      s.push(n.previewImageSingle({
        url: i,
        file: l
      }));
    }), t.all(s);
  };
}, QS = function(e) {
  var t = e.props, n = e.state, r = e.t, i = e.constants;
  return function() {
    var a = {
      class: "single-download-modal single-download-modal1",
      style: "",
      props: {
        lockScroll: !0,
        visible: n.showPreview,
        dragable: !0,
        title: r(i.EDM.DOC_PREVIEW),
        width: "60%"
      },
      on: {
        "update:visible": function(f) {
          return n.showPreview = f;
        }
      }
    }, s = {};
    t.edm && t.edm.preview && R(t.edm.preview.dialogConfig) === "object" && (s = t.edm.preview.dialogConfig || {});
    var l = ht(!0, {}, s), u = l.events || {}, c = l.class || "", d = l.style || "";
    return delete l.events, delete l.class, delete l.style, ht(!0, {}, a, {
      class: "".concat(a.class, " ").concat(c),
      style: "".concat(d),
      props: C({}, l),
      on: C({}, u)
    });
  };
}, XS = function(e) {
  var t = e.props, n = e.state, r = e.constants;
  return function() {
    var i = !(t.edm && t.edm.chunkSize), a = r.EDM, s = a.SIZE_0M, l = a.SIZE_2M, u = a.SIZE_4M, c = a.SIZE_8M, d = a.SIZE_16M, p = a.SIZE_20M, f = a.SIZE_32M, m = a.SIZE_64M, h = a.SIZE_2G, v = t.edm || {}, g = v.docSize, b = g === void 0 ? p : g, y = v.chunkSize, S = y === void 0 ? c : y;
    if (b = b < 0 ? 0 : b, b = b > h ? h : b, b && (S = S < 0 ? 0 : S), !i) {
      var I = [m, f, d, c, u, l, s];
      I.some(function(k) {
        return S >= k ? (S = Math.max(k, l), !0) : !1;
      });
    }
    n.docSize = b * 1024, n.chunkSize = S * 1024;
  };
}, ZS = function(e) {
  var t = e.props, n = e.constants;
  return function() {
    var r = t.sourceType, i = t.listType, a = r.split("/");
    return i !== n.LIST_TYPE.PICTURE_CARD && (a = a.slice(0, 1)), a;
  };
}, JS = function(e) {
  var t = e.state, n = e.props, r = e.constants;
  return function(i) {
    var a = i.file, s = r.LIST_TYPE, l = s.PICTURE_SINGLE, u = s.PICTURE_CARD, c = n.listType;
    if ([l, u].includes(c)) {
      var d = t.types[0];
      if (a.type)
        d = a.type;
      else if (c === u) {
        var p = r.FILE_TYPE, f = p.VIDEO, m = p.AUDIO, h = p.PICTURE, v = r.SOURCE_TYPE, g = v.SOURCE_VIDEO, b = v.SOURCE_AUDIO, y = v.SOURCE_PICTURE, S = ne(ne(ne({}, f, g), m, b), h, y), I = Hs({
          file: a
        }), k = Object.keys(S).find(function(E) {
          return E.split("/").includes(I);
        });
        S[k] && (d = S[k]);
      }
      return d;
    }
  };
}, qS = function(e) {
  var t = e.constants, n = e.vm;
  return function(r) {
    n.$refs[t.UPLOAD_INNER].$refs[t.UPLOAD_INNER_TEMPLATE].handleUpdate(r);
  };
}, _S = function(e) {
  var t = e.vm, n = e.constants;
  return function(r) {
    if (R(r) === "object" && r !== null && r !== void 0) {
      var i = r;
      Array.isArray(r) || (i = [r]), t.$refs[n.UPLOAD_INNER].$refs[n.UPLOAD_INNER_TEMPLATE].handleChange({
        target: {
          files: i
        }
      });
    }
  };
}, ew = function(e) {
  var t = e.vm, n = e.state, r = e.constants, i = e.props, a = e.emit;
  return function(s, l) {
    var u = r.LIST_TYPE, c = u.PICTURE_CARD, d = u.PICTURE_SINGLE, p = n.isHwh5, f = i.listType;
    if ([c, d].includes(f) || (l = ""), n.triggerClickType = l, f === c && p) {
      t.$refs[r.UPLOAD_LIST_INNER].$refs[r.UPLOAD_LIST_INNER_TEMPLATE].chooseFile(l);
      return;
    }
    a("trigger-click", s, l);
  };
}, tw = function(e) {
  return function() {
    Array.isArray(e.uploadFiles) && e.uploadFiles.forEach(function(t) {
      t.url && t.url.indexOf("blob:") === 0 && URL.revokeObjectURL(t.url);
    });
  };
}, nw = function(e) {
  var t = e.state, n = e.emit;
  return function(r) {
    t.selected = r, n("click-file-list", r);
  };
}, ow = function(e) {
  var t = e.vm, n = e.state;
  return function() {
    t.$on("drag-over", function(r) {
      return n.isDragover = r;
    });
  };
}, rw = function(e) {
  var t = e.state;
  return function() {
    var n = t.encryptDialogConfig.selectFileMethod;
    t.encryptDialogConfig.show = !1, typeof n == "function" && n();
  };
}, iw = function(e) {
  var t = e.vm, n = e.constants, r = e.state, i = e.props;
  return function() {
    var a = n.LIST_TYPE.PICTURE_CARD, s = r.isHwh5, l = i.listType;
    l === a && s && (t.$refs[n.UPLOAD_LIST_INNER].$refs[n.UPLOAD_LIST_INNER_TEMPLATE].state.showAudioPanel = !1);
  };
}, aw = function(e) {
  var t = e.t, n = e.api, r = e.constants;
  return function(i) {
    var a = i.accept, s = i.fileSize, l = i.limit, u = "";
    a && (u = t(r.ONLY_SUPPORT, {
      type: a.split(",").map(function(f) {
        return f.trim().replace(/^\./, "");
      }).join(t(r.COMMA))
    })), s && u.length !== 0 && (u += "".concat(t(r.COMMA), " "));
    var c = "", d = 1024;
    typeof s == "number" ? c = "".concat(t(r.FILE_NOT_LESS_THAN)).concat(n.formatFileSize(s * d)) : Array.isArray(s) && (c += !isNaN(s[0]) && !isNaN(s[1]) ? t(r.FILE_SIZE_RANGE, {
      moreThan: n.formatFileSize(Number(s[0]) * d),
      lessThan: n.formatFileSize(Number(s[1]) * d)
    }) : "");
    var p = l ? t(r.NUMBER_LIMIT, {
      number: l
    }) : "";
    return (s || u.length !== 0) && l && (p = "".concat(t(r.COMMA), " ") + p), u + c + p;
  };
}, sw = ["state", "getNewTabPreviewUrl", "previewFile", "downloadFile", "abort", "clearFiles", "getFile", "handleStart", "handleProgress", "handleSuccess", "handleError", "handleRemove", "handleReUpload", "handleReUploadTotal", "submit", "handleClick", "handleFileClick", "getFileUploadUrl", "updateUrl", "previewImage", "updateFile", "handleChange", "abortDownload", "handleClickFileList", "handleTriggerClick", "closeRecordPanel", "encryptDialogConfirm", "formatFileSize", "getTipMessage"], lw = function(e) {
  var t = e.api, n = e.reactive, r = e.computed, i = e.inject, a = e.ref, s = e.vm, l = e.props, u = e.httpRequest, c = e.service, d = e.useBreakpoint, p = d(), f = p.current, m = n({
    url: "",
    updateId: "",
    currentDownloadFiles: "",
    tempIndex: 1,
    draging: !1,
    uploadFiles: [],
    dragOver: !1,
    httpRequest: u,
    form: i("form", a({
      default: ""
    })),
    listeners: s.$listeners,
    docSize: 0,
    // unit(B)
    chunkSize: 0,
    chunkBatchLimit: 5,
    downloadChunkLimit: 5,
    batchQueue: {},
    batchQueueListen: {},
    batchCancelToken: {},
    replayAtoms: {},
    chunkUploadUrl: "",
    largeFileInfo: {},
    headers: {},
    accept: "",
    edmToken: {},
    isSuccess: !1,
    singleMaxSize: 200,
    formData: {},
    showPreview: !1,
    iframeUrl: "",
    fileWater: !1,
    tabUrl: "",
    cacheDocuments: {},
    isEdm: r(function() {
      return !Tr(l.edm);
    }),
    uploadDisabled: r(function() {
      return t.computedUploadDisabled();
    }),
    dialogConfigObj: r(function() {
      return t.getDialogConfigObj();
    }),
    uploadingFiles: [],
    currentUploadingFileUids: [],
    uploadingSize: r(function() {
      return t.computedUploadingSize();
    }),
    isEntireCheckCode: r(function() {
      return !("isEntireCheckCode" in l.edm && l.edm.isEntireCheckCode !== !0);
    }),
    downloadBatchQueue: {},
    downloadBatchQueueListen: {},
    downloadChunkFile: {},
    downloadReplayAtoms: {},
    errorStatusCodes: [0, 401, 429],
    // 0：上传异常 401：没权限（token过期）429：超限
    hasFileInfoInterface: r(function() {
      return c.setting.services.EDM && c.setting.services.EDM.DocumentInfoUrl;
    }),
    currentDownloadFile: "",
    isDragover: !1,
    downloadCancelToken: {},
    // 取消下载token
    downloadCancelData: {},
    // 取消下载时需要清空的缓存数据
    isHwh5: r(function() {
      return !Tr(l.hwh5);
    }),
    selected: null,
    types: r(function() {
      return t.computedSourcetype();
    }),
    triggerClickType: "",
    visible: !1,
    downloadParamsWhitelist: ["docId", "wmType", "docVersion"],
    encryptDialogConfig: {
      show: !1,
      selectFileMethod: null
    },
    current: f
  });
  return m;
}, uw = function(e) {
  var t = e.api, n = e.state, r = e.props, i = e.constants, a = e.vm, s = e.$service, l = e.t, u = e.Modal, c = e.emit;
  Object.assign(t, {
    state: n,
    sliceChunk: US({
      state: n
    }),
    getFormData: LS({
      constants: i,
      props: r,
      state: n
    }),
    abort: uS({
      constants: i,
      vm: a,
      state: n
    }),
    handleClick: fS({
      constants: i,
      vm: a
    }),
    handleFileClick: hS({
      props: r,
      emit: c
    }),
    getFile: lS(n),
    clearFiles: dS(n),
    watchFileList: jb({
      constants: i,
      state: n,
      props: r,
      api: t
    }),
    watchListType: zb({
      constants: i,
      state: n,
      api: t
    }),
    onBeforeDestroy: tw(n),
    computedUploadDisabled: Hb({
      props: r,
      state: n
    }),
    computedUploadingSize: $b({
      state: n,
      constants: i
    }),
    getFileUploadUrl: mS(s),
    getToken: Gs({
      constants: i,
      props: r,
      state: n,
      t: l,
      Modal: u
    }),
    getDialogConfigObj: QS({
      props: r,
      state: n,
      t: l,
      constants: i
    }),
    computeDocChunkSize: XS({
      props: r,
      state: n,
      constants: i
    }),
    updateFile: qS({
      constants: i,
      vm: a
    }),
    getPreviewUrlSync: WS({
      constants: i,
      props: r,
      state: n
    }),
    ordinaryDownload: Rs(s),
    clearUploadingFiles: sS({
      constants: i,
      state: n
    }),
    calcUploadingFilesInfo: eS({
      state: n,
      constants: i
    }),
    properFileSize: Xb({
      props: r,
      state: n,
      api: t,
      constants: i,
      Modal: u,
      t: l
    }),
    mounted: ow({
      vm: a,
      state: n
    }),
    previewFileSingle: zS({
      api: t,
      state: n,
      props: r,
      constants: i,
      service: s
    }),
    previewFileBatch: jS({
      service: s,
      props: r,
      state: n,
      api: t
    }),
    previewImageSingle: YS({
      state: n,
      props: r,
      service: s
    }),
    previewImageBatch: KS({
      service: s,
      api: t
    }),
    abortDownload: cS({
      state: n
    }),
    createDownloadCancelToken: bS({
      state: n,
      service: s
    }),
    computedSourcetype: ZS({
      props: r,
      constants: i
    }),
    getFileSourceType: JS({
      state: n,
      props: r,
      constants: i
    }),
    encryptDialogConfirm: rw({
      state: n
    }),
    getTipMessage: aw({
      t: l,
      api: t,
      constants: i
    }),
    formatFileSize: ms
  });
}, cw = function(e) {
  var t = e.api, n = e.props, r = e.$service, i = e.state, a = e.constants, s = e.emit, l = e.mode, u = e.Modal, c = e.t, d = e.vm, p = e.CryptoJS, f = e.Streamsaver;
  Object.assign(t, {
    segmentUploadInit: FS({
      api: t,
      props: n,
      service: r,
      state: i,
      constants: a
    }),
    segmentUpload: RS({
      api: t,
      props: n,
      service: r,
      state: i,
      emit: s,
      constants: a,
      CryptoJS: p
    }),
    addFileToList: Zb({
      api: t,
      constants: a,
      emit: s,
      props: n,
      state: i,
      mode: l
    }),
    downloadFile: IS({
      api: t,
      state: i
    }),
    downloadFileSingleInner: kS({
      props: n,
      state: i,
      api: t,
      constants: a
    }),
    previewImage: GS({
      api: t,
      props: n,
      service: r
    }),
    previewFile: HS({
      api: t,
      props: n
    }),
    getNewTabPreviewUrl: $S({
      api: t
    }),
    submit: pS({
      api: t,
      constants: a,
      vm: d,
      props: n,
      state: i
    }),
    handleStart: _b({
      api: t,
      constants: a,
      props: n,
      state: i,
      vm: d
    }),
    batchSegmentUpload: VS({
      api: t,
      constants: a,
      props: n,
      vm: d,
      state: i
    }),
    largeDocumentUpload: NS({
      api: t,
      Modal: u,
      state: i,
      emit: s,
      constants: a,
      t: c
    }),
    handleProgress: tS({
      api: t,
      constants: a,
      emit: s,
      state: i
    }),
    handleSuccess: nS({
      api: t,
      constants: a,
      emit: s,
      Modal: u,
      props: n,
      state: i,
      t: c
    }),
    handleError: oS({
      api: t,
      constants: a,
      emit: s,
      state: i,
      props: n
    }),
    handleRemove: rS({
      api: t,
      emit: s,
      props: n,
      state: i,
      constants: a
    }),
    handleReUpload: iS({
      vm: d,
      constants: a
    }),
    handleReUploadTotal: aS(t),
    updateUrl: vS({
      api: t,
      props: n,
      state: i
    }),
    startUpload: Kb({
      api: t,
      state: i,
      constants: a,
      vm: d,
      Modal: u,
      t: c
    }),
    beforeUpload: Yb({
      api: t,
      props: n,
      Modal: u,
      constants: a,
      t: c,
      state: i
    }),
    getDownloadFileInfo: ES({
      api: t,
      props: n,
      state: i,
      service: r
    }),
    largeDocumentDownload: DS({
      api: t,
      state: i
    }),
    sliceDownloadChunk: BS({
      state: i
    }),
    batchSegmentDownload: xS({
      state: i,
      api: t
    }),
    downloadFileInner: PS({
      api: t,
      props: n,
      state: i
    }),
    setWriterFile: OS({
      state: i,
      emit: s,
      Streamsaver: f
    }),
    afterDownload: MS({
      api: t,
      state: i
    }),
    getFileHash: Jb({
      emit: s,
      Modal: u,
      constants: a,
      t: c,
      CryptoJS: p,
      state: i
    }),
    modifyServiceUrlSingle: gS({
      state: i,
      props: n,
      constants: a
    }),
    getKiaScanTip: AS({
      Modal: u,
      constants: a,
      t: c
    }),
    downloadFileSingle: SS({
      service: r,
      constants: a,
      props: n,
      state: i,
      api: t,
      emit: s
    }),
    downloadFileBatch: wS({
      api: t,
      service: r,
      props: n,
      state: i,
      emit: s
    }),
    downloadFileSingleHwh5: CS({
      state: i,
      props: n,
      emit: s,
      constants: a
    }),
    downloadAsyncPackage: TS({
      state: i,
      props: n,
      api: t,
      constants: a,
      service: r
    }),
    validateDownloadStatus: yS({
      state: i,
      Modal: u
    }),
    handleChange: _S({
      vm: d,
      constants: a
    }),
    handleClickFileList: nw({
      state: i,
      emit: s
    }),
    handleTriggerClick: ew({
      vm: d,
      state: i,
      constants: a,
      props: n,
      emit: s
    }),
    closeRecordPanel: iw({
      vm: d,
      constants: a,
      state: i,
      props: n
    })
  });
}, dw = function(e) {
  var t = e.watch, n = e.state, r = e.api, i = e.props, a = e.$service;
  t(function() {
    var s;
    return (s = i.edm) === null || s === void 0 ? void 0 : s.upload;
  }, function(s) {
    return s && r.getToken({
      token: s.token,
      isinit: !0
    });
  }, {
    immediate: !0,
    deep: !0
  }), t(function() {
    return i.listType;
  }, r.watchListType), t(function() {
    return i.fileList;
  }, function(s) {
    return r.watchFileList(s);
  }, {
    immediate: !0,
    deep: !0
  }), t(function() {
    return i.action;
  }, function() {
    !i.httpRequest && !n.isEdm && r.updateUrl();
  }, {
    immediate: !0
  }), t(function() {
    return n.isSuccess;
  }, function(s) {
    return s && a.getSingleUploadUrl().then(function(l) {
      return n.url = l;
    });
  }, {
    immediate: !0
  }), t(function() {
    return i.edm;
  }, r.computeDocChunkSize, {
    deep: !0,
    immediate: !0
  });
}, Ys = function() {
  return {};
}, pw = function(e, t, n, r) {
  var i = t.computed, a = t.inject, s = t.onBeforeUnmount, l = t.provide, u = t.reactive, c = t.ref, d = t.watch, p = t.onMounted, f = n.t, m = n.vm, h = n.parent, v = n.emit, g = n.service, b = n.mode, y = n.constants, S = n.useBreakpoint, I = r.Modal, k = r.CryptoJS, E = r.Streamsaver, L = {}, V = Us({
    props: e,
    service: g
  }), Y = V.httpRequest, X = lw({
    reactive: u,
    computed: i,
    api: L,
    inject: a,
    ref: c,
    vm: m,
    props: e,
    httpRequest: Y,
    service: g,
    useBreakpoint: S
  });
  return uw({
    api: L,
    state: X,
    props: e,
    constants: y,
    vm: m,
    $service: V,
    t: f,
    Modal: I,
    emit: v
  }), cw({
    api: L,
    props: e,
    $service: V,
    state: X,
    constants: y,
    emit: v,
    mode: b,
    Modal: I,
    t: f,
    vm: m,
    CryptoJS: k,
    Streamsaver: E
  }), Ys = function() {
    return L;
  }, l("uploader", h), p(L.mounted), s(function() {
    L.onBeforeDestroy(), L = {}, m.$off("drag-over");
  }), dw({
    watch: d,
    state: X,
    api: L,
    props: e,
    $service: V
  }), L;
}, fw = ["t", "state", "parsePercentage", "handleClick", "handlePreview", "picturefilePreview", "getDeleteData", "downloadFile", "play", "pause", "handleLoadedmetadata", "handleTimeupdate", "showOperatePanel", "getFileType", "getFileIcon", "reUpload", "remove", "handleTriggerClick", "chooseFile", "formatFileSize"], mw = function(e, t, n, r) {
  var i, a, s, l, u, c = t.reactive, d = t.onMounted, p = t.onUnmounted, f = t.watch, m = t.inject, h = t.computed, v = n.t, g = n.parent, b = n.mode, y = n.emit, S = n.service, I = n.vm, k = n.nextTick, E = n.designConfig, L = n.useBreakpoint, V = r.Modal, Y = {
    getApi: Ys
  };
  g = m("uploader").$children[0];
  var X = g.$constants, _ = Us({
    props: e,
    service: S
  }), be = L(), gl = be.current, gn = c({
    focusing: !1,
    shows: !1,
    currentBreakpoint: gl,
    progressType: (E == null || (i = E.state) === null || i === void 0 ? void 0 : i.progressType) || "line",
    progressWidth: E != null && E.state && Object.hasOwnProperty.call(E.state, "progressWidth") ? E.state.progressWidth : "68",
    progressStrokeWidth: (E == null || (a = E.state) === null || a === void 0 ? void 0 : a.progressStrokeWidth) || 4,
    tooltipDisabled: (s = E == null || (l = E.state) === null || l === void 0 ? void 0 : l.tooltipDisabled) !== null && s !== void 0 ? s : !1,
    closeComponent: (E == null || (u = E.icons) === null || u === void 0 ? void 0 : u.closeComponent) || "icon-del",
    preViewComponent: E != null && E.icons && Object.hasOwnProperty.call(E.icons, "preViewComponent") ? E.icons.preViewComponent : "icon-fullscreen-left",
    failUploadFileCount: h(function() {
      return e.files.reduce(function(An, Al) {
        return An += Al.status === "fail" ? 1 : 0;
      }, 0);
    }),
    startPostion: 0,
    screenType: b === "mobile",
    showPanel: !1,
    showTriggerPanel: !1,
    triggerClickType: "",
    showAudioPanel: !1,
    files: h(function() {
      return Y.getNotSuccessFiles();
    }),
    currentFile: null
  });
  return g.getToken = Gs({
    constants: X,
    props: g,
    state: g.state,
    t: v,
    Modal: V
  }), Object.assign(Y, {
    state: gn,
    getDeleteData: bb(y),
    parsePercentage: gb(),
    downloadFile: Rs(_),
    picturefilePreview: yb(gn),
    handleClick: Ab({
      props: e,
      api: Y,
      parent: g
    }),
    play: Cb({
      vm: I,
      api: Y,
      props: e
    }),
    pause: Ib({
      vm: I,
      props: e
    }),
    handleLoadedmetadata: kb({
      vm: I
    }),
    handleTimeupdate: Eb(),
    destroyed: Rb({
      props: e,
      vm: I
    }),
    showOperatePanel: Sb({
      state: gn
    }),
    getFileType: Db(),
    getFileIcon: Bb({
      constants: X
    }),
    mounted: Fb({
      api: Y,
      vm: I
    }),
    calcUploadListLiWidth: Pb({
      vm: I,
      nextTick: k,
      props: e,
      constants: X
    }),
    reUpload: wb({
      emit: y,
      props: e,
      parent: g
    }),
    remove: xb({
      emit: y
    }),
    handleTriggerClick: Nb({
      state: gn,
      props: e
    }),
    chooseFile: Lb({
      state: gn,
      constants: X
    }),
    calcVisible: Mb({
      props: e,
      constants: X,
      emit: y
    }),
    getNotSuccessFiles: Ob({
      props: e,
      constants: X
    }),
    formatFileSize: ms
  }), e.listType === X.LIST_TYPE.DRAG_SINGLE && f(function() {
    return e.files && e.files[0];
  }, function(An) {
    An && An.status === X.FILE_STATUS.FAIL && setTimeout(function() {
      Y.remove({
        file: An
      });
    }, 2e3);
  }, {
    immediate: !0,
    deep: !0
  }), f(function() {
    return e.files;
  }, Y.calcUploadListLiWidth), e.mode === X.MODE.BUBBLE && e.listType === X.LIST_TYPE.TEXT && X && f(function() {
    return e.files;
  }, Y.calcVisible, {
    immediate: !0,
    deep: !0
  }), d(Y.mounted), p(Y.destroyed), Y;
}, vw = function(e) {
  var t = e.api, n = e.props;
  return function() {
    return {
      width: n.percentage + "%",
      backgroundColor: t.getCurrentColor(n.percentage)
    };
  };
}, hw = function(e) {
  var t = e.constants, n = e.state;
  return function() {
    return n.width === 0 || n.strokeWidth === 0 ? t.REL_STROKE_WIDTH : Number((n.strokeWidth / n.width * 100).toFixed(1));
  };
}, gw = function(e) {
  var t = e.constants, n = e.props, r = e.state;
  return function() {
    return n.type === t.PROGRESS_TYPE.CIRCLE || n.type === t.PROGRESS_TYPE.DASHBOARD ? parseInt(String(50 - parseFloat(r.relativeStrokeWidth) / 2), 10) : 0;
  };
}, Aw = function(e) {
  var t = e.constants, n = e.props, r = e.state;
  return function() {
    var i = r.radius, a = n.type === t.PROGRESS_TYPE.DASHBOARD;
    return `
    M 50 50
    m 0 `.concat(a ? "" : "-").concat(i, `
    a `).concat(i, " ").concat(i, " 0 1 1 0 ").concat(a ? "-" : "").concat(i * 2, `
    a `).concat(i, " ").concat(i, " 0 1 1 0 ").concat(a ? "" : "-").concat(i * 2, `
    `);
  };
}, yw = function(e) {
  var t = e.state;
  return function() {
    return 2 * Math.PI * t.radius;
  };
}, bw = function(e) {
  var t = e.constants, n = e.props;
  return function() {
    return n.type === t.PROGRESS_TYPE.DASHBOARD ? 0.75 : 1;
  };
}, Sw = function(e) {
  var t = e.state;
  return function() {
    return "".concat(-1 * t.perimeter * (1 - t.rate) / 2, "px");
  };
}, ww = function(e) {
  var t = e.state;
  return function() {
    return {
      strokeDasharray: "".concat(t.perimeter * t.rate, "px, ").concat(t.perimeter, "px"),
      strokeDashoffset: t.strokeDashoffset
    };
  };
}, Tw = function(e) {
  var t = e.state;
  return function() {
    return t.width ? {
      height: t.width + "px",
      width: t.width + "px"
    } : {};
  };
}, Cw = function(e) {
  var t = e.props, n = e.state;
  return function() {
    return {
      strokeDasharray: "".concat(n.perimeter * n.rate * (t.percentage / 100), "px, ").concat(n.perimeter, "px"),
      strokeDashoffset: n.strokeDashoffset,
      transition: "stroke-dasharray 0.6s ease 0s, stroke 0.6s ease"
    };
  };
}, Iw = function(e) {
  var t = e.api, n = e.constants, r = e.props;
  return function() {
    return r.color && t.getCurrentColor(r.percentage) || n.STATUS_TO_COLOR[r.status] || n.STATUS_DEFAULT_COLOR;
  };
}, kw = function(e) {
  var t = e.constants, n = e.props, r = e.mode;
  return function() {
    if (n.status === t.PROGRESS_STATUS.SUCCESS) {
      var i = n.type === t.PROGRESS_TYPE.LINE ? [t.ICON_SUCCESS, t.ICON_CIRCLE_SUCCESS] : [t.ICON_CIRCLE_SUCCESS, t.ICON_SUCCESS];
      return r === "mobile-first" ? i[1] : i[0];
    } else {
      if (n.status === t.PROGRESS_STATUS.WARNING)
        return n.type === t.PROGRESS_TYPE.LINE ? t.ICON_WARNING : t.ICON_CIRCLE_WARNING;
      if (n.status === t.PROGRESS_STATUS.EXCEPTION) {
        var a = n.type === t.PROGRESS_TYPE.LINE ? [t.ICON_EXCEPTION, t.ICON_CIRCLE_EXCEPTION] : [t.ICON_CIRCLE_EXCEPTION, t.ICON_EXCEPTION];
        return r === "mobile-first" ? a[1] : a[0];
      } else
        return "";
    }
  };
}, Ew = function(e) {
  var t = e.constants, n = e.props, r = e.state;
  return function() {
    return n.type === t.PROGRESS_TYPE.LINE ? r.strokeWidth ? {
      width: t.TEXT_XS + r.strokeWidth * t.STROKE_WIDTH_RATE,
      height: t.TEXT_XS + r.strokeWidth * t.STROKE_WIDTH_RATE
    } : {} : r.width ? {
      width: r.width / t.WIDTH_RATE_TWO,
      height: r.width / t.WIDTH_RATE_TWO
    } : {};
  };
}, Dw = function(e) {
  var t = e.constants, n = e.props, r = e.state, i = e.mode;
  return function() {
    if (i === "mobile-first") {
      var a = t.TEXT_XS, s = {
        small: t.PROGRESS_SIZE_WIDTH.SMALL,
        medium: t.PROGRESS_SIZE_WIDTH.MEDIUM,
        large: t.PROGRESS_SIZE_WIDTH.LARGE
      };
      if (n.type === t.PROGRESS_TYPE.LINE)
        a = r.strokeWidth ? t.TEXT_XS + r.strokeWidth * t.STROKE_WIDTH_RATE : n.size === t.PROGRESS_SIZE.SMALL ? t.TEXT_XS : t.TEXT_SM;
      else {
        var l = r.width ? r.width : s[n.size];
        a = l / t.WIDTH_RATE_THREE, r.percentTextSize = l / t.WIDTH_RATE_SIX;
      }
      return a;
    } else
      return n.type === t.PROGRESS_TYPE.LINE ? t.TEXT_XS + r.strokeWidth * t.STROKE_WIDTH_RATE : r.width * 0.111111 + 2;
  };
}, Bw = function(e) {
  var t = e.props;
  return function() {
    return typeof t.format == "function" ? t.format() || "" : "".concat(t.percentage, "%");
  };
}, xw = function(e) {
  var t = e.api, n = e.props;
  return function(r) {
    return typeof n.color == "function" ? n.color(r) : typeof n.color == "string" ? n.color : t.getLevelColor(r);
  };
}, Pw = function(e) {
  var t = e.api;
  return function(n) {
    for (var r = t.getColorArray().sort(function(a, s) {
      return a.percentage - s.percentage;
    }), i = 0; i < r.length; i++)
      if (r[i].percentage > n)
        return r[i].color;
    return r[r.length - 1].color;
  };
}, Mw = function(e) {
  var t = e.props;
  return function() {
    var n = t.color, r = 100 / n.length;
    return n.map(function(i, a) {
      return typeof i == "string" ? {
        color: i,
        progress: (a + 1) * r
      } : i;
    });
  };
}, Ow = function(e) {
  var t = e.props, n = e.state;
  return function(r) {
    t.type === "line" ? r.style.width = String(0) : t.type === "circle" && (r.style.strokeDasharray = String(n.perimeter * n.content), r.style.strokeDashoffset = n.perimeter);
  };
}, Lw = function(e) {
  e.style.transition = "all 0.5s";
}, Nw = function(e) {
  var t = e.state, n = e.props;
  return function(r) {
    n.type === "line" ? r.style.width = t.barStyle.width : n.type === "circle" && (r.style.strokeDashoffset = String(0));
  };
}, Fw = ["state", "getCurrentColor", "getLevelColor", "getColorArray", "customBeforeAppearHook", "customAppearHook", "customAfterAppearHook"], Rw = function(e, t, n) {
  var r = t.computed, i = t.reactive, a = n.constants, s = n.mode, l = {}, u = i({
    percentTextSize: a.TEXT_XS,
    rate: r(function() {
      return l.computedRate();
    }),
    radius: r(function() {
      return l.computedRadius();
    }),
    stroke: r(function() {
      return l.computedStroke();
    }),
    content: r(function() {
      return l.computedContent();
    }),
    barStyle: r(function() {
      return l.computedBarStyle();
    }),
    trackPath: r(function() {
      return l.computedTrackPath();
    }),
    perimeter: r(function() {
      return l.computedPerimeter();
    }),
    iconClass: r(function() {
      return l.computedIconClass();
    }),
    iconStyle: r(function() {
      return l.computedIconStyle();
    }),
    circleStyle: r(function() {
      return l.computedCircleStyle();
    }),
    trailPathStyle: r(function() {
      return l.computedTrailPathStyle();
    }),
    circlePathStyle: r(function() {
      return l.computedCirclePathStyle();
    }),
    progressTextSize: r(function() {
      return l.computedProgressTextSize();
    }),
    strokeDashoffset: r(function() {
      return l.computedStrokeDashoffset();
    }),
    strokeWidth: r(function() {
      return s === "mobile-first" ? e.strokeWidth : e.strokeWidth || a.DEFAULT_STROKE_WIDTH;
    }),
    width: r(function() {
      return s === "mobile-first" ? e.width : e.width || a.DEFAULT_WIDTH;
    }),
    relativeStrokeWidth: r(function() {
      return l.computedRelativeStrokeWidth();
    })
  });
  return Object.assign(l, {
    state: u,
    customAppearHook: Lw,
    computedContent: Bw({
      props: e
    }),
    getColorArray: Mw({
      props: e
    }),
    computedRate: bw({
      constants: a,
      props: e
    }),
    computedPerimeter: yw({
      state: u
    }),
    computedRadius: gw({
      constants: a,
      props: e,
      state: u
    }),
    computedTrackPath: Aw({
      constants: a,
      props: e,
      state: u
    }),
    computedIconClass: kw({
      constants: a,
      props: e,
      mode: s
    }),
    computedIconStyle: Ew({
      constants: a,
      props: e,
      state: u
    }),
    computedCircleStyle: Tw({
      state: u
    }),
    computedCirclePathStyle: Cw({
      props: e,
      state: u
    }),
    computedStrokeDashoffset: Sw({
      state: u
    }),
    computedTrailPathStyle: ww({
      state: u
    }),
    computedRelativeStrokeWidth: hw({
      state: u,
      constants: a
    }),
    computedProgressTextSize: Dw({
      state: u,
      constants: a,
      props: e,
      mode: s
    }),
    customAfterAppearHook: Nw({
      state: u,
      props: e
    }),
    customBeforeAppearHook: Ow({
      props: e,
      state: u
    }),
    getLevelColor: Pw({
      api: l
    }),
    computedBarStyle: vw({
      api: l,
      props: e
    }),
    getCurrentColor: xw({
      api: l,
      props: e
    }),
    computedStroke: Iw({
      api: l,
      constants: a,
      props: e
    })
  }), l;
};
const Vw = B({
  props: [
    ...Q,
    "type",
    "percentage",
    "status",
    "strokeWidth",
    "textInside",
    "width",
    "showText",
    "color",
    "format"
  ],
  components: {
    IconClose: yt(),
    IconSuccessful: Ml(),
    IconError: Mo(),
    IconYes: Ur(),
    IconWarning: Ta()
  },
  setup(o, e) {
    return z({ props: o, context: e, renderless: Rw, api: Fw });
  }
}), Uw = ["aria-valuenow"], Hw = {
  key: 0,
  class: "tiny-mobile-progress-bar"
}, $w = {
  key: 0,
  class: "tiny-mobile-progress-bar__innerText"
}, zw = { viewBox: "0 0 100 100" }, jw = ["d", "stroke-width"], Ww = ["d", "stroke", "stroke-width"];
function Gw(o, e, t, n, r, i) {
  return A(), w("div", {
    class: P(["tiny-mobile-progress", [
      "tiny-mobile-progress--" + o.type,
      o.status ? "is-" + o.status : "",
      {
        "tiny-mobile-progress__without-text": !o.showText,
        "tiny-mobile-progress__inside-text": o.textInside
      }
    ]]),
    role: "progressbar",
    "aria-valuenow": o.percentage,
    "aria-valuemin": "0",
    "aria-valuemax": "100"
  }, [
    o.type === "line" ? (A(), w("div", Hw, [
      T(
        "div",
        {
          class: "tiny-mobile-progress-bar__outer",
          style: H({ height: o.strokeWidth + "px" })
        },
        [
          T(
            "div",
            {
              class: "tiny-mobile-progress-bar__inner",
              style: H(o.state.barStyle)
            },
            [
              o.showText && o.textInside && o.strokeWidth > 12 ? (A(), w(
                "div",
                $w,
                M(o.state.content),
                1
                /* TEXT */
              )) : x("v-if", !0)
            ],
            4
            /* STYLE */
          )
        ],
        4
        /* STYLE */
      )
    ])) : (A(), w(
      "div",
      {
        key: 1,
        class: "tiny-mobile-progress-circle",
        style: H({ height: o.width + "px", width: o.width + "px" })
      },
      [
        (A(), w("svg", zw, [
          T("path", {
            class: "tiny-mobile-progress-circle__track",
            d: o.state.trackPath,
            stroke: "#e5e9f2",
            "stroke-width": o.state.relativeStrokeWidth,
            fill: "none",
            style: H(o.state.trailPathStyle)
          }, null, 12, jw),
          T("path", {
            class: "tiny-mobile-progress-circle__path",
            d: o.state.trackPath,
            stroke: o.state.stroke,
            fill: "none",
            "stroke-linecap": "round",
            "stroke-width": o.percentage ? o.state.relativeStrokeWidth : 0,
            style: H(o.state.circlePathStyle)
          }, null, 12, Ww)
        ]))
      ],
      4
      /* STYLE */
    )),
    o.showText && !o.textInside ? (A(), w(
      "div",
      {
        key: 2,
        class: "tiny-mobile-progress-text",
        style: H({ fontSize: o.state.progressTextSize + "px" })
      },
      [
        o.status ? (A(), G(pe(o.state.iconClass), { key: 1 })) : (A(), w(
          q,
          { key: 0 },
          [
            ue(
              M(o.state.content),
              1
              /* TEXT */
            )
          ],
          64
          /* STABLE_FRAGMENT */
        ))
      ],
      4
      /* STYLE */
    )) : x("v-if", !0)
  ], 10, Uw);
}
const Zn = /* @__PURE__ */ W(Vw, [["render", Gw]]);
var Yw = function(e) {
  var t, n = (typeof process > "u" ? "undefined" : R(process)) === "object" ? (t = process.env) === null || t === void 0 ? void 0 : t.TINY_MODE : null;
  return Zn;
}, Xt = {
  PROGRESS_TYPE: {
    LINE: "line",
    CIRCLE: "circle",
    DASHBOARD: "dashboard"
  },
  PROGRESS_SIZE: {
    SMALL: "small",
    MEDIUM: "medium",
    LARGE: "large"
  },
  PROGRESS_SIZE_WIDTH: {
    SMALL: 48,
    MEDIUM: 96,
    LARGE: 160
  },
  PROGRESS_STATUS: {
    DEFAULT: "default",
    SUCCESS: "success",
    EXCEPTION: "exception",
    WARNING: "warning"
  },
  STATUS_TO_COLOR: {
    success: "#00a874",
    exception: "#eb171f",
    warning: "#fdc000"
  },
  STATUS_DEFAULT_COLOR: "#0067d1",
  ICON_CIRCLE_WARNING: "icon-warning",
  ICON_CIRCLE_SUCCESS: "icon-success",
  ICON_CIRCLE_EXCEPTION: "icon-error",
  ICON_SUCCESS: "icon-yes",
  ICON_EXCEPTION: "icon-close",
  ICON_WARNING: "icon-warning",
  TEXT_XS: 12,
  TEXT_SM: 14,
  WIDTH_RATE_TWO: 2,
  WIDTH_RATE_THREE: 3,
  WIDTH_RATE_SIX: 6,
  DEFAULT_STROKE_WIDTH: 6,
  REL_STROKE_WIDTH: 4,
  DEFAULT_WIDTH: 126,
  STROKE_WIDTH_RATE: 0.4
}, Kw = C(C({}, j), {}, {
  _constants: {
    type: Object,
    default: function() {
      return Xt;
    }
  },
  color: {
    type: [String, Array, Function],
    default: ""
  },
  info: String,
  format: Function,
  percentage: {
    type: Number,
    default: 0,
    required: !0,
    validator: function(e) {
      return e >= 0 && e <= 100;
    }
  },
  showText: {
    type: Boolean,
    default: !0
  },
  status: {
    type: String,
    validator: function(e) {
      return !!Xt.PROGRESS_STATUS[e.toUpperCase()];
    }
  },
  strokeWidth: {
    type: Number,
    default: 0
  },
  textInside: {
    type: Boolean,
    default: !1
  },
  type: {
    type: String,
    default: Xt.PROGRESS_TYPE.LINE,
    validator: function(e) {
      return !!Xt.PROGRESS_TYPE[e.toUpperCase()];
    }
  },
  size: {
    type: String,
    default: Xt.PROGRESS_SIZE.MEDIUM,
    validator: function(e) {
      return !!Xt.PROGRESS_SIZE[e.toUpperCase()];
    }
  },
  width: {
    type: Number,
    default: 0
  }
});
const Ve = B({
  name: O + "Progress",
  props: Kw,
  setup: function(e, t) {
    return K({
      props: e,
      context: t,
      template: Yw
    });
  }
}), Qw = "3.20.0";
Ve.install = function(o) {
  o.component(Ve.name, Ve);
};
Ve.version = Qw;
var Xw = function() {
  return !!window.navigator.userAgent.match(/firefox/i);
}, Ks = Xw() ? "DOMMouseScroll" : "mousewheel", Lr = function(e) {
  var t = !1;
  return function() {
    for (var n = this, r = arguments.length, i = new Array(r), a = 0; a < r; a++)
      i[a] = arguments[a];
    t || (t = !0, window.requestAnimationFrame(function() {
      e.apply(n, i), t = !1;
    }));
  };
}, Zw = function(e) {
  var t = e.props, n = e.api, r = e.state;
  return function() {
    n.deviceSupportUninstall(), t.onClose(), r.showImageViewer = !1;
  };
}, Jw = function(e) {
  var t = e.state, n = e.api, r = e.mode;
  return function() {
    N(window, "resize", n.initPage), t.urlList = t.urlList.map(function(i) {
      var a = {}, s = "";
      return typeof i == "string" ? (i = n.filterImageUrl(i), t.isThumbnail || t.isMenuView ? (s = i.lastIndexOf("/"), t.fileName = i.substring(s + 1), a.url = i, a.name = t.fileName, a) : (s = i.lastIndexOf("/"), t.fileName = i.substring(s + 1), {
        url: i,
        name: t.fileName
      })) : R(i) === "object" && i !== null ? (i.url = n.filterImageUrl(i.url), i.name || (s = i.url.lastIndexOf("/"), t.fileName = i.url.substring(s + 1), i.name = t.fileName), i) : null;
    }), t._keyDownHandler = Lr(function(i) {
      var a = i.keyCode;
      switch (a) {
        case ie.Escape:
          n.hide();
          break;
        case ie.Space:
          n.toggleMode();
          break;
        case ie.ArrowLeft:
          n.prev();
          break;
        case ie.ArrowUp:
          n.handleActions("zoomIn");
          break;
        case ie.ArrowRight:
          n.next();
          break;
        case ie.ArrowDown:
          n.handleActions("zoomOut");
          break;
      }
    }), t._mouseWheelHandler = Lr(function(i) {
      var a = i.wheelDelta ? i.wheelDelta : -i.detail;
      a > 0 ? n.handleActions("zoomIn", {
        zoomRate: 0.015,
        enableTransition: !1
      }) : n.handleActions("zoomOut", {
        zoomRate: 0.015,
        enableTransition: !1
      });
    }), N(document, "keydown", t._keyDownHandler), r !== "mobile-first" && N(document, Ks, t._mouseWheelHandler);
  };
}, qw = function(e) {
  var t = e.state, n = e.mode;
  return function() {
    U(document, "keydown", t._keyDownHandler), n !== "mobile-first" && U(document, Ks, t._mouseWheelHandler), t._keyDownHandler = null, t._mouseWheelHandler = null;
  };
}, _w = function(e) {
  return function() {
    return e.loading = !1;
  };
}, eT = function(e) {
  var t = e.state, n = e.t;
  return function(r) {
    t.loading = !1, r.target.alt = n("ui.imageViewer.loadErrorAlt");
  };
}, tT = function(e) {
  return function(t) {
    if (!(e.loading || t.button !== 0)) {
      var n = e.transform, r = n.offsetX, i = n.offsetY, a = t.pageX, s = t.pageY;
      e._dragHandler = Lr(function(l) {
        e.transform.offsetX = r + l.pageX - a, e.transform.offsetY = i + l.pageY - s;
      }), N(document, "mousemove", e._dragHandler), e._removeDrag = function() {
        return U(document, "mousemove", e._dragHandler);
      }, e._clearMouse && (e._clearMouse(), e._clearMouse = void 0), N(document, "mouseup", e._removeDrag), N(document, "mouseleave", e._removeDrag), e._clearMouse = function() {
        U(document, "mouseup", e._removeDrag), U(document, "mouseleave", e._removeDrag);
      }, t.preventDefault();
    }
  };
}, nT = function(e) {
  return function() {
    return e.transform = {
      scale: 1,
      deg: 0,
      offsetX: 0,
      offsetY: 0,
      enableTransition: !1
    };
  };
}, oT = function(e) {
  var t = e.state, n = e.constants, r = e.api;
  return function() {
    if (!t.loading) {
      var i = n.MODE, a = Object.keys(i), s = [];
      a.forEach(function(c) {
        s.push(i[c]);
      });
      var l = -1;
      s.forEach(function(c, d) {
        c.name === t.mode.name && (l = d);
      });
      var u = (l + 1) % a.length;
      t.mode = i[a[u]], r.reset();
    }
  };
}, rT = function(e) {
  var t = e.state, n = e.api, r = e.vm;
  return function() {
    if (!(t.isFirst && !t.infinite)) {
      var i = t.urlList.length, a = "";
      t.index = (t.index - 1 + i) % i, n.activeItems(t.index), t.isThumbnail ? a = r.$refs["isThumbnail_".concat(t.index)][0] || r.$refs["isThumbnail_".concat(t.index)] : t.isMenuView && (a = r.$refs["isMenuView_".concat(t.index)][0] || r.$refs["isMenuView_".concat(t.index)]), t.index === 1 ? (t.isThumbnail && r.$refs.isThumbnailContent && (r.$refs.isThumbnailContent.scrollTop = 0), t.isMenuView && r.$refs.isMenuViewContent && (r.$refs.isMenuViewContent.scrollTop = 0), t.scrollTop = 0) : t.index === t.urlList.length - 1 ? n.getLastPrev(a) : t.index === t.urlList.length - 2 || (t.index === t.urlList.length - 3 ? t.scrollTop = a.offsetHeight : n.getDefaultPrev(a));
    }
  };
}, iT = function(e) {
  var t = e.state, n = e.vm;
  return function(r) {
    t.isThumbnail && n.$refs.isThumbnailContent && (n.$refs.isThumbnailContent.scrollTop = r.offsetTop), t.isMenuView && n.$refs.isMenuViewContent && (n.$refs.isMenuViewContent.scrollTop = r.offsetTop), t.scrollTop = r.offsetTop;
  };
}, aT = function(e) {
  var t = e.state, n = e.vm;
  return function(r) {
    t.scrollTop <= r.offsetHeight ? t.scrollTop = r.offsetTop - t.scrollTop - (t.isThumbnail ? t.thumbnailTop : t.menuTop) : t.scrollTop = t.scrollTop - r.offsetHeight - (t.isThumbnail ? t.thumbnailTop : t.menuTop), t.isThumbnail && n.$refs.isThumbnailContent && (n.$refs.isThumbnailContent.scrollTop = t.scrollTop), t.isMenuView && n.$refs.isMenuViewContent.scrollTop && (n.$refs.isMenuViewContent.scrollTop = t.scrollTop);
  };
}, sT = function(e) {
  var t = e.state, n = e.api, r = e.vm;
  return function() {
    if (!(t.isLast && !t.infinite)) {
      var i = t.urlList.length, a = "";
      t.index = (t.index + 1) % i, n.activeItems(t.index), t.isThumbnail ? a = r.$refs["isThumbnail_".concat(t.index)][0] || r.$refs["isThumbnail_".concat(t.index)] : t.isMenuView && (a = r.$refs["isMenuView_".concat(t.index)][0] || r.$refs["isMenuView_".concat(t.index)]), t.centerIndex = n.getCenterPosition(a) - 1;
      var s = -1;
      t.centerIndex > t.index && (s = t.index), t.index === 0 ? (t.isThumbnail && r.$refs.isThumbnailContent && (r.$refs.isThumbnailContent.scrollTop = 0), t.isMenuView && r.$refs.isMenuViewContent && (r.$refs.isMenuViewContent.scrollTop = 0), t.scrollTop = 0) : t.index === s || (t.isThumbnail ? (r.$refs.isThumbnailContent && (r.$refs.isThumbnailContent.scrollTop = t.scrollTop), t.scrollTop = t.scrollTop + a.offsetHeight + t.thumbnailTop) : t.isMenuView && (r.$refs.isMenuViewContent && (r.$refs.isMenuViewContent.scrollTop = t.scrollTop), t.scrollTop = t.scrollTop + a.offsetHeight + t.menuTop));
    }
  };
}, lT = function(e) {
  var t = e.state, n = e.vm;
  return function(r) {
    var i = 0, a = 0;
    if (t.isThumbnail && n.$refs.isThumbnailContent)
      return i = n.$refs.isThumbnailContent.getBoundingClientRect().height, a = r.getBoundingClientRect().height + parseFloat(getComputedStyle(r).marginBottom) - 0, Math.ceil(i / a) / 2;
    if (n.$refs.isMenuViewContent && n.$refs.isMenuViewContent)
      return i = n.$refs.isMenuViewContent.getBoundingClientRect().height, a = r.getBoundingClientRect().height + parseFloat(getComputedStyle(r).marginTop) - 0, Math.ceil(i / a) / 2;
  };
}, uT = function(e, t, n) {
  return function(r) {
    var i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, a = C({
      zoomRate: 0.2,
      rotateDeg: 90,
      enableTransition: !0
    }, i), s = a.zoomRate, l = a.rotateDeg, u = a.enableTransition, c = e.transform, d = "", p = [];
    d = e.currentImg.lastIndexOf("/");
    var f = e.currentImg.substring(d + 1);
    r === "delImage" && (typeof e.urlList[0] == "string" ? p = e.urlList : R(e.urlList[0]) === "object" && e.urlList[0] !== null && (f = e.urlList[e.index].name, e.urlList.forEach(function(m) {
      p.push(m.url);
    })), p.includes(e.currentImg) && (e.index === e.urlList.length - 1 ? (e.urlList.splice(e.index, 1), e.index = e.urlList.length - 1) : e.urlList.splice(e.index, 1)), e.imageName = f, n("delete", e.imageName)), !e.loading && (r === "zoomOut" ? c.scale > 0.2 && (c.scale = parseFloat((c.scale - s).toFixed(3))) : r === "zoomIn" ? c.scale = parseFloat((c.scale + s).toFixed(3)) : r === "clocelise" ? c.deg += l : r === "anticlocelise" && (c.deg -= l), c.enableTransition = u);
  };
}, cT = function(e) {
  return function() {
    return e.urlList.length <= 1;
  };
}, dT = function(e) {
  return function() {
    return e.index === 0;
  };
}, pT = function(e) {
  var t = e.state, n = e.props;
  return function() {
    return t.index === n.urlList.length - 1;
  };
}, fT = function(e) {
  var t = e.state, n = e.api;
  return function() {
    if (typeof t.urlList[0] == "string")
      return n.filterImageUrl(t.urlList[t.index]);
    if (R(t.urlList[0]) === "object" && t.urlList[0] !== null)
      return n.filterImageUrl(t.urlList[t.index].url);
  };
}, mT = function(e) {
  var t = e.state, n = e.constants;
  return function() {
    var r = t.transform, i = r.offsetX, a = r.offsetY, s = r.scale, l = r.deg, u = r.enableTransition, c = u ? "transform .3s" : "", d = {
      transform: "scale(".concat(s, ") rotate(").concat(l, "deg)"),
      transition: c,
      "margin-top": "".concat(a, "px"),
      "margin-left": "".concat(i, "px")
    };
    return JSON.stringify(t.mode) === JSON.stringify(n.MODE.CONTAIN) && (d.maxWidth = d.maxHeight = "100%"), d;
  };
}, vT = function(e) {
  return function(t) {
    return e.previewVisible = t;
  };
}, hT = function(e) {
  var t = e.state, n = e.emit, r = e.props;
  return function() {
    t.transform.scale = 1, t.transform.deg = 0, setTimeout(function() {
      r.startPosition > 0 ? (t.index = (r.startPosition - 1 + t.urlList.length) % t.urlList.length, t.imageTransform = t.index * t.imageItemWidth, t.imageTransformSize = -t.index * t.imageItemWidth) : (t.index = 0, t.imageTransform = t.index * t.imageItemWidth, t.imageTransformSize = -t.index * t.imageItemWidth);
    }, 300), n("update:preview-visible", !1), n("close", t.index, t.urlList[t.index]);
  };
}, gT = function(e) {
  var t = e.state, n = e.parent, r = e.props, i = e.vm, a = e.mode;
  return function() {
    var s = 0, l = t.urlList.length;
    if (a === "mobile-first" ? (t.isThumbnail && t.isImagePreview ? s = i.$refs.thumbnailCanvasBox.offsetWidth : s = i.$refs.canvasBox && i.$refs.canvasBox.offsetWidth, t.imageList = i.$refs.viewerItem) : a === "mobile" ? (s = n.$el.querySelector(".tiny-mobile-image-viewer__canvas").offsetWidth, t.imageList = n.$el.querySelectorAll(".tiny-mobile-image-viewer__item")) : (s = n.$el.querySelector(".tiny-image-viewer__canvas").offsetWidth, t.imageList = n.$el.querySelectorAll(".tiny-image-viewer__img")), t.imageItemWidth = s, t.imageAllWidth = t.urlList.length * s, a === "mobile") {
      if (r.startPosition > 0) {
        t.index = r.startPosition, t.imageTransition = 0;
        var u = t.index * t.imageItemWidth;
        t.imageTransform = u, t.imageTransformSize = -u;
      }
      if (t.index === 0 && r.deleteButton && t.delete) {
        t.imageTransition = 0;
        var c = t.index * t.imageItemWidth;
        t.imageTransform = c, t.imageTransformSize = -c;
      }
    }
    setTimeout(function() {
      t.imageTransition = 300;
    }, 0), r.startPosition === 0 && (t.arrowStyle = "N"), r.startPosition === l - 1 && (t.arrowStyle = "Y");
  };
}, AT = function(e) {
  var t = e.state, n = e.emit;
  return function() {
    if (!(t.isLast && !t.infinite)) {
      var r = t.urlList.length;
      if (t.index >= t.urlList.length - 2 ? t.arrowStyle = "Y" : t.arrowStyle = null, t.imageTransform === t.imageAllWidth) {
        t.imageTransformSize = t.imageTransform = 0, t.imageList[0].style.transform = null;
        return;
      }
      if (!(t.imageTransform === t.imageAllWidth - t.imageItemWidth && t.index === t.urlList.length - 1)) {
        t.index = (t.index + 1) % r;
        var i = t.index * t.imageItemWidth;
        t.imageTransform = i, t.imageTransformSize = -i, n("change", t.index, t.urlList[t.index]);
      }
    }
  };
}, yT = function(e) {
  var t = e.state, n = e.emit;
  return function() {
    if (!(t.isFirst && !t.infinite)) {
      var r = t.urlList.length;
      if (t.index <= 1 ? t.arrowStyle = "N" : t.arrowStyle = null, !(t.imageTransform === 0 && t.index === 0)) {
        t.index = (t.index - 1 + r) % r;
        var i = t.index * t.imageItemWidth;
        t.imageTransform = i, t.imageTransformSize = -i, n("change", t.index, t.urlList[t.index]);
      }
    }
  };
}, bT = function(e) {
  var t = e.api, n = e.emit, r = e.state;
  return function() {
    if (r.urlList.length <= 1) {
      r.delete = !1;
      return;
    }
    r.delete = !0;
    var i = r.index, a = r.urlList;
    a.splice(i, 1), r.urlList = a, r.index = 0, t.getImageWidth(), n("newImageList", r.urlList, i);
  };
}, ST = function(e) {
  return function() {
    if (window.navigator.msSaveOrOpenBlob) {
      for (var t = atob(e.currentImg.split(",")[1]), n = t.length, r = new Uint8Array(n); n--; )
        r[n] = t.charCodeAt(n);
      var i = new Blob([r]);
      window.navigator.msSaveOrOpenBlob(i, "img.png");
    } else {
      var a = document.createElement("a");
      a.style = "dispaly:none", a.href = e.currentImg + "?response-content-type=application/octet-stream", a.setAttribute("download", "img"), a.setAttribute("target", "downloadFile"), document.body.appendChild(a), a.click(), document.body.removeChild(a);
    }
  };
}, wT = function(e) {
  var t = e.state, n = e.mode, r = e.api;
  return function(i) {
    t.firstX = i.targetTouches[0].clientX, n === "mobile-first" && (t.time = setTimeout(function() {
      t.isImagePreview ? t.boxVisibility = !0 : r.langClick();
    }, 1e3));
    var a = i.touches, s = a[0], l = a[1];
    Qs(i), t.pageX = s.pageX, t.pageY = s.pageY, t.moveable = !0, l && (t.pageX2 = l.pageX, t.pageY2 = l.pageY), t.originScale = t.scale || 1;
  };
}, Qs = function(e, t) {
  (typeof e.cancelable != "boolean" || e.cancelable) && e.preventDefault(), t && e.stopPropagation();
}, TT = function(e) {
  return function(t) {
    if (e.moveable) {
      Qs(t);
      var n = t.touches, r = n[0], i = n[1];
      if (i) {
        e.pageX2 || (e.pageX2 = i.pageX), e.pageY2 || (e.pageY2 = i.pageY);
        var a = function(c, d) {
          return Math.hypot(d.x - c.x, d.y - c.y);
        }, s = a({
          x: r.pageX,
          y: r.pageY
        }, {
          x: i.pageX,
          y: i.pageY
        }) / a({
          x: e.pageX,
          y: e.pageY
        }, {
          x: e.pageX2,
          y: e.pageY2
        }), l = e.originScale * s;
        l > 3 && (l = 3), e.scale = l, e.transform.scale = l;
      }
      clearTimeout(e.time);
    }
  };
}, CT = function(e) {
  return function(t) {
    var n = 0;
    e.endX = t.changedTouches[0].clientX, n = e.endX - e.firstX, e.boxVisibility || n === 0 && (e.isImagePreview = !1, e.hiddenThumbnail = !1), e.moveable = !1, e.pageX2 = 0, e.pageY2 = 0, clearTimeout(e.time);
  };
}, IT = function(e) {
  var t = e.constants, n = e.props;
  return function() {
    return n.zIndex === t.DEFAULT_POPPER_ZINDEX || n.zIndex < 1 ? Z.nextZIndex() : n.zIndex;
  };
}, kT = function(e) {
  return function(t) {
    e.index = t, e.currentIndex = t;
  };
}, ET = function(e) {
  return function(t) {
    e.index = t, e.mobileCurrentIndex && (e.isImagePreview = !0);
  };
}, DT = function(e) {
  var t = e.state, n = e.nextTick, r = e.api;
  return function() {
    t.isImagePreview = !1, t.hiddenThumbnail = !1, n(function() {
      r.getImageWidth();
    });
  };
}, BT = function(e) {
  var t = e.api, n = e.state;
  return function() {
    U(window, "resize", t.initPage), n._clearMouse && (n._clearMouse(), n._clearMouse = void 0), n._dragHandler && (n._dragHandler = void 0), n._removeDrag && (n._removeDrag = void 0);
  };
}, xT = function(e) {
  var t = e.state, n = e.vm, r = e.nextTick;
  return function(i) {
    switch (t.isThumbnail ? t.showFlag = 1 : t.isMenuView && (t.showFlag = 2), i) {
      case "1":
        t.isThumbnail = !1, t.isMenuView = !1;
        break;
      case "2":
        t.isThumbnail = !0, t.isMenuView = !1, r(function() {
          t.currentIndex = 0, t.index = 0, n.$refs.isThumbnailContent.scrollTop = 0;
        });
        break;
      case "3":
        t.isThumbnail = !1, t.isMenuView = !0, r(function() {
          t.currentIndex = 0, t.index = 0, n.$refs.isMenuViewContent.scrollTop = 0;
        });
        break;
      case "4":
        t.showFlag === 1 ? t.isThumbnail = !0 : t.showFlag === 2 && (t.isMenuView = !0);
        break;
    }
  };
}, PT = function(e) {
  var t = e.state, n = e.api;
  return function(r, i) {
    switch (i) {
      case 0:
        n.langClick();
        break;
      case 1:
        t.isThumbnail = !0, t.isImagePreview = !1;
        break;
      case 2:
        n.handleActions("delImage"), n.getImageWidth();
        break;
    }
  };
}, MT = function() {
  return function(e) {
    var t = /^data:image\/(png|jpg|jpeg|gif);base64,([a-zA-Z0-9+/]+={0,2})/;
    return t.test(e) ? e : Ae.filterUrl(e);
  };
}, OT = ["state", "zIndex", "touchstart", "touchmove", "touchend", "urlList", "hide", "prev", "next", "handleActions", "toggleMode", "handleImgLoad", "handleImgError", "handleMouseDown", "handleVisible", "swipeLeft", "swipeRight", "handleDelete", "activeItems", "imagePreview", "itemClick", "selectOption", "langClick"], LT = function(e) {
  var t = e.reactive, n = e.computed, r = e.api, i = e.mode, a = e.props, s = e.constants, l = e.inject, u = t({
    originScale: "",
    moveable: !1,
    pageX: "",
    pageY: "",
    pageY2: "",
    pageX2: "",
    mfPreviewVisible: l("mfPreviewVisible", null),
    scale: 1,
    time: null,
    index: i === "pc" || i === "mobile-first" ? 0 : a.startPosition,
    imageName: "",
    isShow: !1,
    infinite: !0,
    loading: !1,
    transform: {
      scale: 1,
      deg: 0,
      offsetX: 0,
      offsetY: 0,
      objfit: "contain",
      enableTransition: !1
    },
    urlList: a.urlList || Array.isArray(l("urlList")) && l("urlList").length !== 0 ? l("urlList") : null,
    mode: s.MODE.CONTAIN,
    previewVisible: a.previewVisible,
    fullScreen: a.imageFullCurrent,
    hammer: null,
    imageItemWidth: 0,
    imageAllWidth: 0,
    imageTransform: 0,
    imageTransformSize: 0,
    imageTransition: 300,
    imageList: null,
    arrowStyle: null,
    delete: !1,
    isLast: n(function() {
      return r.computedIsLast();
    }),
    isFirst: n(function() {
      return r.computedIsFirst();
    }),
    isSingle: n(function() {
      return r.computedIsSingle();
    }),
    imgStyle: n(function() {
      return r.computedImgStyle();
    }),
    currentImg: n(function() {
      return r.computedCurrentImg();
    }),
    zIndex: n(function() {
      return r.computeZIndex();
    }),
    currentIndex: 0,
    mobileCurrentIndex: -1,
    isImagePreview: !1,
    hiddenThumbnail: !1,
    firstX: 0,
    endX: 0,
    showImageViewer: !0,
    isThumbnail: a.isThumbnail,
    isMenuView: a.isMenuView,
    showFlag: 0,
    boxVisibility: !1,
    fileName: "",
    scrollTop: 0,
    thumbnailTop: s.THUMBNAILTOP,
    menuTop: s.MENUTOP,
    centerIndex: -1
  });
  return u;
}, NT = function(e) {
  var t = e.api, n = e.state, r = e.props, i = e.parent, a = e.nextTick, s = e.emit, l = e.t, u = e.constants, c = e.vm, d = e.mode;
  Object.assign(t, {
    state: n,
    touchstart: wT({
      state: n,
      mode: d,
      api: t
    }),
    touchmove: TT(n),
    touchend: CT(n),
    reset: nT(n),
    prev: rT({
      state: n,
      api: t,
      vm: c
    }),
    next: sT({
      state: n,
      api: t,
      vm: c
    }),
    getImageWidth: gT({
      state: n,
      parent: i,
      props: r,
      nextTick: a,
      vm: c,
      mode: d
    }),
    handleVisible: hT({
      state: n,
      emit: s,
      props: r
    }),
    handleActions: uT(n, r, s),
    handleImgLoad: _w(n),
    handleMouseDown: tT(n),
    computedIsFirst: dT(n),
    computedIsSingle: cT(r),
    handleImgError: eT({
      state: n,
      t: l
    }),
    computedIsLast: pT({
      state: n,
      props: r
    }),
    watchVisible: vT(n),
    deviceSupportUninstall: qw({
      state: n,
      mode: d
    }),
    computedCurrentImg: fT({
      state: n,
      api: t
    }),
    computedImgStyle: mT({
      state: n,
      constants: u
    }),
    computeZIndex: IT({
      constants: u,
      props: r
    }),
    hide: Zw({
      props: r,
      api: t,
      state: n
    }),
    deviceSupportInstall: Jw({
      state: n,
      api: t,
      mode: d
    }),
    toggleMode: oT({
      state: n,
      constants: u,
      api: t
    }),
    swipeRight: yT({
      api: t,
      state: n,
      emit: s
    }),
    swipeLeft: AT({
      api: t,
      state: n,
      emit: s
    }),
    handleDelete: bT({
      api: t,
      state: n,
      emit: s
    }),
    activeItems: kT(n),
    imagePreview: ET(n),
    initPage: DT({
      state: n,
      nextTick: a,
      api: t
    }),
    beforeDestroy: BT({
      api: t,
      state: n
    }),
    itemClick: xT({
      state: n,
      vm: c,
      nextTick: a
    }),
    selectOption: PT({
      state: n,
      api: t
    }),
    langClick: ST(n),
    getLastPrev: iT({
      state: n,
      vm: c
    }),
    getDefaultPrev: aT({
      state: n,
      vm: c
    }),
    getCenterPosition: lT({
      state: n,
      vm: c
    }),
    filterImageUrl: MT()
  });
}, FT = function(e) {
  var t = e.watch, n = e.state, r = e.api, i = e.props, a = e.nextTick, s = e.vm;
  t(function() {
    return n.index;
  }, function(l) {
    i.keepStyle || r.reset(), i.onSwitch(l);
  }, {
    immediate: !0
  }), t(function() {
    return i.previewVisible;
  }, function(l) {
    r.watchVisible(l), (i.previewVisible || n.mfPreviewVisible) && a(function() {
      r.getImageWidth();
    });
  }, {
    immediate: !0
  }), t(function() {
    return n.currentImg;
  }, function(l) {
    a(function() {
      var u = n.urlList.indexOf(l), c = s.$refs["img_".concat(u)];
      Array.isArray(c) && (c = c[0]), c && (n.loading = !c.complete);
    });
  }, {
    immediate: !0
  }), t(function() {
    return n.isImagePreview;
  }, function() {
    return a(function() {
      r.getImageWidth();
    });
  }), t(function() {
    return i.urlList;
  }, function() {
    n.urlList = i.urlList;
  }, {
    deep: !0
  });
}, RT = function(e, t, n) {
  var r = t.computed, i = t.onMounted, a = t.onBeforeUnmount, s = t.onUpdated, l = t.reactive, u = t.watch, c = t.inject, d = t.provide, p = n.t, f = n.parent, m = n.nextTick, h = n.emit, v = n.constants, g = n.vm, b = n.mode, y = {}, S = LT({
    reactive: l,
    computed: r,
    api: y,
    mode: b,
    props: e,
    constants: v,
    inject: c
  });
  return NT({
    api: y,
    state: S,
    props: e,
    parent: f,
    nextTick: m,
    emit: h,
    t: p,
    constants: v,
    vm: g,
    mode: b
  }), FT({
    watch: u,
    state: S,
    api: y,
    props: e,
    nextTick: m,
    vm: g
  }), i(y.deviceSupportInstall), s(function() {
    e.asyncClose && setTimeout(function() {
      S.previewVisible = !1, h("update:preview-visible", !1);
    }, 3e3);
  }), a(y.beforeDestroy), d("change-size", !0), y;
}, VT = /* @__PURE__ */ function() {
  function o(e, t, n) {
    xn(this, o);
    var r = this;
    r.element = e, r.tinyBinding = t, r.touchType = n, r.tinyVueTouches = {
      x: 0,
      y: 0
    }, r.tinyVueMoves = !0, r.tinyVueLeave = !0, r.tinyLongTouch = !0, r.tinyVueCallBack = Ee(t.value) ? t.value.fn : t.value, r.element.addEventListener("touchstart", function(i) {
      r.start(i);
    }), r.element.addEventListener("touchend", function(i) {
      r.end(i);
    }), r.element.addEventListener("touchmove", function(i) {
      r.move(i);
    });
  }
  return Pn(o, [{
    key: "start",
    value: function(t) {
      var n = this;
      t.touches >= 2 || (this.tinyVueMoves = !0, this.tinyVueLeave = !0, this.tinyLongTouch = !0, this.tinyVueTouches = {
        x: t.changedTouches[0].pageX,
        y: t.changedTouches[0].pageY
      }, this.time = setTimeout(function() {
        n.tinyVueLeave && n.tinyVueMoves && (n.touchType == "longtap" && n.tinyVueCallBack(n.tinyBinding.value, t), n.tinyLongTouch = !1);
      }, 1e3));
    }
  }, {
    key: "end",
    value: function(t) {
      if (!(t.touches >= 2)) {
        var n = t.changedTouches[0].pageX - this.tinyVueTouches.x, r = t.changedTouches[0].pageY - this.tinyVueTouches.y;
        clearTimeout(this.time), Math.abs(n) > 10 || Math.abs(r) > 100 ? (this.touchType == "swipe" && this.tinyVueCallBack(this.tinyBinding.value, t), Math.abs(n) > Math.abs(r) ? (n > 10 && this.touchType == "swiperight" && this.tinyVueCallBack(this.tinyBinding.value, t), n < -10 && this.touchType == "swipeleft" && this.tinyVueCallBack(this.tinyBinding.value, t)) : (r > 10 && this.touchType == "swipedown" && this.tinyVueCallBack(this.tinyBinding.value, t), r < -10 && this.touchType == "swipeup" && this.tinyVueCallBack(this.tinyBinding.value, t))) : this.tinyLongTouch && this.tinyVueMoves && (this.touchType == "tap" && this.tinyVueCallBack(this.tinyBinding.value, t), this.tinyVueLeave = !1);
      }
    }
  }, {
    key: "move",
    value: function() {
      this.tinyVueMoves = !1;
    }
  }]);
}(), UT = function() {
  var e = {}, t = ["tap", "swipe", "swipeleft", "swiperight", "swipedown", "swipeup", "longtap"];
  return t.forEach(function(n) {
    e[n] = mn({
      vTouch: {
        bind: function(i, a) {
          new VT(i, a, n);
        }
      }
    }).vTouch;
  }), e;
};
const HT = UT();
const $T = /* @__PURE__ */ B({
  props: [...Q, "urlList", "zIndex", "onSwitch", "onClose", "previewVisible", "closeShow", "arrowShow", "toolShow", "showIndex", "imageFullCurrent", "startPosition", "asyncClose", "deleteButton"],
  components: {
    IconClose: yt(),
    IconChevronLeft: Ca(),
    IconChevronRight: wa(),
    IconZoomOut: Ol(),
    IconZoomIn: Ll(),
    IconRepeat: Nl(),
    IconRefres: Fl(),
    IconDel: Rl()
  },
  directives: {
    ...HT
  },
  setup(o, e) {
    return z({
      props: o,
      context: e,
      renderless: RT,
      api: OT
    });
  }
}), zT = /* @__PURE__ */ T(
  "div",
  { class: "tiny-mobile-image-viewer__mask" },
  null,
  -1
  /* HOISTED */
), jT = {
  key: 1,
  class: "tiny-mobile-image-viewer__btn tiny-mobile-image-viewer__index"
}, WT = { class: "tiny-mobile-image-viewer__index--curren" }, GT = /* @__PURE__ */ T(
  "span",
  null,
  "/",
  -1
  /* HOISTED */
), YT = { class: "tiny-mobile-image-viewer__index--total" }, KT = {
  key: 3,
  class: "tiny-mobile-image-viewer__btn tiny-mobile-image-viewer__actions"
}, QT = { class: "tiny-mobile-image-viewer__actions-inner" }, XT = { class: "tiny-mobile-image-viewer__canvas" }, ZT = {
  class: "tiny-mobile-image-viewer__detail",
  style: { "transition-duration": "0.3s" }
}, JT = ["src"];
function qT(o, e, t, n, r, i) {
  const a = $("icon-close"), s = $("icon-chevron-left"), l = $("icon-chevron-right"), u = $("icon-zoom-out"), c = $("icon-zoom-in"), d = $("icon-repeat"), p = $("icon-refres"), f = $("icon-del"), m = sn("swipeleft"), h = sn("swiperight");
  return A(), G($e, {
    name: "viewer-fade",
    persisted: ""
  }, {
    default: ee(() => [
      oe((A(), w(
        "div",
        {
          class: "tiny-mobile-image-viewer__wrapper",
          ref: "imagePreview",
          style: H({ "z-index": o.zIndex }),
          onClick: e[14] || (e[14] = (...v) => o.handleVisible && o.handleVisible(...v))
        },
        [
          zT,
          o.closeShow ? (A(), w("span", {
            key: 0,
            class: "tiny-mobile-image-viewer__btn tiny-mobile-image-viewer__close",
            onClick: e[0] || (e[0] = te((...v) => o.handleVisible && o.handleVisible(...v), ["stop"]))
          }, [
            D(a, { class: "tiny-svg-size" })
          ])) : x("v-if", !0),
          o.showIndex ? (A(), w("div", jT, [
            F(o.$slots, "index", {
              value: o.state.index + 1
            }, () => [
              T(
                "span",
                WT,
                M(o.state.index + 1),
                1
                /* TEXT */
              ),
              GT,
              T(
                "span",
                YT,
                M(o.urlList.length),
                1
                /* TEXT */
              )
            ])
          ])) : x("v-if", !0),
          !o.state.isSingle && o.arrowShow ? (A(), w(
            q,
            { key: 2 },
            [
              T(
                "span",
                {
                  class: P(["tiny-mobile-image-viewer__btn tiny-mobile-image-viewer__prev", {
                    "is-disabled": !o.state.infinite && o.state.isFirst,
                    "is-arrow-disabled": o.state.arrowStyle === "N"
                  }]),
                  onClick: e[1] || (e[1] = te((...v) => o.swipeRight && o.swipeRight(...v), ["stop"]))
                },
                [
                  D(s, { class: "tiny-svg-size" })
                ],
                2
                /* CLASS */
              ),
              T(
                "span",
                {
                  class: P(["tiny-mobile-image-viewer__btn tiny-mobile-image-viewer__next", {
                    "is-disabled": !o.state.infinite && o.state.isLast,
                    "is-arrow-disabled": o.state.arrowStyle === "Y"
                  }]),
                  onClick: e[2] || (e[2] = te((...v) => o.swipeLeft && o.swipeLeft(...v), ["stop"]))
                },
                [
                  D(l, { class: "tiny-svg-size" })
                ],
                2
                /* CLASS */
              )
            ],
            64
            /* STABLE_FRAGMENT */
          )) : x("v-if", !0),
          o.toolShow ? (A(), w("div", KT, [
            T("div", QT, [
              F(o.$slots, "tool", {}, () => [
                D(u, {
                  class: "tiny-svg-size",
                  onClick: e[3] || (e[3] = te((v) => o.handleActions("zoomOut"), ["stop"]))
                }),
                D(c, {
                  class: "tiny-svg-size",
                  onClick: e[4] || (e[4] = te((v) => o.handleActions("zoomIn"), ["stop"]))
                }),
                D(d, {
                  class: "tiny-svg-size",
                  onClick: e[5] || (e[5] = te((v) => o.handleActions("anticlocelise"), ["stop"]))
                }),
                D(p, {
                  class: "tiny-svg-size",
                  onClick: e[6] || (e[6] = te((v) => o.handleActions("clocelise"), ["stop"]))
                }),
                o.deleteButton ? (A(), G(f, {
                  key: 0,
                  class: "tiny-svg-size",
                  onClick: e[7] || (e[7] = te((v) => o.handleDelete(), ["stop"]))
                })) : x("v-if", !0)
              ])
            ])
          ])) : x("v-if", !0),
          T("div", XT, [
            T(
              "div",
              {
                class: "tiny-mobile-image-viewer__wrap",
                style: H({
                  width: `${o.state.iamgeAllWidth}px`,
                  "transition-duration": `${o.state.imageTransition}ms`,
                  transform: "translateX(" + o.state.imageTransformSize + "px)"
                })
              },
              [
                (A(!0), w(
                  q,
                  null,
                  ae(o.state.urlList, (v, g) => (A(), w(
                    "div",
                    {
                      class: "tiny-mobile-image-viewer__item",
                      key: g,
                      style: H(Object.assign({ width: `${o.state.imageItemWidth}px` }, g === o.state.index ? o.state.imgStyle : ""))
                    },
                    [
                      T("div", ZT, [
                        (A(), w("img", {
                          ref_for: !0,
                          ref: `img_${g}`,
                          class: P(["tiny-mobile-image-viewer__img", { "is-full-screen": o.state.fullScreen }]),
                          key: v,
                          src: v,
                          onLoad: e[8] || (e[8] = (...b) => o.handleImgLoad && o.handleImgLoad(...b)),
                          onError: e[9] || (e[9] = (...b) => o.handleImgError && o.handleImgError(...b)),
                          onMousedown: e[10] || (e[10] = (...b) => o.handleMouseDown && o.handleMouseDown(...b)),
                          onTouchstart: e[11] || (e[11] = (...b) => o.touchstart && o.touchstart(...b)),
                          onTouchmove: e[12] || (e[12] = (...b) => o.touchmove && o.touchmove(...b)),
                          onTouchend: e[13] || (e[13] = (...b) => o.touchend && o.touchend(...b))
                        }, null, 42, JT))
                      ])
                    ],
                    4
                    /* STYLE */
                  ))),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ],
              4
              /* STYLE */
            )
          ])
        ],
        4
        /* STYLE */
      )), [
        [he, o.state.previewVisible],
        [m, o.swipeLeft],
        [h, o.swipeRight]
      ])
    ]),
    _: 3
    /* FORWARDED */
  });
}
const Jn = /* @__PURE__ */ W($T, [["render", qT]]);
var _T = function(e) {
  var t, n = (typeof process > "u" ? "undefined" : R(process)) === "object" ? (t = process.env) === null || t === void 0 ? void 0 : t.TINY_MODE : null;
  return Jn;
}, Ji = {
  MODE: {
    CONTAIN: {
      name: "contain",
      icon: "icon-fullscreen"
    },
    ORIGINAL: {
      name: "original",
      icon: "icon-minscreen"
    }
  },
  DEFAULT_POPPER_ZINDEX: Number.POSITIVE_INFINITY,
  THUMBNAILTOP: 8,
  MENUTOP: 10
};
const nt = B({
  name: O + "ImageViewer",
  props: C(C({}, j), {}, {
    _constants: {
      type: Object,
      default: function() {
        return Ji;
      }
    },
    urlList: {
      type: Array,
      default: function() {
        return [];
      }
    },
    zIndex: {
      type: Number,
      default: Ji.DEFAULT_POPPER_ZINDEX
    },
    previewVisible: {
      type: Boolean,
      default: !1
    },
    closeShow: {
      type: Boolean,
      default: !1
    },
    arrowShow: {
      type: Boolean,
      default: !1
    },
    toolShow: {
      type: Boolean,
      default: !1
    },
    showIndex: {
      type: Boolean,
      default: !1
    },
    imageFullCurrent: {
      type: Boolean,
      default: !1
    },
    startPosition: {
      type: Number,
      default: 0
    },
    asyncClose: {
      type: Boolean,
      default: !1
    },
    deleteButton: {
      type: Boolean,
      default: !1
    },
    onSwitch: {
      type: Function,
      default: function() {
      }
    },
    onClose: {
      type: Function,
      default: function() {
      }
    },
    isThumbnail: {
      type: Boolean,
      default: !1
    },
    isMenuView: {
      type: Boolean,
      default: !1
    },
    modalView: {
      type: Boolean,
      default: !1
    },
    modalHeight: {
      type: [String, Number],
      default: 400
    },
    bgColor: {
      type: String,
      default: "bg-color-icon-primary"
    },
    keepStyle: {
      type: Boolean,
      default: !1
    }
  }),
  setup: function(e, t) {
    return K({
      props: e,
      context: t,
      template: _T
    });
  }
}), eC = "3.20.0";
nt.install = function(o) {
  o.component(nt.name, nt);
};
nt.version = eC;
var xo = "is__drag", Xs = function(e) {
  var t = e.params, n = e.parent, r = e.emit, i = e.event, a = n.$listeners, s = n.events, l = s === void 0 ? {} : s;
  a.zoom ? r("zoom", t, i) : l.zoom && l.zoom.call(n, t, i);
}, fn = [], tC = function() {
  return function(e) {
    return e.type === "message";
  };
}, nC = function(e) {
  var t = e.props, n = e.isMobileFirstMode;
  return function() {
    if (n)
      return {};
    var r = "", i = "";
    return t.width && (r = isNaN(t.width) ? t.width : "".concat(t.width, "px")), t.height && (i = isNaN(t.height) ? t.height : "".concat(t.height, "px")), {
      width: r,
      height: i
    };
  };
}, oC = function(e) {
  return function(t) {
    return t ? e.open() : e.close("hide");
  };
}, rC = function(e) {
  var t = e.api, n = e.props;
  return function(r) {
    n.lockScroll && (r ? t.showScrollbar() : t.hideScrollbar());
  };
}, iC = function(e) {
  var t = e.api, n = e.props, r = e.state;
  return function() {
    n.modelValue && t.open(), r.modalZindex = n.zIndex || Z.nextZIndex();
  };
}, aC = function(e) {
  var t = e.api, n = e.parent, r = e.props, i = e.isMobileFirstMode, a = e.state;
  return function() {
    if (i)
      N(window, "resize", t.resetDragStyle);
    else {
      var s = t.getBox();
      Object.assign(s.style, {
        width: r.width ? isNaN(r.width) ? r.width : "".concat(r.width, "px") : null,
        height: r.height ? isNaN(r.height) ? r.height : "".concat(r.height, "px") : null
      }), r.lockScroll && a.visible && t.showScrollbar();
    }
    r.escClosable && N(document, "keydown", t.handleGlobalKeydownEvent), N(window, "hashchange", t.handleHashChange), document.body.appendChild(n.$el);
  };
}, sC = function(e) {
  var t = e.api, n = e.parent, r = e.isMobileFirstMode;
  return function() {
    r && U(window, "resize", t.resetDragStyle), U(document, "keydown", t.handleGlobalKeydownEvent), U(window, "hashchange", t.handleHashChange), U(window, "resize", t.resetModalViewPosition), t.removeMsgQueue(), t.hideScrollbar(), n.$el.parentNode && n.$el.parentNode.removeChild(n.$el);
  };
}, lC = function(e) {
  var t = e.api, n = e.parent, r = e.props;
  return function(i) {
    r.maskClosable && i.target === n.$el && t.close("mask");
  };
}, uC = function(e) {
  return function() {
    clearTimeout(e.timer);
  };
}, cC = function(e) {
  var t = e.api, n = e.props, r = e.state;
  return function() {
    t.addMsgQueue(), r.timer = window.setTimeout(function() {
      t.close("close");
    }, parseFloat(n.duration));
  };
}, dC = function(e) {
  var t = e.state, n = e.props;
  return function() {
    t.modalZindex = n.zIndex || Z.nextZIndex();
  };
}, pC = function(e) {
  var t = e.api, n = e.emit, r = e.parent, i = e.props, a = e.isMobileFirstMode;
  return function(s, l, u) {
    if (!(~["close", "confirm", "cancel"].indexOf(s) && typeof i.beforeClose == "function" && i.beforeClose(s) === !1)) {
      var c = r.events, d = c === void 0 ? {} : c, p = {
        type: s,
        $modal: r
      };
      a && s === "confirm" && (p.options = u), n(s, p, l), d[s] && d[s].call(r, p), t.close(s);
    }
  };
}, fC = function(e) {
  return function(t) {
    e.handleEvent("close", t);
  };
}, mC = function(e) {
  var t = e.api, n = e.state;
  return function(r) {
    t.handleEvent("confirm", r, n.options);
  };
}, vC = function(e) {
  return function(t) {
    e.handleEvent("cancel", t);
  };
}, hC = function(e) {
  var t = e.api, n = e.emit, r = e.nextTick, i = e.parent, a = e.props, s = e.state, l = e.isMobileFirstMode;
  return function() {
    var u = i.$listeners, c = i.events, d = c === void 0 ? {} : c;
    if (!s.visible) {
      var p = {
        type: "show",
        $modal: i
      };
      s.visible = !0, s.contentVisible = !1, t.updateZindex(), d.show || (n("update:modelValue", !0), n("show", p)), setTimeout(function() {
        s.contentVisible = !0, !u.show && d.show && r(function() {
          d.show.call(i, p);
        });
      }, 10), s.isMsg ? (t.addMsgQueue(), s.timer = window.setTimeout(function() {
        t.close(p.type);
      }, parseFloat(a.duration))) : r(function() {
        if (!l) {
          var f = t.getBox(), m = bs(), h = m.document.documentElement.clientWidth || m.document.body.clientWidth, v = m.document.documentElement.clientHeight || m.document.body.clientHeight, g = isNaN(a.width) ? a.width : "".concat(a.width, "px");
          g ? f.style.left = "calc((100vw - " + g + ") / 2)" : f.style.left = "".concat(h / 2 - f.offsetWidth / 2, "px"), f.offsetHeight + f.offsetTop + a.marginSize > v && (f.style.top = "".concat(a.marginSize, "px")), N(window, "resize", t.resetModalViewPosition);
        }
        a.fullscreen ? r(t.maximize) : t.revert();
      });
    }
  };
}, gC = function(e) {
  var t = e.api, n = e.parent;
  return function() {
    ~fn.indexOf(n) || fn.push(n), t.updateStyle();
  };
}, AC = function(e) {
  var t = e.api, n = e.parent;
  return function() {
    var r = fn.indexOf(n);
    ~r && fn.splice(r, 1), t.updateStyle();
  };
}, yC = function(e) {
  var t = e.nextTick, n = e.props;
  return function() {
    t(function() {
      var r = 0, i = n.top;
      fn.forEach(function(a) {
        r += parseFloat(i), a.state.modalTop = r;
        var s = a.$refs.modalBox;
        r += s.clientHeight, i = 15;
      });
    });
  };
}, bC = function(e) {
  var t = e.emit, n = e.parent, r = e.props, i = e.state;
  return function(a) {
    if (!(!~["close", "confirm", "cancel"].indexOf(a) && typeof r.beforeClose == "function" && r.beforeClose(a) === !1)) {
      var s = n.events, l = s === void 0 ? {} : s;
      i.emitter.emit("boxclose", r.isFormReset), i.visible && (i.contentVisible = !1, setTimeout(function() {
        i.visible = !1;
        var u = {
          type: a,
          $modal: n
        };
        t("close", u), l.hide ? l.hide.call(n, u) : (t("update:modelValue", !1), t("hide", u));
      }, 200));
    }
  };
}, SC = function(e) {
  return function(t) {
    t.keyCode === ie.Escape && e.close("esc");
  };
}, wC = function(e) {
  return function() {
    e.close("hide");
  };
}, TC = function(e) {
  var t = e.vm;
  return function() {
    return t.$refs.modalBox;
  };
}, CC = function(e) {
  var t = e.api, n = e.nextTick, r = e.props, i = e.state, a = e.isMobileFirstMode;
  return function() {
    return n().then(function() {
      if (!i.zoomLocat) {
        var s = r.marginSize, l = t.getBox(), u = Vo(), c = u.visibleHeight, d = u.visibleWidth;
        i.zoomLocat = {
          top: l.offsetTop,
          left: l.offsetLeft,
          width: l.clientWidth,
          height: l.clientHeight
        }, a || Object.assign(l.style, {
          width: "".concat(d - s * 2, "px"),
          height: "".concat(c - s * 2, "px"),
          top: "".concat(s, "px"),
          left: "".concat(s, "px")
        }), i.emitter.emit("boxdrag");
      }
    });
  };
}, IC = function(e) {
  var t = e.api, n = e.nextTick, r = e.state, i = e.isMobileFirstMode;
  return function() {
    return n().then(function() {
      var a = r.zoomLocat;
      if (a) {
        var s = t.getBox();
        r.zoomLocat = null, i || Object.assign(s.style, {
          width: "".concat(a.width, "px"),
          height: "".concat(a.height, "px"),
          top: "".concat(a.top, "px"),
          left: "".concat(a.left, "px")
        }), r.emitter.emit("boxdrag");
      }
    });
  };
}, kC = function(e) {
  var t = e.api, n = e.emit, r = e.parent, i = e.state, a = e.isMobileFirstMode;
  return function(s) {
    var l = {
      type: i.zoomLocat ? "min" : "max",
      $modal: r
    }, u = i.zoomLocat ? t.revert : t.maximize;
    return a && t.resetDragStyle(), u().then(function() {
      Xs({
        params: l,
        parent: r,
        emit: n,
        event: s
      });
    });
  };
};
function EC(o, e, t) {
  for (var n, r = o.target; r && r.nodeType && r !== document; ) {
    if (t && We(r, t))
      n = r;
    else if (r === e)
      return {
        flag: t ? !!n : !0,
        container: e,
        targetElem: n
      };
    r = r.parentNode;
  }
  return {
    flag: !1
  };
}
var DC = function(e) {
  var t = e.api, n = e.nextTick, r = e.props, i = e.state, a = e.emit, s = e.isMobileFirstMode;
  return function(l) {
    var u = t.getBox();
    if (!i.zoomLocat && l.button === 0 && !EC(l, u, "trigger__btn").flag) {
      l.preventDefault();
      var c = document.onmousemove, d = document.onmouseup, p = l.clientX - u.offsetLeft, f = l.clientY - u.offsetTop, m = Vo(), h = m.visibleHeight, v = m.visibleWidth;
      document.onmousemove = function(g) {
        g.preventDefault(), i.emitter.emit("boxdrag");
        var b = u.offsetWidth, y = u.offsetHeight, S = g.clientX - p, I = g.clientY - f, k, E, L, V;
        s ? (k = b / 2 + r.marginSize, E = v - b / 2 - r.marginSize, L = y / 2 + r.marginSize, V = h - y / 2 - r.marginSize) : (k = r.marginSize, E = v - b - r.marginSize, L = r.marginSize, V = h - y - r.marginSize), S < k && (S = k), S > E && (S = E), I < L && (I = L), I > V && (I = V), u.style.left = "".concat(S, "px"), u.style.top = "".concat(I, "px"), ve(u, xo), a("custom-mousemove", g);
      }, document.onmouseup = function(g) {
        document.onmousemove = c, document.onmouseup = d, n(function() {
          ge(u, xo);
        }), a("custom-mouseup", g);
      }, a("custom-mousedown", l);
    }
  };
}, BC = function(e) {
  var t = e.width, n = e.offsetWidth, r = e.x, i = e.minWidth, a = e.temp, s = e.offsetLeft, l = e.marginSize, u = e.left;
  return t = n - r, t = t < i ? i : t, a = s + n - l, t = t > a ? a : t, u = s + n - t, {
    width: t,
    left: u
  };
}, xC = function(e) {
  var t = e.height, n = e.offsetHeight, r = e.y, i = e.minHeight, a = e.temp, s = e.offsetTop, l = e.marginSize, u = e.top;
  return t = n - r, t = t < i ? i : t, a = s + n - l, t = t > a ? a : t, u = s + n - t, {
    height: t,
    top: u
  };
}, PC = function(e) {
  var t = e.width, n = e.offsetWidth, r = e.x, i = e.minWidth, a = e.temp, s = e.visibleWidth, l = e.offsetLeft, u = e.marginSize;
  return t = n + r, t = t < i ? i : t, a = s - l - u, t = t > a ? a : t, {
    width: t
  };
}, MC = function(e) {
  var t = e.height, n = e.offsetHeight, r = e.y, i = e.minHeight, a = e.temp, s = e.visibleHeight, l = e.offsetTop, u = e.marginSize;
  return t = n + r, t = t < i ? i : t, a = s - l - u, t = t > a ? a : t, {
    height: t
  };
}, $o = function(e) {
  var t = e.ret, n = t.width, r = t.left, i = t.height, a = t.top, s = e.modalBoxElem;
  n && (s.style.width = "".concat(n, "px")), r && (s.style.left = "".concat(r, "px")), i && (s.style.height = "".concat(i, "px")), a && (s.style.top = "".concat(a, "px"));
}, rr = function(e) {
  var t = e.width, n = e.offsetWidth, r = e.x, i = e.minWidth, a = e.temp, s = e.offsetLeft, l = e.marginSize, u = e.left, c = e.modalBoxElem;
  $o({
    ret: BC({
      width: t,
      offsetWidth: n,
      x: r,
      minWidth: i,
      temp: a,
      offsetLeft: s,
      marginSize: l,
      left: u
    }),
    modalBoxElem: c
  });
}, ir = function(e) {
  var t = e.width, n = e.offsetWidth, r = e.x, i = e.minWidth, a = e.temp, s = e.visibleWidth, l = e.offsetLeft, u = e.marginSize, c = e.modalBoxElem;
  $o({
    ret: PC({
      width: t,
      offsetWidth: n,
      x: r,
      minWidth: i,
      temp: a,
      visibleWidth: s,
      offsetLeft: l,
      marginSize: u
    }),
    modalBoxElem: c
  });
}, ar = function(e) {
  var t = e.height, n = e.offsetHeight, r = e.y, i = e.minHeight, a = e.temp, s = e.offsetTop, l = e.marginSize, u = e.top, c = e.modalBoxElem;
  $o({
    ret: xC({
      height: t,
      offsetHeight: n,
      y: r,
      minHeight: i,
      temp: a,
      offsetTop: s,
      marginSize: l,
      top: u
    }),
    modalBoxElem: c
  });
}, sr = function(e) {
  var t = e.height, n = e.offsetHeight, r = e.y, i = e.minHeight, a = e.temp, s = e.visibleHeight, l = e.offsetTop, u = e.marginSize, c = e.modalBoxElem;
  $o({
    ret: MC({
      height: t,
      offsetHeight: n,
      y: r,
      minHeight: i,
      temp: a,
      visibleHeight: s,
      offsetTop: l,
      marginSize: u
    }),
    modalBoxElem: c
  });
}, OC = function(e) {
  var t = e.params, n = e.delta, r = n.x, i = n.y, a = t.visibleHeight, s = t.visibleWidth, l = t.modalBoxElem, u = t.type, c = t.props, d = l.offsetWidth, p = l.offsetHeight, f = l.offsetLeft, m = l.offsetTop, h = c.minWidth, v = c.minHeight, g = c.marginSize, b = 0, y = 0, S = 0, I = 0, k = 0;
  switch (u) {
    case "wl":
      rr({
        offsetWidth: d,
        width: b,
        minWidth: h,
        x: r,
        offsetLeft: f,
        temp: S,
        marginSize: g,
        left: y,
        modalBoxElem: l
      });
      break;
    case "wr":
      ir({
        width: b,
        offsetWidth: d,
        x: r,
        minWidth: h,
        temp: S,
        visibleWidth: s,
        offsetLeft: f,
        marginSize: g,
        modalBoxElem: l
      });
      break;
    case "st":
      ar({
        height: I,
        offsetHeight: p,
        y: i,
        minHeight: v,
        temp: S,
        offsetTop: m,
        marginSize: g,
        top: k,
        modalBoxElem: l
      });
      break;
    case "sb":
      sr({
        height: I,
        offsetHeight: p,
        y: i,
        minHeight: v,
        temp: S,
        visibleHeight: a,
        offsetTop: m,
        marginSize: g,
        modalBoxElem: l
      });
      break;
    case "swst":
      rr({
        width: b,
        offsetWidth: d,
        x: r,
        minWidth: h,
        temp: S,
        offsetLeft: f,
        marginSize: g,
        left: y,
        modalBoxElem: l
      }), ar({
        height: I,
        offsetHeight: p,
        y: i,
        minHeight: v,
        temp: S,
        offsetTop: m,
        marginSize: g,
        top: k,
        modalBoxElem: l
      });
      break;
    case "sest":
      ir({
        offsetWidth: d,
        width: b,
        x: r,
        temp: S,
        minWidth: h,
        marginSize: g,
        visibleWidth: s,
        offsetLeft: f,
        modalBoxElem: l
      }), ar({
        height: I,
        offsetHeight: p,
        y: i,
        minHeight: v,
        temp: S,
        offsetTop: m,
        marginSize: g,
        top: k,
        modalBoxElem: l
      });
      break;
    case "swlb":
      rr({
        width: b,
        offsetWidth: d,
        minWidth: h,
        x: r,
        temp: S,
        marginSize: g,
        offsetLeft: f,
        modalBoxElem: l,
        left: y
      }), sr({
        height: I,
        offsetHeight: p,
        y: i,
        minHeight: v,
        temp: S,
        visibleHeight: a,
        offsetTop: m,
        marginSize: g,
        modalBoxElem: l
      });
      break;
    case "selb":
      ir({
        width: b,
        offsetWidth: d,
        minWidth: h,
        x: r,
        visibleWidth: s,
        offsetLeft: f,
        marginSize: g,
        temp: S,
        modalBoxElem: l
      }), sr({
        height: I,
        offsetHeight: p,
        y: i,
        minHeight: v,
        temp: S,
        visibleHeight: a,
        offsetTop: m,
        marginSize: g,
        modalBoxElem: l
      });
      break;
  }
}, LC = function(e) {
  var t = e.event, n = e.delta, r = e.state;
  r.prevEvent && (n.x += t.screenX - r.prevEvent.screenX, n.y += t.screenY - r.prevEvent.screenY), r.prevEvent = t;
};
function Zs(o, e) {
  var t = o.$children;
  t && t.length === 0 || t.forEach(function(n) {
    var r = n.$options.componentName;
    /^Form$/.test(r) && e.push(n), Zs(n, e);
  });
}
function NC(o) {
  var e = [];
  return Zs(o, e), e;
}
var FC = function(e) {
  var t = NC(e);
  t.length > 0 && t.forEach(function(n) {
    n.updateTip();
  });
}, RC = function(e) {
  var t = e.api, n = e.emit, r = e.parent, i = e.props, a = e.state;
  return function(s) {
    var l;
    s.preventDefault();
    var u = {
      x: 0,
      y: 0
    }, c = Vo(), d = c.visibleHeight, p = c.visibleWidth, f = t.getBox(), m = document.onmousemove, h = document.onmouseup, v = {
      props: i,
      offsetTop: f.offsetTop,
      offsetLeft: f.offsetLeft,
      visibleWidth: p,
      modalBoxElem: f,
      visibleHeight: d,
      disX: s.clientX,
      disY: s.clientY,
      type: (l = s.target) === null || l === void 0 ? void 0 : l.dataset.type
    };
    document.onmousemove = function(g) {
      FC(r), LC({
        event: g,
        delta: u,
        state: a
      }), OC({
        params: v,
        delta: u
      }), u.x = u.y = 0, ve(f, xo), Xs({
        params: {
          type: "resize",
          $modal: r
        },
        parent: r,
        emit: n,
        event: g
      });
    }, document.onmouseup = function() {
      a.zoomLocat = null, document.onmousemove = m, document.onmouseup = h, setTimeout(function() {
        ge(f, xo), a.prevEvent = null;
      }, 50);
    };
  };
}, VC = function(e) {
  return function() {
    var t = e.getBox();
    t.style.left = "", t.style.top = "";
  };
}, UC = function(e) {
  return function() {
    ve(document.body, e);
  };
}, HC = function(e) {
  return function() {
    ge(document.body, e);
  };
}, $C = function(e) {
  return function() {
    var t = e.getBox(), n = bs(), r = n.document.documentElement.clientWidth || n.document.body.clientWidth;
    t.style.left = "".concat(r / 2 - t.offsetWidth / 2, "px");
  };
}, zC = ["state", "dragEvent", "mousedownEvent", "toggleZoomEvent", "revert", "maximize", "getBox", "close", "updateStyle", "selfClickEvent", "mouseEnterEvent", "mouseLeaveEvent", "updateZindex", "closeEvent", "confirmEvent", "cancelEvent", "open", "beforeUnmouted", "resetDragStyle", "resetModalViewPosition"], jC = function(e, t, n, r) {
  var i = t.computed, a = t.onMounted, s = t.onBeforeUnmount, l = t.reactive, u = t.watch, c = n.vm, d = n.emit, p = n.emitter, f = n.nextTick, m = n.broadcast, h = n.vm, v = n.constants, g = n.mode, b = r.isMobileFirstMode, y = {}, S = v.SCROLL_LOCK_CLASS(g), I = l({
    emitter: p(),
    visible: !1,
    contentVisible: !1,
    cumsumZindex: 0,
    modalTop: 0,
    modalZindex: 0,
    zoomLocat: null,
    isMsg: i(function() {
      return y.computedIsMsg(e);
    }),
    prevEvent: null,
    options: [],
    theme: e.tiny_theme,
    boxStyle: i(function() {
      return y.computedBoxStyle();
    }),
    timer: 0
  });
  return Object.assign(y, {
    state: I,
    broadcast: m,
    computedIsMsg: tC(),
    updateStyle: yC({
      nextTick: f,
      props: e
    }),
    getBox: TC({
      vm: c
    }),
    watchValue: oC(y),
    created: iC({
      api: y,
      props: e,
      state: I
    }),
    mounted: aC({
      api: y,
      parent: h,
      props: e,
      isMobileFirstMode: b,
      state: I
    }),
    beforeUnmouted: sC({
      api: y,
      parent: h,
      isMobileFirstMode: b
    }),
    selfClickEvent: lC({
      api: y,
      parent: h,
      props: e
    }),
    mouseEnterEvent: uC(I),
    mouseLeaveEvent: cC({
      api: y,
      props: e,
      state: I
    }),
    updateZindex: dC({
      state: I,
      props: e
    }),
    handleEvent: pC({
      api: y,
      emit: d,
      parent: h,
      props: e,
      isMobileFirstMode: b
    }),
    closeEvent: fC(y),
    confirmEvent: mC({
      api: y,
      state: I
    }),
    cancelEvent: vC(y),
    open: hC({
      api: y,
      emit: d,
      nextTick: f,
      parent: h,
      props: e,
      state: I,
      isMobileFirstMode: b
    }),
    addMsgQueue: gC({
      api: y,
      parent: h
    }),
    removeMsgQueue: AC({
      api: y,
      parent: h
    }),
    close: bC({
      emit: d,
      parent: h,
      props: e,
      state: I
    }),
    handleGlobalKeydownEvent: SC(y),
    handleHashChange: wC(y),
    maximize: CC({
      api: y,
      nextTick: f,
      props: e,
      state: I,
      isMobileFirstMode: b
    }),
    revert: IC({
      api: y,
      nextTick: f,
      state: I,
      isMobileFirstMode: b
    }),
    toggleZoomEvent: kC({
      api: y,
      emit: d,
      parent: h,
      state: I,
      isMobileFirstMode: b
    }),
    mousedownEvent: DC({
      api: y,
      nextTick: f,
      props: e,
      state: I,
      emit: d,
      isMobileFirstMode: b
    }),
    dragEvent: RC({
      api: y,
      emit: d,
      parent: h,
      props: e,
      state: I
    }),
    resetDragStyle: VC(y),
    resetModalViewPosition: $C(y),
    computedBoxStyle: nC({
      props: e,
      isMobileFirstMode: b
    }),
    watchVisible: rC({
      api: y,
      props: e
    }),
    hideScrollbar: HC(S),
    showScrollbar: UC(S)
  }), u(function() {
    return e.modelValue;
  }, y.watchValue), u(function() {
    return I.visible;
  }, y.watchVisible), y.created(), a(y.mounted), s(y.beforeUnmouted), y;
};
const qn = /* @__PURE__ */ B({
  props: [...Q, "_constants", "animat", "beforeClose", "duration", "escClosable", "events", "fullscreen", "height", "id", "isFormReset", "lockScroll", "lockView", "marginSize", "mask", "maskClosable", "message", "minHeight", "minWidth", "modelValue", "resize", "showFooter", "showHeader", "title", "top", "type", "vSize", "width", "zIndex"],
  provide() {
    return {
      dialog: this
    };
  },
  setup(o, e) {
    return z({
      props: o,
      context: e,
      renderless: jC,
      api: zC
    });
  },
  render() {
    let {
      state: o,
      scopedSlots: e,
      vSize: t,
      type: n,
      resize: r,
      animat: i,
      showHeader: a
    } = this, {
      showFooter: s,
      title: l,
      message: u,
      lockScroll: c,
      lockView: d,
      mask: p,
      t: f
    } = this, {
      zoomLocat: m,
      visible: h,
      contentVisible: v,
      modalTop: g,
      isMsg: b
    } = o, y = e.default, S = e.footer;
    return J("div", {
      class: ["tiny-mobile-modal", "tiny-mobile-modal__wrapper", `type__${n}`, {
        [`size__${t}`]: t,
        is__animat: i,
        lock__scroll: c,
        lock__view: d,
        is__mask: p,
        is__maximize: m,
        is__visible: v,
        active: h
      }],
      style: {
        zIndex: this.state.modalZindex,
        top: g ? `${g}px` : null
      },
      on: {
        click: this.selfClickEvent
      }
    }, [J("div", {
      class: "tiny-mobile-modal__box",
      ref: "modalBox"
    }, [a ? J("div", {
      class: "tiny-mobile-modal__header",
      on: {
        mousedown: this.mousedownEvent
      }
    }, [l !== "" ? J("span", {
      class: "tiny-mobile-modal__title"
    }, l || f("ui.alert.title")) : null, r ? J(m ? Vl() : Ul(), {
      class: ["tiny-mobile-modal__zoom-btn", "trigger__btn"],
      on: {
        click: this.toggleZoomEvent
      }
    }) : null]) : null, J("div", {
      class: "tiny-mobile-modal__body"
    }, [b ? J("div", {
      class: "tiny-mobile-modal__status-wrapper"
    }) : null, J("div", {
      class: "tiny-mobile-modal__content"
    }, y ? y.call(this, {
      $modal: this
    }, J) : [J("div", {
      class: "tiny-mobile-modal__text"
    }, typeof u == "function" ? u.call(this, J) : u)])]), s ? J("div", {
      class: "tiny-mobile-modal__footer"
    }, S ? S.call(this, {
      $modal: this,
      beforeClose: this.beforeClose
    }, J) : [n === "confirm" ? J(ye, {
      props: {
        class: ["tiny-mobile-button", "tiny-mobile-button--default"]
      },
      on: {
        click: this.cancelEvent
      }
    }, f("ui.button.cancel")) : null, J(ye, {
      props: {
        type: "primary",
        class: ["tiny-mobile-button", n !== "confirm" ? "tiny-mobile-button__single" : ""]
      },
      on: {
        click: this.confirmEvent
      }
    }, f("ui.button.confirm"))]) : null, !b && r ? J("span", {
      class: "tiny-mobile-modal__resize"
    }, ["wl", "wr", "swst", "sest", "st", "swlb", "selb", "sb"].map((I) => J("span", {
      class: `${I}-resize`,
      attrs: {
        "data-type": I
      },
      on: {
        mousedown: this.dragEvent
      }
    }))) : null])]);
  }
});
var WC = function(e) {
  var t, n = (typeof process > "u" ? "undefined" : R(process)) === "object" ? (t = process.env) === null || t === void 0 ? void 0 : t.TINY_MODE : null;
  return qn;
}, GC = {
  MODAL_STATUS: {
    INFO: "info",
    SUCCESS: "success",
    WARNING: "warning",
    ERROR: "error",
    LOADING: "loading"
  },
  NODAL_TYPE: {
    ALERT: "alert",
    CONFIRM: "confirm",
    MESSAGE: "message"
  },
  STATUS_MAPPING_CLASSS: {
    INFO: "tiny-modal-svg__info",
    SUCCESS: "tiny-modal-svg__success",
    WARNING: "tiny-modal-svg__warning",
    ERROR: "tiny-modal-svg__error",
    LOADING: "tiny-modal-svg__refresh roll"
  },
  PC_SCROLL_LOCK_CLASS: "dialog-box__scroll-lock",
  MOBILE_FIRST_SCROLL_LOCK_CLASS: "tiny-modal-lockscroll",
  Mode: "pc",
  SCROLL_LOCK_CLASS: function(e) {
    return e === this.Mode ? this.PC_SCROLL_LOCK_CLASS : this.MOBILE_FIRST_SCROLL_LOCK_CLASS;
  }
}, YC = C(C({}, j), {}, {
  _constants: {
    type: Object,
    default: function() {
      return GC;
    }
  },
  animat: {
    type: Boolean,
    default: function() {
      return !0;
    }
  },
  beforeClose: Function,
  duration: {
    type: [Number, String],
    default: function() {
      return 3e3;
    }
  },
  messageClosable: Boolean,
  escClosable: Boolean,
  events: Object,
  fullscreen: Boolean,
  height: [Number, String],
  id: String,
  isFormReset: {
    type: Boolean,
    default: !0
  },
  lockScroll: Boolean,
  lockView: {
    type: Boolean,
    default: function() {
      return !0;
    }
  },
  marginSize: {
    type: [Number, String],
    default: 10
  },
  mask: {
    type: Boolean,
    default: function() {
      return !0;
    }
  },
  maskClosable: Boolean,
  message: [String, Function, Object],
  minHeight: {
    type: [Number, String],
    default: function() {
      return 200;
    }
  },
  minWidth: {
    type: [Number, String],
    default: function() {
      return 340;
    }
  },
  modelValue: Boolean,
  resize: Boolean,
  showFooter: Boolean,
  showHeader: {
    type: Boolean,
    default: !0
  },
  status: {
    type: [String, Object],
    default: ""
  },
  title: String,
  top: {
    type: [Number, String],
    default: 80
  },
  type: {
    type: String,
    default: "alert"
  },
  vSize: String,
  width: [Number, String],
  zIndex: [Number, String],
  description: String,
  // mf 属性
  options: Array,
  // mf 属性
  showClose: {
    type: Boolean,
    default: !0
  },
  // mf 属性
  confirmContent: String,
  cancelContent: String,
  position: {
    type: String,
    // mf 属性
    default: "",
    validator: function(e) {
      return ["", "bottom-right"].includes(e);
    }
  },
  customClass: String,
  // mf 属性
  confirmBtnProps: {
    type: Object,
    default: function() {
      return {};
    }
  },
  cancelBtnProps: {
    type: Object,
    default: function() {
      return {};
    }
  },
  footerDragable: Boolean,
  tiny_theme: String,
  slots: Object
});
const ce = B({
  name: O + "Modal",
  componentName: "Modal",
  props: YC,
  setup: function(e, t) {
    return K({
      props: e,
      context: t,
      template: WC
    });
  }
});
var KC = function(e) {
  var t = e.state;
  return e.emit, function() {
    t.isLock = !0, setTimeout(function() {
      t.isLock = !1;
    }, 300), t.showPopover = !1;
  };
}, QC = function(e) {
  var t = e.state, n = e.props;
  return e.emit, function(r) {
    (r ? n.trigger !== r : !n.reference) || t.isLock || t.showPopover || (t.showPopover = !0);
  };
}, XC = function(e) {
  var t = e.state, n = e.api;
  return function() {
    t.showPopover = !1, n.handleEmit("confirm");
  };
}, ZC = function(e) {
  var t = e.state, n = e.emit, r = e.vm;
  return function(i) {
    var a = r.events, s = a === void 0 ? {} : a;
    s[i] ? s[i].call(r, {
      $modal: r,
      type: i
    }) : n(i, t);
  };
}, JC = function(e) {
  var t = e.vm, n = e.api;
  return function(r) {
    t.$refs.popover.handleDocumentClick(r) && n.hide();
  };
}, Js = ["state", "show", "hide", "confirm", "handleEmit"], qs = function(e, t, n) {
  var r, i = t.computed, a = t.reactive, s = t.onMounted, l = t.onBeforeUnmount, u = n.emit, c = n.constants, d = n.designConfig, p = n.vm, f = {}, m = d == null || (r = d.icons) === null || r === void 0 ? void 0 : r[e.type], h = a({
    isLock: !1,
    showPopover: !1,
    getIcon: i(function() {
      return R(e.type) === "object" ? e.type : m || c.ICON_MAP[e.type];
    })
  });
  return Object.assign(f, {
    state: h,
    show: QC({
      state: h,
      emit: u,
      props: e
    }),
    hide: KC({
      state: h,
      emit: u
    }),
    confirm: XC({
      state: h,
      api: f
    }),
    handleEmit: ZC({
      state: h,
      emit: u,
      vm: p
    }),
    handleDocumentClick: JC({
      api: f,
      vm: p
    })
  }), s(function() {
    e.closeOnClickOutside && N(document, "click", f.handleDocumentClick);
  }), l(function() {
    e.closeOnClickOutside && U(document, "click", f.handleDocumentClick);
  }), f;
}, qC = function(e) {
  var t = e.api, n = e.state, r = e.props, i = e.nextTick, a = n.referenceElm, s = n.popperElm;
  r.trigger === "click" ? (N(a, "click", t.doToggle), N(document, "click", t.handleDocumentClick)) : r.trigger === "hover" ? (N(a, "mouseenter", t.handleMouseEnter), N(s, "mouseenter", t.handleMouseEnter), N(a, "mouseleave", t.handleMouseLeave), N(s, "mouseleave", t.handleMouseLeave)) : r.trigger === "focus" ? a.querySelector("input, textarea") ? (N(a, "focusin", t.doShow), N(a, "focusout", t.doClose)) : (N(a, "mousedown", t.doShow), N(a, "mouseup", t.doClose)) : r.trigger === "manual" && r.modelValue && i(t.doShow);
}, _C = function(e) {
  var t = e.api, n = e.state, r = e.constants, i = e.props, a = e.nextTick, s = e.mode;
  return function() {
    n.mounted = !0;
    var l = n.referenceElm, u = n.popperElm, c = n.tooltipId;
    l && (s !== "mobile-first" && ve(l, "".concat(r.IDPREFIX, "__reference")), l.setAttribute("aria-describedby", c), l.setAttribute("tabindex", i.tabindex.toString()), u.setAttribute("tabindex", 0), i.trigger !== "click" && (N(l, "focusin", function() {
      t.handleFocus();
      var d = l.__vue__;
      d && typeof d.focus == "function" && d.focus();
    }), N(u, "focusin", t.handleFocus), N(l, "focusout", t.handleBlur), N(u, "focusout", t.handleBlur)), N(l, "keydown", t.handleKeydown), N(l, "click", t.handleClick)), qC({
      api: t,
      state: n,
      props: i,
      nextTick: a
    });
  };
}, e0 = function(e) {
  return function() {
    e.showPopper = !e.showPopper;
  };
}, t0 = function(e) {
  return function() {
    e.showPopper = !0;
  };
}, n0 = function(e) {
  return function() {
    e.showPopper = !1;
  };
}, o0 = function(e) {
  var t = e.props, n = e.state;
  return function() {
    ve(n.referenceElm, "focusing"), (t.trigger === "click" || t.trigger === "focus") && (n.showPopper = !0);
  };
}, r0 = function(e) {
  return function(t) {
    var n = e.popperElm;
    t != null && t.target && n && (e.webCompEventTarget = t.target), ge(e.referenceElm, "focusing");
  };
}, i0 = function(e) {
  var t = e.props, n = e.state;
  return function() {
    ge(n.referenceElm, "focusing"), (t.trigger === "click" || t.trigger === "focus") && (n.showPopper = !1);
  };
}, a0 = function(e) {
  var t = e.props, n = e.state;
  return function() {
    clearTimeout(n.timer), t.openDelay ? n.timer = window.setTimeout(function() {
      n.showPopper = !0;
    }, t.openDelay) : n.showPopper = !0;
  };
}, s0 = function(e) {
  var t = e.api, n = e.props;
  return function(r) {
    r.keyCode === ie.Escape && n.trigger !== "manual" && t.doClose();
  };
}, l0 = function(e) {
  var t = e.props, n = e.state;
  return function() {
    clearTimeout(n.timer), t.closeDelay ? n.timer = window.setTimeout(function() {
      n.showPopper = !1;
    }, t.closeDelay) : n.showPopper = !1;
  };
}, u0 = function(e) {
  var t = e.vm, n = e.state;
  return function(r) {
    var i, a = n.referenceElm, s = n.popperElm, l = t.$refs.root, u = r.target;
    return (i = u) !== null && i !== void 0 && i.shadowRoot && s && (u = n.webCompEventTarget), !l || !a || l.contains(u) || a.contains(u) || !s || s.contains(u) ? !1 : (n.showPopper = !1, !0);
  };
}, c0 = function(e) {
  return function() {
    e("after-enter");
  };
}, d0 = function(e) {
  return function() {
    e("after-leave");
  };
}, p0 = function(e) {
  var t = e.emit, n = e.state;
  return function(r) {
    n.showPopper = !1, t("item-click", r);
  };
}, f0 = function(e) {
  var t = e.props, n = e.state;
  return function() {
    t.openDelay && clearTimeout(n.timer);
  };
}, m0 = function(e) {
  var t = e.state, n = e.api;
  return function() {
    var r = t.referenceElm, i = t.popperElm;
    U(r, "click", n.doToggle), U(r, "mouseup", n.doClose), U(r, "mousedown", n.doShow), U(r, "focusin", n.doShow), U(r, "focusout", n.doClose), U(r, "mouseleave", n.handleMouseLeave), U(r, "mouseenter", n.handleMouseEnter), U(document, "click", n.handleDocumentClick), U(i, "focusin", n.handleFocus), U(i, "focusout", n.handleBlur), U(i, "mouseenter", n.handleMouseEnter), U(i, "mouseleave", n.handleMouseLeave), U(r, "click", n.handleClick), U(r, "focusout", n.handleBlur), U(r, "keydown", n.handleKeydown);
  };
}, v0 = function(e) {
  return function() {
    return "".concat(e.IDPREFIX, "-").concat(fs("", 4));
  };
}, h0 = function(e) {
  var t = e.api, n = e.props, r = e.vm, i = e.state;
  return function() {
    var a = r.$refs, s = a.reference, l = a.popper, u = a.wrapper, c = i.referenceElm = n.reference || s;
    i.popperElm = i.popperElm || l, !c && u.children && (i.referenceElm = u.children[0] || u), i.referenceElm && t.mounted();
  };
}, g0 = function(e) {
  var t = e.state, n = e.vm;
  return function(r) {
    var i = $r(r), a;
    try {
      for (i.s(); !(a = i.n()).done; ) {
        var s = a.value;
        s.type === "attributes" && s.attributeName === "x-placement" && (t.xPlacement = n.$refs.popper.getAttribute("x-placement") || "bottom");
      }
    } catch (l) {
      i.e(l);
    } finally {
      i.f();
    }
  };
}, A0 = ["state", "handleAfterEnter", "handleAfterLeave", "doToggle", "doShow", "doClose", "doDestroy", "handleItemClick", "handleDocumentClick"], y0 = function(e) {
  var t = e.reactive, n = e.computed, r = e.api, i = e.popperElm, a = e.showPopper, s = e.referenceElm, l = t({
    popperElm: i,
    referenceElm: s,
    /** popper 元素是否显示。 它是通过v-show 绑定到页面上，造成隐藏时，popperJs并没有destory,有一定的性能影响 */
    showPopper: a,
    timer: 0,
    mounted: !1,
    xPlacement: "bottom",
    tooltipId: n(function() {
      return r.computedTooltipId();
    }),
    webCompEventTarget: null
  });
  return l;
}, b0 = function(e) {
  var t = e.api, n = e.props, r = e.state, i = e.emit, a = e.doDestroy, s = e.constants, l = e.nextTick, u = e.vm, c = e.mode;
  Object.assign(t, {
    state: r,
    mounted: _C({
      api: t,
      state: r,
      constants: s,
      props: n,
      nextTick: l,
      mode: c
    }),
    cleanup: f0({
      state: r,
      props: n
    }),
    destroyed: m0({
      state: r,
      api: t
    }),
    doDestroy: a,
    computedTooltipId: v0(s),
    doShow: t0(r),
    doClose: n0(r),
    doToggle: e0(r),
    handleClick: r0(r),
    handleAfterEnter: c0(i),
    handleBlur: i0({
      props: n,
      state: r
    }),
    handleFocus: o0({
      props: n,
      state: r
    }),
    handleKeydown: s0({
      api: t,
      props: n
    }),
    handleMouseLeave: l0({
      props: n,
      state: r
    }),
    handleAfterLeave: d0(i),
    handleMouseEnter: a0({
      props: n,
      state: r
    }),
    handleDocumentClick: u0({
      vm: u,
      state: r
    }),
    wrapMounted: h0({
      api: t,
      props: n,
      vm: u,
      state: r
    }),
    handleItemClick: p0({
      emit: i,
      state: r
    }),
    observeCallback: g0({
      vm: u,
      state: r
    })
  });
}, S0 = function(e) {
  var t = e.watch, n = e.props, r = e.state, i = e.emit, a = e.api, s = e.nextTick, l = e.updatePopper;
  e.mode, t(function() {
    return r.showPopper;
  }, function(u) {
    n.disabled || (u && s(function() {
      return l();
    }), i(u ? "show" : "hide"));
  }), t(function() {
    return n.reference;
  }, function(u, c) {
    u !== c && (a.destroyed(), s(function() {
      a.wrapMounted();
    }));
  }), t(function() {
    return n.modelValue;
  }, function(u) {
    n.trigger === "manual" && (r.showPopper = u, i("update:modelValue", u));
  });
}, w0 = function(e, t, n) {
  var r = t.reactive, i = t.computed, a = t.watch, s = t.toRefs, l = t.onBeforeUnmount, u = t.onMounted, c = t.onUnmounted, d = t.onActivated, p = t.onDeactivated, f = n.$prefix, m = n.emit, h = n.vm, v = n.slots, g = n.nextTick, b = n.mode, y = {}, S = {
    IDPREFIX: "".concat(f.toLowerCase(), "-popover")
  }, I = {
    emit: m,
    onBeforeUnmount: l,
    nextTick: g,
    reactive: r,
    props: e,
    watch: a,
    onDeactivated: p,
    vm: h,
    slots: v,
    toRefs: s
  }, k = ni(I), E = k.showPopper, L = k.popperElm, V = k.referenceElm, Y = k.doDestroy, X = k.updatePopper, _ = y0({
    reactive: r,
    computed: i,
    api: y,
    popperElm: L,
    showPopper: E,
    referenceElm: V
  });
  return b0({
    api: y,
    constants: S,
    props: e,
    state: _,
    emit: m,
    doDestroy: Y,
    nextTick: g,
    vm: h,
    mode: b
  }), p(function() {
    y.destroyed(), y.cleanup();
  }), u(function() {
    if (y.wrapMounted(), e.genArrowByHtml) {
      var be = {
        attributes: !0,
        childList: !1,
        subtree: !1
      };
      y.observer = new MutationObserver(y.observeCallback), y.observer.observe(h.$refs.popper, be);
    }
  }), d(y.mounted), c(function() {
    y.destroyed(), y.observer && y.observer.disconnect();
  }), l(y.cleanup), S0({
    watch: a,
    props: e,
    state: _,
    emit: m,
    api: y,
    nextTick: g,
    updatePopper: X,
    mode: b
  }), y;
};
const T0 = B({
  emits: ["update:modelValue", "hide", "show", "after-enter", "after-leave", "created", "itemClick"],
  props: [
    ...Q,
    "appendToBody",
    "arrowOffset",
    "boundariesPadding",
    "closeDelay",
    "disabled",
    "modelValue",
    "offset",
    "openDelay",
    "placement",
    "popper",
    "popperClass",
    "popperOptions",
    "reference",
    "tabindex",
    "title",
    "transition",
    "trigger",
    "visibleArrow",
    "width",
    "maxHeight",
    "listData"
  ],
  setup(o, e) {
    return z({ props: o, context: e, renderless: w0, api: A0 });
  }
}), C0 = { ref: "root" }, I0 = ["id", "aria-hidden"], k0 = ["textContent"], E0 = ["onClick"], D0 = ["src"], B0 = { class: "label-view" }, x0 = { class: "main" }, P0 = {
  key: 0,
  class: "sub"
}, M0 = {
  key: 0,
  class: "line"
};
function O0(o, e, t, n, r, i) {
  return A(), w(
    "span",
    C0,
    [
      D($e, {
        name: o.transition,
        onAfterEnter: o.handleAfterEnter,
        onAfterLeave: o.handleAfterLeave,
        persisted: ""
      }, {
        default: ee(() => [
          oe(T("div", {
            class: P(["tiny-mobile-popover tiny-mobile-popper", [o.popperClass, "tiny-mobile-popover__plain", { "no-arrow": !o.visibleArrow }]]),
            ref: "popper",
            style: H({
              width: o.width === "auto" ? o.width : o.width + "px",
              maxHeight: o.maxHeight === "auto" ? o.maxHeight : o.maxHeight + "px"
            }),
            role: "tooltip",
            id: o.state.tooltipId,
            "aria-hidden": o.disabled || !o.state.showPopper ? "true" : "false"
          }, [
            o.title ? (A(), w("div", {
              key: 0,
              class: "tiny-mobile-popover__title",
              textContent: M(o.title)
            }, null, 8, k0)) : x("v-if", !0),
            F(o.$slots, "default", {}, () => [
              T(
                "div",
                {
                  class: "list-content",
                  style: H({ maxHeight: o.maxHeight === "auto" ? o.maxHeight : o.maxHeight + "px" })
                },
                [
                  (A(!0), w(
                    q,
                    null,
                    ae(o.listData, (a, s) => (A(), w("div", {
                      key: a.id,
                      class: P(["list-view", a.subLabel ? "list-view-height" : ""]),
                      onClick: (l) => o.handleItemClick(a)
                    }, [
                      T("img", {
                        src: a.icon,
                        class: "icon"
                      }, null, 8, D0),
                      T("div", B0, [
                        T(
                          "div",
                          x0,
                          M(a.label),
                          1
                          /* TEXT */
                        ),
                        a.subLabel ? (A(), w(
                          "div",
                          P0,
                          M(a.subLabel),
                          1
                          /* TEXT */
                        )) : x("v-if", !0)
                      ]),
                      s !== o.listData.length - 1 ? (A(), w("div", M0)) : x("v-if", !0)
                    ], 10, E0))),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ],
                4
                /* STYLE */
              )
            ])
          ], 14, I0), [
            [he, !o.disabled && o.state.showPopper]
          ])
        ]),
        _: 3
        /* FORWARDED */
      }, 8, ["name", "onAfterEnter", "onAfterLeave"]),
      T(
        "span",
        {
          ref: "wrapper",
          class: P(["reference-wrapper", { "reference-wrapper-show": !o.disabled && o.state.showPopper }])
        },
        [
          F(o.$slots, "reference")
        ],
        2
        /* CLASS */
      )
    ],
    512
    /* NEED_PATCH */
  );
}
const _n = /* @__PURE__ */ W(T0, [["render", O0]]);
var L0 = function(e) {
  var t, n = (typeof process > "u" ? "undefined" : R(process)) === "object" ? (t = process.env) === null || t === void 0 ? void 0 : t.TINY_MODE : null;
  return _n;
}, N0 = C(C({}, j), {}, {
  appendToBody: {
    type: Boolean,
    default: !0
  },
  arrowOffset: {
    type: Number,
    default: 0
  },
  boundariesPadding: {
    type: Number,
    default: 5
  },
  closeDelay: {
    type: Number,
    default: 200
  },
  content: String,
  disabled: Boolean,
  modelValue: Boolean,
  offset: {
    default: 0
  },
  openDelay: {
    type: Number,
    default: 0
  },
  placement: {
    type: String,
    default: "bottom"
  },
  popper: {},
  popperClass: String,
  popperOptions: {
    type: Object,
    default: function() {
      return {
        gpuAcceleration: !1
      };
    }
  },
  reference: {},
  tabindex: {
    type: Number,
    default: 0
  },
  title: String,
  transition: {
    type: String,
    default: "fade-in-linear"
  },
  trigger: {
    type: String,
    default: "click",
    validator: function(e) {
      return !!~["click", "focus", "hover", "manual"].indexOf(e);
    }
  },
  visibleArrow: {
    default: !0
  },
  width: {
    type: [String, Number]
  },
  height: {
    type: [String, Number]
  },
  maxHeight: {
    type: [String, Number]
  },
  listData: [Object, Array],
  genArrowByHtml: {
    type: Boolean,
    default: function() {
      return !0;
    }
  }
});
const xe = B({
  inheritAttrs: !0,
  name: O + "Popover",
  props: N0,
  setup: function(e, t) {
    return K({
      props: e,
      context: t,
      template: L0
    });
  }
});
const F0 = "3.20.0";
xe.install = function(o) {
  o.component(xe.name, xe);
};
xe.model = {
  prop: "modelValue",
  event: "update:modelValue"
};
xe.version = F0;
const R0 = B({
  name: O + "Popconfirm",
  components: {
    TinyPopover: xe,
    TinyButton: ye,
    IconSuccess: Vr(),
    IconHelp: ba(),
    IconWarningTriangle: Sa(),
    IconError: Mo()
  },
  props: {
    _constants: {
      type: Object,
      default: () => ({})
    },
    popperOptions: Object,
    message: String,
    customClass: String,
    trigger: {
      type: String,
      default: "hover",
      validator: (o) => ["click", "hover"].includes(o)
    },
    cancelButton: {
      type: Boolean,
      default: !0
    },
    closeOnClickOutside: {
      type: Boolean,
      default: !0
    },
    title: String,
    placement: {
      type: String,
      default: "top"
    },
    width: {
      type: [String, Number],
      default: ""
    },
    type: [String, Object],
    reference: {},
    events: Object,
    popperAppendToBody: {
      type: Boolean,
      default: !0
    }
  },
  emits: ["hide", "show", "confirm"],
  setup(o, e) {
    return z({ props: o, context: e, renderless: qs, api: Js });
  }
}), V0 = { class: "tiny-popconfirm" }, U0 = { class: "tiny-popconfirm-popover__container" }, H0 = { class: "tiny-popconfirm-popover__header" }, $0 = { class: "tiny-popconfirm-popover__title" }, z0 = { class: "tiny-popconfirm-popover__content" }, j0 = { class: "tiny-popconfirm-popover__footer" };
function W0(o, e, t, n, r, i) {
  const a = $("tiny-button"), s = $("tiny-popover");
  return A(), w("div", V0, [
    T("div", null, [
      D(s, {
        ref: "popover",
        modelValue: o.state.showPopover,
        "onUpdate:modelValue": e[2] || (e[2] = (l) => o.state.showPopover = l),
        placement: o.placement,
        trigger: "manual",
        width: o.width,
        "popper-class": "tiny-popconfirm-popover " + (o.customClass || ""),
        "popper-options": o.popperOptions,
        "append-to-body": o.popperAppendToBody,
        reference: o.reference,
        onShow: e[3] || (e[3] = (l) => o.handleEmit("show")),
        onHide: e[4] || (e[4] = (l) => o.handleEmit("hide"))
      }, {
        reference: ee(() => [
          T(
            "div",
            {
              class: "tiny-popconfirm__reference",
              onClick: e[0] || (e[0] = (l) => o.show("click")),
              onMouseenter: e[1] || (e[1] = (l) => o.show("hover"))
            },
            [
              F(o.$slots, "reference")
            ],
            32
            /* NEED_HYDRATION */
          )
        ]),
        default: ee(() => [
          T("div", U0, [
            T("div", H0, [
              o.type ? (A(), G(pe(o.state.getIcon), {
                key: 0,
                class: P(["tiny-popconfirm-popover__icon", o.type ? `tiny-popconfirm-popover--${o.type}` : ""])
              }, null, 8, ["class"])) : x("v-if", !0),
              T(
                "div",
                $0,
                M(o.title),
                1
                /* TEXT */
              )
            ]),
            T(
              "div",
              z0,
              M(o.message),
              1
              /* TEXT */
            ),
            T("div", j0, [
              F(o.$slots, "footer", {}, () => [
                o.cancelButton ? (A(), G(a, {
                  key: 0,
                  class: "tiny-popconfirm-popover__cancel-button",
                  size: "mini",
                  onClick: o.hide
                }, {
                  default: ee(() => [
                    ue(
                      M(o.t("ui.button.cancel")),
                      1
                      /* TEXT */
                    )
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["onClick"])) : x("v-if", !0),
                D(a, {
                  class: "tiny-popconfirm-popover__confirm-button",
                  size: "mini",
                  type: "primary",
                  onClick: o.confirm
                }, {
                  default: ee(() => [
                    ue(
                      M(o.t("ui.button.confirm")),
                      1
                      /* TEXT */
                    )
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["onClick"])
              ])
            ])
          ])
        ]),
        _: 3
        /* FORWARDED */
      }, 8, ["modelValue", "placement", "width", "popper-class", "popper-options", "append-to-body", "reference"])
    ])
  ]);
}
const qi = /* @__PURE__ */ W(R0, [["render", W0]]), G0 = {
  ICON_MAP: {
    success: "icon-success",
    error: "icon-error",
    info: "icon-info-solid",
    warning: "icon-warning"
  }
}, Y0 = B({
  name: O + "Popconfirm",
  components: {
    TinyPopover: xe,
    TinyButton: ye,
    IconSuccess: Vr(),
    IconInfoSolid: Hl(),
    IconWarning: Ta(),
    IconError: Mo()
  },
  props: {
    _constants: {
      type: Object,
      default: () => G0
    },
    message: String,
    customClass: String,
    trigger: {
      type: String,
      default: "hover",
      validator: (o) => ~["click", "hover"].indexOf(o)
    },
    cancelButton: {
      type: Boolean,
      default: !0
    },
    closeOnClickOutside: {
      type: Boolean,
      default: !0
    },
    title: String,
    placement: {
      type: String,
      default: "top"
    },
    width: {
      type: [String, Number],
      default: ""
    },
    type: [String, Object],
    reference: {},
    events: Object,
    popperAppendToBody: {
      type: Boolean,
      default: !0
    }
  },
  emits: ["hide", "show", "confirm", "handleEmit"],
  setup(o, e) {
    return z({ props: o, context: e, renderless: qs, api: Js });
  }
}), K0 = {
  "data-tag": "tiny-popconfirm",
  class: "inline-block"
}, Q0 = {
  "data-tag": "tiny-popconfirm-header",
  class: "flex items-center leading-6 sm:pt-1"
}, X0 = { class: "flex-auto" }, Z0 = { "data-tag": "tiny-popconfirm-content" }, J0 = { class: "sm:leading-6 sm:text-xs sm:text-color-text-secondary" }, q0 = {
  "data-tag": "tiny-popconfirm-footer",
  class: "sm:pb-1"
}, _0 = { class: "hidden sm:flex mt-4 justify-end" }, eI = { class: "flex sm:hidden text-base justify-center" }, tI = {
  key: 1,
  class: "border-r border-r-color-border-separator"
};
function nI(o, e, t, n, r, i) {
  const a = $("tiny-button"), s = $("tiny-popover");
  return A(), w("div", K0, [
    D(s, {
      ref: "popover",
      tiny_mode: "mobile-first",
      modelValue: o.state.showPopover,
      "onUpdate:modelValue": e[2] || (e[2] = (l) => o.state.showPopover = l),
      placement: o.placement,
      trigger: "manual",
      width: o.width,
      title: o.title,
      "popper-class": o.m("min-w-[theme(spacing.44)] max-w-[theme(spacing.96)]", o.customClass),
      "append-to-body": o.popperAppendToBody,
      reference: o.reference,
      onShow: e[3] || (e[3] = (l) => o.handleEmit("show")),
      onHide: e[4] || (e[4] = (l) => o.handleEmit("hide"))
    }, {
      header: ee(() => [
        T("div", Q0, [
          o.type ? (A(), G(pe(o.state.getIcon), {
            key: 0,
            class: P(
              o.m(
                "h-6 w-6 mr-2",
                { "fill-color-info-secondary": o.type === "info" },
                { "fill-color-error": o.type === "error" },
                { "fill-color-warning": o.type === "warning" },
                { "fill-color-success": o.type === "success" }
              )
            )
          }, null, 8, ["class"])) : x("v-if", !0),
          T(
            "div",
            X0,
            M(o.title),
            1
            /* TEXT */
          )
        ])
      ]),
      default: ee(() => [
        T("div", Z0, [
          T(
            "div",
            J0,
            M(o.message),
            1
            /* TEXT */
          )
        ])
      ]),
      footer: ee(() => [
        T("div", q0, [
          T("div", _0, [
            F(o.$slots, "footer", {}, () => [
              o.cancelButton ? (A(), G(a, {
                key: 0,
                class: "mr-2 w-16",
                size: "mini",
                tiny_mode: "mobile-first",
                onClick: o.hide
              }, {
                default: ee(() => [
                  ue(
                    M(o.t("ui.buttonMessage.cancel")),
                    1
                    /* TEXT */
                  )
                ]),
                _: 1
                /* STABLE */
              }, 8, ["onClick"])) : x("v-if", !0),
              D(a, {
                class: "w-16",
                size: "mini",
                tiny_mode: "mobile-first",
                type: "primary",
                onClick: o.confirm
              }, {
                default: ee(() => [
                  ue(
                    M(o.t("ui.buttonMessage.confirm")),
                    1
                    /* TEXT */
                  )
                ]),
                _: 1
                /* STABLE */
              }, 8, ["onClick"])
            ])
          ]),
          T("div", eI, [
            F(o.$slots, "footer", {}, () => [
              o.cancelButton ? (A(), G(a, {
                key: 0,
                "custom-class": "flex-1 text-color-text-secondary",
                tiny_mode: "mobile-first",
                type: "text",
                onClick: o.hide
              }, {
                default: ee(() => [
                  ue(
                    M(o.t("ui.buttonMessage.cancel")),
                    1
                    /* TEXT */
                  )
                ]),
                _: 1
                /* STABLE */
              }, 8, ["onClick"])) : x("v-if", !0),
              o.cancelButton ? (A(), w("span", tI)) : x("v-if", !0),
              D(a, {
                "custom-class": "flex-1 text-color-brand tiny-modal-mf-button",
                tiny_mode: "mobile-first",
                type: "text",
                onClick: o.confirm
              }, {
                default: ee(() => [
                  ue(
                    M(o.t("ui.buttonMessage.confirm")),
                    1
                    /* TEXT */
                  )
                ]),
                _: 1
                /* STABLE */
              }, 8, ["onClick"])
            ])
          ])
        ])
      ]),
      reference: ee(() => [
        T(
          "div",
          {
            class: "inline-block",
            onClick: e[0] || (e[0] = (l) => o.show("click")),
            onMouseover: e[1] || (e[1] = (l) => o.show("hover"))
          },
          [
            F(o.$slots, "reference")
          ],
          32
          /* NEED_HYDRATION */
        )
      ]),
      _: 3
      /* FORWARDED */
    }, 8, ["modelValue", "placement", "width", "title", "popper-class", "append-to-body", "reference"])
  ]);
}
const oI = /* @__PURE__ */ W(Y0, [["render", nI]]);
var rI = function(e) {
  var t, n = (typeof process > "u" ? "undefined" : R(process)) === "object" ? (t = process.env) === null || t === void 0 ? void 0 : t.TINY_MODE : null;
  return (n || e) === "pc" ? qi : (n || e) === "mobile-first" ? oI : qi;
}, iI = {
  PC_PREFIXCLS: "tiny-popconfim",
  MOBILE_PREFIXCLS: "tiny-mobile-popconfim",
  Mode: "pc",
  prefixcls: function(e) {
    return e === this.Mode ? this.PC_PREFIXCLS : this.MOBILE_PREFIXCLS;
  },
  ICON_MAP: {
    success: "icon-success",
    error: "icon-error",
    info: "icon-help",
    warning: "icon-warning-triangle"
  }
}, aI = C(C({}, j), {}, {
  _constants: {
    type: Object,
    default: function() {
      return iI;
    }
  },
  message: String,
  customClass: String,
  popperOptions: Object,
  trigger: {
    type: String,
    default: "hover",
    validator: function(e) {
      return ["click", "hover"].includes(e);
    }
  },
  cancelButton: {
    type: Boolean,
    default: !0
  },
  closeOnClickOutside: {
    type: Boolean,
    default: !0
  },
  title: String,
  placement: {
    type: String,
    default: "top"
  },
  width: [String, Number],
  type: [String, Object],
  reference: {},
  events: Object,
  popperAppendToBody: {
    type: Boolean,
    default: !0
  }
});
const on = B({
  name: O + "Popconfim",
  props: aI,
  setup: function(e, t) {
    return K({
      props: e,
      context: t,
      template: rI
    });
  }
}), sI = "3.20.0";
on.install = function(o) {
  o.component(on.name, on);
};
on.model = {
  prop: "modelValue",
  event: "update:modelValue"
};
on.version = sI;
const lI = "3.20.0";
ce.version = lI;
ce.model = {
  prop: "modelValue",
  event: "update:modelValue"
};
function qt(o) {
  var e = new Promise(function(t) {
    if (o && o.id && fn.some(function(a) {
      return a.id === o.id;
    }))
      t("exist");
    else {
      var n = o.events || {}, r;
      o.events = Object.assign({}, n, {
        hide: function(s) {
          n.hide && n.hide.call(this, s), r.beforeUnmouted && r.beforeUnmouted(), t(s.type);
        },
        confirm: function(s) {
          n.confirm && n.confirm.call(this, s);
        },
        show: function(s) {
          n.show && n.show.call(this, s);
        }
      }), r = vn({
        el: document.createElement("div"),
        propsData: Object.assign({
          tiny_mode: ce.tiny_mode,
          tiny_theme: ce.tiny_theme
        }, o),
        component: o.componentType === "popconfirm" ? on : ce
      });
      var i = r[o.componentType === "popconfirm" ? "show" : "open"];
      i && i(), setTimeout(function() {
        return e.vm = r;
      }, 0);
    }
  });
  return e;
}
var uI = qt, cI = ["alert", "confirm", "message", "popconfirm"], dI = {
  alert: {
    showFooter: !0,
    type: "alert"
  },
  confirm: {
    showFooter: !0,
    status: "question",
    type: "confirm"
  },
  message: {
    mask: !1,
    lockView: !1,
    showHeader: !1,
    showClose: !1,
    type: "message"
  },
  popconfirm: {}
};
cI.forEach(function(o) {
  ce[o] = qt[o] = function(e, t, n) {
    var r;
    return R(e) === "object" && e !== null ? r = e : t && (r = {
      title: t
    }), e == null && (e = ""), uI(C(C(C(C({
      message: e.toString()
    }, dI[o]), r), n), {}, {
      componentType: o
    }));
  };
});
ce.installed = !1;
ma.TINYModal = {
  install: function(e) {
    var t;
    if (!ce.installed) {
      var n = !!e.component, r = n ? e.prototype.tiny_mode : e.config.globalProperties.tiny_mode, i = n ? e.prototype.tiny_theme : e.config.globalProperties.tiny_theme, a = (typeof process > "u" ? "undefined" : R(process)) === "object" ? (t = process.env) === null || t === void 0 ? void 0 : t.TINY_MODE : null;
      ce.tiny_mode = a || r && r.value, ce.tiny_theme = i && i.value, ce.installed = !0;
    }
  },
  init: function(e) {
    var t = e.$TinyModalApiPrefix || e.$apiPrefix || "$";
    e["".concat(t, "alert")] = qt.alert, e["".concat(t, "message")] = qt.message, e["".concat(t, "confirm")] = qt.confirm, e["".concat(t, "popconfirm")] = qt.popconfirm;
  }
};
ce.install = function(o) {
  o.component(ce.name, ce);
};
const pI = {
  components: {
    TinyProgress: Ve,
    TinyImageViewer: nt,
    IconAttachment: $l(),
    IconCloseCircle: zl(),
    IconError: jl()
  },
  emits: ["remove", "start", "update:visible"],
  props: [
    ...Q,
    "disabled",
    "display",
    "files",
    "filesIcon",
    "handlePreview",
    "isEdm",
    "isFolder",
    "listType",
    "openDownloadFile",
    "srcList",
    "isFolderTitle",
    "listOption",
    "maxNameLength",
    "mode"
  ],
  setup(o, e) {
    return z({
      props: o,
      context: e,
      renderless: mw,
      api: fw,
      extendOptions: { Modal: ce }
    });
  }
}, fI = ["onKeydown", "onClick"], mI = {
  key: 0,
  class: "tiny-mobile-upload-list__card"
}, vI = ["src"], hI = {
  key: 1,
  class: "tiny-mobile-upload-list__list"
}, gI = { class: "file-type" }, AI = ["src"], yI = ["onClick"], bI = { class: "tiny-mobile-upload-list__text-details file-name" }, SI = { class: "tiny-mobile-upload-list__text-details file-size" }, wI = { class: "file-delete" };
function TI(o, e, t, n, r, i) {
  const a = $("icon-error"), s = $("tiny-progress"), l = $("icon-attachment"), u = $("icon-close-circle"), c = $("tiny-image-viewer");
  return A(), w(
    "div",
    {
      class: P(["tiny-mobile-upload-list", "tiny-mobile-upload-list--" + t.listType, { "is-disabled": t.disabled }])
    },
    [
      D(Sl, {
        tag: "ul",
        name: "tiny-list"
      }, {
        default: ee(() => [
          (A(!0), w(
            q,
            null,
            ae(t.files, (d, p) => (A(), w("li", {
              class: P(["tiny-mobile-upload-list__item", "is-" + d.status, o.state.focusing ? "focusing" : ""]),
              key: d.uid,
              tabindex: "0",
              onKeydown: Ge((f) => !t.disabled && o.$emit("remove", d), ["delete"]),
              onClick: (f) => o.picturefilePreview(p)
            }, [
              F(o.$slots, "default", { file: d }, () => [
                ["picture-card"].indexOf(t.listType) > -1 ? (A(), w("div", mI, [
                  d.status !== "uploading" && ["picture-card"].indexOf(t.listType) > -1 ? (A(), w("img", {
                    key: 0,
                    class: "tiny-mobile-upload-list__item-thumbnail",
                    src: d.url,
                    alt: ""
                  }, null, 8, vI)) : x("v-if", !0),
                  t.listType === "picture-card" && t.display ? (A(), G(a, {
                    key: 1,
                    class: "icon-close card-close",
                    onClick: te((f) => o.$emit("remove", d), ["stop"])
                  }, null, 8, ["onClick"])) : x("v-if", !0),
                  d.status === "uploading" ? (A(), G(s, {
                    key: 2,
                    type: "circle",
                    percentage: o.parsePercentage(d.percentage),
                    "stroke-width": 1.4,
                    width: 32
                  }, null, 8, ["percentage"])) : x("v-if", !0)
                ])) : (A(), w("div", hI, [
                  T("div", gI, [
                    t.filesIcon.length === 0 ? (A(), G(l, { key: 0 })) : x("v-if", !0),
                    (A(!0), w(
                      q,
                      null,
                      ae(t.filesIcon, (f) => (A(), w(
                        q,
                        null,
                        [
                          t.filesIcon && o.state.screenType && d.fileType === f.type ? (A(), w("img", {
                            class: P(["file-type-icon", "is-" + f.type]),
                            key: f.type,
                            src: f.url
                          }, null, 10, AI)) : x("v-if", !0)
                        ],
                        64
                        /* STABLE_FRAGMENT */
                      ))),
                      256
                      /* UNKEYED_FRAGMENT */
                    ))
                  ]),
                  T("div", {
                    class: "tiny-mobile-upload-list__text file-content",
                    onClick: (f) => o.handleClick(d)
                  }, [
                    T(
                      "p",
                      bI,
                      M(d.name),
                      1
                      /* TEXT */
                    ),
                    T(
                      "p",
                      SI,
                      M(d.size),
                      1
                      /* TEXT */
                    ),
                    d.status === "uploading" ? (A(), G(s, {
                      key: 0,
                      "show-text": !1,
                      "stroke-width": 2,
                      percentage: o.parsePercentage(d.percentage)
                    }, null, 8, ["percentage"])) : x("v-if", !0)
                  ], 8, yI),
                  T("div", wI, [
                    t.listType !== "picture-card" && t.display ? (A(), G(u, {
                      key: 0,
                      class: "icon-close",
                      onClick: (f) => o.$emit("remove", d)
                    }, null, 8, ["onClick"])) : x("v-if", !0)
                  ])
                ]))
              ])
            ], 42, fI))),
            128
            /* KEYED_FRAGMENT */
          ))
        ]),
        _: 3
        /* FORWARDED */
      }),
      t.listType === "picture-card" ? (A(), G(c, {
        key: 0,
        "url-list": t.srcList,
        "close-show": !0,
        "show-index": !0,
        startPosition: o.state.startPostion,
        "tool-show": "",
        "onUpdate:previewVisible": e[0] || (e[0] = (d) => o.state.shows = d),
        "delete-button": "",
        onNewImageList: o.getDeleteData
      }, null, 8, ["url-list", "startPosition", "onNewImageList"])) : x("v-if", !0)
    ],
    2
    /* CLASS */
  );
}
const eo = /* @__PURE__ */ W(pI, [["render", TI]]);
var CI = function(e) {
  var t, n = (typeof process > "u" ? "undefined" : R(process)) === "object" ? (t = process.env) === null || t === void 0 ? void 0 : t.TINY_MODE : null;
  return eo;
}, II = C(C({}, j), {}, {
  disabled: {
    type: Boolean,
    default: function() {
      return !1;
    }
  },
  display: {
    type: Boolean,
    default: function() {
      return !0;
    }
  },
  files: {
    type: Array,
    default: function() {
      return [];
    }
  },
  filesIcon: {
    type: Array,
    default: function() {
      return [];
    }
  },
  handlePreview: Function,
  isEdm: {
    type: Boolean,
    default: function() {
      return !1;
    }
  },
  isFolder: {
    type: Boolean,
    default: function() {
      return !1;
    }
  },
  listType: String,
  openDownloadFile: {
    type: Boolean,
    default: function() {
      return !1;
    }
  },
  srcList: {
    type: Array,
    default: function() {
      return [];
    }
  },
  isFolderTitle: {
    type: Boolean,
    default: !1
  },
  listOption: {
    type: Object,
    default: function() {
      return {
        showUpdate: !0,
        showDel: !0
      };
    }
  },
  maxNameLength: {
    type: Number,
    default: 20
  },
  scale: {
    type: [Number, String],
    default: 1
  },
  showName: {
    type: Boolean,
    default: !1
  },
  types: Array,
  displayOnly: {
    type: Boolean,
    default: !1
  },
  handleDownloadFile: Function,
  handleReUpload: Function,
  isDragover: Boolean,
  selected: Object,
  triggerClick: {
    type: Function,
    default: function() {
    }
  },
  isHwh5: {
    type: Boolean,
    default: !1
  },
  triggerPlay: {
    type: Function,
    default: function() {
    }
  },
  mode: String,
  lockScroll: {
    type: Boolean,
    default: !0
  },
  compact: {
    type: Boolean,
    default: !1
  },
  imageBgColor: String
});
const Ue = B({
  name: O + "UploadList",
  props: II,
  setup: function(e, t) {
    return K({
      props: e,
      context: t,
      template: CI,
      extend: {
        ref: "upload-list-inner-template"
      }
    });
  }
}), kI = "3.20.0";
Ue.install = function(o) {
  o.component(Ue.name, Ue);
};
Ue.version = kI;
var EI = function(e) {
  return e.includes("image");
}, DI = function(e) {
  return function(t) {
    var n = t.target.files;
    n && e.uploadFiles(n);
  };
}, BI = function(e) {
  var t = e.api, n = e.props;
  return function(r) {
    var i;
    if (r.preventDefault(), !!n.pasteUpload) {
      var a = (i = r.clipboardData) === null || i === void 0 ? void 0 : i.items;
      if (a) {
        for (var s = [], l = 0; l < a.length; l++) {
          var u = a[l].getAsFile();
          u && s.push(u);
        }
        s.length && t.uploadFiles(s);
      }
    }
  };
}, xI = function(e) {
  var t = e.constants, n = e.state, r = e.props;
  return function(i) {
    var a = i.formData, s = i.file, l = i.type, u = n.uploader.$refs[t.FILE_UPLOAD_INNER_TEMPLATE];
    if (u.edm.upload) {
      var c = u.edm.upload.params;
      for (var d in c)
        a.set(d, c[d] || "");
    }
    a.append(t.EDM.FILENAME, s.name), u.edm.isCheckCode === !0 ? (a.append(t.EDM.ISCHECKCODE, "Y"), a.append(t.EDM.CHECKCODE, s.hash)) : a.append(t.EDM.ISCHECKCODE, "N"), r.isFolder && a.append("filePath", s.path);
    var p = n.updateId || u.edm.updateId;
    if (l === t.EDM.SINGLEUPLOAD)
      a.append(t.EDM.MULTIPART, s, r.isFolder ? s.path + s.name : s.name), p && a.append(t.EDM.DOCID, p);
    else {
      var f = p || s.docId;
      a.append(t.EDM.DOCID, f), a.append(t.EDM.FILESIZE, s.size);
    }
    p && (a.append("updateFile", !0), n.updateId = "");
  };
}, PI = function(e) {
  var t = e.state, n = e.constants, r = e.Modal, i = e.props, a = e.t;
  return function(s) {
    if (t.updateId === "" && i.limit && i.fileList.length + s.length > i.limit) {
      var l = t.uploader.$refs[n.FILE_UPLOAD_INNER_TEMPLATE];
      l && !l.state.listeners.exceed && r.message({
        message: a(n.EDM.NumberExceed, {
          number: i.limit
        }),
        status: "warning"
      }), i.onExceed && i.onExceed(s, i.fileList);
      return;
    }
    var u = Array.prototype.slice.call(s);
    i.isFolder ? u = u.filter(function(c) {
      var d = c.webkitRelativePath.split("/");
      return c.path = d.slice(0, d.length - 1).join("/") + "/", d.length >= 7 && r.message({
        message: "".concat(c.name).concat(a(n.EDM.FOLDERKEY)),
        status: "warning"
      }), d.length < 7;
    }) : i.multiple || (u = u.slice(0, 1)), u.length !== 0 && i.onStart && i.onStart(u, t.updateId);
  };
}, MI = function(e) {
  var t = e.api, n = e.props, r = e.refs;
  return function(i) {
    if (r.input.value = null, !n.beforeUpload)
      return t.post(i);
    var a = n.beforeUpload(i);
    a && a.then ? a.then(function(s) {
      var l = Object.prototype.toString.call(s);
      if (l === "[object File]" || l === "[object Blob]") {
        l === "[object Blob]" && (s = new File([s], i.name, {
          type: i.type
        }));
        for (var u in i)
          Object.prototype.hasOwnProperty.call(i, u) && (s[u] = i[u]);
        t.post(s);
      } else
        t.post(i);
    }, function() {
      n.onRemove(null, i);
    }) : a !== !1 ? t.post(i) : n.onRemove(null, i);
  };
}, OI = function(e) {
  var t = e.state, n = e.props, r = e.constants;
  return function(i) {
    var a = t.reqs, s = function(m) {
      var h;
      (h = a[m]) !== null && h !== void 0 && h.abort ? a[m].abort("") : t.cancelToken[m] && t.cancelToken[m](""), delete a[m], delete t.cancelToken[m];
    };
    if (i && i.isLargeFile && i.cancelToken)
      i.cancelToken && i.cancelToken.forEach(function(f) {
        return f("");
      }), delete i.cancelToken;
    else if (i) {
      var l = i;
      i.uid && (l = i.uid), s(l);
    } else {
      var u = r.FILE_STATUS, c = u.READY, d = u.UPLOADING, p = u.FAIL;
      Object.keys(a).forEach(function(f) {
        return s(f || "");
      }), n.fileList.forEach(function(f) {
        f.cancelToken && f.cancelToken.forEach(function(m) {
          return m("");
        }), [c, d].includes(f.status) && (f.status = p);
      });
    }
  };
}, LI = function(e) {
  var t = e.props, n = e.state, r = e.rawFile, i = e.uploaderInner, a = e.uid;
  return {
    headers: Object.assign(t.headers || {}, n.headers || {}),
    withCredentials: t.withCredentials,
    file: r,
    data: t.data,
    filename: t.name,
    action: i.action || t.action,
    onSuccess: function(l) {
      t.onSuccess && t.onSuccess(l, r), delete n.reqs[a];
    },
    onProgress: function(l) {
      t.onProgress && t.onProgress(l, r);
    },
    onError: function(l) {
      t.onError && t.onError(l, r), delete n.reqs[a];
    }
  };
}, NI = function(e) {
  var t = e.service, n = e.props, r = e.options, i = e.rawFile, a = e.state, s = e.uid, l = e.uploaderInner, u = e.api, c = e.constants;
  if (t && t.network && n.httpRequest === t.network.request) {
    r.method = "post", r.url = r.action, r.onUploadProgress = function(f) {
      n.onProgress && n.onProgress(f, i);
    }, delete r.action, delete r.onProgress;
    var d = new FormData(), p = t.network.CancelToken.source();
    r.cancelToken = p.token, a.cancelToken[s] = p.cancel, l.edm.upload && (!i.isLargeFile && (r.method = "put"), r.data = r.data || {}), r.data && Object.keys(r.data).forEach(function(f) {
      d.append(f, r.data[f]);
    }), Array.isArray(i) ? i.forEach(function(f) {
      return d.append(f.name, f.raw || f);
    }) : a.isEdm ? u.getFormData({
      formData: d,
      file: i,
      type: i.isLargeFile ? "" : c.EDM.SINGLEUPLOAD
    }) : d.append(r.filename, i, i.name), r.data = d;
  }
}, FI = function(e) {
  var t = e.state, n = e.props, r = e.rawFile, i = e.uploaderInner, a = e.uid, s = i.edm, l = s && s.upload && s.upload.params || {};
  return Object.assign({
    edmAuth: {
      edmToken: n.edmToken.edmToken,
      appId: i.hwh5.appId
    },
    filePath: r.filePath,
    progress: 1
  }, l, {
    onProgress: function(c) {
      n.onProgress(c, r);
    },
    onSuccess: function(c) {
      n.onSuccess(c, r), delete t.reqs[a];
    },
    onError: function(c) {
      n.onError(c, r), delete t.reqs[a];
    }
  });
}, RI = function(e) {
  var t = e.api, n = e.constants, r = e.props, i = e.state, a = e.service;
  return function(s) {
    var l = s.uid, u = i.uploader.$refs[n.FILE_UPLOAD_INNER_TEMPLATE], c;
    u.state.isHwh5 ? c = FI({
      state: i,
      props: r,
      rawFile: s,
      uploaderInner: u,
      uid: l
    }) : (c = LI({
      props: r,
      state: i,
      rawFile: s,
      uploaderInner: u,
      uid: l
    }), NI({
      service: a,
      props: r,
      options: c,
      rawFile: s,
      state: i,
      uid: l,
      uploaderInner: u,
      api: t,
      constants: n
    }));
    var d = function(f) {
      if (r.httpRequest) {
        var m = r.httpRequest(f);
        i.reqs[l] = m, m && m.then && m.then(f.onSuccess, f.onError);
      }
    };
    s.isLargeFile ? a.common.getChunkMergeUrl().then(function(p) {
      c.url = p, d(c);
    }) : d(c);
  };
}, VI = function(e) {
  var t = e.props, n = e.refs, r = e.state;
  return function(i, a) {
    if (!(t.disabled || t.displayOnly || r.isStopPropagation)) {
      var s = r.uploader, l = r.uploadInner, u = s.encryptConfig, c = u === void 0 ? {} : u, d = l.$parent, p = function() {
        typeof t.handleTriggerClick == "function" && t.handleTriggerClick(i, a), !t.isHwh5 && (n.input.value = null, r.isStopPropagation = !0, n.input.click(), r.isStopPropagation = !1);
      };
      if (typeof s.beforeAddFile == "function") {
        i.preventDefault();
        var f, m = s.beforeAddFile(function() {
          !f && p();
        });
        f = m && typeof m.then == "function", f ? m.then(function() {
          return p();
        }).catch(function() {
          return null;
        }) : m && p();
      } else
        c && c.enabled && d ? (d.state.encryptDialogConfig.show = !0, d.state.encryptDialogConfig.selectFileMethod = function() {
          p();
        }) : p();
    }
  };
}, UI = function(e) {
  return function(t) {
    t.target === t.currentTarget && (t.keyCode === ie.Enter || t.keyCode === ie.Space) && e.handleClick(t, "");
  };
}, HI = function(e) {
  var t = e.props, n = e.state;
  return function(r) {
    !t.disabled && n.updateInput && (n.updateInput.value = "", n.updateId = r.docId, n.updateInput.click());
  };
}, $I = function(e) {
  var t = e.state, n = e.props, r = e.api;
  return function() {
    var i = document.createElement("input");
    i.type = "file", i.name = n.name, i.accept = n.accept || "", i.onchange = r.handleChange, t.updateInput = Object.freeze(i);
  };
}, zI = function(e) {
  return function() {
    e.updateInput = null;
  };
}, _s = ["state", "isImage", "handleChange", "handlePaste", "uploadFiles", "upload", "abort", "post", "handleClick", "handleKeydown", "handleUpdate"], el = function(e, t, n, r) {
  var i = t.computed, a = t.inject, s = t.reactive, l = t.onMounted, u = t.onBeforeUnmount, c = n.refs, d = n.service, p = n.t, f = n.useBreakpoint, m = r.Modal, h = {}, v = a("uploader"), g = v.$constants, b = f(), y = b.current, S = s({
    currentBreakpoint: y,
    mouseover: !1,
    reqs: {},
    uploader: v,
    accecpt: "",
    uploadInner: i(function() {
      return S.uploader.$refs[g.FILE_UPLOAD_INNER_TEMPLATE];
    }),
    isEdm: i(function() {
      return S.uploadInner.state.isEdm;
    }),
    openEdmDownload: i(function() {
      return S.uploadInner.edm.download;
    }),
    headers: i(function() {
      if (S.isEdm)
        return ne(ne({}, g.EDM.EDMTOKEN, e.edmToken.edmToken || ""), g.EDM.TRACEID, e.edmToken.traceId || "");
    }),
    formData: {},
    cancelToken: {},
    updateId: "",
    updateInput: null,
    isStopPropagation: !1
  });
  return Object.assign(h, {
    state: S,
    isImage: EI,
    abort: OI({
      state: S,
      props: e,
      constants: g
    }),
    getFormData: xI({
      state: S,
      constants: g,
      props: e
    }),
    handleClick: VI({
      props: e,
      refs: c,
      state: S
    }),
    onBeforeDestroy: zI(S),
    handleUpdate: HI({
      state: S,
      props: e
    }),
    uploadFiles: PI({
      constants: g,
      Modal: m,
      props: e,
      state: S,
      t: p
    }),
    post: RI({
      api: h,
      constants: g,
      props: e,
      state: S,
      service: d
    }),
    handleChange: DI(h),
    handlePaste: BI({
      api: h,
      props: e
    }),
    handleKeydown: UI(h),
    upload: MI({
      api: h,
      props: e,
      refs: c
    }),
    mounted: $I({
      state: S,
      props: e,
      api: h
    })
  }), l(h.mounted), u(h.onBeforeDestroy), h;
}, jI = function(e) {
  var t = e.props, n = e.state;
  return function() {
    return !t.disabled && (n.dragover = !0);
  };
}, WI = function(e) {
  var t = e.emit, n = e.props, r = e.state;
  return function(i) {
    var a;
    if (!(n.disabled || !r.uploader)) {
      var s = r.uploader.accept;
      r.dragover = !1;
      var l = (a = i.dataTransfer) === null || a === void 0 ? void 0 : a.files;
      if (!s) {
        t("file", l);
        return;
      }
      var u = [];
      l && (Array.from(l).filter(function(c) {
        var d = c.type, p = c.name, f = p.includes(".") ? ".".concat(p.split(".").pop()) : "", m = d.replace(/\/.*$/, ""), h = s.split(",").map(function(v) {
          return v.trim();
        }).filter(function(v) {
          return v;
        }).some(function(v) {
          return /\..+$/.test(v) ? f === v : /\/\*$/.test(v) ? m === v.replace(/\/\*$/, "") : !!/^[^/]+\/[^/]+$/.test(v);
        });
        return !h && u.push(c), h;
      }), u.length && r.uploader.$emit("drop-error", u)), t("file", l);
    }
  };
}, GI = function(e) {
  var t = e.state, n = e.constants;
  return function() {
    t.uploader.$refs[n.FILE_UPLOAD_INNER_TEMPLATE].$emit("drag-over", t.dragover);
  };
}, tl = ["state", "onDragOver", "onDrop"], nl = function(e, t, n) {
  var r = t.inject, i = t.reactive, a = t.ref, s = t.watch, l = n.emit, u = i({
    dragover: !1,
    uploader: r("uploader") || a({
      default: ""
    })
  }), c = u.uploader.$constants || {}, d = {
    state: u,
    onDragOver: jI({
      props: e,
      state: u
    }),
    onDrop: WI({
      emit: l,
      props: e,
      state: u
    }),
    watchDragover: GI({
      state: u,
      constants: c
    })
  };
  return s(function() {
    return u.dragover;
  }, function() {
    return d.watchDragover();
  }), d;
};
const YI = B({
  name: O + "UploadDragger",
  emits: ["file"],
  props: {
    ...j,
    disabled: Boolean
  },
  setup(o, e) {
    return z({ props: o, context: e, renderless: nl, api: tl, mono: !0 });
  }
});
function KI(o, e, t, n, r, i) {
  return A(), w(
    "div",
    {
      class: P(["tiny-upload-dragger", { "is-dragover": o.state.dragover }]),
      onDrop: e[0] || (e[0] = te((...a) => o.onDrop && o.onDrop(...a), ["prevent"])),
      onDragover: e[1] || (e[1] = te((...a) => o.onDragOver && o.onDragOver(...a), ["prevent"])),
      onDragleave: e[2] || (e[2] = te((a) => o.state.dragover = !1, ["prevent"]))
    },
    [
      F(o.$slots, "default")
    ],
    34
    /* CLASS, NEED_HYDRATION */
  );
}
const _i = /* @__PURE__ */ W(YI, [["render", KI]]), QI = B({
  name: O + "UploadDragger",
  emits: ["file"],
  props: [...Q, "disabled", "customClass"],
  setup(o, e) {
    return z({ props: o, context: e, renderless: nl, api: tl });
  }
});
function XI(o, e, t, n, r, i) {
  return A(), w(
    "div",
    {
      "data-tag": "tiny-upload-dragger",
      class: P(
        o.m(
          "min-w-[theme(spacing.72)] min-h-[theme(spacing.40)] border border-dashed rounded",
          o.state.dragover ? "border-color-brand" : "border-color-none-hover",
          o.customClass
        )
      ),
      onDrop: e[0] || (e[0] = te((...a) => o.onDrop && o.onDrop(...a), ["prevent"])),
      onDragover: e[1] || (e[1] = te((...a) => o.onDragOver && o.onDragOver(...a), ["prevent"])),
      onDragleave: e[2] || (e[2] = te((a) => o.state.dragover = !1, ["prevent"]))
    },
    [
      F(o.$slots, "default")
    ],
    34
    /* CLASS, NEED_HYDRATION */
  );
}
const ZI = /* @__PURE__ */ W(QI, [["render", XI]]);
var JI = function(e) {
  var t, n = (typeof process > "u" ? "undefined" : R(process)) === "object" ? (t = process.env) === null || t === void 0 ? void 0 : t.TINY_MODE : null;
  return (n || e) === "pc" ? _i : (n || e) === "mobile-first" ? ZI : _i;
}, qI = C(C({}, j), {}, {
  disabled: Boolean,
  customClass: [String, Object, Array]
});
const Mt = B({
  name: O + "UploadDragger",
  props: qI,
  setup: function(e, t) {
    return K({
      props: e,
      context: t,
      template: JI
    });
  }
}), _I = "3.20.0";
Mt.install = function(o) {
  o.component(Mt.name, Mt);
};
Mt.version = _I;
function ek(o) {
  return typeof o == "function" || Object.prototype.toString.call(o) === "[object Object]" && !Aa(o);
}
const ea = /* @__PURE__ */ B({
  inheritAttrs: !1,
  name: O + "Upload",
  props: [...Q, "accept", "action", "autoUpload", "beforeUpload", "pasteUpload", "data", "disabled", "drag", "edmToken", "fileList", "headers", "httpRequest", "isFolder", "limit", "listType", "multiple", "name", "onError", "onExceed", "onPreview", "onProgress", "onRemove", "onStart", "onSuccess", "type", "withCredentials", "isHidden", "handleTriggerClick"],
  setup(o, e) {
    return z({
      props: o,
      context: e,
      renderless: el,
      api: _s,
      h: J,
      extendOptions: {
        Modal: ce
      }
    });
  },
  render() {
    let {
      accept: o,
      disabled: e,
      drag: t,
      handleChange: n,
      handleClick: r,
      handlePaste: i,
      handleKeydown: a,
      isFolder: s,
      listType: l,
      multiple: u,
      name: c,
      uploadFiles: d,
      fileList: p,
      limit: f,
      isHidden: m,
      type: h
    } = this;
    const v = this.slots.default && this.slots.default() || [], g = this.slots.operate && this.slots.operate(), b = this.slots.tip && this.slots.tip();
    return !(m && p.length >= f) && D("div", {
      class: ["tiny-upload", `tiny-upload--${l}`, e ? "is-disabled" : ""]
    }, [D("div", {
      class: "tiny-upload-btn",
      onClick: (S) => r(S, h),
      onPaste: i,
      onKeydown: a,
      tabindex: "0"
    }, [t ? D(Mt, {
      disabled: e,
      onFile: d
    }, ek(v) ? v : {
      default: () => [v]
    }) : v]), g, b, D("input", {
      class: "tiny-upload__input",
      type: "file",
      webkitdirectory: s,
      ref: "input",
      name: c,
      onChange: n,
      multiple: s ? !0 : u,
      accept: o
    }, null)]);
  }
});
function ta(o, e, t, n) {
  var r, i = 0;
  typeof e != "boolean" && (n = t, t = e, e = void 0);
  function a() {
    var l = this, u = (/* @__PURE__ */ new Date()).valueOf() - i, c = arguments;
    function d() {
      i = (/* @__PURE__ */ new Date()).valueOf(), t.apply(l, c);
    }
    function p() {
      r = void 0;
    }
    n && !r && d(), r && clearTimeout(r);
    var f = n === void 0;
    f && u > o ? d() : e !== !0 && (r = setTimeout(n ? p : d, f ? o - u : o));
  }
  function s() {
    r && (clearTimeout(r), r = null);
  }
  return a._cancel = s, a;
}
function tk(o, e, t) {
  return t === void 0 ? ta(o, e, !1) : ta(o, t, e !== !1);
}
var nk = function(e) {
  var t = e.api, n = e.state, r = e.props;
  return function(i) {
    var a = 200, s = i && i.type === "mouseenter" ? a : 0;
    if (r.visible === "auto") {
      var l = n.referenceElm, u = l.clientWidth, c = l.scrollWidth;
      if (c <= u)
        return;
    }
    t.setExpectedState(!0), t.handleShowPopper(s);
  };
}, ok = function(e) {
  return function() {
    e.setExpectedState(!1), e.debounceClose();
  };
}, rk = function(e) {
  var t = e.api, n = e.state;
  return function() {
    n.focusing = !0, t.show();
  };
}, ik = function(e) {
  var t = e.api, n = e.state;
  return function() {
    n.focusing = !1, t.hide();
  };
}, ak = function(e) {
  var t = e.api, n = e.state;
  return function() {
    n.focusing = !1, t.show();
  };
}, sk = function(e) {
  var t = e.props, n = e.state;
  return function(r) {
    !n.expectedState || t.manual || (clearTimeout(n.timeout), n.timeout = window.setTimeout(function() {
      n.showPopper = !0;
    }, t.openDelay || r), t.hideAfter > 0 && (n.timeoutPending = window.setTimeout(function() {
      n.showPopper = !1;
    }, t.hideAfter)));
  };
}, lk = function(e) {
  var t = e.api, n = e.props, r = e.state;
  return function() {
    n.enterable && r.expectedState || n.manual || (clearTimeout(r.timeout), r.timeoutPending && clearTimeout(r.timeoutPending), r.showPopper = !1, n.disabled && t.doDestroy());
  };
}, uk = function(e) {
  var t = e.props, n = e.api, r = e.state, i = e.popperVmRef;
  return function(a) {
    if (!t.manual) {
      var s = r.referenceElm, l = i.popper;
      !l || !s || l.contains(a.target) || s.contains(a.target) || r.showPopper && (n.setExpectedState(!1), n.debounceClose());
    }
  };
}, ck = function(e) {
  var t = e.state;
  return function(n) {
    t.expectedState === !1 && clearTimeout(t.timeoutPending), t.expectedState = n;
  };
}, dk = function(e) {
  var t = e.state, n = e.api, r = e.vm;
  return function() {
    var i = t.referenceElm;
    t.showPopper = !1, i && i.nodeType === 1 && (U(document, "click", n.handleDocumentClick), U(i, "mouseenter", n.show), U(i, "mouseleave", n.hide), U(i, "focus", n.focusHandler), U(i, "blur", n.handleBlur), U(i, "click", n.removeFocusing)), r.popperVM && (typeof r.popperVM.$destroy == "function" && r.popperVM.$destroy(), r.popperVM = null);
  };
}, pk = function(e) {
  var t = e.api, n = e.props;
  return tk(n.closeDelay, function() {
    t.handleClosePopper();
  });
}, fk = function(e) {
  return function(t) {
    t ? ve(e.referenceElm, "focusing") : ge(e.referenceElm, "focusing");
  };
}, mk = function(e) {
  var t = e.slots, n = e.api;
  return function() {
    if (!t.default || !t.default().length) {
      n.handleFocus();
      return;
    }
    var r = t.default()[0];
    r = r.elm || r.el, r && r.focus ? r.focus() : n.handleFocus();
  };
}, vk = function(e) {
  var t = e.api, n = e.state, r = e.vm;
  return function(i) {
    var a = null;
    r.$el.nodeType === 8 ? a = i : r.$el.nodeType === 1 && (a = r.$el), !(!a || a.nodeType === 8 || n.referenceElm) && (n.referenceElm = a, a.setAttribute("aria-describedby", n.tooltipId), a.setAttribute("tabindex", n.tabindex.toString()), N(document, "click", t.handleDocumentClick), N(a, "mouseenter", t.show), N(a, "mouseleave", t.hide), N(a, "focus", t.focusHandler), N(a, "blur", t.handleBlur), N(a, "click", t.removeFocusing));
  };
}, hk = function(e) {
  var t = e.state, n = e.popperVmRef;
  return function(r) {
    var i = $r(r), a;
    try {
      for (i.s(); !(a = i.n()).done; ) {
        var s = a.value;
        s.type === "attributes" && s.attributeName === "x-placement" && (t.xPlacement = n.popper.getAttribute("x-placement") || "bottom");
      }
    } catch (l) {
      i.e(l);
    } finally {
      i.f();
    }
  };
}, gk = function(e) {
  var t = e.vm, n = e.nextTick, r = e.popperVmRef;
  return function(i) {
    n(function() {
      return t.bindEvent(i);
    });
    var a = t.popperVM;
    t.$refs.popper ? r.popper = t.$refs.popper : r.popper = a.$el, n(function() {
      t.modelValue && t.updatePopper();
    });
  };
}, ol = ["state", "bindEvent", "hide", "show", "doDestroy", "handleFocus", "debounceClose", "handleShowPopper", "handleClosePopper", "setExpectedState", "updatePopper", "focusHandler"], Ak = function(e) {
  var t = e.reactive, n = e.showPopper, r = e.popperElm, i = e.referenceElm, a = e.props, s = e.inject, l = e.popperJS, u = e.currentPlacement;
  return t({
    popperJS: l,
    showPopper: n,
    popperElm: r,
    referenceElm: i,
    currentPlacement: u,
    timeout: null,
    focusing: !1,
    expectedState: void 0,
    tooltipId: fs("tiny-tooltip-", 4),
    tabindex: a.tabindex,
    xPlacement: "bottom",
    showContent: s("showContent", null),
    tipsMaxWidth: s("tips-max-width", null)
  });
}, rl = function(e, t, n) {
  var r = t.watch, i = t.toRefs, a = t.reactive, s = t.onBeforeUnmount, l = t.onDeactivated, u = t.onMounted, c = t.onUnmounted, d = t.inject, p = n.vm, f = n.emit, m = n.slots, h = n.nextTick, v = n.parent, g = {}, b = {}, y = {
    emit: f,
    props: e,
    nextTick: h,
    toRefs: i,
    reactive: a,
    parent: v.$parent,
    vm: p,
    popperVmRef: b
  };
  Object.assign(y, {
    slots: m,
    onBeforeUnmount: s,
    onDeactivated: l,
    watch: r
  });
  var S = ni(y), I = S.showPopper, k = S.updatePopper, E = S.popperElm, L = S.referenceElm, V = S.doDestroy, Y = S.popperJS, X = S.currentPlacement, _ = Ak({
    reactive: a,
    showPopper: I,
    popperElm: E,
    referenceElm: L,
    props: e,
    inject: d,
    popperJS: Y,
    currentPlacement: X
  });
  return Object.assign(g, {
    state: _,
    doDestroy: V,
    updatePopper: k,
    show: nk({
      api: g,
      state: _,
      props: e
    }),
    hide: ok(g),
    destroyed: dk({
      state: _,
      api: g,
      vm: p
    }),
    bindPopper: gk({
      vm: p,
      nextTick: h,
      popperVmRef: b
    }),
    watchFocusing: fk(_),
    removeFocusing: ak({
      api: g,
      state: _
    }),
    handleBlur: ik({
      api: g,
      state: _
    }),
    handleFocus: rk({
      api: g,
      state: _
    }),
    debounceClose: pk({
      api: g,
      props: e
    }),
    setExpectedState: ck({
      state: _
    }),
    handleShowPopper: sk({
      props: e,
      state: _
    }),
    handleClosePopper: lk({
      api: g,
      props: e,
      state: _
    }),
    bindEvent: vk({
      api: g,
      state: _,
      vm: p
    }),
    focusHandler: mk({
      slots: m,
      api: g
    }),
    handleDocumentClick: uk({
      props: e,
      api: g,
      state: _,
      popperVmRef: b
    }),
    observeCallback: hk({
      state: _,
      popperVmRef: b
    })
  }), r(function() {
    return _.focusing;
  }, g.watchFocusing), r(function() {
    return e.modelValue;
  }, function(be) {
    return h(function() {
      return e.manual && (_.showPopper = be);
    });
  }), u(function() {
    if (g.bindPopper(), e.genArrowByHtml) {
      var be = {
        attributes: !0,
        childList: !1,
        subtree: !1
      };
      g.observer = new MutationObserver(g.observeCallback), g.observer.observe(b.popper, be);
    }
  }), p.$on("tooltip-update", g.bindPopper), c(function() {
    g.destroyed(), g.observer && g.observer.disconnect(), p.$off("tooltip-update");
  }), g;
};
const na = /* @__PURE__ */ B({
  name: O + "Tooltip",
  componentName: "Tooltip",
  props: {
    ...j,
    visible: {
      type: String,
      default: () => "always",
      validator: (o) => ["always", "auto"].includes(o)
    },
    adjustArrow: {
      type: Boolean,
      default: () => !1
    },
    appendToBody: {
      type: Boolean,
      default: () => !0
    },
    arrowOffset: {
      type: Number,
      default: () => 0
    },
    boundariesPadding: {
      type: Number,
      default: () => 5
    },
    closeDelay: {
      type: Number,
      default: () => 300
    },
    content: {
      type: [String, Object]
    },
    disabled: {
      type: Boolean
    },
    effect: {
      type: String,
      default: () => "dark"
    },
    enterable: {
      type: Boolean,
      default: () => !0
    },
    hideAfter: {
      type: Number,
      default: () => 0
    },
    manual: {
      type: Boolean
    },
    modelValue: {
      type: Boolean
    },
    offset: {
      default: () => 0
    },
    openDelay: {
      type: Number,
      default: () => 0
    },
    placement: {
      type: String,
      default: () => "bottom"
    },
    popper: {},
    popperClass: {
      type: String
    },
    popperOptions: {
      default: () => ({
        gpuAcceleration: !1,
        boundariesPadding: 10
      })
    },
    pre: {
      type: Boolean
    },
    reference: {},
    renderContent: {
      type: Function
    },
    tabindex: {
      type: Number,
      default: () => 0
    },
    transition: {
      type: String,
      default: () => "tiny-fade-in-linear"
    },
    type: {
      type: String,
      validator: (o) => !!~["normal", "warning", "error", "info", "success"].indexOf(o)
    },
    visibleArrow: {
      type: Boolean,
      default: () => !0
    },
    zIndex: {
      type: String,
      default: () => "next"
    },
    contentMaxHeight: {
      type: String
    }
  },
  setup(o, e) {
    return z({
      props: o,
      context: e,
      renderless: rl,
      api: ol
    });
  },
  render() {
    const o = (r) => {
      let i = r.slots.content && r.slots.content();
      if (i && (!kn.Comment || i[0].type !== kn.Comment))
        return i;
      let a;
      return r.renderContent ? a = r.renderContent(J, r.content) : r.pre ? a = r.content ? J("pre", r.content) : null : a = r.content, a;
    };
    if (!Object.prototype.hasOwnProperty.call(this, "popperVM")) {
      const r = {
        value: null
      };
      this.d({
        popperVM: {
          get: () => (r.value || (r.value = vn({
            el: document.createElement("div"),
            propsData: null,
            component: {
              render: () => {
                const i = o(this), a = typeof i == "string", s = {
                  attrs: {
                    name: this.transition
                  },
                  on: {
                    "after-leave": this.doDestroy
                  }
                }, l = "is-" + (this.type || this.effect || "dark"), u = () => this.setExpectedState(!0), c = () => {
                  this.setExpectedState(!1), this.debounceClose();
                };
                return this.$nextTick(() => {
                  !this.disabled && this.state.showPopper && i && this.updatePopper();
                }), J("transition", s, [oe(D("div", {
                  ref: "popper",
                  id: this.state.tooltipId,
                  class: ["tiny-tooltip", "tiny-tooltip__popper", l, this.popperClass, {
                    "tiny-tooltip__show-tips": this.state.showContent
                  }],
                  style: `max-width:${this.state.tipsMaxWidth}px`,
                  role: "tooltip",
                  "aria-hidden": this.disabled || !this.state.showPopper ? "true" : "false",
                  onMouseenter: () => u(),
                  onMouseleave: () => c()
                }, [a ? D("div", {
                  class: "tiny-tooltip__content-wrapper",
                  style: `max-height:${this.contentMaxHeight}`
                }, [i]) : i]), [[he, !this.disabled && this.state.showPopper && i]])]);
              }
            }
          })), r.value),
          set: (i) => r.value = i
        }
      });
    }
    const t = (() => {
      const r = this.slots.default && this.slots.default();
      if (!Array.isArray(r))
        return null;
      let i = null;
      for (let a = 0; a < r.length; a++) {
        const s = va(r[a]);
        if (!ha(s)) {
          i = s;
          break;
        }
      }
      return i;
    })();
    if (!t)
      return null;
    const n = t.data || t.props || (t.props = {});
    return n.class = yl("tiny-tooltip " + bl(n.class)), t;
  }
});
var De = {
  tooltip: "absolute bg-color-text-primary text-color-text-inverse shadow-none -left-[9999px] py-2 px-3 sm:py-1.5 sm:px-2 text-sm sm:text-xs leading-tight min-w-[theme(spacing.12)] max-w-[theme(spacing.80)] sm:max-w-[theme(spacing.112)] z-[2000] break-words rounded [&[x-placement^=top]]:mb-2.5 [&[x-placement^=bottom]]:mt-2.5 [&[x-placement^=right]]:ml-2.5 [&[x-placement^=left]]:mr-2.5",
  "tooltip-sm": "sm:bg-color-bg-1 sm:text-color-text-primary sm:shadow-md",
  arrow: 'drop-shadow-none absolute block w-0 h-0 border-[0.375rem] border-transparent border-solid after:absolute after:block after:w-0 after:h-0 after:border-[0.3125rem] after:border-transparent after:border-solid after:content-[""]',
  "placement-top": "-bottom-3 border-t-color-text-primary border-b-w-0 after:-bottom-1 after:-ml-1.5 after:border-t-color-text-primary after:border-b-w-0",
  "placement-bottom": "-top-3 border-t-w-0 border-b-color-text-primary after:-top-1 after:-ml-1.5 after:border-t-w-0 after:border-b-color-text-primary",
  "placement-right": "-left-3 border-r-color-text-primary border-l-w-0 after:-bottom-1 after:-left-1 after:border-r-color-text-primary after:border-l-w-0",
  "placement-left": "-right-1.5 border-l-color-text-primary border-r-0 after:-bottom-1 after:right-px after:-ml-1.5 after:border-l-color-text-primary after:border-r-0",
  "placement-top-sm": "sm:drop-shadow-[0_2px_2px_rgba(0,0,0,0.08)] sm:border-t-color-bg-1 sm:after:border-t-color-bg-1",
  "placement-bottom-sm": "sm:drop-shadow-[0_-2px_2px_rgba(0,0,0,0.08)] sm:border-b-color-bg-1 sm:after:border-b-color-bg-1",
  "placement-right-sm": "sm:drop-shadow-[-2px_0px_2px_rgba(0,0,0,0.08)] sm:border-r-color-bg-1 sm:after:border-r-color-bg-1",
  "placement-left-sm": "sm:drop-shadow-[2px_0_2px_rgba(0,0,0,0.08)] sm:border-l-color-bg-1 sm:after:border-l-color-bg-1",
  "placement-top-light": "border-t-color-bg-1 drop-shadow-[0_2px_2px_rgba(0,0,0,0.08)] after:border-t-color-bg-1",
  "placement-bottom-light": "border-b-color-bg-1 drop-shadow-[0_-2px_2px_rgba(0,0,0,0.08)] after:border-b-color-bg-1",
  "placement-left-light": "border-l-color-bg-1 drop-shadow-[2px_0_2px_rgba(0,0,0,0.08)] after:border-l-color-bg-1",
  "placement-right-light": "border-r-color-bg-1 drop-shadow-[-2px_0px_2px_rgba(0,0,0,0.08)] after:border-r-color-bg-1",
  "placement-top-dark": "border-t-color-text-primary after:border-t-color-text-primary",
  "placement-bottom-dark": "border-b-color-text-primary after:border-b-color-text-primary",
  "placement-left-dark": "border-l-color-text-primary after:border-l-color-text-primary",
  "placement-right-dark": "border-r-color-text-primary after:border-r-color-text-primary",
  "effect-dark": "bg-color-text-primary text-color-text-inverse shadow-none",
  "effect-light": "bg-color-bg-1 text-color-text-primary shadow-md",
  "is-warning": "text-color-text-inverse bg-color-warning border-color-warning",
  "is-error": "text-color-text-inverse bg-color-error border-color-error",
  "is-info": "text-color-text-inverse bg-color-info-secondary border-color-info-secondary",
  "is-success": "text-color-text-inverse bg-color-success border-color-success",
  "arrow-top-warning": "border-t-color-warning after:border-t-color-warning",
  "arrow-bottom-warning": "border-b-color-warning after:border-b-color-warning",
  "arrow-left-warning": "border-l-color-warning after:border-l-color-warning",
  "arrow-right-warning": "border-r-color-warning after:border-r-color-warning",
  "arrow-top-error": "border-t-color-error after:border-t-color-error",
  "arrow-bottom-error": "border-b-color-error after:border-b-color-error",
  "arrow-left-error": "border-l-color-error after:border-l-color-error",
  "arrow-right-error": "border-r-color-error after:border-r-color-error",
  "arrow-top-info": "border-t-color-info-secondary after:border-t-color-info-secondary",
  "arrow-bottom-info": "border-b-color-info-secondary after:border-b-color-info-secondary",
  "arrow-left-info": "border-l-color-info-secondary after:border-l-color-info-secondary",
  "arrow-right-info": "border-r-color-info-secondary after:border-r-color-info-secondary",
  "arrow-top-success": "border-t-color-success after:border-t-color-success",
  "arrow-bottom-success": "border-b-color-success after:border-b-color-success",
  "arrow-left-success": "border-l-color-success after:border-l-color-success",
  "arrow-right-success": "border-r-color-success after:border-r-color-success"
};
const yk = /* @__PURE__ */ B({
  name: O + "Tooltip",
  componentName: "Tooltip",
  props: {
    ...j,
    adjustArrow: {
      type: Boolean,
      default: () => !1
    },
    appendToBody: {
      type: Boolean,
      default: () => !0
    },
    arrowOffset: {
      type: Number,
      default: () => 0
    },
    boundariesPadding: {
      type: Number,
      default: () => 5
    },
    closeDelay: {
      type: Number,
      default: () => 100
    },
    content: {
      type: String
    },
    disabled: {
      type: Boolean
    },
    effect: {
      type: String,
      default: () => ""
    },
    enterable: {
      type: Boolean,
      default: () => !0
    },
    hideAfter: {
      type: Number,
      default: () => 0
    },
    manual: {
      type: Boolean
    },
    modelValue: {
      type: Boolean
    },
    offset: {
      default: () => 0
    },
    openDelay: {
      type: Number,
      default: () => 0
    },
    placement: {
      type: String,
      default: () => "bottom"
    },
    popper: {},
    popperClass: {
      type: String
    },
    popperOptions: {
      default: () => ({
        gpuAcceleration: !1,
        boundariesPadding: 10
      })
    },
    pre: {
      type: Boolean
    },
    reference: {},
    renderContent: {
      type: Function
    },
    tabindex: {
      type: Number,
      default: () => 0
    },
    transformOrigin: {
      type: [Boolean, String],
      default: () => !0
    },
    type: {
      type: String,
      validator: (o) => ~["normal", "warning", "error", "info", "success"].indexOf(o)
    },
    visibleArrow: {
      type: Boolean,
      default: () => !0
    },
    genArrowByHtml: {
      type: Boolean,
      default: () => !0
    },
    zIndex: {
      type: String,
      default: () => "next"
    }
  },
  setup(o, e) {
    return z({
      props: o,
      context: e,
      renderless: rl,
      api: ol
    });
  },
  render() {
    const o = (a) => {
      let s = a.slots.content && a.slots.content();
      if (s)
        return s;
      let l;
      return a.renderContent ? l = a.renderContent(J, a.content) : a.pre ? l = a.content ? J("pre", {
        class: "whitespace-pre-wrap"
      }, a.content) : null : l = a.content, l;
    };
    if (!Object.hasOwnProperty.call(this, "popperVM")) {
      const a = {
        value: null
      };
      this.d({
        popperVM: {
          get: () => (a.value || (a.value = vn({
            el: document.createElement("div"),
            component: {
              render: () => {
                let s = o(this), l = {
                  on: {
                    "after-leave": this.doDestroy
                  }
                }, u = () => this.setExpectedState(!0), c = () => {
                  this.setExpectedState(!1), this.debounceClose();
                };
                const d = this.state.xPlacement || "";
                return J("transition", l, [oe(D("div", {
                  "data-tag": "tiny-tooltip",
                  ref: "popper",
                  id: this.state.tooltipId,
                  appendToBody: this.appendToBody,
                  class: si([De.tooltip, !this.effect && !this.type && De["tooltip-sm"], this.effect && De[`effect-${this.effect}`], this.type && De[`is-${this.type}`], this.disabled || !this.state.showPopper ? "hidden" : "", this.popperClass]),
                  role: "tooltip",
                  "aria-hidden": this.disabled || !this.state.showPopper ? "true" : "false",
                  onMouseenter: () => u(),
                  onMouseleave: () => c()
                }, [s, this.visibleArrow ? D("div", {
                  "x-arrow": !0,
                  class: si([De.arrow, De["placement-" + d.split("-")[0]], !this.effect && !this.type && De["placement-" + d.split("-")[0] + "-sm"], this.effect === "light" ? De["placement-" + d.split("-")[0] + "-light"] : "", this.effect === "dark" ? De["placement-" + d.split("-")[0] + "-dark"] : "", this.type ? De[`arrow-${d.split("-")[0]}-${this.type}`] : ""])
                }, null) : ""]), [[he, !this.disabled && this.state.showPopper && s]])]);
              }
            }
          })), a.value),
          set: (s) => a.value = s
        }
      });
    }
    const e = (a, s) => {
      const l = (p) => p && p.trim(), u = (p) => {
        const f = [];
        return p.forEach((m) => {
          m && typeof m == "string" ? f.push(l(m)) : m && typeof m == "object" && f.push(c(m));
        }), f.join(" ");
      }, c = (p) => {
        const f = [];
        return Object.keys(p).forEach((m) => {
          p[m] && f.push(m);
        }), f.join(" ");
      };
      let d = "";
      return a && (typeof a == "string" ? d = d + l(a) : Array.isArray(a) ? d = d + u(a) : typeof a == "object" && (d = d + c(a))), l(d.replace(s, ""));
    }, t = (a) => "tiny-tooltip " + e(a, /\btiny-tooltip\b/g), r = (() => {
      const a = this.slots.default && this.slots.default();
      if (!Array.isArray(a))
        return null;
      let s = null;
      for (let l = 0; l < a.length; l++) {
        const u = va(a[l]);
        if (!ha(u)) {
          s = u;
          break;
        }
      }
      return s;
    })();
    if (!r)
      return null;
    const i = r.data || r.props || (r.props = {});
    return i.class = t(i.class), r;
  }
});
var bk = function(e) {
  var t, n = (typeof process > "u" ? "undefined" : R(process)) === "object" ? (t = process.env) === null || t === void 0 ? void 0 : t.TINY_MODE : null;
  return (n || e) === "pc" ? na : (n || e) === "mobile-first" ? yk : na;
}, Sk = C(C({}, j), {}, {
  visible: {
    type: String,
    default: function() {
      return "always";
    },
    validator: function(e) {
      return ["always", "auto"].includes(e);
    }
  },
  adjustArrow: {
    type: Boolean,
    default: function() {
      return !1;
    }
  },
  appendToBody: {
    type: Boolean,
    default: function() {
      return !0;
    }
  },
  arrowOffset: {
    type: Number,
    default: function() {
      return 0;
    }
  },
  content: {
    type: [String, Object]
  },
  disabled: {
    type: Boolean
  },
  enterable: {
    type: Boolean,
    default: function() {
      return !0;
    }
  },
  hideAfter: {
    type: Number,
    default: function() {
      return 0;
    }
  },
  manual: {
    type: Boolean
  },
  modelValue: {
    type: Boolean
  },
  offset: {
    default: function() {
      return 0;
    }
  },
  effect: {
    type: String,
    default: function() {
      return "";
    }
  },
  openDelay: {
    type: Number,
    default: function() {
      return 0;
    }
  },
  closeDelay: {
    type: Number,
    default: function() {
      return 100;
    }
  },
  placement: {
    type: String,
    default: function() {
      return "bottom";
    }
  },
  popper: {},
  popperClass: {
    type: String
  },
  popperOptions: {
    default: function() {
      return {};
    }
  },
  pre: {
    type: Boolean
  },
  reference: {},
  renderContent: {
    type: Function
  },
  tabindex: {
    type: Number,
    default: function() {
      return 0;
    }
  },
  transition: {
    type: String,
    default: function() {
      return "tiny-fade-in-linear";
    }
  },
  type: {
    type: String,
    validator: function(e) {
      return !!~["normal", "warning", "error", "info", "success"].indexOf(e);
    }
  },
  visibleArrow: {
    type: Boolean,
    default: function() {
      return !0;
    }
  },
  genArrowByHtml: {
    type: Boolean,
    default: function() {
      return !0;
    }
  },
  zIndex: {
    type: String,
    default: function() {
      return "next";
    }
  },
  contentMaxHeight: {
    type: String
  }
});
const rn = B({
  name: O + "Tooltip",
  componentName: "Tooltip",
  props: Sk,
  setup: function(e, t) {
    return K({
      props: e,
      context: t,
      template: bk
    });
  }
}), wk = "3.20.0";
rn.model = {
  prop: "modelValue",
  event: "update:modelValue"
};
rn.install = function(o) {
  o.component(rn.name, rn);
};
rn.version = wk;
function lr(o) {
  return typeof o == "function" || Object.prototype.toString.call(o) === "[object Object]" && !Aa(o);
}
const Tk = /* @__PURE__ */ B({
  inheritAttrs: !1,
  name: O + "Upload",
  components: {
    TinyTooltip: rn,
    TinyIconHelpCircle: Wl()
  },
  props: [...Q, "accept", "action", "autoUpload", "beforeUpload", "data", "disabled", "drag", "edmToken", "fileList", "headers", "httpRequest", "isFolder", "limit", "listType", "multiple", "name", "onError", "onExceed", "onPreview", "onProgress", "onRemove", "onStart", "onSuccess", "type", "withCredentials", "scale", "sourceType", "displayOnly", "customClass", "handleTriggerClick", "mode", "showTitle", "isHwh5", "tipMessage", "promptTip", "showFileList"],
  setup(o, e) {
    return z({
      props: o,
      context: e,
      renderless: el,
      api: _s,
      h: J,
      extendOptions: {
        Modal: ce
      }
    });
  },
  render() {
    let o, {
      accept: e,
      disabled: t,
      handleChange: n,
      handleClick: r,
      handleKeydown: i,
      isFolder: a,
      multiple: s,
      name: l,
      uploadFiles: u,
      listType: c,
      displayOnly: d,
      customClass: p,
      sourceType: f,
      mode: m,
      showTitle: h,
      state: v,
      tipMessage: g,
      promptTip: b,
      showFileList: y
    } = this;
    const S = this.slots.default && this.slots.default(), I = this.slots.tip && this.slots.tip(), k = this.slots.operate && this.slots.operate(), E = m === "bubble", L = h, V = {
      bubbling: !0
    }, Y = () => D("div", {
      "data-tag": "tiny-upload-drag-single",
      class: "h-full",
      onClick: (X) => r(X, f),
      onKeydown: i,
      tabindex: "0"
    }, [c === "drag-single" ? D(Mt, {
      customClass: p,
      disabled: t,
      onFile: u
    }, lr(S) ? S : {
      default: () => [S]
    }) : S]);
    return D("div", {
      "data-tag": "tiny-upload",
      class: [!d && c === "text" ? `flex justify-between mt-4 mb-2 ${E ? "sm:my-0" : L ? "sm:my-3" : "sm:mt-0"}` : "h-full", y ? "sm:mb-3" : "sm:mb-0"]
    }, [v.currentBreakpoint === "default" && I && D("div", {
      class: "flex items-center sm:hidden inline-block text-sm"
    }, [I]), v.currentBreakpoint === "default" && D("div", {
      "data-tag": "tiny-upload-drag-single",
      class: "h-full",
      onClick: (X) => r(X, f),
      onKeydown: i,
      tabindex: "0"
    }, [c === "drag-single" ? D(Mt, {
      customClass: p,
      disabled: t,
      onFile: u
    }, lr(S) ? S : {
      default: () => [S]
    }) : S]), v.currentBreakpoint !== "default" && (b && g ? D("div", {
      class: "hidden sm:inline-flex sm:items-center"
    }, [Y(), D($("tiny-tooltip"), {
      effect: "light",
      content: g,
      placement: "right",
      "popper-options": V
    }, {
      default: () => [D($("tiny-icon-help-circle"), {
        "custom-class": "ml-2 cursor-pointer fill-color-icon-tertiary"
      }, null)]
    })]) : c === "text" ? D("div", {
      class: "hidden sm:inline-flex sm:items-center"
    }, [Y(), D("div", {
      title: g,
      class: "hidden sm:block text-xs leading-4 overflow-hidden text-ellipsis whitespace-nowrap text-color-text-placeholder ml-2 cursor-pointer"
    }, [g])]) : D($("tiny-tooltip"), {
      effect: "light",
      content: g,
      placement: "top",
      "popper-options": V
    }, lr(o = Y()) ? o : {
      default: () => [o]
    })), k, D("input", {
      class: "hidden",
      type: "file",
      webkitdirectory: a,
      ref: "input",
      name: l,
      onChange: n,
      multiple: a ? !0 : s,
      accept: e
    }, null)]);
  }
});
var Ck = function(e) {
  var t, n = (typeof process > "u" ? "undefined" : R(process)) === "object" ? (t = process.env) === null || t === void 0 ? void 0 : t.TINY_MODE : null;
  return (n || e) === "pc" ? ea : (n || e) === "mobile-first" ? Tk : ea;
}, Ik = C(C({}, j), {}, {
  accept: String,
  action: {
    type: String,
    default: ""
  },
  autoUpload: Boolean,
  beforeUpload: Function,
  pasteUpload: Boolean,
  data: Object,
  disabled: Boolean,
  drag: Boolean,
  edmToken: {
    type: Object,
    default: function() {
      return {};
    }
  },
  fileList: {
    type: Array,
    default: function() {
      return [];
    }
  },
  headers: Object,
  httpRequest: {
    type: Function,
    default: Vs
  },
  isFolder: {
    type: Boolean,
    default: !1
  },
  limit: Number,
  listType: String,
  multiple: Boolean,
  name: {
    type: String,
    default: "file"
  },
  onError: Function,
  onExceed: Function,
  onPreview: {
    type: Function,
    default: function() {
    }
  },
  onProgress: Function,
  onRemove: {
    type: Function,
    default: function() {
    }
  },
  onStart: Function,
  onSuccess: Function,
  type: String,
  withCredentials: Boolean,
  isHidden: {
    type: Boolean,
    default: !1
  },
  scale: {
    type: [Number, String],
    default: 1
  },
  sourceType: {
    type: String,
    default: "picture",
    validator: function(e) {
      return e.split("/").every(function(t) {
        return ["picture", "video", "audio"].includes(t);
      });
    }
  },
  displayOnly: {
    type: Boolean,
    default: !1
  },
  customClass: [String, Object, Array],
  handleTriggerClick: {
    type: Function,
    default: function() {
    }
  },
  mode: String,
  showTitle: Boolean,
  isHwh5: {
    type: Boolean,
    default: !1
  },
  tipMessage: {
    type: String,
    default: ""
  },
  promptTip: {
    type: Boolean,
    default: !1
  },
  showFileList: {
    type: Boolean,
    default: !0
  }
});
const Ot = B({
  name: O + "Upload",
  props: Ik,
  setup: function(e, t) {
    return K({
      props: e,
      context: t,
      template: Ck,
      extend: {
        ref: "upload-inner-template"
      }
    });
  }
}), kk = "3.20.0";
Ot.install = function(o) {
  o.component(Ot.name, Ot);
};
Ot.version = kk;
const to = /* @__PURE__ */ B({
  inheritAttrs: !1,
  props: [...Q, "size", "action", "drag", "headers", "data", "multiple", "name", "withCredentials", "showFileList", "accept", "type", "beforeUpload", "beforeRemove", "fileList", "autoUpload", "listType", "httpRequest", "disabled", "limit", "fileIconList", "display", "fileTitle", "headerShow", "successStatistics", "uploadIcon"],
  setup(o, e) {
    return z({
      props: o,
      context: e,
      renderless: pw,
      api: sw
    });
  },
  components: {
    Progress: Ve,
    UploadList: Ue,
    Upload: Ot,
    IconUpload: Gl()
  },
  render() {
    const {
      exceed: o = () => {
      },
      preview: e = () => {
      }
    } = this.state.listeners, {
      fileTitle: t,
      headerShow: n,
      successStatistics: r,
      uploadIcon: i
    } = this;
    let a;
    const s = this.state.uploadFiles;
    let l = 0, u = [];
    if (s && s.map((m) => {
      this.listType === "picture-card" && m.url && u.push(m.url), m.status === "success" && (l += 1);
    }), this.showFileList) {
      const m = {
        props: {
          disabled: this.state.uploadDisabled,
          listType: this.listType,
          files: this.state.uploadFiles,
          filesIcon: this.fileIconList,
          display: this.display,
          srcList: u,
          handlePreview: e
        },
        on: {
          remove: this.handleRemove
        }
      };
      a = J(Ue, {
        ...m
      }, (h) => {
        if (this.slots.file)
          return this.slots.file({
            file: h.file
          });
      });
    }
    const c = {
      props: {
        type: this.type,
        drag: this.drag,
        action: this.state.url,
        multiple: this.multiple,
        withCredentials: this.withCredentials,
        headers: this.headers,
        name: this.name,
        data: this.data,
        accept: this.accept,
        fileList: this.state.uploadFiles,
        autoUpload: this.autoUpload,
        listType: this.listType,
        disabled: this.state.uploadDisabled,
        limit: this.limit,
        onExceed: o,
        onStart: this.handleStart,
        onProgress: this.handleProgress,
        onSuccess: this.handleSuccess,
        onError: this.handleError,
        onPreview: e,
        httpRequest: this.state.httpRequest,
        size: this.size
      },
      ref: "upload-inner"
    }, d = this.slots.trigger && this.slots.trigger() || this.slots.default(), p = !n || this.listType === "picture-card" ? J(Ot, {
      ...c
    }, d) : "";
    let f = D("div", {
      class: "tiny-mobile-file-upload__header"
    }, [D("div", {
      class: "tiny-mobile-file-upload__header-title"
    }, [t]), D("div", {
      class: "tiny-mobile-file-upload__header-upload"
    }, [r ? D("span", {
      class: "upload-status"
    }, [l, ue("/"), s.length]) : "", this.listType !== "picture-card" && i ? D("span", {
      class: "upload-icon"
    }, [J(Ot, {
      ...c
    }, d || D($("icon-upload"), null, null))]) : ""])]);
    return D("div", {
      class: ["tiny-mobile-file-upload", this.$attrs.class],
      ref: "fileUpload"
    }, [n ? f : "", D("div", {
      class: {
        "tiny-mobile-file-upload__wrap": !0,
        "is-card": this.listType === "picture-card"
      }
    }, [this.listType === "picture-card" ? a : "", this.slots.trigger ? [p, this.slots.default && this.slots.default()] : p, this.slots.tip && this.slots.tip(), this.listType !== "picture-card" ? a : ""])]);
  }
});
var Ek = function(e) {
  var t, n = (typeof process > "u" ? "undefined" : R(process)) === "object" ? (t = process.env) === null || t === void 0 ? void 0 : t.TINY_MODE : null;
  return to;
}, oa = {
  FILE_UPLOAD_INNER_TEMPLATE: "file-upload-inner-template",
  UPLOAD_INNER: "upload-inner",
  UPLOAD_INNER_TEMPLATE: "upload-inner-template",
  UPLOAD_LIST_INNER: "upload-list-inner",
  UPLOAD_LIST_INNER_TEMPLATE: "upload-list-inner-template",
  ONLY_SUPPORT: "ui.fileUpload.onlySupport",
  COMMA: "ui.base.comma",
  FILE_NOT_LESS_THAN: "ui.fileUpload.fileNotLessThan",
  FILE_NOT_MORE_THAN: "ui.fileUpload.fileNotMoreThan",
  FILE_SIZE_RANGE: "ui.fileUpload.fileSizeRange",
  NUMBER_LIMIT: "ui.fileUpload.numberLimit",
  FILE_STATUS: {
    READY: "ready",
    SUCESS: "success",
    UPLOADING: "uploading",
    FAIL: "fail",
    DOWNLOADING: "downloading"
  },
  LIST_TYPE: {
    TEXT: "text",
    PICTURE_CARD: "picture-card",
    PICTURE: "picture",
    THUMB: "thumb",
    PICTURE_SINGLE: "picture-single",
    DRAG_SINGLE: "drag-single",
    SAAS: "saas"
  },
  EDM: {
    CHUNKINIT: "chunkInit",
    FILESIZE: "fileSize",
    CHUNKS: "chunks",
    FILENAME: "fileName",
    ISCHECKCODE: "isCheckCode",
    CHECKCODE: "checkCode",
    MULTIPART: "multipartFile",
    DOCID: "docId",
    CHUNK: "chunk",
    SINGLEUPLOAD: "uploadFile",
    LOWERNAME: "filename",
    FOLDERKEY: "ui.fileUpload.folder",
    FORMAT: "docFormat=wm&",
    WATER: "usageScenes=water&wmType=wm&",
    SOURCE: "usageScenes=source&",
    URLCONTS: "&type=doc&pageNum=1&docVersion=",
    EDMTOKEN: "EDM-Authorization",
    TRACEID: "x-trace-id",
    TEXT: "edm-text",
    JSLIB: "./jslib/",
    I18NKEY: "ui.fileUpload.token",
    LARGEFILEKEY: "ui.fileUpload.largefile",
    EXCEED: "ui.fileUpload.exceed",
    SIZE: "ui.fileUpload.fileSize",
    SIZE_17G: 17 * 1024 * 1024,
    SIZE_2G: 2 * 1024 * 1024,
    // 单位（KB）
    SIZE_64M: 64 * 1024,
    SIZE_32M: 32 * 1024,
    SIZE_20M: 20 * 1024,
    SIZE_16M: 16 * 1024,
    SIZE_8M: 8 * 1024,
    SIZE_4M: 4 * 1024,
    SIZE_2M: 2 * 1024,
    SIZE_0M: 0 * 1024,
    FILEEMPTY: "ui.fileUpload.empty",
    KIASCANTIP: "ui.fileUpload.kiaScanTip",
    FILENAMEEXCEEDS: "ui.fileUpload.fileNameExceeds",
    THEFILENAME: "ui.fileUpload.fileName",
    CALCHASH: "ui.fileUpload.calcHash",
    KIASTATUS: 12079,
    NumberExceed: "ui.fileUpload.numberExceed",
    notSupport: "ui.fileUpload.notSupport",
    NOT_SUPPORT_NO_SUFFIX: "ui.fileUpload.notSupportNoSuffix",
    STATUS_SPECIAL_CHARACTERS: 11005,
    NOT_SUPPORT_SPECIAL_CHARACTERS: "ui.fileUpload.notSupportSpecialCharacters",
    DOC_PREVIEW: "ui.fileUpload.docPreview"
  },
  IMAGE_TYPE: "image/*",
  FILE_TYPE: {
    EXCEL: "xls/xlsx",
    FILE: "file",
    PDF: "pdf",
    PICTURE: "png/jpg/jpeg/gif/svg/webp/bmp/tif/pjp/apng/xbm/jxl/svgz/ico/tiff/jfif/pjpeg/avif",
    PPT: "ppt/pptx",
    TEXT: "txt",
    WORD: "doc/docx",
    ZIP: "zip/rar/arj/z/jar/lzh",
    VIDEO: "mp4/m4v/3gp/mpg/flv/f4v/swf/avi/wmv/rmvb/mov/mts/m2t/ogg/webm/mkv",
    AUDIO: "mp3/aac/ape/flac/wav/wma/amr/mid/pcm"
  },
  SOURCE_TYPE: {
    SOURCE_VIDEO: "video",
    SOURCE_AUDIO: "audio",
    SOURCE_PICTURE: "picture"
  },
  MODE: {
    BUBBLE: "bubble"
  }
}, Dk = C(C({}, j), {}, {
  _constants: {
    type: Object,
    default: function() {
      return oa;
    }
  },
  accept: String,
  action: String,
  autoUpload: {
    type: Boolean,
    default: function() {
      return !0;
    }
  },
  beforeRemove: Function,
  beforeUpload: Function,
  data: Object,
  disabled: Boolean,
  display: {
    type: Boolean,
    default: function() {
      return !0;
    }
  },
  drag: Boolean,
  dragger: Boolean,
  edm: {
    type: Object,
    default: function() {
      return {};
    }
  },
  fileIconList: {
    type: Array,
    default: function() {
      return [];
    }
  },
  fileList: {
    type: Array,
    default: function() {
      return [];
    }
  },
  fileSize: {
    type: [Number, Array],
    validator: function(e) {
      return Array.isArray(e) ? e[0] < e[1] : typeof e == "number";
    }
  },
  fileTitle: {
    type: String,
    default: function() {
      return "附件";
    }
  },
  headerShow: {
    type: Boolean,
    default: function() {
      return !0;
    }
  },
  headers: {
    type: Object,
    default: function() {
      return {};
    }
  },
  httpRequest: Function,
  limit: Number,
  listType: {
    type: String,
    default: function() {
      return "text";
    },
    validator: function(e) {
      return !!oa.LIST_TYPE[e.toUpperCase().replace("-", "_")];
    }
  },
  mergeService: {
    type: Boolean,
    default: function() {
      return !1;
    }
  },
  multiple: Boolean,
  name: {
    type: String,
    default: function() {
      return "file";
    }
  },
  openDownloadFile: {
    type: Boolean,
    default: function() {
      return !1;
    }
  },
  showFileList: {
    type: Boolean,
    default: function() {
      return !0;
    }
  },
  size: String,
  successStatistics: {
    type: Boolean,
    default: function() {
      return !0;
    }
  },
  thumbOption: {
    type: Object,
    default: function() {
      return {
        popperClass: "",
        width: 270,
        showDownload: !1,
        downloadFile: Function,
        showDel: !1,
        icon: "icon-attachment",
        showTooltip: !1
      };
    }
  },
  type: {
    type: String,
    default: function() {
      return "select";
    }
  },
  uploadIcon: {
    type: Boolean,
    default: function() {
      return !0;
    }
  },
  withCredentials: {
    type: Boolean,
    default: function() {
      return !0;
    }
  },
  isFolderTitle: {
    type: Boolean,
    default: !1
  },
  listOption: {
    type: Object,
    default: function() {
      return {
        showUpdate: !0,
        showDel: !0
      };
    }
  },
  maxNameLength: {
    type: Number,
    default: 20
  },
  scale: {
    type: [Number, String],
    default: 1
  },
  showName: {
    type: Boolean,
    default: !1
  },
  sourceType: {
    type: String,
    default: "picture",
    validator: function(e) {
      return e.split("/").every(function(t) {
        return ["picture", "video", "audio"].includes(t);
      });
    }
  },
  showTitle: {
    type: Boolean,
    default: !0
  },
  title: {
    type: String,
    default: ""
  },
  displayOnly: {
    type: Boolean,
    default: !1
  },
  customClass: [String, Object, Array],
  hwh5: Object,
  mode: {
    type: String,
    default: "",
    validator: function(e) {
      return ["", "bubble"].includes(e);
    }
  },
  cacheToken: {
    type: Boolean,
    default: !0
  },
  lockScroll: {
    type: Boolean,
    default: !0
  },
  compact: {
    type: Boolean,
    default: !1
  },
  beforeAddFile: Function,
  encryptConfig: {
    type: Object,
    default: function() {
      return {
        enabled: !1,
        encrypt: !1,
        watermark: ""
      };
    }
  },
  promptTip: {
    type: Boolean,
    default: !1
  },
  isHidden: {
    type: Boolean,
    default: !1
  },
  pasteUpload: {
    type: Boolean,
    default: !1
  },
  reUploadable: Boolean,
  reUploadTip: Function,
  imageBgColor: String
  // mobile-first新增
});
const Lt = B({
  name: O + "FileUpload",
  props: Dk,
  setup: function(e, t) {
    return K({
      props: e,
      context: t,
      template: Ek,
      extend: {
        ref: "file-upload-inner-template"
      }
    });
  }
});
const Bk = "3.20.0";
Lt.install = function(o) {
  o.component(Lt.name, Lt);
};
Lt.version = Bk;
var xk = function(e) {
  var t = e.api, n = e.props, r = e.state;
  return function() {
    var i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, s = Object.keys(i), l = Object.keys(a), u = l.filter(function(c) {
      return !s.includes(c);
    });
    t.clearValidate(u), r.fields.forEach(function(c) {
      c.removeValidateEvents(), c.addValidateEvents();
    }), n.validateOnRuleChange && t.validate(function() {
    });
  };
}, Pk = function(e) {
  var t = e.state;
  return function() {
    if (!t.potentialLabelWidthArr.length)
      return "0";
    var n = Math.max.apply(Math, Se(t.potentialLabelWidthArr));
    return n ? "".concat(n, "px") : "";
  };
}, Mk = function(e) {
  var t = e.props, n = e.designConfig;
  return function() {
    var r, i, a;
    return (r = (i = t.hideRequiredAsterisk) !== null && i !== void 0 ? i : n == null || (a = n.props) === null || a === void 0 ? void 0 : a.hideRequiredAsterisk) !== null && r !== void 0 ? r : !1;
  };
}, Ok = function(e) {
  var t = e.props, n = e.designConfig;
  return function() {
    var r, i, a;
    return (r = (i = t.validateIcon) !== null && i !== void 0 ? i : n == null || (a = n.icons) === null || a === void 0 ? void 0 : a.validateIcon) !== null && r !== void 0 ? r : "icon-error";
  };
}, Lk = function(e) {
  var t = e.props, n = e.designConfig;
  return function() {
    return t.messageType ? t.messageType === "inline" : typeof t.inlineMessage == "boolean" ? t.inlineMessage : (n == null ? void 0 : n.messageType) === "inline";
  };
}, Nk = function(e) {
  var t = e.props, n = e.designConfig;
  return function() {
    return t.messageType ? t.messageType === "block" : n && Object.hasOwnProperty.call(n, "messageType") ? n.messageType === "block" : !0;
  };
}, Fk = function(e) {
  var t = e.parent, n = e.state;
  return function() {
    t.$on("form:addField", function(r) {
      r && n.fields.push(r);
    }), t.$on("form:removeField", function(r) {
      r.prop && n.fields.splice(n.fields.indexOf(r), 1);
    });
  };
}, Rk = function(e) {
  var t = e.props, n = e.state;
  return function() {
    t.model && n.fields.forEach(function(r) {
      r.resetField();
    });
  };
}, Vk = function(e) {
  var t = e.props, n = e.state;
  return function() {
    t.model && n.fields.forEach(function(r) {
      r.updateTip();
    });
  };
}, Uk = function(e) {
  return function() {
    var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], n;
    t.length ? n = typeof t == "string" ? e.fields.filter(function(r) {
      return t === r.prop;
    }) : e.fields.filter(function(r) {
      return r.prop && t.includes(r.prop);
    }) : n = e.fields, n.forEach(function(r) {
      r.clearValidate();
    });
  };
}, Hk = function(e) {
  var t = e.props, n = e.state;
  return function(r) {
    if (t.model) {
      var i;
      typeof r != "function" && window.Promise && (i = new window.Promise(function(c, d) {
        r = function(f) {
          f ? c(f) : d(f);
        };
      }));
      var a = !0, s = 0;
      n.fields.length === 0 && r && r(!0);
      var l = {}, u = [];
      if (n.fields.forEach(function(c) {
        c.validate("", function(d, p) {
          d && (a = !1), l = ss({}, l, p), p && Object.keys(p).forEach(function(f) {
            return u.push(f);
          }), typeof r == "function" && ++s === n.fields.length && r(a, l, u);
        });
      }), i)
        return i;
    }
  };
}, $k = function(e) {
  return function(t, n) {
    t = [].concat(t);
    var r = e.fields.filter(function(i) {
      return t.includes(i.prop);
    });
    r.length && r.forEach(function(i) {
      i.validate("", n);
    });
  };
}, zk = function(e) {
  return function(t) {
    var n = e.potentialLabelWidthArr.indexOf(t);
    if (n === -1)
      throw new Error("unpected width ", t);
    return n;
  };
}, jk = function(e) {
  var t = e.api, n = e.state;
  return function(r, i) {
    if (r && i) {
      var a = t.getLabelWidthIndex(i);
      n.potentialLabelWidthArr.splice(a, 1, r);
    } else
      r && n.potentialLabelWidthArr.push(r);
  };
}, Wk = function(e) {
  var t = e.api, n = e.state;
  return function(r) {
    var i = t.getLabelWidthIndex(r);
    n.potentialLabelWidthArr.splice(i, 1);
  };
}, Gk = function(e) {
  var t = e.api, n = e.dialog, r = e.state, i = function() {
  };
  if (n) {
    var a = function() {
      var u = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
      u ? t.resetFields() : t.clearValidate();
    }, s = function() {
      r.timer || (r.timer = window.setTimeout(function() {
        r.timer = 0, t.updateTip();
      }, 10));
    };
    n.state.emitter.on("boxclose", a), n.state.emitter.on("boxdrag", s), i = function() {
      n.state.emitter.off("boxclose", a), n.state.emitter.off("boxdrag", s);
    };
  }
  return i;
}, Yk = function(e) {
  var t = e.vm, n = e.state;
  return function(r, i) {
    var a = t.$refs.tooltip;
    a.state.referenceElm = r, a.state.popperElm && (a.state.popperElm.style.display = "none"), a.doDestroy(), n.tooltipVisible = !0, n.displayedValue = i, setTimeout(a.updatePopper, 20);
  };
}, Kk = function(e) {
  var t = e.state;
  return function() {
    t.tooltipVisible = !1;
  };
}, Qk = ["state", "resetFields", "clearValidate", "validate", "validateField", "getLabelWidthIndex", "registerLabelWidth", "deregisterLabelWidth", "updateTip", "showTooltip", "hideTooltip"], Xk = function(e, t, n) {
  var r = t.computed, i = t.inject, a = t.provide, s = t.reactive, l = t.watch, u = t.onBeforeUnmount, c = n.vm, d = n.parent, p = n.designConfig, f = {}, m = i("dialog", null), h = s({
    showAutoWidth: e.showAutoWidth,
    fields: [],
    timer: 0,
    tooltipVisible: !1,
    displayedValue: "",
    potentialLabelWidthArr: [],
    autoLabelWidth: r(function() {
      return f.computedAutoLabelWidth();
    }),
    hideRequiredAsterisk: r(function() {
      return f.computedHideRequiredAsterisk();
    }),
    validateIcon: r(function() {
      return f.computedValidateIcon();
    }),
    isErrorInline: r(function() {
      return f.computedIsErrorInline();
    }),
    isErrorBlock: r(function() {
      return f.computedIsErrorBlock();
    }),
    isDisplayOnly: r(function() {
      return e.displayOnly;
    }),
    hasRequired: r(function() {
      return e.rules ? Object.values(e.rules).find(function(g) {
        return Array.isArray(g) ? g.some(function(b) {
          return b.required;
        }) : g.required;
      }) : !1;
    }),
    labelWidth: r(function() {
      var g;
      return e.labelWidth || (p == null || (g = p.state) === null || g === void 0 ? void 0 : g.labelWidth) || "84px";
    }),
    tooltipType: r(function() {
      var g;
      return (p == null || (g = p.state) === null || g === void 0 ? void 0 : g.tooltipType) || "normal";
    })
  });
  Object.assign(f, {
    state: h,
    updateTip: Vk({
      props: e,
      state: h
    }),
    computedAutoLabelWidth: Pk({
      state: h
    }),
    computedHideRequiredAsterisk: Mk({
      props: e,
      designConfig: p
    }),
    computedValidateIcon: Ok({
      props: e,
      designConfig: p
    }),
    computedIsErrorInline: Lk({
      props: e,
      designConfig: p
    }),
    computedIsErrorBlock: Nk({
      props: e,
      designConfig: p
    }),
    created: Fk({
      parent: d,
      state: h
    }),
    resetFields: Rk({
      props: e,
      state: h
    }),
    clearValidate: Uk(h),
    validate: Hk({
      props: e,
      state: h
    }),
    validateField: $k(h),
    getLabelWidthIndex: zk(h),
    registerLabelWidth: jk({
      api: f,
      state: h
    }),
    deregisterLabelWidth: Wk({
      api: f,
      state: h
    }),
    watchRules: xk({
      api: f,
      props: e,
      state: h
    }),
    showTooltip: Yk({
      vm: c,
      state: h
    }),
    hideTooltip: Kk({
      state: h
    })
  }), f.created(), a("form", d), a("showAutoWidth", h.showAutoWidth);
  var v = Gk({
    api: f,
    dialog: m,
    state: h
  });
  return u(v), l(function() {
    return e.rules;
  }, f.watchRules), f;
};
const Zk = /* @__PURE__ */ B({
  props: [...Q, "validatePosition", "validateOnRuleChange", "hideRequiredAsterisk", "model", "rules", "inlineMessage", "messageType", "statusIcon", "labelPosition", "labelAlign", "showMessage", "size", "disabled", "labelWidth", "contentOffset", "labelSuffix", "inline", "responsiveLayout", "validateType", "validateIcon", "manual"],
  setup(o, e) {
    return z({
      props: o,
      context: e,
      renderless: Xk,
      api: Qk
    });
  }
});
function Jk(o, e, t, n, r, i) {
  return A(), w(
    "form",
    {
      class: P(["tiny-mobile-form", [
        o.labelPosition ? "tiny-mobile-form--label-" + o.labelPosition : "",
        { "tiny-mobile-form--inline": o.inline },
        { "label-align": o.labelAlign }
      ]]),
      onSubmit: e[0] || (e[0] = te(() => {
      }, ["prevent"]))
    },
    [
      F(o.$slots, "default")
    ],
    34
    /* CLASS, NEED_HYDRATION */
  );
}
const no = /* @__PURE__ */ W(Zk, [["render", Jk]]);
var qk = function(e) {
  var t, n = (typeof process > "u" ? "undefined" : R(process)) === "object" ? (t = process.env) === null || t === void 0 ? void 0 : t.TINY_MODE : null;
  return no;
}, _k = C(C({}, j), {}, {
  model: Object,
  rules: Object,
  inlineMessage: {
    type: Boolean,
    default: void 0
  },
  messageType: String,
  statusIcon: Boolean,
  showMessage: {
    type: Boolean,
    default: !0
  },
  validatePosition: {
    type: String,
    default: "right"
  },
  size: String,
  disabled: Boolean,
  validateOnRuleChange: {
    type: Boolean,
    default: !0
  },
  hideRequiredAsterisk: {
    type: Boolean,
    default: void 0
  },
  labelPosition: {
    type: String,
    default: "right",
    validator: function(e) {
      return ["left", "top", "right"].includes(e);
    }
  },
  labelWidth: {
    type: String,
    // 默认值挪到design中
    default: ""
  },
  labelAlign: {
    type: Boolean,
    default: !1
  },
  contentOffset: Number,
  labelSuffix: {
    type: String,
    default: ""
  },
  inline: {
    type: Boolean,
    default: !1
  },
  responsiveLayout: {
    type: Boolean,
    default: !1
  },
  validateType: {
    type: String,
    default: "tip",
    validator: function(e) {
      return !!~["tip", "text"].indexOf(e);
    }
  },
  validateIcon: Object,
  manual: {
    type: Boolean,
    default: !1
  },
  appendToBody: {
    type: Boolean,
    default: void 0
  },
  popperOptions: {
    type: Object,
    default: function() {
      return {};
    }
  },
  displayOnly: {
    type: Boolean,
    default: !1
  },
  showAutoWidth: {
    type: Boolean,
    default: !1
  },
  showEmptyValue: {
    type: Boolean,
    default: !0
  },
  validateTag: {
    type: Boolean,
    default: !1
  },
  overflowTitle: {
    type: Boolean,
    default: !1
  },
  wrapFragment: {
    type: String,
    default: "div"
  },
  tooltipConfig: {
    type: Object,
    default: function() {
      return {};
    }
  }
});
const Nt = B({
  name: O + "Form",
  componentName: "Form",
  props: _k,
  setup: function(e, t) {
    return K({
      props: e,
      context: t,
      template: qk
    });
  }
}), eE = "3.20.0";
Nt.install = function(o) {
  o.component(Nt.name, Nt);
};
Nt.version = eE;
var il = function(e, t, n) {
  if (e !== t.index && (n("select", e), t.index = e, e < t.childrenAnchor.length)) {
    var r = t.childrenAnchor[e];
    document.documentElement.scrollTop = r.offsetTop;
  }
}, tE = function(e) {
  var t = e.state;
  return function() {
    t.isMouseDown = !0;
  };
}, nE = function(e) {
  var t = e.emit, n = e.state;
  return function(r) {
    n.isMouseDown && r.target.id && il(Number(r.target.id), n, t);
  };
}, oE = function(e) {
  var t = e.state;
  return function() {
    t.isMouseDown = !1;
  };
}, rE = function(e) {
  var t = e.emit, n = e.state;
  return function(r) {
    il(r.index, n, t);
  };
}, iE = function(e) {
  var t = e.state, n = e.refs;
  return function() {
    var r = n.indexBarContent;
    r && (t.childrenAnchor = [], al(r, t));
  };
}, al = function(e, t) {
  e.childNodes.forEach(function(n) {
    n.className === "tiny-mobile-index-bar-anchor" ? t.childrenAnchor.push(n) : al(n, t);
  });
}, aE = function(e) {
  var t = e.state;
  return function() {
    sE(t);
  };
}, sE = function(e) {
  for (var t = document.documentElement.scrollTop, n = 0; n < e.childrenAnchor.length; n++) {
    var r = e.childrenAnchor[n];
    if (r.offsetTop + r.offsetHeight > t) {
      e.index = n;
      break;
    }
  }
}, lE = ["state", "handleIndexClick", "handleScroll", "updateAnchorChildren", "handleTouchDown", "handleTouchMove", "handleTouchUp", "handleIndexClick"], uE = function(e, t, n) {
  t.computed;
  var r = t.reactive, i = t.onMounted, a = t.onUnmounted, s = t.onUpdated, l = t.watch, u = n.emit, c = n.parent, d = n.refs, p = r({
    index: 0,
    childrenAnchor: [],
    isFistUpdate: !0
  }), f = {
    state: p,
    isMouseDown: !1,
    handleScroll: aE({
      state: p
    }),
    updateAnchorChildren: iE({
      emit: u,
      parent: c,
      refs: d,
      state: p
    }),
    handleTouchDown: tE({
      state: p
    }),
    handleTouchMove: nE({
      emit: u,
      state: p
    }),
    handleTouchUp: oE({
      state: p
    }),
    handleIndexClick: rE({
      emit: u,
      parent: c,
      refs: d,
      state: p
    })
  };
  return Object.assign(f, {
    state: p
  }), i(function(m) {
    window.addEventListener("scroll", f.handleScroll);
  }), a(function() {
    window.removeEventListener("scroll", f.handleScroll);
  }), l(function() {
    return p.index;
  }, function(m, h) {
    var v = m !== h && m >= 0 && m < c.indexList.length;
    v && u("change", m);
  }, {
    immediate: !1
  }), l(function() {
    return e.indexList;
  }, function() {
    f.updateAnchorChildren({
      refs: d,
      state: p
    });
  }, {
    immediate: !1,
    deep: !0
  }), s(function() {
    p.isFistUpdate && (p.isFistUpdate = !1, f.updateAnchorChildren({
      refs: d,
      state: p
    }));
  }), f;
};
const cE = B({
  emits: ["select", "change"],
  props: [...Q, "indexList"],
  setup(o, e) {
    return z({ props: o, context: e, renderless: uE, api: lE });
  }
}), dE = { ref: "indexBarContent" }, pE = ["id", "onClick"];
function fE(o, e, t, n, r, i) {
  return A(), w(
    "div",
    {
      class: "tiny-mobile-index-bar",
      onScroll: e[6] || (e[6] = (...a) => o.handleScroll && o.handleScroll(...a))
    },
    [
      T(
        "div",
        dE,
        [
          F(o.$slots, "default")
        ],
        512
        /* NEED_PATCH */
      ),
      T(
        "div",
        {
          ref: "indexSide",
          class: "tiny-mobile-index-bar__side",
          onMousedown: e[0] || (e[0] = (...a) => o.handleTouchDown && o.handleTouchDown(...a)),
          onMousemove: e[1] || (e[1] = (...a) => o.handleTouchMove && o.handleTouchMove(...a)),
          onMouseup: e[2] || (e[2] = (...a) => o.handleTouchUp && o.handleTouchUp(...a)),
          onTouchstart: e[3] || (e[3] = (...a) => o.handleTouchDown && o.handleTouchDown(...a)),
          onTouchmove: e[4] || (e[4] = (...a) => o.handleTouchMove && o.handleTouchMove(...a)),
          onTouchend: e[5] || (e[5] = (...a) => o.handleTouchUp && o.handleTouchUp(...a))
        },
        [
          (A(!0), w(
            q,
            null,
            ae(o.indexList, (a, s) => (A(), w("span", {
              key: a,
              id: s,
              class: P(["tiny-mobile-index-bar__label", o.state.index === s ? "tiny-mobile-index-bar__label--active" : null]),
              onClick: (l) => o.handleIndexClick({ index: s, label: a })
            }, M(a), 11, pE))),
            128
            /* KEYED_FRAGMENT */
          ))
        ],
        544
        /* NEED_HYDRATION, NEED_PATCH */
      )
    ],
    32
    /* NEED_HYDRATION */
  );
}
const mE = /* @__PURE__ */ W(cE, [["render", fE]]);
var vE = function(e) {
  var t;
  return (typeof process > "u" ? "undefined" : R(process)) === "object" && ((t = process.env) === null || t === void 0 || t.TINY_MODE), mE;
};
const Ft = B({
  name: O + "IndexBar",
  props: C(C({}, j), {}, {
    indexList: {
      type: Array,
      default: function() {
        return [];
      }
    }
  }),
  setup: function(e, t) {
    return K({
      props: e,
      context: t,
      template: vE
    });
  }
}), hE = "3.20.0";
Ft.install = function(o) {
  o.component(Ft.name, Ft);
};
Ft.version = hE;
var Zt = "tiny-mobile-label-";
function gE(o, e) {
  var t = "";
  return t = (Math.round(o * 100) / 100).toFixed(e).toString().replace(/(\d)(?=(\d{3})+\.)/g, function(n, r) {
    return r + ",";
  }), t;
}
function AE(o, e) {
  var t = o, n = /[^(\-|\+)?\d+(\.\d+)?$]/g, r = /0*([1-9]\d*|0\.\d+)/;
  t = t.replace(n, "").replace(r, "$1");
  for (var i = t.split("."), a = "", s = 0; s < i.length; s++)
    s === i.length - 1 && i.length > 1 && (a += "."), a += i[s];
  return a = gE(a, e), a = a.replace(/\d+/, function(l) {
    return l.replace(/(\d)(?=(\d{3})+$)/g, "$1,");
  }), a;
}
var yE = function(e) {
  var t = e.emit, n = e.state;
  return function() {
    t("click", n.label);
  };
}, bE = function(e) {
  return function() {
    var t = e.label;
    return e.type === "number" && (t = AE(e.label, e.decimal)), e.limit !== 0 && t.length > e.limit ? t.slice(0, e.limit) : t;
  };
}, SE = function(e) {
  return function() {
    return ["".concat(Zt).concat(e.size), "".concat(Zt).concat(e.color), "".concat(Zt).concat(e.position), e.wholeline || e.ellipsis === 1 || e.ellipsis === 2 || e.ellipsis === 3 ? "".concat(Zt, "wholeline") : "", e.ellipsis > 0 && e.ellipsis < 4 ? "".concat(Zt, "ellipsis").concat(e.ellipsis) : "", e.bold ? "".concat(Zt, "bold") : ""];
  };
}, wE = ["state", "handleClick", "computeLabel", "computeLabelStyle", "computeLabelClass"], TE = function(e, t, n) {
  var r = t.computed;
  t.onBeforeUnmount;
  var i = t.reactive;
  t.watch;
  var a = t.inject, s = n.emit, l = n.parent;
  l.tinyForm = l.tinyForm || a("form", null);
  var u = i({
    label: r(function() {
      return c.computeLabel();
    }),
    type: e.type,
    color: e.color,
    size: e.size,
    labelClass: r(function() {
      return c.computeLabelClass();
    }),
    isRequired: e.isRequired
  }), c = {
    state: u,
    handleClick: yE({
      emit: s,
      state: u
    }),
    computeLabel: bE(e),
    // computeLabelStyle: computeLabelStyle(props, state),
    computeLabelClass: SE(e)
  };
  return c;
};
const CE = B({
  props: [
    ...Q,
    "label",
    "color",
    "size",
    "type",
    "wholeline",
    "position",
    "ellipsis",
    "decimal",
    "limit",
    "isRequired",
    "bold"
  ],
  emits: ["click"],
  setup(o, e) {
    return z({ props: o, context: e, renderless: TE, api: wE });
  }
}), IE = {
  key: 0,
  class: "tiny-mobile-label-isRequired"
};
function kE(o, e, t, n, r, i) {
  return A(), w(
    "div",
    {
      class: P(["tiny-mobile-label", o.state.labelClass]),
      style: H(o.state.labelStyle)
    },
    [
      T(
        "span",
        null,
        M(o.state.label),
        1
        /* TEXT */
      ),
      o.state.isRequired ? (A(), w("span", IE, "*")) : x("v-if", !0)
    ],
    6
    /* CLASS, STYLE */
  );
}
const EE = /* @__PURE__ */ W(CE, [["render", kE]]);
var DE = function(e) {
  var t;
  return (typeof process > "u" ? "undefined" : R(process)) === "object" && ((t = process.env) === null || t === void 0 || t.TINY_MODE), EE;
}, BE = C(C({}, j), {}, {
  label: {
    type: String,
    default: ""
  },
  color: {
    type: String,
    default: "primary"
  },
  size: {
    type: String,
    default: "normal"
  },
  type: {
    type: String,
    default: "base"
  },
  wholeline: {
    type: Boolean,
    default: !1
  },
  position: {
    type: String,
    default: "left"
  },
  ellipsis: {
    type: Number,
    default: 0
  },
  decimal: {
    type: Number,
    default: 2
  },
  limit: {
    type: Number,
    default: 0
  },
  isRequired: {
    type: Boolean,
    default: !1
  },
  bold: {
    type: Boolean,
    default: !1
  }
});
const Rt = B({
  name: O + "Label",
  props: BE,
  setup: function(e, t) {
    return K({
      props: e,
      context: t,
      template: DE
    });
  }
});
const xE = "3.20.0";
Rt.install = function(o) {
  o.component(Rt.name, Rt);
};
Rt.version = xE;
var PE = function(e) {
  var t = e.emit, n = e.props;
  return function() {
    var r = {
      id: n.id,
      content: n.content,
      subtext: n.subText,
      contentdes: n.contentDes
    };
    t("click", r);
  };
}, ME = ["state", "clickList"], OE = function(e, t, n) {
  var r = t.reactive, i = n.emit, a = r({
    test: "1"
  }), s = {
    state: a,
    clickList: PE({
      emit: i,
      props: e
    })
  };
  return s;
};
const LE = B({
  name: O + "List",
  props: {
    content: {
      type: String,
      default: ""
    },
    subText: {
      type: String,
      default: ""
    },
    contentDes: {
      type: String,
      default: ""
    },
    list: {
      type: Boolean,
      default: !1
    },
    id: {
      type: [Number, String],
      default: ""
    }
  },
  setup(o, e) {
    return z({ props: o, context: e, renderless: OE, api: ME, mono: !0 });
  }
}), NE = {
  key: 0,
  class: "tiny-mobile-list__prefix"
}, FE = { class: "tiny-mobile-list__content" }, RE = { class: "tiny-mobile-list__content-text" }, VE = { class: "tiny-mobile-list__main-text" }, UE = {
  key: 0,
  class: "tiny-mobile-list__sub-text"
}, HE = {
  key: 0,
  class: "tiny-mobile-list__content-des"
}, $E = {
  key: 1,
  class: "tiny-mobile-list__content-des"
}, zE = {
  key: 1,
  class: "tiny-mobile-list__suffix"
};
function jE(o, e, t, n, r, i) {
  return A(), w(
    "div",
    {
      class: P([{ "is-show-prefix": o.slots.prefix, "is-padding": o.list }, "tiny-mobile-list"]),
      onClick: e[0] || (e[0] = (...a) => o.clickList && o.clickList(...a))
    },
    [
      o.slots.prefix ? (A(), w("div", NE, [
        F(o.$slots, "prefix")
      ])) : x("v-if", !0),
      T("div", FE, [
        T("div", RE, [
          F(o.$slots, "default", {}, () => [
            T(
              "span",
              VE,
              M(o.content),
              1
              /* TEXT */
            )
          ]),
          o.subText ? (A(), w(
            "span",
            UE,
            M(o.subText),
            1
            /* TEXT */
          )) : x("v-if", !0)
        ]),
        o.slots.description ? (A(), w("div", HE, [
          F(o.$slots, "description")
        ])) : x("v-if", !0),
        o.contentDes ? (A(), w(
          "p",
          $E,
          M(o.contentDes),
          1
          /* TEXT */
        )) : x("v-if", !0)
      ]),
      o.slots.suffix ? (A(), w("div", zE, [
        F(o.$slots, "suffix")
      ])) : x("v-if", !0)
    ],
    2
    /* CLASS */
  );
}
const Vt = /* @__PURE__ */ W(LE, [["render", jE]]);
const WE = "3.20.0";
Vt.install = function(o) {
  o.component(Vt.name, Vt);
};
Vt.version = WE;
var ra = "after-leave", GE = 300;
const sl = function(o, e) {
  var t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : GE, n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  if (!o || !e)
    throw new Error("instance & callback is required");
  var r = !1, i = function() {
    r || (r = !0, typeof e == "function" && e.apply(null, arguments));
  };
  n ? o.$once(ra, i) : o.$on(ra, i), setTimeout(i, t + 100);
};
var YE = function(e) {
  return function() {
    e("after-leave");
  };
}, KE = function(e) {
  return function(t) {
    e.text = t;
  };
}, QE = function(e) {
  var t = e.state, n = e.constants, r = e.vm;
  return function() {
    sl(r, function() {
      var i = t.fullscreen || t.body ? document.body : t.target;
      r.$el && r.$el.parentNode && (ge(i, n.PARENT_RELATIVE_CLS), ge(i, n.PARENT_HIDDEN_CLS), r.$el.parentNode.removeChild(r.$el)), t.closed = !0;
    }, 300), t.visible = !1;
  };
}, XE = ["state", "handleAfterLeave", "setText", "close"], ZE = function(e, t, n) {
  var r = t.reactive, i = t.computed, a = n.constants, s = n.vm, l = n.emit, u = n.designConfig, c = r({
    text: null,
    spinner: null,
    visible: !1,
    customClass: "",
    background: null,
    fullscreen: !0,
    closed: !1,
    size: "",
    iconSize: "",
    loadingImg: i(function() {
      var p;
      return e.loadingImg || (u == null || (p = u.props) === null || p === void 0 ? void 0 : p.loadingImg);
    }),
    iconStyle: i(function() {
      return c.iconSize ? {
        width: c.iconSize + "px",
        height: c.iconSize + "px"
      } : {};
    })
  }), d = {
    state: c,
    setText: KE(c),
    handleAfterLeave: YE(l),
    close: QE({
      state: c,
      constants: a,
      vm: s
    })
  };
  return d;
}, JE = {
  "loading-default": "m-0 top-0 right-0 left-0 bottom-0 block transition bg-color-bg-1 duration-1000",
  "loading-fullscreen": "fixed opacity-80",
  "loading-unfullscreen": "absolute",
  "loading-content": "absolute -translate-y-2/4  w-full  top-1/2 text-center  flex justify-center items-center",
  "loading-size-mini": "flex-row",
  "loading-size-unmini": "flex-col",
  "loading-unspinner": "animate-[spin_1.5s_linear_infinite] fill-current",
  "loading-unspinner-size-default": "h-10 w-10 stroke-2",
  "loading-unspinner-size-large": "h-24 w-24 stroke-2",
  "loading-unspinner-size-medium": "h-10 w-10 stroke-2",
  "loading-unspinner-size-small": "h-6 w-6 stroke-1",
  "loading-unspinner-size-mini": "h-3.5 w-3.5 stroke-1",
  "loading-unspinner-svg-circle": "stroke-color-brand tiny-loading-path",
  "loading-spinner": "text-sm fill-color-brand leading-none animate-[spin_2s_linear_infinite]",
  "loading-spinner-text": "tiny-tailwind-text block text-color-brand  text-xs leading-6",
  "loading-spinner-size-mini": "my-0 ml-2",
  "loading-spinner-size-unmini": "mb-1 mt-2.5"
};
const qE = "data:image/png;base64,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";
const _E = B({
  name: O + "Loading",
  emits: ["after-leave"],
  props: {
    ...j,
    _constants: Object,
    loadingImg: {
      type: String,
      default: qE
    },
    size: {
      type: String
    }
  },
  setup(o, e) {
    return z({ props: o, context: e, renderless: ZE, api: XE, classes: JE });
  }
}), eD = ["src"], tD = {
  key: 2,
  class: "tiny-mobile-loading__text"
};
function nD(o, e, t, n, r, i) {
  return A(), G($e, {
    name: "tiny-loading-fade",
    onAfterLeave: o.handleAfterLeave,
    persisted: ""
  }, {
    default: ee(() => [
      oe(T(
        "div",
        {
          class: P(["tiny-mobile-loading", o.state.customClass]),
          style: H(`background-color:${o.state.background}`)
        },
        [
          T(
            "div",
            {
              class: P(["tiny-mobile-loading__body", { [`tiny-mobile-loading-${o.size}`]: o.size }])
            },
            [
              o.state.spinner ? (A(), G(pe(o.state.spinner), {
                key: 1,
                class: "tiny-mobile-loading__spinner"
              })) : (A(), w("img", {
                key: 0,
                class: "tiny-mobile-loading__icon",
                src: o.state.loadingImg,
                style: H(o.state.iconStyle)
              }, null, 12, eD)),
              o.state.text ? (A(), w(
                "span",
                tD,
                M(o.state.text),
                1
                /* TEXT */
              )) : x("v-if", !0)
            ],
            2
            /* CLASS */
          )
        ],
        6
        /* CLASS, STYLE */
      ), [
        [he, o.state.visible]
      ])
    ]),
    _: 1
    /* STABLE */
  }, 8, ["onAfterLeave"]);
}
const oo = /* @__PURE__ */ W(_E, [["render", nD]]);
var oD = function(e) {
  var t, n = (typeof process > "u" ? "undefined" : R(process)) === "object" ? (t = process.env) === null || t === void 0 ? void 0 : t.TINY_MODE : null;
  return oo;
}, rD = C(C({}, j), {}, {
  type: {
    type: String,
    validator: function(e) {
      return !!~["primary", "simple"].indexOf(e);
    }
  },
  loadtext: {
    type: String,
    default: function() {
      return me.LOAD_ICON_TEXT;
    }
  },
  _constants: {
    type: Object,
    default: function() {
      return me;
    }
  },
  loadingImg: {
    type: String
  },
  size: {
    type: String,
    default: "small"
  }
});
const ll = B({
  name: O + "Loading",
  emits: [],
  props: rD,
  setup: function(e, t) {
    return K({
      props: e,
      context: t,
      template: oD
    });
  }
});
var ul = {
  text: null,
  body: !1,
  lock: !1,
  customClass: "",
  fullscreen: !0,
  iconSize: ""
}, ro = null, me = {
  TEXT_ATTR: "tiny-loading__text",
  IS_FULLSCREEN_CLS: "is-fullscreen",
  TEXT_SPINNER: "tiny-loading__spinner",
  TEXT_BACKGROUND: "tiny-loading__background",
  TEXT_CUSTOM_CLS: "tiny-loading__custom-class",
  PARENT_HIDDEN_CLS: "tiny-loading__parent-hidden",
  PARENT_RELATIVE_CLS: "tiny-loading__parent-relative",
  LOAD_ICON_TEXT: "ui.load.dot"
}, iD = function(e, t, n) {
  var r = {};
  if (e.fullscreen)
    n.originalPosition = Ie(document.body, "position"), n.originalOverflow = Ie(document.body, "overflow"), r.zIndex = Z.nextZIndex();
  else if (e.body) {
    var i = e.target.getBoundingClientRect();
    n.originalPosition = Ie(document.body, "position");
    var a = ["top", "left"];
    a.forEach(function(l) {
      var u = l === "top" ? "scrollTop" : "scrollLeft";
      r[l] = i[l] + document.body[u] + document.documentElement[u] + "px";
    });
    var s = ["height", "width"];
    s.forEach(function(l) {
      r[l] = i[l] + "px";
    });
  } else
    n.originalPosition = Ie(t, "position");
  Object.keys(r).forEach(function(l) {
    n.$el.style[l] = r[l];
  });
};
const cl = function() {
  var o, e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  if (e = C(C({}, ul), e), typeof e.target == "string" && (e.target = document.querySelector(e.target)), e.target = e.target || document.body, e.target !== document.body ? e.fullscreen = !1 : e.body = !0, e.fullscreen && ro && !ro.state.closed)
    return ro;
  var t = e.body ? document.body : e.target, n = t.querySelector(':scope > [data-tag="tiny-loading"]');
  n && t.removeChild(n);
  var r = vn({
    component: ll,
    propsData: {
      _constants: me,
      size: e.size,
      loadingImg: e.loadingImg,
      tiny_mode: e.tiny_mode || ((o = ga().tiny_mode) === null || o === void 0 ? void 0 : o.value)
    },
    el: document.createElement("div")
  });
  for (var i in e)
    Object.prototype.hasOwnProperty.call(e, i) && (r.state[i] = e[i]);
  return iD(e, t, r), r.originalPosition !== "absolute" && r.originalPosition !== "fixed" && ve(t, me.PARENT_RELATIVE_CLS), e.fullscreen && e.lock && ve(t, me.PARENT_HIDDEN_CLS), t.appendChild(r.$el), kn.nextTick(function() {
    r.state.visible = !0;
  }), e.fullscreen && (ro = r), r;
};
var Nr = function(e, t, n) {
  !t.domVisible && Ie(t, "display") !== "none" && Ie(t, "visibility") !== "hidden" ? (Object.keys(t.maskStyle).forEach(function(r) {
    t.mask.style[r] = t.maskStyle[r];
  }), t.originalPosition !== "absolute" && t.originalPosition !== "fixed" && ve(e, me.PARENT_RELATIVE_CLS), n.modifiers.fullscreen && n.modifiers.lock && ve(e, me.PARENT_HIDDEN_CLS), t.domVisible = !0, e.appendChild(t.mask), kn.nextTick(function() {
    t.instance.hiding ? t.instance.$emit("after-leave") : t.instance.state.visible = !0;
  }), t.domInserted = !0) : t.domVisible && t.instance.hiding === !0 && (t.instance.state.visible = !0, t.instance.hiding = !1);
}, aD = function(e, t) {
  var n = e.getBoundingClientRect();
  e.originalPosition = Ie(document.body, "position");
  var r = ["top", "left"];
  r.forEach(function(a) {
    var s = a === "top" ? "scrollTop" : "scrollLeft";
    e.maskStyle[a] = n[a] + document.body[s] + document.documentElement[s] - parseInt(Ie(document.body, "margin-".concat(a)), 10) + "px";
  });
  var i = ["height", "width"];
  i.forEach(function(a) {
    e.maskStyle[a] = n[a] + "px";
  }), Nr(document.body, e, t);
}, ur = function(e, t, n) {
  t.value ? kn.nextTick(function() {
    t.modifiers.fullscreen ? (e.originalPosition = Ie(document.body, "position"), e.originalOverflow = Ie(document.body, "overflow"), e.maskStyle.zIndex = Z.nextZIndex(), ve(e.mask, me.IS_FULLSCREEN_CLS), Nr(document.body, e, t)) : (ge(e.mask, me.IS_FULLSCREEN_CLS), t.modifiers.body ? aD(e, t) : (e.originalPosition = Ie(e, "position"), Nr(e, e, t)));
  }) : (sl(n, function() {
    if (n.hiding) {
      var r = t.modifiers.fullscreen || t.modifiers.body ? document.body : e;
      e.domVisible = !1, ge(r, me.PARENT_RELATIVE_CLS), ge(r, me.PARENT_HIDDEN_CLS), n.hiding = !1;
    }
  }, 300, !0), n.state.visible = !1, n.hiding = !0);
}, sD = {
  bind: function(e, t, n) {
    var r, i, a = n.context, s = e.getAttribute(me.TEXT_ATTR), l = e.getAttribute(me.TEXT_SPINNER), u = e.getAttribute(me.TEXT_BACKGROUND), c = e.getAttribute(me.TEXT_CUSTOM_CLS), d = vn({
      component: ll,
      propsData: {
        _constants: me,
        tiny_mode: ((r = a.tiny_mode) === null || r === void 0 ? void 0 : r.value) || ((i = ga().tiny_mode) === null || i === void 0 ? void 0 : i.value)
      },
      el: document.createElement("div")
    }), p = C(C({}, ul), {}, {
      text: a && a[s] || s,
      spinner: a && a[l] || l,
      background: a && a[u] || u,
      customClass: a && a[c] || c,
      fullscreen: !!t.modifiers.fullscreen
    });
    for (var f in p)
      Object.prototype.hasOwnProperty.call(p, f) && (d.state[f] = p[f]);
    e.instance = d, e.mask = d.$el, e.maskStyle = {}, t.value && ur(e, t, d);
  },
  update: function(e, t) {
    e.instance.setText(e.getAttribute(me.TEXT_ATTR)), t.oldValue !== t.value && ur(e, t, e.instance);
  },
  unbind: function(e, t) {
    e.domInserted && (e.mask && e.mask.parentNode && e.mask.parentNode.removeChild(e.mask), ur(e, {
      value: !1,
      modifiers: t.modifiers
    }, e.instance)), e.instance && (typeof e.instance.$destroy == "function" && e.instance.$destroy(), e.instance = null, e.mask = null);
  }
};
const ia = mn({
  vLoading: sD
}).vLoading, lD = "3.20.0";
var Fr = {
  install: function(e) {
    e.directive("loading", ia);
  },
  service: cl,
  directive: ia,
  version: lD
};
ma.TINYLoading = {
  init: function(e) {
    var t = e.$apiPrefix || "$";
    e["".concat(t, "loading")] = cl;
  }
};
var uD = function(e) {
  var t = e.props, n = e.emit;
  return function(r) {
    t.cancelTouch ? (r.preventDefault(), r.stopPropagation()) : n("update:visible", !1), n("click", t.visible);
  };
}, cD = ["state", "handleTouch"], dD = function(e, t, n) {
  var r = t.reactive, i = t.computed, a = n.emit, s = {}, l = r({
    calcStyle: i(function() {
      return {
        zIndex: e.zIndex
      };
    })
  });
  return Object.assign(s, {
    state: l,
    handleTouch: uD({
      props: e,
      emit: a
    })
  }), s;
};
const pD = B({
  name: O + "Mask",
  props: {
    ...Q,
    visible: {
      type: Boolean,
      default: !1
    },
    zIndex: {
      type: Number,
      default: 99
    },
    cancelTouch: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["update:visible", "click"],
  setup(o, e) {
    return z({ props: o, context: e, renderless: dD, api: cD, mono: !0 });
  }
});
function fD(o, e, t, n, r, i) {
  return A(), G($e, {
    name: "mask-fade",
    persisted: ""
  }, {
    default: ee(() => [
      oe(T(
        "div",
        {
          class: "tiny-mobile-mask",
          style: H(o.state.calcStyle),
          onMousedown: e[0] || (e[0] = (...a) => o.handleTouch && o.handleTouch(...a)),
          onTouchmove: e[1] || (e[1] = (...a) => o.handleTouch && o.handleTouch(...a)),
          onTouchstart: e[2] || (e[2] = (...a) => o.handleTouch && o.handleTouch(...a))
        },
        [
          F(o.$slots, "default")
        ],
        36
        /* STYLE, NEED_HYDRATION */
      ), [
        [he, o.visible]
      ])
    ]),
    _: 3
    /* FORWARDED */
  });
}
const ot = /* @__PURE__ */ W(pD, [["render", fD]]), mD = "3.20.0";
ot.install = function(o) {
  o.component(ot.name, ot);
};
ot.version = mD;
var Bn = function(e) {
  return Ee(e) ? ht(!0, e) : Array.isArray(e) ? as(e) : e;
}, vD = function(e) {
  var t = e.props, n = e.emit;
  return function() {
    var r = t.modelValue, i = t.dataSource, a = i === void 0 ? [] : i, s = t.disabled;
    if (!s) {
      var l = [];
      a == null || a.forEach(function(u, c) {
        var d = Array.isArray(r[c]);
        u.multiple ? l.push(d ? r[c] : []) : l.push(d ? "" : r[c] || "");
      }), n("update:modelValue", l);
    }
  };
}, hD = function(e) {
  var t = e.state, n = e.props, r = e.emit;
  return function(i) {
    var a = t.headerIndex, s = Bn(n.modelValue);
    if (s) {
      if (Array.isArray(s[t.headerIndex])) {
        var l = s[a];
        s[a] = l.includes(i) ? l.filter(function(u) {
          return u !== i;
        }) : [].concat(Se(l), [i]);
      } else
        s[a] = i;
      r("update:modelValue", s);
    }
  };
}, dl = function(e, t) {
  var n = $r(e), r;
  try {
    for (n.s(); !(r = n.n()).done; ) {
      var i, a = r.value;
      if (a.value === t)
        return a;
      if ((i = a.children) !== null && i !== void 0 && i.length) {
        var s = dl(a.children, t);
        if (s)
          return s;
      }
    }
  } catch (l) {
    n.e(l);
  } finally {
    n.f();
  }
  return null;
}, gD = function(e) {
  var t = e.props, n = e.state;
  return function() {
    var r = t.modelValue, i = r === void 0 ? [] : r, a = t.dataSource, s = a === void 0 ? [] : a, l = n.headerInfo;
    i.forEach(function(u, c) {
      if (!s[c].multiple) {
        var d;
        l[c].title = ((d = dl(s[c].options, u)) === null || d === void 0 ? void 0 : d.label) || l[c].title;
      }
    });
  };
}, AD = function(e) {
  var t = e.api, n = e.emit, r = e.props, i = e.state, a = e.refs, s = e.nextTick;
  return function() {
    s(function() {
      i.dataSource = Bn(r.dataSource), i.defaultSelectedArray = Bn(r.defaultSelectedArray), i.labelLevelsInfo = ND(a), i.labelsStyle = FD(i), i.headerInfo = i.dataSource.map(function(l) {
        return {
          isSelected: !1,
          title: l.title,
          isUP: !1
        };
      }), t.initValue({
        props: r,
        emit: n
      }), r.type === "list" && i.dataSource.forEach(function(l, u) {
        var c = bD(l.options), d = c.flattenData, p = c.dataMap;
        l.options = d, i.optionMap[u] = p;
      });
    });
  };
}, yD = function(e) {
  var t = e.state, n = e.props;
  return function() {
    var r = t.dataSource[t.headerIndex] || {}, i = r.options, a = i === void 0 ? [] : i, s = r.multiple, l = n.modelValue[t.headerIndex];
    return a.forEach(function(u) {
      var c, d;
      u.show = t.isSearching ? u.label.includes(t.searchValue) : ((c = u.show) !== null && c !== void 0 ? c : (d = parent) === null || d === void 0 ? void 0 : d.expanded) || u.level === 0, u.active = s ? l.includes(u.value) : u.value === l;
    }), a.filter(function(u) {
      return u.show;
    });
  };
}, bD = function(e) {
  var t = [], n = {}, r = function(a) {
    var s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, l = arguments.length > 2 ? arguments[2] : void 0;
    a.forEach(function(u, c) {
      var d, p, f = l ? l.id + c : String(c), m = (l == null ? void 0 : l.id) || "", h = (l == null ? void 0 : l.expanded) && ((d = u.children) === null || d === void 0 ? void 0 : d.length) && u.expanded || !1, v = C(C({}, u), {}, {
        id: f,
        level: s,
        expanded: h,
        parentId: m
      });
      t.push(v), (p = u.children) !== null && p !== void 0 && p.length && r(u.children, s + 1, v), n[v.id] = u;
    });
  };
  return r(e), t.forEach(function(i) {
    i.children && (i.hasChild = i.children.length > 0, delete i.children);
  }), {
    flattenData: t,
    dataMap: n
  };
}, SD = function(e) {
  var t = e.api, n = e.props, r = e.state;
  return function(i) {
    if (!(n.disabled || n.dataSource[i].disabled)) {
      if (n.type === "wheel") {
        var a;
        r.wheelData = (a = n.dataSource[i]) === null || a === void 0 ? void 0 : a.options;
      }
      if (r.headerIndex === -1) {
        var s;
        r.showOptions = !0, r.headerIndex = i, r.headerInfo[i] = io(r.headerInfo, i, !0), r.defaultSelectedIndexs = (s = r.defaultSelectedArray[i]) !== null && s !== void 0 ? s : t.loadDefault(i);
      } else if (r.headerIndex !== i) {
        var l;
        r.showOptions = !0, r.headerInfo[r.headerIndex] = io(r.headerInfo, r.headerIndex, !1), r.headerIndex = i, r.headerInfo[i] = io(r.headerInfo, i, !0), r.defaultSelectedIndexs = (l = r.defaultSelectedArray[i]) !== null && l !== void 0 ? l : t.loadDefault(i);
      } else {
        r.showOptions = !r.showOptions;
        var u = r.headerInfo[i].isUP;
        r.headerInfo[i] = io(r.headerInfo, i, !u);
      }
    }
  };
}, wD = function(e) {
  var t = e.api, n = e.state, r = e.emit;
  return function(i) {
    t.updateValue(i.value), r("item-click", n.optionMap[n.headerIndex][i.id], n.headerIndex), n.dataSource[n.headerIndex].multiple || t.handleClose();
  };
}, TD = function(e) {
  var t = e.state, n = e.emit;
  return function() {
    var r = t.searchValue;
    n("update:searchValue", r);
  };
}, CD = function(e, t, n) {
  for (var r = e.dataSource[e.headerIndex].options, i = n + 1; i < r.length && r[i].parentId === t; i++)
    r[i].show = !r[i].show;
}, ID = function(e) {
  var t = e.state;
  return function(n) {
    var r = t.dataSource[t.headerIndex].options.findIndex(function(a) {
      return a.id === n.id;
    });
    if (r !== -1) {
      var i = t.dataSource[t.headerIndex].options[r];
      i.expanded = !i.expanded, CD(t, i.id, r);
    }
  };
}, kD = function(e) {
  var t = e.state, n = e.emit;
  return function() {
    var r = PD(t.wheelData, t.defaultSelectedIndexs), i = MD(r, t.defaultSelectedIndexs), a = i.selectedLabels, s = i.selectedItems;
    t.headerInfo[t.headerIndex] = {
      isSelected: !0,
      title: a,
      isUP: !1
    }, t.defaultSelectedArray[t.headerIndex] = t.defaultSelectedIndexs, n("confirm", s, t.headerIndex, t.defaultSelectedIndexs), t.showOptions = !1;
  };
}, ED = function(e) {
  var t = e.api, n = e.props, r = e.state, i = e.emit;
  return function() {
    var a;
    r.headerInfo[r.headerIndex] = {
      isSelected: !1,
      title: n.dataSource[r.headerIndex].title || "",
      isUP: !1
    }, r.defaultSelectedIndexs = (a = n.defaultSelectedArray[r.headerIndex]) !== null && a !== void 0 ? a : t.loadDefault(r.headerIndex), r.defaultSelectedArray[r.headerIndex] = r.defaultSelectedIndexs, i("reset", [], r.headerIndex, r.defaultSelectedIndexs), r.showOptions = !1;
  };
}, DD = function(e) {
  return function() {
    e.showOptions = !1, e.headerIndex !== -1 && (e.headerInfo[e.headerIndex].isUP = !1);
  };
}, BD = function(e) {
  return function(t) {
    e.defaultSelectedIndexs = t;
  };
}, xD = function(e) {
  var t = e.state, n = e.emit;
  return function(r, i, a) {
    r.length === 0 ? (t.defaultSelectedIndexs = [-1], t.headerInfo[t.headerIndex] = {
      isSelected: !1,
      title: "",
      isUP: !1
    }) : (t.defaultSelectedIndexs = r, t.headerInfo[t.headerIndex] = {
      isSelected: !0,
      title: i,
      isUP: !1
    }), t.defaultSelectedArray[t.headerIndex] = t.defaultSelectedIndexs, n("confirm", a, t.headerIndex, r), t.showOptions = !1;
  };
}, PD = function(e, t) {
  var n = e, r = pl([], e, t, 0), i = [];
  return r.length === 0 ? i = [n] : i = [n].concat(Se(r)), i;
}, pl = function(e, t, n, r) {
  var i, a, s = (i = (a = t[n[r]]) === null || a === void 0 ? void 0 : a.children) !== null && i !== void 0 ? i : [];
  return r !== n.length - 1 ? (e.push(s), pl(e, s, n, ++r)) : e;
}, MD = function(e, t) {
  var n = [];
  e.forEach(function(i, a) {
    var s = t[a];
    i[s] && n.push(i[s]);
  });
  var r = n.map(function(i) {
    return i == null ? void 0 : i.label;
  }).join(" ");
  return {
    selectedLabels: r,
    selectedItems: n
  };
}, OD = function(e) {
  var t = e.props, n = e.state;
  return function(r) {
    var i, a, s = (i = t.defaultSelectedArray[r]) !== null && i !== void 0 ? i : [], l = [];
    if ((a = n.dataSource[n.headerIndex]) !== null && a !== void 0 && a.hasFooter) {
      var u = s.length, c = LD(n.wheelData);
      u <= c ? l = s.concat(new Array(c - u).fill(0)) : l = s.slice(0, c);
    } else
      l = s.length > 0 ? s : [-1];
    return l;
  };
}, LD = function(e) {
  var t = 0, n = function(i, a) {
    i.forEach(function(s) {
      var l;
      s.level = a, a > t && (t = a), (s == null || (l = s.children) === null || l === void 0 ? void 0 : l.length) > 0 && n(s.children, a + 1);
    });
  };
  return n(e, 1), t;
}, io = function(e, t, n) {
  var r, i;
  return {
    isSelected: (r = e[t]) === null || r === void 0 ? void 0 : r.isSelected,
    title: (i = e[t]) === null || i === void 0 ? void 0 : i.title,
    isUP: n
  };
}, ND = function(e) {
  var t = e.headerBox, n = e.label;
  if (!t || !n)
    return [];
  var r = aa(sa(t)).width, i = n.map(function(a) {
    return aa(sa(a));
  }).map(function(a) {
    return a.width;
  });
  return i.map(function(a, s) {
    var l = r * 0.25 < a;
    return {
      idx: s,
      labelWidth: a,
      totalWidth: r,
      isOver25: l
    };
  });
}, aa = function(e) {
  return {
    top: e.offsetTop,
    left: e.offsetLeft,
    width: e.offsetWidth,
    height: e.offsetHeight
  };
}, sa = function(e) {
  return e.$el || e;
}, FD = function(e) {
  var t = e.dataSource.length;
  if (t === 1)
    return [{
      flex: 1,
      justifyContent: "space-between"
    }];
  var n = e.labelLevelsInfo.filter(function(a) {
    return a && !a.isOver25;
  }), r = n;
  if (t >= 4)
    return la(e.labelLevelsInfo, {
      width: "".concat((1 / t * 100).toFixed(2), "%")
    });
  if (!r.length || r.length === e.labelLevelsInfo.length)
    return la(e.labelLevelsInfo, {
      maxWidth: "".concat((1 / t * 100).toFixed(2), "%")
    });
  var i;
  return r.length === 1 ? i = ua(e, r, "37.5%") : r.length === 2 && (i = ua(e, r, "50%")), r = r.concat(i), r.reduce(function(a, s) {
    return a[s.idx] = s.maxWidth ? {
      maxWidth: s.maxWidth
    } : {
      maxWidth: "25%"
    }, a;
  }, {});
}, la = function(e, t) {
  return e.reduce(function(n, r, i) {
    return n[i] = t, n;
  }, {});
}, ua = function(e, t, n) {
  var r = e.labelLevelsInfo.map(function(a, s) {
    return s;
  }), i = t.map(function(a) {
    return a.idx;
  });
  return r.filter(function(a) {
    return !i.includes(a);
  }).map(function(a) {
    return {
      idx: a,
      maxWidth: n
    };
  });
}, RD = function(e) {
  var t = e.props, n = e.state, r = e.nextTick, i = e.vm;
  return function() {
    t.disabled || (n.isSearching = !n.isSearching, r(function() {
      n.isSearching && i.$refs.searchInput.focus();
    }));
  };
}, VD = ["state", "created", "handleClick", "confirm", "reset", "wheelChange", "clickWheelItem", "loadDefault", "handleSearchBtnClick", "handleClose", "handleSearchInput"], UD = function(e) {
  var t = e.emitter, n = e.reactive, r = e.computed, i = e.api, a = e.props, s = n({
    dataSource: [],
    wheelData: [],
    isSearching: !1,
    headerIndex: -1,
    showOptions: !1,
    labelLevelsInfo: [],
    labelsStyle: [],
    wheelIndex: [],
    wheelText: "",
    headerInfo: [],
    defaultSelectedIndexs: [],
    defaultSelectedArray: [],
    multiSelectEmitter: t(),
    searchValue: "",
    optionMap: [],
    currentOptions: r(function() {
      return i.computedCurrentOptions();
    }),
    showMask: r(function() {
      return a.mask && s.showOptions;
    })
  });
  return s;
}, HD = function(e) {
  var t = e.api, n = e.props, r = e.state, i = e.emit, a = e.nextTick, s = e.refs, l = e.vm;
  Object.assign(t, {
    state: r,
    created: AD({
      api: t,
      emit: i,
      props: n,
      state: r,
      refs: s,
      nextTick: a
    }),
    initValue: vD({
      props: n,
      emit: i
    }),
    handleClick: SD({
      api: t,
      props: n,
      state: r
    }),
    confirm: kD({
      state: r,
      emit: i
    }),
    reset: ED({
      api: t,
      props: n,
      state: r,
      emit: i
    }),
    wheelChange: BD(r),
    clickWheelItem: xD({
      state: r,
      emit: i
    }),
    loadDefault: OD({
      props: n,
      state: r
    }),
    handleSearchBtnClick: RD({
      props: n,
      state: r,
      nextTick: a,
      vm: l
    }),
    handleOptionSelect: wD({
      api: t,
      state: r,
      emit: i
    }),
    handleClose: DD(r),
    toggleItemExpand: ID({
      state: r
    }),
    computedCurrentOptions: yD({
      state: r,
      props: n
    }),
    updateValue: hD({
      state: r,
      props: n,
      emit: i
    }),
    updateTitle: gD({
      props: n,
      state: r
    }),
    handleSearchInput: TD({
      state: r,
      emit: i
    })
  });
}, $D = function(e) {
  var t = e.api, n = e.watch, r = e.props, i = e.state, a = e.refs, s = e.nextTick;
  n(function() {
    return r.dataSource;
  }, function() {
    t.created({
      props: r,
      state: i,
      refs: a,
      nextTick: s
    });
  }), n(function() {
    return r.defaultSelectedArray;
  }, function() {
    t.created({
      props: r,
      state: i,
      refs: a,
      nextTick: s
    });
  }), n(function() {
    return r.modelValue;
  }, function() {
    t.updateTitle();
  }, {
    deep: !0
  });
}, zD = function(e, t, n) {
  var r = t.onMounted, i = t.reactive, a = t.watch, s = t.provide, l = t.computed, u = n.emit, c = n.nextTick, d = n.refs, p = n.vm, f = n.emitter, m = {}, h = UD({
    emitter: f,
    reactive: i,
    computed: l,
    api: m,
    props: e
  });
  return s("multiSelect", p), HD({
    api: m,
    props: e,
    state: h,
    emit: u,
    nextTick: c,
    refs: d,
    vm: p
  }), $D({
    api: m,
    watch: a,
    props: e,
    state: h,
    refs: d,
    nextTick: c
  }), r(function() {
    m.created({
      props: e,
      state: h,
      refs: d,
      nextTick: c
    });
  }), h.multiSelectEmitter.on("multiSelectItemClick", m.handleOptionSelect), h.multiSelectEmitter.on("toggleItemExpand", m.toggleItemExpand), m;
}, jD = function(e) {
  var t = e.props, n = e.multiSelect;
  return function(r) {
    t.option.disabled || (r.stopPropagation(), t.disabled !== !0 && n.disabled !== !0 && n.state.multiSelectEmitter.emit("multiSelectItemClick", t.option));
  };
}, WD = function(e) {
  var t = e.props, n = e.multiSelect;
  return function(r) {
    t.option.disabled || (r.stopPropagation(), t.disabled !== !0 && n.disabled !== !0 && n.state.multiSelectEmitter.emit("toggleItemExpand", t.option));
  };
}, GD = ["state", "created", "handleClick", "confirm", "reset", "wheelChange", "clickWheelItem", "loadDefault", "toggleExpand"], YD = function(e) {
  var t = e.api, n = e.props, r = e.state, i = e.multiSelect;
  Object.assign(t, {
    state: r,
    handleClick: jD({
      props: n,
      multiSelect: i
    }),
    toggleExpand: WD({
      props: n,
      multiSelect: i
    })
  });
}, KD = function(e, t, n) {
  var r = t.reactive, i = t.inject;
  n.emit, n.nextTick, n.refs, n.vm;
  var a = {}, s = i("multiSelect"), l = r({});
  return YD({
    api: a,
    multiSelect: s,
    props: e,
    state: l
  }), a;
};
const QD = B({
  name: O + "MultiSelectItem",
  components: {
    TinyButton: ye,
    IconChevronDown: Oo()
  },
  props: [...Q, "option", "divided"],
  setup(o, e) {
    return z({ props: o, context: e, renderless: KD, api: GD });
  }
}), XD = ["aria-disabled", "tabindex"], ZD = { class: "tiny-mobile-multi-select-item__wrap" }, JD = { class: "tiny-mobile-multi-select-item__content" };
function qD(o, e, t, n, r, i) {
  var s;
  const a = $("IconChevronDown");
  return A(), w("div", {
    class: P(["tiny-mobile-multi-select-item", {
      "is-active": o.option.active,
      "is-disabled": o.option.disabled,
      "tiny-mobile-multi-select-item--divided": o.divided,
      "has-children": (s = o.option.children) == null ? void 0 : s.length
    }]),
    ref: "multiSelectItem",
    onClick: e[1] || (e[1] = te((...l) => o.handleClick && o.handleClick(...l), ["stop"])),
    onMousedown: e[2] || (e[2] = te(() => {
    }, ["stop"])),
    "aria-disabled": o.option.disabled,
    tabindex: o.option.disabled ? null : -1
  }, [
    T("div", ZD, [
      T("div", JD, [
        (A(!0), w(
          q,
          null,
          ae(o.option.level, (l) => (A(), w("span", {
            key: l,
            class: "tiny-mobile-multi-select-item__content-indent"
          }))),
          128
          /* KEYED_FRAGMENT */
        )),
        o.option.icon ? (A(), G(pe(o.option.icon), {
          key: 0,
          class: "tiny-svg-size"
        })) : x("v-if", !0),
        F(o.$slots, "default", { itemData: o.option }, () => [
          T(
            "span",
            null,
            M(o.option.label),
            1
            /* TEXT */
          )
        ])
      ]),
      o.option.hasChild ? (A(), w(
        "span",
        {
          key: 0,
          class: P(["tiny-mobile-multi-select-item__suffix-icon"]),
          style: H({
            transform: o.option.expanded && !o.slots.suffix ? "rotate(180deg)" : "none"
          }),
          onClick: e[0] || (e[0] = (...l) => o.toggleExpand && o.toggleExpand(...l))
        },
        [
          F(o.$slots, "suffix", {}, () => [
            D(a)
          ])
        ],
        4
        /* STYLE */
      )) : x("v-if", !0)
    ])
  ], 42, XD);
}
const _D = /* @__PURE__ */ W(QD, [["render", qD]]);
var eB = function(e) {
  var t;
  return (typeof process > "u" ? "undefined" : R(process)) === "object" && ((t = process.env) === null || t === void 0 || t.TINY_MODE), _D;
};
const rt = B({
  name: O + "MultiSelectItem",
  inject: {},
  props: C(C({}, j), {}, {
    option: {
      type: Object,
      default: function() {
        return {
          label: ""
        };
      }
    },
    divided: {
      type: Boolean,
      default: !1
    }
  }),
  setup: function(e, t) {
    return K({
      props: e,
      context: t,
      template: eB
    });
  }
}), tB = "3.20.0";
rt.install = function(o) {
  o.component(rt.name, rt);
};
rt.version = tB;
var nB = function(e) {
  return function() {
    e.loadPickerData(), e.loadWheels();
  };
}, oB = function(e) {
  var t = e.props, n = e.state;
  return function() {
    if (n.dataSource = Bn(t.dataSource), n.defaultSelectedIndexs = Bn(t.defaultSelectedIndexs), !!n.dataSource.length) {
      var r = n.dataSource, i = fl([], n.dataSource, n.defaultSelectedIndexs, 0);
      i.length === 0 ? n.pickerData = [r] : n.pickerData = [r].concat(Se(i));
    }
  };
}, fl = function(e, t, n, r) {
  var i, a, s = (i = (a = t[n[r]]) === null || a === void 0 ? void 0 : a.children) !== null && i !== void 0 ? i : [];
  return r !== n.length - 1 ? (e.push(s), fl(e, s, n, ++r)) : e;
}, rB = function(e) {
  var t = e.api, n = e.state;
  return function(r, i) {
    r.length > 1 && r.forEach(function(a, s) {
      if (r[s] !== i[s] && s !== r.length - 1) {
        var l = ml(n.dataSource, r, 0, s);
        n.pickerData.splice(s + 1, 1, l);
      }
    }), t.wheelsTo(r), t.changeWheelItemStyle(n.pickerData, r);
  };
}, ml = function(e, t, n, r) {
  var i, a, s = (i = (a = e[t[n]]) === null || a === void 0 ? void 0 : a.children) !== null && i !== void 0 ? i : [];
  return n !== r ? ml(s, t, ++n, r) : s;
}, iB = function(e) {
  var t = e.api, n = e.state, r = e.nextTick;
  return function(i) {
    r(function() {
      n.wheels.forEach(function(a, s) {
        a.wheelTo(i[s], 0), t.refreshWheel(a);
      });
    });
  };
}, aB = function(e) {
  return function(t) {
    e(function() {
      t.refresh();
    });
  };
}, sB = function(e) {
  var t = e.api, n = e.props, r = e.state, i = e.nextTick, a = e.refs;
  return function() {
    r.wheels.length === 0 && i(function() {
      r.wheels = [];
      var s = a.wheelWrapper;
      if (n.hasFooter)
        for (var l = 0; l < r.pickerData.length; l++)
          t.createWheelHasFooter(s, l);
      else
        t.createWheelNoFooter(s);
    });
  };
}, lB = function(e) {
  var t = e.api, n = e.state, r = e.emit, i = e.BScroll;
  return function(a, s) {
    var l = n.wheels;
    return l[s] ? l[s].refresh() : (l[s] = n.wheels[s] = new i(a.children[s], {
      wheel: {
        selectedIndex: n.defaultSelectedIndexs[s],
        wheelWrapperClass: "wheel-scroll",
        wheelItemClass: "wheel-item"
      },
      probeType: 3
    }), n.prevSelectedIndexs = n.defaultSelectedIndexs, l[s].on("wheelIndexChanged", function() {
      var u = l[s].getSelectedIndex(), c = [].concat(Se(n.prevSelectedIndexs.slice(0, s)), [u], Se(new Array(n.defaultSelectedIndexs.length - s - 1).fill(0)));
      t.wheelChanged(c, n.prevSelectedIndexs), n.prevSelectedIndexs = c, r("change", c);
    }), t.wheelsTo(n.defaultSelectedIndexs), t.changeWheelItemStyle(n.pickerData, n.defaultSelectedIndexs)), l[s];
  };
}, uB = function(e) {
  var t = e.api, n = e.state, r = e.BScroll;
  return function(i) {
    var a = n.wheels;
    return a[0] ? a[0].refresh() : (a[0] = n.wheels[0] = new r(i.children[0], {
      probeType: 3,
      click: !0
    }), t.changeWheelItemStyle(n.pickerData, n.defaultSelectedIndexs), t.refreshWheel(a[0])), a[0];
  };
}, cB = function(e) {
  return function(t, n) {
    t.forEach(function(r, i) {
      e.pickerData[i] = r.map(function(a, s) {
        return a.selected = s === n[i], a;
      });
    });
  };
}, dB = function(e) {
  return function() {
    e.wheels.forEach(function(t) {
      t.destroy();
    }), e.wheels = [], e.pickerData = [], e.prevSelectedIndexs = [], e.defaultSelectedIndexs = [];
  };
}, pB = function(e) {
  var t = e.api, n = e.state, r = e.emit;
  return function(i) {
    t.changeWheelItemStyle(n.pickerData, [i]);
    var a = n.pickerData[0][i];
    if (n.defaultSelectedIndexs[0] !== i) {
      var s = a == null ? void 0 : a.label;
      r("clickWheelItem", [i], s, a);
    } else
      r("clickWheelItem", [], "", []);
  };
}, fB = ["state", "created", "loadPickerData", "wheelChanged", "changeWheelItemStyle", "loadWheels", "createWheelHasFooter", "createWheelNoFooter", "wheelsTo", "refreshWheel", "dealWheels", "clickWheelItem"], mB = function(e) {
  var t = e({
    dataSource: [],
    defaultSelectedIndexs: [],
    pickerData: [],
    wheels: [],
    prevSelectedIndexs: []
  });
  return t;
}, vB = function(e) {
  var t = e.api, n = e.props, r = e.state, i = e.emit, a = e.nextTick, s = e.refs, l = e.BScroll;
  Object.assign(t, {
    state: r,
    created: nB(t),
    loadPickerData: oB({
      props: n,
      state: r
    }),
    wheelChanged: rB({
      api: t,
      state: r
    }),
    changeWheelItemStyle: cB(r),
    loadWheels: sB({
      api: t,
      props: n,
      state: r,
      nextTick: a,
      refs: s
    }),
    createWheelHasFooter: lB({
      api: t,
      state: r,
      emit: i,
      BScroll: l
    }),
    createWheelNoFooter: uB({
      api: t,
      state: r,
      BScroll: l
    }),
    wheelsTo: iB({
      api: t,
      state: r,
      nextTick: a
    }),
    refreshWheel: aB(a),
    dealWheels: dB(r),
    clickWheelItem: pB({
      api: t,
      state: r,
      emit: i
    })
  });
}, hB = function(e) {
  var t = e.watch, n = e.api, r = e.props, i = e.state, a = e.nextTick;
  t(function() {
    return r.defaultSelectedIndexs;
  }, function() {
    n.dealWheels(i), a(function() {
      n.created(n);
    });
  });
}, gB = function(e, t, n, r) {
  var i = t.onMounted, a = t.reactive, s = t.watch, l = n.emit, u = n.nextTick, c = n.refs, d = r.BScroll, p = {}, f = mB(a);
  return vB({
    api: p,
    props: e,
    state: f,
    emit: l,
    nextTick: u,
    refs: c,
    BScroll: d
  }), hB({
    watch: s,
    api: p,
    props: e,
    state: f,
    nextTick: u
  }), i(function() {
    p.created(p);
  }), p;
};
/*!
 * better-scroll / wheel
 * (c) 2016-2022 ustbhuangyi
 * Released under the MIT License.
 */
var Mn = typeof window < "u", Po = Mn && navigator.userAgent.toLowerCase();
Po && Po.indexOf("android") > 0;
(function() {
  if (typeof Po == "string") {
    var o = /os (\d\d?_\d(_\d)?)/, e = o.exec(Po);
    if (!e)
      return !1;
    var t = e[1].split("_").map(function(n) {
      return parseInt(n, 10);
    });
    return t[0] === 13 && t[1] >= 4;
  }
  return !1;
})();
var AB = !1;
if (Mn) {
  var yB = "test-passive";
  try {
    var ca = {};
    Object.defineProperty(ca, "passive", {
      get: function() {
        AB = !0;
      }
    }), window.addEventListener(yB, function() {
    }, ca);
  } catch {
  }
}
var bB = function(e, t) {
  for (var n in t)
    e[n] = t[n];
  return e;
}, vl = Mn && document.createElement("div").style, an = function() {
  if (!Mn)
    return !1;
  for (var o = [{
    key: "standard",
    value: "transform"
  }, {
    key: "webkit",
    value: "webkitTransform"
  }, {
    key: "Moz",
    value: "MozTransform"
  }, {
    key: "O",
    value: "OTransform"
  }, {
    key: "ms",
    value: "msTransform"
  }], e = 0, t = o; e < t.length; e++) {
    var n = t[e];
    if (vl[n.value] !== void 0)
      return n.key;
  }
  return !1;
}();
function Le(o) {
  return an === !1 ? o : an === "standard" ? o === "transitionEnd" ? "transitionend" : o : an + o.charAt(0).toUpperCase() + o.substr(1);
}
an && an !== "standard" && "" + an.toLowerCase();
var SB = Le("transform"), wB = Le("transition");
Mn && Le("perspective") in vl;
var cr = {
  transform: SB,
  transition: wB,
  transitionTimingFunction: Le("transitionTimingFunction"),
  transitionDuration: Le("transitionDuration"),
  transitionDelay: Le("transitionDelay"),
  transformOrigin: Le("transformOrigin"),
  transitionEnd: Le("transitionEnd"),
  transitionProperty: Le("transitionProperty")
};
function ao(o, e) {
  var t = new RegExp("(^|\\s)" + e + "(\\s|$)");
  return t.test(o.className);
}
function TB(o) {
  return Array.prototype.slice.call(o, 0);
}
var CB = {
  // easeOutQuint
  swipe: {
    style: "cubic-bezier(0.23, 1, 0.32, 1)",
    fn: function(e) {
      return 1 + --e * e * e * e * e;
    }
  },
  // easeOutQuard
  swipeBounce: {
    style: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    fn: function(e) {
      return e * (2 - e);
    }
  },
  // easeOutQuart
  bounce: {
    style: "cubic-bezier(0.165, 0.84, 0.44, 1)",
    fn: function(e) {
      return 1 - --e * e * e * e;
    }
  }
}, IB = "plugins.wheel", kB = [{
  key: "wheelTo",
  name: "wheelTo"
}, {
  key: "getSelectedIndex",
  name: "getSelectedIndex"
}, {
  key: "restorePosition",
  name: "restorePosition"
}], EB = kB.map(function(o) {
  return {
    key: o.key,
    sourceKey: IB + "." + o.name
  };
}), da = "wheelIndexChanged", DB = {
  rate: 4
}, BB = (
  /** @class */
  function() {
    function o(e) {
      this.scroll = e, this.init();
    }
    return o.prototype.init = function() {
      this.handleBScroll(), this.handleOptions(), this.handleHooks(), this.refreshBoundary(), this.setSelectedIndex(this.options.selectedIndex);
    }, o.prototype.handleBScroll = function() {
      this.scroll.proxy(EB), this.scroll.registerType([da]);
    }, o.prototype.handleOptions = function() {
      var e = this.scroll.options.wheel === !0 ? {} : this.scroll.options.wheel, t = {
        wheelWrapperClass: "wheel-scroll",
        wheelItemClass: "wheel-item",
        rotate: 25,
        adjustTime: 400,
        selectedIndex: 0,
        wheelDisabledItemClass: "wheel-disabled-item"
      };
      this.options = bB(t, e);
    }, o.prototype.handleHooks = function() {
      var e = this, t = this.scroll, n = this.scroll.scroller, r = n.actionsHandler, i = n.scrollBehaviorX, a = n.scrollBehaviorY, s = n.animater, l = n.content;
      t.on(t.eventTypes.scrollEnd, function(u) {
        var c = e.findNearestValidWheel(u.y).index;
        if (n.animater.forceStopped && !e.isAdjustingPosition)
          return e.target = e.items[c], !0;
        e.setSelectedIndex(c), e.isAdjustingPosition && (e.isAdjustingPosition = !1);
      }), this.scroll.hooks.on(this.scroll.hooks.eventTypes.refresh, function(u) {
        u !== l && (l = u, e.setSelectedIndex(e.options.selectedIndex, !0)), e.rotateX(e.scroll.y), e.wheelTo(e.selectedIndex, 0);
      }), this.scroll.hooks.on(this.scroll.hooks.eventTypes.beforeInitialScrollTo, function(u) {
        u.x = 0, u.y = -(e.selectedIndex * e.itemHeight);
      }), n.hooks.on(n.hooks.eventTypes.checkClick, function() {
        var u = TB(e.items).indexOf(e.target);
        return u === -1 || e.wheelTo(u, e.options.adjustTime, CB.swipe), !0;
      }), n.hooks.on(n.hooks.eventTypes.scrollTo, function(u) {
        u.y = e.findNearestValidWheel(u.y).y;
      }), n.hooks.on(n.hooks.eventTypes.minDistanceScroll, function() {
        var u = n.animater;
        u.forceStopped === !0 && (u.forceStopped = !1);
      }), n.hooks.on(n.hooks.eventTypes.scrollToElement, function(u, c) {
        if (ao(u, e.options.wheelItemClass))
          c.top = e.findNearestValidWheel(c.top).y;
        else
          return !0;
      }), r.hooks.on(r.hooks.eventTypes.beforeStart, function(u) {
        e.target = u.target;
      }), i.hooks.on(i.hooks.eventTypes.computeBoundary, function(u) {
        u.maxScrollPos = 0, u.minScrollPos = 0;
      }), a.hooks.on(a.hooks.eventTypes.computeBoundary, function(u) {
        e.items = e.scroll.scroller.content.children, e.checkWheelAllDisabled(), e.itemHeight = e.items.length > 0 ? a.contentSize / e.items.length : 0, u.maxScrollPos = -e.itemHeight * (e.items.length - 1), u.minScrollPos = 0;
      }), a.hooks.on(a.hooks.eventTypes.momentum, function(u) {
        u.rate = DB.rate, u.destination = e.findNearestValidWheel(u.destination).y;
      }), a.hooks.on(a.hooks.eventTypes.end, function(u) {
        var c = e.findNearestValidWheel(a.currentPos);
        u.destination = c.y, u.duration = e.options.adjustTime;
      }), s.hooks.on(s.hooks.eventTypes.time, function(u) {
        e.transitionDuration(u);
      }), s.hooks.on(s.hooks.eventTypes.timeFunction, function(u) {
        e.timeFunction(u);
      }), s.hooks.on(s.hooks.eventTypes.callStop, function() {
        var u = e.findNearestValidWheel(e.scroll.y).index;
        e.isAdjustingPosition = !0, e.wheelTo(u, 0);
      }), s.translater.hooks.on(s.translater.hooks.eventTypes.translate, function(u) {
        e.rotateX(u.y);
      });
    }, o.prototype.refreshBoundary = function() {
      var e = this.scroll.scroller, t = e.scrollBehaviorX, n = e.scrollBehaviorY, r = e.content;
      t.refresh(r), n.refresh(r);
    }, o.prototype.setSelectedIndex = function(e, t) {
      t === void 0 && (t = !1);
      var n = this.selectedIndex;
      this.selectedIndex = e, n !== e && !t && this.scroll.trigger(da, e);
    }, o.prototype.getSelectedIndex = function() {
      return this.selectedIndex;
    }, o.prototype.wheelTo = function(e, t, n) {
      e === void 0 && (e = 0), t === void 0 && (t = 0);
      var r = -e * this.itemHeight;
      this.scroll.scrollTo(0, r, t, n);
    }, o.prototype.restorePosition = function() {
      var e = this.scroll.pending;
      if (e) {
        var t = this.getSelectedIndex();
        this.scroll.scroller.animater.clearTimer(), this.wheelTo(t, 0);
      }
    }, o.prototype.transitionDuration = function(e) {
      for (var t = 0; t < this.items.length; t++)
        this.items[t].style[cr.transitionDuration] = e + "ms";
    }, o.prototype.timeFunction = function(e) {
      for (var t = 0; t < this.items.length; t++)
        this.items[t].style[cr.transitionTimingFunction] = e;
    }, o.prototype.rotateX = function(e) {
      for (var t = this.options.rotate, n = t === void 0 ? 25 : t, r = 0; r < this.items.length; r++) {
        var i = n * (e / this.itemHeight + r), a = i.toFixed(3);
        this.items[r].style[cr.transform] = "rotateX(" + a + "deg)";
      }
    }, o.prototype.findNearestValidWheel = function(e) {
      e = e > 0 ? 0 : e < this.scroll.maxScrollY ? this.scroll.maxScrollY : e;
      for (var t = Math.abs(Math.round(-e / this.itemHeight)), n = t, r = this.items, i = this.options.wheelDisabledItemClass; t >= 0 && ao(r[t], i); )
        t--;
      if (t < 0)
        for (t = n; t <= r.length - 1 && ao(r[t], i); )
          t++;
      return t === r.length && (t = n), {
        index: this.wheelItemsAllDisabled ? -1 : t,
        y: -t * this.itemHeight
      };
    }, o.prototype.checkWheelAllDisabled = function() {
      var e = this.options.wheelDisabledItemClass, t = this.items;
      this.wheelItemsAllDisabled = !0;
      for (var n = 0; n < t.length; n++)
        if (!ao(t[n], e)) {
          this.wheelItemsAllDisabled = !1;
          break;
        }
    }, o.pluginName = "wheel", o;
  }()
);
Wr.use(BB);
const xB = B({
  name: O + "Wheel",
  components: {
    IconYes: Yl()
  },
  props: {
    dataSource: {
      type: Array,
      default: () => []
    },
    defaultSelectedIndexs: {
      type: Array,
      default: () => []
    },
    hasFooter: {
      type: Boolean,
      default: !0
    }
  },
  setup(o, e) {
    return z({ props: o, context: e, renderless: gB, api: fB, mono: !0, extendOptions: { BScroll: Wr } });
  }
}), PB = { class: "tiny-mobile-wheel" }, MB = { class: "tiny-mobile-wheel__container" }, OB = { class: "tiny-mobile-wheel__picker__content" }, LB = {
  class: "tiny-mobile-wheel__wheel__wrapper",
  ref: "wheelWrapper"
}, NB = {
  key: 0,
  class: "wheel__scroll_hasFooter"
}, FB = {
  key: 1,
  class: "wheel__scroll_noFooter"
}, RB = ["onClick"];
function VB(o, e, t, n, r, i) {
  const a = $("IconYes");
  return A(), w("div", PB, [
    T("div", MB, [
      D($e, { name: "picker-move" }, {
        default: ee(() => [
          T("div", {
            class: "tiny-mobile-wheel__picker__panel",
            onClick: e[0] || (e[0] = te(() => {
            }, ["stop"]))
          }, [
            T("div", OB, [
              T(
                "div",
                LB,
                [
                  (A(!0), w(
                    q,
                    null,
                    ae(o.state.pickerData, (s, l) => (A(), w("div", {
                      class: "wheel",
                      key: l
                    }, [
                      o.hasFooter ? (A(), w("ul", NB, [
                        (A(!0), w(
                          q,
                          null,
                          ae(s, (u) => (A(), w(
                            "li",
                            {
                              key: u.label,
                              class: P([u.selected ? "wheel__item__selected" : "", "wheel__item"])
                            },
                            M(u.label),
                            3
                            /* TEXT, CLASS */
                          ))),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ])) : (A(), w("ul", FB, [
                        (A(!0), w(
                          q,
                          null,
                          ae(s, (u, c) => (A(), w("li", {
                            key: u.label,
                            class: P([u.selected ? "wheel__item__selected" : "", "wheel__item"]),
                            onClick: (d) => o.clickWheelItem(c)
                          }, [
                            ue(
                              M(u.label) + " ",
                              1
                              /* TEXT */
                            ),
                            u.selected ? (A(), G(a, {
                              key: 0,
                              class: "size20"
                            })) : x("v-if", !0)
                          ], 10, RB))),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ]))
                    ]))),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ],
                512
                /* NEED_PATCH */
              )
            ])
          ])
        ]),
        _: 1
        /* STABLE */
      })
    ])
  ]);
}
const He = /* @__PURE__ */ W(xB, [["render", VB]]);
const UB = "3.20.0";
He.model = {
  prop: "modelValue",
  event: "update:modelValue"
};
He.install = function(o) {
  o.component(He.name, He);
};
He.version = UB;
const HB = B({
  name: O + "MultiSelect",
  components: {
    IconChevronDown: Oo(),
    IconSearch: Ia(),
    TinyButton: ye,
    TinyWheel: He,
    TinyMask: ot,
    TinyMultiSelectItem: rt,
    TinyInput: Be
  },
  directives: mn({ Clickoutside: ai }),
  props: {
    dataSource: {
      type: Array,
      default: () => []
    },
    modelValue: {
      type: [String, Array],
      default: ""
    },
    searchValue: {
      type: String,
      default: ""
    },
    defaultSelectedArray: {
      type: Array,
      default: () => []
    },
    filterable: {
      type: Boolean,
      default: !1
    },
    searchPlaceholder: {
      type: String,
      default: () => Wt("ui.search.placeholder")
    },
    type: {
      type: String,
      default: "list"
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    mask: {
      type: Boolean,
      default: !1
    },
    maskOptions: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update:modelValue", "update:searchValue", "item-click"],
  setup(o, e) {
    return z({ props: o, context: e, renderless: zD, api: VD });
  }
}), $B = { class: "tiny-mobile-multi-select" }, zB = { class: "tiny-mobile-multi-select__header-item-box" }, jB = ["onClick"], WB = { class: "tiny-mobile-multi-select__header-search" }, GB = {
  key: 0,
  class: "tiny-mobile-multi-select__option-list"
}, YB = { class: "tiny-mobile-multi-select__footer" };
function KB(o, e, t, n, r, i) {
  var m, h;
  const a = $("IconChevronDown"), s = $("IconSearch"), l = $("tiny-input"), u = $("tiny-mask"), c = $("tiny-multi-select-item"), d = $("tiny-wheel"), p = $("tiny-button"), f = sn("clickoutside");
  return oe((A(), w("div", $B, [
    T(
      "div",
      {
        class: P([
          "tiny-mobile-multi-select__header",
          { "show-search": o.filterable, "is-searching": o.state.isSearching, "is-disabled": o.disabled }
        ]),
        ref: "headerBox"
      },
      [
        o.state.isSearching ? (A(), w(
          q,
          { key: 1 },
          [
            T("div", WB, [
              D(l, {
                ref: "searchInput",
                type: "text",
                modelValue: o.state.searchValue,
                "onUpdate:modelValue": e[1] || (e[1] = (v) => o.state.searchValue = v),
                placeholder: o.searchPlaceholder,
                onInput: o.handleSearchInput
              }, {
                prefix: ee(() => [
                  D(s, { class: "tiny-mobile-multi-select__header-prefix-icon" })
                ]),
                _: 1
                /* STABLE */
              }, 8, ["modelValue", "placeholder", "onInput"])
            ]),
            T(
              "div",
              {
                class: "tiny-mobile-multi-select__header-cancel-btn",
                onClick: e[2] || (e[2] = (...v) => o.handleSearchBtnClick && o.handleSearchBtnClick(...v))
              },
              M(o.t("ui.base.cancel")),
              1
              /* TEXT */
            )
          ],
          64
          /* STABLE_FRAGMENT */
        )) : (A(), w(
          q,
          { key: 0 },
          [
            T("div", zB, [
              (A(!0), w(
                q,
                null,
                ae(o.dataSource, (v, g) => {
                  var b, y, S, I;
                  return A(), w("div", {
                    key: g,
                    class: P(["tiny-mobile-multi-select__header-item", { "item-disabled": v.disabled }]),
                    onClick: (k) => o.handleClick(g),
                    style: H(o.state.labelsStyle[g])
                  }, [
                    T(
                      "div",
                      {
                        class: P([
                          "tiny-mobile-multi-select__header__label",
                          (b = o.state.headerInfo[g]) != null && b.isSelected ? "tiny-mobile-multi-select__header__active" : ""
                        ])
                      },
                      M((y = o.state.headerInfo[g]) == null ? void 0 : y.title),
                      3
                      /* TEXT, CLASS */
                    ),
                    T(
                      "div",
                      {
                        class: P([
                          "tiny-mobile-multi-select__header__icon",
                          (S = o.state.headerInfo[g]) != null && S.isSelected ? "tiny-mobile-multi-select__header__active" : ""
                        ]),
                        style: H({
                          transform: (I = o.state.headerInfo[g]) != null && I.isUP ? "rotate(180deg)" : "none"
                        })
                      },
                      [
                        D(a)
                      ],
                      6
                      /* CLASS, STYLE */
                    )
                  ], 14, jB);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ]),
            oe(T(
              "div",
              {
                class: "tiny-mobile-multi-select__header-search-icon",
                onClick: e[0] || (e[0] = (...v) => o.handleSearchBtnClick && o.handleSearchBtnClick(...v))
              },
              [
                D(s)
              ],
              512
              /* NEED_PATCH */
            ), [
              [he, o.filterable && o.state.showOptions]
            ])
          ],
          64
          /* STABLE_FRAGMENT */
        ))
      ],
      2
      /* CLASS */
    ),
    D(u, {
      visible: o.state.showMask,
      onClick: o.handleClose
    }, null, 8, ["visible", "onClick"]),
    oe(T(
      "div",
      {
        class: P(["tiny-mobile-multi-select__content", (m = o.dataSource[o.state.headerIndex]) != null && m.hasFooter ? "" : "noFooter"])
      },
      [
        o.type === "list" ? (A(), w("div", GB, [
          (A(!0), w(
            q,
            null,
            ae(o.state.currentOptions, (v, g) => (A(), G(c, {
              option: v,
              key: g
            }, null, 8, ["option"]))),
            128
            /* KEYED_FRAGMENT */
          ))
        ])) : (A(), G(d, {
          key: 1,
          "data-source": o.state.wheelData,
          "default-selected-indexs": o.state.defaultSelectedIndexs,
          "has-footer": (h = o.dataSource[o.state.headerIndex]) == null ? void 0 : h.hasFooter,
          onChange: o.wheelChange,
          onClickWheelItem: o.clickWheelItem
        }, null, 8, ["data-source", "default-selected-indexs", "has-footer", "onChange", "onClickWheelItem"])),
        F(o.$slots, "footer", {}, () => {
          var v;
          return [
            oe(T(
              "div",
              YB,
              [
                D(p, {
                  round: "",
                  size: "large",
                  type: "secondary",
                  onClick: o.reset
                }, {
                  default: ee(() => [
                    ue(
                      M(o.t("ui.base.reset")),
                      1
                      /* TEXT */
                    )
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["onClick"]),
                D(p, {
                  round: "",
                  size: "large",
                  type: "primary",
                  onClick: o.confirm
                }, {
                  default: ee(() => [
                    ue(
                      M(o.t("ui.button.confirm")),
                      1
                      /* TEXT */
                    )
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["onClick"])
              ],
              512
              /* NEED_PATCH */
            ), [
              [he, o.state.showOptions && ((v = o.dataSource[o.state.headerIndex]) == null ? void 0 : v.hasFooter)]
            ])
          ];
        })
      ],
      2
      /* CLASS */
    ), [
      [he, o.state.showOptions]
    ])
  ])), [
    [f, o.handleClose]
  ]);
}
const QB = /* @__PURE__ */ W(HB, [["render", KB]]);
var XB = function(e) {
  var t;
  return (typeof process > "u" ? "undefined" : R(process)) === "object" && ((t = process.env) === null || t === void 0 || t.TINY_MODE), QB;
};
const it = B({
  name: O + "MultiSelect",
  inject: {},
  props: C(C({}, j), {}, {
    dataSource: {
      type: Array,
      default: function() {
        return [];
      }
    },
    modelValue: {
      type: [String, Array],
      default: ""
    },
    searchValue: {
      type: String,
      default: ""
    },
    defaultSelectedArray: {
      type: Array,
      default: function() {
        return [];
      }
    },
    filterable: {
      type: Boolean,
      default: !1
    },
    searchPlaceholder: {
      type: String,
      default: function() {
        return Wt("ui.search.placeholder");
      }
    },
    type: {
      type: String,
      default: "list"
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    mask: {
      type: Boolean,
      default: !1
    },
    maskOptions: {
      type: Object,
      default: function() {
        return {};
      }
    }
  }),
  setup: function(e, t) {
    return K({
      props: e,
      context: t,
      template: XB
    });
  }
});
const ZB = "3.20.0";
it.model = {
  prop: "modelValue",
  event: "update:modelValue"
};
it.install = function(o) {
  o.component(it.name, it);
};
it.version = ZB;
const Ut = /* @__PURE__ */ B({
  name: O + "NavBar",
  props: {
    tiny_renderless: Function,
    title: String,
    subTitle: String,
    fixed: Boolean,
    zIndex: [Number, String],
    leftText: String,
    rightText: String,
    leftArrow: Boolean,
    rightArrow: Boolean
  },
  components: {
    LeftIcon: Ca(),
    RightIcon: Hr()
  },
  render() {
    const {
      leftArrow: o,
      rightArrow: e,
      leftText: t,
      rightText: n,
      $listeners: r,
      $attrs: i,
      title: a,
      zIndex: s,
      fixed: l,
      subTitle: u
    } = this, c = "$scopedSlots" in this ? this.$slots : this.$slots;
    function d() {
    }
    function p() {
      return c.left ? c.left() : [o && D($("left-icon"), {
        class: "tiny-mobile-nav-bar__icon left-icon"
      }, null), t && J("span", {
        class: "tiny-mobile-nav-bar__text left-text"
      }, t)];
    }
    function f() {
      return c.right ? c.right() : [e && D($("right-icon"), {
        class: "tiny-mobile-nav-bar__icon right-icon"
      }, null), n && D("span", {
        class: "tiny-mobile-nav-bar__text right-text"
      }, [n])];
    }
    let m = i && i.onClickLeft, h = i && i.onClickRight;
    return m || (m = r && r["click-left"] || d), h || (h = r && r["click-right"] || d), D("div", {
      style: {
        zIndex: s
      },
      class: {
        "tiny-mobile-nav-bar": !0,
        "tiny-mobile-nav-bar__fixed": l
      }
    }, [D("div", {
      class: "tiny-mobile-nav-bar__left",
      onClick: m
    }, [p()]), D("div", {
      class: "tiny-mobile-nav-bar__title"
    }, [D("p", {
      class: "main-title"
    }, [c.default ? c.default() : a]), D("p", {
      class: {
        "is-show-subtitle": u,
        "sub-title": !0
      }
    }, [u])]), D("div", {
      class: "tiny-mobile-nav-bar__right",
      onClick: h
    }, [f()])]);
  }
});
const JB = "3.20.0";
Ut.install = function(o) {
  o.component(Ut.name, Ut);
};
Ut.version = JB;
var qB = function(e) {
  var t = e || {}, n = t.utils, r = n === void 0 ? {} : n, i = function() {
    return null;
  };
  return {
    getUnitPrecision: r.getUnitPrecision || i,
    getNumberFormat: r.getNumberFormat || i
  };
}, _B = function(e) {
  return function(t) {
    return gt(t, e.plugin);
  };
}, ex = function(e) {
  var t = e.api, n = e.props, r = e.state;
  return function(i) {
    i !== r.currentValue && t.setCurrentValue(i, n.changeCompat);
  };
}, tx = function(e) {
  return function(t) {
    var n = t.num, r = t.precision;
    return r === void 0 && (r = e.numPrecision), parseFloat(Math.round(n * Math.pow(10, r)) / Math.pow(10, r));
  };
}, nx = function() {
  return function(e) {
    if (e === void 0)
      return 0;
    var t = e.toString(), n = t.indexOf("."), r = 0;
    return n !== -1 && (r = t.length - n - 1), r;
  };
}, ox = function(e) {
  var t = e.api, n = e.state;
  return function(r) {
    var i = r.val, a = r.step, s = t.getDecimal(i);
    if (s.isNaN() && i !== void 0)
      return n.currentValue;
    var l = s.add(a).toString();
    return l;
  };
}, rx = function(e) {
  var t = e.api, n = e.state;
  return function(r) {
    var i = r.val, a = r.step, s = t.getDecimal(i);
    if (s.isNaN() && i !== void 0)
      return n.currentValue;
    var l = s.add("-".concat(a)).toString();
    return l;
  };
}, ix = function(e) {
  var t = e.api, n = e.props, r = e.state;
  return function() {
    var i, a;
    if (!(r.inputDisabled || r.maxDisabled)) {
      var s = n.stringMode ? r.userInput : Number(r.userInput), l = (n.mouseWheel ? r.displayValue : s) || 0;
      if (!l.toString().includes("e")) {
        var u = t.internalIncrease({
          val: l,
          step: (i = (a = n.step) === null || a === void 0 ? void 0 : a.value) !== null && i !== void 0 ? i : n.step
        });
        if (!n.circulate || !isFinite(n.max) || !isFinite(n.min)) {
          t.setCurrentValue(u);
          return;
        }
        (!cn(u, n.max) || cn(u, n.min)) && (u = n.min), t.setCurrentValue(u);
      }
    }
  };
}, ax = function(e) {
  var t = e.api, n = e.props, r = e.state;
  return function() {
    var i, a;
    if (!(r.inputDisabled || r.minDisabled)) {
      var s = n.stringMode ? r.userInput : Number(r.userInput), l = (n.mouseWheel ? r.displayValue : s) || 0;
      if (!l.toString().includes("e")) {
        var u = t.internalDecrease({
          val: l,
          step: (i = (a = n.step) === null || a === void 0 ? void 0 : a.value) !== null && i !== void 0 ? i : n.step
        });
        if (!n.circulate || !isFinite(n.max) || !isFinite(n.min)) {
          t.setCurrentValue(u);
          return;
        }
        (!cn(n.min, u) || cn(n.max, u)) && (u = n.max), t.setCurrentValue(u);
      }
    }
  };
}, sx = function(e) {
  var t = e.constants, n = e.dispatch, r = e.emit, i = e.props, a = e.state, s = e.api;
  return function(l) {
    a.inputStatus = !1, s.setCurrentValue(l.target.value), r("blur", l), i.validateEvent && n(t.COMPONENT_NAME, t.EVENT_NAME.blur, [a.displayValue]);
  };
}, lx = function(e) {
  var t = e.emit, n = e.state, r = e.props, i = e.api, a = e.vm;
  return function(s) {
    r.disabled && a.$refs.input.blur(), n.inputStatus = !0;
    var l = i.getDecimal(n.currentValue);
    if (!l.isNaN() && !ke(n.currentValue)) {
      var u = (l.toString().split(".")[1] || "").length;
      u < n.format.fraction && r.holdZero && (n.currentValue = ps(n.currentValue, {
        fraction: n.format.fraction
      }), n.userInput = n.currentValue, n.lastInput = n.currentValue);
    }
    t("focus", s);
  };
}, ux = function(e) {
  return function() {
    e.$refs.input.focus();
  };
}, cx = function(e) {
  var t = e.newVal, n = e.emitValue, r = e.allowEmpty, i = e.defaultVal, a = e.bigNew, s = e.oldVal, l = e.emptyValue, u = e.max, c = e.min, d = e.api, p = e.props, f = e.format, m = e.plugin, h = e.stringMode;
  return !t && t !== 0 ? n = r ? l : i : a.isNaN() ? n = s : (isFinite(u) && cn(u, t) && (t = u), isFinite(c) && cn(t, c) && (t = c), n = d.getDecimal(t).toString(), p.modelTruncation && (n = Jr(n, f.fraction, f.rounding, m)), p.holdZero || (n = d.getDecimal(n).toString()), h || (n = Number(n))), {
    newVal: t,
    emitValue: n
  };
}, dx = function(e) {
  var t = e.api, n = e.constants, r = e.dispatch, i = e.emit, a = e.props, s = e.state;
  return function(l) {
    var u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, c = a.max, d = a.min, p = a.allowEmpty, f = a.validateEvent, m = a.stringMode, h = a.plugin, v = a.emptyValue, g = s.format, b = s.currentValue, y = t.getDecimal(l), S = isFinite(d) ? d : 0, I = y.toString();
    if (Ef(s.currentValue, l)) {
      s.userInput = s.currentValue;
      return;
    }
    var k = {
      newVal: l,
      emitValue: I,
      allowEmpty: p,
      defaultVal: S,
      bigNew: y,
      oldVal: b,
      emptyValue: v
    };
    Object.assign(k, {
      max: c,
      min: d,
      api: t,
      props: a,
      format: g,
      plugin: h,
      stringMode: m
    });
    var E = cx(k);
    if (l = E.newVal, I = E.emitValue, s.userInput = I, s.lastInput = I, I !== b) {
      var L, V;
      if (i("update:modelValue", I), u && i("change", I, b), s.currentValue = I, s.userInput = I, f && b === "" && r(n.COMPONENT_NAME, n.EVENT_NAME.blur, [s.currentValue]), f && r(n.COMPONENT_NAME, n.EVENT_NAME.change, [s.currentValue]), a.step instanceof Object && ((L = a.step) === null || L === void 0 ? void 0 : L.mode) === "restore" && (V = a.step) !== null && V !== void 0 && V.value) {
        var Y = Number(a.step.value);
        Y > 1 && l % Y !== 0 && (s.currentValue = b, s.userInput = b);
      }
    }
  };
}, px = function(e) {
  var t = e.state, n = e.api, r = e.emit, i = e.props;
  return function(a) {
    if (!a.isComposing) {
      var s = t.format.fraction, l = function() {
        t.pasting && r("paste-error", a.target.value);
      }, u = a.target.value.replace(/^-+/, "-");
      u !== "-" && n.getDecimal(u).isNaN() ? (l(), u === "" && i.allowEmpty || (u = t.lastInput)) : u = u.split(".").map(function(c, d) {
        return d && c.length > s && l(), d && t.strictInput && typeof s == "number" ? c.substr(0, s) : c;
      }).join("."), a.target.value = ke(u) ? "" : u, t.lastInput = u, t.userInput = u;
    }
  };
}, fx = function(e) {
  var t = e.api, n = e.state, r = e.props;
  return function(i) {
    var a, s, l, u = ((a = i.target) === null || a === void 0 ? void 0 : a.value) === "-" ? 0 : (s = i.target) === null || s === void 0 ? void 0 : s.value;
    if (r.stepStrictly || R(r.step) === "object" && ((l = r.step) === null || l === void 0 ? void 0 : l.mode) === "strictly") {
      var c = Number((r.mouseWheel ? n.displayValue : r.modelValue) || 0);
      if (Math.abs(c - u) % Number(r.step) === 0 || Math.abs(c - u) % Number(r.step.value) === 0)
        return t.setCurrentValue(u);
      var d = Number(r.step) || Number(r.step.value), p = u - c, f = p >= 0 ? 1 : -1;
      return t.setCurrentValue(f * Math.round(Math.abs(p) / d) * d + c);
    }
    t.setCurrentValue(u);
  };
}, mx = function(e) {
  return function() {
    return e.$refs.input.select();
  };
}, vx = function(e) {
  var t = e.constants, n = e.parent, r = e.props, i = e.state;
  return function() {
    r.shape === "filter" && (i.controls = !1), Te(i.currentValue) && i.currentValue < r.min && (i.currentValue = r.min, i.lastInput = r.min, i.userInput = r.min), Te(i.currentValue) && i.currentValue > r.max && (i.currentValue = r.max, i.lastInput = r.max, i.userInput = r.max);
    var a = n.$el.querySelector("input");
    a.setAttribute(t.KEY, t.VALUE), a.setAttribute(t.MAX, r.max), a.setAttribute(t.MIN, r.min), a.setAttribute(t.VALUENOW, i.currentValue), a.setAttribute(t.DISABLED, i.inputDisabled), i.onPase = function() {
      i.pasting = !0, setTimeout(function() {
        return i.pasting = !1;
      });
    }, N(a, "paste", i.onPase);
  };
}, hx = function(e) {
  var t = e.parent, n = e.state;
  return function() {
    var r = t.$el.querySelector("input");
    U(r, "paste", n.onPase);
  };
}, gx = function(e) {
  var t = e.constants, n = e.parent, r = e.state;
  return function() {
    var i = n.$el.querySelector("input");
    i && i.setAttribute(t.VALUENOW, r.currentValue);
  };
}, Ax = function(e) {
  var t = e.props, n = e.state, r = e.api;
  return function() {
    var i = n.currentValue, a = n.inputStatus, s = n.userInput;
    return t.shape === "filter" && t.filter && r.filterValue(), a ? s : t.allowEmpty && i === "" ? "" : ps(i, n.format);
  };
}, yx = function(e) {
  var t = e.api, n = e.props;
  return function() {
    var r, i, a = (r = (i = n.step) === null || i === void 0 ? void 0 : i.value) !== null && r !== void 0 ? r : n.step, s = t.getPrecision(a);
    return n.precision !== void 0 ? n.precision : Math.max(t.getPrecision(n.modelValue), s);
  };
}, bx = function(e) {
  var t = e.api, n = e.props, r = e.state;
  return function(i) {
    if (n.mouseWheel && r.inputStatus) {
      var a = 0;
      return i.wheelDelta && (a = i.wheelDelta / tm), a > 0 ? t.increase() : t.decrease(), !1;
    }
  };
}, Sx = function(e) {
  var t = e.service, n = e.props, r, i, a = n.format, s = a === void 0 ? {} : a, l = n.precision, u = n.unit, c = {
    groupSeparator: "",
    decimalSeparator: ".",
    zeroize: n.holdZero
  }, d = t.getUnitPrecision, p = t.getNumberFormat, f = d(u) || {}, m = p() || {};
  return r = Te(l) ? l : Te(s.fraction) ? s.fraction : f.fraction, i = Te(s.rounding) ? s.rounding : f.rounding, C(C(C({}, c), {}, {
    fraction: r,
    rounding: i
  }, m), s);
}, wx = function(e) {
  var t = e.parent, n = e.state, r = e.props;
  return function() {
    var i = r.showEmptyValue || (t.tinyForm || {}).showEmptyValue;
    return i || n.displayValue || n.displayValue === 0 ? n.displayValue : "-";
  };
}, Tx = function(e) {
  var t = e.state;
  return function() {
    return (t.radioVal || "") + t.lastInput;
  };
}, Cx = function(e) {
  var t = e.state, n = e.emit;
  return function() {
    t.currentValue = "", t.userInput = "", t.lastInput = "", t.radioVal = "", n("clear");
  };
}, Ix = function(e) {
  var t = e.state, n = e.emit;
  return function() {
    n("filter-change", t.radioVal);
  };
}, kx = ["state", "decrease", "increase", "handleBlur", "handleFocus", "handleInput", "handleInputChange", "mouseEvent", "focus", "select", "handleClear", "handleChange"], Ex = function(e) {
  var t = e.reactive, n = e.computed, r = e.props, i = e.api, a = e.$service, s = e.constants, l = e.parent, u = t({
    currentValue: r.modelValue,
    userInput: r.modelValue,
    lastInput: r.modelValue,
    inputStatus: !1,
    decimal: null,
    strictInput: n(function() {
      return r.strictInput;
    }),
    inputSize: n(function() {
      return r.size || u.formSize;
    }),
    formSize: n(function() {
      return (l.tinyForm || {}).size;
    }),
    formDisabled: n(function() {
      return (l.tinyForm || {}).disabled;
    }),
    inputDisabled: n(function() {
      return r.disabled || u.formDisabled;
    }),
    displayValue: n(function() {
      return i.displayValue();
    }),
    numPrecision: n(function() {
      return i.getNumPecision();
    }),
    minDisabled: n(function() {
      return !r.circulate && u.currentValue <= r.min || u.formDisabled;
    }),
    maxDisabled: n(function() {
      return !r.circulate && u.currentValue >= r.max || u.formDisabled;
    }),
    controlsAtRight: n(function() {
      return r.controls && r.controlsPosition === "right";
    }),
    format: n(function() {
      return Sx({
        service: a,
        props: r
      });
    }),
    filterMenu: s.FILTER_OPTION,
    filterValue: n(function() {
      return i.filterValue();
    }),
    handleClear: n(function() {
      return i.handleClear();
    }),
    handleChange: n(function() {
      return i.handleClear();
    }),
    isDisplayOnly: n(function() {
      return r.displayOnly || (l.tinyForm || {}).displayOnly;
    }),
    displayOnlyText: n(function() {
      return i.getDisplayOnlyText();
    }),
    controls: r.controls
  });
  return u;
}, Dx = function(e) {
  var t = e.api, n = e.props, r = e.state, i = e.parent, a = e.vm, s = e.emit, l = e.dispatch, u = e.constants;
  e.nextTick, Object.assign(t, {
    state: r,
    focus: ux(a),
    select: mx(a),
    getPrecision: nx(),
    toPrecision: tx(r),
    updated: gx({
      constants: u,
      parent: i,
      state: r
    }),
    mounted: vx({
      constants: u,
      parent: i,
      props: n,
      state: r
    }),
    unmounted: hx({
      parent: i,
      state: r
    }),
    getDecimal: _B(n),
    handleFocus: lx({
      emit: s,
      state: r,
      props: n,
      api: t,
      vm: a
    }),
    decrease: ax({
      api: t,
      props: n,
      state: r
    }),
    increase: ix({
      api: t,
      props: n,
      state: r
    }),
    handleInput: px({
      state: r,
      api: t,
      emit: s,
      props: n
    }),
    getNumPecision: yx({
      api: t,
      props: n
    }),
    displayValue: Ax({
      props: n,
      state: r,
      api: t
    }),
    internalDecrease: rx({
      api: t,
      state: r
    }),
    internalIncrease: ox({
      api: t,
      state: r
    }),
    handleInputChange: fx({
      api: t,
      state: r,
      props: n
    }),
    mouseEvent: bx({
      api: t,
      props: n,
      state: r
    }),
    handleBlur: sx({
      constants: u,
      dispatch: l,
      emit: s,
      props: n,
      state: r,
      api: t
    }),
    watchValue: ex({
      api: t,
      props: n,
      state: r
    }),
    setCurrentValue: dx({
      api: t,
      constants: u,
      dispatch: l,
      emit: s,
      props: n,
      state: r
    }),
    getDisplayOnlyText: wx({
      parent: i,
      props: n,
      state: r
    }),
    filterValue: Tx({
      state: r
    }),
    handleClear: Cx({
      state: r,
      emit: s
    }),
    handleChange: Ix({
      state: r,
      emit: s
    })
  }), t.getDecimal(0);
}, Bx = function(e) {
  var t = e.watch, n = e.props, r = e.api;
  t(function() {
    return [n.max, n.min];
  }, function(i) {
    var a = Gt(i, 2), s = a[0], l = a[1];
    if (s < l)
      throw new Error("[Numeric]: The maximum value should not be less than to the minimum value");
  }, {
    immediate: !0
  }), t(function() {
    return n.modelValue;
  }, r.watchValue, {
    immediate: !0
  });
}, xx = function(e, t, n) {
  var r = t.computed, i = t.onMounted, a = t.onUpdated, s = t.onUnmounted, l = t.reactive, u = t.watch, c = t.inject, d = n.parent, p = n.emit, f = n.vm, m = n.constants, h = n.dispatch, v = n.service, g = n.nextTick, b = {}, y = qB(v), S = Ex({
    reactive: l,
    computed: r,
    props: e,
    api: b,
    constants: m,
    $service: y,
    parent: d
  });
  return d.tinyForm = d.tinyForm || c("form", null), Dx({
    api: b,
    props: e,
    state: S,
    parent: d,
    vm: f,
    emit: p,
    dispatch: h,
    constants: m,
    nextTick: g
  }), Bx({
    watch: u,
    props: e,
    api: b
  }), i(b.mounted), a(b.updated), s(b.unmounted), b;
};
const Px = function(o, e) {
  var t = 200, n = null, r, i = function() {
    typeof e.value == "function" && e.value.apply();
  }, a = function() {
    Date.now() - r < t && i(), clearInterval(n), n = null;
  };
  N(o, "mousedown", function(s) {
    s.button === 0 && (r = Date.now(), im(document, "mouseup", a), clearInterval(n), n = setInterval(i, t));
  });
};
const Mx = /* @__PURE__ */ B({
  directives: mn({
    repeatClick: {
      bind: Px
    }
  }),
  components: {
    IconChevronDown: Oo(),
    IconChevronUp: Kl(),
    IconMinus: Ql(),
    IconPlus: Hr()
  },
  props: [...Q, "step", "stepStrictly", "max", "min", "modelValue", "disabled", "size", "controls", "controlsPosition", "name", "label", "placeholder", "precision", "circulate", "theme", "changeCompat"],
  emits: ["update:modelValue", "change", "blur", "focus"],
  setup(o, e) {
    return z({
      props: o,
      context: e,
      renderless: xx,
      api: kx
    });
  }
}), Ox = ["value", "placeholder", "max", "min", "name", "aria-label"];
function Lx(o, e, t, n, r, i) {
  const a = sn("repeat-click");
  return A(), w(
    "div",
    {
      onDragstart: e[8] || (e[8] = te(() => {
      }, ["prevent"])),
      class: P([
        "tiny-mobile-numeric",
        o.state.inputSize ? "tiny-mobile-numeric--" + o.state.inputSize : "",
        { "is-disabled": o.state.inputDisabled },
        { "is-without-controls": !o.controls },
        { "is-controls-right": o.state.controlsAtRight },
        { "is-round": o.theme === "round" }
      ]),
      onMousewheelPassive: e[9] || (e[9] = (...s) => o.mouseEvent && o.mouseEvent(...s))
    },
    [
      o.controls ? oe((A(), w(
        "span",
        {
          key: 0,
          class: P(["tiny-mobile-numeric__decrease", { "is-disabled": o.state.minDisabled }]),
          role: "button",
          onKeydown: e[0] || (e[0] = Ge((...s) => o.decrease && o.decrease(...s), ["enter"]))
        },
        [
          (A(), G(pe(o.state.controlsAtRight ? "icon-chevron-down" : "icon-minus")))
        ],
        34
        /* CLASS, NEED_HYDRATION */
      )), [
        [a, o.decrease]
      ]) : x("v-if", !0),
      o.controls ? oe((A(), w(
        "span",
        {
          key: 1,
          class: P(["tiny-mobile-numeric__increase", { "is-disabled": o.state.maxDisabled }]),
          role: "button",
          onKeydown: e[1] || (e[1] = Ge((...s) => o.increase && o.increase(...s), ["enter"]))
        },
        [
          (A(), G(pe(o.state.controlsAtRight ? "icon-chevron-up" : "icon-plus")))
        ],
        34
        /* CLASS, NEED_HYDRATION */
      )), [
        [a, o.increase]
      ]) : x("v-if", !0),
      T(
        "div",
        {
          class: P([
            "tiny-mobile-numeric__input",
            o.state.inputSize ? `tiny-input-${o.state.inputSize}` : "",
            o.state.inputDisabled ? "is-disabled" : ""
          ])
        },
        [
          T("input", {
            class: "tiny-mobile-numeric__input-inner",
            ref: "input",
            value: o.state.displayValue,
            placeholder: o.placeholder,
            max: o.max,
            min: o.min,
            name: o.name,
            "aria-label": o.label,
            onKeydown: [
              e[2] || (e[2] = Ge(te((...s) => o.increase && o.increase(...s), ["prevent"]), ["up"])),
              e[3] || (e[3] = Ge(te((...s) => o.decrease && o.decrease(...s), ["prevent"]), ["down"]))
            ],
            onBlur: e[4] || (e[4] = (...s) => o.handleBlur && o.handleBlur(...s)),
            onFocus: e[5] || (e[5] = (...s) => o.handleFocus && o.handleFocus(...s)),
            onInput: e[6] || (e[6] = (...s) => o.handleInput && o.handleInput(...s)),
            onChange: e[7] || (e[7] = (...s) => o.handleInputChange && o.handleInputChange(...s))
          }, null, 40, Ox)
        ],
        2
        /* CLASS */
      )
    ],
    34
    /* CLASS, NEED_HYDRATION */
  );
}
const so = /* @__PURE__ */ W(Mx, [["render", Lx]]);
var Nx = function(e) {
  var t, n = (typeof process > "u" ? "undefined" : R(process)) === "object" ? (t = process.env) === null || t === void 0 ? void 0 : t.TINY_MODE : null;
  return so;
}, Fx = {
  MAX: "aria-valuemax",
  MIN: "aria-valuemin",
  VALUENOW: "aria-valuenow",
  DISABLED: "aria-disabled",
  KEY: "role",
  VALUE: "spinbutton",
  EVENT_NAME: {
    blur: "form.blur",
    change: "form.change"
  },
  COMPONENT_NAME: "FormItem",
  FILTER_OPTION: ["ui.numeric.equalTo", "ui.numeric.notEqualTo", "ui.numeric.moreThan", "ui.numeric.moreThanOrEqualTo", "ui.numeric.lessThan", "ui.numeric.lessThanOrEqualTo", "ui.numeric.empty", "ui.numeric.nonEmpty"]
}, Rx = C(C({}, j), {}, {
  _constants: {
    type: Object,
    default: function() {
      return Fx;
    }
  },
  allowEmpty: {
    type: Boolean,
    default: !1
  },
  emptyValue: {
    default: void 0
  },
  circulate: Boolean,
  controls: {
    type: Boolean,
    default: !0
  },
  controlsPosition: {
    type: String,
    default: ""
  },
  disabled: Boolean,
  format: [Object, String],
  hideUnit: {
    type: Boolean,
    default: !1
  },
  holdZero: {
    type: Boolean,
    default: !0
  },
  label: String,
  max: {
    type: [Number, String],
    default: 1 / 0
  },
  min: {
    type: [Number, String],
    default: -1 / 0
  },
  modelTruncation: {
    type: Boolean,
    default: !0
  },
  modelValue: [Number, String, void 0],
  mouseWheel: Boolean,
  name: String,
  placeholder: String,
  plugin: Function,
  precision: {
    type: Number,
    validator: function(e) {
      return e >= 0 && e === parseInt(e, 10);
    }
  },
  size: String,
  step: {
    type: [Number, String, Object],
    default: 1
  },
  stepStrictly: {
    type: Boolean,
    default: !1
  },
  strictInput: {
    type: Boolean,
    default: !1
  },
  stringMode: Boolean,
  tabindex: {
    type: String,
    default: "1"
  },
  theme: {
    type: String,
    default: ""
  },
  unit: String,
  unitCenter: {
    type: Boolean,
    default: !1
  },
  validateEvent: {
    type: Boolean,
    default: !0
  },
  displayOnly: {
    type: Boolean,
    default: !1
  },
  showLeft: {
    type: Boolean,
    default: !1
  },
  showEmptyValue: {
    type: Boolean,
    default: !1
  },
  title: {
    type: String,
    default: ""
  },
  tip: String,
  shape: String,
  clearable: {
    type: Boolean,
    default: !0
  },
  filter: {
    type: Boolean,
    default: !0
  },
  blank: {
    type: Boolean,
    default: !0
  },
  changeCompat: {
    type: Boolean,
    default: !1
  }
});
const at = B({
  name: O + "Numeric",
  props: Rx,
  setup: function(e, t) {
    return K({
      props: e,
      context: t,
      template: Nx
    });
  }
}), Vx = "3.20.0";
at.model = {
  prop: "modelValue",
  event: "update:modelValue"
};
at.install = function(o) {
  o.component(at.name, at);
};
at.version = Vx;
var Ux = 300, Hx = function(e) {
  var t = e.t, n = e.props, r = e.state;
  return function() {
    var i, a, s, l = {
      pullingUpText: t("ui.pullRefresh.pullingUp"),
      pullingDownText: t("ui.pullRefresh.pullingDown"),
      pullUpDisabled: !1,
      pullDownDisabled: !1,
      headHeight: 48
    };
    r.pullUp = C(C({}, l), n.pullUp), r.pullDown = C(C({}, l), n.pullDown), r.loosingText = (i = n.loosingText) !== null && i !== void 0 ? i : t("ui.pullRefresh.loosing"), r.successText = (a = n.successText) !== null && a !== void 0 ? a : t("ui.pullRefresh.success"), r.failedText = (s = n.failedText) !== null && s !== void 0 ? s : t("ui.pullRefresh.failed");
  };
}, $x = function(e) {
  return function(t) {
    e.draggposition = t.touches[0].clientY;
  };
}, zx = function(e) {
  var t = e.state, n = e.refs;
  return function(r) {
    r.touches[0].clientY > t.draggposition && jx(t, n, r);
  };
}, jx = function(e, t, n) {
  e.disabledPullDown || e.pullDownLoading || (t.content.scrollTop <= 0 && window.scrollY <= 0 && n.cancelable && (n.preventDefault(), e.translate3d = (n.touches[0].clientY - e.draggposition) / 2, e.pullDownReplaces = Math.abs(e.translate3d) > e.pullDown.headHeight ? e.loosingText : e.pullDown.pullingDownText), e.animationDuration = 0);
}, Wx = function(e) {
  var t = e.api, n = e.props, r = e.state, i = e.emit, a = e.refs;
  return function(s) {
    r.animationDuration = n.animationDuration, s.changedTouches[0].clientY < r.draggposition ? hl(r, i, a) : Gx(t, r, i);
  };
}, Gx = function(e, t, n) {
  if (Math.abs(t.translate3d) < t.pullDown.headHeight) {
    t.pullDownLoading = !1, e.clearPullRefresh();
    return;
  }
  t.translate3d = t.pullDown.headHeight, t.pullDownLoading = !0, n("update:modelValue", !0), n("pullDown");
}, hl = function(e, t, n) {
  clearTimeout(e.timer), e.timer = setTimeout(function() {
    var r = n.foot;
    if (!(!e.hasMore || !r)) {
      var i = n.content, a = r.offsetTop + r.clientHeight - i.scrollTop - i.clientHeight;
      a <= e.pullUpDistance && (e.pullUpLoading = !0, t("update:modelValue", !0), t("pullUp"));
    }
  }, Ux);
}, Yx = function(e) {
  var t = e.state, n = e.emit, r = e.refs;
  return function() {
    hl(t, n, r);
  };
}, Kx = function(e) {
  var t = e.api, n = e.refs;
  return function() {
    var r = n.track;
    N(r, "touchstart", t.onTouchstart), N(r, "touchmove", t.onTouchmove), N(r, "touchend", t.onTouchend), N(r, "scroll", t.onScroll);
  };
}, Qx = function(e) {
  var t = e.api, n = e.refs;
  return function() {
    var r = n.track;
    U(r, "touchstart", t.onTouchstart), U(r, "touchmove", t.onTouchmove), U(r, "touchend", t.onTouchend), U(r, "scroll", t.onScroll);
  };
}, Xx = function(e) {
  var t = e.api, n = e.state;
  return function(r, i) {
    n.pullUpLoading = !1, n.pullDownLoading = !1, r === "down" ? n.pullDownReplaces = n["".concat(i, "Text")] : n.pullUpStateText = n["".concat(i, "Text")], setTimeout(function() {
      t.clearPullRefresh();
    }, n.successDuration);
  };
}, Zx = function(e) {
  return function() {
    e.translate3d = 0, e.pullDownReplaces = "", e.pullDownLoading = !1, e.pullUpLoading = !1;
  };
}, Jx = ["state"], qx = function(e, t, n) {
  var r = t.watch, i = t.onMounted, a = t.reactive, s = t.onBeforeUnmount, l = n.t, u = n.refs, c = n.emit;
  n.nextTick;
  var d = {}, p = a({
    pullDownReplaces: "",
    refreshStyle: {},
    translate3d: 0,
    draggposition: 0,
    pullUpLoading: !1,
    pullDownLoading: !1,
    loosingText: "",
    successText: "",
    failedText: "",
    noMoreText: l("ui.pullRefresh.noMore"),
    pullUpLoadingText: e.pullUpLoadingText,
    pullDownLoadingText: e.pullDownLoadingText,
    pullUp: null,
    pullDown: null,
    hasMore: !0,
    successDuration: e.successDuration,
    animationDuration: e.animationDuration,
    disabledPullDown: e.disabledPullDown,
    disabledPullUp: e.disabledPullUp,
    pullUpDistance: typeof e.pullUpDistance == "string" ? Number(e.pullUpDistance) : e.pullUpDistance,
    timer: null
  });
  return Object.assign(d, {
    state: p,
    onTouchstart: $x(p),
    onTouchmove: zx({
      state: p,
      refs: u
    }),
    onTouchend: Wx({
      api: d,
      props: e,
      state: p,
      emit: c,
      refs: u
    }),
    onScroll: Yx({
      state: p,
      emit: c,
      refs: u
    }),
    mountedHandler: Kx({
      api: d,
      refs: u
    }),
    beforeUnmountHandler: Qx({
      api: d,
      refs: u
    }),
    handlerModelValue: Xx({
      api: d,
      state: p
    }),
    initPullRefresh: Hx({
      t: l,
      props: e,
      state: p
    }),
    clearPullRefresh: Zx(p)
  }), r(function() {
    return e.hasMore;
  }, function(f) {
    p.hasMore = f;
  }, {
    immediate: !0
  }), r(function() {
    return e.modelValue;
  }, function(f) {
    f || d.clearPullRefresh();
  }), i(function() {
    d.mountedHandler({
      api: d,
      refs: u,
      state: p
    }), d.initPullRefresh({
      t: l,
      props: e,
      state: p
    });
  }), s(d.beforeUnmountHandler), d;
};
const _x = /* @__PURE__ */ B({
  name: O + "PullRefresh",
  props: {
    ...Q,
    modelValue: Boolean,
    loosingText: String,
    animationDuration: {
      type: [Number, String],
      default: 300
    },
    hasMore: {
      type: Boolean,
      default: !0
    },
    disabledPullDown: {
      type: Boolean,
      default: !1
    },
    disabledPullUp: {
      type: Boolean,
      default: !1
    },
    pullUpDistance: {
      type: [Number, String],
      default: 18
    },
    pullUpLoadingText: {
      type: String,
      default: null
    },
    pullDownLoadingText: {
      type: String,
      default: null
    }
  },
  setup(o, e) {
    return z({
      props: o,
      context: e,
      renderless: qx,
      api: Jx
    });
  }
}), eP = { class: "tiny-mobile-pull-refresh__tips tiny-mobile-pull-refresh__head" }, tP = { key: 0 }, nP = {
  key: 0,
  class: "tiny-mobile-pull-refresh-loading-content"
}, oP = /* @__PURE__ */ T(
  "div",
  { class: "tiny-mobile-pull-refresh__loading-inner" },
  null,
  -1
  /* HOISTED */
), rP = [
  oP
], iP = {
  key: 0,
  class: "tiny-mobile-pull-refresh__text"
}, aP = {
  class: "tiny-mobile-pull-refresh__content",
  ref: "content"
}, sP = {
  key: 0,
  class: "tiny-mobile-pull-refresh__foot",
  ref: "foot"
}, lP = {
  key: 0,
  class: "tiny-mobile-pull-refresh-loading-content"
}, uP = /* @__PURE__ */ T(
  "div",
  { class: "tiny-mobile-pull-refresh__loading tiny-mobile-pull-refresh__loading-animation" },
  [
    /* @__PURE__ */ T("div", { class: "tiny-mobile-pull-refresh__loading-inner" })
  ],
  -1
  /* HOISTED */
), cP = {
  key: 0,
  class: "tiny-mobile-pull-refresh__text"
}, dP = { key: 1 };
function pP(o, e, t, n, r, i) {
  return A(), w(
    "div",
    {
      class: "tiny-mobile-pull-refresh",
      style: H(o.state.refreshStyle)
    },
    [
      T(
        "div",
        {
          class: "tiny-mobile-pull-refresh__track",
          ref: "track",
          style: H({
            "transition-duration": o.state.animationDuration + "ms",
            transform: "translate3d(0px," + o.state.translate3d + "px,0px)"
          })
        },
        [
          T("div", eP, [
            o.state.pullDownLoading ? x("v-if", !0) : (A(), w(
              "span",
              tP,
              M(o.state.pullDownReplaces),
              1
              /* TEXT */
            )),
            o.state.pullDownLoading ? F(o.$slots, "header", { key: 1 }, () => [
              o.state.pullDownLoading ? (A(), w("div", nP, [
                T(
                  "div",
                  {
                    class: P([
                      "tiny-mobile-pull-refresh__loading",
                      o.state.pullDownLoading ? "tiny-mobile-pull-refresh__loading-animation" : null
                    ])
                  },
                  rP,
                  2
                  /* CLASS */
                ),
                o.state.pullDownLoadingText ? (A(), w(
                  "div",
                  iP,
                  M(o.state.pullDownLoadingText),
                  1
                  /* TEXT */
                )) : x("v-if", !0)
              ])) : x("v-if", !0)
            ]) : x("v-if", !0)
          ]),
          T(
            "div",
            aP,
            [
              F(o.$slots, "default"),
              o.state.disabledPullUp ? x("v-if", !0) : (A(), w(
                "div",
                sP,
                [
                  F(o.$slots, "footer", {}, () => [
                    o.state.hasMore ? (A(), w("div", lP, [
                      uP,
                      o.state.pullUpLoadingText ? (A(), w(
                        "div",
                        cP,
                        M(o.state.pullUpLoadingText),
                        1
                        /* TEXT */
                      )) : x("v-if", !0)
                    ])) : (A(), w(
                      "div",
                      dP,
                      M(o.state.noMoreText),
                      1
                      /* TEXT */
                    ))
                  ])
                ],
                512
                /* NEED_PATCH */
              ))
            ],
            512
            /* NEED_PATCH */
          )
        ],
        4
        /* STYLE */
      )
    ],
    4
    /* STYLE */
  );
}
const dr = /* @__PURE__ */ W(_x, [["render", pP]]);
var fP = function(e) {
  var t, n = (typeof process > "u" ? "undefined" : R(process)) === "object" ? (t = process.env) === null || t === void 0 ? void 0 : t.TINY_MODE : null;
  return dr;
}, lo = {
  DEFAULT_HEAD_HEIGHT: 50,
  STATUS: {
    NORMAL: "normal",
    LOADING: "loading",
    LOOSING: "loosing",
    PULLING: "pulling",
    SUCCESS: "success"
  }
};
const st = B({
  name: O + "PullRefresh",
  props: C(C({}, j), {}, {
    _constants: {
      type: Object,
      default: function() {
        return lo;
      }
    },
    modelValue: Boolean,
    loosingText: {
      type: String,
      default: Wt("ui.pullRefresh.loosing")
    },
    successText: {
      type: String,
      default: lo.STATUS.SUCCESS
    },
    failedText: String,
    successDuration: {
      type: [Number, String],
      default: 500
    },
    animationDuration: {
      type: [Number, String],
      default: 300
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    pullUp: {
      type: Object,
      default: {}
    },
    pullDown: {
      type: Object,
      default: {}
    },
    hasMore: {
      type: Boolean,
      default: !0
    },
    // mobile-first的props
    headHeight: {
      type: [Number, String],
      default: lo.DEFAULT_HEAD_HEIGHT
    },
    pullingText: {
      type: String,
      default: Wt("ui.pullRefresh.pulling")
    },
    loadingText: {
      type: String,
      default: lo.STATUS.LOADING
    },
    pullDistance: [Number, String],
    loadingOptions: {
      type: Object,
      default: function() {
        return {};
      }
    },
    selfSimulate: {
      type: Boolean,
      default: !1
    }
  }),
  setup: function(e, t) {
    return K({
      props: e,
      context: t,
      template: fP
    });
  }
}), mP = "3.20.0";
st.model = {
  prop: "modelValue",
  event: "update:modelValue"
};
st.install = function(o) {
  o.component(st.name, st);
};
st.version = mP;
var vP = function(e) {
  var t = e.constants, n = e.dispatch, r = e.emit, i = e.state, a = e.nextTick;
  return function() {
    a(function() {
      r("change", i.model), i.isGroup && n(t.RADIO_GROUP, "handleChange", [i.model]);
    });
  };
}, hP = function(e) {
  var t = e.constants, n = e.parent, r = e.state;
  return function() {
    for (var i = n.$parent.$parent; i; )
      if (i.$options.componentName !== t.RADIO_GROUP)
        i = i.$parent;
      else
        return r.radioGroup = i, !0;
    return !1;
  };
}, gP = function(e) {
  var t = e.props, n = e.state;
  return function() {
    var r, i;
    return n.isGroup && (r = n.radioGroup) !== null && r !== void 0 && (i = r.state) !== null && i !== void 0 && i.radioGroupSize ? n.radioGroup.state.radioGroupSize : t.size;
  };
}, AP = function(e) {
  var t = e.props, n = e.state;
  return function() {
    var r;
    return t.disabled || ((r = n.radioGroup) === null || r === void 0 ? void 0 : r.disabled) || n.formDisabled;
  };
}, yP = function(e) {
  var t = e.props;
  return function() {
    return t.displayOnly;
  };
}, bP = function(e) {
  var t = e.props, n = e.state;
  return function() {
    return n.isDisabled || n.isGroup && n.model !== t.label ? -1 : 0;
  };
}, SP = function(e) {
  var t = e.props, n = e.state;
  return function() {
    return n.isGroup && n.radioGroup ? n.radioGroup.modelValue : t.modelValue;
  };
}, wP = function(e) {
  var t = e.constants, n = e.dispatch, r = e.emit, i = e.props, a = e.vm, s = e.state;
  return function(l) {
    s.isGroup ? n(t.RADIO_GROUP, "update:modelValue", [l]) : r("update:modelValue", l), a.$refs.radio && (a.$refs.radio.checked = s.model === i.label);
  };
}, pa = function(e) {
  var t = e.props, n = e.vm, r = e.type, i = n.$refs.radio;
  i && Object.keys(t.events).forEach(function(a) {
    i[r + "EventListener"](a, t.events[a]);
  });
}, TP = ["state", "handleChange"], CP = function(e, t, n) {
  var r = t.onMounted, i = t.onBeforeUnmount, a = t.computed, s = t.reactive, l = t.inject, u = n.vm, c = n.parent, d = n.emit, p = n.constants, f = n.nextTick, m = n.dispatch;
  c.tinyForm = c.tinyForm || l("form", null);
  var h = {}, v = s({
    vertical: l("radioVertical", !1),
    size: a(function() {
      return e.size || l("size", null) || (c.tinyForm || {}).size;
    }),
    focus: !1,
    radioGroup: null,
    isGroup: a(function() {
      return h.isGroup();
    }),
    radioSize: a(function() {
      return h.radioSize();
    }),
    isDisabled: a(function() {
      return h.isDisabled();
    }),
    isDisplayOnly: a(function() {
      return h.isDisplayOnly() || (c.tinyForm || {}).displayOnly;
    }),
    tabIndex: a(function() {
      return h.tabIndex();
    }),
    formDisabled: a(function() {
      return (c.tinyForm || {}).disabled;
    }),
    model: a({
      get: function() {
        return h.getModel();
      },
      set: function(b) {
        return h.setModel(b);
      }
    })
  });
  return Object.assign(h, {
    state: v,
    radioSize: gP({
      props: e,
      state: v
    }),
    getModel: SP({
      props: e,
      state: v
    }),
    isGroup: hP({
      constants: p,
      parent: c,
      state: v
    }),
    tabIndex: bP({
      props: e,
      state: v
    }),
    isDisabled: AP({
      props: e,
      state: v
    }),
    isDisplayOnly: yP({
      props: e
    }),
    setModel: wP({
      constants: p,
      dispatch: m,
      emit: d,
      props: e,
      vm: u,
      state: v
    }),
    handleChange: vP({
      constants: p,
      dispatch: m,
      emit: d,
      state: v,
      nextTick: f
    })
  }), r(function() {
    m("Tooltip", "tooltip-update"), pa({
      props: e,
      vm: u,
      type: "add"
    });
  }), i(function() {
    pa({
      props: e,
      vm: u,
      type: "remove"
    });
  }), h;
};
const IP = B({
  emits: ["change", "update:modelValue"],
  props: [...Q, "modelValue", "events", "label", "text", "disabled", "name"],
  setup(o, e) {
    return z({ props: o, context: e, renderless: CP, api: TP });
  }
}), kP = ["aria-checked", "aria-disabled", "tabindex"], EP = { class: "tiny-mobile-radio__input" }, DP = /* @__PURE__ */ T(
  "div",
  { class: "tiny-mobile-radio__outer" },
  [
    /* @__PURE__ */ T("div", { class: "tiny-mobile-radio__inner" })
  ],
  -1
  /* HOISTED */
), BP = ["value", "name", "disabled"];
function xP(o, e, t, n, r, i) {
  return A(), w("label", {
    class: P(["tiny-mobile-radio", [{ "is-disabled": o.state.isDisabled }, { "is-focus": o.state.focus }, { "is-checked": o.state.model === o.label }]]),
    role: "radio",
    "aria-checked": o.state.model === o.label,
    "aria-disabled": o.state.isDisabled,
    tabindex: o.state.tabIndex,
    onKeydown: e[5] || (e[5] = Ge(te((a) => o.state.model = o.state.isDisabled ? o.state.model : o.label, ["stop", "prevent"]), ["space"]))
  }, [
    T("div", EP, [
      DP,
      oe(T("input", {
        ref: "radio",
        class: "tiny-mobile-radio__original",
        value: o.label,
        type: "radio",
        "onUpdate:modelValue": e[0] || (e[0] = (a) => o.state.model = a),
        onFocus: e[1] || (e[1] = (a) => o.state.focus = !0),
        onBlur: e[2] || (e[2] = (a) => o.state.focus = !1),
        onChange: e[3] || (e[3] = (...a) => o.handleChange && o.handleChange(...a)),
        name: o.name,
        disabled: o.state.isDisabled,
        tabindex: "-1"
      }, null, 40, BP), [
        [wl, o.state.model]
      ])
    ]),
    T(
      "span",
      {
        class: "tiny-mobile-radio__label",
        onKeydown: e[4] || (e[4] = te(() => {
        }, ["stop"]))
      },
      [
        F(o.$slots, "default", {}, () => [
          ue(
            M(o.text || o.label),
            1
            /* TEXT */
          )
        ])
      ],
      32
      /* NEED_HYDRATION */
    )
  ], 42, kP);
}
const uo = /* @__PURE__ */ W(IP, [["render", xP]]);
var PP = function(e) {
  var t, n = (typeof process > "u" ? "undefined" : R(process)) === "object" ? (t = process.env) === null || t === void 0 ? void 0 : t.TINY_MODE : null;
  return uo;
}, MP = {
  RADIO_GROUP: "RadioGroup"
}, OP = C(C({}, j), {}, {
  _constants: {
    type: Object,
    default: function() {
      return MP;
    }
  },
  modelValue: {},
  label: {},
  disabled: Boolean,
  name: String,
  border: Boolean,
  size: {
    type: String,
    default: ""
  },
  text: String,
  events: {
    type: Object,
    default: function() {
      return {};
    }
  },
  tabindex: {
    type: String,
    default: "1"
  },
  displayOnly: {
    type: Boolean,
    default: !1
  }
});
const lt = B({
  name: O + "Radio",
  props: OP,
  setup: function(e, t) {
    return K({
      props: e,
      context: t,
      template: PP
    });
  }
}), LP = "3.20.0";
lt.model = {
  prop: "modelValue",
  event: "update:modelValue"
};
lt.install = function(o) {
  o.component(lt.name, lt);
};
lt.version = LP;
var NP = function(e) {
  var t = e.emit;
  return function() {
    for (var n = arguments.length, r = new Array(n), i = 0; i < n; i++)
      r[i] = arguments[i];
    t.apply(void 0, ["update:modelValue"].concat(r)), t.apply(void 0, ["input"].concat(r));
  };
}, FP = function(e) {
  var t = e.emit, n = e.state;
  return function(r) {
    var i = r.target.value;
    t("change", n.searchValue, i);
  };
}, RP = function(e) {
  var t = e.api;
  e.props;
  var n = e.state;
  return function(r) {
    var i = r.target ? r.target.value : r;
    t.emitInput(i, n.searchValue);
  };
}, VP = function(e) {
  var t = e.vm, n = e.state;
  return function() {
    t.$refs.selector.style.zIndex = Z.nextZIndex(), n.show = !0;
  };
}, UP = function(e) {
  var t = e.emit, n = e.state;
  return function(r) {
    n.searchValue = r, n.show = !1, t("select", r);
  };
}, HP = function(e) {
  var t = e.emit, n = e.props, r = e.state;
  return function(i) {
    i.preventDefault(), n.mini && r.collapse ? r.collapse = !1 : t("search", r.searchValue, r.currentValue);
  };
}, $P = function(e) {
  var t = e.api, n = e.props, r = e.vm, i = e.nextTick;
  return function(a) {
    n.isEnterSearch && (t.searchClick(a), i(function() {
      return r.$refs.input.blur();
    }));
  };
}, zP = function(e) {
  var t = e.parent, n = e.props, r = e.state;
  return function(i) {
    t.$el.contains(i.target) || (r.show = !1, n.mini && !r.currentValue && (r.collapse = !0));
  };
}, jP = function(e, t) {
  if (t && e.includes(t))
    return t;
  for (var n = {}, r = 0, i = e.length; r < i; r++)
    if (Ee(e[r]) && Pe(e[r].value) !== "undefined" && Pe(e[r].text) !== "undefined") {
      n = e[r];
      break;
    }
  return n;
}, WP = function(e) {
  for (var t = [], n = 0, r = e.length; n < r; n++)
    Ee(e[n]) && Pe(e[n].value) !== "undefined" && Pe(e[n].text) !== "undefined" && t.push(e[n]);
  return t;
}, GP = function(e) {
  var t = e.api;
  return function() {
    N(document.body, "click", t.clickOutside);
  };
}, YP = function(e) {
  var t = e.api;
  return function() {
    U(document.body, "click", t.clickOutside);
  };
}, KP = function(e) {
  var t = e.api, n = e.emit, r = e.vm, i = e.state;
  return function(a) {
    a.preventDefault(), i.currentValue = "", r.$refs.input.focus(), i.focus = !0, t.emitInput("", i.searchValue), n("change", [], ""), n("clear");
  };
}, QP = ["state", "handleChange", "handleInput", "showSelector", "changeKey", "searchClick", "searchEnterKey", "inputStyle", "formatSearchTypes", "setDefaultType", "clear"], XP = function(e) {
  var t = e.computed, n = e.props, r = e.reactive, i = e.toRefs, a = e.watch, s = {
    setDefaultType: jP,
    formatSearchTypes: WP
  }, l = r({
    searchValue: n.typeValue,
    types: t(function() {
      return s.formatSearchTypes(n.searchTypes);
    })
  });
  return a(function() {
    return n.typeValue;
  }, function() {
    l.searchValue = s.setDefaultType(n.searchTypes, n.typeValue);
  }, {
    immediate: !0
  }), {
    api: s,
    state: i(l)
  };
}, ZP = function(e, t, n) {
  var r = t.computed, i = t.onBeforeUnmount, a = t.onMounted, s = t.reactive, l = t.toRefs, u = t.watch, c = n.vm, d = n.parent, p = n.emit, f = n.nextTick, m = XP({
    computed: r,
    props: e,
    reactive: s,
    toRefs: l,
    watch: u
  }), h = s(C(C({
    show: !1,
    focus: !1,
    hovering: !1,
    collapse: e.mini,
    currentValue: e.modelValue
  }, m.state), {}, {
    showClear: r(function() {
      return e.clearable && (h.focus || h.hovering) && h.currentValue;
    }),
    formItemSize: r(function() {
      return (d.formItem || {}).formItemSize;
    }),
    searchSize: r(function() {
      return e.size || h.formItemSize;
    })
  })), v = C({
    state: h,
    changeKey: UP({
      state: h,
      emit: p
    }),
    handleChange: FP({
      emit: p,
      state: h
    }),
    showSelector: VP({
      vm: c,
      state: h
    }),
    searchClick: HP({
      emit: p,
      props: e,
      state: h
    }),
    clickOutside: zP({
      parent: d,
      props: e,
      state: h
    }),
    emitInput: NP({
      emit: p
    })
  }, m.api);
  return Object.assign(v, {
    clear: KP({
      api: v,
      emit: p,
      vm: c,
      state: h
    }),
    handleInput: RP({
      api: v,
      props: e,
      state: h
    }),
    searchEnterKey: $P({
      api: v,
      props: e,
      vm: c,
      nextTick: f
    })
  }), a(GP({
    api: v
  })), i(YP({
    api: v
  })), u(function() {
    return e.modelValue;
  }, function(g) {
    return h.currentValue = g;
  }), v;
};
const JP = /* @__PURE__ */ B({
  props: [...Q, "transparent", "searchTypes", "placeholder", "buttonText", "modelValue", "themeType", "isEnterSearch"],
  components: {
    IconSearch: Ia(),
    IconClose: yt()
  },
  emits: ["change", "search", "update:modelValue", "clear", "select", "input"],
  setup(o, e) {
    return z({
      props: o,
      context: e,
      renderless: ZP,
      api: QP
    });
  }
}), qP = {
  class: /* @__PURE__ */ P(["tiny-mobile-search__line"])
}, _P = { class: "tiny-mobile-search__box" }, eM = { class: "tiny-mobile-search__input-btn" }, tM = { class: "tiny-mobile-search__icon" }, nM = ["placeholder"], oM = { class: "tiny-mobile-search__close-icon" }, rM = { class: "tiny-mobile-search__label" }, iM = { class: "tiny-mobile-search__right" }, aM = { class: "tiny-mobile-search__text" };
function sM(o, e, t, n, r, i) {
  const a = $("icon-search"), s = $("icon-close");
  return A(), w(
    "div",
    {
      class: P([
        "tiny-mobile-search",
        `tiny-mobile-search-${o.themeType}`,
        { collapse: o.state.collapse },
        { focus: o.state.focus || !o.state.focus && o.state.currentValue }
      ])
    },
    [
      T("div", qP, [
        T("div", _P, [
          T("div", eM, [
            T("a", tM, [
              D(a, {
                style: H({ fill: o.state.collapse && o.transparent ? "#fff" : "" }),
                onClick: o.searchClick
              }, null, 8, ["style", "onClick"])
            ])
          ]),
          oe(T("input", {
            ref: "input",
            "onUpdate:modelValue": e[0] || (e[0] = (l) => o.state.currentValue = l),
            style: H(
              o.transparent ? {
                border: "transparent",
                background: o.state.collapse ? "rgba(255,255,255,0.3)" : "#fff"
              } : {}
            ),
            placeholder: o.placeholder,
            type: "text",
            class: P(["tiny-mobile-search__input", `tiny-mobile-search__input-${o.themeType}`]),
            onKeyup: e[1] || (e[1] = Ge((...l) => o.searchEnterKey && o.searchEnterKey(...l), ["enter"])),
            onChange: e[2] || (e[2] = (...l) => o.handleChange && o.handleChange(...l)),
            onInput: e[3] || (e[3] = (...l) => o.handleInput && o.handleInput(...l)),
            onFocus: e[4] || (e[4] = (l) => o.state.focus = !0),
            onBlur: e[5] || (e[5] = (l) => o.state.focus = !1),
            onSelect: e[6] || (e[6] = te(() => {
            }, ["stop"]))
          }, null, 46, nM), [
            [ya, o.state.currentValue]
          ]),
          oe(T(
            "span",
            oM,
            [
              D(s, { onClick: o.clear }, null, 8, ["onClick"])
            ],
            512
            /* NEED_PATCH */
          ), [
            [he, o.state.currentValue]
          ])
        ]),
        T("label", rM, [
          T(
            "span",
            null,
            M(o.placeholder),
            1
            /* TEXT */
          )
        ])
      ]),
      T("div", iM, [
        F(o.$slots, "default", {}, () => [
          T("div", {
            class: "tiny-mobile-search__present",
            onClick: e[7] || (e[7] = (...l) => o.searchClick && o.searchClick(...l))
          }, [
            T(
              "span",
              aM,
              M(o.buttonText),
              1
              /* TEXT */
            )
          ])
        ])
      ])
    ],
    2
    /* CLASS */
  );
}
const co = /* @__PURE__ */ W(JP, [["render", sM]]);
var lM = function(e) {
  var t, n = (typeof process > "u" ? "undefined" : R(process)) === "object" ? (t = process.env) === null || t === void 0 ? void 0 : t.TINY_MODE : null;
  return co;
}, uM = C(C({}, j), {}, {
  mini: {
    type: Boolean,
    default: !1
  },
  big: {
    type: Boolean,
    default: !1
  },
  buttonText: {
    type: String,
    default: function() {
      return Wt("ui.search.placeholder");
    }
  },
  /**
   * 设置为透明模式，配置为true时，边框变为透明且收缩后半透明显示，一般用在带有背景的场景
   */
  transparent: {
    type: Boolean,
    default: !1
  },
  /**
   * 搜索的类型选项，格式为[{text:'文档',value:1},...]，不配置时类型选择固定显示为All
   */
  searchTypes: {
    type: Array,
    default: function() {
      return [];
    }
  },
  /**
   * 设置搜索输入框内的提示占位文本
   */
  placeholder: {
    type: String,
    default: ""
  },
  modelValue: {
    type: String,
    default: ""
  },
  clearable: {
    type: Boolean,
    default: !1
  },
  tabindex: {
    type: String,
    default: "1"
  },
  /**
   * 配置搜索输入框enter键,enter按下触发搜索
   */
  isEnterSearch: {
    type: Boolean,
    default: !0
  },
  /**
   * 配置主题色，primary:蓝 gray:灰
   */
  themeType: {
    type: String,
    default: "primary",
    validator: function(e) {
      return ["primary", "gray"].includes(e);
    }
  },
  showButton: {
    type: Boolean,
    default: !1
  },
  changeBgColor: {
    type: Boolean,
    default: !1
  },
  size: {
    type: String,
    default: "small"
  },
  typeValue: Object,
  suffixIcon: [Object, String],
  // tiny新增
  disabled: {
    type: Boolean,
    default: !1
  }
});
const ut = B({
  name: O + "Search",
  props: uM,
  setup: function(e, t) {
    return K({
      props: e,
      context: t,
      template: lM
    });
  }
}), cM = "3.20.0";
ut.model = {
  prop: "modelValue",
  event: "update:modelValue"
};
ut.install = function(o) {
  o.component(ut.name, ut);
};
ut.version = cM;
var dM = function(e) {
  return function() {
    N(window, "resize", e.bindResize), e.bindResize();
  };
}, pM = function(e) {
  return function() {
    return U(window, "resize", e.bindResize);
  };
}, fM = function(e) {
  var t = e.vm, n = e.props, r = e.state;
  return function() {
    var i = t.$refs.slider;
    r.sliderSize = i["client" + (n.vertical ? "Height" : "Width")], r.sliderOffset = i.getBoundingClientRect();
  };
}, mM = function(e) {
  var t = e.api, n = e.props, r = e.state;
  return function(i) {
    if (!(r.disabled || r.activeIndex < 0)) {
      i.preventDefault();
      var a = 0;
      switch (i.keyCode) {
        case ie.Home:
          a = n.min;
          break;
        case ie.End:
          a = n.max;
          break;
        case ie.PageUp:
          a = r.activeValue + Math.ceil(r.rangeDiff / n.numPages);
          break;
        case ie.PageDown:
          a = r.activeValue - Math.ceil(r.rangeDiff / n.numPages);
          break;
        case ie.ArrowUp:
        case ie.ArrowRight:
          a = r.activeValue + n.step;
          break;
        case ie.ArrowDown:
        case ie.ArrowLeft:
          a = r.activeValue - n.step;
          break;
        default:
          a = r.activeValue;
          break;
      }
      t.setActiveButtonValue(a), t.setButtonStyle(), t.setBarStyle();
    }
  };
}, vM = function(e) {
  var t = e.api, n = e.constants, r = e.mode, i = e.emit, a = e.state, s = e.props;
  return function(l) {
    if (l.button !== 0 && l.detail !== 0) {
      a.activeIndex = -1;
      return;
    }
    if (!Es(i, "start", t.getActiveButtonValue())) {
      a.activeIndex = -1;
      return;
    }
    var u = l.target, c = !1, d = !1, p = !1;
    if (r === "mobile-first") {
      var f = Array.from(u.attributes).find(function(v) {
        return v.name === "role";
      }), m = f && f.value;
      c = m === n.PC_SLIDER_CLS || m === n.PC_RANGE_CLS, d = m === n.PC_BUTTON_CLS;
    } else
      c = We(u, n.sliderCls(r)) || We(u, n.rangeCls(r)), d = We(u, n.buttonCls(r)) || We(u, n.leftSvgCls(r)) || We(u, n.rightSvgCls(r)), p = We(u, n.PC_LABEL_CLS);
    if (a.disabled || !d && !c && !p) {
      a.activeIndex = -1;
      return;
    }
    if (t.bindResize(), N(window, "mouseup", t.bindMouseUp), N(window, "mousemove", t.bindMouseMove), N(window, "touchend", t.bindMouseUp), N(window, "touchmove", t.bindMouseMove), a.isDrag = d, d && (a.activeIndex = t.getActiveButtonIndex(l)), c || p) {
      var h = t.calculateValue(l);
      a.isDouble && (Math.abs(h - a.leftBtnValue) > Math.abs(a.rightBtnValue - h) ? t.changeActiveValue(a.rightBtnValue < a.leftBtnValue) : t.changeActiveValue(a.rightBtnValue > a.leftBtnValue)), t.setActiveButtonValue(h), t.setButtonStyle(), t.setBarStyle(), i("stop", t.getActiveButtonValue()), s.changeCompat || i("change", t.getActiveButtonValue());
    }
  };
}, hM = function(e) {
  var t = e.api, n = e.nextTick, r = e.state;
  return function(i) {
    r.disabled || !r.isDrag || (t.setActiveButtonValue(t.calculateValue(i)), t.setButtonStyle(), t.setBarStyle(), n(function() {
      t.setTipStyle();
    }));
  };
}, gM = function(e) {
  var t = e.api, n = e.emit, r = e.state, i = e.props;
  return function() {
    r.disabled || !r.isDrag || (r.mouseOuterBtn && (r.showTip = !1), r.isDrag = !1, U(window, "mouseup", t.bindMouseUp), U(window, "mousemove", t.bindMouseMove), U(window, "touchend", t.bindMouseUp), U(window, "touchmove", t.bindMouseMove), n("stop", t.getActiveButtonValue()), i.changeCompat || n("change", t.getActiveButtonValue()));
  };
}, AM = function(e) {
  var t = e.api, n = e.nextTick, r = e.state;
  return function(i) {
    r.mouseOuterBtn = !1, r.showTip || (r.showTip = !0, t.changeActiveValue(t.getActiveButtonIndex(i) === 0), n(function() {
      t.setTipStyle();
    }));
  };
}, yM = function(e) {
  return function() {
    e.mouseOuterBtn = !0, !e.isDrag && (e.showTip = !1);
  };
}, bM = function(e) {
  var t = e.constants, n = e.mode, r = e.vm, i = e.props, a = e.state;
  return function() {
    if (i.showTip) {
      var s = {
        top: 0,
        left: 0
      }, l = r.$refs.sliderTip, u = (a.activeValue - i.min) / a.rangeDiff * a.sliderSize;
      i.vertical ? (s.top = a.sliderSize - u - t.BUTTON_SIZE - t.TIP_HEIGHT / 2 + t.HALF_BAR_HEIGHT, s.left = -l.getBoundingClientRect().width / 2 + t.HALF_BAR_HEIGHT) : (s.top = -t.TIP_HEIGHT - t.BUTTON_SIZE / 2 + t.HALF_BAR_HEIGHT, s.left = u - l.getBoundingClientRect().width / 2), n === "mobile-first" ? a.tipStyle = {
        left: s.left + "px"
      } : a.tipStyle = {
        top: s.top + "px",
        left: s.left + "px"
      };
    }
  };
}, SM = function(e) {
  var t = e.state, n = e.event, r = e.constants, i = e.mode, a = r.buttonCls(i), s = n.target.previousElementSibling;
  if (i === "mobile-first") {
    var l = Array.from(s.attributes).find(function(c) {
      return c.name === "role";
    }), u = l && l.value;
    return t.isDouble && u === r.PC_BUTTON_CLS;
  } else
    return t.isDouble && (We(s, a) || n.target.className.baseVal === "tiny-slider-right-svg");
}, wM = function(e) {
  var t = e.constants, n = e.mode, r = e.state;
  return function(i) {
    var a = SM({
      state: r,
      event: i,
      constants: t,
      mode: n
    });
    return a ? 1 : 0;
  };
}, TM = function(e) {
  var t = e.currentValue, n = e.props, r = e.state;
  if (Array.isArray(t) && (t = t[r.activeIndex]), t <= n.min)
    t = n.min;
  else if (t >= n.max)
    t = n.max;
  else {
    var i = n.step > 0 ? n.step : 1, a = 0;
    i - parseInt(i) > 0 && (a = i.toString().split(".")[1].length);
    var s = (t - n.min) % i;
    s && (t -= s, t += s * 2 > i ? Number(i) : 0, a && (t = Number(t.toFixed(a)))), r.isDouble && (r.activeIndex === 0 && t >= r.rightBtnValue ? t = r.rightBtnValue : r.activeIndex === 1 && t <= r.leftBtnValue && (t = r.leftBtnValue));
  }
  return t;
}, CM = function(e) {
  var t = e.api, n = e.emit, r = e.props, i = e.state;
  return function(a) {
    if (Array.isArray(a)) {
      var s = Gt(a, 2);
      i.leftBtnValue = s[0], i.rightBtnValue = s[1];
    } else {
      var l = TM({
        currentValue: a,
        props: r,
        state: i
      });
      i.isDouble ? i.activeIndex === 0 ? i.leftBtnValue = l : i.rightBtnValue = l : i.leftBtnValue = l, i.activeValue = l;
    }
    i.innerTrigger = !0, n("update:modelValue", t.getActiveButtonValue());
  };
}, IM = function(e) {
  var t = e.props, n = e.state;
  return function() {
    var r = (n.activeValue - t.min) / n.rangeDiff * 100, i = (t.vertical ? "bottom" : "left") + ":" + r + "%";
    !n.isDouble || n.activeIndex === 0 ? (n.leftBtnPercent = r, n.leftBtnStyle = i) : (n.rightBtnPercent = r, n.rightBtnStyle = i);
  };
}, kM = function(e) {
  var t = e.props, n = e.state;
  return function() {
    var r = Math.abs(n.leftBtnPercent - n.rightBtnPercent), i = Math.max(n.leftBtnPercent, n.rightBtnPercent);
    t.vertical ? n.barStyle = {
      bottom: i - r + "%",
      height: r + "%"
    } : n.barStyle = {
      left: i - r + "%",
      width: r + "%"
    };
  };
}, EM = function(e) {
  var t = e.api, n = e.props, r = e.state;
  return function(i) {
    if (!r.isDrag) {
      r.isDouble = Array.isArray(i);
      var a = r.isDouble ? i : [i];
      a.length > 2 && (a.length = 2), a.forEach(function(s, l) {
        l === 0 ? r.leftBtnValue = Math.max(Number(s), n.min) : (r.rightBtnValue = Math.min(Number(s), n.max), r.rightBtnShow = !0), t.changeActiveValue(l === 0), t.setButtonStyle();
      }), t.setBarStyle();
    }
  };
}, DM = function(e) {
  var t = e.props, n = e.state, r = e.vm;
  return function(i) {
    var a = 0;
    if (n.sliderSize === 0) {
      var s = r.$refs.slider;
      n.sliderSize = s["client" + (t.vertical ? "Height" : "Width")], n.sliderOffset = s.getBoundingClientRect();
    }
    var l = n.sliderOffset;
    return i.type === "touchmove" || i.type === "touchstart" || i.type === "touchend" ? t.vertical ? a = t.max - (i.touches[0].pageY - l.top) / n.sliderSize * n.rangeDiff : a = t.min + (i.touches[0].pageX - l.left) / n.sliderSize * n.rangeDiff : t.vertical ? a = t.max - (i.pageY - l.top) / n.sliderSize * n.rangeDiff : a = t.min + (i.pageX - l.left) / n.sliderSize * n.rangeDiff, a;
  };
}, BM = function(e) {
  return function(t) {
    e.activeIndex = t ? 0 : 1, e.activeValue = t ? e.leftBtnValue : e.rightBtnValue;
  };
}, xM = function(e) {
  return function(t) {
    return e.formatTooltip instanceof Function ? e.formatTooltip(t) : t;
  };
}, PM = function(e) {
  return function() {
    return e.isDouble ? [e.leftBtnValue, e.rightBtnValue] : e.leftBtnValue;
  };
}, MM = function(e) {
  return function(t) {
    e.setActiveButtonValue(t), e.setButtonStyle(), e.setBarStyle();
  };
}, OM = function(e) {
  return function(t) {
    e.vertical ? (t.style.bottom = "0%", t.style.height = "0%") : (t.style.left = "0%", t.style.width = "0%");
  };
}, LM = function() {
  return function(e) {
    e.style.transition = "all 0.5s";
  };
}, NM = function(e) {
  var t = e.state, n = e.props;
  return function(r) {
    var i = Math.abs(t.leftBtnPercent - t.rightBtnPercent), a = Math.max(t.leftBtnPercent, t.rightBtnPercent);
    n.vertical ? (r.style.bottom = a - i + "%", r.style.height = i + "%") : (t.isDouble && (r.style.left = a - i + "%"), r.style.width = i + "%");
  };
}, FM = function(e) {
  var t = e.api, n = e.emit, r = e.props, i = e.state;
  return function(a, s) {
    var l = Br(a) || 0, u = Br(s) || 0;
    if (l !== u) {
      if (t.autoSlider(l), l <= r.max && l >= r.min) {
        var c = t.getActiveButtonValue();
        i.lastValue && i.lastValue.toString() !== c.toString() && n("change", c), i.lastValue = c;
      }
    } else
      i.activeValue = l || 0;
  };
}, RM = function(e) {
  var t = e.api, n = e.state;
  return function(r) {
    n.innerTrigger ? (n.innerTrigger = !1, n.isDouble || (t.initSlider(r), t.setActiveButtonValue(r))) : (t.initSlider(r), t.setActiveButtonValue(r)), n.isSlotTyping || t.updateSlotValue();
  };
}, VM = function(e) {
  var t = e.props, n = e.state;
  return function() {
    if (t.showSteps && t.step > 0) {
      n.points = [];
      for (var r = Math.floor(t.max / t.step), i = 1; i < r; i++) {
        var a = {
          position: i / r * 100 + "%",
          value: i / r * t.max
        };
        n.points.push(a);
      }
    }
  };
}, UM = function(e) {
  var t = e.props, n = e.state;
  return function() {
    if (t.showLabel) {
      n.labels = [];
      for (var r = t.formatLabel instanceof Function, i = Math.floor(t.max / t.step), a = 0; a <= i; a++) {
        var s = a / i * t.max, l = {
          position: a / i * 100 + "%",
          label: r ? t.formatLabel(s, a) : s,
          value: s
        };
        n.labels.push(l);
      }
    }
  };
}, HM = function(e) {
  var t = e.props;
  return function() {
    var n = [];
    if (!t.marks)
      return n;
    for (var r = 0, i = Object.entries(t.marks); r < i.length; r++) {
      var a = Gt(i[r], 2), s = a[0], l = a[1], u = Number(s);
      if (u >= t.min && u <= t.max) {
        var c = (u - t.min) / (t.max - t.min);
        n.push({
          value: u,
          label: l,
          percent: c,
          positionStyle: ne({}, t.vertical ? "bottom" : "left", c * 100 + "%")
        });
      }
    }
    return n;
  };
}, $M = function(e) {
  var t = e.props, n = e.state, r = e.api, i = e.emit;
  return function(a, s) {
    if (!(t.disabled || !n.isDouble)) {
      if (!/^\d+$/.test(a.target.value)) {
        s === "left" ? n.inputValue.splice(0, 1, n.leftBtnValue) : n.inputValue.splice(1, 1, n.rightBtnValue);
        return;
      }
      r.initSlider([Math.min.apply(Math, Se(n.inputValue)), Math.max.apply(Math, Se(n.inputValue))]), t.changeCompat || i("change", r.getActiveButtonValue());
    }
  };
}, zM = function(e) {
  return function() {
    e.isSlotTyping = !0;
  };
}, jM = function(e) {
  var t = e.state, n = e.api;
  return function() {
    t.isSlotTyping = !1, n.updateSlotValue();
  };
}, WM = function(e) {
  var t = e.state;
  return function() {
    t.isDouble ? t.slotValue = t.activeIndex === 0 ? [t.activeValue, t.rightBtnValue] : [t.leftBtnValue, t.activeValue] : t.slotValue = t.activeValue;
  };
}, GM = function(e) {
  var t = e.state, n = e.api;
  return function(r) {
    var i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, a = r.target.value;
    n.changeActiveValue(t.isDouble ? i : !0), t.activeValue = Number(a), n.updateSlotValue();
  };
}, YM = function(e) {
  var t = e.api, n = e.emit, r = e.props, i = e.state;
  return function(a) {
    if (!r.changeCompat) {
      if (!/^\d+$/.test(a)) {
        i.activeValue = i.leftBtnValue;
        return;
      }
      var s = Br(i.activeValue) || 0;
      t.autoSlider(s), n("change", t.getActiveButtonValue());
    }
  };
}, KM = ["state", "bindKeyDown", "bindMouseDown", "bindMouseMove", "bindMouseUp", "bindEvent", "unBindEvent", "bindResize", "setTipStyle", "getActiveButtonIndex", "setActiveButtonValue", "setBarStyle", "setButtonStyle", "initSlider", "calculateValue", "changeActiveValue", "formatTipValue", "getActiveButtonValue", "displayTip", "hideTip", "autoSlider", "customBeforeAppearHook", "customAppearHook", "customAfterAppearHook", "inputValueChange", "inputOnChange", "handleSlotInputFocus", "handleSlotInputBlur", "handleSlotInput"], QM = function(e) {
  var t = e.reactive, n = e.computed, r = e.props, i = e.api, a = e.parent, s = e.inject, l = t({
    showAutoWidth: s("showAutoWidth", null),
    tipStyle: {},
    barStyle: {},
    moveStyle: [],
    points: [],
    labels: [],
    markList: n(function() {
      return i.getMarkList();
    }),
    inputValue: [0, 0],
    isDrag: !1,
    sliderSize: 0,
    showTip: !1,
    activeValue: 0,
    activeIndex: 0,
    isDouble: !1,
    leftBtnValue: 0,
    sliderOffset: {},
    rightBtnValue: 0,
    leftBtnStyle: {},
    leftBtnPercent: 0,
    leftBtnShow: !0,
    rightBtnStyle: "",
    rightBtnPercent: 0,
    rightBtnShow: !1,
    innerTrigger: !1,
    changeCompat: n(function() {
      return r.changeCompat;
    }),
    rangeDiff: n(function() {
      return r.max - r.min;
    }),
    tipValue: n(function() {
      return i.formatTipValue(l.activeValue);
    }),
    formDisabled: n(function() {
      return (a.tinyForm || {}).disabled;
    }),
    disabled: n(function() {
      return r.disabled || l.formDisabled;
    }),
    slotValue: "",
    isSlotTyping: !1,
    mouseOuterBtn: !1
  });
  return l;
}, XM = function(e, t, n) {
  var r = t.computed, i = t.onBeforeUnmount, a = t.onMounted, s = t.reactive, l = t.watch, u = t.inject, c = n.vm, d = n.parent, p = n.constants, f = n.nextTick, m = n.emit, h = n.mode, v = {}, g = QM({
    reactive: s,
    computed: r,
    props: e,
    api: v,
    parent: d,
    inject: u
  });
  return d.tinyForm = d.tinyForm || u("form", null), Object.assign(v, {
    state: g,
    hideTip: yM(g),
    formatTipValue: xM(e),
    setBarStyle: kM({
      props: e,
      state: g
    }),
    changeActiveValue: BM(g),
    bindResize: fM({
      vm: c,
      props: e,
      state: g
    }),
    setButtonStyle: IM({
      props: e,
      state: g
    }),
    calculateValue: DM({
      vm: c,
      props: e,
      state: g
    }),
    getActiveButtonValue: PM(g),
    getActiveButtonIndex: wM({
      constants: p,
      mode: h,
      state: g
    }),
    setTipStyle: bM({
      vm: c,
      constants: p,
      mode: h,
      props: e,
      state: g
    }),
    customAfterAppearHook: NM({
      state: g,
      props: e
    }),
    customBeforeAppearHook: OM(e),
    customAppearHook: LM(),
    bindEvent: dM(v),
    autoSlider: MM(v),
    unBindEvent: pM(v),
    displayTip: AM({
      api: v,
      nextTick: f,
      state: g
    }),
    bindKeyDown: mM({
      api: v,
      props: e,
      state: g
    }),
    bindMouseUp: gM({
      api: v,
      emit: m,
      state: g,
      props: e
    }),
    bindMouseMove: hM({
      api: v,
      nextTick: f,
      state: g
    }),
    bindMouseDown: vM({
      api: v,
      constants: p,
      mode: h,
      emit: m,
      state: g,
      props: e
    }),
    setActiveButtonValue: CM({
      api: v,
      emit: m,
      props: e,
      state: g
    }),
    initSlider: EM({
      api: v,
      props: e,
      state: g
    }),
    watchModelValue: RM({
      api: v,
      state: g
    }),
    watchActiveValue: FM({
      api: v,
      emit: m,
      props: e,
      state: g
    }),
    getPoints: VM({
      props: e,
      state: g
    }),
    getLabels: UM({
      props: e,
      state: g
    }),
    inputValueChange: $M({
      props: e,
      api: v,
      state: g,
      emit: m
    }),
    handleSlotInputFocus: zM(g),
    handleSlotInputBlur: jM({
      state: g,
      api: v
    }),
    handleSlotInput: GM({
      state: g,
      api: v
    }),
    getMarkList: HM({
      props: e
    }),
    updateSlotValue: WM({
      state: g
    }),
    inputOnChange: YM({
      api: v,
      emit: m,
      props: e,
      state: g
    })
  }), l(function() {
    return e.modelValue;
  }, function(b) {
    if (e.max < e.min)
      throw new Error("Slider min should not be greater than max.");
    v.watchModelValue(b);
  }, {
    immediate: !0
  }), e.changeCompat && l(function() {
    return g.activeValue;
  }, v.watchActiveValue, {
    immediate: !0
  }), l(function() {
    return g.activeValue;
  }, v.watchActiveValue, {
    immediate: !0
  }), l(function() {
    return e.min;
  }, function(b) {
    var y = Math.max(e.modelValue, b);
    v.initSlider(y), v.setActiveButtonValue(y);
  }), l(function() {
    return e.max;
  }, function(b) {
    var y = Math.min(e.modelValue, b);
    v.initSlider(Math.min(e.modelValue, b)), v.setActiveButtonValue(y);
  }), l(function() {
    return g.leftBtnValue;
  }, function(b) {
    g.inputValue[0] = b;
  }, {
    immediate: !0
  }), l(function() {
    return g.rightBtnValue;
  }, function(b) {
    g.inputValue[1] = b;
  }, {
    immediate: !0
  }), a(function() {
    v.bindEvent(), v.getPoints(), v.getLabels();
  }), i(v.unBindEvent), v;
};
const ZM = B({
  emits: ["update:modelValue", "change", "start", "stop"],
  props: [
    ...Q,
    "modelValue",
    "disabled",
    "max",
    "min",
    "vertical",
    "step",
    "numPages",
    "showTip",
    "showInput",
    "height",
    "range",
    "formatTooltip",
    "changeCompat"
  ],
  setup(o, e) {
    return z({ props: o, context: e, renderless: XM, api: KM });
  }
}), JM = { style: { position: "relative" } }, qM = {
  key: 0,
  class: "tiny-mobile-slider__input"
}, _M = ["disabled"], eO = /* @__PURE__ */ T(
  "span",
  { class: "tiny-mobile-slider__per" },
  "%",
  -1
  /* HOISTED */
);
function tO(o, e, t, n, r, i) {
  return A(), w("div", JM, [
    T(
      "div",
      {
        class: P(["tiny-mobile-slider", { "tiny-mobile-slider__vertical": o.vertical, disabled: o.disabled }]),
        style: H({ height: o.vertical ? o.height : "" }),
        onTouchstart: e[6] || (e[6] = (...a) => o.bindMouseDown && o.bindMouseDown(...a))
      },
      [
        T(
          "div",
          {
            class: P(["tiny-mobile-slider__range", o.vertical ? "tiny-mobile-slider__down" : "tiny-mobile-slider__left"]),
            style: H(o.state.barStyle)
          },
          null,
          6
          /* CLASS, STYLE */
        ),
        o.state.leftBtnShow ? (A(), w(
          "div",
          {
            key: 0,
            class: P(["tiny-mobile-slider__handle", { "handle-focus": o.state.activeIndex === 0 }]),
            tabindex: "0",
            style: H(o.state.leftBtnStyle),
            onMouseenter: e[0] || (e[0] = (...a) => o.displayTip && o.displayTip(...a)),
            onMouseleave: e[1] || (e[1] = (...a) => o.hideTip && o.hideTip(...a)),
            onKeydown: e[2] || (e[2] = (...a) => o.bindKeyDown && o.bindKeyDown(...a))
          },
          null,
          38
          /* CLASS, STYLE, NEED_HYDRATION */
        )) : x("v-if", !0),
        o.state.rightBtnShow ? (A(), w(
          "div",
          {
            key: 1,
            class: P(["tiny-mobile-slider__handle", { "handle-focus": o.state.activeIndex === 1 }]),
            tabindex: "0",
            style: H(o.state.rightBtnStyle),
            onMouseenter: e[3] || (e[3] = (...a) => o.displayTip && o.displayTip(...a)),
            onMouseleave: e[4] || (e[4] = (...a) => o.hideTip && o.hideTip(...a)),
            onKeydown: e[5] || (e[5] = (...a) => o.bindKeyDown && o.bindKeyDown(...a))
          },
          null,
          38
          /* CLASS, STYLE, NEED_HYDRATION */
        )) : x("v-if", !0),
        oe(T(
          "div",
          {
            class: "tiny-mobile-slider__tips",
            style: H(o.state.tipStyle)
          },
          M(o.state.tipValue),
          5
          /* TEXT, STYLE */
        ), [
          [he, o.showTip && o.state.showTip]
        ])
      ],
      38
      /* CLASS, STYLE, NEED_HYDRATION */
    ),
    o.showInput && !o.state.isDouble ? (A(), w("div", qM, [
      F(o.$slots, "default", {
        slotScope: o.state.activeValue
      }, () => [
        oe(T("input", {
          type: "text",
          "onUpdate:modelValue": e[7] || (e[7] = (a) => o.state.activeValue = a),
          disabled: o.disabled,
          onChange: e[8] || (e[8] = (...a) => o.inputOnChange && o.inputOnChange(...a))
        }, null, 40, _M), [
          [ya, o.state.activeValue]
        ]),
        eO
      ])
    ])) : x("v-if", !0)
  ]);
}
const po = /* @__PURE__ */ W(ZM, [["render", tO]]);
var nO = function(e) {
  var t, n = (typeof process > "u" ? "undefined" : R(process)) === "object" ? (t = process.env) === null || t === void 0 ? void 0 : t.TINY_MODE : null;
  return po;
}, oO = {
  TIP_HEIGHT: 22,
  BUTTON_SIZE: 28,
  HALF_BAR_HEIGHT: 2,
  PC_TIP_CLS: "tiny-slider__tips",
  PC_SLIDER_CLS: "tiny-slider",
  PC_RANGE_CLS: "tiny-slider__range",
  PC_BUTTON_CLS: "tiny-slider__handle",
  PC_LABEL_CLS: "tiny-slider__mark-label",
  PC_LEFT_SVG_CLS: "tiny-slider-left-svg",
  PC_RIGHT_SVG_CLS: "tiny-slider-right-svg",
  MOBILE_TIP_CLS: "tiny-mobile-slider__tips",
  MOBILE_SLIDER_CLS: "tiny-mobile-slider",
  MOBILE_RANGE_CLS: "tiny-mobile-slider__range",
  MOBILE_BUTTON_CLS: "tiny-mobile-slider__handle",
  MOBILE_LEFT_SVG_CLS: "tiny-mobile-slider-left-svg",
  MOBILE_RIGHT_SVG_CLS: "tiny-mobile-slider-right-svg",
  Mode: "pc",
  tipCls: function(e) {
    return e === this.Mode ? this.PC_TIP_CLS : this.MOBILE_TIP_CLS;
  },
  sliderCls: function(e) {
    return e === this.Mode ? this.PC_SLIDER_CLS : this.MOBILE_SLIDER_CLS;
  },
  rangeCls: function(e) {
    return e === this.Mode ? this.PC_RANGE_CLS : this.MOBILE_RANGE_CLS;
  },
  buttonCls: function(e) {
    return e === this.Mode ? this.PC_BUTTON_CLS : this.MOBILE_BUTTON_CLS;
  },
  leftSvgCls: function(e) {
    return e === this.Mode ? this.PC_LEFT_SVG_CLS : this.MOBILE_LEFT_SVG_CLS;
  },
  rightSvgCls: function(e) {
    return e === this.Mode ? this.PC_RIGHT_SVG_CLS : this.MOBILE_RIGHT_SVG_CLS;
  },
  TIP_CLS: function(e) {
    return e === this.Mode ? this.PC_TIP_CLS : this.MOBILE_TIP_CLS;
  },
  SLIDER_CLS: function(e) {
    return e === this.Mode ? this.PC_SLIDER_CLS : this.MOBILE_SLIDER_CLS;
  },
  RANGE_CLS: function(e) {
    return e === this.Mode ? this.PC_RANGE_CLS : this.MOBILE_RANGE_CLS;
  },
  BUTTON_CLS: function(e) {
    return e === this.Mode ? this.PC_BUTTON_CLS : this.MOBILE_BUTTON_CLS;
  }
}, rO = C(C({}, j), {}, {
  _constants: {
    type: Object,
    default: function() {
      return oO;
    }
  },
  formatTooltip: Function,
  disabled: {
    type: Boolean,
    default: !1
  },
  height: {
    type: String,
    default: "300px"
  },
  max: {
    type: Number,
    default: 100
  },
  min: {
    type: Number,
    default: 0
  },
  modelValue: {
    type: [Number, Array],
    default: 0
  },
  numPages: {
    type: Number,
    default: 1
  },
  range: {
    type: Boolean,
    default: !1
  },
  showInput: {
    type: Boolean,
    default: !1
  },
  showTip: {
    type: Boolean,
    default: !0
  },
  step: {
    type: Number,
    default: 1
  },
  vertical: {
    type: Boolean,
    default: !1
  },
  unit: {
    type: String,
    default: "%"
  },
  showSteps: {
    type: Boolean,
    default: !1
  },
  showLabel: {
    type: Boolean,
    default: !1
  },
  changeCompat: {
    type: Boolean,
    default: !1
  },
  // tiny 新增属性
  marks: {
    type: Object
  }
});
const ct = B({
  name: O + "Slider",
  props: rO,
  setup: function(e, t) {
    return K({
      props: e,
      context: t,
      template: nO
    });
  }
}), iO = "3.20.0";
ct.model = {
  prop: "modelValue",
  event: "update:modelValue"
};
ct.install = function(o) {
  o.component(ct.name, ct);
};
ct.version = iO;
var aO = function(e) {
  var t = e.emit, n = e.props, r = e.state;
  return function(i) {
    if (i.preventDefault(), !(r.disabled || n.types === "loading")) {
      var a = function() {
        r.currentValue = r.currentValue === n.trueValue ? n.falseValue : n.trueValue, t("update:modelValue", r.currentValue), t("change", r.currentValue);
      };
      n.beforeChange ? n.beforeChange(a) : a();
    }
  };
}, sO = function(e) {
  var t = e.prefixCls, n = e.props, r = e.state;
  return function() {
    return [ne(ne(ne(ne(ne({}, t, !0), "".concat(t, "-checked"), r.currentValue === n.trueValue), "".concat(t, "-disabled"), r.disabled), "mini", n.mini), "disabled", r.disabled)];
  };
}, lO = function(e) {
  var t = e.prefixCls;
  return function() {
    return "".concat(t, "-inner");
  };
}, uO = function(e) {
  var t = e.props, n = e.state;
  return function() {
    return {
      backgroundColor: t.trueValue === n.currentValue ? t.trueColor : t.falseColor
    };
  };
}, cO = ["toggle", "state"], dO = function(e, t, n) {
  var r = t.computed, i = t.watch, a = t.reactive, s = t.inject, l = n.parent, u = n.constants, c = n.mode, d = n.emit, p = n.designConfig, f = u.prefixcls(c);
  l.tinyForm = l.tinyForm || s("form", null);
  var m = a({
    currentValue: e.modelValue,
    innerClasses: r(function() {
      return h.computedInnerClasses();
    }),
    wrapClasses: r(function() {
      return h.computedWarpClasses();
    }),
    style: r(function() {
      return h.computedStyle();
    }),
    formDisabled: r(function() {
      return (l.tinyForm || {}).disabled;
    }),
    disabled: r(function() {
      return e.disabled || m.formDisabled || m.isDisplayOnly || e.loading;
    }),
    isDisplayOnly: r(function() {
      return e.displayOnly || (l.tinyForm || {}).displayOnly;
    }),
    showText: r(function() {
      return e.showText === void 0 ? (p == null ? void 0 : p.showText) || !1 : e.showText;
    })
  }), h = {
    state: m,
    computedInnerClasses: lO({
      prefixCls: f
    }),
    computedStyle: uO({
      props: e,
      state: m
    }),
    computedWarpClasses: sO({
      prefixCls: f,
      props: e,
      state: m
    }),
    toggle: aO({
      emit: d,
      props: e,
      state: m
    })
  };
  return i(function() {
    return e.modelValue;
  }, function(v) {
    m.currentValue = typeof e.falseValue != "boolean" || typeof e.trueValue != "boolean" ? v : !!v;
  }, {
    immediate: !0
  }), h;
};
const pO = B({
  props: [...Q, "modelValue", "trueValue", "falseValue", "disabled", "loading", "mini"],
  setup(o, e) {
    return z({ props: o, context: e, renderless: dO, api: cO });
  }
}), fO = ["disabled"], mO = {
  key: 0,
  class: "tiny-mobile-switch-loading"
}, vO = /* @__PURE__ */ T(
  "div",
  { class: "tiny-mobile-switch-loading-inner" },
  null,
  -1
  /* HOISTED */
), hO = [
  vO
];
function gO(o, e, t, n, r, i) {
  return A(), w("span", {
    class: P(o.state.wrapClasses),
    disabled: o.disabled,
    tabindex: "0",
    onClick: e[0] || (e[0] = (...a) => o.toggle && o.toggle(...a)),
    onKeydown: e[1] || (e[1] = Ge((...a) => o.toggle && o.toggle(...a), ["space"]))
  }, [
    o.loading ? (A(), w("div", mO, hO)) : x("v-if", !0)
  ], 42, fO);
}
const fo = /* @__PURE__ */ W(pO, [["render", gO]]);
var AO = function(e) {
  var t, n = (typeof process > "u" ? "undefined" : R(process)) === "object" ? (t = process.env) === null || t === void 0 ? void 0 : t.TINY_MODE : null;
  return fo;
}, yO = {
  PC_PREFIXCLS: "tiny-switch",
  MOBILE_PREFIXCLS: "tiny-mobile-switch",
  Mode: "pc",
  prefixcls: function(e) {
    return e === this.Mode ? this.PC_PREFIXCLS : this.MOBILE_PREFIXCLS;
  }
}, bO = C(C({}, j), {}, {
  _constants: {
    type: Object,
    default: function() {
      return yO;
    }
  },
  disabled: {
    type: Boolean,
    default: !1
  },
  showText: {
    type: Boolean || void 0,
    default: void 0
  },
  types: {
    type: String
  },
  falseColor: String,
  falseValue: {
    type: [String, Number, Boolean],
    default: !1
  },
  mini: {
    type: Boolean,
    default: !1
  },
  modelValue: {
    type: [String, Number, Boolean],
    default: !1
  },
  size: [Number, String],
  tabindex: {
    type: String,
    default: "1"
  },
  trueColor: String,
  trueValue: {
    type: [String, Number, Boolean],
    default: !0
  },
  beforeChange: Function,
  displayOnly: {
    type: Boolean,
    default: !1
  },
  loading: {
    type: Boolean,
    default: !1
  }
});
const dt = B({
  name: O + "Switch",
  props: bO,
  setup: function(e, t) {
    return K({
      props: e,
      context: t,
      template: AO
    });
  }
}), SO = "3.20.0";
dt.model = {
  prop: "modelValue",
  event: "update:modelValue"
};
dt.install = function(o) {
  o.component(dt.name, dt);
};
dt.version = SO;
var wO = function(e) {
  var t = e.props, n = e.state;
  return function() {
    n.children.forEach(function(r, i) {
      r.state ? r.state.index = i : r.index = i, r.state && (r.state.active = (r.name || i) === t.modelValue);
    });
  };
}, TO = function(e) {
  var t = e.emit, n = e.props;
  return function(r) {
    r !== n.modelValue && (t("update:modelValue", r), t("change", r));
  };
}, CO = function(e) {
  var t = e.childrenHandler, n = e.api;
  return function() {
    var r = [];
    return t(function(i) {
      var a = i.options, s = i.vm;
      a.componentName === "TabbarItem" && r.push(s);
    }), n.setActiveItem(), r;
  };
}, IO = function(e) {
  return function(t) {
    e.showIndex >= e.showNumber && (t.state.showVm = !1), e.children.push(t), e.showNumber ? t.getTabbarItemsWidth(e.tabbarWidth, e.showNumber) : e.children.length >= 5 ? t.getTabbarItemsWidth(e.tabbarWidth, 5) : t.getTabbarItemsWidth(e.tabbarWidth, e.children.length);
  };
}, kO = function(e) {
  var t = e.vm, n = e.state;
  return function() {
    n.tabbarWidth = t.$refs.tabbar && t.$refs.tabbar.offsetWidth, n.children.forEach(function(r) {
      n.showNumber ? r.getTabbarItemsWidth(n.tabbarWidth, n.showNumber) : n.children.length >= 5 ? r.getTabbarItemsWidth(n.tabbarWidth, 5) : r.getTabbarItemsWidth(n.tabbarWidth, n.children.length);
    });
  };
}, EO = function(e) {
  var t = e.vm, n = e.api;
  return function() {
    U(window, "resize", n.initPage), t.$off("updateItems"), t.$off("activeItem"), t.$off("showIndex");
  };
}, DO = ["state", "onChange", "getChildrens"], BO = function(e, t, n) {
  var r = t.computed, i = t.onMounted, a = t.reactive, s = t.watch, l = t.onBeforeUnmount, u = t.provide, c = n.vm, d = n.emit, p = n.nextTick, f = n.childrenHandler, m = {}, h = a({
    height: null,
    children: [],
    fit: r(function() {
      return e.safeAreaInsetBottom ? e.safeAreaInsetBottom : e.fixed;
    }),
    activeItem: !1,
    showIndex: 0,
    showNumber: r(function() {
      return e.showNumber > 0 ? e.showNumber : -1;
    }),
    tabbarWidth: null,
    itemList: r(function() {
      return e.itemList || [];
    })
  });
  return Object.assign(m, {
    state: h,
    onChange: TO({
      emit: d,
      props: e
    }),
    parent: r(function() {
      return m.getParent();
    }),
    setActiveItem: wO({
      props: e,
      state: h
    }),
    getChildrens: CO({
      childrenHandler: f,
      api: m
    }),
    getItems: IO(h),
    beforeDestroy: EO({
      vm: c,
      api: m
    }),
    initPage: kO({
      state: h,
      vm: c
    })
  }), i(function() {
    N(window, "resize", m.initPage), h.tabbarWidth = c.$refs.tabbar && c.$refs.tabbar.offsetWidth, e.placeholder && e.fixed && p(function() {
      h.height = c.$refs.tabbar.getBoundingClientRect().height;
    }), h.itemList.forEach(function(v) {
      v.customIcon && u("customIcon", v.customIcon);
    });
  }), c.$on("updateItems", m.getItems), c.$on("activeItem", m.onChange), c.$on("showIndex", function() {
    h.showIndex++;
  }), s(function() {
    return e.modelValue;
  }, function() {
    setTimeout(function() {
      m.setActiveItem();
    }, 100);
  }, {
    immediate: !0
  }), s(function() {
    return h.children;
  }, m.setActiveItem, {
    immediate: !0
  }), l(m.beforeDestroy), m;
};
const xO = B({
  name: O + "Tabbar",
  componentName: "Tabbar",
  props: {
    activeColor: String,
    border: {
      type: Boolean,
      default: !0
    },
    fixed: {
      type: Boolean,
      default: !0
    },
    inactiveColor: String,
    modelValue: {
      type: [Number, String],
      default: 0
    },
    placeholder: Boolean,
    route: Boolean,
    safeAreaInsetBottom: {
      type: Boolean,
      default: null
    },
    zIndex: [Number, String]
  },
  setup(o, e) {
    return z({ props: o, context: e, renderless: BO, api: DO, mono: !0 });
  }
});
function PO(o, e, t, n, r, i) {
  return A(), w(
    "div",
    {
      class: P({ "tiny-mobile-tabbar-placeholder": o.placeholder }),
      style: H({ height: o.state.height })
    },
    [
      T(
        "div",
        {
          ref: "tabbar",
          class: P(["tiny-mobile-tabbar", [{ "is-border": o.border }, { unfit: !o.state.fit, "tiny-mobile-tabbar--fixed": o.fixed }]])
        },
        [
          F(o.$slots, "default")
        ],
        2
        /* CLASS */
      )
    ],
    6
    /* CLASS, STYLE */
  );
}
const pr = /* @__PURE__ */ W(xO, [["render", PO]]);
var MO = function(e) {
  var t, n = (typeof process > "u" ? "undefined" : R(process)) === "object" ? (t = process.env) === null || t === void 0 ? void 0 : t.TINY_MODE : null;
  return pr;
};
const pt = B({
  name: O + "Tabbar",
  componentName: "Tabbar",
  props: C(C({}, j), {}, {
    activeColor: String,
    border: {
      type: Boolean,
      default: !0
    },
    fixed: {
      type: Boolean,
      default: !0
    },
    inactiveColor: String,
    modelValue: {
      type: [Number, String],
      default: 0
    },
    placeholder: Boolean,
    route: Boolean,
    safeAreaInsetBottom: Boolean,
    zIndex: [Number, String],
    showNumber: {
      type: Number,
      default: 5
    },
    itemList: {
      type: Array,
      default: function() {
        return [];
      }
    }
  }),
  setup: function(e, t) {
    return K({
      props: e,
      context: t,
      template: MO
    });
  }
}), OO = "3.20.0";
pt.model = {
  prop: "modelValue",
  event: "update:modelValue"
};
pt.install = function(o) {
  o.component(pt.name, pt);
};
pt.version = OO;
var LO = function(e) {
  var t = e.props, n = e.route;
  return function() {
    if (t.to && n) {
      var r = Ee(t.to) ? t.to : {
        path: t.to
      }, i = r.path === n.path, a = !ke(r.name) && r.name === n.name;
      return i || a;
    }
  };
}, NO = function(e) {
  var t = e.api, n = e.emit, r = e.parent, i = e.props, a = e.router, s = e.state, l = e.dispatch;
  return function(u) {
    l("Tabbar", "activeItem", i.name || r.index || s.index), n("click", u), t.routeTab(a);
  };
}, FO = function(e) {
  var t = e.parent, n = e.vm, r = e.dispatch;
  return function() {
    t.$parent && (r("Tabbar", "updateItems", n), r("Tabbar", "showIndex"));
  };
}, RO = function(e, t) {
  return function(n) {
    var r = e.to, i = e.replace, a = t.url;
    if (r && n) {
      var s = n[i ? "replace" : "push"](r);
      s && s.catch && s.catch(function(l) {
        if (l && l.name !== "NavigationDuplicated")
          throw l;
      });
    } else
      a && (i ? location.replace(a) : location.href = a);
  };
}, VO = function(e) {
  return function(t, n) {
    e.itemWidth = t / n + "px";
  };
}, UO = ["state", "onClick", "getTabbarItemsWidth"], HO = function(e, t, n) {
  var r = t.computed, i = t.onMounted, a = t.reactive, s = t.inject, l = n.parent, u = n.emit, c = n.nextTick, d = n.route, p = n.router, f = n.dispatch, m = n.vm, h = {}, v = a({
    index: -1,
    active: !1,
    info: r(function() {
      return e.dot ? "" : !e.dot && e.badge;
    }),
    url: r(function() {
      return Ae.filterUrl(e.url);
    }),
    routeActive: r(function() {
      return h.getRouteActive();
    }),
    renderActive: r(function() {
      return l.$parent.route ? v.routeActive : v.active;
    }),
    renderColor: r(function() {
      return l.$parent[v.active ? "activeColor" : "inactiveColor"];
    }),
    showVm: !0,
    itemWidth: null,
    childrenNumber: 0,
    customIcon: s("customIcon", null) || e.customIcon
  });
  return Object.assign(h, {
    state: v,
    bindChildren: FO({
      parent: l,
      dispatch: f,
      vm: m
    }),
    routeTab: RO(e, v),
    getRouteActive: LO({
      props: e,
      route: d
    }),
    onClick: NO({
      api: h,
      emit: u,
      parent: l,
      props: e,
      router: p,
      state: v,
      dispatch: f
    }),
    getTabbarItemsWidth: VO(v)
  }), i(function() {
    return c(h.bindChildren);
  }), h;
};
const $O = B({
  name: O + "TabbarItem",
  componentName: "TinyTabbarItem",
  props: {
    ...j,
    url: String,
    replace: Boolean,
    to: [String, Object],
    dot: Boolean,
    icon: Object,
    name: [Number, String],
    info: [Number, String],
    badge: [Number, String]
  },
  setup(o, e) {
    return z({ props: o, context: e, renderless: HO, api: UO });
  }
}), zO = { class: "tiny-mobile-tabbar-item__icon" };
function jO(o, e, t, n, r, i) {
  return A(), w(
    "div",
    {
      class: P(["tiny-mobile-tabbar-item", { "is-active": o.state.renderActive }]),
      style: H({ color: o.state.renderColor }),
      onClick: e[0] || (e[0] = (...a) => o.onClick && o.onClick(...a))
    },
    [
      T("div", zO, [
        F(o.$slots, "icon", {
          active: o.state.renderActive
        }, () => [
          (A(), G(pe(o.icon), {
            style: H({ fill: o.state.renderColor })
          }, null, 8, ["style"]))
        ]),
        o.badge || o.dot ? (A(), w(
          "div",
          {
            key: 0,
            class: P(["tiny-mobile-info", o.dot ? "tiny-mobile-info--dot" : ""])
          },
          M(o.state.info),
          3
          /* TEXT, CLASS */
        )) : x("v-if", !0)
      ]),
      T(
        "div",
        {
          class: "tiny-mobile-tabbar-item__text",
          style: H({ color: o.state.renderColor, pointerEvents: "none" })
        },
        [
          F(o.$slots, "default")
        ],
        4
        /* STYLE */
      )
    ],
    6
    /* CLASS, STYLE */
  );
}
const fr = /* @__PURE__ */ W($O, [["render", jO]]);
var WO = function(e) {
  var t, n = (typeof process > "u" ? "undefined" : R(process)) === "object" ? (t = process.env) === null || t === void 0 ? void 0 : t.TINY_MODE : null;
  return fr;
};
const Ht = B({
  name: O + "TabbarItem",
  componentName: "TabbarItem",
  props: C(C({}, j), {}, {
    url: String,
    replace: Boolean,
    to: [String, Object],
    dot: Boolean,
    icon: Object,
    name: [Number, String],
    text: String,
    info: [Number, String],
    badge: [Number, String],
    customIcon: {
      type: Boolean,
      default: !1
    }
  }),
  setup: function(e, t) {
    return K({
      props: e,
      context: t,
      template: WO
    });
  }
});
const GO = "3.20.0";
Ht.install = function(o) {
  o.component(Ht.name, Ht);
};
Ht.version = GO;
var YO = function(e) {
  var t = e.props;
  return function() {
    return t.data.filter(function(n) {
      return !n.disabled;
    });
  };
}, KO = function(e) {
  var t = e.props, n = e.state;
  return function() {
    var r = [];
    return n.checkableData.forEach(function(i) {
      return r.push(i[t.keys]);
    }), r;
  };
}, QO = function(e) {
  var t = e.state;
  return function() {
    return t.selected.length > 0 && t.selected.length >= t.checkableData.length ? "checked-sur" : t.selected.length > 0 && t.selected.length < t.checkableData.length ? "halfselect" : "check";
  };
}, XO = function(e) {
  var t = e.props, n = e.state;
  return function(r, i) {
    if (!(i && r.length === i.length && r.every(function(s) {
      return i.includes(s);
    }))) {
      var a = [];
      n.checkableData.forEach(function(s) {
        var l = r.indexOf(s[t.keys]);
        ~l && a.push(s);
      }), n.selected = a, n.checkedChangeByUser = !1;
    }
  };
}, ZO = function(e) {
  var t = e.emit, n = e.props, r = e.state;
  return function(i, a) {
    var s = [];
    if (i.forEach(function(u) {
      return s.push(u[n.keys]);
    }), r.checkedChangeByUser) {
      var l = i.concat(a).filter(function(u) {
        return !i.includes(u) || !a.includes(u);
      });
      t("checked-change", s, !1, l);
    } else
      t("checked-change", s, !1), r.checkedChangeByUser = !0;
  };
}, JO = function(e) {
  var t = e.emit, n = e.state;
  return function(r) {
    n.selectedRow = r, t("radio-change", r);
  };
}, qO = function(e) {
  var t = e.state;
  return function(n) {
    if (!n.disabled) {
      var r = t.selected.indexOf(n);
      r !== -1 ? t.selected.splice(r, 1) : t.selected.push(n), t.selected = t.selected.slice();
    }
  };
}, _O = function(e) {
  var t = e.emit, n = e.props, r = e.state;
  return function() {
    var i = [];
    r.selectCls === "checked-sur" ? (r.selected = [], i = []) : (i = r.checkableData.map(function(a) {
      return a[n.keys];
    }), r.selected = r.checkableData), t("checked-change", i, !0);
  };
}, eL = ["state", "selectRow", "togeSelected", "togeSelectAll"], tL = function(e, t, n) {
  var r = t.computed, i = t.reactive, a = t.watch, s = n.t, l = n.emit, u = {}, c = i({
    selectedRow: null,
    checkChangeByUser: !1,
    selected: [],
    checkableData: r(function() {
      return u.computedCheckableData();
    }),
    selectedKeys: r(function() {
      return u.computedSelectedKeys();
    }),
    selectCls: r(function() {
      return u.computedSelectCls();
    })
  });
  return Object.assign(u, {
    t: s,
    state: c,
    computedSelectCls: QO({
      state: c
    }),
    computedSelectedKeys: KO({
      props: e,
      state: c
    }),
    computedCheckableData: YO({
      props: e
    }),
    selectRow: JO({
      emit: l,
      state: c
    }),
    togeSelected: qO({
      state: c
    }),
    togeSelectAll: _O({
      emit: l,
      props: e,
      state: c
    }),
    watchSelected: ZO({
      emit: l,
      props: e,
      state: c
    }),
    watchDefaultChecked: XO({
      props: e,
      state: c
    })
  }), a(function() {
    return e.defaultChecked;
  }, u.watchDefaultChecked), a(function() {
    return c.selected;
  }, u.watchSelected), u;
};
const nL = B({
  components: {
    IconRadioselected: Xl(),
    IconRadio: Zl(),
    IconCheck: Jl(),
    IconCheckedSur: ql(),
    IconHalfselect: _l()
  },
  props: [...Q, "columns", "data", "width", "defaultChecked", "keys"],
  methods: {
    getLeft(o) {
      let e = 0;
      for (let t = 0; t < o; t++)
        e += this.columns[t].width;
      return `${e}px`;
    },
    isLastFixed(o, e) {
      return e.fixed ? o === this.columns.length - 1 ? !0 : !this.columns[o + 1].fixed : !1;
    }
  },
  setup(o, e) {
    return z({ props: o, context: e, renderless: tL, api: eL });
  }
}), oL = ["width"], rL = ["width"], iL = { class: "tiny-mobile-table-header" }, aL = { class: "tiny-mobile-table-cell" }, sL = { key: 1 }, lL = {
  key: 2,
  class: "shadow"
}, uL = ["title"], cL = { key: 0 }, dL = { key: 3 }, pL = {
  key: 4,
  class: "shadow"
}, fL = {
  key: 0,
  class: "noData"
};
function mL(o, e, t, n, r, i) {
  return A(), w(
    "div",
    {
      class: "tiny-mobile-table simple",
      style: H({ width: o.width })
    },
    [
      T("table", { width: o.width }, [
        T("colgroup", null, [
          (A(!0), w(
            q,
            null,
            ae(o.columns, (a, s) => (A(), w("col", {
              key: s,
              width: a.width
            }, null, 8, rL))),
            128
            /* KEYED_FRAGMENT */
          ))
        ]),
        T("thead", iL, [
          T("tr", null, [
            (A(!0), w(
              q,
              null,
              ae(o.columns, (a, s) => (A(), w(
                "th",
                {
                  key: s,
                  class: P({ overflow: a.showOverflow, fixed: a.fixed }),
                  style: H({ left: o.getLeft(s) })
                },
                [
                  T("div", aL, [
                    a.type === "selection" ? (A(), G(pe(`icon-${o.state.selectCls}`), {
                      key: 0,
                      class: P(["tiny-mobile-svg-size", { "is-check": o.state.selectCls !== "check" }]),
                      onClick: o.togeSelectAll
                    }, null, 8, ["class", "onClick"])) : x("v-if", !0),
                    a.type ? x("v-if", !0) : (A(), w(
                      "div",
                      sL,
                      M(a.title),
                      1
                      /* TEXT */
                    )),
                    o.isLastFixed(s, a) ? (A(), w("div", lL)) : x("v-if", !0)
                  ])
                ],
                6
                /* CLASS, STYLE */
              ))),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ]),
        T("tbody", null, [
          (A(!0), w(
            q,
            null,
            ae(o.data, (a, s) => (A(), w(
              "tr",
              {
                key: s,
                class: P(["handlerCls", o.state.selectedKeys.indexOf(a[o.keys]) > -1 ? "" : "is-disabled"])
              },
              [
                (A(!0), w(
                  q,
                  null,
                  ae(o.columns, (l, u) => (A(), w(
                    "td",
                    {
                      key: u,
                      class: P({ fixed: l.fixed }),
                      style: H({ left: o.getLeft(u) })
                    },
                    [
                      T("div", {
                        class: P(["tiny-mobile-table-cell", { overflow: l.showOverflow }]),
                        title: l.showOverflow ? a[l.field] : ""
                      }, [
                        l.type === "index" ? (A(), w(
                          "div",
                          cL,
                          M(s + 1),
                          1
                          /* TEXT */
                        )) : l.type === "radio" ? (A(), G(pe(o.state.selectedRow === a ? "icon-radioselected" : "icon-radio"), {
                          key: 1,
                          class: "tiny-mobile-svg-size",
                          onClick: (c) => o.selectRow(a)
                        }, null, 8, ["onClick"])) : l.type === "selection" ? (A(), G(pe(o.state.selected.indexOf(a) === -1 ? "icon-check" : "icon-checked-sur"), {
                          key: 2,
                          class: P([
                            "tiny-mobile-svg-size",
                            { "is-check": o.state.selected.indexOf(a) > -1 },
                            { "is-disabled": o.state.selectedKeys.indexOf(o.keys) > -1 }
                          ]),
                          onClick: (c) => o.togeSelected(a)
                        }, null, 8, ["class", "onClick"])) : (A(), w(
                          "div",
                          dL,
                          M(a[l.field]),
                          1
                          /* TEXT */
                        )),
                        o.isLastFixed(u, l) ? (A(), w("div", pL)) : x("v-if", !0)
                      ], 10, uL)
                    ],
                    6
                    /* CLASS, STYLE */
                  ))),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ],
              2
              /* CLASS */
            ))),
            128
            /* KEYED_FRAGMENT */
          )),
          o.data && o.data.length === 0 ? (A(), w(
            "p",
            fL,
            M(o.t("ui.transfer.noData")),
            1
            /* TEXT */
          )) : x("v-if", !0)
        ])
      ], 8, oL)
    ],
    4
    /* STYLE */
  );
}
const mr = /* @__PURE__ */ W(nL, [["render", mL]]);
var vL = function(e) {
  var t, n = (typeof process > "u" ? "undefined" : R(process)) === "object" ? (t = process.env) === null || t === void 0 ? void 0 : t.TINY_MODE : null;
  return mr;
};
const $t = B({
  name: O + "Table",
  props: C(C({}, j), {}, {
    columns: Array,
    data: Array,
    width: String,
    defaultChecked: Array,
    keys: String
  }),
  setup: function(e, t) {
    return K({
      props: e,
      context: t,
      template: vL
    });
  }
}), hL = "3.20.0";
$t.install = function(o) {
  o.component($t.name, $t);
};
$t.version = hL;
var gL = function(e, t) {
  var n = e.$slots.default, r;
  if (typeof n == "function") {
    r = [];
    var i = n(), a = function(u) {
      var c = u.type, d = u.componentOptions, p = u.props, f = c && c.componentName;
      if (f || (f = d && d.Ctor.extendOptions.componentName), f === "TabItem") {
        var m = p && p.name || d && d.propsData.name;
        r.push(m);
      }
    };
    i.forEach(function(l) {
      var u = l.type, c = l.componentOptions, d = l.props, p = l.children;
      u && (u.toString() === "Symbol(Fragment)" || // vue@3.3之前的开发模式
      u.toString() === "Symbol(v-fgt)" || //   vue@3.3.1 的变更
      u.toString() === "Symbol()") ? Array.isArray(p) && p.forEach(function(f) {
        var m = f.type, h = f.componentOptions, v = f.props;
        return a({
          type: m,
          componentOptions: h,
          props: v
        });
      }) : a({
        type: u,
        componentOptions: c,
        props: d
      });
    });
  }
  if (r.length > 0) {
    var s = [];
    r.forEach(function(l) {
      var u = t.find(function(c) {
        return c.name === l;
      });
      u && s.push(u);
    }), t = s;
  }
  return t;
}, AL = function(e) {
  var t = e.constants, n = e.parent, r = e.state, i = e.childrenHandler;
  return function() {
    var a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, s = n.$slots.default;
    if (s) {
      var l = [];
      s().forEach(function(p) {
        if (Array.isArray(p.children))
          p.children.forEach(function(h) {
            var v, g = (v = h.props) === null || v === void 0 ? void 0 : v.name;
            g && l.push(g);
          });
        else {
          var f, m = (f = p.props) === null || f === void 0 ? void 0 : f.name;
          m && l.push(m);
        }
      });
      var u = [];
      i(function(p) {
        var f = p.vm, m = p.isLevel1;
        if (m && f.$options.componentName === t.TAB_ITEM) {
          var h = l.findIndex(function(v) {
            return v === f.name;
          });
          h > -1 ? u[h] = f : u.push(f);
        }
      });
      var c = gL(n, u), d = !(c.length === r.panes.length && c.every(function(p, f) {
        return p.state === r.panes[f].state;
      }));
      (a || d) && (r.panes = c);
    } else
      r.panes.length !== 0 && (r.panes = []);
  };
}, yL = function(e) {
  var t = e.parent, n = e.props, r = e.state, i = e.refs;
  return function() {
    if (n.showMoreTabs) {
      var a = t.$el, s = a.querySelectorAll(".tiny-tabs__item"), l = i.nav.$refs;
      if (n.moreShowAll) {
        r.showPanesCount = 0;
        return;
      }
      if (s && s.length) {
        var u = 0;
        r.currentIndex === -1 && (r.currentIndex = r.panes.findIndex(function(m) {
          return m.state.paneName === r.currentName;
        }));
        for (var c = r.currentIndex < 0 ? 0 : r.currentIndex, d = l.navScroll.offsetWidth, p = 0; p < s.length; p++) {
          var f = s[p];
          if (u = f.offsetLeft + f.offsetWidth / 2, u > d && c >= 0) {
            c >= p + 1 ? r.showPanesCount = c : r.showPanesCount = p;
            break;
          }
        }
      }
    }
  };
}, bL = function(e) {
  var t = e.parent, n = e.props, r = e.state;
  return function() {
    if (n.showExpandTabs) {
      var i = t.$el, a = i.querySelector(".tiny-mobile-tabs__header");
      a && (r.expandPanesWidth = a.clientWidth);
    }
  };
}, SL = function(e) {
  var t = e.api, n = e.emit, r = e.props, i = e.refs;
  return function(a, s, l) {
    a.disabled || (t.setCurrentName(s), n("click", a, l), r.showExpandTabs && i.nav && i.nav.expandTabHide());
  };
}, wL = function(e) {
  var t = e.emit, n = e.props;
  return function(r, i) {
    if (!r.disabled) {
      i.stopPropagation();
      var a = function() {
        t("edit", r.name, "remove"), t("close", r.name);
      };
      if (typeof n.beforeClose == "function") {
        var s = n.beforeClose(r.name);
        s && s.then ? s.then(function(l) {
          return l && a();
        }) : s && a();
      } else
        a();
    }
  };
}, TL = function(e) {
  return function() {
    e("edit", null, "add"), e("add");
  };
}, CL = function(e) {
  var t = e.api, n = e.props, r = e.refs, i = e.state;
  return function(a) {
    if (t.changeDirection(i.currentName), i.currentName !== a && n.beforeLeave) {
      var s = n.beforeLeave(a, i.currentName);
      s && s.then ? s.then(function() {
        t.changeCurrentName(a), r.nav && r.nav.removeFocus(a);
      }).catch(function() {
        return null;
      }) : s !== !1 && t.changeCurrentName(a);
    } else
      t.changeCurrentName(a);
  };
}, IL = function(e) {
  var t = e.emit, n = e.state;
  return function(r) {
    n.currentName = r, t("update:modelValue", r);
  };
}, kL = function(e) {
  var t = e.api, n = e.parent, r = e.state;
  return function() {
    t.changeDirection(r.currentName), n.$on("tab-nav-update", t.calcPaneInstances.bind(null, !0));
  };
}, EL = function(e) {
  var t = e.props, n = e.state;
  return function(r) {
    var i = n.panes;
    i.forEach(function(a, s) {
      if (a.state.paneName === r && n.currentIndex !== s) {
        var l = ~["top", "bottom"].indexOf(t.position), u = n.currentIndex < s;
        n.direction = l ? u ? "right" : "left" : u ? "bottom" : "top", n.currentIndex = s;
      }
    });
  };
}, DL = function(e) {
  var t = e.emit;
  return function(n) {
    t("tab-drag-start", n);
  };
}, BL = function(e) {
  var t = e.emit;
  return function(n) {
    t("tab-drag-over", n);
  };
}, xL = function(e) {
  var t = e.state, n = e.emit;
  return function(r) {
    var i = r.oldDraggableIndex, a = r.newDraggableIndex, s = t.panes.splice(i, 1)[0];
    t.panes.splice(a, 0, s), n("tab-drag-end", r);
  };
}, PL = ["state", "handleTabAdd", "calcPaneInstances", "handleTabRemove", "handleTabClick", "handleTabDragStart", "handleTabDragOver", "handleTabDragEnd", "setCurrentName", "getNavRefs"], ML = function(e) {
  var t = e.reactive, n = e.props;
  return t({
    panes: [],
    currentName: n.modelValue || n.activeName,
    currentIndex: -1,
    showPanesCount: -1,
    startX: 0,
    startY: 0,
    deltaX: 0,
    deltaY: 0,
    offsetX: 0,
    offsetY: 0,
    direction: "",
    expandPanesWidth: "",
    activeIndex: 1,
    separator: n.separator
  });
}, OL = function(e) {
  var t = e.watch, n = e.props, r = e.api, i = e.state, a = e.nextTick, s = e.refs;
  t(function() {
    return n.modelValue;
  }, r.setCurrentName), t(function() {
    return n.activeName;
  }, r.setCurrentName), t(function() {
    return i.currentName;
  }, function() {
    a(function() {
      s.nav.scrollToActiveTab();
    });
  }, {
    deep: !0
  }), t(function() {
    return n.showMoreTabs;
  }, function(l) {
    l || (i.morePanes = [], i.showPanesCount = -1);
  }, {
    immediate: !0
  });
}, LL = function(e, t, n) {
  var r = t.onMounted, i = t.onUpdated, a = t.provide, s = t.reactive, l = t.watch, u = t.onUnmounted, c = n.vm, d = n.refs, p = n.parent, f = n.emit, m = n.constants, h = n.nextTick, v = n.childrenHandler, g = {}, b = ML({
    reactive: s,
    props: e
  });
  return Object.assign(g, {
    state: b,
    handleTabAdd: TL(f),
    handleTabRemove: wL({
      emit: f,
      props: e
    }),
    changeDirection: EL({
      props: e,
      state: b
    }),
    changeCurrentName: IL({
      emit: f,
      state: b
    }),
    calcMorePanes: yL({
      parent: p,
      props: e,
      state: b,
      refs: d
    }),
    calcExpandPanes: bL({
      parent: p,
      props: e,
      state: b
    }),
    calcPaneInstances: AL({
      constants: m,
      parent: p,
      state: b,
      childrenHandler: v
    }),
    handleTabDragStart: DL({
      emit: f
    }),
    handleTabDragOver: BL({
      emit: f
    }),
    handleTabDragEnd: xL({
      state: b,
      emit: f
    }),
    handleTabClick: SL({
      api: g,
      emit: f,
      props: e,
      refs: d
    }),
    setCurrentName: CL({
      api: g,
      props: e,
      refs: d,
      state: b
    }),
    created: kL({
      api: g,
      parent: p,
      state: b
    })
  }), g.created(), a("rootTabs", p), a("separator", b.separator), OL({
    watch: l,
    props: e,
    api: g,
    state: b,
    nextTick: h,
    refs: d
  }), r(function() {
    g.calcPaneInstances(), g.calcMorePanes(), g.calcExpandPanes();
  }), i(function() {
    g.calcPaneInstances(), g.calcMorePanes(), g.calcExpandPanes();
  }), u(function() {
    c.$off("tab-nav-update");
  }), g;
}, NL = function(e) {
  var t = ~[At.Top, At.Bottom].indexOf(e.rootTabs.position) ? "X" : "Y";
  if (e.mode === "mobile") {
    var n = e.lineStyle, r = n.offset, i = n.width;
    return {
      width: "".concat(i, "px"),
      transform: "translate".concat(t, "(").concat(r, "px) translate").concat(t, "(-50%)")
    };
  } else
    return {
      transform: "translate".concat(t, "(-").concat(e.navOffset, "px)")
    };
}, FL = function(e) {
  var t = e.parent, n = e.vm, r = e.state;
  return function() {
    if (r.scrollable) {
      var i = n.$refs.nav, a = t.$el.querySelector(".is-active");
      if (a) {
        var s = a.offsetLeft - (i.offsetWidth - a.offsetWidth) / 2, l = i.scrollLeft;
        if (r.mode === "mobile") {
          i.scrollLeft += s - l;
          var u = a.querySelector(".tiny-mobile-tabs__name");
          r.lineStyle.width = u.offsetWidth, r.lineStyle.offset = a.offsetLeft + a.offsetWidth / 2;
        }
      }
    }
  };
}, RL = function(e) {
  return ~[At.Top, At.Bottom].indexOf(e.rootTabs.position) ? "width" : "height";
}, VL = function(e) {
  var t = e.api, n = e.vm, r = e.state;
  return function() {
    if (!(!n.$refs.nav || r.dragging)) {
      var i = n.$refs.nav["offset".concat(dn(r.sizeName))];
      r.mode === "mobile" && Array.prototype.forEach.call(n.$refs.nav.children, function(c) {
        if (c.classList && c.classList.contains("tiny-mobile-tabs__item") && (i += c.offsetWidth), c.classList && c.classList.contains("is-active")) {
          var d = c.querySelector(".tiny-mobile-tabs__name");
          r.isActive = !0, r.lineStyle.width = d.offsetWidth, r.lineStyle.offset = c.offsetLeft + c.offsetWidth / 2;
        }
      });
      var a = n.$refs.navScroll["offset".concat(dn(r.sizeName))], s = r.navOffset;
      if (a < i) {
        var l = r.navOffset;
        r.scrollable || (r.scrollable = {
          prev: l,
          next: l + a < i
        }), i - l < a && (r.navOffset = i - a);
      } else
        r.scrollable = !1, s > 0 && (r.navOffset = 0);
      if (r.isActive && t.scrollIntoView(), n.$refs.tabBar)
        n.$refs.tabBar.state.barStyle = n.$refs.tabBar.computedBarStyle(n.$refs.tabBar, r);
      else {
        var u = n.$refs.nav.querySelector("tiny-mobile-tabs__line");
        u && u.style && (u.style.transform = t.computedNavStyle(r).transform);
      }
    }
  };
}, UL = function(e) {
  var t = e.api, n = e.parent, r = n.$refs.nav.$el;
  Ns(r, t.updated), N(document, "visibilitychange", t.visibilityChangeHandler), N(window, "blur", t.windowBlurHandler), N(window, "focus", t.windowFocusHandler), t.scrollToActiveTab(), t.scrollIntoView(), t.sortableEvent();
}, HL = function(e) {
  var t = e.api, n = e.parent, r = n.$refs.nav && n.$refs.nav.$el;
  r && t.updated && Fs(r, t.updated), U(document, "visibilitychange", t.visibilityChangeHandler), U(window, "blur", t.windowBlurHandler), U(window, "focus", t.windowFocusHandler);
}, $L = function(e) {
  return function() {
    var t = document.visibilityState;
    t === "hidden" ? e.focusable = !1 : t === "visible" && setTimeout(function() {
      e.focusable = !0;
    }, 50);
  };
}, zL = function(e) {
  return function() {
    e.focusable = !1;
  };
}, jL = function(e) {
  return function() {
    setTimeout(function() {
      e.focusable = !0;
    }, 50);
  };
}, WL = function(e) {
  var t = e.parent, n = e.vm, r = e.state;
  return function() {
    if (r.scrollable) {
      var i = n.$refs.nav, a = t.$el.querySelector(".is-active");
      if (a) {
        var s = n.$refs.navScroll, l = a.getBoundingClientRect(), u = s.getBoundingClientRect(), c = i.offsetWidth - u.width;
        r.mode === "mobile" && (l.left > u.width ? c = l.left - u.width + l.width : c = l.width);
        var d = r.navOffset, p = d;
        l.left < u.left && (p = d - (u.left - l.left)), l.right > u.right && (p = d + l.right - u.right), p = Math.max(p, 0), r.navOffset = Math.min(p, c);
      }
    }
  };
}, GL = function(e) {
  var t = e.vm, n = e.state;
  return function() {
    var r = t.$refs.navScroll["offset".concat(dn(n.sizeName))], i = n.navOffset;
    if (i) {
      var a = i > r ? i - r : 0;
      n.navOffset = a;
    }
  };
}, YL = function(e) {
  var t = e.vm, n = e.state;
  return function() {
    var r = t.$refs.nav["offset".concat(dn(n.sizeName))], i = t.$refs.navScroll["offset".concat(dn(n.sizeName))], a = n.navOffset;
    if (!(r - a <= i)) {
      var s = r - a > i * 2 ? a + i : r - i;
      n.navOffset = s;
    }
  };
}, KL = function(e) {
  return function(t) {
    var n = t.keyCode, r, i, a;
    if (~[ie.ArrowLeft, ie.ArrowRight, ie.ArrowUp, ie.ArrowDown].indexOf(n) && t.currentTarget) {
      var s = t.currentTarget;
      a = s.querySelectorAll("[role=tab]"), i = Array.prototype.indexOf.call(a, t.target);
    } else
      return;
    n === ie.ArrowLeft || n === ie.ArrowUp ? i === 0 ? r = a.length - 1 : r = i - 1 : i < a.length - 1 ? r = i + 1 : r = 0, a[r].focus(), a[r].click(), e.setFocus();
  };
}, QL = function(e) {
  return function() {
    e.focusable && (e.isFocus = !0);
  };
}, XL = function(e) {
  return function() {
    e.isFocus = !0;
  };
}, ZL = function(e) {
  return function() {
    e.showMoreItem ? e.showMoreItem = !1 : e.showMoreItem = !0;
  };
}, JL = function(e) {
  var t = e.api, n = e.state;
  return function() {
    n.showExpandItem = !n.showExpandItem, n.showExpandItem && t.computedHeaderStyle();
  };
}, qL = function(e) {
  return function() {
    return e.showExpandItem = !1;
  };
}, _L = function(e) {
  var t = e.vm, n = e.state;
  return function() {
    return t.$refs.nav && (n.expandHeaderStyle[n.sizeName] = t.$refs.nav["offset".concat(dn(n.sizeName))] + "px"), n.expandHeaderStyle;
  };
}, eN = function(e) {
  var t = e.state, n = e.vm, r = e.emit;
  return function(i) {
    if (t.dragging = !0, ![At.Top, At.Bottom].includes(t.rootTabs.position)) {
      r("tab-drag-start", i);
      return;
    }
    var a = n.$refs.navScroll, s = n.$refs.nav, l = a.offsetWidth, u = s.offsetWidth;
    if (u > l) {
      var c = s.offsetHeight;
      a.style.height = c + "px", s.style.transition = "none", s.style.transform = "", s.style.width = l + "px", s.style.overflowX = "scroll", s.scrollTo(t.navOffset, 0);
    }
    r("tab-drag-start", i);
  };
}, tN = function(e) {
  var t = e.vm, n = e.state, r = e.nextTick;
  return function() {
    if (n.dragging = !1, !![At.Top, At.Bottom].includes(n.rootTabs.position)) {
      var i = t.$refs.nav;
      if (i.style.width) {
        var a = i.scrollLeft, s = t.$refs.navScroll;
        s.style.height = "", i.style.width = "", i.style.overflowX = "", n.navOffset = a, r(function() {
          i.style.transition = "";
        });
      }
    }
  };
}, nN = function(e) {
  var t = e.api, n = e.props, r = e.state, i = e.vm, a = e.emit, s = e.markRaw;
  return function() {
    if (!(!n.dropConfig || typeof n.dropConfig.plugin != "function")) {
      var l = new n.dropConfig.plugin(i.$refs.nav, {
        sort: !0,
        draggable: ".tiny-tabs__item",
        onUpdate: function(c) {
          a("tab-drag-end", c);
        },
        onMove: function(c) {
          a("tab-drag-over", c);
        },
        onStart: function(c) {
          t.handleTabDragStart(c);
        },
        onEnd: function() {
          t.handleTabDragEnd();
        }
      });
      r.navSortableObj = s(l);
    }
  };
}, oN = function(e) {
  var t = e.nextTick, n = e.vm, r = e.state;
  return function() {
    t(function() {
      var i = n.$refs.tabBar;
      i && (i.state.barStyle = i.computedBarStyle(i, r));
    });
  };
}, rN = function(e) {
  var t = e.state, n = e.vm, r = e.props;
  return function(i, a) {
    var s = i.target, l = a == null ? void 0 : a.el;
    if (!r.tooltipConfig && s && l && l.scrollWidth > l.offsetWidth) {
      var u = n.$refs.tooltip;
      u.state.referenceElm = s, u.state.popperElm && (u.state.popperElm.style.display = "none"), u.doDestroy(), t.tooltipContent = a, t.tooltipVisible = !0, setTimeout(u.updatePopper, 20);
    }
  };
}, iN = function(e) {
  var t = e.state;
  return function() {
    t.tooltipVisible = !1;
  };
}, aN = ["state", "setFocus", "removeFocus", "scrollPrev", "scrollNext", "changeTab", "scrollToActiveTab", "scrollIntoView", "moreTabShow", "expandTabShow", "expandTabHide", "computedHeaderStyle", "swiperHandle", "updated", "handleTitleMouseenter", "handleTitleMouseleave"], sN = function(e, t, n) {
  var r = t.computed, i = t.inject, a = t.onBeforeUnmount, s = t.onMounted, l = t.onUpdated, u = t.reactive, c = t.markRaw, d = n.parent, p = n.vm, f = n.nextTick, m = n.mode, h = n.emit, v = {
    mounted: UL,
    beforeUnmount: HL,
    computedNavStyle: NL,
    computedSizeName: RL
  }, g = u({
    dragging: !1,
    navOffset: 0,
    lineStyle: {
      width: 20,
      offset: 0
    },
    scrollable: !1,
    isFocus: !1,
    focusable: !1,
    showMoreItem: !1,
    isActive: !1,
    tooltipVisible: !1,
    tooltipContent: "",
    showMoreTabs: e.showMoreTabs,
    showExpandItem: !1,
    showExpandTabs: e.showExpandTabs,
    expandHeaderStyle: {},
    mode: e._mode || d.$mode || m || "pc",
    rootTabs: i("rootTabs"),
    sizeName: r(function() {
      return v.computedSizeName(g);
    }),
    navStyle: r(function() {
      return v.computedNavStyle(g);
    }),
    navSortableObj: {},
    separator: i("separator", null)
  });
  return Object.assign(v, {
    state: g,
    setFocus: QL(g),
    removeFocus: XL(g),
    moreTabShow: ZL(g),
    expandTabShow: JL({
      api: v,
      state: g
    }),
    expandTabHide: qL(g),
    scrollPrev: GL({
      vm: p,
      state: g
    }),
    scrollNext: YL({
      vm: p,
      state: g
    }),
    windowBlurHandler: zL(g),
    windowFocusHandler: jL(g),
    visibilityChangeHandler: $L(g),
    scrollToActiveTab: WL({
      parent: d,
      vm: p,
      state: g
    }),
    scrollIntoView: FL({
      parent: d,
      vm: p,
      state: g
    }),
    computedHeaderStyle: _L({
      vm: p,
      state: g
    }),
    watchCurrentName: oN({
      nextTick: f,
      vm: p,
      state: g
    }),
    handleTabDragStart: eN({
      state: g,
      vm: p,
      emit: h
    }),
    handleTabDragEnd: tN({
      state: g,
      vm: p,
      nextTick: f
    }),
    sortableEvent: nN({
      api: v,
      props: e,
      state: g,
      vm: p,
      emit: h,
      markRaw: c
    }),
    handleTitleMouseenter: rN({
      state: g,
      vm: p,
      props: e
    }),
    handleTitleMouseleave: iN({
      state: g
    })
  }), Object.assign(v, {
    updated: VL({
      api: v,
      vm: p,
      state: g
    }),
    changeTab: KL(v)
  }), l(function() {
    return v.updated();
  }), s(function() {
    return v.mounted({
      api: v,
      parent: d
    });
  }), a(function() {
    return v.beforeUnmount({
      api: v,
      parent: d
    });
  }), v;
};
C(C({}, j), {}, {
  panes: {
    type: Array,
    default: function() {
      return [];
    }
  },
  currentName: String,
  editable: Boolean,
  overflowTitle: Boolean,
  onTabClick: {
    type: Function,
    default: function() {
    }
  },
  onTabRemove: {
    type: Function,
    default: function() {
    }
  },
  tabStyle: String,
  stretch: Boolean,
  showMoreTabs: Boolean,
  showPanesCount: Number,
  popperClass: String,
  popperAppendToBody: {
    type: Boolean,
    default: !0
  },
  dropConfig: {
    type: Object,
    default: function() {
      return null;
    }
  },
  titleWidth: {
    type: String,
    default: "256px"
  },
  // tiny 新增
  tooltipConfig: [String, Object],
  panelMaxHeight: String,
  panelWidth: String
});
var lN = C(C({}, j), {}, {
  panes: {
    type: Array,
    default: function() {
      return [];
    }
  },
  currentName: String,
  activeColor: {
    type: String,
    default: ""
  },
  onTabClick: {
    type: Function,
    default: function() {
    }
  },
  onTabRemove: {
    type: Function,
    default: function() {
    }
  },
  showExpandTabs: Boolean,
  expandPanesWidth: {
    type: String,
    default: ""
  },
  expandTabsTitle: {
    type: String,
    default: "请选择"
  },
  expandTabsMode: {
    type: String,
    default: "columns"
  },
  stretch: {
    type: Boolean,
    default: !1
  }
});
C(C({}, j), {}, {
  tabs: Array
});
const fa = /* @__PURE__ */ B({
  name: O + "TabNav",
  components: {
    IconClose: yt(),
    IconChevronDown: Oo()
  },
  props: lN,
  setup(o, e) {
    return z({
      props: o,
      context: e,
      renderless: sN,
      api: aN,
      mono: !0,
      h: J
    });
  },
  render() {
    const {
      state: o,
      panes: e,
      onTabClick: t,
      onTabRemove: n,
      showExpandTabs: r,
      expandTabShow: i,
      activeColor: a,
      expandPanesWidth: s,
      currentName: l,
      expandTabsTitle: u,
      expandTabsMode: c,
      stretch: d
    } = this, p = r ? D("div", {
      class: "tiny-mobile-tabs__expand-icon"
    }, [D("span", {
      slot: "reference",
      class: "tiny-mobile-tabs__expand",
      onClick: () => {
        i();
      }
    }, [D($("icon-chevron-down"), null, null)])]) : null, f = D("div", {
      class: "tiny-mobile-tabs__expand-content",
      style: o.showExpandItem ? {
        display: "block",
        width: s ? s + "px" : ""
      } : {
        display: "none"
      }
    }, [D("div", {
      class: "tiny-mobile-tabs__expand-mask"
    }, null), D("div", {
      class: "tiny-mobile-tabs__expand-header"
    }, [D("label", {
      class: "tiny-mobile-tabs__expand-header-title",
      style: o.expandHeaderStyle
    }, [u]), D("span", {
      slot: "reference",
      class: "tiny-mobile-tabs__expand",
      style: {
        transform: "rotate(180deg)"
      }
    }, [D($("icon-chevron-down"), null, null)])]), D("div", {
      class: "tiny-mobile-tabs__expand-list"
    }, [e.map((v, g) => {
      const b = v.name || v.state.index || g, y = v.$slots.title || v.title;
      return D("div", {
        class: {
          "tiny-mobile-tabs__expand-item": !0,
          [`tiny-mobile-tabs__expand-mode-${c}`]: c === "columns"
        }
      }, [D("div", {
        class: {
          "tiny-mobile-tabs__expand-item-title": !0,
          "is-current": l === b
        },
        onClick: (S) => {
          t(v, b, S);
        }
      }, [y])]);
    })])]), m = {}, h = e.map((v, g) => {
      let b = v.name || v.state.index || g;
      const y = v.state.isClosable;
      v.state.index = `${g}`;
      const S = y && e.length > 1 ? D("span", {
        class: "tiny-mobile-tabs__icon-close"
      }, [D($("icon-close"), {
        onClick: (E) => {
          n(v, E);
        }
      }, null)]) : null, I = v.$slots.title || v.title, k = {};
      return d || (k.flex = 0, m.justifyContent = "center"), g === e.length - 1 && (k.marginRight = 0), D("div", {
        class: {
          "tiny-mobile-tabs__item": !0,
          [`is-${o.rootTabs.position}`]: !0,
          "is-active": v.state.active,
          "is-disabled": v.disabled,
          "is-closable": y
        },
        style: k,
        role: "tab",
        ref: "tabs",
        id: `tab-${b}`,
        key: `tab-${b}`,
        "aria-controls": `pane-${b}`,
        "aria-selected": v.state.active,
        onClick: (E) => {
          t(v, b, E);
        }
      }, [D("span", {
        class: "tiny-mobile-tabs__name",
        style: a && v.state.active ? {
          color: a
        } : {}
      }, [I, S])]);
    });
    return D("div", {
      style: r ? {
        paddingRight: "46px"
      } : {},
      class: ["tiny-mobile-tabs__nav-wrap", o.scrollable ? "is-scrollable" : "", e.length > 4 ? "tiny-mobile-tabs__wrap-scrollable" : "", r ? "is-show-expand" : "", `is-${o.rootTabs.position}`]
    }, [D("div", {
      class: ["tiny-mobile-tabs__nav-scroll"],
      ref: "navScroll"
    }, [D("div", {
      class: ["tiny-mobile-tabs__nav", `is-${o.rootTabs.position}`],
      style: m,
      ref: "nav",
      role: "tablist"
    }, [h, D("div", {
      class: "tiny-mobile-tabs__line",
      style: [o.navStyle, a ? {
        backgroundColor: a
      } : {}]
    }, null)])]), [p, f]]);
  }
});
const uN = 50, mo = /* @__PURE__ */ B({
  props: [...Q, "activeName", "position", "withClose", "withAdd", "activeColor", "modelValue", "beforeLeave", "editable", "showExpandTabs", "childrenTabs", "swipeable", "expandTabsTitle", "expandTabsMode", "stretch", "size"],
  components: {
    TabNav: fa,
    IconPlus: Hr()
  },
  setup(o, e) {
    return z({
      props: o,
      context: e,
      renderless: LL,
      api: PL
    });
  },
  methods: {
    getCurIndex() {
      let o = 0;
      return this.state.panes.filter((e, t) => e.name === this.state.currentName && (o = t)), o;
    },
    onTouchEnd() {
      const {
        direction: o,
        deltaX: e
      } = this.state, t = this.getCurIndex();
      if (o === "horizontal" && this.state.offsetX >= uN) {
        if (e > 0 && t !== 0) {
          const n = this.state.panes[t - 1].name;
          this.$emit("swipeLeft", n), this.setCurrentName(n), this.$refs.nav.scrollToActiveTab();
        } else if (e < 0 && t !== this.state.panes.length - 1) {
          const n = this.state.panes[t + 1].name;
          this.$emit("swipeRight", n), this.setCurrentName(n), this.$refs.nav.scrollToActiveTab();
        }
      }
    }
  },
  render() {
    let {
      state: o,
      position: e,
      handleTabClick: t,
      handleTabRemove: n,
      handleTabAdd: r,
      editable: i,
      withAdd: a,
      showExpandTabs: s,
      swipeable: l,
      activeColor: u,
      expandTabsTitle: c,
      expandTabsMode: d,
      stretch: p,
      size: f
    } = this;
    const m = i || a ? D("span", {
      class: "tiny-mobile-tabs__new-tab",
      onClick: r,
      tabindex: "0",
      onKeydown: (S) => {
        S.keyCode === 13 && r();
      }
    }, [D($("icon-plus"), null, null)]) : null, h = {
      props: {
        currentName: o.currentName,
        panes: o.panes,
        activeColor: u,
        onTabClick: t,
        onTabRemove: n,
        showExpandTabs: s,
        expandPanesWidth: o.expandPanesWidth,
        expandTabsTitle: c,
        expandTabsMode: d,
        stretch: p
      },
      ref: "nav"
    }, v = J(fa, {
      ...h
    }), g = D("div", {
      class: ["tiny-mobile-tabs__header", `is-${e}`]
    }, [m, v]), b = l ? {
      touchstart: ii(o),
      touchmove: xA(o),
      touchend: this.onTouchEnd,
      touchcancel: this.onTouchEnd
    } : {}, y = J("div", {
      class: "tiny-mobile-tabs__content",
      on: {
        ...b
      }
    }, this.slots.default());
    return D("div", {
      class: {
        "tiny-mobile-tabs": !0,
        [`tiny-mobile--${e}`]: !0,
        "tiny-mobile-tabs-small": f === "small"
      }
    }, [[g, y]]);
  }
});
var cN = function(e) {
  var t, n = (typeof process > "u" ? "undefined" : R(process)) === "object" ? (t = process.env) === null || t === void 0 ? void 0 : t.TINY_MODE : null;
  return mo;
}, dN = {
  TAB_ITEM: "TabItem"
}, pN = C(C({}, j), {}, {
  _constants: {
    type: Object,
    default: function() {
      return dN;
    }
  },
  tabStyle: String,
  activeName: String,
  withClose: Boolean,
  withAdd: Boolean,
  size: String,
  activeColor: {
    type: String,
    default: ""
  },
  modelValue: {},
  editable: Boolean,
  position: {
    type: String,
    default: "top"
  },
  beforeLeave: Function,
  stretch: Boolean,
  showMoreTabs: Boolean,
  swipeable: {
    type: Boolean,
    default: !1
  },
  popperClass: String,
  popperAppendToBody: {
    type: Boolean,
    default: !0
  },
  dropConfig: {
    type: Object,
    default: function() {
      return null;
    }
  },
  separator: Boolean,
  // tiny 新增
  showExpandTabs: Boolean,
  expandTabsTitle: String,
  expandTabsMode: String,
  tooltipConfig: [String, Object],
  optimized: {
    type: Boolean,
    default: !0
  },
  beforeClose: Function,
  overflowTitle: Boolean,
  titleWidth: String,
  // tiny 新增
  moreShowAll: Boolean,
  panelMaxHeight: String,
  panelWidth: String
});
const ft = B({
  name: O + "Tabs",
  props: pN,
  setup: function(e, t) {
    return K({
      props: e,
      context: t,
      template: cN
    });
  }
}), fN = "3.20.0";
ft.model = {
  prop: "modelValue",
  event: "update:modelValue"
};
ft.install = function(o) {
  o.component(ft.name, ft);
};
ft.version = fN;
var mN = function(e) {
  var t = e.emit, n = e.props, r = e.state;
  return function(i) {
    if (!n.disabled) {
      i.stopPropagation(), r.show = !1;
      var a = function() {
        return t("close", i);
      };
      n.beforeDelete ? n.beforeDelete(a) : a();
    }
  };
}, vN = function(e) {
  var t = e.emit, n = e.props, r = e.parent, i = e.state;
  return function(a) {
    n.selectable || n.disabled || (r.$parent && r.$parent.tagSelectable && a.stopPropagation(), i.selected = !i.selected, t("click", a));
  };
}, hN = ["state", "handleClose", "handleClick"], gN = function(e, t, n) {
  var r = t.reactive, i = t.computed, a = n.emit, s = n.parent, l = r({
    type: i(function() {
      return e.theme || e.type;
    }),
    show: !0,
    selected: !1,
    mini: e.mini,
    color: e.color,
    text: e.text,
    maxWidth: e.maxWidth
  }), u = {
    state: l,
    handleClose: mN({
      emit: a,
      props: e,
      state: l
    }),
    handleClick: vN({
      emit: a,
      props: e,
      parent: s,
      state: l
    })
  };
  return u;
};
const AN = B({
  emits: ["click", "close"],
  props: [...Q, "text", "color", "width", "mini", "maxWidth"],
  setup(o, e) {
    return z({ props: o, context: e, renderless: gN, api: hN, h: J });
  }
});
function yN(o, e, t, n, r, i) {
  return A(), w(
    "div",
    {
      class: P(["tiny-mobile-tag", "tiny-mobile-tag-" + o.state.color, o.state.mini ? "tiny-mobile-tag-mini" : null]),
      style: H({ maxWidth: o.state.maxWidth ? `${o.state.maxWidth}px` : null })
    },
    [
      F(o.$slots, "default", {}, () => [
        ue(
          M(o.state.text),
          1
          /* TEXT */
        )
      ])
    ],
    6
    /* CLASS, STYLE */
  );
}
const vo = /* @__PURE__ */ W(AN, [["render", yN]]);
var bN = function(e) {
  var t, n = (typeof process > "u" ? "undefined" : R(process)) === "object" ? (t = process.env) === null || t === void 0 ? void 0 : t.TINY_MODE : null;
  return vo;
}, SN = C(C({}, j), {}, {
  hit: Boolean,
  text: String,
  type: String,
  theme: String,
  size: String,
  color: {
    type: [String, Array],
    default: ""
  },
  closable: Boolean,
  operable: Boolean,
  disabled: Boolean,
  selectable: Boolean,
  onlyIcon: Boolean,
  // 仅图标模式
  customClass: {
    type: String,
    default: ""
  },
  effect: {
    type: String,
    default: "light",
    validator: function(e) {
      return !!~["dark", "light", "plain"].indexOf(e);
    }
  },
  beforeDelete: Function,
  value: [Number, String],
  // mobile
  mini: {
    type: Boolean,
    default: !1
  },
  maxWidth: {
    type: [String, Number],
    default: null
  }
});
const zt = B({
  name: O + "Tag",
  props: SN,
  setup: function(e, t) {
    return K({
      props: e,
      context: t,
      template: bN
    });
  }
});
const wN = "3.20.0";
zt.install = function(o) {
  o.component(zt.name, zt);
};
zt.version = wN;
var TN = function(e) {
  return {
    date: xr(e, "yyyy-MM-dd"),
    time: xr(e, "hh:mm")
  };
}, CN = function(e) {
  var t = e.state, n = e.t;
  return function(r) {
    var i = t.current - r;
    return i > 0 ? n("ui.steps.done") : n(i === 0 ? "ui.steps.doing" : "ui.steps.wait");
  };
}, IN = function(e) {
  var t = e.props;
  return function() {
    var n = t.space;
    return /^\d+$/.test(n) ? "".concat(n, "px") : n;
  };
}, kN = function(e) {
  var t = e.emit, n = e.state;
  return function(r) {
    var i = r.index, a = r.node;
    a.disabled || t("click", n.isReverse ? n.nodes.length - i - 1 : i, a);
  };
}, EN = function(e) {
  var t = e.constants, n = e.state;
  return function(r, i) {
    var a = t.PROCESS_DONE_CLS, s = t.PROCESS_CUR_CLS, l = t.PROCESS_WAIT_CLS, u = t.PROCESS_DISABLED_CLS, c = t.PROCESS_ERROR_CLS, d = {}, p = n.isReverse;
    return i != null && i.disabled ? d[u] = !0 : i != null && i.error ? d[c] = !0 : (d[a] = p ? r > n.current : r < n.current, d[s] = r === n.current, d[l] = p ? r < n.current : r > n.current), d;
  };
}, DN = function(e) {
  var t = e.props, n = e.state;
  return function() {
    return t.data && t.data.length > 0 ? n.isReverse ? t.data.map(function(r, i) {
      return C(C({}, t.data[t.data.length - 1 - i]), {}, {
        _$index: i
      });
    }) : t.data.map(function(r, i) {
      return C(C({}, r), {}, {
        _$index: i
      });
    }) : n.itemsArray;
  };
}, BN = function(e) {
  var t = e.props, n = e.state;
  return function() {
    return n.isReverse ? n.nodes.length - t.active - 1 : t.active;
  };
}, xN = function(e) {
  return function() {
    return e.reverse && e.vertical;
  };
}, PN = function(e) {
  var t = e.state, n = e.props;
  return function() {
    return t.nodes.length >= n.nodeMax && !n.foldDisabled ? (t.showData = !0, t.nodes.slice(0, n.limitedNodes)) : t.nodes;
  };
}, MN = function(e) {
  var t = e.state;
  return function() {
    return t.showAll = !t.showAll, t.showAll;
  };
}, ON = function(e) {
  var t = e.props;
  return function() {
    var n = t.vertical, r = t.reverse, i = t.textPosition, a = t.showDivider, s = [];
    return n ? s.push("tiny-steps-timeline", {
      reverse: r,
      "tiny-timeline__shape-dot": t.shape === "dot"
    }) : s.push("tiny-steps-normal", i === "right" ? "text-right" : "text-bottom"), a && i === "right" && s.push("show-divider"), s;
  };
}, LN = function(e) {
  var t = e.props;
  return function(n) {
    var r = !t.data[n.index].fold;
    return t.data[n.index].fold = r, r;
  };
}, NN = ["state", "handleClick", "getStatusCls", "getStatus", "getDate", "changeStatus", "toggleFold"], FN = function(e, t, n) {
  var r = t.computed, i = t.reactive, a = t.provide;
  t.watch;
  var s = n.t, l = n.emit, u = n.constants, c = {}, d = i({
    // 当标签式使用时，记录有多少个 item 的标签
    itemsArray: [],
    nodes: r(function() {
      return c.computedData();
    }),
    current: r(function() {
      return c.computedCurrent();
    }),
    isReverse: r(function() {
      return c.computedIsReverse();
    }),
    stackNodes: r(function() {
      return d.showAll ? d.nodes : c.computedStackNodes();
    }),
    computedSpace: r(function() {
      return c.computedSpace();
    }),
    showData: !1,
    showAll: !1,
    computedWrapperClass: r(function() {
      return c.computedWrapperClass();
    })
  });
  return Object.assign(c, {
    state: d,
    getDate: TN,
    computedData: DN({
      props: e,
      state: d
    }),
    computedCurrent: BN({
      props: e,
      state: d
    }),
    computedIsReverse: xN(e),
    computedSpace: IN({
      props: e
    }),
    getStatus: CN({
      state: d,
      t: s
    }),
    handleClick: kN({
      emit: l,
      state: d
    }),
    getStatusCls: EN({
      constants: u,
      state: d
    }),
    computedStackNodes: PN({
      state: d,
      props: e
    }),
    changeStatus: MN({
      state: d
    }),
    computedWrapperClass: ON({
      props: e
    }),
    toggleFold: LN({
      props: e
    })
  }), a("nodesInject", {
    state: d,
    props: e
  }), c;
};
const RN = /* @__PURE__ */ B({
  emits: ["click"],
  props: [...Q, "vertical", "horizontal", "showNumber", "nameField", "timeField", "start", "data", "space", "active", "reverse", "showStatus", "showFoldBtn"],
  components: {
    IconYes: Ur()
  },
  setup(o, e) {
    return z({
      props: o,
      context: e,
      renderless: FN,
      api: NN
    });
  }
}), VN = {
  key: 0,
  class: "tiny-mobile-steps-normal"
}, UN = { class: "date-time" }, HN = { class: "time" }, $N = ["onClick"], zN = { key: 0 }, jN = ["custom-title"], WN = { class: "node-description" }, GN = ["textContent"], YN = { class: "status" }, KN = { class: "header" }, QN = {
  key: 0,
  class: "date-time-vertical"
}, XN = { class: "time" }, ZN = { class: "name" }, JN = ["onClick"];
function qN(o, e, t, n, r, i) {
  const a = $("icon-yes");
  return A(), w(
    "div",
    {
      class: P(["tiny-mobile-steps", { "is-horizontal": o.horizontal && !o.vertical }])
    },
    [
      o.vertical ? (A(), w(
        "div",
        {
          key: 1,
          class: P(["tiny-mobile-steps-timeline", { reverse: o.reverse }])
        },
        [
          (A(!0), w(
            q,
            null,
            ae(o.state.nodes, (s, l) => (A(), w("div", {
              key: l,
              class: "timeline"
            }, [
              T("ul", null, [
                T("li", null, [
                  T("div", KN, [
                    s.time ? (A(), w("div", QN, [
                      T(
                        "span",
                        XN,
                        M(o.getDate(s[o.timeField]).date) + " " + M(o.getDate(s[o.timeField]).time),
                        1
                        /* TEXT */
                      )
                    ])) : x("v-if", !0),
                    T(
                      "span",
                      {
                        class: P(["round", `round-${s.state}`])
                      },
                      null,
                      2
                      /* CLASS */
                    ),
                    F(o.$slots, "header", { item: s }, () => [
                      T(
                        "div",
                        ZN,
                        M(s.name),
                        1
                        /* TEXT */
                      )
                    ]),
                    s.showFoldBtn ? (A(), w("div", {
                      key: 1,
                      class: "arrow-btn",
                      onClick: (u) => o.toggleFold(s)
                    }, [
                      T(
                        "div",
                        {
                          class: P(["arrow-btn-arrow", s.fold ? "arrow-btn-arrow-fold" : ""])
                        },
                        null,
                        2
                        /* CLASS */
                      )
                    ], 8, JN)) : x("v-if", !0)
                  ]),
                  s.fold ? x("v-if", !0) : (A(), w(
                    "div",
                    {
                      key: 0,
                      class: P(["content", s.time ? "content-left-margin" : null])
                    },
                    [
                      F(o.$slots, "content", { item: s })
                    ],
                    2
                    /* CLASS */
                  )),
                  o.state.nodes.length > 1 ? (A(), w(
                    "div",
                    {
                      key: 1,
                      class: P(["line", s.time ? "line-left-margin" : null])
                    },
                    null,
                    2
                    /* CLASS */
                  )) : x("v-if", !0)
                ])
              ])
            ]))),
            128
            /* KEYED_FRAGMENT */
          ))
        ],
        2
        /* CLASS */
      )) : (A(), w("div", VN, [
        (A(!0), w(
          q,
          null,
          ae(o.state.nodes, (s, l) => (A(), w(
            "div",
            {
              key: l,
              style: H({
                width: o.horizontal ? o.space ? o.space + "px" : 100 / o.state.nodes.length + "%" : null
              }),
              class: P(["normal", o.getStatusCls(l)])
            },
            [
              F(o.$slots, "top", { slotScope: s }, () => [
                T("div", UN, [
                  T(
                    "span",
                    HN,
                    M(o.getDate(s[o.timeField]).date) + " " + M(o.getDate(s[o.timeField]).time),
                    1
                    /* TEXT */
                  )
                ])
              ]),
              T("div", {
                class: "icon",
                onClick: (u) => o.handleClick({ index: l, node: s })
              }, [
                l >= o.state.current ? (A(), w(
                  "span",
                  zN,
                  M(o.showNumber ? l + o.start : ""),
                  1
                  /* TEXT */
                )) : (A(), w("span", {
                  key: 1,
                  "custom-title": l + o.start,
                  class: "icon-wrap"
                }, [
                  D(a, { class: "tiny-svg-size fixicon" })
                ], 8, jN))
              ], 8, $N),
              T(
                "div",
                {
                  class: P([
                    "line",
                    {
                      "line-done": l < o.state.current,
                      "line-end": l === o.state.nodes.length - 1
                    }
                  ])
                },
                null,
                2
                /* CLASS */
              ),
              T("div", WN, [
                F(o.$slots, "bottom", { item: s }, () => [
                  T("div", {
                    class: "name",
                    textContent: M(s[o.nameField])
                  }, null, 8, GN),
                  T(
                    "div",
                    YN,
                    M(o.showStatus ? o.getStatus(l) : ""),
                    1
                    /* TEXT */
                  )
                ])
              ])
            ],
            6
            /* CLASS, STYLE */
          ))),
          128
          /* KEYED_FRAGMENT */
        ))
      ]))
    ],
    2
    /* CLASS */
  );
}
const ho = /* @__PURE__ */ W(RN, [["render", qN]]);
var _N = function(e) {
  var t, n = (typeof process > "u" ? "undefined" : R(process)) === "object" ? (t = process.env) === null || t === void 0 ? void 0 : t.TINY_MODE : null;
  return ho;
}, vr = {
  PROCESS_DONE_CLS: "process-done",
  PROCESS_CUR_CLS: "process-current",
  PROCESS_WAIT_CLS: "process-wait",
  PROCESS_DISABLED_CLS: "process-disabled",
  PROCESS_ERROR_CLS: "process-error",
  STACK_NODES_MAX: 7,
  LIMITED_STACK_NODES: 3
}, e1 = C(C({}, j), {}, {
  _constants: {
    type: Object,
    default: function() {
      return vr;
    }
  },
  vertical: {
    type: Boolean,
    default: !1
  },
  horizontal: {
    type: Boolean,
    default: !0
  },
  showNumber: {
    type: Boolean,
    default: !0
  },
  nameField: {
    type: String,
    default: "name"
  },
  timeField: {
    type: String,
    default: "time"
  },
  tipsField: {
    type: String,
    default: "tips"
  },
  autoColorField: {
    type: String,
    default: "autoColor"
  },
  showIconField: {
    type: String,
    default: "showIcon"
  },
  start: {
    type: Number,
    default: 1
  },
  data: {
    type: Array,
    default: function() {
      return [];
    }
  },
  space: {
    type: [String, Number],
    default: ""
  },
  active: {
    type: Number,
    default: -1
  },
  reverse: {
    type: Boolean,
    default: !1
  },
  showStatus: {
    type: Boolean,
    default: !1
  },
  subField: {
    type: Boolean,
    default: !1
  },
  foldDisabled: {
    type: Boolean,
    default: !1
  },
  nodeMax: {
    type: [Number, String],
    default: vr.STACK_NODES_MAX
  },
  limitedNodes: {
    type: [Number, String],
    default: vr.LIMITED_STACK_NODES
  },
  onlyNumber: {
    type: Boolean,
    default: !1
  },
  lineWidth: {
    type: [String, Number],
    default: ""
  },
  shape: {
    type: String,
    default: "circle"
  }
});
const jt = B({
  name: O + "TimeLine",
  props: e1,
  setup: function(e, t) {
    return K({
      props: e,
      context: t,
      template: _N
    });
  }
}), t1 = "3.20.0";
jt.install = function(o) {
  o.component(jt.name, jt);
};
jt.version = t1;
var n1 = function(e) {
  return function() {
    e("timeout");
  };
}, o1 = ["state", "timeout"], r1 = function(e, t, n) {
  var r = t.reactive;
  n.vm;
  var i = n.emit, a = r({
    text: e.text,
    type: e.type,
    time: e.time
  }), s = {
    state: a,
    timeout: n1(i)
  };
  return s;
};
const i1 = B({
  components: {
    IconMobileErrorWhite: eu(),
    IconMobileSuccessWhite: tu()
  },
  props: [...Q, "type", "zIndex", "text", "time", "timeout"],
  setup(o, e) {
    return z({ props: o, context: e, renderless: r1, api: o1 });
  }
}), a1 = { class: "tiny-mobile-toast" }, s1 = {
  key: 0,
  class: "tiny-mobile-toast-icon"
}, l1 = { class: "tiny-mobile-toast-text" };
function u1(o, e, t, n, r, i) {
  const a = $("icon-mobile-error-white"), s = $("icon-mobile-success-white");
  return A(), w("div", a1, [
    T(
      "div",
      {
        class: P(["tiny-mobile-toast-content", "tiny-mobile-toast-content-" + o.state.type])
      },
      [
        o.state.type !== "text" ? (A(), w("div", s1, [
          o.state.type === "error" ? (A(), G(a, { key: 0 })) : x("v-if", !0),
          o.state.type === "correct" ? (A(), G(s, { key: 1 })) : x("v-if", !0)
        ])) : x("v-if", !0),
        T(
          "div",
          l1,
          M(o.state.text),
          1
          /* TEXT */
        )
      ],
      2
      /* CLASS */
    )
  ]);
}
const c1 = /* @__PURE__ */ W(i1, [["render", u1]]);
var d1 = function(e) {
  var t;
  return (typeof process > "u" ? "undefined" : R(process)) === "object" && ((t = process.env) === null || t === void 0 || t.TINY_MODE), c1;
}, p1 = C(C({}, j), {}, {
  type: {
    type: String,
    validator: function(e) {
      return !!~["text", "correct", "error"].indexOf(e);
    }
  },
  zIndex: {
    type: Number,
    default: 100
  },
  text: {
    type: String,
    default: "text"
  },
  time: {
    type: [String, Number],
    default: 2e3
  },
  timeout: {
    type: Function,
    default: null
  }
});
const f1 = B({
  name: O + "Toast",
  emits: ["timeout"],
  props: p1,
  setup: function(e, t) {
    return K({
      props: e,
      context: t,
      template: d1
    });
  }
});
var m1 = {
  type: "text"
};
const v1 = function() {
  var o = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  o = C(C({}, m1), o);
  var e = document.body, t = vn({
    component: f1,
    propsData: {},
    el: document.createElement("div")
  });
  for (var n in o)
    Object.prototype.hasOwnProperty.call(o, n) && (t.state[n] = o[n]);
  return e.appendChild(t.$el), setTimeout(function() {
    t.state.timeout && t.state.timeout(), e.removeChild(t.$el);
  }, t.state.time), t;
}, h1 = "3.20.0";
var Rr = {
  install: function() {
  },
  service: v1,
  version: h1
}, g1 = function(e) {
  var t = e.state, n = e.props;
  return function() {
    return {
      fill: t.color,
      color: t.color,
      backgroundColor: t.backgroundColor,
      backgroundImage: /^(image)$/.test(n.type) && t.internalValue ? "url(".concat(t.internalValue, ")") : "none"
    };
  };
}, A1 = function(e) {
  var t = e.props;
  return function() {
    var n = "", r = Math.floor(t.messageTotal || NaN);
    return t.messageType === "details" && !isNaN(r) && r > 0 && (n = String(r), t.messageUpperLimit && r > t.messageUpperLimit && (n = "".concat(t.messageUpperLimit, "+"))), n;
  };
}, y1 = function(e) {
  var t = e.props, n = e.state, r = e.mode;
  return function() {
    var i = "";
    if (t.type === "label" && n.label && !t.min) {
      var a = n.label.length, s = {
        1: "40px",
        2: "30px",
        3: "22px",
        4: "20px",
        5: "18px",
        6: "16px"
      }, l = {
        1: "".concat(n.size / 2, "px"),
        2: "".concat(n.size / 3, "px"),
        3: "".concat(n.size / 4.5, "px"),
        4: "".concat(n.size / 6, "px"),
        5: "".concat(n.size / 7.5, "px"),
        6: "".concat(n.size / 9, "px")
      };
      r === "mobile-first" ? i = l[a] : i = s[a];
    }
    return {
      fontSize: i
    };
  };
}, b1 = function(e) {
  var t = e.state, n = e.props;
  return function() {
    return n.min ? t.internalValue.substr(0, 2) : t.internalValue.substr(0, 6);
  };
}, S1 = function(e) {
  var t = e.props;
  return function() {
    if (t.modelValue === null) {
      var n = "";
      return t.type === "icon" ? n = "icon-user" : t.type === "label" && (n = "U"), n || t.value;
    } else
      return t.modelValue;
  };
}, w1 = function(e) {
  return function(t) {
    return e("click", t);
  };
}, T1 = function(e) {
  return function(t) {
    return e("mouseenter", t);
  };
}, C1 = ["state", "handleClick", "mouseEnter"], I1 = function(e, t, n) {
  var r = t.reactive, i = t.computed, a = t.inject, s = n.mode, l = n.emit, u = a("groupSize", null), c = r({
    internalValue: i(function() {
      return d.getInternalValue();
    }),
    label: i(function() {
      return d.computedLabel();
    }),
    style: i(function() {
      return d.computedStyle();
    }),
    message: i(function() {
      return d.computedMessage();
    }),
    fontSize: i(function() {
      return d.computedFontSize();
    }),
    size: u || e.size,
    color: a("color", null) || e.color,
    backgroundColor: a("backgroundColor", null) || e.backgroundColor
  }), d = {
    state: c,
    computedLabel: b1({
      state: c,
      props: e
    }),
    computedStyle: g1({
      state: c,
      props: e
    }),
    computedMessage: A1({
      props: e
    }),
    computedFontSize: y1({
      props: e,
      state: c,
      mode: s
    }),
    getInternalValue: S1({
      props: e
    }),
    handleClick: w1(l),
    mouseEnter: T1(l)
  };
  return d;
};
const k1 = B({
  components: {
    IconUser: nu()
  },
  props: [
    ...Q,
    "min",
    "round",
    "color",
    "backgroundColor",
    "type",
    "modelValue",
    "messageTotal",
    "messageType",
    "messageUpperLimit",
    "size"
  ],
  setup(o, e) {
    return z({ props: o, context: e, renderless: I1, api: C1 });
  }
}), E1 = { class: "tiny-mobile-user-head" }, D1 = ["title"];
function B1(o, e, t, n, r, i) {
  return A(), w("div", E1, [
    T(
      "div",
      {
        style: H({ ...o.state.style, width: `${o.state.size}px`, height: `${o.state.size}px` }),
        class: P(["tiny-mobile-user-head__portrait", { min: o.min, round: o.round }, o.type])
      },
      [
        F(o.$slots, "default", {}, () => [
          o.type === "icon" ? (A(), G(pe(o.state.internalValue), {
            key: 0,
            class: "tiny-mobile-svg-size"
          })) : x("v-if", !0),
          o.type === "label" ? (A(), w("span", {
            key: 1,
            style: H({ fontSize: `${o.state.size * 0.3}px` }),
            title: o.state.internalValue
          }, M(o.state.label), 13, D1)) : x("v-if", !0)
        ])
      ],
      6
      /* CLASS, STYLE */
    ),
    o.messageTotal ? (A(), w(
      "div",
      {
        key: 0,
        style: H({ left: `${o.state.size * 0.9}px` }),
        class: P([
          "tiny-mobile-user-head__message",
          { min: o.min, round: o.round, basic: o.messageType === "basic" || o.messageType === "icon" }
        ])
      },
      M(o.state.message),
      7
      /* TEXT, CLASS, STYLE */
    )) : x("v-if", !0)
  ]);
}
const go = /* @__PURE__ */ W(k1, [["render", B1]]);
var x1 = function(e) {
  var t, n = (typeof process > "u" ? "undefined" : R(process)) === "object" ? (t = process.env) === null || t === void 0 ? void 0 : t.TINY_MODE : null;
  return go;
}, P1 = {
  ITEM_NAME: ".user-head-item"
}, M1 = C(C({}, j), {}, {
  _constants: {
    type: Object,
    default: function() {
      return P1;
    }
  },
  /**
   * @property {Boolean} [min=false] - 小尺寸模式
   */
  min: Boolean,
  /**
   * @property {Boolean} [round=true] - 圆形模式
   */
  round: Boolean,
  /**
   * @property {String} [color=#ffffff] - 文字颜色
   */
  color: {
    type: String,
    default: "#ffffff"
  },
  /**
   * @property {String} [backgroundColor=#BBBBBB] - 背景色
   */
  backgroundColor: {
    type: String,
    default: "#B5BBC1"
  },
  /**
   * @property {String} [type=label] - 头像类型，icon|image|label 可选
   */
  type: {
    type: String,
    default: "label",
    validator: function(e) {
      return !!~["icon", "image", "label"].indexOf(e);
    }
  },
  /**
   * @property {String} - 头像资源
   * type=icon 时为图标类名，type=label时为字体串，type=image时为资源路径
   */
  value: {
    type: [Object, String],
    default: null
  },
  /**
   * @property {String} - 头像资源
   * type=icon 时为图标类名，type=label时为字体串，type=image时为资源路径
   */
  modelValue: {
    type: [Object, String],
    default: null
  },
  /**
   * @property {Number} - 消息计数
   */
  messageTotal: Number,
  /**
   * @property {String} [messageType=details] - 消息类型 details|basic 可选
   */
  messageType: {
    type: String,
    default: "details",
    validator: function(e) {
      return !!~["details", "basic"].indexOf(e);
    }
  },
  /**
   * @property {Number} [messageUpperLimit=0] - 消息显示上限
   */
  messageUpperLimit: {
    type: Number,
    default: 0
  },
  size: {
    type: Number,
    default: 40
  }
});
const mt = B({
  name: O + "UserHead",
  props: M1,
  setup: function(e, t) {
    return K({
      props: e,
      context: t,
      template: x1
    });
  }
}), O1 = "3.20.0";
mt.model = {
  prop: "modelValue",
  event: "update:modelValue"
};
mt.install = function(o) {
  o.component(mt.name, mt);
};
mt.version = O1;
var L1 = [Fe, kt, Et, Xe, ye, Re, Ze, Je, Dt, et, Bt, tt, xt, Pt, Lt, Nt, nt, Ft, Be, Rt, Vt, Fr, ot, _e, ce, it, rt, Ut, at, qe, xe, Ve, st, lt, ut, ct, dt, pt, Ht, $t, ft, zt, jt, Rr, Ue, mt, He], N1 = function(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = new RegExp("^" + O);
  L1.forEach(function(r) {
    var i = r.name, a = t.alias || t.prefix;
    typeof r.install == "function" && (i && a ? e.component(i.replace(n, a), r) : r.install(e));
  });
}, H1 = "3.20.0";
const $1 = {
  ActionSheet: Fe,
  TinyActionSheet: Fe,
  Alert: kt,
  TinyAlert: kt,
  Avatar: Et,
  TinyAvatar: Et,
  Badge: Xe,
  TinyBadge: Xe,
  Button: ye,
  TinyButton: ye,
  Checkbox: Re,
  TinyCheckbox: Re,
  CheckboxGroup: Ze,
  TinyCheckboxGroup: Ze,
  ColorPicker: Je,
  TinyColorPicker: Je,
  Container: Dt,
  TinyContainer: Dt,
  DatePicker: et,
  TinyDatePicker: et,
  DialogBox: Bt,
  TinyDialogBox: Bt,
  DropdownItem: tt,
  TinyDropdownItem: tt,
  DropdownMenu: xt,
  TinyDropdownMenu: xt,
  Exception: Pt,
  TinyException: Pt,
  FileUpload: Lt,
  TinyFileUpload: Lt,
  Form: Nt,
  TinyForm: Nt,
  ImageViewer: nt,
  TinyImageViewer: nt,
  IndexBar: Ft,
  TinyIndexBar: Ft,
  Input: Be,
  TinyInput: Be,
  Label: Rt,
  TinyLabel: Rt,
  List: Vt,
  TinyList: Vt,
  Loading: Fr,
  TinyLoading: Fr,
  Mask: ot,
  TinyMask: ot,
  MiniPicker: _e,
  TinyMiniPicker: _e,
  Modal: ce,
  TinyModal: ce,
  MultiSelect: it,
  TinyMultiSelect: it,
  MultiSelectItem: rt,
  TinyMultiSelectItem: rt,
  NavBar: Ut,
  TinyNavBar: Ut,
  Numeric: at,
  TinyNumeric: at,
  PickerColumn: qe,
  TinyPickerColumn: qe,
  Popover: xe,
  TinyPopover: xe,
  Progress: Ve,
  TinyProgress: Ve,
  PullRefresh: st,
  TinyPullRefresh: st,
  Radio: lt,
  TinyRadio: lt,
  Search: ut,
  TinySearch: ut,
  Slider: ct,
  TinySlider: ct,
  Switch: dt,
  TinySwitch: dt,
  Tabbar: pt,
  TinyTabbar: pt,
  TabbarItem: Ht,
  TinyTabbarItem: Ht,
  Table: $t,
  TinyTable: $t,
  Tabs: ft,
  TinyTabs: ft,
  Tag: zt,
  TinyTag: zt,
  TimeLine: jt,
  TinyTimeLine: jt,
  Toast: Rr,
  TinyToast: Rr,
  UploadList: Ue,
  TinyUploadList: Ue,
  UserHead: mt,
  TinyUserHead: mt,
  Wheel: He,
  TinyWheel: He,
  install: N1
};
export {
  Fe as ActionSheet,
  kt as Alert,
  Et as Avatar,
  Xe as Badge,
  ye as Button,
  Re as Checkbox,
  Ze as CheckboxGroup,
  Je as ColorPicker,
  Dt as Container,
  et as DatePicker,
  Bt as DialogBox,
  tt as DropdownItem,
  xt as DropdownMenu,
  Pt as Exception,
  Lt as FileUpload,
  Nt as Form,
  nt as ImageViewer,
  Ft as IndexBar,
  Be as Input,
  Rt as Label,
  Vt as List,
  Fr as Loading,
  ot as Mask,
  _e as MiniPicker,
  ce as Modal,
  it as MultiSelect,
  rt as MultiSelectItem,
  Ut as NavBar,
  at as Numeric,
  qe as PickerColumn,
  xe as Popover,
  Ve as Progress,
  st as PullRefresh,
  lt as Radio,
  ut as Search,
  ct as Slider,
  dt as Switch,
  pt as Tabbar,
  Ht as TabbarItem,
  $t as Table,
  ft as Tabs,
  zt as Tag,
  jt as TimeLine,
  Fe as TinyActionSheet,
  kt as TinyAlert,
  Et as TinyAvatar,
  Xe as TinyBadge,
  ye as TinyButton,
  Re as TinyCheckbox,
  Ze as TinyCheckboxGroup,
  Je as TinyColorPicker,
  Dt as TinyContainer,
  et as TinyDatePicker,
  Bt as TinyDialogBox,
  tt as TinyDropdownItem,
  xt as TinyDropdownMenu,
  Pt as TinyException,
  Lt as TinyFileUpload,
  Nt as TinyForm,
  nt as TinyImageViewer,
  Ft as TinyIndexBar,
  Be as TinyInput,
  Rt as TinyLabel,
  Vt as TinyList,
  Fr as TinyLoading,
  ot as TinyMask,
  _e as TinyMiniPicker,
  ce as TinyModal,
  it as TinyMultiSelect,
  rt as TinyMultiSelectItem,
  Ut as TinyNavBar,
  at as TinyNumeric,
  qe as TinyPickerColumn,
  xe as TinyPopover,
  Ve as TinyProgress,
  st as TinyPullRefresh,
  lt as TinyRadio,
  ut as TinySearch,
  ct as TinySlider,
  dt as TinySwitch,
  pt as TinyTabbar,
  Ht as TinyTabbarItem,
  $t as TinyTable,
  ft as TinyTabs,
  zt as TinyTag,
  jt as TinyTimeLine,
  Rr as TinyToast,
  Ue as TinyUploadList,
  mt as TinyUserHead,
  He as TinyWheel,
  Rr as Toast,
  Ue as UploadList,
  mt as UserHead,
  He as Wheel,
  $1 as default,
  N1 as install,
  H1 as version
};
