/**
 * 判断input输入对象是否为数字类型。
 * isNumber(369) // true
 * isNumber('') // false
 */
export const isNumber = (value: any) => parseFloat(value).toString() !== 'NaN'
