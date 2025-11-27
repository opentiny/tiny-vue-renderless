import * as l from "vue";
import { t as X } from "@opentiny/vue-locale";
function H(o, e) {
  (e == null || e > o.length) && (e = o.length);
  for (var t = 0, n = Array(e); t < e; t++)
    n[t] = o[t];
  return n;
}
function Ae(o) {
  if (Array.isArray(o))
    return H(o);
}
function ie(o, e, t) {
  return (e = je(e)) in o ? Object.defineProperty(o, e, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : o[e] = t, o;
}
function $e(o) {
  if (typeof Symbol < "u" && o[Symbol.iterator] != null || o["@@iterator"] != null)
    return Array.from(o);
}
function Pe() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function ee(o, e) {
  var t = Object.keys(o);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(o);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(o, i).enumerable;
    })), t.push.apply(t, n);
  }
  return t;
}
function j(o) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2 ? ee(Object(t), !0).forEach(function(n) {
      ie(o, n, t[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(t)) : ee(Object(t)).forEach(function(n) {
      Object.defineProperty(o, n, Object.getOwnPropertyDescriptor(t, n));
    });
  }
  return o;
}
function te(o) {
  return Ae(o) || $e(o) || Oe(o) || Pe();
}
function we(o, e) {
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
function je(o) {
  var e = we(o, "string");
  return typeof e == "symbol" ? e : e + "";
}
function S(o) {
  "@babel/helpers - typeof";
  return S = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, S(o);
}
function Oe(o, e) {
  if (o) {
    if (typeof o == "string")
      return H(o, e);
    var t = {}.toString.call(o).slice(8, -1);
    return t === "Object" && o.constructor && (t = o.constructor.name), t === "Map" || t === "Set" ? Array.from(o) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? H(o, e) : void 0;
  }
}
function Q(o) {
  var e = /* @__PURE__ */ Object.create(null);
  return function(n) {
    var i = e[n];
    return i || (e[n] = o(n));
  };
}
var Ie = /-(\w)/g, Ee = Q(function(o) {
  return o.replace(Ie, function(e, t) {
    return t ? t.toUpperCase() : "";
  });
}), Se = Q(function(o) {
  return o.charAt(0).toUpperCase() + o.slice(1);
}), Te = /\B([A-Z])/g, _e = Q(function(o) {
  return o.replace(Te, "-$1").toLowerCase();
}), W = function() {
  var e = {}, t = function(r, a) {
    var u = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
    if (r && typeof r == "string" && typeof a == "function") {
      var c = e[r] || [];
      e[r] = c, c.push(a), a.once = u;
    }
  }, n = {
    emit: function(r) {
      var a = arguments, u = e[r];
      u && (u.forEach(function(c) {
        return c.apply(null, [].slice.call(a, 1));
      }), e[r] = u.filter(function(c) {
        return !c.once;
      }));
    },
    on: t,
    once: function(r, a) {
      t(r, a, !0);
    },
    off: function(r, a) {
      if (r && typeof r == "string") {
        var u = e[r];
        typeof a == "function" ? e[r] = u.filter(function(c) {
          return c !== a;
        }) : delete e[r];
      } else
        e = {};
    }
  };
  return n;
}, Me = function(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = {};
  for (var i in e)
    i.indexOf("_") !== 0 && (n[i] = e[i]);
  for (var r in t)
    n[r] = t[r];
  return n;
}, ke = function(e, t) {
  if (!(!e || !t)) {
    var n = [];
    typeof e == "string" ? n.push(e) : Array.isArray(e) && (n = e);
    var i = [];
    typeof t == "string" ? i.push(t) : Array.isArray(t) && (i = t);
    var r = [];
    return i.forEach(function(a) {
      return n.forEach(function(u) {
        return r.push("".concat(a, ":").concat(u, "-").concat(a));
      });
    }), n.concat(r).join(" ");
  }
}, Re = function() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 ? arguments[1] : void 0;
  if (S(t) === "object") {
    var n = Array.isArray(t) ? t : Object.keys(t).filter(function(r) {
      return t[r];
    }), i = "";
    return n.forEach(function(r) {
      e[r] && (i += "".concat(e[r], " "));
    }), i;
  } else
    return e[t] || "";
}, wt = l.Teleport, oe = l.defineAsyncComponent, Ve = l.markRaw, ae = function(e) {
  var t = e.view, n = t === void 0 ? void 0 : t, i = e.component, r = i === void 0 ? void 0 : i, a = e.props, u = e.context, c = u.attrs, s = u.slots, f = e.extend, v = f === void 0 ? {} : f;
  return function() {
    return l.h(n && n.value || r, j(j(j({
      ref: "modeTemplate"
    }, a), c), v), s);
  };
}, Z = function(e) {
  var t = l.getCurrentInstance();
  return e && ce(t), t == null ? void 0 : t.appContext.config.globalProperties;
}, Le = function() {
  var e, t = l.getCurrentInstance(), n = t == null || (e = t.type) === null || e === void 0 ? void 0 : e.name;
  if (!n) {
    var i, r;
    n = t == null || (i = t.parent) === null || i === void 0 || (r = i.type) === null || r === void 0 ? void 0 : r.name;
  }
  return n || "";
}, Ke = function() {
  var e;
  return ((e = l.getCurrentInstance()) === null || e === void 0 ? void 0 : e.appContext) || {
    component: function() {
    }
  };
}, Ue = function() {
  var e = l.getCurrentInstance();
  return (e == null ? void 0 : e.appContext.config.globalProperties) || {};
}, ue = function() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : l.getCurrentInstance(), t = e == null ? void 0 : e.appContext.config.globalProperties.$router, n = t && t.currentRoute.value;
  return {
    route: n,
    router: t
  };
}, ce = function(e) {
  var t = W();
  typeof e.$emitter > "u" && Object.defineProperty(e, "$emitter", {
    get: function() {
      return t;
    }
  });
}, Be = function(e) {
  var t = function(i, r, a, u) {
    var c = i.subTree && i.subTree.children || i.children;
    Array.isArray(c) && c.forEach(function(s) {
      var f = s.type && s.type.componentName, v = s.component;
      f === r ? (v.emit(a, u), v.$emitter && v.$emitter.emit(a, u)) : t(s, r, a, u);
    });
  };
  return {
    dispatch: function(i, r, a) {
      for (var u = e.parent || e.root, c = u.type && u.type.componentName; u && (!c || c !== i); )
        u = u.parent, u && (c = u.type && u.type.componentName);
      if (u) {
        var s, f;
        (s = u).emit.apply(s, te([r].concat(a))), u.$emitter && (f = u.$emitter).emit.apply(f, te([r].concat(a)));
      }
    },
    broadcast: function(i, r, a) {
      t(e, i, r, a);
    }
  };
}, U = function(e) {
  if (e && e.parent)
    return e.parent.type.name === "AsyncComponentWrapper" && e.parent.parent ? e.parent.parent : e.parent;
}, Ne = function(e) {
  return function(t) {
    var n = U(e), i = 0, r = function(u) {
      return {
        level: i,
        vm: O({}, u),
        el: u.vnode.el,
        options: u.type
      };
    };
    if (typeof t != "function")
      return n ? r(n) : {};
    for (i++; n && !t(r(n)); )
      n = U(n), i++;
  };
}, Fe = function(e) {
  return function(t) {
    if (typeof t != "function")
      return fe(e.subTree);
    var n = 1, i = function(a) {
      if (a) {
        var u = a.children || a.dynamicChildren, c = n++;
        if (Array.isArray(u)) {
          if (u.some(function(s) {
            return s.component && t({
              level: c,
              vm: O({}, s.component),
              el: s.el,
              options: s.type,
              isLevel1: !0
            });
          }))
            return;
          u.forEach(function(s) {
            return i(s);
          });
        }
      }
    };
    i(e.subTree);
  };
}, Ge = /^on[A-Z]/, He = function(e) {
  var t = {}, n = {};
  for (var i in e) {
    var r = e[i];
    if (Ge.test(i) && typeof r == "function") {
      n[_e(i.substr(2))] = r;
      continue;
    }
    t[i] = r;
  }
  return {
    $attrs: t,
    $listeners: n
  };
}, fe = function(e) {
  var t = [];
  if (t.refs = {}, e) {
    var n = e.dynamicChildren || e.children;
    Array.isArray(n) ? n.forEach(function(i) {
      if (i.component) {
        var r = O({}, i.component);
        t.push(r), i.props.ref && (t.refs[i.props.ref] = r);
      }
    }) : e.component && t.push(O({}, e.component));
  }
  return t;
}, F = function(e, t, n, i) {
  var r = function(c) {
    if (typeof i == "function" && i(c))
      return 1;
    Object.defineProperty(e, c, {
      configurable: !0,
      enumerable: !0,
      get: function() {
        return t[n][c];
      },
      set: function(f) {
        return t[n][c] = f;
      }
    });
  };
  for (var a in t[n])
    r(a);
  return e;
}, ne = function(e) {
  return e.indexOf("_") === 0;
}, se = function(e, t) {
  return F(e, t, "setupState", null), F(e, t, "props", ne), F(e, t, "ctx", ne), e;
}, O = function(e, t) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null, i = He(t.attrs), r = i.$attrs, a = i.$listeners, u = t.$emitter;
  u || (ce(t), u = t.$emitter);
  var c = function() {
    for (var v = arguments.length, h = new Array(v), p = 0; p < v; p++)
      h[p] = arguments[p];
    t.emit.apply(t, h), u.emit.apply(e, h);
  }, s = function(v, h, p) {
    return v[h] = p;
  };
  return n || se(e, t), Object.defineProperties(e, {
    $attrs: {
      get: function() {
        return r;
      }
    },
    $children: {
      get: function() {
        return fe(t.subTree);
      }
    },
    $constants: {
      get: function() {
        return t.props._constants;
      }
    },
    $emit: {
      get: function() {
        return c;
      }
    },
    $el: {
      get: function() {
        return t.vnode.el;
      }
    },
    $listeners: {
      get: function() {
        return a;
      }
    },
    $mode: {
      get: function() {
        return t._tiny_mode;
      }
    },
    $nextTick: {
      get: function() {
        return l.nextTick;
      }
    },
    $off: {
      get: function() {
        return u.off;
      }
    },
    $on: {
      get: function() {
        return u.on;
      }
    },
    $once: {
      get: function() {
        return u.once;
      }
    },
    $options: {
      get: function() {
        return {
          componentName: t.type.componentName
        };
      }
    },
    $parent: {
      get: function() {
        return t.parent && O({}, U(t));
      }
    },
    $refs: {
      get: function() {
        return t.refs;
      }
    },
    $renderless: {
      get: function() {
        return t.props.tiny_renderless;
      }
    },
    $scopedSlots: {
      get: function() {
        return t.slots;
      }
    },
    $set: {
      get: function() {
        return s;
      }
    },
    $slots: {
      get: function() {
        return t.slots;
      }
    },
    $template: {
      get: function() {
        return t.props.tiny_template;
      }
    }
  }), e;
}, ze = function(e, t) {
  for (var n in e.refs)
    Object.prototype.hasOwnProperty.call(e.refs, n) && (t[n] = e.refs[n]);
}, De = function(e, t) {
  var n, i, r = l.getCurrentInstance(), a = r == null ? void 0 : r.appContext.config.globalProperties, u = ue(r), c = u.route, s = u.router, f = r == null || (n = r.proxy) === null || n === void 0 || (i = n.$root) === null || i === void 0 ? void 0 : i.$i18n, v = Be(r), h = v.dispatch, p = v.broadcast, w = Ne(r), $ = Fe(r), b = O({}, r, e), d = e.emit, g = {}, C = typeof r.props.tiny_template > "u" && U(r), m = C ? O({}, C) : r.parent ? O({}, r.parent) : null, y = function(A) {
    var P, T = A.name, V = A.value, L = C ? C.ctx : r == null || (P = r.parent) === null || P === void 0 ? void 0 : P.ctx;
    L[T] = V, m[T] = V;
  }, x = function(A) {
    Object.defineProperties(b, A), Object.defineProperties(r == null ? void 0 : r.ctx, A);
  }, M = function(A) {
    m && Object.defineProperties(m, A);
  };
  return l.onBeforeMount(function() {
    return se(b, r);
  }), l.onMounted(function() {
    return ze(r, g);
  }), {
    framework: "vue3",
    vm: b,
    emit: d,
    emitter: W,
    route: c,
    router: s,
    dispatch: h,
    broadcast: p,
    parentHandler: w,
    childrenHandler: $,
    i18n: f,
    refs: g,
    slots: r == null ? void 0 : r.slots,
    scopedSlots: r == null ? void 0 : r.slots,
    attrs: e.attrs,
    parent: m,
    nextTick: l.nextTick,
    constants: r == null ? void 0 : r.props._constants,
    mode: t,
    isPCMode: t === "pc",
    isMobileMode: t === "mobile",
    service: a == null ? void 0 : a.$service,
    getService: function() {
      return a == null ? void 0 : a.$getService(b);
    },
    setParentAttribute: y,
    defineInstanceProperties: x,
    defineParentInstanceProperties: M
  };
}, G = function(e, t, n) {
  if (typeof e[t] < "u") {
    var i = e[t];
    e[n] = function(r, a, u) {
      u.context = a.instance, i(r, a, u);
    }, delete e[t];
  }
}, qe = function(e) {
  for (var t in e) {
    var n = e[t];
    G(n, "bind", "beforeMount"), G(n, "update", "updated"), G(n, "unbind", "unmounted");
  }
  return e;
}, Qe = function(e) {
  return e;
}, We = l.Text, Ze = l.Comment, Ye = function(e) {
  return !e || !e.type || [We, Ze].includes(e.type);
}, Je = function(e) {
  var t = {};
  for (var n in e)
    if (n === "class" || n === "style")
      t[n] = e[n];
    else if (n === "on" || n === "nativeOn") {
      var i = e[n];
      for (var r in i)
        t["on".concat(Se(Ee(r)))] = i[r];
    } else if (n === "attrs" || n === "props" || n === "domProps") {
      var a = e[n];
      for (var u in a)
        t[u] = a[u];
    } else
      t[n] = e[n];
  return t;
}, Xe = function(e) {
  var t = e, n = !1;
  if (typeof e == "string" && typeof document < "u") {
    var i = document.createElement(e), r = ["SVG", "CIRCLE", "PATH"];
    i instanceof HTMLUnknownElement && !r.includes(i.nodeName) || e.includes("-") ? (e = e.toLowerCase(), n = !0, e === "transition" ? t = l.Transition : e === "transition-group" ? t = l.TransitionGroup : t = l.resolveComponent(e)) : t = e;
  }
  return {
    type: t,
    component: e,
    customElement: n
  };
}, et = function(e, t, n) {
  var i = {}, r = n, a = Xe(e), u = a.customElement, c = a.type;
  return e = a.component, t && S(t) === "object" && !Array.isArray(t) ? (i = Je(t), t.scopedSlots && (r = t.scopedSlots)) : (typeof t == "string" || Array.isArray(t)) && (n = t), (typeof n == "string" || Array.isArray(n)) && (r = typeof e != "string" || u ? function() {
    return n;
  } : n), l.h(c, i, r);
}, tt = function(e) {
  return function(t) {
    var n = t.component, i = t.propsData, r = t.el, a = Object.assign(n, {
      provide: ie({}, e.configKey, e.configInstance)
    }), u = l.createVNode(a, i);
    return l.render(u, r), O({}, u.component);
  };
}, nt = l.defineComponent, le = !1, jt = !0, rt = l.isVNode, Ot = l.KeepAlive, z = function(e) {
  var t = [];
  return Object.keys(e).forEach(function(n) {
    return e[n] && t.push(n);
  }), t.join(" ");
}, it = function(e) {
  var t = [];
  return e.forEach(function(n) {
    typeof n == "string" ? t.push(n) : S(n) === "object" && t.push(z(n));
  }), t.join(" ");
}, D = function(e) {
  if (!e)
    return "";
  if (typeof e == "string")
    return e;
  if (Array.isArray(e) && e.length > 0) {
    var t = [];
    return e.forEach(function(n) {
      n && (typeof n == "string" ? t.push(n) : Array.isArray(n) ? t.push(it(n)) : S(n) === "object" && t.push(z(n)));
    }), t.join(" ");
  }
  return S(e) === "object" ? z(e) : "";
}, It = function(e) {
  var t = D(e), n = Array.from(new Set(t.split(" "))).filter(function(i) {
    return i;
  });
  return D(n);
};
var ot = typeof window > "u";
function re(o, e, t, n) {
  var i, r = 0;
  typeof e != "boolean" && (n = t, t = e, e = void 0);
  function a() {
    var c = this, s = (/* @__PURE__ */ new Date()).valueOf() - r, f = arguments;
    function v() {
      r = (/* @__PURE__ */ new Date()).valueOf(), t.apply(c, f);
    }
    function h() {
      i = void 0;
    }
    n && !i && v(), i && clearTimeout(i);
    var p = n === void 0;
    p && s > o ? v() : e !== !0 && (i = setTimeout(n ? h : v, p ? o - s : o));
  }
  function u() {
    i && (clearTimeout(i), i = null);
  }
  return a._cancel = u, a;
}
function at(o, e, t) {
  return t === void 0 ? re(o, e, !1) : re(o, t, e !== !1);
}
var ut = function() {
  if (!ot) {
    var e = l.ref(""), t = ["2xl", "xl", "lg", "md", "sm"], n = {
      "2xl": window.matchMedia("(min-width:1536px)"),
      xl: window.matchMedia("(min-width:1280px)"),
      lg: window.matchMedia("(min-width:1024px)"),
      md: window.matchMedia("(min-width:768px)"),
      sm: window.matchMedia("(min-width:640px)")
    }, i = function() {
      for (var u = 0; u < t.length; u++) {
        var c = t[u];
        if (n[c].matches) {
          e.value = c;
          return;
        }
      }
      e.value = "default";
    }, r = at(0, function() {
      return i();
    });
    return i(), t.forEach(function(a) {
      return n[a].addEventListener("change", r);
    }), l.onBeforeUnmount(function() {
      t.forEach(function(a) {
        return n[a].removeEventListener("change", r);
      });
    }), {
      current: e
    };
  }
};
function Et() {
  var o = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 100, e = l.ref(0), t;
  function n() {
    t = requestAnimationFrame(function() {
      e.value++, !(e.value >= o) && n();
    });
  }
  function i() {
    t && (cancelAnimationFrame(t), t = 0);
  }
  return n(), l.onBeforeUnmount(function() {
    return i();
  }), {
    defer: function(a) {
      return e.value >= a;
    },
    reset: function() {
      i(), e.value = 0, n();
    },
    cancel: i
  };
}
var ct = ["IconLoadingShadow", "IconNoData"], ve = 0, pe = function(e, t) {
  {
    var n;
    if ((n = e.props) !== null && n !== void 0 && n.id) {
      var i = "".concat(e.props.id).concat(ve);
      t[e.props.id] = i, e.props.id = i;
    }
  }
  Array.isArray(e == null ? void 0 : e.children) && e.children.forEach(function(r) {
    pe(r, t);
  });
}, de = function(e, t) {
  var n = ["fill", "mask", "filter"];
  n.forEach(function(i) {
    {
      var r, a;
      if ((r = e.props) !== null && r !== void 0 && (a = r[i]) !== null && a !== void 0 && a.includes("url(#")) {
        var u = e.props[i].replace("url(#", "").replace(")", ""), c = t[u];
        c && (e.props[i] = "url(#".concat(c, ")"));
      }
    }
  }), Array.isArray(e == null ? void 0 : e.children) && e.children.forEach(function(i) {
    de(i, t);
  });
}, ft = function(e) {
  if (e) {
    var t = {};
    pe(e, t), de(e, t), ve++;
  }
}, st = function(e) {
  var t = e.getCurrentInstance, n = e.isVue2, i = e.nextTick, r = e.onUnmounted;
  return function() {
    var a = t().proxy;
    n || Object.defineProperty(a, "$scopedSlots", {
      configurable: !0,
      value: null
    }), Object.defineProperty(a, "instanceSlots", {
      configurable: !0,
      get: function() {
        return a.$scopedSlots || a.$slots;
      }
    }), r(function() {
      i(function() {
        n || delete a.$scopedSlots, delete a.instanceSlots;
      });
    });
  };
}, lt = function() {
}, vt = function(e) {
  var t = e.onMounted, n = e.onActivated, i = e.nextTick;
  return function(r) {
    var a;
    t(function() {
      r(), i(function() {
        return a = !0;
      });
    }), n(function() {
      return a && r();
    });
  };
}, pt = function(e) {
  var t = e.computed, n = e.getCurrentInstance, i = e.inject, r = e.markRaw, a = e.nextTick, u = e.onMounted, c = e.onActivated, s = e.onUnmounted, f = e.provide, v = e.reactive, h = e.toRef;
  return function() {
    var p = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, w = p.relationKey, $ = p.relationContainer, b = p.onChange, d = p.childrenKey, g = p.delivery;
    if (!w)
      throw new Error("[TINY Error]<relationKey> must exist.");
    var C = n(), m = v({
      children: [],
      indexInParent: -1
    }), y = i(w, null), x = [];
    if (y) {
      var M = y.link, I = y.unlink, A = y.callbacks, P = y.childrenKey, T = y.delivery;
      x = A, d = d || P || "instanceChildren", g = T, m.indexInParent = M(C), s(function() {
        return I(C);
      });
    } else {
      d = d || "instanceChildren";
      var V = vt({
        onMounted: u,
        onActivated: c,
        nextTick: a
      }), L = b ? function() {
        return a(b);
      } : lt, k;
      a(function() {
        var E = typeof $ == "function" ? $() : $;
        E && (k = new MutationObserver(function(R, _) {
          var J = [];
          me(E.childNodes, J), x.forEach(function(xe) {
            return xe(J, R, _);
          }), L();
        }), k.observe(E, {
          attributes: !0,
          childList: !0,
          subtree: !0
        }));
      }), V(function() {
        return L();
      }), s(function() {
        k && (k.disconnect(), k = null), x = null;
      });
    }
    var be = function(R) {
      var _ = R.proxy;
      return m.children.push(r(_)), t(function() {
        return m.children.indexOf(_);
      });
    }, Ce = function(R) {
      var _ = m.children.indexOf(R.proxy);
      _ > -1 && m.children.splice(_, 1);
    };
    return x.push(function(E) {
      return dt(m.children, E);
    }), f(w, {
      link: be,
      unlink: Ce,
      callbacks: x,
      childrenKey: d,
      delivery: g
    }), Object.defineProperty(C.proxy, d, {
      configurable: !0,
      get: function() {
        return m.children;
      }
    }), s(function() {
      return delete C.proxy[d];
    }), {
      children: h(m, "children"),
      index: h(m, "indexInParent"),
      delivery: g
    };
  };
}, me = function(e, t) {
  e.length && e.forEach(function(n) {
    t.push(n), n.childNodes && me(n.childNodes, t);
  });
}, dt = function(e, t) {
  e.sort(function(n, i) {
    return t.indexOf(n.$el) - t.indexOf(i.$el);
  });
};
const St = "3.20.1";
var Tt = st(j(j({}, l), {}, {
  isVue2: le
})), _t = pt(j(j({}, l), {}, {
  isVue2: le
})), B = "Tiny", mt = {
  tiny_mode: String,
  tiny_mode_root: Boolean,
  tiny_template: [Function, Object],
  tiny_renderless: Function,
  tiny_theme: String,
  tiny_chart_theme: Object
}, gt = ["tiny_mode", "tiny_mode_root", "tiny_template", "tiny_renderless", "_constants", "tiny_theme", "tiny_chart_theme"], Y = function(e, t) {
  var n = function(v) {
    return ~["pc", "mobile", "mobile-first"].indexOf(v);
  }, i = Z(t), r = typeof e.tiny_mode == "string" ? e.tiny_mode : null, a = l.inject("TinyMode", null), u;
  typeof i.tiny_mode == "string" ? u = i.tiny_mode : i.tiny_mode && (u = i.tiny_mode.value), n(r) || (r = null), n(a) || (a = null), n(u) || (u = null);
  var c = r || a || u || "pc";
  e.tiny_mode_root && l.provide("TinyMode", c);
  var s = l.getCurrentInstance();
  return Object.defineProperty(s, "_tiny_mode", {
    value: c
  }), c;
}, yt = function(e, t) {
  var n = function(f) {
    return ~["tiny", "saas"].indexOf(f);
  }, i = Z(t), r = typeof e.tiny_theme == "string" ? e.tiny_theme : null, a = l.inject("TinyTheme", null), u = i.tiny_theme && i.tiny_theme.value;
  n(r) || (r = null), n(a) || (a = null), n(u) || (u = null);
  var c = r || a || u || "tiny";
  return c;
}, ht = function(e, t) {
  var n = Z(t), i = S(e.tiny_chart_theme) === "object" ? e.tiny_chart_theme : null, r = l.inject("TinyChartTheme", null), a = n.tiny_chart_theme && n.tiny_chart_theme.value, u = i || r || a || null;
  return u;
}, bt = function(e) {
  var t = e.props, n = e.context, i = e.template, r = e.extend, a = r === void 0 ? {} : r, u = Y(t, n), c = l.computed(function() {
    if (typeof t.tiny_template < "u")
      return t.tiny_template;
    var s = i(u, t);
    return typeof s == "function" ? oe(s) : s;
  });
  return ae({
    view: c,
    props: t,
    context: n,
    extend: a
  });
}, N = {
  configKey: Symbol("designConfigKey"),
  configInstance: null
}, Mt = function(e) {
  Object.keys(e).length && (l.provide(N.configKey, e), N.configInstance = e);
}, Ct = tt(N), ge = {
  designConfig: null,
  twMerge: function() {
    return "";
  }
}, q = function() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return ge.twMerge(D(t));
}, xt = function(e) {
  var t, n, i, r = e.props, a = e.context, u = e.renderless, c = e.api, s = e.extendOptions, f = s === void 0 ? {} : s, v = e.mono, h = v === void 0 ? !1 : v, p = e.classes, w = p === void 0 ? {} : p, $ = typeof r.tiny_renderless == "function" ? r.tiny_renderless : u, b = ge.designConfig || l.inject(N.configKey, {});
  b = ((t = b) === null || t === void 0 ? void 0 : t.value) || b || {};
  var d = (n = b) === null || n === void 0 || (i = n.components) === null || i === void 0 ? void 0 : i[Le().replace(B, "")], g = j(j({
    $prefix: B,
    t: X
  }, De(a, Y(r, a))), {}, {
    designConfig: d,
    globalDesignConfig: b,
    useBreakpoint: ut,
    mergeClass: q
  });
  g.vm.theme = yt(r, a), g.vm.chartTheme = ht(r, a);
  var C = $(r, l, g, f);
  typeof (d == null ? void 0 : d.renderless) == "function" && Object.assign(C, d.renderless(r, l, g, C));
  var m = {
    t: X,
    vm: g.vm,
    f: Me,
    a: ye,
    d: g.defineInstanceProperties,
    dp: g.defineParentInstanceProperties,
    gcls: function(x) {
      return Re(w, x);
    },
    m: q
  };
  return m.d({
    slots: {
      get: function() {
        return g.vm.$slots;
      },
      configurable: !0
    },
    scopedSlots: {
      get: function() {
        return g.vm.$scopedSlots;
      },
      configurable: !0
    }
  }), m.dp({
    slots: {
      get: function() {
        return g.parent.$slots;
      },
      configurable: !0
    },
    scopedSlots: {
      get: function() {
        return g.parent.$scopedSlots;
      },
      configurable: !0
    }
  }), he(), Array.isArray(c) && (Array.isArray(d == null ? void 0 : d.api) && (c = c.concat(d.api)), c.forEach(function(y) {
    var x = C[y];
    typeof x < "u" && (m[y] = x, h || g.setParentAttribute({
      name: y,
      value: x
    }));
  })), m;
};
function At(o) {
  var e = o.name, t = e === void 0 ? "Icon" : e, n = o.component;
  return function(i) {
    return Ve(nt({
      name: B + t,
      setup: function(a, u) {
        var c = u.attrs || {}, s = c.fill, f = c.width, v = c.height, h = c["custom-class"], p = c["first-color"], w = c["second-color"], $ = Object.assign({}, a, i || null), b = Y($, u), d = b === "mobile-first", g = {
          "data-tag": d ? "tiny-svg" : null
        }, C = g, m = "tiny-svg";
        d && (m = q("h-4 w-4 inline-block", h || "", $.class || ""));
        var y = Object.assign({
          style: {
            fill: s,
            width: f,
            height: v,
            "--tiny-first-color": p || "",
            "--tiny-second-color": w || ""
          },
          class: m,
          isSvg: !0
        }, C);
        if (y.nativeOn = u.listeners, ct.includes(t)) {
          var x = n.render;
          n.render = function() {
            for (var M = x.bind(this), I = arguments.length, A = new Array(I), P = 0; P < I; P++)
              A[P] = arguments[P];
            var T = M(A);
            return ft(T), T;
          };
        }
        return ae({
          component: n,
          props: $,
          context: u,
          extend: y
        });
      }
    }));
  };
}
var ye = function(e, t, n) {
  var i = {}, r = function(c) {
    var s = t.some(function(f) {
      return new RegExp(f).test(c);
    });
    (n && s || !n && !s) && (i[c] = e[c]);
  };
  for (var a in e)
    r(a);
  return i;
}, K = {}, he = function() {
  for (var e in K) {
    var t = K[e];
    typeof t.install == "function" && t.install(Ke()), typeof t.init == "function" && t.init(Ue());
  }
  K = {};
}, $t = function(e) {
  e.install = function(t) {
    t.component(e.name, e);
  };
};
const kt = {
  h: et,
  directive: qe,
  parseVnode: Qe,
  isEmptyVnode: Ye,
  useRouter: ue,
  emitter: W,
  createComponent: Ct,
  defineAsyncComponent: oe,
  filterAttrs: ye,
  initComponent: he,
  setupComponent: K,
  svg: At,
  $prefix: B,
  $props: mt,
  props: gt,
  $setup: bt,
  setup: xt,
  hooks: l,
  getElementStatusClass: ke,
  $install: $t,
  isVnode: rt
};
export {
  $t as $install,
  B as $prefix,
  mt as $props,
  bt as $setup,
  Ot as KeepAlive,
  wt as Teleport,
  Ue as appProperties,
  Ct as createComponent,
  ge as customDesignConfig,
  It as deduplicateCssClass,
  kt as default,
  oe as defineAsyncComponent,
  nt as defineComponent,
  N as design,
  qe as directive,
  W as emitter,
  ye as filterAttrs,
  ke as getElementStatusClass,
  et as h,
  l as hooks,
  he as initComponent,
  Ye as isEmptyVnode,
  rt as isVnode,
  le as isVue2,
  jt as isVue3,
  q as mergeClass,
  Qe as parseVnode,
  gt as props,
  Mt as provideDesignConfig,
  Y as resolveMode,
  yt as resolveTheme,
  xt as setup,
  K as setupComponent,
  D as stringifyCssClass,
  it as stringifyCssClassArray,
  z as stringifyCssClassObject,
  At as svg,
  ut as useBreakpoint,
  Et as useDefer,
  Tt as useInstanceSlots,
  _t as useRelation,
  ue as useRouter,
  St as version
};
