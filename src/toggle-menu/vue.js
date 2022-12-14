import {
  initData,
  computedPlaceholder,
  hideNodeText,
  filterNode,
  searchNodeText,
  nodeClick,
  nodeExpand,
  nodeCollapse,
  nodeDragEnd,
  nodeDragEnter,
  nodeDragLeave,
  nodeDragOver,
  nodeDragStart,
  nodeDrop,
  clickA
} from './index'
import { setMenuKey } from '@opentiny/vue-renderless/tree-menu'

export const api = [
  'state',
  'setMenuKey',
  'initData',
  'hideNodeText',
  'filterNode',
  'searchNodeText',
  'nodeClick',
  'nodeExpand',
  'nodeCollapse',
  'nodeDragEnd',
  'nodeDragEnter',
  'nodeDragLeave',
  'nodeDragOver',
  'nodeDragStart',
  'nodeDrop',
  'clickA'
]

export const renderless = (
  props,
  { reactive, watch, computed, onMounted },
  { t, service, nextTick, constants, emit, refs }
) => {
  const api = {}

  const state = reactive({
    datas: [],
    toggleIcon: true,
    showNode: true,
    filterText: '',
    placeholder: computed(() => api.computedPlaceholder())
  })

  service = service || { base: {} }
  service = {
    getMenuDataSync: props.getMenuDataSync || service.base.getMenuDataSync
  }

  Object.assign(api, {
    state,
    clickA,
    nodeDrop: nodeDrop(emit),
    filterNode: filterNode(props),
    nodeClick: nodeClick(emit),
    nodeExpand: nodeExpand(emit),
    nodeDragEnd: nodeDragEnd(emit),
    hideNodeText: hideNodeText(state),
    nodeDragOver: nodeDragOver(emit),
    nodeCollapse: nodeCollapse(emit),
    nodeDragStart: nodeDragStart(emit),
    nodeDragLeave: nodeDragLeave(emit),
    nodeDragEnter: nodeDragEnter(emit),
    searchNodeText: searchNodeText({ state, refs, nextTick }),
    computedPlaceholder: computedPlaceholder({ constants, props, t }),
    setMenuKey: setMenuKey(api),
    initData: initData({ state, props, service, api })
  })

  watch(
    () => state.filterText,
    (value) => {
      if (props.automaticFiltering) {
        nextTick(() => refs.tree.filter(value))
      }
    }
  )

  onMounted(api.initData)

  return api
}
