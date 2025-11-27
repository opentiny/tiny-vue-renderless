import "../chunk-G2ADBYYC.js";
const api = ["state"];
const renderless = (props, { reactive, computed }, { vm }) => {
  const api2 = {};
  const state = reactive({
    size: computed(() => props.size)
  });
  Object.assign(api2, {
    state
  });
  vm.$on("handleChange", (value) => {
    vm.$emit("change", value);
  });
  return api2;
};
export {
  api,
  renderless
};
