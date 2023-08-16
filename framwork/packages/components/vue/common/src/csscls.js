/**
 * 简单合并 tailwind 类对象为字符串值
 *
 * @param cssClassObject tailwind 类对象
 * @returns string
 */
const stringifyCssClassObject = (cssClassObject) => {
  const allCssClass = []

  Object.keys(cssClassObject).forEach(
    (cssClass) => cssClassObject[cssClass] && allCssClass.push(cssClass)
  )

  return allCssClass.join('\u{20}')
}

/**
 * 简单合并 tailwind 类数组为字符串值
 *
 * @param cssClassArray tailwind 类数组
 * @returns string
 */
const stringifyCssClassArray = (cssClassArray) => {
  const allCssClass = []

  cssClassArray.forEach((cssClass) => {
    if (typeof cssClass === 'string') {
      allCssClass.push(cssClass)
    } else if (typeof cssClass === 'object') {
      allCssClass.push(stringifyCssClassObject(cssClass))
    }
  })

  return allCssClass.join('\u{20}')
}

/**
 * 简单合并 tailwind 类对象为字符串值，去重处理留给 tailwind-merge 处理
 *
 * @param {*} cssClasses tailwind 类集合
 * @returns string
 */
export const stringifyCssClass = (cssClasses) => {
  if (!cssClasses || (Array.isArray(cssClasses) && !cssClasses.length))
    return ''

  const allCssClass = []

  cssClasses.forEach((cssClass) => {
    if (cssClass) {
      if (typeof cssClass === 'string') {
        allCssClass.push(cssClass)
      } else if (Array.isArray(cssClass)) {
        allCssClass.push(stringifyCssClassArray(cssClass))
      } else if (typeof cssClass === 'object') {
        allCssClass.push(stringifyCssClassObject(cssClass))
      }
    }
  })

  return allCssClass.join('\u{20}')
}
