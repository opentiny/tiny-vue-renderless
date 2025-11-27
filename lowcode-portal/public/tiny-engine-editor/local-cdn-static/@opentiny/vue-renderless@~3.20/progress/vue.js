import "../chunk-G2ADBYYC.js";
import { computedBarStyle, computedRelativeStrokeWidth, computedRadius, computedTrackPath, computedPerimeter, computedRate, computedStrokeDashoffset, computedTrailPathStyle, computedCircleStyle, computedCirclePathStyle, computedStroke, computedIconClass, computedIconStyle, computedProgressTextSize, computedContent, getCurrentColor, getLevelColor, getColorArray, customBeforeAppearHook, customAppearHook, customAfterAppearHook } from './index.js';
const api = ["state", "getCurrentColor", "getLevelColor", "getColorArray", "customBeforeAppearHook", "customAppearHook", "customAfterAppearHook"];
const renderless = (props, {
  computed,
  reactive
}, {
  constants,
  mode
}) => {
  const api2 = {};
  const state = reactive({
    percentTextSize: constants.TEXT_XS,
    rate: computed(() => api2.computedRate()),
    radius: computed(() => api2.computedRadius()),
    stroke: computed(() => api2.computedStroke()),
    content: computed(() => api2.computedContent()),
    barStyle: computed(() => api2.computedBarStyle()),
    trackPath: computed(() => api2.computedTrackPath()),
    perimeter: computed(() => api2.computedPerimeter()),
    iconClass: computed(() => api2.computedIconClass()),
    iconStyle: computed(() => api2.computedIconStyle()),
    circleStyle: computed(() => api2.computedCircleStyle()),
    trailPathStyle: computed(() => api2.computedTrailPathStyle()),
    circlePathStyle: computed(() => api2.computedCirclePathStyle()),
    progressTextSize: computed(() => api2.computedProgressTextSize()),
    strokeDashoffset: computed(() => api2.computedStrokeDashoffset()),
    strokeWidth: computed(() => mode === "mobile-first" ? props.strokeWidth : props.strokeWidth || constants.DEFAULT_STROKE_WIDTH),
    width: computed(() => mode === "mobile-first" ? props.width : props.width || constants.DEFAULT_WIDTH),
    relativeStrokeWidth: computed(() => api2.computedRelativeStrokeWidth())
  });
  Object.assign(api2, {
    state,
    customAppearHook,
    computedContent: computedContent({
      props
    }),
    getColorArray: getColorArray({
      props
    }),
    computedRate: computedRate({
      constants,
      props
    }),
    computedPerimeter: computedPerimeter({
      state
    }),
    computedRadius: computedRadius({
      constants,
      props,
      state
    }),
    computedTrackPath: computedTrackPath({
      constants,
      props,
      state
    }),
    computedIconClass: computedIconClass({
      constants,
      props,
      mode
    }),
    computedIconStyle: computedIconStyle({
      constants,
      props,
      state
    }),
    computedCircleStyle: computedCircleStyle({
      state
    }),
    computedCirclePathStyle: computedCirclePathStyle({
      props,
      state
    }),
    computedStrokeDashoffset: computedStrokeDashoffset({
      state
    }),
    computedTrailPathStyle: computedTrailPathStyle({
      state
    }),
    computedRelativeStrokeWidth: computedRelativeStrokeWidth({
      state,
      constants
    }),
    computedProgressTextSize: computedProgressTextSize({
      state,
      constants,
      props,
      mode
    }),
    customAfterAppearHook: customAfterAppearHook({
      state,
      props
    }),
    customBeforeAppearHook: customBeforeAppearHook({
      props,
      state
    }),
    getLevelColor: getLevelColor({
      api: api2
    }),
    computedBarStyle: computedBarStyle({
      api: api2,
      props
    }),
    getCurrentColor: getCurrentColor({
      api: api2,
      props
    }),
    computedStroke: computedStroke({
      api: api2,
      constants,
      props
    })
  });
  return api2;
};
export { api, renderless };