import "../chunk-G2ADBYYC.js";
import { omitText } from './../common/string.js';
const api = ["dataStore", "handleClick", "dataStore", "mouseEnter", "mouseLeave"];
const renderless = (props, {
  reactive,
  inject
}, {
  dispatch,
  vm
}) => {
  const api2 = {};
  const dropdownMenuVm = inject("dropdownMenuVm", null);
  let dataStore = reactive({
    checkedStatus: dropdownMenuVm == null ? void 0 : dropdownMenuVm.checkedStatus,
    multiStageMenu: "",
    multiStage: inject("multiStage", null),
    itemData: "",
    itemLabel: "",
    showContent: false,
    dropdownMenuVm,
    currentIndex: props.currentIndex,
    level: props.level
  });
  const handleClick = ({
    dataStore: dataStore2,
    props: props2,
    vm: vm2
  }) => () => {
    if (props2.disabled) {
      dataStore2.checkedStatus = false;
    }
    dataStore2.itemData = props2.itemData;
    dataStore2.itemLabel = "";
    dataStore2.showContent = false;
    if (props2.level === "2") {
      dataStore2.currentIndex = `${props2.level}-${props2.currentIndex}`;
    } else {
      dataStore2.currentIndex = `${props2.currentIndex}`;
    }
    dispatch("TinyDropdown", "selected-index", [dataStore2.currentIndex]);
    const data = {
      itemData: dataStore2.itemData,
      vm: vm2,
      label: dataStore2.itemLabel,
      showContent: dataStore2.showContent,
      disabled: props2.disabled
    };
    dispatch("TinyDropdownMenu", "menu-item-click", data);
    dispatch("TinyDropdown", "is-disabled", [props2.disabled]);
  };
  const mouseLeave = ({
    dataStore: dataStore2
  }) => () => {
    dataStore2.itemLabel = "";
    dataStore2.showContent = false;
    dispatch("TinyDropdownMenu", "mouseleave-tips", [dataStore2.showContent, dataStore2.itemLabel]);
  };
  const mouseEnter = ({
    vm: vm2,
    dataStore: dataStore2,
    props: props2
  }) => e => {
    const dom = e.target;
    const text = dom.textContent;
    const font = window.getComputedStyle(dom).font;
    const rect = dom.getBoundingClientRect();
    const res = omitText(text, font, rect.width);
    const tooltip = dataStore2.dropdownMenuVm.$refs.tooltip;
    if (res.o) {
      tooltip.state.referenceElm = dom;
      tooltip.state.popperElm && (tooltip.state.popperElm.style.display = "none");
      tooltip.doDestroy();
      dataStore2.itemLabel = props2.tooltipContent || text;
      if (vm2.$refs.level.scrollWidth > vm2.$refs.level.offsetWidth) {
        dataStore2.showContent = true;
      }
      setTimeout(tooltip.updatePopper, 20);
    }
    dispatch("TinyDropdownMenu", "mouseenter-tips", [dataStore2.showContent, dataStore2.itemLabel]);
  };
  Object.assign(api2, {
    dataStore,
    handleClick: handleClick({
      dataStore,
      props,
      vm
    }),
    mouseEnter: mouseEnter({
      dataStore,
      vm,
      props
    }),
    mouseLeave: mouseLeave({
      dataStore
    })
  });
  return api2;
};
export { api, renderless };