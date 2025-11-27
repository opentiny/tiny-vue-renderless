<template>
  <div class="edit-page">
    <div class="edit-page-wrap">
      <div class="edit-left">
        <div class="edit-layout">
          <div>
            <div class="edit-layout-text">
              {{ title }}
              <tiny-button v-if="route.name === 'createMaterial'" type="text" @click="openDrawer">修改详情</tiny-button>
              <drawer-form
                v-if="route.name === 'createMaterial'"
                :isVisible="isVisible"
                @update:visible="isVisible = $event"
              ></drawer-form>
            </div>
            <tiny-alert
              class="edit-layout-content"
              type="info"
              description="默认已全选，您可点击每一步进行手动修改。"
            ></tiny-alert>
            <tiny-time-line
              class="edit-time-line"
              :data="timeLineData"
              type="timeline"
              vertical
              :active="state.timeActive"
              @click="timeClick"
            >
              <template #left="data">
                <span class="edit-time-stepIdx">
                  {{ data.slotScope.stepIdx }}
                </span>
              </template>
              <template #right="data">
                <div class="edit-time-line-box" @click="timeClick(data.slotScope.activeIdx)">
                  <span class="edit-time-name">
                    {{ data.slotScope.name }}
                  </span>
                  <span
                    v-if="selectDataAll?.[data.slotScope.type]?.length"
                    class="edit-time-num"
                    :title="getSelectedTitle(data.slotScope)"
                  >
                    已选{{ getSelectedTitle(data.slotScope) }}
                  </span>
                  <span v-else class="edit-time-num isDefault">
                    <icon-radioselected class="icon-radioselected"></icon-radioselected>
                    <span class="edit-time-num-text">未设置</span>
                  </span>
                </div>
              </template>
            </tiny-time-line>
          </div>
          <div v-if="timeLineData[state.timeActive].imgUrl" class="edit-layout-img">
            <div class="edit-layout-img-title">{{ timeLineData[state.timeActive].label }}示意图</div>
            <img :src="timeLineData[state.timeActive].imgUrl" alt="" class="item-img" />
          </div>
        </div>
      </div>
      <div class="edit-detail">
        <div v-if="type === 'material_history' && state.linkParams.materialType === 'link'">
          <tiny-row>
            <tiny-col :span="10">
              <tiny-input
                v-model="state.linkParams.link"
                placeholder="请输入物料资产包地址"
                @change="(value) => $emit('updateMaterial', 'link', value)"
              ></tiny-input>
            </tiny-col>
            <tiny-col :span="2">
              <tiny-checkbox
                v-model="state.linkParams.isOffline"
                @change="(value) => $emit('updateMaterial', 'isOffline', value)"
                >构建时下载物料资产包</tiny-checkbox
              >
            </tiny-col>
          </tiny-row>
          <tiny-row>
            <tiny-col :span="10">
              <p class="outlink-desc">
                您可以前往obs或其他存储平台复制物料资产包地址。当勾选构建时下载物料资产包时，会将链接中的物料资产包下载到设计器中，请确保物料资产包地址可以被乌兰201环境访问。
              </p>
            </tiny-col>
          </tiny-row>
        </div>
        <div v-else class="edit-detail-content">
          <component
            v-bind="timeLineData[timeActive]"
            :is="state.layoutComponentsMap[type]"
            :allData="allData"
            :timeLineData="timeLineData"
            :timeActive="timeActive"
            :data="data"
            :selectData="selectData"
            :type="type"
            :label="label"
            :searchGroup="state.searchGroup"
            :selectGroup="state.selectGroup"
            :isPageMock="state.isPageMock"
            :selectedAll="state.selectedAll"
            @select-item="selectItem"
            @set-version="setVersion"
            @drag-item="dragItem"
            @filter-all="filterAll"
            @get-filters="getFilters"
          >
            <template v-if="showCondition" v-slot:condition>
              <div class="edit-detail-content-condition">
                <tiny-checkbox v-if="showSelectAll" v-model="allSelected" @change="selectAll">全选</tiny-checkbox>
                <tiny-select
                  v-model="state.sortType"
                  class="create-time"
                  placeholder="按修改时间倒序"
                  :options="sortOptions"
                  @change="timeChange"
                >
                </tiny-select>
                <tiny-search
                  class="edit-detail-list-content-tool-search"
                  placeholder="请输入关键字"
                  :modelValue="state.searchValue"
                  @change="doSearch"
                ></tiny-search>
              </div>
            </template>
          </component>
          <tiny-pager
            layout="sizes, total, prev, pager, next"
            :current-page="state.currentPage"
            :total="total"
            :page-size="state.pageSize"
            :page-sizes="state.pageSizes"
            @size-change="sizeChange"
            @current-change="currentChange"
          ></tiny-pager>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { shallowRef, defineAsyncComponent, reactive, computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { TimeLine, Search, Pager, Input, Checkbox, Row, Col, Select, Option, Alert, Button } from '@opentiny/vue'
import { IconCueL, IconSearch, IconRadioselected } from '@opentiny/vue-icon'
import { TIMELINE_TYPES, sortOptions } from 'lowcode-design-controller/utils'
import SelectCardList from './SelectCardList'
import DesignerCommonCard from './DesignerCommonCard.vue'
import PluginCard from './PluginCard.vue'
import ToolCard from './ToolCard.vue'
import DrawerForm from './DrawerForm.vue'

const { COMPONENTS, COMPONENT_LIB, MATERIAL, BLOCKS, THEME, DSL, TOOLBAR, PLUGINS, APP_EXTEND } = TIMELINE_TYPES

export default {
  components: {
    SelectCardList,
    DesignerCommonCard,
    PluginCard,
    ToolCard,
    DrawerForm,
    TinyTimeLine: TimeLine,
    TinySearch: Search,
    TinyPager: Pager,
    TinyInput: Input,
    TinyCheckbox: Checkbox,
    TinyRow: Row,
    TinyCol: Col,
    TinySelect: Select,
    TinyOption: Option,
    TinyAlert: Alert,
    TinyButton: Button,
    IconCueL: IconCueL(),
    IconSearch: IconSearch(),
    IconRadioselected: IconRadioselected()
  },
  props: {
    title: {
      type: String,
      default: '构建可视化设计器'
    },
    timeLineData: {
      type: Array,
      default: () => []
    },
    timeActive: {
      type: Number,
      default: 0
    },
    allData: {
      type: Array,
      default: () => []
    },
    selectData: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    linkParams: {
      type: Object,
      default: {
        link: '',
        isOffline: true,
        materialType: 'platform'
      }
    },
    isPageMock: {
      type: Boolean,
      default: false
    },
    searchGroup: {
      type: Array,
      default: () => []
    },
    selectGroup: {
      type: Array,
      default: () => []
    },
    selectDataAll: {
      type: Object,
      default: () => {}
    }
  },
  emits: ['add', 'deleteItem', 'lineChange', 'dragItem', 'updateMaterial', 'selectAll', 'setVersion'],
  setup(props, { emit }) {
    const state = reactive({
      timeActive: props.timeActive,
      searchData: props.allData,
      allData: props.allData,
      searchValue: '',
      sortType: 'updateReverse',
      selectValue: 'default',
      pageSize: 12,
      pageSizes: [12, 24, 36],
      currentPage: 1,
      block: '区块',
      material: '物料资产包',
      initStatus: true,
      linkParams: props.linkParams,
      selectGroup: props.selectGroup,
      searchGroup: computed(() => props.searchGroup),
      selectStatus: true,
      selectMidSave: props.selectGroup,
      imgStyle: { height: '60px', width: '80px' },
      plugin: [],
      checked: false,
      pluginValue: '',
      timeValue: '',
      selectedAll: false,
      pageCaches: {},
      layoutComponentsMap: {
        [COMPONENTS]: shallowRef(defineAsyncComponent(() => import('./SelectComponents.vue'))),
        [COMPONENT_LIB]: shallowRef(defineAsyncComponent(() => import('./SelectComponents.vue'))),
        [BLOCKS]: shallowRef(defineAsyncComponent(() => import('./SelectBlocks.vue'))),
        [MATERIAL]: shallowRef(defineAsyncComponent(() => import('./SelectMaterial.vue'))),
        [THEME]: shallowRef(defineAsyncComponent(() => import('./SelectTheme.vue'))),
        [PLUGINS]: shallowRef(defineAsyncComponent(() => import('./SelectPlugins.vue'))),
        [TOOLBAR]: shallowRef(defineAsyncComponent(() => import('./SelectToolbar.vue'))),
        [DSL]: shallowRef(defineAsyncComponent(() => import('./SelectTheme.vue')))
      }
    })

    const route = useRoute()
    const isVisible = ref(false)
    const sortStep = [3, 4]
    const versionType = [MATERIAL, BLOCKS, THEME, DSL, TOOLBAR, PLUGINS, APP_EXTEND]
    const sortTypeMap = {
      updateReverse: 'updated_at',
      createReverse: 'created_at'
    }
    const allSelected = ref(false)
    const searchCache = new Map()

    const selectTitle = computed(() => `选择${props.timeLineData[props.timeActive].label}(单选)`)

    // 展示筛选区
    const showCondition = computed(() => ![THEME].includes(props.type))
    // 展示全选
    const showSelectAll = computed(() => [COMPONENTS, COMPONENT_LIB, BLOCKS, TOOLBAR, PLUGINS].includes(props.type))

    const filterData = computed(() =>
      props.allData.filter((item) => {
        const matchSearch = `${item.label} ${item.name_cn} ${item.name?.zh_CN} ${item.name} ${item.description}`
          .toLocaleLowerCase()
          .includes(state.searchValue.toLocaleLowerCase())
        const matchBusiness =
          props.type !== MATERIAL ||
          !state.selectGroup.length ||
          item.material_category_relations?.some((relation) => state.selectGroup.includes(relation.category))

        return matchSearch && matchBusiness
      })
    )

    const total = computed(() => filterData.value.length)

    const data = computed(() =>
      filterData.value
        .sort((a, b) => a.tiny_reserved - b.tiny_reserved)
        .sort((a, b) => b[sortTypeMap[state.sortType]]?.localeCompare(a[sortTypeMap[state.sortType]]))
        .sort((a, b) => b.isDefault - a.isDefault)
        .slice((state.currentPage - 1) * state.pageSize, state.currentPage * state.pageSize)
    )

    const refreshSearchCache = (searchValue) => {
      const type = props.type
      const newCache = { ...getSearchCache(type), ...searchValue }

      searchCache.set(type, newCache)
    }

    const getSearchCache = (type) => searchCache.get(type) || {}

    const openDrawer = () => {
      isVisible.value = true
    }

    const timeClick = (idx) => {
      if (state.timeActive === idx) return

      state.checked = false
      state.timeActive = idx
      state.currentPage = 1
      state.pageSize = state.pageCaches[state.timeActive] ?? state.pageSizes[0]
      state.searchValue = ''

      if (state.timeActive !== 0) {
        state.selectStatus = false
        state.selectGroup = []
      } else {
        state.selectStatus = true
        state.selectGroup = state.selectMidSave
      }

      emit('lineChange', idx)
    }

    const selectItem = (item) => {
      delete item.configure
      delete item.schema
      delete item.snippets

      if (item.noSug === false) {
        emit('add', item)
      } else {
        emit(!item.selected ? 'add' : 'deleteItem', item)
      }
    }

    const selectAll = (val) => {
      emit('selectAll', val, data.value)
    }

    const dragItem = (data) => {
      emit('dragItem', data)
    }

    const setVersion = (data, type, num) => {
      emit('setVersion', data, type, num)
    }

    const getFilters = (val) => {
      state.selectGroup = []
      state.searchGroup.forEach((item) => {
        if (val && item.id === val) {
          item.selected = !item.selected
        }
        if (item.selected) {
          state.selectGroup.push(item.id)
        }
      })
      state.selectedAll = state.selectGroup.length === state.searchGroup.length
    }

    const filterAll = () => {
      state.selectedAll = !state.selectedAll
      if (state.selectedAll) {
        state.searchGroup.forEach((item) => {
          item.selected = true
        })
      } else {
        state.searchGroup.forEach((item) => {
          item.selected = false
        })
      }
      getFilters(state.searchValue)
    }

    const timeChange = (value) => {
      refreshSearchCache({ sortType: value })
    }

    const doSearch = (key, value) => {
      refreshSearchCache({ searchKey: value })

      state.searchValue = value
    }

    const sizeChange = (val) => {
      state.pageCaches[state.timeActive] = val
      state.pageSize = val
    }

    const currentChange = (val) => {
      state.currentPage = val
    }

    const getSelectedTitle = (data) => {
      const { singleChoice, type } = data

      return singleChoice
        ? `【${
            props.selectDataAll[type][0]?.name_cn ||
            props.selectDataAll[type][0]?.name ||
            props.selectDataAll[type][0]?.label
          }】`
        : `${props.selectDataAll[type].length}个`
    }

    watch(
      () => props.type,
      (value) => {
        const { searchKey = state.searchValue, sortType = state.sortType } = getSearchCache(value)

        state.searchValue = searchKey
        state.sortType = sortType

        refreshSearchCache({ searchKey: state.searchValue, sortType: state.sortType })
      },
      {
        immediate: true
      }
    )

    return {
      state,
      allSelected,
      sortOptions,
      sortStep,
      versionType,
      selectTitle,
      filterData,
      data,
      total,
      route,
      isVisible,
      showCondition,
      showSelectAll,
      timeClick,
      selectItem,
      dragItem,
      sizeChange,
      currentChange,
      setVersion,
      selectAll,
      getFilters,
      filterAll,
      timeChange,
      doSearch,
      openDrawer,
      getSelectedTitle,
      IconRadioselected
    }
  }
}
</script>

<style lang="less" scoped>
.edit-page {
  width: 100%;
  height: calc(100% - 60px);
  padding: 24px 30px;
  box-sizing: border-box;
  .edit-page-wrap {
    width: 100%;
    height: 100%;
    display: flex;
    background-color: #f5f5f5;
  }
  .edit-left {
    flex: 1;
    border-right: 1px solid #ccc;
    position: relative;
    max-width: 300px;
    height: 100%;
    background-color: #fff;
    border-radius: 8px;
    box-sizing: border-box;
    margin-right: 20px;
    border: none;
    padding-top: 23px;
    .edit-layout {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px 48px;
      box-sizing: border-box;
      .edit-layout-text {
        font-size: 16px;
        font-family: Microsoft YaHei, Microsoft YaHei-Normal;
        font-weight: bold;
        text-align: left;
        color: #191919;
        line-height: 25px;
        margin-bottom: 16px;
        span {
          width: 48px;
          height: 20px;
          font-size: 12px;
          color: #1476ff;
          line-height: 20px;
          margin-left: 8px;
        }
      }
      .edit-layout-content {
        font-size: 14px;
        color: #191919;
        max-width: 260px;
        height: 58px;
        border-radius: 8px;
        margin-bottom: 20px;
        .tiny-svg {
          color: #1476ff;
          margin-right: 2px;
        }
      }
      .edit-time-line {
        width: 100%;
        height: auto;
        margin-left: 20px;
        :deep(.tiny-steps-timeline) {
          height: 100%;
          display: flex;
          flex-direction: column;
          .icon {
            width: 20px;
            height: 20px;
            left: 0px;
          }
          .edit-time-stepIdx {
            text-align: right;
            float: left;
            padding-right: 16px;
          }
          .edit-time-line-box {
            width: 150px;
            height: 56px;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            padding-left: 14px;
            .edit-time-num {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              margin-top: 4px;
              color: #999;
            }
          }
          .timeline {
            .line {
              width: 2px;
            }
            .date-time {
              width: 6%;
            }
          }
        }
      }
      .isDefault {
        color: rgb(242, 48, 48) !important;
        fill: rgb(242, 48, 48) !important;
        .icon-radioselected {
          margin-bottom: 4px;
        }
      }
      .edit-layout-img {
        width: 100%;
        height: 28%;
        .edit-layout-img-title {
          font-size: 12px;
          font-family: Microsoft YaHei, Microsoft YaHei-Normal;
          font-weight: normal;
          text-align: left;
          color: #191919;
          line-height: 22px;
        }
        .sub-title {
          font-size: 14px;
          max-width: 241px;
          color: #8a8e99;
          margin-bottom: 12px;
          font-family: Microsoft YaHei, Microsoft YaHei-Normal;
          font-weight: Normal;
        }
        .item-img {
          max-width: 260px;
          max-height: 172px;
          margin-top: 16px;
        }
      }
    }
  }
  .edit-detail {
    flex: 4;
    width: 76%;
    height: 100%;
    padding: 20px 20px 0 20px;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 8px;
    padding-top: 0;
    overflow: auto;

    .edit-detail-content {
      padding-top: 20px;
      display: flex;
      box-sizing: border-box;
      flex-direction: column;
      height: 100%;
      &-condition {
        display: flex;
        justify-content: flex-end;
        .create-time {
          width: 200px;
          margin: 0 20px;
        }
        .tiny-search {
          width: 200px;
        }
      }
      :deep(.edit-detail-list-content) {
        &-tool {
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-sizing: border-box;
          width: 100%;
          margin: 20px 0 14px;
          &-title {
            font-size: 14px;
            width: 500px;
            span {
              font-size: 14px;
              margin-left: 12px;
            }
          }
        }
        &-select {
          height: 62px;
          width: 100%;
          background: #f5f5f5;
          position: relative;
          display: flex;
          align-items: center;
          box-sizing: border-box;
          padding: 0 20px;
          border-radius: 4px;
          margin-bottom: 20px;
          .card-filters-item {
            display: flex;
            justify-content: start;
            &:not(:last-child) {
              margin-bottom: 12px;
            }

            .card-filters-item-label {
              min-width: 50px;
              margin-right: 24px;
              max-width: 100px;
              height: 24px;
              line-height: 24px;
              font-size: 12px;
              color: #999999;
            }

            .card-filters-item-value {
              display: flex;
              font-size: 12px;

              .card-filters-value-item {
                display: flex;
                justify-content: center;
                align-items: center;
                min-width: 50px;
                max-width: 100px;
                height: 24px;
                line-height: 24px;
                margin: 0 10px;
                color: #191919;
                cursor: pointer;
                &.selected {
                  border-radius: 4px;
                  color: #191919;
                  font-weight: bold;
                  background-color: rgba(89, 89, 89, 0.1);
                }

                &:hover {
                  border-radius: 6px;
                  color: #191919;
                }
              }
            }
          }
        }
        &-cardlist {
          position: relative;
          &-wrap {
            display: flex;
            align-items: center;
            margin: 12px 0;
          }
          &-icon {
            cursor: pointer;
          }
          &-line {
            display: inline-block;
            background: #000000;
            width: 1px;
            height: 16px;
            margin: 12px 10px;
            opacity: 0.3;
          }
          &-title {
            font-size: 16px;
            line-height: 24px;
            margin-left: 4px;
          }
          .plugin-list-change {
            width: 100%;
          }
          .list-change {
            float: right;
            display: flex;
            margin-bottom: 20px;
            .create-time {
              width: 200px;
              margin-left: 20px;
              .tiny-input__inner {
                width: 100%;
              }
            }
            .demo-input .tiny-input {
              width: 310px;
              margin-left: 20px;
            }
          }
        }

        .plugin-list {
          display: flex;
          overflow: hidden;
          max-height: 710px;
        }
      }
    }
    :deep(.tiny-pager) {
      margin: 30px 0;
      padding: 0;
    }

    :deep(.card-list) {
      width: 100%;
    }
    .outlink-desc {
      font-size: 12px;
      color: #8a8e99;
    }
  }
}
</style>
