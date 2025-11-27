import { __spreadValues } from "../chunk-G2ADBYYC.js";
import { getTextStyle, handelKey, resetCurrentValue, setCurrentValue, selectValue, showDecimalIcon, getIconStyle, computedText, computedDecimalStyle, computedClasses, computedColorMap, computedClassMap, computedVoidClass, computedActiveColor, computedActiveClass } from './index.js';
import { on, off } from './../common/deps/dom.js';
const api = ["state", "showDecimalIcon", "getIconStyle", "getTextStyle", "selectValue", "handelKey", "setCurrentValue", "resetCurrentValue"];
const useChangeValue = ({
  constants,
  emit,
  props,
  reactive,
  toRefs,
  watch,
  onMounted,
  onUnmounted,
  parent,
  inject
}) => {
  parent.tinyForm = parent.tinyForm || inject("form", null);
  const state = reactive({
    hoverIndex: -1,
    currentValue: props.modelValue
  });
  const api2 = {
    selectValue: selectValue({
      emit,
      props,
      state
    }),
    resetCurrentValue: resetCurrentValue({
      props,
      state
    })
  };
  api2.setCurrentValue = setCurrentValue({
    constants,
    props,
    state,
    parent,
    api: api2
  });
  watch(() => props.modelValue, value => {
    state.currentValue = value;
  }, {
    immediate: true
  });
  const updateMousePostion = event => {
    state.mouseTarget = event.target;
  };
  onMounted(() => {
    on(document, "mousemove", updateMousePostion);
    on(document, "mouseleave", api2.resetCurrentValue);
  });
  onUnmounted(() => {
    off(document, "mousemove", updateMousePostion);
    off(document, "mouseleave", api2.resetCurrentValue);
    state.mouseTarget = null;
  });
  return {
    api: api2,
    state: toRefs(state)
  };
};
const renderless = (props, {
  computed,
  reactive,
  toRefs,
  watch,
  onMounted,
  onUnmounted,
  inject
}, {
  constants,
  emit,
  parent
}) => {
  const api2 = {};
  const changeValue = useChangeValue({
    constants,
    emit,
    props,
    reactive,
    toRefs,
    watch,
    onMounted,
    onUnmounted,
    parent,
    inject
  });
  const state = reactive(__spreadValues({
    pointerAtLeftHalf: true,
    colorMap: computed(() => api2.computedColorMap(props)),
    classMap: computed(() => api2.computedClassMap(props)),
    text: computed(() => api2.computedText({
      props,
      state
    })),
    activeClass: computed(() => api2.computedActiveClass(state)),
    activeColor: computed(() => api2.computedActiveColor(state)),
    classes: computed(() => api2.computedClasses({
      props,
      state
    })),
    decimalIconClass: computed(() => api2.computedActiveClass(state)),
    voidClass: computed(() => api2.computedVoidClass({
      props,
      state
    })),
    decimalStyle: computed(() => api2.computedDecimalStyle({
      props,
      state
    }))
  }, changeValue.state));
  Object.assign(api2, __spreadValues({
    state,
    computedText,
    computedClasses,
    computedClassMap,
    computedColorMap,
    computedVoidClass,
    computedDecimalStyle,
    getTextStyle: getTextStyle({
      props,
      state
    }),
    handelKey: handelKey({
      emit,
      props,
      state
    }),
    computedActiveColor: computedActiveColor(props),
    computedActiveClass: computedActiveClass(props),
    showDecimalIcon: showDecimalIcon({
      props,
      state
    }),
    getIconStyle: getIconStyle({
      api: api2,
      props,
      state
    })
  }, changeValue.api));
  return api2;
};
export { api, renderless, useChangeValue };