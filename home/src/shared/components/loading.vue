<template>
  <div ref="loadingRef"></div>
</template>
<script setup lang="ts">
import { Loading } from '@opentiny/vue';
import { onBeforeUnmount, onMounted, shallowRef } from 'vue';

const props = defineProps(['size', 'text']);
const loadingRef = shallowRef(null);
let loadingIns;
onMounted(() => {
  loadingIns = Loading.service({
    ...props,
    target: loadingRef.value,
  });
});
onBeforeUnmount(() => {
  loadingIns?.close();
});
</script>
