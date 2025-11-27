import "../chunk-G2ADBYYC.js";
const init = ({ service, state }) => () => {
  const { getUserInfo } = service;
  getUserInfo().then((user) => {
    state.userName = user.userCN;
  });
};
const initService = ({ props, service }) => {
  const { base = {} } = service || {};
  const getUserInfoNoop = () => Promise.reject(
    new Error("[TINY Error][LogonUser] Prop getUserInfo is mandatory when the framework service is not used")
  );
  return {
    getUserInfo: props.getUserInfo || base.getUserInfo || getUserInfoNoop
  };
};
export {
  init,
  initService
};
