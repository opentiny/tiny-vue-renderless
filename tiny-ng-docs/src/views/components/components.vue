<template>
  <div>
    <div class="f-r doc-container">
      <components-detail></components-detail>

    </div>
    <div id="footer"></div>
  </div>
</template>
<script lang="jsx">
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import componentsDetail from './componentsDetail.vue';
const state = reactive({
  projectName: import.meta.env.MODE,
  useTab: null,
});
export default defineComponent({
  name: 'CmpPage_vue',
  components: { componentsDetail },
  setup() {
    onMounted(() => {
      const common = new window.TDCommon(['#footer'], {});
      common.renderFooter();
    });
    return {
      ...toRefs(state),
    };
  },
});
</script>
<style lang="less">
.doc-container {
  min-height: 600px;
  padding-bottom: 100px;
}
@media (max-width: 1279px) {
  .doc-container {
    padding-bottom: 0;
  }
}
.n-tabs .n-tabs-nav.n-tabs-nav--card-type .n-tabs-tab.n-tabs-tab--active {
  color: #5073e5;
}
</style>
