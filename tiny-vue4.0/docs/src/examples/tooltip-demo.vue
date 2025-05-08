<script setup lang="ts">
import { Tooltip as TinyTooltip } from '@opentiny/vue-pc'
import { ref } from 'vue'
const show = ref(true)

// const content=ref('我是提示内容')
const content = ref(
  [
    '空山新雨后，天气晚来秋。',
    '  明月松间照，清泉石上流。',
    '竹喧归浣女，莲动下渔舟。',
    '  随意春芳歇，王孙自可留。',
  ].join('\n'),
)
console.log(content)

const showTooltip = ref(false)

function handleSubmit() {
  return Promise.resolve(true)
}
</script>

<template>
  <button @click="showTooltip = !showTooltip">隐藏全部</button>
  <div v-if="show" style="margin: 50px; width: 500px">
    <TinyTooltip
      theme="dark"
      :content="content"
      @show="console.log('show-------')"
      placement="top-end"
      @hide="console.log('hide0000000')"
    >
      鼠标悬浮到这里鼠标悬浮到这里鼠标悬浮到这里
    </TinyTooltip>
    <br />
    <TinyTooltip theme="dark" trigger="click" placement="top-start" :content="content" showConfirm :onOk="handleSubmit">
      鼠标悬浮到这里鼠标悬浮到这里鼠标悬浮到这里
    </TinyTooltip>

    <br />
    <TinyTooltip
      theme="dark"
      trigger="manual"
      v-model:show="showTooltip"
      :content="content"
      title="唐诗"
      showConfirm
      :onOk="handleSubmit"
    >
      鼠标悬浮到这里鼠标悬浮到这里鼠标悬浮到这里
    </TinyTooltip>
  </div>
  <div style="height: 100vh"></div>
</template>
