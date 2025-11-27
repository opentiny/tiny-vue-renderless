<template>
  <div class="app-center-card-list">
    <ul class="list" v-if="state.data.length" :style="{ ...calcStyles, cursor: 'normal' }">
      <li
        v-for="item in state.data"
        :key="item.id"
        :class="[
          'list-item',
          {
            selected: item.selected
          }
        ]"
        :style="{ cursor: calcStyles.cursor }"
        @click="$emit('select', item)"
      >
        <div class="list-item-img">
          <img v-if="item.image_url" :src="item.image_url" alt="" class="item-img" />
          <div v-if="item.framework" class="item-framework">{{ item.framework }}</div>
        </div>
        <tiny-tooltip effect="dark" :open-delay="500" :content="item.name" placement="top">
          <template #content>
            <div>
              <div>名称：{{ item.name }}</div>
              <div style="margin-top: 4px">描述：{{ item.description || '暂无描述' }}</div>
            </div>
          </template>
          <div class="list-item-content">
            <div class="item-content">
              <div
                :class="[
                  'list-item-title',
                  {
                    active: item.selected
                  }
                ]"
              >
                {{ item.name }}
              </div>
              <div class="list-item-des">{{ item.description || '暂无描述' }}</div>
            </div>
          </div>
        </tiny-tooltip>
      </li>
    </ul>
    <img v-else :src="defaultImg" alt="" style="margin-top: 40px" />
  </div>
</template>

<script>
import { reactive, watch, computed } from 'vue'
import { Tooltip } from '@opentiny/vue'

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
      default: '120px'
    }
  },
  emits: ['select'],
  setup(props) {
    const defaultImg = `${import.meta.env.BASE_URL}img/default.png`
    const state = reactive({
      data: props.data
    })

    const calcStyles = computed(() => {
      return {
        '--col': 2,
        '--size': props.height,
        cursor: 'pointer'
      }
    })

    watch(
      () => props.data,
      (value) => {
        state.data = value
      }
    )

    return {
      defaultImg,
      state,
      calcStyles
    }
  }
}
</script>

<style lang="less" scoped>
.app-center-card-list {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  .list {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, calc((100% - 20px) / var(--col)));
    gap: 16px;
    align-items: center;
    position: relative;
    justify-content: space-between;
  }
  .list-item {
    height: var(--size);
    border: 1px solid #dfe1e6;
    border-radius: 2px;
    position: relative;
    display: grid;
    grid-template-columns: var(--size) 1fr;
    transition: all 0.3s ease-in-out;
    &:hover {
      box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
      // transform: translateY(-2px);
    }
  }
  .selected {
    border: 2px solid #5e7ce0;
  }
  .list-item-img {
    height: var(--size);
    width: 100%;
    position: relative;
    padding: var(--padding, 0);
    padding-right: 0;
    box-sizing: border-box;
    border-radius: 3px;
    .item-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .item-framework {
      height: 22px;
      line-height: 22px;
      position: absolute;
      top: 2px;
      right: 2px;
      padding: 0 6px;
      background: rgba(119, 122, 131, 0.6);
      border-top-left-radius: 6px;
      border-bottom-right-radius: 6px;
      color: #fff;
    }
  }
  .list-item-content {
    display: flex;
    flex-direction: column;
    .item-content {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-left: 12px;
      margin-right: 10px;
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
      }
      .active {
        color: #5e7ce0;
      }
      .list-item-des {
        font-size: 12px;
        color: #adb0b8;
        line-height: 18px;
        margin-top: 8px;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
    .list-item-footer {
      height: 30px;
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
  }
}
</style>
