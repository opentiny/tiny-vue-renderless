<template>
  <div class="markdown-body">
    <show-marked :md="logData" :isUseContent="true"></show-marked>
  </div>
</template>

<script>
import { computed } from 'vue'
import ShowMarked from '../../common/components/ShowMarked'
import 'github-markdown-css/github-markdown-light.css'

export default {
  components: {
    ShowMarked
  },
  props: {
    md: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const logData = computed(() => props.md)

    return {
      logData
    }
  }
}
</script>

<style lang="less" scoped>
.markdown-body {
  :deep(#editor) {
    height: calc(100vh - 100px);
    overflow-y: auto;
    .md-content {
      max-width: 215px;
    }
    .md {
      width: calc(100vw - 266px);
      margin-left: 20px;
    }
  }
}
</style>
