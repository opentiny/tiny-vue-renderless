import "../chunk-G2ADBYYC.js";
const computedClassName = ({ flex, justify, align }) => {
  const className = [];
  if (flex) {
    className.push("row-flex");
    className.push(`row-justify-${justify}`);
    className.push(`row-align-${align}`);
  }
  return className.join(" ");
};
const computedStyle = (gutter) => {
  const value = gutter ? -(gutter / 2) : 0;
  return value ? { marginLeft: value + "px", marginRight: value + "px" } : {};
};
export {
  computedClassName,
  computedStyle
};
