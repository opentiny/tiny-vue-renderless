import "../chunk-G2ADBYYC.js";
const change = (emit) => (value) => {
  emit("update:modelValue", value);
  emit("change", value);
};
const init = ({ state, service }) => () => {
  const { textField, valueField } = service.fields;
  if (state.source) {
    state.options = state.source.map((item) => ({
      label: item[textField],
      value: item[valueField]
    }));
  } else {
    service.fetchCountry().then((data) => {
      state.source = data || [];
      state.options = state.source.map((item) => ({
        value: item[valueField],
        label: item[textField]
      }));
    });
  }
};
const initService = ({ props, service }) => {
  const { fetchCountry, setting = {} } = service || {};
  const { options = {} } = setting;
  const defaultCountrySetting = {
    textField: "territory_short_name",
    valueField: "territory_code"
  };
  const fetchCountryNoop = () => Promise.resolve([]);
  return {
    fetchCountry: props.fetchCountry || fetchCountry || fetchCountryNoop,
    fields: props.fields || options.Country || defaultCountrySetting
  };
};
export {
  change,
  init,
  initService
};
