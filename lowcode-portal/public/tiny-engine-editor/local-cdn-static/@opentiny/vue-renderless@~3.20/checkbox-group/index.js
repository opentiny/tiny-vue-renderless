import "../chunk-G2ADBYYC.js";
const computedFormItemSize = (props) => () => (props.formItem || {}).formItemSize;
const computedCheckboxGroupSize = ({ props, formItemSize }) => () => props.size || formItemSize.value;
export {
  computedCheckboxGroupSize,
  computedFormItemSize
};
