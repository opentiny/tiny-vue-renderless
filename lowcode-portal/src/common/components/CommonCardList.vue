<template>
  <div class="card-list">
    <ul v-if="state.data.length" class="list">
      <li v-for="item in state.data" :key="item.id" class="list-item">
        <section :class="{ 'selected-item': state.selected?.id === item.id }" @click="clickFn(item)">
          <div :class="{ selected: state.selected?.id === item.id }">
            <div class="selected-icon"></div>
          </div>
          <slot :item="item"></slot>
        </section>
      </li>
    </ul>
    <ul v-if="!state.data.length">
      <li>
        <slot name="empty"></slot>
      </li>
    </ul>
  </div>
  <slot name="pager"></slot>
</template>

<script>
import { reactive, watch } from 'vue'

export default {
  components: {},
  props: {
    data: {
      type: Array,
      default: () => []
    },
    cols: {
      type: Number,
      default: () => 4
    }
  },
  emits: ['selected'],
  setup(props, { emit }) {
    const state = reactive({
      data: [],
      cols: 4,
      selected: null
    })

    watch(
      () => props.data,
      () => {
        if (props.cols) {
          state.data = props.data
        }
      }
    )

    watch(
      () => props.cols,
      () => {
        state.cols = props.cols
      }
    )

    const clickFn = (item) => {
      state.selected = item
      emit('selected', item)
    }

    return {
      state,
      clickFn
    }
  }
}
</script>

<style lang="less" scoped>
.card-list {
  width: 100%;
  .list {
    width: 100%;
    margin-bottom: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, calc((100% - 80px) / 5));
    gap: 20px;
    align-items: stretch;
    position: relative;
  }
  .list-item {
    border: 1px solid #dfe1e6;
    border-radius: 8px;
    cursor: pointer;
    position: relative;
    height: 118px;
    &:hover {
      box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
      border: 1px solid #191919;
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

    .selected-item {
      border: 1px solid var(--ti-common-color-dash-line-hover);
      border-radius: 8px;
    }

    .selected {
      position: absolute;
      top: 0;
      right: 0;
      width: 20px;
      height: 20px;
      background: url('@/svgs/assets/selected.svg') no-repeat;
    }
  }
  .list-item-title {
    font-weight: 500;
    font-size: 14px;
    margin-bottom: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .list-item-img {
    height: 120px;
    width: 100%;
    position: relative;
    .item-img {
      width: 100%;
      height: 100%;
    }
  }
  .list-item-content {
    box-sizing: border-box;
    padding: 12px;
    height: 88px;
    &.no-border {
      border-top: none;
    }
    .item-content {
      width: 100%;
      .list-item-title {
        width: 100%;
        height: 20px;
        font-size: 14px;
        font-family: 'Microsoft YaHei', 'Microsoft YaHei-Bold';
        font-weight: bold;
        text-align: left;
        color: #252b3a;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
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
          color: #adb0b8;
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
        align-items: end;
      }
      .item-introduce {
        font-size: 12px;
        font-family: 'Microsoft YaHei', 'Microsoft YaHei-Normal';
        font-weight: normal;
        text-align: left;
        color: #adb0b8;
        line-height: 18px;
        margin: 0;
        width: 92%;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        &.introduce {
          width: calc(100% - 92px);
        }
        &.date {
          width: 72px;
        }
      }
    }
    &.material {
      height: 68px;
      .item-introduce {
        -webkit-line-clamp: 1;
        &.introduce {
          width: 100%;
        }
      }
    }
  }
  .list-item-footer {
    height: 30px;
    font-size: 12px;
    padding: 8px 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #f1f2f3;
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
  .list-item-footer-left {
    display: flex;
    align-items: center;
    .tiny-svg {
      fill: #adb0b8;
      font-size: 14px;
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
      color: #526ecc;
    }
    .tiny-svg {
      font-size: 14px;
      fill: #526ecc;
      margin-right: 4px;
    }
  }
}
</style>
