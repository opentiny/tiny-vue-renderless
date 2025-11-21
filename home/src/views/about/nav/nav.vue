<template>
  <div v-show="showAnchor" class="section-anchor">
    <tiny-anchor :links="anchorData" :type="type" class="section-anchor-instructor"></tiny-anchor>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { TinyAnchor, TinyButton } from '@opentiny/vue'
import { debounce } from '@/tools'
import './nav.less'

const props = defineProps({
  anchors: {
    type: Array
  }
})

const type = ref('dot')
const showAnchor = ref(false)
const anchorData = ref(props.anchors)
const arrElem = ref()
const mutationObservers = ref([])

const overFn = (element, index) => {
  return () => {
    if (anchorData.value && index < anchorData.value.length) {
      // 根据索引获取对应的 desc 字段
      const desc = anchorData.value[index]['desc']
      // 替换文本内容
      element.textContent = desc
    }
  }
}

const outFn = (element, index) => {
  // 悬浮离开时根据类名决定显示内容
  return () => {
    if (element.classList.contains('tiny-anchor-link-title--active')) {
      const desc = anchorData.value[index]['desc']
      element.textContent = desc
      return
    }
    element.textContent = anchorData.value[index]['title']
  }
}

const rollFn = (element, index) => {
  if (element.classList.contains('tiny-anchor-link-title--active')) {
    const desc = anchorData.value[index]['desc']
    element.textContent = desc
  } else {
    const title = anchorData.value[index]['title']
    element.textContent = title
  }
}

const getNavElement = () => {
  // 获取所有元素
  arrElem.value = document.querySelectorAll(
    '.section-anchor-instructor > .tiny-anchor > .tiny-anchor-link > .tiny-anchor-link-title'
  )
  // 遍历元素并输出类名
  arrElem.value.forEach((element, index) => {
    // 添加 mouseover 事件监听器
    element.addEventListener('mouseover', overFn(element, index))

    // 添加 mouseout 事件监听器
    element.addEventListener('mouseout', outFn(element, index))

    // 添加监听事件
    const observer = new MutationObserver((mutationsList) => {
      for (let mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          // 类变化时更新文本内容
          rollFn(element, index)
        }
      }
    })
    observer.observe(element, { attributes: true })
    observer && mutationObservers.value.push(observer)
  })

  // 默认显示第一个 anchorData.value[index]['desc']
  if (arrElem.value.length > 0) {
    const firstElement = arrElem.value[0]
    firstElement.dispatchEvent(
      new MouseEvent('mouseover', {
        view: window,
        bubbles: true,
        cancelable: true
      })
    )
  }
}

const onScroll = debounce((event) => {
  const threshold = document.querySelector('.banner')?.offsetHeight - 100 || 600
  showAnchor.value = event.target.scrollTop > threshold
}, 100)

const addScrollListener = () => {
  nextTick(() => {
    document.body.addEventListener('scroll', onScroll, true)
  })
}

const removeScrollListener = () => {
  document.body.removeEventListener('scroll', onScroll)
  // 移除所有事件监听器
  arrElem.value.forEach((element) => {
    element.removeEventListener('mouseover', overFn)
    element.removeEventListener('mouseout', outFn)
  })
}

onMounted(() => {
  getNavElement()
  addScrollListener()
  nextTick(() => {
    removeScrollListener()
  })
})

onUnmounted(() => {
  removeScrollListener()
  mutationObservers.value.forEach((observer) => {
    observer && observer.disconnect()
  })
})
</script>
