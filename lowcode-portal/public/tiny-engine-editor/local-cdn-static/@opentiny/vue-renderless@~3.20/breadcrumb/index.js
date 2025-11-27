import "../chunk-G2ADBYYC.js";
const breadcrumbItemSelect = ({
  api,
  emit,
  state,
  constants
}) => {
  state.breadcrumbEmitter.on(constants.EVENT_NAME.breadcrumbItemSelect, (value) => {
    state.currentBreadcrumbItem = value;
    emit("select", value);
  });
};
export {
  breadcrumbItemSelect
};
