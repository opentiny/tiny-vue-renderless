import helperCreateTreeFunc from './helperCreateTreeFunc'
import each from '../base/each'

const eachTreeItem = ({ parent, obj, iterate, context, path, node, parseChildren, opts }) => {
  each(obj, (item, index) => {
    const paths = path.concat([`${index}`])
    const nodes = node.concat([item])

    iterate.call(context, item, index, obj, paths, parent, nodes)

    if (item && parseChildren) {
      paths.push(parseChildren)
      eachTreeItem({
        item,
        obj: item[parseChildren],
        context,
        iterate,
        node: nodes,
        parseChildren,
        path: paths,
        opts
      })
    }
  })
}

const eachTree = helperCreateTreeFunc(eachTreeItem)

export default eachTree
