import "../chunk-G2ADBYYC.js";
const handleFocus = ({ state, interval }) => () => {
  setTimeout(() => {
    if (!state.isClick) {
      state.focusing = true;
    } else {
      state.isClick = false;
    }
  }, interval);
};
const handleHeaderClick = ({
  componentName,
  dispatch,
  eventName,
  props,
  parent,
  state
}) => () => {
  if (props.disabled) {
    return;
  }
  dispatch(componentName, eventName, parent);
  state.focusing = false;
  state.isClick = true;
};
const handleHeaderContainerClick = ({ api }) => (e) => {
  if (e.target === e.currentTarget) {
    api.handleHeaderClick();
  }
};
const handleEnterClick = ({
  componentName,
  dispatch,
  eventName,
  parent
}) => () => dispatch(componentName, eventName, parent);
export {
  handleEnterClick,
  handleFocus,
  handleHeaderClick,
  handleHeaderContainerClick
};
