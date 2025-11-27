export function triggerDownload(fileName, url) {
  // 创建一个<a>标签，后面利用a标签的download属性来下载文件
  let link = document.createElement('a')

  link.download = `${fileName}`
  link.href = url
  link.style.display = 'none'
  link.target = '_blank'
  link.click()
}
