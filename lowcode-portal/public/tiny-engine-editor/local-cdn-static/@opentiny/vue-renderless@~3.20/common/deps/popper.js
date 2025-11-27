import { __spreadValues } from "../../chunk-G2ADBYYC.js";
import { on, off, isDisplayNone, isServer } from './dom.js';
import PopupManager from './popup-manager.js';
import globalConfig from './../global.js';
import { typeOf } from './../type.js';
const positions = ["left", "right", "top", "bottom"];
const modifiers = ["shift", "offset", "preventOverflow", "keepTogether", "arrow", "flip", "applyStyle"];
const DEFAULTS = {
  arrowOffset: 0,
  arrowElement: "[x-arrow]",
  boundariesElement: "viewport",
  boundariesPadding: 5,
  flipBehavior: "flip",
  // 全局没有修改过它，所以它一直是flip
  forceAbsolute: false,
  gpuAcceleration: true,
  offset: 0,
  placement: "bottom",
  preventOverflowOrder: positions,
  modifiers,
  // 此处是string数组， 构造函数调用之后转为函数数组
  updateHiddenPopperOnScroll: false
  // 滚动过程中是否更新隐藏的弹出层位置
};
const setStyle = (el, styles) => {
  const isNumeric = n => n !== "" && !isNaN(parseFloat(n)) && isFinite(n);
  Object.keys(styles).forEach(prop => {
    let unit = "";
    if (~["width", "height", "top", "right", "bottom", "left"].indexOf(prop) && isNumeric(styles[prop])) {
      unit = "px";
    }
    el.style[prop] = styles[prop] + unit;
  });
};
const getOffsetParent = el => {
  let offsetParent = el.offsetParent;
  return offsetParent === window.document.body || !offsetParent ? window.document.documentElement : offsetParent;
};
const getStyleComputedProperty = (el, property) => {
  if (!el || el.nodeType !== 1) {
    return;
  }
  let css = window.getComputedStyle(el, null);
  return css[property];
};
const isFixed = el => {
  if (el === window.document.body) {
    return false;
  }
  if (getStyleComputedProperty(el, "position") === "fixed") {
    return true;
  }
  return el.parentNode ? isFixed(el.parentNode) : false;
};
const getBoundingClientRect = el => {
  let rect = el.getBoundingClientRect();
  return {
    left: rect.left,
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    width: rect.right - rect.left,
    height: rect.bottom - rect.top
  };
};
const isScrollElement = el => {
  const scrollTypes = ["scroll", "auto"];
  return scrollTypes.includes(getStyleComputedProperty(el, "overflow")) || scrollTypes.includes(getStyleComputedProperty(el, "overflow-x")) || scrollTypes.includes(getStyleComputedProperty(el, "overflow-y"));
};
const getAdjustOffset = parent => {
  const placeholder = document.createElement("div");
  setStyle(placeholder, {
    opacity: 0,
    position: "fixed",
    width: 1,
    height: 1,
    top: 0,
    left: 0,
    "z-index": "-99"
  });
  parent.appendChild(placeholder);
  const result = getBoundingClientRect(placeholder);
  parent.removeChild(placeholder);
  return result;
};
const getScrollParent = el => {
  let parent = el.parentNode;
  if (!parent) {
    return el;
  }
  if (parent === window.document) {
    if (window.document.body.scrollTop || window.document.body.scrollLeft) {
      return window.document.body;
    }
    return window.document.documentElement;
  }
  if (isScrollElement(parent)) {
    return parent;
  }
  return getScrollParent(parent);
};
const getOffsetRectRelativeToCustomParent = (el, parent, fixed, popper) => {
  let {
    top,
    left,
    width,
    height
  } = getBoundingClientRect(el);
  if (fixed) {
    if (popper.parentElement) {
      const {
        top: adjustTop,
        left: adjustLeft
      } = getAdjustOffset(popper.parentElement);
      top -= adjustTop;
      left -= adjustLeft;
    }
    return {
      top,
      left,
      bottom: top + height,
      right: left + width,
      width,
      height
    };
  }
  let parentRect = getBoundingClientRect(parent);
  let rect = {
    top: top - parentRect.top,
    left: left - parentRect.left,
    bottom: top - parentRect.top + height,
    right: left - parentRect.left + width,
    width,
    height
  };
  return rect;
};
const getScrollTopValue = el => el === document.body ? Math.max(document.documentElement.scrollTop, document.body.scrollTop) : el.scrollTop;
const getScrollLeftValue = el => el === document.body ? Math.max(document.documentElement.scrollLeft, document.body.scrollLeft) : el.scrollLeft;
const getMaxWH = (body, html) => {
  const height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
  const width = Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth);
  return {
    width,
    height
  };
};
const getOuterSizes = el => {
  let _display = el.style.display;
  let _visibility = el.style.visibility;
  el.style.display = "block";
  el.style.visibility = "hidden";
  let styles = window.getComputedStyle(el);
  let x = parseFloat(styles.marginTop) + parseFloat(styles.marginBottom);
  let y = parseFloat(styles.marginLeft) + parseFloat(styles.marginRight);
  let result = {
    width: el.offsetWidth + y,
    height: el.offsetHeight + x
  };
  el.style.display = _display;
  el.style.visibility = _visibility;
  return result;
};
const getOppositePlacement = placement => {
  let hash = {
    left: "right",
    right: "left",
    bottom: "top",
    top: "bottom"
  };
  return placement.replace(/left|right|bottom|top/g, matched => hash[matched]);
};
const getPopperClientRect = popperOffsets => {
  let offsets = __spreadValues({}, popperOffsets);
  offsets.right = offsets.left + offsets.width;
  offsets.bottom = offsets.top + offsets.height;
  return offsets;
};
const getAllScrollParents = (el, parents = []) => {
  const parent = el.parentNode;
  if (parent) {
    isScrollElement(parent) && parents.push(parent);
    if (getStyleComputedProperty(parent, "position") === "fixed") {
      return parents;
    }
    return getAllScrollParents(parent, parents);
  }
  return parents;
};
const getOffsetRect = el => {
  const elementRect = {
    width: el.offsetWidth,
    height: el.offsetHeight,
    left: el.offsetLeft,
    top: el.offsetTop,
    right: 0,
    bottom: 0
  };
  elementRect.right = elementRect.left + elementRect.width;
  elementRect.bottom = elementRect.top + elementRect.height;
  return elementRect;
};
const stopFn = ev => {
  ev.stopPropagation();
};
let resizeOb;
if (!isServer) {
  resizeOb = new ResizeObserver(entries => {
    entries.forEach(entry => {
      if (entry.target.popperVm && entry.contentRect.height > 50) {
        entry.target.popperVm.update();
      }
    });
  });
}
class Popper {
  constructor(reference, popper, options) {
    this.modifiers = {};
    /** 每次update, 计算popper的大小并缓存 */
    this.popperOuterSize = null;
    this._reference = reference;
    this._popper = popper;
    this.state = {};
    this._options = __spreadValues(__spreadValues({}, DEFAULTS), options);
    this._options.modifierFns = modifiers.map(modifier => {
      return this[modifier];
    });
    this._popper.setAttribute("x-placement", this._options.placement);
    this.state.position = this._getPopperPositionByRefernce(this._reference);
    setStyle(this._popper, {
      position: this.state.position,
      top: 0
    });
    if (this._popper) {
      this._popper.popperVm = this;
      resizeOb && resizeOb.observe(this._popper);
    }
    this.update();
    this._setupEventListeners();
  }
  destroy() {
    this._popper.removeAttribute("x-placement");
    this._popper.style.display = "none";
    this._removeEventListeners();
    this._options.removeOnDestroy && this._popper.remove();
    return this;
  }
  onUpdate(callback) {
    this.state.updateCallback = callback;
    return this;
  }
  update() {
    let data = {
      instance: this,
      styles: {}
    };
    this.stopEventBubble();
    this.popperOuterSize = null;
    data.placement = data._originalPlacement = this._options.placement;
    data.offsets = this._getRefPopOffsets(this._popper, this._reference, data.placement);
    data.boundaries = this._getBoundaries(data, this._options.boundariesPadding, this._options.boundariesElement);
    data = this.runModifiers(data, this._options.modifierFns);
    typeof this.state.updateCallback === "function" && this.state.updateCallback(data);
  }
  // 阻止popper的mousewheel等事件冒泡。 通过 onxxx 绑定，是为了避免重复绑定事件
  stopEventBubble() {
    if (!this._popper) return;
    if (!this._popper.onmousewheel) this._popper.onmousewheel = stopFn;
    if (!this._popper.onwheel) this._popper.onwheel = stopFn;
  }
  /** 按顺序执行Modifiers， 如果传入终点modifier,则执行到指定位置 */
  runModifiers(data, modifiers2, ends) {
    let modifiersToRun = modifiers2.slice();
    const _options = this._options;
    if (ends !== void 0) {
      modifiersToRun = this._options.modifierFns.slice(0, _options.modifierFns.findIndex(m => m === ends));
    }
    modifiersToRun.forEach(modifier => {
      if (typeOf(modifier) === "function") {
        data = modifier.call(this, data);
      }
    });
    return data;
  }
  // 此时才把offsets.popper 赋值给popper dom,  offsets.array赋值给array dom
  applyStyle(data) {
    let styles = {
      position: data.offsets.popper.position
    };
    let left = Math.round(data.offsets.popper.left);
    let top = Math.round(data.offsets.popper.top);
    if (this._options.gpuAcceleration) {
      styles.transform = `translate3d(${left}px, ${top}px, 0)`;
      Object.assign(styles, {
        top: 0,
        left: 0
      });
    } else {
      Object.assign(styles, {
        top,
        left
      });
    }
    Object.assign(styles, data.styles);
    setStyle(this._popper, styles);
    this._popper.setAttribute("x-placement", data.placement);
    if (data.offsets.arrow) {
      setStyle(data.arrowElement, data.offsets.arrow);
    }
    return data;
  }
  // 判断 placement是不是2段式的，是则处理一下偏移。 修改data.offsets.popper的值
  shift(data) {
    let placement = data.placement;
    let basePlacement = placement.split("-")[0];
    let shiftVariation = placement.split("-")[1];
    if (shiftVariation) {
      let {
        top,
        left,
        height,
        width
      } = data.offsets.reference;
      let popper = getPopperClientRect(data.offsets.popper);
      let shiftOffsets = {
        y: {
          start: {
            top
          },
          end: {
            top: top + height - popper.height
          }
        },
        x: {
          start: {
            left
          },
          end: {
            left: left + width - popper.width
          }
        }
      };
      let axis = ~["bottom", "top"].indexOf(basePlacement) ? "x" : "y";
      data.offsets.popper = Object.assign(popper, shiftOffsets[axis][shiftVariation]);
    }
    return data;
  }
  // 校正popper的位置在boundaries 的内部
  preventOverflow(data) {
    if (this._options.ignoreBoundaries) {
      return data;
    }
    let order = this._options.preventOverflowOrder;
    let popper = getPopperClientRect(data.offsets.popper);
    let check = {
      top: () => {
        let {
          top
        } = popper;
        if (top < data.boundaries.top) {
          top = Math.max(top, data.boundaries.top);
        }
        return {
          top
        };
      },
      right: () => {
        let {
          left
        } = popper;
        if (popper.right > data.boundaries.right) {
          left = Math.min(left, data.boundaries.right - popper.width);
        }
        return {
          left
        };
      },
      bottom: () => {
        let {
          top
        } = popper;
        if (popper.bottom > data.boundaries.bottom) {
          top = Math.min(top, data.boundaries.bottom - popper.height);
        }
        return {
          top
        };
      },
      left: () => {
        let {
          left
        } = popper;
        if (popper.left < data.boundaries.left) {
          left = Math.max(left, data.boundaries.left);
        }
        return {
          left
        };
      }
    };
    order.forEach(direction => {
      data.offsets.popper = Object.assign(popper, check[direction]());
    });
    return data;
  }
  // 校正popper的位置在reference的边上。 如果2个分离了，重新调整popper的位置。 可能是担心 modifiers.offset 带来的副作用吧
  keepTogether(data) {
    let popper = getPopperClientRect(data.offsets.popper);
    let reference = data.offsets.reference;
    if (popper.right < Math.floor(reference.left)) {
      data.offsets.popper.left = Math.floor(reference.left) - popper.width;
    }
    if (popper.left > Math.floor(reference.right)) {
      data.offsets.popper.left = Math.floor(reference.right);
    }
    if (popper.bottom < Math.floor(reference.top)) {
      data.offsets.popper.top = Math.floor(reference.top) - popper.height;
    }
    if (popper.top > Math.floor(reference.bottom)) {
      data.offsets.popper.top = Math.floor(reference.bottom);
    }
    return data;
  }
  // 根据flip的策略，计算当前应该显示的位置。 空间不够要计算出flip的位置。 可能是担心preventOverflow 时，造成pop, reference会重叠。 重叠了就要flip一下
  flip(data) {
    if (data.flipped && data.placement === data._originalPlacement) {
      return data;
    }
    const placements = data.placement.split("-");
    let placement = placements[0];
    let placementOpposite = getOppositePlacement(placement);
    let variation = placements[1] || "";
    let flipOrderArr = [placement, placementOpposite];
    flipOrderArr.forEach((step, index) => {
      if (placement !== step || flipOrderArr.length === index + 1) {
        return;
      }
      placement = data.placement.split("-")[0];
      placementOpposite = getOppositePlacement(placement);
      let popperOffsets = getPopperClientRect(data.offsets.popper);
      let a = ~["right", "bottom"].indexOf(placement);
      let p = Math.floor(data.offsets.reference[placement]);
      let po = Math.floor(popperOffsets[placementOpposite]);
      if (a && p > po || !a && p < po) {
        data.flipped = true;
        data.placement = flipOrderArr[index + 1];
        if (variation) {
          data.placement += `-${variation}`;
        }
        data.offsets.popper = this._getRefPopOffsets(this._popper, this._reference, data.placement).popper;
        data = this.runModifiers(data, this._options.modifierFns, this.flip);
      }
    });
    return data;
  }
  // 根据入参option上的offset, 给data.offset.popper进行校正
  offset(data) {
    let offset = this._options.offset;
    let popper = data.offsets.popper;
    if (~data.placement.indexOf("left")) {
      popper.top -= offset;
    } else if (~data.placement.indexOf("right")) {
      popper.top += offset;
    } else if (~data.placement.indexOf("top")) {
      popper.left -= offset;
    } else if (~data.placement.indexOf("bottom")) {
      popper.left += offset;
    }
    return data;
  }
  // 计算arrow的位置,保存在data.offsets.arrow ={top,left}
  arrow(data) {
    let arrow = this._options.arrowElement;
    let arrowOffset = this._options.arrowOffset;
    if (typeof arrow === "string") {
      arrow = this._popper.querySelector(arrow);
    }
    if (!arrow || !this._popper.contains(arrow)) {
      return data;
    }
    let arrowStyle = {};
    let placement = data.placement.split("-")[0];
    let popper = getPopperClientRect(data.offsets.popper);
    let reference = data.offsets.reference;
    let isVertical = ~["left", "right"].indexOf(placement);
    let calcProp = isVertical ? "height" : "width";
    let opSide = isVertical ? "bottom" : "right";
    let altSide = isVertical ? "left" : "top";
    let side = isVertical ? "top" : "left";
    let popperRect = this.popperOuterSize ? this.popperOuterSize : this.popperOuterSize = getOuterSizes(this._popper);
    let arrowRect = getOuterSizes(arrow);
    let arrowSize = arrowRect[calcProp];
    if (reference[opSide] - arrowSize < popper[side]) {
      data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowSize);
    }
    if (reference[side] + arrowSize > popper[opSide]) {
      data.offsets.popper[side] += reference[side] + arrowSize - popper[opSide];
    }
    let center = reference[side] + (arrowOffset || reference[calcProp] / 2 - arrowSize / 2);
    let sideValue = center - popper[side];
    sideValue = Math.max(Math.min(popper[calcProp] - arrowSize - 8, sideValue), 8);
    arrowStyle[side] = sideValue;
    arrowStyle[altSide] = "";
    const params = this._options.placement.split("-");
    if (this._options.adjustArrow && ~["top", "bottom"].indexOf(params[0]) && side === "left") {
      if (params[1] === "start") {
        arrowStyle.left = 8;
      } else if (!params[1]) {
        arrowStyle.left = (popperRect.width - arrowRect.width) / 2;
      }
    }
    data.offsets.arrow = arrowStyle;
    data.arrowElement = arrow;
    return data;
  }
  /** 判断 reference 的 offsetParent 元素是fix还是abs, 这个值会赋值给popper 的dom */
  _getPopperPositionByRefernce(reference) {
    if (this._options.forceAbsolute) {
      return "absolute";
    }
    let isParentFixed = isFixed(reference);
    return isParentFixed ? "fixed" : "absolute";
  }
  /** 实时计算一下popper, reference的 位置信息， 用于 */
  _getRefPopOffsets(popper, reference, placement) {
    placement = placement.split("-")[0];
    let popperOffsets = {
      position: this.state.position
    };
    let isParentFixed = popperOffsets.position === "fixed";
    let referenceOffsets = getOffsetRectRelativeToCustomParent(reference, getOffsetParent(popper), isParentFixed, popper);
    const {
      width,
      height
    } = this.popperOuterSize ? this.popperOuterSize : this.popperOuterSize = getOuterSizes(popper);
    if (~["right", "left"].indexOf(placement)) {
      popperOffsets.top = referenceOffsets.top + referenceOffsets.height / 2 - height / 2;
      if (placement === "left") {
        popperOffsets.left = referenceOffsets.left - width;
      } else {
        popperOffsets.left = referenceOffsets.right;
      }
    } else {
      popperOffsets.left = referenceOffsets.left + referenceOffsets.width / 2 - width / 2;
      if (placement === "top") {
        popperOffsets.top = referenceOffsets.top - height;
      } else {
        popperOffsets.top = referenceOffsets.bottom;
      }
    }
    popperOffsets.width = width;
    popperOffsets.height = height;
    return {
      popper: popperOffsets,
      reference: referenceOffsets
    };
  }
  _setupEventListeners() {
    var _a, _b;
    this.state.updateBoundFn = this.update.bind(this);
    this.state.scrollUpdate = () => {
      if (this._options.updateHiddenPopperOnScroll) {
        this.state.updateBoundFn();
      } else {
        if (isDisplayNone(this._reference)) return;
        this.state.updateBoundFn();
      }
    };
    on(window, "resize", this.state.updateBoundFn);
    if (this._options.boundariesElement !== "window") {
      let target = this._options.scrollParent || getScrollParent(this._reference);
      const customTargets = [];
      if ((_b = (_a = target == null ? void 0 : target.dataset) == null ? void 0 : _a.tag) == null ? void 0 : _b.includes("-form")) {
        customTargets.push(target);
        let realTarget = getScrollParent(target);
        if (realTarget === window.document.body || realTarget === window.document.documentElement) {
          realTarget = window;
        }
        customTargets.push(realTarget);
      }
      if (target === window.document.body || target === window.document.documentElement) {
        target = window;
      }
      this.state.scrollTarget = target;
      if (this._options.bubbling || PopupManager.globalScroll) {
        let targets = getAllScrollParents(this._reference);
        this.state.scrollTargets = targets || [];
        targets.forEach(target2 => {
          on(target2, "scroll", this.state.scrollUpdate);
        });
      } else {
        if (customTargets.length) {
          this.state.scrollTargets = customTargets;
          customTargets.forEach(target2 => {
            on(target2, "scroll", this.state.scrollUpdate);
          });
        } else {
          on(target, "scroll", this.state.scrollUpdate);
        }
      }
    }
  }
  _removeEventListeners() {
    off(window, "resize", this.state.updateBoundFn);
    if (this._options.boundariesElement !== "window" && this.state.scrollTarget) {
      off(this.state.scrollTarget, "scroll", this.state.scrollUpdate);
      this.state.scrollTarget = null;
      if (this._options.bubbling || PopupManager.globalScroll) {
        let targets = this.state.scrollTargets || [];
        targets.forEach(target => {
          off(target, "scroll", this.state.scrollUpdate);
        });
        this.state.scrollTargets = null;
      }
    }
    this.state.updateBoundFn = null;
    this.state.scrollUpdate = null;
  }
  /** 实时计算一下Boundary的位置 */
  _getBoundaries(data, padding, boundariesElement) {
    let boundaries = {
      right: 0,
      left: 0,
      top: 0,
      bottom: 0
    };
    if (boundariesElement === "window" || boundariesElement === "body") {
      let body = window.document.body;
      let html = window.document.documentElement;
      let {
        width,
        height
      } = getMaxWH(body, html);
      boundaries = {
        top: 0,
        right: width,
        bottom: height,
        left: 0
      };
    } else if (boundariesElement === "viewport") {
      let offsetParent = getOffsetParent(this._popper);
      let scrollParent = getScrollParent(this._popper);
      let offsetParentRect = getOffsetRect(offsetParent);
      let isFixed2 = data.offsets.popper.position === "fixed";
      const noScroll = isFixed2 || !this._options.appendToBody && ["right", "left"].includes(this._options.placement);
      let scrollTop = noScroll ? 0 : getScrollTopValue(scrollParent);
      let scrollLeft = noScroll ? 0 : getScrollLeftValue(scrollParent);
      const viewportWindow = globalConfig.viewportWindow || PopupManager.viewportWindow || window;
      boundaries = {
        top: 0 - (offsetParentRect.top - scrollTop),
        right: viewportWindow.document.documentElement.clientWidth - (offsetParentRect.left - scrollLeft),
        bottom: viewportWindow.document.documentElement.clientHeight - (offsetParentRect.top - scrollTop),
        left: 0 - (offsetParentRect.left - scrollLeft)
      };
    } else {
      if (getOffsetParent(this._popper) === boundariesElement) {
        const {
          clientWidth,
          clientHeight
        } = boundariesElement;
        boundaries = {
          right: clientWidth,
          bottom: clientHeight,
          top: 0,
          left: 0
        };
      } else {
        boundaries = getOffsetRect(boundariesElement);
      }
    }
    boundaries.right -= padding;
    boundaries.left += padding;
    boundaries.bottom = boundaries.bottom - padding;
    boundaries.top = boundaries.top + padding;
    return boundaries;
  }
}
var popper_default = Popper;
export { popper_default as default, getScrollParent };