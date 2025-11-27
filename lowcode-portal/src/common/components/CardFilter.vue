<template>
  <div class="card-filters-toolbar">
    <div class="button-group">
      <tiny-button type="primary" @click="$emit('release')">
        {{ releaseButtonText }}
      </tiny-button>
    </div>
    <div class="material-header-search">
      <tiny-button-group v-model="state.checkedVal" :data="state.groupData" @click="toggleAll"></tiny-button-group>
      <tiny-select v-model="fetchState.sort" :options="sortOptions" @change="doFetch"> </tiny-select>
      <tiny-input v-if="isShowSearch" v-model="state.searchValue" placeholder="请输入关键字" @change="search">
        <template #suffix>
          <IconSearch></IconSearch>
        </template>
      </tiny-input>
    </div>
  </div>
  <div v-if="filters.length" class="card-filters">
    <div v-for="filter in state.filters" :key="filter.id" class="card-filters-item">
      <div class="card-filters-item-label">{{ filter.name }}</div>
      <div class="card-filters-item-value">
        <div
          v-for="item in filter.children"
          :key="item.name"
          :class="['card-filters-value-item', { selected: item.selected }]"
          @click="getFilters(filter.id, item)"
        >
          {{ item.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted } from 'vue'
import { Button, Input, Select, ButtonGroup } from '@opentiny/vue'
import { IconPlusCircle, IconSearch } from '@opentiny/vue-icon'
import { sortOptions, useFetchData } from 'lowcode-design-controller/utils'
import { fetchBlocks, fetchBlocksCount } from '../../ecosystem/http'

export default {
  components: {
    TinyInput: Input,
    TinySelect: Select,
    TinyButtonGroup: ButtonGroup,
    IconSearch: IconSearch(),
    TinyButton: Button
  },
  props: {
    filters: {
      type: Array,
      default: () => []
    },
    filterRes: {
      type: Object,
      default: () => ({})
    },
    selectOptions: {
      type: Array,
      default: () => []
    },
    isShowRelease: {
      type: Boolean,
      default: true
    },
    isShowFilter: {
      type: Boolean,
      default: true
    },
    isShowSearch: {
      type: Boolean,
      default: true
    },
    isShowSelect: {
      type: Boolean,
      default: true
    },
    releaseButtonText: {
      type: String,
      default: ' 发布组件'
    }
  },
  emits: ['search', 'filter', 'select', 'release', 'toggleAll'],
  setup(props, { emit }) {
    const arrowdownImg = `${import.meta.env.BASE_URL}img/arrowdown.png`

    const state = reactive({
      filters: props.filters,
      filterRes: props.filterRes,
      buttonText: '收起筛选',
      searchValue: '',
      selectValue: 'default',
      checkedVal: '1',
      groupData: [
        { text: '全部', value: '1' },
        { text: '我创建的', value: '2' }
      ]
    })
    const { fetchState, doFetch } = useFetchData({
      request: fetchBlocks,
      errorMsg: '获取区块列表失败',
      getCount: fetchBlocksCount
    })

    const getFilters = (id, item) => {
      item.selected = !item.selected

      state.filterRes[id] = state.filterRes[id] || []

      const value = item.value || item.label

      if (item.selected && !state.filterRes[id].includes(value)) {
        state.filterRes[id].push(value)
      }

      if (!item.selected && state.filterRes[id].includes(value)) {
        state.filterRes[id] = state.filterRes[id].filter((i) => i !== value)
      }

      emit('filter', state.filterRes)
    }

    const toggleAll = () => {
      emit('toggleAll', state.checkedVal !== '2')
    }

    const buttonClick = () => {
      state.filters = state.buttonText === '收起筛选' ? props.filters.slice(0, 1) : props.filters
      state.buttonText = state.buttonText === '收起筛选' ? '展开筛选' : '收起筛选'
    }

    const search = (value) => {
      emit('search', value)
    }

    onMounted(doFetch)

    return {
      state,
      IconPlusCircle: IconPlusCircle(),
      getFilters,
      buttonClick,
      arrowdownImg,
      search,
      sortOptions,
      fetchState,
      doFetch,
      toggleAll
    }
  }
}
</script>

<style lang="less" scoped>
.card-filters-toolbar {
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .button-group {
    display: flex;
    :deep(.tiny-button.tiny-button--primary) {
      width: 120px;
      height: 32px;
      background-color: #191919;
      border-radius: 16px;
      color: #fff;
    }
  }
  .filter-switch {
    margin-left: 12px;
    img {
      width: 10px;
    }
  }
  .material-header-search {
    display: flex;
    justify-content: space-between;
    align-items: center;
    right: 24px;
    top: 24px;

    :deep(.tiny-button-group) {
      .tiny-group-item {
        margin-right: 8px;
        border-radius: 6px;
        height: 32px;
        li,
        button {
          width: 108px;
          height: 32px;
          background-color: #f5f5f5;
          border: 0;
          &:hover {
            color: #191919;
          }
        }
        li.active button:not(.disabled) {
          width: 108px;
          height: 32px;
          background-color: #fff;
          border-radius: 6px;
          z-index: 1;
          color: #191919;
          border: 1px solid #191919;
          &:hover {
            color: #191919;
          }
        }
        li:not(:last-child) {
          margin: 0;
        }
      }
    }
    :deep(.tiny-input) {
      width: 310px;
      line-height: 32px;
      margin-left: 8px;
      .tiny-input__inner {
        height: 32px;
        height: 32px;
        font-size: 13px;
        color: #252b3a;
        border-radius: 6px;
      }
    }
  }
}
.card-filters {
  position: relative;
  padding: 20px;
  color: #d9d9d9;
  background-color: #f5f5f5;
  margin-top: 15px;
  border-radius: 4px;

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
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      align-items: center;
      font-size: 12px;

      .card-filters-value-item {
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 50px;
        max-width: 100px;
        height: 28px;
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
</style>
<style lang="less">
.material-header-search .tiny-select {
  width: 150px;
  margin: 0 8px 0 4px;
  .tiny-input.tiny-input-suffix {
    width: 100%;
  }
}
</style>
