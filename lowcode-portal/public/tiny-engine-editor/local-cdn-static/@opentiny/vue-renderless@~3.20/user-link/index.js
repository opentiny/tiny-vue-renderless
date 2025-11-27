import "../chunk-G2ADBYYC.js";
const initUser = ({ api, props, state }) => (value) => {
  if (!value) {
    state.user = value;
    return;
  }
  api.getUsers(value).then((info) => {
    info.sort((a, b) => {
      return value.indexOf(a[state.valueField] + "") > value.indexOf(b[state.valueField] + "") ? 1 : -1;
    });
    const list = info.map((user) => {
      return user[state.valueField];
    });
    state.options = info;
    state.user = props.multiple ? list : list[0];
    props.cache && api.cacheUser(info);
  });
};
const showCard = ({ api, service, state }) => (e, user) => {
  e.preventDefault();
  state.spinner = true;
  state.expand = false;
  service.fetchUser(user.employeeNumber).then((data) => {
    state.data = data;
    state.spinner = false;
  });
  api.getUserImageUrl(user.employeeNumber).then((url) => {
    state.imgUrl = url;
  });
};
const showDetail = (state) => () => {
  state.expand = !state.expand;
};
const computedTextField = ({ service, props }) => () => props.textField || service.textField || "userCN";
const computedValueField = ({ service, props }) => () => props.valueField || service.valueField || "userId";
export {
  computedTextField,
  computedValueField,
  initUser,
  showCard,
  showDetail
};
