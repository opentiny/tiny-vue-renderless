<template>
  <WujieVue
    width="100%"
    height="100%"
    name="solid"
    :url="solidUrl"
    :sync="true"
  ></WujieVue>
</template>

<script>
import hostMap from '../hostMap'

export default {
  computed: {
    solidUrl() {
      return hostMap('//localhost:2002/')
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
