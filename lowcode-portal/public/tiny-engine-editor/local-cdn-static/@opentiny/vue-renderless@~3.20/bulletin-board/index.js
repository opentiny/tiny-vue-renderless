import "../chunk-G2ADBYYC.js";
import { xss } from './../common/xss.js';
const getRoute = route => `/${route || ""}`.replace(/^\/+/, "/");
const computedDataList = ({
  props,
  state
}) => () => {
  const list = props.data[Number(state.actName) - 1] || [];
  list.forEach(subItem => {
    subItem.url = xss.filterUrl(subItem.url);
  });
  return list;
};
const computedMoreLink = ({
  props
}) => () => {
  if (props.moreLink) {
    props.moreLink.url = xss.filterUrl(props.moreLink.url);
  }
  return props.moreLink;
};
const handleBulletinBoardClick = ({
  emit
}) => item => {
  emit("contentClick", item);
};
export { computedDataList, computedMoreLink, getRoute, handleBulletinBoardClick };