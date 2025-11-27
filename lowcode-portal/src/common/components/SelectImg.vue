<template>
  <div class="setimage">
    <template v-if="input">
      <div class="popselect-box">
        <tiny-button @click="boxVisibility = true">选择预览图片</tiny-button>
        <img width="100" style="margin-top: 10px" :src="value" alt="" />
      </div>
    </template>
    <template v-else>
      <div v-if="!value" class="empty" :style="{ width }" @click="boxVisibility = true">设置图片</div>
      <img v-else style="height: 100%" :src="value" alt="设置图片" @click="boxVisibility = true" />
    </template>
    <tiny-dialog-box
      right-slide
      :visible="boxVisibility"
      title="选择图片"
      :width="slideWidth[type]"
      top="0"
      append-to-body
      dialog-class="select-img"
      @update:visible="boxVisibility = $event"
    >
      <div>
        <div v-for="img in options" :key="img" class="preview-img">
          <img :src="img" alt="" @click="selectImg(img)" />
        </div>
      </div>
    </tiny-dialog-box>
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue'
import { DialogBox, Button } from '@opentiny/vue'

import defaultImg from '@/common/json/default'

export default {
  components: {
    TinyDialogBox: DialogBox,
    TinyButton: Button
  },

  props: {
    type: {
      type: String,
      default: 'myApplication'
    },
    modelValue: String,
    input: {
      type: Boolean,
      default: true
    },
    width: {
      type: String,
      default: '100px'
    }
  },
  setup(props, { emit }) {
    const value = ref(props.modelValue)
    const boxVisibility = ref(false)
    const options = defaultImg[props.type]
    const slideWidth = {
      myPlatform: '328px',
      myMaterial: '360px',
      myApplication: '192px'
    }

    watchEffect(() => {
      value.value = props.modelValue
    })

    const selectImg = (val) => {
      emit('update:modelValue', val)
      emit('change', val)
      boxVisibility.value = false
    }

    const onHide = () => {
      selectImg(value.value)
    }

    return {
      value,
      options,
      slideWidth,
      boxVisibility,
      onHide,
      selectImg
    }
  }
}
</script>
<style lang="less">
.tiny-dialog-box__wrapper.select-img {
  .tiny-dialog-box__header {
    padding: 20px;
  }
  .tiny-dialog-box__body {
    padding: 0 20px;
    max-height: unset;
    height: calc(100vh - 54px);
  }
}
</style>
<style lang="less" scoped>
.setimage {
  cursor: pointer;
  height: 100%;
  position: relative;
  .empty {
    height: 100%;
    border: 1px solid #dfe1e6;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #bdbdbd;
  }
  .edit {
    position: absolute;
    bottom: 0;
    right: 5px;
    display: flex;
    align-items: center;
    color: #2496ff;
  }
  .edit-icon {
    display: block;
    padding: 5px;
  }
}
.tiny-input {
  display: flex;
  align-items: center;
  & > input {
    margin-right: 10px;
  }
  svg {
    font-size: 20px;
    cursor: pointer;
  }
}
.preview-img {
  cursor: pointer;
  padding: 2px;
}
.popselect-box {
  width: 140px;
  display: flex;
  flex-direction: column;
}
:deep(.tiny-input-suffix .tiny-input__inner) {
  padding-right: 320px;
}
</style>
