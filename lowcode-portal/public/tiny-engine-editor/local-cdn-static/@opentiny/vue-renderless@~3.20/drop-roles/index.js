import "../chunk-G2ADBYYC.js";
const init = ({ state, service, emit }) => () => {
  let promise;
  const { textField, valueField } = service.fields;
  if (state.source) {
    promise = new Promise((resolve) => resolve(state.source));
  } else {
    promise = Promise.all([service.fetchRole(), service.fetchCurrentRole()]).then((result) => {
      const [validRoles, currentRole] = result;
      if (validRoles) {
        state.source = validRoles;
        if (currentRole && currentRole[valueField]) {
          state.selectedValue = currentRole[valueField];
          emit("update:modelValue", state.selectedValue);
        }
      } else {
        state.source = [];
      }
      return state.source;
    });
  }
  promise.then((data) => {
    state.options = data.map((item) => ({
      label: item[textField],
      value: item[valueField]
    }));
    emit("render", state.options, state.selectedValue);
  });
};
const change = (emit) => (value) => {
  emit("update:modelValue", value);
  emit("change", value);
};
const initService = ({ props, service }) => {
  const { setting = {}, fetchRole, fetchCurrentRole } = service || {};
  const { options = {} } = setting;
  const noopFnCreator = (propName) => () => Promise.reject(
    new Error(`[TINY Error][DropRoles] Prop ${propName} is mandatory when the framework service is not used`)
  );
  const defaultDropRolesSetting = {
    textField: "roleName",
    valueField: "roleId"
  };
  return {
    fetchRole: props.fetchRole || fetchRole || noopFnCreator("fetchRole"),
    fetchCurrentRole: props.fetchCurrentRole || fetchCurrentRole || noopFnCreator("fetchCurrentRole"),
    fields: props.fields || options.DropRoles || defaultDropRolesSetting
  };
};
export {
  change,
  init,
  initService
};
