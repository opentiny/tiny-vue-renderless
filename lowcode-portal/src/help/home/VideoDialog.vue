<template>
  <tiny-dialog-box
    v-model:visible="state.videoVisibility"
    :close-on-click-modal="false"
    :title="state.videoData.title"
    width="880px"
    @closed="$emit('cancel')"
  >
    <video
      controls
      controlslist="nodownload"
      class="video"
      :src="state.videoData.url"
      :poster="state.imgPre + state.videoData.img"
    ></video>
  </tiny-dialog-box>
</template>

<script>
import { reactive, watch, watchEffect } from 'vue'
import { DialogBox } from '@opentiny/vue'

export default {
  components: {
    TinyDialogBox: DialogBox
  },
  props: {
    videoData: {
      type: Object,
      default: () => ({})
    },
    videoVisibility: {
      type: Boolean,
      default: false
    }
  },
  emits: ['cancel', 'create'],
  setup(props, { emit }) {
    const state = reactive({
      videoVisibility: props.videoVisibility,
      videoData: props.videoData,
      imgPre: `${import.meta.env.BASE_URL}`
    })

    watch(
      () => props.videoVisibility,
      (value) => {
        state.videoVisibility = value
      }
    )

    watchEffect(() => {
      state.videoData = props.videoData
    })

    return {
      state
    }
  }
}
</script>
<style lang="less" scoped>
.video {
  width: 100%;
  margin: 20px 0;
}
</style>
