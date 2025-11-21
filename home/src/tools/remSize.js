/**
 * 计算并设置html的font-size
 * @param
 * @returns
 */

const $recal = () => {
  const docElement = document.documentElement || document.body;
  const clientWidth = docElement.clientWidth;
  const designWidth = 1280; // 设计稿中心内容宽度  1280px
  if (clientWidth >= 1024) {
    docElement.style.fontSize = (clientWidth / designWidth) * 100 + 'px';
  } else {
    docElement.style.fontSize = clientWidth / 10 + 'px';
  }
};

export { $recal };
