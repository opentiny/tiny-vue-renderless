import "../chunk-G2ADBYYC.js";
import browser from './../common/browser.js';
import { isNull } from './../common/type.js';
import debounce from './../common/deps/debounce.js';
import { isEqual } from './../common/object.js';
import { addResizeListener } from './../common/deps/resize-event.js';
import { KEY_CODE, CASCADER } from './../common/index.js';
const initMigratingProps = () => ({
  expandTrigger: {
    newProp: CASCADER.PropsExpandTri,
    type: String
  },
  changeOnSelect: {
    newProp: CASCADER.PropsCheckStric,
    type: Boolean
  },
  hoverThreshold: {
    newProp: CASCADER.PropsHover,
    type: Number
  }
});
const kebabCase = str => {
  const hyphenateRE = /([^-])([A-Z])/g;
  return str.replace(hyphenateRE, "$1-$2").replace(hyphenateRE, "$1-$2").toLowerCase();
};
const getConfig = ({
  parent,
  props
}) => () => {
  const config = props.props || {};
  const {
    $attrs
  } = parent;
  const migratingProps = initMigratingProps();
  Object.keys(migratingProps).forEach(oldProp => {
    const {
      newProp,
      type
    } = migratingProps[oldProp];
    let oldValue = $attrs[oldProp] || $attrs[kebabCase(oldProp)];
    if (isNull(config[newProp]) && !isNull(oldProp)) {
      if (oldValue === "" && type === Boolean) {
        oldValue = true;
      }
      config[newProp] = oldValue;
    }
  });
  return config;
};
const computClearVisible = ({
  props,
  state
}) => () => {
  if (!props.clearable || state.isDisabled || state.filtering || !state.inputHover) {
    return false;
  }
  return state.multiple ? !!state.checkedNodes.filter(node => !node.isDisabled).length : !!state.presentText;
};
const computePresentContent = ({
  api,
  state
}) => () => {
  if (state.config.multiple) {
    api.computePresentTags();
    state.presentText = state.presentTags.length ? " " : null;
  } else {
    api.computePresentText();
  }
};
const watchValue = ({
  api,
  state
}) => value => {
  if (!isEqual(value, state.checkedValue)) {
    state.checkedValue = value;
    setTimeout(api.computePresentContent);
  }
};
const watchCheckedValue = ({
  nextTick,
  constants,
  dispatch,
  api,
  emit,
  state
}) => value => {
  state.presentText = state.presentTags.length ? "" : null;
  const {
    checkStrictly,
    multiple
  } = state.config;
  nextTick(() => {
    api.computePresentContent();
  });
  if (!multiple && !checkStrictly && state.dropDownVisible) {
    api.toggleDropDownVisible(false);
  }
  nextTick(() => {
    dispatch(constants.COMPONENT_NAME.FormItem, constants.EVENT_NAME.FormChange, [state.multiple ? state.presentText : state.inputValue]);
  });
  emit("update:modelValue", value);
  emit("change", value);
  setTimeout(api.updateStyle);
};
const isEmpty = val => {
  if (isNull(val)) {
    return true;
  }
  if (typeof val === "boolean") {
    return false;
  }
  if (typeof val === "number") {
    return !val;
  }
  if (val instanceof Error) {
    return val.message === "";
  }
  const type = Object.prototype.toString.call(val);
  if (~["[object String]", "[object Array]"].indexOf(type)) {
    return !val.length;
  }
  if (~["[object File]", "[object Map]", "[object Set]"].indexOf(type)) {
    return !val.size;
  }
  if (type === "[object Object]") {
    return !Object.keys(val).length;
  }
  return false;
};
const selfMounted = ({
  api,
  parent,
  props,
  vm,
  state
}) => () => {
  const {
    input
  } = vm.$refs;
  const inputSizeMap = {
    medium: 36,
    small: 32,
    mini: 28
  };
  input && (input.$parent.popperElm = vm.$refs.popper);
  if (input && input.$el) {
    state.inputInitialHeight = input.$el.offsetHeight || inputSizeMap[state.realSize] || 30;
  }
  if (!isEmpty(props.modelValue)) {
    api.computePresentContent();
  }
  api.filterHandler = debounce(props.debounce, () => {
    if (!state.inputValue) {
      state.filtering = false;
      return;
    }
    const before = props.beforeFilter(state.inputValue);
    if (before && before.then) {
      before.then(api.getSuggestions);
    } else if (before !== false) {
      api.getSuggestions();
    } else {
      state.filtering = false;
    }
  });
  addResizeListener(parent.$el, api.updateStyle);
};
const toggleDropDownVisible = ({
  emit,
  vm,
  state,
  updatePopper
}) => visible => {
  if (state.isDisabled) {
    return;
  }
  const {
    input
  } = vm.$refs;
  visible = !isNull(visible) ? visible : !state.dropDownVisible;
  if (visible !== state.dropDownVisible) {
    state.dropDownVisible = visible;
    if (visible) {
      updatePopper();
      state.panel.scrollIntoView();
    }
    input && input.getInput && input.getInput().setAttribute("aria-expanded", visible);
    emit("visible-change", visible);
  }
};
const handleDropdownLeave = state => () => {
  state.filtering = false;
  state.inputValue = state.presentText;
};
const handleKeyDown = ({
  api
}) => event => {
  switch (event.keyCode) {
    case KEY_CODE.Enter:
      api.toggleDropDownVisible();
      break;
    case KEY_CODE.ArrowDown:
      api.toggleDropDownVisible(true);
      api.focusFirstNode();
      event.preventDefault();
      break;
    case KEY_CODE.Escape:
    case KEY_CODE.Tab:
      api.toggleDropDownVisible(false);
      break;
    default:
      break;
  }
};
const handleFocus = emit => e => {
  emit("focus", e);
};
const handleBlur = ({
  emit,
  api,
  props
}) => e => {
  if (props.filterable) {
    api.computePresentContent();
  }
  emit("blur", e);
};
const handleInput = ({
  api,
  state,
  vm
}) => (val, event) => {
  event = event || window.event;
  if (!event) {
    return;
  }
  const reference = vm.$refs.reference;
  const key = "init-flag";
  const value = "true";
  const isIE = browser.name === "ie";
  if (isIE && reference.getAttribute(key) !== value && !event.target.value) {
    reference.setAttribute(key, value);
    return;
  }
  !state.dropDownVisible && api.toggleDropDownVisible(true);
  state.presentText = val;
  if (event && event.isComposing) {
    return;
  }
  if (val) {
    api.filterHandler();
  } else {
    state.filtering = false;
  }
};
const handleClear = state => _event => {
  state.presentText = "";
  state.panel.clearCheckedNodes();
};
const handleExpandChange = ({
  constants,
  dispatch,
  emit,
  nextTick,
  state,
  updatePopper
}) => value => {
  nextTick(() => {
    dispatch(constants.COMPONENT_NAME.FormItem, constants.EVENT_NAME.FormBlur, [state.multiple ? state.presentText : state.inputValue]);
    updatePopper();
  });
  emit("expand-change", value);
  emit("active-item-change", value);
};
const focusFirstNode = ({
  vm,
  state
}) => () => {
  const {
    popper,
    suggestionPanel
  } = vm.$refs;
  let firstNode = null;
  if (state.filtering && suggestionPanel) {
    firstNode = suggestionPanel.$el.querySelector(CASCADER.SugItem);
  } else {
    const firstMenu = popper.querySelector(CASCADER.CascaderMenu);
    firstNode = firstMenu.querySelector(CASCADER.CascaderNodeTab);
  }
  if (firstNode) {
    firstNode.focus();
    !state.filtering && firstNode.click();
  }
};
const computePresentText = ({
  props,
  state
}) => () => {
  if (!isEmpty(state.checkedValue)) {
    const node = state.panel.getNodeByValue(state.checkedValue);
    if (node && (state.config.checkStrictly || node.isLeaf)) {
      state.presentText = node.getText(props.showAllLevels, props.separator);
      return;
    }
  }
  state.inputValue = null;
  state.presentText = null;
};
const computePresentTags = ({
  api,
  props,
  state
}) => () => {
  const checkedNodes = api.getCheckedNodes(state.leafOnly);
  const tags = [];
  const genTag = node => {
    const text = node.getText(props.showAllLevels, props.separator);
    const closable = !state.isDisabled && !node.isDisabled;
    return {
      node,
      key: node.uid,
      text,
      hitState: false,
      closable
    };
  };
  if (checkedNodes.length) {
    const [first, ...rest] = checkedNodes;
    const restCount = rest.length;
    tags.push(genTag(first));
    if (restCount) {
      if (props.collapseTags) {
        tags.push({
          key: -1,
          text: `+ ${restCount}`,
          closable: false
        });
      } else {
        rest.forEach(node => tags.push(genTag(node)));
      }
    }
  }
  state.checkedNodes = checkedNodes;
  state.presentTags = tags;
  state.inputValue = null;
  state.presentText = null;
  if (props.hoverExpand) {
    api.calcCollapseTags();
  }
};
const calcCollapseTags = ({
  state,
  vm,
  nextTick
}) => () => {
  nextTick(() => {
    const content = vm.$refs["tags-content"];
    if (state.inputHover || state.dropDownVisible) {
      return state.isHidden = true;
    }
    if (content) {
      const {
        width: contentWidth,
        paddingLeft,
        paddingRight
      } = content && window.getComputedStyle(content);
      const contentWidthTotal = content && parseFloat(contentWidth) - parseFloat(paddingLeft) - parseFloat(paddingRight);
      const tagsLength = content.querySelector(".tiny-cascader__tags-collapse");
      const {
        width: collapseTagContentWidth,
        marginRight,
        marginLeft
      } = tagsLength && window.getComputedStyle(tagsLength);
      const collapseTagWidth = tagsLength && parseFloat(collapseTagContentWidth) + parseFloat(marginRight) + parseFloat(marginLeft);
      const tags = Array.from(content.querySelectorAll(".tiny-tag"));
      let {
        total,
        dom,
        idx
      } = {
        total: collapseTagWidth,
        dom: null,
        idx: 0
      };
      tags.forEach((tag, index) => {
        if (tag !== tagsLength) {
          const {
            width: tagContentWidth,
            marginRight: marginRight2,
            marginLeft: marginLeft2
          } = tag && window.getComputedStyle(tag);
          total += parseFloat(tagContentWidth) + parseFloat(marginRight2) + parseFloat(marginLeft2);
        }
        if (tag !== tagsLength && total > contentWidthTotal && !dom) {
          dom = tag;
          idx = index;
        }
      });
      let isOneLine = total - collapseTagWidth <= contentWidthTotal;
      if (isOneLine) {
        return state.isHidden = true;
      }
      if (dom) {
        dom.before(tagsLength);
        state.isHidden = false;
      } else {
        state.isHidden = true;
      }
      state.collapseTagsLength = tags.length - idx;
    }
  });
};
const watchInputHover = ({
  vm
}) => newVal => {
  const [inputHover, dropDownVisible] = newVal;
  if (!inputHover && !dropDownVisible) {
    const content = vm.$refs["tags-content"];
    content && content.scrollTo({
      top: 0,
      left: 0
    });
  }
};
const handleMouseenter = ({
  vm,
  state
}) => $event => {
  const dom = $event.target;
  const textNode = dom && dom.querySelector("span");
  const {
    tooltip
  } = vm.$refs;
  if (textNode && tooltip && textNode.scrollWidth > textNode.offsetWidth) {
    const text = textNode.textContent;
    tooltip.state.referenceElm = dom;
    tooltip.state.popperElm && (tooltip.state.popperElm.style.display = "none");
    tooltip.doDestroy();
    state.tooltipVisible = true;
    state.tooltipContent = text;
    setTimeout(tooltip.updatePopper, 20);
  }
};
const handleMouseleave = ({
  state
}) => () => state.tooltipVisible = false;
const getSuggestions = ({
  nextTick,
  props,
  state,
  updatePopper
}) => () => {
  let filterMethod = null;
  if (!(props.filterMethod && typeof props.filterMethod === "function")) {
    filterMethod = (node, keyword) => ~node.text.indexOf(keyword);
  } else {
    filterMethod = props.filterMethod;
  }
  const suggestions = state.panel.getFlattedNodes(state.leafOnly).filter(node => {
    if (node.isDisabled) {
      return false;
    }
    ;
    node.text = node.getText(props.showAllLevels, props.separator) || "";
    return filterMethod == null ? void 0 : filterMethod(node, state.inputValue);
  });
  if (state.multiple) {
    state.presentTags.forEach(tag => {
      tag.hitState = false;
    });
  } else {
    suggestions.forEach(node => {
      node.checked = isEqual(state.checkedValue, node.getValueByOption());
    });
  }
  state.filtering = true;
  state.suggestions = suggestions;
  nextTick(() => updatePopper());
};
const handleSuggestionKeyDown = ({
  api
}) => event => {
  event = event || window.event;
  if (!event) {
    return;
  }
  const {
    keyCode,
    target
  } = event;
  if (keyCode === KEY_CODE.Enter) {
    target.click();
  } else if (keyCode === KEY_CODE.ArrowUp) {
    const prev = target.previousElementSibling;
    prev && prev.focus();
  } else if (keyCode === KEY_CODE.ArrowDown) {
    const next = target.nextElementSibling;
    next && next.focus();
  } else if (~[KEY_CODE.Escape, KEY_CODE.Tab].indexOf(keyCode)) {
    api.toggleDropDownVisible(false);
  }
};
const handleDelete = ({
  api,
  state
}) => () => {
  const lastIndex = state.presentTags.length - 1;
  const lastTag = state.presentTags[lastIndex];
  state.pressDeleteCount = state.inputValue ? 0 : state.pressDeleteCount + 1;
  if (!lastTag) {
    return;
  }
  if (state.pressDeleteCount) {
    if (lastTag.hitState) {
      api.deleteTag(lastIndex);
    } else {
      lastTag.hitState = true;
    }
  }
};
const handleSuggestionClick = ({
  api,
  state
}) => index => {
  const targetNode = state.suggestions[index];
  if (state.multiple) {
    const {
      checked
    } = targetNode;
    targetNode.doCheck(!checked);
    state.panel.calculateMultiCheckedValue();
  } else {
    state.checkedValue = targetNode.getValueByOption();
    api.toggleDropDownVisible(false);
  }
};
const deleteTag = ({
  emit,
  state,
  api
}) => index => {
  const val = state.checkedValue[index];
  state.checkedValue = state.checkedValue.filter((n, i) => i !== index);
  api.handleMouseleave();
  emit("remove-tag", val);
};
const updateStyle = ({
  parent,
  vm,
  state,
  updatePopper,
  nextTick,
  props
}) => () => {
  const $el = parent.$el;
  const {
    suggestionPanel
  } = vm.$refs;
  const inputInner = $el.querySelector(CASCADER.InputClass);
  if (!inputInner) {
    return;
  }
  const tags = $el.querySelector(CASCADER.TagClass);
  let suggestionPanelEl = null;
  if (suggestionPanel) {
    suggestionPanelEl = suggestionPanel.$el;
    const suggestionList = suggestionPanelEl.querySelector(CASCADER.ListClass);
    suggestionList.style.minWidth = inputInner.offsetWidth + "px";
  }
  if (tags) {
    const offsetHeight = tags.offsetHeight;
    let height = 0;
    if (props.hoverExpand && !state.inputHover && !state.dropDownVisible) {
      height = state.inputInitialHeight + "px";
    } else {
      height = Math.max(offsetHeight + 4, state.inputInitialHeight) + "px";
    }
    inputInner.style.height = height;
    updatePopper();
  } else {
    nextTick(() => {
      if (state.multiple && state.isDisplayOnly) {
        inputInner.style.height = "auto";
      }
    });
  }
};
const getCheckedNodes = state => leafOnly => state.panel.getCheckedNodes(leafOnly, state.checkedValue);
const setInputHeightToTag = ({
  nextTick,
  parent,
  state
}) => () => {
  nextTick(() => {
    var _a;
    const parentEl = parent.$el;
    const height = ((_a = parentEl == null ? void 0 : parentEl.querySelector(CASCADER.TagClass)) == null ? void 0 : _a.offsetHeight) + 6 + "px";
    if (!state.isDisplayOnly) {
      const inputDom = parentEl == null ? void 0 : parentEl.querySelector(CASCADER.InputClass);
      inputDom && (inputDom.style.height = height);
    } else {
      const inputDom = parentEl == null ? void 0 : parentEl.querySelector(CASCADER.InputClass);
      inputDom && (inputDom.style.height = "auto");
    }
  });
};
const presentTextHandler = ({
  state,
  value
}) => {
  if (state.inputValue) {
    if (state.inputValue !== value) {
      state.inputValue = value;
    }
  } else {
    if (value) {
      state.inputValue = value;
    }
  }
};
const handleBeforeUpdate = ({
  props,
  api,
  state
}) => () => {
  if (!isEmpty(props.modelValue) && !props.filterable || props.hoverExpand && state.multiple) {
    api.computePresentContent();
  }
};
const showPlaceholder = ({
  props,
  state,
  t,
  constants
}) => () => {
  let placeholder = null;
  placeholder = state.multiple && state.presentTags.length || state.present ? "" : props.placeholder || t(constants.placeholder);
  return placeholder;
};
export { calcCollapseTags, computClearVisible, computePresentContent, computePresentTags, computePresentText, deleteTag, focusFirstNode, getCheckedNodes, getConfig, getSuggestions, handleBeforeUpdate, handleBlur, handleClear, handleDelete, handleDropdownLeave, handleExpandChange, handleFocus, handleInput, handleKeyDown, handleMouseenter, handleMouseleave, handleSuggestionClick, handleSuggestionKeyDown, isEmpty, presentTextHandler, selfMounted, setInputHeightToTag, showPlaceholder, toggleDropDownVisible, updateStyle, watchCheckedValue, watchInputHover, watchValue };