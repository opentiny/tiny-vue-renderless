import "../chunk-G2ADBYYC.js";
import { hide, watchVisible, selectOption, confirm, searchMethod, searchSelectHandler, searchBoxToggle, watchModelValue, includeOptionIndex, isSelected, allCheckHandler, watchPropsOption, setSelected } from './index.js';
const api = ["state", "hide", "selectOption", "confirm", "searchMethod", "searchSelectHandler", "searchBoxToggle", "includeOptionIndex", "isSelected", "allCheckHandler"];
const renderless = (props, {
  computed,
  reactive,
  watch
}, {
  emit
}) => {
  const api2 = {};
  const state = reactive({
    toggle: false,
    checkList: [],
    search: {
      show: false,
      input: "",
      options: [],
      filterOptions: []
    },
    checkIds: computed(() => state.checkList.map(option => option[props.valueField])),
    selectedLabel: ""
  });
  Object.assign(api2, {
    state,
    confirm: confirm({
      state,
      emit,
      props,
      api: api2
    }),
    selectOption: selectOption({
      state,
      emit,
      props,
      api: api2
    }),
    hide: hide({
      state,
      emit
    }),
    watchVisible: watchVisible({
      emit,
      state,
      props,
      api: api2
    }),
    watchModelValue: watchModelValue({
      api: api2
    }),
    searchMethod: searchMethod({
      state,
      props,
      api: api2
    }),
    searchSelectHandler: searchSelectHandler({
      state,
      emit,
      api: api2,
      props
    }),
    searchBoxToggle: searchBoxToggle({
      state,
      props,
      api: api2
    }),
    allCheckHandler: allCheckHandler({
      state,
      props
    }),
    includeOptionIndex: includeOptionIndex(props),
    isSelected: isSelected({
      state,
      api: api2,
      props
    }),
    watchPropsOption: watchPropsOption({
      api: api2
    }),
    setSelected: setSelected({
      props,
      state,
      emit
    })
  });
  watch(() => props.visible, api2.watchVisible);
  watch(() => props.modelValue, api2.watchModelValue);
  watch(() => props.menus, api2.watchPropsOption, {
    immediate: true,
    deep: true
  });
  return api2;
};
export { api, renderless };