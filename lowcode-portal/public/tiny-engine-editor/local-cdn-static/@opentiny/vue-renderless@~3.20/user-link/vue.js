import "../chunk-G2ADBYYC.js";
import { getUsers, cacheUser, saveCache, initService, syncCacheIds } from './../user/index.js';
import { initUser, showCard, showDetail, computedTextField, computedValueField } from './index.js';
const api = ["state", "showCard", "showDetail"];
const renderless = (props, {
  reactive,
  watch,
  computed
}, {
  service
}) => {
  service = initService({
    props,
    service
  });
  const api2 = {};
  const state = reactive({
    options: [],
    user: [],
    selected: [],
    type: props.valueField,
    expand: false,
    data: {},
    spinner: true,
    imgUrl: "",
    batch: props.batch === false ? false : props.batch || service.batch,
    textField: computed(() => api2.computedTextField()),
    valueField: computed(() => api2.computedValueField())
  });
  Object.assign(api2, {
    state,
    showDetail: showDetail(state),
    saveCache: saveCache({
      props
    }),
    syncCacheIds: syncCacheIds({
      props,
      state
    }),
    cacheUser: cacheUser({
      api: api2,
      props,
      service,
      state
    }),
    initUser: initUser({
      api: api2,
      props,
      state
    }),
    getUsers: getUsers({
      api: api2,
      props,
      state
    }),
    showCard: showCard({
      api: api2,
      service,
      state
    }),
    getUserImageUrl: service.getUserImageUrl,
    fetchW3Accounts: service.fetchW3Accounts,
    fetchUserByUserId: service.fetchUserByUserId,
    computedTextField: computedTextField({
      service,
      props
    }),
    computedValueField: computedValueField({
      service,
      props
    })
  });
  watch(() => props.modelValue, api2.initUser, {
    immediate: true
  });
  return api2;
};
export { api, renderless };