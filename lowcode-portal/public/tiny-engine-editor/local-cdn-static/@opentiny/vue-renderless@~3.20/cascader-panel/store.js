import "../chunk-G2ADBYYC.js";
import Node from './node.js';
import { valueEquals, coerceTruthyValueToArray as toArray } from './index.js';
const flatNodes = (data, leafOnly) => data.reduce((prev, node) => {
  if (node.isLeaf) {
    prev.push(node);
  } else {
    !leafOnly && prev.push(node);
    prev = prev.concat(flatNodes(node.children, leafOnly));
  }
  return prev;
}, []);
class Store {
  constructor(data, config) {
    this.config = config;
    this.initNodes(data);
  }
  getNodes() {
    return this.nodes;
  }
  initNodes(data) {
    data = toArray(data);
    this.nodes = data.map(nodeData => new Node(nodeData, this.config));
    this.flattedNodes = this.getFlattedNodes(false, false);
    this.leafNodes = this.getFlattedNodes(true, false);
  }
  /**
   * 添加节点到parentNode
   */
  appendNode(nodeData, parentNode) {
    const {
      config,
      nodes
    } = this;
    const node = new Node(nodeData, config, parentNode);
    const children = parentNode ? parentNode.children : nodes;
    children.push(node);
  }
  /**
   * 添加节点到parentNode
   */
  appendNodes(nodeDataList, parentNode) {
    nodeDataList = toArray(nodeDataList);
    nodeDataList.forEach(nodeData => this.appendNode(nodeData, parentNode));
  }
  /**
   * 获取节点值
   * @param leafOnly 只包含叶子节点
   * @param cached 取缓存（flattedNodes或者leafNodes）中的数据
   * @returns
   */
  getFlattedNodes(leafOnly, cached = true) {
    const {
      leafNodes,
      flattedNodes
    } = this;
    const cachedNodes = leafOnly ? leafNodes : flattedNodes;
    return cached ? cachedNodes : flatNodes(this.nodes, leafOnly);
  }
  /**
   * 通过节点值获取Node节点
   * @param value
   * @returns
   */
  getNodeByValue(value) {
    if (value) {
      const lazy = !this.config.lazy;
      const nodes = this.getFlattedNodes(false, lazy).filter(node => valueEquals(node.path, value) || node.value === value);
      return nodes && nodes.length ? nodes[0] : null;
    }
    return null;
  }
}
export { Store as default };