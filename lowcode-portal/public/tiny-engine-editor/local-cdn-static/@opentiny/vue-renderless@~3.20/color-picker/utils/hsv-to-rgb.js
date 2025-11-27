import "../../chunk-G2ADBYYC.js";
const splitPart = (value, regExp) => {
  return value.replace(regExp, "").split(/\s|,/g).filter((v) => v).map((val, idx) => {
    return idx > 2 ? Number.parseFloat(val) : Number.parseInt(val, 10);
  });
};
const parseHSV = (value) => {
  const parts = splitPart(value, /hsva|hsv|\(|\)/gm);
  if (parts.length >= 3) {
    return hsv2rgb({
      h: parts[0],
      s: parts[1],
      v: parts[2]
    });
  }
  return { r: 0, g: 0, b: 0 };
};
const isString = (val) => typeof val === "string";
const isOnePointZero = (n) => {
  return isString(n) && n.includes(".") && Number.parseFloat(n) === 1;
};
const isPercentage = (n) => {
  return isString(n) && n.includes("%");
};
const normalized = (value, max) => {
  if (isOnePointZero(value))
    value = "100%";
  const processPercent = isPercentage(value);
  value = Math.min(max, Math.max(0, Number.parseFloat(`${value}`)));
  if (processPercent) {
    value = Number.parseInt(`${value * max}`, 10) / 100;
  }
  if (Math.abs(value - max) < 1e-6) {
    return 1;
  }
  return value % max / Number.parseFloat(max);
};
const hsv2rgb = ({ h, s, v }) => {
  h = normalized(h, 360) * 6;
  s = normalized(s, 100);
  v = normalized(v, 100);
  const i = Math.floor(h);
  const f = h - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  const mod = i % 6;
  const r = [v, q, p, p, t, v][mod];
  const g = [t, v, v, q, p, p][mod];
  const b = [p, p, t, v, v, q][mod];
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
};
export {
  parseHSV
};
