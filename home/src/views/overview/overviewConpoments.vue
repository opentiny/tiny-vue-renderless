<template>
  <div :class="[classLevel, 'overview-list', level > 1 && hasChildren ? 'mb12' : '', hasChildren ? 'wd-100' : '']">
    <template v-if="hasChildren">
      <div class="overview-list-title">{{ components.label }}</div>
      <component-overview-list
        v-for="item in components.children"
        :key="item.key"
        :components="item"
        :level="level + 1"
      ></component-overview-list>
    </template>
    <template v-if="!hasChildren">
      <div class="overview-list-component" @click="clickComponent(components)">
        <TinyImage class="overview-list-component-img" :src="imgSrc" @error="handleImgError" lazy />
        <div class="overview-list-component-label">{{ components.label }}</div>
      </div>
    </template>
  </div>
</template>
<script>
import { computed, defineComponent, reactive, shallowRef, toRefs } from 'vue'
import { Image as TinyImage } from '@opentiny/vue'

import { router } from '@/router.js'
import { $pub, getDemoModule } from '@/tools'
import { VITE_CONTEXT } from '@/shared/const'

export default defineComponent({
  name: 'ComponentOverviewList',
  components: {
    TinyImage
  },
  props: {
    components: {
      type: Object,
      default: () => {}
    },
    level: {
      type: Number,
      default: 1
    }
  },
  setup(props) {
    const hasChildren = computed(() => props.components?.children?.length)
    const classLevel = computed(() => `level-${props.level}`)
    const isImgRrror = shallowRef(false)
    const state = reactive({
      hasChildren,
      classLevel,
      imgSrc: computed(() => {
        if (isImgRrror.value) {
          return state.defaultImgSrc
        }
        const {
          components: { key }
        } = props
        const fileName = key.match(/([^/]+)\/?$/)?.[1]
        const isBaseComponent = key.startsWith(`${VITE_CONTEXT}opentiny-design/design-develop/portal/base-component`)
        if (isBaseComponent) {
          return $pub(`tiny/overview-images/${fileName}.svg`)
        }
        const isTinyCloud = key.startsWith(`${VITE_CONTEXT}opentiny-design/design-develop/console/tiny-cloud`)
        if (isTinyCloud) {
          return getDemoModule(`tinydoc-ng-tinycloud/webdoc/overview-images/${fileName}.svg`) || state.defaultImgSrc
        }
        return `https://r-beta.hw3static.com/s/uat/Tinydoc_design/lst/cloud-design/overview-images/${fileName}.svg`
      }),
      defaultImgSrc: $pub('images/developing.svg')
    })
    const fn = {
      clickComponent: (component) => {
        if (!component.children?.length) {
          router.push({
            path: component.key
          })
        }
      },
      handleImgError: () => {
        isImgRrror.value = true
      }
    }
    return {
      ...toRefs(state),
      ...fn
    }
  }
})
</script>
<style lang="less" scoped>
.overview-list {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;

  &-title {
    color: #191919;
    line-height: 15px;
    width: 100%;
    margin-bottom: 12px;
    font-weight: 600;
  }

  &-component {
    background: #ffffff;
    border: 0.5px solid #f0f0f0;
    border-radius: 4px;
    width: 200px;
    cursor: pointer;
    transition: all 0.2s;

    &-img {
      background-color: #fafafa;
      width: 100%;
      height: 94px;
    }

    &-label {
      background-color: #fff;
      font-size: 16px;
      font-weight: 500;
      color: #191919;
      line-height: 38px;
      height: 38px;
      padding: 0 16px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &:hover {
      box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.08);
    }
  }

  &.level-1 {
    .overview-list-title {
      font-size: 24px;
      margin-top: 36px;
    }
  }

  &.level-2 {
    .overview-list-title {
      font-size: 20px;
      margin-top: 0;
    }
  }

  &.wd-100 {
    width: 100%;
  }
}
</style>
