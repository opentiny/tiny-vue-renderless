import "../chunk-G2ADBYYC.js";
const init = ({ service, state }) => () => {
  const { getUserInfo, getUserImageUrl, getLangData } = service;
  getLangData().then((langData) => {
    getUserInfo().then((user) => {
      getUserImageUrl(user.employeeNumber).then((url) => {
        const { locale = "zhCN" } = langData;
        const { displayNameCn, displayNameEn, userCN } = user;
        const displayName = locale === "zhCN" ? displayNameCn || userCN : displayNameEn || userCN;
        state.imgUrl = url;
        state.userName = displayName;
      });
    });
  });
};
export {
  init
};
