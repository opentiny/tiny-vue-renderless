import "../chunk-G2ADBYYC.js";
import { KEY_CODE } from './../common/index.js';
const handleKeydown = parent => event => {
  const target = event.target;
  const className = (target == null ? void 0 : target.nodeName) === "INPUT" ? "[type=radio]" : "[role=radio]";
  const radios = parent.$el.querySelectorAll(className);
  const length = radios.length;
  const index = [].indexOf.call(radios, target);
  const roleRadiosNodes = parent.$el.querySelectorAll("[role=radio]");
  switch (event.keyCode) {
    case KEY_CODE.ArrowDown:
    case KEY_CODE.ArrowRight:
      event.stopPropagation();
      event.preventDefault();
      if (index === length - 1) {
        roleRadiosNodes[0].click();
        roleRadiosNodes[0].focus();
      } else {
        roleRadiosNodes[index + 1].click();
        roleRadiosNodes[index + 1].focus();
      }
      break;
    case KEY_CODE.ArrowUp:
    case KEY_CODE.ArrowLeft:
      event.stopPropagation();
      event.preventDefault();
      if (index === 0) {
        roleRadiosNodes[length - 1].click();
        roleRadiosNodes[length - 1].focus();
      } else {
        roleRadiosNodes[index - 1].click();
        roleRadiosNodes[index - 1].focus();
      }
      break;
    default:
      break;
  }
};
const mounted = parent => () => {
  const radios = parent.$el.querySelectorAll("[type=radio]");
  const firstLabel = parent.$el.querySelectorAll("[role=radio]")[0];
  if (![].some.call(radios, radio => radio.checked) && firstLabel) {
    firstLabel.tabIndex = 0;
  }
};
export { handleKeydown, mounted };