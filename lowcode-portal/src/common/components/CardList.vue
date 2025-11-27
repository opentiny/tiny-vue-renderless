<template>
  <div class="card-list">
    <ul :class="['list', { listBorder: isMyMaterial }]">
      <li v-for="item in state.data" :key="item.id" :class="['list-item', { border: isMyMaterial }]">
        <div v-if="item.isOfficial" class="official-tag">
          <span v-if="item.tiny_reserved" class="tiny-official">
            <img :src="state.logoUrl" alt="" />
          </span>
          <span v-else class="tenant-official">官方</span>
        </div>
        <div
          v-if="!isBlock"
          :class="[
            'list-item-img',
            {
              'is-tiny-official': item.isOfficial && item.tiny_reserved,
              'is-official': item.isOfficial && !item.tiny_reserved
            }
          ]"
        >
          <img v-if="item.image_url" :src="item.image_url" alt="" :class="['item-img', { padding: isMyMaterial }]" />
          <card-relations :relations="item.material_category_relations || []" />
        </div>
        <div
          v-if="isBlock"
          :class="['list-item-img', { round: roundImg }]"
          :style="{ 'background-image': `url(${imgs.default})` }"
        >
          <div class="list-item-img-box">
            <tiny-image v-if="item.screenshot" :src="item.screenshot" fit="fill"></tiny-image>
          </div>
          <card-relations :relations="item.material_category_relations || []" />
        </div>
        <div :class="['list-item-content', { 'no-border': !item.img, material: isMyMaterial }]">
          <div :class="['item-content', { 'split-line': isMyMaterial }]">
            <div class="list-item-title">
              <tiny-tooltip class="item" effect="dark" :content="item.name_cn || item.name" placement="top-start">
                <span class="list-item-name">{{ item.name_cn || item.name }}</span>
              </tiny-tooltip>
              <span v-if="item.business_category" class="app-type">{{ item.business_category.name }}</span>
              <span v-if="!isBlock" class="framework">{{ item.framework === 'Html' ? 'HTML' : item.framework }}</span>
              <span v-if="item.version" class="version">{{ item.version }}</span>
            </div>
            <div class="item-introduce-wrap">
              <span v-if="item.framework" class="framework">{{
                item.framework === 'Html' ? 'HTML' : item.framework
              }}</span>
              <div class="item-introduce introduce">{{ item.description || '暂无描述' }}</div>
            </div>
          </div>
        </div>
        <div v-if="isMyAPlatform && item.moreAction?.length" class="list-item-footer">
          <div class="list-item-footer-left">
            <tiny-tooltip
              effect="light"
              content="编辑"
              placement="bottom"
              @click="$emit('clickMore', { item, action: { id: ACTION_ID.edit } })"
            >
              <svg-icon class="list-svg-icon" name="editor"></svg-icon>
            </tiny-tooltip>
            <tiny-tooltip
              effect="light"
              content="设置"
              placement="bottom"
              @click="$emit('clickMore', { item, action: { id: ACTION_ID.setting } })"
            >
              <svg-icon class="list-svg-icon" name="setting"></svg-icon>
            </tiny-tooltip>
            <tiny-tooltip
              effect="light"
              content="删除"
              placement="bottom"
              @click="$emit('clickMore', { item, action: { id: ACTION_ID.delete } })"
            >
              <svg-icon class="list-svg-icon" name="delete-application"></svg-icon>
            </tiny-tooltip>
          </div>
          <div
            v-if="item.moreAction.find((actionItem) => actionItem.id === ACTION_ID.create)"
            class="list-item-footer-right"
          >
            <tiny-popover placement="bottom" trigger="hover" :visible-arrow="false" append-to-body>
              <template #reference>
                <span>创建应用</span>
              </template>
              <div class="list-item-footer-right-popover">
                <div
                  style="margin-bottom: 12px"
                  @click="$emit('clickMore', { item, action: { id: ACTION_ID.create } })"
                >
                  <icon-add></icon-add>创建空白应用
                </div>
                <div @click="$emit('clickMore', { item, action: { id: ACTION_ID.createFromTemplate } })">
                  <icon-copy-solid></icon-copy-solid>从模板创建应用
                </div>
              </div>
            </tiny-popover>
          </div>
        </div>
        <div v-if="isMyMaterial && !isBlock" class="list-item-footer">
          <span v-if="item.createdBy?.username" class="author">{{ item.createdBy?.username }}</span>
          <check-more
            v-if="item.moreAction?.length > 1"
            :data="item.moreAction"
            @clickMore="$emit('clickMore', { item, action: $event })"
          ></check-more>
          <div
            v-if="item.moreAction?.length === 1"
            class="list-item-footer-action"
            @click="$emit('clickMore', { item, action: { id: ACTION_ID.check } })"
          >
            <component :is="item.moreAction[0].icon"></component>
            <span>{{ item.moreAction[0].content }}</span>
          </div>
        </div>
        <div v-if="isBlock" class="list-item-footer">
          <span v-if="item.createdBy?.username" class="author">{{ item.createdBy?.username }}</span>
          <check-more
            v-if="moreAction?.length > 1"
            :data="moreAction"
            @clickMore="$emit('clickMore', { item, action: $event })"
          ></check-more>
          <div
            v-if="moreAction?.length === 1"
            class="list-item-footer-action"
            @click="$emit('clickMore', { item, action: { id: ACTION_ID.check } })"
          >
            <component :is="moreAction[0].icon"></component>
            <span>{{ moreAction[0].content }}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive, watch } from 'vue'
import { format } from '@opentiny/vue-renderless/common/date'
import { Tooltip, Popover, Image } from '@opentiny/vue'
import { IconCopySolid } from '@opentiny/vue-icon'
import { useRoute } from 'vue-router'
import CheckMore from './CheckMore.vue'
import { ACTION_ID } from 'lowcode-design-controller/utils'
import { EditorDefaultImgs } from '../constants/editorDefault.jsx'
import CardRelations from './CardRelations.vue'

export default {
  components: {
    CheckMore,
    IconCopySolid: IconCopySolid(),
    TinyTooltip: Tooltip,
    TinyPopover: Popover,
    TinyImage: Image,
    CardRelations
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    height: {
      type: String,
      default: '120px'
    },
    type: {
      type: String,
      default: ''
    },
    isLevel: {
      type: Boolean,
      default: true
    },
    roundImg: {
      type: Boolean,
      default: true
    },
    moreAction: {
      type: Array,
      default: () => []
    },
    isBlock: {
      type: Boolean,
      default: false
    }
  },
  emits: ['clickMore'],
  setup(props, { emit }) {
    const route = useRoute()
    const routeName = route.name
    const isMyAPlatform = routeName === 'myPlatform'
    const isMyMaterial = routeName === 'ecosystemMaterial'

    const state = reactive({
      data: props.data,
      defaultImg: `${import.meta.env.BASE_URL}img/default.png`,
      logoUrl: `${import.meta.env.BASE_URL}img/logo.png`
    })

    const clickMore = (params) => {
      emit('clickMore', params)
    }

    const imgs = EditorDefaultImgs

    watch(
      () => props.data,
      (value) => {
        state.data = value
      }
    )

    return {
      state,
      ACTION_ID,
      isMyAPlatform,
      isMyMaterial,
      clickMore,
      format,
      imgs
    }
  }
}
</script>

<style lang="less" scoped>
.card-list {
  width: 100%;
  display: flex;
  justify-content: center;

  .list {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    position: relative;
  }
  @media (max-width: 1300px) {
    .listBorder {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media screen and (min-width: 1300px) and (max-width: 1700px) {
    .listBorder {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  @media (min-width: 1700px) {
    .listBorder {
      grid-template-columns: repeat(5, 1fr);
    }
  }

  .list-item {
    border-radius: 12px;
    height: 270px 0px rgba(181, 195, 208, 0.4);
    background: #ffffff;
    position: relative;
    filter: drop-shadow(rgba(0, 0, 0, 0.08) 1px 1px 2px);

    &.border {
      border: 1px solid rgba(0, 0, 0, 0.08);
      &:hover {
        box-shadow: none;
        border-radius: 8px;
      }
    }

    &:hover {
      filter: drop-shadow(rgba(0, 0, 0, 0.2) 2px 2px 6px);
    }

    .empty-item-foot {
      border-bottom: none;
    }

    .official-tag {
      position: absolute;
      right: 4px;
      top: 4px;
      z-index: 9;

      .tiny-official {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 24px;
        height: 24px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .tenant-official {
        background-color: #50d4ab;
        border-radius: 4px 0 4px 0;
        color: #fff;
        height: 22px;
        line-height: 22px;
        padding: 2px;
        font-size: 12px;
      }
    }

    .app-type {
      position: relative;
      top: -2px;
      width: auto;
      display: inline-block;
      margin-left: 4px;
      padding: 4px 8px;
      height: 20px;
      background: rgba(16, 117, 163, 0.1);
      border-radius: 4px;
      font-size: 12px;
      font-weight: normal;
      text-align: center;
      color: #1075a3;
      vertical-align: baseline;
    }
  }

  .list-item:hover .list-item-footer-right {
    border: 1px solid #191919;
    border-radius: 13px;
  }

  .list-item-title {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

    .list-item-name {
      font-size: 18px;
      line-height: 20px;
      color: #191919;
    }
  }

  .list-item-img {
    height: 160px;
    width: 100%;
    position: relative;
    border-radius: 8px 8px 0px 0px;
    overflow: hidden;

    &.round {
      border-radius: 10px 10px 0 0;
    }

    .list-item-img-box {
      padding: 10px 14%;
      box-sizing: border-box;
      width: 86%;
      height: 92%;
      overflow: hidden;

      .tiny-image {
        width: 250%;
      }
    }

    .item-img {
      width: 100%;
    }
  }

  .list-item-content {
    box-sizing: border-box;
    padding: 8px 16px 0 16px;
    height: auto;

    &.no-border {
      border-top: none;
    }

    .item-content {
      width: 100%;
      padding-bottom: 6px;

      &.split-line {
        border-bottom: 1px dashed #dfe1e6;
      }

      .list-item-title {
        width: 100%;
        height: 20px;
        font-size: 18px;
        font-weight: bold;
        text-align: left;
        color: #191919;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        margin-bottom: 8px;

        .list-item-name {
          max-width: 146px;
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          vertical-align: top;
        }

        .framework {
          color: #adb0b8;
          font-size: 12px;
          margin-left: 8px;
          font-weight: normal;
        }

        .version {
          display: inline-block;
          color: #595959;
          font-size: 12px;
          margin-left: 8px;
          font-weight: normal;
        }

        .tiny-svg-size {
          float: right;
          color: #adb0b8;
          margin-right: 4px;
        }
      }

      .item-introduce-wrap {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .framework {
          color: #478625;
          font-size: 12px;
          margin-right: 8px;
          font-weight: normal;
          padding: 3px 6px;
          border-radius: 4px;
          background-color: rgba(71, 134, 37, 0.1);
        }
      }

      .item-introduce {
        flex: 1;
        font-size: 12px;
        font-weight: normal;
        text-align: left;
        color: #999999;
        line-height: 18px;
        margin: 0;
        width: 92%;
        text-overflow: ellipsis;
        -webkit-line-clamp: 1;
        overflow: hidden;
        white-space: nowrap;
        -webkit-box-orient: vertical;

        &.introduce {
          width: 177px;
        }
      }
    }

    &.material {
      height: 58px;

      .item-introduce {
        -webkit-line-clamp: 1;
      }
    }
  }

  .list-item-footer {
    height: 24px;
    font-size: 12px;
    margin: 9px 0 11px 0;
    padding: 0px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .author,
    .date {
      height: 20px;
      font-size: 12px;
      font-weight: normal;
      text-align: left;
      color: #999999;
      line-height: 20px;
    }

    .list-item-footer-action {
      font-size: 12px;
      cursor: pointer;
      color: #191919;

      .tiny-svg {
        font-size: 14px;
        margin-right: 4px;
      }
    }
  }

  .list-item-footer-left {
    display: flex;
    align-items: center;

    .list-svg-icon {
      font-size: 16px;
      margin-right: 8px;
      color: #191919;
      cursor: pointer;
    }

    .tiny-svg {
      fill: #adb0b8;
      font-size: 14px;
      margin-right: 8px;
      cursor: pointer;
    }
  }

  .list-item-footer-right {
    display: flex;
    width: 80px;
    height: 24px;
    text-align: center;
    line-height: 24px;
    align-items: center;
    cursor: pointer;

    .create-design {
      width: 80px;
      height: 24px;
      font-size: 12px;
      color: #191919;
      line-height: 24px;
      text-align: center;
    }

    span {
      font-size: 12px;
      color: #191919;
      margin: auto;
    }

    .tiny-svg {
      font-size: 14px;
      fill: #526ecc;
      margin-right: 4px;
    }
  }
}

.list-item-footer-right-popover {
  padding: 12px;

  div {
    cursor: pointer;

    .tiny-svg {
      margin-right: 8px;
    }
  }
}
</style>
