import "../../chunk-G2ADBYYC.js";
import { on, off, isServer } from './dom.js';
const onMountedOrActivated = ({
  onMounted,
  onActivated,
  nextTick
}) => hook => {
  let mounted;
  onMounted(() => {
    hook();
    nextTick(() => mounted = true);
  });
  onActivated(() => mounted && hook());
};
const useEventListener = ({
  unref,
  isRef,
  watch,
  nextTick,
  onMounted,
  onUnmounted,
  onActivated,
  onDeactivated
}) => (type, listener, options = {}) => {
  if (isServer) return;
  const {
    target = window,
    passive = false,
    capture = false
  } = options;
  let cleaned = false;
  let attached;
  const add = target2 => {
    if (cleaned) return;
    const element = unref(target2);
    if (element && !attached) {
      on(element, type, listener, {
        capture,
        passive
      });
      attached = true;
    }
  };
  const remove = target2 => {
    if (cleaned) return;
    const element = unref(target2);
    if (element && attached) {
      off(element, type, listener, {
        capture,
        passive
      });
      attached = false;
    }
  };
  onUnmounted(() => remove(target));
  onDeactivated(() => remove(target));
  onMountedOrActivated({
    onMounted,
    onActivated,
    nextTick
  })(() => add(target));
  let stopWatch;
  if (isRef(target)) {
    stopWatch = watch(target, (val, oldVal) => {
      remove(oldVal);
      add(val);
    });
  }
  return () => {
    stopWatch && stopWatch();
    remove(target);
    cleaned = true;
  };
};
export { onMountedOrActivated, useEventListener };