<template>
  <div class="tool-top">
    <p>工具栏 <span>鼠标拖动调整顺序</span></p>
    <div class="tool-content">
      <div class="tool-content-left">
        <horizontal-scroll>
          <draggable class="tool-card-box" :list="state.leftTool" @change="dragItem">
            <transition-group name="toolbars">
              <div v-for="item in state.leftTool" :key="item.id" class="tool-card-list">
                <tiny-tooltip
                  class="item"
                  effect="light"
                  :content="item.name_cn || item.name"
                  placement="bottom"
                  :open-delay="500"
                >
                  <div>
                    <img :src="item.image_url || item.screenshot || defaultImg" alt="" />
                    <p>{{ item.name_cn || item.name }}</p>
                    <svg-icon class="tool-card-list-move" name="move"></svg-icon>
                  </div>
                </tiny-tooltip>
              </div>
            </transition-group>
          </draggable>
        </horizontal-scroll>
      </div>
      <div class="tool-content-left">
        <horizontal-scroll>
          <draggable class="tool-card-box" :list="state.middleTool" @change="dragItem">
            <transition-group name="toolbars">
              <div v-for="item in state.middleTool" :key="item.id" class="tool-card-list">
                <tiny-tooltip
                  class="item"
                  effect="light"
                  :content="item.name_cn || item.name"
                  placement="bottom"
                  :open-delay="500"
                >
                  <div>
                    <img :src="item.image_url || item.screenshot || defaultImg" alt="" />
                    <p>{{ item.name_cn || item.name }}</p>
                    <svg-icon class="tool-card-list-move" name="move"></svg-icon>
                  </div>
                </tiny-tooltip>
              </div>
            </transition-group>
          </draggable>
        </horizontal-scroll>
      </div>
      <div class="tool-content-right">
        <horizontal-scroll :align-right="true">
          <draggable class="tool-card-box" :list="state.rightTool" @change="dragItem">
            <transition-group name="toolbars">
              <div v-for="item in state.rightTool" :key="item.id" class="tool-card-list">
                <tiny-tooltip
                  class="item"
                  effect="light"
                  :content="item.name_cn || item.name"
                  placement="bottom"
                  :open-delay="500"
                >
                  <div>
                    <img :src="item.image_url || item.screenshot || defaultImg" alt="" />
                    <p>{{ item.name_cn || item.name }}</p>
                    <svg-icon class="tool-card-list-move" name="move"></svg-icon>
                  </div>
                </tiny-tooltip>
              </div>
            </transition-group>
          </draggable>
        </horizontal-scroll>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, watch } from 'vue'
import { Tooltip } from '@opentiny/vue'
import { VueDraggableNext } from 'vue-draggable-next'
import { EditorDefaultImgs } from '../constants/editorDefault'
import HorizontalScroll from './HorizontalScroll.vue'

export default {
  components: {
    draggable: VueDraggableNext,
    TinyTooltip: Tooltip,
    HorizontalScroll
  },
  props: {
    selectData: {
      type: Array,
      default: () => []
    }
  },
  emits: ['selectItem', 'dragItem'],
  setup(props, { emit }) {
    const state = reactive({
      tool: props.selectData,
      leftTool: [],
      middleTool: [],
      rightTool: []
    })

    watch(
      () => props.selectData,

      (value) => {
        state.leftTool = []
        state.middleTool = []
        state.rightTool = []
        state.tool = value

        value.forEach((item) => {
          if (item.layout === 'left') {
            state.leftTool.push(item)
          } else if (item.layout === 'middle') {
            state.middleTool.push(item)
          } else {
            state.rightTool.push(item)
          }
        })
      },
      { immediate: true, deep: true }
    )

    const dragItem = () => {
      const leftArray = state.leftTool.map((item) => item.id)
      const middleArray = state.middleTool.map((item) => item.id)
      const rightArray = state.rightTool.map((item) => item.id)

      if (state.tool.length > 1) {
        emit('dragItem', [...leftArray, ...middleArray, ...rightArray])
      }
    }
    const defaultImg = EditorDefaultImgs.toolbar

    return {
      state,
      dragItem,
      defaultImg
    }
  }
}
</script>

<style lang="less" scoped>
.tool-top {
  width: 100%;
  margin-bottom: 20px;
  p {
    margin: 0 0 20px;
    font-size: 14px;
    color: #191919;
    span {
      font-size: 12px;
      color: #999999;
      margin-left: 14px;
    }
  }
  .tool-content {
    width: 100%;
    height: 120px;
    background: sandybrown;
    display: flex;
    background: rgba(245, 245, 245, 0.8);
    border: 1px dashed #c2c2c2;
    border-radius: 8px;
    box-sizing: border-box;
    &-left {
      width: 250px;
      box-sizing: border-box;
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      padding: 8px 12px 0 12px;
      border-right: 1px dashed #c2c2c2;
      overflow-x: scroll;
    }
    &-center {
      width: 250px;
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      padding: 8px 12px 0 12px;
      border-right: 1px dashed #c2c2c2;
      overflow-x: scroll;
    }
    &-right {
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      padding: 8px 12px 0 12px;
      box-sizing: border-box;
      flex: 1;
      border-right: 1px dashed #c2c2c2;
      overflow-x: scroll;
      .tool-card-list:first-child {
        margin-left: auto;
      }
    }
    .tool-card-box {
      display: flex;
      padding: 0 6px;
    }
    .tool-card-list {
      position: relative;
      width: 90px;
      height: 90px;
      padding: 12px;
      flex-shrink: 0;
      background: #ffffff;
      box-sizing: border-box;
      border-radius: 12px;
      font-size: 14px;
      font-family: Microsoft YaHei, Microsoft YaHei-Normal;
      text-align: CENTER;
      color: #333333;
      box-shadow: 1px 1px 2px 0px rgba(181, 195, 208, 0.4);
      border: 1px solid transparent;
      cursor: move;
      & + .tool-card-list {
        margin-left: 12px;
      }
      img {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      p {
        margin: 6px 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
      }
      &.sortable-chosen {
        border-color: #1476ff;
      }
      &.sortable-ghost {
        &:before {
          content: '';
          height: 100%;
          width: 2px;
          background-color: #1476ff;
          position: absolute;
          top: 0;
          left: -5px;
        }
      }
      .icon-move {
        display: none;
        position: absolute;
        right: 4px;
        top: 4px;
        font-size: 16px;
        color: #aeb0b8;
      }
      &:hover .icon-move {
        display: block;
      }
    }
  }
}
.toolbars-enter-active,
.toolbars-leave-active {
  transition: all 0.5s ease;
}
.toolbars-enter-from,
.toolbars-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.toolbars-move,
.toolbars-enter-active,
.toolbars-leave-active {
  transition: all 0.5s ease;
}

.toolbars-enter-from,
.toolbars-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.toolbars-leave-active {
  position: absolute;
}
::-webkit-scrollbar-track-piece {
  background: rgba(245, 245, 245, 0.8);
}
</style>
