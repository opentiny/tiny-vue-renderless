<template>
  <iframe class="content" :src="docUrl"></iframe>
</template>

<script>
import { watch, ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'

export default {
  components: {},
  setup() {
    const route = useRoute()

    const baseUrl = 'https://opentiny.design/lowcode-protocols/'
    const docsUrl = {
      app: 'application-protocol.html',
      material: 'material-package-protocol.html',
      demos: 'protocol-demos.html'
    }

    const docUrl = ref(baseUrl + docsUrl.app)
    const docUrlCopy = ref('')

    watch(
        () => route.params.page,
        (page) => {
          docUrl.value = `${baseUrl}${docsUrl[page || 'app']}`
          docUrlCopy.value = page
        }
    )
    onBeforeMount(() => {
      window.addEventListener('beforeunload', () => {
        sessionStorage.setItem('page', JSON.stringify(docUrlCopy.value))
      })
      let copyUrl = sessionStorage.getItem('page')

      copyUrl = JSON.parse(copyUrl)
      if (copyUrl) {
        docUrl.value = `${baseUrl}${docsUrl[copyUrl]}`
      } else {
        docUrl.value = `${baseUrl}${docsUrl.app}`
      }
    })

    return {
      docUrl
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  width: 100%;
  height: calc(100% - 63px);
  overflow: hidden;
  border: none;
}
</style>
