import {
  __spreadValues
} from "../chunk-G2ADBYYC.js";
const setSelectData = ({ state, deptState }) => () => {
  const texts = [];
  for (let i = 0; i < deptState.length; i++) {
    const value = deptState[i].value;
    if (value === "") {
      break;
    }
    const options = deptState[i].options;
    const selectedOp = options.find((op) => op.hrCode === value);
    texts.push(selectedOp.hrName);
  }
  state.labels = texts;
};
const setDefaultSearch = ({ api, state }) => () => {
  state.searchValue = "";
  api.searchMethod();
};
const openDialog = ({ props, state, api, emit }) => () => {
  if (props.disabled || state.formDisabled) {
    return;
  }
  api.setDefaultSearch();
  state.open = true;
  emit("open");
};
const formatJudgCofim = (deptState) => {
  let value = "";
  for (let i = 0; i < deptState.length; i++) {
    if (deptState[i].value === "") {
      break;
    }
    value = deptState[i].value;
  }
  return value;
};
const resetDeptState = (deptState) => (state) => {
  const depeStates = state || deptState;
  depeStates.forEach((dept) => {
    dept.value = "";
    dept.options = [];
    dept.disable = true;
  });
};
const getDisplay = ({ api, deptState, state }) => (value) => {
  if (value === state.current) {
    return;
  }
  state.current = value;
  api.resetDeptState();
  if (!value) {
    state.display = "";
    state.labels = [];
    state.lastLabels = [];
    state.lastDeptState = deptState.map((item) => __spreadValues({}, item));
    return;
  }
  api.setDeptState(value, true).then(() => {
    api.setSelectData();
    state.lastLabels = state.labels;
    const { hrapprover } = state;
    state.display = hrapprover ? hrapprover.state.approvalPerson : state.labels.join("/");
  });
};
const getCurrentList = ({ deptState, api }) => (level, show) => {
  if (!show) {
    return;
  }
  const value = level ? deptState[level - 1].value : "";
  api.getDeptList({ level, value });
};
const getDeptList = ({ api, state, deptState }) => ({ level, value, auto }) => {
  if (level > 8) {
    return;
  }
  const upperCode = level ? value : void 0;
  state.loading = true;
  return api.fetchDeptList(upperCode).then((list) => {
    deptState[level].options = list;
    state.loading = false;
    if (list.length) {
      deptState[level].disable = false;
      if (auto && state.autoSelect && list.length === 1) {
        let { hrCode } = list[0];
        deptState[level].value = hrCode;
        api.selectChange({ level, value: hrCode });
      }
    }
  });
};
const selectChange = ({ emit, api, state, deptState }) => ({ level, value }) => {
  api.resetDeptState(deptState.slice(level + 1, 9));
  api.setSelectData();
  state.selectChanged = true;
  const current = formatJudgCofim(deptState);
  const { hrapprover } = state;
  if (hrapprover) {
    emit("selected", current);
  } else {
    emit("selected", value, level);
  }
  if (value) {
    api.getDeptList({ level: level + 1, value, auto: true });
  }
};
const searchMethod = ({ api, state }) => (query) => {
  state.loading = true;
  api.fetchDeptByValue(query).then((list) => {
    state.searchOptions = list;
    state.loading = false;
  });
};
const searchChange = (api) => (value) => {
  if (!value) {
    return;
  }
  api.resetDeptState();
  api.setDeptState(value).then(() => {
    api.setSelectData();
  });
};
const confirm = ({ api, props, state }) => () => {
  let isClose = true;
  if (!props.beforeConfirm) {
    isClose = api.doConfirm();
    state.open = !isClose;
    return;
  }
  if (typeof props.beforeConfirm === "function") {
    const before = props.beforeConfirm();
    if (before && before.then) {
      before.then(
        () => {
          isClose = api.doConfirm();
          state.open = !isClose;
        },
        () => void 0
      );
      return;
    }
    if (before !== false) {
      isClose = api.doConfirm();
      state.open = !isClose;
    }
  }
};
const closeDialog = ({ emit, state, deptState }) => (type) => {
  if (state.selectChanged) {
    state.labels = state.lastLabels;
    deptState.forEach((item, i) => Object.assign(item, state.lastDeptState[i]));
  }
  emit("close", type);
};
const cancel = ({ emit, state, deptState }) => () => {
  state.labels = state.lastLabels;
  deptState.forEach((item, i) => Object.assign(item, state.lastDeptState[i]));
  emit("cancel");
  state.open = false;
};
const initService = ({ props, service }) => {
  const { fetchDeptList, fetchDeptByValue, fetchDept } = service || {};
  const noopFnCreator = (propName) => () => Promise.reject(new Error(`[TINY Error][Dept] Prop ${propName} is mandatory when the framework service is not used`));
  return {
    fetchDeptList: props.fetchDeptList || fetchDeptList || noopFnCreator("fetchDeptList"),
    fetchDeptByValue: props.fetchDeptByValue || fetchDeptByValue || noopFnCreator("fetchDeptByValue"),
    fetchDept: props.fetchDept || fetchDept || noopFnCreator("fetchDept")
  };
};
const doConfirm = ({ emit, props, state, deptState }) => () => {
  state.current = formatJudgCofim(deptState);
  const { hrapprover } = state;
  if (hrapprover) {
    if (state.current && !hrapprover.state.approvalPerson) {
      hrapprover.showModal();
      return false;
    } else {
      state.display = hrapprover.state.approvalPerson;
    }
  } else {
    state.display = state.labels.join("/");
  }
  state.lastLabels = state.labels;
  state.lastDeptState = deptState.map((item) => __spreadValues({}, item));
  if (props.modelValue !== state.current) {
    emit("change", state.current);
  }
  emit("update:modelValue", state.current);
  emit("confirm", state.current);
  return true;
};
const setDeptState = ({ api, state, deptState }) => (value, isInit) => api.fetchDept(value).then((info) => {
  for (let i = 0; i < deptState.length; i++) {
    const textField = `l${i}_Name`;
    const valueField = `l${i}_Dept_Code`;
    if (info && info[textField]) {
      const hrName = info[textField];
      const hrCode = info[valueField];
      deptState[i].options.push({ hrName, hrCode });
      deptState[i].value = hrCode;
      deptState[i].disable = false;
    } else {
      api.getDeptList({ level: i, value, auto: true }).then(() => {
        if (isInit) {
          state.lastDeptState = deptState.map((item) => __spreadValues({}, item));
        }
      });
      break;
    }
  }
});
export {
  cancel,
  closeDialog,
  confirm,
  doConfirm,
  getCurrentList,
  getDeptList,
  getDisplay,
  initService,
  openDialog,
  resetDeptState,
  searchChange,
  searchMethod,
  selectChange,
  setDefaultSearch,
  setDeptState,
  setSelectData
};
