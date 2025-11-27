import "../chunk-G2ADBYYC.js";
import { merge } from './../common/object.js';
const watchRules = ({
  api,
  props,
  state
}) => (newRules = {}, oldRules = {}) => {
  const newValidFields = Object.keys(newRules);
  const oldValidFields = Object.keys(oldRules);
  const removeValidFields = oldValidFields.filter(item => !newValidFields.includes(item));
  api.clearValidate(removeValidFields);
  state.fields.forEach(field => {
    field.removeValidateEvents();
    field.addValidateEvents();
  });
  if (props.validateOnRuleChange) {
    api.validate(() => void 0);
  }
};
const computedAutoLabelWidth = ({
  state
}) => () => {
  if (!state.potentialLabelWidthArr.length) {
    return "0";
  }
  const max = Math.max(...state.potentialLabelWidthArr);
  return max ? `${max}px` : "";
};
const computedHideRequiredAsterisk = ({
  props,
  designConfig
}) => () => {
  var _a, _b, _c;
  return (_c = (_b = props.hideRequiredAsterisk) != null ? _b : (_a = designConfig == null ? void 0 : designConfig.props) == null ? void 0 : _a.hideRequiredAsterisk) != null ? _c : false;
};
const computedValidateIcon = ({
  props,
  designConfig
}) => () => {
  var _a, _b, _c;
  return (_c = (_b = props.validateIcon) != null ? _b : (_a = designConfig == null ? void 0 : designConfig.icons) == null ? void 0 : _a.validateIcon) != null ? _c : "icon-error";
};
const computedIsErrorInline = ({
  props,
  designConfig
}) => () => {
  if (props.messageType) {
    return props.messageType === "inline";
  }
  if (typeof props.inlineMessage === "boolean") {
    return props.inlineMessage;
  }
  return (designConfig == null ? void 0 : designConfig.messageType) === "inline";
};
const computedIsErrorBlock = ({
  props,
  designConfig
}) => () => {
  if (props.messageType) {
    return props.messageType === "block";
  }
  if (designConfig && Object.hasOwnProperty.call(designConfig, "messageType")) {
    return designConfig.messageType === "block";
  }
  return true;
};
const created = ({
  parent,
  state
}) => () => {
  parent.$on("form:addField", field => {
    if (field) {
      state.fields.push(field);
    }
  });
  parent.$on("form:removeField", field => {
    if (field.prop) {
      state.fields.splice(state.fields.indexOf(field), 1);
    }
  });
};
const resetFields = ({
  props,
  state
}) => () => {
  if (!props.model) {
    return;
  }
  state.fields.forEach(field => {
    field.resetField();
  });
};
const updateTip = ({
  props,
  state
}) => () => {
  if (!props.model) {
    return;
  }
  state.fields.forEach(field => {
    field.updateTip();
  });
};
const clearValidate = state => (props = []) => {
  let fields;
  if (props.length) {
    fields = typeof props === "string" ? state.fields.filter(field => props === field.prop) : state.fields.filter(field => field.prop && props.includes(field.prop));
  } else {
    fields = state.fields;
  }
  fields.forEach(field => {
    field.clearValidate();
  });
};
const validate = ({
  props,
  state
}) => callback => {
  if (!props.model) {
    return;
  }
  let promise;
  if (typeof callback !== "function" && window.Promise) {
    promise = new window.Promise((resolve, reject) => {
      callback = valid2 => {
        valid2 ? resolve(valid2) : reject(valid2);
      };
    });
  }
  let valid = true;
  let count = 0;
  if (state.fields.length === 0 && callback) {
    callback(true);
  }
  let invalidFields = {};
  let invalidFieldArr = [];
  state.fields.forEach(field => {
    field.validate("", (message, field2) => {
      if (message) {
        valid = false;
      }
      invalidFields = merge({}, invalidFields, field2);
      if (field2) {
        Object.keys(field2).forEach(item => invalidFieldArr.push(item));
      }
      if (typeof callback === "function" && ++count === state.fields.length) {
        callback(valid, invalidFields, invalidFieldArr);
      }
    });
  });
  if (promise) {
    return promise;
  }
};
const validateField = state => (props, cb) => {
  props = [].concat(props);
  const fields = state.fields.filter(field => props.includes(field.prop));
  if (!fields.length) {
    return;
  }
  fields.forEach(field => {
    field.validate("", cb);
  });
};
const getLabelWidthIndex = state => width => {
  const index = state.potentialLabelWidthArr.indexOf(width);
  if (index === -1) {
    throw new Error("unpected width ", width);
  }
  return index;
};
const registerLabelWidth = ({
  api,
  state
}) => (val, oldVal) => {
  if (val && oldVal) {
    const index = api.getLabelWidthIndex(oldVal);
    state.potentialLabelWidthArr.splice(index, 1, val);
  } else if (val) {
    state.potentialLabelWidthArr.push(val);
  }
};
const deregisterLabelWidth = ({
  api,
  state
}) => val => {
  const index = api.getLabelWidthIndex(val);
  state.potentialLabelWidthArr.splice(index, 1);
};
const bindDialogEvent = ({
  api,
  dialog,
  state
}) => {
  let unbindDialogEvent = () => {};
  if (dialog) {
    const boxCloseHandler = (isFormReset = true) => {
      isFormReset ? api.resetFields() : api.clearValidate();
    };
    const boxDragHandler = () => {
      if (!state.timer) {
        state.timer = window.setTimeout(() => {
          state.timer = 0;
          api.updateTip();
        }, 10);
      }
    };
    dialog.state.emitter.on("boxclose", boxCloseHandler);
    dialog.state.emitter.on("boxdrag", boxDragHandler);
    unbindDialogEvent = () => {
      dialog.state.emitter.off("boxclose", boxCloseHandler);
      dialog.state.emitter.off("boxdrag", boxDragHandler);
    };
  }
  return unbindDialogEvent;
};
const showTooltip = ({
  vm,
  state
}) => (dom, val) => {
  const tooltip = vm.$refs.tooltip;
  tooltip.state.referenceElm = dom;
  tooltip.state.popperElm && (tooltip.state.popperElm.style.display = "none");
  tooltip.doDestroy();
  state.tooltipVisible = true;
  state.displayedValue = val;
  setTimeout(tooltip.updatePopper, 20);
};
const hideTooltip = ({
  state
}) => () => {
  state.tooltipVisible = false;
};
export { bindDialogEvent, clearValidate, computedAutoLabelWidth, computedHideRequiredAsterisk, computedIsErrorBlock, computedIsErrorInline, computedValidateIcon, created, deregisterLabelWidth, getLabelWidthIndex, hideTooltip, registerLabelWidth, resetFields, showTooltip, updateTip, validate, validateField, watchRules };