/**
 * @vue/shared v3.5.13
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ /*! #__NO_SIDE_EFFECTS__ */ function Ds(e) {
  const t = Object.create(null)
  for (const n of e.split(',')) t[n] = 1
  return (n) => n in t
}
const te = {},
  Rt = [],
  We = () => {},
  Ho = () => !1,
  en = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97),
  js = (e) => e.startsWith('onUpdate:'),
  de = Object.assign,
  $s = (e, t) => {
    const n = e.indexOf(t)
    n > -1 && e.splice(n, 1)
  },
  Do = Object.prototype.hasOwnProperty,
  Q = (e, t) => Do.call(e, t),
  U = Array.isArray,
  Ot = (e) => tn(e) === '[object Map]',
  Hn = (e) => tn(e) === '[object Set]',
  or = (e) => tn(e) === '[object Date]',
  G = (e) => typeof e == 'function',
  oe = (e) => typeof e == 'string',
  De = (e) => typeof e == 'symbol',
  ee = (e) => e !== null && typeof e == 'object',
  ei = (e) => (ee(e) || G(e)) && G(e.then) && G(e.catch),
  ti = Object.prototype.toString,
  tn = (e) => ti.call(e),
  jo = (e) => tn(e).slice(8, -1),
  ni = (e) => tn(e) === '[object Object]',
  Vs = (e) => oe(e) && e !== 'NaN' && e[0] !== '-' && '' + parseInt(e, 10) === e,
  Mt = Ds(',key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted'),
  Dn = (e) => {
    const t = Object.create(null)
    return (n) => t[n] || (t[n] = e(n))
  },
  $o = /-(\w)/g,
  Ne = Dn((e) => e.replace($o, (t, n) => (n ? n.toUpperCase() : ''))),
  Vo = /\B([A-Z])/g,
  rt = Dn((e) => e.replace(Vo, '-$1').toLowerCase()),
  jn = Dn((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  _n = Dn((e) => (e ? `on${jn(e)}` : '')),
  nt = (e, t) => !Object.is(e, t),
  wn = (e, ...t) => {
    for (let n = 0; n < e.length; n++) e[n](...t)
  },
  si = (e, t, n, s = !1) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, writable: s, value: n })
  },
  Cn = (e) => {
    const t = parseFloat(e)
    return isNaN(t) ? e : t
  },
  ko = (e) => {
    const t = oe(e) ? Number(e) : NaN
    return isNaN(t) ? e : t
  }
let lr
const $n = () => lr || (lr = typeof globalThis < 'u' ? globalThis : typeof self < 'u' ? self : typeof window < 'u' ? window : typeof global < 'u' ? global : {})
function ks(e) {
  if (U(e)) {
    const t = {}
    for (let n = 0; n < e.length; n++) {
      const s = e[n],
        r = oe(s) ? Ko(s) : ks(s)
      if (r) for (const i in r) t[i] = r[i]
    }
    return t
  } else if (oe(e) || ee(e)) return e
}
const Uo = /;(?![^(]*\))/g,
  Wo = /:([^]+)/,
  Bo = /\/\*[^]*?\*\//g
function Ko(e) {
  const t = {}
  return (
    e
      .replace(Bo, '')
      .split(Uo)
      .forEach((n) => {
        if (n) {
          const s = n.split(Wo)
          s.length > 1 && (t[s[0].trim()] = s[1].trim())
        }
      }),
    t
  )
}
function Us(e) {
  let t = ''
  if (oe(e)) t = e
  else if (U(e))
    for (let n = 0; n < e.length; n++) {
      const s = Us(e[n])
      s && (t += s + ' ')
    }
  else if (ee(e)) for (const n in e) e[n] && (t += n + ' ')
  return t.trim()
}
const qo = 'itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly',
  Go = Ds(qo)
function ri(e) {
  return !!e || e === ''
}
function Xo(e, t) {
  if (e.length !== t.length) return !1
  let n = !0
  for (let s = 0; n && s < e.length; s++) n = Vn(e[s], t[s])
  return n
}
function Vn(e, t) {
  if (e === t) return !0
  let n = or(e),
    s = or(t)
  if (n || s) return n && s ? e.getTime() === t.getTime() : !1
  if (((n = De(e)), (s = De(t)), n || s)) return e === t
  if (((n = U(e)), (s = U(t)), n || s)) return n && s ? Xo(e, t) : !1
  if (((n = ee(e)), (s = ee(t)), n || s)) {
    if (!n || !s) return !1
    const r = Object.keys(e).length,
      i = Object.keys(t).length
    if (r !== i) return !1
    for (const o in e) {
      const l = e.hasOwnProperty(o),
        c = t.hasOwnProperty(o)
      if ((l && !c) || (!l && c) || !Vn(e[o], t[o])) return !1
    }
  }
  return String(e) === String(t)
}
function Yo(e, t) {
  return e.findIndex((n) => Vn(n, t))
}
const ii = (e) => !!(e && e.__v_isRef === !0),
  Jo = (e) =>
    oe(e) ? e : e == null ? '' : U(e) || (ee(e) && (e.toString === ti || !G(e.toString))) ? (ii(e) ? Jo(e.value) : JSON.stringify(e, oi, 2)) : String(e),
  oi = (e, t) =>
    ii(t)
      ? oi(e, t.value)
      : Ot(t)
        ? { [`Map(${t.size})`]: [...t.entries()].reduce((n, [s, r], i) => ((n[ts(s, i) + ' =>'] = r), n), {}) }
        : Hn(t)
          ? { [`Set(${t.size})`]: [...t.values()].map((n) => ts(n)) }
          : De(t)
            ? ts(t)
            : ee(t) && !U(t) && !ni(t)
              ? String(t)
              : t,
  ts = (e, t = '') => {
    var n
    return De(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  }
/**
 * @vue/reactivity v3.5.13
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ let _e
class zo {
  constructor(t = !1) {
    ;(this.detached = t),
      (this._active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this._isPaused = !1),
      (this.parent = _e),
      !t && _e && (this.index = (_e.scopes || (_e.scopes = [])).push(this) - 1)
  }
  get active() {
    return this._active
  }
  pause() {
    if (this._active) {
      this._isPaused = !0
      let t, n
      if (this.scopes) for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].pause()
      for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].pause()
    }
  }
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1
      let t, n
      if (this.scopes) for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].resume()
      for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].resume()
    }
  }
  run(t) {
    if (this._active) {
      const n = _e
      try {
        return (_e = this), t()
      } finally {
        _e = n
      }
    }
  }
  on() {
    _e = this
  }
  off() {
    _e = this.parent
  }
  stop(t) {
    if (this._active) {
      this._active = !1
      let n, s
      for (n = 0, s = this.effects.length; n < s; n++) this.effects[n].stop()
      for (this.effects.length = 0, n = 0, s = this.cleanups.length; n < s; n++) this.cleanups[n]()
      if (((this.cleanups.length = 0), this.scopes)) {
        for (n = 0, s = this.scopes.length; n < s; n++) this.scopes[n].stop(!0)
        this.scopes.length = 0
      }
      if (!this.detached && this.parent && !t) {
        const r = this.parent.scopes.pop()
        r && r !== this && ((this.parent.scopes[this.index] = r), (r.index = this.index))
      }
      this.parent = void 0
    }
  }
}
function li() {
  return _e
}
function Qo(e, t = !1) {
  _e && _e.cleanups.push(e)
}
let se
const ns = new WeakSet()
class ci {
  constructor(t) {
    ;(this.fn = t),
      (this.deps = void 0),
      (this.depsTail = void 0),
      (this.flags = 5),
      (this.next = void 0),
      (this.cleanup = void 0),
      (this.scheduler = void 0),
      _e && _e.active && _e.effects.push(this)
  }
  pause() {
    this.flags |= 64
  }
  resume() {
    this.flags & 64 && ((this.flags &= -65), ns.has(this) && (ns.delete(this), this.trigger()))
  }
  notify() {
    ;(this.flags & 2 && !(this.flags & 32)) || this.flags & 8 || fi(this)
  }
  run() {
    if (!(this.flags & 1)) return this.fn()
    ;(this.flags |= 2), cr(this), ui(this)
    const t = se,
      n = He
    ;(se = this), (He = !0)
    try {
      return this.fn()
    } finally {
      di(this), (se = t), (He = n), (this.flags &= -3)
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep) Ks(t)
      ;(this.deps = this.depsTail = void 0), cr(this), this.onStop && this.onStop(), (this.flags &= -2)
    }
  }
  trigger() {
    this.flags & 64 ? ns.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty()
  }
  runIfDirty() {
    xs(this) && this.run()
  }
  get dirty() {
    return xs(this)
  }
}
let ai = 0,
  Vt,
  kt
function fi(e, t = !1) {
  if (((e.flags |= 8), t)) {
    ;(e.next = kt), (kt = e)
    return
  }
  ;(e.next = Vt), (Vt = e)
}
function Ws() {
  ai++
}
function Bs() {
  if (--ai > 0) return
  if (kt) {
    let t = kt
    for (kt = void 0; t; ) {
      const n = t.next
      ;(t.next = void 0), (t.flags &= -9), (t = n)
    }
  }
  let e
  for (; Vt; ) {
    let t = Vt
    for (Vt = void 0; t; ) {
      const n = t.next
      if (((t.next = void 0), (t.flags &= -9), t.flags & 1))
        try {
          t.trigger()
        } catch (s) {
          e || (e = s)
        }
      t = n
    }
  }
  if (e) throw e
}
function ui(e) {
  for (let t = e.deps; t; t = t.nextDep) (t.version = -1), (t.prevActiveLink = t.dep.activeLink), (t.dep.activeLink = t)
}
function di(e) {
  let t,
    n = e.depsTail,
    s = n
  for (; s; ) {
    const r = s.prevDep
    s.version === -1 ? (s === n && (n = r), Ks(s), Zo(s)) : (t = s), (s.dep.activeLink = s.prevActiveLink), (s.prevActiveLink = void 0), (s = r)
  }
  ;(e.deps = t), (e.depsTail = n)
}
function xs(e) {
  for (let t = e.deps; t; t = t.nextDep) if (t.dep.version !== t.version || (t.dep.computed && (hi(t.dep.computed) || t.dep.version !== t.version))) return !0
  return !!e._dirty
}
function hi(e) {
  if ((e.flags & 4 && !(e.flags & 16)) || ((e.flags &= -17), e.globalVersion === Kt)) return
  e.globalVersion = Kt
  const t = e.dep
  if (((e.flags |= 2), t.version > 0 && !e.isSSR && e.deps && !xs(e))) {
    e.flags &= -3
    return
  }
  const n = se,
    s = He
  ;(se = e), (He = !0)
  try {
    ui(e)
    const r = e.fn(e._value)
    ;(t.version === 0 || nt(r, e._value)) && ((e._value = r), t.version++)
  } catch (r) {
    throw (t.version++, r)
  } finally {
    ;(se = n), (He = s), di(e), (e.flags &= -3)
  }
}
function Ks(e, t = !1) {
  const { dep: n, prevSub: s, nextSub: r } = e
  if ((s && ((s.nextSub = r), (e.prevSub = void 0)), r && ((r.prevSub = s), (e.nextSub = void 0)), n.subs === e && ((n.subs = s), !s && n.computed))) {
    n.computed.flags &= -5
    for (let i = n.computed.deps; i; i = i.nextDep) Ks(i, !0)
  }
  !t && !--n.sc && n.map && n.map.delete(n.key)
}
function Zo(e) {
  const { prevDep: t, nextDep: n } = e
  t && ((t.nextDep = n), (e.prevDep = void 0)), n && ((n.prevDep = t), (e.nextDep = void 0))
}
let He = !0
const pi = []
function it() {
  pi.push(He), (He = !1)
}
function ot() {
  const e = pi.pop()
  He = e === void 0 ? !0 : e
}
function cr(e) {
  const { cleanup: t } = e
  if (((e.cleanup = void 0), t)) {
    const n = se
    se = void 0
    try {
      t()
    } finally {
      se = n
    }
  }
}
let Kt = 0
class el {
  constructor(t, n) {
    ;(this.sub = t), (this.dep = n), (this.version = n.version), (this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0)
  }
}
class kn {
  constructor(t) {
    ;(this.computed = t), (this.version = 0), (this.activeLink = void 0), (this.subs = void 0), (this.map = void 0), (this.key = void 0), (this.sc = 0)
  }
  track(t) {
    if (!se || !He || se === this.computed) return
    let n = this.activeLink
    if (n === void 0 || n.sub !== se)
      (n = this.activeLink = new el(se, this)),
        se.deps ? ((n.prevDep = se.depsTail), (se.depsTail.nextDep = n), (se.depsTail = n)) : (se.deps = se.depsTail = n),
        gi(n)
    else if (n.version === -1 && ((n.version = this.version), n.nextDep)) {
      const s = n.nextDep
      ;(s.prevDep = n.prevDep),
        n.prevDep && (n.prevDep.nextDep = s),
        (n.prevDep = se.depsTail),
        (n.nextDep = void 0),
        (se.depsTail.nextDep = n),
        (se.depsTail = n),
        se.deps === n && (se.deps = s)
    }
    return n
  }
  trigger(t) {
    this.version++, Kt++, this.notify(t)
  }
  notify(t) {
    Ws()
    try {
      for (let n = this.subs; n; n = n.prevSub) n.sub.notify() && n.sub.dep.notify()
    } finally {
      Bs()
    }
  }
}
function gi(e) {
  if ((e.dep.sc++, e.sub.flags & 4)) {
    const t = e.dep.computed
    if (t && !e.dep.subs) {
      t.flags |= 20
      for (let s = t.deps; s; s = s.nextDep) gi(s)
    }
    const n = e.dep.subs
    n !== e && ((e.prevSub = n), n && (n.nextSub = e)), (e.dep.subs = e)
  }
}
const An = new WeakMap(),
  pt = Symbol(''),
  Ts = Symbol(''),
  qt = Symbol('')
function me(e, t, n) {
  if (He && se) {
    let s = An.get(e)
    s || An.set(e, (s = new Map()))
    let r = s.get(n)
    r || (s.set(n, (r = new kn())), (r.map = s), (r.key = n)), r.track()
  }
}
function Ge(e, t, n, s, r, i) {
  const o = An.get(e)
  if (!o) {
    Kt++
    return
  }
  const l = (c) => {
    c && c.trigger()
  }
  if ((Ws(), t === 'clear')) o.forEach(l)
  else {
    const c = U(e),
      f = c && Vs(n)
    if (c && n === 'length') {
      const a = Number(s)
      o.forEach((h, v) => {
        ;(v === 'length' || v === qt || (!De(v) && v >= a)) && l(h)
      })
    } else
      switch (((n !== void 0 || o.has(void 0)) && l(o.get(n)), f && l(o.get(qt)), t)) {
        case 'add':
          c ? f && l(o.get('length')) : (l(o.get(pt)), Ot(e) && l(o.get(Ts)))
          break
        case 'delete':
          c || (l(o.get(pt)), Ot(e) && l(o.get(Ts)))
          break
        case 'set':
          Ot(e) && l(o.get(pt))
          break
      }
  }
  Bs()
}
function tl(e, t) {
  const n = An.get(e)
  return n && n.get(t)
}
function Et(e) {
  const t = z(e)
  return t === e ? t : (me(t, 'iterate', qt), Ie(e) ? t : t.map(ve))
}
function Un(e) {
  return me((e = z(e)), 'iterate', qt), e
}
const nl = {
  __proto__: null,
  [Symbol.iterator]() {
    return ss(this, Symbol.iterator, ve)
  },
  concat(...e) {
    return Et(this).concat(...e.map((t) => (U(t) ? Et(t) : t)))
  },
  entries() {
    return ss(this, 'entries', (e) => ((e[1] = ve(e[1])), e))
  },
  every(e, t) {
    return Be(this, 'every', e, t, void 0, arguments)
  },
  filter(e, t) {
    return Be(this, 'filter', e, t, (n) => n.map(ve), arguments)
  },
  find(e, t) {
    return Be(this, 'find', e, t, ve, arguments)
  },
  findIndex(e, t) {
    return Be(this, 'findIndex', e, t, void 0, arguments)
  },
  findLast(e, t) {
    return Be(this, 'findLast', e, t, ve, arguments)
  },
  findLastIndex(e, t) {
    return Be(this, 'findLastIndex', e, t, void 0, arguments)
  },
  forEach(e, t) {
    return Be(this, 'forEach', e, t, void 0, arguments)
  },
  includes(...e) {
    return rs(this, 'includes', e)
  },
  indexOf(...e) {
    return rs(this, 'indexOf', e)
  },
  join(e) {
    return Et(this).join(e)
  },
  lastIndexOf(...e) {
    return rs(this, 'lastIndexOf', e)
  },
  map(e, t) {
    return Be(this, 'map', e, t, void 0, arguments)
  },
  pop() {
    return Dt(this, 'pop')
  },
  push(...e) {
    return Dt(this, 'push', e)
  },
  reduce(e, ...t) {
    return ar(this, 'reduce', e, t)
  },
  reduceRight(e, ...t) {
    return ar(this, 'reduceRight', e, t)
  },
  shift() {
    return Dt(this, 'shift')
  },
  some(e, t) {
    return Be(this, 'some', e, t, void 0, arguments)
  },
  splice(...e) {
    return Dt(this, 'splice', e)
  },
  toReversed() {
    return Et(this).toReversed()
  },
  toSorted(e) {
    return Et(this).toSorted(e)
  },
  toSpliced(...e) {
    return Et(this).toSpliced(...e)
  },
  unshift(...e) {
    return Dt(this, 'unshift', e)
  },
  values() {
    return ss(this, 'values', ve)
  }
}
function ss(e, t, n) {
  const s = Un(e),
    r = s[t]()
  return (
    s !== e &&
      !Ie(e) &&
      ((r._next = r.next),
      (r.next = () => {
        const i = r._next()
        return i.value && (i.value = n(i.value)), i
      })),
    r
  )
}
const sl = Array.prototype
function Be(e, t, n, s, r, i) {
  const o = Un(e),
    l = o !== e && !Ie(e),
    c = o[t]
  if (c !== sl[t]) {
    const h = c.apply(e, i)
    return l ? ve(h) : h
  }
  let f = n
  o !== e &&
    (l
      ? (f = function (h, v) {
          return n.call(this, ve(h), v, e)
        })
      : n.length > 2 &&
        (f = function (h, v) {
          return n.call(this, h, v, e)
        }))
  const a = c.call(o, f, s)
  return l && r ? r(a) : a
}
function ar(e, t, n, s) {
  const r = Un(e)
  let i = n
  return (
    r !== e &&
      (Ie(e)
        ? n.length > 3 &&
          (i = function (o, l, c) {
            return n.call(this, o, l, c, e)
          })
        : (i = function (o, l, c) {
            return n.call(this, o, ve(l), c, e)
          })),
    r[t](i, ...s)
  )
}
function rs(e, t, n) {
  const s = z(e)
  me(s, 'iterate', qt)
  const r = s[t](...n)
  return (r === -1 || r === !1) && Xs(n[0]) ? ((n[0] = z(n[0])), s[t](...n)) : r
}
function Dt(e, t, n = []) {
  it(), Ws()
  const s = z(e)[t].apply(e, n)
  return Bs(), ot(), s
}
const rl = Ds('__proto__,__v_isRef,__isVue'),
  mi = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== 'arguments' && e !== 'caller')
      .map((e) => Symbol[e])
      .filter(De)
  )
function il(e) {
  De(e) || (e = String(e))
  const t = z(this)
  return me(t, 'has', e), t.hasOwnProperty(e)
}
class vi {
  constructor(t = !1, n = !1) {
    ;(this._isReadonly = t), (this._isShallow = n)
  }
  get(t, n, s) {
    if (n === '__v_skip') return t.__v_skip
    const r = this._isReadonly,
      i = this._isShallow
    if (n === '__v_isReactive') return !r
    if (n === '__v_isReadonly') return r
    if (n === '__v_isShallow') return i
    if (n === '__v_raw') return s === (r ? (i ? gl : wi) : i ? _i : bi).get(t) || Object.getPrototypeOf(t) === Object.getPrototypeOf(s) ? t : void 0
    const o = U(t)
    if (!r) {
      let c
      if (o && (c = nl[n])) return c
      if (n === 'hasOwnProperty') return il
    }
    const l = Reflect.get(t, n, fe(t) ? t : s)
    return (De(n) ? mi.has(n) : rl(n)) || (r || me(t, 'get', n), i) ? l : fe(l) ? (o && Vs(n) ? l : l.value) : ee(l) ? (r ? Wn(l) : Lt(l)) : l
  }
}
class yi extends vi {
  constructor(t = !1) {
    super(!1, t)
  }
  set(t, n, s, r) {
    let i = t[n]
    if (!this._isShallow) {
      const c = St(i)
      if ((!Ie(s) && !St(s) && ((i = z(i)), (s = z(s))), !U(t) && fe(i) && !fe(s))) return c ? !1 : ((i.value = s), !0)
    }
    const o = U(t) && Vs(n) ? Number(n) < t.length : Q(t, n),
      l = Reflect.set(t, n, s, fe(t) ? t : r)
    return t === z(r) && (o ? nt(s, i) && Ge(t, 'set', n, s) : Ge(t, 'add', n, s)), l
  }
  deleteProperty(t, n) {
    const s = Q(t, n)
    t[n]
    const r = Reflect.deleteProperty(t, n)
    return r && s && Ge(t, 'delete', n, void 0), r
  }
  has(t, n) {
    const s = Reflect.has(t, n)
    return (!De(n) || !mi.has(n)) && me(t, 'has', n), s
  }
  ownKeys(t) {
    return me(t, 'iterate', U(t) ? 'length' : pt), Reflect.ownKeys(t)
  }
}
class ol extends vi {
  constructor(t = !1) {
    super(!0, t)
  }
  set(t, n) {
    return !0
  }
  deleteProperty(t, n) {
    return !0
  }
}
const ll = new yi(),
  cl = new ol(),
  al = new yi(!0)
const Es = (e) => e,
  an = (e) => Reflect.getPrototypeOf(e)
function fl(e, t, n) {
  return function (...s) {
    const r = this.__v_raw,
      i = z(r),
      o = Ot(i),
      l = e === 'entries' || (e === Symbol.iterator && o),
      c = e === 'keys' && o,
      f = r[e](...s),
      a = n ? Es : t ? Cs : ve
    return (
      !t && me(i, 'iterate', c ? Ts : pt),
      {
        next() {
          const { value: h, done: v } = f.next()
          return v ? { value: h, done: v } : { value: l ? [a(h[0]), a(h[1])] : a(h), done: v }
        },
        [Symbol.iterator]() {
          return this
        }
      }
    )
  }
}
function fn(e) {
  return function (...t) {
    return e === 'delete' ? !1 : e === 'clear' ? void 0 : this
  }
}
function ul(e, t) {
  const n = {
    get(r) {
      const i = this.__v_raw,
        o = z(i),
        l = z(r)
      e || (nt(r, l) && me(o, 'get', r), me(o, 'get', l))
      const { has: c } = an(o),
        f = t ? Es : e ? Cs : ve
      if (c.call(o, r)) return f(i.get(r))
      if (c.call(o, l)) return f(i.get(l))
      i !== o && i.get(r)
    },
    get size() {
      const r = this.__v_raw
      return !e && me(z(r), 'iterate', pt), Reflect.get(r, 'size', r)
    },
    has(r) {
      const i = this.__v_raw,
        o = z(i),
        l = z(r)
      return e || (nt(r, l) && me(o, 'has', r), me(o, 'has', l)), r === l ? i.has(r) : i.has(r) || i.has(l)
    },
    forEach(r, i) {
      const o = this,
        l = o.__v_raw,
        c = z(l),
        f = t ? Es : e ? Cs : ve
      return !e && me(c, 'iterate', pt), l.forEach((a, h) => r.call(i, f(a), f(h), o))
    }
  }
  return (
    de(
      n,
      e
        ? { add: fn('add'), set: fn('set'), delete: fn('delete'), clear: fn('clear') }
        : {
            add(r) {
              !t && !Ie(r) && !St(r) && (r = z(r))
              const i = z(this)
              return an(i).has.call(i, r) || (i.add(r), Ge(i, 'add', r, r)), this
            },
            set(r, i) {
              !t && !Ie(i) && !St(i) && (i = z(i))
              const o = z(this),
                { has: l, get: c } = an(o)
              let f = l.call(o, r)
              f || ((r = z(r)), (f = l.call(o, r)))
              const a = c.call(o, r)
              return o.set(r, i), f ? nt(i, a) && Ge(o, 'set', r, i) : Ge(o, 'add', r, i), this
            },
            delete(r) {
              const i = z(this),
                { has: o, get: l } = an(i)
              let c = o.call(i, r)
              c || ((r = z(r)), (c = o.call(i, r))), l && l.call(i, r)
              const f = i.delete(r)
              return c && Ge(i, 'delete', r, void 0), f
            },
            clear() {
              const r = z(this),
                i = r.size !== 0,
                o = r.clear()
              return i && Ge(r, 'clear', void 0, void 0), o
            }
          }
    ),
    ['keys', 'values', 'entries', Symbol.iterator].forEach((r) => {
      n[r] = fl(r, e, t)
    }),
    n
  )
}
function qs(e, t) {
  const n = ul(e, t)
  return (s, r, i) => (r === '__v_isReactive' ? !e : r === '__v_isReadonly' ? e : r === '__v_raw' ? s : Reflect.get(Q(n, r) && r in s ? n : s, r, i))
}
const dl = { get: qs(!1, !1) },
  hl = { get: qs(!1, !0) },
  pl = { get: qs(!0, !1) }
const bi = new WeakMap(),
  _i = new WeakMap(),
  wi = new WeakMap(),
  gl = new WeakMap()
function ml(e) {
  switch (e) {
    case 'Object':
    case 'Array':
      return 1
    case 'Map':
    case 'Set':
    case 'WeakMap':
    case 'WeakSet':
      return 2
    default:
      return 0
  }
}
function vl(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : ml(jo(e))
}
function Lt(e) {
  return St(e) ? e : Gs(e, !1, ll, dl, bi)
}
function yl(e) {
  return Gs(e, !1, al, hl, _i)
}
function Wn(e) {
  return Gs(e, !0, cl, pl, wi)
}
function Gs(e, t, n, s, r) {
  if (!ee(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e
  const i = r.get(e)
  if (i) return i
  const o = vl(e)
  if (o === 0) return e
  const l = new Proxy(e, o === 2 ? s : n)
  return r.set(e, l), l
}
function gt(e) {
  return St(e) ? gt(e.__v_raw) : !!(e && e.__v_isReactive)
}
function St(e) {
  return !!(e && e.__v_isReadonly)
}
function Ie(e) {
  return !!(e && e.__v_isShallow)
}
function Xs(e) {
  return e ? !!e.__v_raw : !1
}
function z(e) {
  const t = e && e.__v_raw
  return t ? z(t) : e
}
function Sn(e) {
  return !Q(e, '__v_skip') && Object.isExtensible(e) && si(e, '__v_skip', !0), e
}
const ve = (e) => (ee(e) ? Lt(e) : e),
  Cs = (e) => (ee(e) ? Wn(e) : e)
function fe(e) {
  return e ? e.__v_isRef === !0 : !1
}
function mt(e) {
  return Si(e, !1)
}
function Pe(e) {
  return Si(e, !0)
}
function Si(e, t) {
  return fe(e) ? e : new bl(e, t)
}
class bl {
  constructor(t, n) {
    ;(this.dep = new kn()),
      (this.__v_isRef = !0),
      (this.__v_isShallow = !1),
      (this._rawValue = n ? t : z(t)),
      (this._value = n ? t : ve(t)),
      (this.__v_isShallow = n)
  }
  get value() {
    return this.dep.track(), this._value
  }
  set value(t) {
    const n = this._rawValue,
      s = this.__v_isShallow || Ie(t) || St(t)
    ;(t = s ? t : z(t)), nt(t, n) && ((this._rawValue = t), (this._value = s ? t : ve(t)), this.dep.trigger())
  }
}
function Ys(e) {
  return fe(e) ? e.value : e
}
function le(e) {
  return G(e) ? e() : Ys(e)
}
const _l = {
  get: (e, t, n) => (t === '__v_raw' ? e : Ys(Reflect.get(e, t, n))),
  set: (e, t, n, s) => {
    const r = e[t]
    return fe(r) && !fe(n) ? ((r.value = n), !0) : Reflect.set(e, t, n, s)
  }
}
function xi(e) {
  return gt(e) ? e : new Proxy(e, _l)
}
class wl {
  constructor(t) {
    ;(this.__v_isRef = !0), (this._value = void 0)
    const n = (this.dep = new kn()),
      { get: s, set: r } = t(n.track.bind(n), n.trigger.bind(n))
    ;(this._get = s), (this._set = r)
  }
  get value() {
    return (this._value = this._get())
  }
  set value(t) {
    this._set(t)
  }
}
function Sl(e) {
  return new wl(e)
}
class xl {
  constructor(t, n, s) {
    ;(this._object = t), (this._key = n), (this._defaultValue = s), (this.__v_isRef = !0), (this._value = void 0)
  }
  get value() {
    const t = this._object[this._key]
    return (this._value = t === void 0 ? this._defaultValue : t)
  }
  set value(t) {
    this._object[this._key] = t
  }
  get dep() {
    return tl(z(this._object), this._key)
  }
}
class Tl {
  constructor(t) {
    ;(this._getter = t), (this.__v_isRef = !0), (this.__v_isReadonly = !0), (this._value = void 0)
  }
  get value() {
    return (this._value = this._getter())
  }
}
function El(e, t, n) {
  return fe(e) ? e : G(e) ? new Tl(e) : ee(e) && arguments.length > 1 ? Cl(e, t, n) : mt(e)
}
function Cl(e, t, n) {
  const s = e[t]
  return fe(s) ? s : new xl(e, t, n)
}
class Al {
  constructor(t, n, s) {
    ;(this.fn = t),
      (this.setter = n),
      (this._value = void 0),
      (this.dep = new kn(this)),
      (this.__v_isRef = !0),
      (this.deps = void 0),
      (this.depsTail = void 0),
      (this.flags = 16),
      (this.globalVersion = Kt - 1),
      (this.next = void 0),
      (this.effect = this),
      (this.__v_isReadonly = !n),
      (this.isSSR = s)
  }
  notify() {
    if (((this.flags |= 16), !(this.flags & 8) && se !== this)) return fi(this, !0), !0
  }
  get value() {
    const t = this.dep.track()
    return hi(this), t && (t.version = this.dep.version), this._value
  }
  set value(t) {
    this.setter && this.setter(t)
  }
}
function Rl(e, t, n = !1) {
  let s, r
  return G(e) ? (s = e) : ((s = e.get), (r = e.set)), new Al(s, r, n)
}
const un = {},
  Rn = new WeakMap()
let ut
function Ol(e, t = !1, n = ut) {
  if (n) {
    let s = Rn.get(n)
    s || Rn.set(n, (s = [])), s.push(e)
  }
}
function Ml(e, t, n = te) {
  const { immediate: s, deep: r, once: i, scheduler: o, augmentJob: l, call: c } = n,
    f = (g) => (r ? g : Ie(g) || r === !1 || r === 0 ? Xe(g, 1) : Xe(g))
  let a,
    h,
    v,
    y,
    A = !1,
    P = !1
  if (
    (fe(e)
      ? ((h = () => e.value), (A = Ie(e)))
      : gt(e)
        ? ((h = () => f(e)), (A = !0))
        : U(e)
          ? ((P = !0),
            (A = e.some((g) => gt(g) || Ie(g))),
            (h = () =>
              e.map((g) => {
                if (fe(g)) return g.value
                if (gt(g)) return f(g)
                if (G(g)) return c ? c(g, 2) : g()
              })))
          : G(e)
            ? t
              ? (h = c ? () => c(e, 2) : e)
              : (h = () => {
                  if (v) {
                    it()
                    try {
                      v()
                    } finally {
                      ot()
                    }
                  }
                  const g = ut
                  ut = a
                  try {
                    return c ? c(e, 3, [y]) : e(y)
                  } finally {
                    ut = g
                  }
                })
            : (h = We),
    t && r)
  ) {
    const g = h,
      M = r === !0 ? 1 / 0 : r
    h = () => Xe(g(), M)
  }
  const K = li(),
    H = () => {
      a.stop(), K && K.active && $s(K.effects, a)
    }
  if (i && t) {
    const g = t
    t = (...M) => {
      g(...M), H()
    }
  }
  let k = P ? new Array(e.length).fill(un) : un
  const p = (g) => {
    if (!(!(a.flags & 1) || (!a.dirty && !g)))
      if (t) {
        const M = a.run()
        if (r || A || (P ? M.some((V, R) => nt(V, k[R])) : nt(M, k))) {
          v && v()
          const V = ut
          ut = a
          try {
            const R = [M, k === un ? void 0 : P && k[0] === un ? [] : k, y]
            c ? c(t, 3, R) : t(...R), (k = M)
          } finally {
            ut = V
          }
        }
      } else a.run()
  }
  return (
    l && l(p),
    (a = new ci(h)),
    (a.scheduler = o ? () => o(p, !1) : p),
    (y = (g) => Ol(g, !1, a)),
    (v = a.onStop =
      () => {
        const g = Rn.get(a)
        if (g) {
          if (c) c(g, 4)
          else for (const M of g) M()
          Rn.delete(a)
        }
      }),
    t ? (s ? p(!0) : (k = a.run())) : o ? o(p.bind(null, !0), !0) : a.run(),
    (H.pause = a.pause.bind(a)),
    (H.resume = a.resume.bind(a)),
    (H.stop = H),
    H
  )
}
function Xe(e, t = 1 / 0, n) {
  if (t <= 0 || !ee(e) || e.__v_skip || ((n = n || new Set()), n.has(e))) return e
  if ((n.add(e), t--, fe(e))) Xe(e.value, t, n)
  else if (U(e)) for (let s = 0; s < e.length; s++) Xe(e[s], t, n)
  else if (Hn(e) || Ot(e))
    e.forEach((s) => {
      Xe(s, t, n)
    })
  else if (ni(e)) {
    for (const s in e) Xe(e[s], t, n)
    for (const s of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, s) && Xe(e[s], t, n)
  }
  return e
}
/**
 * @vue/runtime-core v3.5.13
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ function nn(e, t, n, s) {
  try {
    return s ? e(...s) : e()
  } catch (r) {
    Bn(r, t, n)
  }
}
function je(e, t, n, s) {
  if (G(e)) {
    const r = nn(e, t, n, s)
    return (
      r &&
        ei(r) &&
        r.catch((i) => {
          Bn(i, t, n)
        }),
      r
    )
  }
  if (U(e)) {
    const r = []
    for (let i = 0; i < e.length; i++) r.push(je(e[i], t, n, s))
    return r
  }
}
function Bn(e, t, n, s = !0) {
  const r = t ? t.vnode : null,
    { errorHandler: i, throwUnhandledErrorInProduction: o } = (t && t.appContext.config) || te
  if (t) {
    let l = t.parent
    const c = t.proxy,
      f = `https://vuejs.org/error-reference/#runtime-${n}`
    for (; l; ) {
      const a = l.ec
      if (a) {
        for (let h = 0; h < a.length; h++) if (a[h](e, c, f) === !1) return
      }
      l = l.parent
    }
    if (i) {
      it(), nn(i, null, 10, [e, c, f]), ot()
      return
    }
  }
  Il(e, n, r, s, o)
}
function Il(e, t, n, s = !0, r = !1) {
  if (r) throw e
  console.error(e)
}
const we = []
let ke = -1
const It = []
let Ze = null,
  At = 0
const Ti = Promise.resolve()
let On = null
function sn(e) {
  const t = On || Ti
  return e ? t.then(this ? e.bind(this) : e) : t
}
function Pl(e) {
  let t = ke + 1,
    n = we.length
  for (; t < n; ) {
    const s = (t + n) >>> 1,
      r = we[s],
      i = Gt(r)
    i < e || (i === e && r.flags & 2) ? (t = s + 1) : (n = s)
  }
  return t
}
function Js(e) {
  if (!(e.flags & 1)) {
    const t = Gt(e),
      n = we[we.length - 1]
    !n || (!(e.flags & 2) && t >= Gt(n)) ? we.push(e) : we.splice(Pl(t), 0, e), (e.flags |= 1), Ei()
  }
}
function Ei() {
  On || (On = Ti.then(Ci))
}
function Ll(e) {
  U(e) ? It.push(...e) : Ze && e.id === -1 ? Ze.splice(At + 1, 0, e) : e.flags & 1 || (It.push(e), (e.flags |= 1)), Ei()
}
function fr(e, t, n = ke + 1) {
  for (; n < we.length; n++) {
    const s = we[n]
    if (s && s.flags & 2) {
      if (e && s.id !== e.uid) continue
      we.splice(n, 1), n--, s.flags & 4 && (s.flags &= -2), s(), s.flags & 4 || (s.flags &= -2)
    }
  }
}
function Mn(e) {
  if (It.length) {
    const t = [...new Set(It)].sort((n, s) => Gt(n) - Gt(s))
    if (((It.length = 0), Ze)) {
      Ze.push(...t)
      return
    }
    for (Ze = t, At = 0; At < Ze.length; At++) {
      const n = Ze[At]
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), (n.flags &= -2)
    }
    ;(Ze = null), (At = 0)
  }
}
const Gt = (e) => (e.id == null ? (e.flags & 2 ? -1 : 1 / 0) : e.id)
function Ci(e) {
  try {
    for (ke = 0; ke < we.length; ke++) {
      const t = we[ke]
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), nn(t, t.i, t.i ? 15 : 14), t.flags & 4 || (t.flags &= -2))
    }
  } finally {
    for (; ke < we.length; ke++) {
      const t = we[ke]
      t && (t.flags &= -2)
    }
    ;(ke = -1), (we.length = 0), Mn(), (On = null), (we.length || It.length) && Ci()
  }
}
let ae = null,
  Ai = null
function In(e) {
  const t = ae
  return (ae = e), (Ai = (e && e.type.__scopeId) || null), t
}
function Nl(e, t = ae, n) {
  if (!t || e._n) return e
  const s = (...r) => {
    s._d && Sr(-1)
    const i = In(t)
    let o
    try {
      o = e(...r)
    } finally {
      In(i), s._d && Sr(1)
    }
    return o
  }
  return (s._n = !0), (s._c = !0), (s._d = !0), s
}
function _f(e, t) {
  if (ae === null) return e
  const n = Jn(ae),
    s = e.dirs || (e.dirs = [])
  for (let r = 0; r < t.length; r++) {
    let [i, o, l, c = te] = t[r]
    i && (G(i) && (i = { mounted: i, updated: i }), i.deep && Xe(o), s.push({ dir: i, instance: n, value: o, oldValue: void 0, arg: l, modifiers: c }))
  }
  return e
}
function Ue(e, t, n, s) {
  const r = e.dirs,
    i = t && t.dirs
  for (let o = 0; o < r.length; o++) {
    const l = r[o]
    i && (l.oldValue = i[o].value)
    let c = l.dir[s]
    c && (it(), je(c, n, 8, [e.el, l, e, t]), ot())
  }
}
const Fl = Symbol('_vte'),
  Ri = (e) => e.__isTeleport,
  et = Symbol('_leaveCb'),
  dn = Symbol('_enterCb')
function Hl() {
  const e = { isMounted: !1, isLeaving: !1, isUnmounting: !1, leavingVNodes: new Map() }
  return (
    Nt(() => {
      e.isMounted = !0
    }),
    Di(() => {
      e.isUnmounting = !0
    }),
    e
  )
}
const Re = [Function, Array],
  Oi = {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    onBeforeEnter: Re,
    onEnter: Re,
    onAfterEnter: Re,
    onEnterCancelled: Re,
    onBeforeLeave: Re,
    onLeave: Re,
    onAfterLeave: Re,
    onLeaveCancelled: Re,
    onBeforeAppear: Re,
    onAppear: Re,
    onAfterAppear: Re,
    onAppearCancelled: Re
  },
  Mi = (e) => {
    const t = e.subTree
    return t.component ? Mi(t.component) : t
  },
  Dl = {
    name: 'BaseTransition',
    props: Oi,
    setup(e, { slots: t }) {
      const n = rn(),
        s = Hl()
      return () => {
        const r = t.default && Li(t.default(), !0)
        if (!r || !r.length) return
        const i = Ii(r),
          o = z(e),
          { mode: l } = o
        if (s.isLeaving) return is(i)
        const c = ur(i)
        if (!c) return is(i)
        let f = As(c, o, s, n, (h) => (f = h))
        c.type !== ye && Xt(c, f)
        let a = n.subTree && ur(n.subTree)
        if (a && a.type !== ye && !dt(c, a) && Mi(n).type !== ye) {
          let h = As(a, o, s, n)
          if ((Xt(a, h), l === 'out-in' && c.type !== ye))
            return (
              (s.isLeaving = !0),
              (h.afterLeave = () => {
                ;(s.isLeaving = !1), n.job.flags & 8 || n.update(), delete h.afterLeave, (a = void 0)
              }),
              is(i)
            )
          l === 'in-out' && c.type !== ye
            ? (h.delayLeave = (v, y, A) => {
                const P = Pi(s, a)
                ;(P[String(a.key)] = a),
                  (v[et] = () => {
                    y(), (v[et] = void 0), delete f.delayedLeave, (a = void 0)
                  }),
                  (f.delayedLeave = () => {
                    A(), delete f.delayedLeave, (a = void 0)
                  })
              })
            : (a = void 0)
        } else a && (a = void 0)
        return i
      }
    }
  }
function Ii(e) {
  let t = e[0]
  if (e.length > 1) {
    for (const n of e)
      if (n.type !== ye) {
        t = n
        break
      }
  }
  return t
}
const jl = Dl
function Pi(e, t) {
  const { leavingVNodes: n } = e
  let s = n.get(t.type)
  return s || ((s = Object.create(null)), n.set(t.type, s)), s
}
function As(e, t, n, s, r) {
  const {
      appear: i,
      mode: o,
      persisted: l = !1,
      onBeforeEnter: c,
      onEnter: f,
      onAfterEnter: a,
      onEnterCancelled: h,
      onBeforeLeave: v,
      onLeave: y,
      onAfterLeave: A,
      onLeaveCancelled: P,
      onBeforeAppear: K,
      onAppear: H,
      onAfterAppear: k,
      onAppearCancelled: p
    } = t,
    g = String(e.key),
    M = Pi(n, e),
    V = (T, I) => {
      T && je(T, s, 9, I)
    },
    R = (T, I) => {
      const E = I[1]
      V(T, I), U(T) ? T.every((b) => b.length <= 1) && E() : T.length <= 1 && E()
    },
    W = {
      mode: o,
      persisted: l,
      beforeEnter(T) {
        let I = c
        if (!n.isMounted)
          if (i) I = K || c
          else return
        T[et] && T[et](!0)
        const E = M[g]
        E && dt(e, E) && E.el[et] && E.el[et](), V(I, [T])
      },
      enter(T) {
        let I = f,
          E = a,
          b = h
        if (!n.isMounted)
          if (i) (I = H || f), (E = k || a), (b = p || h)
          else return
        let N = !1
        const Y = (T[dn] = (re) => {
          N || ((N = !0), re ? V(b, [T]) : V(E, [T]), W.delayedLeave && W.delayedLeave(), (T[dn] = void 0))
        })
        I ? R(I, [T, Y]) : Y()
      },
      leave(T, I) {
        const E = String(e.key)
        if ((T[dn] && T[dn](!0), n.isUnmounting)) return I()
        V(v, [T])
        let b = !1
        const N = (T[et] = (Y) => {
          b || ((b = !0), I(), Y ? V(P, [T]) : V(A, [T]), (T[et] = void 0), M[E] === e && delete M[E])
        })
        ;(M[E] = e), y ? R(y, [T, N]) : N()
      },
      clone(T) {
        const I = As(T, t, n, s, r)
        return r && r(I), I
      }
    }
  return W
}
function is(e) {
  if (Kn(e)) return (e = st(e)), (e.children = null), e
}
function ur(e) {
  if (!Kn(e)) return Ri(e.type) && e.children ? Ii(e.children) : e
  const { shapeFlag: t, children: n } = e
  if (n) {
    if (t & 16) return n[0]
    if (t & 32 && G(n.default)) return n.default()
  }
}
function Xt(e, t) {
  e.shapeFlag & 6 && e.component
    ? ((e.transition = t), Xt(e.component.subTree, t))
    : e.shapeFlag & 128
      ? ((e.ssContent.transition = t.clone(e.ssContent)), (e.ssFallback.transition = t.clone(e.ssFallback)))
      : (e.transition = t)
}
function Li(e, t = !1, n) {
  let s = [],
    r = 0
  for (let i = 0; i < e.length; i++) {
    let o = e[i]
    const l = n == null ? o.key : String(n) + String(o.key != null ? o.key : i)
    o.type === Se ? (o.patchFlag & 128 && r++, (s = s.concat(Li(o.children, t, l)))) : (t || o.type !== ye) && s.push(l != null ? st(o, { key: l }) : o)
  }
  if (r > 1) for (let i = 0; i < s.length; i++) s[i].patchFlag = -2
  return s
}
/*! #__NO_SIDE_EFFECTS__ */ function Ni(e, t) {
  return G(e) ? de({ name: e.name }, t, { setup: e }) : e
}
function Fi(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + '-', 0, 0]
}
function Yt(e, t, n, s, r = !1) {
  if (U(e)) {
    e.forEach((A, P) => Yt(A, t && (U(t) ? t[P] : t), n, s, r))
    return
  }
  if (vt(s) && !r) {
    s.shapeFlag & 512 && s.type.__asyncResolved && s.component.subTree.component && Yt(e, t, n, s.component.subTree)
    return
  }
  const i = s.shapeFlag & 4 ? Jn(s.component) : s.el,
    o = r ? null : i,
    { i: l, r: c } = e,
    f = t && t.r,
    a = l.refs === te ? (l.refs = {}) : l.refs,
    h = l.setupState,
    v = z(h),
    y = h === te ? () => !1 : (A) => Q(v, A)
  if ((f != null && f !== c && (oe(f) ? ((a[f] = null), y(f) && (h[f] = null)) : fe(f) && (f.value = null)), G(c))) nn(c, l, 12, [o, a])
  else {
    const A = oe(c),
      P = fe(c)
    if (A || P) {
      const K = () => {
        if (e.f) {
          const H = A ? (y(c) ? h[c] : a[c]) : c.value
          r ? U(H) && $s(H, i) : U(H) ? H.includes(i) || H.push(i) : A ? ((a[c] = [i]), y(c) && (h[c] = a[c])) : ((c.value = [i]), e.k && (a[e.k] = c.value))
        } else A ? ((a[c] = o), y(c) && (h[c] = o)) : P && ((c.value = o), e.k && (a[e.k] = o))
      }
      o ? ((K.id = -1), Ce(K, n)) : K()
    }
  }
}
let dr = !1
const Ct = () => {
    dr || (console.error('Hydration completed but contains mismatches.'), (dr = !0))
  },
  $l = (e) => e.namespaceURI.includes('svg') && e.tagName !== 'foreignObject',
  Vl = (e) => e.namespaceURI.includes('MathML'),
  hn = (e) => {
    if (e.nodeType === 1) {
      if ($l(e)) return 'svg'
      if (Vl(e)) return 'mathml'
    }
  },
  pn = (e) => e.nodeType === 8
function kl(e) {
  const {
      mt: t,
      p: n,
      o: { patchProp: s, createText: r, nextSibling: i, parentNode: o, remove: l, insert: c, createComment: f }
    } = e,
    a = (p, g) => {
      if (!g.hasChildNodes()) {
        n(null, p, g), Mn(), (g._vnode = p)
        return
      }
      h(g.firstChild, p, null, null, null), Mn(), (g._vnode = p)
    },
    h = (p, g, M, V, R, W = !1) => {
      W = W || !!g.dynamicChildren
      const T = pn(p) && p.data === '[',
        I = () => P(p, g, M, V, R, T),
        { type: E, ref: b, shapeFlag: N, patchFlag: Y } = g
      let re = p.nodeType
      ;(g.el = p), Y === -2 && ((W = !1), (g.dynamicChildren = null))
      let j = null
      switch (E) {
        case _t:
          re !== 3
            ? g.children === ''
              ? (c((g.el = r('')), o(p), p), (j = p))
              : (j = I())
            : (p.data !== g.children && (Ct(), (p.data = g.children)), (j = i(p)))
          break
        case ye:
          k(p) ? ((j = i(p)), H((g.el = p.content.firstChild), p, M)) : re !== 8 || T ? (j = I()) : (j = i(p))
          break
        case Wt:
          if ((T && ((p = i(p)), (re = p.nodeType)), re === 1 || re === 3)) {
            j = p
            const X = !g.children.length
            for (let D = 0; D < g.staticCount; D++)
              X && (g.children += j.nodeType === 1 ? j.outerHTML : j.data), D === g.staticCount - 1 && (g.anchor = j), (j = i(j))
            return T ? i(j) : j
          } else I()
          break
        case Se:
          T ? (j = A(p, g, M, V, R, W)) : (j = I())
          break
        default:
          if (N & 1) (re !== 1 || g.type.toLowerCase() !== p.tagName.toLowerCase()) && !k(p) ? (j = I()) : (j = v(p, g, M, V, R, W))
          else if (N & 6) {
            g.slotScopeIds = R
            const X = o(p)
            if (
              (T ? (j = K(p)) : pn(p) && p.data === 'teleport start' ? (j = K(p, p.data, 'teleport end')) : (j = i(p)),
              t(g, X, null, M, V, hn(X), W),
              vt(g) && !g.type.__asyncResolved)
            ) {
              let D
              T ? ((D = he(Se)), (D.anchor = j ? j.previousSibling : X.lastChild)) : (D = p.nodeType === 3 ? po('') : he('div')),
                (D.el = p),
                (g.component.subTree = D)
            }
          } else
            N & 64 ? (re !== 8 ? (j = I()) : (j = g.type.hydrate(p, g, M, V, R, W, e, y))) : N & 128 && (j = g.type.hydrate(p, g, M, V, hn(o(p)), R, W, e, h))
      }
      return b != null && Yt(b, null, V, g), j
    },
    v = (p, g, M, V, R, W) => {
      W = W || !!g.dynamicChildren
      const { type: T, props: I, patchFlag: E, shapeFlag: b, dirs: N, transition: Y } = g,
        re = T === 'input' || T === 'option'
      if (re || E !== -1) {
        N && Ue(g, null, M, 'created')
        let j = !1
        if (k(p)) {
          j = to(null, Y) && M && M.vnode.props && M.vnode.props.appear
          const D = p.content.firstChild
          j && Y.beforeEnter(D), H(D, p, M), (g.el = p = D)
        }
        if (b & 16 && !(I && (I.innerHTML || I.textContent))) {
          let D = y(p.firstChild, g, p, M, V, R, W)
          for (; D; ) {
            gn(p, 1) || Ct()
            const ce = D
            ;(D = D.nextSibling), l(ce)
          }
        } else if (b & 8) {
          let D = g.children
          D[0] ===
            `
` &&
            (p.tagName === 'PRE' || p.tagName === 'TEXTAREA') &&
            (D = D.slice(1)),
            p.textContent !== D && (gn(p, 0) || Ct(), (p.textContent = g.children))
        }
        if (I) {
          if (re || !W || E & 48) {
            const D = p.tagName.includes('-')
            for (const ce in I)
              ((re && (ce.endsWith('value') || ce === 'indeterminate')) || (en(ce) && !Mt(ce)) || ce[0] === '.' || D) && s(p, ce, null, I[ce], void 0, M)
          } else if (I.onClick) s(p, 'onClick', null, I.onClick, void 0, M)
          else if (E & 4 && gt(I.style)) for (const D in I.style) I.style[D]
        }
        let X
        ;(X = I && I.onVnodeBeforeMount) && Oe(X, M, g),
          N && Ue(g, null, M, 'beforeMount'),
          ((X = I && I.onVnodeMounted) || N || j) &&
            ao(() => {
              X && Oe(X, M, g), j && Y.enter(p), N && Ue(g, null, M, 'mounted')
            }, V)
      }
      return p.nextSibling
    },
    y = (p, g, M, V, R, W, T) => {
      T = T || !!g.dynamicChildren
      const I = g.children,
        E = I.length
      for (let b = 0; b < E; b++) {
        const N = T ? I[b] : (I[b] = Me(I[b])),
          Y = N.type === _t
        p
          ? (Y && !T && b + 1 < E && Me(I[b + 1]).type === _t && (c(r(p.data.slice(N.children.length)), M, i(p)), (p.data = N.children)),
            (p = h(p, N, V, R, W, T)))
          : Y && !N.children
            ? c((N.el = r('')), M)
            : (gn(M, 1) || Ct(), n(null, N, M, null, V, R, hn(M), W))
      }
      return p
    },
    A = (p, g, M, V, R, W) => {
      const { slotScopeIds: T } = g
      T && (R = R ? R.concat(T) : T)
      const I = o(p),
        E = y(i(p), g, I, M, V, R, W)
      return E && pn(E) && E.data === ']' ? i((g.anchor = E)) : (Ct(), c((g.anchor = f(']')), I, E), E)
    },
    P = (p, g, M, V, R, W) => {
      if ((gn(p.parentElement, 1) || Ct(), (g.el = null), W)) {
        const E = K(p)
        for (;;) {
          const b = i(p)
          if (b && b !== E) l(b)
          else break
        }
      }
      const T = i(p),
        I = o(p)
      return l(p), n(null, g, I, T, M, V, hn(I), R), M && ((M.vnode.el = g.el), lo(M, g.el)), T
    },
    K = (p, g = '[', M = ']') => {
      let V = 0
      for (; p; )
        if (((p = i(p)), p && pn(p) && (p.data === g && V++, p.data === M))) {
          if (V === 0) return i(p)
          V--
        }
      return p
    },
    H = (p, g, M) => {
      const V = g.parentNode
      V && V.replaceChild(p, g)
      let R = M
      for (; R; ) R.vnode.el === g && (R.vnode.el = R.subTree.el = p), (R = R.parent)
    },
    k = (p) => p.nodeType === 1 && p.tagName === 'TEMPLATE'
  return [a, h]
}
const hr = 'data-allow-mismatch',
  Ul = { 0: 'text', 1: 'children', 2: 'class', 3: 'style', 4: 'attribute' }
function gn(e, t) {
  if (t === 0 || t === 1) for (; e && !e.hasAttribute(hr); ) e = e.parentElement
  const n = e && e.getAttribute(hr)
  if (n == null) return !1
  if (n === '') return !0
  {
    const s = n.split(',')
    return t === 0 && s.includes('children') ? !0 : n.split(',').includes(Ul[t])
  }
}
$n().requestIdleCallback
$n().cancelIdleCallback
const vt = (e) => !!e.type.__asyncLoader,
  Kn = (e) => e.type.__isKeepAlive
function Wl(e, t) {
  Hi(e, 'a', t)
}
function Bl(e, t) {
  Hi(e, 'da', t)
}
function Hi(e, t, n = ue) {
  const s =
    e.__wdc ||
    (e.__wdc = () => {
      let r = n
      for (; r; ) {
        if (r.isDeactivated) return
        r = r.parent
      }
      return e()
    })
  if ((qn(t, s, n), n)) {
    let r = n.parent
    for (; r && r.parent; ) Kn(r.parent.vnode) && Kl(s, t, n, r), (r = r.parent)
  }
}
function Kl(e, t, n, s) {
  const r = qn(t, e, s, !0)
  Gn(() => {
    $s(s[t], r)
  }, n)
}
function qn(e, t, n = ue, s = !1) {
  if (n) {
    const r = n[e] || (n[e] = []),
      i =
        t.__weh ||
        (t.__weh = (...o) => {
          it()
          const l = on(n),
            c = je(t, n, e, o)
          return l(), ot(), c
        })
    return s ? r.unshift(i) : r.push(i), i
  }
}
const ze =
    (e) =>
    (t, n = ue) => {
      ;(!Qt || e === 'sp') && qn(e, (...s) => t(...s), n)
    },
  ql = ze('bm'),
  Nt = ze('m'),
  Gl = ze('bu'),
  Xl = ze('u'),
  Di = ze('bum'),
  Gn = ze('um'),
  Yl = ze('sp'),
  Jl = ze('rtg'),
  zl = ze('rtc')
function Ql(e, t = ue) {
  qn('ec', e, t)
}
const ji = 'components'
function wf(e, t) {
  return Vi(ji, e, !0, t) || e
}
const $i = Symbol.for('v-ndc')
function Sf(e) {
  return oe(e) ? Vi(ji, e, !1) || e : e || $i
}
function Vi(e, t, n = !0, s = !1) {
  const r = ae || ue
  if (r) {
    const i = r.type
    {
      const l = Hc(i, !1)
      if (l && (l === t || l === Ne(t) || l === jn(Ne(t)))) return i
    }
    const o = pr(r[e] || i[e], t) || pr(r.appContext[e], t)
    return !o && s ? i : o
  }
}
function pr(e, t) {
  return e && (e[t] || e[Ne(t)] || e[jn(Ne(t))])
}
function xf(e, t, n, s) {
  let r
  const i = n,
    o = U(e)
  if (o || oe(e)) {
    const l = o && gt(e)
    let c = !1
    l && ((c = !Ie(e)), (e = Un(e))), (r = new Array(e.length))
    for (let f = 0, a = e.length; f < a; f++) r[f] = t(c ? ve(e[f]) : e[f], f, void 0, i)
  } else if (typeof e == 'number') {
    r = new Array(e)
    for (let l = 0; l < e; l++) r[l] = t(l + 1, l, void 0, i)
  } else if (ee(e))
    if (e[Symbol.iterator]) r = Array.from(e, (l, c) => t(l, c, void 0, i))
    else {
      const l = Object.keys(e)
      r = new Array(l.length)
      for (let c = 0, f = l.length; c < f; c++) {
        const a = l[c]
        r[c] = t(e[a], a, c, i)
      }
    }
  else r = []
  return r
}
function Tf(e, t, n = {}, s, r) {
  if (ae.ce || (ae.parent && vt(ae.parent) && ae.parent.ce)) return t !== 'default' && (n.name = t), Ps(), Ls(Se, null, [he('slot', n, s && s())], 64)
  let i = e[t]
  i && i._c && (i._d = !1), Ps()
  const o = i && ki(i(n)),
    l = n.key || (o && o.key),
    c = Ls(Se, { key: (l && !De(l) ? l : `_${t}`) + (!o && s ? '_fb' : '') }, o || (s ? s() : []), o && e._ === 1 ? 64 : -2)
  return !r && c.scopeId && (c.slotScopeIds = [c.scopeId + '-s']), i && i._c && (i._d = !0), c
}
function ki(e) {
  return e.some((t) => (zt(t) ? !(t.type === ye || (t.type === Se && !ki(t.children))) : !0)) ? e : null
}
function Ef(e, t) {
  const n = {}
  for (const s in e) n[/[A-Z]/.test(s) ? `on:${s}` : _n(s)] = e[s]
  return n
}
const Rs = (e) => (e ? (go(e) ? Jn(e) : Rs(e.parent)) : null),
  Ut = de(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Rs(e.parent),
    $root: (e) => Rs(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => Wi(e),
    $forceUpdate: (e) =>
      e.f ||
      (e.f = () => {
        Js(e.update)
      }),
    $nextTick: (e) => e.n || (e.n = sn.bind(e.proxy)),
    $watch: (e) => _c.bind(e)
  }),
  os = (e, t) => e !== te && !e.__isScriptSetup && Q(e, t),
  Zl = {
    get({ _: e }, t) {
      if (t === '__v_skip') return !0
      const { ctx: n, setupState: s, data: r, props: i, accessCache: o, type: l, appContext: c } = e
      let f
      if (t[0] !== '$') {
        const y = o[t]
        if (y !== void 0)
          switch (y) {
            case 1:
              return s[t]
            case 2:
              return r[t]
            case 4:
              return n[t]
            case 3:
              return i[t]
          }
        else {
          if (os(s, t)) return (o[t] = 1), s[t]
          if (r !== te && Q(r, t)) return (o[t] = 2), r[t]
          if ((f = e.propsOptions[0]) && Q(f, t)) return (o[t] = 3), i[t]
          if (n !== te && Q(n, t)) return (o[t] = 4), n[t]
          Os && (o[t] = 0)
        }
      }
      const a = Ut[t]
      let h, v
      if (a) return t === '$attrs' && me(e.attrs, 'get', ''), a(e)
      if ((h = l.__cssModules) && (h = h[t])) return h
      if (n !== te && Q(n, t)) return (o[t] = 4), n[t]
      if (((v = c.config.globalProperties), Q(v, t))) return v[t]
    },
    set({ _: e }, t, n) {
      const { data: s, setupState: r, ctx: i } = e
      return os(r, t) ? ((r[t] = n), !0) : s !== te && Q(s, t) ? ((s[t] = n), !0) : Q(e.props, t) || (t[0] === '$' && t.slice(1) in e) ? !1 : ((i[t] = n), !0)
    },
    has({ _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: r, propsOptions: i } }, o) {
      let l
      return !!n[o] || (e !== te && Q(e, o)) || os(t, o) || ((l = i[0]) && Q(l, o)) || Q(s, o) || Q(Ut, o) || Q(r.config.globalProperties, o)
    },
    defineProperty(e, t, n) {
      return n.get != null ? (e._.accessCache[t] = 0) : Q(n, 'value') && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n)
    }
  }
function Cf() {
  return ec().slots
}
function ec() {
  const e = rn()
  return e.setupContext || (e.setupContext = vo(e))
}
function gr(e) {
  return U(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e
}
let Os = !0
function tc(e) {
  const t = Wi(e),
    n = e.proxy,
    s = e.ctx
  ;(Os = !1), t.beforeCreate && mr(t.beforeCreate, e, 'bc')
  const {
    data: r,
    computed: i,
    methods: o,
    watch: l,
    provide: c,
    inject: f,
    created: a,
    beforeMount: h,
    mounted: v,
    beforeUpdate: y,
    updated: A,
    activated: P,
    deactivated: K,
    beforeDestroy: H,
    beforeUnmount: k,
    destroyed: p,
    unmounted: g,
    render: M,
    renderTracked: V,
    renderTriggered: R,
    errorCaptured: W,
    serverPrefetch: T,
    expose: I,
    inheritAttrs: E,
    components: b,
    directives: N,
    filters: Y
  } = t
  if ((f && nc(f, s, null), o))
    for (const X in o) {
      const D = o[X]
      G(D) && (s[X] = D.bind(n))
    }
  if (r) {
    const X = r.call(n, n)
    ee(X) && (e.data = Lt(X))
  }
  if (((Os = !0), i))
    for (const X in i) {
      const D = i[X],
        ce = G(D) ? D.bind(n, n) : G(D.get) ? D.get.bind(n, n) : We,
        ln = !G(D) && G(D.set) ? D.set.bind(n) : We,
        lt = ie({ get: ce, set: ln })
      Object.defineProperty(s, X, { enumerable: !0, configurable: !0, get: () => lt.value, set: ($e) => (lt.value = $e) })
    }
  if (l) for (const X in l) Ui(l[X], s, n, X)
  if (c) {
    const X = G(c) ? c.call(n) : c
    Reflect.ownKeys(X).forEach((D) => {
      cc(D, X[D])
    })
  }
  a && mr(a, e, 'c')
  function j(X, D) {
    U(D) ? D.forEach((ce) => X(ce.bind(n))) : D && X(D.bind(n))
  }
  if ((j(ql, h), j(Nt, v), j(Gl, y), j(Xl, A), j(Wl, P), j(Bl, K), j(Ql, W), j(zl, V), j(Jl, R), j(Di, k), j(Gn, g), j(Yl, T), U(I)))
    if (I.length) {
      const X = e.exposed || (e.exposed = {})
      I.forEach((D) => {
        Object.defineProperty(X, D, { get: () => n[D], set: (ce) => (n[D] = ce) })
      })
    } else e.exposed || (e.exposed = {})
  M && e.render === We && (e.render = M), E != null && (e.inheritAttrs = E), b && (e.components = b), N && (e.directives = N), T && Fi(e)
}
function nc(e, t, n = We) {
  U(e) && (e = Ms(e))
  for (const s in e) {
    const r = e[s]
    let i
    ee(r) ? ('default' in r ? (i = bt(r.from || s, r.default, !0)) : (i = bt(r.from || s))) : (i = bt(r)),
      fe(i) ? Object.defineProperty(t, s, { enumerable: !0, configurable: !0, get: () => i.value, set: (o) => (i.value = o) }) : (t[s] = i)
  }
}
function mr(e, t, n) {
  je(U(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy), t, n)
}
function Ui(e, t, n, s) {
  let r = s.includes('.') ? io(n, s) : () => n[s]
  if (oe(e)) {
    const i = t[e]
    G(i) && Le(r, i)
  } else if (G(e)) Le(r, e.bind(n))
  else if (ee(e))
    if (U(e)) e.forEach((i) => Ui(i, t, n, s))
    else {
      const i = G(e.handler) ? e.handler.bind(n) : t[e.handler]
      G(i) && Le(r, i, e)
    }
}
function Wi(e) {
  const t = e.type,
    { mixins: n, extends: s } = t,
    {
      mixins: r,
      optionsCache: i,
      config: { optionMergeStrategies: o }
    } = e.appContext,
    l = i.get(t)
  let c
  return l ? (c = l) : !r.length && !n && !s ? (c = t) : ((c = {}), r.length && r.forEach((f) => Pn(c, f, o, !0)), Pn(c, t, o)), ee(t) && i.set(t, c), c
}
function Pn(e, t, n, s = !1) {
  const { mixins: r, extends: i } = t
  i && Pn(e, i, n, !0), r && r.forEach((o) => Pn(e, o, n, !0))
  for (const o in t)
    if (!(s && o === 'expose')) {
      const l = sc[o] || (n && n[o])
      e[o] = l ? l(e[o], t[o]) : t[o]
    }
  return e
}
const sc = {
  data: vr,
  props: yr,
  emits: yr,
  methods: $t,
  computed: $t,
  beforeCreate: be,
  created: be,
  beforeMount: be,
  mounted: be,
  beforeUpdate: be,
  updated: be,
  beforeDestroy: be,
  beforeUnmount: be,
  destroyed: be,
  unmounted: be,
  activated: be,
  deactivated: be,
  errorCaptured: be,
  serverPrefetch: be,
  components: $t,
  directives: $t,
  watch: ic,
  provide: vr,
  inject: rc
}
function vr(e, t) {
  return t
    ? e
      ? function () {
          return de(G(e) ? e.call(this, this) : e, G(t) ? t.call(this, this) : t)
        }
      : t
    : e
}
function rc(e, t) {
  return $t(Ms(e), Ms(t))
}
function Ms(e) {
  if (U(e)) {
    const t = {}
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n]
    return t
  }
  return e
}
function be(e, t) {
  return e ? [...new Set([].concat(e, t))] : t
}
function $t(e, t) {
  return e ? de(Object.create(null), e, t) : t
}
function yr(e, t) {
  return e ? (U(e) && U(t) ? [...new Set([...e, ...t])] : de(Object.create(null), gr(e), gr(t ?? {}))) : t
}
function ic(e, t) {
  if (!e) return t
  if (!t) return e
  const n = de(Object.create(null), e)
  for (const s in t) n[s] = be(e[s], t[s])
  return n
}
function Bi() {
  return {
    app: null,
    config: {
      isNativeTag: Ho,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap()
  }
}
let oc = 0
function lc(e, t) {
  return function (s, r = null) {
    G(s) || (s = de({}, s)), r != null && !ee(r) && (r = null)
    const i = Bi(),
      o = new WeakSet(),
      l = []
    let c = !1
    const f = (i.app = {
      _uid: oc++,
      _component: s,
      _props: r,
      _container: null,
      _context: i,
      _instance: null,
      version: jc,
      get config() {
        return i.config
      },
      set config(a) {},
      use(a, ...h) {
        return o.has(a) || (a && G(a.install) ? (o.add(a), a.install(f, ...h)) : G(a) && (o.add(a), a(f, ...h))), f
      },
      mixin(a) {
        return i.mixins.includes(a) || i.mixins.push(a), f
      },
      component(a, h) {
        return h ? ((i.components[a] = h), f) : i.components[a]
      },
      directive(a, h) {
        return h ? ((i.directives[a] = h), f) : i.directives[a]
      },
      mount(a, h, v) {
        if (!c) {
          const y = f._ceVNode || he(s, r)
          return (
            (y.appContext = i),
            v === !0 ? (v = 'svg') : v === !1 && (v = void 0),
            h && t ? t(y, a) : e(y, a, v),
            (c = !0),
            (f._container = a),
            (a.__vue_app__ = f),
            Jn(y.component)
          )
        }
      },
      onUnmount(a) {
        l.push(a)
      },
      unmount() {
        c && (je(l, f._instance, 16), e(null, f._container), delete f._container.__vue_app__)
      },
      provide(a, h) {
        return (i.provides[a] = h), f
      },
      runWithContext(a) {
        const h = yt
        yt = f
        try {
          return a()
        } finally {
          yt = h
        }
      }
    })
    return f
  }
}
let yt = null
function cc(e, t) {
  if (ue) {
    let n = ue.provides
    const s = ue.parent && ue.parent.provides
    s === n && (n = ue.provides = Object.create(s)), (n[e] = t)
  }
}
function bt(e, t, n = !1) {
  const s = ue || ae
  if (s || yt) {
    const r = yt ? yt._context.provides : s ? (s.parent == null ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides) : void 0
    if (r && e in r) return r[e]
    if (arguments.length > 1) return n && G(t) ? t.call(s && s.proxy) : t
  }
}
function Ki() {
  return !!(ue || ae || yt)
}
const qi = {},
  Gi = () => Object.create(qi),
  Xi = (e) => Object.getPrototypeOf(e) === qi
function ac(e, t, n, s = !1) {
  const r = {},
    i = Gi()
  ;(e.propsDefaults = Object.create(null)), Yi(e, t, r, i)
  for (const o in e.propsOptions[0]) o in r || (r[o] = void 0)
  n ? (e.props = s ? r : yl(r)) : e.type.props ? (e.props = r) : (e.props = i), (e.attrs = i)
}
function fc(e, t, n, s) {
  const {
      props: r,
      attrs: i,
      vnode: { patchFlag: o }
    } = e,
    l = z(r),
    [c] = e.propsOptions
  let f = !1
  if ((s || o > 0) && !(o & 16)) {
    if (o & 8) {
      const a = e.vnode.dynamicProps
      for (let h = 0; h < a.length; h++) {
        let v = a[h]
        if (Yn(e.emitsOptions, v)) continue
        const y = t[v]
        if (c)
          if (Q(i, v)) y !== i[v] && ((i[v] = y), (f = !0))
          else {
            const A = Ne(v)
            r[A] = Is(c, l, A, y, e, !1)
          }
        else y !== i[v] && ((i[v] = y), (f = !0))
      }
    }
  } else {
    Yi(e, t, r, i) && (f = !0)
    let a
    for (const h in l)
      (!t || (!Q(t, h) && ((a = rt(h)) === h || !Q(t, a)))) &&
        (c ? n && (n[h] !== void 0 || n[a] !== void 0) && (r[h] = Is(c, l, h, void 0, e, !0)) : delete r[h])
    if (i !== l) for (const h in i) (!t || !Q(t, h)) && (delete i[h], (f = !0))
  }
  f && Ge(e.attrs, 'set', '')
}
function Yi(e, t, n, s) {
  const [r, i] = e.propsOptions
  let o = !1,
    l
  if (t)
    for (let c in t) {
      if (Mt(c)) continue
      const f = t[c]
      let a
      r && Q(r, (a = Ne(c)))
        ? !i || !i.includes(a)
          ? (n[a] = f)
          : ((l || (l = {}))[a] = f)
        : Yn(e.emitsOptions, c) || ((!(c in s) || f !== s[c]) && ((s[c] = f), (o = !0)))
    }
  if (i) {
    const c = z(n),
      f = l || te
    for (let a = 0; a < i.length; a++) {
      const h = i[a]
      n[h] = Is(r, c, h, f[h], e, !Q(f, h))
    }
  }
  return o
}
function Is(e, t, n, s, r, i) {
  const o = e[n]
  if (o != null) {
    const l = Q(o, 'default')
    if (l && s === void 0) {
      const c = o.default
      if (o.type !== Function && !o.skipFactory && G(c)) {
        const { propsDefaults: f } = r
        if (n in f) s = f[n]
        else {
          const a = on(r)
          ;(s = f[n] = c.call(null, t)), a()
        }
      } else s = c
      r.ce && r.ce._setProp(n, s)
    }
    o[0] && (i && !l ? (s = !1) : o[1] && (s === '' || s === rt(n)) && (s = !0))
  }
  return s
}
const uc = new WeakMap()
function Ji(e, t, n = !1) {
  const s = n ? uc : t.propsCache,
    r = s.get(e)
  if (r) return r
  const i = e.props,
    o = {},
    l = []
  let c = !1
  if (!G(e)) {
    const a = (h) => {
      c = !0
      const [v, y] = Ji(h, t, !0)
      de(o, v), y && l.push(...y)
    }
    !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a)
  }
  if (!i && !c) return ee(e) && s.set(e, Rt), Rt
  if (U(i))
    for (let a = 0; a < i.length; a++) {
      const h = Ne(i[a])
      br(h) && (o[h] = te)
    }
  else if (i)
    for (const a in i) {
      const h = Ne(a)
      if (br(h)) {
        const v = i[a],
          y = (o[h] = U(v) || G(v) ? { type: v } : de({}, v)),
          A = y.type
        let P = !1,
          K = !0
        if (U(A))
          for (let H = 0; H < A.length; ++H) {
            const k = A[H],
              p = G(k) && k.name
            if (p === 'Boolean') {
              P = !0
              break
            } else p === 'String' && (K = !1)
          }
        else P = G(A) && A.name === 'Boolean'
        ;(y[0] = P), (y[1] = K), (P || Q(y, 'default')) && l.push(h)
      }
    }
  const f = [o, l]
  return ee(e) && s.set(e, f), f
}
function br(e) {
  return e[0] !== '$' && !Mt(e)
}
const zi = (e) => e[0] === '_' || e === '$stable',
  zs = (e) => (U(e) ? e.map(Me) : [Me(e)]),
  dc = (e, t, n) => {
    if (t._n) return t
    const s = Nl((...r) => zs(t(...r)), n)
    return (s._c = !1), s
  },
  Qi = (e, t, n) => {
    const s = e._ctx
    for (const r in e) {
      if (zi(r)) continue
      const i = e[r]
      if (G(i)) t[r] = dc(r, i, s)
      else if (i != null) {
        const o = zs(i)
        t[r] = () => o
      }
    }
  },
  Zi = (e, t) => {
    const n = zs(t)
    e.slots.default = () => n
  },
  eo = (e, t, n) => {
    for (const s in t) (n || s !== '_') && (e[s] = t[s])
  },
  hc = (e, t, n) => {
    const s = (e.slots = Gi())
    if (e.vnode.shapeFlag & 32) {
      const r = t._
      r ? (eo(s, t, n), n && si(s, '_', r, !0)) : Qi(t, s)
    } else t && Zi(e, t)
  },
  pc = (e, t, n) => {
    const { vnode: s, slots: r } = e
    let i = !0,
      o = te
    if (s.shapeFlag & 32) {
      const l = t._
      l ? (n && l === 1 ? (i = !1) : eo(r, t, n)) : ((i = !t.$stable), Qi(t, r)), (o = t)
    } else t && (Zi(e, t), (o = { default: 1 }))
    if (i) for (const l in r) !zi(l) && o[l] == null && delete r[l]
  },
  Ce = ao
function gc(e) {
  return mc(e, kl)
}
function mc(e, t) {
  const n = $n()
  n.__VUE__ = !0
  const {
      insert: s,
      remove: r,
      patchProp: i,
      createElement: o,
      createText: l,
      createComment: c,
      setText: f,
      setElementText: a,
      parentNode: h,
      nextSibling: v,
      setScopeId: y = We,
      insertStaticContent: A
    } = e,
    P = (u, d, m, S = null, _ = null, w = null, L = void 0, O = null, C = !!d.dynamicChildren) => {
      if (u === d) return
      u && !dt(u, d) && ((S = cn(u)), $e(u, _, w, !0), (u = null)), d.patchFlag === -2 && ((C = !1), (d.dynamicChildren = null))
      const { type: x, ref: B, shapeFlag: F } = d
      switch (x) {
        case _t:
          K(u, d, m, S)
          break
        case ye:
          H(u, d, m, S)
          break
        case Wt:
          u == null && k(d, m, S, L)
          break
        case Se:
          b(u, d, m, S, _, w, L, O, C)
          break
        default:
          F & 1 ? M(u, d, m, S, _, w, L, O, C) : F & 6 ? N(u, d, m, S, _, w, L, O, C) : (F & 64 || F & 128) && x.process(u, d, m, S, _, w, L, O, C, Tt)
      }
      B != null && _ && Yt(B, u && u.ref, w, d || u, !d)
    },
    K = (u, d, m, S) => {
      if (u == null) s((d.el = l(d.children)), m, S)
      else {
        const _ = (d.el = u.el)
        d.children !== u.children && f(_, d.children)
      }
    },
    H = (u, d, m, S) => {
      u == null ? s((d.el = c(d.children || '')), m, S) : (d.el = u.el)
    },
    k = (u, d, m, S) => {
      ;[u.el, u.anchor] = A(u.children, d, m, S, u.el, u.anchor)
    },
    p = ({ el: u, anchor: d }, m, S) => {
      let _
      for (; u && u !== d; ) (_ = v(u)), s(u, m, S), (u = _)
      s(d, m, S)
    },
    g = ({ el: u, anchor: d }) => {
      let m
      for (; u && u !== d; ) (m = v(u)), r(u), (u = m)
      r(d)
    },
    M = (u, d, m, S, _, w, L, O, C) => {
      d.type === 'svg' ? (L = 'svg') : d.type === 'math' && (L = 'mathml'), u == null ? V(d, m, S, _, w, L, O, C) : T(u, d, _, w, L, O, C)
    },
    V = (u, d, m, S, _, w, L, O) => {
      let C, x
      const { props: B, shapeFlag: F, transition: $, dirs: q } = u
      if (
        ((C = u.el = o(u.type, w, B && B.is, B)),
        F & 8 ? a(C, u.children) : F & 16 && W(u.children, C, null, S, _, ls(u, w), L, O),
        q && Ue(u, null, S, 'created'),
        R(C, u, u.scopeId, L, S),
        B)
      ) {
        for (const ne in B) ne !== 'value' && !Mt(ne) && i(C, ne, null, B[ne], w, S)
        'value' in B && i(C, 'value', null, B.value, w), (x = B.onVnodeBeforeMount) && Oe(x, S, u)
      }
      q && Ue(u, null, S, 'beforeMount')
      const J = to(_, $)
      J && $.beforeEnter(C),
        s(C, d, m),
        ((x = B && B.onVnodeMounted) || J || q) &&
          Ce(() => {
            x && Oe(x, S, u), J && $.enter(C), q && Ue(u, null, S, 'mounted')
          }, _)
    },
    R = (u, d, m, S, _) => {
      if ((m && y(u, m), S)) for (let w = 0; w < S.length; w++) y(u, S[w])
      if (_) {
        let w = _.subTree
        if (d === w || (co(w.type) && (w.ssContent === d || w.ssFallback === d))) {
          const L = _.vnode
          R(u, L, L.scopeId, L.slotScopeIds, _.parent)
        }
      }
    },
    W = (u, d, m, S, _, w, L, O, C = 0) => {
      for (let x = C; x < u.length; x++) {
        const B = (u[x] = O ? tt(u[x]) : Me(u[x]))
        P(null, B, d, m, S, _, w, L, O)
      }
    },
    T = (u, d, m, S, _, w, L) => {
      const O = (d.el = u.el)
      let { patchFlag: C, dynamicChildren: x, dirs: B } = d
      C |= u.patchFlag & 16
      const F = u.props || te,
        $ = d.props || te
      let q
      if (
        (m && ct(m, !1),
        (q = $.onVnodeBeforeUpdate) && Oe(q, m, d, u),
        B && Ue(d, u, m, 'beforeUpdate'),
        m && ct(m, !0),
        ((F.innerHTML && $.innerHTML == null) || (F.textContent && $.textContent == null)) && a(O, ''),
        x ? I(u.dynamicChildren, x, O, m, S, ls(d, _), w) : L || D(u, d, O, null, m, S, ls(d, _), w, !1),
        C > 0)
      ) {
        if (C & 16) E(O, F, $, m, _)
        else if ((C & 2 && F.class !== $.class && i(O, 'class', null, $.class, _), C & 4 && i(O, 'style', F.style, $.style, _), C & 8)) {
          const J = d.dynamicProps
          for (let ne = 0; ne < J.length; ne++) {
            const Z = J[ne],
              xe = F[Z],
              pe = $[Z]
            ;(pe !== xe || Z === 'value') && i(O, Z, xe, pe, _, m)
          }
        }
        C & 1 && u.children !== d.children && a(O, d.children)
      } else !L && x == null && E(O, F, $, m, _)
      ;((q = $.onVnodeUpdated) || B) &&
        Ce(() => {
          q && Oe(q, m, d, u), B && Ue(d, u, m, 'updated')
        }, S)
    },
    I = (u, d, m, S, _, w, L) => {
      for (let O = 0; O < d.length; O++) {
        const C = u[O],
          x = d[O],
          B = C.el && (C.type === Se || !dt(C, x) || C.shapeFlag & 70) ? h(C.el) : m
        P(C, x, B, null, S, _, w, L, !0)
      }
    },
    E = (u, d, m, S, _) => {
      if (d !== m) {
        if (d !== te) for (const w in d) !Mt(w) && !(w in m) && i(u, w, d[w], null, _, S)
        for (const w in m) {
          if (Mt(w)) continue
          const L = m[w],
            O = d[w]
          L !== O && w !== 'value' && i(u, w, O, L, _, S)
        }
        'value' in m && i(u, 'value', d.value, m.value, _)
      }
    },
    b = (u, d, m, S, _, w, L, O, C) => {
      const x = (d.el = u ? u.el : l('')),
        B = (d.anchor = u ? u.anchor : l(''))
      let { patchFlag: F, dynamicChildren: $, slotScopeIds: q } = d
      q && (O = O ? O.concat(q) : q),
        u == null
          ? (s(x, m, S), s(B, m, S), W(d.children || [], m, B, _, w, L, O, C))
          : F > 0 && F & 64 && $ && u.dynamicChildren
            ? (I(u.dynamicChildren, $, m, _, w, L, O), (d.key != null || (_ && d === _.subTree)) && no(u, d, !0))
            : D(u, d, m, B, _, w, L, O, C)
    },
    N = (u, d, m, S, _, w, L, O, C) => {
      ;(d.slotScopeIds = O), u == null ? (d.shapeFlag & 512 ? _.ctx.activate(d, m, S, L, C) : Y(d, m, S, _, w, L, C)) : re(u, d, C)
    },
    Y = (u, d, m, S, _, w, L) => {
      const O = (u.component = Pc(u, S, _))
      if ((Kn(u) && (O.ctx.renderer = Tt), Lc(O, !1, L), O.asyncDep)) {
        if ((_ && _.registerDep(O, j, L), !u.el)) {
          const C = (O.subTree = he(ye))
          H(null, C, d, m)
        }
      } else j(O, u, d, m, _, w, L)
    },
    re = (u, d, m) => {
      const S = (d.component = u.component)
      if (Ec(u, d, m))
        if (S.asyncDep && !S.asyncResolved) {
          X(S, d, m)
          return
        } else (S.next = d), S.update()
      else (d.el = u.el), (S.vnode = d)
    },
    j = (u, d, m, S, _, w, L) => {
      const O = () => {
        if (u.isMounted) {
          let { next: F, bu: $, u: q, parent: J, vnode: ne } = u
          {
            const Te = so(u)
            if (Te) {
              F && ((F.el = ne.el), X(u, F, L)),
                Te.asyncDep.then(() => {
                  u.isUnmounted || O()
                })
              return
            }
          }
          let Z = F,
            xe
          ct(u, !1), F ? ((F.el = ne.el), X(u, F, L)) : (F = ne), $ && wn($), (xe = F.props && F.props.onVnodeBeforeUpdate) && Oe(xe, J, F, ne), ct(u, !0)
          const pe = cs(u),
            Fe = u.subTree
          ;(u.subTree = pe),
            P(Fe, pe, h(Fe.el), cn(Fe), u, _, w),
            (F.el = pe.el),
            Z === null && lo(u, pe.el),
            q && Ce(q, _),
            (xe = F.props && F.props.onVnodeUpdated) && Ce(() => Oe(xe, J, F, ne), _)
        } else {
          let F
          const { el: $, props: q } = d,
            { bm: J, m: ne, parent: Z, root: xe, type: pe } = u,
            Fe = vt(d)
          if ((ct(u, !1), J && wn(J), !Fe && (F = q && q.onVnodeBeforeMount) && Oe(F, Z, d), ct(u, !0), $ && es)) {
            const Te = () => {
              ;(u.subTree = cs(u)), es($, u.subTree, u, _, null)
            }
            Fe && pe.__asyncHydrate ? pe.__asyncHydrate($, u, Te) : Te()
          } else {
            xe.ce && xe.ce._injectChildStyle(pe)
            const Te = (u.subTree = cs(u))
            P(null, Te, m, S, u, _, w), (d.el = Te.el)
          }
          if ((ne && Ce(ne, _), !Fe && (F = q && q.onVnodeMounted))) {
            const Te = d
            Ce(() => Oe(F, Z, Te), _)
          }
          ;(d.shapeFlag & 256 || (Z && vt(Z.vnode) && Z.vnode.shapeFlag & 256)) && u.a && Ce(u.a, _), (u.isMounted = !0), (d = m = S = null)
        }
      }
      u.scope.on()
      const C = (u.effect = new ci(O))
      u.scope.off()
      const x = (u.update = C.run.bind(C)),
        B = (u.job = C.runIfDirty.bind(C))
      ;(B.i = u), (B.id = u.uid), (C.scheduler = () => Js(B)), ct(u, !0), x()
    },
    X = (u, d, m) => {
      d.component = u
      const S = u.vnode.props
      ;(u.vnode = d), (u.next = null), fc(u, d.props, S, m), pc(u, d.children, m), it(), fr(u), ot()
    },
    D = (u, d, m, S, _, w, L, O, C = !1) => {
      const x = u && u.children,
        B = u ? u.shapeFlag : 0,
        F = d.children,
        { patchFlag: $, shapeFlag: q } = d
      if ($ > 0) {
        if ($ & 128) {
          ln(x, F, m, S, _, w, L, O, C)
          return
        } else if ($ & 256) {
          ce(x, F, m, S, _, w, L, O, C)
          return
        }
      }
      q & 8
        ? (B & 16 && Ft(x, _, w), F !== x && a(m, F))
        : B & 16
          ? q & 16
            ? ln(x, F, m, S, _, w, L, O, C)
            : Ft(x, _, w, !0)
          : (B & 8 && a(m, ''), q & 16 && W(F, m, S, _, w, L, O, C))
    },
    ce = (u, d, m, S, _, w, L, O, C) => {
      ;(u = u || Rt), (d = d || Rt)
      const x = u.length,
        B = d.length,
        F = Math.min(x, B)
      let $
      for ($ = 0; $ < F; $++) {
        const q = (d[$] = C ? tt(d[$]) : Me(d[$]))
        P(u[$], q, m, null, _, w, L, O, C)
      }
      x > B ? Ft(u, _, w, !0, !1, F) : W(d, m, S, _, w, L, O, C, F)
    },
    ln = (u, d, m, S, _, w, L, O, C) => {
      let x = 0
      const B = d.length
      let F = u.length - 1,
        $ = B - 1
      for (; x <= F && x <= $; ) {
        const q = u[x],
          J = (d[x] = C ? tt(d[x]) : Me(d[x]))
        if (dt(q, J)) P(q, J, m, null, _, w, L, O, C)
        else break
        x++
      }
      for (; x <= F && x <= $; ) {
        const q = u[F],
          J = (d[$] = C ? tt(d[$]) : Me(d[$]))
        if (dt(q, J)) P(q, J, m, null, _, w, L, O, C)
        else break
        F--, $--
      }
      if (x > F) {
        if (x <= $) {
          const q = $ + 1,
            J = q < B ? d[q].el : S
          for (; x <= $; ) P(null, (d[x] = C ? tt(d[x]) : Me(d[x])), m, J, _, w, L, O, C), x++
        }
      } else if (x > $) for (; x <= F; ) $e(u[x], _, w, !0), x++
      else {
        const q = x,
          J = x,
          ne = new Map()
        for (x = J; x <= $; x++) {
          const Ee = (d[x] = C ? tt(d[x]) : Me(d[x]))
          Ee.key != null && ne.set(Ee.key, x)
        }
        let Z,
          xe = 0
        const pe = $ - J + 1
        let Fe = !1,
          Te = 0
        const Ht = new Array(pe)
        for (x = 0; x < pe; x++) Ht[x] = 0
        for (x = q; x <= F; x++) {
          const Ee = u[x]
          if (xe >= pe) {
            $e(Ee, _, w, !0)
            continue
          }
          let Ve
          if (Ee.key != null) Ve = ne.get(Ee.key)
          else
            for (Z = J; Z <= $; Z++)
              if (Ht[Z - J] === 0 && dt(Ee, d[Z])) {
                Ve = Z
                break
              }
          Ve === void 0 ? $e(Ee, _, w, !0) : ((Ht[Ve - J] = x + 1), Ve >= Te ? (Te = Ve) : (Fe = !0), P(Ee, d[Ve], m, null, _, w, L, O, C), xe++)
        }
        const rr = Fe ? vc(Ht) : Rt
        for (Z = rr.length - 1, x = pe - 1; x >= 0; x--) {
          const Ee = J + x,
            Ve = d[Ee],
            ir = Ee + 1 < B ? d[Ee + 1].el : S
          Ht[x] === 0 ? P(null, Ve, m, ir, _, w, L, O, C) : Fe && (Z < 0 || x !== rr[Z] ? lt(Ve, m, ir, 2) : Z--)
        }
      }
    },
    lt = (u, d, m, S, _ = null) => {
      const { el: w, type: L, transition: O, children: C, shapeFlag: x } = u
      if (x & 6) {
        lt(u.component.subTree, d, m, S)
        return
      }
      if (x & 128) {
        u.suspense.move(d, m, S)
        return
      }
      if (x & 64) {
        L.move(u, d, m, Tt)
        return
      }
      if (L === Se) {
        s(w, d, m)
        for (let F = 0; F < C.length; F++) lt(C[F], d, m, S)
        s(u.anchor, d, m)
        return
      }
      if (L === Wt) {
        p(u, d, m)
        return
      }
      if (S !== 2 && x & 1 && O)
        if (S === 0) O.beforeEnter(w), s(w, d, m), Ce(() => O.enter(w), _)
        else {
          const { leave: F, delayLeave: $, afterLeave: q } = O,
            J = () => s(w, d, m),
            ne = () => {
              F(w, () => {
                J(), q && q()
              })
            }
          $ ? $(w, J, ne) : ne()
        }
      else s(w, d, m)
    },
    $e = (u, d, m, S = !1, _ = !1) => {
      const { type: w, props: L, ref: O, children: C, dynamicChildren: x, shapeFlag: B, patchFlag: F, dirs: $, cacheIndex: q } = u
      if ((F === -2 && (_ = !1), O != null && Yt(O, null, m, u, !0), q != null && (d.renderCache[q] = void 0), B & 256)) {
        d.ctx.deactivate(u)
        return
      }
      const J = B & 1 && $,
        ne = !vt(u)
      let Z
      if ((ne && (Z = L && L.onVnodeBeforeUnmount) && Oe(Z, d, u), B & 6)) Fo(u.component, m, S)
      else {
        if (B & 128) {
          u.suspense.unmount(m, S)
          return
        }
        J && Ue(u, null, d, 'beforeUnmount'),
          B & 64
            ? u.type.remove(u, d, m, Tt, S)
            : x && !x.hasOnce && (w !== Se || (F > 0 && F & 64))
              ? Ft(x, d, m, !1, !0)
              : ((w === Se && F & 384) || (!_ && B & 16)) && Ft(C, d, m),
          S && nr(u)
      }
      ;((ne && (Z = L && L.onVnodeUnmounted)) || J) &&
        Ce(() => {
          Z && Oe(Z, d, u), J && Ue(u, null, d, 'unmounted')
        }, m)
    },
    nr = (u) => {
      const { type: d, el: m, anchor: S, transition: _ } = u
      if (d === Se) {
        No(m, S)
        return
      }
      if (d === Wt) {
        g(u)
        return
      }
      const w = () => {
        r(m), _ && !_.persisted && _.afterLeave && _.afterLeave()
      }
      if (u.shapeFlag & 1 && _ && !_.persisted) {
        const { leave: L, delayLeave: O } = _,
          C = () => L(m, w)
        O ? O(u.el, w, C) : C()
      } else w()
    },
    No = (u, d) => {
      let m
      for (; u !== d; ) (m = v(u)), r(u), (u = m)
      r(d)
    },
    Fo = (u, d, m) => {
      const { bum: S, scope: _, job: w, subTree: L, um: O, m: C, a: x } = u
      _r(C),
        _r(x),
        S && wn(S),
        _.stop(),
        w && ((w.flags |= 8), $e(L, u, d, m)),
        O && Ce(O, d),
        Ce(() => {
          u.isUnmounted = !0
        }, d),
        d && d.pendingBranch && !d.isUnmounted && u.asyncDep && !u.asyncResolved && u.suspenseId === d.pendingId && (d.deps--, d.deps === 0 && d.resolve())
    },
    Ft = (u, d, m, S = !1, _ = !1, w = 0) => {
      for (let L = w; L < u.length; L++) $e(u[L], d, m, S, _)
    },
    cn = (u) => {
      if (u.shapeFlag & 6) return cn(u.component.subTree)
      if (u.shapeFlag & 128) return u.suspense.next()
      const d = v(u.anchor || u.el),
        m = d && d[Fl]
      return m ? v(m) : d
    }
  let Qn = !1
  const sr = (u, d, m) => {
      u == null ? d._vnode && $e(d._vnode, null, null, !0) : P(d._vnode || null, u, d, null, null, null, m),
        (d._vnode = u),
        Qn || ((Qn = !0), fr(), Mn(), (Qn = !1))
    },
    Tt = { p: P, um: $e, m: lt, r: nr, mt: Y, mc: W, pc: D, pbc: I, n: cn, o: e }
  let Zn, es
  return t && ([Zn, es] = t(Tt)), { render: sr, hydrate: Zn, createApp: lc(sr, Zn) }
}
function ls({ type: e, props: t }, n) {
  return (n === 'svg' && e === 'foreignObject') || (n === 'mathml' && e === 'annotation-xml' && t && t.encoding && t.encoding.includes('html')) ? void 0 : n
}
function ct({ effect: e, job: t }, n) {
  n ? ((e.flags |= 32), (t.flags |= 4)) : ((e.flags &= -33), (t.flags &= -5))
}
function to(e, t) {
  return (!e || (e && !e.pendingBranch)) && t && !t.persisted
}
function no(e, t, n = !1) {
  const s = e.children,
    r = t.children
  if (U(s) && U(r))
    for (let i = 0; i < s.length; i++) {
      const o = s[i]
      let l = r[i]
      l.shapeFlag & 1 &&
        !l.dynamicChildren &&
        ((l.patchFlag <= 0 || l.patchFlag === 32) && ((l = r[i] = tt(r[i])), (l.el = o.el)), !n && l.patchFlag !== -2 && no(o, l)),
        l.type === _t && (l.el = o.el)
    }
}
function vc(e) {
  const t = e.slice(),
    n = [0]
  let s, r, i, o, l
  const c = e.length
  for (s = 0; s < c; s++) {
    const f = e[s]
    if (f !== 0) {
      if (((r = n[n.length - 1]), e[r] < f)) {
        ;(t[s] = r), n.push(s)
        continue
      }
      for (i = 0, o = n.length - 1; i < o; ) (l = (i + o) >> 1), e[n[l]] < f ? (i = l + 1) : (o = l)
      f < e[n[i]] && (i > 0 && (t[s] = n[i - 1]), (n[i] = s))
    }
  }
  for (i = n.length, o = n[i - 1]; i-- > 0; ) (n[i] = o), (o = t[o])
  return n
}
function so(e) {
  const t = e.subTree.component
  if (t) return t.asyncDep && !t.asyncResolved ? t : so(t)
}
function _r(e) {
  if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8
}
const yc = Symbol.for('v-scx'),
  bc = () => bt(yc)
function ro(e, t) {
  return Xn(e, null, t)
}
function Af(e, t) {
  return Xn(e, null, { flush: 'post' })
}
function Le(e, t, n) {
  return Xn(e, t, n)
}
function Xn(e, t, n = te) {
  const { immediate: s, deep: r, flush: i, once: o } = n,
    l = de({}, n),
    c = (t && s) || (!t && i !== 'post')
  let f
  if (Qt) {
    if (i === 'sync') {
      const y = bc()
      f = y.__watcherHandles || (y.__watcherHandles = [])
    } else if (!c) {
      const y = () => {}
      return (y.stop = We), (y.resume = We), (y.pause = We), y
    }
  }
  const a = ue
  l.call = (y, A, P) => je(y, a, A, P)
  let h = !1
  i === 'post'
    ? (l.scheduler = (y) => {
        Ce(y, a && a.suspense)
      })
    : i !== 'sync' &&
      ((h = !0),
      (l.scheduler = (y, A) => {
        A ? y() : Js(y)
      })),
    (l.augmentJob = (y) => {
      t && (y.flags |= 4), h && ((y.flags |= 2), a && ((y.id = a.uid), (y.i = a)))
    })
  const v = Ml(e, t, l)
  return Qt && (f ? f.push(v) : c && v()), v
}
function _c(e, t, n) {
  const s = this.proxy,
    r = oe(e) ? (e.includes('.') ? io(s, e) : () => s[e]) : e.bind(s, s)
  let i
  G(t) ? (i = t) : ((i = t.handler), (n = t))
  const o = on(this),
    l = Xn(r, i.bind(s), n)
  return o(), l
}
function io(e, t) {
  const n = t.split('.')
  return () => {
    let s = e
    for (let r = 0; r < n.length && s; r++) s = s[n[r]]
    return s
  }
}
const wc = (e, t) => (t === 'modelValue' || t === 'model-value' ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Ne(t)}Modifiers`] || e[`${rt(t)}Modifiers`])
function Sc(e, t, ...n) {
  if (e.isUnmounted) return
  const s = e.vnode.props || te
  let r = n
  const i = t.startsWith('update:'),
    o = i && wc(s, t.slice(7))
  o && (o.trim && (r = n.map((a) => (oe(a) ? a.trim() : a))), o.number && (r = n.map(Cn)))
  let l,
    c = s[(l = _n(t))] || s[(l = _n(Ne(t)))]
  !c && i && (c = s[(l = _n(rt(t)))]), c && je(c, e, 6, r)
  const f = s[l + 'Once']
  if (f) {
    if (!e.emitted) e.emitted = {}
    else if (e.emitted[l]) return
    ;(e.emitted[l] = !0), je(f, e, 6, r)
  }
}
function oo(e, t, n = !1) {
  const s = t.emitsCache,
    r = s.get(e)
  if (r !== void 0) return r
  const i = e.emits
  let o = {},
    l = !1
  if (!G(e)) {
    const c = (f) => {
      const a = oo(f, t, !0)
      a && ((l = !0), de(o, a))
    }
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c)
  }
  return !i && !l ? (ee(e) && s.set(e, null), null) : (U(i) ? i.forEach((c) => (o[c] = null)) : de(o, i), ee(e) && s.set(e, o), o)
}
function Yn(e, t) {
  return !e || !en(t) ? !1 : ((t = t.slice(2).replace(/Once$/, '')), Q(e, t[0].toLowerCase() + t.slice(1)) || Q(e, rt(t)) || Q(e, t))
}
function cs(e) {
  const {
      type: t,
      vnode: n,
      proxy: s,
      withProxy: r,
      propsOptions: [i],
      slots: o,
      attrs: l,
      emit: c,
      render: f,
      renderCache: a,
      props: h,
      data: v,
      setupState: y,
      ctx: A,
      inheritAttrs: P
    } = e,
    K = In(e)
  let H, k
  try {
    if (n.shapeFlag & 4) {
      const g = r || s,
        M = g
      ;(H = Me(f.call(M, g, a, h, y, v, A))), (k = l)
    } else {
      const g = t
      ;(H = Me(g.length > 1 ? g(h, { attrs: l, slots: o, emit: c }) : g(h, null))), (k = t.props ? l : xc(l))
    }
  } catch (g) {
    ;(Bt.length = 0), Bn(g, e, 1), (H = he(ye))
  }
  let p = H
  if (k && P !== !1) {
    const g = Object.keys(k),
      { shapeFlag: M } = p
    g.length && M & 7 && (i && g.some(js) && (k = Tc(k, i)), (p = st(p, k, !1, !0)))
  }
  return n.dirs && ((p = st(p, null, !1, !0)), (p.dirs = p.dirs ? p.dirs.concat(n.dirs) : n.dirs)), n.transition && Xt(p, n.transition), (H = p), In(K), H
}
const xc = (e) => {
    let t
    for (const n in e) (n === 'class' || n === 'style' || en(n)) && ((t || (t = {}))[n] = e[n])
    return t
  },
  Tc = (e, t) => {
    const n = {}
    for (const s in e) (!js(s) || !(s.slice(9) in t)) && (n[s] = e[s])
    return n
  }
function Ec(e, t, n) {
  const { props: s, children: r, component: i } = e,
    { props: o, children: l, patchFlag: c } = t,
    f = i.emitsOptions
  if (t.dirs || t.transition) return !0
  if (n && c >= 0) {
    if (c & 1024) return !0
    if (c & 16) return s ? wr(s, o, f) : !!o
    if (c & 8) {
      const a = t.dynamicProps
      for (let h = 0; h < a.length; h++) {
        const v = a[h]
        if (o[v] !== s[v] && !Yn(f, v)) return !0
      }
    }
  } else return (r || l) && (!l || !l.$stable) ? !0 : s === o ? !1 : s ? (o ? wr(s, o, f) : !0) : !!o
  return !1
}
function wr(e, t, n) {
  const s = Object.keys(t)
  if (s.length !== Object.keys(e).length) return !0
  for (let r = 0; r < s.length; r++) {
    const i = s[r]
    if (t[i] !== e[i] && !Yn(n, i)) return !0
  }
  return !1
}
function lo({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const s = t.subTree
    if ((s.suspense && s.suspense.activeBranch === e && (s.el = e.el), s === e)) ((e = t.vnode).el = n), (t = t.parent)
    else break
  }
}
const co = (e) => e.__isSuspense
function ao(e, t) {
  t && t.pendingBranch ? (U(e) ? t.effects.push(...e) : t.effects.push(e)) : Ll(e)
}
const Se = Symbol.for('v-fgt'),
  _t = Symbol.for('v-txt'),
  ye = Symbol.for('v-cmt'),
  Wt = Symbol.for('v-stc'),
  Bt = []
let Ae = null
function Ps(e = !1) {
  Bt.push((Ae = e ? null : []))
}
function Cc() {
  Bt.pop(), (Ae = Bt[Bt.length - 1] || null)
}
let Jt = 1
function Sr(e, t = !1) {
  ;(Jt += e), e < 0 && Ae && t && (Ae.hasOnce = !0)
}
function fo(e) {
  return (e.dynamicChildren = Jt > 0 ? Ae || Rt : null), Cc(), Jt > 0 && Ae && Ae.push(e), e
}
function Rf(e, t, n, s, r, i) {
  return fo(ho(e, t, n, s, r, i, !0))
}
function Ls(e, t, n, s, r) {
  return fo(he(e, t, n, s, r, !0))
}
function zt(e) {
  return e ? e.__v_isVNode === !0 : !1
}
function dt(e, t) {
  return e.type === t.type && e.key === t.key
}
const uo = ({ key: e }) => e ?? null,
  xn = ({ ref: e, ref_key: t, ref_for: n }) => (
    typeof e == 'number' && (e = '' + e), e != null ? (oe(e) || fe(e) || G(e) ? { i: ae, r: e, k: t, f: !!n } : e) : null
  )
function ho(e, t = null, n = null, s = 0, r = null, i = e === Se ? 0 : 1, o = !1, l = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && uo(t),
    ref: t && xn(t),
    scopeId: Ai,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: i,
    patchFlag: s,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: ae
  }
  return (
    l ? (Qs(c, n), i & 128 && e.normalize(c)) : n && (c.shapeFlag |= oe(n) ? 8 : 16),
    Jt > 0 && !o && Ae && (c.patchFlag > 0 || i & 6) && c.patchFlag !== 32 && Ae.push(c),
    c
  )
}
const he = Ac
function Ac(e, t = null, n = null, s = 0, r = null, i = !1) {
  if (((!e || e === $i) && (e = ye), zt(e))) {
    const l = st(e, t, !0)
    return n && Qs(l, n), Jt > 0 && !i && Ae && (l.shapeFlag & 6 ? (Ae[Ae.indexOf(e)] = l) : Ae.push(l)), (l.patchFlag = -2), l
  }
  if ((Dc(e) && (e = e.__vccOpts), t)) {
    t = Rc(t)
    let { class: l, style: c } = t
    l && !oe(l) && (t.class = Us(l)), ee(c) && (Xs(c) && !U(c) && (c = de({}, c)), (t.style = ks(c)))
  }
  const o = oe(e) ? 1 : co(e) ? 128 : Ri(e) ? 64 : ee(e) ? 4 : G(e) ? 2 : 0
  return ho(e, t, n, s, r, o, i, !0)
}
function Rc(e) {
  return e ? (Xs(e) || Xi(e) ? de({}, e) : e) : null
}
function st(e, t, n = !1, s = !1) {
  const { props: r, ref: i, patchFlag: o, children: l, transition: c } = e,
    f = t ? Oc(r || {}, t) : r,
    a = {
      __v_isVNode: !0,
      __v_skip: !0,
      type: e.type,
      props: f,
      key: f && uo(f),
      ref: t && t.ref ? (n && i ? (U(i) ? i.concat(xn(t)) : [i, xn(t)]) : xn(t)) : i,
      scopeId: e.scopeId,
      slotScopeIds: e.slotScopeIds,
      children: l,
      target: e.target,
      targetStart: e.targetStart,
      targetAnchor: e.targetAnchor,
      staticCount: e.staticCount,
      shapeFlag: e.shapeFlag,
      patchFlag: t && e.type !== Se ? (o === -1 ? 16 : o | 16) : o,
      dynamicProps: e.dynamicProps,
      dynamicChildren: e.dynamicChildren,
      appContext: e.appContext,
      dirs: e.dirs,
      transition: c,
      component: e.component,
      suspense: e.suspense,
      ssContent: e.ssContent && st(e.ssContent),
      ssFallback: e.ssFallback && st(e.ssFallback),
      el: e.el,
      anchor: e.anchor,
      ctx: e.ctx,
      ce: e.ce
    }
  return c && s && Xt(a, c.clone(a)), a
}
function po(e = ' ', t = 0) {
  return he(_t, null, e, t)
}
function Of(e, t) {
  const n = he(Wt, null, e)
  return (n.staticCount = t), n
}
function Mf(e = '', t = !1) {
  return t ? (Ps(), Ls(ye, null, e)) : he(ye, null, e)
}
function Me(e) {
  return e == null || typeof e == 'boolean' ? he(ye) : U(e) ? he(Se, null, e.slice()) : zt(e) ? tt(e) : he(_t, null, String(e))
}
function tt(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : st(e)
}
function Qs(e, t) {
  let n = 0
  const { shapeFlag: s } = e
  if (t == null) t = null
  else if (U(t)) n = 16
  else if (typeof t == 'object')
    if (s & 65) {
      const r = t.default
      r && (r._c && (r._d = !1), Qs(e, r()), r._c && (r._d = !0))
      return
    } else {
      n = 32
      const r = t._
      !r && !Xi(t) ? (t._ctx = ae) : r === 3 && ae && (ae.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)))
    }
  else G(t) ? ((t = { default: t, _ctx: ae }), (n = 32)) : ((t = String(t)), s & 64 ? ((n = 16), (t = [po(t)])) : (n = 8))
  ;(e.children = t), (e.shapeFlag |= n)
}
function Oc(...e) {
  const t = {}
  for (let n = 0; n < e.length; n++) {
    const s = e[n]
    for (const r in s)
      if (r === 'class') t.class !== s.class && (t.class = Us([t.class, s.class]))
      else if (r === 'style') t.style = ks([t.style, s.style])
      else if (en(r)) {
        const i = t[r],
          o = s[r]
        o && i !== o && !(U(i) && i.includes(o)) && (t[r] = i ? [].concat(i, o) : o)
      } else r !== '' && (t[r] = s[r])
  }
  return t
}
function Oe(e, t, n, s = null) {
  je(e, t, 7, [n, s])
}
const Mc = Bi()
let Ic = 0
function Pc(e, t, n) {
  const s = e.type,
    r = (t ? t.appContext : e.appContext) || Mc,
    i = {
      uid: Ic++,
      vnode: e,
      type: s,
      parent: t,
      appContext: r,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      job: null,
      scope: new zo(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(r.provides),
      ids: t ? t.ids : ['', 0, 0],
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: Ji(s, r),
      emitsOptions: oo(s, r),
      emit: null,
      emitted: null,
      propsDefaults: te,
      inheritAttrs: s.inheritAttrs,
      ctx: te,
      data: te,
      props: te,
      attrs: te,
      slots: te,
      refs: te,
      setupState: te,
      setupContext: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null
    }
  return (i.ctx = { _: i }), (i.root = t ? t.root : i), (i.emit = Sc.bind(null, i)), e.ce && e.ce(i), i
}
let ue = null
const rn = () => ue || ae
let Ln, Ns
{
  const e = $n(),
    t = (n, s) => {
      let r
      return (
        (r = e[n]) || (r = e[n] = []),
        r.push(s),
        (i) => {
          r.length > 1 ? r.forEach((o) => o(i)) : r[0](i)
        }
      )
    }
  ;(Ln = t('__VUE_INSTANCE_SETTERS__', (n) => (ue = n))), (Ns = t('__VUE_SSR_SETTERS__', (n) => (Qt = n)))
}
const on = (e) => {
    const t = ue
    return (
      Ln(e),
      e.scope.on(),
      () => {
        e.scope.off(), Ln(t)
      }
    )
  },
  xr = () => {
    ue && ue.scope.off(), Ln(null)
  }
function go(e) {
  return e.vnode.shapeFlag & 4
}
let Qt = !1
function Lc(e, t = !1, n = !1) {
  t && Ns(t)
  const { props: s, children: r } = e.vnode,
    i = go(e)
  ac(e, s, i, t), hc(e, r, n)
  const o = i ? Nc(e, t) : void 0
  return t && Ns(!1), o
}
function Nc(e, t) {
  const n = e.type
  ;(e.accessCache = Object.create(null)), (e.proxy = new Proxy(e.ctx, Zl))
  const { setup: s } = n
  if (s) {
    it()
    const r = (e.setupContext = s.length > 1 ? vo(e) : null),
      i = on(e),
      o = nn(s, e, 0, [e.props, r]),
      l = ei(o)
    if ((ot(), i(), (l || e.sp) && !vt(e) && Fi(e), l)) {
      if ((o.then(xr, xr), t))
        return o
          .then((c) => {
            Tr(e, c)
          })
          .catch((c) => {
            Bn(c, e, 0)
          })
      e.asyncDep = o
    } else Tr(e, o)
  } else mo(e)
}
function Tr(e, t, n) {
  G(t) ? (e.type.__ssrInlineRender ? (e.ssrRender = t) : (e.render = t)) : ee(t) && (e.setupState = xi(t)), mo(e)
}
function mo(e, t, n) {
  const s = e.type
  e.render || (e.render = s.render || We)
  {
    const r = on(e)
    it()
    try {
      tc(e)
    } finally {
      ot(), r()
    }
  }
}
const Fc = {
  get(e, t) {
    return me(e, 'get', ''), e[t]
  }
}
function vo(e) {
  const t = (n) => {
    e.exposed = n || {}
  }
  return { attrs: new Proxy(e.attrs, Fc), slots: e.slots, emit: e.emit, expose: t }
}
function Jn(e) {
  return e.exposed
    ? e.exposeProxy ||
        (e.exposeProxy = new Proxy(xi(Sn(e.exposed)), {
          get(t, n) {
            if (n in t) return t[n]
            if (n in Ut) return Ut[n](e)
          },
          has(t, n) {
            return n in t || n in Ut
          }
        }))
    : e.proxy
}
function Hc(e, t = !0) {
  return G(e) ? e.displayName || e.name : e.name || (t && e.__name)
}
function Dc(e) {
  return G(e) && '__vccOpts' in e
}
const ie = (e, t) => Rl(e, t, Qt)
function Fs(e, t, n) {
  const s = arguments.length
  return s === 2
    ? ee(t) && !U(t)
      ? zt(t)
        ? he(e, null, [t])
        : he(e, t)
      : he(e, null, t)
    : (s > 3 ? (n = Array.prototype.slice.call(arguments, 2)) : s === 3 && zt(n) && (n = [n]), he(e, t, n))
}
const jc = '3.5.13'
/**
 * @vue/runtime-dom v3.5.13
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ let Hs
const Er = typeof window < 'u' && window.trustedTypes
if (Er)
  try {
    Hs = Er.createPolicy('vue', { createHTML: (e) => e })
  } catch {}
const yo = Hs ? (e) => Hs.createHTML(e) : (e) => e,
  $c = 'http://www.w3.org/2000/svg',
  Vc = 'http://www.w3.org/1998/Math/MathML',
  qe = typeof document < 'u' ? document : null,
  Cr = qe && qe.createElement('template'),
  kc = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null)
    },
    remove: (e) => {
      const t = e.parentNode
      t && t.removeChild(e)
    },
    createElement: (e, t, n, s) => {
      const r = t === 'svg' ? qe.createElementNS($c, e) : t === 'mathml' ? qe.createElementNS(Vc, e) : n ? qe.createElement(e, { is: n }) : qe.createElement(e)
      return e === 'select' && s && s.multiple != null && r.setAttribute('multiple', s.multiple), r
    },
    createText: (e) => qe.createTextNode(e),
    createComment: (e) => qe.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t
    },
    setElementText: (e, t) => {
      e.textContent = t
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => qe.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, '')
    },
    insertStaticContent(e, t, n, s, r, i) {
      const o = n ? n.previousSibling : t.lastChild
      if (r && (r === i || r.nextSibling)) for (; t.insertBefore(r.cloneNode(!0), n), !(r === i || !(r = r.nextSibling)); );
      else {
        Cr.innerHTML = yo(s === 'svg' ? `<svg>${e}</svg>` : s === 'mathml' ? `<math>${e}</math>` : e)
        const l = Cr.content
        if (s === 'svg' || s === 'mathml') {
          const c = l.firstChild
          for (; c.firstChild; ) l.appendChild(c.firstChild)
          l.removeChild(c)
        }
        t.insertBefore(l, n)
      }
      return [o ? o.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild]
    }
  },
  Qe = 'transition',
  jt = 'animation',
  Zt = Symbol('_vtc'),
  bo = {
    name: String,
    type: String,
    css: { type: Boolean, default: !0 },
    duration: [String, Number, Object],
    enterFromClass: String,
    enterActiveClass: String,
    enterToClass: String,
    appearFromClass: String,
    appearActiveClass: String,
    appearToClass: String,
    leaveFromClass: String,
    leaveActiveClass: String,
    leaveToClass: String
  },
  Uc = de({}, Oi, bo),
  Wc = (e) => ((e.displayName = 'Transition'), (e.props = Uc), e),
  If = Wc((e, { slots: t }) => Fs(jl, Bc(e), t)),
  at = (e, t = []) => {
    U(e) ? e.forEach((n) => n(...t)) : e && e(...t)
  },
  Ar = (e) => (e ? (U(e) ? e.some((t) => t.length > 1) : e.length > 1) : !1)
function Bc(e) {
  const t = {}
  for (const b in e) b in bo || (t[b] = e[b])
  if (e.css === !1) return t
  const {
      name: n = 'v',
      type: s,
      duration: r,
      enterFromClass: i = `${n}-enter-from`,
      enterActiveClass: o = `${n}-enter-active`,
      enterToClass: l = `${n}-enter-to`,
      appearFromClass: c = i,
      appearActiveClass: f = o,
      appearToClass: a = l,
      leaveFromClass: h = `${n}-leave-from`,
      leaveActiveClass: v = `${n}-leave-active`,
      leaveToClass: y = `${n}-leave-to`
    } = e,
    A = Kc(r),
    P = A && A[0],
    K = A && A[1],
    {
      onBeforeEnter: H,
      onEnter: k,
      onEnterCancelled: p,
      onLeave: g,
      onLeaveCancelled: M,
      onBeforeAppear: V = H,
      onAppear: R = k,
      onAppearCancelled: W = p
    } = t,
    T = (b, N, Y, re) => {
      ;(b._enterCancelled = re), ft(b, N ? a : l), ft(b, N ? f : o), Y && Y()
    },
    I = (b, N) => {
      ;(b._isLeaving = !1), ft(b, h), ft(b, y), ft(b, v), N && N()
    },
    E = (b) => (N, Y) => {
      const re = b ? R : k,
        j = () => T(N, b, Y)
      at(re, [N, j]),
        Rr(() => {
          ft(N, b ? c : i), Ke(N, b ? a : l), Ar(re) || Or(N, s, P, j)
        })
    }
  return de(t, {
    onBeforeEnter(b) {
      at(H, [b]), Ke(b, i), Ke(b, o)
    },
    onBeforeAppear(b) {
      at(V, [b]), Ke(b, c), Ke(b, f)
    },
    onEnter: E(!1),
    onAppear: E(!0),
    onLeave(b, N) {
      b._isLeaving = !0
      const Y = () => I(b, N)
      Ke(b, h),
        b._enterCancelled ? (Ke(b, v), Pr()) : (Pr(), Ke(b, v)),
        Rr(() => {
          b._isLeaving && (ft(b, h), Ke(b, y), Ar(g) || Or(b, s, K, Y))
        }),
        at(g, [b, Y])
    },
    onEnterCancelled(b) {
      T(b, !1, void 0, !0), at(p, [b])
    },
    onAppearCancelled(b) {
      T(b, !0, void 0, !0), at(W, [b])
    },
    onLeaveCancelled(b) {
      I(b), at(M, [b])
    }
  })
}
function Kc(e) {
  if (e == null) return null
  if (ee(e)) return [as(e.enter), as(e.leave)]
  {
    const t = as(e)
    return [t, t]
  }
}
function as(e) {
  return ko(e)
}
function Ke(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)), (e[Zt] || (e[Zt] = new Set())).add(t)
}
function ft(e, t) {
  t.split(/\s+/).forEach((s) => s && e.classList.remove(s))
  const n = e[Zt]
  n && (n.delete(t), n.size || (e[Zt] = void 0))
}
function Rr(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e)
  })
}
let qc = 0
function Or(e, t, n, s) {
  const r = (e._endId = ++qc),
    i = () => {
      r === e._endId && s()
    }
  if (n != null) return setTimeout(i, n)
  const { type: o, timeout: l, propCount: c } = Gc(e, t)
  if (!o) return s()
  const f = o + 'end'
  let a = 0
  const h = () => {
      e.removeEventListener(f, v), i()
    },
    v = (y) => {
      y.target === e && ++a >= c && h()
    }
  setTimeout(() => {
    a < c && h()
  }, l + 1),
    e.addEventListener(f, v)
}
function Gc(e, t) {
  const n = window.getComputedStyle(e),
    s = (A) => (n[A] || '').split(', '),
    r = s(`${Qe}Delay`),
    i = s(`${Qe}Duration`),
    o = Mr(r, i),
    l = s(`${jt}Delay`),
    c = s(`${jt}Duration`),
    f = Mr(l, c)
  let a = null,
    h = 0,
    v = 0
  t === Qe
    ? o > 0 && ((a = Qe), (h = o), (v = i.length))
    : t === jt
      ? f > 0 && ((a = jt), (h = f), (v = c.length))
      : ((h = Math.max(o, f)), (a = h > 0 ? (o > f ? Qe : jt) : null), (v = a ? (a === Qe ? i.length : c.length) : 0))
  const y = a === Qe && /\b(transform|all)(,|$)/.test(s(`${Qe}Property`).toString())
  return { type: a, timeout: h, propCount: v, hasTransform: y }
}
function Mr(e, t) {
  for (; e.length < t.length; ) e = e.concat(e)
  return Math.max(...t.map((n, s) => Ir(n) + Ir(e[s])))
}
function Ir(e) {
  return e === 'auto' ? 0 : Number(e.slice(0, -1).replace(',', '.')) * 1e3
}
function Pr() {
  return document.body.offsetHeight
}
function Xc(e, t, n) {
  const s = e[Zt]
  s && (t = (t ? [t, ...s] : [...s]).join(' ')), t == null ? e.removeAttribute('class') : n ? e.setAttribute('class', t) : (e.className = t)
}
const Lr = Symbol('_vod'),
  Yc = Symbol('_vsh'),
  Jc = Symbol(''),
  zc = /(^|;)\s*display\s*:/
function Qc(e, t, n) {
  const s = e.style,
    r = oe(n)
  let i = !1
  if (n && !r) {
    if (t)
      if (oe(t))
        for (const o of t.split(';')) {
          const l = o.slice(0, o.indexOf(':')).trim()
          n[l] == null && Tn(s, l, '')
        }
      else for (const o in t) n[o] == null && Tn(s, o, '')
    for (const o in n) o === 'display' && (i = !0), Tn(s, o, n[o])
  } else if (r) {
    if (t !== n) {
      const o = s[Jc]
      o && (n += ';' + o), (s.cssText = n), (i = zc.test(n))
    }
  } else t && e.removeAttribute('style')
  Lr in e && ((e[Lr] = i ? s.display : ''), e[Yc] && (s.display = 'none'))
}
const Nr = /\s*!important$/
function Tn(e, t, n) {
  if (U(n)) n.forEach((s) => Tn(e, t, s))
  else if ((n == null && (n = ''), t.startsWith('--'))) e.setProperty(t, n)
  else {
    const s = Zc(e, t)
    Nr.test(n) ? e.setProperty(rt(s), n.replace(Nr, ''), 'important') : (e[s] = n)
  }
}
const Fr = ['Webkit', 'Moz', 'ms'],
  fs = {}
function Zc(e, t) {
  const n = fs[t]
  if (n) return n
  let s = Ne(t)
  if (s !== 'filter' && s in e) return (fs[t] = s)
  s = jn(s)
  for (let r = 0; r < Fr.length; r++) {
    const i = Fr[r] + s
    if (i in e) return (fs[t] = i)
  }
  return t
}
const Hr = 'http://www.w3.org/1999/xlink'
function Dr(e, t, n, s, r, i = Go(t)) {
  s && t.startsWith('xlink:')
    ? n == null
      ? e.removeAttributeNS(Hr, t.slice(6, t.length))
      : e.setAttributeNS(Hr, t, n)
    : n == null || (i && !ri(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, i ? '' : De(n) ? String(n) : n)
}
function jr(e, t, n, s, r) {
  if (t === 'innerHTML' || t === 'textContent') {
    n != null && (e[t] = t === 'innerHTML' ? yo(n) : n)
    return
  }
  const i = e.tagName
  if (t === 'value' && i !== 'PROGRESS' && !i.includes('-')) {
    const l = i === 'OPTION' ? e.getAttribute('value') || '' : e.value,
      c = n == null ? (e.type === 'checkbox' ? 'on' : '') : String(n)
    ;(l !== c || !('_value' in e)) && (e.value = c), n == null && e.removeAttribute(t), (e._value = n)
    return
  }
  let o = !1
  if (n === '' || n == null) {
    const l = typeof e[t]
    l === 'boolean' ? (n = ri(n)) : n == null && l === 'string' ? ((n = ''), (o = !0)) : l === 'number' && ((n = 0), (o = !0))
  }
  try {
    e[t] = n
  } catch {}
  o && e.removeAttribute(r || t)
}
function ht(e, t, n, s) {
  e.addEventListener(t, n, s)
}
function ea(e, t, n, s) {
  e.removeEventListener(t, n, s)
}
const $r = Symbol('_vei')
function ta(e, t, n, s, r = null) {
  const i = e[$r] || (e[$r] = {}),
    o = i[t]
  if (s && o) o.value = s
  else {
    const [l, c] = na(t)
    if (s) {
      const f = (i[t] = ia(s, r))
      ht(e, l, f, c)
    } else o && (ea(e, l, o, c), (i[t] = void 0))
  }
}
const Vr = /(?:Once|Passive|Capture)$/
function na(e) {
  let t
  if (Vr.test(e)) {
    t = {}
    let s
    for (; (s = e.match(Vr)); ) (e = e.slice(0, e.length - s[0].length)), (t[s[0].toLowerCase()] = !0)
  }
  return [e[2] === ':' ? e.slice(3) : rt(e.slice(2)), t]
}
let us = 0
const sa = Promise.resolve(),
  ra = () => us || (sa.then(() => (us = 0)), (us = Date.now()))
function ia(e, t) {
  const n = (s) => {
    if (!s._vts) s._vts = Date.now()
    else if (s._vts <= n.attached) return
    je(oa(s, n.value), t, 5, [s])
  }
  return (n.value = e), (n.attached = ra()), n
}
function oa(e, t) {
  if (U(t)) {
    const n = e.stopImmediatePropagation
    return (
      (e.stopImmediatePropagation = () => {
        n.call(e), (e._stopped = !0)
      }),
      t.map((s) => (r) => !r._stopped && s && s(r))
    )
  } else return t
}
const kr = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123,
  la = (e, t, n, s, r, i) => {
    const o = r === 'svg'
    t === 'class'
      ? Xc(e, s, o)
      : t === 'style'
        ? Qc(e, n, s)
        : en(t)
          ? js(t) || ta(e, t, n, s, i)
          : (t[0] === '.' ? ((t = t.slice(1)), !0) : t[0] === '^' ? ((t = t.slice(1)), !1) : ca(e, t, s, o))
            ? (jr(e, t, s), !e.tagName.includes('-') && (t === 'value' || t === 'checked' || t === 'selected') && Dr(e, t, s, o, i, t !== 'value'))
            : e._isVueCE && (/[A-Z]/.test(t) || !oe(s))
              ? jr(e, Ne(t), s, i, t)
              : (t === 'true-value' ? (e._trueValue = s) : t === 'false-value' && (e._falseValue = s), Dr(e, t, s, o))
  }
function ca(e, t, n, s) {
  if (s) return !!(t === 'innerHTML' || t === 'textContent' || (t in e && kr(t) && G(n)))
  if (
    t === 'spellcheck' ||
    t === 'draggable' ||
    t === 'translate' ||
    t === 'form' ||
    (t === 'list' && e.tagName === 'INPUT') ||
    (t === 'type' && e.tagName === 'TEXTAREA')
  )
    return !1
  if (t === 'width' || t === 'height') {
    const r = e.tagName
    if (r === 'IMG' || r === 'VIDEO' || r === 'CANVAS' || r === 'SOURCE') return !1
  }
  return kr(t) && oe(n) ? !1 : t in e
}
const Nn = (e) => {
  const t = e.props['onUpdate:modelValue'] || !1
  return U(t) ? (n) => wn(t, n) : t
}
function aa(e) {
  e.target.composing = !0
}
function Ur(e) {
  const t = e.target
  t.composing && ((t.composing = !1), t.dispatchEvent(new Event('input')))
}
const Pt = Symbol('_assign'),
  Pf = {
    created(e, { modifiers: { lazy: t, trim: n, number: s } }, r) {
      e[Pt] = Nn(r)
      const i = s || (r.props && r.props.type === 'number')
      ht(e, t ? 'change' : 'input', (o) => {
        if (o.target.composing) return
        let l = e.value
        n && (l = l.trim()), i && (l = Cn(l)), e[Pt](l)
      }),
        n &&
          ht(e, 'change', () => {
            e.value = e.value.trim()
          }),
        t || (ht(e, 'compositionstart', aa), ht(e, 'compositionend', Ur), ht(e, 'change', Ur))
    },
    mounted(e, { value: t }) {
      e.value = t ?? ''
    },
    beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: s, trim: r, number: i } }, o) {
      if (((e[Pt] = Nn(o)), e.composing)) return
      const l = (i || e.type === 'number') && !/^0\d/.test(e.value) ? Cn(e.value) : e.value,
        c = t ?? ''
      l !== c && ((document.activeElement === e && e.type !== 'range' && ((s && t === n) || (r && e.value.trim() === c))) || (e.value = c))
    }
  },
  Lf = {
    deep: !0,
    created(e, { value: t, modifiers: { number: n } }, s) {
      const r = Hn(t)
      ht(e, 'change', () => {
        const i = Array.prototype.filter.call(e.options, (o) => o.selected).map((o) => (n ? Cn(Fn(o)) : Fn(o)))
        e[Pt](e.multiple ? (r ? new Set(i) : i) : i[0]),
          (e._assigning = !0),
          sn(() => {
            e._assigning = !1
          })
      }),
        (e[Pt] = Nn(s))
    },
    mounted(e, { value: t }) {
      Wr(e, t)
    },
    beforeUpdate(e, t, n) {
      e[Pt] = Nn(n)
    },
    updated(e, { value: t }) {
      e._assigning || Wr(e, t)
    }
  }
function Wr(e, t) {
  const n = e.multiple,
    s = U(t)
  if (!(n && !s && !Hn(t))) {
    for (let r = 0, i = e.options.length; r < i; r++) {
      const o = e.options[r],
        l = Fn(o)
      if (n)
        if (s) {
          const c = typeof l
          c === 'string' || c === 'number' ? (o.selected = t.some((f) => String(f) === String(l))) : (o.selected = Yo(t, l) > -1)
        } else o.selected = t.has(l)
      else if (Vn(Fn(o), t)) {
        e.selectedIndex !== r && (e.selectedIndex = r)
        return
      }
    }
    !n && e.selectedIndex !== -1 && (e.selectedIndex = -1)
  }
}
function Fn(e) {
  return '_value' in e ? e._value : e.value
}
const fa = ['ctrl', 'shift', 'alt', 'meta'],
  ua = {
    stop: (e) => e.stopPropagation(),
    prevent: (e) => e.preventDefault(),
    self: (e) => e.target !== e.currentTarget,
    ctrl: (e) => !e.ctrlKey,
    shift: (e) => !e.shiftKey,
    alt: (e) => !e.altKey,
    meta: (e) => !e.metaKey,
    left: (e) => 'button' in e && e.button !== 0,
    middle: (e) => 'button' in e && e.button !== 1,
    right: (e) => 'button' in e && e.button !== 2,
    exact: (e, t) => fa.some((n) => e[`${n}Key`] && !t.includes(n))
  },
  Nf = (e, t) => {
    const n = e._withMods || (e._withMods = {}),
      s = t.join('.')
    return (
      n[s] ||
      (n[s] = (r, ...i) => {
        for (let o = 0; o < t.length; o++) {
          const l = ua[t[o]]
          if (l && l(r, t)) return
        }
        return e(r, ...i)
      })
    )
  },
  da = { esc: 'escape', space: ' ', up: 'arrow-up', left: 'arrow-left', right: 'arrow-right', down: 'arrow-down', delete: 'backspace' },
  Ff = (e, t) => {
    const n = e._withKeys || (e._withKeys = {}),
      s = t.join('.')
    return (
      n[s] ||
      (n[s] = (r) => {
        if (!('key' in r)) return
        const i = rt(r.key)
        if (t.some((o) => o === i || da[o] === i)) return e(r)
      })
    )
  },
  ha = de({ patchProp: la }, kc)
let ds,
  Br = !1
function pa() {
  return (ds = Br ? ds : gc(ha)), (Br = !0), ds
}
const Hf = (...e) => {
  const t = pa().createApp(...e),
    { mount: n } = t
  return (
    (t.mount = (s) => {
      const r = ma(s)
      if (r) return n(r, !0, ga(r))
    }),
    t
  )
}
function ga(e) {
  if (e instanceof SVGElement) return 'svg'
  if (typeof MathMLElement == 'function' && e instanceof MathMLElement) return 'mathml'
}
function ma(e) {
  return oe(e) ? document.querySelector(e) : e
}
const va = window.__VP_SITE_DATA__
function _o(e) {
  return li() ? (Qo(e), !0) : !1
}
const hs = new WeakMap(),
  ya = (...e) => {
    var t
    const n = e[0],
      s = (t = rn()) == null ? void 0 : t.proxy
    if (s == null && !Ki()) throw new Error('injectLocal must be called in setup')
    return s && hs.has(s) && n in hs.get(s) ? hs.get(s)[n] : bt(...e)
  },
  wo = typeof window < 'u' && typeof document < 'u'
typeof WorkerGlobalScope < 'u' && globalThis instanceof WorkerGlobalScope
const ba = Object.prototype.toString,
  _a = (e) => ba.call(e) === '[object Object]',
  xt = () => {},
  Kr = wa()
function wa() {
  var e, t
  return (
    wo &&
    ((e = window == null ? void 0 : window.navigator) == null ? void 0 : e.userAgent) &&
    (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) ||
      (((t = window == null ? void 0 : window.navigator) == null ? void 0 : t.maxTouchPoints) > 2 &&
        /iPad|Macintosh/.test(window == null ? void 0 : window.navigator.userAgent)))
  )
}
function Zs(e, t) {
  function n(...s) {
    return new Promise((r, i) => {
      Promise.resolve(e(() => t.apply(this, s), { fn: t, thisArg: this, args: s }))
        .then(r)
        .catch(i)
    })
  }
  return n
}
const So = (e) => e()
function Sa(e, t = {}) {
  let n,
    s,
    r = xt
  const i = (c) => {
    clearTimeout(c), r(), (r = xt)
  }
  let o
  return (c) => {
    const f = le(e),
      a = le(t.maxWait)
    return (
      n && i(n),
      f <= 0 || (a !== void 0 && a <= 0)
        ? (s && (i(s), (s = null)), Promise.resolve(c()))
        : new Promise((h, v) => {
            ;(r = t.rejectOnCancel ? v : h),
              (o = c),
              a &&
                !s &&
                (s = setTimeout(() => {
                  n && i(n), (s = null), h(o())
                }, a)),
              (n = setTimeout(() => {
                s && i(s), (s = null), h(c())
              }, f))
          })
    )
  }
}
function xa(...e) {
  let t = 0,
    n,
    s = !0,
    r = xt,
    i,
    o,
    l,
    c,
    f
  !fe(e[0]) && typeof e[0] == 'object' ? ({ delay: o, trailing: l = !0, leading: c = !0, rejectOnCancel: f = !1 } = e[0]) : ([o, l = !0, c = !0, f = !1] = e)
  const a = () => {
    n && (clearTimeout(n), (n = void 0), r(), (r = xt))
  }
  return (v) => {
    const y = le(o),
      A = Date.now() - t,
      P = () => (i = v())
    return (
      a(),
      y <= 0
        ? ((t = Date.now()), P())
        : (A > y && (c || !s)
            ? ((t = Date.now()), P())
            : l &&
              (i = new Promise((K, H) => {
                ;(r = f ? H : K),
                  (n = setTimeout(
                    () => {
                      ;(t = Date.now()), (s = !0), K(P()), a()
                    },
                    Math.max(0, y - A)
                  ))
              })),
          !c && !n && (n = setTimeout(() => (s = !0), y)),
          (s = !1),
          i)
    )
  }
}
function Ta(e = So, t = {}) {
  const { initialState: n = 'active' } = t,
    s = er(n === 'active')
  function r() {
    s.value = !1
  }
  function i() {
    s.value = !0
  }
  const o = (...l) => {
    s.value && e(...l)
  }
  return { isActive: Wn(s), pause: r, resume: i, eventFilter: o }
}
function qr(e) {
  return e.endsWith('rem') ? Number.parseFloat(e) * 16 : Number.parseFloat(e)
}
function Ea(e) {
  return rn()
}
function ps(e) {
  return Array.isArray(e) ? e : [e]
}
function er(...e) {
  if (e.length !== 1) return El(...e)
  const t = e[0]
  return typeof t == 'function' ? Wn(Sl(() => ({ get: t, set: xt }))) : mt(t)
}
function Ca(e, t = 200, n = {}) {
  return Zs(Sa(t, n), e)
}
function Aa(e, t = 200, n = !1, s = !0, r = !1) {
  return Zs(xa(t, n, s, r), e)
}
function Ra(e, t, n = {}) {
  const { eventFilter: s = So, ...r } = n
  return Le(e, Zs(s, t), r)
}
function Oa(e, t, n = {}) {
  const { eventFilter: s, initialState: r = 'active', ...i } = n,
    { eventFilter: o, pause: l, resume: c, isActive: f } = Ta(s, { initialState: r })
  return { stop: Ra(e, t, { ...i, eventFilter: o }), pause: l, resume: c, isActive: f }
}
function zn(e, t = !0, n) {
  Ea() ? Nt(e, n) : t ? e() : sn(e)
}
function Ma(e, t, n) {
  return Le(e, t, { ...n, immediate: !0 })
}
const Ye = wo ? window : void 0
function tr(e) {
  var t
  const n = le(e)
  return (t = n == null ? void 0 : n.$el) != null ? t : n
}
function Je(...e) {
  const t = [],
    n = () => {
      t.forEach((l) => l()), (t.length = 0)
    },
    s = (l, c, f, a) => (l.addEventListener(c, f, a), () => l.removeEventListener(c, f, a)),
    r = ie(() => {
      const l = ps(le(e[0])).filter((c) => c != null)
      return l.every((c) => typeof c != 'string') ? l : void 0
    }),
    i = Ma(
      () => {
        var l, c
        return [
          (c = (l = r.value) == null ? void 0 : l.map((f) => tr(f))) != null ? c : [Ye].filter((f) => f != null),
          ps(le(r.value ? e[1] : e[0])),
          ps(Ys(r.value ? e[2] : e[1])),
          le(r.value ? e[3] : e[2])
        ]
      },
      ([l, c, f, a]) => {
        if ((n(), !(l != null && l.length) || !(c != null && c.length) || !(f != null && f.length))) return
        const h = _a(a) ? { ...a } : a
        t.push(...l.flatMap((v) => c.flatMap((y) => f.map((A) => s(v, y, A, h)))))
      },
      { flush: 'post' }
    ),
    o = () => {
      i(), n()
    }
  return _o(n), o
}
function Ia() {
  const e = Pe(!1),
    t = rn()
  return (
    t &&
      Nt(() => {
        e.value = !0
      }, t),
    e
  )
}
function Pa(e) {
  const t = Ia()
  return ie(() => (t.value, !!e()))
}
function La(e) {
  return typeof e == 'function' ? e : typeof e == 'string' ? (t) => t.key === e : Array.isArray(e) ? (t) => e.includes(t.key) : () => !0
}
function Df(...e) {
  let t,
    n,
    s = {}
  e.length === 3
    ? ((t = e[0]), (n = e[1]), (s = e[2]))
    : e.length === 2
      ? typeof e[1] == 'object'
        ? ((t = !0), (n = e[0]), (s = e[1]))
        : ((t = e[0]), (n = e[1]))
      : ((t = !0), (n = e[0]))
  const { target: r = Ye, eventName: i = 'keydown', passive: o = !1, dedupe: l = !1 } = s,
    c = La(t)
  return Je(
    r,
    i,
    (a) => {
      ;(a.repeat && le(l)) || (c(a) && n(a))
    },
    o
  )
}
const Na = Symbol('vueuse-ssr-width')
function Fa() {
  const e = Ki() ? ya(Na, null) : null
  return typeof e == 'number' ? e : void 0
}
function xo(e, t = {}) {
  const { window: n = Ye, ssrWidth: s = Fa() } = t,
    r = Pa(() => n && 'matchMedia' in n && typeof n.matchMedia == 'function'),
    i = Pe(typeof s == 'number'),
    o = Pe(),
    l = Pe(!1),
    c = (f) => {
      l.value = f.matches
    }
  return (
    ro(() => {
      if (i.value) {
        i.value = !r.value
        const f = le(e).split(',')
        l.value = f.some((a) => {
          const h = a.includes('not all'),
            v = a.match(/\(\s*min-width:\s*(-?\d+(?:\.\d*)?[a-z]+\s*)\)/),
            y = a.match(/\(\s*max-width:\s*(-?\d+(?:\.\d*)?[a-z]+\s*)\)/)
          let A = !!(v || y)
          return v && A && (A = s >= qr(v[1])), y && A && (A = s <= qr(y[1])), h ? !A : A
        })
        return
      }
      r.value && ((o.value = n.matchMedia(le(e))), (l.value = o.value.matches))
    }),
    Je(o, 'change', c, { passive: !0 }),
    ie(() => l.value)
  )
}
const mn = typeof globalThis < 'u' ? globalThis : typeof window < 'u' ? window : typeof global < 'u' ? global : typeof self < 'u' ? self : {},
  vn = '__vueuse_ssr_handlers__',
  Ha = Da()
function Da() {
  return vn in mn || (mn[vn] = mn[vn] || {}), mn[vn]
}
function To(e, t) {
  return Ha[e] || t
}
function Eo(e) {
  return xo('(prefers-color-scheme: dark)', e)
}
function ja(e) {
  return e == null
    ? 'any'
    : e instanceof Set
      ? 'set'
      : e instanceof Map
        ? 'map'
        : e instanceof Date
          ? 'date'
          : typeof e == 'boolean'
            ? 'boolean'
            : typeof e == 'string'
              ? 'string'
              : typeof e == 'object'
                ? 'object'
                : Number.isNaN(e)
                  ? 'any'
                  : 'number'
}
const $a = {
    boolean: { read: (e) => e === 'true', write: (e) => String(e) },
    object: { read: (e) => JSON.parse(e), write: (e) => JSON.stringify(e) },
    number: { read: (e) => Number.parseFloat(e), write: (e) => String(e) },
    any: { read: (e) => e, write: (e) => String(e) },
    string: { read: (e) => e, write: (e) => String(e) },
    map: { read: (e) => new Map(JSON.parse(e)), write: (e) => JSON.stringify(Array.from(e.entries())) },
    set: { read: (e) => new Set(JSON.parse(e)), write: (e) => JSON.stringify(Array.from(e)) },
    date: { read: (e) => new Date(e), write: (e) => e.toISOString() }
  },
  Gr = 'vueuse-storage'
function Va(e, t, n, s = {}) {
  var r
  const {
      flush: i = 'pre',
      deep: o = !0,
      listenToStorageChanges: l = !0,
      writeDefaults: c = !0,
      mergeDefaults: f = !1,
      shallow: a,
      window: h = Ye,
      eventFilter: v,
      onError: y = (E) => {
        console.error(E)
      },
      initOnMounted: A
    } = s,
    P = (a ? Pe : mt)(typeof t == 'function' ? t() : t),
    K = ie(() => le(e))
  if (!n)
    try {
      n = To('getDefaultStorage', () => {
        var E
        return (E = Ye) == null ? void 0 : E.localStorage
      })()
    } catch (E) {
      y(E)
    }
  if (!n) return P
  const H = le(t),
    k = ja(H),
    p = (r = s.serializer) != null ? r : $a[k],
    { pause: g, resume: M } = Oa(P, () => R(P.value), { flush: i, deep: o, eventFilter: v })
  Le(K, () => T(), { flush: i }),
    h &&
      l &&
      zn(() => {
        n instanceof Storage ? Je(h, 'storage', T, { passive: !0 }) : Je(h, Gr, I), A && T()
      }),
    A || T()
  function V(E, b) {
    if (h) {
      const N = { key: K.value, oldValue: E, newValue: b, storageArea: n }
      h.dispatchEvent(n instanceof Storage ? new StorageEvent('storage', N) : new CustomEvent(Gr, { detail: N }))
    }
  }
  function R(E) {
    try {
      const b = n.getItem(K.value)
      if (E == null) V(b, null), n.removeItem(K.value)
      else {
        const N = p.write(E)
        b !== N && (n.setItem(K.value, N), V(b, N))
      }
    } catch (b) {
      y(b)
    }
  }
  function W(E) {
    const b = E ? E.newValue : n.getItem(K.value)
    if (b == null) return c && H != null && n.setItem(K.value, p.write(H)), H
    if (!E && f) {
      const N = p.read(b)
      return typeof f == 'function' ? f(N, H) : k === 'object' && !Array.isArray(N) ? { ...H, ...N } : N
    } else return typeof b != 'string' ? b : p.read(b)
  }
  function T(E) {
    if (!(E && E.storageArea !== n)) {
      if (E && E.key == null) {
        P.value = H
        return
      }
      if (!(E && E.key !== K.value)) {
        g()
        try {
          ;(E == null ? void 0 : E.newValue) !== p.write(P.value) && (P.value = W(E))
        } catch (b) {
          y(b)
        } finally {
          E ? sn(M) : M()
        }
      }
    }
  }
  function I(E) {
    T(E.detail)
  }
  return P
}
const ka =
  '*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}'
function Ua(e = {}) {
  const {
      selector: t = 'html',
      attribute: n = 'class',
      initialValue: s = 'auto',
      window: r = Ye,
      storage: i,
      storageKey: o = 'vueuse-color-scheme',
      listenToStorageChanges: l = !0,
      storageRef: c,
      emitAuto: f,
      disableTransition: a = !0
    } = e,
    h = { auto: '', light: 'light', dark: 'dark', ...(e.modes || {}) },
    v = Eo({ window: r }),
    y = ie(() => (v.value ? 'dark' : 'light')),
    A = c || (o == null ? er(s) : Va(o, s, i, { window: r, listenToStorageChanges: l })),
    P = ie(() => (A.value === 'auto' ? y.value : A.value)),
    K = To('updateHTMLAttrs', (g, M, V) => {
      const R = typeof g == 'string' ? (r == null ? void 0 : r.document.querySelector(g)) : tr(g)
      if (!R) return
      const W = new Set(),
        T = new Set()
      let I = null
      if (M === 'class') {
        const b = V.split(/\s/g)
        Object.values(h)
          .flatMap((N) => (N || '').split(/\s/g))
          .filter(Boolean)
          .forEach((N) => {
            b.includes(N) ? W.add(N) : T.add(N)
          })
      } else I = { key: M, value: V }
      if (W.size === 0 && T.size === 0 && I === null) return
      let E
      a && ((E = r.document.createElement('style')), E.appendChild(document.createTextNode(ka)), r.document.head.appendChild(E))
      for (const b of W) R.classList.add(b)
      for (const b of T) R.classList.remove(b)
      I && R.setAttribute(I.key, I.value), a && (r.getComputedStyle(E).opacity, document.head.removeChild(E))
    })
  function H(g) {
    var M
    K(t, n, (M = h[g]) != null ? M : g)
  }
  function k(g) {
    e.onChanged ? e.onChanged(g, H) : H(g)
  }
  Le(P, k, { flush: 'post', immediate: !0 }), zn(() => k(P.value))
  const p = ie({
    get() {
      return f ? A.value : P.value
    },
    set(g) {
      A.value = g
    }
  })
  return Object.assign(p, { store: A, system: y, state: P })
}
function Wa(e = {}) {
  const { valueDark: t = 'dark', valueLight: n = '' } = e,
    s = Ua({
      ...e,
      onChanged: (o, l) => {
        var c
        e.onChanged ? (c = e.onChanged) == null || c.call(e, o === 'dark', l, o) : l(o)
      },
      modes: { dark: t, light: n }
    }),
    r = ie(() => s.system.value)
  return ie({
    get() {
      return s.value === 'dark'
    },
    set(o) {
      const l = o ? 'dark' : 'light'
      r.value === l ? (s.value = 'auto') : (s.value = l)
    }
  })
}
function gs(e) {
  return typeof Window < 'u' && e instanceof Window ? e.document.documentElement : typeof Document < 'u' && e instanceof Document ? e.documentElement : e
}
const Xr = 1
function Ba(e, t = {}) {
  const {
      throttle: n = 0,
      idle: s = 200,
      onStop: r = xt,
      onScroll: i = xt,
      offset: o = { left: 0, right: 0, top: 0, bottom: 0 },
      eventListenerOptions: l = { capture: !1, passive: !0 },
      behavior: c = 'auto',
      window: f = Ye,
      onError: a = (R) => {
        console.error(R)
      }
    } = t,
    h = Pe(0),
    v = Pe(0),
    y = ie({
      get() {
        return h.value
      },
      set(R) {
        P(R, void 0)
      }
    }),
    A = ie({
      get() {
        return v.value
      },
      set(R) {
        P(void 0, R)
      }
    })
  function P(R, W) {
    var T, I, E, b
    if (!f) return
    const N = le(e)
    if (!N) return
    ;(E = N instanceof Document ? f.document.body : N) == null ||
      E.scrollTo({ top: (T = le(W)) != null ? T : A.value, left: (I = le(R)) != null ? I : y.value, behavior: le(c) })
    const Y = ((b = N == null ? void 0 : N.document) == null ? void 0 : b.documentElement) || (N == null ? void 0 : N.documentElement) || N
    y != null && (h.value = Y.scrollLeft), A != null && (v.value = Y.scrollTop)
  }
  const K = Pe(!1),
    H = Lt({ left: !0, right: !1, top: !0, bottom: !1 }),
    k = Lt({ left: !1, right: !1, top: !1, bottom: !1 }),
    p = (R) => {
      K.value && ((K.value = !1), (k.left = !1), (k.right = !1), (k.top = !1), (k.bottom = !1), r(R))
    },
    g = Ca(p, n + s),
    M = (R) => {
      var W
      if (!f) return
      const T = ((W = R == null ? void 0 : R.document) == null ? void 0 : W.documentElement) || (R == null ? void 0 : R.documentElement) || tr(R),
        { display: I, flexDirection: E, direction: b } = getComputedStyle(T),
        N = b === 'rtl' ? -1 : 1,
        Y = T.scrollLeft
      ;(k.left = Y < h.value), (k.right = Y > h.value)
      const re = Math.abs(Y * N) <= (o.left || 0),
        j = Math.abs(Y * N) + T.clientWidth >= T.scrollWidth - (o.right || 0) - Xr
      I === 'flex' && E === 'row-reverse' ? ((H.left = j), (H.right = re)) : ((H.left = re), (H.right = j)), (h.value = Y)
      let X = T.scrollTop
      R === f.document && !X && (X = f.document.body.scrollTop), (k.top = X < v.value), (k.bottom = X > v.value)
      const D = Math.abs(X) <= (o.top || 0),
        ce = Math.abs(X) + T.clientHeight >= T.scrollHeight - (o.bottom || 0) - Xr
      I === 'flex' && E === 'column-reverse' ? ((H.top = ce), (H.bottom = D)) : ((H.top = D), (H.bottom = ce)), (v.value = X)
    },
    V = (R) => {
      var W
      if (!f) return
      const T = (W = R.target.documentElement) != null ? W : R.target
      M(T), (K.value = !0), g(R), i(R)
    }
  return (
    Je(e, 'scroll', n ? Aa(V, n, !0, !1) : V, l),
    zn(() => {
      try {
        const R = le(e)
        if (!R) return
        M(R)
      } catch (R) {
        a(R)
      }
    }),
    Je(e, 'scrollend', p, l),
    {
      x: y,
      y: A,
      isScrolling: K,
      arrivedState: H,
      directions: k,
      measure() {
        const R = le(e)
        f && R && M(R)
      }
    }
  )
}
function Co(e) {
  const t = window.getComputedStyle(e)
  if (
    t.overflowX === 'scroll' ||
    t.overflowY === 'scroll' ||
    (t.overflowX === 'auto' && e.clientWidth < e.scrollWidth) ||
    (t.overflowY === 'auto' && e.clientHeight < e.scrollHeight)
  )
    return !0
  {
    const n = e.parentNode
    return !n || n.tagName === 'BODY' ? !1 : Co(n)
  }
}
function Ka(e) {
  const t = e || window.event,
    n = t.target
  return Co(n) ? !1 : t.touches.length > 1 ? !0 : (t.preventDefault && t.preventDefault(), !1)
}
const ms = new WeakMap()
function jf(e, t = !1) {
  const n = Pe(t)
  let s = null,
    r = ''
  Le(
    er(e),
    (l) => {
      const c = gs(le(l))
      if (c) {
        const f = c
        if ((ms.get(f) || ms.set(f, f.style.overflow), f.style.overflow !== 'hidden' && (r = f.style.overflow), f.style.overflow === 'hidden'))
          return (n.value = !0)
        if (n.value) return (f.style.overflow = 'hidden')
      }
    },
    { immediate: !0 }
  )
  const i = () => {
      const l = gs(le(e))
      !l ||
        n.value ||
        (Kr &&
          (s = Je(
            l,
            'touchmove',
            (c) => {
              Ka(c)
            },
            { passive: !1 }
          )),
        (l.style.overflow = 'hidden'),
        (n.value = !0))
    },
    o = () => {
      const l = gs(le(e))
      !l || !n.value || (Kr && (s == null || s()), (l.style.overflow = r), ms.delete(l), (n.value = !1))
    }
  return (
    _o(o),
    ie({
      get() {
        return n.value
      },
      set(l) {
        l ? i() : o()
      }
    })
  )
}
function $f(e = {}) {
  const { window: t = Ye, ...n } = e
  return Ba(t, n)
}
function Vf(e = {}) {
  const {
      window: t = Ye,
      initialWidth: n = Number.POSITIVE_INFINITY,
      initialHeight: s = Number.POSITIVE_INFINITY,
      listenOrientation: r = !0,
      includeScrollbar: i = !0,
      type: o = 'inner'
    } = e,
    l = Pe(n),
    c = Pe(s),
    f = () => {
      if (t)
        if (o === 'outer') (l.value = t.outerWidth), (c.value = t.outerHeight)
        else if (o === 'visual' && t.visualViewport) {
          const { width: h, height: v, scale: y } = t.visualViewport
          ;(l.value = Math.round(h * y)), (c.value = Math.round(v * y))
        } else
          i
            ? ((l.value = t.innerWidth), (c.value = t.innerHeight))
            : ((l.value = t.document.documentElement.clientWidth), (c.value = t.document.documentElement.clientHeight))
    }
  f(), zn(f)
  const a = { passive: !0 }
  if ((Je('resize', f, a), t && o === 'visual' && t.visualViewport && Je(t.visualViewport, 'resize', f, a), r)) {
    const h = xo('(orientation: portrait)')
    Le(h, () => f())
  }
  return { width: l, height: c }
}
const vs = {}
var ys = {}
const Ao = /^(?:[a-z]+:|\/\/)/i,
  qa = 'vitepress-theme-appearance',
  Ga = /#.*$/,
  Xa = /[?#].*$/,
  Ya = /(?:(^|\/)index)?\.(?:md|html)$/,
  ge = typeof document < 'u',
  Ro = {
    relativePath: '404.md',
    filePath: '',
    title: '404',
    description: 'Not Found',
    headers: [],
    frontmatter: { sidebar: !1, layout: 'page' },
    lastUpdated: 0,
    isNotFound: !0
  }
function Ja(e, t, n = !1) {
  if (t === void 0) return !1
  if (((e = Yr(`/${e}`)), n)) return new RegExp(t).test(e)
  if (Yr(t) !== e) return !1
  const s = t.match(Ga)
  return s ? (ge ? location.hash : '') === s[0] : !0
}
function Yr(e) {
  return decodeURI(e).replace(Xa, '').replace(Ya, '$1')
}
function za(e) {
  return Ao.test(e)
}
function Qa(e, t) {
  return Object.keys((e == null ? void 0 : e.locales) || {}).find((n) => n !== 'root' && !za(n) && Ja(t, `/${n}/`, !0)) || 'root'
}
function Za(e, t) {
  var s, r, i, o, l, c, f
  const n = Qa(e, t)
  return Object.assign({}, e, {
    localeIndex: n,
    lang: ((s = e.locales[n]) == null ? void 0 : s.lang) ?? e.lang,
    dir: ((r = e.locales[n]) == null ? void 0 : r.dir) ?? e.dir,
    title: ((i = e.locales[n]) == null ? void 0 : i.title) ?? e.title,
    titleTemplate: ((o = e.locales[n]) == null ? void 0 : o.titleTemplate) ?? e.titleTemplate,
    description: ((l = e.locales[n]) == null ? void 0 : l.description) ?? e.description,
    head: Mo(e.head, ((c = e.locales[n]) == null ? void 0 : c.head) ?? []),
    themeConfig: { ...e.themeConfig, ...((f = e.locales[n]) == null ? void 0 : f.themeConfig) }
  })
}
function Oo(e, t) {
  const n = t.title || e.title,
    s = t.titleTemplate ?? e.titleTemplate
  if (typeof s == 'string' && s.includes(':title')) return s.replace(/:title/g, n)
  const r = ef(e.title, s)
  return n === r.slice(3) ? n : `${n}${r}`
}
function ef(e, t) {
  return t === !1 ? '' : t === !0 || t === void 0 ? ` | ${e}` : e === t ? '' : ` | ${t}`
}
function tf(e, t) {
  const [n, s] = t
  if (n !== 'meta') return !1
  const r = Object.entries(s)[0]
  return r == null ? !1 : e.some(([i, o]) => i === n && o[r[0]] === r[1])
}
function Mo(e, t) {
  return [...e.filter((n) => !tf(t, n)), ...t]
}
const nf = /[\u0000-\u001F"#$&*+,:;<=>?[\]^`{|}\u007F]/g,
  sf = /^[a-z]:/i
function Jr(e) {
  const t = sf.exec(e),
    n = t ? t[0] : ''
  return (
    n +
    e
      .slice(n.length)
      .replace(nf, '_')
      .replace(/(^|\/)_+(?=[^/]*$)/, '$1')
  )
}
const bs = new Set()
function rf(e) {
  if (bs.size === 0) {
    const n = (typeof process == 'object' && (ys == null ? void 0 : ys.VITE_EXTRA_EXTENSIONS)) || (vs == null ? void 0 : vs.VITE_EXTRA_EXTENSIONS) || ''
    ;(
      '3g2,3gp,aac,ai,apng,au,avif,bin,bmp,cer,class,conf,crl,css,csv,dll,doc,eps,epub,exe,gif,gz,ics,ief,jar,jpe,jpeg,jpg,js,json,jsonld,m4a,man,mid,midi,mjs,mov,mp2,mp3,mp4,mpe,mpeg,mpg,mpp,oga,ogg,ogv,ogx,opus,otf,p10,p7c,p7m,p7s,pdf,png,ps,qt,roff,rtf,rtx,ser,svg,t,tif,tiff,tr,ts,tsv,ttf,txt,vtt,wav,weba,webm,webp,woff,woff2,xhtml,xml,yaml,yml,zip' +
      (n && typeof n == 'string' ? ',' + n : '')
    )
      .split(',')
      .forEach((s) => bs.add(s))
  }
  const t = e.split('.').pop()
  return t == null || !bs.has(t.toLowerCase())
}
const of = Symbol(),
  wt = Pe(va)
function kf(e) {
  const t = ie(() => Za(wt.value, e.data.relativePath)),
    n = t.value.appearance,
    s =
      n === 'force-dark'
        ? mt(!0)
        : n === 'force-auto'
          ? Eo()
          : n
            ? Wa({ storageKey: qa, initialValue: () => (n === 'dark' ? 'dark' : 'auto'), ...(typeof n == 'object' ? n : {}) })
            : mt(!1),
    r = mt(ge ? location.hash : '')
  return (
    ge &&
      window.addEventListener('hashchange', () => {
        r.value = location.hash
      }),
    Le(
      () => e.data,
      () => {
        r.value = ge ? location.hash : ''
      }
    ),
    {
      site: t,
      theme: ie(() => t.value.themeConfig),
      page: ie(() => e.data),
      frontmatter: ie(() => e.data.frontmatter),
      params: ie(() => e.data.params),
      lang: ie(() => t.value.lang),
      dir: ie(() => e.data.frontmatter.dir || t.value.dir),
      localeIndex: ie(() => t.value.localeIndex || 'root'),
      title: ie(() => Oo(t.value, e.data)),
      description: ie(() => e.data.description || t.value.description),
      isDark: s,
      hash: ie(() => r.value)
    }
  )
}
function lf() {
  const e = bt(of)
  if (!e) throw new Error('vitepress data not properly injected in app')
  return e
}
function cf(e, t) {
  return `${e}${t}`.replace(/\/+/g, '/')
}
function zr(e) {
  return Ao.test(e) || !e.startsWith('/') ? e : cf(wt.value.base, e)
}
function af(e) {
  let t = e.replace(/\.html$/, '')
  if (((t = decodeURIComponent(t)), (t = t.replace(/\/$/, '/index')), ge)) {
    const n = '/icons/'
    t = Jr(t.slice(n.length).replace(/\//g, '_') || 'index') + '.md'
    let s = __VP_HASH_MAP__[t.toLowerCase()]
    if ((s || ((t = t.endsWith('_index.md') ? t.slice(0, -9) + '.md' : t.slice(0, -3) + '_index.md'), (s = __VP_HASH_MAP__[t.toLowerCase()])), !s)) return null
    t = `${n}assets/${t}.${s}.js`
  } else t = `./${Jr(t.slice(1).replace(/\//g, '_'))}.md.js`
  return t
}
let En = []
function Uf(e) {
  En.push(e),
    Gn(() => {
      En = En.filter((t) => t !== e)
    })
}
function ff() {
  let e = wt.value.scrollOffset,
    t = 0,
    n = 24
  if ((typeof e == 'object' && 'padding' in e && ((n = e.padding), (e = e.selector)), typeof e == 'number')) t = e
  else if (typeof e == 'string') t = Qr(e, n)
  else if (Array.isArray(e))
    for (const s of e) {
      const r = Qr(s, n)
      if (r) {
        t = r
        break
      }
    }
  return t
}
function Qr(e, t) {
  const n = document.querySelector(e)
  if (!n) return 0
  const s = n.getBoundingClientRect().bottom
  return s < 0 ? 0 : s + t
}
const uf = Symbol(),
  Io = 'http://a.com',
  df = () => ({ path: '/', component: null, data: Ro })
function Wf(e, t) {
  const n = Lt(df()),
    s = { route: n, go: r }
  async function r(l = ge ? location.href : '/') {
    var c, f
    ;(l = _s(l)),
      (await ((c = s.onBeforeRouteChange) == null ? void 0 : c.call(s, l))) !== !1 &&
        (ge && l !== _s(location.href) && (history.replaceState({ scrollPosition: window.scrollY }, ''), history.pushState({}, '', l)),
        await o(l),
        await ((f = s.onAfterRouteChange ?? s.onAfterRouteChanged) == null ? void 0 : f(l)))
  }
  let i = null
  async function o(l, c = 0, f = !1) {
    var v, y
    if ((await ((v = s.onBeforePageLoad) == null ? void 0 : v.call(s, l))) === !1) return
    const a = new URL(l, Io),
      h = (i = a.pathname)
    try {
      let A = await e(h)
      if (!A) throw new Error(`Page not found: ${h}`)
      if (i === h) {
        i = null
        const { default: P, __pageData: K } = A
        if (!P) throw new Error(`Invalid route component: ${P}`)
        await ((y = s.onAfterPageLoad) == null ? void 0 : y.call(s, l)),
          (n.path = ge ? h : zr(h)),
          (n.component = Sn(P)),
          (n.data = Sn(K)),
          ge &&
            sn(() => {
              let H = wt.value.base + K.relativePath.replace(/(?:(^|\/)index)?\.md$/, '$1')
              if (
                (!wt.value.cleanUrls && !H.endsWith('/') && (H += '.html'),
                H !== a.pathname && ((a.pathname = H), (l = H + a.search + a.hash), history.replaceState({}, '', l)),
                a.hash && !c)
              ) {
                let k = null
                try {
                  k = document.getElementById(decodeURIComponent(a.hash).slice(1))
                } catch (p) {
                  console.warn(p)
                }
                if (k) {
                  Zr(k, a.hash)
                  return
                }
              }
              window.scrollTo(0, c)
            })
      }
    } catch (A) {
      if ((!/fetch|Page not found/.test(A.message) && !/^\/404(\.html|\/)?$/.test(l) && console.error(A), !f))
        try {
          const P = await fetch(wt.value.base + 'hashmap.json')
          ;(window.__VP_HASH_MAP__ = await P.json()), await o(l, c, !0)
          return
        } catch {}
      if (i === h) {
        ;(i = null), (n.path = ge ? h : zr(h)), (n.component = t ? Sn(t) : null)
        const P = ge
          ? h
              .replace(/(^|\/)$/, '$1index')
              .replace(/(\.html)?$/, '.md')
              .replace(/^\//, '')
          : '404.md'
        n.data = { ...Ro, relativePath: P }
      }
    }
  }
  return (
    ge &&
      (history.state === null && history.replaceState({}, ''),
      window.addEventListener(
        'click',
        (l) => {
          if (
            l.defaultPrevented ||
            !(l.target instanceof Element) ||
            l.target.closest('button') ||
            l.button !== 0 ||
            l.ctrlKey ||
            l.shiftKey ||
            l.altKey ||
            l.metaKey
          )
            return
          const c = l.target.closest('a')
          if (!c || c.closest('.vp-raw') || c.hasAttribute('download') || c.hasAttribute('target')) return
          const f = c.getAttribute('href') ?? (c instanceof SVGAElement ? c.getAttribute('xlink:href') : null)
          if (f == null) return
          const { href: a, origin: h, pathname: v, hash: y, search: A } = new URL(f, c.baseURI),
            P = new URL(location.href)
          h === P.origin &&
            rf(v) &&
            (l.preventDefault(),
            v === P.pathname && A === P.search
              ? (y !== P.hash && (history.pushState({}, '', a), window.dispatchEvent(new HashChangeEvent('hashchange', { oldURL: P.href, newURL: a }))),
                y ? Zr(c, y, c.classList.contains('header-anchor')) : window.scrollTo(0, 0))
              : r(a))
        },
        { capture: !0 }
      ),
      window.addEventListener('popstate', async (l) => {
        var f
        if (l.state === null) return
        const c = _s(location.href)
        await o(c, (l.state && l.state.scrollPosition) || 0), await ((f = s.onAfterRouteChange ?? s.onAfterRouteChanged) == null ? void 0 : f(c))
      }),
      window.addEventListener('hashchange', (l) => {
        l.preventDefault()
      })),
    s
  )
}
function hf() {
  const e = bt(uf)
  if (!e) throw new Error('useRouter() is called without provider.')
  return e
}
function Po() {
  return hf().route
}
function Zr(e, t, n = !1) {
  let s = null
  try {
    s = e.classList.contains('header-anchor') ? e : document.getElementById(decodeURIComponent(t).slice(1))
  } catch (r) {
    console.warn(r)
  }
  if (s) {
    let r = function () {
      !n || Math.abs(o - window.scrollY) > window.innerHeight ? window.scrollTo(0, o) : window.scrollTo({ left: 0, top: o, behavior: 'smooth' })
    }
    const i = parseInt(window.getComputedStyle(s).paddingTop, 10),
      o = window.scrollY + s.getBoundingClientRect().top - ff() + i
    requestAnimationFrame(r)
  }
}
function _s(e) {
  const t = new URL(e, Io)
  return (
    (t.pathname = t.pathname.replace(/(^|\/)index(\.html)?$/, '$1')),
    wt.value.cleanUrls
      ? (t.pathname = t.pathname.replace(/\.html$/, ''))
      : !t.pathname.endsWith('/') && !t.pathname.endsWith('.html') && (t.pathname += '.html'),
    t.pathname + t.search + t.hash
  )
}
const yn = () => En.forEach((e) => e()),
  Bf = Ni({
    name: 'VitePressContent',
    props: { as: { type: [Object, String], default: 'div' } },
    setup(e) {
      const t = Po(),
        { frontmatter: n, site: s } = lf()
      return (
        Le(n, yn, { deep: !0, flush: 'post' }),
        () =>
          Fs(e.as, s.value.contentProps ?? { style: { position: 'relative' } }, [
            t.component ? Fs(t.component, { onVnodeMounted: yn, onVnodeUpdated: yn, onVnodeUnmounted: yn }) : '404 Page Not Found'
          ])
      )
    }
  }),
  Kf = (e, t) => {
    const n = e.__vccOpts || e
    for (const [s, r] of t) n[s] = r
    return n
  },
  qf = Ni({
    setup(e, { slots: t }) {
      const n = mt(!1)
      return (
        Nt(() => {
          n.value = !0
        }),
        () => (n.value && t.default ? t.default() : null)
      )
    }
  })
function Gf() {
  ge &&
    window.addEventListener('click', (e) => {
      var n
      const t = e.target
      if (t.matches('.vp-code-group input')) {
        const s = (n = t.parentElement) == null ? void 0 : n.parentElement
        if (!s) return
        const r = Array.from(s.querySelectorAll('input')).indexOf(t)
        if (r < 0) return
        const i = s.querySelector('.blocks')
        if (!i) return
        const o = Array.from(i.children).find((f) => f.classList.contains('active'))
        if (!o) return
        const l = i.children[r]
        if (!l || o === l) return
        o.classList.remove('active'), l.classList.add('active')
        const c = s == null ? void 0 : s.querySelector(`label[for="${t.id}"]`)
        c == null || c.scrollIntoView({ block: 'nearest' })
      }
    })
}
function Xf() {
  if (ge) {
    const e = new WeakMap()
    window.addEventListener('click', (t) => {
      var s
      const n = t.target
      if (n.matches('div[class*="language-"] > button.copy')) {
        const r = n.parentElement,
          i = (s = n.nextElementSibling) == null ? void 0 : s.nextElementSibling
        if (!r || !i) return
        const o = /language-(shellscript|shell|bash|sh|zsh)/.test(r.className),
          l = ['.vp-copy-ignore', '.diff.remove'],
          c = i.cloneNode(!0)
        c.querySelectorAll(l.join(',')).forEach((a) => a.remove())
        let f = c.textContent || ''
        o && (f = f.replace(/^ *(\$|>) /gm, '').trim()),
          pf(f).then(() => {
            n.classList.add('copied'), clearTimeout(e.get(n))
            const a = setTimeout(() => {
              n.classList.remove('copied'), n.blur(), e.delete(n)
            }, 2e3)
            e.set(n, a)
          })
      }
    })
  }
}
async function pf(e) {
  try {
    return navigator.clipboard.writeText(e)
  } catch {
    const t = document.createElement('textarea'),
      n = document.activeElement
    ;(t.value = e),
      t.setAttribute('readonly', ''),
      (t.style.contain = 'strict'),
      (t.style.position = 'absolute'),
      (t.style.left = '-9999px'),
      (t.style.fontSize = '12pt')
    const s = document.getSelection(),
      r = s ? s.rangeCount > 0 && s.getRangeAt(0) : null
    document.body.appendChild(t),
      t.select(),
      (t.selectionStart = 0),
      (t.selectionEnd = e.length),
      document.execCommand('copy'),
      document.body.removeChild(t),
      r && (s.removeAllRanges(), s.addRange(r)),
      n && n.focus()
  }
}
function Yf(e, t) {
  let n = !0,
    s = []
  const r = (i) => {
    if (n) {
      ;(n = !1),
        i.forEach((l) => {
          const c = ws(l)
          for (const f of document.head.children)
            if (f.isEqualNode(c)) {
              s.push(f)
              return
            }
        })
      return
    }
    const o = i.map(ws)
    s.forEach((l, c) => {
      const f = o.findIndex((a) => (a == null ? void 0 : a.isEqualNode(l ?? null)))
      f !== -1 ? delete o[f] : (l == null || l.remove(), delete s[c])
    }),
      o.forEach((l) => l && document.head.appendChild(l)),
      (s = [...s, ...o].filter(Boolean))
  }
  ro(() => {
    const i = e.data,
      o = t.value,
      l = i && i.description,
      c = (i && i.frontmatter.head) || [],
      f = Oo(o, i)
    f !== document.title && (document.title = f)
    const a = l || o.description
    let h = document.querySelector('meta[name=description]')
    h ? h.getAttribute('content') !== a && h.setAttribute('content', a) : ws(['meta', { name: 'description', content: a }]), r(Mo(o.head, mf(c)))
  })
}
function ws([e, t, n]) {
  const s = document.createElement(e)
  for (const r in t) s.setAttribute(r, t[r])
  return n && (s.innerHTML = n), e === 'script' && t.async == null && (s.async = !1), s
}
function gf(e) {
  return e[0] === 'meta' && e[1] && e[1].name === 'description'
}
function mf(e) {
  return e.filter((t) => !gf(t))
}
const Ss = new Set(),
  Lo = () => document.createElement('link'),
  vf = (e) => {
    const t = Lo()
    ;(t.rel = 'prefetch'), (t.href = e), document.head.appendChild(t)
  },
  yf = (e) => {
    const t = new XMLHttpRequest()
    t.open('GET', e, (t.withCredentials = !0)), t.send()
  }
let bn
const bf = ge && (bn = Lo()) && bn.relList && bn.relList.supports && bn.relList.supports('prefetch') ? vf : yf
function Jf() {
  if (!ge || !window.IntersectionObserver) return
  let e
  if ((e = navigator.connection) && (e.saveData || /2g/.test(e.effectiveType))) return
  const t = window.requestIdleCallback || setTimeout
  let n = null
  const s = () => {
    n && n.disconnect(),
      (n = new IntersectionObserver((i) => {
        i.forEach((o) => {
          if (o.isIntersecting) {
            const l = o.target
            n.unobserve(l)
            const { pathname: c } = l
            if (!Ss.has(c)) {
              Ss.add(c)
              const f = af(c)
              f && bf(f)
            }
          }
        })
      })),
      t(() => {
        document.querySelectorAll('#app a').forEach((i) => {
          const { hostname: o, pathname: l } = new URL(i.href instanceof SVGAnimatedString ? i.href.animVal : i.href, i.baseURI),
            c = l.match(/\.\w+$/)
          ;(c && c[0] !== '.html') || (i.target !== '_blank' && o === location.hostname && (l !== location.pathname ? n.observe(i) : Ss.add(l)))
        })
      })
  }
  Nt(s)
  const r = Po()
  Le(() => r.path, s),
    Gn(() => {
      n && n.disconnect()
    })
}
export {
  Cf as $,
  ff as A,
  xf as B,
  wf as C,
  Pe as D,
  Uf as E,
  Se as F,
  he as G,
  Sf as H,
  Ao as I,
  Po as J,
  Oc as K,
  bt as L,
  Vf as M,
  ks as N,
  Df as O,
  sn as P,
  $f as Q,
  ge as R,
  Wn as S,
  If as T,
  jf as U,
  cc as V,
  Ef as W,
  Ff as X,
  Di as Y,
  Nf as Z,
  Kf as _,
  po as a,
  Fs as a0,
  Yf as a1,
  uf as a2,
  kf as a3,
  of as a4,
  Bf as a5,
  qf as a6,
  wt as a7,
  Wf as a8,
  af as a9,
  Hf as aa,
  Jf as ab,
  Xf as ac,
  Gf as ad,
  _f as ae,
  Lf as af,
  Pf as ag,
  Of as ah,
  Ls as b,
  Rf as c,
  Ni as d,
  Mf as e,
  rf as f,
  zr as g,
  ie as h,
  za as i,
  ho as j,
  Ys as k,
  Ja as l,
  xo as m,
  Us as n,
  Ps as o,
  mt as p,
  Le as q,
  Tf as r,
  ro as s,
  Jo as t,
  lf as u,
  Nt as v,
  Nl as w,
  Gn as x,
  Af as y,
  Xl as z
}
