import "../chunk-G2ADBYYC.js";
const emitEvent = (emit, name, ...args) => {
  let cancel = false;
  if (typeof emit === "function" && typeof name === "string") {
    const event = document.createEvent("HTMLEvents");
    event.initEvent(name, false, true);
    event.preventDefault = () => {
      cancel = true;
    };
    args.unshift(event);
    args.unshift(name);
    emit.apply(null, args);
  }
  return !cancel;
};
const getActualTarget = (e) => {
  if (!e || !e.target) {
    return null;
  }
  return e.target.shadowRoot && e.composed ? e.composedPath()[0] || e.target : e.target;
};
const correctTarget = (event, target) => {
  let newTarget;
  if (event.target === null && target) {
    newTarget = target;
  } else {
    const nodeList = event.composedPath();
    if (event.target !== nodeList[0]) {
      newTarget = nodeList[0];
    }
  }
  if (newTarget) {
    Object.defineProperty(event, "target", {
      get() {
        return newTarget;
      },
      enumerable: true,
      configurable: true
    });
  }
};
export {
  correctTarget,
  emitEvent,
  getActualTarget
};
