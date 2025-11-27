import "../chunk-G2ADBYYC.js";
import { isNumber } from './../common/type.js';
const computedShowHeader = ({
  constants,
  props
}) => () => props.pattern !== constants.SIMPLE;
const computedShowFooter = ({
  constants,
  props
}) => () => props.pattern === constants.LEGEND || props.pattern === constants.CLASSIC;
const computedShowAside = ({
  constants,
  props
}) => () => props.pattern !== constants.CLASSIC;
const transferWidthOrHeight = value => isNumber(value) ? value + "px" : value;
const computedHeaderStyle = ({
  constants,
  props
}) => () => {
  if (props.pattern === constants.FASHION) {
    return {
      height: transferWidthOrHeight(props.headerHeight),
      left: transferWidthOrHeight(props.asideWidth)
    };
  }
  return {
    height: transferWidthOrHeight(props.headerHeight)
  };
};
const computedAsideStyle = ({
  constants,
  props
}) => () => {
  if (props.pattern === constants.SIMPLE || props.pattern === constants.FASHION) {
    return {
      top: transferWidthOrHeight(0),
      width: transferWidthOrHeight(props.asideWidth)
    };
  }
  return {
    width: transferWidthOrHeight(props.asideWidth),
    top: transferWidthOrHeight(props.headerHeight)
  };
};
const computedMainStyle = ({
  constants,
  props
}) => () => {
  if (props.pattern === constants.DEFAULT || props.pattern === constants.FASHION) {
    return {
      top: transferWidthOrHeight(props.headerHeight),
      left: transferWidthOrHeight(props.asideWidth),
      bottom: transferWidthOrHeight(0)
    };
  }
  if (props.pattern === constants.LEGEND) {
    return {
      top: transferWidthOrHeight(props.headerHeight),
      left: transferWidthOrHeight(props.asideWidth),
      bottom: transferWidthOrHeight(props.footerHeight)
    };
  }
  if (props.pattern === constants.SIMPLE) {
    return {
      top: transferWidthOrHeight(0),
      left: transferWidthOrHeight(props.asideWidth),
      bottom: transferWidthOrHeight(0)
    };
  }
  if (props.pattern === constants.CLASSIC) {
    return {
      top: transferWidthOrHeight(props.headerHeight),
      left: transferWidthOrHeight(0),
      bottom: transferWidthOrHeight(props.footerHeight)
    };
  }
};
const computedFooterStyle = ({
  constants,
  props
}) => () => {
  if (props.pattern === constants.CLASSIC) {
    return {
      height: transferWidthOrHeight(props.footerHeight),
      left: transferWidthOrHeight(0)
    };
  } else if (props.pattern === constants.LEGEND) {
    return {
      height: transferWidthOrHeight(props.footerHeight),
      left: transferWidthOrHeight(props.asideWidth)
    };
  }
  return {
    height: transferWidthOrHeight(props.footerHeight)
  };
};
const computedLeftStyle = ({
  constants,
  props
}) => () => {
  return {
    width: transferWidthOrHeight(props.leftWidth)
  };
};
const computedShowRight = ({
  constants,
  props
}) => () => {
  return props.pattern === constants.DEFAULT ? false : true;
};
const computedRightStyle = ({
  constants,
  props
}) => () => {
  return {
    width: transferWidthOrHeight(props.rightWidth)
  };
};
export { computedAsideStyle, computedFooterStyle, computedHeaderStyle, computedLeftStyle, computedMainStyle, computedRightStyle, computedShowAside, computedShowFooter, computedShowHeader, computedShowRight };