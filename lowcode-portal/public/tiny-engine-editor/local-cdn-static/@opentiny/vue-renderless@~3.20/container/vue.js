import "../chunk-G2ADBYYC.js";
import { computedShowHeader, computedShowAside, computedShowFooter, computedHeaderStyle, computedAsideStyle, computedMainStyle, computedFooterStyle, computedLeftStyle, computedShowRight, computedRightStyle } from './index.js';
const api = ["state"];
const renderless = (props, {
  computed,
  reactive
}, {
  constants
}) => {
  const api2 = {};
  const state = reactive({
    showAside: computed(() => api2.computedShowAside()),
    showHeader: computed(() => api2.computedShowHeader()),
    showFooter: computed(() => api2.computedShowFooter()),
    mainStyle: computed(() => api2.computedMainStyle()),
    asideStyle: computed(() => api2.computedAsideStyle()),
    headerStyle: computed(() => api2.computedHeaderStyle()),
    footerStyle: computed(() => api2.computedFooterStyle()),
    showRight: computed(() => api2.computedShowRight()),
    leftStyle: computed(() => api2.computedLeftStyle()),
    rightStyle: computed(() => api2.computedRightStyle())
  });
  Object.assign(api2, {
    state,
    computedShowAside: computedShowAside({
      constants,
      props
    }),
    computedShowHeader: computedShowHeader({
      constants,
      props
    }),
    computedShowFooter: computedShowFooter({
      constants,
      props
    }),
    computedMainStyle: computedMainStyle({
      constants,
      props
    }),
    computedAsideStyle: computedAsideStyle({
      constants,
      props
    }),
    computedHeaderStyle: computedHeaderStyle({
      constants,
      props
    }),
    computedFooterStyle: computedFooterStyle({
      constants,
      props
    }),
    computedLeftStyle: computedLeftStyle({
      constants,
      props
    }),
    computedShowRight: computedShowRight({
      constants,
      props
    }),
    computedRightStyle: computedRightStyle({
      constants,
      props
    })
  });
  return api2;
};
export { api, renderless };