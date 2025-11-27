import { defineComponent as ie, $prefix as ae, $props as se, setup as Ce, createComponent as le, h as A, deduplicateCssClass as Ke, stringifyCssClass as ze, hooks as ee, parseVnode as Be, isEmptyVnode as ke, mergeClass as ce, $setup as We } from "@opentiny/vue-common";
import { withDirectives as Ne, createVNode as W, vShow as Ae } from "vue";
function de(o, t) {
  (t == null || t > o.length) && (t = o.length);
  for (var e = 0, r = Array(t); e < t; e++)
    r[e] = o[e];
  return r;
}
function $e(o, t) {
  if (!(o instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function me(o, t) {
  for (var e = 0; e < t.length; e++) {
    var r = t[e];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(o, Te(r.key), r);
  }
}
function Je(o, t, e) {
  return t && me(o.prototype, t), e && me(o, e), Object.defineProperty(o, "prototype", {
    writable: !1
  }), o;
}
function Ze(o, t) {
  var e = typeof Symbol < "u" && o[Symbol.iterator] || o["@@iterator"];
  if (!e) {
    if (Array.isArray(o) || (e = Xe(o)) || t && o && typeof o.length == "number") {
      e && (o = e);
      var r = 0, n = function() {
      };
      return {
        s: n,
        n: function() {
          return r >= o.length ? {
            done: !0
          } : {
            done: !1,
            value: o[r++]
          };
        },
        e: function(l) {
          throw l;
        },
        f: n
      };
    }
    throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  var a, i = !0, s = !1;
  return {
    s: function() {
      e = e.call(o);
    },
    n: function() {
      var l = e.next();
      return i = l.done, l;
    },
    e: function(l) {
      s = !0, a = l;
    },
    f: function() {
      try {
        i || e.return == null || e.return();
      } finally {
        if (s)
          throw a;
      }
    }
  };
}
function Qe(o, t, e) {
  return (t = Te(t)) in o ? Object.defineProperty(o, t, {
    value: e,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : o[t] = e, o;
}
function he(o, t) {
  var e = Object.keys(o);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(o);
    t && (r = r.filter(function(n) {
      return Object.getOwnPropertyDescriptor(o, n).enumerable;
    })), e.push.apply(e, r);
  }
  return e;
}
function M(o) {
  for (var t = 1; t < arguments.length; t++) {
    var e = arguments[t] != null ? arguments[t] : {};
    t % 2 ? he(Object(e), !0).forEach(function(r) {
      Qe(o, r, e[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(e)) : he(Object(e)).forEach(function(r) {
      Object.defineProperty(o, r, Object.getOwnPropertyDescriptor(e, r));
    });
  }
  return o;
}
function qe(o, t) {
  if (typeof o != "object" || !o)
    return o;
  var e = o[Symbol.toPrimitive];
  if (e !== void 0) {
    var r = e.call(o, t || "default");
    if (typeof r != "object")
      return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(o);
}
function Te(o) {
  var t = qe(o, "string");
  return typeof t == "symbol" ? t : t + "";
}
function te(o) {
  "@babel/helpers - typeof";
  return te = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, te(o);
}
function Xe(o, t) {
  if (o) {
    if (typeof o == "string")
      return de(o, t);
    var e = {}.toString.call(o).slice(8, -1);
    return e === "Object" && o.constructor && (e = o.constructor.name), e === "Map" || e === "Set" ? Array.from(o) : e === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e) ? de(o, t) : void 0;
  }
}
function ve(o, t, e, r) {
  var n, a = 0;
  typeof t != "boolean" && (r = e, e = t, t = void 0);
  function i() {
    var l = this, u = (/* @__PURE__ */ new Date()).valueOf() - a, c = arguments;
    function f() {
      a = (/* @__PURE__ */ new Date()).valueOf(), e.apply(l, c);
    }
    function d() {
      n = void 0;
    }
    r && !n && f(), n && clearTimeout(n);
    var p = r === void 0;
    p && u > o ? f() : t !== !0 && (n = setTimeout(r ? d : f, p ? o - u : o));
  }
  function s() {
    n && (clearTimeout(n), n = null);
  }
  return i._cancel = s, i;
}
function Ye(o, t, e) {
  return e === void 0 ? ve(o, t, !1) : ve(o, e, t !== !1);
}
var Ge = Object.prototype.toString, et = Object.prototype.hasOwnProperty, tt = et.toString;
tt.call(Object);
var rt = {
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
}, ot = function(t) {
  return t == null;
}, nt = function(t) {
  return ot(t) ? String(t) : rt[Ge.call(t)] || "object";
}, it = {
  viewportWindow: null
  // 获取真实视口的window，解决在微前端中某些bug
};
const at = it;
var Me = typeof window > "u", E = function(t, e, r) {
  var n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  t && e && r && t.addEventListener(e, r, n);
}, B = function(t, e, r) {
  var n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  t && e && t.removeEventListener(e, r, n);
}, j = function(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
  if (t) {
    var r = e.split(" ").filter(function(n) {
      return n;
    });
    r.forEach(function(n) {
      return t.classList.add(n);
    });
  }
}, V = function(t, e) {
  if (!(!t || !e)) {
    var r = e.split(" ").filter(function(n) {
      return n;
    });
    r.forEach(function(n) {
      return t.classList.remove(n);
    });
  }
}, pe = function(t) {
  if (Me)
    return !1;
  if (t) {
    var e = getComputedStyle(t);
    if (e.getPropertyValue("position") === "fixed") {
      if (e.getPropertyValue("display") === "none")
        return !0;
      if (t.parentNode !== document.body)
        return pe(t.parentNode);
    } else
      return t.offsetParent === null;
  }
  return !1;
}, st = function(t) {
  var e = t.api, r = t.state, n = t.props;
  return function(a) {
    var i = 200, s = a && a.type === "mouseenter" ? i : 0;
    if (n.visible === "auto") {
      var l = r.referenceElm, u = l.clientWidth, c = l.scrollWidth;
      if (c <= u)
        return;
    }
    e.setExpectedState(!0), e.handleShowPopper(s);
  };
}, lt = function(t) {
  return function() {
    t.setExpectedState(!1), t.debounceClose();
  };
}, pt = function(t) {
  var e = t.api, r = t.state;
  return function() {
    r.focusing = !0, e.show();
  };
}, ut = function(t) {
  var e = t.api, r = t.state;
  return function() {
    r.focusing = !1, e.hide();
  };
}, ft = function(t) {
  var e = t.api, r = t.state;
  return function() {
    r.focusing = !1, e.show();
  };
}, ct = function(t) {
  var e = t.props, r = t.state;
  return function(n) {
    !r.expectedState || e.manual || (clearTimeout(r.timeout), r.timeout = window.setTimeout(function() {
      r.showPopper = !0;
    }, e.openDelay || n), e.hideAfter > 0 && (r.timeoutPending = window.setTimeout(function() {
      r.showPopper = !1;
    }, e.hideAfter)));
  };
}, dt = function(t) {
  var e = t.api, r = t.props, n = t.state;
  return function() {
    r.enterable && n.expectedState || r.manual || (clearTimeout(n.timeout), n.timeoutPending && clearTimeout(n.timeoutPending), n.showPopper = !1, r.disabled && e.doDestroy());
  };
}, mt = function(t) {
  var e = t.props, r = t.api, n = t.state, a = t.popperVmRef;
  return function(i) {
    if (!e.manual) {
      var s = n.referenceElm, l = a.popper;
      !l || !s || l.contains(i.target) || s.contains(i.target) || n.showPopper && (r.setExpectedState(!1), r.debounceClose());
    }
  };
}, ht = function(t) {
  var e = t.state;
  return function(r) {
    e.expectedState === !1 && clearTimeout(e.timeoutPending), e.expectedState = r;
  };
}, vt = function(t) {
  var e = t.state, r = t.api, n = t.vm;
  return function() {
    var a = e.referenceElm;
    e.showPopper = !1, a && a.nodeType === 1 && (B(document, "click", r.handleDocumentClick), B(a, "mouseenter", r.show), B(a, "mouseleave", r.hide), B(a, "focus", r.focusHandler), B(a, "blur", r.handleBlur), B(a, "click", r.removeFocusing)), n.popperVM && (typeof n.popperVM.$destroy == "function" && n.popperVM.$destroy(), n.popperVM = null);
  };
}, bt = function(t) {
  var e = t.api, r = t.props;
  return Ye(r.closeDelay, function() {
    e.handleClosePopper();
  });
}, yt = function(t) {
  return function(e) {
    e ? j(t.referenceElm, "focusing") : V(t.referenceElm, "focusing");
  };
}, gt = function(t) {
  var e = t.slots, r = t.api;
  return function() {
    if (!e.default || !e.default().length) {
      r.handleFocus();
      return;
    }
    var n = e.default()[0];
    n = n.elm || n.el, n && n.focus ? n.focus() : r.handleFocus();
  };
}, wt = function(t) {
  var e = t.api, r = t.state, n = t.vm;
  return function(a) {
    var i = null;
    n.$el.nodeType === 8 ? i = a : n.$el.nodeType === 1 && (i = n.$el), !(!i || i.nodeType === 8 || r.referenceElm) && (r.referenceElm = i, i.setAttribute("aria-describedby", r.tooltipId), i.setAttribute("tabindex", r.tabindex.toString()), E(document, "click", e.handleDocumentClick), E(i, "mouseenter", e.show), E(i, "mouseleave", e.hide), E(i, "focus", e.focusHandler), E(i, "blur", e.handleBlur), E(i, "click", e.removeFocusing));
  };
}, xt = function(t) {
  var e = t.state, r = t.popperVmRef;
  return function(n) {
    var a = Ze(n), i;
    try {
      for (a.s(); !(i = a.n()).done; ) {
        var s = i.value;
        s.type === "attributes" && s.attributeName === "x-placement" && (e.xPlacement = r.popper.getAttribute("x-placement") || "bottom");
      }
    } catch (l) {
      a.e(l);
    } finally {
      a.f();
    }
  };
}, St = function(t) {
  var e = t.vm, r = t.nextTick, n = t.popperVmRef;
  return function(a) {
    r(function() {
      return e.bindEvent(a);
    });
    var i = e.popperVM;
    e.$refs.popper ? n.popper = e.$refs.popper : n.popper = i.$el, r(function() {
      e.modelValue && e.updatePopper();
    });
  };
}, Et = {
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
}, ue = typeof window > "u", I = {}, D = {
  leave: "v-modal-leave",
  enter: "v-modal-enter",
  modal: "v-modal"
}, Pt = function(t, e) {
  for (var r = t.length - 1; r >= 0; r--)
    if (t[r].id === e) {
      t.splice(r, 1);
      break;
    }
}, re, w = {
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
    var t = window.innerWidth - document.documentElement.clientWidth;
    t && (this.oldBodyBorder = document.documentElement.style.borderRight, document.body.style.borderRight = "".concat(t, "px solid transparent"));
  },
  resetBodyBorder: function() {
    document.body.style.borderRight = this.oldBodyBorder, this.oldBodyBorder = "";
  },
  /** 全局反注册 */
  deregister: function(t) {
    t && (I[t] = null, delete I[t]);
  },
  /** 返回全局实例 */
  getInstance: function(t) {
    return I[t];
  },
  /** 全局注册   仅vue-popup.ts中使用，instance就是vm, 把vm注册到 vm._popupId 这个键值上 */
  register: function(t, e) {
    t && e && (I[t] = e);
  },
  nextZIndex: function() {
    var t = w.zIndex;
    return w.zIndex += w.step, t;
  },
  /** 打开遮罩层， 仅vue-popup.ts中使用。 dom = vm.$el 或者 undefined (appendtoBody时)  */
  openModal: function(t, e, r, n, a) {
    if (!ue && !(!t || e === void 0)) {
      this.modalFade = a;
      for (var i = 0, s = this.modalStack.length; i < s; i++) {
        var l = this.modalStack[i];
        if (l.id === t)
          return;
      }
      var u = re();
      if (j(u, D.modal), this.modalFade && !w.hasModal && j(u, D.enter), n) {
        var c = n.trim().split(/\s+/);
        c.forEach(function(d) {
          return j(u, d);
        });
      }
      setTimeout(function() {
        V(u, D.enter);
      }, 200), e && (u.style.zIndex = e.toString()), u.style.display = "", u.tabIndex = 0;
      var f;
      r && r.parentNode && r.parentNode.nodeType !== 11 ? f = r.parentNode : f = document.body, f.appendChild(u), this.modalStack.push({
        id: t,
        zIndex: e,
        modalClass: n
      });
    }
  },
  /** 点击背景遮罩层时，调用栈顶的popup，调用它的close() */
  doOnModalClick: function() {
    var t = w.modalStack, e = t[t.length - 1];
    if (e) {
      var r = w.getInstance(e.id);
      r && r.closeOnClickModal && typeof r.close == "function" && r.close();
    }
  },
  closeModal: function(t) {
    var e = this.modalStack, r = re();
    if (e.length > 0) {
      var n = e[e.length - 1];
      if (n.id === t) {
        if (n.modalClass) {
          var a = n.modalClass.trim().split(/\s+/);
          a.forEach(function(s) {
            return V(r, s);
          });
        }
        e.pop();
        var i = e.length;
        i > 0 && (r.style.zIndex = e[i - 1].zIndex.toString());
      } else
        Pt(e, t);
    }
    e.length === 0 && (this.modalFade && j(r, D.leave), V(document.body, this.popLockClass), this.resetBodyBorder(), setTimeout(function() {
      e.length === 0 && (r.parentNode && r.parentNode.removeChild(r), r.style.display = "none", w.modalDom = null), V(r, D.leave);
    }, 200));
  }
};
re = function() {
  if (ue)
    return null;
  var t = w.modalDom;
  return t ? w.hasModal = !0 : (w.hasModal = !1, t = document.createElement("div"), w.modalDom = t, t.addEventListener("touchmove", function(e) {
    e.preventDefault(), e.stopPropagation();
  }, {
    passive: !0
  }), E(t, "click", function() {
    w.doOnModalClick();
  })), t;
};
ue || E(window, "keydown", function(o) {
  if (o.keyCode === Et.Escape) {
    var t = w.modalStack;
    if (t.length > 0) {
      var e = t[t.length - 1];
      if (!e)
        return;
      var r = w.getInstance(e.id);
      r && r.closeOnPressEscape && (r.handleClose ? r.handleClose("esc") : r.handleAction ? r.handleAction("cancel") : r.close());
    }
  }
});
const U = w;
var _t = ["left", "right", "top", "bottom"], De = ["shift", "offset", "preventOverflow", "keepTogether", "arrow", "flip", "applyStyle"], Ot = {
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
  preventOverflowOrder: _t,
  modifiers: De,
  // 此处是string数组， 构造函数调用之后转为函数数组
  updateHiddenPopperOnScroll: !1
  // 滚动过程中是否更新隐藏的弹出层位置
}, K = function(t, e) {
  var r = function(a) {
    return a !== "" && !isNaN(parseFloat(a)) && isFinite(a);
  };
  Object.keys(e).forEach(function(n) {
    var a = "";
    ~["width", "height", "top", "right", "bottom", "left"].indexOf(n) && r(e[n]) && (a = "px"), t.style[n] = e[n] + a;
  });
}, Q = function(t) {
  var e = t.offsetParent;
  return e === window.document.body || !e ? window.document.documentElement : e;
}, R = function(t, e) {
  if (!(!t || t.nodeType !== 1)) {
    var r = window.getComputedStyle(t, null);
    return r[e];
  }
}, Fe = function(t) {
  return t === window.document.body ? !1 : R(t, "position") === "fixed" ? !0 : t.parentNode ? Fe(t.parentNode) : !1;
}, oe = function(t) {
  var e = t.getBoundingClientRect();
  return {
    left: e.left,
    top: e.top,
    right: e.right,
    bottom: e.bottom,
    width: e.right - e.left,
    height: e.bottom - e.top
  };
}, je = function(t) {
  var e = ["scroll", "auto"];
  return e.includes(R(t, "overflow")) || e.includes(R(t, "overflow-x")) || e.includes(R(t, "overflow-y"));
}, Ct = function(t) {
  var e = document.createElement("div");
  K(e, {
    opacity: 0,
    position: "fixed",
    width: 1,
    height: 1,
    top: 0,
    left: 0,
    "z-index": "-99"
  }), t.appendChild(e);
  var r = oe(e);
  return t.removeChild(e), r;
}, z = function(t) {
  var e = t.parentNode;
  return e ? e === window.document ? window.document.body.scrollTop || window.document.body.scrollLeft ? window.document.body : window.document.documentElement : je(e) ? e : z(e) : t;
}, Bt = function(t, e, r, n) {
  var a = oe(t), i = a.top, s = a.left, l = a.width, u = a.height;
  if (r) {
    if (n.parentElement) {
      var c = Ct(n.parentElement), f = c.top, d = c.left;
      i -= f, s -= d;
    }
    return {
      top: i,
      left: s,
      bottom: i + u,
      right: s + l,
      width: l,
      height: u
    };
  }
  var p = oe(e), v = {
    top: i - p.top,
    left: s - p.left,
    bottom: i - p.top + u,
    right: s - p.left + l,
    width: l,
    height: u
  };
  return v;
}, kt = function(t) {
  return t === document.body ? Math.max(document.documentElement.scrollTop, document.body.scrollTop) : t.scrollTop;
}, Nt = function(t) {
  return t === document.body ? Math.max(document.documentElement.scrollLeft, document.body.scrollLeft) : t.scrollLeft;
}, At = function(t, e) {
  var r = Math.max(t.scrollHeight, t.offsetHeight, e.clientHeight, e.scrollHeight, e.offsetHeight), n = Math.max(t.scrollWidth, t.offsetWidth, e.clientWidth, e.scrollWidth, e.offsetWidth);
  return {
    width: n,
    height: r
  };
}, q = function(t) {
  var e = t.style.display, r = t.style.visibility;
  t.style.display = "block", t.style.visibility = "hidden";
  var n = window.getComputedStyle(t), a = parseFloat(n.marginTop) + parseFloat(n.marginBottom), i = parseFloat(n.marginLeft) + parseFloat(n.marginRight), s = {
    width: t.offsetWidth + i,
    height: t.offsetHeight + a
  };
  return t.style.display = e, t.style.visibility = r, s;
}, be = function(t) {
  var e = {
    left: "right",
    right: "left",
    bottom: "top",
    top: "bottom"
  };
  return t.replace(/left|right|bottom|top/g, function(r) {
    return e[r];
  });
}, F = function(t) {
  var e = M({}, t);
  return e.right = e.left + e.width, e.bottom = e.top + e.height, e;
}, Ve = function(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], r = t.parentNode;
  return r ? (je(r) && e.push(r), R(r, "position") === "fixed" ? e : Ve(r, e)) : e;
}, ye = function(t) {
  var e = {
    width: t.offsetWidth,
    height: t.offsetHeight,
    left: t.offsetLeft,
    top: t.offsetTop,
    right: 0,
    bottom: 0
  };
  return e.right = e.left + e.width, e.bottom = e.top + e.height, e;
}, ge = function(t) {
  t.stopPropagation();
}, ne;
Me || (ne = new ResizeObserver(function(o) {
  o.forEach(function(t) {
    t.target.popperVm && t.contentRect.height > 50 && t.target.popperVm.update();
  });
}));
var Tt = /* @__PURE__ */ function() {
  function o(t, e, r) {
    var n = this;
    $e(this, o), this.modifiers = {}, this.popperOuterSize = null, this._reference = t, this._popper = e, this.state = {}, this._options = M(M({}, Ot), r), this._options.modifierFns = De.map(function(a) {
      return n[a];
    }), this._popper.setAttribute("x-placement", this._options.placement), this.state.position = this._getPopperPositionByRefernce(this._reference), K(this._popper, {
      position: this.state.position,
      top: 0
    }), this._popper && (this._popper.popperVm = this, ne && ne.observe(this._popper)), this.update(), this._setupEventListeners();
  }
  return Je(o, [{
    key: "destroy",
    value: function() {
      return this._popper.removeAttribute("x-placement"), this._popper.style.display = "none", this._removeEventListeners(), this._options.removeOnDestroy && this._popper.remove(), this;
    }
  }, {
    key: "onUpdate",
    value: function(e) {
      return this.state.updateCallback = e, this;
    }
  }, {
    key: "update",
    value: function() {
      var e = {
        instance: this,
        styles: {}
      };
      this.stopEventBubble(), this.popperOuterSize = null, e.placement = e._originalPlacement = this._options.placement, e.offsets = this._getRefPopOffsets(this._popper, this._reference, e.placement), e.boundaries = this._getBoundaries(e, this._options.boundariesPadding, this._options.boundariesElement), e = this.runModifiers(e, this._options.modifierFns), typeof this.state.updateCallback == "function" && this.state.updateCallback(e);
    }
    // 阻止popper的mousewheel等事件冒泡。 通过 onxxx 绑定，是为了避免重复绑定事件
  }, {
    key: "stopEventBubble",
    value: function() {
      this._popper && (this._popper.onmousewheel || (this._popper.onmousewheel = ge), this._popper.onwheel || (this._popper.onwheel = ge));
    }
    /** 按顺序执行Modifiers， 如果传入终点modifier,则执行到指定位置 */
  }, {
    key: "runModifiers",
    value: function(e, r, n) {
      var a = this, i = r.slice(), s = this._options;
      return n !== void 0 && (i = this._options.modifierFns.slice(0, s.modifierFns.findIndex(function(l) {
        return l === n;
      }))), i.forEach(function(l) {
        nt(l) === "function" && (e = l.call(a, e));
      }), e;
    }
    // 此时才把offsets.popper 赋值给popper dom,  offsets.array赋值给array dom
  }, {
    key: "applyStyle",
    value: function(e) {
      var r = {
        position: e.offsets.popper.position
      }, n = Math.round(e.offsets.popper.left), a = Math.round(e.offsets.popper.top);
      return this._options.gpuAcceleration ? (r.transform = "translate3d(".concat(n, "px, ").concat(a, "px, 0)"), Object.assign(r, {
        top: 0,
        left: 0
      })) : Object.assign(r, {
        top: a,
        left: n
      }), Object.assign(r, e.styles), K(this._popper, r), this._popper.setAttribute("x-placement", e.placement), e.offsets.arrow && K(e.arrowElement, e.offsets.arrow), e;
    }
    // 判断 placement是不是2段式的，是则处理一下偏移。 修改data.offsets.popper的值
  }, {
    key: "shift",
    value: function(e) {
      var r = e.placement, n = r.split("-")[0], a = r.split("-")[1];
      if (a) {
        var i = e.offsets.reference, s = i.top, l = i.left, u = i.height, c = i.width, f = F(e.offsets.popper), d = {
          y: {
            start: {
              top: s
            },
            end: {
              top: s + u - f.height
            }
          },
          x: {
            start: {
              left: l
            },
            end: {
              left: l + c - f.width
            }
          }
        }, p = ~["bottom", "top"].indexOf(n) ? "x" : "y";
        e.offsets.popper = Object.assign(f, d[p][a]);
      }
      return e;
    }
    // 校正popper的位置在boundaries 的内部
  }, {
    key: "preventOverflow",
    value: function(e) {
      if (this._options.ignoreBoundaries)
        return e;
      var r = this._options.preventOverflowOrder, n = F(e.offsets.popper), a = {
        top: function() {
          var s = n.top;
          return s < e.boundaries.top && (s = Math.max(s, e.boundaries.top)), {
            top: s
          };
        },
        right: function() {
          var s = n.left;
          return n.right > e.boundaries.right && (s = Math.min(s, e.boundaries.right - n.width)), {
            left: s
          };
        },
        bottom: function() {
          var s = n.top;
          return n.bottom > e.boundaries.bottom && (s = Math.min(s, e.boundaries.bottom - n.height)), {
            top: s
          };
        },
        left: function() {
          var s = n.left;
          return n.left < e.boundaries.left && (s = Math.max(s, e.boundaries.left)), {
            left: s
          };
        }
      };
      return r.forEach(function(i) {
        e.offsets.popper = Object.assign(n, a[i]());
      }), e;
    }
    // 校正popper的位置在reference的边上。 如果2个分离了，重新调整popper的位置。 可能是担心 modifiers.offset 带来的副作用吧
  }, {
    key: "keepTogether",
    value: function(e) {
      var r = F(e.offsets.popper), n = e.offsets.reference;
      return r.right < Math.floor(n.left) && (e.offsets.popper.left = Math.floor(n.left) - r.width), r.left > Math.floor(n.right) && (e.offsets.popper.left = Math.floor(n.right)), r.bottom < Math.floor(n.top) && (e.offsets.popper.top = Math.floor(n.top) - r.height), r.top > Math.floor(n.bottom) && (e.offsets.popper.top = Math.floor(n.bottom)), e;
    }
    // 根据flip的策略，计算当前应该显示的位置。 空间不够要计算出flip的位置。 可能是担心preventOverflow 时，造成pop, reference会重叠。 重叠了就要flip一下
  }, {
    key: "flip",
    value: function(e) {
      var r = this;
      if (e.flipped && e.placement === e._originalPlacement)
        return e;
      var n = e.placement.split("-"), a = n[0], i = be(a), s = n[1] || "", l = [a, i];
      return l.forEach(function(u, c) {
        if (!(a !== u || l.length === c + 1)) {
          a = e.placement.split("-")[0], i = be(a);
          var f = F(e.offsets.popper), d = ~["right", "bottom"].indexOf(a), p = Math.floor(e.offsets.reference[a]), v = Math.floor(f[i]);
          (d && p > v || !d && p < v) && (e.flipped = !0, e.placement = l[c + 1], s && (e.placement += "-".concat(s)), e.offsets.popper = r._getRefPopOffsets(r._popper, r._reference, e.placement).popper, e = r.runModifiers(e, r._options.modifierFns, r.flip));
        }
      }), e;
    }
    // 根据入参option上的offset, 给data.offset.popper进行校正
  }, {
    key: "offset",
    value: function(e) {
      var r = this._options.offset, n = e.offsets.popper;
      return ~e.placement.indexOf("left") ? n.top -= r : ~e.placement.indexOf("right") ? n.top += r : ~e.placement.indexOf("top") ? n.left -= r : ~e.placement.indexOf("bottom") && (n.left += r), e;
    }
    // 计算arrow的位置,保存在data.offsets.arrow ={top,left}
  }, {
    key: "arrow",
    value: function(e) {
      var r = this._options.arrowElement, n = this._options.arrowOffset;
      if (typeof r == "string" && (r = this._popper.querySelector(r)), !r || !this._popper.contains(r))
        return e;
      var a = {}, i = e.placement.split("-")[0], s = F(e.offsets.popper), l = e.offsets.reference, u = ~["left", "right"].indexOf(i), c = u ? "height" : "width", f = u ? "bottom" : "right", d = u ? "left" : "top", p = u ? "top" : "left", v = this.popperOuterSize ? this.popperOuterSize : this.popperOuterSize = q(this._popper), P = q(r), x = P[c];
      l[f] - x < s[p] && (e.offsets.popper[p] -= s[p] - (l[f] - x)), l[p] + x > s[f] && (e.offsets.popper[p] += l[p] + x - s[f]);
      var m = l[p] + (n || l[c] / 2 - x / 2), y = m - s[p];
      y = Math.max(Math.min(s[c] - x - 8, y), 8), a[p] = y, a[d] = "";
      var _ = this._options.placement.split("-");
      return this._options.adjustArrow && ~["top", "bottom"].indexOf(_[0]) && p === "left" && (_[1] === "start" ? a.left = 8 : _[1] || (a.left = (v.width - P.width) / 2)), e.offsets.arrow = a, e.arrowElement = r, e;
    }
    /** 判断 reference 的 offsetParent 元素是fix还是abs, 这个值会赋值给popper 的dom */
  }, {
    key: "_getPopperPositionByRefernce",
    value: function(e) {
      if (this._options.forceAbsolute)
        return "absolute";
      var r = Fe(e);
      return r ? "fixed" : "absolute";
    }
    /** 实时计算一下popper, reference的 位置信息， 用于 */
  }, {
    key: "_getRefPopOffsets",
    value: function(e, r, n) {
      n = n.split("-")[0];
      var a = {
        position: this.state.position
      }, i = a.position === "fixed", s = Bt(r, Q(e), i, e), l = this.popperOuterSize ? this.popperOuterSize : this.popperOuterSize = q(e), u = l.width, c = l.height;
      return ~["right", "left"].indexOf(n) ? (a.top = s.top + s.height / 2 - c / 2, n === "left" ? a.left = s.left - u : a.left = s.right) : (a.left = s.left + s.width / 2 - u / 2, n === "top" ? a.top = s.top - c : a.top = s.bottom), a.width = u, a.height = c, {
        popper: a,
        reference: s
      };
    }
  }, {
    key: "_setupEventListeners",
    value: function() {
      var e = this;
      if (this.state.updateBoundFn = this.update.bind(this), this.state.scrollUpdate = function() {
        if (e._options.updateHiddenPopperOnScroll)
          e.state.updateBoundFn();
        else {
          if (pe(e._reference))
            return;
          e.state.updateBoundFn();
        }
      }, E(window, "resize", this.state.updateBoundFn), this._options.boundariesElement !== "window") {
        var r, n, a, i = this._options.scrollParent || z(this._reference), s = [];
        if ((r = i) !== null && r !== void 0 && (n = r.dataset) !== null && n !== void 0 && (a = n.tag) !== null && a !== void 0 && a.includes("-form")) {
          s.push(i);
          var l = z(i);
          (l === window.document.body || l === window.document.documentElement) && (l = window), s.push(l);
        }
        if ((i === window.document.body || i === window.document.documentElement) && (i = window), this.state.scrollTarget = i, this._options.bubbling || U.globalScroll) {
          var u = Ve(this._reference);
          this.state.scrollTargets = u || [], u.forEach(function(c) {
            E(c, "scroll", e.state.scrollUpdate);
          });
        } else
          s.length ? (this.state.scrollTargets = s, s.forEach(function(c) {
            E(c, "scroll", e.state.scrollUpdate);
          })) : E(i, "scroll", this.state.scrollUpdate);
      }
    }
  }, {
    key: "_removeEventListeners",
    value: function() {
      var e = this;
      if (B(window, "resize", this.state.updateBoundFn), this._options.boundariesElement !== "window" && this.state.scrollTarget && (B(this.state.scrollTarget, "scroll", this.state.scrollUpdate), this.state.scrollTarget = null, this._options.bubbling || U.globalScroll)) {
        var r = this.state.scrollTargets || [];
        r.forEach(function(n) {
          B(n, "scroll", e.state.scrollUpdate);
        }), this.state.scrollTargets = null;
      }
      this.state.updateBoundFn = null, this.state.scrollUpdate = null;
    }
    /** 实时计算一下Boundary的位置 */
  }, {
    key: "_getBoundaries",
    value: function(e, r, n) {
      var a = {
        right: 0,
        left: 0,
        top: 0,
        bottom: 0
      };
      if (n === "window" || n === "body") {
        var i = window.document.body, s = window.document.documentElement, l = At(i, s), u = l.width, c = l.height;
        a = {
          top: 0,
          right: u,
          bottom: c,
          left: 0
        };
      } else if (n === "viewport") {
        var f = Q(this._popper), d = z(this._popper), p = ye(f), v = e.offsets.popper.position === "fixed", P = v || !this._options.appendToBody && ["right", "left"].includes(this._options.placement), x = P ? 0 : kt(d), m = P ? 0 : Nt(d), y = at.viewportWindow || U.viewportWindow || window;
        a = {
          top: 0 - (p.top - x),
          right: y.document.documentElement.clientWidth - (p.left - m),
          bottom: y.document.documentElement.clientHeight - (p.top - x),
          left: 0 - (p.left - m)
        };
      } else if (Q(this._popper) === n) {
        var _ = n.clientWidth, S = n.clientHeight;
        a = {
          right: _,
          bottom: S,
          top: 0,
          left: 0
        };
      } else
        a = ye(n);
      return a.right -= r, a.left += r, a.bottom = a.bottom - r, a.top = a.top + r, a;
    }
  }]);
}();
const Mt = Tt;
var we = function(t) {
  return t.stopPropagation();
}, Dt = typeof window > "u", xe = function(t) {
  var e = t.state, r = t.props, n = t.vm, a = t.slots, i = e.referenceElm || r.reference || n.$refs.reference && n.$refs.reference.$el || n.$refs.reference;
  return !i && a.reference && a.reference()[0] && (e.referenceElm = a.reference()[0].elm || a.reference()[0].el, i = e.referenceElm), i;
}, Ft = function(t) {
  if (!(!t || !t.nodeType)) {
    var e = function(i) {
      return parseInt(window.getComputedStyle(i).zIndex, 10) || 0;
    }, r = e(t), n;
    do {
      if (t = t.parentNode, t)
        n = e(t);
      else
        break;
      r = n > r ? n : r;
    } while (t !== document.body);
    return r + 1 + "";
  }
};
const jt = function(o) {
  var t = o.parent, e = o.emit, r = o.nextTick, n = o.onBeforeUnmount, a = o.onDeactivated, i = o.props, s = o.watch, l = o.reactive, u = o.vm, c = o.slots, f = o.toRefs, d = o.popperVmRef, p = l({
    popperJS: null,
    appended: !1,
    // arrow 是否添加
    popperElm: null,
    showPopper: i.manual ? !!i.modelValue : !1,
    referenceElm: null,
    currentPlacement: ""
  }), v = function(b) {
    if (!p.appended) {
      p.appended = !0;
      var h = document.createElement("div");
      h.setAttribute("x-arrow", ""), h.className = "popper__arrow", b.appendChild(h);
    }
  }, P = function(b) {
    var h = (i == null ? void 0 : i.popperOptions) || {}, k = h.followReferenceHide, N = k === void 0 ? !0 : k, $ = b._popper, J = b._reference;
    N && pe(J) && ($.style.display = "none");
  }, x = function(b) {
    return i.zIndex === "relative" ? Ft(b) : U.nextZIndex();
  }, m = function(b) {
    if (!Dt && (p.currentPlacement = p.currentPlacement || i.placement, !!/^(top|bottom|left|right)(-start|-end)?$/g.test(p.currentPlacement))) {
      var h = i.popperOptions || {
        gpuAcceleration: !1
      };
      p.popperElm = p.popperElm || i.popper || u.$refs.popper || d.popper || b;
      var k = p.popperElm, N = xe({
        state: p,
        props: i,
        vm: u,
        slots: c
      });
      !k || !N || N.nodeType !== Node.ELEMENT_NODE || (i.visibleArrow && v(k), i.appendToBody || i.popperAppendToBody ? document.body.appendChild(p.popperElm) : (t && t.$el && t.$el.appendChild(p.popperElm), h.forceAbsolute = !0), h.placement = p.currentPlacement, h.offset = i.offset || 0, h.arrowOffset = i.arrowOffset || 0, h.adjustArrow = i.adjustArrow || !1, h.appendToBody = i.appendToBody || i.popperAppendToBody, p.popperJS = new Mt(N, k, h), e("created", p), typeof h.onUpdate == "function" && p.popperJS.onUpdate(h.onUpdate), p.popperJS._popper.style.zIndex = x(p.popperJS._reference), P(p.popperJS), E(p.popperElm, "click", we));
    }
  }, y = function(b) {
    b && b !== !0 && (p.popperElm = b);
    var h = p.popperJS;
    h ? (h._reference = xe({
      state: p,
      props: i,
      vm: u,
      slots: c
    }), h.update(), h._popper && b !== !0 && (h._popper.style.zIndex = x(h._reference), P(p.popperJS))) : m(b && b !== !0 ? b : void 0);
  }, _ = function(b) {
    !p.popperJS || p.showPopper && !b || (p.popperJS.destroy(), p.popperJS = null);
  }, S = function(b) {
    b && p.popperElm && p.popperElm.parentNode === document.body && (B(p.popperElm, "click", we), p.popperElm.remove());
  };
  return s(function() {
    return p.showPopper;
  }, function(O) {
    i.disabled || (O && r(y), i.trigger === "manual" && e("update:modelValue", O));
  }), n(function() {
    r(function() {
      _(!0), (i.appendToBody || i.popperAppendToBody) && S("remove");
    });
  }), a(function() {
    _(!0), (i.appendToBody || i.popperAppendToBody) && S("remove");
  }), M({
    updatePopper: y,
    destroyPopper: S,
    doDestroy: _
  }, f(p));
};
var Vt = function() {
  var t = 4294967296;
  return window.crypto.getRandomValues(new window.Uint32Array(1))[0] / t;
}, Rt = function() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 8;
  return t + Vt().toString().substr(2, e);
}, Re = ["state", "bindEvent", "hide", "show", "doDestroy", "handleFocus", "debounceClose", "handleShowPopper", "handleClosePopper", "setExpectedState", "updatePopper", "focusHandler"], Lt = function(t) {
  var e = t.reactive, r = t.showPopper, n = t.popperElm, a = t.referenceElm, i = t.props, s = t.inject, l = t.popperJS, u = t.currentPlacement;
  return e({
    popperJS: l,
    showPopper: r,
    popperElm: n,
    referenceElm: a,
    currentPlacement: u,
    timeout: null,
    focusing: !1,
    expectedState: void 0,
    tooltipId: Rt("tiny-tooltip-", 4),
    tabindex: i.tabindex,
    xPlacement: "bottom",
    showContent: s("showContent", null),
    tipsMaxWidth: s("tips-max-width", null)
  });
}, Le = function(t, e, r) {
  var n = e.watch, a = e.toRefs, i = e.reactive, s = e.onBeforeUnmount, l = e.onDeactivated, u = e.onMounted, c = e.onUnmounted, f = e.inject, d = r.vm, p = r.emit, v = r.slots, P = r.nextTick, x = r.parent, m = {}, y = {}, _ = {
    emit: p,
    props: t,
    nextTick: P,
    toRefs: a,
    reactive: i,
    parent: x.$parent,
    vm: d,
    popperVmRef: y
  };
  Object.assign(_, {
    slots: v,
    onBeforeUnmount: s,
    onDeactivated: l,
    watch: n
  });
  var S = jt(_), O = S.showPopper, b = S.updatePopper, h = S.popperElm, k = S.referenceElm, N = S.doDestroy, $ = S.popperJS, J = S.currentPlacement, g = Lt({
    reactive: i,
    showPopper: O,
    popperElm: h,
    referenceElm: k,
    props: t,
    inject: f,
    popperJS: $,
    currentPlacement: J
  });
  return Object.assign(m, {
    state: g,
    doDestroy: N,
    updatePopper: b,
    show: st({
      api: m,
      state: g,
      props: t
    }),
    hide: lt(m),
    destroyed: vt({
      state: g,
      api: m,
      vm: d
    }),
    bindPopper: St({
      vm: d,
      nextTick: P,
      popperVmRef: y
    }),
    watchFocusing: yt(g),
    removeFocusing: ft({
      api: m,
      state: g
    }),
    handleBlur: ut({
      api: m,
      state: g
    }),
    handleFocus: pt({
      api: m,
      state: g
    }),
    debounceClose: bt({
      api: m,
      props: t
    }),
    setExpectedState: ht({
      state: g
    }),
    handleShowPopper: ct({
      props: t,
      state: g
    }),
    handleClosePopper: dt({
      api: m,
      props: t,
      state: g
    }),
    bindEvent: wt({
      api: m,
      state: g,
      vm: d
    }),
    focusHandler: gt({
      slots: v,
      api: m
    }),
    handleDocumentClick: mt({
      props: t,
      api: m,
      state: g,
      popperVmRef: y
    }),
    observeCallback: xt({
      state: g,
      popperVmRef: y
    })
  }), n(function() {
    return g.focusing;
  }, m.watchFocusing), n(function() {
    return t.modelValue;
  }, function(Z) {
    return P(function() {
      return t.manual && (g.showPopper = Z);
    });
  }), u(function() {
    if (m.bindPopper(), t.genArrowByHtml) {
      var Z = {
        attributes: !0,
        childList: !1,
        subtree: !1
      };
      m.observer = new MutationObserver(m.observeCallback), m.observer.observe(y.popper, Z);
    }
  }), d.$on("tooltip-update", m.bindPopper), c(function() {
    m.destroyed(), m.observer && m.observer.disconnect(), d.$off("tooltip-update");
  }), m;
};
const Se = /* @__PURE__ */ ie({
  name: ae + "Tooltip",
  componentName: "Tooltip",
  props: {
    ...se,
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
  setup(o, t) {
    return Ce({
      props: o,
      context: t,
      renderless: Le,
      api: Re
    });
  },
  render() {
    const o = (n) => {
      let a = n.slots.content && n.slots.content();
      if (a && (!ee.Comment || a[0].type !== ee.Comment))
        return a;
      let i;
      return n.renderContent ? i = n.renderContent(A, n.content) : n.pre ? i = n.content ? A("pre", n.content) : null : i = n.content, i;
    };
    if (!Object.prototype.hasOwnProperty.call(this, "popperVM")) {
      const n = {
        value: null
      };
      this.d({
        popperVM: {
          get: () => (n.value || (n.value = le({
            el: document.createElement("div"),
            propsData: null,
            component: {
              render: () => {
                const a = o(this), i = typeof a == "string", s = {
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
                  !this.disabled && this.state.showPopper && a && this.updatePopper();
                }), A("transition", s, [Ne(W("div", {
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
                }, [i ? W("div", {
                  class: "tiny-tooltip__content-wrapper",
                  style: `max-height:${this.contentMaxHeight}`
                }, [a]) : a]), [[Ae, !this.disabled && this.state.showPopper && a]])]);
              }
            }
          })), n.value),
          set: (a) => n.value = a
        }
      });
    }
    const e = (() => {
      const n = this.slots.default && this.slots.default();
      if (!Array.isArray(n))
        return null;
      let a = null;
      for (let i = 0; i < n.length; i++) {
        const s = Be(n[i]);
        if (!ke(s)) {
          a = s;
          break;
        }
      }
      return a;
    })();
    if (!e)
      return null;
    const r = e.data || e.props || (e.props = {});
    return r.class = Ke("tiny-tooltip " + ze(r.class)), e;
  }
});
var C = {
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
const It = /* @__PURE__ */ ie({
  name: ae + "Tooltip",
  componentName: "Tooltip",
  props: {
    ...se,
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
  setup(o, t) {
    return Ce({
      props: o,
      context: t,
      renderless: Le,
      api: Re
    });
  },
  render() {
    const o = (i) => {
      let s = i.slots.content && i.slots.content();
      if (s)
        return s;
      let l;
      return i.renderContent ? l = i.renderContent(A, i.content) : i.pre ? l = i.content ? A("pre", {
        class: "whitespace-pre-wrap"
      }, i.content) : null : l = i.content, l;
    };
    if (!Object.hasOwnProperty.call(this, "popperVM")) {
      const i = {
        value: null
      };
      this.d({
        popperVM: {
          get: () => (i.value || (i.value = le({
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
                const f = this.state.xPlacement || "";
                return A("transition", l, [Ne(W("div", {
                  "data-tag": "tiny-tooltip",
                  ref: "popper",
                  id: this.state.tooltipId,
                  appendToBody: this.appendToBody,
                  class: ce([C.tooltip, !this.effect && !this.type && C["tooltip-sm"], this.effect && C[`effect-${this.effect}`], this.type && C[`is-${this.type}`], this.disabled || !this.state.showPopper ? "hidden" : "", this.popperClass]),
                  role: "tooltip",
                  "aria-hidden": this.disabled || !this.state.showPopper ? "true" : "false",
                  onMouseenter: () => u(),
                  onMouseleave: () => c()
                }, [s, this.visibleArrow ? W("div", {
                  "x-arrow": !0,
                  class: ce([C.arrow, C["placement-" + f.split("-")[0]], !this.effect && !this.type && C["placement-" + f.split("-")[0] + "-sm"], this.effect === "light" ? C["placement-" + f.split("-")[0] + "-light"] : "", this.effect === "dark" ? C["placement-" + f.split("-")[0] + "-dark"] : "", this.type ? C[`arrow-${f.split("-")[0]}-${this.type}`] : ""])
                }, null) : ""]), [[Ae, !this.disabled && this.state.showPopper && s]])]);
              }
            }
          })), i.value),
          set: (s) => i.value = s
        }
      });
    }
    const t = (i, s) => {
      const l = (d) => d && d.trim(), u = (d) => {
        const p = [];
        return d.forEach((v) => {
          v && typeof v == "string" ? p.push(l(v)) : v && typeof v == "object" && p.push(c(v));
        }), p.join(" ");
      }, c = (d) => {
        const p = [];
        return Object.keys(d).forEach((v) => {
          d[v] && p.push(v);
        }), p.join(" ");
      };
      let f = "";
      return i && (typeof i == "string" ? f = f + l(i) : Array.isArray(i) ? f = f + u(i) : typeof i == "object" && (f = f + c(i))), l(f.replace(s, ""));
    }, e = (i) => "tiny-tooltip " + t(i, /\btiny-tooltip\b/g), n = (() => {
      const i = this.slots.default && this.slots.default();
      if (!Array.isArray(i))
        return null;
      let s = null;
      for (let l = 0; l < i.length; l++) {
        const u = Be(i[l]);
        if (!ke(u)) {
          s = u;
          break;
        }
      }
      return s;
    })();
    if (!n)
      return null;
    const a = n.data || n.props || (n.props = {});
    return a.class = e(a.class), n;
  }
});
var Ht = function(t) {
  var e, r = (typeof process > "u" ? "undefined" : te(process)) === "object" ? (e = process.env) === null || e === void 0 ? void 0 : e.TINY_MODE : null;
  return (r || t) === "pc" ? Se : (r || t) === "mobile-first" ? It : Se;
}, Ut = M(M({}, se), {}, {
  visible: {
    type: String,
    default: function() {
      return "always";
    },
    validator: function(t) {
      return ["always", "auto"].includes(t);
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
    validator: function(t) {
      return !!~["normal", "warning", "error", "info", "success"].indexOf(t);
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
const T = ie({
  name: ae + "Tooltip",
  componentName: "Tooltip",
  props: Ut,
  setup: function(t, e) {
    return We({
      props: t,
      context: e,
      template: Ht
    });
  }
}), Kt = "3.20.0";
T.model = {
  prop: "modelValue",
  event: "update:modelValue"
};
T.install = function(o) {
  o.component(T.name, T);
};
T.version = Kt;
var zt = 2, L = {
  value: null
}, X = ee.ref(""), Wt = function(t) {
  return (t == null ? void 0 : t.textContent) && (t.scrollWidth > t.clientWidth || t.scrollHeight - t.clientHeight > zt);
}, $t = function(t) {
  var e;
  return !!(!(t == null || (e = t.boundingValue) === null || e === void 0) && e.always);
}, Y = function(t) {
  var e;
  return (t == null || (e = t.boundingValue) === null || e === void 0 ? void 0 : e.effect) === "dark";
}, G = function(t) {
  var e;
  return ((e = t.boundingValue) === null || e === void 0 ? void 0 : e.placement) || "top";
}, Ie = function(t) {
  var e = t.currentTarget;
  if (e.boundingValue && ($t(e) || Wt(e))) {
    var r, n;
    if (!L.value) {
      var a;
      X.value = ((a = e.boundingValue) === null || a === void 0 ? void 0 : a.content) || e.textContent, L.value = le({
        el: document.createElement("div"),
        propsData: {
          renderContent: function() {
            return A("span", {
              class: "tiny-directive-tip__content"
            }, X.value);
          },
          placement: G(e),
          effect: Y(e) ? "dark" : "light"
        },
        component: T
      });
    }
    var i = L.value, s = i.state.popperElm;
    X.value = ((r = e.boundingValue) === null || r === void 0 ? void 0 : r.content) || e.textContent, i.state.referenceElm = e, i.state.currentPlacement = G(e), s && s.classList.replace("is-".concat(Y(e) ? "light" : "dark"), "is-".concat(Y(e) ? "dark" : "light")), i.show(), (n = i.state.popperJS) !== null && n !== void 0 && n._options && (i.state.popperJS._options.placement = G(e)), i.updatePopper();
  }
}, He = function() {
  L.value && L.value.hide();
}, H = function(t, e) {
  var r, n = e.value, a = n === void 0 ? {} : n;
  t.boundingValue = a, a && !((r = t.boundingValue) !== null && r !== void 0 && r.listened) && (t.addEventListener("mouseenter", Ie), t.addEventListener("mouseleave", He), t.boundingValue.listened = !0);
}, Ee = function(t) {
  var e;
  (e = t.boundingValue) !== null && e !== void 0 && e.listened && (t.removeEventListener("mouseenter", Ie), t.removeEventListener("mouseleave", He));
};
const Yt = {
  bind: H,
  unbind: Ee,
  update: H,
  beforeMount: H,
  unmounted: Ee,
  updated: H
};
function Ue(o, t) {
  for (var e = document.createTreeWalker(o, NodeFilter.SHOW_TEXT), r = []; e.nextNode(); ) {
    var n = e.currentNode;
    t(n) && r.push(n);
  }
  return r;
}
function Jt(o, t, e) {
  t.forEach(function(r) {
    var n = r.textContent, a = n.toLowerCase().indexOf(e.toLowerCase()), i = n.substring(0, a), s = n.substring(a + e.length);
    r.textContent = i;
    var l = document.createElement("span");
    l.classList.add("tiny-hl-query-node"), l.textContent = e;
    var u = document.createTextNode(s);
    r.after(l, u);
  }), t.length && fe(o, e);
}
function Zt(o) {
  var t = /* @__PURE__ */ new Set();
  o.forEach(function(e) {
    var r;
    return t.add((r = e.parentElement) === null || r === void 0 ? void 0 : r.parentElement);
  }), t.forEach(function(e) {
    e.innerText = e.textContent;
  });
}
function fe(o, t) {
  if (t) {
    var e = Ue(o, function(r) {
      if (r.parentElement.classList.contains("tiny-hl-query-node"))
        return !1;
      var n = r.textContent || "";
      return n.toLowerCase().includes(t.toLowerCase());
    });
    Jt(o, e, t);
  }
}
function Qt(o) {
  var t = Ue(o, function(e) {
    return e.parentElement.classList.contains("tiny-hl-query-node");
  });
  Zt(t);
}
var Pe = function(t, e) {
  t.classList.toggle("tiny-hl-query", !0);
  var r = e.value;
  fe(t, r);
}, _e = function(t) {
  Qt(t);
}, Oe = function(t, e) {
  var r = e.value;
  fe(t, r);
};
const Gt = {
  mounted: Pe,
  beforeUpdate: _e,
  updated: Oe,
  // vue2周期
  inserted: Pe,
  update: _e,
  componentUpdated: Oe
};
export {
  Yt as AutoTip,
  Gt as HighlightQuery
};
