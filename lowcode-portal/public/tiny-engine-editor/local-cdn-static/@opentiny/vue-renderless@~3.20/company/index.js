import "../chunk-G2ADBYYC.js";
const init = ({ state, props, service }) => () => {
  const { textField, valueField } = service.fields;
  if (state.source) {
    state.options = state.source.map((item) => ({
      label: item[textField],
      value: item[valueField]
    }));
  } else {
    service.fetchCompany().then((data) => {
      const list = data || [];
      state.source = props.max ? list.slice(0, props.max) : list;
      state.options = state.source.map((item) => ({
        label: item[textField],
        value: item[valueField]
      }));
    });
  }
};
const change = (emit) => (value) => {
  emit("update:modelValue", value);
  emit("change", value);
};
const initService = ({ props, service }) => {
  const { setting = {}, fetchCompany } = service || {};
  const { options = {} } = setting;
  const defaultCompanySetting = {
    textField: "tx_corporation_cn",
    valueField: "tx_coa"
  };
  const fetchCompanyNoop = () => Promise.resolve([]);
  return {
    fetchCompany: props.fetchCompany || fetchCompany || fetchCompanyNoop,
    fields: props.fields || options.Company || defaultCompanySetting
  };
};
export {
  change,
  init,
  initService
};
