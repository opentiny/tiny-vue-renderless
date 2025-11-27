import "../chunk-G2ADBYYC.js";
const getChangePosition = ({ state }) => (value) => {
  const sliderItem = state.sliderInfo.find((item) => item.value === value);
  if (sliderItem) {
    const { buttonVm, width, left, height } = sliderItem;
    if (!width || !height) {
      sliderItem.left = buttonVm.offsetLeft;
      sliderItem.width = buttonVm.offsetWidth;
      sliderItem.height = buttonVm.offsetHeight;
    }
    state.sliderSpace = sliderItem.left;
    state.sliderWidth = sliderItem.width;
    state.sliderHeight = sliderItem.height;
  }
};
const watchSliderButtonChange = ({ vm, state, api, props }) => (value) => {
  var _a;
  const observer = new MutationObserver(() => {
    state.sliderInfo.forEach((sliderItem) => {
      const { buttonVm } = sliderItem;
      sliderItem.left = buttonVm.offsetLeft;
      sliderItem.width = buttonVm.offsetWidth;
      sliderItem.height = buttonVm.offsetHeight;
    });
    api.getChangePosition(props.modelValue);
  });
  state.mutationObserver = observer;
  const buttonBox = (_a = vm.$refs) == null ? void 0 : _a.sliderButtonBox;
  if (buttonBox) {
    observer.observe(vm.$refs.sliderButtonBox, { childList: true, subtree: true, characterData: true });
  }
};
const watchVisible = ({ vm, api, props, state }) => () => {
  var _a;
  const group = (_a = vm.$refs) == null ? void 0 : _a.sliderButtonGroup;
  if (!group) {
    return;
  }
  const observer = new IntersectionObserver(() => {
    if (!(group == null ? void 0 : group.offsetParent)) {
      return;
    }
    api.getChangePosition(props.modelValue);
  });
  state.intersectionObserver = observer;
  observer.observe(group);
};
export {
  getChangePosition,
  watchSliderButtonChange,
  watchVisible
};
