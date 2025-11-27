<template>
  <ul class="head-list" @mouseleave="currentMenu = null">
    <li
      v-for="item in menuData"
      :key="item.title"
      :class="{ 'head-list-item': true, active: $route.path?.indexOf(item.link) === 0 }"
      @click="handleClick(item)"
      @mouseover="currentMenu = item"
    >
      <router-link :to="item.link">{{ item.title }}</router-link>
      <span v-if="item.submenu?.length" class="button-arrow"></span>
      <ul
        v-if="item.submenu?.length && currentMenu === item"
        class="submenu"
        @mouseleave="currentMenu = null"
        @mouseover="currentMenu = item"
      >
        <li
          v-for="child in item.submenu"
          :key="child.title"
          :class="{ submenuActive: $route.path?.indexOf(child.link) === 0 }"
        >
          <span class="arrow"></span>
          <router-link :to="child.link">{{ child.title }} </router-link>
        </li>
      </ul>
      <breath-tip v-if="visible && isMyApplication && item.id === 'platform'" @close="visible = false">
        <span>您可以去&nbsp;我的设计器&nbsp;里 <span style="font-weight: bold">创建应用</span>~~</span>
      </breath-tip>
    </li>
  </ul>
</template>
<script>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import BreathTip from './BreathTip.vue'

export default {
  components: {
    BreathTip
  },
  props: {
    menuData: {
      type: Array,
      default: () => []
    }
  },
  setup(props, { emit }) {
    const route = useRoute()
    const isMyApplication = computed(() => route.name === 'myApplication')
    const currentMenu = ref(null)
    const visible = ref(true)

    const handleClick = (item) => {
      currentMenu.value = null
      emit('click', item)
    }

    return {
      currentMenu,
      handleClick,
      visible,
      isMyApplication
    }
  }
}
</script>
<style lang="less" scoped>
.head-list {
  min-width: 558px;
  position: relative;
  display: flex;
  align-items: center;
  .head-list-item {
    box-sizing: border-box;
    color: #333333;
    padding: 0 16px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &::before {
      content: '';
      width: 0;
      height: 2px;
      border-radius: 2px;
      transition: all 0.3s ease;
      position: absolute;
      left: 50%;
      bottom: 0px;
      transform: translateX(-50%);
    }
    &:hover::before,
    &.active::before {
      width: calc(100% - 26px);
      background: #333333;
    }
    a {
      display: flex;
      align-items: center;
      height: 100%;
    }
  }

  .button-arrow {
    display: inline-block;
    margin-top: -1px;
    margin-left: 8px;
    border-top: 6px solid #ccc;
    border-right: 4px solid transparent;
    border-bottom: 0;
    border-left: 4px solid transparent;
    vertical-align: middle;
  }

  .arrow {
    display: inline-block;
    margin-left: 5px;
    border-top: 6px solid #ccc;
    border-right: 4px solid transparent;
    border-bottom: 0;
    border-left: 4px solid transparent;
    vertical-align: middle;
    opacity: 0;
    transform: translateY(-2px) rotate(-90deg);
  }

  .submenu {
    z-index: 10;
    position: absolute;
    left: 15px;
    top: 56px;
    width: 150px;
    background-color: white;
    box-shadow: 0 1px 15px 0 rgb(0 0 0 / 20%);
    li {
      display: flex;
      font-size: 14px;
      padding: 10px;
      &:hover {
        color: #0089ff;
      }
      &.submenuActive {
        color: #0089ff;
        .arrow {
          opacity: 1;
        }
      }
    }
  }
}
</style>
