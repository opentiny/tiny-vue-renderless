<template>
  <WujieVue
    width="100%"
    height="100%"
    name="vue3"
    :url="vue3Url"
    :sync="true"
  ></WujieVue>
</template>

<script>
import hostMap from '../hostMap'
export default {
  data() {
    return {
      vue3Url: hostMap('//localhost:2004/')
    }
  }
}
</script>

<style lang="scss" scoped></style>
