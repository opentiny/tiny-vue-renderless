import "../chunk-G2ADBYYC.js";
const change = (emit) => () => {
  emit("change");
};
function getSizeStr({ props, state }) {
  state.sizeStr = `${props.size}px`;
  const maxIconSize = props.size * 0.3;
  if (props.iconSize > maxIconSize) {
    state.iconSizeStr = `${maxIconSize}px`;
  } else {
    state.iconSizeStr = `${props.iconSize}px`;
  }
}
function getQrCodeCanvas({ props, vm, QRCode }) {
  const container = vm.$refs.wrapperRef;
  const qrcodeRef = vm.$refs.qrcodeRef;
  const defaultPadding = (container == null ? void 0 : container.style.padding) || "12px";
  const errorCorrectionLevel = props.level && props.level[0] || "M";
  const qrCodeData = {
    errorCorrectionLevel,
    type: "image/png",
    width: props.size - getCssLength(defaultPadding) * 2,
    margin: 0,
    small: true,
    color: {
      dark: props.color,
      light: "#ffffff00"
      // 背景设为透明改用外框设定背景色
    }
  };
  QRCode.toCanvas(qrcodeRef, props.value, qrCodeData);
}
function setIconBackground({ vm, state }) {
  const container = vm.$refs.wrapperRef;
  if (container == null ? void 0 : container.style.backgroundColor) {
    state.iconBackgroudColor = container == null ? void 0 : container.style.backgroundColor;
  }
}
function getCssLength(style) {
  return style ? Number(style.replace("px", "")) : 0;
}
const draw = ({ props, state, vm, QRCode }) => () => {
  getSizeStr({ props, state });
  getQrCodeCanvas({ props, vm, QRCode });
  setIconBackground({ vm, state });
};
export {
  change,
  draw,
  getCssLength,
  getQrCodeCanvas,
  getSizeStr,
  setIconBackground
};
