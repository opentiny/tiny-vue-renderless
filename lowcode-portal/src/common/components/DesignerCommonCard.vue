<template>
  <div class="card-list">
    <div v-if="data.length" :class="['list', layout]">
      <div
        v-for="item in data"
        :key="item.id"
        :class="['list-item', { active: item.selected }]"
        @click.prevent="$emit('selectItem', item)"
      >
        <span v-if="item.id === 251" class="recommend">推荐</span>
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
                    <div class="item-title-text">
                      {{ item.name?.zh_CN || item.label || item.name_cn || item.name || item.content?.fileName }}
                    </div>
                    <span
                      v-if="showVersion && item.selected"
                      class="version-select"
                      @click.stop="toSelectVersion(item)"
                    >
                      {{ item.version }}
                      <IconChevronDown />
                    </span>
                  </div>
                </div>
                <div class="item-introduce">
                  {{ item.name }}
                </div>
              </div>
              <svg-icon v-if="selected && dragList.includes(type)" name="dragger" class="svg-drag"></svg-icon>
              <div class="item-icon">
                <tiny-checkbox v-model="item.selected"></tiny-checkbox>
              </div>
            </div>
          </div>
        </tiny-tooltip>
      </div>
    </div>
    <empty-data v-else name="empty"></empty-data>
  </div>

  <version-list-dialog
    v-if="state.showVersionList"
    :showVersionList="state.showVersionList"
    :data="state.versionList"
    :selectData="state.selectData"
    @setVersion="setVersion"
    @cancel="state.showVersionList = false"
  ></version-list-dialog>
</template>

<script>
import { reactive } from 'vue'
import { Checkbox, Tooltip } from '@opentiny/vue'
import { EditorDefaultImgs } from '../constants/editorDefault.jsx'
import { TIMELINE_TYPES } from 'lowcode-design-controller/utils'
import VersionListDialog from './VersionListDialog'
import EmptyData from './EmptyData.vue'

const { MATERIAL, BLOCKS, THEME, DSL, TOOLBAR, PLUGINS, APP_EXTEND } = TIMELINE_TYPES

export default {
  components: {
    TinyCheckbox: Checkbox,
    TinyTooltip: Tooltip,
    EmptyData,
    VersionListDialog
  },
  inheritAttrs: false,
  props: {
    data: {
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
    selected: {
      type: Boolean,
      default: false
    },
    isPageMock: {
      type: Boolean,
      default: false
    },
    showVersion: {
      type: Boolean,
      default: false
    },
    imgStyle: {
      type: Object,
      default: () => {}
    },
    layout: {
      type: String,
      default: ''
    },
    thumbnailKey: {
      type: String,
      default: 'thumbnail'
    },
    defaultThumbnail: {
      type: String,
      default: ''
    },
    timeActive: {
      type: Number,
      default: 0
    }
  },
  emits: ['selectItem', 'setVersion'],
  setup(props, { emit }) {
    const logoUrl = `${import.meta.env.BASE_URL}img/logo.png`
    const versionSelectType = props.pageMock ? [] : [MATERIAL, BLOCKS]
    const versionType = props.pageMock ? [] : [THEME, DSL, TOOLBAR, PLUGINS, APP_EXTEND]
    const dragList = ['toolbar', 'plugins']
    const material = 'material_history'

    const state = reactive({
      imgs: EditorDefaultImgs,
      showVersionList: false,
      selectData: {},
      versionList: [],
      plugin: props.plugin,
      checked: false,
      timeActive: props.timeActive
    })

    const toSelectVersion = (item) => {
      state.showVersionList = true
      state.selectData = item

      if (item.versions?.length) {
        state.versionList = item.versions
      }
    }

    const setVersion = (params) => {
      state.showVersionList = false

      emit('setVersion', params, props.type, state.timeActive)
    }

    return {
      state,
      logoUrl,
      versionSelectType,
      versionType,
      setVersion,
      material,
      dragList,
      toSelectVersion
    }
  }
}
</script>

<style lang="less" scoped>
.card-list {
  display: flex;
  justify-content: center;
  width: 100%;
  overflow-y: auto;
  .list {
    width: 100%;
    display: grid;
    grid-gap: 20px;
  }
  .list-item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid #dfe1e6;
    border-radius: 6px;
    position: relative;
    .recommend {
      position: absolute;
      color: #ff8800;
      display: block;
      font-size: 12px;
      border-radius: 8px 0px 8px 0px;
      padding: 4px 10px;
      background: #fbf0e5;
    }
    &:hover {
      box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
    }
    &.active {
      background: #f2f5fc;
    }
  }
  .blue {
    color: #526ecc;
  }
  .list-item-content {
    flex: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
    position: relative;
    .list-item-top {
      display: flex;
      .item-img {
        width: 64px;
        height: 64px;
      }
    }
    .item-content {
      margin-left: 16px;
      flex: 1;
      .list-item-title {
        display: flex;
        .item-title {
          position: relative;
          height: 26px;
          font-size: 18px;
          display: flex;
          align-items: center;
          .item-title-text {
            display: inline-block;
            font-weight: bold;
            color: #252b3a;
            max-width: 110px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .version-select {
            cursor: pointer;
            font-size: 14px;
            color: #191919;
            margin-left: 8px;
            display: flex;
            align-items: center;
            .tiny-svg {
              margin-left: 2px;
            }
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
        width: 144px;
        font-size: 12px;
        color: #808080;
        margin-top: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .item-select-version {
        cursor: pointer;
        width: 48px;
        height: 17px;
        font-size: 12px;
        font-family: Microsoft YaHei, Microsoft YaHei-Normal;
        font-weight: normal;
        text-align: LEFT;
        color: #006ecc;
        margin-top: 2px;
      }
    }
    :deep(.tiny-select) {
      margin-top: 4px;
      margin-bottom: 4px;
      width: 100px !important;
    }
    .svg-drag {
      position: absolute;
      top: 8px;
      right: 5px;
      font-size: 18px;
    }
    .item-icon {
      position: absolute;
      top: 0px;
      right: 10px;
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
  .no-data-img {
    margin-top: 12px;
    width: 80px;
    height: 80px;
  }
}
.list-item-left {
  padding: 20px;
  margin-right: 48px;
  width: 260px;
  height: 720px;
  background: rgba(245, 245, 245, 0.8);
  border: 1px dashed #c2c2c2;
  border-radius: 8px;
  font-size: 14px;
  color: #333333;
  line-height: 20px;
  .title {
    p {
      margin: 0;
      font-size: 14px;
      color: #333333;
      span {
        font-size: 12px;
        color: #999999;
        margin-left: 14px;
      }
    }
  }
  .plugin-card {
    width: 220px;
    height: 400px;
    margin-top: 21px;
    .plugin-card-list {
      display: flex;
      flex-wrap: nowrap;
      width: 220px;
      height: 56px;
      align-items: center;
      background: #ffffff;
      box-shadow: 1px 1px 2px 0px rgba(181, 195, 208, 0.4);
      margin-bottom: 6px;
      border-radius: 8px;
      color: #191919;
      img {
        width: 40px;
        height: 40px;
        margin: 0 10px 0 12px;
      }
    }
  }
}

.list {
  @media (max-width: 1080px) {
    grid-template-columns: repeat(1, 1fr);
  }
  @media screen and (min-width: 1081) and (max-width: 1366px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (min-width: 1367px) and (max-width: 1660px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (min-width: 1661px) and (max-width: 1920px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (min-width: 1921px) {
    grid-template-columns: repeat(5, 1fr);
  }
}
.plugin-list-card {
  @media (max-width: 1366px) {
    grid-template-columns: repeat(1, 1fr);
  }
  @media screen and (min-width: 1361px) and (max-width: 1660px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (min-width: 1661px) and (max-width: 1920px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 1921px) {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
