<template>
  <WujieVue
    width="100%"
    height="100%"
    name="vue2"
    :url="vue2Url"
    :sync="true"
  ></WujieVue>
</template>

<script>
import hostMap from '../hostMap'

export default {
  data() {
    return {
      vue2Url: hostMap('//localhost:2003/')
    }
  },
  methods: {
    jump(name) {
      this.$router.push({ name })
    }
  }
}
</script>

<style lang="scss" scoped></style>
