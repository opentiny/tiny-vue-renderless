import "../chunk-G2ADBYYC.js";
import { extend } from './../common/object.js';
const getHrList = ({
  api,
  props,
  state
}) => deptCode => {
  state.loading = true;
  const params = {
    code: deptCode,
    category: props.category
  };
  return api.fetchHrapprover(params).then(data => {
    const hraInfo = [];
    data.forEach(info => {
      const person = info.approval_Person;
      if (!person) {
        return;
      }
      const persons = person.split("#");
      persons.forEach(val => {
        const newInfo = extend({}, info, {
          "approval_person": val
        });
        hraInfo.push(newInfo);
      });
    });
    state.loading = false;
    return hraInfo;
  });
};
const selectedDept = ({
  api,
  state
}) => value => {
  if (!value) {
    state.hrList = [];
    state.approvalPerson = "";
    return;
  }
  api.getHrList(value).then(result => {
    state.hrList = result;
    const hasApproval = result.some(item => item.approval_person === state.approvalPerson);
    if (!hasApproval) {
      state.approvalPerson = "";
    }
  }).catch(() => {
    state.hrList = [];
  });
};
const getDisplay = ({
  api,
  state
}) => value => {
  if (state.current === value) {
    return;
  }
  state.current = value;
  if (!value) {
    state.hrList = [];
    state.lastHrList = [];
    state.approvalPerson = "";
    return;
  }
  api.getHrList(value).then(result => {
    state.hrList = result;
    state.lastHrList = result;
    const hasApproval = result.some(item => item.approval_person === state.approvalPerson);
    if (!hasApproval) {
      state.approvalPerson = "";
    }
  }).catch(() => {
    state.hrList = [];
    state.lastHrList = [];
    state.approvalPerson = "";
  });
};
const resetPerson = ({
  props,
  state
}) => () => {
  state.approvalPerson = props.approvalPerson;
};
const hrChange = ({
  emit,
  state
}) => value => {
  state.current = value;
  emit("update:modelValue", value);
  emit("update:approvalPerson", state.approvalPerson);
};
const initService = ({
  props,
  service
}) => {
  const {
    fetchHrapprover
  } = service || {};
  const fetchHrapproverNoop = () => Promise.reject(new Error("[TINY Error][Hrapprover] Prop fetchHrapprover is mandatory when the framework service is not used"));
  return {
    fetchHrapprover: props.fetchHrapprover || fetchHrapprover || fetchHrapproverNoop
  };
};
const cancel = ({
  state
}) => () => {
  state.approvalPerson = state.overdueData;
  state.hrList = state.lastHrList;
};
export { cancel, getDisplay, getHrList, hrChange, initService, resetPerson, selectedDept };