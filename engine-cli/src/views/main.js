/**
 * Copyright (c) 2023 - present TinyEngine Authors.
 * Copyright (c) 2023 - present Huawei Cloud Computing Technologies Co., Ltd.
 *
 * Use of this source code is governed by an MIT-style license.
 *
 * THE OPEN SOURCE SOFTWARE IN THIS PRODUCT IS DISTRIBUTED IN THE HOPE THAT IT WILL BE USEFUL,
 * BUT WITHOUT ANY WARRANTY, WITHOUT EVEN THE IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS FOR
 * A PARTICULAR PURPOSE. SEE THE APPLICABLE LICENSES FOR MORE DETAILS.
 *
 */

function mergeTree(data) {
  const result = [] // 记录最终的树
  const rows = initData(data) // 将每一行转换成数组
  const row0 = rows[0] // 第一行数据
  // 记录 source tree和 target tree
  const sourceTree = []
  const targetTree = []
  for (let i = 1; i < rows.length - 2; i++) {
    const sortedRow = [rows[i][0]].concat(sortArr(rows[i].slice(1)))
    if (i >= parseInt(row0[0]) && i <= parseInt(row0[1])) {
      sourceTree.push(sortedRow)
    }
    if (i >= parseInt(row0[2]) && i <= parseInt(row0[3])) {
      targetTree.push(sortedRow)
    }
  }
  const sourceNode = rows[row0[4]].slice(-1)[0]
  const targetNode = rows[row0[5]].slice(-1)[0]
  const sourceIndex = sourceTree.findIndex((row) => row[0] == sourceNode)
  const targetIndex = targetTree.findIndex((row) => row[0] == targetNode)
  // 如果没有target子树，直接返回source树
  if (targetIndex < 0) {
    return transArr(sourceTree)
  }
  // 将target的子树合并过去
  else {
    // 新增兄弟节点
    const subSource = sourceIndex < 0 ? [] : sourceTree[sourceIndex].slice(1)
    const subTarget = targetTree[targetIndex].slice(1)
    if (sourceIndex > -1) {
      sourceTree[sourceIndex] = [sourceNode].concat(sortArr(subSource.concat(subTarget)))
    } else {
      sourceTree.push([sourceNode].concat(subTarget))
    }

    // 新增子树
    const addTree = targetTree.filter((r) => subTarget.indexOf(r[0]) > -1)
    if (addTree.length) {
      sourceTree.splice(sourceIndex + 1, 0, ...addTree)
    }
    return transArr(sourceTree)
  }
  return transArr(sourceTree)
}
