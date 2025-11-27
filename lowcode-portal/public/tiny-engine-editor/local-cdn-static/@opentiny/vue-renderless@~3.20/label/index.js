import "../chunk-G2ADBYYC.js";
const prefix = "tiny-mobile-label-";
function numFormat(num, decimal) {
  let str = "";
  str = (Math.round(num * 100) / 100).toFixed(decimal).toString().replace(/(\d)(?=(\d{3})+\.)/g, function($0, $1) {
    return $1 + ",";
  });
  return str;
}
function handleNumberLabel(label, decimal) {
  let val = label;
  const reg1 = /[^(\-|\+)?\d+(\.\d+)?$]/g;
  const reg2 = /0*([1-9]\d*|0\.\d+)/;
  val = val.replace(reg1, "").replace(reg2, "$1");
  let arr = val.split(".");
  let numStr = "";
  for (let i = 0; i < arr.length; i++) {
    if (i === arr.length - 1 && arr.length > 1) {
      numStr += ".";
    }
    numStr += arr[i];
  }
  numStr = numFormat(numStr, decimal);
  numStr = numStr.replace(/\d+/, (s) => {
    return s.replace(/(\d)(?=(\d{3})+$)/g, "$1,");
  });
  return numStr;
}
const handleClick = ({ emit, state }) => () => {
  emit("click", state.label);
};
const computeLabel = (props) => () => {
  let label = props.label;
  if (props.type === "number") {
    label = handleNumberLabel(props.label, props.decimal);
  }
  if (props.limit !== 0 && label.length > props.limit) {
    return label.slice(0, props.limit);
  }
  return label;
};
const computeLabelClass = (props) => () => {
  return [
    `${prefix}${props.size}`,
    `${prefix}${props.color}`,
    `${prefix}${props.position}`,
    props.wholeline || props.ellipsis === 1 || props.ellipsis === 2 || props.ellipsis === 3 ? `${prefix}wholeline` : "",
    props.ellipsis > 0 && props.ellipsis < 4 ? `${prefix}ellipsis${props.ellipsis}` : "",
    props.bold ? `${prefix}bold` : ""
  ];
};
export {
  computeLabel,
  computeLabelClass,
  handleClick
};
