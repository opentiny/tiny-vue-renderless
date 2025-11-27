import "../chunk-G2ADBYYC.js";
const click = ({ props, emit }) => (index) => {
  const i = props.modelValue === index ? void 0 : index;
  emit("update:modelValue", i);
  emit("click", index);
};
export {
  click
};
