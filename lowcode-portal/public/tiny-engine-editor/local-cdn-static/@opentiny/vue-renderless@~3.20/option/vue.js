import { __spreadProps, __spreadValues } from "../chunk-G2ADBYYC.js";
import { isEqual, contains, handleGroupDisabled, hoverItem, selectOptionClick, queryChange, toggleEvent, initValue } from './index.js';
const api = ["state", "visible", "hoverItem", "selectOptionClick"];
const initState = ({
  reactive,
  computed,
  props,
  api: api2,
  markRaw,
  select,
  parent
}) => {
  const state = reactive({
    parent: markRaw(parent),
    selectMultiple: computed(() => select.multiple),
    created: computed(() => props.created),
    index: -1,
    hover: computed(() => !select.optimization && select.state.hoverValue === state.index),
    visible: true,
    hitState: false,
    groupDisabled: false,
    disabled: computed(() => props.disabled || state.groupDisabled),
    isObject: computed(() => Object.prototype.toString.call(props.value).toLowerCase() === "[object object]"),
    currentLabel: computed(() => props.label || (state.isObject ? "" : props.value)),
    currentValue: computed(() => props.value || props.label || ""),
    itemSelected: computed(() => {
      if (!select.multiple) {
        return api2.isEqual(props.value, select.state.modelValue);
      } else {
        return api2.contains(select.state.modelValue, props.value);
      }
    }),
    limitReached: computed(() => {
      if (select.multiple) {
        const multipleLimit = select.state.multipleLimit;
        return !state.itemSelected && (select.state.modelValue || []).length >= multipleLimit && multipleLimit > 0;
      } else {
        return false;
      }
    }),
    selectCls: computed(() => {
      return state.itemSelected ? "checked-sur" : "check";
    })
  });
  return state;
};
const initApi = ({
  api: api2,
  props,
  state,
  select,
  constants,
  vm
}) => {
  Object.assign(api2, {
    state,
    isEqual: isEqual({
      select,
      state
    }),
    contains: contains({
      select,
      state
    }),
    hoverItem: hoverItem({
      select,
      props,
      state
    }),
    queryChange: queryChange({
      select,
      props,
      state
    }),
    selectOptionClick: selectOptionClick({
      constants,
      vm,
      props,
      state,
      select
    }),
    handleGroupDisabled: handleGroupDisabled({
      state,
      vm
    }),
    initValue: initValue({
      select,
      props,
      constants,
      vm
    })
  });
};
const initWatch = ({
  watch,
  props,
  state,
  select,
  constants
}) => {
  watch(() => state.currentLabel, () => {
    if (!props.created && !select.remote) {
      select.state.selectEmitter.emit(constants.EVENT_NAME.setSelected);
    }
  });
  watch(() => props.value, (value, oldVal) => {
    const {
      remote,
      valueKey
    } = select;
    if (!props.created && !remote) {
      if (valueKey && typeof value === "object" && typeof oldVal === "object" && value[valueKey] === oldVal[valueKey]) {
        return;
      }
      select.state.selectEmitter.emit(constants.EVENT_NAME.setSelected);
    }
  });
};
const initOnMounted = ({
  onMounted,
  props,
  api: api2,
  vm,
  state,
  constants,
  select
}) => {
  onMounted(() => {
    state.el = vm.$el;
    toggleEvent({
      props,
      vm,
      type: "add"
    });
    if (!select.optimization) {
      select.state.selectEmitter.on(constants.EVENT_NAME.queryChange, api2.queryChange);
    }
    api2.initValue();
  });
};
const initOnBeforeUnmount = ({
  onBeforeUnmount,
  props,
  select,
  vm,
  state
}) => {
  onBeforeUnmount(() => {
    let selectedOptions = select.multiple ? select.state.selected : [select.state.selected];
    const index = select.state.cachedOptions.findIndex(opt => opt.state === state);
    const selectedIndex = selectedOptions.findIndex(opt => opt.state === state);
    toggleEvent({
      props,
      vm,
      type: "remove"
    });
    if (index > -1 && selectedIndex < 0) {
      select.state.cachedOptions.splice(index, 1);
    }
    select.onOptionDestroy(select.state.options.findIndex(opt => opt.state === state));
  });
};
const initSelectState = ({
  state,
  select,
  props,
  toRefs,
  reactive
}) => {
  let vm = reactive(__spreadProps(__spreadValues({}, toRefs(props)), {
    state
  }));
  select.state.options.push(vm);
  select.state.cachedOptions.push(vm);
  select.state.optionsIndex++;
  state.index = select.state.optionsIndex;
  select.state.optionsCount++;
  select.state.filteredOptionsCount++;
};
const renderless = (props, {
  computed,
  onMounted,
  onBeforeUnmount,
  reactive,
  watch,
  inject,
  markRaw,
  toRefs
}, {
  vm,
  parent
}) => {
  const api2 = {};
  const select = inject("select");
  const constants = select._constants;
  const state = initState({
    reactive,
    computed,
    props,
    api: api2,
    markRaw,
    select,
    parent
  });
  initApi({
    api: api2,
    props,
    state,
    select,
    constants,
    vm
  });
  initWatch({
    watch,
    props,
    state,
    select,
    constants
  });
  initOnMounted({
    onMounted,
    props,
    api: api2,
    vm,
    state,
    constants,
    select
  });
  initOnBeforeUnmount({
    onBeforeUnmount,
    props,
    select,
    vm,
    state
  });
  initSelectState({
    state,
    select,
    props,
    toRefs,
    reactive
  });
  parent.$on(constants.EVENT_NAME.handleGroupDisabled, api2.handleGroupDisabled);
  return api2;
};
export { api, renderless };