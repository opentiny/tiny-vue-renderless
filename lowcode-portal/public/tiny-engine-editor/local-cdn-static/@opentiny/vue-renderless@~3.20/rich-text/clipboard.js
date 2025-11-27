import "../chunk-G2ADBYYC.js";
let selectors = [];
let doms = [];
let scrolls = [];
function backup() {
  doms.push(window);
  scrolls.push({ left: window.pageXOffset, top: window.pageYOffset });
  selectors.forEach((selector) => {
    const dom = document.querySelector(`.${selector}`);
    if (dom) {
      doms.push(dom);
      scrolls.push({ left: dom.scrollLeft, top: dom.scrollTop });
    }
  });
}
function restore() {
  doms.forEach((dom, i) => dom.scrollTo(scrolls[i]));
  doms = [];
  scrolls = [];
}
function registerCustomClipboard(Quill, keepClass) {
  const Clipboard = Quill.import("modules/clipboard");
  const Delta = Quill.import("delta");
  if (typeof keepClass === "string") {
    selectors.push(keepClass);
  } else if (Array.isArray(keepClass)) {
    selectors = keepClass.slice(0);
  }
  class CustomClipboard extends Clipboard {
    onPaste(e) {
      backup();
      if (e.defaultPrevented || !this.quill.isEnabled())
        return;
      const range = this.quill.getSelection();
      let delta = new Delta().retain(range.index);
      const scrollTop = this.quill.scrollingContainer.scrollTop;
      this.container.focus();
      this.quill.selection.update(Quill.sources.SILENT);
      setTimeout(() => {
        delta = delta.concat(this.convert()).delete(range.length);
        this.quill.updateContents(delta, Quill.sources.USER);
        this.quill.setSelection(delta.length() - range.length, Quill.sources.SILENT);
        this.quill.scrollingContainer.scrollTop = scrollTop;
        this.quill.focus();
        restore();
      }, 1);
    }
  }
  Quill.register("modules/clipboard", CustomClipboard, true);
}
var clipboard_default = registerCustomClipboard;
export {
  clipboard_default as default
};
