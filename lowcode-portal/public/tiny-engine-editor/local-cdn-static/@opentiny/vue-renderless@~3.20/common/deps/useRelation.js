import "../../chunk-G2ADBYYC.js";
import { noop } from './../function.js';
import { onMountedOrActivated as createHook } from './useEventListener.js';
const useRelation = ({
  computed,
  getCurrentInstance,
  inject,
  markRaw,
  nextTick,
  onMounted,
  onActivated,
  onUnmounted,
  provide,
  reactive,
  toRef
}) => ({
  relationKey,
  relationContainer,
  onChange,
  childrenKey,
  delivery
} = {}) => {
  if (!relationKey) {
    throw new Error("[TINY Error]<relationKey> must exist.");
  }
  const instance = getCurrentInstance();
  const state = reactive({
    children: [],
    indexInParent: -1
  });
  const injectValue = inject(relationKey, null);
  let callbacks = [];
  if (injectValue) {
    const {
      link: link2,
      unlink: unlink2,
      callbacks: injectCbs,
      childrenKey: injectKey,
      delivery: injectDelivery
    } = injectValue;
    callbacks = injectCbs;
    childrenKey = childrenKey || injectKey || "instanceChildren";
    delivery = injectDelivery;
    state.indexInParent = link2(instance);
    onUnmounted(() => unlink2(instance));
  } else {
    childrenKey = childrenKey || "instanceChildren";
    const onMountedOrActivated = createHook({
      onMounted,
      onActivated,
      nextTick
    });
    const changeHandler = onChange ? () => nextTick(onChange) : noop;
    let relationMO;
    nextTick(() => {
      const targetNode = typeof relationContainer === "function" ? relationContainer() : relationContainer;
      if (targetNode) {
        relationMO = new MutationObserver((mutationList, observer) => {
          const flattenNodes = [];
          flattenChildNodes(targetNode.childNodes, flattenNodes);
          callbacks.forEach(callback => callback(flattenNodes, mutationList, observer));
          changeHandler();
        });
        relationMO.observe(targetNode, {
          attributes: true,
          childList: true,
          subtree: true
        });
      }
    });
    onMountedOrActivated(() => changeHandler());
    onUnmounted(() => {
      if (relationMO) {
        relationMO.disconnect();
        relationMO = null;
      }
      callbacks = null;
    });
  }
  const link = child => {
    const childPublic = child.proxy;
    state.children.push(markRaw(childPublic));
    return computed(() => state.children.indexOf(childPublic));
  };
  const unlink = child => {
    const index = state.children.indexOf(child.proxy);
    if (index > -1) {
      state.children.splice(index, 1);
    }
  };
  callbacks.push(flattenNodes => sortPublicInstances(state.children, flattenNodes));
  provide(relationKey, {
    link,
    unlink,
    callbacks,
    childrenKey,
    delivery
  });
  Object.defineProperty(instance.proxy, childrenKey, {
    configurable: true,
    get: () => state.children
  });
  onUnmounted(() => delete instance.proxy[childrenKey]);
  return {
    children: toRef(state, "children"),
    index: toRef(state, "indexInParent"),
    delivery
  };
};
const flattenChildNodes = (childNodes, result) => {
  if (childNodes.length) {
    childNodes.forEach(childNode => {
      result.push(childNode);
      if (childNode.childNodes) {
        flattenChildNodes(childNode.childNodes, result);
      }
    });
  }
};
const sortPublicInstances = (instances, flattenNodes) => {
  instances.sort((a, b) => flattenNodes.indexOf(a.$el) - flattenNodes.indexOf(b.$el));
};
export { useRelation };