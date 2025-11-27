<template>
  <slot name="header"></slot>
  <ul v-if="state.data.length" class="material-card-list">
    <li
      v-for="item in state.data"
      :key="item.id"
      :class="['list-item', { leveling: isleveling, 'is-block': item.content?.componentName === 'Block' }]"
    >
      <div v-if="item.isOfficial" class="official-tag">
        <span v-if="item.tiny_reserved" class="tiny-official">
          <img :src="state.logoUrl" alt="" />
        </span>
        <span v-else class="tenant-official">官方</span>
      </div>
      <div class="list-item-top">
        <div
          :class="['list-item-img', { round: roundImg }]"
          :style="{
            'background-image': `url(${item.image_url || item.screenshot || imgs[type] || imgs.default})`,
            'background-size': `${item.screenshot ? 'contain' : 'cover'}`
          }"
        >
          <tiny-image v-if="isleveling" :src="item.image_url || item.screenshot || imgs[type] || imgs.default" />
        </div>
        <div class="list-item-content">
          <div style="display: flex">
            <div class="list-item-title">
              <tiny-tooltip
                class="item"
                effect="dark"
                :content="item.name_cn || item.label || item.name?.zh_CN || item.name"
                placement="top-start"
              >
                <span class="list-item-name">{{ item.name_cn || item.label || item.name?.zh_CN || item.name }}</span>
              </tiny-tooltip>
            </div>
            <span v-if="item.version" class="list-item-version">{{ item.version }}</span>
          </div>
          <div class="list-item-description">
            <span v-if="item.configure?.framework || item.framework" class="list-item-framework">
              {{ item.configure?.framework || item.framework }} </span
            >{{ item.description || '暂无描述' }}
          </div>
        </div>
      </div>

      <div class="list-item-footer">
        <span class="list-item-footer-author">{{ item.createdBy?.username || '' }}</span>
        <check-more
          v-if="moreAction.length > 1"
          :data="moreAction"
          @clickMore="$emit('clickMore', { item, action: $event })"
        ></check-more>
        <div
          v-else-if="moreAction[0]"
          class="list-item-footer-action"
          @click="$emit('clickMore', { item, action: { id: ACTION_ID.check } })"
        >
          <component :is="moreAction[0].icon"></component>
          <span>{{ moreAction[0].content }}</span>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import { reactive, watch } from 'vue'
import { Image, Tooltip } from '@opentiny/vue'
import { format } from '@opentiny/vue-renderless/common/date'
import { ACTION_ID } from 'lowcode-design-controller/utils'
import CheckMore from './CheckMore.vue'
import { EditorDefaultImgs } from '../constants/editorDefault.jsx'

export default {
  components: {
    CheckMore,
    TinyImage: Image,
    TinyTooltip: Tooltip
  },
  props: {
    type: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      default: []
    },
    isleveling: {
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
    }
  },
  emits: ['clickMore'],
  setup(props) {
    const state = reactive({
      data: props.data,
      logoUrl: `${import.meta.env.BASE_URL}img/logo.png`
    })

    const imgs = EditorDefaultImgs

    watch(
      () => props.data,
      (value) => {
        state.data = value
      }
    )

    return {
      state,
      imgs,
      ACTION_ID,
      format
    }
  }
}
</script>

<style lang="less" scoped>
.material-card-list {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, calc((100% - 86px) / 5));
  gap: 20px;
  align-items: center;
  position: relative;
  min-height: 140px;
  margin: 10px 0;
  .list-item {
    border: 1px solid #fff;
    border-radius: 8px;
    box-shadow: 1px 1px 2px 0px rgba(181, 195, 208, 0.4);
    box-sizing: border-box;
    cursor: pointer;
    position: relative;

    .tiny-svg {
      font-size: 96px;
      fill: #575d6c;
    }
    .official-tag {
      position: absolute;
      right: 10px;
      top: 10px;
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
        height: 20px;
        line-height: 20px;
        padding: 2px;
        font-size: 12px;
      }
    }
    .list-item-top {
      height: 98px;
      display: flex;
      .list-item-img {
        height: 50px;
        border-radius: 12px;
        overflow: hidden;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        background-size: contain;
        background-repeat: no-repeat;
        &.round {
          border-radius: 4px 4px 0 0;
        }
        .tiny-image {
          width: inherit;
          img {
            width: inherit;
          }
        }
      }

      .list-item-content {
        width: 70%;
        padding: 8px 16px;
        box-sizing: border-box;

        .list-item-title {
          width: 65%;
          margin-left: 5px;
          font-weight: bold;
          font-size: 18px;
          line-height: 24px;
          color: #191919;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          margin-bottom: 6px;
        }
        .list-item-version {
          font-size: 12px;
          color: #595959;
          margin-left: 4px;
          margin-top: 4px;
          font-weight: normal;
          line-height: 18px;
        }
        .list-item-description {
          color: #999999;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 12px;
          line-height: 18px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          word-break: break-all;
          margin-left: 3px;
          .list-item-framework {
            color: rgba(71, 134, 37, 1);
            background-color: rgba(71, 134, 37, 0.1);
            font-size: 12px;
            height: 16px;
            line-height: 16px;
            font-weight: normal;
            border-radius: 4px;
            padding: 1px 6px;
            margin-right: 3px;
          }
        }
      }
    }
    .list-item-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      height: 40px;
      width: 84%;
      margin-left: 20px;
      color: #adb0b8;
      .footer-buttons {
        .separator {
          margin: 0 4px;
        }
      }
      .list-item-footer-author {
        font-size: 12px;
        color: #999999;
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

    &.leveling {
      .list-item-top {
        display: flex;
        padding: 20px;
        box-sizing: border-box;
        .list-item-img {
          width: 52px;
          height: 52px;
          margin-right: 20px;
          background: url(/img/background1.png) no-repeat center center contain;
          &.media {
            width: 64px;
            height: 64px;
          }
          &.round {
            border-radius: 26%;
          }

          .tiny-image {
            width: 100%;
            height: 100%;
            img {
              width: inherit;
            }
          }
        }
        .list-item-content {
          padding: 0;
          flex: 1;
        }
      }

      .list-item-footer {
        border-top: 1px dashed #dfe1e6;
        box-sizing: border-box;
        margin-top: 0;
      }
    }
    &:hover {
      box-shadow: 4px 4px 6px 0px rgba(181, 195, 208, 0.7);

      .list-item-title {
        color: #5e7ce0;
      }

      .list-item-footer {
        :deep(.more-icon) {
          background-color: rgba(118, 147, 245, 0.2);
          width: 28px;
          height: 27px;
          .tiny-svg {
            fill: #5e7ce0;
          }
        }
      }
    }
  }

  .list-item-add {
    text-align: center;
    box-sizing: border-box;
    width: 311px;

    .blue {
      color: #526ecc;
      margin-top: 20px;
    }
    &.leveling {
      padding: 10px;
      .blue {
        margin-top: 0px;
      }
    }
  }
}
.no-data {
  text-align: center;
  box-sizing: border-box;
  padding: 10%;
  width: 100%;
  height: 100%;
  .no-data-img {
    width: 140px;
    height: 140px;
  }
  .no-data-text {
    height: 30px;
    line-height: 30px;
    color: rgb(179, 179, 179);
  }
}
</style>
