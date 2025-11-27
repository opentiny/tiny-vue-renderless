import "../chunk-G2ADBYYC.js";
import { cloneDeep } from './../chart-core/deps/utils.js';
const created = api => () => {
  api.loadPickerData();
  api.loadWheels();
};
const loadPickerData = ({
  props,
  state
}) => () => {
  state.dataSource = cloneDeep(props.dataSource);
  state.defaultSelectedIndexs = cloneDeep(props.defaultSelectedIndexs);
  if (!state.dataSource.length) {
    return;
  }
  const level_1 = state.dataSource;
  const level_n = getNextLevel([], state.dataSource, state.defaultSelectedIndexs, 0);
  if (level_n.length === 0) {
    state.pickerData = [level_1];
  } else {
    state.pickerData = [level_1, ...level_n];
  }
};
const getNextLevel = (levelItems, children, nextIndexs, start) => {
  var _a, _b;
  let levelItem = (_b = (_a = children[nextIndexs[start]]) == null ? void 0 : _a.children) != null ? _b : [];
  if (start !== nextIndexs.length - 1) {
    levelItems.push(levelItem);
    return getNextLevel(levelItems, levelItem, nextIndexs, ++start);
  } else {
    return levelItems;
  }
};
const wheelChanged = ({
  api,
  state
}) => (newIndexs, oldIndexs) => {
  if (newIndexs.length > 1) {
    newIndexs.forEach((ii, ri) => {
      if (newIndexs[ri] !== oldIndexs[ri] && ri !== newIndexs.length - 1) {
        const children = getChildren(state.dataSource, newIndexs, 0, ri);
        state.pickerData.splice(ri + 1, 1, children);
      }
    });
  }
  api.wheelsTo(newIndexs);
  api.changeWheelItemStyle(state.pickerData, newIndexs);
};
const getChildren = (levelItems, newIndexs, start, maxLoop) => {
  var _a, _b;
  let levelItem = (_b = (_a = levelItems[newIndexs[start]]) == null ? void 0 : _a.children) != null ? _b : [];
  if (start !== maxLoop) {
    return getChildren(levelItem, newIndexs, ++start, maxLoop);
  } else {
    return levelItem;
  }
};
const wheelsTo = ({
  api,
  state,
  nextTick
}) => indexs => {
  nextTick(() => {
    state.wheels.forEach((wheel, i) => {
      wheel.wheelTo(indexs[i], 0);
      api.refreshWheel(wheel);
    });
  });
};
const refreshWheel = nextTick => wheel => {
  nextTick(() => {
    wheel.refresh();
  });
};
const loadWheels = ({
  api,
  props,
  state,
  nextTick,
  refs
}) => () => {
  if (state.wheels.length === 0) {
    nextTick(() => {
      state.wheels = [];
      const {
        wheelWrapper
      } = refs;
      if (props.hasFooter) {
        for (let i = 0; i < state.pickerData.length; i++) {
          api.createWheelHasFooter(wheelWrapper, i);
        }
      } else {
        api.createWheelNoFooter(wheelWrapper);
      }
    });
  }
};
const createWheelHasFooter = ({
  api,
  state,
  emit,
  BScroll
}) => (wheelWrapper, i) => {
  const wheels = state.wheels;
  if (!wheels[i]) {
    wheels[i] = state.wheels[i] = new BScroll(wheelWrapper.children[i], {
      wheel: {
        selectedIndex: state.defaultSelectedIndexs[i],
        wheelWrapperClass: "wheel-scroll",
        wheelItemClass: "wheel-item"
      },
      probeType: 3
    });
    state.prevSelectedIndexs = state.defaultSelectedIndexs;
    wheels[i].on("wheelIndexChanged", () => {
      const currentSelectedIndex = wheels[i].getSelectedIndex();
      let currentSelectedIndexs = [...state.prevSelectedIndexs.slice(0, i), currentSelectedIndex, ...new Array(state.defaultSelectedIndexs.length - i - 1).fill(0)];
      api.wheelChanged(currentSelectedIndexs, state.prevSelectedIndexs);
      state.prevSelectedIndexs = currentSelectedIndexs;
      emit("change", currentSelectedIndexs);
    });
    api.wheelsTo(state.defaultSelectedIndexs);
    api.changeWheelItemStyle(state.pickerData, state.defaultSelectedIndexs);
  } else {
    wheels[i].refresh();
  }
  return wheels[i];
};
const createWheelNoFooter = ({
  api,
  state,
  BScroll
}) => wheelWrapper => {
  const wheels = state.wheels;
  if (!wheels[0]) {
    wheels[0] = state.wheels[0] = new BScroll(wheelWrapper.children[0], {
      probeType: 3,
      click: true
    });
    api.changeWheelItemStyle(state.pickerData, state.defaultSelectedIndexs);
    api.refreshWheel(wheels[0]);
  } else {
    wheels[0].refresh();
  }
  return wheels[0];
};
const changeWheelItemStyle = state => (pickerData, currentSelectedIndexs) => {
  pickerData.forEach((item, index) => {
    state.pickerData[index] = item.map((rItem, i) => {
      rItem.selected = i === currentSelectedIndexs[index];
      return rItem;
    });
  });
};
const dealWheels = state => () => {
  state.wheels.forEach(wheel => {
    wheel.destroy();
  });
  state.wheels = [];
  state.pickerData = [];
  state.prevSelectedIndexs = [];
  state.defaultSelectedIndexs = [];
};
const clickWheelItem = ({
  api,
  state,
  emit
}) => index => {
  api.changeWheelItemStyle(state.pickerData, [index]);
  const rItem = state.pickerData[0][index];
  if (state.defaultSelectedIndexs[0] !== index) {
    const selectedLabel = rItem == null ? void 0 : rItem.label;
    emit("clickWheelItem", [index], selectedLabel, rItem);
  } else {
    emit("clickWheelItem", [], "", []);
  }
};
export { changeWheelItemStyle, clickWheelItem, createWheelHasFooter, createWheelNoFooter, created, dealWheels, getChildren, getNextLevel, loadPickerData, loadWheels, refreshWheel, wheelChanged, wheelsTo };