<template>
  <tiny-popover placement="bottom" trigger="hover" :visible-arrow="false" append-to-body>
    <template #reference>
      <span class="more-icon">
        <component :is="icon" v-if="isTinyIcon"></component>
        <svg-icon v-else :name="icon"></svg-icon>
      </span>
    </template>
    <div class="check-more">
      <ul class="check-more-list">
        <li v-for="item in data" :key="item.id" class="list-item" @click="$emit('clickMore', item)">
          <component :is="item.icon"></component>
          <span class="check-more-content">{{ item.content }}</span>
        </li>
      </ul>
    </div>
  </tiny-popover>
</template>

<script>
import { computed } from 'vue'
import { Popover } from '@opentiny/vue'
import { IconEllipsis } from '@opentiny/vue-icon'

export default {
  components: {
    TinyPopover: Popover,
    IconEllipsis: IconEllipsis()
  },
  props: {
    data: {
      type: Array,
      default: []
    },
    icon: {
      type: [Object, String],
      default: 'icon-ellipsis'
    }
  },
  emits: ['clickMore'],
  setup(props) {
    const isTinyIcon = computed(() => props.icon.toLowerCase().indexOf('icon') === 0)

    return {
      isTinyIcon
    }
  }
}
</script>

<style></style>

<style lang="less" scoped>
.more-icon {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #878f95;
  .tiny-svg {
    font-size: 24px;
  }
  .svg-icon {
    font-size: 18px;
  }
  &:hover {
    background: #f1f2f3;
  }
}
.check-more {
  min-width: 80px;
  .list-item {
    color: #747677;
    border-radius: 6px;
    padding: 8px 20px;
    transition: background 0.1s linear;
    cursor: pointer;
    display: flex;
    align-items: center;
    &:hover {
      color: #171a1d;
      background-color: #f1f2f3;
    }
    .tiny-svg {
      font-size: 18px;
      margin-right: 8px;
    }
  }
  .check-more-content{
    margin-left: 10px;
  }
}
</style>
