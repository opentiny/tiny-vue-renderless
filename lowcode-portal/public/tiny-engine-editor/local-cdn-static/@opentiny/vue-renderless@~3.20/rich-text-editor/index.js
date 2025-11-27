import "../chunk-G2ADBYYC.js";
const handleChange = (editor) => {
  return (event) => {
    if (!event) {
      const url = window.prompt("URL");
      let type2 = "image";
      const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg"];
      const videoExtensions = ["mp4", "avi", "mov", "wmv", "mpeg", "3gp", "mkv"];
      const imageRegex = new RegExp(`\\.(${imageExtensions.join("|")})$`, "i");
      const videoRegex = new RegExp(`\\.(${videoExtensions.join("|")})$`, "i");
      if (imageRegex.test(url)) {
        type2 = "image";
      } else if (videoRegex.test(url)) {
        type2 = "video";
      }
      if (url) {
        editor.chain().focus().setImage({ src: url, type: type2 }).run();
      }
      return;
    }
    const file = event.target.files[0];
    if (!file)
      return;
    let type = "image";
    if (file == null ? void 0 : file.type.match("image.*")) {
      type = "image";
    } else if (file == null ? void 0 : file.type.match("video.*")) {
      type = "video";
    }
    const reader = new FileReader();
    reader.onload = function(e) {
      var _a;
      editor.chain().focus().setImage({ src: (_a = e.target) == null ? void 0 : _a.result, type }).run();
    };
    reader.readAsDataURL(file);
  };
};
const setLink = (editor) => {
  return () => {
    const previousUrl = editor.getAttributes("link").href;
    if (previousUrl) {
      editor.chain().focus().toggleMark("link").run();
      return;
    }
    const url = window.prompt("URL", previousUrl);
    if (url === null) {
      return;
    }
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };
};
const tableMouseMove = (state, vm) => (e) => {
  let { x, y } = vm.$refs.tablePanelRef[0].getBoundingClientRect();
  state.flagX = Math.ceil((e.x - x) / 30);
  state.flagY = Math.ceil((e.y - y) / 30);
};
const tableChoose = (state) => () => {
  if (state.flagX && state.flagY) {
    state.editor.chain().focus().insertTable({ rows: state.flagY, cols: state.flagX, withHeaderRow: true }).run();
  }
  state.isShowTable = false;
};
const toggleTablePanel = (state) => () => {
  state.isShowTable = !state.isShowTable;
};
const closeTablePanel = (state) => () => {
  state.isShowTable && (state.isShowTable = false);
};
const shouldShow = ({ editor }) => {
  return editor.isActive("table");
};
const eventMap = /* @__PURE__ */ new Map();
eventMap.set("bold", (editor) => {
  editor.chain().focus().toggleBold().run();
});
eventMap.set("italic", (editor) => {
  editor.chain().focus().toggleItalic().run();
});
eventMap.set("link", (editor) => {
  setLink(editor)();
});
eventMap.set("unlink", (editor) => {
  editor.chain().focus().unsetLink().run();
});
eventMap.set("highlight", (editor) => {
  editor.chain().focus().toggleHighlight().run();
});
eventMap.set("underline", (editor) => {
  editor.chain().focus().toggleUnderline().run();
});
eventMap.set("strike", (editor) => {
  editor.chain().focus().toggleStrike().run();
});
eventMap.set("subscript", (editor) => {
  editor.chain().focus().toggleSubscript().run();
});
eventMap.set("superscript", (editor) => {
  editor.chain().focus().toggleSuperscript().run();
});
eventMap.set("code", (editor) => {
  editor.chain().focus().toggleCode().run();
});
eventMap.set("unorderedlist", (editor) => {
  editor.chain().focus().toggleBulletList().run();
});
eventMap.set("orderedlist", (editor) => {
  editor.chain().focus().toggleOrderedList().run();
});
eventMap.set("taskList", (editor) => {
  editor.chain().focus().toggleTaskList().run();
});
eventMap.set("quote", (editor) => {
  editor.chain().focus().toggleBlockquote().run();
});
eventMap.set("codeBlock", (editor) => {
  editor.chain().focus().toggleCodeBlock().run();
});
eventMap.set("formatClear", (editor) => {
  editor.chain().focus().unsetAllMarks().run();
});
eventMap.set("nodeDelete", (editor) => {
  editor.chain().focus().clearNodes().run();
});
eventMap.set("undo", (editor) => {
  editor.chain().focus().undo().run();
});
eventMap.set("redo", (editor) => {
  editor.chain().focus().redo().run();
});
eventMap.set("left", (editor) => {
  editor.chain().focus().setTextAlign("left").run();
});
eventMap.set("center", (editor) => {
  editor.chain().focus().setTextAlign("center").run();
});
eventMap.set("right", (editor) => {
  editor.chain().focus().setTextAlign("right").run();
});
const eventClick = (editor, item) => {
  if (typeof item === "string") {
    eventMap.get(item)(editor);
  } else {
    eventMap.get(item.name)(editor);
  }
};
const imgMap = /* @__PURE__ */ new Map();
imgMap.set("bold", "TinyIconRichTextBold");
imgMap.set("italic", "TinyIconRichTextItalic");
imgMap.set("link", "TinyIconRichTextLink");
imgMap.set("unlink", "TinyIconRichTextLinkUnlink");
imgMap.set("highlight", "TinyIconRichTextHighLight");
imgMap.set("underline", "TinyIconRichTextUnderline");
imgMap.set("strike", "TinyIconRichTextStrikeThrough");
imgMap.set("subscript", "TinyIconRichTextSubscript");
imgMap.set("superscript", "TinyIconRichTextSuperscript");
imgMap.set("code", "TinyIconRichTextCodeView");
imgMap.set("unorderedlist", "TinyIconRichTextListUnordered");
imgMap.set("orderedlist", "TinyIconRichTextListOrdered");
imgMap.set("taskList", "TinyIconRichTextTaskList");
imgMap.set("quote", "TinyIconRichTextQuoteText");
imgMap.set("codeBlock", "TinyIconRichTextCodeBlock");
imgMap.set("formatClear", "TinyIconRichTextFormatClear");
imgMap.set("nodeDelete", "TinyIconRichTextNodeDelete");
imgMap.set("undo", "TinyIconRichTextUndo");
imgMap.set("redo", "TinyIconRichTextRedo");
imgMap.set("left", "TinyIconRichTextAlignLeft");
imgMap.set("center", "TinyIconRichTextAlignCenter");
imgMap.set("right", "TinyIconRichTextAlignRight");
const eventImg = (item) => {
  if (typeof item === "string") {
    return imgMap.get(item);
  } else if (item.img) {
    return item.img;
  } else {
    return imgMap.get(item.name);
  }
};
const Active = (item) => {
  let result = "";
  if (item.name) {
    switch (item.name) {
      case "unlink":
        result = "link";
        break;
      case "left":
        result = { textAlign: "left" };
        break;
      case "center":
        result = { textAlign: "center" };
        break;
      case "right":
        result = { textAlign: "right" };
        break;
      default:
        result = item.name;
        break;
    }
  } else {
    switch (item) {
      case "unlink":
        result = "link";
        break;
      case "left":
        result = { textAlign: "left" };
        break;
      case "center":
        result = { textAlign: "center" };
        break;
      case "right":
        result = { textAlign: "right" };
        break;
      default:
        result = item;
        break;
    }
  }
  return result;
};
export {
  Active,
  closeTablePanel,
  eventClick,
  eventImg,
  handleChange,
  setLink,
  shouldShow,
  tableChoose,
  tableMouseMove,
  toggleTablePanel
};
