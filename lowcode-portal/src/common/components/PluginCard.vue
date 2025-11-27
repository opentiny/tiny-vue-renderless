<template>
  <div class="list-item-left">
    <div class="title">
      <p>插件栏 <span>鼠标拖动调整顺序</span></p>
    </div>
    <div class="plugin-card">
      <div class="plugin-top">
        <draggable :list="state.topPlugin" class="plugin-top-content" @change="dragItem">
          <transition-group name="plugins">
            <div v-for="item in state.topPlugin" :key="item.id" class="plugin-card-list">
              <img :src="item.image_url || item.screenshot || defaultImg" alt="" />
              <p>{{ item.name_cn || item.name }}</p>
              <svg-icon name="move"></svg-icon>
            </div>
          </transition-group>
        </draggable>
      </div>
      <div class="plugin-bottom">
        <draggable :list="state.belowPlugin" class="plugin-bottom-content" @change="dragItem">
          <transition-group name="plugins">
            <div v-for="item in state.belowPlugin" :key="item.id" class="plugin-card-list">
              <img :src="item.image_url || item.screenshot || defaultImg" alt="" />
              <p>{{ item.name_cn || item.name }}</p>
              <svg-icon name="move"></svg-icon>
            </div>
          </transition-group>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, watch } from 'vue'
import { VueDraggableNext } from 'vue-draggable-next'
import { EditorDefaultImgs } from '../constants/editorDefault.jsx'

export default {
  components: {
    draggable: VueDraggableNext
  },
  props: {
    selectData: {
      type: Array,
      default: () => []
    }
  },
  emits: ['selectItem', 'dragItem', 'setVersion'],
  setup(props, { emit }) {
    const state = reactive({
      plugin: props.selectData,
      topPlugin: [],
      belowPlugin: []
    })

    const defaultImg = EditorDefaultImgs.plugins || EditorDefaultImgs.default

    watch(
      () => props.selectData,

      (value) => {
        state.topPlugin = []
        state.belowPlugin = []
        value.forEach((item) => {
          if (item.layout === 'above') {
            state.topPlugin.push(item)
          } else {
            state.belowPlugin.push(item)
          }
        })
      },
      { immediate: true, deep: true }
    )

    const dragItem = () => {
      const topArray = state.topPlugin.map((item) => item.id)
      const belowArray = state.belowPlugin.map((item) => item.id)

      if (state.plugin.length > 1) {
        emit('dragItem', [...topArray, ...belowArray])
      }
    }

    return {
      state,
      dragItem,
      defaultImg
    }
  }
}
</script>

<style lang="less" scoped>
.list-item-left {
  margin-right: 44px;
  width: 264px;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background: rgba(245, 245, 245, 0.8);
  border: 1px dashed #c2c2c2;
  border-radius: 8px;
  font-size: 14px;
  color: #333333;
  line-height: 20px;
  .title {
    p {
      margin: 20px 20px 0 20px;
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
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    width: 264px;
    height: 100%;
    margin-top: 21px;

    .plugin-top {
      flex: 1;
      padding-left: 20px;
      padding-bottom: 20px;
      box-sizing: border-box;
      width: 260px;
      border-bottom: 1px dashed #c2c2c2;
      &-content {
        max-height: 330px;
        overflow-x: hidden;
        overflow-y: scroll;
        &::-webkit-scrollbar {
          width: 0px;
        }
        &:hover::-webkit-scrollbar {
          width: 8px;
        }
      }
    }
    .plugin-bottom {
      height: 230px;
      padding-left: 20px;
      padding-top: 20px;
      box-sizing: border-box;
      width: 260px;
      &-content {
        height: 180px;
        overflow-x: hidden;
        overflow-y: scroll;
        padding: 6px 0;
        &::-webkit-scrollbar {
          width: 0px;
        }
        &:hover::-webkit-scrollbar {
          width: 8px;
        }
      }
    }

    .plugin-card-list {
      position: relative;
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
      border: 1px solid transparent;
      cursor: move;
      box-sizing: border-box;
      &:last-child {
        margin-bottom: 0;
      }
      &.sortable-chosen {
        border-color: #1476ff;
        box-sizing: border-box;
      }
      &.sortable-ghost {
        &:before {
          content: '';
          width: 100%;
          height: 2px;
          background-color: #1476ff;
          position: absolute;
          top: -5px;
        }
      }
      img {
        width: 40px;
        height: 40px;
        margin: 0 10px 0 12px;
      }
      .icon-move {
        display: none;
        position: absolute;
        right: 8px;
        font-size: 16px;
        color: #f5f5f5;
      }
      &:hover .icon-move {
        display: block;
      }
    }
  }
}
.plugins-enter-active,
.plugins-leave-active {
  transition: all 0.5s ease;
}
.plugins-enter-from,
.plugins-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.plugins-move,
.plugins-enter-active,
.plugins-leave-active {
  transition: all 0.5s ease;
}

.plugins-enter-from,
.plugins-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.plugins-leave-active {
  position: absolute;
}
</style>
