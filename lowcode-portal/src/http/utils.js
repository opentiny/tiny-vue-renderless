import { state } from './state'

const updateMaterial = ({
  componentLib: componentLibArray,
  user_components: componentArray,
  user_blocks: blockArray,
  public_scope_tenants: tenantArray
}) => {
  const componentLibs = []
  const userComponents = []
  const userBlocks = []

  let publicScopeTenants = []

  if (componentLibArray) {
    componentLibArray.forEach((userItem) => {
      const lib = state.componentLibrary?.find((item) => item.id === userItem)

      lib && componentLibs.push(lib)
    })
  }
  if (componentArray) {
    componentArray.forEach((userItem) => {
      const component = state.components?.find((componentItem) => componentItem.id === userItem)

      component && userComponents.push(component)
    })
  }
  if (blockArray) {
    blockArray.forEach((userItem) => {
      const block = state.blocks?.find(
        (blockItem) => blockItem.current_history === userItem || blockItem.id === userItem
      )

      block && userBlocks.push(block)
    })
  }
  if (tenantArray?.length) {
    publicScopeTenants = tenantArray.map((item) => ({ id: item }))
  }

  return {
    componentLibs,
    userComponents,
    userBlocks,
    publicScopeTenants
  }
}

function sortByTime(source, sortRule) {
  const [sort, direction] = sortRule.split(':')

  return source.sort((a, b) => {
    const dateA = Date.parse(new Date(a[sort]))
    const dateB = Date.parse(new Date(b[sort]))

    if (dateA > dateB) {
      return direction === 'DESC' ? -1 : 1
    } else if (dateA < dateB) {
      return direction === 'DESC' ? 1 : -1
    } else {
      return 0
    }
  })
}

function search(source, keys, searchContent) {
  if (!searchContent) {
    return source
  }

  const searchText = searchContent.toLowerCase()

  return source.filter((item) => {
    const matchStr = keys.reduce((pre, cur) => `${pre} ${item[cur]}`, '')

    return matchStr.includes(searchText)
  })
}

export { updateMaterial, sortByTime, search }
