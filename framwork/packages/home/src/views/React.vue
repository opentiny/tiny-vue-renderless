<template>
  <WujieVue
    width="100%"
    height="100%"
    name="react"
    :url="reactUrl"
    :sync="true"
  ></WujieVue>
</template>

<script>
import hostMap from '../hostMap'
export default {
  data() {
    return {
      reactUrl: hostMap('//localhost:2001/')
    }
  }
}
</script>
