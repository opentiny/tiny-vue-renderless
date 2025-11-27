import "../chunk-G2ADBYYC.js";
import { created, initValue, handleClick, confirm, reset, wheelChange, clickWheelItem, loadDefault, handleSearchBtnClick, handleOptionSelect, handleClose, toggleItemExpand, computedCurrentOptions, updateValue, handleSearchInput, updateTitle } from './index.js';
const api = ["state", "created", "handleClick", "confirm", "reset", "wheelChange", "clickWheelItem", "loadDefault", "handleSearchBtnClick", "handleClose", "handleSearchInput"];
const initState = ({
  emitter,
  reactive,
  computed,
  api: api2,
  props
}) => {
  const state = reactive({
    dataSource: [],
    wheelData: [],
    isSearching: false,
    headerIndex: -1,
    showOptions: false,
    labelLevelsInfo: [],
    labelsStyle: [],
    wheelIndex: [],
    wheelText: "",
    headerInfo: [],
    defaultSelectedIndexs: [],
    defaultSelectedArray: [],
    multiSelectEmitter: emitter(),
    searchValue: "",
    optionMap: [],
    currentOptions: computed(() => api2.computedCurrentOptions()),
    showMask: computed(() => props.mask && state.showOptions)
  });
  return state;
};
const initApi = ({
  api: api2,
  props,
  state,
  emit,
  nextTick,
  refs,
  vm
}) => {
  Object.assign(api2, {
    state,
    created: created({
      api: api2,
      emit,
      props,
      state,
      refs,
      nextTick
    }),
    initValue: initValue({
      props,
      emit
    }),
    handleClick: handleClick({
      api: api2,
      props,
      state
    }),
    confirm: confirm({
      state,
      emit
    }),
    reset: reset({
      api: api2,
      props,
      state,
      emit
    }),
    wheelChange: wheelChange(state),
    clickWheelItem: clickWheelItem({
      state,
      emit
    }),
    loadDefault: loadDefault({
      props,
      state
    }),
    handleSearchBtnClick: handleSearchBtnClick({
      props,
      state,
      nextTick,
      vm
    }),
    handleOptionSelect: handleOptionSelect({
      api: api2,
      state,
      emit
    }),
    handleClose: handleClose(state),
    toggleItemExpand: toggleItemExpand({
      state
    }),
    computedCurrentOptions: computedCurrentOptions({
      state,
      props
    }),
    updateValue: updateValue({
      state,
      props,
      emit
    }),
    updateTitle: updateTitle({
      props,
      state
    }),
    handleSearchInput: handleSearchInput({
      state,
      emit
    })
  });
};
const initWatch = ({
  api: api2,
  watch,
  props,
  state,
  refs,
  nextTick
}) => {
  watch(() => props.dataSource, () => {
    api2.created({
      props,
      state,
      refs,
      nextTick
    });
  });
  watch(() => props.defaultSelectedArray, () => {
    api2.created({
      props,
      state,
      refs,
      nextTick
    });
  });
  watch(() => props.modelValue, () => {
    api2.updateTitle();
  }, {
    deep: true
  });
};
const renderless = (props, {
  onMounted,
  reactive,
  watch,
  provide,
  computed
}, {
  emit,
  nextTick,
  refs,
  vm,
  emitter
}) => {
  const api2 = {};
  const state = initState({
    emitter,
    reactive,
    computed,
    api: api2,
    props
  });
  provide("multiSelect", vm);
  initApi({
    api: api2,
    props,
    state,
    emit,
    nextTick,
    refs,
    vm
  });
  initWatch({
    api: api2,
    watch,
    props,
    state,
    refs,
    nextTick
  });
  onMounted(() => {
    api2.created({
      props,
      state,
      refs,
      nextTick
    });
  });
  state.multiSelectEmitter.on("multiSelectItemClick", api2.handleOptionSelect);
  state.multiSelectEmitter.on("toggleItemExpand", api2.toggleItemExpand);
  return api2;
};
export { api, renderless };