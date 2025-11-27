import "../../chunk-G2ADBYYC.js";
const useInstanceSlots = ({ getCurrentInstance, isVue2, nextTick, onUnmounted }) => () => {
  const publicInstance = getCurrentInstance().proxy;
  if (!isVue2) {
    Object.defineProperty(publicInstance, "$scopedSlots", { configurable: true, value: null });
  }
  Object.defineProperty(publicInstance, "instanceSlots", {
    configurable: true,
    get: () => publicInstance.$scopedSlots || publicInstance.$slots
  });
  onUnmounted(() => {
    nextTick(() => {
      if (!isVue2) {
        delete publicInstance.$scopedSlots;
      }
      delete publicInstance.instanceSlots;
    });
  });
};
export {
  useInstanceSlots
};
