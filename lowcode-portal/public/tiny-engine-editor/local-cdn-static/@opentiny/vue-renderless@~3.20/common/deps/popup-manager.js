import "../../chunk-G2ADBYYC.js";
import { KEY_CODE } from './../index.js';
import { addClass, removeClass, on } from './dom.js';
const isServer = typeof window === "undefined";
const instances = {};
const classes = {
  leave: "v-modal-leave",
  enter: "v-modal-enter",
  modal: "v-modal"
};
const removeStack = (modalStack, id) => {
  for (let i = modalStack.length - 1; i >= 0; i--) {
    if (modalStack[i].id === id) {
      modalStack.splice(i, 1);
      break;
    }
  }
};
let getModal;
const PopupManager = {
  step: 2,
  zIndex: 2e3,
  globalScroll: false,
  // 是否打开全局滚动监听
  modalFade: true,
  modalStack: [],
  modalDom: null,
  // 当前model挂载的div.
  hasModal: false,
  // 当前是否有Modal
  popLockClass: "popup-parent--hidden",
  oldBodyBorder: "",
  viewportWindow: null,
  fixBodyBorder() {
    const barWidth = window.innerWidth - document.documentElement.clientWidth;
    if (barWidth) {
      this.oldBodyBorder = document.documentElement.style.borderRight;
      document.body.style.borderRight = `${barWidth}px solid transparent`;
    }
  },
  resetBodyBorder() {
    document.body.style.borderRight = this.oldBodyBorder;
    this.oldBodyBorder = "";
  },
  /** 全局反注册 */
  deregister: id => {
    if (id) {
      instances[id] = null;
      delete instances[id];
    }
  },
  /** 返回全局实例 */
  getInstance: id => instances[id],
  /** 全局注册   仅vue-popup.ts中使用，instance就是vm, 把vm注册到 vm._popupId 这个键值上 */
  register: (id, instance) => {
    if (id && instance) {
      instances[id] = instance;
    }
  },
  nextZIndex: () => {
    const zIndex = PopupManager.zIndex;
    PopupManager.zIndex += PopupManager.step;
    return zIndex;
  },
  /** 打开遮罩层， 仅vue-popup.ts中使用。 dom = vm.$el 或者 undefined (appendtoBody时)  */
  openModal(id, zIndex, dom, modalClass, modalFade) {
    if (isServer) {
      return;
    }
    if (!id || zIndex === void 0) {
      return;
    }
    this.modalFade = modalFade;
    for (let i = 0, len = this.modalStack.length; i < len; i++) {
      const modal = this.modalStack[i];
      if (modal.id === id) {
        return;
      }
    }
    const modalDom = getModal();
    addClass(modalDom, classes.modal);
    if (this.modalFade && !PopupManager.hasModal) {
      addClass(modalDom, classes.enter);
    }
    if (modalClass) {
      const classArr = modalClass.trim().split(/\s+/);
      classArr.forEach(cls => addClass(modalDom, cls));
    }
    setTimeout(() => {
      removeClass(modalDom, classes.enter);
    }, 200);
    if (zIndex) {
      modalDom.style.zIndex = zIndex.toString();
    }
    modalDom.style.display = "";
    modalDom.tabIndex = 0;
    let parentNode;
    if (dom && dom.parentNode && dom.parentNode.nodeType !== 11) {
      parentNode = dom.parentNode;
    } else {
      parentNode = document.body;
    }
    parentNode.appendChild(modalDom);
    this.modalStack.push({
      id,
      zIndex,
      modalClass
    });
  },
  /** 点击背景遮罩层时，调用栈顶的popup，调用它的close() */
  doOnModalClick: () => {
    const modalStack = PopupManager.modalStack;
    const topPopup = modalStack[modalStack.length - 1];
    if (!topPopup) {
      return;
    }
    const instance = PopupManager.getInstance(topPopup.id);
    if (instance && instance.closeOnClickModal) {
      typeof instance.close === "function" && instance.close();
    }
  },
  closeModal(id) {
    const modalStack = this.modalStack;
    const modalDom = getModal();
    if (modalStack.length > 0) {
      const topPopup = modalStack[modalStack.length - 1];
      if (topPopup.id === id) {
        if (topPopup.modalClass) {
          const classArr = topPopup.modalClass.trim().split(/\s+/);
          classArr.forEach(cls => removeClass(modalDom, cls));
        }
        modalStack.pop();
        const stackSize = modalStack.length;
        if (stackSize > 0) {
          modalDom.style.zIndex = modalStack[stackSize - 1].zIndex.toString();
        }
      } else {
        removeStack(modalStack, id);
      }
    }
    if (modalStack.length === 0) {
      this.modalFade && addClass(modalDom, classes.leave);
      removeClass(document.body, this.popLockClass);
      this.resetBodyBorder();
      setTimeout(() => {
        if (modalStack.length === 0) {
          if (modalDom.parentNode) {
            modalDom.parentNode.removeChild(modalDom);
          }
          modalDom.style.display = "none";
          PopupManager.modalDom = null;
        }
        removeClass(modalDom, classes.leave);
      }, 200);
    }
  }
};
getModal = () => {
  if (isServer) {
    return null;
  }
  let modalDom = PopupManager.modalDom;
  if (modalDom) {
    PopupManager.hasModal = true;
  } else {
    PopupManager.hasModal = false;
    modalDom = document.createElement("div");
    PopupManager.modalDom = modalDom;
    modalDom.addEventListener("touchmove", event => {
      event.preventDefault();
      event.stopPropagation();
    }, {
      passive: true
    });
    on(modalDom, "click", () => {
      PopupManager.doOnModalClick();
    });
  }
  return modalDom;
};
if (!isServer) {
  on(window, "keydown", event => {
    if (event.keyCode === KEY_CODE.Escape) {
      const modalStack = PopupManager.modalStack;
      if (modalStack.length > 0) {
        const topPopup = modalStack[modalStack.length - 1];
        if (!topPopup) {
          return;
        }
        const topPopupVm = PopupManager.getInstance(topPopup.id);
        if (topPopupVm && topPopupVm.closeOnPressEscape) {
          if (topPopupVm.handleClose) {
            topPopupVm.handleClose("esc");
          } else if (topPopupVm.handleAction) {
            topPopupVm.handleAction("cancel");
          } else {
            topPopupVm.close();
          }
        }
      }
    }
  });
}
var popup_manager_default = PopupManager;
export { popup_manager_default as default };