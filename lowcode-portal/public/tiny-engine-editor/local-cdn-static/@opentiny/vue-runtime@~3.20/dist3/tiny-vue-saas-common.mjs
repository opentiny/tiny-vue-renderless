import * as f from "vue";
import { openBlock as L, createElementBlock as J, createElementVNode as Y } from "vue";
function ce(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var A = 0, r = Array(e); A < e; A++)
    r[A] = t[A];
  return r;
}
function Ve(t) {
  if (Array.isArray(t))
    return ce(t);
}
function ke(t, e, A) {
  return (e = _e(e)) in t ? Object.defineProperty(t, e, {
    value: A,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = A, t;
}
function Xe(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null)
    return Array.from(t);
}
function We() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Be(t, e) {
  var A = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(t);
    e && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(t, o).enumerable;
    })), A.push.apply(A, r);
  }
  return A;
}
function G(t) {
  for (var e = 1; e < arguments.length; e++) {
    var A = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Be(Object(A), !0).forEach(function(r) {
      ke(t, r, A[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(A)) : Be(Object(A)).forEach(function(r) {
      Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(A, r));
    });
  }
  return t;
}
function ne(t) {
  return Ve(t) || Xe(t) || $e(t) || We();
}
function qe(t, e) {
  if (typeof t != "object" || !t)
    return t;
  var A = t[Symbol.toPrimitive];
  if (A !== void 0) {
    var r = A.call(t, e || "default");
    if (typeof r != "object")
      return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t);
}
function _e(t) {
  var e = qe(t, "string");
  return typeof e == "symbol" ? e : e + "";
}
function N(t) {
  "@babel/helpers - typeof";
  return N = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, N(t);
}
function $e(t, e) {
  if (t) {
    if (typeof t == "string")
      return ce(t, e);
    var A = {}.toString.call(t).slice(8, -1);
    return A === "Object" && t.constructor && (A = t.constructor.name), A === "Map" || A === "Set" ? Array.from(t) : A === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(A) ? ce(t, e) : void 0;
  }
}
var eA = Object.prototype.hasOwnProperty, AA = eA.toString;
AA.call(Object);
function ve(t) {
  var e = /* @__PURE__ */ Object.create(null);
  return function(r) {
    var o = e[r];
    return o || (e[r] = t(r));
  };
}
var rA = /-(\w)/g, tA = ve(function(t) {
  return t.replace(rA, function(e, A) {
    return A ? A.toUpperCase() : "";
  });
}), nA = ve(function(t) {
  return t.charAt(0).toUpperCase() + t.slice(1);
}), oA = /\B([A-Z])/g, iA = ve(function(t) {
  return t.replace(oA, "-$1").toLowerCase();
}), Me = function() {
  var e = {}, A = function(n, i) {
    var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
    if (n && typeof n == "string" && typeof i == "function") {
      var l = e[n] || [];
      e[n] = l, l.push(i), i.once = a;
    }
  }, r = {
    emit: function(n) {
      var i = arguments, a = e[n];
      a && (a.forEach(function(l) {
        return l.apply(null, [].slice.call(i, 1));
      }), e[n] = a.filter(function(l) {
        return !l.once;
      }));
    },
    on: A,
    once: function(n, i) {
      A(n, i, !0);
    },
    off: function(n, i) {
      if (n && typeof n == "string") {
        var a = e[n];
        typeof i == "function" ? e[n] = a.filter(function(l) {
          return l !== i;
        }) : delete e[n];
      } else
        e = {};
    }
  };
  return r;
}, aA = function(e) {
  var A = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = {};
  for (var o in e)
    o.indexOf("_") !== 0 && (r[o] = e[o]);
  for (var n in A)
    r[n] = A[n];
  return r;
}, Yt = function(e, A) {
  if (!(!e || !A)) {
    var r = [];
    typeof e == "string" ? r.push(e) : Array.isArray(e) && (r = e);
    var o = [];
    typeof A == "string" ? o.push(A) : Array.isArray(A) && (o = A);
    var n = [];
    return o.forEach(function(i) {
      return r.forEach(function(a) {
        return n.push("".concat(i, ":").concat(a, "-").concat(i));
      });
    }), r.concat(n).join(" ");
  }
}, lA = function() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, A = arguments.length > 1 ? arguments[1] : void 0;
  if (N(A) === "object") {
    var r = Array.isArray(A) ? A : Object.keys(A).filter(function(n) {
      return A[n];
    }), o = "";
    return r.forEach(function(n) {
      e[n] && (o += "".concat(e[n], " "));
    }), o;
  } else
    return e[A] || "";
}, Ot = f.Teleport, sA = f.defineAsyncComponent, cA = f.markRaw, Te = function(e) {
  var A = e.view, r = A === void 0 ? void 0 : A, o = e.component, n = o === void 0 ? void 0 : o, i = e.props, a = e.context, l = a.attrs, s = a.slots, c = e.extend, u = c === void 0 ? {} : c;
  return function() {
    return f.h(r && r.value || n, G(G(G({
      ref: "modeTemplate"
    }, i), l), u), s);
  };
}, he = function(e) {
  var A = f.getCurrentInstance();
  return e && De(A), A == null ? void 0 : A.appContext.config.globalProperties;
}, uA = function() {
  var e, A = f.getCurrentInstance(), r = A == null || (e = A.type) === null || e === void 0 ? void 0 : e.name;
  if (!r) {
    var o, n;
    r = A == null || (o = A.parent) === null || o === void 0 || (n = o.type) === null || n === void 0 ? void 0 : n.name;
  }
  return r || "";
}, dA = function() {
  var e;
  return ((e = f.getCurrentInstance()) === null || e === void 0 ? void 0 : e.appContext) || {
    component: function() {
    }
  };
}, fA = function() {
  var e = f.getCurrentInstance();
  return (e == null ? void 0 : e.appContext.config.globalProperties) || {};
}, pA = function() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : f.getCurrentInstance(), A = e == null ? void 0 : e.appContext.config.globalProperties.$router, r = A && A.currentRoute.value;
  return {
    route: r,
    router: A
  };
}, De = function(e) {
  var A = Me();
  typeof e.$emitter > "u" && Object.defineProperty(e, "$emitter", {
    get: function() {
      return A;
    }
  });
}, gA = function(e) {
  var A = function(o, n, i, a) {
    var l = o.subTree && o.subTree.children || o.children;
    Array.isArray(l) && l.forEach(function(s) {
      var c = s.type && s.type.componentName, u = s.component;
      c === n ? (u.emit(i, a), u.$emitter && u.$emitter.emit(i, a)) : A(s, n, i, a);
    });
  };
  return {
    dispatch: function(o, n, i) {
      for (var a = e.parent || e.root, l = a.type && a.type.componentName; a && (!l || l !== o); )
        a = a.parent, a && (l = a.type && a.type.componentName);
      if (a) {
        var s, c;
        (s = a).emit.apply(s, ne([n].concat(i))), a.$emitter && (c = a.$emitter).emit.apply(c, ne([n].concat(i)));
      }
    },
    broadcast: function(o, n, i) {
      A(e, o, n, i);
    }
  };
}, oe = function(e) {
  if (e && e.parent)
    return e.parent.type.name === "AsyncComponentWrapper" && e.parent.parent ? e.parent.parent : e.parent;
}, mA = function(e) {
  return function(A) {
    var r = oe(e), o = 0, n = function(a) {
      return {
        level: o,
        vm: Z({}, a),
        el: a.vnode.el,
        options: a.type
      };
    };
    if (typeof A != "function")
      return r ? n(r) : {};
    for (o++; r && !A(n(r)); )
      r = oe(r), o++;
  };
}, vA = function(e) {
  return function(A) {
    if (typeof A != "function")
      return je(e.subTree);
    var r = 1, o = function(i) {
      if (i) {
        var a = i.children || i.dynamicChildren, l = r++;
        if (Array.isArray(a)) {
          if (a.some(function(s) {
            return s.component && A({
              level: l,
              vm: Z({}, s.component),
              el: s.el,
              options: s.type,
              isLevel1: !0
            });
          }))
            return;
          a.forEach(function(s) {
            return o(s);
          });
        }
      }
    };
    o(e.subTree);
  };
}, hA = /^on[A-Z]/, bA = function(e) {
  var A = {}, r = {};
  for (var o in e) {
    var n = e[o];
    if (hA.test(o) && typeof n == "function") {
      r[iA(o.substr(2))] = n;
      continue;
    }
    A[o] = n;
  }
  return {
    $attrs: A,
    $listeners: r
  };
}, je = function(e) {
  var A = [];
  if (A.refs = {}, e) {
    var r = e.dynamicChildren || e.children;
    Array.isArray(r) ? r.forEach(function(o) {
      if (o.component) {
        var n = Z({}, o.component);
        A.push(n), o.props.ref && (A.refs[o.props.ref] = n);
      }
    }) : e.component && A.push(Z({}, e.component));
  }
  return A;
}, ae = function(e, A, r, o) {
  var n = function(l) {
    if (typeof o == "function" && o(l))
      return 1;
    Object.defineProperty(e, l, {
      configurable: !0,
      enumerable: !0,
      get: function() {
        return A[r][l];
      },
      set: function(c) {
        return A[r][l] = c;
      }
    });
  };
  for (var i in A[r])
    n(i);
  return e;
}, xe = function(e) {
  return e.indexOf("_") === 0;
}, Re = function(e, A) {
  return ae(e, A, "setupState", null), ae(e, A, "props", xe), ae(e, A, "ctx", xe), e;
}, Z = function(e, A) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null, o = bA(A.attrs), n = o.$attrs, i = o.$listeners, a = A.$emitter;
  a || (De(A), a = A.$emitter);
  var l = function() {
    for (var u = arguments.length, p = new Array(u), d = 0; d < u; d++)
      p[d] = arguments[d];
    A.emit.apply(A, p), a.emit.apply(e, p);
  }, s = function(u, p, d) {
    return u[p] = d;
  };
  return r || Re(e, A), Object.defineProperties(e, {
    $attrs: {
      get: function() {
        return n;
      }
    },
    $children: {
      get: function() {
        return je(A.subTree);
      }
    },
    $constants: {
      get: function() {
        return A.props._constants;
      }
    },
    $emit: {
      get: function() {
        return l;
      }
    },
    $el: {
      get: function() {
        return A.vnode.el;
      }
    },
    $listeners: {
      get: function() {
        return i;
      }
    },
    $mode: {
      get: function() {
        return A._tiny_mode;
      }
    },
    $nextTick: {
      get: function() {
        return f.nextTick;
      }
    },
    $off: {
      get: function() {
        return a.off;
      }
    },
    $on: {
      get: function() {
        return a.on;
      }
    },
    $once: {
      get: function() {
        return a.once;
      }
    },
    $options: {
      get: function() {
        return {
          componentName: A.type.componentName
        };
      }
    },
    $parent: {
      get: function() {
        return A.parent && Z({}, oe(A));
      }
    },
    $refs: {
      get: function() {
        return A.refs;
      }
    },
    $renderless: {
      get: function() {
        return A.props.tiny_renderless;
      }
    },
    $scopedSlots: {
      get: function() {
        return A.slots;
      }
    },
    $set: {
      get: function() {
        return s;
      }
    },
    $slots: {
      get: function() {
        return A.slots;
      }
    },
    $template: {
      get: function() {
        return A.props.tiny_template;
      }
    }
  }), e;
}, yA = function(e, A) {
  for (var r in e.refs)
    Object.prototype.hasOwnProperty.call(e.refs, r) && (A[r] = e.refs[r]);
}, wA = function(e, A) {
  var r, o, n = f.getCurrentInstance(), i = n == null ? void 0 : n.appContext.config.globalProperties, a = pA(n), l = a.route, s = a.router, c = n == null || (r = n.proxy) === null || r === void 0 || (o = r.$root) === null || o === void 0 ? void 0 : o.$i18n, u = gA(n), p = u.dispatch, d = u.broadcast, v = mA(n), w = vA(n), m = Z({}, n, e), h = e.emit, b = {}, E = typeof n.props.tiny_template > "u" && oe(n), B = E ? Z({}, E) : n.parent ? Z({}, n.parent) : null, C = function(Q) {
    var P, D = Q.name, y = Q.value, O = E ? E.ctx : n == null || (P = n.parent) === null || P === void 0 ? void 0 : P.ctx;
    O[D] = y, B[D] = y;
  }, I = function(Q) {
    Object.defineProperties(m, Q), Object.defineProperties(n == null ? void 0 : n.ctx, Q);
  }, K = function(Q) {
    B && Object.defineProperties(B, Q);
  };
  return f.onBeforeMount(function() {
    return Re(m, n);
  }), f.onMounted(function() {
    return yA(n, b);
  }), {
    framework: "vue3",
    vm: m,
    emit: h,
    emitter: Me,
    route: l,
    router: s,
    dispatch: p,
    broadcast: d,
    parentHandler: v,
    childrenHandler: w,
    i18n: c,
    refs: b,
    slots: n == null ? void 0 : n.slots,
    scopedSlots: n == null ? void 0 : n.slots,
    attrs: e.attrs,
    parent: B,
    nextTick: f.nextTick,
    constants: n == null ? void 0 : n.props._constants,
    mode: A,
    isPCMode: A === "pc",
    isMobileMode: A === "mobile",
    service: i == null ? void 0 : i.$service,
    getService: function() {
      return i == null ? void 0 : i.$getService(m);
    },
    setParentAttribute: C,
    defineInstanceProperties: I,
    defineParentInstanceProperties: K
  };
}, le = function(e, A, r) {
  if (typeof e[A] < "u") {
    var o = e[A];
    e[r] = function(n, i, a) {
      a.context = i.instance, o(n, i, a);
    }, delete e[A];
  }
}, Ft = function(e) {
  for (var A in e) {
    var r = e[A];
    le(r, "bind", "beforeMount"), le(r, "update", "updated"), le(r, "unbind", "unmounted");
  }
  return e;
}, zt = function(e) {
  return e;
}, BA = f.Text, xA = f.Comment, Lt = function(e) {
  return !e || !e.type || [BA, xA].includes(e.type);
}, CA = function(e) {
  var A = {};
  for (var r in e)
    if (r === "class" || r === "style")
      A[r] = e[r];
    else if (r === "on" || r === "nativeOn") {
      var o = e[r];
      for (var n in o)
        A["on".concat(nA(tA(n)))] = o[n];
    } else if (r === "attrs" || r === "props" || r === "domProps") {
      var i = e[r];
      for (var a in i)
        A[a] = i[a];
    } else
      A[r] = e[r];
  return A;
}, EA = function(e) {
  var A = e, r = !1;
  if (typeof e == "string" && typeof document < "u") {
    var o = document.createElement(e), n = ["SVG", "CIRCLE", "PATH"];
    o instanceof HTMLUnknownElement && !n.includes(o.nodeName) || e.includes("-") ? (e = e.toLowerCase(), r = !0, e === "transition" ? A = f.Transition : e === "transition-group" ? A = f.TransitionGroup : A = f.resolveComponent(e)) : A = e;
  }
  return {
    type: A,
    component: e,
    customElement: r
  };
}, Jt = function(e, A, r) {
  var o = {}, n = r, i = EA(e), a = i.customElement, l = i.type;
  return e = i.component, A && N(A) === "object" && !Array.isArray(A) ? (o = CA(A), A.scopedSlots && (n = A.scopedSlots)) : (typeof A == "string" || Array.isArray(A)) && (r = A), (typeof r == "string" || Array.isArray(r)) && (n = typeof e != "string" || a ? function() {
    return r;
  } : r), f.h(l, o, n);
}, IA = function(e) {
  return function(A) {
    var r = A.component, o = A.propsData, n = A.el, i = Object.assign(r, {
      provide: ke({}, e.configKey, e.configInstance)
    }), a = f.createVNode(i, o);
    return f.render(a, n), Z({}, a.component);
  };
}, QA = f.defineComponent, Se = !1, Vt = !0, Xt = f.isVNode, Wt = f.KeepAlive;
const PA = {
  "en-US": "英语",
  "zh-CN": "中文",
  "zh-TW": "中国台湾",
  hello: "你好 {name}",
  code: "zh-CN",
  yes: "是",
  no: "否",
  ui: {
    input: {
      close: "关闭",
      more: "更多",
      detail: "详细信息"
    },
    numeric: {
      equalTo: "等于",
      notEqualTo: "不等于",
      moreThan: "大于",
      moreThanOrEqualTo: "大于等于",
      lessThan: "小于",
      lessThanOrEqualTo: "小于等于",
      empty: "为空",
      nonEmpty: "不为空"
    },
    queryBuilder: {
      addItem: "新增条件",
      addGroup: "新增子条件组",
      removeGroup: "移除条件组"
    },
    wizard: {
      previousStep: "上一步",
      nextStep: "下一步",
      save: "保存",
      submit: "提交"
    },
    linkMenu: {
      title: "消息",
      placeholder: "请输入关键字过滤...",
      sure: "确定",
      cancel: "取消"
    },
    todoList: {
      add: "提交",
      placeholder: "请输入内容..."
    },
    alert: {
      error: "错误",
      info: "消息",
      success: "成功",
      title: "消息提示",
      warning: "警告"
    },
    amount: {
      currency: "币种",
      amount: "金额",
      date: "日期",
      equalTo: "等于",
      notEqualTo: "不等于",
      moreThan: "大于",
      moreThanOrEqualTo: "大于等于",
      lessThan: "小于",
      lessThanOrEqualTo: "小于等于",
      empty: "为空",
      nonEmpty: "不为空"
    },
    actionMenu: {
      moreText: "更多"
    },
    base: {
      all: "全部",
      cancel: "取消",
      confirm: "确定",
      delete: "删除",
      edit: "编辑",
      more: "更多",
      reset: "重置",
      clear: "清空",
      comma: "，"
    },
    button: {
      cancel: "取消",
      confirm: "确定"
    },
    buttonGroup: {
      noData: "暂无数据"
    },
    buttonMessage: {
      cancel: "取消",
      confirm: "确定"
    },
    cell: {
      placeholder: "请选择"
    },
    cascader: {
      noMatch: "无匹配数据",
      loading: "加载中",
      placeholder: "请选择",
      noData: "暂无数据"
    },
    chart: {
      auxiliary: "辅助",
      emptyText: "暂无数据",
      kName: "日K",
      other: "其他",
      summation: "总量",
      total: "总计",
      value: "数值"
    },
    colorSelectPanel: {
      confirm: "选择",
      cancel: "取消",
      predefine: "预定义颜色",
      history: "历史记录",
      empty: "暂无"
    },
    crop: {
      choose: "选择图片",
      zoomOut: "缩小10%",
      zoomIn: "放大10%",
      rotate_45: "逆时针旋转45°",
      rotate45: "顺时针旋转45°",
      closeCropArea: "隐藏选区",
      reset: "重置视图",
      closeCrop: "退出裁剪",
      cropImage: "选择区域"
    },
    datepicker: {
      clear: "清空",
      cancel: "取消",
      endDate: "结束日期",
      confirm: "确定",
      month: "月",
      endTime: "结束时间",
      month2: "2 月",
      month1: "1 月",
      month4: "4 月",
      month3: "3 月",
      month6: "6 月",
      month5: "5 月",
      month8: "8 月",
      month7: "7 月",
      month10: "10 月",
      month9: "9 月",
      month12: "12 月",
      month11: "11 月",
      months: {
        feb: "二月",
        jan: "一月",
        apr: "四月",
        mar: "三月",
        jun: "六月",
        may: "五月",
        aug: "八月",
        jul: "七月",
        oct: "十月",
        sep: "九月",
        dec: "十二月",
        nov: "十一月"
      },
      nextYear: "后一年",
      nextMonth: "下个月",
      prevMonth: "上个月",
      now: "此刻",
      selectDate: "选择日期",
      prevYear: "前一年",
      startDate: "开始日期",
      selectTime: "选择时间",
      today: "今天",
      currentMonth: "本月",
      startTime: "开始时间",
      week: "周次",
      weeks: {
        mon: "一",
        sun: "日",
        wed: "三",
        tue: "二",
        fri: "五",
        thu: "四",
        sat: "六"
      },
      timezone: "选择时区",
      year: "年",
      hour: "时",
      minute: "分",
      second: "秒",
      to: "至",
      yearMonth: "{year}年{month}月",
      yearMonthDay: "{year}年{month}月{day}日"
    },
    richTextEditor: {
      bold: "加粗",
      italic: "斜体",
      link: "链接",
      unlink: "移除链接",
      highlight: "高亮",
      underline: "下划线",
      strike: "中划线",
      subscript: "下标",
      superscript: "上标",
      code: "代码",
      unorderedlist: "无序列表",
      orderedlist: "有序列表",
      taskList: "任务列表",
      quote: "引用",
      codeBlock: "代码块",
      formatClear: "清除标记",
      nodeDelete: "删除节点",
      undo: "回退",
      redo: "前进",
      left: "左对齐",
      center: "居中",
      right: "右对齐",
      fontSize: "字号",
      lineHeight: "行高",
      hBox: "段落标题",
      img: "图片",
      color: "颜色",
      table: "表格",
      backgroundColor: "文字背景色",
      localResources: "本地资源",
      resourceLink: "资源链接"
    },
    calendar: {
      showType: {
        year: "年"
      }
    },
    dept: {
      code: "编码",
      company: "公司",
      dept1: "一级部门",
      dept2: "二级部门",
      dept3: "三级部门",
      dept4: "四级部门",
      dept5: "五级部门",
      dept6: "六级部门",
      dept7: "七级部门",
      dept8: "八级部门",
      input: "可输入部门编码或名称",
      name: "名称",
      search: "辅助查询",
      selected: "已选"
    },
    dialogBox: {
      confirm: "确定",
      cancel: "取消"
    },
    load: {
      dot: "加载中"
    },
    exception: {
      build: "模块正在建设中",
      busy: "系统繁忙，请稍等一下",
      noperm: "茫茫大海，找不到页面",
      weaknet: "网络不给力",
      pcview: "请到PC上查看文件",
      nodata: "休息一下",
      create: "创建",
      provide: "TINY 开发团队提供",
      nodatamf: "暂无数据",
      nopermmf: "无访问权限",
      weaknetmf: "网络异常",
      noresult: "无相关搜索结果",
      nonews: "暂无最新消息",
      pagenoperm: "403:无访问权限",
      pageweaknet: "网络异常",
      pagenothing: "404:你访问的页面不存在",
      pageservererror: "500:服务器异常"
    },
    fileUpload: {
      largefile: "文件过大，将会分片上传，请耐心等待!",
      folder: "文件所在文件夹层数已超过 5 层，将不会上传该文件",
      init: "服务报错，请重试",
      token: "请先进行 EDM 鉴权，获取 token",
      exceed: "文件大小超过限制（{maxSize}）",
      largeFile: "文件大小超出限制 2G ！！",
      fileSize: "文件大小低于限制（{minSize}{sizeUnit}）",
      deleteTip: "按 delete 键可删除",
      downloadFile: "下载文件",
      previewFile: "预览文件",
      updateFile: "更新文件",
      reUploadFile: "重新上传",
      cancelFile: "取消上传",
      deleteFile: "删除文件",
      empty: "是空文件！",
      kiaScanTip: "抱歉，从公网接入下载文档，需要通过KIA检测；当前文档正在KIA检测中，请稍后几分钟后再下载！",
      fileNameExceeds: "超过255个字符，请修改文件名。",
      fileName: "该文件名",
      calcHash: "文档正在计算加密中",
      uploadFile: "文件上传",
      downloadAll: "全部下载",
      onlySupport: "支持{type}格式文件",
      fileNotLessThan: "单个文件不能小于",
      fileNotMoreThan: "单个文件不能超过",
      fileSizeRange: "单个文件大小需在{moreThan}~{lessThan}之间",
      notSupport: "格式（.{format}）暂不支持",
      notSupportNoSuffix: "暂不支持无后缀文件",
      notSupportSpecialCharacters: "文件名包含特殊字符，请重命名后上传",
      attachment: "附件",
      uploadList: "上传列表",
      numberExceed: "批量上传个数超过限制（{number}）",
      numberLimit: "最多上传{number}个文件",
      encryptDialogTitle: "水印及加密设置",
      addWatermark: "添加水印",
      encrypted: "加密",
      docPreview: "文档预览",
      networkError: "网络出错",
      pictureNetworkError: "网络出错，上传失败",
      reUploadTip: "{number}个文件上传失败！"
    },
    uploadList: {
      pictureUploading: "图片上传中",
      uploadFailed: "上传失败",
      uploading: "上传中",
      download: "下载",
      reUpload: "重新上传",
      delete: "删除",
      noAttachments: "暂无附件",
      cancel: "取消",
      preview: "预览",
      releaseAndUpload: "释放鼠标，上传文件",
      dragOrClickImport: "将文件拖到此处，或点击导入",
      shoot: "拍摄",
      selectFromAlbum: "从相册选择",
      uploadFailedAndReupload: "上传失败，点击重新上传"
    },
    upload: {
      addPicture: "添加图片",
      addAudio: "添加音频",
      addVideo: "添加视频"
    },
    grid: {
      dataUnchanged: "数据未改动！",
      deleteSelectRecord: "您确定要删除所选记录吗？",
      emptyText: "暂无数据",
      error: {
        delRevert: "方法 revert 已废弃，请使用 revertData",
        groupFixed: "如果使用分组表头，固定列必须在左右两侧",
        notDelete: "Delete 方法不存在",
        notQuery: "query 方法不存在",
        notResizable: "横向虚拟滚动不支持 resizable",
        notSave: "save 方法不存在",
        reqModule: "缺少 {{name}} 模块",
        rowIdEmpty: "参数 row-id 不允许为空",
        scrollYHeight: "启用虚拟滚动必须要设置 height 或 max-height",
        toolbarId: "工具栏需要设置唯一 id",
        treeFixedExpand: "树结构的固定列与展开行功能有冲突",
        treeInsert: "树结构不支持 insert 操作",
        treeRemove: "树结构不支持 remove 操作",
        unableInsert: "无法插入到指定位置",
        notAllowDragSelf: "不允许自己给自己拖动",
        notAllowDragFixed: "固定列不允许拖动",
        remoteMethod: "个性化模板管理远端存储需要设置 multipleHistory.remoteMethod",
        remoteSelectedMethod: "个性化模板管理远端存储需要设置 multipleHistory.remoteSelectedMethod",
        chainCallError: "列的默认插槽中存在语法错误，请检查。",
        renderParamError: "期望配置一个生成 VNode 的渲染方法。",
        classComponentError: "类组件渲染出错。",
        groupColumnFixedError: "同一个分组内不能设置不同的固定类型。",
        missingValueFormat: "渲染器无法格式化日期字符串，需要提供 valueFormat 源日期格式配置。",
        clipboardWriteError: "剪切板写入错误"
      },
      filter: {
        allSelect: "(全选)",
        endDate: "结束日期",
        startDate: "开始日期",
        dateTips: "请至少输入一个日期",
        clear: "清除当前列筛选",
        clearAll: "清除所有列筛选",
        confirmFilter: "筛选",
        empty: "为空",
        emptyText: "暂无数据",
        equal: "等于",
        include: "包含",
        prefix: "开头是",
        resetFilter: "重置",
        unempty: "不为空"
      },
      individuation: {
        cancelBtn: "取消",
        colConfigs: {
          visible: "显示",
          invisible: "隐藏",
          asc: "正序",
          desc: "倒序",
          unsorted: "未排序",
          frozenLeft: "左冻结",
          frozenRight: "右冻结",
          unfrozen: "未冻结",
          unfreeze: "取消冻结",
          unsort: "取消排序"
        },
        toolbar: {
          set: "设置",
          selected: "已选",
          freeze: "冻结",
          sort: "排序",
          clear: "清空",
          search: "搜索",
          all: "全选"
        },
        columnSet: "列设置",
        overwriteSave: "覆盖保存",
        saveAs: "另存为",
        saveTemplate: "存模板",
        selectTemplate: "选择模板",
        hideMsg: "至少保留一列显示",
        maxFreezeNumMsg: "冻结列不可超过6项",
        defaultTemplateName: "请输入名称，如未填写由系统按时间生成",
        reserveTemplateName: "如未填写名称将保留之前的名称",
        resetBtn: "重置",
        saveBtn: "确定",
        hideAll: "全部隐藏",
        showAll: "全部显示",
        tabs: {
          base: {
            title: "基础设置",
            tips: "点击图标按钮设置个性化"
          },
          other: {
            title: "其他设置",
            tips: "设置服务器排序或客户端排序、每页条数大小。",
            sortType: "排序类型",
            currPageSort: "当前页数据排序",
            allDataSort: "所有数据排序",
            pageSize: "每页条数"
          }
        },
        title: "个性化设置",
        switchtitle: "模板管理",
        switchsave: "保存配置",
        switchlabel: "配置列表：",
        switchapply: "使用",
        switchedit: "编辑",
        switchdel: "删除",
        switchconfirm: "确定",
        switchdelconfirm: "删除确认",
        switchonlytemp: "保存模板",
        switchtempapply: "保存并使用模板",
        switchtempoverwrite: "覆盖并使用模板",
        switchdelcon: "确定要删除这个模板？",
        switchdelyes: "确定",
        switchdelno: "取消",
        switchapplycon: "确定要使用这个模板？"
      },
      removeSelectRecord: "您确定要移除所选记录吗？",
      saveSuccess: "保存成功",
      selectOneRecord: "请至少选择一条记录！",
      isSaveMsg: "有修改的数据，是否要保存？"
    },
    hrapprover: {
      approver: "权签人",
      noselected: "没有选择权签人",
      noapprover: "没有权签人",
      remark: "备注"
    },
    imageViewer: {
      loadErrorAlt: "加载失败",
      save: "保存图片",
      del: "删除图片",
      thumbnail: "缩略图",
      menu: "目录",
      hide: "隐藏侧边栏",
      show: "显示侧边栏"
    },
    navMenu: {
      moreText: "更多"
    },
    logout: {
      in: "登录",
      out: "注销"
    },
    page: {
      goto: "前往",
      item: "条",
      next: "下一页",
      page: "条/页",
      pageClassifier: "页",
      pagesize: "条/页",
      prev: "上一页",
      total: "共",
      totals: "总条数：",
      jump: "跳至",
      hundredThousand: "10万+",
      million: "100万+",
      tenMillion: "1千万+",
      loadingTotals: "加载总条数…"
    },
    popeditor: {
      cancel: "取 消",
      confirm: "确 认",
      historyLists: "历史数据列表",
      reset: "重 置",
      search: "查 询",
      selectionLists: "选择数据列表",
      sourceLists: "所有数据列表",
      title: "选择",
      filterNode: "输入内容进行筛选"
    },
    popupload: {
      fileName: "文件名",
      fileSize: "文件大小",
      fileStatus: "文件状态",
      uploadError: "上传失败",
      dialogTitle: "文件上传",
      cancelButtonText: "取消",
      tipsFileText: "上传提示",
      saveButtonText: "开始上传",
      uploadSuccess: "上传成功！",
      uploadButtonText: "选择文件",
      uploadsButtonText: "选择批量文件",
      errorTypeTips: "上传文件类型不匹配",
      errorNumTips: "上传文件数量超出限制,已取消该操作",
      errorSizeTips: "上传文件大小超出限制",
      confirmDeleteTips: "确定要删除该文件吗？",
      delete: "删除",
      waitUpload: "等待上传",
      operation: "操作",
      success: "上传成功",
      listTip: "共{0}条数据：",
      errorListTip: "其中{0}条出错，请修改后重试",
      limitUploadFileNumber: "上传文件数限制为",
      limitUploadFileType: "上传文件类型限制为",
      limitUploadFileSize: "上传文件大小不超过"
    },
    rate: {
      level: {
        average: "一般",
        excellent: "很好",
        fair: "差",
        good: "好",
        poor: "很差"
      }
    },
    select: {
      loading: "加载中",
      noMatch: "无匹配数据",
      noData: "暂无相关数据",
      placeholder: "请选择",
      pleaseSearch: "请搜索",
      search: "搜索",
      selected: "已选",
      selectedNum: "已选 {num} 个",
      noSearchData: "无相关搜索结果，请重新输入",
      add: "新增",
      collapse: "收起"
    },
    search: {
      placeholder: "搜索"
    },
    signature: {
      confirm: "确认",
      rewrite: "重写",
      cancel: "取消",
      tips: "请手写签名",
      resign: "重新签名",
      placeholder: "请在此签名（必填）"
    },
    tabs: {
      moreItem: "更多"
    },
    tag: {
      add: "添加"
    },
    toggleMenu: {
      placeholder: "请输入内容进行筛选"
    },
    treeMenu: {
      placeholder: "输入关键字搜索"
    },
    transfer: {
      filterPlaceholder: "请输入搜索内容",
      hasCheckedFormat: "已选 {checked}/{total} 项",
      noCheckedFormat: "共 {total} 项",
      noData: "无数据",
      noMatch: "无匹配数据",
      titles: ["列表 1", "列表 2"]
    },
    tree: {
      loading: "加载中",
      emptyText: "暂无数据",
      switchText: "同时勾选下级",
      edit: "编辑",
      delete: "删除",
      addChild: "新增下级",
      newNodeTitle: "新增下级",
      deleteTip1: "删除后数据不可恢复，确定删除吗？",
      deleteTip2: "该节点存在下级节点，是否保留下级节点数据？",
      deleteTip3: "保留下级节点数据"
    },
    usercard: {
      address: "地址",
      collapse: "收起",
      email: "邮箱",
      empno: "工号",
      expand: "展开",
      fax: "传真",
      internal: "内线",
      manager: "主管",
      mobile: "手机",
      other: "其他",
      phone: "固定电话",
      timezone: "时区",
      travelcode: "出差联系信息",
      viop: "VIOP"
    },
    richText: {
      bold: "加粗",
      italic: "倾斜",
      underline: "下划线",
      header: "段落格式",
      strike: "删除线",
      blockquote: "块引用",
      codeBlock: "插入代码段",
      size: "字体大小",
      listOrdered: "编号列表",
      listBullet: "项目列表",
      header1: "h1",
      header2: "h2",
      align: "对齐方式",
      color: "字体颜色",
      background: "背景颜色",
      image: "图像",
      video: "视频",
      link: "添加链接",
      formula: "插入公式",
      clean: "清除格式",
      indent1: "向左缩进",
      indent2: "向右缩进",
      pickerLabel: "标题大小",
      headerPicker1: "标题一",
      headerPicker2: "标题二",
      headerPicker3: "标题三",
      headerPicker4: "标题四",
      headerPicker5: "标题五",
      headerPicker6: "标题六",
      normal: "标准",
      sizeSmall: "小号",
      sizeLarge: "大号",
      sizeHuge: "超大号",
      alignPicker1: "居左对齐",
      alignPicker2: "居中对齐",
      alignPicker3: "居右对齐",
      alignPicker4: "两端对齐",
      subScript: "下标",
      superScript: "上标",
      directionRTL: "从右到左",
      font: "字体",
      file: "文件",
      betterTable: "表格",
      fullscreen: "全屏",
      insertColumnRight: "右插入列",
      insertColumnLeft: "左插入列",
      insertRowUp: "上插入行",
      insertRowDown: "下插入行",
      mergeCells: "合并单元格",
      unmergeCells: "拆分单元格",
      deleteColumn: "删除当前列",
      deleteRow: "删除当前行",
      deleteTable: "删除表格",
      colorPicker: "背景颜色",
      placeholder: "在此处插入文本...",
      maxLength: "文本长度超过限制，支持的最大长度是 "
    },
    fluentEditor: {
      undo: "撤销",
      redo: "重做",
      lineheight: "行高"
    },
    steps: {
      done: "已完成",
      doing: "进行中",
      wait: "等待中"
    },
    actionSheet: {
      cancel: "取消"
    },
    image: {
      loadFail: "加载失败"
    },
    miniPicker: {
      cancel: "取消",
      confirm: "确定"
    },
    pullRefresh: {
      pullingDown: "下拉即可刷新",
      pullingUp: "上拉即可刷新",
      pulling: "下拉即可刷新",
      loosing: "释放即可刷新",
      success: "刷新成功",
      failed: "刷新失败",
      noMore: "没有更多了"
    },
    currency: {
      defaultCurrency: "默认币种",
      setDefault: "设为默认",
      chooseCurrency: "选择币种"
    },
    calendarBar: {
      week: {
        0: "日",
        1: "一",
        2: "二",
        3: "三",
        4: "四",
        5: "五",
        6: "六"
      },
      year: "%s年",
      yearMonth: "%y年%m月",
      month: {
        1: "1月",
        2: "2月",
        3: "3月",
        4: "4月",
        5: "5月",
        6: "6月",
        7: "7月",
        8: "8月",
        9: "9月",
        10: "10月",
        11: "11月",
        12: "12月"
      },
      monthAbbr: {
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
        10: "10",
        11: "11",
        12: "12"
      }
    },
    calendarView: {
      week: {
        0: "日",
        1: "一",
        2: "二",
        3: "三",
        4: "四",
        5: "五",
        6: "六"
      },
      weekDays: {
        0: "周日",
        1: "周一",
        2: "周二",
        3: "周三",
        4: "周四",
        5: "周五",
        6: "周六"
      },
      backToday: "回今天",
      new: "新增",
      noSchedule: "暂无日程",
      year: "年",
      month: "月",
      dateFormat: "yyyy 年 MM 月"
    },
    selectedBox: {
      select: "已选（%s）",
      allSelect: "已全选（%s）",
      clear: "清空",
      noData: "暂无数据"
    },
    record: {
      record: "录音",
      cancel: "取消",
      confirm: "确定",
      clickToStartRecording: "点击开始录音",
      clickToResumeRecording: "点击继续录音"
    },
    dialogSelect: {
      treeSearch: "请输入关键字并回车"
    },
    loadList: {
      errorText: "出错了",
      loadingText: "加载中...",
      finishedText: "没有更多了"
    }
  },
  validation: {
    array: {
      len: "%s 的长度必须为 %s",
      min: "%s 长度不能小于 %s",
      max: "%s 的长度不能大于 %s",
      range: "%s 的长度必须介于 %s 和 %s 之间"
    },
    date: {
      format: "%s 日期 %s 对于格式 %s 无效",
      invalid: "%s 日期 %s 无效",
      parse: "无法分析 %s 日期， %s 无效"
    },
    default: "%s 字段校验错误",
    enum: "%s 必须是 %s 中的一个",
    number: {
      len: "%s 必须等于 %s",
      min: "%s 不能小于 %s",
      max: "%s 不能大于 %s",
      range: "%s 必须介于 %s 和 %s 之间"
    },
    pattern: {
      mismatch: "%s 值%s 与模式 %s 不匹配"
    },
    required: "必填",
    string: {
      len: "%s 必须是 %s 个字符",
      min: "%s 必须至少为 %s 个字符",
      max: "%s 不能大于 %s 个字符",
      range: "%s 必须介于 %s 和 %s 个字符之间"
    },
    types: {
      acceptFile: "只接受文件",
      acceptImg: "只接受图片格式",
      array: "非法数组",
      boolean: "非法布尔值",
      date: "不符合规则的日期格式",
      dateTime: "不符合规则的日期时间格式",
      dateYM: "不符合规则的日期格式(yyyy-mm)",
      dateYMD: "不符合规则的日期格式(yyyy-MM-dd)",
      digits: "非法纯数字",
      email: "非法邮件地址",
      fileSize: "文件大小的格式不正确,应如 3kb",
      float: "非法浮点数",
      hex: "非法十六进制",
      integer: "非法整数",
      longDateTime: "不符合规则的长日期格式",
      method: "必须是函数（Function）",
      number: "非法数字",
      object: "非法对象",
      regexp: "非法正则表达式",
      specialch: "只能包含数字、字母、下划线、横杠、点号",
      specialch2: "只能包含数字、字母、下划线、横杠",
      speczh: "只能包含数字、字母、下划线、汉",
      string: "非法字符串",
      time: "不符合规则的时间格式",
      url: "非法 URL 地址",
      version: "非法版本格式"
    },
    whitespace: "%s 不能为空"
  }
};
var kA = /(%|)\{([0-9a-zA-Z_]+)\}/g;
function MA(t) {
  for (var e = arguments.length, A = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++)
    A[r - 1] = arguments[r];
  return A.length === 1 && N(A[0]) === "object" && (A = A[0]), (!A || !A.hasOwnProperty) && (A = {}), t.replace(kA, function(o, n, i, a) {
    var l;
    return t[a - 1] === "{" && t[a + o.length] === "}" ? i : (l = Object.prototype.hasOwnProperty.call(A, i) ? A[i] : null, l ?? "");
  });
}
var TA = PA, DA = function(e) {
  for (var A = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : void 0, r = e.split("."), o = null, n = TA, i = 0, a = r.length; i < a; i++) {
    var l = r[i];
    if (o = n[l] || "", i === a - 1)
      return MA(o, A);
    if (!o)
      return "";
    n = o;
  }
  return "";
}, Ce = DA, ue = function(e) {
  var A = [];
  return Object.keys(e).forEach(function(r) {
    return e[r] && A.push(r);
  }), A.join(" ");
}, jA = function(e) {
  var A = [];
  return e.forEach(function(r) {
    typeof r == "string" ? A.push(r) : N(r) === "object" && A.push(ue(r));
  }), A.join(" ");
}, de = function(e) {
  if (!e)
    return "";
  if (typeof e == "string")
    return e;
  if (Array.isArray(e) && e.length > 0) {
    var A = [];
    return e.forEach(function(r) {
      r && (typeof r == "string" ? A.push(r) : Array.isArray(r) ? A.push(jA(r)) : N(r) === "object" && A.push(ue(r)));
    }), A.join(" ");
  }
  return N(e) === "object" ? ue(e) : "";
}, qt = function(e) {
  var A = de(e), r = Array.from(new Set(A.split(" "))).filter(function(o) {
    return o;
  });
  return de(r);
};
var RA = typeof window > "u";
function Ee(t, e, A, r) {
  var o, n = 0;
  typeof e != "boolean" && (r = A, A = e, e = void 0);
  function i() {
    var l = this, s = (/* @__PURE__ */ new Date()).valueOf() - n, c = arguments;
    function u() {
      n = (/* @__PURE__ */ new Date()).valueOf(), A.apply(l, c);
    }
    function p() {
      o = void 0;
    }
    r && !o && u(), o && clearTimeout(o);
    var d = r === void 0;
    d && s > t ? u() : e !== !0 && (o = setTimeout(r ? p : u, d ? t - s : t));
  }
  function a() {
    o && (clearTimeout(o), o = null);
  }
  return i._cancel = a, i;
}
function SA(t, e, A) {
  return A === void 0 ? Ee(t, e, !1) : Ee(t, A, e !== !1);
}
var GA = function() {
  if (!RA) {
    var e = f.ref(""), A = ["2xl", "xl", "lg", "md", "sm"], r = {
      "2xl": window.matchMedia("(min-width:1536px)"),
      xl: window.matchMedia("(min-width:1280px)"),
      lg: window.matchMedia("(min-width:1024px)"),
      md: window.matchMedia("(min-width:768px)"),
      sm: window.matchMedia("(min-width:640px)")
    }, o = function() {
      for (var a = 0; a < A.length; a++) {
        var l = A[a];
        if (r[l].matches) {
          e.value = l;
          return;
        }
      }
      e.value = "default";
    }, n = SA(0, function() {
      return o();
    });
    return o(), A.forEach(function(i) {
      return r[i].addEventListener("change", n);
    }), f.onBeforeUnmount(function() {
      A.forEach(function(i) {
        return r[i].removeEventListener("change", n);
      });
    }), {
      current: e
    };
  }
};
function _t() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 100, e = f.ref(0), A;
  function r() {
    A = requestAnimationFrame(function() {
      e.value++, !(e.value >= t) && r();
    });
  }
  function o() {
    A && (cancelAnimationFrame(A), A = 0);
  }
  return r(), f.onBeforeUnmount(function() {
    return o();
  }), {
    defer: function(i) {
      return e.value >= i;
    },
    reset: function() {
      o(), e.value = 0, r();
    },
    cancel: o
  };
}
var NA = ["IconLoadingShadow", "IconNoData"], Ge = 0, Ne = function(e, A) {
  {
    var r;
    if ((r = e.props) !== null && r !== void 0 && r.id) {
      var o = "".concat(e.props.id).concat(Ge);
      A[e.props.id] = o, e.props.id = o;
    }
  }
  Array.isArray(e == null ? void 0 : e.children) && e.children.forEach(function(n) {
    Ne(n, A);
  });
}, He = function(e, A) {
  var r = ["fill", "mask", "filter"];
  r.forEach(function(o) {
    {
      var n, i;
      if ((n = e.props) !== null && n !== void 0 && (i = n[o]) !== null && i !== void 0 && i.includes("url(#")) {
        var a = e.props[o].replace("url(#", "").replace(")", ""), l = A[a];
        l && (e.props[o] = "url(#".concat(l, ")"));
      }
    }
  }), Array.isArray(e == null ? void 0 : e.children) && e.children.forEach(function(o) {
    He(o, A);
  });
}, HA = function(e) {
  if (e) {
    var A = {};
    Ne(e, A), He(e, A), Ge++;
  }
}, ZA = function(e) {
  var A = e.getCurrentInstance, r = e.isVue2, o = e.nextTick, n = e.onUnmounted;
  return function() {
    var i = A().proxy;
    r || Object.defineProperty(i, "$scopedSlots", {
      configurable: !0,
      value: null
    }), Object.defineProperty(i, "instanceSlots", {
      configurable: !0,
      get: function() {
        return i.$scopedSlots || i.$slots;
      }
    }), n(function() {
      o(function() {
        r || delete i.$scopedSlots, delete i.instanceSlots;
      });
    });
  };
}, KA = function() {
}, UA = function(e) {
  var A = e.onMounted, r = e.onActivated, o = e.nextTick;
  return function(n) {
    var i;
    A(function() {
      n(), o(function() {
        return i = !0;
      });
    }), r(function() {
      return i && n();
    });
  };
}, YA = function(e) {
  var A = e.computed, r = e.getCurrentInstance, o = e.inject, n = e.markRaw, i = e.nextTick, a = e.onMounted, l = e.onActivated, s = e.onUnmounted, c = e.provide, u = e.reactive, p = e.toRef;
  return function() {
    var d = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, v = d.relationKey, w = d.relationContainer, m = d.onChange, h = d.childrenKey, b = d.delivery;
    if (!v)
      throw new Error("[TINY Error]<relationKey> must exist.");
    var E = r(), B = u({
      children: [],
      indexInParent: -1
    }), C = o(v, null), I = [];
    if (C) {
      var K = C.link, T = C.unlink, Q = C.callbacks, P = C.childrenKey, D = C.delivery;
      I = Q, h = h || P || "instanceChildren", b = D, B.indexInParent = K(E), s(function() {
        return T(E);
      });
    } else {
      h = h || "instanceChildren";
      var y = UA({
        onMounted: a,
        onActivated: l,
        nextTick: i
      }), O = m ? function() {
        return i(m);
      } : KA, S;
      i(function() {
        var j = typeof w == "function" ? w() : w;
        j && (S = new MutationObserver(function(H, k) {
          var q = [];
          Ze(j.childNodes, q), I.forEach(function(F) {
            return F(q, H, k);
          }), O();
        }), S.observe(j, {
          attributes: !0,
          childList: !0,
          subtree: !0
        }));
      }), y(function() {
        return O();
      }), s(function() {
        S && (S.disconnect(), S = null), I = null;
      });
    }
    var Ae = function(H) {
      var k = H.proxy;
      return B.children.push(n(k)), A(function() {
        return B.children.indexOf(k);
      });
    }, X = function(H) {
      var k = B.children.indexOf(H.proxy);
      k > -1 && B.children.splice(k, 1);
    };
    return I.push(function(j) {
      return OA(B.children, j);
    }), c(v, {
      link: Ae,
      unlink: X,
      callbacks: I,
      childrenKey: h,
      delivery: b
    }), Object.defineProperty(E.proxy, h, {
      configurable: !0,
      get: function() {
        return B.children;
      }
    }), s(function() {
      return delete E.proxy[h];
    }), {
      children: p(B, "children"),
      index: p(B, "indexInParent"),
      delivery: b
    };
  };
}, Ze = function(e, A) {
  e.length && e.forEach(function(r) {
    A.push(r), r.childNodes && Ze(r.childNodes, A);
  });
}, OA = function(e, A) {
  e.sort(function(r, o) {
    return A.indexOf(r.$el) - A.indexOf(o.$el);
  });
};
const $t = "3.20.1";
var en = ZA(G(G({}, f), {}, {
  isVue2: Se
})), An = YA(G(G({}, f), {}, {
  isVue2: Se
})), fe = "Tiny", rn = {
  tiny_mode: String,
  tiny_mode_root: Boolean,
  tiny_template: [Function, Object],
  tiny_renderless: Function,
  tiny_theme: String,
  tiny_chart_theme: Object
}, tn = ["tiny_mode", "tiny_mode_root", "tiny_template", "tiny_renderless", "_constants", "tiny_theme", "tiny_chart_theme"], be = function(e, A) {
  var r = function(u) {
    return ~["pc", "mobile", "mobile-first"].indexOf(u);
  }, o = he(A), n = typeof e.tiny_mode == "string" ? e.tiny_mode : null, i = f.inject("TinyMode", null), a;
  typeof o.tiny_mode == "string" ? a = o.tiny_mode : o.tiny_mode && (a = o.tiny_mode.value), r(n) || (n = null), r(i) || (i = null), r(a) || (a = null);
  var l = n || i || a || "pc";
  e.tiny_mode_root && f.provide("TinyMode", l);
  var s = f.getCurrentInstance();
  return Object.defineProperty(s, "_tiny_mode", {
    value: l
  }), l;
}, FA = function(e, A) {
  var r = function(c) {
    return ~["tiny", "saas"].indexOf(c);
  }, o = he(A), n = typeof e.tiny_theme == "string" ? e.tiny_theme : null, i = f.inject("TinyTheme", null), a = o.tiny_theme && o.tiny_theme.value;
  r(n) || (n = null), r(i) || (i = null), r(a) || (a = null);
  var l = n || i || a || "tiny";
  return l;
}, zA = function(e, A) {
  var r = he(A), o = N(e.tiny_chart_theme) === "object" ? e.tiny_chart_theme : null, n = f.inject("TinyChartTheme", null), i = r.tiny_chart_theme && r.tiny_chart_theme.value, a = o || n || i || null;
  return a;
}, nn = function(e) {
  var A = e.props, r = e.context, o = e.template, n = e.extend, i = n === void 0 ? {} : n, a = be(A, r), l = f.computed(function() {
    if (typeof A.tiny_template < "u")
      return A.tiny_template;
    var s = o(a, A);
    return typeof s == "function" ? sA(s) : s;
  });
  return Te({
    view: l,
    props: A,
    context: r,
    extend: i
  });
}, ie = {
  configKey: Symbol("designConfigKey"),
  configInstance: null
}, on = function(e) {
  Object.keys(e).length && (f.provide(ie.configKey, e), ie.configInstance = e);
}, an = IA(ie), ee = {
  designConfig: null,
  twMerge: function() {
    return "";
  }
}, pe = function() {
  for (var e = arguments.length, A = new Array(e), r = 0; r < e; r++)
    A[r] = arguments[r];
  return ee.twMerge(de(A));
}, ln = function(e) {
  var A, r, o, n = e.props, i = e.context, a = e.renderless, l = e.api, s = e.extendOptions, c = s === void 0 ? {} : s, u = e.mono, p = u === void 0 ? !1 : u, d = e.classes, v = d === void 0 ? {} : d, w = typeof n.tiny_renderless == "function" ? n.tiny_renderless : a, m = ee.designConfig || f.inject(ie.configKey, {});
  m = ((A = m) === null || A === void 0 ? void 0 : A.value) || m || {};
  var h = (r = m) === null || r === void 0 || (o = r.components) === null || o === void 0 ? void 0 : o[uA().replace(fe, "")], b = G(G({
    $prefix: fe,
    t: Ce
  }, wA(i, be(n, i))), {}, {
    designConfig: h,
    globalDesignConfig: m,
    useBreakpoint: GA,
    mergeClass: pe
  });
  b.vm.theme = FA(n, i), b.vm.chartTheme = zA(n, i);
  var E = w(n, f, b, c);
  typeof (h == null ? void 0 : h.renderless) == "function" && Object.assign(E, h.renderless(n, f, b, E));
  var B = {
    t: Ce,
    vm: b.vm,
    f: aA,
    a: LA,
    d: b.defineInstanceProperties,
    dp: b.defineParentInstanceProperties,
    gcls: function(I) {
      return lA(v, I);
    },
    m: pe
  };
  return B.d({
    slots: {
      get: function() {
        return b.vm.$slots;
      },
      configurable: !0
    },
    scopedSlots: {
      get: function() {
        return b.vm.$scopedSlots;
      },
      configurable: !0
    }
  }), B.dp({
    slots: {
      get: function() {
        return b.parent.$slots;
      },
      configurable: !0
    },
    scopedSlots: {
      get: function() {
        return b.parent.$scopedSlots;
      },
      configurable: !0
    }
  }), JA(), Array.isArray(l) && (Array.isArray(h == null ? void 0 : h.api) && (l = l.concat(h.api)), l.forEach(function(C) {
    var I = E[C];
    typeof I < "u" && (B[C] = I, p || b.setParentAttribute({
      name: C,
      value: I
    }));
  })), B;
};
function W(t) {
  var e = t.name, A = e === void 0 ? "Icon" : e, r = t.component;
  return function(o) {
    return cA(QA({
      name: fe + A,
      setup: function(i, a) {
        var l = a.attrs || {}, s = l.fill, c = l.width, u = l.height, p = l["custom-class"], d = l["first-color"], v = l["second-color"], w = Object.assign({}, i, o || null), m = be(w, a), h = m === "mobile-first", b = {
          "data-tag": h ? "tiny-svg" : null
        }, E = b, B = "tiny-svg";
        h && (B = pe("h-4 w-4 inline-block", p || "", w.class || ""));
        var C = Object.assign({
          style: {
            fill: s,
            width: c,
            height: u,
            "--tiny-first-color": d || "",
            "--tiny-second-color": v || ""
          },
          class: B,
          isSvg: !0
        }, E);
        if (C.nativeOn = a.listeners, NA.includes(A)) {
          var I = r.render;
          r.render = function() {
            for (var K = I.bind(this), T = arguments.length, Q = new Array(T), P = 0; P < T; P++)
              Q[P] = arguments[P];
            var D = K(Q);
            return HA(D), D;
          };
        }
        return Te({
          component: r,
          props: w,
          context: a,
          extend: C
        });
      }
    }));
  };
}
var LA = function(e, A, r) {
  var o = {}, n = function(l) {
    var s = A.some(function(c) {
      return new RegExp(c).test(l);
    });
    (r && s || !r && !s) && (o[l] = e[l]);
  };
  for (var i in e)
    n(i);
  return o;
}, se = {}, JA = function() {
  for (var e in se) {
    var A = se[e];
    typeof A.install == "function" && A.install(dA()), typeof A.init == "function" && A.init(fA());
  }
  se = {};
}, sn = function(e) {
  e.install = function(A) {
    A.component(e.name, e);
  };
};
function VA() {
  for (var t = 0, e, A, r = ""; t < arguments.length; )
    (e = arguments[t++]) && (A = Ke(e)) && (r && (r += " "), r += A);
  return r;
}
function Ke(t) {
  if (typeof t == "string")
    return t;
  for (var e, A = "", r = 0; r < t.length; r++)
    t[r] && (e = Ke(t[r])) && (A && (A += " "), A += e);
  return A;
}
var ye = "-";
function XA(t) {
  var e = qA(t), A = t.conflictingClassGroups, r = t.conflictingClassGroupModifiers, o = r === void 0 ? {} : r;
  function n(a) {
    var l = a.split(ye);
    return l[0] === "" && l.length !== 1 && l.shift(), Ue(l, e) || WA(a);
  }
  function i(a, l) {
    var s = A[a] || [];
    return l && o[a] ? [].concat(s, o[a]) : s;
  }
  return {
    getClassGroupId: n,
    getConflictingClassGroupIds: i
  };
}
function Ue(t, e) {
  var A;
  if (t.length === 0)
    return e.classGroupId;
  var r = t[0], o = e.nextPart.get(r), n = o ? Ue(t.slice(1), o) : void 0;
  if (n)
    return n;
  if (e.validators.length !== 0) {
    var i = t.join(ye);
    return (A = e.validators.find(function(a) {
      var l = a.validator;
      return l(i);
    })) === null || A === void 0 ? void 0 : A.classGroupId;
  }
}
var Ie = /^\[(.+)\]$/;
function WA(t) {
  if (Ie.test(t)) {
    var e = Ie.exec(t)[1], A = e == null ? void 0 : e.substring(0, e.indexOf(":"));
    if (A)
      return "arbitrary.." + A;
  }
}
function qA(t) {
  var e = t.theme, A = t.prefix, r = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  }, o = $A(Object.entries(t.classGroups), A);
  return o.forEach(function(n) {
    var i = n[0], a = n[1];
    ge(a, r, i, e);
  }), r;
}
function ge(t, e, A, r) {
  t.forEach(function(o) {
    if (typeof o == "string") {
      var n = o === "" ? e : Qe(e, o);
      n.classGroupId = A;
      return;
    }
    if (typeof o == "function") {
      if (_A(o)) {
        ge(o(r), e, A, r);
        return;
      }
      e.validators.push({
        validator: o,
        classGroupId: A
      });
      return;
    }
    Object.entries(o).forEach(function(i) {
      var a = i[0], l = i[1];
      ge(l, Qe(e, a), A, r);
    });
  });
}
function Qe(t, e) {
  var A = t;
  return e.split(ye).forEach(function(r) {
    A.nextPart.has(r) || A.nextPart.set(r, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), A = A.nextPart.get(r);
  }), A;
}
function _A(t) {
  return t.isThemeGetter;
}
function $A(t, e) {
  return e ? t.map(function(A) {
    var r = A[0], o = A[1], n = o.map(function(i) {
      return typeof i == "string" ? e + i : N(i) === "object" ? Object.fromEntries(Object.entries(i).map(function(a) {
        var l = a[0], s = a[1];
        return [e + l, s];
      })) : i;
    });
    return [r, n];
  }) : t;
}
function er(t) {
  if (t < 1)
    return {
      get: function() {
      },
      set: function() {
      }
    };
  var e = 0, A = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  function o(n, i) {
    A.set(n, i), e++, e > t && (e = 0, r = A, A = /* @__PURE__ */ new Map());
  }
  return {
    get: function(i) {
      var a = A.get(i);
      if (a !== void 0)
        return a;
      if ((a = r.get(i)) !== void 0)
        return o(i, a), a;
    },
    set: function(i, a) {
      A.has(i) ? A.set(i, a) : o(i, a);
    }
  };
}
var Ye = "!";
function Ar(t) {
  var e = t.separator || ":", A = e.length === 1, r = e[0], o = e.length;
  return function(i) {
    for (var a = [], l = 0, s = 0, c, u = 0; u < i.length; u++) {
      var p = i[u];
      if (l === 0) {
        if (p === r && (A || i.slice(u, u + o) === e)) {
          a.push(i.slice(s, u)), s = u + o;
          continue;
        }
        if (p === "/") {
          c = u;
          continue;
        }
      }
      p === "[" ? l++ : p === "]" && l--;
    }
    var d = a.length === 0 ? i : i.substring(s), v = d.startsWith(Ye), w = v ? d.substring(1) : d, m = c && c > s ? c - s : void 0;
    return {
      modifiers: a,
      hasImportantModifier: v,
      baseClassName: w,
      maybePostfixModifierPosition: m
    };
  };
}
function rr(t) {
  if (t.length <= 1)
    return t;
  var e = [], A = [];
  return t.forEach(function(r) {
    var o = r[0] === "[";
    o ? (e.push.apply(e, A.sort().concat([r])), A = []) : A.push(r);
  }), e.push.apply(e, A.sort()), e;
}
function tr(t) {
  return G({
    cache: er(t.cacheSize),
    splitModifiers: Ar(t)
  }, XA(t));
}
var nr = /\s+/;
function or(t, e) {
  var A = e.splitModifiers, r = e.getClassGroupId, o = e.getConflictingClassGroupIds, n = /* @__PURE__ */ new Set();
  return t.trim().split(nr).map(function(i) {
    var a = A(i), l = a.modifiers, s = a.hasImportantModifier, c = a.baseClassName, u = a.maybePostfixModifierPosition, p = r(u ? c.substring(0, u) : c), d = !!u;
    if (!p) {
      if (!u)
        return {
          isTailwindClass: !1,
          originalClassName: i
        };
      if (p = r(c), !p)
        return {
          isTailwindClass: !1,
          originalClassName: i
        };
      d = !1;
    }
    var v = rr(l).join(":"), w = s ? v + Ye : v;
    return {
      isTailwindClass: !0,
      modifierId: w,
      classGroupId: p,
      originalClassName: i,
      hasPostfixModifier: d
    };
  }).reverse().filter(function(i) {
    if (!i.isTailwindClass)
      return !0;
    var a = i.modifierId, l = i.classGroupId, s = i.hasPostfixModifier, c = a + l;
    return n.has(c) ? !1 : (n.add(c), o(l, s).forEach(function(u) {
      return n.add(a + u);
    }), !0);
  }).reverse().map(function(i) {
    return i.originalClassName;
  }).join(" ");
}
function ir() {
  for (var t = arguments.length, e = new Array(t), A = 0; A < t; A++)
    e[A] = arguments[A];
  var r, o, n, i = a;
  function a(s) {
    var c = e[0], u = e.slice(1), p = u.reduce(function(d, v) {
      return v(d);
    }, c());
    return r = tr(p), o = r.cache.get, n = r.cache.set, i = l, l(s);
  }
  function l(s) {
    var c = o(s);
    if (c)
      return c;
    var u = or(s, r);
    return n(s, u), u;
  }
  return function() {
    return i(VA.apply(null, arguments));
  };
}
function x(t) {
  var e = function(r) {
    return r[t] || [];
  };
  return e.isThemeGetter = !0, e;
}
var Oe = /^\[(?:([a-z-]+):)?(.+)\]$/i, ar = /^\d+\/\d+$/, lr = /* @__PURE__ */ new Set(["px", "full", "screen"]), sr = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, cr = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, ur = /^-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
function R(t) {
  return z(t) || lr.has(t) || ar.test(t) || me(t);
}
function me(t) {
  return V(t, "length", vr);
}
function dr(t) {
  return V(t, "size", Fe);
}
function fr(t) {
  return V(t, "position", Fe);
}
function pr(t) {
  return V(t, "url", hr);
}
function te(t) {
  return V(t, "number", z);
}
function z(t) {
  return !Number.isNaN(Number(t));
}
function gr(t) {
  return t.endsWith("%") && z(t.slice(0, -1));
}
function _(t) {
  return Pe(t) || V(t, "number", Pe);
}
function g(t) {
  return Oe.test(t);
}
function $() {
  return !0;
}
function U(t) {
  return sr.test(t);
}
function mr(t) {
  return V(t, "", br);
}
function V(t, e, A) {
  var r = Oe.exec(t);
  return r ? r[1] ? r[1] === e : A(r[2]) : !1;
}
function vr(t) {
  return cr.test(t);
}
function Fe() {
  return !1;
}
function hr(t) {
  return t.startsWith("url(");
}
function Pe(t) {
  return Number.isInteger(Number(t));
}
function br(t) {
  return ur.test(t);
}
function yr() {
  var t = x("colors"), e = x("spacing"), A = x("blur"), r = x("brightness"), o = x("borderColor"), n = x("borderRadius"), i = x("borderSpacing"), a = x("borderWidth"), l = x("contrast"), s = x("grayscale"), c = x("hueRotate"), u = x("invert"), p = x("gap"), d = x("gradientColorStops"), v = x("gradientColorStopPositions"), w = x("inset"), m = x("margin"), h = x("opacity"), b = x("padding"), E = x("saturate"), B = x("scale"), C = x("sepia"), I = x("skew"), K = x("space"), T = x("translate"), Q = function() {
    return ["auto", "contain", "none"];
  }, P = function() {
    return ["auto", "hidden", "clip", "visible", "scroll"];
  }, D = function() {
    return ["auto", g, e];
  }, y = function() {
    return [g, e];
  }, O = function() {
    return ["", R];
  }, S = function() {
    return ["auto", z, g];
  }, Ae = function() {
    return ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"];
  }, X = function() {
    return ["solid", "dashed", "dotted", "double", "none"];
  }, j = function() {
    return ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity", "plus-lighter"];
  }, H = function() {
    return ["start", "end", "center", "between", "around", "evenly", "stretch"];
  }, k = function() {
    return ["", "0", g];
  }, q = function() {
    return ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"];
  }, F = function() {
    return [z, te];
  }, re = function() {
    return [z, g];
  };
  return {
    cacheSize: 500,
    theme: {
      colors: [$],
      spacing: [R],
      blur: ["none", "", U, g],
      brightness: F(),
      borderColor: [t],
      borderRadius: ["none", "", "full", U, g],
      borderSpacing: y(),
      borderWidth: O(),
      contrast: F(),
      grayscale: k(),
      hueRotate: re(),
      invert: k(),
      gap: y(),
      gradientColorStops: [t],
      gradientColorStopPositions: [gr, me],
      inset: D(),
      margin: D(),
      opacity: F(),
      padding: y(),
      saturate: F(),
      scale: F(),
      sepia: k(),
      skew: re(),
      space: y(),
      translate: y()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", "video", g]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [U]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": q()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": q()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: [].concat(Ae(), [g])
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: P()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": P()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": P()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: Q()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": Q()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": Q()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: [w]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": [w]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": [w]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [w]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [w]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [w]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [w]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [w]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [w]
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: ["auto", _]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: D()
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["wrap", "wrap-reverse", "nowrap"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: ["1", "auto", "initial", "none", g]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: k()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: k()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", _]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [$]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", _]
        }, g]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": S()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": S()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": [$]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [_]
        }, g]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": S()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": S()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": ["auto", "min", "max", "fr", g]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", g]
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: [p]
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": [p]
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": [p]
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: ["normal"].concat(H())
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": ["start", "end", "center", "stretch"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", "start", "end", "center", "stretch"]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal"].concat(H(), ["baseline"])
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", "start", "end", "center", "stretch", "baseline"]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": [].concat(H(), ["baseline"])
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", "start", "end", "center", "stretch"]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: [b]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [b]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [b]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [b]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [b]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [b]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [b]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [b]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [b]
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: [m]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [m]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [m]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [m]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [m]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [m]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [m]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [m]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [m]
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/space
       */
      "space-x": [{
        "space-x": [K]
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/space
       */
      "space-y": [{
        "space-y": [K]
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-y-reverse": ["space-y-reverse"],
      // Sizing
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: ["auto", "min", "max", "fit", g, e]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": ["min", "max", "fit", g, R]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": ["0", "none", "full", "min", "max", "fit", "prose", {
          screen: [U]
        }, U, g]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [g, e, "auto", "min", "max", "fit"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["min", "max", "fit", g, R]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [g, e, "min", "max", "fit"]
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", U, me]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", te]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [$]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractons"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", g]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": ["none", z, te]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", g, R]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", g]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["none", "disc", "decimal", g]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: [t]
      }],
      /**
       * Placeholder Opacity
       * @see https://tailwindcss.com/docs/placeholder-opacity
       */
      "placeholder-opacity": [{
        "placeholder-opacity": [h]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: [t]
      }],
      /**
       * Text Opacity
       * @see https://tailwindcss.com/docs/text-opacity
       */
      "text-opacity": [{
        "text-opacity": [h]
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [].concat(X(), ["wavy"])
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", R]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", g, R]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: [t]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: y()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", g]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", g]
      }],
      // Backgrounds
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Opacity
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/background-opacity
       */
      "bg-opacity": [{
        "bg-opacity": [h]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: [].concat(Ae(), [fr])
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: ["no-repeat", {
          repeat: ["", "x", "y", "round", "space"]
        }]
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: ["auto", "cover", "contain", dr]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, pr]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: [t]
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: [v]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: [v]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: [v]
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: [d]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: [d]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: [d]
      }],
      // Borders
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: [n]
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": [n]
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": [n]
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": [n]
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": [n]
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": [n]
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": [n]
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": [n]
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": [n]
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": [n]
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": [n]
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": [n]
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": [n]
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": [n]
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": [n]
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: [a]
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": [a]
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": [a]
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": [a]
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": [a]
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": [a]
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": [a]
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": [a]
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": [a]
      }],
      /**
       * Border Opacity
       * @see https://tailwindcss.com/docs/border-opacity
       */
      "border-opacity": [{
        "border-opacity": [h]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [].concat(X(), ["hidden"])
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x": [{
        "divide-x": [a]
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y": [{
        "divide-y": [a]
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Divide Opacity
       * @see https://tailwindcss.com/docs/divide-opacity
       */
      "divide-opacity": [{
        "divide-opacity": [h]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      "divide-style": [{
        divide: X()
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: [o]
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": [o]
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": [o]
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": [o]
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": [o]
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": [o]
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": [o]
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: [o]
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [""].concat(X())
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [g, R]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [R]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: [t]
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w": [{
        ring: O()
      }],
      /**
       * Ring Width Inset
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/ring-color
       */
      "ring-color": [{
        ring: [t]
      }],
      /**
       * Ring Opacity
       * @see https://tailwindcss.com/docs/ring-opacity
       */
      "ring-opacity": [{
        "ring-opacity": [h]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      "ring-offset-w": [{
        "ring-offset": [R]
      }],
      /**
       * Ring Offset Color
       * @see https://tailwindcss.com/docs/ring-offset-color
       */
      "ring-offset-color": [{
        "ring-offset": [t]
      }],
      // Effects
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: ["", "inner", "none", U, mr]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [$]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [h]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": j()
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": j()
      }],
      // Filters
      /**
       * Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: ["", "none"]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: [A]
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [r]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [l]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": ["", "none", U, g]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: [s]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [c]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: [u]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [E]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: [C]
      }],
      /**
       * Backdrop Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": ["", "none"]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": [A]
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [r]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [l]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": [s]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [c]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": [u]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [h]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [E]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": [C]
      }],
      // Tables
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": [i]
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": [i]
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": [i]
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // Transitions and Animation
      /**
       * Tranisition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", g]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: re()
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "in", "out", "in-out", g]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: re()
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", "spin", "ping", "pulse", "bounce", g]
      }],
      // Transforms
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: ["", "gpu", "none"]
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: [B]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": [B]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": [B]
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: [_, g]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [T]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [T]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": [I]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": [I]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", g]
      }],
      // Interactivity
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: ["auto", t]
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: ["appearance-none"],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", g]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: [t]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["none", "auto"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "y", "x", ""]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": y()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": y()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": y()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": y()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": y()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": y()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": y()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": y()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": y()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": y()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": y()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": y()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": y()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": y()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": y()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": y()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": y()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": y()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "pinch-zoom", "manipulation", {
          pan: ["x", "left", "right", "y", "up", "down"]
        }]
      }],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", g]
      }],
      // SVG
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: [t, "none"]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [R, te]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: [t, "none"]
      }],
      // Accessibility
      /**
       * Screen Readers
       * @see https://tailwindcss.com/docs/screen-readers
       */
      sr: ["sr-only", "not-sr-only"]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    }
  };
}
var ze = /* @__PURE__ */ ir(yr);
ee.twMerge = ze;
const wr = {
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
}, Br = /* @__PURE__ */ Y(
  "path",
  {
    d: "m13.638 17.127 6.32-5.699c.504-.455.792-1.1.792-1.777a2.41 2.41 0 0 0-2.418-2.401H5.668c-.68 0-1.33.285-1.788.785a2.39 2.39 0 0 0 .166 3.396l6.346 5.699a2.43 2.43 0 0 0 3.246-.003Z",
    "fill-rule": "evenodd"
  },
  null,
  -1
  /* HOISTED */
), xr = [
  Br
];
function Cr(t, e) {
  return L(), J("svg", wr, [...xr]);
}
const Er = { render: Cr }, Le = function() {
  return W({
    name: "IconArrowBottom",
    component: Er
  })();
}, Ir = {
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
}, Qr = /* @__PURE__ */ Y(
  "path",
  {
    d: "M3.47 7.469a.75.75 0 0 1 .976-.073l.084.073L12 14.938l7.47-7.47a.75.75 0 0 1 .976-.072l.084.073a.75.75 0 0 1 .073.976l-.073.084-8 8a.75.75 0 0 1-.976.073l-.084-.073-8-8a.75.75 0 0 1 0-1.06Z",
    "fill-rule": "evenodd"
  },
  null,
  -1
  /* HOISTED */
), Pr = [
  Qr
];
function kr(t, e) {
  return L(), J("svg", Ir, [...Pr]);
}
const Mr = { render: kr }, we = function() {
  return W({
    name: "IconChevronDown",
    component: Mr
  })();
}, Tr = {
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
}, Dr = /* @__PURE__ */ Y(
  "path",
  {
    d: "M16.53 20.53a.75.75 0 0 0 .072-.976l-.072-.084L9.06 12l7.47-7.47a.75.75 0 0 0 .072-.976l-.072-.084a.75.75 0 0 0-.977-.073l-.084.073-8 8a.75.75 0 0 0-.072.976l.072.084 8 8a.75.75 0 0 0 1.06 0Z",
    "fill-rule": "evenodd"
  },
  null,
  -1
  /* HOISTED */
), jr = [
  Dr
];
function Rr(t, e) {
  return L(), J("svg", Tr, [...jr]);
}
const Sr = { render: Rr }, Gr = function() {
  return W({
    name: "IconChevronLeft",
    component: Sr
  })();
}, Nr = {
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
}, Hr = /* @__PURE__ */ Y(
  "path",
  {
    d: "M20.53 16.53a.75.75 0 0 1-.976.072l-.084-.073L12 9.06l-7.47 7.47a.75.75 0 0 1-.976.072l-.084-.073a.75.75 0 0 1-.073-.976l.073-.084 8-8a.75.75 0 0 1 .976-.073l.084.073 8 8a.75.75 0 0 1 0 1.06Z",
    "fill-rule": "evenodd"
  },
  null,
  -1
  /* HOISTED */
), Zr = [
  Hr
];
function Kr(t, e) {
  return L(), J("svg", Nr, [...Zr]);
}
const Ur = { render: Kr }, Yr = function() {
  return W({
    name: "IconChevronUp",
    component: Ur
  })();
}, Or = {
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
}, Fr = /* @__PURE__ */ Y(
  "path",
  {
    d: "M12.743 3.898A.75.75 0 0 0 11.25 4v7.25H4l-.102.007A.75.75 0 0 0 4 12.75h7.25V20l.007.102A.75.75 0 0 0 12.75 20v-7.25H20l.102-.007A.75.75 0 0 0 20 11.25h-7.25V4l-.007-.102Z",
    "fill-rule": "evenodd"
  },
  null,
  -1
  /* HOISTED */
), zr = [
  Fr
];
function Lr(t, e) {
  return L(), J("svg", Or, [...zr]);
}
const Jr = { render: Lr }, Vr = function() {
  return W({
    name: "IconPlus",
    component: Jr
  })();
}, Xr = {
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
}, Wr = /* @__PURE__ */ Y(
  "path",
  {
    d: "M12 1.25C6.063 1.25 1.25 6.063 1.25 12S6.063 22.75 12 22.75 22.75 17.937 22.75 12 17.937 1.25 12 1.25Z",
    "fill-rule": "evenodd"
  },
  null,
  -1
  /* HOISTED */
), qr = /* @__PURE__ */ Y(
  "path",
  {
    d: "M10.498 7.408a1.508 1.508 0 1 1 3.001 0l-.584 5.846a.92.92 0 0 1-1.833 0l-.584-5.846Zm1.5 8.342a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Z",
    "fill-rule": "evenodd",
    fill: "#FFF"
  },
  null,
  -1
  /* HOISTED */
), _r = [
  Wr,
  qr
];
function $r(t, e) {
  return L(), J("svg", Xr, [..._r]);
}
const et = { render: $r }, Je = function() {
  return W({
    name: "IconWarning",
    component: et
  })();
}, At = {
  icons: {
    warning: Je()
  }
}, rt = {
  transform: "unset"
}, tt = {
  separator: ">"
}, nt = {
  icons: {
    arrowIcon: Le()
  }
}, ot = {
  constants: {
    DEFAULT_WIDTH: "300px"
  }
}, it = {
  icons: {
    dropdownIcon: we()
  },
  props: {
    trigger: "click"
  },
  renderless: function(e, A, r, o) {
    var n = r.emit, i = o.state;
    return {
      // 兼容 item-click 的参数格式不一致
      handleMenuItemClick: function(l, s, c) {
        e.hideOnClick && !c && (i.visible = !1), c || n("item-click", l, s);
      }
    };
  }
}, at = {
  props: {
    visibleArrow: !0,
    placement: "bottom-start"
  },
  renderless: function(e, A, r, o) {
    var n = r.dispatch, i = o.state;
    return {
      // 兼容 current-item-click 的参数格式不一致
      handleMenuItemClick: function(l, s, c, u, p) {
        i.label = c, i.showContent = u, n("TinyDropdown", "current-item-click", [l, s, p]);
      }
    };
  }
}, lt = {
  icons: {
    leftWardArrow: Gr()
  },
  renderless: function(e, A, r, o) {
    var n = r.emit, i = r.dispatch, a = r.vm, l = o.state, s = o.dataStore;
    return {
      // 兼容 item-click 的参数格式不一致,aui 是数组，tiny 是对象
      handleClick: function(u) {
        s ? (e.disabled && (s.checkedStatus = !1), s.itemData = e.itemData, s.itemLabel = "", s.showContent = !1, e.level === "2" ? s.currentIndex = "".concat(e.level, "-").concat(e.currentIndex) : s.currentIndex = "".concat(e.currentIndex), i("TinyDropdown", "selected-index", [s.currentIndex]), i("TinyDropdownMenu", "menu-item-click", [s.itemData, a, s.itemLabel, s.showContent, e.disabled]), i("TinyDropdown", "is-disabled", [e.disabled])) : (u.stopPropagation(), l.currentIndex = "".concat(e.currentIndex), e.disabled || n("item-click", [e.itemData, a, e.disabled]), i("TinyDropdown", "menu-item-click", [e.itemData, a, e.disabled]), i("TinyDropdown", "is-disabled", [e.disabled]), i("TinyDropdown", "selected-index", [l.currentIndex]));
      }
    };
  }
}, st = {
  icons: {
    expandButton: Le()
  }
}, ct = {
  icons: {
    validateIcon: ""
  },
  state: {
    labelWidth: "100px",
    tooltipType: "error"
  },
  messageType: "absolute"
}, ut = {
  state: {
    isUseModalOverlay: !0
  }
}, dt = {
  validConfig: {
    icon: ""
  },
  minWidth: 40,
  treeConfig: {
    renderIcon: !1
  },
  icons: {
    // saas不需要默认排序图标
    sortDefault: null,
    sortAsc: Yr(),
    sortDesc: we()
  }
}, ft = {
  renderless: function(e, A, r, o) {
    var n = r.constants;
    return {
      getMileIcon: function(a) {
        var l = e.milestonesStatus[a[e.statusField]] || n.DEFAULT_COLOR, s = a[e.statusField] === e.completedField, c = s && !e.solid, u = o.hexToRgb(l), p = u.r, d = u.g, v = u.b;
        return {
          background: (c ? n.DEFAULT_BACK_COLOR : l) + "!important",
          color: (c ? l : n.DEFAULT_BACK_COLOR) + "!important",
          boxShadow: "rgba(".concat(p, ",").concat(d, ",").concat(v, ",.4) ").concat(n.BOX_SHADOW_PX)
        };
      },
      getFlagStyle: function(a) {
        var l = a.index, s = a.idx;
        return {
          left: "calc(".concat(100 / (e.data[e.flagBefore ? l : l + 1][e.flagField].length + 1) * (s + 1), "% - 29px)")
        };
      }
    };
  }
}, pt = {
  icons: {
    warning: Je()
  }
}, gt = {
  api: ["close", "show", "toggle"],
  renderless: function(e, A, r, o) {
    return r.emit, {
      close: function() {
        o.doClose();
      },
      show: function() {
        o.doShow();
      },
      toggle: function() {
        o.doToggle();
      }
    };
  }
}, mt = {
  showText: !0
}, vt = { viewBox: "25 25 50 50" }, ht = /* @__PURE__ */ Y(
  "circle",
  {
    class: "icon-loading_svg__path",
    cx: "50",
    cy: "50",
    r: "24",
    fill: "none"
  },
  null,
  -1
  /* HOISTED */
), bt = [
  ht
];
function yt(t, e) {
  return L(), J("svg", vt, [...bt]);
}
const wt = { render: yt }, Bt = {
  // 虚拟滚动的默认options不一致
  baseOpts: {
    optionHeight: 34,
    limit: 20
  },
  icons: {
    dropdownIcon: we(),
    addIcon: Vr(),
    loadingIcon: wt
  },
  state: {
    sizeMap: {
      default: 28,
      mini: 24,
      small: 28,
      medium: 32
    },
    spacingHeight: 4,
    initialInputHeight: 28,
    // 显示清除等图标时，不隐藏下拉箭头时
    autoHideDownIcon: !1,
    delayBlur: !0
  },
  props: {
    tagType: "info",
    stopPropagation: !0
  },
  renderless: function(e, A, r, o) {
    r.emit;
    var n = o.state;
    return {
      computedCollapseTagSize: function() {
        var a = "small";
        return ~["small", "mini"].indexOf(n.selectSize) ? a = n.selectSize : ~["medium", "default"].indexOf(n.selectSize) && (a = "default"), a;
      },
      // aui 的勾选未处理disabled的选项，故此放这里。
      toggleCheckAll: function(a) {
        var l = function(v) {
          for (var w = [], m = 0; m < v.length; m++)
            !v[m].state.disabled && !v[m].state.groupDisabled && v[m].state.visible && w.push(v[m].value);
          return w;
        }, s, c = l(n.options);
        if (a)
          n.filteredSelectCls === "check" || n.filteredSelectCls === "halfselect" ? s = Array.from(/* @__PURE__ */ new Set([].concat(ne(n.modelValue), ne(c)))) : s = n.modelValue.filter(function(d) {
            return !c.includes(d);
          });
        else if (n.selectCls === "check")
          s = c;
        else if (n.selectCls === "halfselect") {
          var u = n.options.filter(function(d) {
            return !d.state.disabled && d.state.selectCls === "check";
          });
          u.length ? s = c : s = [];
        } else
          n.selectCls === "checked-sur" && (s = []);
        var p = [];
        e.multiple && n.options.forEach(function(d) {
          d.required && p.push(d.value);
        }), Array.isArray(s) && (s = p.concat(s.filter(function(d) {
          return !p.find(function(v) {
            return v === d;
          });
        }))), o.setSoftFocus(), n.isSilentBlur = !0, o.updateModelValue(s), o.directEmitChange(s);
      },
      // aurora 禁用和只展示的时候都是tagText，默认主题是 isDisplayOnly 才显示tagText
      computedShowTagText: function() {
        return n.isDisabled || n.isDisplayOnly;
      },
      // aurora 禁用已选项无效果，必选不显示关闭图标
      isTagClosable: function(a) {
        return !a.required;
      }
    };
  }
}, xt = {
  triggerBarConWithLine: !1
}, Ct = {
  // 控制time-picker组件button显示和样式
  showTimePickerButton: !1
}, Et = {
  // 控制time-picker组件时间范围button显示和样式
  showTimePickerRangeButton: !1
}, It = {
  // 时间选择器单个item的margin为0px.
  itemMarginSpace: 0
}, Qt = {
  inputBoxType: "normal",
  showInputSearch: !1
}, Pt = {
  state: {
    progressType: "circle",
    progressWidth: null,
    progressStrokeWidth: 6,
    tooltipDisabled: !0
  },
  icons: {
    closeComponent: "icon-close",
    preViewComponent: ""
  }
}, kt = "data:image/png;base64,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", Mt = {
  props: {
    loadingImg: kt
  }
}, Tt = {
  options: {
    isCloseIconHide: !0
  },
  renderless: function(e, A, r, o) {
    var n = r.emit, i = r.nextTick, a = o.state;
    return {
      clear: function() {
        n("update:modelValue", ""), n("change", ""), n("input", ""), n("clear");
      },
      handleInput: function(s) {
        a.isComposing || s.target.value !== a.nativeInputValue && (n("update:modelValue", s.target.value), n("input", s.target.value, s), o.searchMemory(s.target.value), i(o.setNativeInputValue));
      }
    };
  }
}, Dt = {
  state: {
    confirmButtonProps: {
      plain: !1,
      type: "primary"
    }
  }
}, jt = {
  state: {
    showJumperSuffix: !1,
    totalI18n: "total",
    pageSizeText: null
  }
}, Rt = {
  state: {
    top: "0"
  }
}, St = {
  renderless: function(e, A, r, o) {
    r.emit;
    var n = o.state;
    return {
      computedTreeMaxHeight: function() {
        n.treeWrapperMaxHeight = "";
      }
    };
  }
}, Gt = {
  constants: {
    INPUT_HEIGHT: "28px",
    INPUT_MARGIN_BOTTOM: "0px"
  }
}, Nt = {
  state: {
    buttonType: "primary",
    buttonSize: "mini"
  }
}, Ht = {
  // 多选时，控制tag的颜色
  tagTypeWhenMultiple: "info"
}, Zt = "3.20.0", Kt = {
  name: "saas",
  version: Zt,
  components: {
    Alert: At,
    Badge: rt,
    BreadcrumbItem: tt,
    CollapseItem: nt,
    Drawer: ot,
    Dropdown: it,
    DropdownMenu: at,
    DropdownItem: lt,
    FilterBox: st,
    Form: ct,
    Guide: ut,
    Grid: dt,
    Milestone: ft,
    Pager: jt,
    Popconfirm: pt,
    Popeditor: St,
    Popover: gt,
    Switch: mt,
    Select: Bt,
    Split: xt,
    Time: Ct,
    TimeRange: Et,
    TimeSpinner: It,
    TransferPanel: Qt,
    UploadList: Pt,
    Loading: Mt,
    Input: Tt,
    DateRange: Dt,
    DialogBox: Rt,
    DatePanel: Nt,
    DialogSelect: Gt,
    Cascader: Ht
  }
};
ee.designConfig = Kt;
ee.twMerge = ze;
export {
  sn as $install,
  fe as $prefix,
  rn as $props,
  nn as $setup,
  Wt as KeepAlive,
  Ot as Teleport,
  fA as appProperties,
  an as createComponent,
  ee as customDesignConfig,
  qt as deduplicateCssClass,
  sA as defineAsyncComponent,
  QA as defineComponent,
  ie as design,
  Ft as directive,
  Me as emitter,
  LA as filterAttrs,
  Yt as getElementStatusClass,
  Jt as h,
  f as hooks,
  JA as initComponent,
  Lt as isEmptyVnode,
  Xt as isVnode,
  Se as isVue2,
  Vt as isVue3,
  pe as mergeClass,
  zt as parseVnode,
  tn as props,
  on as provideDesignConfig,
  be as resolveMode,
  FA as resolveTheme,
  ln as setup,
  se as setupComponent,
  de as stringifyCssClass,
  jA as stringifyCssClassArray,
  ue as stringifyCssClassObject,
  W as svg,
  GA as useBreakpoint,
  _t as useDefer,
  en as useInstanceSlots,
  An as useRelation,
  pA as useRouter,
  $t as version
};
