import "../chunk-G2ADBYYC.js";
import { Color } from './utils/color.js';
const panelRgb = (color, alpha) => {
  const {
    r,
    g,
    b
  } = color.toRgb();
  return alpha ? `rgba(${r},${g},${b},${color.get("alpha") / 100})` : `rgb(${r},${g},${b})`;
};
const updateModelValue = (value, emit) => {
  emit("update:modelValue", value);
};
const triggerCancel = (value, emit) => {
  emit("cancel");
};
const triggerColorUpdate = (value, emit) => {
  emit("color-update", value);
};
const triggerConfirm = (value, emit) => {
  emit("confirm", value);
};
const initApi = (props, state, {
  emit,
  nextTick
}) => {
  const setShowPicker = value => state.showPicker = value;
  const resetColor = () => {
    nextTick(() => {
      if (props.modelValue) {
        state.color.fromString(props.modelValue);
      } else {
        state.color.value = "";
        nextTick(() => {
          state.showPanel = false;
        });
      }
    });
  };
  const submitValue = () => {
    const value = state.color.value;
    updateModelValue(value, emit);
    triggerConfirm(value, emit);
    setShowPicker(false);
    nextTick(() => {
      var _a;
      const newColor = new Color({
        enableAlpha: props.alpha,
        format: (_a = state.currentFormat) != null ? _a : "",
        value: props.modelValue
      });
      if (!state.color.compare(newColor)) {
        resetColor();
      }
    });
  };
  const onConfirm = () => {
    submitValue();
    if (!state.enableHistory) {
      return;
    }
    let index = state.stack.indexOf(state.input);
    if (index === -1) {
      state.stack.push(state.input);
    } else {
      state.stack = [state.input, ...state.stack.filter((c, i) => i !== index)];
    }
  };
  const onCancel = () => {
    resetColor();
    close();
    emit("cancel");
  };
  const clear = () => {
    updateModelValue(null, emit);
    triggerCancel(null, emit);
    resetColor();
  };
  const onClickOutside = () => {
    if (!state.showPicker) {
      return;
    }
    close();
    resetColor();
    emit("cancel");
  };
  const onHueReady = update => {
    state.hue = {
      update
    };
  };
  const onSvReady = update => {
    state.sv = {
      update
    };
  };
  const onAlphaReady = update => {
    state.alpha = {
      update
    };
  };
  const open = () => {
    setShowPicker(true);
  };
  const close = () => {
    setShowPicker(false);
  };
  const onHistoryClick = historyColor => {
    state.color.fromString(historyColor);
  };
  const onPredefineColorClick = predefineColor => {
    state.color.fromString(predefineColor);
  };
  return {
    open,
    close,
    resetColor,
    onConfirm,
    onCancel,
    submitValue,
    clear,
    onHueReady,
    onSvReady,
    onAlphaReady,
    onPredefineColorClick,
    onHistoryClick,
    onClickOutside
  };
};
const initState = (props, {
  reactive,
  ref,
  computed
}) => {
  var _a, _b;
  const stack = ref([...((_a = props.history) != null ? _a : [])]);
  const predefineStack = computed(() => props.predefine);
  const hue = ref();
  const sv = ref();
  const alpha = ref();
  const currentFormat = ref(props.format[0]);
  const color = reactive(new Color({
    enableAlpha: props.alpha,
    format: (_b = currentFormat.value) != null ? _b : "hex",
    value: props.modelValue
  }));
  const input = ref("");
  const showPicker = ref(props.visible);
  const showPanel = ref(false);
  const panelColor = computed(() => {
    if (!props.modelValue && !showPanel.value) {
      return "transparent";
    }
    return panelRgb(color, props.alpha);
  });
  const currentColor = computed(() => !props.modelValue && !showPicker.value ? "" : color.value);
  const state = reactive({
    color,
    input,
    showPicker,
    showPanel,
    panelColor,
    currentColor,
    hue,
    sv,
    alpha,
    stack,
    predefineStack,
    enablePredefineColor: computed(() => props.enablePredefineColor),
    enableHistory: computed(() => props.enableHistory),
    currentFormat,
    formats: props.format
  });
  return state;
};
const initWatch = (state, props, {
  nextTick,
  watch
}, {
  emit
}) => {
  watch(() => state.color, () => {
    emit("color-update", state.color);
  });
  watch(() => props.visible, () => {
    state.showPicker = props.visible;
  });
  watch(() => props.modelValue, () => {
    if (!props.modelValue) {
      state.showPanel = false;
    }
    if (props.modelValue && props.modelValue !== state.color.value) {
      state.color.fromString(props.modelValue);
    }
  });
  watch(() => [state.currentFormat, props.alpha], () => {
    state.color.enableAlpha = props.alpha;
    state.color.format = state.currentFormat || state.color.format;
    state.color.onChange();
    updateModelValue(state.color.value, emit);
  });
  watch(() => state.currentColor, () => {
    state.input = state.currentColor;
    triggerColorUpdate(state.input, emit);
  }, {
    flush: "sync"
  });
  watch(state.color, () => {
    if (!props.modelValue && !state.showPanel) {
      state.showPanel = true;
    }
  });
  watch(() => state.showPicker, () => {
    nextTick(() => {
      if (state.hue) {
        state.hue.update();
      }
      if (state.sv) {
        state.sv.update();
      }
      if (state.alpha) {
        state.alpha.update();
      }
    });
  });
  watch(() => props.history, () => {
    if (!state.enableHistory) {
      return;
    }
    state.stack = props.history;
  }, {
    deep: true
  });
};
export { initApi, initState, initWatch, panelRgb, triggerCancel, triggerColorUpdate, triggerConfirm, updateModelValue };