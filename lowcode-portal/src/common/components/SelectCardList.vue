<template>
  <div class="card-list">
    <div v-if="data.length" class="list">
      <div
        v-for="item in data"
        :key="item.id"
        :class="['list-item', { active: item.selected }]"
        @click="$emit('selectItem', item)"
      >
        <tiny-tooltip
          class="item"
          effect="light"
          :content="item.name?.zh_CN || item.label || item.name_cn || item.name"
          placement="bottom"
          :open-delay="500"
        >
          <div class="list-item-content">
            <div class="list-item-top">
              <img
                :src="item.image_url || item.screenshot || state.imgs[type] || state.imgs.default"
                alt=""
                class="item-img"
              />
              <div class="item-content">
                <div class="list-item-title">
                  <div class="item-title">
                    <p>{{ item.name?.zh_CN || item.label || item.name_cn || item.name || item.content?.fileName }}</p>
                    <span v-if="item.selected" class="version-select" @click.stop="toSelectVersion(item)">
                      {{ item.version }}
                      <IconChevronDown />
                    </span>
                  </div>
                </div>
                <p class="item-introduce">
                  <span>{{ item.framework }}</span
                  >{{ item.description || '暂无描述' }}
                </p>
              </div>
              <div class="item-icon">
                <tiny-checkbox :modelValue="item.selected"></tiny-checkbox>
              </div>
            </div>
          </div>
        </tiny-tooltip>
      </div>
    </div>
    <empty-data v-else name="empty"></empty-data>

    <version-list-dialog
      v-if="state.showVersionList"
      :showVersionList="state.showVersionList"
      :data="state.versionList"
      :selectData="state.selectData"
      @setVersion="setVersion"
      @cancel="state.showVersionList = false"
    ></version-list-dialog>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { IconChevronDown } from '@opentiny/vue-icon'
import { Tooltip, Checkbox } from '@opentiny/vue'
import VersionListDialog from './VersionListDialog'
import { fetchBlockDetail, fetchVersion } from '@/ecosystem/http'
import { EditorDefaultImgs } from '../constants/editorDefault.jsx'
import { TIMELINE_TYPES } from 'lowcode-design-controller/utils'
import EmptyData from './EmptyData.vue'

const { MATERIAL, BLOCKS, THEME, DSL, TOOLBAR, PLUGINS, APP_EXTEND } = TIMELINE_TYPES

export default {
  components: {
    VersionListDialog,
    TinyTooltip: Tooltip,
    TinyCheckbox: Checkbox,
    EmptyData,
    IconChevronDown: IconChevronDown()
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: ''
    },
    selected: {
      type: Boolean,
      default: false
    },
    isPageMock: {
      type: Boolean,
      default: false
    },
    timeActive: {
      type: Number,
      default: 0
    }
  },
  emits: ['selectItem', 'dragItem', 'setVersion'],
  setup(props, { emit }) {
    const logoUrl = `${import.meta.env.BASE_URL}img/logo.png`
    const versionSelectType = props.pageMock ? [] : [MATERIAL, BLOCKS]
    const versionType = props.pageMock ? [] : [THEME, DSL, TOOLBAR, PLUGINS, APP_EXTEND]
    const versionFunc = {
      [BLOCKS]: fetchBlockDetail,
      [MATERIAL]: fetchVersion
    }

    const state = reactive({
      imgs: EditorDefaultImgs,
      showVersionList: false,
      selectData: {},
      versionList: [],
      material_category_relations: ['aa', 'bb', 'cc', 'dd'],
      size: null,
      selectItem: {},
      timeActive: props.timeActive
    })

    const toSelectVersion = (item) => {
      state.showVersionList = true
      state.selectData = item

      if (item.versions?.length) {
        state.versionList = item.versions
      }

      if (versionSelectType.includes(props.type) && !item.versions?.length) {
        const params = item.id

        versionFunc[props.type](params).then((res) => {
          state.versionList = res.histories || res
        })
      }
    }

    const setVersion = (params) => {
      state.showVersionList = false

      emit('setVersion', params, props.type, state.timeActive)
    }

    const dragItem = (e) => {
      if (props.data.length > 1) {
        emit(
          'dragItem',
          props.data.map((item) => item.id)
        )
      }
    }

    return {
      state,
      logoUrl,
      versionSelectType,
      versionType,
      dragItem,
      toSelectVersion,
      setVersion
    }
  }
}
</script>

<style lang="less" scoped>
.card-list {
  overflow-x: hidden;
  display: flex;
  justify-content: center;
  height: 100%;
  overflow-y: auto;

  .list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    align-content: start;
  }
  .list-item {
    margin: 0 20px 20px 0;
    border: 1px solid #dfe1e6;
    border-radius: 6px;
    position: relative;
    &:hover {
      box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
    }
    &.active {
      background: #f2f5fc;
    }
  }
  @media (max-width: 1450px) {
    .list-item {
      width: calc((100% - 46px) / 3);
      &:nth-child(3n) {
        margin-right: 0;
      }
    }
  }
  @media screen and (min-width: 1450px) and (max-width: 1900px) {
    .list-item {
      width: calc((100% - 68px) / 4);
      &:nth-child(4n) {
        margin-right: 0;
      }
    }
  }
  @media (min-width: 1900px) {
    .list-item {
      width: calc((100% - 90px) / 5);
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
  .blue {
    color: #526ecc;
  }
  .list-item-content {
    flex: 1;
    padding: 6px;
    display: flex;
    flex-direction: column;
    position: relative;
    .list-item-top {
      // height: 74px;
      // display: flex;
    }
    .list-item-bottom {
      font-size: 12px;
      color: #adb0b8;
      padding-top: 6px;
      border-top: 1px solid #dfe1e6;
      .relation:last-child .point {
        display: none;
      }
      .point {
        padding: 12px 4px;
        font-size: 16px;
      }
    }
    .item-content {
      flex: 2;
      width: 100%;
      .list-item-title {
        display: flex;
        font-size: 14px;
        font-weight: 500;
        font-family: 'Microsoft YaHei', 'Microsoft YaHei-Bold';
        font-weight: bold;
        text-align: left;
        color: #252b3a;
        line-height: 26px;
        .item-title {
          display: flex;
          flex-wrap: nowrap;
          align-items: center;
          height: 26px;
          font-size: 18px;
          margin: 16px 0 8px 16px;
          // display: -webkit-box;

          // max-width: calc(100% - 28px);
          box-sizing: border-box;
          p {
            max-width: 185px;
            -webkit-box-orient: vertical;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          span {
            min-width: 43px;
            display: block;
            font-size: 12px;
            color: #191919;
            font-weight: normal;
            margin-left: 8px;
            .tiny-svg {
              margin-left: 4px;
            }
          }
          &.selected-title {
            max-width: calc(100% - 50px);
            margin-right: 4px;
          }
          &.material-block-title {
            -webkit-line-clamp: 1;
            max-width: calc(100% - 80px);
            margin-right: 4px;
          }
          .version-select {
            cursor: pointer;
          }
        }
        :deep(.tiny-input__inner) {
          height: 22px;
          padding-right: 22px;
          padding-left: 8px;
          border: 1px solid #adb0b8;
          font-family: Microsoft YaHei, Microsoft YaHei-Normal;
          color: #8a8e99;
        }
        :deep(.tiny-svg) {
          font-size: 12px;
          fill: #adb0b8;
        }
      }
      .item-introduce {
        height: 20px;
        width: 90%;
        font-size: 12px;
        font-family: 'Microsoft YaHei', 'Microsoft YaHei-Normal';
        font-weight: normal;
        text-align: left;
        color: #808080;
        line-height: 17px;
        margin-top: 2px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        span {
          width: 32px;
          height: 20px;
          background: rgba(71, 134, 37, 0.1);
          border-radius: 4px;
          font-size: 12px;
          color: #478625;
          margin: 0 18px 0 16px;
        }
      }
    }
    :deep(.tiny-select) {
      margin-top: 4px;
      margin-bottom: 4px;
      width: 100px !important;
    }
    .item-img {
      width: 100%;
      height: 145px;
    }
    .svg-drag {
      position: absolute;
      top: 8px;
      right: 5px;
      font-size: 18px;
    }
    .item-icon {
      position: absolute;
      top: 10px;
      right: 20px;
      font-size: 14px;
      color: #adb0b8;
      cursor: pointer;
      .icon-successful {
        color: #526ecc;
      }
    }
  }
  .list-item-footer {
    font-size: 12px;
    padding: 8px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .author,
    .date {
      height: 20px;
      font-size: 12px;
      font-family: 'Microsoft YaHei', 'Microsoft YaHei-Normal';
      font-weight: normal;
      text-align: left;
      color: #adb0b8;
      line-height: 20px;
    }
  }
  .version {
    font-size: 12px;
    margin-left: 8px;
  }
  .add {
    display: flex;
    justify-content: center;
    align-items: center;
    .tiny-svg {
      font-size: 96px;
      fill: #575d6c;
    }
  }
  .item-introduce {
    margin: 0;
  }
  .no-data-img {
    margin-top: 12px;
    width: 80px;
    height: 80px;
  }
}
</style>
