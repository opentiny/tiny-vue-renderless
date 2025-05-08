<script setup lang="ts">
import { Button as TinyButton } from '@opentiny/vue-pc'
import { ref } from 'vue'
const show = ref(true)

const buttonRef = ref()
</script>

<template>
  <button @click="show = !show">隐藏全部</button>
  <div v-if="show">
    <TinyButton ref="buttonRef">按钮</TinyButton>

    <TinyButton>
      <template #root="{ state }">
        <span>{{ state.name || 'something' }}</span>
      </template>
    </TinyButton>
  </div>
</template>
