<template>
  <iframe class="tiny-engine-iframe" :src="tinyEngineUrl"></iframe>
</template>
<script>
import { TINY_ENGINE_DEFAULT_URL } from '../controller/utils'
export default {
  setup() {
    return {
      tinyEngineUrl: TINY_ENGINE_DEFAULT_URL
    }
  }
}
</script>
<style lang="less">
.tiny-engine-iframe {
  width: 100%;
  height: 99%;
  border: none;
}
</style>
