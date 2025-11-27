import "../chunk-G2ADBYYC.js";
const filter = () => (value, data) => {
  if (!value)
    return true;
  return data.label.includes(value);
};
export {
  filter
};
