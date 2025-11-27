<template>
  <div class="app-center-card-list">
    <ul class="list" :style="{ ...calcStyles, cursor: 'normal' }">
      <li
        v-for="item in state.data"
        :key="item.id"
        :class="['list-item', { active: isMyApplication && item.moreAction?.length }]"
      >
        <div class="list-item-top">
          <div class="list-item-img">
            <img v-if="item.image_url" :src="item.image_url" alt="" class="item-img" />
          </div>
          <div class="list-item-desc">
            <div class="list-item-title" :title="item.name">{{ item.name }}</div>
            <div class="list-item-stack">
              <div v-if="item.framework" class="item-framework">{{ item.framework }}</div>
              <div class="list-item-des">{{ item.description || '暂无描述' }}</div>
            </div>
            <div v-if="item.platform?.name" class="list-item-descript">归属{{ item.platform?.name }}</div>
          </div>
        </div>
        <div v-if="isMyApplication && item.moreAction?.length" class="line"></div>
        <div v-if="isMyApplication && item.moreAction?.length" class="list-item-footer">
          <div class="list-item-footer-left">
            <tiny-tooltip
              v-if="isInternalEnv()"
              class="item"
              effect="light"
              content="预览"
              placement="bottom"
              @click="$emit('clickMore', { item, action: { id: ACTION_ID.preview } })"
            >
              <svg-icon class="list-svg-icon" name="preview"></svg-icon>
            </tiny-tooltip>
            <tiny-tooltip class="item" effect="light" content="设置" placement="bottom" @click="setApplication(item)">
              <svg-icon class="list-svg-icon" name="setting"></svg-icon>
            </tiny-tooltip>
            <tiny-tooltip
              class="item"
              effect="light"
              content="删除"
              placement="bottom"
              @click="$emit('clickMore', { item, action: { id: ACTION_ID.delete } })"
            >
              <svg-icon class="list-svg-icon" name="delete-application"></svg-icon>
            </tiny-tooltip>
          </div>
          <div
            v-if="isMoreAction(item)"
            class="list-item-footer-right"
            @click="$emit('clickMore', { item, action: { id: ACTION_ID.develop } })"
          >
            <span>开发应用</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Tooltip } from '@opentiny/vue'
import { SESSION_STORAGE, ACTION_ID } from 'lowcode-design-controller/utils'
import { isInternalEnv } from '@/utils/env'

export default {
  components: {
    TinyTooltip: Tooltip
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    height: {
      type: String,
      default: '164px'
    },
    isMyApplication: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const router = useRouter()
    const state = reactive({
      data: props.data
    })

    watch(
      () => props.data,
      (value) => {
        state.data = value
      }
    )
    const handleClick = (app, isMyApplication) => {
      if (isMyApplication) {
        return
      }
      if (app.visit_url) {
        window.open(app.visit_url)

        return
      }
      window.open(`${import.meta.env.BASE_URL}html/app-default.html`)
    }
    const setApplication = (item) => {
      sessionStorage.setItem(SESSION_STORAGE.appSetting, JSON.stringify(item))

      router.push({
        path: '/application-setting'
      })
    }
    const isMoreAction = (value) => {
      return value.moreAction.some((actionItem) => actionItem.id === ACTION_ID.develop)
    }

    const calcStyles = computed(() => {
      return {
        '--col': 4,
        '--size': props.height,
        cursor: 'pointer'
      }
    })

    return {
      state,
      calcStyles,
      ACTION_ID,
      handleClick,
      isInternalEnv,
      setApplication,
      isMoreAction
    }
  }
}
</script>

<style lang="less" scoped>
.app-center-card-list {
  width: 100%;

  .list {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, calc((100% - 80px) / var(--col)));
    gap: 20px;
    align-items: center;
    position: relative;
    justify-content: space-between;
  }

  .list-item {
    height: 128px;
    box-sizing: border-box;
    border-radius: 8px;
    background-color: #ffffff;
    position: relative;
    display: flex;
    flex: 1;
    flex-direction: column;
    box-shadow: 1px 1px 3px 0 rgba(181, 195, 208, 0.4);

    &:hover {
      box-shadow: 4px 4px 10px 0 rgba(181, 195, 208, 0.7);
    }

    &.active {
      width: 310px;
      height: 164px;
    }
  }

  .list-item-top {
    display: flex;
    flex: 1;
    align-items: center;

    .list-item-img {
      height: 80px;
      width: 80px;
      margin: 20px 14px 16px 20px;

      .item-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 4px;
      }
    }

    .list-item-desc {
      flex: 1;
      padding-right: 16px;
      width: 180px;

      .list-item-title {
        width: 100%;
        line-height: 24px;
        font-size: 18px;
        font-family: 'Microsoft YaHei', 'Microsoft YaHei-Bold';
        font-weight: bold;
        text-align: left;
        color: #191919;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }

      .list-item-stack {
        display: flex;
        align-items: center;
        margin: 8px 0;
        box-sizing: border-box;

        .item-framework {
          height: 20px;
          line-height: 20px;
          font-size: 12px;
          padding: 0 5px;
          color: #478625;
          background: rgba(71, 134, 37, 0.1);
          border-radius: 4px;
          margin-right: 8px;
        }

        .list-item-des {
          font-size: 12px;
          color: #999999;
          height: 20px;
          line-height: 20px;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }

      .list-item-descript {
        font-size: 12px;
        color: #8a8e99;
        line-height: 18px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }

  .line {
    width: 267px;
    border-top: 1px dashed #dfe1e6;
    margin-left: 20px;
    height: 1px;
  }

  .list-item-footer {
    height: 42px;
    font-size: 12px;
    padding: 0 20px;
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

    .list-item-footer-left {
      display: flex;
      align-items: center;

      .list-svg-icon {
        font-size: 16px;
        margin-right: 8px;
        cursor: pointer;
      }
    }

    .list-item-footer-right {
      display: flex;
      align-items: center;
      cursor: pointer;

      span {
        font-size: 12px;
        line-height: 24px;
        width: 80px;
        color: #191919;
        text-align: center;
      }

      &:hover {
        border: 1px solid #191919;
        border-radius: 12px;
      }
    }
  }
}
</style>
