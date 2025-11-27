import "../chunk-G2ADBYYC.js";
import { getRoute, computedDataList, computedMoreLink, handleBulletinBoardClick } from './index.js';
const api = ["state", "getRoute", "handleBulletinBoardClick"];
const renderless = (props, {
  reactive,
  computed,
  watch
}, {
  emit
}) => {
  const api2 = {};
  const state = reactive({
    actName: props.activeName,
    dataList: computed(() => api2.computedDataList()),
    moreLink: computed(() => api2.computedMoreLink())
  });
  watch(() => props.activeName, value => {
    state.actName = value;
  }, {
    immediate: true
  });
  Object.assign(api2, {
    state,
    getRoute,
    computedDataList: computedDataList({
      props,
      state
    }),
    computedMoreLink: computedMoreLink({
      props
    }),
    handleBulletinBoardClick: handleBulletinBoardClick({
      emit
    })
  });
  return api2;
};
export { api, renderless };