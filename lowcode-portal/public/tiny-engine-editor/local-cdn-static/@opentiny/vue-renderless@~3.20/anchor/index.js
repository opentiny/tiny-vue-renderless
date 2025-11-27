import "../chunk-G2ADBYYC.js";
import { addClass, removeClass } from './../common/deps/dom.js';
const getEleMentBySelect = (parent, selector) => (selector == null ? void 0 : selector.startsWith("#")) ? document.getElementById(selector.slice(1)) : parent.querySelector(selector);
const setFixAnchor = ({
  vm,
  props
}) => () => {
  const {
    anchorWrapRef
  } = vm.$refs;
  if (anchorWrapRef && props.isAffix) {
    const {
      top
    } = anchorWrapRef.getBoundingClientRect();
    anchorWrapRef.style.top = `${top}px`;
  }
};
const setMarkClass = ({
  state,
  props
}) => {
  const {
    scrollContainer
  } = state;
  const {
    markClass
  } = props;
  const activeContentEl = getEleMentBySelect(scrollContainer, `${state.currentLink}`);
  if (markClass) {
    addClass(activeContentEl, markClass);
    setTimeout(() => {
      removeClass(activeContentEl, markClass);
    }, 1e3);
  }
};
const setScrollContainer = ({
  state,
  api
}) => (cb = null) => {
  const currentContainer = api.getContainer();
  const {
    scrollContainer
  } = state;
  if (scrollContainer !== currentContainer) {
    state.scrollContainer = currentContainer;
    cb && cb();
  }
};
const updateSkidPosition = ({
  vm,
  state,
  emit
}) => {
  const {
    currentLink
  } = state;
  const activeEl = vm.$refs[currentLink];
  const {
    skidRef,
    maskRef,
    anchorRef
  } = vm.$refs;
  if (!activeEl) {
    return;
  }
  emit("change", currentLink);
  emit("onChange", currentLink);
  if (!anchorRef || !skidRef || !maskRef) {
    return;
  }
  const {
    offsetHeight,
    offsetWidth
  } = activeEl;
  const {
    top: linkTitleClientTop,
    left: linkTitleClientLeft
  } = activeEl.getBoundingClientRect();
  const {
    top: anchorClientTop,
    left: anchorClientLeft
  } = anchorRef.getBoundingClientRect();
  const offsetTop = linkTitleClientTop - anchorClientTop;
  const offsetLeft = linkTitleClientLeft - anchorClientLeft;
  addClass(skidRef, "tiny-anchor-orbit-skid--active");
  skidRef.style.transform = `translateY(${offsetTop}px)`;
  skidRef.style.height = `${offsetHeight}px`;
  if (maskRef) {
    maskRef.style.transform = `translateY(${offsetTop}px)`;
    maskRef.style.height = `${offsetHeight}px`;
    maskRef.style.maxWidth = `${offsetWidth + offsetLeft}px`;
  }
};
const getCurrentAnchor = ({
  vm,
  state,
  emit
}) => link => {
  if (state.currentLink === link || state.isScroll) {
    return;
  }
  state.currentLink = link;
  updateSkidPosition({
    vm,
    state,
    emit
  });
};
const addObserver = ({
  props,
  state
}) => {
  const {
    links
  } = props;
  const {
    intersectionObserver,
    expandLink
  } = state;
  const observer = list => {
    list.forEach(item => {
      const link = item.link;
      expandLink[link] = item;
      const linkEl = getEleMentBySelect(document, link);
      linkEl && intersectionObserver.observe(linkEl);
      if (item.children) {
        observer(item.children);
      }
    });
  };
  observer(links);
};
const setCurrentHash = ({
  state
}) => {
  if (state.currentHash !== location.hash) {
    state.currentHash = location.hash;
    return true;
  }
  return false;
};
const handleScroll = state => () => {
  clearTimeout(state.scrollTimer);
  state.scrollTimer = window.setTimeout(() => {
    state.isScroll = false;
    clearTimeout(state.scrollTimer);
  }, 200);
};
const setChildOffsetTop = ({
  state,
  props
}) => {
  var _a, _b;
  if (!((_a = props.links) == null ? void 0 : _a.length)) {
    return;
  }
  state.childOffsetTop = ((_b = getEleMentBySelect(document, props.links[0].link)) == null ? void 0 : _b.offsetTop) || 0;
};
const getContainer = ({
  props
}) => () => props.containerId && getEleMentBySelect(document, props.containerId) || document.body;
const mounted = ({
  state,
  api,
  props,
  nextTick
}) => () => {
  nextTick(() => {
    api.setScrollContainer();
    api.setFixAnchor();
    api.onItersectionObserver();
    setCurrentHash({
      state
    });
    setChildOffsetTop({
      state,
      props
    });
  });
};
const updated = ({
  api
}) => () => {
  const cb = api.onItersectionObserver;
  api.setScrollContainer(cb);
};
const unmounted = ({
  state,
  api
}) => () => {
  const {
    intersectionObserver
  } = state;
  intersectionObserver.disconnect();
  if (state.scrollContainer) {
    state.scrollContainer.removeEventListener("scroll", api.handleScroll());
  }
};
const onItersectionObserver = ({
  state,
  props,
  api,
  vm,
  emit
}) => () => {
  const {
    expandLink,
    scrollContainer,
    childOffsetTop
  } = state;
  const {
    offsetTop
  } = props;
  state.currentLink && updateSkidPosition({
    vm,
    state,
    emit
  });
  const rootMargin = offsetTop ? `${-offsetTop}px 0px 0px 0px` : "";
  state.intersectionObserver = new IntersectionObserver(entries => {
    const {
      top
    } = scrollContainer.getBoundingClientRect();
    const scrollStartTop = top + childOffsetTop + offsetTop;
    entries.forEach(item => {
      const key = item.target.id;
      state.observerLinks[key] = item;
    });
    if (state.currentHash !== location.hash) {
      state.currentHash = location.hash;
      state.currentLink = state.currentHash;
      updateSkidPosition({
        vm,
        state,
        emit
      });
      return;
    }
    if (state.isScroll) {
      api.handleScroll();
      return;
    }
    for (let key in state.observerLinks) {
      if (Object.prototype.hasOwnProperty.call(state.observerLinks, key)) {
        const item = state.observerLinks[key];
        if (item.isIntersecting && item.intersectionRatio >= 0 && item.target.getBoundingClientRect().top <= scrollStartTop) {
          const link = `#${item.target.id}`;
          if (!expandLink[link].children) {
            api.getCurrentAnchor(link);
            break;
          } else {
            api.getCurrentAnchor(link);
          }
        }
      }
    }
  }, {
    root: scrollContainer,
    threshold: [0, 0.25, 0.5, 1],
    rootMargin
  });
  addObserver({
    props,
    state
  });
};
const linkClick = ({
  state,
  vm,
  emit,
  props,
  api
}) => (e, item) => {
  state.isScroll = true;
  const {
    link,
    title
  } = item;
  const emitLink = {
    link,
    title
  };
  emit("linkClick", e, emitLink);
  const isChangeHash = setCurrentHash({
    state
  });
  const {
    scrollContainer
  } = state;
  state.currentLink = link;
  updateSkidPosition({
    vm,
    state,
    emit
  });
  setMarkClass({
    state,
    props
  });
  if (scrollContainer && scrollContainer !== document.body && !isChangeHash) {
    const linkEl = getEleMentBySelect(scrollContainer, item.link);
    const top = (linkEl == null ? void 0 : linkEl.getBoundingClientRect().top) - scrollContainer.getBoundingClientRect().top + scrollContainer.scrollTop - props.offsetTop;
    const param = {
      top,
      left: 0,
      behavior: "smooth"
    };
    scrollContainer == null ? void 0 : scrollContainer.scrollTo(param);
    scrollContainer == null ? void 0 : scrollContainer.addEventListener("scroll", api.handleScroll());
  }
};
export { getContainer, getCurrentAnchor, handleScroll, linkClick, mounted, onItersectionObserver, setFixAnchor, setScrollContainer, unmounted, updated };